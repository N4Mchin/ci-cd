/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import * as helper from 'utils/helper'
import * as controller from 'utils/controller'
import * as dateTime from 'utils/datetime'
import { bundle as Bundle } from 'schemas'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
const { queryPatientList, readResource } = api

export default modelExtend(pageModel, {
  namespace: 'practitioner',

  state: {
    currentItem: {},
    modalVisible: false,
    detailsVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/practitioner', location.pathname)) {
          // const payload = location.query || { page: 1, pageSize: 10 }
          // dispatch({
          //   type: 'queryDlivrGroups',
          //   payload: {},
          // })
        }

        // if (pathMatchRegexp('/practitioner/patient', location.pathname)) {
        //   dispatch({
        //     type: 'queryPatientList',
        //     payload: {},
        //   })
        // }
      })
    },
  },

  effects: {
    *init({ payload = {} }, { call, put, select }) {
      yield put({
        type: 'app/downloadValuesets',
      })

      const globalState = yield select(state => state.app)

      // globalState.FHIR_CODES

      return
    },

    *queryCheckupOrders({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)

      const requestPayload = {
        resourceType: 'Appointment',
        practitioner: globalState.Practitioner.id,
        date: `eq${dateTime.toLocalDateTime(new Date(), 'yyyy-mm-dd')}`,
        _include: ['Appointment:patient'],
      }

      const response = yield call(readResource, requestPayload)

      const dataSource = []

      if (response.success) {
        const bundle = new Bundle(response.data)
        if (bundle.entry.length === 0) {
          return dataSource
        }

        const resourceArray = helper.loadResourceArray(
          bundle.getResourcesOnly()
        )

        const resourceDictionary = controller.createResourceDictionary(
          resourceArray
        )

        resourceDictionary['Appointment'].forEach(appointment => {
          const patient = resourceDictionary['Patient'].find(patient => {
            return (
              appointment.participant &&
              appointment.participant.some(appointmentParticipant => {
                if (
                  appointmentParticipant.actor.reference.endsWith(
                    helper.getReferenceUrl(patient)
                  )
                ) {
                  return true
                }
                return false
              })
            )
          })

          const checkupType = Object.keys(globalState.FHIR_CODES.Checkup).find(
            checkupType => {
              return controller.codeIntersects(
                appointment.appointmentType,
                globalState.FHIR_CODES.Checkup[checkupType].appointmentType
              )
            }
          )

          if (!patient) {
            return
          }

          dataSource.push({
            key: appointment.id,
            patientId: patient.id,
            start: dateTime.toLocalDateTime(appointment.start, 'hh:mm'),
            end: dateTime.toLocalDateTime(appointment.end, 'hh:mm'),
            patientName: patient.getOfficialNameString({ short: true }),
            age: helper.calculateAgeFromBirthDate(patient.birthDate),
            gender: patient.gender,
            checkupType: checkupType,
            patient: patient,
            // serviceRequest: serviceRequest,
          })
        })

        console.log(dataSource)
        return dataSource

        // const sortedDataSource = helper.orderBy(dataSource, 'authoredOn', 'asc')
        // return sortedDataSource
      } else if (response.message !== CANCEL_REQUEST_MESSAGE) {
        throw response
      }
    },
  },

  reducers: {},
})
