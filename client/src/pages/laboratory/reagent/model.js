/* global window */
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import { element } from 'prop-types'
import * as dateTime from 'utils/datetime'
const { saveReagent, readReagent, queryReagentTotal } = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_reagent',

  subscriptions: {},

  effects: {
    *saveReagent({ payload }, { call, put, select }) {
      const result = yield call(saveReagent, {
        testName: payload.testName,
        ...payload,
      })
      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
    },
    *readReagent({ payload }, { call, put }) {
      const result = yield call(readReagent, {
        testName: payload.testName,
      })
      const dataSource = []
      result.data.map(element => {
        const { values } = element
        const row = {
          registeredDate: element._createdAt,
          reagentBarcode: values.reagentBarcode,
          reagentLotNumber: values.reagentLotNumber,
          reagentType: values.reagentType,
          reagentExpirationDate: dateTime.toLocalDateTime(
            values.reagentExpirationDate,
            'yyyy-mm-dd'
          ),
          quantity: values.quantity,
        }
        dataSource.push(row)
      })

      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return dataSource
    },
    *queryReagentTotal({ payload }, { call, put }) {
      const result = yield call(queryReagentTotal)
      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return result.data.results
    },
  },
})
