import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'api'
import {
  observation as Observation,
  diagnosticreport as DiagnosticReport,
  bundleentry as BundleEntry,
  bundle as Bundle,
  servicerequest as ServiceRequest,
} from 'schemas'
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import * as controller from 'utils/controller'

const { readResource, batch_transaction_request } = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_test_hematology',
  state: {
    Hematology: {},
    SUB_TEST_NAMES: [],
    bundle: {},
    codeList: [],
    pagination: {},
    selectedRowKeys: [],
    dataSource: [],
    resourceArray: [],
    rowData: {},
    selectedRowIndex: -1,
    modalHematologyEverydayProtocolVisible: false,
    modalProtocolVisible: false,
    modalReagentConsumptionLogVisible: false,
    modalTestLogVisible: false,
    ModalHematologyProtocolPrint: false,
    modalConfirmationTestProtocolVisible: false,
  },

  effects: {
    *queryLabTestResult({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      if (!payload.serviceRequestId) {
        throw new Error('serviceRequestId not defined')
      }

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
          FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology
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

      const state = yield select(state => state)
      const globalState = state.app

      const localState = state.laboratory_test_hematology

      const defaults = {
        status: 'preliminary',
        subject: testData.subject,
        issued: dateTime.getInstant(),
        performer: [
          globalState.Organization.getReference(),
          globalState.Practitioner.getReference(),
        ],
      }

      const bundleEntries = []
      const observationArray = []

      /* #region  CHILD OBSERVATION */
      Object.keys(testResult).forEach(testKey => {
        const {
          code,
          referenceRange,
          unit,
        } = globalState.FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology.include[
          testKey
        ]

        let valueQuantity

        if (
          testResult[testKey] === undefined ||
          testResult[testKey] === '' ||
          isNaN(parseFloat(testResult[testKey]))
        ) {
          throw new Error('Value invalid')
        } else {
          valueQuantity = {
            value: parseFloat(testResult[testKey]),
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

        const observation = new Observation({
          ...defaults,
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
          basedOn: [testData.include[testKey].serviceRequestRef],
          category: [globalState.FHIR_CODES.Categories.Laboratory],
          code: code,
          valueQuantity: valueQuantity,
          // device
          interpretation: interpretation && interpretation,
          referenceRange: relatedReferenceRange && {
            low: relatedReferenceRange.low,
            high: relatedReferenceRange.high,
          },
        })

        const observationEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: observation,
          request: {
            method: 'POST',
            url: observation.resourceType,
          },
        })

        bundleEntries.push(observationEntry)
        observationArray.push(observationEntry)
      })

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
        basedOn: [testData.serviceRequestRef],
        // category: [],
        code: testData.serviceRequest.code,
        specimen:
          testData.specimen &&
          testData.specimen.map(sp => helper.getReference(sp)),
        result: observationArray.map(o => {
          return { reference: o.fullUrl, type: 'Observation' }
        }),
      }

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (regulatoryNotes && regulatoryNotes !== '') {
        const regulatoryNotesObservation = new Observation({
          ...defaults,
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
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

      if (regulatoryNotesObservationEntry) {
        diagnosticReportData.result.push({
          reference: regulatoryNotesObservationEntry.fullUrl,
          type: 'Observation',
        })
      }

      /* #region  DIAGNOSTIC REPORT */

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
      /* #endregion */

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

    *editResult({ payload = {} }, { call, put, select }) {
      const state = yield select(state => state)
      const globalState = state.app

      const { testData, testCode, testResult, regulatoryNotes } = payload

      // cleaning object
      Object.keys(testResult).forEach(testKey => {
        if (
          !testResult[testKey] ||
          testResult[testKey] === undefined ||
          isNaN(parseFloat(testResult[testKey]))
        ) {
          delete testResult[testKey]
        }
      })

      const bundleEntries = []

      const defaults = {
        status: 'preliminary',
        subject: testData.subject,
        issued: dateTime.getInstant(),
        performer: [
          globalState.Organization.getReference(),
          globalState.Practitioner.getReference(),
        ],
      }

      const updatedDiagnosticReportData = {
        ...testData.diagnosticReport.toJSON(),
      }

      Object.keys(testResult).forEach(testKey => {
        const {
          code,
          referenceRange,
          unit,
        } = globalState.FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology.include[
          testKey
        ]

        let valueQuantity

        if (
          testResult[testKey] === undefined ||
          testResult[testKey] === '' ||
          isNaN(parseFloat(testResult[testKey]))
        ) {
          throw new Error('Value invalid')
        } else {
          valueQuantity = {
            value: parseFloat(testResult[testKey]),
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

        const latestChildObservation =
          testData.include[testKey].latestObservation

        /* #region  CANCEL OBSERVATION */

        if (latestChildObservation.status !== 'cancelled') {
          const cancelledObservation = new Observation({
            ...latestChildObservation.toJSON(),
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

        const newObservationData = {
          ...defaults,
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
          basedOn: [testData.include[testKey].serviceRequestRef],
          category: [globalState.FHIR_CODES.Categories.Laboratory],
          code: code,
          valueQuantity: valueQuantity,
          // device
          interpretation: interpretation && interpretation,
          referenceRange: relatedReferenceRange && {
            low: relatedReferenceRange.low,
            high: relatedReferenceRange.high,
          },
          extension: [
            {
              ...globalState.FHIR_CODES.Extensions.ObservationReplaces,
              valueReference: helper.getReference(latestChildObservation),
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

        const resultIndex = updatedDiagnosticReportData.result.findIndex(
          resultItem =>
            resultItem.reference.endsWith(
              helper.getReferenceUrl(latestChildObservation)
            )
        )

        if (resultIndex === -1) {
          throw new Error('Diagnostic report result not found')
        }

        updatedDiagnosticReportData.result[resultIndex] = {
          reference: newObservationEntry.fullUrl,
          type: 'Observation',
        }
      })

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (
        regulatoryNotes &&
        testData.regulatoryNotesValue &&
        regulatoryNotes === testData.regulatoryNotesValue
      ) {
        // no changes
        updatedDiagnosticReportData.result.push(
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
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
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
      } else if (regulatoryNotes && !testData.regulatoryNotesValue) {
        // post
        const newRegulatoryNotesObservation = new Observation({
          ...defaults,
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
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

        updatedDiagnosticReportData.result.push({
          reference: regulatoryNotesObservationEntry.fullUrl,
          type: 'Observation',
        })
      }

      regulatoryNotesObservationEntry &&
        bundleEntries.push(regulatoryNotesObservationEntry)

      /* #region  DIAGNOSTIC REPORT */
      const updatedDiagnosticReport = new DiagnosticReport(
        updatedDiagnosticReportData
      )
      const updatedDiagnosticReportUrl = helper.getReferenceUrl(
        updatedDiagnosticReport
      )
      const updatedDiagnosticReportEntry = new BundleEntry({
        fullUrl: updatedDiagnosticReportUrl,
        resource: updatedDiagnosticReport,
        request: {
          method: 'PUT',
          url: updatedDiagnosticReportUrl,
          ifMatch: `W/"${updatedDiagnosticReport.meta.versionId}"`,
        },
      })

      bundleEntries.push(updatedDiagnosticReportEntry)
      /* #endregion */

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
