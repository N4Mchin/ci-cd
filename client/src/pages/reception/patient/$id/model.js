import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import * as dateTime from 'utils/datetime'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
import { ROLE_TYPE } from 'utils/constant'
import api from 'api'
import { isEmpty, isEqual, cloneDeep } from 'lodash'
import {
  address as Address,
  bundle as Bundle,
  bundleentry as BundleEntry,
  condition as Condition,
  extension as Extension,
  identifier as Identifier,
  list as List,
  observation as Observation,
  patient as Patient,
  patientcontact as PatientContact,
  servicerequest as ServiceRequest,
  reference as Reference,
  slot as Slot,
  appointment as Appointment,
} from 'schemas'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

/* #region  api */
const {
  readResource,
  createServiceRequestList,
  queryValuesets,
  getPatient,
  batch_transaction_request,
  sendTestResult,
  cancelLabTestOrder,
  getPendingOrders,
  postPendingOrders,
  getConfirmedOrders,
} = api
/* #endregion */

export default modelExtend(pageModel, {
  namespace: 'reception_patientProfile',

  /* #region  state values */
  state: {
    id: '',
    patientName: '',
    data: {},
    Tests: {},
    SelectedTests: {},
    SelectedTestItems: [],
    DiagnosticTests: {},
    SelectedDiagnosticTests: [],
    PractitionerList: {},
    SelectedPractitioner: {},
    ServiceSets: {},
    SelectedServiceSets: {},
    Checkup: { cost: 0 },
    SelectedCheckup: {},
    patient: {},
    patientId: '',
    patientVid: '',
    observationVid: '',
    observationId: '',
    observation: {},
    modalVisible: false,
    payment: {},
    checkupCost: 0,
    labTestCost: 0,
    diagnosticTestCost: 0,
    totalAmount: 0,
    conditions: [],
    valuesets: [],
    FHIR_CODES: {},
    // patient: {},
    socialHistory: {},
    bodyHeight: {},
    bodyWeight: {},
    bodyMassIndex: {},
    bloodGroupPanel: {},
    bloodGroup: {},
    rhesusStatus: {},
    // vitalSigns: {},
    updatedPatient: {},
    updatedSocialHistory: {},
    updatedBodyHeight: {},
    updatedBodyWeight: {},
    updatedBodyMassIndex: {},
    updatedBloodGroupPanel: {},
    updatedBloodGroup: {},
    updatedRhesusStatus: {},
    updatedVitalSigns: {},
    updatedConditions: {},
    latestPaymentReceipt: {},
    lastUpadtedPrivateInformation: '',
  },
  /* #endregion */

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/reception/patient/:id', pathname)
        if (match) {
          dispatch({
            type: 'init',
          }).then(() => {
            dispatch({ type: 'queryCodeList', payload: {} })
            dispatch({ type: 'downloadValuesets' })
            dispatch({ type: 'queryPractitionerList' })
            dispatch({ type: 'queryPatient', payload: { id: match[1] } })
            // .then(
            //   patient => {
            //     dispatch({ type: 'refresh' })
            //   }
            // )
          })

          // dispatch({ type: 'getPatientInformation', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *refresh({ payload = {} }, { call, put, select }) {
      const { LabTests } = yield select(state => state.app)

      yield put({
        type: 'updateState',
        payload: {
          // used for useEffect dependency array
          updatedAt: dateTime.getInstant(),
          SelectedCheckup: {},
          checkupCost: 0,
          SelectedTests: {},
          SelectedDiagnosticTests: [],
          SelectedTestItems: [],
          LatestLabTests: { ...LabTests },
          LabTestLog: [],
          payment: {},
          totalAmount: 0,
        },
      })
      yield put({
        type: 'queryLabTestHistory',
      })
      yield put({
        type: 'queryLatestLabTest',
      })

      return
    },

    *queryPendingOrders({ payload = {} }, { call, put, select }) {
      const response = yield call(getPendingOrders, {
        patientId: payload.patientId,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      const result = response.data.map(item => {
        item.Date = dateTime.toLocalDateTime(item._createdAt, 'yyyy-mm-dd')
        return item
      })

      return result
    },

    *queryConfirmedOrders({ payload = {} }, { call, put, select }) {
      const response = yield call(getConfirmedOrders, {
        patientId: payload.patientId,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      const result = response.data.map(item => {
        item.date = dateTime.toLocalDateTime(item._createdAt, 'yyyy-mm-dd')
        return item
      })

      return result
    },

    *confirmServiceRequest({ payload = {} }, { call, put, select }) {
      console.log(payload)
      const response = yield call(postPendingOrders, {
        ...payload,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      return
    },
    /* #region  query, init */
    *init({ payload }, { call, put, select }) {
      const FHIR_CODES = yield select(state => state.app.FHIR_CODES)

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
      const { HCV_RNA, HBV_DNA, HDV_RNA, HIV_RNA, HPV } = ViralLoadTests.include
      const {
        ESR,
        Urinalysis,
        Vitamin_D3,
        Ferritin,
        Anti_HDV,
        Hematology,
        Coagulation,
        Sars_Cov2_IgG,
        Sars_Cov2_IgG_Elisa,
      } = OtherTests.include

      const SpecimenRequiredTests = {
        RapidTests,
        HCV_RNA,
        HBV_DNA,
        HDV_RNA,
        HIV_RNA,
        HPV,
        BiochemistryTests,
        Hematology,
        Coagulation,
        ImmunologyTests,
        Vitamin_D3,
        Ferritin,
        Anti_HDV,
        Sars_Cov2_IgG,
        Sars_Cov2_IgG_Elisa,
      }

      const CancellableLabTests = {
        RapidTests,
        HCV_RNA,
        HBV_DNA,
        HDV_RNA,
        HIV_RNA,
        HPV,
        BiochemistryTests,
        Hematology,
        ImmunologyTests,
        Coagulation,
        Genotype,
        Urinalysis,
        ESR,
        Vitamin_D3,
        Ferritin,
        Anti_HDV,
        Sars_Cov2_IgG,
        Sars_Cov2_IgG_Elisa,
      }

      yield put({
        type: 'updateState',
        payload: {
          SpecimenRequiredTests,
          CancellableLabTests,
        },
      })
    },

    *queryPatient({ payload = {} }, { call, put }) {
      const response = yield call(getPatient, payload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const patient = new Patient(response.data)

      yield put({
        type: 'updateState',
        payload: {
          id: patient.id,
          patientId: patient.id,
          patient: patient,
          patientFirstName: patient.getFirstName(),
          patientLastName: patient.getLastName(),
          patientNInum: patient.getNationalIdentificationNumber(),
          patientPhoneNumber: (patient.getMobilePhones() || [])[0],
          patientBarcode: patient._getBarcode(),
          patientReference: patient.getReference(),
        },
      })

      yield put({
        type: 'refresh',
      })

      return patient
    },

    /* #endregion */

    /* #region  Practitioner */
    *queryPractitionerSchedule({ payload = {} }, { call, put }) {
      const requestPayload = {
        resourceType: 'Schedule',
        actor: `Practitioner/${payload.practitionerId}`,
        _revinclude: ['Slot:schedule'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const bundle = new Bundle(response.data)
      if (bundle.entry.length === 0) {
        return
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const ScheduleDataSource = {}

      const Schedule = resourceDictionary['Schedule'].find(schedule =>
        schedule.actor.some(actorItem =>
          actorItem.reference.endsWith(`Practitioner/${payload.practitionerId}`)
        )
      )

      resourceDictionary['Slot'] &&
        resourceDictionary['Slot']
          .filter(slot =>
            slot.schedule.reference.endsWith(helper.getReferenceUrl(Schedule))
          )
          .forEach(slot => {
            const startDate = new Date(slot.start)
            const dateKey = dateTime.toLocalDateTime(startDate, 'yyyy-mm-dd')

            if (!ScheduleDataSource[dateKey]) {
              Object.assign(ScheduleDataSource, { [dateKey]: [] })
            }

            ScheduleDataSource[dateKey].push(slot)
          })

      Object.keys(ScheduleDataSource).forEach(dateKey => {
        ScheduleDataSource[dateKey] = helper.orderBy(
          ScheduleDataSource[dateKey],
          'start',
          'asc'
        )
      })

      return ScheduleDataSource
    },

    *queryPractitionerList({ payload = {} }, { call, put }) {
      const requestPayload = {
        resourceType: 'PractitionerRole',
        role: 'http://terminology.hl7.org/CodeSystem/practitioner-role|doctor',
        'organization.name': 'Элэгний төв лаборатори',
        _include: [
          'PractitionerRole:organization',
          'PractitionerRole:practitioner',
        ],
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const bundle = response.data

      const resourceArray = helper.loadResourceArray(
        bundle.entry.map(bundleEntry => bundleEntry.resource)
      )

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      if (resourceDictionary['Practitioner']) {
        yield put({
          type: 'updateState',
          payload: {
            practitionerList: resourceDictionary['Practitioner'],
          },
        })

        return resourceDictionary['Practitioner']
      } else {
        return []
      }
    },
    /* #endregion */

    /* #region  lab test (result, order)*/
    *queryLabTestResult({ payload = {} }, { call, put, select }) {
      const { LabTests } = yield select(state => state.app)

      if (payload.testKey === 'ViralLoadTests') {
        const requestPayload = {
          resourceType: 'ServiceRequest',
          _id: payload.serviceRequestId,
          _revinclude: ['DiagnosticReport:based-on'],
          _include: ['DiagnosticReport:patient', 'DiagnosticReport:specimen'],
          '_revinclude:iterate': [
            'ServiceRequest:based-on',
            'Observation:based-on',
          ],
        }
        const response = yield call(readResource, requestPayload)

        if (!response.success) {
          if (response.message !== CANCEL_REQUEST_MESSAGE) {
            throw response
          } else {
            return
          }
        }
        const bundle = new Bundle(response.data)

        if (bundle.entry.length === 0) {
          return
        }
        const resourceArray = helper.loadResourceArray(
          bundle.getResourcesOnly()
        )
        const testResults = controller.recursiveTestDataBuilder(
          resourceArray,
          LabTests[payload.testKey]
        )

        return testResults
      } else {
        const requestPayload = {
          resourceType: 'ServiceRequest',
          _id: payload.serviceRequestId,
          _include: ['ServiceRequest:patient'],
          _revinclude: ['DiagnosticReport:based-on'],
          '_include:iterate': [
            'DiagnosticReport:result',
            'DiagnosticReport:performer',
            'DiagnosticReport:specimen',
            'Observation:has-member',
            'Observation:performer',
          ],
          '_revinclude:iterate': [
            'ServiceRequest:based-on',
            'Observation:based-on',
          ],
        }

        const response = yield call(readResource, requestPayload)

        if (!response.success) {
          if (response.message !== CANCEL_REQUEST_MESSAGE) {
            throw response
          } else {
            return
          }
        }

        const bundle = new Bundle(response.data)

        if (bundle.entry.length === 0) {
          return
        }
        const resourceArray = helper.loadResourceArray(
          bundle.getResourcesOnly()
        )

        const testResults = controller.recursiveTestDataBuilder(
          resourceArray,
          LabTests[payload.testKey]
        )

        const resourceDictionary = controller.createResourceDictionary(
          resourceArray
        )

        const diagnosticReport = resourceDictionary[
          'DiagnosticReport'
        ].find(dr =>
          controller.containsReference(
            dr.basedOn,
            helper.getReferenceUrl(testResults.serviceRequest)
          )
        )

        let verifiedPractitioner
        if (resourceDictionary['Practitioner']) {
          const performerReference = diagnosticReport.performer.find(
            performer => {
              return performer.type === 'Practitioner'
            }
          )

          verifiedPractitioner = helper.findByReference(
            resourceDictionary['Practitioner'],
            performerReference
          )
        }

        const orderedObservations = helper.sortByDate(
          resourceDictionary['Observation'].slice(),
          'issued'
        )

        let performedPractitioner
        if (resourceDictionary['Practitioner']) {
          const performerReference = orderedObservations
            .slice(-1)[0]
            .performer.find(performer => {
              return performer.type === 'Practitioner'
            })

          performedPractitioner = helper.findByReference(
            resourceDictionary['Practitioner'],
            performerReference
          )
        }

        let specimen
        if (diagnosticReport && diagnosticReport.specimen) {
          specimen = diagnosticReport.specimen.map(spRef =>
            controller.findByReference(
              resourceDictionary['Specimen'],
              spRef.reference
            )
          )
        }

        const latestSpecimen = specimen && specimen[specimen.length - 1]
        const sampleCollectedDate =
          latestSpecimen &&
          latestSpecimen.collection &&
          latestSpecimen.collection.collectedDateTime

        const runCompletionTime = orderedObservations.slice(-1)[0].issued

        const verifiedTime = diagnosticReport.issued

        Object.assign(testResults, {
          diagnosticReport,
          specimen,
          sampleCollectedDate: dateTime.toLocalDateTime(sampleCollectedDate),
          runCompletionTime: dateTime.toLocalDateTime(runCompletionTime),
        })

        const data = {
          ...testResults,
          diagnosticReport,
          // overwriting specimen by diagnosticReport.specimen
          verifiedPractitioner,
          performedPractitioner,
          specimen,
          sampleCollectedDate: dateTime.toLocalDateTime(sampleCollectedDate),
          verifiedTime: dateTime.toLocalDateTime(verifiedTime),
          runCompletionTime: dateTime.toLocalDateTime(runCompletionTime),
        }

        return data
      }
    },

    *queryLabTestOrdersOnly({ payload = {} }, { call, put, select }) {
      const { CancellableLabTests } = yield select(
        state => state.reception_patientProfile
      )

      if (!CancellableLabTests) {
        return
      }

      const requestPayload = {
        resourceType: 'ServiceRequest',
        _id: payload.serviceRequestId,
        _include: ['ServiceRequest:patient'],
        _revinclude: ['DiagnosticReport:based-on'],
        '_include:iterate': [
          'DiagnosticReport:result',
          'DiagnosticReport:performer',
          'DiagnosticReport:specimen',
          'Observation:has-member',
        ],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
        ],
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const bundle = new Bundle(response.data)

      if (bundle.entry.length === 0) {
        return
      }
      const resourceArray = bundle.entry.map(e => e.resource)

      const testResults = controller.recursiveTestDataBuilder(
        resourceArray,
        CancellableLabTests[payload.testKey],
        payload.serviceRequestId
      )

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const diagnosticReport =
        resourceDictionary['DiagnosticReport'] &&
        resourceDictionary['DiagnosticReport'].find(dr =>
          controller.containsReference(
            dr.basedOn,
            helper.getReferenceUrl(testResults.serviceRequest)
          )
        )

      let specimen
      if (diagnosticReport && diagnosticReport.specimen) {
        specimen = diagnosticReport.specimen.map(spRef =>
          controller.findByReference(
            resourceDictionary['Specimen'],
            spRef.reference
          )
        )
      }

      const latestSpecimen = specimen && specimen[specimen.length - 1]
      const sampleCollectedDate =
        latestSpecimen &&
        latestSpecimen.collection &&
        latestSpecimen.collection.collectedDateTime
      const runCompletionTime = testResults.serviceRequest.meta.lastUpdated

      Object.assign(testResults, {
        diagnosticReport,

        specimen,
        sampleCollectedDate: dateTime.toLocalDateTime(
          sampleCollectedDate,
          'yyyy-mm-dd'
        ),
        runCompletionTime: dateTime.toLocalDateTime(runCompletionTime),
      })

      const data = {
        ...testResults,
        diagnosticReport,

        // overwriting specimen by diagnosticReport.specimen
        specimen,
        sampleCollectedDate: dateTime.toLocalDateTime(
          sampleCollectedDate,
          'yyyy-mm-dd'
        ),
        runCompletionTime: dateTime.toLocalDateTime(runCompletionTime),
        serviceRequestArray: resourceDictionary['ServiceRequest'],
      }

      return data
    },
    /* #endregion */

    /* #region  Consultation history */
    *queryConsultationsHistory({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)

      const { patient } = yield select(state => state.reception_patientProfile)

      const counsellingCategory =
        globalState.FHIR_CODES.Categories.Counselling.coding[0]

      const requestPayload = {
        resourceType: 'ServiceRequest',
        patient: patient.id,
        category: `${counsellingCategory.system}|${counsellingCategory.code}`,
        _include: ['ServiceRequest:subject', 'ServiceRequest:performer'],
      }

      const response = yield call(readResource, requestPayload)

      const dataSource = []
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const bundle = new Bundle(response.data)
      if (bundle.entry.length === 0) {
        return []
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      resourceDictionary['ServiceRequest'].forEach(serviceRequest => {
        const checkupType = Object.keys(globalState.FHIR_CODES.Checkup).find(
          checkupType => {
            const checkupCode = globalState.FHIR_CODES.Checkup[checkupType].code

            return controller.codeIntersects(serviceRequest.code, checkupCode)
          }
        )

        if (!!checkupType) {
          // excluding organizations
          const performers = serviceRequest.performer
            .map(performer => {
              if (performer) {
                return helper.findByReference(resourceArray, performer)
              }
              return undefined
            })
            .filter(val => !!val)

          if (performers.length === 0) {
            return
          }

          const practitioners = performers.filter(
            performer => performer.resourceType === 'Practitioner'
          )

          const practitionersName = practitioners
            .map(practitioner =>
              practitioner.getOfficialNameString({ short: true })
            )
            .join(', ')

          dataSource.push({
            key: serviceRequest.id,
            authoredOn: dateTime.toLocalDateTime(
              serviceRequest.authoredOn,
              'yyyy-mm-dd'
            ),
            practitionersName: practitionersName,
            checkupType: checkupType,
            performers,
            serviceRequest: serviceRequest,
          })
        }
      })

      const sortedDataSource = helper.orderBy(dataSource, 'authoredOn', 'asc')
      return sortedDataSource
    },
    /* #endregion */

    /* #region  Lab test (latest, history) */
    *queryLatestLabTest({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState
      const { patient } = yield select(state => state.reception_patientProfile)

      const LabTestCodes = {}
      const requestEntries = []
      Object.keys(LabTests).forEach(labTestKey => {
        const labTestItem = LabTests[labTestKey]

        LabTestCodes[labTestKey] = {
          display: LabTests[labTestKey].display,
          code: LabTests[labTestKey].code,
        }

        requestEntries.push({
          request: {
            method: 'GET',
            url: [
              `ServiceRequest`,
              `?code=${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`,
              `&patient=${patient.id}`,
              `&_include=ServiceRequest:specimen`,
              `&_revinclude:iterate=Observation:based-on`,
              `&_revinclude:iterate=DiagnosticReport:based-on`,
              `&_sort=-authored`,
              `&_count=1`,
            ].join(''),
          },
        })
      })

      const requestBundle = new Bundle({
        type: 'transaction',
        entry: requestEntries,
      })

      const json = requestBundle.toJSON()

      // const result = yield call(putPatientInformationList, payload)

      const response = yield call(batch_transaction_request, json)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const responseBundle = new Bundle(response.data)

      if (responseBundle.entry.length === 0) {
        return []
      }
      const dataSource = {}

      responseBundle.entry
        .map(entry => entry.response)
        .forEach(bundleEntryResponse => {
          const itemBundle = new Bundle(bundleEntryResponse.data)
          const resourceArray = helper.loadResourceArray(
            itemBundle.getResourcesOnly()
          )

          const resourceDictionary = controller.createResourceDictionary(
            resourceArray
          )

          const serviceRequests = resourceDictionary['ServiceRequest']

          serviceRequests &&
            serviceRequests.forEach(serviceRequest => {
              Object.keys(LabTestCodes).forEach(labTestKey => {
                if (!serviceRequest.code) {
                  return
                }

                let isLabTest

                isLabTest =
                  serviceRequest.category &&
                  serviceRequest.category.some(categoryObj =>
                    controller.codeIntersects(
                      categoryObj,
                      FHIR_CODES.Categories.LaboratoryProcedure
                    )
                  )

                if (!isLabTest) {
                  return
                }

                if (
                  controller.codeIntersects(
                    LabTestCodes[labTestKey].code,
                    serviceRequest.code
                  )
                ) {
                  const diagnosticReport =
                    resourceDictionary['DiagnosticReport'] &&
                    resourceDictionary[
                      'DiagnosticReport'
                    ].find(diagnosticReport =>
                      diagnosticReport.basedOn.some(
                        basedOnItem =>
                          basedOnItem.reference ===
                          helper.getReferenceUrl(serviceRequest)
                      )
                    )

                  const observation =
                    resourceDictionary['Observation'] &&
                    resourceDictionary['Observation'].find(ob =>
                      ob.basedOn.some(
                        basedOnItem =>
                          basedOnItem.reference ===
                          helper.getReferenceUrl(serviceRequest)
                      )
                    )

                  let status = 'registered'
                  let effectiveDate
                  let issuedDate

                  if (!!diagnosticReport) {
                    status = diagnosticReport.status
                    effectiveDate = dateTime.toLocalDateTime(
                      diagnosticReport.effectiveDateTime,
                      'yyyy-mm-dd'
                    )
                    issuedDate = dateTime.toLocalDateTime(
                      diagnosticReport.issued,
                      'yyyy-mm-dd'
                    )
                  }

                  const data = {
                    key: serviceRequest.id,
                    serviceRequestId: serviceRequest.id,
                    display: LabTestCodes[labTestKey].display,
                    testCode: LabTestCodes[labTestKey],
                    testKey: labTestKey,
                    status: status,
                    authoredOn: dateTime.toLocalDateTime(
                      serviceRequest.authoredOn,
                      'yyyy-mm-dd'
                    ),
                    effectiveDate: effectiveDate,
                    issuedDate: issuedDate,
                    serviceRequest: serviceRequest,
                    diagnosticReport: diagnosticReport,
                    observation: observation,
                  }

                  if (labTestKey === 'ViralLoadTests') {
                    if (resourceDictionary['Observation']) {
                      const includedServiceRequests = resourceDictionary[
                        'ServiceRequest'
                      ].filter(sr => {
                        return (
                          sr.basedOn &&
                          sr.basedOn.some(basedOnRef =>
                            basedOnRef.reference.endsWith(
                              helper.getReferenceUrl(serviceRequest)
                            )
                          )
                        )
                      })
                      const includedServiceRequestsRef = includedServiceRequests.map(
                        sr => helper.getReferenceUrl(sr)
                      )
                      const includedObservation = resourceDictionary[
                        'Observation'
                      ].filter(ob =>
                        ob.basedOn.some(basedOnRef =>
                          includedServiceRequestsRef.some(ref =>
                            basedOnRef.reference.endsWith(ref)
                          )
                        )
                      )

                      if (
                        includedObservation.some(ob => ob.status === 'final')
                      ) {
                        // viral load status is final if it containt at least one final observation
                        data.status = 'final'
                      }

                      const ViralLoadItems = controller.recursiveTestDataBuilder(
                        [
                          serviceRequest,
                          ...includedServiceRequests,
                          ...includedObservation,
                        ],
                        FHIR_CODES.UncategorizedTests.ViralLoadTests
                      )

                      Object.keys(ViralLoadItems.include).forEach(testKey => {
                        if (
                          !ViralLoadItems.include[testKey].latestObservation ||
                          ViralLoadItems.include[testKey].latestObservation
                            .status !== 'final'
                        ) {
                          delete ViralLoadItems.include[testKey]
                        }
                      })

                      data.include = ViralLoadItems.include
                    }
                  }

                  dataSource[labTestKey] = data
                }
              })
            })
        })

      yield put({
        type: 'updateState',
        payload: {
          LatestLabTests: dataSource,
        },
      })
      return dataSource
    },

    *queryLabTestHistory({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState
      const { patient, CancellableLabTests } = yield select(
        state => state.reception_patientProfile
      )
      if (!CancellableLabTests) {
        return
      }

      const totalLaboratoryProcedureRequestQuery = Object.values(
        CancellableLabTests
      )
        .map(labTestItem => {
          return `${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`
        })
        .join(',')

      const LabTestCodes = {}

      Object.keys(CancellableLabTests).forEach(labTestKey => {
        LabTestCodes[labTestKey] = {
          display: CancellableLabTests[labTestKey].display,
          code: CancellableLabTests[labTestKey].code,
        }
      })

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: `${totalLaboratoryProcedureRequestQuery}`,
        patient: patient.id,
        _include: ['ServiceRequest:specimen'],
        '_revinclude:iterate': [
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        _count: payload._count,
        _page: payload._page,
        _sort: '-authored',
      }

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const bundle = new Bundle(response.data)

      yield put({
        type: 'updateState',
        payload: {
          LabTestLogPagination: {
            current: Number(payload._page) || 1,
            pageSize: Number(payload._count) || 20,
            total: bundle.total,
          },
        },
      })

      if (bundle.entry.length === 0) {
        return
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const serviceRequests = resourceDictionary['ServiceRequest']
      const dataSource = []

      // helper.sortByDate(serviceRequests, 'effectiveDateTime')
      serviceRequests.forEach(serviceRequest => {
        Object.keys(LabTestCodes).forEach(labTestKey => {
          if (!serviceRequest.code) {
            return
          }

          let isLabTest

          isLabTest =
            serviceRequest.category &&
            serviceRequest.category.some(categoryObj =>
              controller.codeIntersects(
                categoryObj,
                FHIR_CODES.Categories.LaboratoryProcedure
              )
            )

          if (!isLabTest) {
            return
          }

          if (
            controller.codeIntersects(
              LabTestCodes[labTestKey].code,
              serviceRequest.code
            )
          ) {
            const diagnosticReport =
              resourceDictionary['DiagnosticReport'] &&
              resourceDictionary['DiagnosticReport'].find(diagnosticReport =>
                diagnosticReport.basedOn.some(
                  basedOnItem =>
                    basedOnItem.reference ===
                    helper.getReferenceUrl(serviceRequest)
                )
              )

            const observation =
              resourceDictionary['Observation'] &&
              resourceDictionary['Observation'].find(ob =>
                ob.basedOn.some(
                  basedOnItem =>
                    basedOnItem.reference ===
                    helper.getReferenceUrl(serviceRequest)
                )
              )

            let status = 'registered'
            let effectiveDate
            let issuedDate

            if (!!diagnosticReport) {
              status = diagnosticReport.status
              effectiveDate = dateTime.toLocalDateTime(
                diagnosticReport.effectiveDateTime,
                'yyyy-mm-dd'
              )
              issuedDate = dateTime.toLocalDateTime(
                diagnosticReport.issued,
                'yyyy-mm-dd'
              )
            }

            const data = {
              key: serviceRequest.id,
              serviceRequestId: serviceRequest.id,
              display: LabTestCodes[labTestKey].display,
              testCode: LabTestCodes[labTestKey],
              testKey: labTestKey,
              isCancelled: serviceRequest.status === 'revoked',
              status: status,
              authoredOn: dateTime.toLocalDateTime(
                serviceRequest.authoredOn,
                'yyyy-mm-dd'
              ),
              effectiveDate: effectiveDate,
              issuedDate: issuedDate,
              serviceRequest: serviceRequest,
              diagnosticReport: diagnosticReport,
              observation: observation,
            }

            dataSource.push(data)
          }
        })
      })

      yield put({
        type: 'updateState',
        payload: {
          LabTestLog: dataSource,
        },
      })

      return dataSource
    },
    /* #endregion */

    *downloadValuesets({ payload }, { call, put, select }) {
      const valuesetList = [
        'administrative-gender',
        'address-values-mn',
        'country-values-mn',
        'race-values',
        'occupation-values',
        'patient-contact-relationship',
        'employment-status-values',
        'work-environment-values',
        'education-values',
        'accommodation-values',
        'dietary-finding-values',
        'general-health-values',
        'blood-type-values',
        'rhesus-factor-values',
        'disability-values',
        'marital-status',
      ]

      const response = yield call(queryValuesets, {
        valuesetList: valuesetList,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }
    },

    /* #region  get and update information list */
    *getPatientInformation({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      if (!payload.id || payload.id === '') {
        return
      }

      const patientId = payload.id

      const patientInformationListCoding =
        FHIR_CODES.Lists.PatientInformationList.coding[0]
      const requestPayload = {
        resourceType: 'Patient',
        _id: patientId,
        // code: `${patientInformationListCoding.system}|${patientInformationListCoding.code}`,
        _revinclude: ['List:subject'],
        '_include:iterate': ['List:item', 'Observation:has-member'],
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const bundle = new Bundle(response.data)
      const resourceArray = helper.loadResourceArray(
        bundle.entry.map(e => e.resource)
      )
      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const patientInformationList =
        resourceDictionary['List'] &&
        resourceDictionary['List'].find(
          list =>
            list.code &&
            controller.codeIntersects(
              list.code,
              FHIR_CODES.Lists.PatientInformationList
            )
        )

      const problemList =
        resourceDictionary['List'] &&
        resourceDictionary['List'].find(
          list =>
            list.code &&
            controller.codeIntersects(list.code, FHIR_CODES.Lists.ProblemList)
        )

      const patient = resourceDictionary['Patient'].find(
        p => p.id === patientId
      )

      let socialHistoryResponse
      let socialHistoryComponent
      let bodyHeightResponse
      let bodyWeightResponse
      let bodyMassIndexResponse
      let bloodGroupPanelResponse
      let bloodGroupResponse
      let rhesusStatusResponse
      let vitalsPanelResponse

      try {
        try {
          socialHistoryResponse = resourceDictionary['Observation'].find(
            o =>
              o.code &&
              controller.codeIntersects(
                o.code,
                FHIR_CODES.Observations.PatientInformation.code
              )
          )

          socialHistoryComponent = {}

          socialHistoryResponse.component.forEach(comp => {
            Object.keys(FHIR_CODES.Observations).forEach(observationKey => {
              try {
                if (
                  controller.codeIntersects(
                    FHIR_CODES.Observations[observationKey].code,
                    comp.code
                  )
                ) {
                  socialHistoryComponent[observationKey] = comp
                }
              } catch {}
            })
          })
        } catch {}

        try {
          resourceDictionary['Observation'].forEach(observation => {
            if (observation.code) {
              if (
                controller.codeIntersects(
                  observation.code,
                  FHIR_CODES.Observations.BodyHeight.code
                )
              ) {
                bodyHeightResponse = observation
              } else if (
                controller.codeIntersects(
                  observation.code,
                  FHIR_CODES.Observations.BodyWeight.code
                )
              ) {
                bodyWeightResponse = observation
              } else if (
                controller.codeIntersects(
                  observation.code,
                  FHIR_CODES.Observations.BodyMassIndex.code
                )
              ) {
                bodyMassIndex = observation
              } else if (
                controller.codeIntersects(
                  observation.code,
                  FHIR_CODES.Observations.VitalSigns.code
                )
              ) {
                vitalsPanelResponse = observation
              } else if (
                controller.codeIntersects(
                  observation.code,
                  FHIR_CODES.Observations.BloodGroupPanel.code
                )
              ) {
                bloodGroupPanelResponse = observation
              } else if (
                controller.codeIntersects(
                  observation.code,
                  FHIR_CODES.Observations.BloodGroup.code
                )
              ) {
                bloodGroupResponse = observation
              } else if (
                controller.codeIntersects(
                  observation.code,
                  FHIR_CODES.Observations.RhStatus.code
                )
              ) {
                rhesusStatusResponse = observation
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      } catch {
        console.log('failed reading patient data')
      }

      // let patientInformationList

      let accommodation
      let relatedPersonType
      let contactNumber
      let email
      let taxIdNumber
      let ethnicity
      let healthInsuranceNumber
      let occupation
      let salary
      let education
      let houseHoldSize
      let workEnvironment
      let employmentStatus
      let dietaryFinding
      let generalHealth
      let citizenship
      let maritalStatus
      let address

      try {
        maritalStatus = patient.maritalStatus.coding.find(
          c =>
            c.system ===
            'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus'
        ).code
      } catch {}

      if (patient.address) {
        let home
        let city
        let state
        let district
        let subdistrict
        let line
        let work
        let workAddressText

        try {
          home = patient.address.find(item => item.use === 'home')
        } catch {}

        try {
          line = home.line[0]
        } catch {}

        try {
          district = home.district
        } catch {}

        try {
          state = home.state
        } catch {}

        try {
          subdistrict = home.extension.find(
            item => item.url === FHIR_CODES.Extensions.Subdistrict.url
          ).valueString
        } catch {}

        try {
          work = patient.address.find(item => item.use === 'work')
        } catch {}

        try {
          workAddressText = work.text
        } catch {}

        try {
          city = [state, district, subdistrict]
        } catch {}

        address = {
          home: {
            city,
            line,
          },
          work: {
            text: workAddressText,
          },
        }
      }

      try {
        email = patient.telecom.find(v => v.system === 'email').value
      } catch {}

      if (patient.contact) {
        try {
          relatedPersonType = patient.contact[0].relationship[0].coding[0].code
        } catch {}
        try {
          contactNumber = patient.contact[0].telecom[0].value
        } catch {}
      }

      if (patient.identifier) {
        try {
          taxIdNumber = patient.identifier.find(
            i =>
              i.type &&
              controller.codeIntersects(
                i.type,
                FHIR_CODES.Identifiers.TaxIdNumber.type
              )
          ).value
        } catch {}

        try {
          healthInsuranceNumber = patient.identifier.find(
            i =>
              i.type &&
              controller.codeIntersects(
                i.type,
                FHIR_CODES.Identifiers.HealthInsuranceNumber.type
              )
          ).value
        } catch {}

        try {
          const {
            valueCodeableConcept,
          } = socialHistoryComponent.HighestLevelOfEducation

          for (let key in FHIR_CODES.Observations.HighestLevelOfEducation
            .include) {
            if (
              controller.codeIntersects(
                FHIR_CODES.Observations.HighestLevelOfEducation.include[key],
                valueCodeableConcept
              )
            ) {
              education = key
              break
            }
          }
        } catch {}

        try {
          salary = socialHistoryComponent.Salary.valueQuantity.value
        } catch {}
      }

      if (patient.extension) {
        try {
          citizenship = patient.extension
            .find(e => e.url === FHIR_CODES.Extensions.Citizenship.url)
            .extension.find(e => e.url === 'code')
            .valueCodeableConcept.coding.find(
              c => c.system === 'urn:iso:std:iso:3166'
            ).code
        } catch {}

        try {
          ethnicity = patient.extension
            .find(e => e.url === FHIR_CODES.Extensions.Ethnicity.url)
            .extension.find(e => e.url === 'ethnicity').valueString
        } catch {}
      }

      if (
        socialHistoryComponent &&
        Object.keys(socialHistoryComponent).length > 0
      ) {
        try {
          occupation =
            socialHistoryComponent.Occupation.valueCodeableConcept.coding[0]
              .code
        } catch {}

        try {
          accommodation =
            socialHistoryComponent.Accommodation &&
            socialHistoryComponent.Accommodation.valueCodeableConcept.coding[0]
              .code
        } catch {}

        try {
          const { valueCodeableConcept } = socialHistoryComponent.DietaryFinding

          for (let key in FHIR_CODES.Observations.DietaryFinding.include) {
            if (
              controller.codeIntersects(
                FHIR_CODES.Observations.DietaryFinding.include[key],
                valueCodeableConcept
              )
            ) {
              dietaryFinding = key
              break
            }
          }
        } catch {}

        try {
          const { valueCodeableConcept } = socialHistoryComponent.GeneralHealth

          for (let key in FHIR_CODES.Observations.GeneralHealth.include) {
            if (
              controller.codeIntersects(
                FHIR_CODES.Observations.GeneralHealth.include[key],
                valueCodeableConcept
              )
            ) {
              generalHealth = key
              break
            }
          }
        } catch {}

        try {
          const {
            valueCodeableConcept,
          } = socialHistoryComponent.EmploymentStatus

          for (let key in FHIR_CODES.Observations.EmploymentStatus.include) {
            if (
              controller.codeIntersects(
                FHIR_CODES.Observations.EmploymentStatus.include[key],
                valueCodeableConcept
              )
            ) {
              employmentStatus = key
              break
            }
          }
        } catch {}

        try {
          const {
            valueCodeableConcept,
          } = socialHistoryComponent.WorkEnvironment

          for (let key in FHIR_CODES.Observations.WorkEnvironment.include) {
            if (
              controller.codeIntersects(
                FHIR_CODES.Observations.WorkEnvironment.include[key],
                valueCodeableConcept
              )
            ) {
              workEnvironment = key
              break
            }
          }
        } catch {}

        try {
          houseHoldSize = socialHistoryComponent.HouseHoldSize.valueInteger
        } catch {}
      }

      let height
      let weight
      let bodyMassIndex
      let bodyMassIndexDisplay

      try {
        height = bodyHeightResponse.valueQuantity.value
      } catch {}

      try {
        weight = bodyWeightResponse.valueQuantity.value
      } catch {}

      try {
        let calculatedBMI = helper.calculateBodyMassIndex(height, weight)

        bodyMassIndex = calculatedBMI.bodyMassIndex
        bodyMassIndexDisplay = calculatedBMI.bodyMassIndexDisplay
      } catch {}

      let bloodGroup
      let rhesusStatus

      try {
        bloodGroup = bloodGroupResponse.valueCodeableConcept.coding[0].code
      } catch {}

      try {
        rhesusStatus = rhesusStatusResponse.valueCodeableConcept.coding[0].code
      } catch {}

      let mentalDisorder
      let disabilities
      let conditions = resourceDictionary['Condition']

      try {
        disabilities = Object.keys(FHIR_CODES.Conditions).filter(
          conditionKey => {
            if (
              [
                'SpeechAndLanguageDisorder',
                'HearingLoss',
                'VisualImpairment',
                'DisabilityOfUpperLimb',
                'DisabilityOfLowerLimb',
              ].includes(conditionKey) &&
              conditions.some(
                cond =>
                  cond.code &&
                  controller.codeIntersects(
                    cond.code,
                    FHIR_CODES.Conditions[conditionKey]
                  )
              )
            ) {
              return true
            }
            return false
          }
        )
      } catch {}

      try {
        Object.keys(FHIR_CODES.Conditions).forEach(conditionKey => {
          if (
            conditionKey === 'MentalDisorder' &&
            conditions.find(
              cond =>
                cond.code &&
                controller.codeIntersects(
                  cond.code,
                  FHIR_CODES.Conditions.MentalDisorder
                )
            )
          ) {
            mentalDisorder = 'yes'
          }
        })
      } catch {}

      const modalData = {
        required: {
          familyName: patient.getLastName(),
          givenName: patient.getFirstName(),
          NInum: patient.getNationalIdentificationNumber(),
          mobilePhone: patient.getMobilePhones()[0],
          foreignerIdentifier: patient._getForeignerIdentifier(),
        },
        contact: {
          relatedPersonType,
          contactNumber,
          email,
        },
        additional: {
          houseHoldSize,
          clanName: patient._getClanName(),
          gender: patient.gender,
          birthDate: patient.birthDate,
          age: '',
          citizenship,
        },
        other: {
          taxIdNumber,
          ethnicity,
          healthInsuranceNumber,
          occupation,
          salary,
        },
        workEnvironment,
        employmentStatus,
        education,
        maritalStatus,
        accommodation,
        dietaryFinding,
        vitalSign: {
          height,
          weight,
          bodyMassIndex,
          bodyMassIndexDisplay,
          generalHealth,
          mentalDisorder,
        },
        bloodType: {
          bloodGroup,
          rhesusStatus,
        },
        disability: {
          hasDisability: disabilities && disabilities.length > 0 && true,
          disabilities,
        },
        address,
      }

      yield put({
        type: 'updateState',
        payload: {
          modalData,
          bundle,
          patient,

          socialHistory: socialHistoryResponse,
          socialHistoryComponent: socialHistoryComponent,
          bodyHeight: bodyHeightResponse,
          bodyWeight: bodyWeightResponse,
          bodyMassIndex: bodyMassIndexResponse,
          bloodGroupPanel: bloodGroupPanelResponse,
          bloodGroup: bloodGroupResponse,
          rhesusStatus: rhesusStatusResponse,
          vitalsPanel: vitalsPanelResponse,
          patientInformationList: patientInformationList,
          conditions,
          disabilities,
          problemList,
        },
      })

      yield put({
        type: 'calculateAgeFromBirthDate',
        payload: {
          birthDate: patient.birthDate,
        },
      })
      return modalData
    },

    *updatePatientInformationList({ payload }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(state => state.reception_patientProfile)
      const { FHIR_CODES } = globalState
      const { formValues, age, birthDate } = payload

      const {
        patient,
        socialHistory,
        bodyHeight,
        bodyWeight,
        bodyMassIndex,
        bloodGroupPanel,
        bloodGroup,
        rhesusStatus,
        vitalsPanel,
        patientInformationList,
        patientInformationObservation,
        conditions,
        disabilities,
        problemList,
      } = localState

      const tempBodyHeightId = helper.generateFullUrl()
      const tempBodyWeightId = helper.generateFullUrl()
      const tempBodyMassIndexId = helper.generateFullUrl()
      const tempBloodGroupId = helper.generateFullUrl()
      const tempRhStatusId = helper.generateFullUrl()
      const tempVitalsPanelId = helper.generateFullUrl()
      const tempBloodGroupPanelId = helper.generateFullUrl()
      const tempPatientInformationId = helper.generateFullUrl()

      const effectiveDateTime = dateTime.getInstant()
      const subject = patient.getReference()

      const transaction = {
        resourceType: 'Bundle',
        type: 'transaction',
        entry: [],
      }

      const updatedPatient = new Patient({ ...patient.toJSON() })
      let updatedSocialHistory = Object.assign(
        {
          resourceType: 'Observation',
          status: 'final',
          category: [FHIR_CODES.Categories.SocialHistory],
          code: FHIR_CODES.Observations.PatientInformation.code,
          component: [],
        },
        socialHistory && socialHistory.toJSON()
      )

      const updatedProblemListObject = {
        resourceType: 'List',
        code: FHIR_CODES.Lists.ProblemList,
        status: 'current',
        mode: 'working',
        subject: subject,
        date: dateTime.getInstant(),
        source: globalState.Practitioner.getReference(),
        entry: [],
        ...(problemList && problemList.toJSON()),
      }

      const comment_section = {
        //  /* #region Init Vital Signs  */
        //  const updatedVitalsPanel = {
        //   resourceType: 'Observation',
        //   meta: {
        //     profile: [FHIR_CODES.Profiles.VitalSigns.url],
        //   },
        //   status: 'final',
        //   category: [FHIR_CODES.Categories.VitalSigns],
        //   code: FHIR_CODES.Observations.VitalSigns.code,
        //   subject: subject,
        //   effectiveDateTime: effectiveDateTime,
        //   hasMember: [],
        //   ...(vitalsPanel && vitalsPanel.toJSON()),
        // }
        // const VITAL_SIGNS_STATUS = 'final'
        // let updatedBodyHeight = {
        //   resourceType: 'Observation',
        //   meta: {
        //     profile: [FHIR_CODES.Profiles.VitalSigns.url],
        //   },
        //   status: 'final',
        //   category: [FHIR_CODES.Categories.VitalSigns],
        //   code: FHIR_CODES.Observations.BodyHeight.code,
        //   effectiveDateTime: effectiveDateTime,
        //   subject: subject,
        //   ...(bodyHeight && bodyHeight.toJSON()),
        // }
        // let updatedBodyWeight = {
        //   resourceType: 'Observation',
        //   meta: {
        //     profile: [FHIR_CODES.Profiles.VitalSigns.url],
        //   },
        //   status: VITAL_SIGNS_STATUS,
        //   category: [FHIR_CODES.Categories.VitalSigns],
        //   code: FHIR_CODES.Observations.BodyWeight.code,
        //   effectiveDateTime: effectiveDateTime,
        //   subject: subject,
        //   ...(bodyWeight && bodyWeight.toJSON()),
        // }
        // let updatedBodyMassIndex = {
        //   resourceType: 'Observation',
        //   meta: {
        //     profile: [FHIR_CODES.Profiles.VitalSigns.url],
        //   },
        //   status: VITAL_SIGNS_STATUS,
        //   category: [FHIR_CODES.Categories.VitalSigns],
        //   code: FHIR_CODES.Observations.BodyMassIndex.code,
        //   effectiveDateTime: effectiveDateTime,
        //   subject: subject,
        //   derivedFrom: [
        //     {
        //       reference: tempBodyHeightId,
        //       display: 'Body Height',
        //     },
        //     {
        //       reference: tempBodyWeightId,
        //       display: 'Body Weight',
        //     },
        //   ],
        //   ...(bodyMassIndex && bodyMassIndex.toJSON()),
        // }
        // /* #endregion */
        // /* #region Init Blood Group Panel */
        // const updatedBloodGroupPanel = {
        //   resourceType: 'Observation',
        //   meta: {
        //     profile: [FHIR_CODES.Profiles.VitalSigns.url],
        //   },
        //   status: 'final',
        //   category: [FHIR_CODES.Categories.Laboratory],
        //   code: FHIR_CODES.Observations.BloodGroupPanel.code,
        //   subject: subject,
        //   effectiveDateTime: effectiveDateTime,
        //   hasMember: [],
        //   ...(bloodGroupPanel && bloodGroupPanel.toJSON()),
        // }
        // let updatedBloodGroup = {
        //   resourceType: 'Observation',
        //   status: 'final',
        //   category: [FHIR_CODES.Categories.Laboratory],
        //   code: FHIR_CODES.Observations.BloodGroup.code,
        //   subject: subject,
        //   effectiveDateTime: effectiveDateTime,
        //   ...(bloodGroup && bloodGroup.toJSON()),
        // }
        // let updatedRhesusStatus = {
        //   resourceType: 'Observation',
        //   status: 'final',
        //   category: [FHIR_CODES.Categories.Laboratory],
        //   code: FHIR_CODES.Observations.RhStatus.code,
        //   subject: subject,
        //   effectiveDateTime: effectiveDateTime,
        //   ...(rhesusStatus && rhesusStatus.toJSON()),
        // }
        // /* #endregion */
        // /* #region  Accommodation */
        // if (formValues.accommodation) {
        //   if (helper.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.Accommodation.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!helper.isEmptyObject(formValues.accommodation)) {
        //         updatedSocialHistory.component[index] = formValues.accommodation
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (!helper.isEmptyObject(formValues.accommodation)) {
        //       updatedSocialHistory.component.push(formValues.accommodation)
        //     }
        //   } else if (!helper.isEmptyObject(formValues.accommodation)) {
        //     updatedSocialHistory.component = [formValues.accommodation]
        //   }
        // }
        // /* #endregion */
        // /* #region  AdditionalInformation */
        // if (helper.isObject(formValues.additional)) {
        //   // clanName
        //   if (
        //     formValues.additional.clanName &&
        //     formValues.additional.clanName !== '' &&
        //     !helper.isEmptyObject(formValues.additional.clanName)
        //   ) {
        //     updatedPatient._setClanName(formValues.additional.clanName)
        //   } else if (helper.isEmptyObject(formValues.additional.clanName)) {
        //     // remove
        //     const index = updatedPatient.name.extension.findIndex(
        //       e => e.url === FHIR_CODES.Extensions.ClanName.url
        //     )
        //     if (index >= 0) {
        //       updatedPatient.name[index].extension.splice(index, 1)
        //     }
        //   }
        //   // citizenship
        //   if (helper.isArray(updatedPatient.extension)) {
        //     const index = updatedPatient.extension.findIndex(
        //       value => value.url === FHIR_CODES.Extensions.Citizenship.url
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.additional.citizenship)) {
        //         updatedPatient.extension[index] = new Extension(
        //           formValues.additional.citizenship
        //         )
        //       } else {
        //         // remove
        //         updatedPatient.extension.splice(index, 1)
        //       }
        //     } else if (!isEmpty(formValues.additional.citizenship)) {
        //       updatedPatient.extension.push(
        //         new Extension(formValues.additional.citizenship)
        //       )
        //     }
        //   } else if (!isEmpty(formValues.additional.citizenship)) {
        //     updatedPatient.extension = [
        //       new Extension(formValues.additional.citizenship),
        //     ]
        //   }
        //   // gender and birthDate
        //   // values can be undefined
        //   if (updatedPatient.gender !== formValues.additional.gender) {
        //     updatedPatient.gender = formValues.additional.gender
        //   }
        //   if (updatedPatient.birthDate !== formValues.additional.birthDate) {
        //     updatedPatient.birthDate = formValues.additional.birthDate
        //   }
        //   // houseHoldSize
        //   if (helper.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.HouseHoldSize.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.additional.houseHoldSize)) {
        //         updatedSocialHistory.component[index] =
        //           formValues.additional.houseHoldSize
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (!isEmpty(formValues.additional.houseHoldSize)) {
        //       updatedSocialHistory.component.push(
        //         formValues.additional.houseHoldSize
        //       )
        //     }
        //   } else if (!isEmpty(formValues.additional.houseHoldSize)) {
        //     updatedSocialHistory.component = [formValues.additional.houseHoldSize]
        //   }
        // }
        // /* #endregion */
        // /* #region  Address.js */
        // if (formValues.address) {
        //   if (!isEmpty(formValues.address)) {
        //     if (Array.isArray(updatedPatient.address)) {
        //       const index = updatedPatient.address.findIndex(
        //         value => value.use === 'home'
        //       )
        //       if (index >= 0) {
        //         if (!isEmpty(formValues.address.homeAddress)) {
        //           updatedPatient.address[index] = new Address(
        //             formValues.address.homeAddress
        //           )
        //         } else {
        //           updatedPatient.address.splice(index, 1)
        //         }
        //       } else {
        //         if (!isEmpty(formValues.address.homeAddress)) {
        //           updatedPatient.address.push(
        //             new Identifier(formValues.address.homeAddress)
        //           )
        //         }
        //       }
        //     } else {
        //       if (!isEmpty(formValues.address.homeAddress)) {
        //         updatedPatient.address = [
        //           new Address(formValues.address.homeAddress),
        //         ]
        //       }
        //     }
        //     if (!isEmpty(formValues.address)) {
        //       if (Array.isArray(updatedPatient.address)) {
        //         const index = updatedPatient.address.findIndex(
        //           value => value.use === 'work'
        //         )
        //         if (index >= 0) {
        //           if (!isEmpty(formValues.address.workAddress)) {
        //             updatedPatient.address[index] = new Address(
        //               formValues.address.workAddress
        //             )
        //           } else {
        //             updatedPatient.address.splice(index, 1)
        //           }
        //         } else {
        //           if (!isEmpty(formValues.address.workAddress)) {
        //             updatedPatient.address.push(
        //               new Identifier(formValues.address.workAddress)
        //             )
        //           }
        //         }
        //       } else {
        //         if (!isEmpty(formValues.address.workAddress)) {
        //           updatedPatient.address = [
        //             new Address(formValues.address.workAddress),
        //           ]
        //         }
        //       }
        //     }
        //   }
        // }
        // /* #endregion */
        // /* #region  BloodType.js */
        // if (formValues.bloodType) {
        //   /* #region  Blood Group */
        //   if (
        //     helper.isObject(formValues.bloodType.bloodGroupValueCodeableConcept)
        //   ) {
        //     console.log('BLOOD GROUP')
        //     if (
        //       bloodGroup &&
        //       isEmpty(formValues.bloodType.bloodGroupValueCodeableConcept)
        //     ) {
        //       updatedBloodGroup = undefined
        //       console.log('DELETE')
        //       transaction.entry.push(
        //         helper.pushRequest(
        //           { resource: bloodGroup, newResource: null },
        //           'DELETE'
        //         )
        //       )
        //       const index = updatedBloodGroupPanel.hasMember.findIndex(value =>
        //         value.reference.endsWith(bloodGroup.id)
        //       )
        //       updatedBloodGroupPanel.hasMember.splice(index, 1)
        //     } else if (
        //       helper.isObject(
        //         formValues.bloodType.bloodGroupValueCodeableConcept
        //       ) &&
        //       !helper.isEmptyObject(
        //         formValues.bloodType.bloodGroupValueCodeableConcept
        //       ) &&
        //       (!bloodGroup ||
        //         !bloodGroup.valueCodeableConcept ||
        //         (bloodGroup &&
        //           bloodGroup.valueCodeableConcept &&
        //           !helper.matchElements(
        //             formValues.bloodType.bloodGroupValueCodeableConcept,
        //             bloodGroup.valueCodeableConcept
        //           )))
        //     ) {
        //       console.log('POST')
        //       console.log(JSON.stringify(bloodGroupPanel))
        //       if (isEmpty(bloodGroup)) {
        //         console.log(JSON.stringify(bloodGroupPanel))
        //         updatedBloodGroup.valueCodeableConcept =
        //           formValues.bloodType.bloodGroupValueCodeableConcept
        //         console.log(JSON.stringify(bloodGroupPanel))
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: null, newResource: updatedBloodGroup },
        //             'POST',
        //             tempBloodGroupId
        //           )
        //         )
        //         console.log(JSON.stringify(bloodGroupPanel))
        //         updatedBloodGroupPanel.hasMember.push({
        //           reference: tempBloodGroupId,
        //           display: 'Blood Group',
        //         })
        //         console.log(JSON.stringify(bloodGroupPanel))
        //       } else {
        //         console.log('NOT EMPTY')
        //         updatedBloodGroup.valueCodeableConcept =
        //           formValues.bloodType.bloodGroupValueCodeableConcept
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: bloodGroup, newResource: updatedBloodGroup },
        //             'PUT'
        //           )
        //         )
        //       }
        //     }
        //   }
        //   /* #endregion */
        //   console.log(JSON.stringify(bloodGroupPanel))
        //   /* #region  Rhesus Status */
        //   console.log(
        //     'RHESUS',
        //     formValues.bloodType,
        //     formValues.bloodType.rhesusStatusValueCodeableConcept,
        //     (rhesusStatus || {}).valueCodeableConcept
        //   )
        //   if (
        //     helper.isObject(formValues.bloodType.rhesusStatusValueCodeableConcept)
        //   ) {
        //     console.log('CHANGED')
        //     if (
        //       rhesusStatus &&
        //       isEmpty(formValues.bloodType.rhesusStatusValueCodeableConcept)
        //     ) {
        //       console.log('DELETE')
        //       updatedRhesusStatus = undefined
        //       transaction.entry.push(
        //         helper.pushRequest(
        //           { resource: rhesusStatus, newResource: null },
        //           'DELETE'
        //         )
        //       )
        //       const index = updatedBloodGroupPanel.hasMember.findIndex(value =>
        //         value.reference.endsWith(rhesusStatus.id)
        //       )
        //       console.log(transaction.entry)
        //       updatedBloodGroupPanel.hasMember.splice(index, 1)
        //       console.log(index, updatedBloodGroupPanel)
        //     } else if (
        //       helper.isObject(
        //         formValues.bloodType.rhesusStatusValueCodeableConcept
        //       ) &&
        //       !helper.isEmptyObject(
        //         formValues.bloodType.rhesusStatusValueCodeableConcept
        //       ) &&
        //       (!rhesusStatus ||
        //         !rhesusStatus.valueCodeableConcept ||
        //         (rhesusStatus &&
        //           rhesusStatus.valueCodeableConcept &&
        //           !helper.matchElements(
        //             formValues.bloodType.rhesusStatusValueCodeableConcept,
        //             rhesusStatus.valueCodeableConcept
        //           )))
        //     ) {
        //       console.log('NOT EQUAL')
        //       if (isEmpty(rhesusStatus)) {
        //         updatedRhesusStatus.valueCodeableConcept =
        //           formValues.bloodType.rhesusStatusValueCodeableConcept
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: null, newResource: updatedRhesusStatus },
        //             'POST',
        //             tempRhStatusId
        //           )
        //         )
        //         updatedBloodGroupPanel.hasMember.push({
        //           reference: tempRhStatusId,
        //           display: 'Rh Status',
        //         })
        //       } else {
        //         console.log('NOT EMPTY')
        //         updatedRhesusStatus.valueCodeableConcept =
        //           formValues.bloodType.rhesusStatusValueCodeableConcept
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: rhesusStatus, newResource: updatedRhesusStatus },
        //             'PUT'
        //           )
        //         )
        //       }
        //     }
        //   }
        //   /* #endregion */
        //   /* #region  Blood Group Panel */
        //   const updatedBloodGroupPanelObservation = new Observation({
        //     ...updatedBloodGroupPanel,
        //   })
        //   console.log(JSON.stringify(bloodGroupPanel))
        //   console.log(isEmpty(bloodGroupPanel))
        //   console.log(bloodGroupPanel)
        //   console.log(updatedBloodGroupPanelObservation)
        //   // console.log(bloodGroupPanel.toJSON())
        //   // console.log(updatedBloodGroupPanelObservation.toJSON())
        //   // console.log(updatedBloodGroupPanelObservation)
        //   // console.log(
        //   //   !isEqual(
        //   //     bloodGroupPanel.toJSON(),
        //   //     updatedBloodGroupPanelObservation.toJSON()
        //   //   )
        //   // )
        //   // return
        //   if (
        //     isEmpty(bloodGroupPanel) ||
        //     !isEqual(
        //       bloodGroupPanel.toJSON(),
        //       updatedBloodGroupPanelObservation.toJSON()
        //     )
        //   ) {
        //     if (isEmpty(bloodGroupPanel)) {
        //       if (updatedBloodGroupPanelObservation.hasMember.length > 0) {
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             {
        //               resource: null,
        //               newResource: updatedBloodGroupPanelObservation,
        //             },
        //             'POST'
        //           )
        //         )
        //       } else {
        //         // do nothing
        //       }
        //     } else {
        //       if (updatedBloodGroupPanelObservation.hasMember.length > 0) {
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             {
        //               resource: bloodGroupPanel,
        //               newResource: updatedBloodGroupPanelObservation,
        //             },
        //             'PUT'
        //           )
        //         )
        //       } else {
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: bloodGroupPanel, newResource: null },
        //             'DELETE'
        //           )
        //         )
        //       }
        //     }
        //   }
        //   /* #endregion */
        // }
        // /* #endregion */
        // /* #region  DietaryFinding.js */
        // if (helper.isObject(formValues.dietaryFinding)) {
        //   if (Array.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.DietaryFinding.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.dietaryFinding)) {
        //         updatedSocialHistory.component[index] = formValues.dietaryFinding
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (!isEmpty(formValues.dietaryFinding)) {
        //       updatedSocialHistory.component.push(formValues.dietaryFinding)
        //     }
        //   } else if (!isEmpty(formValues.dietaryFinding)) {
        //     updatedSocialHistory.component = [formValues.dietaryFinding]
        //   }
        // }
        // /* #endregion */
        // /* #region  Education.js */
        // if (helper.isObject(formValues.education)) {
        //   if (Array.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.HighestLevelOfEducation.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.education)) {
        //         updatedSocialHistory.component[index] = formValues.education
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (!isEmpty(formValues.education)) {
        //       updatedSocialHistory.component.push(formValues.education)
        //     }
        //   } else if (!isEmpty(formValues.education)) {
        //     updatedSocialHistory.component = [formValues.education]
        //   }
        // }
        // /* #endregion */
        // /* #region  EmploymentStatus */
        // if (helper.isObject(formValues.employmentStatus)) {
        //   if (Array.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.EmploymentStatus.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.employmentStatus)) {
        //         updatedSocialHistory.component[index] =
        //           formValues.employmentStatus
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (!isEmpty(formValues.employmentStatus)) {
        //       updatedSocialHistory.component.push(formValues.employmentStatus)
        //     }
        //   } else if (!isEmpty(formValues.employmentStatus)) {
        //     updatedSocialHistory.component = [formValues.employmentStatus]
        //   }
        // }
        // /* #endregion */
        // /* #region  WorkEnvironment */
        // if (helper.isObject(formValues.workEnvironment)) {
        //   if (Array.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.WorkEnvironment.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.workEnvironment)) {
        //         updatedSocialHistory.component[index] = formValues.workEnvironment
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (!isEmpty(formValues.workEnvironment)) {
        //       updatedSocialHistory.component.push(formValues.workEnvironment)
        //     }
        //   } else if (!isEmpty(formValues.workEnvironment)) {
        //     updatedSocialHistory.component = [formValues.workEnvironment]
        //   }
        // }
        // /* #endregion */
        // /* #region  MaritalStatus.js */
        // if (formValues.maritalStatus) {
        //   if (!isEmpty(formValues.maritalStatus)) {
        //     updatedPatient.maritalStatus = formValues.maritalStatus
        //   } else {
        //     delete updatedPatient.__data.maritalStatus
        //   }
        // }
        // /* #endregion */
        // /* #region  OtherInformation.js */
        // if (helper.isObject(formValues.other)) {
        //   // health insurance number
        //   if (Array.isArray(updatedPatient.identifier)) {
        //     const index = updatedPatient.identifier.findIndex(
        //       value =>
        //         value.system ===
        //         FHIR_CODES.Identifiers.HealthInsuranceNumber.system
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.other.healthInsuranceNumber)) {
        //         updatedPatient.identifier[index] = new Identifier(
        //           formValues.other.healthInsuranceNumber
        //         )
        //       } else {
        //         updatedPatient.identifier.splice(index, 1)
        //       }
        //     } else {
        //       if (!isEmpty(formValues.other.healthInsuranceNumber)) {
        //         updatedPatient.identifier.push(
        //           new Identifier(formValues.other.healthInsuranceNumber)
        //         )
        //       }
        //     }
        //   } else {
        //     if (!isEmpty(formValues.other.healthInsuranceNumber)) {
        //       updatedPatient.identifier = [
        //         new Identifier(formValues.other.healthInsuranceNumber),
        //       ]
        //     }
        //   }
        //   // tax id number
        //   if (Array.isArray(updatedPatient.identifier)) {
        //     const index = patient.identifier.findIndex(
        //       i =>
        //         i.type &&
        //         i.type.coding &&
        //         controller.codeIntersects(
        //           i.type,
        //           FHIR_CODES.Identifiers.TaxIdNumber.type
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.other.taxIdNumber)) {
        //         updatedPatient.identifier[index] = new Identifier(
        //           formValues.other.taxIdNumber
        //         )
        //       } else {
        //         updatedPatient.identifier.splice(index, 1)
        //       }
        //     } else {
        //       if (!isEmpty(formValues.other.taxIdNumber)) {
        //         updatedPatient.identifier.push(
        //           new Identifier(formValues.other.taxIdNumber)
        //         )
        //       }
        //     }
        //   } else {
        //     if (!isEmpty(formValues.other.taxIdNumber)) {
        //       updatedPatient.identifier = [
        //         new Identifier(formValues.other.taxIdNumber),
        //       ]
        //     }
        //   }
        //   // ethnicity
        //   if (Array.isArray(updatedPatient.extension)) {
        //     console.log('ETHNICITY')
        //     const index = updatedPatient.extension.findIndex(
        //       value => value.url === FHIR_CODES.Extensions.Ethnicity.url
        //     )
        //     if (index >= 0) {
        //       if (formValues.other.ethnicity) {
        //         updatedPatient.extension[index] = new Extension(
        //           formValues.other.ethnicity
        //         )
        //       } else {
        //         updatedPatient.extension.splice(index, 1)
        //       }
        //     } else {
        //       updatedPatient.extension.push(
        //         new Extension(formValues.other.ethnicity)
        //       )
        //     }
        //   } else {
        //     updatedPatient.extension = [new Extension(formValues.other.ethnicity)]
        //   }
        //   // salary
        //   if (Array.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.Salary.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (formValues.other.salary) {
        //         updatedSocialHistory.component[index] = formValues.other.salary
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (formValues.other.salary) {
        //       updatedSocialHistory.component.push(formValues.other.salary)
        //     }
        //   } else if (formValues.other.salary) {
        //     updatedSocialHistory.component = [formValues.other.salary]
        //   }
        //   // occupation
        //   if (Array.isArray(updatedSocialHistory.component)) {
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.Occupation.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (formValues.other.occupation) {
        //         updatedSocialHistory.component[index] =
        //           formValues.other.occupation
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (formValues.other.occupation) {
        //       updatedSocialHistory.component.push(formValues.other.occupation)
        //     }
        //   } else if (formValues.other.occupation) {
        //     updatedSocialHistory.component = [formValues.other.occupation]
        //   }
        // }
        // /* #endregion */
        // /* #region  VitalSign.js */
        // if (
        //   formValues.vitalSign.heightValueQuantity ||
        //   formValues.vitalSign.weightValueQuantity ||
        //   formValues.vitalSign.generalhealth ||
        //   formValues.vitalSign.mentalDisorder
        // ) {
        //   // ignoring BodyMassIndex (set on initialValue)
        //   /* #region  Body Height */
        //   if (helper.isObject(formValues.vitalSign.heightValueQuantity)) {
        //     if (
        //       !isEmpty(bodyHeight) &&
        //       helper.isEmptyObject(formValues.vitalSign.heightValueQuantity)
        //     ) {
        //       updatedBodyHeight = undefined
        //       transaction.entry.push(
        //         helper.pushRequest(
        //           { resource: bodyHeight, newResource: null },
        //           'DELETE'
        //         )
        //       )
        //       const heightIndex = updatedVitalsPanel.hasMember.findIndex(value =>
        //         value.reference.endsWith(bodyHeight.id)
        //       )
        //       updatedVitalsPanel.hasMember.splice(heightIndex, 1)
        //     } else if (
        //       !bodyHeight ||
        //       !bodyHeight.valueQuantity ||
        //       (bodyHeight &&
        //         bodyHeight.valueQuantity &&
        //         !helper.matchElements(
        //           formValues.vitalSign.heightValueQuantity,
        //           bodyHeight.valueQuantity.toJSON()
        //         ))
        //     ) {
        //       if (isEmpty(bodyHeight)) {
        //         updatedBodyHeight.valueQuantity =
        //           formValues.vitalSign.heightValueQuantity
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: null, newResource: updatedBodyHeight },
        //             'POST',
        //             tempBodyHeightId
        //           )
        //         )
        //         updatedVitalsPanel.hasMember.push({
        //           reference: tempBodyHeightId,
        //           display: 'Body Height',
        //         })
        //       } else {
        //         updatedBodyHeight.valueQuantity =
        //           formValues.vitalSign.heightValueQuantity
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: bodyHeight, newResource: updatedBodyHeight },
        //             'PUT'
        //           )
        //         )
        //       }
        //     }
        //   }
        //   /* #endregion */
        //   /* #region  Body Weight */
        //   if (helper.isObject(formValues.vitalSign.weightValueQuantity)) {
        //     if (
        //       !isEmpty(bodyWeight) &&
        //       helper.isEmptyObject(formValues.vitalSign.weightValueQuantity)
        //     ) {
        //       updatedBodyWeight = undefined
        //       transaction.entry.push(
        //         helper.pushRequest(
        //           { resource: bodyWeight, newResource: null },
        //           'DELETE'
        //         )
        //       )
        //       const index = updatedVitalsPanel.hasMember.findIndex(value =>
        //         value.reference.endsWith(bodyWeight.id)
        //       )
        //       updatedVitalsPanel.hasMember.splice(index, 1)
        //     } else if (
        //       !bodyWeight ||
        //       !bodyWeight.valueQuantity ||
        //       (bodyWeight &&
        //         bodyWeight.valueQuantity &&
        //         !helper.matchElements(
        //           formValues.vitalSign.weightValueQuantity,
        //           bodyWeight.valueQuantity.toJSON()
        //         ))
        //     ) {
        //       if (isEmpty(bodyWeight)) {
        //         updatedBodyWeight.valueQuantity =
        //           formValues.vitalSign.weightValueQuantity
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: null, newResource: updatedBodyWeight },
        //             'POST',
        //             tempBodyHeightId
        //           )
        //         )
        //         updatedVitalsPanel.hasMember.push({
        //           reference: tempBodyHeightId,
        //           display: 'Body Weight',
        //         })
        //       } else {
        //         updatedBodyWeight.valueQuantity =
        //           formValues.vitalSign.weightValueQuantity
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: bodyWeight, newResource: updatedBodyWeight },
        //             'PUT'
        //           )
        //         )
        //       }
        //     }
        //   }
        //   /* #endregion */
        //   /* #region  BMI */
        //   if (
        //     helper.isObject(formValues.vitalSign.heightValueQuantity) &&
        //     helper.isObject(formValues.vitalSign.weightValueQuantity) &&
        //     helper.isObject(formValues.vitalSign.bodyMassIndexValueQuantity)
        //   ) {
        //     // BMI Changed
        //     if (
        //       !isEmpty(bodyMassIndex) &&
        //       helper.isEmptyObject(
        //         formValues.vitalSign.bodyMassIndexValueQuantity
        //       )
        //     ) {
        //       updatedBodyMassIndex = undefined
        //       transaction.entry.push(
        //         helper.pushRequest(
        //           { resource: bodyMassIndex, newResource: null },
        //           'DELETE'
        //         )
        //       )
        //       const index = updatedVitalsPanel.hasMember.findIndex(value =>
        //         value.reference.endsWith(bodyMassIndex.id)
        //       )
        //       updatedVitalsPanel.hasMember.splice(index, 1)
        //     } else if (
        //       !bodyMassIndex ||
        //       !bodyMassIndex.valueQuantity ||
        //       (bodyMassIndex &&
        //         bodyMassIndex.valueQuantity &&
        //         !helper.matchElements(
        //           formValues.vitalSign.bodyMassIndexValueQuantity,
        //           bodyMassIndex.valueQuantity.toJSON()
        //         ))
        //     ) {
        //       if (isEmpty(bodyMassIndex)) {
        //         updatedBodyMassIndex.valueQuantity =
        //           formValues.vitalSign.bodyMassIndexValueQuantity
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: null, newResource: updatedBodyMassIndex },
        //             'POST',
        //             tempBodyMassIndexId
        //           )
        //         )
        //         updatedVitalsPanel.hasMember.push({
        //           reference: tempBodyMassIndexId,
        //           display: 'Body Mass Index',
        //         })
        //       } else {
        //         updatedBodyMassIndex.valueQuantity =
        //           formValues.vitalSign.bodyMassIndexValueQuantity
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             {
        //               resource: bodyMassIndex,
        //               newResource: updatedBodyMassIndex,
        //             },
        //             'PUT'
        //           )
        //         )
        //       }
        //     }
        //   }
        //   /* #endregion */
        //   /* #region  Vitals Panel */
        //   const updatedVitalsPanelObservation = new Observation(
        //     updatedVitalsPanel
        //   )
        //   if (
        //     !vitalsPanel ||
        //     !isEqual(vitalsPanel.toJSON(), updatedVitalsPanelObservation.toJSON())
        //   ) {
        //     if (isEmpty(vitalsPanel)) {
        //       if (updatedVitalsPanel.hasMember.length > 0) {
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             {
        //               resource: null,
        //               newResource: updatedVitalsPanelObservation,
        //             },
        //             'POST'
        //           )
        //         )
        //       } else {
        //         // do nothing
        //       }
        //     } else {
        //       if (updatedVitalsPanel.hasMember.length > 0) {
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             {
        //               resource: vitalsPanel,
        //               newResource: updatedVitalsPanelObservation,
        //             },
        //             'PUT'
        //           )
        //         )
        //       } else {
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: vitalsPanel, newResource: null },
        //             'DELETE'
        //           )
        //         )
        //       }
        //     }
        //   }
        //   /* #endregion */
        //   /* #region  General Health */
        //   console.log(
        //     'GENERAL HEALTH',
        //     formValues.vitalSign.generalHealthComponent
        //   )
        //   if (helper.isObject(formValues.vitalSign.generalHealthComponent)) {
        //     // maybe changed
        //     const index = updatedSocialHistory.component.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Observations.GeneralHealth.code
        //         )
        //     )
        //     if (index >= 0) {
        //       if (!isEmpty(formValues.vitalSign.generalHealthComponent)) {
        //         updatedSocialHistory.component[index] =
        //           formValues.vitalSign.generalHealthComponent
        //       } else {
        //         updatedSocialHistory.component.splice(index, 1)
        //       }
        //     } else if (!isEmpty(formValues.vitalSign.generalHealthComponent)) {
        //       if (helper.isArray(updatedSocialHistory.component)) {
        //         updatedSocialHistory.component.push(
        //           formValues.vitalSign.generalHealthComponent
        //         )
        //       } else {
        //         updatedSocialHistory.component = [
        //           formValues.vitalSign.generalHealthComponent,
        //         ]
        //       }
        //     }
        //   }
        //   /* #endregion */
        //   /* #region  MentalDisorder */
        //   if (
        //     helper.isEmptyObject(formValues.vitalSign.mentalDisorder) &&
        //     !!conditions
        //   ) {
        //     const index = conditions.findIndex(
        //       value =>
        //         value.code &&
        //         controller.codeIntersects(
        //           value.code,
        //           FHIR_CODES.Conditions.MentalDisorder
        //         )
        //     )
        //     if (index >= 0) {
        //       if (helper.isEmptyObject(formValues.vitalSign.mentalDisorder)) {
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             { resource: conditions[index], newResource: null },
        //             'DELETE'
        //           )
        //         )
        //       } else {
        //         // no changes
        //       }
        //     }
        //   } else if (
        //     !helper.isEmptyObject(formValues.vitalSign.mentalDisorder) &&
        //     helper.isObject(formValues.vitalSign.mentalDisorder)
        //   ) {
        //     const mentalDisorderCondition = new Condition({
        //       resourceType: 'Condition',
        //       clinicalStatus: FHIR_CODES.Conditions.ClinicalStatusActive,
        //       verificationStatus:
        //         FHIR_CODES.Conditions.VerificationStatusUnconfirmed,
        //       category: [FHIR_CODES.Categories.ProblemListItem],
        //       subject: subject,
        //       code: FHIR_CODES.Conditions.MentalDisorder,
        //     })
        //     transaction.entry.push(
        //       helper.pushRequest(
        //         { resource: null, newResource: mentalDisorderCondition },
        //         'POST'
        //       )
        //     )
        //   }
        // }
        // /* #endregion */
        // /* #region  Disability.js */
        // console.log('DISABILITY', formValues.disability)
        // console.log('PATIENT', patient, updatedPatient)
        // if (helper.isObject(formValues.disability)) {
        //   const updatedConditionCodes = Object.values(formValues.disability)
        //   console.log(
        //     conditions &&
        //       !isEqual(
        //         conditions.map(cond => cond.code).filter(code => !!code),
        //         updatedConditionCodes
        //       ),
        //     conditions,
        //     conditions && conditions.map(cond => cond.code),
        //     updatedConditionCodes
        //   )
        //   if (
        //     !conditions ||
        //     (conditions &&
        //       !isEqual(
        //         conditions.map(cond => cond.code).filter(code => !!code),
        //         updatedConditionCodes
        //       ))
        //   ) {
        //     // post
        //     updatedConditionCodes.forEach(updatedCode => {
        //       if (
        //         !conditions ||
        //         !(
        //           conditions &&
        //           conditions.some(cond =>
        //             controller.codeIntersects(cond.code, updatedCode)
        //           )
        //         )
        //       ) {
        //         const updatedCondition = new Condition({
        //           clinicalStatus:
        //             FHIR_CODES.ConditionStatuses.ClinicalStatusActive,
        //           verificationStatus:
        //             FHIR_CODES.ConditionStatuses.VerificationStatusUnconfirmed,
        //           category: [FHIR_CODES.Categories.ProblemListItem],
        //           subject: subject,
        //           code: updatedCode,
        //         })
        //         transaction.entry.push(
        //           helper.pushRequest(
        //             {
        //               resource: null,
        //               newResource: updatedCondition,
        //             },
        //             'POST'
        //           )
        //         )
        //       }
        //     })
        //     // delete
        //     conditions &&
        //       conditions.forEach(cond => {
        //         if (
        //           cond.code &&
        //           !updatedConditionCodes.some(updatedCode =>
        //             controller.codeIntersects(updatedCode, cond.code)
        //           )
        //         ) {
        //           transaction.entry.push(
        //             helper.pushRequest(
        //               { resource: cond, newResource: null },
        //               'DELETE'
        //             )
        //           )
        //         }
        //       })
        //   }
        // }
        // /* #endregion */
      }

      /* #region  Contact.js */
      if (helper.isObject(formValues.contact)) {
        updatedPatient.contact = formValues.contact.patientContact && [
          new PatientContact(formValues.contact.patientContact),
        ]
        if (Array.isArray(updatedPatient.telecom)) {
          const index = updatedPatient.telecom.findIndex(
            value => value.system === 'email'
          )
          if (index >= 0) {
            if (formValues.contact.email) {
              updatedPatient.telecom[index].value = formValues.contact.email
            } else {
              updatedPatient.telecom.splice(index, 1)
              if (updatedPatient.telecom.length === 0) {
                delete updatedPatient.telecom
              }
            }
          } else {
            updatedPatient._addEmail(formValues.contact.email)
          }
        } else if (formValues.contact.email) {
          updatedPatient._addEmail(formValues.contact.email)
        }
      }
      /* #endregion */

      /* #region  Required.js */
      if (helper.isObject(formValues.required)) {
        console.log('changed required fields')
        updatedPatient._setFamilyName(formValues.required.familyName)
        updatedPatient._setGivenName(formValues.required.givenName)
        updatedPatient._setNationalIdentificationNumber(
          formValues.required.nationalIdentifier
        )
        if (Array.isArray(updatedPatient.identifier)) {
          const index = updatedPatient.identifier.findIndex(
            value =>
              value.type &&
              value.type.text ===
                FHIR_CODES.Identifiers.NationalPersonIdentifierOfForeigners.type
                  .text
          )
          if (index >= 0) {
            updatedPatient.identifier[index] = new Identifier(
              formValues.required.foreignIdentifier
            )
          } else if (
            formValues.required.foreignIdentifier &&
            formValues.required.foreignIdentifier.length > 0
          ) {
            updatedPatient.identifier.push(
              new Identifier(formValues.required.foreignIdentifier)
            )
          }
        } else if (
          formValues.required.foreignIdentifier &&
          formValues.required.foreignIdentifier.length > 0
        ) {
          updatedPatient.identifier = [
            new Identifier(formValues.required.foreignIdentifier),
          ]
        }
        if (Array.isArray(updatedPatient.telecom)) {
          const index = updatedPatient.telecom.findIndex(
            value => value.system === 'phone' && value.use === 'mobile'
          )
          if (index >= 0) {
            updatedPatient.telecom[index].value =
              formValues.required.phoneNumber
          } else {
            updatedPatient._addMobilePhone(formValues.required.phoneNumber)
          }
        } else {
          updatedPatient._addMobilePhone(formValues.required.phoneNumber)
        }
      }
      /* #endregion */

      /* #region  update Problem List */
      console.log(
        'PROBLEM LIST',
        problemList,
        isEmpty(problemList),
        updatedProblemListObject
      )
      transaction.entry.forEach(entry => {
        if (entry.resource && entry.resource.resourceType === 'Condition') {
          if (entry.request && entry.request.method === 'DELETE') {
            const index = updatedProblemListObject.entry.findIndex(
              problemListEntry =>
                problemListEntry.item.reference.endsWith(
                  `Condition/${entry.resource.id}`
                )
            )
            updatedProblemListObject.entry.splice(index, 1)
          } else if (entry.request && entry.request.method === 'POST') {
            updatedProblemListObject.entry.push({
              item: {
                reference: entry.fullUrl,
              },
            })
          }
        }
      })
      const updatedProblemList = new List(updatedProblemListObject)
      if (!isEmpty(problemList) && updatedProblemList.entry.length === 0) {
        // delete from problem list
        transaction.entry.push(
          helper.pushRequest(
            {
              resource: problemList,
              newResource: updatedProblemList,
            },
            'DELETE'
          )
        )
      } else if (isEmpty(problemList) && updatedProblemList.entry.length > 0) {
        // add to problem list
        transaction.entry.push(
          helper.pushRequest(
            {
              resource: null,
              newResource: updatedProblemList,
            },
            'POST'
          )
        )
      } else if (
        problemList &&
        !helper.isEmptyObject(problemList) &&
        !helper.isEmptyObject(updatedProblemList) &&
        !isEqual(problemList.toJSON(), updatedProblemList.toJSON())
      ) {
        // update problem list
        transaction.entry.push(
          helper.pushRequest(
            {
              resource: problemList,
              newResource: updatedProblemList,
            },
            'PUT'
          )
        )
      }
      /* #endregion */

      /* #region  Building Transaction */
      // console.log(isEqual(patient, updatedPatient), patient, updatedPatient)
      if (!isEqual(patient, updatedPatient)) {
        transaction.entry.push(
          helper.pushRequest(
            { resource: patient, newResource: updatedPatient },
            'PUT'
          )
        )
      }
      const updatedSocialHistoryObservation = new Observation(
        updatedSocialHistory
      )
      if (
        !socialHistory ||
        !isEqual(
          socialHistory.toJSON(),
          updatedSocialHistoryObservation.toJSON()
        )
      ) {
        // comparing classes here.
        // NOTE: don't compare Class to Object e.g: socialHistory === updatedSocialHistory
        if (isEmpty(updatedSocialHistoryObservation.component)) {
          if (!isEmpty(socialHistory)) {
            transaction.entry.push(
              helper.pushRequest(
                { resource: socialHistory, newResource: null },
                'DELETE'
              )
            )
          }
        } else {
          if (isEmpty(socialHistory)) {
            transaction.entry.push(
              helper.pushRequest(
                {
                  resource: null,
                  newResource: updatedSocialHistoryObservation,
                },
                'POST'
              )
            )
          } else {
            transaction.entry.push(
              helper.pushRequest(
                {
                  resource: socialHistory,
                  newResource: updatedSocialHistoryObservation,
                },
                'PUT'
              )
            )
          }
        }
      }

      const updatedPatientInformationListObject =
        patientInformationList && cloneDeep(patientInformationList.toJSON())
      transaction.entry.forEach((entryItem, index) => {
        if (
          entryItem.resource.code &&
          [
            FHIR_CODES.Observations.BloodGroupPanel,
            FHIR_CODES.Observations.VitalSigns,
            FHIR_CODES.Observations.PatientInformation,
            FHIR_CODES.Lists.ProblemList,
          ].some(
            ob =>
              ob.code &&
              controller.codeIntersects(entryItem.resource.code, ob.code)
          )
        ) {
          if (entryItem.request && entryItem.request.method === 'DELETE') {
            updatedPatientInformationListObject.entry.splice(index, 1)
          } else if (entryItem.request && entryItem.request.method === 'POST') {
            updatedPatientInformationListObject.entry.push({
              item: {
                reference: entryItem.fullUrl,
              },
            })
          }
        }
      })
      if (
        !isEqual(updatedPatientInformationListObject, patientInformationList)
      ) {
        const updatedPatientInformationList = new List(
          updatedPatientInformationListObject
        )
        transaction.entry.push(
          helper.pushRequest(
            {
              resource: patientInformationList,
              newResource: updatedPatientInformationList,
            },
            'PUT'
          )
        )
      }
      /* #endregion */

      const bundle = new Bundle({
        type: 'transaction',
        entry: [...transaction.entry],
      })
      const json = bundle.toJSON()

      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            lastUpadtedPrivateInformation: dateTime.getInstant(),
          },
        })

        return true
      } else {
        throw response
      }
    },
    /* #endregion */

    *payment({ payload }, { put }) {
      const { paymentValues, research } = payload
      yield put({
        type: 'updatePayment',
        payload: { paymentValues, research },
      })
    },

    /**
     * шинжилгээ болон үзлэг хийлгэх хүсэлтийг серверрүү илгээхдээ yield call() функцийг ашиглана
     * @payload нь Uncategorized, Immunology, Biochemistry шинжилгээнүүдийг дотроо агуулсан объект байна
     */

    *cancelTestsAndCheckup({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          SelectedTests: {},
          SelectedTestItems: [],
          labTestCost: 0,
          SelectedCheckup: {},
          checkupCost: 0,
          SelectedDiagnosticTests: [],
          diagnosticTestCost: 0,
        },
      })
    },

    /**
     * Энэ функц нь шинжилгээ сонгогдоход дуудагдана
     * @payload нь сонгосон шинжилгээнүүдийг агуулах объект байх ба
     * payload ыг доор тодорхойлогдсон reducer функцруу дамжуулна
     */

    /* #region  Orders */
    *labTestOrder({ payload }, { put }) {
      const { SelectedTests } = payload
      const newSelectedTests = {}
      const selectedTestItems = []
      let cost = 0

      if (SelectedTests && Object.values(SelectedTests)) {
        Object.keys(SelectedTests).forEach(testKey => {
          // Uncategorized || Immunology || Biochemistry
          if (!newSelectedTests[testKey]) {
            newSelectedTests[testKey] = {
              code:
                // testKey !== 'UncategorizedTests' &&
                SelectedTests[testKey].code,
              display:
                // testKey !== 'UncategorizedTests' &&
                SelectedTests[testKey].display,
              include: {},
            }
          }
          Object.keys(SelectedTests[testKey]['include']).forEach(subTestKey => {
            if (
              SelectedTests[testKey]['include'][subTestKey]['include'] &&
              !helper.isEmptyObject(
                SelectedTests[testKey]['include'][subTestKey]['include']
              )
            ) {
              // if subTest.include has tests
              // then copy to newSelectedTests
              newSelectedTests[testKey]['include'][subTestKey] =
                SelectedTests[testKey]['include'][subTestKey]

              // Rapid Tests || Viral Load Tests ... etc,
              Object.keys(
                SelectedTests[testKey]['include'][subTestKey]['include']
              ).forEach(subTestItemKey => {
                const subTestItem =
                  SelectedTests[testKey]['include'][subTestKey]['include'][
                    subTestItemKey
                  ]
                // anti-HCV || HBsAg ... etc,
                selectedTestItems.push(subTestItem)
                cost = cost + subTestItem.cost
              })
            }
          })
        })

        Object.keys(newSelectedTests).forEach(testKey => {
          // if include is empty then delete codes
          if (helper.isEmptyObject(newSelectedTests[testKey]['include'])) {
            delete newSelectedTests[testKey]
          }
        })
      }
      yield put({
        type: 'updateState',
        payload: {
          SelectedTests: newSelectedTests,
          SelectedTestItems: selectedTestItems,
          labTestCost: cost,
        },
      })

      yield put({ type: 'updateTotal' })
      return payload
    },

    *checkupOrder({ payload }, { select, put }) {
      const { practitioner, selectedSlot, checkupType } = payload
      const { FHIR_CODES } = yield select(state => state.app)
      let cost

      if (!!practitioner && !!checkupType) {
        cost = FHIR_CODES.Checkup[checkupType].cost
      }

      yield put({
        type: 'updateState',
        payload: {
          SelectedCheckup: {
            practitioner,
            selectedSlot,
            checkupType,
          },
          checkupCost: cost,
        },
      })

      yield put({ type: 'updateTotal' })
    },

    *diagnosticTestOrder({ payload }, { put, select }) {
      const { SelectedDiagnosticTests } = payload
      const { DiagnosticTests } = yield select(state => state.app.FHIR_CODES)
      let cost = 0

      if (SelectedDiagnosticTests.length !== 0) {
        cost = SelectedDiagnosticTests.map(item => {
          return DiagnosticTests.include[item].cost
        }).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
      }

      yield put({
        type: 'updateState',
        payload: {
          SelectedDiagnosticTests: SelectedDiagnosticTests,
          diagnosticTestCost: cost,
        },
      })

      yield put({ type: 'updateTotal' })
    },

    *serviceSetsOrder({ payload }, { put }) {
      const { SelectedServiceSets } = payload
      yield put({
        type: 'updateState',
        payload: {
          SelectedServiceSets: SelectedServiceSets,
        },
      })
    },
    /* #endregion */

    *getSelectedSubTest({ payload }, { select }) {
      // Test -> SubTest -> SubTestItem
      const SelectedTests = yield select(state => state.SelectedTests)
      return SelectedTests[payload.Test][payload.SubTest]
    },

    *checkout({ payload = {} }, { select, put, call }) {
      const localState = yield select(state => state.reception_patientProfile)
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, Practitioner, user } = globalState

      const {
        SelectedTests,
        SelectedCheckup,
        SelectedDiagnosticTests,
        checkupCost,
        labTestCost,
        diagnosticTestCost,
        totalAmount,
        patient,
        research,
        patientBarcode,
        patientReference,
        SpecimenRequiredTests,
        SelectedTestItems,
      } = localState

      const { payment } = payload
      const { id } = patient
      // const pateintResource = new Patient(patient)
      payment.labTestCost = labTestCost
      payment.diagnosticTestCost = diagnosticTestCost
      payment.checkupCost = checkupCost
      payment.totalAmount = totalAmount

      const serviceRequestList = []
      const diagnosticsTestList = []
      const requisition = Object.assign(
        {
          value: dateTime.getInstant(),
        },
        FHIR_CODES.Identifiers.ServiceRequestRequisition
      )

      const requester = Practitioner.getReference()
      const defaultElements = {
        status: 'active', // R!  draft | active | suspended | completed | entered-in-error | cancelled
        intent: 'order', // R!  proposal | plan | order +
        requisition: requisition,
        priority: 'routine', // routine | urgent | asap | stat
        requester: requester,
        performer: [globalState.Organization.getReference()],
        authoredOn: dateTime.getInstant(),
        subject: patientReference,
      }

      /* #region Diagnostic Test */

      if (
        helper.isArray(SelectedDiagnosticTests) &&
        !helper.isEmptyObject(SelectedDiagnosticTests)
      ) {
        SelectedDiagnosticTests.forEach(diagnosticsKey => {
          const diagnosticTest =
            FHIR_CODES.DiagnosticTests.include[diagnosticsKey]

          const serviceRequest = new ServiceRequest({
            ...defaultElements,
            category: [FHIR_CODES.Categories.Imaging],
            code: diagnosticTest.code,
          })

          const serviceRequestEntry = new BundleEntry({
            fullUrl: helper.generateFullUrl(),
            resource: serviceRequest,
            request: {
              method: 'POST',
              url: 'ServiceRequest',
            },
          })

          diagnosticsTestList.push(serviceRequestEntry)
        })
      }

      /* #endregion */

      /* #region  Consultation Order  */

      let consultationEntry
      let slotEntry
      let appointmentEntry

      if (
        helper.isObject(SelectedCheckup) &&
        !helper.isEmptyObject(SelectedCheckup) &&
        SelectedCheckup.practitioner &&
        SelectedCheckup.checkupType
      ) {
        const consultationServiceRequest = new ServiceRequest({
          ...defaultElements,
          category: [FHIR_CODES.Categories.Counselling],
          code: FHIR_CODES.Checkup[SelectedCheckup.checkupType].code,
          performer: [
            globalState.Organization.getReference(),
            SelectedCheckup.practitioner.getReference(),
          ],
        })

        consultationEntry = new BundleEntry(
          helper.pushRequest(
            {
              newResource: consultationServiceRequest,
            },
            'POST'
          )
        )

        const updatedSlot = new Slot({
          ...SelectedCheckup.selectedSlot,
          status: 'busy',
        })

        slotEntry = new BundleEntry(
          helper.pushRequest(
            {
              resource: SelectedCheckup.selectedSlot,
              newResource: updatedSlot,
            },
            'PUT'
          )
        )

        let appointmentType =
          FHIR_CODES.Checkup[SelectedCheckup.checkupType].appointmentType

        const newAppointment = new Appointment({
          identifier: [
            {
              ...FHIR_CODES.Identifiers.LiverCenter.Appointment,
              value: dateTime.getInstant(),
            },
          ],
          status: 'booked',
          serviceCategory: SelectedCheckup.selectedSlot.serviceCategory,
          serviceType: SelectedCheckup.selectedSlot.serviceType,
          specialty: SelectedCheckup.selectedSlot.specialty,
          appointmentType: appointmentType,
          start: SelectedCheckup.selectedSlot.start,
          end: SelectedCheckup.selectedSlot.end,
          minutesDuration: 15,
          slot: [
            {
              reference: slotEntry.fullUrl,
            },
          ],
          created: dateTime.getInstant(),
          basedOn: [
            {
              reference: consultationEntry.fullUrl,
            },
          ],
          participant: [
            {
              type: FHIR_CODES.Appointments.ParicipantType.Consultant,
              actor: SelectedCheckup.practitioner.getReference(),
              required: FHIR_CODES.Appointments.ParticipantRequired.Required,
              status: FHIR_CODES.Appointments.ParticipationStatus.Tentative,
              period: {
                start: SelectedCheckup.selectedSlot.start,
                end: SelectedCheckup.selectedSlot.end,
              },
            },
            {
              actor: patient.getReference(),
              required: FHIR_CODES.Appointments.ParticipantRequired.Required,
              status: FHIR_CODES.Appointments.ParticipationStatus.Accepted,
              period: {
                start: SelectedCheckup.selectedSlot.start,
                end: SelectedCheckup.selectedSlot.end,
              },
            },
          ],
        })

        appointmentEntry = new BundleEntry(
          helper.pushRequest(
            {
              newResource: newAppointment,
            },
            'POST'
          )
        )
      }

      /* #endregion */

      /* #region  Lab Test Orders */
      if (!isEmpty(SelectedTests)) {
        let grandParentTestItemBundleEntry
        Object.keys(SelectedTests).forEach(test => {
          let serviceRequestRoot

          if (test !== 'UncategorizedTests') {
            serviceRequestRoot = new ServiceRequest({
              ...defaultElements,
              category: [
                // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
                FHIR_CODES.Categories.LaboratoryProcedure,
                FHIR_CODES.Categories.GrandparentServiceRequest,
              ],
              code: SelectedTests[test].code,
            })

            grandParentTestItemBundleEntry = new BundleEntry({
              fullUrl: helper.generateFullUrl(),
              resource: serviceRequestRoot,
              request: {
                method: 'POST',
                url: 'ServiceRequest',
              },
            })

            serviceRequestList.push(grandParentTestItemBundleEntry)
          }

          Object.keys(SelectedTests[test]['include']).forEach(testItem => {
            let testItemServiceRequest
            let parentTestItemBundleEntry

            if (testItem === 'OtherTests') {
            } else {
              testItemServiceRequest = new ServiceRequest({
                ...defaultElements,
                category: [
                  // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
                  FHIR_CODES.Categories.LaboratoryProcedure,
                  FHIR_CODES.Categories.ParentServiceRequest,
                ],
                code: SelectedTests[test]['include'][testItem].code,
              })

              if (
                test !== 'UncategorizedTests' &&
                !!grandParentTestItemBundleEntry
              ) {
                testItemServiceRequest.basedOn = [
                  {
                    reference: grandParentTestItemBundleEntry.fullUrl,
                  },
                ]
              }

              parentTestItemBundleEntry = new BundleEntry({
                fullUrl: helper.generateFullUrl(),
                resource: testItemServiceRequest,
                request: {
                  method: 'POST',
                  url: 'ServiceRequest',
                },
              })

              serviceRequestList.push(parentTestItemBundleEntry)
            }

            // console.log('values', Object.values(SelectedTests[test][testItem]))
            const subEntries = []

            Object.keys(
              SelectedTests[test]['include'][testItem]['include']
            ).forEach(subTestItemKey => {
              let subTestItemServiceRequest

              if (subTestItemKey === 'Hematology') {
                const testItemServiceRequest = new ServiceRequest({
                  ...defaultElements,
                  category: [
                    // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
                    FHIR_CODES.Categories.LaboratoryProcedure,
                    FHIR_CODES.Categories.ParentServiceRequest,
                  ],
                  code:
                    FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology
                      .code,
                })

                const HematologyTestItemBundleEntry = new BundleEntry({
                  fullUrl: helper.generateFullUrl(),
                  resource: testItemServiceRequest,
                  request: {
                    method: 'POST',
                    url: 'ServiceRequest',
                  },
                })

                subEntries.push(HematologyTestItemBundleEntry)

                Object.keys(
                  FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology
                    .include
                ).forEach(hematologyItem => {
                  const hematologyItemCode =
                    FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology
                      .include[hematologyItem].code

                  const hematologyItemServiceRequest = new ServiceRequest({
                    ...defaultElements,
                    category: [
                      // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
                      FHIR_CODES.Categories.LaboratoryProcedure,
                      FHIR_CODES.Categories.ChildServiceRequest,
                    ],
                    code: hematologyItemCode,
                    basedOn: HematologyTestItemBundleEntry && [
                      {
                        reference: HematologyTestItemBundleEntry.fullUrl,
                      },
                    ],
                  })

                  const hematologyBundleEntry = new BundleEntry({
                    fullUrl: helper.generateFullUrl(),
                    resource: hematologyItemServiceRequest,
                    request: {
                      method: 'POST',
                      url: 'ServiceRequest',
                    },
                  })

                  subEntries.push(hematologyBundleEntry)
                })
              } else if (subTestItemKey === 'Coagulation') {
                const testItemServiceRequest = new ServiceRequest({
                  ...defaultElements,
                  category: [
                    // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
                    FHIR_CODES.Categories.LaboratoryProcedure,
                    FHIR_CODES.Categories.ParentServiceRequest,
                  ],
                  code:
                    FHIR_CODES.UncategorizedTests.OtherTests.include.Coagulation
                      .code,
                })

                const CoagulationTestItemBundleEntry = new BundleEntry({
                  fullUrl: helper.generateFullUrl(),
                  resource: testItemServiceRequest,
                  request: {
                    method: 'POST',
                    url: 'ServiceRequest',
                  },
                })

                subEntries.push(CoagulationTestItemBundleEntry)

                Object.keys(
                  FHIR_CODES.UncategorizedTests.OtherTests.include.Coagulation
                    .include
                ).forEach(coagulationItem => {
                  const coagulationItemCode =
                    FHIR_CODES.UncategorizedTests.OtherTests.include.Coagulation
                      .include[coagulationItem].code

                  const coagulationItemServiceRequest = new ServiceRequest({
                    ...defaultElements,
                    category: [
                      // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
                      FHIR_CODES.Categories.LaboratoryProcedure,
                      FHIR_CODES.Categories.ChildServiceRequest,
                    ],
                    code: coagulationItemCode,
                    basedOn: CoagulationTestItemBundleEntry && [
                      {
                        reference: CoagulationTestItemBundleEntry.fullUrl,
                      },
                    ],
                  })

                  const coagulationBundleEntry = new BundleEntry({
                    fullUrl: helper.generateFullUrl(),
                    resource: coagulationItemServiceRequest,
                    request: {
                      method: 'POST',
                      url: 'ServiceRequest',
                    },
                  })

                  subEntries.push(coagulationBundleEntry)
                })
              }

              ///////////////////////////////
              else {
                const subTestItem =
                  SelectedTests[test]['include'][testItem]['include'][
                    subTestItemKey
                  ]
                subTestItemServiceRequest = new ServiceRequest({
                  ...defaultElements,
                  category: [
                    // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
                    FHIR_CODES.Categories.LaboratoryProcedure,
                    FHIR_CODES.Categories.ChildServiceRequest,
                  ],
                  code: subTestItem.code,
                  basedOn: parentTestItemBundleEntry && [
                    {
                      reference: parentTestItemBundleEntry.fullUrl,
                    },
                  ],
                })

                // custom bundle
                const subTestItemBundleEntry = new BundleEntry({
                  fullUrl: helper.generateFullUrl(),
                  resource: subTestItemServiceRequest,
                  request: {
                    method: 'POST',
                    url: 'ServiceRequest',
                  },
                  cost: subTestItem.cost,
                })

                subEntries.push(subTestItemBundleEntry)
              }
            })

            subEntries.length > 0 && serviceRequestList.push(...subEntries)
          })
        })
      }
      /* #endregion */
      // return
      /* #region  calculate specimens */

      // selectedTest, serviceRequestList

      let specimenServiceRequest = []
      const externalSpecimenLog = []
      let specimenRequestCheckedList = {}
      //let LabTestsAndCheckup = {}

      const LabTestsAndCheckup = {
        SelectedCheckup,
        SelectedTestItems,
      }

      // if (SelectedTestItems.length === 0) {
      //   hasOrderedLabTests = false
      // } else {
      //   hasOrderedLabTests = true
      // }
      // serviceRequestList -r dawtaad code-ni ali neg sorits awdag shinjilgeetei tohirch
      // baih yum bol specimenList husnegted nemne

      serviceRequestList.forEach(entryItem => {
        const requiredSpecimenKey = Object.keys(SpecimenRequiredTests).find(
          key =>
            SpecimenRequiredTests[key].code &&
            entryItem.resource &&
            entryItem.resource.code &&
            controller.codeIntersects(
              entryItem.resource.code,
              SpecimenRequiredTests[key].code
            )
        )

        if (!requiredSpecimenKey) {
          return
        }

        // requiredSpecimenKey -> sorits awdag shinjilgeenii ner

        // requiredSpecimenKey ni vitamin d3 bn uu hematology bn uu gedgiig shalgaad bval
        // specimen request checked list dotor ene 2 iin ali neg ni bn shalgana
        if (
          ['Hematology', 'Vitamin_D3'].includes(requiredSpecimenKey) &&
          (specimenRequestCheckedList['Hematology'] ||
            specimenRequestCheckedList['Vitamin_D3'])
        ) {
          if (requiredSpecimenKey === 'Hematology') {
            specimenServiceRequest.forEach(serviceRequestBundleEntry => {
              if (
                specimenRequestCheckedList['Vitamin_D3'] ===
                serviceRequestBundleEntry.fullUrl
              ) {
                serviceRequestBundleEntry.resource.basedOn.push(
                  new Reference({
                    reference: entryItem.fullUrl,
                    display: SpecimenRequiredTests[requiredSpecimenKey].display,
                  })
                )

                specimenRequestCheckedList[requiredSpecimenKey] =
                  serviceRequestBundleEntry.fullUrl

                externalSpecimenLog
                  .find(logItem => {
                    return (
                      logItem.serviceRequest.fullUrl ===
                      serviceRequestBundleEntry.fullUrl
                    )
                  })
                  .basedOnTestInfo.push({
                    testName:
                      SpecimenRequiredTests[requiredSpecimenKey].display,
                    testCode: SpecimenRequiredTests[requiredSpecimenKey].code,
                    testKey: requiredSpecimenKey,
                  })
              }
            })
          } else if (requiredSpecimenKey === 'Vitamin_D3') {
            specimenServiceRequest.forEach(serviceRequestBundleEntry => {
              if (
                specimenRequestCheckedList['Hematology'] ===
                serviceRequestBundleEntry.fullUrl
              ) {
                serviceRequestBundleEntry.resource.basedOn.push(
                  new Reference({
                    reference: entryItem.fullUrl,
                    display: SpecimenRequiredTests[requiredSpecimenKey].display,
                  })
                )

                specimenRequestCheckedList[requiredSpecimenKey] =
                  serviceRequestBundleEntry.fullUrl
                externalSpecimenLog
                  .find(logItem => {
                    return (
                      logItem.serviceRequest.fullUrl ===
                      serviceRequestBundleEntry.fullUrl
                    )
                  })
                  .basedOnTestInfo.push({
                    testName:
                      SpecimenRequiredTests[requiredSpecimenKey].display,
                    testCode: SpecimenRequiredTests[requiredSpecimenKey].code,
                    testKey: requiredSpecimenKey,
                  })
              }
            })
          }
        } else if (
          [
            'BiochemistryTests',
            'Sars_Cov2_IgG',
            'Sars_Cov2_IgG_Elisa',
            'ImmunologyTests',
          ].includes(requiredSpecimenKey) &&
          (specimenRequestCheckedList['BiochemistryTests'] ||
            specimenRequestCheckedList['Sars_Cov2_IgG'] ||
            specimenRequestCheckedList['Sars_Cov2_IgG_Elisa'] ||
            specimenRequestCheckedList['ImmunologyTests'])
        ) {
          specimenServiceRequest.forEach(serviceRequestBundleEntry => {
            if (
              [
                'BiochemistryTests',
                'Sars_Cov2_IgG',
                'Sars_Cov2_IgG_Elisa',
                'ImmunologyTests',
              ]
                .filter(specimenName => specimenName !== requiredSpecimenKey)
                .some(
                  specimenName =>
                    specimenRequestCheckedList[specimenName] ===
                    serviceRequestBundleEntry.fullUrl
                )
            ) {
              serviceRequestBundleEntry.resource.basedOn.push(
                new Reference({
                  reference: entryItem.fullUrl,
                  display: SpecimenRequiredTests[requiredSpecimenKey].display,
                })
              )

              specimenRequestCheckedList[requiredSpecimenKey] =
                serviceRequestBundleEntry.fullUrl

              externalSpecimenLog
                .find(logItem => {
                  return (
                    logItem.serviceRequest.fullUrl ===
                    serviceRequestBundleEntry.fullUrl
                  )
                })
                .basedOnTestInfo.push({
                  testName: SpecimenRequiredTests[requiredSpecimenKey].display,
                  testCode: SpecimenRequiredTests[requiredSpecimenKey].code,
                  testKey: requiredSpecimenKey,
                })
            }
          })
        } else {
          const specimenServiceRequestResource = new ServiceRequest({
            ...defaultElements,
            category: [
              // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
              FHIR_CODES.Categories.LaboratoryProcedure,
            ],
            code: FHIR_CODES.Phlebotomy.PhlebotomyServiceRequest.code,
            basedOn: [
              {
                reference: entryItem.fullUrl,
                display: SpecimenRequiredTests[requiredSpecimenKey].display,
              },
            ],
          })

          // custom bundle
          const specimenServiceRequestBundleEntry = new BundleEntry({
            fullUrl: helper.generateFullUrl(),
            resource: specimenServiceRequestResource,
            request: {
              method: 'POST',
              url: 'ServiceRequest',
            },
            cost: specimenServiceRequestResource.cost,
          })

          specimenServiceRequest.push(specimenServiceRequestBundleEntry)
          externalSpecimenLog.push({
            basedOnTestInfo: [
              {
                testName: SpecimenRequiredTests[requiredSpecimenKey].display,
                testCode: SpecimenRequiredTests[requiredSpecimenKey].code,
                testKey: requiredSpecimenKey,
              },
            ],
            serviceRequest: specimenServiceRequestBundleEntry,
            patientInfo: {
              lastName: patient.getLastName(),
              firstName: patient.getFirstName(),
              nationalIdentificationNumber: patient.getNationalIdentificationNumber(),
              phoneNumber: (patient.getMobilePhones() || [])[0],
              gender: patient.__data.gender,
              age: helper.calculateAgeFromBirthDate(patient.birthDate),
            },
          })
          specimenRequestCheckedList[requiredSpecimenKey] =
            specimenServiceRequestBundleEntry.fullUrl
        }
      })
      /* #endregion */

      /* #region  Lab Test Order list */
      // NOTE: Zuwhun Lab-iin shinjilgeenuudeer List uusgene
      // Sorits awah hesegt ashiglaj baigaa uchir uzleg, bagajiin shinjilgeeg oruulahgui
      // Heregtei bol tusad ni List uusgeerei.

      const LabTestOrderListEntries = [
        ...serviceRequestList,
        ...specimenServiceRequest,
      ]

      let listEntry

      if (LabTestOrderListEntries.length > 0) {
        const list = new List({
          code: FHIR_CODES.Lists.LabTestOrderList,
          status: 'current',
          mode: 'working',
          subject: patientReference,
          date: dateTime.getInstant(),
          source: globalState.Practitioner.getReference(),
          entry: [...serviceRequestList, ...specimenServiceRequest]
            .filter(val => !!val)
            .map(entry => {
              return {
                item: {
                  reference: entry.fullUrl,
                },
              }
            }),
        })

        listEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: list,
          request: {
            method: 'POST',
            url: 'List',
          },
        })
      }

      /* #endregion */

      // console.log('updatedSlot', updatedSlot)

      const transaction = new Bundle({
        type: 'transaction',
        entry: [
          appointmentEntry,
          slotEntry,
          ...diagnosticsTestList,
          consultationEntry,
          ...serviceRequestList,
          ...specimenServiceRequest,
          listEntry,
        ].filter(val => !!val),
      })

      const json = transaction.toJSON()
      // currently, we need to extract costs, so we need to send to createServiceRequest
      // instead of transaction endpoint
      // Eventually, we really NEED to calculate the costs at the backend

      // console.log(globalState)
      // console.log(globalState.userRole === 'external-receptionist')
      // console.log(globalState)
      // console.log(globalState.userRole)

      // if (globalState.userRole !== 'external-receptionist') {
      //   console.log('bish bna!!!!!!!!!!!!!')
      // }

      const response = yield call(createServiceRequestList, {
        payment: payment, //payment info here
        patient: patient,
        research: research,
        LabTestsAndCheckup: LabTestsAndCheckup,
        patientName: patient.getOfficialNameString(),
        patientBarcode: patient._getBarcode(),
        patientId: id,
        transaction: json,
        user: user,
        requisition: requisition,
        externalSpecimenLog:
          globalState.userRole === ROLE_TYPE.EXTERNAL_RECEPTIONIST
            ? externalSpecimenLog
            : undefined,
        organization: globalState.Organization,
        SelectedTests,
        SelectedCheckup,
        SelectedDiagnosticTests,
      })

      if (response && response.success) {
        yield put({
          type: 'refresh',
        })

        yield put({
          type: 'updateState',
          payload: {
            payment: payment,
            latestPaymentReceipt: {
              payment,
              SelectedTests,
              SelectedCheckup,
              SelectedDiagnosticTests,
            },
          },
        })

        return true
      } else {
        throw response
      }
    },

    *sendResultViaEmail({ payload = {} }, { call, put, select }) {
      const { emails, diagnosticReportId, language, testKey } = payload

      const response = yield call(sendTestResult, {
        emails: emails,
        diagnosticReportId: diagnosticReportId,
        language: language,
        testKey: testKey,
      })

      if (response && response.success) {
        return response.success
      } else {
        throw response
      }
    },

    *cancelServiceRequest({ payload = {} }, { call, put, select }) {
      const requestPayload = {
        ...payload,
      }
      const response = yield call(cancelLabTestOrder, requestPayload)
      if (response.success) {
        return
      } else {
        throw response
      }
    },

    *queryDiagnosticTests({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      const { patient } = yield select(state => state.reception_patientProfile)

      const requestPayload = {
        resourceType: 'ServiceRequest',
        patient: patient.id,
        category: `${FHIR_CODES.Categories.Imaging.coding[0].system}|${FHIR_CODES.Categories.Imaging.coding[0].code}`,
        _include: 'ServiceRequest:subject',
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      const dataSource = []

      if (bundle.entry.length === 0) {
        return dataSource
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      resourceDictionary['ServiceRequest'].forEach(serviceRequest => {
        const diagnosticTestKey = Object.keys(
          FHIR_CODES.DiagnosticTests.include
        ).find(dtKey => {
          return controller.codeIntersects(
            serviceRequest.code,
            FHIR_CODES.DiagnosticTests.include[dtKey].code
          )
        })

        const data = {
          key: serviceRequest.id,
          display:
            FHIR_CODES.DiagnosticTests.include[diagnosticTestKey].display,
          diagnosticTestKey: diagnosticTestKey,
          authoredOn: dateTime.toLocalDateTime(
            serviceRequest.authoredOn,
            'yyyy-mm-dd hh:mm'
          ),
        }

        dataSource.push(data)
      })

      return dataSource
    },
  },

  reducers: {
    updatePayment(state, { payload }) {
      const { research, paymentValues } = payload
      return {
        ...state,
        payment: paymentValues,
        research: research,
      }
    },

    updateTotal(state) {
      const { checkupCost, diagnosticTestCost, labTestCost } = state

      return {
        ...state,
        totalAmount: checkupCost + diagnosticTestCost + labTestCost,
      }
    },
  },
})
