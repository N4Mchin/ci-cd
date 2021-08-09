/* global window */
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
import * as controller from 'utils/controller'
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import {
  address as Address,
  bundle as Bundle,
  list as List,
  observation as Observation,
  patient as Patient,
  patientcontact as PatientContact,
  servicerequest as ServiceRequest,
  reference as Reference,
  slot as Slot,
  appointment as Appointment,
} from 'schemas'

const { queryReportList, readResource, requestFilteredListLaboratory } = api

export default modelExtend(pageModel, {
  namespace: 'report',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    report: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/report', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 20 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  // yield call report list
  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(queryReportList, payload)

      //console.log(data.data)

      if (data) {
        // yield put({
        //   type: 'querySuccess',
        //   payload: {
        //     list: data.data,
        //     pagination: {
        //       current: Number(payload.page) || 1,
        //       pageSize: Number(payload.pageSize) || 20,
        //       total: data.length,
        //     },
        //   },
        // })
      }
    },

    *queryFilteredList({ payload = {} }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState

      let LabTestCode = {}

      Object.keys(LabTests).forEach(test => {
        LabTestCode[test] = {
          display: LabTests[test].display,
          code: LabTests[test].code,
        }
      })

      if (Object.keys(payload) === 0) {
        return
      }

      const response = yield call(requestFilteredListLaboratory, payload)

      if (!response || !response.success) {
        throw response
      }
      const dataSource = []
      const info = response.data

      info.entry.forEach(bundleEntry => {
        // bundleEntry should be a bundle
        const bundle = new Bundle(bundleEntry.resource)
        if (bundle.entry.length === 0) {
          return
        }

        const resourceArray = helper.loadResourceArray(
          bundle.getResourcesOnly()
        )

        const resourceDictionary = controller.createResourceDictionary(
          resourceArray
        )

        let data = {}
        // let registeredDate
        let patientName
        let specimenBarcode

        resourceDictionary['ServiceRequest'].forEach(serviceRequest => {
          const testKey = Object.keys(LabTestCode).find(testItem => {
            return controller.codeIntersects(
              LabTestCode[testItem].code,
              serviceRequest.code
            )
          })

          const diagnosticReport = resourceDictionary['DiagnosticReport'].find(
            diagnosticReport => {
              return diagnosticReport.basedOn.some(basedOnObject => {
                return basedOnObject.reference.endsWith(
                  helper.getReferenceUrl(serviceRequest)
                )
              })
            }
          )

          // registeredDate = diagnosticReport.issued
          const authoredOn = serviceRequest.authoredOn
          patientName = diagnosticReport.subject.display
          data['patientName'] = patientName
          data['authoredOn'] = authoredOn

          const specimen = resourceDictionary['Specimen'].find(specimen =>
            diagnosticReport.specimen.some(basedOnObject =>
              basedOnObject.reference.endsWith(helper.getReferenceUrl(specimen))
            )
          )
          specimenBarcode = specimen.accessionIdentifier.value
          data[testKey] = specimenBarcode
        })
        dataSource.push(data)
      })

      if (response) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: dataSource,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 20,
              total: response.data.length,
            },
          },
        })
      }
    },

    *queryPractitionerList({ payload = {} }, { call, put }) {
      const requestPayload = {
        resourceType: 'PractitionerRole',
        role: 'http://snomed.info/sct|61246008',
        'organization.name': 'Элэгний төв лаборатори',
        _include: [
          'PractitionerRole:organization',
          'PractitionerRole:practitioner',
        ],
      }

      const response = yield call(readResource, requestPayload)
      if (response && response.success) {
        const bundle = response.data

        const resourceArray = helper.loadResourceArray(
          bundle.entry.map(bundleEntry => bundleEntry.resource)
        )

        const resourceDictionary = controller.createResourceDictionary(
          resourceArray
        )

        if (resourceDictionary['Practitioner']) {
          yield put({
            type: 'updateState',
            payload: {
              practitionerList: resourceDictionary['Practitioner'],
            },
          })

          return resourceDictionary['Practitioner']
        } else {
          return []
        }
      } else {
        throw response
      }
    },
  },

  reducers: {
    // updateAgeAndBirthDate(state, { payload }) {
    //   const { age, birthDate } = payload
    //   return {
    //     ...state,
    //     age,
    //     birthDate,
    //   }
    // },
  },
})
