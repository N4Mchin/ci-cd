/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import * as controller from 'utils/controller'
import uuidv4 from 'uuid/v4'
import {
  bundleentry as BundleEntry,
  bundle as Bundle,
  specimen as Specimen,
} from 'schemas'

import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

const {
  batch_transaction_request,
  readResource,
  getExternalSpecimenLog,
  putExternalSpecimenLog,
  getFile,
  queryValuesets,
} = api

export default modelExtend(pageModel, {
  namespace: 'specimenCondition',

  state: {
    SpecimenRequiredTests: {},
    UnsatisfactorySamples: {},
    total: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (
          pathMatchRegexp('/laboratory/specimenCondition', location.pathname)
        ) {
          // const payload = location.query || { page: 1, pageSize: 20 }
          dispatch({
            type: 'init',
          })
        }
      })
      history.listen(location => {
        if ('/laboratory/externalSamples' === location.pathname) {
          dispatch({ type: 'downloadValuesets' })
        }
      })
    },
  },

  effects: {
    *init({ payload }, { put, select }) {
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
        Hematology,
        Coagulation,
        Vitamin_D3,
        Ferritin,
        Anti_HDV,
      } = OtherTests.include

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
      }

      const {
        SampleNormal,
        ...UnsatisfactorySamples
      } = FHIR_CODES.Specimens.Conditions

      yield put({
        type: 'updateState',
        payload: {
          SpecimenRequiredTests,
          UnsatisfactorySamples,
        },
      })
    },

    *queryExternalSamples({ payload = {} }, { call, put, select }) {
      const response = yield call(getExternalSpecimenLog, {
        searchValue: payload.searchValue,
        organizationStates: payload.organizationStates,
        _count: payload._count,
        _page: payload._page,
        startDate: payload.startDate,
        endDate: payload.endDate,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      return {
        response,
        pagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: response.total,
        },
      }
    },
    *saveLabExternalSample({ payload = {} }, { call, put, select }) {
      const response = yield call(putExternalSpecimenLog, {
        dataSource: payload.dataSource,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      return response
    },

    *downloadValuesets({ payload }, { call, put, select }) {
      const Valuesets = yield select(state => state.specimenCondition.Valuesets)

      if (
        !!Valuesets &&
        (!helper.isObject(Valuesets) || !helper.isEmptyObject(Valuesets))
      ) {
        return
      }

      const valuesetList = ['address-values-mn']

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

    *downloadExcel({ payload = {} }, { call, put, select }) {
      const response = yield call(getFile, {
        endPointLink: '/externalSpecimenLog/excel',
      })
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      return response
    },

    *refresh({ payload }, { put, select }) {
      yield put({
        type: 'querySpecimens',
        payload,
      })
    },

    *queryStatistics({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(state => state.specimenCondition)

      const { SpecimenRequiredTests } = localState

      if (!SpecimenRequiredTests) {
        throw new Error('Specimen Required Tests are not defined')
      }

      const entry = [
        {
          request: {
            method: 'GET',
            url: `Specimen?status=unavailable&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?status=available&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?status=unsatisfactory&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?status=unsatisfactory&condition=${FHIR_CODES.Specimens.Conditions.SampleHemolyzed.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleHemolyzed.coding[0].code}&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?status=unsatisfactory&condition=${FHIR_CODES.Specimens.Conditions.SampleMilky.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleMilky.coding[0].code}&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?status=unsatisfactory&condition=${FHIR_CODES.Specimens.Conditions.SampleLeaked.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleLeaked.coding[0].code}&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?status=unsatisfactory&condition=${FHIR_CODES.Specimens.Conditions.SampleInadequate.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleInadequate.coding[0].code}&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?status=unsatisfactory&condition=${FHIR_CODES.Specimens.Conditions.Other.coding[0].system}|${FHIR_CODES.Specimens.Conditions.Other.coding[0].code}&identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&_summary=count`,
          },
        },
      ]

      const statBundle = new Bundle({
        type: 'batch',
        entry: entry,
      })

      const json = statBundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        const bundle = new Bundle(response.data)

        const totalUnavailable = bundle.entry[0].resource.total
        const totalAvailable = bundle.entry[1].resource.total
        const totalUnsatisfactory = bundle.entry[2].resource.total
        const totalHemolyzed = bundle.entry[3].resource.total
        const totalMilky = bundle.entry[4].resource.total
        const totalLeaked = bundle.entry[5].resource.total
        const totalInadequate = bundle.entry[6].resource.total
        const totalOther = bundle.entry[7].resource.total

        return {
          SampleNew: totalUnavailable,
          SampleNormal: totalAvailable,
          SampleUnsatisfactory: totalUnsatisfactory,
          SampleHemolyzed: totalHemolyzed,
          SampleMilky: totalMilky,
          SampleLeaked: totalLeaked,
          SampleInadequate: totalInadequate,
          Other: totalOther,
        }
      }

      return {}
    },

    *querySpecimens({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(state => state.specimenCondition)

      const { SpecimenRequiredTests } = localState

      if (!SpecimenRequiredTests) {
        throw new Error('Specimen Required Tests are not defined')
      }

      const { sampleType } = payload

      let status
      let condition

      switch (sampleType) {
        case 'SampleNew':
          status = 'unavailable'
          break
        case 'SampleNormal':
          status = 'available'
          break
        case 'SampleHemolyzed':
          status = 'unsatisfactory'
          condition = `${FHIR_CODES.Specimens.Conditions.SampleHemolyzed.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleHemolyzed.coding[0].code}`
          break
        case 'SampleMilky':
          status = 'unsatisfactory'
          condition = `${FHIR_CODES.Specimens.Conditions.SampleMilky.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleMilky.coding[0].code}`
          break
        case 'SampleInadequate':
          status = 'unsatisfactory'
          condition = `${FHIR_CODES.Specimens.Conditions.SampleInadequate.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleInadequate.coding[0].code}`
          break
        case 'SampleLeaked':
          status = 'unsatisfactory'
          condition = `${FHIR_CODES.Specimens.Conditions.SampleLeaked.coding[0].system}|${FHIR_CODES.Specimens.Conditions.SampleLeaked.coding[0].code}`
          break
        case 'Other':
          status = 'unsatisfactory'
          condition = `${FHIR_CODES.Specimens.Conditions.Other.coding[0].system}|${FHIR_CODES.Specimens.Conditions.Other.coding[0].code}`
          break

        default:
          break
      }

      const requestPayload = {
        resourceType: 'Specimen',
        identifier: `${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|`,
        status: status,
        condition: condition,
        _include: 'Specimen:subject',
        '_include:iterate': ['ServiceRequest:based-on'],
        '_revinclude:iterate': [
          'ServiceRequest:specimen',
          'DiagnosticReport:based-on',
        ],
        _count: payload._count,
        _page: payload._page,
      }

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      const bundle = new Bundle(response.data)
      const dataSource = []

      if (!bundle || bundle.entry.length === 0) {
        return {
          dataSource: dataSource,
          pagination: {},
        }
      }

      const resourceArray = helper
        .loadResourceArray(bundle.getResourcesOnly())
        .reverse()

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      resourceDictionary['Specimen'].forEach(specimen => {
        let patient

        try {
          patient = helper.findByReference(
            resourceDictionary['Patient'],
            specimen.subject
          )
        } catch (errorInfo) {
          // console.log(errorInfo)
          return
        }

        if (!patient) {
          return
        }

        const testKeys = []
        const testServiceRequests = []
        const phlebotomyServiceRequests = []

        resourceDictionary['ServiceRequest'].forEach(sr => {
          if (
            sr.specimen.some(srSpecimen =>
              srSpecimen.reference.endsWith(helper.getReferenceUrl(specimen))
            )
          ) {
            const testKey = Object.keys(
              SpecimenRequiredTests
            ).find(specimenRequiredTestKey =>
              controller.codeIntersects(
                SpecimenRequiredTests[specimenRequiredTestKey].code,
                sr.code
              )
            )
            if (testKey) {
              testKeys.push(testKey)
              testServiceRequests.push(sr)
            }

            if (
              controller.codeIntersects(
                sr.code,
                FHIR_CODES.Phlebotomy.PhlebotomyServiceRequest.code
              )
            ) {
              phlebotomyServiceRequests.push(sr)
            }
          }
        })

        let specimenCondition

        if (specimen.status === 'unavailable') {
          specimenCondition = 'SampleNew'
        } else if (specimen.status === 'available') {
          specimenCondition = 'SampleNormal'
        } else if (specimen.status === 'unsatisfactory') {
          specimenCondition = Object.keys(
            FHIR_CODES.Specimens.Conditions
          ).find(key =>
            controller.codeIntersects(
              specimen.condition,
              FHIR_CODES.Specimens.Conditions[key]
            )
          )
        }

        const testNames = testKeys.map(
          testKey => SpecimenRequiredTests[testKey].display
        )

        const sampleCollectionDateTime = dateTime.toLocalDateTime(
          specimen.collection.collectedDateTime,
          'yyyy-mm-dd'
        )

        const barcode = specimen.identifier.find(
          value =>
            value.system === FHIR_CODES.Identifiers.LiverCenter.Specimen.system
        ).value

        const data = {
          key: specimen.id,
          specimenId: specimen.id,
          sampleCollectionDateTime: sampleCollectionDateTime,
          barcode,
          testName: testNames.join(' | '),
          lastName: patient.getLastName(),
          firstName: patient.getFirstName(),
          NInum: patient.getNationalIdentificationNumber(),
          specimen,
          specimenCondition: specimenCondition,
          testServiceRequests,
          phlebotomyServiceRequests,
        }

        dataSource.push(data)
      })

      const result = {
        dataSource: dataSource,
        pagination: {
          // first: (
          //   bundle.link.find(linkItem => linkItem.relation === 'first') || {}
          // ).url,
          // previous: (
          //   bundle.link.find(linkItem => linkItem.relation === 'previous') || {}
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
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: bundle.total,
        },
      }

      return result
    },

    *saveNormalSamples({ payload = {} }, { call, put, select }) {
      const { data } = payload

      const bundleEntries = []

      data.forEach(item => {
        const { specimen } = item

        const updatedSpecimen = new Specimen({
          ...specimen.toJSON(),
          status: 'available',
          condition: undefined,
        })

        const specimenFullUrl = helper.getReferenceUrl(updatedSpecimen)
        const specimenEntry = new BundleEntry({
          fullUrl: specimenFullUrl,
          resource: updatedSpecimen,
          request: {
            method: 'PUT',
            url: specimenFullUrl,
            ifMatch: `W/"${updatedSpecimen.meta.versionId}"`,
          },
        })

        bundleEntries.push(specimenEntry)
      })

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

    *saveUnsatisfactorySamples({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { data, specimenConditionKey } = payload

      const bundleEntries = []

      data.forEach(item => {
        const { specimen } = item

        const updatedSpecimen = new Specimen({
          ...specimen.toJSON(),
          status: 'unsatisfactory',
          condition:
            globalState.FHIR_CODES.SpecimenConditions[specimenConditionKey],
        })

        const specimenFullUrl = helper.getReferenceUrl(updatedSpecimen)
        const specimenEntry = new BundleEntry({
          fullUrl: specimenFullUrl,
          resource: updatedSpecimen,
          request: {
            method: 'PUT',
            url: specimenFullUrl,
            ifMatch: `W/"${updatedSpecimen.meta.versionId}"`,
          },
        })

        bundleEntries.push(specimenEntry)
      })

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
