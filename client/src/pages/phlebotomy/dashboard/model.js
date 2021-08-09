import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import api from 'api'
import { bundle as Bundle } from 'schemas'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
/**
 * серверрүү илгээх холбоосыг client/src/services/api.js файлаас уншина
 */

const {
  updateUser,
  queryUser,
  getStatisticsForPhlebotomy,
  batch_transaction_request,
} = api

export default modelExtend(pageModel, {
  namespace: 'phlebotomy_dashboard',
  showModal(state, { payload }) {
    return { ...state, modalVisible: true }
  },
  hideModal(state) {
    return { ...state, modalVisible: false }
  },

  state: {
    reception: {},
    monthlyData: [
      { name: 'Даваа', uv: 40, pv: 24, amt: 24 },
      { name: 'Мягмар', uv: 30, pv: 13, amt: 22 },
      { name: 'Лхагва', uv: 20, pv: 98, amt: 42 },
      { name: 'Пүрэв', uv: 37, pv: 39, amt: 20 },
      { name: 'Баасан', uv: 18, pv: 48, amt: 21 },
      { name: 'Бямба', uv: 23, pv: 28, amt: 25 },
    ],
    dailyData: [
      { name: '08:30', uv: 98, pv: 63, amt: 24 },
      { name: '09:30', uv: 57, pv: 38, amt: 12 },
      { name: '10:30', uv: 60, pv: 42, amt: 12 },
      { name: '11:30', uv: 98, pv: 85, amt: 20 },
      { name: '12:30', uv: 60, pv: 45, amt: 10 },
      { name: '13:30', uv: 52, pv: 37, amt: 17 },
      { name: '14:30', uv: 68, pv: 52, amt: 35 },
      { name: '15:30', uv: 67, pv: 45, amt: 22 },
      { name: '16:30', uv: 67, pv: 41, amt: 10 },
      { name: '17:30', uv: 77, pv: 48, amt: 20 },
    ],
    stats: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/phlebotomy/dashboard', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *getStats({ payload = {} }, { call, put }) {
      console.log('paylooooooad', payload)
      const result = yield call(getStatisticsForPhlebotomy, payload)
      console.log(result)
      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return result.data
    },

    *queryLabTests({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const diagnosticReportIdentifier = `${FHIR_CODES.Identifiers.DiagnosticReport.system}|`

      const mainRequest = [
        {
          request: {
            method: 'GET',
            url: `Patient?identifier=${FHIR_CODES.Identifiers.LiverCenter.PatientIdentifier.system}|&_summary=count`,
          },
        },
        // {
        //   request: {
        //     method: 'GET',
        //     url: `ServiceRequest?category=${LaboratoryProcedure}&_summary=count`,
        //   },
        // },
      ]

      const requestBundle = new Bundle({
        type: 'batch',
        entry: mainRequest,
      })

      const requestBundleJson = requestBundle.toJSON()

      const response = yield call(batch_transaction_request, requestBundleJson)
      console.log('QRY LAB TESTS', response)
      if (response && response.success) {
        const bundle = new Bundle(response.data)

        const totalClients = bundle.entry

        const [total, totalDiagnosticReport] = totalClients

        const newObject = {
          totalRegisteredCustomers: total.resource.total,
          //  totalDiagnosticReport: totalDiagnosticReport.resource.total,
        }

        return newObject
      } else if (response.message !== CANCEL_REQUEST_MESSAGE) {
        throw response
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { reception, id } = payload
      return {
        ...state,
        reception,
        id,
      }
    },

    updateStats(state, { payload }) {
      const { stats } = payload
      return {
        ...state,
        stats,
      }
    },
  },
})
