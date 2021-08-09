import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'

const {
  queryPractitioner,
  queryPractitionerList,
  queryMember,
  createMemberPtype,
  queryPaymenttypeList,
  removeMemberPtype,
} = api

export default modelExtend(pageModel, {
  namespace: 'practitionerDetail',

  state: {
    id: '',
    modalType: 'create',
    modalVisible: false,
    data: {},
    ptype: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/practitioner/:id', pathname)
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
    *query({ payload }, { call, put }) {
      const data = yield call(queryPractitioner, payload)

      // console.log("I got my Data", data)
      const { success, message, status, ...other } = data

      if (success) {
        const dataPTypes = yield call(queryPaymenttypeList, payload)
        // console.log('dataPTypes', dataPTypes);

        yield put({
          type: 'querySuccess',
          payload: {
            data: other,
            ptype: dataPTypes.data,
          },
        })
      } else {
        throw data
      }
    },

    *create({ payload }, { select, call, put }) {
      //  const id = yield select(({ detail }) => detail)
      //console.log(select);
      console.log('member det..............', createMemberPtype, payload)
      const data = yield call(createMemberPtype, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *delete({ payload }, { call, put, select }) {
      console.log('DELETE', payload)
      const data = yield call(removeMemberPtype, { id: payload })
      // const { selectedRowKeys } = yield select(_ => _.member)
      // if (data.success) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
      //     },
      //   })
      // } else {
      //   throw data
      // }
    },
  },

  reducers: {
    showModal3(state, { payload }) {
      return { ...state, modalVisible: true }
    },
    hideModal(state) {
      return { ...state, modalVisible: false }
    },

    querySuccess(state, { payload }) {
      const { data, ptype } = payload
      return {
        ...state,
        data,
        ptype,
      }
    },
  },
})
