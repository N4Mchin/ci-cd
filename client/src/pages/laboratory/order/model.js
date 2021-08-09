/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
const { queryAddMaterialOrder } = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_order',

  state: {
    list: [],
    pagination: {},
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/laboratory/order', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 20 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {},

    *queryAddMaterialOrder({ payload = {} }, { call, put }) {
      console.log(payload)

      const result = yield call(queryAddMaterialOrder, payload)

      if (result.success) {
        // let list = result.data.entry.map(v => v.resource)
        console.log(result)
      }
    },
  },
})
