/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
import * as dateTime from 'utils/datetime'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import { bundle as Bundle, group as Group } from 'schemas'

const { readResource, batch_transaction_request } = api

export default modelExtend(pageModel, {
  namespace: 'practitioner_dlivr',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        // if (pathMatchRegexp('/practitioner/dlivr', location.pathname)) {
        // dispatch({
        //   type: 'queryDlivrGroups',
        // })
        // }
      })
    },
  },

  effects: {
    *initiateDlivrClinicalTrial({ payload = {} }, { call, select, put }) {
      const globalState = yield select(state => state.app)

      if (globalState.dlivrGroupsCreated) {
        throw new Error('Dlivr Groups are already created')
      }

      const bundleEntries = []

      /* #region  Excluded */
      const dlivrGroupExcluded = new Group({
        resourceType: 'Group',
        actual: true,
        identifier:
          globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrExcluded,
        managingEntity: globalState.Organization.getReference(),
      })

      const dlivrGroupExcludedEntry = helper.pushRequest(
        { newResource: dlivrGroupExcluded },
        'POST'
      )

      bundleEntries.push(dlivrGroupExcludedEntry)
      /* #endregion */

      /* #region  PreScreening */
      const dlivrGroupPreScreening = new Group({
        resourceType: 'Group',
        actual: true,
        identifier:
          globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrPreScreening,
        managingEntity: globalState.Organization.getReference(),
      })

      const dlivrGroupPreScreeningEntry = helper.pushRequest(
        { newResource: dlivrGroupPreScreening },
        'POST'
      )

      bundleEntries.push(dlivrGroupPreScreeningEntry)
      /* #endregion */

      /* #region  Screening */
      const dlivrGroupScreening = new Group({
        resourceType: 'Group',
        actual: true,
        identifier:
          globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening,
        managingEntity: globalState.Organization.getReference(),
      })

      const dlivrGroupScreeningEntry = helper.pushRequest(
        { newResource: dlivrGroupScreening },
        'POST'
      )

      bundleEntries.push(dlivrGroupScreeningEntry)
      /* #endregion */

      /* #region  Treatment */
      const dlivrGroupTreatment = new Group({
        resourceType: 'Group',
        actual: true,
        identifier:
          globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrTreatment,
        managingEntity: globalState.Organization.getReference(),
      })

      const dlivrGroupTreatmentEntry = helper.pushRequest(
        { newResource: dlivrGroupTreatment },
        'POST'
      )

      bundleEntries.push(dlivrGroupTreatmentEntry)
      /* #endregion */

      /* #region  PostTreatment */
      const dlivrGroupPostTreatment = new Group({
        resourceType: 'Group',
        actual: true,
        identifier:
          globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrPostTreatment,
        managingEntity: globalState.Organization.getReference(),
      })

      const dlivrGroupPostTreatmentEntry = helper.pushRequest(
        { newResource: dlivrGroupPostTreatment },
        'POST'
      )

      bundleEntries.push(dlivrGroupPostTreatmentEntry)
      /* #endregion */

      /* #region  Main */
      const dlivrGroupMain = new Group({
        resourceType: 'Group',
        actual: true,
        identifier: globalState.FHIR_CODES.Identifiers.LiverCenter.Dlivr,
        managingEntity: globalState.Organization.getReference(),
        member: [
          dlivrGroupExcludedEntry,
          dlivrGroupPreScreeningEntry,
          dlivrGroupScreeningEntry,
          dlivrGroupTreatmentEntry,
          dlivrGroupPostTreatmentEntry,
        ].map(entry => {
          return {
            entity: {
              reference: entry.fullUrl,
            },
          }
        }),
      })

      const dlivrGroupMainEntry = helper.pushRequest(
        { newResource: dlivrGroupMain },
        'POST'
      )
      bundleEntries.push(dlivrGroupMainEntry)
      /* #endregion */

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const transactionResponse = yield call(batch_transaction_request, json)

      if (transactionResponse && transactionResponse.success) {
        yield put({
          type: 'practitioner/queryDlivrGroups',
          payload: {},
        })
        return
      } else {
        throw transactionResponse
      }
    },
  },
})
