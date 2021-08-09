import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
import { bundle as Bundle } from 'schemas'

const { readResource, updateResource, queryValuesets } = api

export default modelExtend(pageModel, {
  namespace: 'organization_profile',

  state: {
    Organization: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/organization/:id', pathname)
        if (match) {
          dispatch({
            type: 'queryOrganizationById',
            payload: { id: match[1] },
          })
          dispatch({ type: 'downloadValuesets' })
        }
      })
    },
  },

  effects: {
    *queryOrganizationById({ payload = {} }, { call, put }) {
      if (!payload.id) {
        throw new Error('No id provided')
      }

      const response = yield call(readResource, {
        resourceType: 'Organization',
        _id: payload.id,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle.entry || bundle.entry.length === 0) {
        return {}
      }

      const resourceArray = helper.loadResourceArray(
        bundle.entry.map(e => e.resource)
      )

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const Organization =
        resourceDictionary['Organization'] &&
        resourceDictionary['Organization'][0]

      yield put({
        type: 'updateState',
        payload: {
          Organization: Organization,
        },
      })
    },

    *saveOrganization({ payload = {} }, { call, put }) {
      const response = yield call(updateResource, {
        ...payload.organization,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      return response
    },

    *downloadValuesets({ payload }, { call, put, select }) {
      const Valuesets = yield select(
        state => state.organization_profile.Valuesets
      )

      if (
        !!Valuesets &&
        (!helper.isObject(Valuesets) || !helper.isEmptyObject(Valuesets))
      ) {
        return
      }

      const valuesetList = ['address-values-mn']

      const response = yield call(queryValuesets, {
        valuesetList: valuesetList,
      })

      if (response && response.success) {
        const valuesets = response.data
        const newValuesets = {}
        valuesets.forEach(valueset => {
          try {
            valueset &&
              Object.assign(newValuesets, {
                [valueset.id]: valueset,
              })
          } catch (errorInfo) {
            console.error(errorInfo)
          }
        })

        yield put({
          type: 'updateState',
          payload: {
            valuesets: valuesets,
            Valuesets: newValuesets,
          },
        })

        return
      } else {
        throw response
      }
    },
  },
  reducers: {},
})
