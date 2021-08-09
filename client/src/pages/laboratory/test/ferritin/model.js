import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import * as controller from 'utils/controller'
import {
  observation as Observation,
  diagnosticreport as DiagnosticReport,
  bundleentry as BundleEntry,
  bundle as Bundle,
  servicerequest as ServiceRequest,
} from 'schemas'
import api from 'api'

const { readResource, batch_transaction_request } = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_test_ferritin',

  state: {
    modalData: {},
  },

  effects: {
    *queryLabTestResult({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      const requestPayload = {
        resourceType: 'ServiceRequest',
        _id: payload.serviceRequestId,
        _include: ['ServiceRequest:specimen', 'ServiceRequest:subject'],
        _revinclude: ['DiagnosticReport:based-on'],
        '_include:iterate': ['DiagnosticReport:result'],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
        ],
      }

      const response = yield call(readResource, requestPayload)
      if (response && response.success) {
        const bundle = new Bundle(response.data)
        const dataSource = controller.generateTableData(
          bundle,
          FHIR_CODES,
          FHIR_CODES.UncategorizedTests.OtherTests.include.Ferritin
        )

        const modalData = dataSource[0]
        yield put({
          type: 'updateState',
          payload: {
            modalData: modalData,
          },
        })
        return modalData
      } else {
        throw response
      }
    },

    *saveResult({ payload = {} }, { call, put, select }) {
      const { testData, testCode, testResult, regulatoryNotes } = payload
      const globalState = yield select(state => state.app)

      const observationIdentifier = {
        ...globalState.FHIR_CODES.Identifiers.Observation,
        value: dateTime.getInstant(),
      }

      const defaults = {
        status: 'preliminary',
        subject: testData.subject,
        issued: dateTime.getInstant(),
        performer: [
          globalState.Organization.getReference(),
          globalState.Practitioner.getReference(),
        ],
      }

      const { code, referenceRange, unit } = testCode

      let valueQuantity

      if (!isNaN(parseFloat(testResult))) {
        valueQuantity = {
          value: parseFloat(testResult),
          unit: unit,
        }
      }

      let relatedReferenceRange
      let interpretation

      try {
        relatedReferenceRange = helper.getRelatedReferenceRange(
          referenceRange,
          testData.patient
        )

        if (relatedReferenceRange) {
          interpretation = helper.getInterpretation(
            globalState.FHIR_CODES.Interpretations,
            valueQuantity,
            relatedReferenceRange
          )
        }
      } catch (errorInfo) {
        console.log(errorInfo)
      }

      const bundleEntries = []

      const newObservationData = {
        ...defaults,
        identifier: [observationIdentifier],
        code: testCode.code,
        basedOn: [testData['serviceRequestRef']],
        valueQuantity: valueQuantity,
        interpretation: interpretation && interpretation,
        referenceRange: relatedReferenceRange && {
          low: relatedReferenceRange.low,
          high: relatedReferenceRange.high,
        },
      }

      const resultingObservation = new Observation(newObservationData)

      const observationEntry = new BundleEntry({
        fullUrl: helper.generateFullUrl(),
        resource: resultingObservation,
        request: {
          method: 'POST',
          url: resultingObservation.resourceType,
        },
      })

      bundleEntries.push(observationEntry)

      /* #region REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (regulatoryNotes && regulatoryNotes !== '') {
        const regulatoryNotesObservation = new Observation({
          ...defaults,
          identifier: [observationIdentifier],
          basedOn: [testData['serviceRequestRef']],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        })

        regulatoryNotesObservationEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: regulatoryNotesObservation,
          request: {
            method: 'POST',
            url: regulatoryNotesObservation.resourceType,
          },
        })
      }

      regulatoryNotesObservationEntry &&
        bundleEntries.push(regulatoryNotesObservationEntry)
      /* #endregion */

      const diagnosticReportData = {
        ...defaults,
        status: 'partial', //overwriting
        identifier: [
          Object.assign(
            {
              value: dateTime.getInstant(),
            },
            globalState.FHIR_CODES.Identifiers.DiagnosticReport
          ),
        ],
        basedOn: [testData['serviceRequestRef']],
        code: testCode.code,
        specimen: testData.specimen.map(sp => helper.getReference(sp)),
        result: [{ reference: observationEntry.fullUrl, type: 'Observation' }],
      }

      if (regulatoryNotesObservationEntry) {
        diagnosticReportData.result.push({
          reference: regulatoryNotesObservationEntry.fullUrl,
          type: 'Observation',
        })
      }

      const diagnosticReport = new DiagnosticReport(diagnosticReportData)

      const diagnosticReportEntry = new BundleEntry({
        fullUrl: helper.generateFullUrl(),
        resource: diagnosticReport,
        request: {
          method: 'POST',
          url: diagnosticReport.resourceType,
        },
      })

      bundleEntries.push(diagnosticReportEntry)

      /* #region  COMPLETE SERVICE REQUEST */
      const completedServiceRequest = new ServiceRequest({
        ...testData.serviceRequest,
        status: 'completed',
      })
      const completeServiceRequestUrl = helper.getReferenceUrl(
        completedServiceRequest
      )

      const completeServiceRequestEntry = new BundleEntry({
        fullUrl: completeServiceRequestUrl,
        resource: completedServiceRequest,
        request: {
          method: 'PUT',
          url: completeServiceRequestUrl,
          ifMatch: `W/"${completedServiceRequest.meta.versionId}"`,
        },
      })

      bundleEntries.push(completeServiceRequestEntry)

      console.log(bundleEntries)

      // /* #endregion */

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()

      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        return
      } else {
        throw response
      }
    },

    *editResult({ payload = {} }, { call, put, select }) {
      const state = yield select(state => state)
      const globalState = state.app
      const { testData, testCode, testResult, regulatoryNotes } = payload

      const bundleEntries = []

      const { code, referenceRange, unit } = testCode

      let valueQuantity

      if (!isNaN(parseFloat(testResult))) {
        valueQuantity = {
          value: parseFloat(testResult),
          unit: unit,
        }
      }

      let relatedReferenceRange
      let interpretation

      try {
        relatedReferenceRange = helper.getRelatedReferenceRange(
          referenceRange,
          testData.patient
        )

        if (relatedReferenceRange) {
          interpretation = helper.getInterpretation(
            globalState.FHIR_CODES.Interpretations,
            valueQuantity,
            relatedReferenceRange
          )
        }
      } catch (errorInfo) {
        console.log(errorInfo)
      }

      const defaults = {
        status: 'preliminary',
        subject: testData.subject,
        issued: dateTime.getInstant(),
        performer: [
          globalState.Organization.getReference(),
          globalState.Practitioner.getReference(),
        ],
      }

      /* #region  CANCEL OLD OBSERVATION */

      if (testData.latestObservation.status !== 'cancelled') {
        const cancelledObservation = new Observation({
          ...testData.latestObservation.toJSON(),
          status: 'cancelled',
        })

        const cancelledObservationUrl = helper.getReferenceUrl(
          cancelledObservation
        )
        const cancelledObservationEntry = new BundleEntry({
          fullUrl: cancelledObservationUrl,
          resource: cancelledObservation,
          request: {
            method: 'PUT',
            url: cancelledObservationUrl,
            ifMatch: `W/"${cancelledObservation.meta.versionId}"`,
          },
        })

        bundleEntries.push(cancelledObservationEntry)
      }

      /* #endregion */

      /* #region  NEW OBSERVATION */
      const observationIdentifier = {
        ...globalState.FHIR_CODES.Identifiers.Observations,
        value: dateTime.getInstant(),
      }

      const newObservationData = {
        ...testData.latestObservation,
        ...defaults,
        valueQuantity: valueQuantity,
        interpretation: interpretation && interpretation,
        referenceRange: relatedReferenceRange && {
          low: relatedReferenceRange.low,
          high: relatedReferenceRange.high,
        },
        identifier: [observationIdentifier],
        code: testCode.code,
        basedOn: [testData['serviceRequestRef']],
        extension: [
          {
            ...globalState.FHIR_CODES.Extensions.ObservationReplaces,
            valueReference: helper.getReference(testData.latestObservation),
          },
        ],
      }

      const newObservation = new Observation(newObservationData)

      const newObservationEntry = new BundleEntry({
        fullUrl: helper.generateFullUrl(),
        resource: newObservation,
        request: {
          method: 'POST',
          url: newObservation.resourceType,
        },
      })

      bundleEntries.push(newObservationEntry)
      /* #endregion */

      const newDiagnosticReport = {
        ...testData.diagnosticReport.toJSON(),
        result: [
          {
            reference: newObservationEntry.fullUrl,
            type: 'Observation',
          },
        ],
      }

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (
        regulatoryNotes &&
        testData.regulatoryNotesValue &&
        regulatoryNotes === testData.regulatoryNotesValue
      ) {
        // no changes
        newDiagnosticReport.result.push(
          helper.getReference(testData.regulatoryNotesObservation)
        )
      } else if (!regulatoryNotes && testData.regulatoryNotesValue) {
        // delete
        regulatoryNotesObservationEntry = new BundleEntry({
          request: {
            method: 'DELETE',
            url: helper.getReferenceUrl(testData.regulatoryNotesObservation),
          },
        })
      } else if (
        regulatoryNotes &&
        testData.regulatoryNotesValue &&
        regulatoryNotes !== testData.regulatoryNotesValue
      ) {
        // update
        const updatedRegulatoryNotesObservation = new Observation({
          id: testData.regulatoryNotesObservation.id,
          meta: testData.regulatoryNotesObservation.meta,
          ...defaults,
          identifier: [observationIdentifier],
          basedOn: [testData['serviceRequestRef']],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        })

        const updatedRegulatoryNotesObservationUrl = helper.getReferenceUrl(
          testData.regulatoryNotesObservation
        )
        regulatoryNotesObservationEntry = new BundleEntry({
          fullUrl: updatedRegulatoryNotesObservationUrl,
          resource: updatedRegulatoryNotesObservation,
          request: {
            method: 'PUT',
            url: updatedRegulatoryNotesObservationUrl,
            ifMatch: `W/"${testData.regulatoryNotesObservation.meta.versionId}"`,
          },
        })

        newDiagnosticReport.result.push(
          helper.getReference(testData.regulatoryNotesObservation)
        )
      } else if (regulatoryNotes && !testData.regulatoryNotesValue) {
        // post
        const newRegulatoryNotesObservation = new Observation({
          ...defaults,
          identifier: [observationIdentifier],
          basedOn: [testData['serviceRequestRef']],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        })

        regulatoryNotesObservationEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: newRegulatoryNotesObservation,
          request: {
            method: 'POST',
            url: newRegulatoryNotesObservation.resourceType,
          },
        })

        newDiagnosticReport.result.push({
          reference: regulatoryNotesObservationEntry.fullUrl,
          type: 'Observation',
        })
      }
      regulatoryNotesObservationEntry &&
        bundleEntries.push(regulatoryNotesObservationEntry)
      /* #endregion */

      /* #region  DIAGNOSTIC REPORT */
      const diagnosticReportUrl = helper.getReferenceUrl(newDiagnosticReport)
      const newDiagnosticReportEntry = new BundleEntry({
        fullUrl: diagnosticReportUrl,
        resource: newDiagnosticReport,
        request: {
          method: 'PUT',
          url: diagnosticReportUrl,
          ifMatch: `W/"${newDiagnosticReport.meta.versionId}"`,
        },
      })

      bundleEntries.push(newDiagnosticReportEntry)
      /* #endregion */

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()

      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        return
      } else {
        throw response
      }
    },
  },
})
