// /* global window */
// import modelExtend from 'dva-model-extend'
// import { pathMatchRegexp } from 'utils'
// import { pageModel } from 'utils/model'
// import api from 'api'

// const { readTotalEquipment } = api
// export default modelExtend(pageModel, {
//   namespace: 'phlebotomy_tool',

//   state: {},

//   subscriptions: {
//     setup({ dispatch, history }) {
//       history.listen(location => {
//         if (location.pathname === '/phlebotomy/tool') {
//           dispatch({
//             type: 'query',
//           })
//         }
//       })
//     },
//   },

//   effects: {
//     *refresh({ payload = {} }, { call, put, select }) {
//       const { listId } = yield select(state => state.phlebotomy_tool)

//       yield put({
//         type: 'query',
//         payload: {
//           listId,
//         },
//       })
//     },

//     *refresh({ payload }, { put, select }) {
//       yield put({
//         type: 'phlebotomy_tool',
//       })
//     },

//     *query({ payload = {} }, { call, put, select }) {
//       const response = yield call(readTotalEquipment)
//       if (response && response.success) {
//         console.log(response)
//         yield put({
//           type: 'updateState',
//           payload: {
//             data: response.data,
//           },
//         })
//         return response.data
//       } else {
//         throw response
//       }
//     },
//   },
// })
