import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
import { bundle as Bundle } from 'schemas'

const { readResource } = api

export default modelExtend(pageModel, {
  namespace: 'organization',

  effects: {
    *queryOrganization({ payload = {} }, { call, put }) {
      const response = yield call(readResource, {
        resourceType: 'Organization',
        'name:contains': payload.searchTerm && payload.searchTerm,
        _sort: 'name',
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

      const organizationList =
        resourceDictionary['Organization'] &&
        resourceDictionary['Organization'].map(organization => {
          const tableDataItem = {
            id: organization.id,
            name: organization.name,
            address: organization.address,
            organization: organization,
          }

          return tableDataItem
        })

      const result = {
        dataSource: organizationList,
        organizationListPagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: bundle.total,
        },
      }

      return result
    },
  },
  reducers: {},
})
