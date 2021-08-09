import { pathMatchRegexp } from 'utils'
import api from 'api'
import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const { queryLogIn, sendEmail, changePassword, queryPasswordRecoveryLink } = api

const emailResendPeriod = 59

export default modelExtend(pageModel, {
  namespace: 'auth',

  state: {
    id: '',
    email: '',
    emailSent: false,
    passwordChanged: false,
    timeLeft: 0,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/auth/passwordrecovery/:id', pathname)
        if (match) {
          dispatch({ type: 'queryPasswordRecovery', payload: { id: match[1] } })
        }
      })

      history.listen(({ pathname, query, ...rest }) => {
        const match = pathMatchRegexp('/auth/login', pathname)

        if (match) {
          dispatch({ type: 'updateState', payload: { userId: query.id } })
        }
      })
    },
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      const response = yield call(queryLogIn, payload)

      return response
    },

    *sendEmail({ payload }, { put, call, select }) {
      const result = yield call(sendEmail, payload)

      if (result.success) {
        yield put({
          type: 'queryEmail',
          payload: {
            email: payload.email,
            emailSent: true,
            timeLeft: emailResendPeriod,
          },
        })
        message.info('И-мэйл илгээгдлээ.')
      }
    },

    *tickTimeLeft({}, { put }) {
      yield put({ type: 'queryTickTimeLeft' })
    },

    *submitChangePassword({ payload }, { call, put }) {
      const result = yield call(changePassword, payload)
      console.log(result)
      if (result.success) {
        yield put({
          type: 'queryPasswordChanged',
          payload: {
            passwordChanged: true,
          },
        })
      }
    },

    *queryPasswordRecovery({ payload }, { call, put }) {
      console.log('payload', payload)
      const result = yield call(queryPasswordRecoveryLink, payload)
      const id = payload.id
      console.log(result)
      console.log('result')
      if (result.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            id: id,
          },
        })
      } else {
        message.info('404')
      }
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { id } = payload
      return {
        ...state,
        id,
      }
    },

    queryEmail(state, { payload }) {
      const { email, emailSent, timeLeft } = payload
      return {
        ...state,
        email,
        emailSent,
        timeLeft,
      }
    },

    queryTickTimeLeft(state) {
      const { timeLeft } = state
      return {
        ...state,
        timeLeft: timeLeft > 0 ? timeLeft - 1 : 0,
      }
    },

    queryPasswordChanged(state, { payload }) {
      const { passwordChanged } = payload
      return {
        ...state,
        passwordChanged,
      }
    },
  },
})
