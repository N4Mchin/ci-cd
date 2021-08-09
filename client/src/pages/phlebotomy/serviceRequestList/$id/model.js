/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import uuidv4 from 'uuid/v4'
import { pageModel } from 'utils/model'
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import * as controller from 'utils/controller'
import {
  bundle as Bundle,
  bundleentry as BundleEntry,
  diagnosticreport as DiagnosticReport,
  specimen as Specimen,
  servicerequest as ServiceRequest,
} from 'schemas'
import { cloneDeep } from 'lodash'

const {
  readResource,
  batch_transaction_request,
  generateSpecimenBarcode,
  deleteMaterials,
  specimenReferences,
} = api

export default modelExtend(pageModel, {
  namespace: 'phlebotomy_serviceRequestList',

  state: {
    listId: undefined,
    labTestOrders: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const match = pathMatchRegexp(
          '/phlebotomy/serviceRequestList/:id',
          location.pathname
        )

        dispatch({
          type: 'init',
        })

        if (!!match) {
          dispatch({
            type: 'updateState',
            payload: {
              listId: match[1],
            },
          })

          dispatch({
            type: 'query',
            payload: {
              listId: match[1],
              location: location,
            },
          }).then(queryReturn => {
            dispatch({
              type: 'readSpecimenReference',
              payload: {
                readRequisition: queryReturn.requisition,
              },
            })
          })
        }
      })
    },
  },

  effects: {
    *init({ payload = {} }, { call, put, select }) {
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
        Coagulation,
        Hematology,
        Vitamin_D3,
        Ferritin,
        Anti_HDV,
        Sars_Cov2_IgG,
        Sars_Cov2_IgG_Elisa,
      } = OtherTests.include

      const LabTests = {
        RapidTests,
        ViralLoadTests,
        BiochemistryTests,
        Hematology,
        ImmunologyTests,
        Coagulation,
        Genotype,
        Urinalysis,
        ESR,
        Sars_Cov2_IgG,
        Sars_Cov2_IgG_Elisa,
      }

      let SpecimenRequiredTests = {
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

      yield put({
        type: 'updateState',
        payload: {
          SpecimenRequiredTests,
        },
      })
    },

    *refresh({ payload = {} }, { call, put, select }) {
      const { requisition } = payload
      // console.log('getting requisition', requisition)

      const { listId } = yield select(
        state => state.phlebotomy_serviceRequestList
      )

      yield put({
        type: 'query',
        payload: {
          listId,
          requisition: requisition,
        },
      })
    },

    *query({ payload = {} }, { call, put, select }) {
      const FHIR_CODES = yield select(state => state.app.FHIR_CODES)
      const localState = yield select(
        state => state.phlebotomy_serviceRequestList
      )

      const { SpecimenRequiredTests } = localState

      const SelectTestItems = cloneDeep(SpecimenRequiredTests)

      const labTestOrderListCoding = controller.getFirstCoding(
        FHIR_CODES.Lists.LabTestOrderList
      )

      if (!payload.listId) {
        return
      }

      const requestPayload = {
        resourceType: 'List',
        _id: payload.listId,
        code: `${labTestOrderListCoding.system}|${labTestOrderListCoding.code}`,
        _include: ['List:subject', 'List:item'],
        '_include:iterate': ['ServiceRequest:specimen'],
      }

      const response = yield call(readResource, requestPayload)
      if (response && response.success) {
        const bundle = new Bundle(response.data)
        if (!bundle || bundle.entry.length === 0) {
          return
        }

        const resourceArray = helper.loadResourceArray(
          bundle.getResourcesOnly()
        )

        const resourceDictionary = controller.createResourceDictionary(
          resourceArray
        )

        const patient = resourceDictionary['Patient'].find(
          resource => resource.resourceType === 'Patient'
        )

        // console.log(JSON.stringify(response.data))
        const serviceRequests = resourceDictionary['ServiceRequest']

        const viralLoadSubTestNames = Object.values(
          FHIR_CODES.UncategorizedTests.ViralLoadTests.include
        ).map(subTest => {
          if (
            serviceRequests.find(serviceRequest => {
              return controller.codeIntersects(
                serviceRequest.code,
                subTest.code
              )
            })
          ) {
            return subTest.display
          } else {
            return undefined
          }
        })

        const rapidSubTestNames = Object.values(
          FHIR_CODES.UncategorizedTests.RapidTests.include
        ).map(subTest => {
          if (
            serviceRequests.find(serviceRequest => {
              return controller.codeIntersects(
                serviceRequest.code,
                subTest.code
              )
            })
          ) {
            return subTest.display
          } else {
            return undefined
          }
        })

        const immunologySubTestNames = [
          FHIR_CODES.ImmunologyTests.include.Tumor_Markers.include.AFP,
          FHIR_CODES.ImmunologyTests.include.Infectious_Diseases.include
            .Anti_Hbs,
          FHIR_CODES.ImmunologyTests.include.Infectious_Diseases.include.HBeAg,
          FHIR_CODES.ImmunologyTests.include.Infectious_Diseases.include
            .HBsAg_quantification,
          FHIR_CODES.ImmunologyTests.include.Infectious_Diseases.include
            .Anti_HCV,
        ].map(subTest => {
          if (
            serviceRequests.find(serviceRequest => {
              return controller.codeIntersects(
                serviceRequest.code,
                subTest.code
              )
            })
          ) {
            return subTest.display
          } else {
            return undefined
          }
        })

        const specimenServiceRequests = serviceRequests.filter(
          sr =>
            sr.code &&
            controller.codeIntersects(
              FHIR_CODES.Phlebotomy.PhlebotomyServiceRequest.code,
              sr.code
            )
        )

        let labTestOrders = []

        specimenServiceRequests.forEach(specimenServiceRequest => {
          let specimen

          const { requisition } = specimenServiceRequest

          const testServiceRequests = specimenServiceRequest.basedOn.map(
            referenceObject =>
              helper.findByReference(serviceRequests, referenceObject)
          )

          const testKeys = testServiceRequests.map(
            testServiceRequest =>
              testServiceRequest.code &&
              Object.keys(SpecimenRequiredTests).find(specimenRequiredTestKey =>
                controller.codeIntersects(
                  SpecimenRequiredTests[specimenRequiredTestKey].code,
                  testServiceRequest.code
                )
              )
          )

          let viralLoadSubTestServiceRequests
          if (testKeys.includes('ViralLoadTests')) {
            const viralLoad = testServiceRequests.find(tsr =>
              controller.codeIntersects(
                tsr.code,
                FHIR_CODES.UncategorizedTests.ViralLoadTests.code
              )
            )

            viralLoadSubTestServiceRequests = serviceRequests.filter(
              serviceRequest => {
                if (
                  serviceRequest.basedOn &&
                  serviceRequest.basedOn.some(basedOnObj =>
                    basedOnObj.reference.endsWith(
                      helper.getReferenceUrl(viralLoad)
                    )
                  ) &&
                  Object.values(
                    FHIR_CODES.UncategorizedTests.ViralLoadTests.include
                  ).some(subTest => {
                    return controller.codeIntersects(
                      serviceRequest.code,
                      subTest.code
                    )
                  })
                ) {
                  return true
                }
                return false
              }
            )
          }

          Object.keys(SelectTestItems).forEach(testName => {
            if (testName === testKeys.join('')) {
              SelectTestItems[testName]['ordered'] = true
            }
          })

          try {
            specimen = resourceDictionary['Specimen'].filter(sp => {
              return testServiceRequests.some(testServiceRequest => {
                return testServiceRequest.specimen.some(specimenReference => {
                  return (
                    specimenReference.reference === helper.getReferenceUrl(sp)
                  )
                })
              })
            })
          } catch {}

          const testNames = testKeys.map(
            testKey => SpecimenRequiredTests[testKey].display
          )

          const testCodes = testKeys.map(
            testKey => SpecimenRequiredTests[testKey].code
          )

          const data = {
            key: uuidv4(),
            testKey: testKeys,
            testName: testNames,
            testCodes: testCodes,
            specimenServiceRequest: specimenServiceRequest,
            testServiceRequests: testServiceRequests,
            status: specimenServiceRequest.status,
            requisition: requisition,
            specimen: specimen,
            immunologySubTestNames: immunologySubTestNames,
            rapidSubTestNames: rapidSubTestNames,
            viralLoadSubTestNames: viralLoadSubTestNames,
            viralLoadSubTestServiceRequests: viralLoadSubTestServiceRequests,
          }

          labTestOrders.push(data)
        })

        const materialRequired = {
          //tubepurple prodcut id
          '555020': 0,
          // tubeLightBlue product id
          '555018': 0,
          // tubeRed product id
          '555016': 0,
          // tubeYellow product id
          '555021': 0,
          //tubeMintGreen product id
          '555015': 0,
          // tube gray product id
          '555017': 0,
          // alcohal pad product id
          '555024': 0,
          // adhesive bandage product id
          '555027': 0,
          // red vacutainer product id
          '555026': 0,
          // glove product id
          '555025': 0,
          // cotton bud product id
          '555023': 0,
          // print sticker product id
          '555022': 0,
          // tightener sticker product id
        }

        labTestOrders.forEach(test => {
          const { testKey } = test
          if (testKey.join('') === 'RapidTests') materialRequired['555020'] += 1
          else if (testKey.join('') === 'BiochemistryTests')
            materialRequired['555016'] += 1
          else if (testKey.join('') === 'ImmunologyTests')
            materialRequired['555021'] += 1
          else if (testKey.join('') === 'Hematology')
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'HCV_RNA')
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'HBV_DNA')
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'HDV_RNA')
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'HIV_RNA')
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'HPV') materialRequired['555020'] += 1
          else if (
            testKey.join('') === 'HematologyVitamin_D3' ||
            testKey.join('') === 'Vitamin_D3Hematology'
          )
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'Coagulation')
            materialRequired['555018'] += 1
          else if (
            testKey.join('') === 'BiochemistryTestsImmunologyTests' ||
            testKey.join('') === 'ImmunologyTestsBiochemistryTests'
          )
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'Anti_HDV')
            materialRequired['555016'] += 1
          else if (testKey.join('') === 'Ferritin')
            materialRequired['555020'] += 1
          else if (testKey.join('') === 'Vitamin_D3')
            materialRequired['555020'] += 1
        })

        const updatePayload = {
          materialRequired: materialRequired,
          lastName: patient.getLastName(),
          firstName: patient.getFirstName(),
          age: helper.calculateAgeFromBirthDate(patient.birthDate),
          gender:
            patient.gender &&
            patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1),
          NInum: patient.getNationalIdentificationNumber(),
          mobilePhone: (patient.getMobilePhones() || [])[0],
          labTestOrders: labTestOrders,
          patient: patient,
          selectTestItems: SelectTestItems,
          immunologySubTestNames: immunologySubTestNames,
          viralLoadSubTestNames: viralLoadSubTestNames,
          requisition: labTestOrders[0].requisition,
        }

        yield put({
          type: 'updateState',
          payload: updatePayload,
        })
        // return requisition
        return updatePayload
        // return queryReturn
        // return labTestOrders[0].requisition
      } else {
        throw response
      }
    },

    *specimenCollected({ payload = {} }, { call, put, select }) {
      const {
        testName,
        testCodes,
        patientInformation,
        dataSource,
        testServiceRequests,
        specimenServiceRequest,
        testKey,
        viralLoadSubTestServiceRequests,
      } = payload
      const testNameString = testName.join(' ')
      const globalState = yield select(state => state.app)
      const { patient } = yield select(
        state => state.phlebotomy_serviceRequestList
      )

      if (
        payload.specimenStatus &&
        ['on-hold', 'revoked', 'stat'].includes(payload.specimenStatus)
      ) {
        const bundleEntries = []

        const serviceRequests = [...testServiceRequests, specimenServiceRequest]

        if (testKey.includes('ViralLoadTests')) {
          serviceRequests.push(viralLoadSubTestServiceRequests)
        }

        serviceRequests.forEach(serviceRequest => {
          const updatedServiceRequestData = serviceRequest.toJSON()

          if (
            payload.specimenStatus === 'on-hold' ||
            payload.specimenStatus === 'revoked'
          ) {
            updatedServiceRequestData.status = payload.specimenStatus
          }

          if (payload.specimenStatus === 'stat') {
            updatedServiceRequestData.priority = 'stat'
          }

          const updatedServiceRequest = new ServiceRequest(
            updatedServiceRequestData
          )

          const updatedServiceRequestEntry = new BundleEntry({
            fullUrl: helper.getReferenceUrl(updatedServiceRequest),
            resource: updatedServiceRequest,
            request: {
              method: 'PUT',
              url: helper.getReferenceUrl(updatedServiceRequest),
              ifMatch: updatedServiceRequest.meta.versionId,
            },
          })

          bundleEntries.push(updatedServiceRequestEntry)
        })

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
      } else {
        const bundleEntries = []

        const specimenFullUrl = helper.generateFullUrl()

        const timeInstant = dateTime.getInstant()
        const specimenIdentifier = Object.assign(
          {
            value: timeInstant,
          },
          globalState.FHIR_CODES.Identifiers.SpecimenCollection
        )

        const specimenAccession = Object.assign(
          {
            value: timeInstant,
          },
          globalState.FHIR_CODES.Identifiers.SpecimenAccession
        )

        const specimen = new Specimen({
          identifier: [specimenIdentifier],
          accessionIdentifier: specimenAccession,
          status: 'unavailable',
          subject: patient.getReference(),
          receivedTime: timeInstant,
          request: [helper.getReference(payload.specimenServiceRequest)],
          collection: {
            collector: globalState.Practitioner.getReference(),
            collectedDateTime: timeInstant,
          },
        })

        bundleEntries.push(
          new BundleEntry({
            fullUrl: specimenFullUrl,
            resource: specimen,
            request: {
              method: 'POST',
              url: 'Specimen',
            },
          })
        )

        const specimenReferenceArray = [
          {
            reference: specimenFullUrl,
          },
        ]

        const updatedTestServiceRequests = testServiceRequests.map(
          testServiceRequest => {
            return new ServiceRequest({
              ...testServiceRequest,
              specimen: specimenReferenceArray,
            })
          }
        )

        if (testKey.includes('ViralLoadTests')) {
          /*
           *Viral Load shinjilgeenii ded shinjilgeenuudiig specimen-tei bolgono
           *
           */
          viralLoadSubTestServiceRequests.forEach(
            viralLoadSubTestServiceRequest => {
              updatedTestServiceRequests.push(
                new ServiceRequest({
                  ...viralLoadSubTestServiceRequest,
                  specimen: specimenReferenceArray,
                })
              )
            }
          )
        }

        const updatedSpecimenServiceRequest = new ServiceRequest({
          ...payload.specimenServiceRequest,
          status: 'completed',
          specimen: specimenReferenceArray,
        })

        const updatedServiceRequests = [
          ...updatedTestServiceRequests,
          updatedSpecimenServiceRequest,
        ]

        updatedServiceRequests.forEach(sr =>
          bundleEntries.push(
            new BundleEntry({
              resource: sr,
              request: {
                method: 'PUT',
                url: helper.getReferenceUrl(sr),
                ifMatch: sr.meta.versionId,
              },
            })
          )
        )

        const bundle = new Bundle({
          type: 'transaction',
          entry: bundleEntries,
        })
        const json = bundle.toJSON()

        const responseBarcode = yield call(generateSpecimenBarcode, {
          testNameString,
          testCodes,
          patientInformation,
          specimenFullUrl,
          transaction: json,
          requisition: payload.specimenServiceRequest.requisition,
          dataSource,
        })

        // Rapid Test
        // Viral Load Tests
        // Biochemistry
        // Hematology
        // Immunology
        // Coagulation
        // Genotype
        // Urinalysis
        // ESR

        const responseMaterials = yield call(deleteMaterials, { dataSource })
        // console.log(responseMaterials)

        if (responseMaterials && responseMaterials.success) {
          console.log('succeed of reducing of materials value')
        } else {
          throw responseMaterials
        }

        if (responseBarcode && responseBarcode.success) {
          console.log('succeed of creating barcode')
        } else {
          throw responseBarcode
        }
      }
    },

    *readSpecimenReference({ payload = {} }, { call, put, select }) {
      const { readRequisition } = payload
      const response = yield call(specimenReferences, {
        requisition: readRequisition,
      })
      const { data } = response

      if (response) {
        if (response.success) {
          yield put({
            type: 'updateState',
            payload: {
              specimenReference: data.specimenReference,
            },
          })
        }
      } else {
        throw response
      }
    },

    *specimenServiceRequest({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.phlebotomy_serviceRequestList
      )

      const { FHIR_CODES, practitioner } = globalState

      const { patientReference } = localState

      const serviceRequestList = []
      const requester = practitioner.getReference()
      const requisition = Object.assign(
        {
          value: dateTime.getInstant(),
        },
        FHIR_CODES.Identifiers.ServiceRequestRequisition
      )
      const defaultElements = {
        status: 'draft', // R!  draft | active | suspended | completed | entered-in-error | cancelled
        intent: 'order', // R!  proposal | plan | order +
        requisition: requisition,
        priority: 'routine', // routine | urgent | asap | stat
        requester: requester,
        performer: [globalState.Organization.getReference()],
        authoredOn: dateTime.getInstant(),
        subject: patientReference,
      }

      /* #region   */
      // if (!isEmpty(SelectedTests)) {
      //   let grandParentTestItemBundleEntry
      //   Object.keys(SelectedTests).forEach(test => {
      //     let serviceRequestRoot

      //     if (test !== 'UncategorizedTests') {
      //       serviceRequestRoot = new ServiceRequest({
      //         ...defaultElements,
      //         category: [
      //           // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
      //           FHIR_CODES.Categories.LaboratoryProcedure,
      //           FHIR_CODES.Categories.GrandparentServiceRequest,
      //         ],
      //         code: SelectedTests[test].code,
      //       })

      //       grandParentTestItemBundleEntry = new BundleEntry({
      //         fullUrl: helper.generateFullUrl(),
      //         resource: serviceRequestRoot,
      //         request: {
      //           method: 'POST',
      //           url: 'ServiceRequest',
      //         },
      //       })

      //       serviceRequestList.push(grandParentTestItemBundleEntry)
      //     }

      //     Object.keys(SelectedTests[test]['include']).forEach(testItem => {
      //       let testItemServiceRequest
      //       let parentTestItemBundleEntry

      //       if (testItem === 'OtherTests') {
      //       } else {
      //         testItemServiceRequest = new ServiceRequest({
      //           ...defaultElements,
      //           category: [
      //             // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
      //             FHIR_CODES.Categories.LaboratoryProcedure,
      //             FHIR_CODES.Categories.ParentServiceRequest,
      //           ],
      //           code: SelectedTests[test]['include'][testItem].code,
      //         })

      //         if (
      //           test !== 'UncategorizedTests' &&
      //           !!grandParentTestItemBundleEntry
      //         ) {
      //           testItemServiceRequest.basedOn = [
      //             {
      //               reference: grandParentTestItemBundleEntry.fullUrl,
      //             },
      //           ]
      //         }

      //         parentTestItemBundleEntry = new BundleEntry({
      //           fullUrl: helper.generateFullUrl(),
      //           resource: testItemServiceRequest,
      //           request: {
      //             method: 'POST',
      //             url: 'ServiceRequest',
      //           },
      //         })

      //         serviceRequestList.push(parentTestItemBundleEntry)
      //       }

      //       // console.log('values', Object.values(SelectedTests[test][testItem]))
      //       const subEntries = []

      //       Object.keys(
      //         SelectedTests[test]['include'][testItem]['include']
      //       ).forEach(subTestItemKey => {
      //         let subTestItemServiceRequest

      //         if (subTestItemKey === 'Hematology') {
      //           const testItemServiceRequest = new ServiceRequest({
      //             ...defaultElements,
      //             category: [
      //               // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
      //               FHIR_CODES.Categories.LaboratoryProcedure,
      //               FHIR_CODES.Categories.ParentServiceRequest,
      //             ],
      //             code: FHIR_CODES['UncategorizedTests']['Hematology'].code,
      //           })

      //           const HematologyTestItemBundleEntry = new BundleEntry({
      //             fullUrl: helper.generateFullUrl(),
      //             resource: testItemServiceRequest,
      //             request: {
      //               method: 'POST',
      //               url: 'ServiceRequest',
      //             },
      //           })

      //           subEntries.push(HematologyTestItemBundleEntry)

      //           Object.keys(
      //             FHIR_CODES['UncategorizedTests']['Hematology'].include
      //           ).forEach(hematologyItem => {
      //             const hematologyItemCode =
      //               FHIR_CODES['UncategorizedTests']['Hematology']['include'][
      //                 hematologyItem
      //               ].code

      //             const hematologyItemServiceRequest = new ServiceRequest({
      //               ...defaultElements,
      //               category: [
      //                 // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
      //                 FHIR_CODES.Categories.LaboratoryProcedure,
      //                 FHIR_CODES.Categories.ChildServiceRequest,
      //               ],
      //               code: hematologyItemCode,
      //               basedOn: HematologyTestItemBundleEntry && [
      //                 {
      //                   reference: HematologyTestItemBundleEntry.fullUrl,
      //                 },
      //               ],
      //             })

      //             const hematologyBundleEntry = new BundleEntry({
      //               fullUrl: helper.generateFullUrl(),
      //               resource: hematologyItemServiceRequest,
      //               request: {
      //                 method: 'POST',
      //                 url: 'ServiceRequest',
      //               },
      //             })

      //             subEntries.push(hematologyBundleEntry)
      //           })
      //         } else if (subTestItemKey === 'Coagulation') {
      //           const testItemServiceRequest = new ServiceRequest({
      //             ...defaultElements,
      //             category: [
      //               // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
      //               FHIR_CODES.Categories.LaboratoryProcedure,
      //               FHIR_CODES.Categories.ParentServiceRequest,
      //             ],
      //             code: FHIR_CODES['UncategorizedTests']['Coagulation'].code,
      //           })

      //           const CoagulationTestItemBundleEntry = new BundleEntry({
      //             fullUrl: helper.generateFullUrl(),
      //             resource: testItemServiceRequest,
      //             request: {
      //               method: 'POST',
      //               url: 'ServiceRequest',
      //             },
      //           })

      //           subEntries.push(CoagulationTestItemBundleEntry)

      //           Object.keys(
      //             FHIR_CODES['UncategorizedTests']['Coagulation'].include
      //           ).forEach(coagulationItem => {
      //             const coagulationItemCode =
      //               FHIR_CODES['UncategorizedTests']['Coagulation']['include'][
      //                 coagulationItem
      //               ].code

      //             const coagulationItemServiceRequest = new ServiceRequest({
      //               ...defaultElements,
      //               category: [
      //                 // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
      //                 FHIR_CODES.Categories.LaboratoryProcedure,
      //                 FHIR_CODES.Categories.ChildServiceRequest,
      //               ],
      //               code: coagulationItemCode,
      //               basedOn: CoagulationTestItemBundleEntry && [
      //                 {
      //                   reference: CoagulationTestItemBundleEntry.fullUrl,
      //                 },
      //               ],
      //             })

      //             const coagulationBundleEntry = new BundleEntry({
      //               fullUrl: helper.generateFullUrl(),
      //               resource: coagulationItemServiceRequest,
      //               request: {
      //                 method: 'POST',
      //                 url: 'ServiceRequest',
      //               },
      //             })

      //             subEntries.push(coagulationBundleEntry)
      //           })
      //         }

      //         ///////////////////////////////
      //         else {
      //           const subTestItem =
      //             SelectedTests[test]['include'][testItem]['include'][
      //               subTestItemKey
      //             ]

      //           subTestItemServiceRequest = new ServiceRequest({
      //             ...defaultElements,
      //             category: [
      //               // Classification of service // Laboratory procedure | Imaging | Counselling | Education | Surgical procedure
      //               FHIR_CODES.Categories.LaboratoryProcedure,
      //               FHIR_CODES.Categories.ChildServiceRequest,
      //             ],
      //             code: subTestItem.code,
      //             basedOn: parentTestItemBundleEntry && [
      //               {
      //                 reference: parentTestItemBundleEntry.fullUrl,
      //               },
      //             ],
      //           })

      //           // custom bundle
      //           const subTestItemBundleEntry = new BundleEntry({
      //             fullUrl: helper.generateFullUrl(),
      //             resource: subTestItemServiceRequest,
      //             request: {
      //               method: 'POST',
      //               url: 'ServiceRequest',
      //             },
      //             cost: subTestItem.cost,
      //           })

      //           subEntries.push(subTestItemBundleEntry)
      //         }
      //       })

      //       subEntries.length > 0 && serviceRequestList.push(...subEntries)
      //     })
      //   })
      // }
      /* #endregion */

      yield put({
        type: 'updateState',
      })
    },
  },
})
