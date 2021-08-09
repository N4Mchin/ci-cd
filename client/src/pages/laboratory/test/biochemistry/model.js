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
  namespace: 'laboratory_test_biochemistryTests',
  state: {
    rowIndex: -1,
    modalRapidTestProtocolVisible: false,
    modalReagentConsumptionLogVisible: false,
    modalTestLogVisible: false,
    modalRapidTestProtocolPrintVisible: false,
    modalData: {},
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
          FHIR_CODES.BiochemistryTests
        )

        console.log(dataSource)
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

      const observationIdentifier = {
        ...globalState.FHIR_CODES.Identifiers.Observations,
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

      const bundleEntries = []
      const parentObservationArray = []

      // cleaning object
      Object.keys(testResult).forEach(testKey => {
        try {
          Object.keys(testResult[testKey].include).forEach(subTestKey => {
            if (testResult[testKey].include[subTestKey] === undefined) {
              delete testResult[testKey].include[subTestKey]
            }
          })
        } catch {}

        if (
          testResult[testKey] &&
          helper.isEmptyObject(testResult[testKey].include)
        ) {
          delete testResult[testKey]
        }
      })

      Object.keys(testResult).forEach(testKey => {
        if (!testResult[testKey] || !testResult[testKey].include) return

        /* #region  CHILD OBSERVATION */

        const observationArray = Object.keys(testResult[testKey].include).map(
          subTestKey => {
            const {
              code,
              referenceRange,
              unit,
            } = globalState.FHIR_CODES.BiochemistryTests.include[
              testKey
            ].include[subTestKey]

            let valueQuantity

            if (!isNaN(parseFloat(testResult[testKey].include[subTestKey]))) {
              valueQuantity = {
                value: parseFloat(testResult[testKey].include[subTestKey]),
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
              basedOn: [
                testData.include[testKey].include[subTestKey].serviceRequestRef,
              ],
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
            return observationEntry
          }
        )
        /* #endregion */

        /* #region  PARENT OBSERVATION */
        const parentCode =
          globalState.FHIR_CODES.BiochemistryTests.include[testKey].code
        const parentReferenceRange =
          globalState.FHIR_CODES.BiochemistryTests.include[testKey]
            .referenceRange

        const parentObservation = new Observation({
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
          code: parentCode,
          // device
          referenceRange: parentReferenceRange && parentReferenceRange,
          hasMember: observationArray.map(o => {
            return { reference: o.fullUrl }
          }),
        })

        const parentObservationEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: parentObservation,
          request: {
            method: 'POST',
            url: parentObservation.resourceType,
          },
        })

        bundleEntries.push(parentObservationEntry)
        parentObservationArray.push(parentObservationEntry)
        /* #endregion */
      })

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
        result: parentObservationArray.map(o => {
          return { reference: o.fullUrl, type: 'Observation' }
        }),
      }

      /* #region  REGULATORY NOTES */
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
      const localState = state.laboratory_test_biochemistryTests
      const { testData, testResult, regulatoryNotes } = payload

      // cleaning object
      Object.keys(testResult).forEach(testKey => {
        try {
          Object.keys(testResult[testKey].include).forEach(subTestKey => {
            if (testResult[testKey].include[subTestKey] === undefined) {
              delete testResult[testKey].include[subTestKey]
            }
          })
        } catch {}
        if (
          testResult[testKey] &&
          helper.isEmptyObject(testResult[testKey].include)
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

      Object.keys(testResult).forEach(testKey => {
        if (!testResult[testKey] || !testResult[testKey].include) return
        // let parentObservation

        let updateParent = false
        const newParentObservationData = {
          ...testData.include[testKey].latestObservation,
        }

        Object.keys(testResult[testKey].include).forEach(subTestKey => {
          const {
            code,
            referenceRange,
            unit,
          } = globalState.FHIR_CODES.BiochemistryTests.include[testKey].include[
            subTestKey
          ]

          const value = parseFloat(testResult[testKey].include[subTestKey])
          if (isNaN(value)) {
            throw new Error('value should be float')
          }

          const valueQuantity = {
            value: value,
            unit: unit,
          }

          const latestChildObservation =
            testData.include[testKey].include[subTestKey].latestObservation

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
            basedOn: [
              testData.include[testKey].include[subTestKey].serviceRequestRef,
            ],
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

          const memberIndex = newParentObservationData.hasMember.findIndex(
            member =>
              member.reference.endsWith(
                helper.getReferenceUrl(latestChildObservation)
              )
          )

          if (memberIndex === -1) {
            throw new Error('observation member not found')
          }

          newParentObservationData.hasMember[memberIndex] = {
            reference: newObservationEntry.fullUrl,
            type: 'Observation',
          }

          updateParent = true
        })

        /* #region  UPDATE PARENT OBSERVATION */

        if (updateParent) {
          const newParentObservation = new Observation(newParentObservationData)

          const newParentObservationUrl = helper.getReferenceUrl(
            newParentObservation
          )

          const newParentObservationEntry = new BundleEntry({
            fullUrl: newParentObservationUrl,
            resource: newParentObservation,
            request: {
              method: 'PUT',
              url: newParentObservationUrl,
              ifMatch: `W/"${newParentObservation.meta.versionId}"`,
            },
          })

          bundleEntries.push(newParentObservationEntry)
        }

        /* #endregion */
      })
      const updatedDiagnosticReportData = {
        ...testData.diagnosticReport.toJSON(),
        status: 'partial',
      }
      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry
      let updatedDiagnosticReportEntry

      if (
        regulatoryNotes &&
        testData.regulatoryNotesValue &&
        regulatoryNotes === testData.regulatoryNotesValue
      ) {
        // no changes
      } else if (!regulatoryNotes && testData.regulatoryNotesValue) {
        // delete
        regulatoryNotesObservationEntry = new BundleEntry({
          request: {
            method: 'DELETE',
            url: helper.getReferenceUrl(testData.regulatoryNotesObservation),
          },
        })

        updatedDiagnosticReportData.result = updatedDiagnosticReportData.result.filter(
          res =>
            !res.reference.endsWith(
              helper.getReferenceUrl(testData.regulatoryNotesObservation)
            )
        )
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

        updatedDiagnosticReportData.result = [
          ...updatedDiagnosticReportData.result,
          {
            reference: regulatoryNotesObservationEntry.fullUrl,
            type: 'Observation',
          },
        ]
      }

      regulatoryNotesObservationEntry &&
        bundleEntries.push(regulatoryNotesObservationEntry)

      /* #region  Update diagnostic report */
      const updatedDiagnosticReportUrl = helper.getReferenceUrl(
        updatedDiagnosticReportData
      )

      const updatedDiagnosticReport = new DiagnosticReport(
        updatedDiagnosticReportData
      )

      updatedDiagnosticReportEntry = new BundleEntry({
        fullUrl: updatedDiagnosticReportUrl,
        resource: updatedDiagnosticReport,
        request: {
          method: 'PUT',
          url: updatedDiagnosticReportUrl,
          ifMatch: `W/"${updatedDiagnosticReportData.meta.versionId}"`,
        },
      })
      /* #endregion */

      bundleEntries.push(updatedDiagnosticReportEntry)

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
