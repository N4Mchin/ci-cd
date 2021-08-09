/* global window */
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import * as controller from 'utils/controller'
import * as helper from 'utils/helper'

import * as dateTime from 'utils/datetime'

const { requestFilteredListPhlebotomy, getFile } = api

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

export default modelExtend(pageModel, {
  namespace: 'report',
  state: {
    currentItem: {},
    selectedRowKeys: [],
    report: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/report', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 20 }
          // dispatch({
          //   type: 'query',
          //   payload,
          // })
        }
      })
    },
  },

  // yield call report list
  effects: {
    *queryFilteredList({ payload = {} }, { select, call, put }) {
      const dataSource = []
      if (Object.keys(payload) === 0) {
        return dataSource
      }

      const response = yield call(requestFilteredListPhlebotomy, payload)

      if (!response || !response.success) {
        throw response
      }
      response.data.results.forEach(dataItem => {
        const columns = {
          collectedDate: dateTime.toLocalDateTime(
            dataItem.collectedDate,
            'yyyy-mm-dd, hh:mm:ss'
          ),
          patientName: dataItem.patientName,
          BiochemistryTests:
            dataItem.BiochemistryTests && dataItem.BiochemistryTests,
          ImmunologyTests: dataItem.ImmunologyTests && dataItem.ImmunologyTests,
          RapidTests: dataItem.RapidTests && dataItem.RapidTests,
          Hematology: dataItem.Hematology && dataItem.Hematology,
          Vitamin_D3: dataItem.Vitamin_D3 && dataItem.Vitamin_D3,
          Anti_HDV: dataItem.Anti_HDV && dataItem.Anti_HDV,
          HCV_RNA: dataItem.HCV_RNA && dataItem.HCV_RNA,
          HBV_DNA: dataItem.HBV_DNA && dataItem.HBV_DNA,
          HDV_RNA: dataItem.HDV_RNA && dataItem.HDV_RNA,
          Coagulation: dataItem.Coagulation && dataItem.Coagulation,
          Ferritin: dataItem.Ferritin && dataItem.Ferritin,
        }
        dataSource.push(columns)
      })
      yield put({
        type: 'updateState',
        payload: {
          list: dataSource,
          pagination: {
            current: Number(response.data._page) || DEFAULT_PAGE,
            pageSize: Number(response.data._count) || DEFAULT_PAGE_SIZE,
            total: response.data.total,
          },
        },
      })

      return dataSource
    },
    *downloadExcel({ payload = {} }, { call, put, select }) {
      const response = yield call(getFile, {
        endPointLink: '/serviceRequest/excel',
        dataSource: payload,
      })
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      console.log(response)
      return response
    },
  },

  reducers: {
    // updateAgeAndBirthDate(state, { payload }) {
    //   const { age, birthDate } = payload
    //   return {
    //     ...state,
    //     age,
    //     birthDate,
    //   }
    // },
  },
})
