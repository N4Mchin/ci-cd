/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import * as helper from 'utils/helper'
import * as dateTime from 'utils/datetime'
import { codeIntersects } from 'utils/controller'
import {
  bundle as Bundle,
  bundleentry as BundleEntry,
  condition as Condition,
  list as List,
  observation as Observation,
  patient as Patient,
} from 'schemas'

const { queryPatientInformationList, queryValuesets } = api

const DEFAULT_CITIZENSHIP = {
  extension: [
    {
      url: 'code',
      valueCodeableConcept: {
        coding: [
          {
            system: 'urn:iso:std:iso:3166',
            code: 'MNG',
            display: 'Mongolia',
          },
        ],
      },
    },
  ],
  url: 'http://hl7.org/fhir/StructureDefinition/patient-citizenship',
}

export default modelExtend(pageModel, {
  namespace: 'reception',

  state: {
    currentItem: {},
    modalVisible: false,
    detailsVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    valueset: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if ('/reception' === location.pathname) {
          dispatch({ type: 'downloadValuesets' })
        }
      })
    },
  },

  effects: {
    *refresh({ payload }, { put }) {
      yield put({
        type: 'app/queryPatientList',
      })
    },

    *fetchValuesets({ payload }, { call }) {
      const valuesetList = [...payload.valuesets]

      const response = yield call(queryValuesets, {
        valuesetList: valuesetList,
      })

      if (response && response.success) {
        const valuesets = response.data
        return valuesets
      } else {
        throw response
      }
    },

    *downloadValuesets({ payload }, { call, put, select }) {
      const Valuesets = yield select(state => state.reception.Valuesets)

      if (
        !!Valuesets &&
        (!helper.isObject(Valuesets) || !helper.isEmptyObject(Valuesets))
      ) {
        return
      }

      const valuesetList = [
        'accommodation-values',
        'address-values-mn',
        'administrative-gender',
        'blood-type-values',
        'employment-status-values',
        'country-values-mn',
        'dietary-finding-values',
        'marital-status',
        'occupation-values',
        'patient-contact-relationship',
        'race-values',
        'rhesus-factor-values',
      ]

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

    *createPatientInformationList({ payload }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState
      const { formValues, birthDate, gender } = payload

      const tempPatientId = helper.generateFullUrl()
      const tempBodyHeightId = helper.generateFullUrl()
      const tempBodyWeightId = helper.generateFullUrl()
      const tempBodyMassIndexId = helper.generateFullUrl()
      const tempBloodGroupId = helper.generateFullUrl()
      const tempRhStatusId = helper.generateFullUrl()
      const tempVitalsPanelId = helper.generateFullUrl()
      const tempBloodGroupPanelId = helper.generateFullUrl()
      const tempPatientInformationId = helper.generateFullUrl()

      const effectiveDateTime = dateTime.getInstant()
      const subject = {
        reference: tempPatientId,
      }
      const transactionEntries = []

      const extension = [
        formValues.other &&
          formValues.other.ethnicity &&
          formValues.other.ethnicity,
        formValues.additional && formValues.additional.citizenship
          ? formValues.additional.citizenship
          : DEFAULT_CITIZENSHIP,
      ].filter(val => !!val && !helper.isEmptyObject(val))

      const identifier = [
        formValues.other &&
          formValues.other.taxIdNumber &&
          formValues.other.taxIdNumber,
        formValues.other &&
          formValues.other.healthInsuranceNumber &&
          formValues.other.healthInsuranceNumber,
      ].filter(val => !!val && !helper.isEmptyObject(val))

      const patientObject = {
        active: true,
        birthDate: birthDate && birthDate.length > 3 ? birthDate : undefined,
        gender:
          formValues.additional && formValues.additional.gender
            ? formValues.additional.gender
            : !!gender
            ? gender
            : undefined,
        maritalStatus: formValues.maritalStatus
          ? formValues.maritalStatus
          : undefined,
        identifier: identifier.length > 0 ? identifier : undefined,
        address: formValues.address
          ? [
              formValues.address.homeAddress && formValues.address.homeAddress,
              formValues.address.workAddress && formValues.address.workAddress,
            ].filter(val => !!val)
          : undefined,
        contact: formValues.contact.patientContact
          ? formValues.contact.patientContact
          : undefined,
        extension: extension.length > 0 ? extension : undefined,
      }

      const patient = new Patient(patientObject)

      patient._setFamilyName(formValues.required.familyName)
      patient._setGivenName(formValues.required.givenName)
      patient._setNationalIdentificationNumber(
        formValues.required.nationalIdentifier
      )
      patient._addMobilePhone(formValues.required.phoneNumber, 1)

      if (!!formValues.contact.email) {
        patient._addEmail(formValues.contact.email, 1)
      }

      if (!!formValues.additional && !!formValues.additional.clanName) {
        patient._setClanName(formValues.additional.clanName)
      }

      // if (formValues.required.foreignIdentifier) {
      // patient._setForeignIdentificationNumber(
      // formValues.required.nationalIdentifier
      // )
      // }

      transactionEntries.push(
        new BundleEntry({
          fullUrl: tempPatientId,
          resource: patient,
          request: {
            method: 'POST',
            url: 'Patient',
          },
        })
      )

      /* #region  PatientInformation (SocialHistory) */
      const PatientInformationComponent = [
        formValues.additional && formValues.additional.houseHoldSize,
        formValues.workEnvironment && formValues.workEnvironment,
        formValues.employmentStatus && formValues.employmentStatus,
        formValues.other &&
          formValues.other.salaryComponent &&
          formValues.other.salaryComponent,
        formValues.other &&
          formValues.other.occupation &&
          formValues.other.occupation,
        formValues.education && formValues.education,
        formValues.accommodation && formValues.accommodation,
        formValues.dietFinding && formValues.dietFinding,
        formValues.vitalSign &&
          formValues.vitalSign.generalHealthComponent &&
          formValues.vitalSign.generalHealthComponent,
      ]

      const patientInformationObservation = new Observation({
        status: 'final',
        category: [FHIR_CODES.Categories.SocialHistory],
        code: FHIR_CODES.Observations.PatientInformation.code,
        component: PatientInformationComponent.filter(
          value => value !== undefined
        ),
      })

      patientInformationObservation &&
        transactionEntries.push(
          new BundleEntry({
            fullUrl: tempPatientInformationId,
            resource: patientInformationObservation,
            request: {
              method: 'POST',
              url: 'Observation',
            },
          })
        )

      /* #endregion */

      /* #region  VitalsPanel */
      const observationBodyHeight =
        formValues.vitalSign &&
        formValues.vitalSign.heightValueQuantity &&
        !helper.isEmptyObject(formValues.vitalSign.heightValueQuantity) &&
        new Observation({
          meta: {
            profile: [FHIR_CODES.Profiles.VitalSigns.url],
          },
          status: 'final',
          category: [FHIR_CODES.Categories.VitalSigns],
          code: FHIR_CODES.Observations.BodyHeight.code,
          subject: subject,
          effectiveDateTime: effectiveDateTime,
          valueQuantity: formValues.vitalSign.heightValueQuantity,
        })

      const observationBodyWeight =
        formValues.vitalSign &&
        formValues.vitalSign.weightValueQuantity &&
        !helper.isEmptyObject(formValues.vitalSign.weightValueQuantity) &&
        new Observation({
          meta: {
            profile: [FHIR_CODES.Profiles.VitalSigns.url],
          },
          status: 'final',
          category: [FHIR_CODES.Categories.VitalSigns],
          code: FHIR_CODES.Observations.BodyWeight.code,
          subject: subject,
          effectiveDateTime: effectiveDateTime,
          valueQuantity: formValues.vitalSign.weightValueQuantity,
        })

      const observationBodyMassIndex =
        formValues.vitalSign &&
        formValues.vitalSign.bodyMassIndexValueQuantity &&
        new Observation({
          meta: {
            profile: [FHIR_CODES.Profiles.VitalSigns.url],
          },
          status: 'final',
          category: [FHIR_CODES.Categories.VitalSigns],
          code: FHIR_CODES.Observations.BodyMassIndex.code,
          subject: subject,
          effectiveDateTime: effectiveDateTime,
          valueQuantity: formValues.vitalSign.bodyMassIndexValueQuantity,
          derivedFrom: [
            {
              reference: tempBodyHeightId,
              display: 'Body Height',
            },
            {
              reference: tempBodyWeightId,
              display: 'Body Weight',
            },
          ],
        })

      const observationVitalsPanel = new Observation({
        meta: {
          profile: [FHIR_CODES.Profiles.VitalSigns.url],
        },
        status: 'final',
        category: [FHIR_CODES.Categories.VitalSigns],
        code: FHIR_CODES.Observations.VitalSigns.code,
        subject: subject,
        effectiveDateTime: effectiveDateTime,
        hasMember: [
          {
            reference: tempBodyHeightId,
            display: 'Body Height',
          },
          {
            reference: tempBodyWeightId,
            display: 'Body Weight',
          },
          {
            reference: tempBodyMassIndexId,
            display: 'Blood Mass Index',
          },
        ],
      })

      if (observationBodyHeight || observationBodyWeight) {
        const VitalsPanelEntries = [
          observationBodyHeight &&
            new BundleEntry({
              fullUrl: tempBodyHeightId,
              resource: observationBodyHeight,
              request: {
                method: 'POST',
                url: 'Observation',
              },
            }),
          observationBodyWeight &&
            new BundleEntry({
              fullUrl: tempBodyWeightId,
              resource: observationBodyWeight,
              request: {
                method: 'POST',
                url: 'Observation',
              },
            }),
          observationBodyMassIndex &&
            new BundleEntry({
              fullUrl: tempBodyMassIndexId,
              resource: observationBodyMassIndex,
              request: {
                method: 'POST',
                url: 'Observation',
              },
            }),
          observationVitalsPanel &&
            new BundleEntry({
              fullUrl: tempVitalsPanelId,
              resource: observationVitalsPanel,
              request: {
                method: 'POST',
                url: 'Observation',
              },
            }),
        ].filter(val => !!val)

        transactionEntries.push(...VitalsPanelEntries)
      }

      /* #endregion */

      /* #region  BloodGroupPanel */

      const observationBloodGroup =
        formValues.bloodType &&
        formValues.bloodType.bloodGroupValueCodeableConcept &&
        new Observation({
          status: 'final',
          category: [FHIR_CODES.Categories.Laboratory],
          code: FHIR_CODES.Observations.BloodGroup.code,
          subject: subject,
          effectiveDateTime: effectiveDateTime,
          valueCodeableConcept:
            formValues.bloodType.bloodGroupValueCodeableConcept,
        })

      const observationRhStatus =
        formValues.bloodType &&
        formValues.bloodType.rhesusStatusValueCodeableConcept &&
        new Observation({
          status: 'final',
          category: [FHIR_CODES.Categories.Laboratory],
          code: FHIR_CODES.Observations.RhStatus.code,
          subject: subject,
          effectiveDateTime: effectiveDateTime,
          valueCodeableConcept:
            formValues.bloodType.rhesusStatusValueCodeableConcept,
        })

      if (observationBloodGroup) {
        transactionEntries.push(
          new BundleEntry({
            fullUrl: tempBloodGroupId,
            resource: observationBloodGroup,
            request: {
              method: 'POST',
              url: 'Observation',
            },
          })
        )
      }

      if (observationRhStatus) {
        transactionEntries.push(
          new BundleEntry({
            fullUrl: tempRhStatusId,
            resource: observationRhStatus,
            request: {
              method: 'POST',
              url: 'Observation',
            },
          })
        )
      }

      if (observationBloodGroup || observationRhStatus) {
        const members = [
          observationBloodGroup && {
            reference: tempBloodGroupId,
          },
          observationRhStatus && {
            reference: tempRhStatusId,
          },
        ].filter(val => !!val)

        if (members.length > 0) {
          const observationBloodGroupPanel = new Observation({
            status: 'final',
            category: [FHIR_CODES.Categories.Laboratory],
            code: FHIR_CODES.Observations.BloodGroupPanel.code,
            subject: subject,
            effectiveDateTime: effectiveDateTime,
            hasMember: members,
          })

          observationBloodGroupPanel &&
            transactionEntries.push(
              new BundleEntry({
                fullUrl: tempBloodGroupPanelId,
                resource: observationBloodGroupPanel,
                request: {
                  method: 'POST',
                  url: 'Observation',
                },
              })
            )
        }
      }
      /* #endregion */

      /* #region  Conditions */
      const conditionList = []

      if (formValues.vitalSign && formValues.vitalSign.mentalDisorder) {
        conditionList.push(formValues.vitalSign.mentalDisorder)
      }

      if (formValues.disability) {
        conditionList.push(...Object.values(formValues.disability))
      }

      const conditionEntries = conditionList.map(item => {
        const condition = new Condition({
          clinicalStatus: FHIR_CODES.ConditionStatuses.ClinicalStatusActive,
          verificationStatus:
            FHIR_CODES.ConditionStatuses.VerificationStatusUnconfirmed,
          category: [FHIR_CODES.Categories.ProblemListItem],
          subject: subject,
          code: item,
        })

        const conditionBundleEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: condition,
          request: {
            method: 'POST',
            url: 'Condition',
          },
        })

        return conditionBundleEntry
      })

      if (conditionEntries.length > 0) {
        const problemList = new List({
          title: 'Problem List',
          code: FHIR_CODES.Lists.ProblemList,
          status: 'current',
          mode: 'working',
          subject: subject,
          date: dateTime.getInstant(),
          source: globalState.Practitioner.getReference(),
          entry: conditionEntries.map(entry => {
            return {
              item: {
                reference: entry.fullUrl,
              },
            }
          }),
        })

        const problemListEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: problemList,
          request: {
            method: 'POST',
            url: 'List',
          },
        })

        transactionEntries.push(...conditionEntries, problemListEntry)
      }

      /* #endregion */

      const patientInformationObject = {
        code: FHIR_CODES.Lists.PatientInformationList,
        status: 'current',
        mode: 'working',
        subject: subject,
        date: dateTime.getInstant(),
        source: globalState.Practitioner.getReference(),
        entry: [],
      }

      transactionEntries.forEach(entry => {
        const { resource = {} } = entry
        if (resource.resourceType === 'Observation' && resource.code) {
          // excluding patient resource
          if (
            [
              FHIR_CODES.Observations.BloodGroupPanel,
              FHIR_CODES.Observations.VitalSigns,
              FHIR_CODES.Observations.PatientInformation,
            ].some(ob => ob.code && codeIntersects(resource.code, ob.code))
          ) {
            const item = {
              item: {
                reference: entry.fullUrl,
              },
            }

            patientInformationObject.entry.push(item)
          }
        } else if (resource.resourceType === 'List' && resource.code) {
          if (codeIntersects(resource.code, FHIR_CODES.Lists.ProblemList)) {
            const item = {
              item: {
                reference: entry.fullUrl,
              },
            }

            patientInformationObject.entry.push(item)
          }
        }

        return null
      })

      const patientInformationList = new List(patientInformationObject)
      const patientInformationListEntry = new BundleEntry({
        fullUrl: helper.generateFullUrl(),
        resource: patientInformationList,
        request: {
          method: 'POST',
          url: 'List',
        },
      })

      const transaction = new Bundle({
        type: 'transaction',
        entry: [...transactionEntries, patientInformationListEntry],
      })

      const json = transaction.toJSON()
      const response = yield call(queryPatientInformationList, json)

      if (response.success && response.success) {
        const newPatient = new Patient(response.data.patient)

        yield put({
          type: 'refresh',
        })

        return {
          name: newPatient.getOfficialNameString({ short: true }),
          id: newPatient.id,
          idid: response.data.patient,
        }
      } else {
        throw response
      }
    },
  },

  reducers: {},
})
