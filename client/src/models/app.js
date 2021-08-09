/* global window */
import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import { queryLayout, pathMatchRegexp } from 'utils'
import { ROLE_TYPE, CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'

/* #region  Helper */
import * as helper from 'utils/helper'
import {
  isArray,
  pushRequest,
  generateUuid,
  isEmptyObject,
  findByReference,
  getReference,
  getReferenceUrl,
  loadResourceArray,
  getDisplayOfCodeAbleConcept,
  sortByDate,
} from 'utils/helper'
/* #endregion */

/* #region  DateTime */
import * as dateTime from 'utils/datetime'
import {
  getInstant,
  toLocalDateTime,
  calculateDateFromSpentDate,
} from 'utils/datetime'
/* #endregion */

/* #region  Controller */
import * as controller from 'utils/controller'
import {
  codeIntersects,
  containsReference,
  createResourceDictionary,
  recursiveTestDataBuilder,
  generateBriefGeneralExamination,
  generateGeneralPhysicalFindingExamination,
} from 'utils/controller'
/* #endregion */

/* #region  Schemas */
import {
  bundle as Bundle,
  bundleentry as BundleEntry,
  observation as Observation,
  servicerequest as ServiceRequest,
  diagnosticreport as DiagnosticReport,
} from 'schemas'
/* #endregion */

/* #region  api */
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
  getLaboratoryReport,
} = api
/* #endregion */

const FHIR_CODES_ID = 'fhir-codes'
const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

export default {
  namespace: 'app',
  state: {
    user: {},
    permission: {
      visit: [],
    },
    practitionerList: [],
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'dark',
    collapsed: store.get('collapsed') || true,
    notifications: [
      {
        title: 'Дуудлага (хийгдэж байна).',
        date: new Date(Date.now() - 10000000),
      },
    ],
    lang: 'mn',
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        // if (history.action == "POP" && location.pathname != undefined) {
        //   dispatch({ type: 'query' })
        // } else {

        // }
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })

        if (location.pathname.startsWith('/practitioner')) {
          dispatch({
            type: 'queryDlivrGroups',
          })
        }

        if (!location.pathname.startsWith('/auth')) {
          dispatch({
            type: 'downloadValuesets',
            payload: {
              valuesetList: [FHIR_CODES_ID],
            },
          })
        }
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
  },
  effects: {
    *queryICD({ payload }, { call, put, select }) {
      const { queryString } = payload
      const response = yield call(queryExternalAPI, {
        api: 'ICD',
        data: {
          q: `${queryString}%`,
          // chapterFilter:
          //   '10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25;01;02;03;04;05;06;07;08;09;',
          // subtreesFilter: undefined,
          includePostcoordination: true,
          useBroaderSynonyms: false,
          // useFlexiSearch: false,
          includeKeywordResult: true,
          // flatResults: false,
          // propertiesToBeSearched
        },
      })

      console.log('RESPONSE', response)
      return response
    },

    *queryICD9({ payload }, { call, put, select }) {
      const response = yield call(queryExternalAPI, {
        api: 'ICD-9',
        data: {
          search: payload,
          type: 'search',
        },
      })

      if (response) {
        return response
      }

      throw response
    },
    *queryPrescription({ payload }, { call, put, select }) {
      const response = yield call(queryPrescription, {
        data: payload,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Prescription failed')
        } else {
          return {}
        }
      }
      return response.data
    },
    *getCitizenInfo({ payload }, { call, put, select }) {
      const response = yield call(getCitizenInfo, payload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Citizen Info failed')
        } else {
          return {}
        }
      }
      return response.data
    },
    *getCitizenInfoWithoutFinger({ payload }, { call, put, select }) {
      const response = yield call(getCitizenInfoWithoutFinger, payload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Citizen Info failed')
        } else {
          return {}
        }
      }
      return response.data
    },
    *getSavedPerscriptionByType({ payload }, { call, put, select }) {
      const response = yield call(getSavedPerscriptionByType, payload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Get Saved Prescription Failed')
        } else {
          return {}
        }
      }
      return response.data
    },
    *savePrescription({ payload }, { call, put, select }) {
      const response = yield call(savePrescription, payload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Save prescription failed')
        } else {
          return {}
        }
      }
      return response.data
    },
    *getDrugInfoByDiagnose({ payload }, { call, put, select }) {
      const response = yield call(getDrugInfoByDiagnose, payload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Drug info failed')
        } else {
          return {}
        }
      }
      return response.data
    },
    *getRefInfoByReceiptNumber({ payload }, { call, put, select }) {
      const response = yield call(getRefInfoByReceiptNumber, {
        data: payload,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Ref info failed')
        } else {
          return {}
        }
      }
      return response.data
    },
    *queryDrugInfo({ payload }, { select, call, put }) {
      const response = yield call(queryExternalAPI, {
        api: 'DrugInfo',
        data: payload,
      })

      if (response) {
        return response
      }

      throw response
    },

    *query({ payload }, { call, put, select }) {
      const userResponse = yield call(queryUserInfo)
      const { locationPathname, locationQuery } = yield select(_ => _.app)

      if (userResponse && userResponse.success) {
        const user = userResponse.data
        const {
          practitioner,
          practitionerRole,
          organization,
          permission,
        } = user
        const { list = [] } = yield call(queryRouteList)

        window.location.user = user
        let routeList = list

        if (Object.values(ROLE_TYPE).includes(permission.role)) {
          permission.visit = list.map(item => item.id)
        } else {
          routeList = list.filter(item => {
            const cases = [
              permission.visit.includes(item.id),
              item.mpid
                ? permission.visit.includes(item.mpid) || item.mpid === '-1'
                : true,
              item.bpid ? permission.visit.includes(item.bpid) : true,
            ]
            return cases.every(_ => _)
          })
        }

        let PatientResource
        let PractitionerResource
        let PractitionerRoleResource
        let OrganizationResource

        if (user.permission.role === ROLE_TYPE.PATIENT) {
          // if patient logged in
          PatientResource = helper.loadResource(user.patient)
        } else {
          PractitionerResource = helper.loadResource(practitioner)
          PractitionerRoleResource = helper.loadResource(practitionerRole)
          OrganizationResource = helper.loadResource(organization)
        }

        yield put({
          type: 'updateState',
          payload: {
            Patient: PatientResource,
            Practitioner: PractitionerResource,
            PractitionerRole: PractitionerRoleResource,
            Organization: OrganizationResource,
            user,
            userRole: user.permission.role,
            permission,
            routeList,
          },
        })

        if (
          list.length > 0 &&
          !list.some(listItem => listItem.route === window.location.pathname)
        ) {
          const defaultRedirect = list.find(
            menuItem => menuItem.id === permission.visit[0]
          )
          router.push({
            pathname: defaultRedirect.route,
          })
        }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        // if not signed in
        router.push({
          pathname: '/auth/login',
          search: stringify({
            from: locationPathname,
            ...locationQuery,
          }),
        })
      }
    },

    *downloadValuesets({ payload }, { call, put, select }) {
      const state = yield select(state => state.app)

      if (state.FHIR_CODES && state.LabTests) {
        return state.FHIR_CODES
      }

      const response = yield call(queryValuesets)

      if (response && response.success) {
        const fhirCodes = response.data.find(v => v.id === FHIR_CODES_ID)

        const {
          UncategorizedTests,
          BiochemistryTests,
          ImmunologyTests,
        } = fhirCodes

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
          Sars_Cov2_IgG,
          Sars_Cov2_IgG_Elisa,
          Ferritin,
          Anti_HDV,
          Hematology,
          Coagulation,
        } = OtherTests.include

        const LabTests = {
          RapidTests,
          ...ViralLoadTests.include,
          BiochemistryTests,
          Hematology,
          ImmunologyTests,
          Coagulation,
          Genotype,
          Urinalysis,
          ESR,
          Vitamin_D3,
          Sars_Cov2_IgG,
          Sars_Cov2_IgG_Elisa,
          Ferritin,
          Anti_HDV,
        }

        // const SpecimenRequiredTests = {
        //   RapidTests,
        //   ViralLoadTests,
        //   BiochemistryTests,
        //   Hematology,
        //   Coagulation,
        //   ImmunologyTests,
        //   Vitamin_D3,
        //   Ferritin,
        //   Anti_HDV,
        // }

        yield put({
          type: 'updateState',
          payload: {
            FHIR_CODES: fhirCodes,
            LabTests: LabTests,
          },
        })
        return fhirCodes
      } else {
        // throw response
      }
    },

    // *search -> generator function
    search({ payload }) {
      router.push({
        pathname: '/reception',
        search: stringify({
          ...payload,
        }),
      })
    },

    *signOut({ payload }, { call, put }) {
      // yield put({ type: 'query' })

      const data = yield call(queryLogOut)

      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            practitioner: undefined,
            permission: { visit: [] },
            menu: [
              {
                id: '1',
                icon: 'laptop',
                name: 'Dashboard',
                router: '/dashboard',
              },
            ],
          },
        })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *changeLanguage({ payload }, { put }) {
      yield put({
        type: 'setLanguage',
        payload: payload,
      })
    },

    *searchBarcode({ payload }, { call, put }) {
      if (payload.from && payload.from.startsWith('/phlebotomy')) {
        yield put({
          type: 'phlebotomy/query',
          payload: {
            id: payload.id,
          },
        })
      } else if (
        payload.from &&
        (payload.from.startsWith('/reception') ||
          payload.from.startsWith('/laboratory') ||
          payload.from.startsWith('/practitioner/patient'))
      ) {
        yield put({ type: 'queryPatientList', payload })
        // if (!!payload.id) {
        //   // const listPatient = yield call(patientLists, payload)
        //   // const { clientInformations } = listPatient.data
        //   // const tableData = []
        //   // if (!!clientInformation) {
        //   //   clientInformations.forEach(clientInformation => {
        //   //     tableData.push({
        //   //       id: clientInformation.patientId,
        //   //       regDate: clientInformation.createdAt,
        //   //       barcode: clientInformation.barcode,
        //   //       lastName: clientInformation.patientLastName,
        //   //       firstName: clientInformation.patientFirstName,
        //   //       NInum: clientInformation.nationalIdentificationNumber,
        //   //       generalPractitioner: '',
        //   //     })
        //   //   })
        //   // }
        //   // if (listPatient && listPatient.success) {
        //   //   yield put({
        //   //     type: 'updateState',
        //   //     payload: {
        //   //       searchedListPatient: tableData,
        //   //     },
        //   //   })
        //   // } else {
        //   //   throw listPatient
        //   // }
        // } else {
        //   yield put({
        //     type: 'updateState',
        //     payload: {
        //       searchedListPatient: undefined,
        //     },
        //   })
        // }
      }
    },

    *queryPatientList({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, searchBarValue } = globalState
      let identifier
      let name

      if (searchBarValue && searchBarValue !== '') {
        let letters = /^[А-ЯӨҮЁа-яөүёA-Za-z]+$/
        if (searchBarValue.match(letters)) {
          name = searchBarValue
        } else {
          if (/^\d+$/.test(searchBarValue)) {
            // only numbers -> patient identifier
            identifier = `${FHIR_CODES.Identifiers.LiverCenter.PatientIdentifier.system}|${searchBarValue}`
          } else {
            // contains letters -> NInum
            identifier = `${FHIR_CODES.Identifiers.NationalIdentificationNumber.system}|${searchBarValue}`
          }
        }
      }

      const result = yield call(queryPatientList, {
        _include: ['Patient:general-practitioner'],
        _count: payload._count,
        _page: payload._page,
        _sort: '-_lastUpdated',
        identifier: identifier,
        'name:exact': name,
      })

      if (result && result.success) {
        const bundle = new Bundle(result.data)

        const patientArray = bundle.getResourcesOnly()
        const patientList = helper
          .loadResourceArray(patientArray)
          .map(patient => {
            const regDate = ''
            const tableDataItem = {
              id: patient.id,
              regDate: regDate,
              barcode: patient._getBarcode(),
              lastName: patient.getLastName(),
              firstName: patient.getFirstName(),
              NInum: patient.getNationalIdentificationNumber(),
              generalPractitioner: '',
            }

            return tableDataItem
          })

        const data = {
          patientList: patientList,
          patientListPagination: {
            // first: (
            //   bundle.link.find(linkItem => linkItem.relation === 'first') || {}
            // ).url,
            // previous: (
            //   bundle.link.find(linkItem => linkItem.relation === 'previous') ||
            //   {}
            // ).url,
            // self: (
            //   bundle.link.find(linkItem => linkItem.relation === 'self') || {}
            // ).url,
            // next: (
            //   bundle.link.find(linkItem => linkItem.relation === 'next') || {}
            // ).url,
            // last: (
            //   bundle.link.find(linkItem => linkItem.relation === 'last') || {}
            // ).url,
            current: Number(payload._page) || DEFAULT_PAGE,
            pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
            total: bundle.total,
          },
        }
        yield put({
          type: 'updateState',
          payload: {
            searchedListPatient: undefined,
            ...data,
          },
        })

        return data
      }
    },

    *queryDlivrPatientList({ payload = {} }, { call, select, put }) {
      yield put({
        type: 'downloadValuesets',
        payload: {},
      })

      const state = yield select(state => state.app)

      if (!state.FHIR_CODES) {
        // no fhir
        console.log('no fhir')
        return
      }

      const dlivrGroupObject = {
        dlivrPreScreening:
          state.FHIR_CODES.Identifiers.LiverCenter.DlivrPreScreening,
        dlivrScreening: state.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening,
      }

      const groupMemberIdentifiers = Object.values(dlivrGroupObject)
        .map(groupCoding => {
          return `${groupCoding.system}|${groupCoding.value}`
        })
        .join(',')

      // const requestPayload = {
      //   resourceType: 'Patient',
      //   // actual: true,
      //   '_has:Group:member:identifier': groupMemberIdentifiers,
      //   // '_has:Group:member:managing-entity': helper.getReferenceUrl(
      //   //   state.Organization
      //   // ),
      //   _revinclude: 'Group:member',
      // }

      const requestPayload = {
        resourceType: 'Group',
        identifier: groupMemberIdentifiers,
        // '_has:Group:member:managing-entity': helper.getReferenceUrl(
        //   state.Organization
        // ),
        _include: 'Group:member',
      }

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read dlivr patient list failed')
        } else {
          return {}
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle.entry || bundle.entry.length === 0) {
        return {}
      }

      const resourceArray = helper.loadResourceArray(
        bundle.entry.map(e => e.resource)
      )

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const patientList =
        resourceDictionary['Patient'] &&
        resourceDictionary['Patient'].map(patient => {
          const theGroup =
            resourceDictionary['Group'] &&
            resourceDictionary['Group'].find(group => {
              return (
                group.member &&
                group.member.find(member =>
                  member.entity.reference.endsWith(
                    helper.getReferenceUrl(patient)
                  )
                )
              )
            })

          const groupType = Object.keys(dlivrGroupObject).find(
            groupKey =>
              theGroup &&
              theGroup.identifier.find(
                identifier =>
                  identifier.system === dlivrGroupObject[groupKey].system &&
                  identifier.value === dlivrGroupObject[groupKey].value
              )
          )

          const regDate = ''
          const tableDataItem = {
            id: patient.id,
            regDate: regDate,
            barcode: patient._getBarcode(),
            lastName: patient.getLastName(),
            firstName: patient.getFirstName(),
            NInum: patient.getNationalIdentificationNumber(),
            generalPractitioner: '',
            dlivrStatus: groupType,
            dlivrIdentificationNumber: patient._getDlivrIdentificationNumber(),
          }

          return tableDataItem
        })

      const result = {
        dataSource: patientList,
        patientListPagination: {
          current: Number(payload._page) || 20,
          pageSize: Number(payload._count) || 20,
          total: bundle.total,
        },
      }

      return result
    },

    *queryDlivrGroups({ payload = {} }, { call, select, put }) {
      const globalState = yield select(state => state.app)

      if (!globalState.FHIR_CODES) {
        return
      }

      const requestPayload = {
        resourceType: 'Group',
        // actual: true,
        identifier: `${globalState.FHIR_CODES.Identifiers.LiverCenter.Dlivr.system}|${globalState.FHIR_CODES.Identifiers.LiverCenter.Dlivr.value}`,
        'managing-entity': helper.getReferenceUrl(globalState.Organization),
        _include: 'Group:member',
      }

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read dlivr groups list failed')
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

      if (!resourceDictionary['Group']) {
        return
      }

      const dlivrGroupMain = resourceDictionary['Group'].find(
        group =>
          group.identifier &&
          group.identifier.some(
            identifier =>
              identifier.system ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.Dlivr.system &&
              identifier.value ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.Dlivr.value
          )
      )

      const dlivrGroupExcluded = resourceDictionary['Group'].find(
        group =>
          group.identifier &&
          group.identifier.some(
            identifier =>
              identifier.system ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrExcluded
                  .system &&
              identifier.value ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrExcluded
                  .value
          )
      )

      const dlivrGroupPreScreening = resourceDictionary['Group'].find(
        group =>
          group.identifier &&
          group.identifier.some(
            identifier =>
              identifier.system ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrPreScreening
                  .system &&
              identifier.value ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrPreScreening
                  .value
          )
      )

      const dlivrGroupScreening = resourceDictionary['Group'].find(
        group =>
          group.identifier &&
          group.identifier.some(
            identifier =>
              identifier.system ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening
                  .system &&
              identifier.value ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening
                  .value
          )
      )

      const dlivrGroupTreatment = resourceDictionary['Group'].find(
        group =>
          group.identifier &&
          group.identifier.some(
            identifier =>
              identifier.system ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrTreatment
                  .system &&
              identifier.value ===
                globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrTreatment
                  .value
          )
      )

      const dlivrGroupPostTreatment = resourceDictionary['Group'].find(
        group =>
          group.identifier &&
          group.identifier.some(
            identifier =>
              identifier.system ===
                globalState.FHIR_CODES.Identifiers.LiverCenter
                  .DlivrPostTreatment.system &&
              identifier.value ===
                globalState.FHIR_CODES.Identifiers.LiverCenter
                  .DlivrPostTreatment.value
          )
      )

      console.log(dlivrGroupMain)

      yield put({
        type: 'updateState',
        payload: {
          dlivrGroupsCreated: !!dlivrGroupMain,
          dlivrGroupExcluded,
          dlivrGroupPreScreening,
          dlivrGroupScreening,
          dlivrGroupTreatment,
          dlivrGroupPostTreatment,
        },
      })
    },

    *queryLabResult({ payload = {} }, { call, put, select }) {
      /* Энэ функийг
       * лабораторийн хариу баталгаажуулах хэсгийн хариу үзүүлэх цонх,
       * хүлээн авах хэсгийн хариу хэвлэх цонх
       * -ны өгөгдлийг авахад хэрэглэсэн
       */

      // const { LabTests, FHIR_CODES } = yield select(state => state.app)

      // if (!payload.serviceRequestId) {
      //   throw new Error('ServiceRequestId is not defined')
      // }

      // const requestPayload = {
      //   resourceType: 'ServiceRequest',
      //   _id: payload.serviceRequestId,
      //   _include: ['ServiceRequest:patient'],
      //   _revinclude: ['DiagnosticReport:based-on'],
      //   '_include:iterate': [
      //     'DiagnosticReport:result',
      //     'DiagnosticReport:specimen',
      //     'Observation:has-member',
      //   ],
      //   '_revinclude:iterate': [
      //     'ServiceRequest:based-on',
      //     'Observation:based-on',
      //   ],
      // }

      // const response = yield call(readResource, requestPayload)

      // if (!response.success) {
      //   if (response.message !== CANCEL_REQUEST_MESSAGE) {
      //     throw response
      //   } else {
      //     return
      //   }
      // }

      // const bundle = new Bundle(response.data)

      // if (bundle.entry.length === 0) {
      //   return
      // }

      // const data = controller.generateTableData(
      //   bundle,
      //   FHIR_CODES,
      //   LabTests[payload.testKey]
      // )
      // console.log('хуучин нь юу буцааж байсан бэээээээээээээээ', data)
      // return data[0]
      ///////////////////////////////////////////////////////////////////////
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
        const serviceRequests = resourceDictionary['ServiceRequest']

        if (
          !serviceRequests
            .map(serviceRequest => serviceRequest.subject.reference)
            .every((ref, i, refs) => ref === refs[0])
        ) {
          // faulty group
          throw new Error('service requests reference more than 1 patient')
        }

        const patient = helper.findByReference(
          resourceDictionary['Patient'],
          serviceRequests[0].subject
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
          patient: patient,
          verifiedPractitioner,
          performedPractitioner,
          specimen,
          sampleCollectedDate: dateTime.toLocalDateTime(sampleCollectedDate),
          verifiedTime: dateTime.toLocalDateTime(verifiedTime),
          runCompletionTime: dateTime.toLocalDateTime(runCompletionTime),
        }
        console.log('dataaaaaaaaa----------------', data)
        return data
      }
    },

    /* #region  query lab results */
    *queryLaboratoryTestLevel0({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES, LabTests } = globalState
      const { patientId } = localState
      const dataSources = []

      if (payload.testKey === 'ViralLoadTests') {
        const viralLoadRequestQuery = Object.values(
          FHIR_CODES.UncategorizedTests.ViralLoadTests.include
        )
          .map(viralLoadTestIem => {
            return `${viralLoadTestIem.code.coding[0].system}|${viralLoadTestIem.code.coding[0].code}`
          })
          .join(',')

        const requestPayload = {
          resourceType: 'ServiceRequest',
          code: viralLoadRequestQuery,
          patient: patientId,
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

        const resourceArray = bundle.entry.map(e => e.resource)

        const resourceDictionary = createResourceDictionary(resourceArray)

        console.log(resourceDictionary)

        const viralLoadTestResultList = {}

        Object.values(resourceDictionary['DiagnosticReport']).forEach(
          resourceReportDiagnosticReport => {
            console.log(resourceReportDiagnosticReport)

            const viralLoadTest = Object.values(
              FHIR_CODES.UncategorizedTests.ViralLoadTests.include
            ).find(v =>
              codeIntersects(v.code, resourceReportDiagnosticReport.code)
            )

            console.log(viralLoadTest)

            const testResult =
              viralLoadTest &&
              recursiveTestDataBuilder(resourceArray, viralLoadTest)

            console.log(testResult)

            const diagnosticReport =
              testResult &&
              Object.values(resourceReportDiagnosticReport).find(dr =>
                containsReference(
                  dr.basedOn,
                  getReferenceUrl(testResult.serviceRequest)
                )
              )

            let specimen
            if (diagnosticReport && diagnosticReport.specimen) {
              specimen = diagnosticReport.specimen.map(spRef =>
                findByReference(resourceDictionary['Specimen'], spRef.reference)
              )
            }

            const latestSpecimen = specimen && specimen[specimen.length - 1]
            const sampleCollectedDate =
              latestSpecimen &&
              latestSpecimen.collection &&
              latestSpecimen.collection.collectedDateTime
            const runCompletionTime = testResult.serviceRequest.meta.lastUpdated

            Object.assign(testResult, {
              diagnosticReport,
              specimen,
              sampleCollectedDate: toLocalDateTime(
                sampleCollectedDate,
                'yyyy-mm-dd'
              ),
              runCompletionTime: toLocalDateTime(runCompletionTime),
            })

            const data = {
              ...testResult,
              diagnosticReport,
              specimen,
              sampleCollectedDate: toLocalDateTime(
                sampleCollectedDate,
                'yyyy-mm-dd'
              ),
              runCompletionTime: toLocalDateTime(runCompletionTime),
            }

            console.log(data)

            viralLoadTestResultList[viralLoadTest.display] = data
          }
        )

        dataSources.push(viralLoadTestResultList)
      } else {
        console.log(payload.testCode)
        const requestPayload = {
          resourceType: 'DiagnosticReport',
          code: `${payload.testCode.code.coding[0].system}|${payload.testCode.code.coding[0].code}`,
          patient: patientId,
          _include: [
            'DiagnosticReport:result',
            'DiagnosticReport:specimen',
            'DiagnosticReport:based-on',
            'DiagnosticReport:performer',
          ],
          '_include:iterate': ['Observation:has-member'],
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

        const resourceDictionary = createResourceDictionary(resourceArray)

        resourceDictionary['DiagnosticReport'].forEach(diagnosticReport => {
          const resultArray = diagnosticReport.result.map(result => {
            return findByReference(resourceDictionary['Observation'], result)
          })

          const observationArray = resultArray.filter(resource => {
            return codeIntersects(resource.code, payload.testCode.code)
          })

          sortByDate(observationArray, 'issued')

          const latestObservation = observationArray.slice(-1)[0]

          const testResult = {
            latestObservation,
            observationArray,
          }

          const organizationReference =
            diagnosticReport.performer &&
            diagnosticReport.performer.find(
              performer => performer.type === 'Organization'
            )
          const organization =
            organizationReference &&
            resourceDictionary['Organization'] &&
            findByReference(
              resourceDictionary['Organization'],
              organizationReference
            )

          const regulatoryNotes = resultArray.find(result => {
            return codeIntersects(
              result.code,
              FHIR_CODES.Observations.RegulatoryNotes.code
            )
          })

          const data = {
            key: diagnosticReport.id,
            ...testResult,
            diagnosticReport,
            regulatoryNotes,
            issuedDate: toLocalDateTime(diagnosticReport.issued, 'yyyy-mm-dd'),
            organizationName: organization && organization.name,
          }

          dataSources.push(data)
        })
      }

      return dataSources
    },

    *queryLaboratoryTestLevel1({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES, LabTests } = globalState
      const { patientId } = localState
      const dataSources = []

      const requestPayload = {
        resourceType: 'DiagnosticReport',
        code: `${payload.testCode.code.coding[0].system}|${payload.testCode.code.coding[0].code}`,
        patient: patientId,
        _include: [
          'DiagnosticReport:result',
          'DiagnosticReport:specimen',
          'DiagnosticReport:based-on',
          'DiagnosticReport:performer',
        ],
        '_include:iterate': ['Observation:has-member'],
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

      const resourceDictionary = createResourceDictionary(resourceArray)

      resourceDictionary['DiagnosticReport'].forEach(diagnosticReport => {
        const resultArray = diagnosticReport.result.map(result => {
          return findByReference(resourceDictionary['Observation'], result)
        })

        const testResult = {}
        const include = {}
        Object.keys(payload.testCode.include).forEach(subTestKey => {
          const subTestCode = payload.testCode.include[subTestKey]

          const observationArray = resultArray.filter(resource => {
            return codeIntersects(resource.code, subTestCode.code)
          })

          sortByDate(observationArray, 'issued')

          const latestObservation = observationArray.slice(-1)[0]

          include[subTestKey] = {
            latestObservation,
            observationArray: observationArray,
          }
        })

        testResult.include = include

        const organizationReference =
          diagnosticReport.performer &&
          diagnosticReport.performer.find(
            performer => performer.type === 'Organization'
          )

        const organization =
          organizationReference &&
          resourceDictionary['Organization'] &&
          findByReference(
            resourceDictionary['Organization'],
            organizationReference
          )

        const regulatoryNotes = resultArray.find(result => {
          return codeIntersects(
            result.code,
            FHIR_CODES.Observations.RegulatoryNotes.code
          )
        })

        const data = {
          key: diagnosticReport.id,
          ...testResult,
          diagnosticReport,
          regulatoryNotes,
          issuedDate: toLocalDateTime(diagnosticReport.issued, 'yyyy-mm-dd'),
          organizationName: organization && organization.name,
        }

        dataSources.push(data)
      })

      return dataSources
    },

    *queryLaboratoryTestLevel2({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES, LabTests } = globalState
      const { patientId } = localState
      const dataSources = []

      console.log(payload)
      const requestPayload = {
        resourceType: 'DiagnosticReport',
        code: `${payload.testCode.code.coding[0].system}|${payload.testCode.code.coding[0].code}`,
        patient: patientId,
        _include: [
          'DiagnosticReport:result',
          'DiagnosticReport:specimen',
          'DiagnosticReport:based-on',
          'DiagnosticReport:performer',
        ],
        '_include:iterate': ['Observation:has-member'],
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

      const resourceDictionary = createResourceDictionary(resourceArray)

      resourceDictionary['DiagnosticReport'].forEach(diagnosticReport => {
        const resultArray = diagnosticReport.result.map(result => {
          return findByReference(resourceDictionary['Observation'], result)
        })

        const testResult = {}
        const include = {}
        Object.keys(payload.testCode.include).forEach(childTestKey => {
          const childTestCode = payload.testCode.include[childTestKey]

          const childObservationArray = resultArray.filter(resource => {
            console.log(resource.code, childTestCode.code)
            return codeIntersects(resource.code, childTestCode.code)
          })

          sortByDate(childObservationArray, 'issued')

          const childLatestObservation = childObservationArray.slice(-1)[0]

          const subInclude = {}
          const childResultArray =
            childLatestObservation &&
            childLatestObservation.hasMember &&
            childLatestObservation.hasMember.map(member => {
              return findByReference(resourceDictionary['Observation'], member)
            })

          if (childResultArray) {
            include[childTestKey] = {
              latestObservation: childLatestObservation,
              observationArray: childObservationArray,
            }

            Object.keys(payload.testCode.include[childTestKey].include).forEach(
              grandChildTestKey => {
                if (!childResultArray) {
                  return
                }
                const grandChildTestCode =
                  payload.testCode.include[childTestKey].include[
                    grandChildTestKey
                  ]

                const grandChildObservationArray = childResultArray.filter(
                  resource => {
                    return codeIntersects(
                      resource.code,
                      grandChildTestCode.code
                    )
                  }
                )

                sortByDate(grandChildObservationArray, 'issued')

                const grandChildLatestObservation = grandChildObservationArray.slice(
                  -1
                )[0]

                if (grandChildLatestObservation) {
                  subInclude[grandChildTestKey] = {
                    latestObservation: grandChildLatestObservation,
                    observationArray: grandChildObservationArray,
                  }
                }
              }
            )

            if (!isEmptyObject(subInclude)) {
              include[childTestKey].include = subInclude
            }
          }
        })

        testResult.include = include

        const organizationReference =
          diagnosticReport.performer &&
          diagnosticReport.performer.find(
            performer => performer.type === 'Organization'
          )

        const organization =
          organizationReference &&
          resourceDictionary['Organization'] &&
          findByReference(
            resourceDictionary['Organization'],
            organizationReference
          )

        const regulatoryNotes = resultArray.find(result => {
          return codeIntersects(
            result.code,
            FHIR_CODES.Observations.RegulatoryNotes.code
          )
        })

        const data = {
          key: diagnosticReport.id,
          ...testResult,
          diagnosticReport,
          regulatoryNotes,
          issuedDate: toLocalDateTime(diagnosticReport.issued, 'yyyy-mm-dd'),
          organizationName: organization && organization.name,
        }

        dataSources.push(data)
      })

      return dataSources
    },
    /* #endregion */

    /* #region  save Results */

    *saveLabResultLevel0({ payload = {} }, { call, put, select }) {
      const {
        testData,
        testResult,
        testCode,
        testKey,
        regulatoryNotes,
        organizationReference,
        patient,
        issuedDate,
        observationStatus,
        diagnosticReportStatus,
      } = payload

      const state = yield select(state => state)
      const globalState = state.app

      if (!patient) {
        throw new Error('patient is undefined')
      }

      if (
        ![
          'registered',
          'preliminary',
          'final',
          'amended',
          'corrected',
          'cancelled',
          'entered-in-error',
          'unknown',
        ].includes(observationStatus)
      ) {
        throw new Error('observationStatus is invalid')
      }

      if (
        ![
          'registered',
          'partial',
          'preliminary',
          'final',
          'amended',
          'corrected',
          'appended',
          'cancelled',
          'entered-in-error',
          'unknown',
        ].includes(diagnosticReportStatus)
      ) {
        throw new Error('diagnosticReportStatus is invalid')
      }

      if (!testResult[testKey]) {
        throw new Error('no result value available')
      }

      const defaults = {
        status: observationStatus,
        subject: patient.getReference(),
        issued: issuedDate.toISOString(),
        performer: [globalState.Practitioner.getReference()],
      }

      if (organizationReference) {
        defaults.performer.push(organizationReference)
      }

      const observationIdentifier = {
        ...globalState.FHIR_CODES.Identifiers.Observations,
        value: dateTime.getInstant(),
      }

      const bundleEntries = []

      const { code, referenceRange, unit } = testCode

      const { valueCodeableConcept, valueQuantity } = testResult[testKey]

      const newObservationData = {
        ...defaults,
        ...testResult[testKey],
        identifier: [observationIdentifier],
        category: [globalState.FHIR_CODES.Categories.Laboratory],
        code: testCode.code,
      }

      if (valueQuantity) {
        let relatedReferenceRange
        let interpretation

        try {
          relatedReferenceRange = helper.getRelatedReferenceRange(
            referenceRange,
            patient
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

        Object.assign(newObservationData, {
          valueQuantity: valueQuantity,
          interpretation: interpretation && interpretation,
          referenceRange: relatedReferenceRange && {
            low: relatedReferenceRange.low,
            high: relatedReferenceRange.high,
          },
        })
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

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (regulatoryNotes && regulatoryNotes !== '') {
        const regulatoryNotesObservation = new Observation({
          ...defaults,
          identifier: [observationIdentifier],
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
        status: diagnosticReportStatus,
        identifier: [
          Object.assign(
            {
              value: dateTime.getInstant(),
            },
            globalState.FHIR_CODES.Identifiers.DiagnosticReport
          ),
        ],
        category: [globalState.FHIR_CODES.DiagnosticReportCategories.LAB],
        code: testCode.code,
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

    *saveLabResultLevel1({ payload = {} }, { call, put, select }) {
      const {
        testData,
        testResult,
        testCode,
        regulatoryNotes,
        organizationReference,
        patient,
        issuedDate,
        observationStatus,
        diagnosticReportStatus,
      } = payload

      const state = yield select(state => state)
      const globalState = state.app

      if (!patient) {
        throw new Error('patient is undefined')
      }

      if (
        ![
          'registered',
          'preliminary',
          'final',
          'amended',
          'corrected',
          'cancelled',
          'entered-in-error',
          'unknown',
        ].includes(observationStatus)
      ) {
        throw new Error('observationStatus is invalid')
      }

      if (
        ![
          'registered',
          'partial',
          'preliminary',
          'final',
          'amended',
          'corrected',
          'appended',
          'cancelled',
          'entered-in-error',
          'unknown',
        ].includes(diagnosticReportStatus)
      ) {
        throw new Error('diagnosticReportStatus is invalid')
      }

      const defaults = {
        status: observationStatus,
        subject: patient.getReference(),
        issued: issuedDate.toISOString(),
        performer: [globalState.Practitioner.getReference()],
      }

      if (organizationReference) {
        defaults.performer.push(organizationReference)
      }

      const bundleEntries = []
      const observationArray = []

      /* #region  CHILD OBSERVATION */
      Object.keys(testResult).forEach(childTestKey => {
        if (
          testResult[childTestKey] === undefined ||
          testResult[childTestKey] === ''
        ) {
          return
        }

        const { code, referenceRange } = testCode.include[childTestKey]

        const observationData = {
          ...defaults,
          ...testResult[childTestKey],
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
          category: [globalState.FHIR_CODES.Categories.Laboratory],
          code: code,
        }

        const { valueCodeableConcept, valueQuantity } = testResult[childTestKey]

        if (valueQuantity) {
          let relatedReferenceRange
          let interpretation

          try {
            relatedReferenceRange = helper.getRelatedReferenceRange(
              referenceRange,
              patient
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

          Object.assign(observationData, {
            valueQuantity: valueQuantity,
            interpretation: interpretation && interpretation,
            referenceRange: relatedReferenceRange && {
              low: relatedReferenceRange.low,
              high: relatedReferenceRange.high,
            },
          })
        }

        if (
          testData &&
          testData.include[childTestKey] &&
          testData.include[childTestKey].serviceRequestRef
        ) {
          observationData.basedOn = [
            testData.include[childTestKey].serviceRequestRef,
          ]
        }

        const observation = new Observation(observationData)
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
        status: diagnosticReportStatus,
        identifier: [
          Object.assign(
            {
              value: dateTime.getInstant(),
            },
            globalState.FHIR_CODES.Identifiers.DiagnosticReport
          ),
        ],
        category: [globalState.FHIR_CODES.DiagnosticReportCategories.LAB],
        code: testCode.code,
        result: observationArray.map(o => {
          return { reference: o.fullUrl, type: 'Observation' }
        }),
      }

      if (testData && testData.serviceRequestRef && testData.specimen) {
        Object.assign(diagnosticReportData, {
          basedOn: [testData.serviceRequestRef],
          specimen: testData.specimen.map(sp => helper.getReference(sp)),
        })
      }

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (regulatoryNotes && regulatoryNotes !== '') {
        const regulatoryNotesData = {
          ...defaults,
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        }

        if (testData && testData['serviceRequestRef']) {
          regulatoryNotes.basedOn = [testData['serviceRequestRef']]
        }

        const regulatoryNotesObservation = new Observation(regulatoryNotesData)

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

    *saveLabResultLevel2({ payload = {} }, { call, put, select }) {
      const {
        testData,
        testResult,
        testCode,
        regulatoryNotes,
        organizationReference,
        patient,
        issuedDate,
        observationStatus,
        diagnosticReportStatus,
      } = payload

      const state = yield select(state => state)
      const globalState = state.app

      if (!patient) {
        throw new Error('patient is undefined')
      }

      if (
        ![
          'registered',
          'preliminary',
          'final',
          'amended',
          'corrected',
          'cancelled',
          'entered-in-error',
          'unknown',
        ].includes(observationStatus)
      ) {
        throw new Error('observationStatus is invalid')
      }

      if (
        ![
          'registered',
          'partial',
          'preliminary',
          'final',
          'amended',
          'corrected',
          'appended',
          'cancelled',
          'entered-in-error',
          'unknown',
        ].includes(diagnosticReportStatus)
      ) {
        throw new Error('diagnosticReportStatus is invalid')
      }

      const defaults = {
        status: observationStatus,
        subject: patient.getReference(),
        issued: issuedDate.toISOString(),
        performer: [globalState.Practitioner.getReference()],
      }

      if (organizationReference) {
        defaults.performer.push(organizationReference)
      }

      const bundleEntries = []
      const parentObservationArray = []

      Object.keys(testResult).forEach(testKey => {
        if (testResult[testKey] === undefined || testResult[testKey] === '') {
          return
        }

        const observationArray = Object.keys(testResult[testKey].include).map(
          subTestKey => {
            const { code, referenceRange } = testCode.include[testKey].include[
              subTestKey
            ]

            const observation = new Observation({
              ...defaults,
              // valueCodeableConcept or( valueQuantity and referenceRange) here
              ...testResult[testKey]['include'][subTestKey],
              identifier: [
                Object.assign(
                  {
                    value: dateTime.getInstant(),
                  },
                  globalState.FHIR_CODES.Identifiers.Observations
                ),
              ],
              category: [globalState.FHIR_CODES.Categories.Laboratory],
              code: code,
            })

            const { valueCodeableConcept, valueQuantity } = testResult[
              testKey
            ].include[subTestKey]

            if (valueQuantity) {
              let relatedReferenceRange
              let interpretation

              try {
                relatedReferenceRange = helper.getRelatedReferenceRange(
                  referenceRange,
                  patient
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

              Object.assign(observation, {
                valueQuantity: valueQuantity,
                interpretation: interpretation && interpretation,
                referenceRange: relatedReferenceRange && {
                  low: relatedReferenceRange.low,
                  high: relatedReferenceRange.high,
                },
              })

              if (
                testData &&
                testData.include[testKey].include[subTestKey].serviceRequestRef
              ) {
                observation.basedOn = [
                  testData.include[testKey].include[subTestKey]
                    .serviceRequestRef,
                ]
              }
            }

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
        const parentCode = testCode.include[testKey].code
        const parentReferenceRange = testCode.include[testKey].referenceRange

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
          category: [globalState.FHIR_CODES.Categories.Laboratory],
          code: parentCode,
          // device
          referenceRange: parentReferenceRange && parentReferenceRange,
          hasMember: observationArray.map(o => {
            return { reference: o.fullUrl }
          }),
        })

        if (testData && testData.include[testKey].serviceRequestRef) {
          parentObservation.basedOn = [
            testData.include[testKey].serviceRequestRef,
          ]
        }

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

      /* #endregion */

      const diagnosticReportData = {
        ...defaults,
        status: diagnosticReportStatus,
        identifier: [
          Object.assign(
            {
              value: dateTime.getInstant(),
            },
            globalState.FHIR_CODES.Identifiers.DiagnosticReport
          ),
        ],
        category: [globalState.FHIR_CODES.DiagnosticReportCategories.LAB],
        code: testCode.code,
        result: parentObservationArray.map(o => {
          return { reference: o.fullUrl, type: 'Observation' }
        }),
      }

      if (testData && testData.serviceRequestRef && testData.specimen) {
        Object.assign(diagnosticReportData, {
          basedOn: [testData.serviceRequestRef],
          specimen: testData.specimen.map(sp => helper.getReference(sp)),
        })
      }

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (regulatoryNotes && regulatoryNotes !== '') {
        const regulatoryNotesData = {
          ...defaults,
          identifier: [
            Object.assign(
              {
                value: dateTime.getInstant(),
              },
              globalState.FHIR_CODES.Identifiers.Observations
            ),
          ],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        }

        if (testData && testData['serviceRequestRef']) {
          regulatoryNotes.basedOn = [testData['serviceRequestRef']]
        }

        const regulatoryNotesObservation = new Observation(regulatoryNotesData)

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

    /* #endregion */

    *queryOrganizationList({ payload }, { call, put, select }) {
      const response = yield call(readResource, {
        resourceType: 'Organization',
        'name:contains': payload.name,
        _page: payload._page,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read failed')
        } else {
          return
        }
      }

      const bundle = new Bundle(response.data)

      if (bundle.entry.length === 0) {
        return {
          dataSource: [],
        }
      }

      console.log(response)
      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      return {
        pagination: {
          current: Number(payload._page) || DEFAULT_PAGE,
          pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
          total: bundle.total,
        },
        dataSource: resourceDictionary['Organization'],
      }
    },

    *queryLaboratoryReport({ payload }, { call }) {
      const response = yield call(getLaboratoryReport, {
        diagnosticReportId: payload.diagnosticReportId,
        language: payload.language,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read failed')
        } else {
          return
        }
      }

      console.log(response)
      return response.data
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },

    setLanguage(state, { payload }) {
      state.lang = payload
    },
  },
}
