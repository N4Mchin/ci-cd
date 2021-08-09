/* global window */
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'

import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import * as helper from 'utils/helper'

const {
  getExternalSpecimenLog,
  putExternalSpecimenLog,
  queryValuesets,
  getFile,
} = api

export default modelExtend(pageModel, {
  namespace: 'reception_externalSamples',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if ('/reception/externalSamples' === location.pathname) {
          dispatch({ type: 'downloadValuesets' })
        }
      })
    },
  },

  effects: {
    *querySpecimens({ payload = {} }, { call, put, select }) {
      const response = yield call(getExternalSpecimenLog, {
        searchValue: payload.searchValue,
        organizationStates: payload.organizationStates,
        _count: payload._count,
        _page: payload._page,
        startDate: payload.startDate,
        endDate: payload.endDate,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Read specimen list failed')
        } else {
          return {}
        }
      }

      return {
        response,
        pagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: response.total,
        },
      }
    },

    *saveExternalSample({ payload = {} }, { call, put, select }) {
      const response = yield call(putExternalSpecimenLog, {
        dataSource: payload.dataSource,
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

    *downloadValuesets({ payload }, { call, put, select }) {
      const Valuesets = yield select(
        state => state.reception_externalSamples.Valuesets
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
          } catch (err) {
            console.log(err)
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

    *downloadExcel({ payload = {} }, { call, put, select }) {
      const response = yield call(getFile, {
        endPointLink: '/externalSpecimenLog/excel',
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
  },
})
