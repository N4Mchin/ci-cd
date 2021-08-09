/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import * as controller from 'utils/controller'
import { bundle as Bundle } from 'schemas'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

const {
  readResource,
  readFirstAidMaterials,
  saveMaterials,
  readExposureMaterials,
  deleteMaterials,
  readEquipmentMaterials,
  searchBarcodeEquipment,
} = api

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

export default modelExtend(pageModel, {
  namespace: 'phlebotomy',

  state: {
    currentItem: {},
    modalVisible: false,
    detailsVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    age: '',
    birthDate: '',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (
          location.pathname === '/phlebotomy' ||
          location.pathname === '/phlebotomy/'
        ) {
          const payload = location.query || { page: 1, pageSize: 20 }

          dispatch({
            type: 'queryFirstAidKit',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *refresh({ payload = {} }, { call, put, select }) {
      const { listId } = yield select(state => state.phlebotomy)

      yield put({
        type: 'query',
        payload: { listId },
      })
    },

    *query({ payload = {} }, { call, put, select }) {
      yield put({
        type: 'app/downloadValuesets',
      })
      const { FHIR_CODES } = yield select(state => state.app)

      if (!FHIR_CODES) {
        // need to wait for FHIR_CODES
        return
      }

      const labTestOrderListCoding = controller.getFirstCoding(
        FHIR_CODES.Lists.LabTestOrderList
      )

      const requestPayload = {
        resourceType: 'List',
        code: `${labTestOrderListCoding.system}|${labTestOrderListCoding.code}`,
        // 'item:ServiceRequest.category': `${FHIR_CODES.Categories.LaboratoryProcedure.coding[0].system}|${FHIR_CODES.Categories.LaboratoryProcedure.coding[0].code}`,
        _include: [
          'List:subject',
          'List:item:Specimen',
          'List:item:ServiceRequest',
        ],
        _count: payload._count,
        _page: payload._page,
        _sort: '-date',
      }

      if (!!payload.id) {
        Object.assign(requestPayload, {
          'patient.identifier': `|${payload.id}`,
        })
      }

      const response = yield call(readResource, requestPayload)

      if (response && response.success) {
        const bundle = new Bundle(response.data)

        if (bundle.entry && bundle.entry.length === 0) {
          return
        }

        const testListData = controller.generatePhlebotomyTableData(
          bundle,
          FHIR_CODES
        )

        const data = {
          dataSource: testListData,
          bundle: bundle,
          serviceRequestListDataSource: testListData,
          serviceRequestListPagination: {
            current: Number(payload._page) || DEFAULT_PAGE,
            pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
            total: bundle.total,
          },
        }

        yield put({
          type: 'updateState',
          payload: { ...data },
        })
        return testListData
      } else if (response.message !== CANCEL_REQUEST_MESSAGE) {
        throw response
      }
    },

    //////////////////////////////////sanjaa////////////////////////////
    *readFirstAidMaterials({ payload = {} }, { call, put, select }) {
      const response = yield call(readFirstAidMaterials)
      const data = response.data
      if (response && response.success) {
        console.log(response)
        yield put({
          type: 'updateState',
          payload: {
            firstAidMaterialData: data,
          },
        })
        return data
      } else if (response.message !== CANCEL_REQUEST_MESSAGE) {
        throw response
      }
    },

    *readExposureMaterials({ payload = {} }, { call, put, select }) {
      const response = yield call(readExposureMaterials)
      const data = response.data
      if (response && response.success) {
        console.log(response)
        yield put({
          type: 'updateState',
          payload: {
            exposureMaterialData: data,
          },
        })
        return data
      } else if (response.message !== CANCEL_REQUEST_MESSAGE) {
        throw response
      }
    },

    *readEquipmentMaterials({ payload = {} }, { call, put, select }) {
      const response = yield call(readEquipmentMaterials)
      const { data } = response

      if (response && response.success) {
        yield put({
          type: 'updateState',
        })
        return data.sort((a, b) => (a.sortKey > b.sortKey ? 1 : -1))
      } else if (response.message !== CANCEL_REQUEST_MESSAGE) {
        throw response
      }
    },

    *saveMaterials({ payload = {} }, { call, put, select }) {
      const response = yield call(saveMaterials, payload)
      if (response && response.success) {
        console.log(response)
        yield put({
          type: 'updateState',
          payload: {
            data: response.data,
          },
        })
      } else {
        throw response
      }
    },

    *deleteMaterials({ payload = {} }, { call, put, select }) {
      const response = yield call(deleteMaterials, payload)
      if (response && response.success) {
        console.log(response)
        yield put({
          type: 'updateState',
          payload: {
            data: response.data,
          },
        })
      } else {
        throw response
      }
    },

    ////////////////////////////////////sanjaa////////////////////

    /////////////////////////////odko////////////////////////

    *searchBarcodeEquipments({ payload = {} }, { call, put, select }) {
      console.log('searching barcode in phlebotomy')

      const response = yield call(searchBarcodeEquipment)

      yield put({
        type: 'updateState',
      })
    },

    /////////////////////////////odko////////////////////////
  },
})
