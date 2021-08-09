import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'

const { queryReference } = api

export default modelExtend(pageModel, {
  namespace: 'reference',

  state: {
    data: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('serviceRequest', pathname)
        if (match) {
          // console.log("Setup Function called succesfully!");
          // console.log(match)
          //id = match[1];
          dispatch({ type: 'query', payload: { id: match[1] } })
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call }) {
      console.log('hey')
      console.log(payload)
      console.log(queryReference)
      const data = yield call(queryReference, payload)
      console.log(data)
    },
  },
})
