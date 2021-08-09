/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { RESULT_STATUS } from 'utils/constant'
import * as controller from 'utils/controller'
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import {
  bundle as Bundle,
  bundleentry as BundleEntry,
  diagnosticreport as DiagnosticReport,
  observation as Observation,
  servicerequest as ServiceRequest,
} from 'schemas'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

const {
  queryTestResultVerification,
  readResource,
  batch_transaction_request,
} = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_testResultVerification',

  state: {
    bundle: {},
    codeList: [],
    pagination: {},
    selectedRowKeys: [],
    total: {},
  },

  effects: {
    *init({ payload }, { put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      if (!FHIR_CODES) {
        return
      }

      const {
        UncategorizedTests,
        BiochemistryTests,
        ImmunologyTests,
      } = FHIR_CODES

      const {
        RapidTests,
        ViralLoadTests,
        OtherTests = {},
        Genotype,
      } = UncategorizedTests
      const {
        Hematology,
        ESR,
        Urinalysis,
        Coagulation,
        Vitamin_D3,
        Sars_Cov2_IgG,
        Sars_Cov2_IgG_Elisa,
        Ferritin,
        Anti_HDV,
      } = OtherTests.include

      const LabTests = {
        ...ViralLoadTests.include,
        RapidTests,
        BiochemistryTests,
        Hematology,
        ImmunologyTests,
        Vitamin_D3,
        Sars_Cov2_IgG,
        Sars_Cov2_IgG_Elisa,
        Ferritin,
        Anti_HDV,
        Coagulation,
        Genotype,
        Urinalysis,
        ESR,
      }

      yield put({
        type: 'updateState',
        payload: {
          LabTests: LabTests,
        },
      })
    },

    *queryCount({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      if (!FHIR_CODES) {
        return
      }

      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.laboratory_testResultVerification
      )

      const requestBundle = new Bundle({
        type: 'transaction',
        entry: [
          {
            request: {
              method: 'GET',
              url: [
                `DiagnosticReport`,
                `?status=partial`,
                `&identifier=${FHIR_CODES.Identifiers.DiagnosticReport.system}|`,
                `&_count=1`,
                `&performer=Organization/${globalState.Organization.id}`,
                // '&based-on:ServiceRequest.status=completed',
              ].join(''),
            },
          },
          {
            request: {
              method: 'GET',
              url: [
                `DiagnosticReport`,
                `?status=preliminary`,
                `&identifier=${FHIR_CODES.Identifiers.DiagnosticReport.system}|`,
                `&_count=1`,
                `&performer=Organization/${globalState.Organization.id}`,
                // '&based-on:ServiceRequest.status=completed',
              ].join(''),
            },
          },
          {
            request: {
              method: 'GET',
              url: [
                `DiagnosticReport`,
                `?status=final`,
                `&identifier=${FHIR_CODES.Identifiers.DiagnosticReport.system}|`,
                `&_count=1`,
                `&performer=Organization/${globalState.Organization.id}`,
                // '&based-on:ServiceRequest.status=completed',
              ].join(''),
            },
          },
        ],
      })

      const json = requestBundle.toJSON()

      const response = yield call(batch_transaction_request, json)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const responseBundle = new Bundle(response.data)

      if (responseBundle.entry.length === 0) {
        return []
      }

      const partial = responseBundle.entry[0].response.data.total
      const preliminary = responseBundle.entry[1].response.data.total
      const final = responseBundle.entry[2].response.data.total

      yield put({
        type: 'updateState',
        payload: {
          total: {
            EnteredResults: partial,
            ResultsToReverify: preliminary,
            VerifiedResults: final,
          },
        },
      })
    },

    *queryResultEntered({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      if (!FHIR_CODES) {
        return
      }

      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.laboratory_testResultVerification
      )

      const { LabTests } = localState

      const emptyResponse = {
        dataSource: [],
        pagination: {},
      }

      const requestPayload = {
        resourceType: 'DiagnosticReport',
        status: 'partial',
        identifier: `${FHIR_CODES.Identifiers.DiagnosticReport.system}|`,
        _include: [
          'DiagnosticReport:patient',
          'DiagnosticReport:based-on',
          'DiagnosticReport:specimen',
          'DiagnosticReport:result',
        ],
        '_include:iterate': [
          'Observation:has-member',
          'ServiceRequest:based-on',
        ],
        // 'based-on:ServiceRequest.status': 'completed',
        performer: `Organization/${globalState.Organization.id}`,
        '_revinclude:iterate': ['ServiceRequest:based-on'],
        _count: payload._count,
        _page: payload._page,
        // _sort: '-issued',
        _sort: '-_lastUpdated',
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return emptyResponse
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle.entry || bundle.entry.length === 0) {
        return emptyResponse
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const testListData = resourceDictionary['DiagnosticReport'].map(
        diagnosticReport => {
          const patient = resourceDictionary['Patient'].find(
            p =>
              diagnosticReport.subject.reference === helper.getReferenceUrl(p)
          )

          const serviceRequest = resourceDictionary['ServiceRequest'].find(
            sr =>
              diagnosticReport.basedOn &&
              diagnosticReport.basedOn.some(basedOnRef =>
                basedOnRef.reference.endsWith(helper.getReferenceUrl(sr))
              )
          )

          let testKey
          let testName
          let testCode

          try {
            testKey = Object.keys(LabTests).find(
              labTestKey =>
                diagnosticReport.code &&
                controller.codeIntersects(
                  LabTests[labTestKey].code,
                  diagnosticReport.code
                )
            )

            testCode = LabTests[testKey]
            testName = LabTests[testKey].display
          } catch (exception) {
            console.log(exception)
          }

          const data = {
            key: diagnosticReport.id,
            diagnosticReport: diagnosticReport,
            patient: patient,
            patientNumber: patient._getBarcode(),
            firstName: patient.getFirstName(),
            lastName: patient.getLastName(),
            NInum: patient.getNationalIdentificationNumber(),
            emails: patient.getEmails(),
            mobilePhones: patient.getMobilePhones(),
            testKey: testKey,
            testName: testName,
            testCode: testCode,
          }

          if (serviceRequest) {
            const resourceGroup = controller.buildTestDataTree(
              resourceArray,
              diagnosticReport,
              LabTests[testKey]
            )

            const testData = resourceGroup
            const containsCancelledObservation = controller.hasCancelled(
              resourceGroup
            )
            const hadContainedCancelledObservation = controller.hadBeenCancelled(
              resourceGroup
            )

            let specimen
            let latestCollectionDateTime
            let latestAccessionIdentifier

            try {
              specimen = resourceDictionary['Specimen'].filter(sp =>
                diagnosticReport.specimen.some(spRef =>
                  spRef.reference.endsWith(helper.getReferenceUrl(sp))
                )
              )

              let latestSpecimen = helper
                .sortByDate(specimen, 'collection.collectedDateTime')
                .slice()
                .pop()

              latestAccessionIdentifier =
                latestSpecimen.accessionIdentifier.system ===
                  FHIR_CODES.Identifiers.LiverCenter.Specimen.system &&
                latestSpecimen.accessionIdentifier.value
              latestCollectionDateTime =
                latestSpecimen.collection.collectedDateTime
            } catch (exception) {
              console.log(exception)
            }

            let status

            if (diagnosticReport.status === 'partial') {
              status = RESULT_STATUS.entered
            } else if (diagnosticReport.status === 'preliminary') {
              status = RESULT_STATUS.reVerificationRequired
            } else if (diagnosticReport.status === 'final') {
              if (containsCancelledObservation) {
                status = RESULT_STATUS.reVerified
              } else {
                status = RESULT_STATUS.verified
              }
            }

            Object.assign(data, {
              specimen: specimen,
              sampleAccessionIdentifier: latestAccessionIdentifier,
              sampleCollectionDateTime: dateTime.toLocalDateTime(
                latestCollectionDateTime,
                'yyyy-mm-dd hh:mm'
              ),
              ...testData,
              serviceRequest,
              serviceRequestId: serviceRequest.id,
              status: status,
              containsCancelledObservation: containsCancelledObservation,
              hadContainedCancelledObservation: hadContainedCancelledObservation,
            })
          }

          return data
        }
      )

      yield put({
        type: 'updateState',
        payload: {
          dataSource: testListData,
          bundle: bundle,
        },
      })

      const result = {
        dataSource: testListData,
        pagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: bundle.total,
        },
      }

      return result
    },

    *queryResultVerificationRequired({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.laboratory_testResultVerification
      )

      const { LabTests } = localState

      const emptyResponse = {
        dataSource: [],
        pagination: {},
      }

      const requestPayload = {
        resourceType: 'DiagnosticReport',
        status: 'preliminary',
        identifier: `${FHIR_CODES.Identifiers.DiagnosticReport.system}|`,
        _include: [
          'DiagnosticReport:patient',
          'DiagnosticReport:based-on',
          'DiagnosticReport:specimen',
          'DiagnosticReport:result',
        ],
        // 'based-on:ServiceRequest.status': 'completed',
        performer: `Organization/${globalState.Organization.id}`,
        '_include:iterate': ['Observation:has-member'],
        '_revinclude:iterate': ['ServiceRequest:based-on'],
        _count: payload._count,
        _page: payload._page,
        // _sort: '-issued',
        _sort: '-_lastUpdated',
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return emptyResponse
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle.entry || bundle.entry.length === 0) {
        return emptyResponse
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const testListData = resourceDictionary['DiagnosticReport'].map(
        diagnosticReport => {
          const patient = resourceDictionary['Patient'].find(
            p =>
              diagnosticReport.subject.reference === helper.getReferenceUrl(p)
          )

          const serviceRequest = resourceDictionary['ServiceRequest'].find(
            sr =>
              diagnosticReport.basedOn &&
              diagnosticReport.basedOn.some(basedOnRef =>
                basedOnRef.reference.endsWith(helper.getReferenceUrl(sr))
              )
          )

          let testKey
          let testName
          let testCode

          try {
            testKey = Object.keys(LabTests).find(
              labTestKey =>
                diagnosticReport.code &&
                controller.codeIntersects(
                  LabTests[labTestKey].code,
                  diagnosticReport.code
                )
            )

            testCode = LabTests[testKey]
            testName = LabTests[testKey].display
          } catch (exception) {
            console.log(exception)
          }

          const data = {
            key: diagnosticReport.id,
            diagnosticReport: diagnosticReport,
            patient: patient,
            patientNumber: patient._getBarcode(),
            firstName: patient.getFirstName(),
            lastName: patient.getLastName(),
            NInum: patient.getNationalIdentificationNumber(),
            emails: patient.getEmails(),
            mobilePhones: patient.getMobilePhones(),
            testKey: testKey,
            testName: testName,
            testCode: testCode,
          }

          if (serviceRequest) {
            const resourceGroup = controller.buildTestDataTree(
              resourceArray,
              diagnosticReport,
              LabTests[testKey]
            )

            const testData = resourceGroup
            const containsCancelledObservation = controller.hasCancelled(
              resourceGroup
            )
            const hadContainedCancelledObservation = controller.hadBeenCancelled(
              resourceGroup
            )

            let specimen
            let latestCollectionDateTime
            let latestAccessionIdentifier

            try {
              specimen = resourceDictionary['Specimen'].filter(sp =>
                diagnosticReport.specimen.some(spRef =>
                  spRef.reference.endsWith(helper.getReferenceUrl(sp))
                )
              )

              let latestSpecimen = helper
                .sortByDate(specimen, 'collection.collectedDateTime')
                .slice()
                .pop()

              latestAccessionIdentifier =
                latestSpecimen.accessionIdentifier.system ===
                  FHIR_CODES.Identifiers.LiverCenter.Specimen.system &&
                latestSpecimen.accessionIdentifier.value
              latestCollectionDateTime =
                latestSpecimen.collection.collectedDateTime
            } catch (exception) {
              console.log(exception)
            }

            let status

            if (diagnosticReport.status === 'partial') {
              status = RESULT_STATUS.entered
            } else if (diagnosticReport.status === 'preliminary') {
              status = RESULT_STATUS.reVerificationRequired
            } else if (diagnosticReport.status === 'final') {
              if (containsCancelledObservation) {
                status = RESULT_STATUS.reVerified
              } else {
                status = RESULT_STATUS.verified
              }
            }

            Object.assign(data, {
              specimen: specimen,
              sampleAccessionIdentifier: latestAccessionIdentifier,
              sampleCollectionDateTime: dateTime.toLocalDateTime(
                latestCollectionDateTime,
                'yyyy-mm-dd hh:mm'
              ),
              ...testData,
              serviceRequest,
              serviceRequestId: serviceRequest.id,
              status: status,
              containsCancelledObservation: containsCancelledObservation,
              hadContainedCancelledObservation: hadContainedCancelledObservation,
            })
          }

          return data
        }
      )

      yield put({
        type: 'updateState',
        payload: {
          dataSource: testListData,
          bundle: bundle,
        },
      })

      const result = {
        dataSource: testListData,
        pagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: bundle.total,
        },
      }

      return result
    },

    *queryResultVerified({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.laboratory_testResultVerification
      )

      const { LabTests } = localState

      const emptyResponse = {
        dataSource: [],
        pagination: {},
      }

      const requestPayload = {
        resourceType: 'DiagnosticReport',
        status: 'final',
        identifier: `${FHIR_CODES.Identifiers.DiagnosticReport.system}|`,
        _include: [
          'DiagnosticReport:patient',
          'DiagnosticReport:based-on',
          'DiagnosticReport:specimen',
          'DiagnosticReport:result',
        ],
        // '_has:ServiceRequest:based-on:status': 'completed',
        // 'based-on:ServiceRequest.status': 'completed',
        performer: `Organization/${globalState.Organization.id}`,
        '_include:iterate': ['Observation:has-member'],
        '_revinclude:iterate': ['ServiceRequest:based-on'],
        _count: payload._count,
        _page: payload._page,
        // _sort: '-issued',
        _sort: '-_lastUpdated',
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return emptyResponse
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle.entry || bundle.entry.length === 0) {
        return emptyResponse
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const testListData = resourceDictionary['DiagnosticReport'].map(
        diagnosticReport => {
          const patient = resourceDictionary['Patient'].find(
            p =>
              diagnosticReport.subject.reference === helper.getReferenceUrl(p)
          )

          const serviceRequest = resourceDictionary['ServiceRequest'].find(
            sr =>
              diagnosticReport.basedOn &&
              diagnosticReport.basedOn.some(basedOnRef =>
                basedOnRef.reference.endsWith(helper.getReferenceUrl(sr))
              )
          )

          let testKey
          let testName
          let testCode

          try {
            testKey = Object.keys(LabTests).find(
              labTestKey =>
                diagnosticReport.code &&
                controller.codeIntersects(
                  LabTests[labTestKey].code,
                  diagnosticReport.code
                )
            )

            testCode = LabTests[testKey]
            testName = LabTests[testKey].display
          } catch (exception) {
            console.log(exception)
          }

          const data = {
            key: diagnosticReport.id,
            diagnosticReport: diagnosticReport,
            patient: patient,
            patientNumber: patient._getBarcode(),
            firstName: patient.getFirstName(),
            lastName: patient.getLastName(),
            NInum: patient.getNationalIdentificationNumber(),
            emails: patient.getEmails(),
            mobilePhones: patient.getMobilePhones(),
            testKey: testKey,
            testName: testName,
            testCode: testCode,
            serviceRequest: serviceRequest,
            serviceRequestId: serviceRequest && serviceRequest.id,
          }

          if (serviceRequest) {
            const resourceGroup = controller.buildTestDataTree(
              resourceArray,
              diagnosticReport,
              LabTests[testKey]
            )

            const testData = resourceGroup
            const containsCancelledObservation = controller.hasCancelled(
              resourceGroup
            )
            const hadContainedCancelledObservation = controller.hadBeenCancelled(
              resourceGroup
            )

            let specimen
            let latestCollectionDateTime
            let latestAccessionIdentifier

            try {
              specimen = resourceDictionary['Specimen'].filter(sp =>
                diagnosticReport.specimen.some(spRef =>
                  spRef.reference.endsWith(helper.getReferenceUrl(sp))
                )
              )

              let latestSpecimen = helper
                .sortByDate(specimen, 'collection.collectedDateTime')
                .slice()
                .pop()

              latestAccessionIdentifier =
                latestSpecimen.accessionIdentifier.system ===
                  FHIR_CODES.Identifiers.LiverCenter.Specimen.system &&
                latestSpecimen.accessionIdentifier.value
              latestCollectionDateTime =
                latestSpecimen.collection.collectedDateTime
            } catch (exception) {
              console.log(exception)
            }

            let status

            if (diagnosticReport.status === 'partial') {
              status = RESULT_STATUS.entered
            } else if (diagnosticReport.status === 'preliminary') {
              status = RESULT_STATUS.reVerificationRequired
            } else if (diagnosticReport.status === 'final') {
              if (containsCancelledObservation) {
                status = RESULT_STATUS.reVerified
              } else {
                status = RESULT_STATUS.verified
              }
            }

            Object.assign(data, {
              specimen: specimen,
              sampleAccessionIdentifier: latestAccessionIdentifier,
              sampleCollectionDateTime: dateTime.toLocalDateTime(
                latestCollectionDateTime,
                'yyyy-mm-dd hh:mm'
              ),
              ...testData,
              serviceRequest: serviceRequest,
              serviceRequestId: serviceRequest && serviceRequest.id,
              status: status,
              containsCancelledObservation: containsCancelledObservation,
              hadContainedCancelledObservation: hadContainedCancelledObservation,
            })
          }

          return data
        }
      )

      yield put({
        type: 'updateState',
        payload: {
          dataSource: testListData,
          bundle: bundle,
        },
      })
      const result = {
        dataSource: testListData,
        pagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: bundle.total,
        },
      }

      return result
    },

    *verifyTestResult({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { labResult, labReportDocument } = payload

      const bundleEntries = []

      const {
        diagnosticReport,
        emails,
        mobilePhones,
        serviceRequest,
      } = labResult

      console.log(labResult)

      const latestObservations = collectLatestObservation(labResult)

      latestObservations.forEach(latestObservation => {
        const updatedObservation = new Observation({
          ...latestObservation.toJSON(),
          status: 'final',
        })

        const updatedObservationFullUrl = helper.getReferenceUrl(
          updatedObservation
        )

        const updatedObservationEntry = new BundleEntry({
          fullUrl: updatedObservationFullUrl,
          resource: updatedObservation,
          request: {
            method: 'PUT',
            url: updatedObservationFullUrl,
            ifMatch: `W/"${updatedObservation.meta.versionId}"`,
          },
        })

        bundleEntries.push(updatedObservationEntry)
      })

      const updatedDiagnosticReport = new DiagnosticReport({
        ...diagnosticReport.toJSON(),
        status: 'final',
        performer: [
          globalState.Organization.getReference(),
          globalState.Practitioner.getReference(),
        ],
      })

      const diagnosticReportFullUrl = helper.getReferenceUrl(
        updatedDiagnosticReport
      )

      const diagnosticReportEntry = new BundleEntry({
        fullUrl: diagnosticReportFullUrl,
        resource: updatedDiagnosticReport,
        request: {
          method: 'PUT',
          url: diagnosticReportFullUrl,
          ifMatch: `W/"${updatedDiagnosticReport.meta.versionId}"`,
        },
      })

      bundleEntries.push(diagnosticReportEntry)

      const updatedServiceRequest = new ServiceRequest({
        ...serviceRequest.toJSON(),
        status: 'completed',
      })

      const serviceRequestFullUrl = helper.getReferenceUrl(
        updatedServiceRequest
      )
      const serviceRequestEntry = new BundleEntry({
        fullUrl: serviceRequestFullUrl,
        resource: updatedServiceRequest,
        request: {
          method: 'PUT',
          url: serviceRequestFullUrl,
          ifMatch: `W/"${updatedServiceRequest.meta.versionId}"`,
        },
      })

      bundleEntries.push(serviceRequestEntry)

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()

      const requestPayload = {
        contactPoint: {
          mobilePhones: mobilePhones,
          emails: emails,
        },
        transaction: json,
        rootServiceRequest: labResult.serviceRequest,
        patientId: labResult.patient.id,
        labReportDocument: labReportDocument,
      }

      const response = yield call(queryTestResultVerification, requestPayload)

      if (response && response.success) {
        return response
      } else {
        throw response
      }
    },

    *requestReVerification({ payload = {} }, { call, put, select }) {
      const { data } = payload

      const bundleEntries = []

      const diagnosticReport = data.find(v => v.diagnosticReport)
        .diagnosticReport

      data.forEach(item => {
        const latestChildObservations = collectChildObservation(item)

        latestChildObservations.forEach(latestChildObservation => {
          const cancelledObservation = new Observation({
            ...latestChildObservation.toJSON(),
            status: 'cancelled',
          })

          const cancelledObservationFullUrl = helper.getReferenceUrl(
            cancelledObservation
          )

          const observationEntry = new BundleEntry({
            fullUrl: cancelledObservationFullUrl,
            resource: cancelledObservation,
            request: {
              method: 'PUT',
              url: cancelledObservationFullUrl,
              ifMatch: `W/"${cancelledObservation.meta.versionId}"`,
            },
          })

          bundleEntries.push(observationEntry)
        })
      })

      const updatedDiagnosticReport = new DiagnosticReport({
        ...diagnosticReport.toJSON(),
        status: 'preliminary',
      })

      const diagnosticReportFullUrl = helper.getReferenceUrl(
        updatedDiagnosticReport
      )

      const diagnosticReportEntry = new BundleEntry({
        fullUrl: diagnosticReportFullUrl,
        resource: updatedDiagnosticReport,
        request: {
          method: 'PUT',
          url: diagnosticReportFullUrl,
          ifMatch: `W/"${updatedDiagnosticReport.meta.versionId}"`,
        },
      })

      bundleEntries.push(diagnosticReportEntry)

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()

      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        yield put({
          type: 'refresh',
        })

        return
      } else {
        throw response
      }
    },
  },
})

function collectLatestObservation(data, observation = []) {
  if (data.include) {
    Object.keys(data.include).forEach(includeItemKey =>
      collectChildObservation(data.include[includeItemKey], observation)
    )
  }

  if (data.latestObservation) {
    observation.push(data.latestObservation)
  }

  return observation
}

function collectChildObservation(data, observation = []) {
  if (data.include) {
    Object.keys(data.include).forEach(includeItemKey =>
      collectChildObservation(data.include[includeItemKey], observation)
    )
  } else if (data.latestObservation) {
    observation.push(data.latestObservation)
  }

  return observation
}
