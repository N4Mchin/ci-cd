/* global window */
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import * as dateTime from 'utils/datetime'
import * as helper from 'utils/helper'

const {
  saveStorageDatas,
  searchStorageBarcode,
  storageList,
  searchStorageData,
} = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_storage',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/laboratory/storage') {
          // const payload = location.query || { page: 1, pageSize: 20 }

          dispatch({
            type: 'query',
            payload: {},
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put, select }) {
      const response = yield call(storageList)
      const { data } = response

      let tableData = []

      data.forEach(item => {
        item.specimen.forEach(subItem => {
          if (subItem && subItem.storage) {
            tableData.push({
              date: dateTime.toLocalDateTime(
                subItem.storage.storedAt,
                'yyyy-mm-dd'
              ),
              storedDate: subItem.storage.storedAt,
              lastName: item.patient.lastName,
              firstName: item.patient.firstName,
              registerNumber: item.patient.nationalIdentifierNumber,
              testName: subItem.test,
              barcode: subItem.barcode,

              size: subItem.storage && subItem.storage.size,
              freezer: subItem.storage && subItem.storage.freezer,
              compartment: subItem.storage && subItem.storage.compartment,
              layer: subItem.storage && subItem.storage.layer,
              col: subItem.storage && subItem.storage.col,
              row: subItem.storage && subItem.storage.row,
              location: subItem.storage && subItem.storage.location,
            })
          }
        })
      })

      const sortedTableData = helper
        .sortByDate(tableData, 'storedDate')
        .reverse()

      if (response && response.message) {
        yield put({
          type: 'updateState',
          payload: { tableData: sortedTableData },
        })
      }
    },

    *saveNewStorageDetails({ payload = {} }, { call, put, select }) {
      const response = yield call(saveStorageDatas, payload)

      console.log(response)

      if (response && response.success) {
        return response.success
      } else {
        return response.success
      }
    },

    *searchStorageDashboardClient({ payload = {} }, { call, put, select }) {
      let searchedTableData = []

      if (!!payload.id) {
        const response = yield call(searchStorageData, payload)
        const { data } = response

        data &&
          data.forEach(item => {
            item.specimen.forEach(subItem => {
              if (
                subItem.storage &&
                (item.patient.nationalIdentifierNumber.startsWith(payload.id) ||
                  subItem.barcode.startsWith(payload.id))
              ) {
                searchedTableData.push({
                  date: dateTime.toLocalDateTime(item.createdAt, 'yyyy-mm-dd'),
                  storedDate: subItem.storage.storedAt,
                  lastName: item.patient.lastName,
                  firstName: item.patient.firstName,
                  registerNumber: item.patient.nationalIdentifierNumber,
                  testName: subItem.test,
                  barcode: subItem.barcode,

                  size: subItem.storage && subItem.storage.size,
                  freezer: subItem.storage && subItem.storage.freezer,
                  compartment: subItem.storage && subItem.storage.compartment,
                  layer: subItem.storage && subItem.storage.layer,
                  col: subItem.storage && subItem.storage.col,
                  row: subItem.storage && subItem.storage.row,
                  location: subItem.storage && subItem.storage.location,
                })
              }
            })
          })

        const retSearchedTableData = helper
          .sortByDate(searchedTableData, 'storedDate')
          .reverse()

        if (response && response.success) {
          yield put({
            type: 'updateState',
            payload: {
              searchedTableData: retSearchedTableData,
            },
          })
          return retSearchedTableData
        } else {
          throw response
        }
      }
    },

    *searchBarcodePrint({ payload = {} }, { call, put, select }) {
      const response = yield call(searchStorageBarcode, payload)
      const { data } = response

      if (response && response.success) {
        return data
      } else {
        return {}
      }
    },
  },
})
