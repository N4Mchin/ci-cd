/* global window */
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { element } from 'prop-types'
import { patient as Patient } from 'schemas'

const { requestFilteredList, getFile } = api

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

export default modelExtend(pageModel, {
  namespace: 'report',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    pagination: {
      DEFAULT_PAGE: 1,
      DEFAULT_PAGE_SIZE: 20,
    },
    report: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/report', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 20 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  // yield call report list
  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(requestFilteredList, payload)

      //console.log(data.data)

      // if (data) {
      //   yield put({
      //     type: 'querySuccess',
      //     payload: {
      //       list: data.data,
      //       pagination: {
      //         current: Number(payload.page) || 1,
      //         pageSize: Number(payload.pageSize) || 20,
      //         total: data.length,
      //       },
      //     },
      //   })
      // }
    },

    *downloadExcel({ payload = {} }, { call, put, select }) {
      const response = yield call(getFile, {
        endPointLink: '/serviceRequest/receptionExcelReport',
        dataSource: payload,
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

    *queryFilteredList({ payload = {} }, { select, call, put }) {
      if (Object.keys(payload) === 0) {
        return
      }

      const response = yield call(requestFilteredList, payload)
      if (!response || !response.success) {
        throw response
      }

      const dataSource = []
      response.data.results.forEach(dataItem => {
        const patient = new Patient(dataItem.patient)

        dataSource.push({
          ...dataItem,
          patient: patient,
        })
      })

      const rawData = {
        dataSource,
        sumLabTestCost: response.data.sumLabTestCost,
        sumCheckupCost: response.data.sumCheckupCost,
        sumDiagnosticTestCost: response.data.sumDiagnosticTestCost,
        sumCustomersDiscount: response.data.sumCustomersDiscount,
        sumInCash: response.data.sumInCash,
        sumByCredit: response.data.sumByCredit,
        sumInsuranceHBV: response.data.sumInsuranceHBV,
        sumInsuranceHCV: response.data.sumInsuranceHCV,
        sumTotalAmount: response.data.sumTotalAmount,
        sumTotalIncome: response.data.sumTotalIncome,
      }

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

      return rawData
    },
  },
})
