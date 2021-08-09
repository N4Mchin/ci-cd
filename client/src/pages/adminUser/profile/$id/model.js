import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import { bundle as Bundle } from 'schemas'
const { batch_transaction_request } = api
/**
 * серверрүү илгээх холбоосыг client/src/services/api.js файлаас уншина
 */

const {
  passwordValidate,
  updateUser,
  queryUser,
  getStatisticsForReception,
  readStatistics,
} = api

export default modelExtend(pageModel, {
  namespace: 'admin_profile',
  showModal(state, { payload }) {
    return { ...state, modalVisible: true }
  },
  hideModal(state) {
    return { ...state, modalVisible: false }
  },

  state: {
    id: '',
    reception: {},
    stats: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/admin/:id', pathname)
        if (match) {
          dispatch({ type: 'query', payload: { id: match[1] } })
          //dispatch({ type: 'readPatient', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const result = yield call(queryUser, payload)

      if (result.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            id: payload.id,
            reception: result.data,
          },
        })
      } else {
        throw result
      }
    },

    *getStats({ payload = {} }, { call, put }) {
      const result = yield call(getStatisticsForReception, payload)

      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return result.data
    },

    *oldPassword({ payload }, { call }) {
      const result = yield call(passwordValidate, payload)
      if (result.success) {
        // console.log(result)
      }
      return result.success
    },

    *update({ payload }, { select, call, put }) {
      payload.id = yield select(state => state.receptionProfile.id)
      const result = yield call(updateUser, payload)
      if (result.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalVisible: true,
          },
        })
      } else {
        throw result
      }
    },

    *queryLabTests({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)

      const diagnosticReportIdentifier = `${FHIR_CODES.Identifiers.DiagnosticReport.system}|`

      const mainRequest = [
        {
          request: {
            method: 'GET',
            url:
              `Patient?identifier=${FHIR_CODES.Identifiers.LiverCenter.PatientIdentifier.system}|` +
              `&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url:
              `Patient?identifier=${FHIR_CODES.Identifiers.LiverCenter.PatientIdentifier.system}|` +
              `&_lastUpdated=gt2020-10-01` +
              `&_summary=count`,
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
