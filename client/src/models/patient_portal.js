import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import * as dateTime from 'utils/datetime'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
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

const {
  queryRouteList,
  readResource,
  queryUserInfo,
  queryLogOut,
  queryValuesets,
  patientLists,
  queryPatientList,
  queryExternalAPI,
  getCitizenInfo,
  getCitizenInfoWithoutFinger,
  getSavedPerscriptionByType,
  savePrescription,
  getDrugInfoByDiagnose,
  getRefInfoByReceiptNumber,
  queryPrescription,
  batch_transaction_request,
} = api
/* #endregion */

export default modelExtend(pageModel, {
  namespace: 'patient_portal',
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
    Checkup: {
      cost: 0,
    },
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
  },

  effects: {
    // *refresh({ payload = {} }, { call, put, select }) {
    //   const { LabTests } = yield select(state => state.app)

    //   yield put({
    //     type: 'updateState',
    //     payload: {
    //       // used for useEffect dependency array
    //       updatedAt: dateTime.getInstant(),
    //       SelectedCheckup: {},
    //       checkupCost: 0,
    //       SelectedTests: {},
    //       SelectedDiagnosticTests: [],
    //       SelectedTestItems: [],
    //       LatestLabTests: { ...LabTests },
    //       LabTestLog: [],
    //       payment: {},
    //       totalAmount: 0,
    //     },
    //   })
    //   yield put({
    //     type: 'queryLabTestHistory',
    //   })
    //   // yield put({
    //   //   type: 'queryLabTestHistory',
    //   // })

    //   return
    // },

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

      // const LabTests = {
      //   RapidTests,
      //   ...ViralLoadTests.include,
      //   BiochemistryTests,
      //   Hematology,
      //   ImmunologyTests,
      //   Coagulation,
      //   Genotype,
      //   Urinalysis,
      //   ESR,
      //   Vitamin_D3,
      //   Ferritin,
      //   Anti_HDV,
      // }

      const SpecimenRequiredTests = {
        RapidTests,
        ViralLoadTests,
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
        ViralLoadTests,
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
          // LabTests,
          SpecimenRequiredTests,
          CancellableLabTests,
        },
      })
    },

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

        if (!response || !response.success) {
          throw response
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

        if (!response || !response.success) {
          throw response
        }

        const bundle = new Bundle(response.data)

        if (bundle.entry.length === 0) {
          return
        }
        const resourceArray = helper.loadResourceArray(
          bundle.getResourcesOnly()
        )
        console.log(payload.testKey)
        const testResults = controller.recursiveTestDataBuilder(
          resourceArray,
          LabTests[payload.testKey]
        )

        const resourceDictionary = controller.createResourceDictionary(
          resourceArray
        )

        console.log(resourceDictionary)

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
      const { FHIR_CODES } = yield select(state => state.app)
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

      const CancellableLabTests = {
        RapidTests,
        ViralLoadTests,
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

      const requestPayload = {
        resourceType: 'ServiceRequest',
        _id: payload.serviceRequestId,
        _include: ['ServiceRequest:patient'],
        _revinclude: ['DiagnosticReport:based-on'],
        '_include:iterate': [
          'DiagnosticReport:result',
          'DiagnosticReport:specimen',
          'Observation:has-member',
        ],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
        ],
      }

      const response = yield call(readResource, requestPayload)

      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)

      if (bundle.entry.length === 0) {
        return
      }
      const resourceArray = bundle.entry.map(e => e.resource)
      console.log(payload.testKey, CancellableLabTests[payload.testKey])
      const testResults = controller.recursiveTestDataBuilder(
        resourceArray,
        CancellableLabTests[payload.testKey]
      )

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      console.log(resourceDictionary)

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
      // console.log(resourceDictionary)
      // console.log(testResults, LabTests[payload.testKey])

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

    *queryLatestLabTest({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)

      const { FHIR_CODES, LabTests, Patient } = globalState

      const LabTestCodes = {}
      const requestEntries = []
      LabTests &&
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
                `&patient=${Patient.id}`,
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

      if (!response || !response.success) {
        throw response
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
              console.log(serviceRequest)
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
      const { patientId } = payload
      const { FHIR_CODES } = globalState

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
      const { HCV_RNA, HBV_DNA, HDV_RNA, HIV_RNA, HPV } = ViralLoadTests.include
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
        patient: patientId,
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

      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
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

            console.log(
              serviceRequest.status,
              serviceRequest.status === 'revoked'
            )
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

            // if (labTestKey === 'ViralLoadTests') {
            //   if (resourceDictionary['Observation']) {
            //     const includedServiceRequests = resourceDictionary[
            //       'ServiceRequest'
            //     ].filter(sr => {
            //       return (
            //         sr.basedOn &&
            //         sr.basedOn.some(basedOnRef =>
            //           basedOnRef.reference.endsWith(
            //             helper.getReferenceUrl(serviceRequest)
            //           )
            //         )
            //       )
            //     })
            //     const includedServiceRequestsRef = includedServiceRequests.map(
            //       sr => helper.getReferenceUrl(sr)
            //     )
            //     const includedObservation = resourceDictionary[
            //       'Observation'
            //     ].filter(ob =>
            //       ob.basedOn.some(basedOnRef =>
            //         includedServiceRequestsRef.some(ref =>
            //           basedOnRef.reference.endsWith(ref)
            //         )
            //       )
            //     )

            //     if (includedObservation.some(ob => ob.status === 'final')) {
            //       // viral load status is final if it containt at least one final observation
            //       data.status = 'final'
            //     }

            //     const ViralLoadItems = controller.recursiveTestDataBuilder(
            //       [
            //         serviceRequest,
            //         ...includedServiceRequests,
            //         ...includedObservation,
            //       ],
            //       FHIR_CODES.UncategorizedTests.ViralLoadTests
            //     )

            //     Object.keys(ViralLoadItems.include).forEach(testKey => {
            //       if (
            //         !ViralLoadItems.include[testKey].latestObservation ||
            //         ViralLoadItems.include[testKey].latestObservation.status !==
            //           'final'
            //       ) {
            //         delete ViralLoadItems.include[testKey]
            //       }
            //     })

            //     data.include = ViralLoadItems.include
            //   }
            // }

            dataSource.push(data)
          }
        })
      })

      console.log({
        current: Number(payload._page) || 1,
        pageSize: Number(payload._count) || 20,
        total: bundle.total,
      })

      yield put({
        type: 'updateState',
        payload: {
          LabTestLog: dataSource,
          LabTestLogPagination: {
            current: Number(payload._page) || 1,
            pageSize: Number(payload._count) || 20,
            total: bundle.total,
          },
        },
      })

      return
    },

    *queryConsultationsHistory({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { patientId } = payload
      const counsellingCategory =
        globalState.FHIR_CODES.Categories.Counselling.coding[0]

      const requestPayload = {
        resourceType: 'ServiceRequest',
        patient: patientId,
        category: `${counsellingCategory.system}|${counsellingCategory.code}`,
        _include: ['ServiceRequest:subject', 'ServiceRequest:performer'],
      }

      const response = yield call(readResource, requestPayload)

      const dataSource = []

      if (!response || !response.success) {
        throw response
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

    *queryDiagnosticTests({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { patientId } = payload
      const { FHIR_CODES } = globalState

      if (!FHIR_CODES) {
        return
      }

      const requestPayload = {
        resourceType: 'ServiceRequest',
        patient: patientId,
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

    *downloadValuesets({ payload }, { call, put, select }) {
      const Valuesets = yield select(state => state.patient_portal.Valuesets)

      if (
        !!Valuesets &&
        (!helper.isObject(Valuesets) || !helper.isEmptyObject(Valuesets))
      ) {
        return
      }

      const valuesetList = [
        'accommodation-values',
        'address-values-mn',
        'administrative-gender',
        'blood-type-values',
        'employment-status-values',
        'country-values-mn',
        'dietary-finding-values',
        'marital-status',
        'occupation-values',
        'patient-contact-relationship',
        'race-values',
        'rhesus-factor-values',
      ]

      const response = yield call(queryValuesets, {
        valuesetList: valuesetList,
      })

      if (response && response.success) {
        const valuesets = response.data
        const newValuesets = {}
        valuesets.forEach(valueset => {
          try {
            valueset &&
              Object.assign(newValuesets, {
                [valueset.id]: valueset,
              })
          } catch (err) {
            console.log(err)
          }
        })

        yield put({
          type: 'updateState',
          payload: {
            valuesets: valuesets,
            Valuesets: newValuesets,
          },
        })

        return
      } else {
        throw response
      }
    },
  },

  reducers: {},
})
