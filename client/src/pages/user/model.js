import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'

const { getUserList, getUserInfoById, postUserData } = api

export default modelExtend(pageModel, {
  namespace: 'user',

  effects: {
    *queryUsers({ payload = {} }, { call, put }) {
      const response = yield call(getUserList, {
        _count: payload._count,
        _page: payload._page,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      return {
        dataSource: response.data,
        userListPagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: response.total,
        },
      }
    },

    *queryUserById({ payload = {} }, { call, put }) {
      if (!payload.id) {
        throw new Error('No id provided')
      }

      const response = yield call(getUserInfoById, payload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      return response.data
    },

    *saveUserData({ payload = {} }, { call, put }) {
      const response = yield call(postUserData, payload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      return response
    },
  },
  reducers: {},
})
