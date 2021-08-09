/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {} = api

export default modelExtend(pageModel, {
  namespace: 'labTechnicianProfile',

  state: {
    labTechnician: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (
          pathMatchRegexp('/laboratory/labTechnician/:id', location.pathname)
        ) {
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
  },

  reducers: {},
})
