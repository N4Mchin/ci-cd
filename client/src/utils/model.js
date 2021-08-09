import modelExtend from 'dva-model-extend'

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    address: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 20,
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, address, pagination } = payload
      return {
        ...state,
        list,
        address,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
})
