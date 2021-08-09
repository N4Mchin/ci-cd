import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import { pageModel } from 'utils/model'
/* #region  Schemes */
import {
  list as List,
  group as Group,
  dosage as Dosage,
  timing as Timing,
  bundle as Bundle,
  patient as Patient,
  condition as Condition,
  procedure as Procedure,
  encounter as Encounter,
  extension as Extension,
  composition as Composition,
  bundleentry as BundleEntry,
  observation as Observation,
  immunization as Immunization,
  medicationrequest as MedicationRequest,
  allergyintolerance as AllergyIntolerance,
  familymemberhistory as FamilyMemberHistory,
  medicationstatement as MedicationStatement,
  questionnaireresponse as QuestionnaireResponse,
} from 'schemas'
/* #endregion */

import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'

/* #region  Helper */
import {
  isArray,
  isObject,
  pushRequest,
  generateUuid,
  isEmptyObject,
  findByReference,
  getReference,
  getReferenceUrl,
  loadResourceArray,
  getDisplayOfCodeAbleConcept,
  sortByDate,
} from 'utils/helper'
/* #endregion */

/* #region  DateTime */
import {
  getInstant,
  toLocalDateTime,
  calculateDateFromSpentDate,
} from 'utils/datetime'
/* #endregion */

/* #region  Controller */
import {
  codeIntersects,
  containsReference,
  createResourceDictionary,
  recursiveTestDataBuilder,
  generateBriefGeneralExamination,
  generateGeneralPhysicalFindingExamination,
} from 'utils/controller'
/* #endregion */

const {
  batch_transaction_request,
  queryExternalAPI,
  createResource,
  readResource,
  queryValuesets,
  queryPrescription,
  uploadFiles,
  getUploadedFilesInfo,
  downloadUploadedFile,
  getEprescriptionToken,
} = api

/* #region  designation constants */
const COMPLAINT_DESIGNATION = [
  {
    language: 'en',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Complaint',
  },
  {
    language: 'mn',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Зовуурь',
  },
]

const DIAGNOSIS_DESIGNATION = [
  {
    language: 'en',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Diagnosis',
  },
  {
    language: 'mn',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Онош',
  },
]

const CONDITOIN_EXTENSION_DESIGNATION = [
  {
    language: 'en',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Condition due to extension',
  },
  {
    language: 'mn',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Өвчний эхлэлийн шалтгаан',
  },
]

const NOTE_DESIGNATION = [
  {
    language: 'en',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Additional information',
  },
  {
    language: 'mn',
    use: {
      system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
      code: 'display',
    },
    value: 'Нэмэлт мэдээлэл',
  },
]
/* #endregion */

export default modelExtend(pageModel, {
  namespace: 'practitioner_patient_profile',

  /* #region  Practitioner patient states */
  state: {
    patient: {},
    immunizationStatus: [],
    lastUpdatedComplaint: '',
    lastUpdatedHistoryOfPresentIllness: '',
    lastUpdatedDiagnosis: '',
    lastUpdatedMedicationRequest: '',
    lastUpdatedEprecription: '',
    lastUpdatedExamination: '',
    lastUpdatedAnamnesisVitae: '',
    modalMessageVisible: false,
    anamnesisVitaeSections: {},
    briefGeneralExaminationSections: {},
    physicalExaminationSections: {},
  },
  /* #endregion */

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathMatchRegexp('/practitioner/patient/:id', pathname)
        if (match) {
          dispatch({ type: 'init', payload: { id: match[1] } }).then(() => {
            dispatch({ type: 'query', payload: { id: match[1] } })
            dispatch({ type: 'queryDlivrInfo', payload: { id: match[1] } })
          })
        }
      })
    },
  },

  effects: {
    /* #region  query and init */
    *init({ payload = {} }, { call, put, select }) {
      console.log('practitioner_patient_profile_init')
      yield put({
        type: 'updateState',
        payload: {
          patientId: payload.id,
          dlivrStatus: undefined,
        },
      })

      const valuesetList = ['country-values-mn', 'address-values-mn']

      const response = yield call(queryValuesets, {
        valuesetList: valuesetList,
      })
      if (!response.success) {
        //success bish ued orno
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          //aldaatai ued end duusna
          throw response
        } else {
          // tsutslagdsan ued end duusna
          return
        }
      }
      // success ued end irne
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
          countryNames: newValuesets['country-values-mn'],
          addressNames: newValuesets['address-values-mn'],
        },
      })

      return
    },

    *query({ payload = {} }, { call, put, select }) {
      const requestPayload = {
        resourceType: 'Patient',
        _id: payload.id,
      }

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)
      const patient = resourceDictionary['Patient'].find(
        patient => patient.id === payload.id
      )

      const patientInformation = {
        patientId: patient.id,
        patientBarcode: patient._getBarcode(),
        patientLastName: patient.getLastName(),
        patientFirstName: patient.getFirstName(),
        patientReference: patient.getReference(),
        patientNInum: patient.getNationalIdentificationNumber(),
        patientPhoneNumber: (patient.getMobilePhones() || [])[0],
      }

      yield put({
        type: 'updateState',
        payload: {
          patient,
          patientInformation,
        },
      })
    },
    /* #endregion */

    /* #region  Complaint */
    *queryComplaint({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }
      const { Problems, BodySites, Categories } = FHIR_CODES
      const { HistoryOfPresentIllness } = Categories
      const { ProblemList } = FHIR_CODES.Lists

      const requestPayload = {
        resourceType: 'List',
        code: `${ProblemList.coding[0].system}|${ProblemList.coding[0].code}`,
        patient: patient.id,
        _include: ['List:subject', 'List:item:Condition'],
        '_include:iterate': ['Condition:asserter'],
        _sort: '-_lastUpdated',
      }

      const response = yield call(readResource, requestPayload)
      console.log(response)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      console.log('COMPLAINT resource dictionary', resourceDictionary)

      const problemList = resourceDictionary['List'].find(
        list =>
          list.code && codeIntersects(list.code, FHIR_CODES.Lists.ProblemList)
      )

      const patientProblemList = {}

      problemList &&
        problemList.entry.forEach(entry => {
          const complaint = findByReference(
            resourceDictionary['Condition'],
            entry.item
          )

          if (
            !complaint.category.some(v =>
              codeIntersects(v, HistoryOfPresentIllness)
            )
          ) {
            const recordedDate = toLocalDateTime(
              complaint.recordedDate,
              'yyyy-mm-dd'
            )

            console.log(complaint)

            const practitioner =
              complaint.recorder &&
              findByReference(
                resourceDictionary['Practitioner'],
                complaint.recorder
              )
            const officialNameString = practitioner
              ? practitioner.getOfficialNameString({
                  short: true,
                })
              : ''

            const patientProblem =
              complaint.code &&
              Object.values(Problems).find(problem =>
                codeIntersects(problem.code, complaint.code)
              )

            console.log(patientProblem)

            // complaint.code байхгүй байж болох болохоор комментлолоо
            // if (!patientProblem) {
            //   return
            // }

            const problemBodySite =
              complaint.bodySite &&
              BodySites.find(
                site =>
                  complaint.bodySite &&
                  codeIntersects(site.code, complaint.bodySite[0])
              )

            const problemNote =
              complaint.note && complaint.note.map(noteItem => noteItem.text)

            const condition =
              patientProblemList &&
              patientProblemList[recordedDate] &&
              patientProblemList[recordedDate][officialNameString]

            console.log(condition)

            /* #region  creatin patient problem list */
            if (
              condition &&
              patientProblemList[recordedDate][officialNameString].condition
            ) {
              patientProblemList[recordedDate][
                officialNameString
              ].condition.push({
                complaint: patientProblem ? patientProblem : undefined,
                bodySite: problemBodySite ? problemBodySite : undefined,
                note: problemNote ? problemNote : '',
              })
            } else {
              patientProblemList[recordedDate] = {
                ...patientProblemList[recordedDate],
                [officialNameString]: {
                  condition: [
                    {
                      complaint: patientProblem ? patientProblem : undefined,
                      bodySite: problemBodySite ? problemBodySite : undefined,
                      note: problemNote ? problemNote : '',
                    },
                  ],
                },
              }
            }
            /* #endregion */
          }
        })

      // husnegtruu huwirgah
      const patientComplaint = Object.entries(patientProblemList).sort(function(
        currentItem,
        nextItem
      ) {
        var currentItemDate = new Date(currentItem[0])
        var nextItemDate = new Date(nextItem[0])
        return nextItemDate - currentItemDate
      })

      yield put({
        type: 'updateState',
        payload: {
          problemList,
        },
      })

      return {
        patientComplaint,
      }
    },

    *saveComplaint({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { formValues } = payload
      const { FHIR_CODES } = globalState
      const { Problems, BodySites } = FHIR_CODES
      const { patient, problemList } = localState

      const ConditionConstantValues = {
        identifier: {
          ...FHIR_CODES.Identifiers.Conditions,
          value: generateUuid(),
        },
        category: [
          FHIR_CODES.Categories.ProblemListItem,
          FHIR_CODES.Categories.Complaint,
        ],
        subject: patient.getReference(),
        recordedDate: getInstant(),
        recorder: globalState.Practitioner.getReference(),
        asserter: globalState.Practitioner.getReference(),
        clinicalStatus: FHIR_CODES.ConditionStatuses.ClinicalStatusActive,
      }

      console.log('COMPLAINT form values', formValues)

      const formValueList = []

      Object.values(formValues).forEach(formValue => {
        formValueList.push({
          note: formValue.note,
          complaint: Problems[formValue.complaint],
          bodySite:
            formValue.bodySite &&
            BodySites.find(v => v.code.text === formValue.bodySite),
        })
      })

      const conditionEntries = []
      const bundleEntries = []

      formValueList.forEach(formValue => {
        const condition = new Condition({
          ...ConditionConstantValues,
          code: formValue.complaint && formValue.complaint.code,
          bodySite: formValue.bodySite && [formValue.bodySite.code],
          note: formValue.note &&
            formValue.note !== '' && [
              {
                authorReference: globalState.Practitioner.getReference(),
                time: getInstant(),
                text: formValue.note ? formValue.note : undefined,
              },
            ],
        })

        const bundleEntry = new BundleEntry(
          pushRequest({ newResource: condition }, 'POST')
        )

        conditionEntries.push(bundleEntry)
        bundleEntries.push(bundleEntry)
      })

      /* #region  condition entries */

      console.log('condition entries', conditionEntries)

      if (!problemList) {
        const newProblemList = new List({
          mode: 'working',
          status: 'current',
          title: 'Problem List',
          date: getInstant(),
          subject: patient.getReference(),
          code: FHIR_CODES.Lists.ProblemList,
          source: globalState.Practitioner.getReference(),
          entry: conditionEntries.map(entry => {
            return {
              item: { reference: entry.fullUrl },
            }
          }),
        })

        const problemListEntry = new BundleEntry(
          pushRequest({ newResource: newProblemList }, 'POST')
        )

        bundleEntries.push(problemListEntry)
      } else {
        const updatedProblemListObject = problemList.toJSON()

        updatedProblemListObject.entry.push(
          ...conditionEntries.map(entry => {
            return { item: { reference: entry.fullUrl } }
          })
        )

        const updatedProblemList = new List(updatedProblemListObject)
        const problemFullUrl = getReferenceUrl(updatedProblemList)

        const problemListEntry = new BundleEntry({
          fullUrl: problemFullUrl,
          resource: updatedProblemList,
          request: {
            method: 'PUT',
            url: problemFullUrl,
            ifMatch: `W/"${updatedProblemList.meta.versionId}"`,
          },
        })

        bundleEntries.push(problemListEntry)
      }
      /* #endregion */

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            lastUpdatedComplaint: getInstant(),
          },
        })

        return response.success
      } else {
        return
      }
    },
    /* #endregion */

    /* #region  History of Present Illness  */
    *queryHistoryOfPresentIllness({ payload }, { call, put, select }) {
      /* #region  constants and request */
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { HealthCareProviders, TestNames, Problems } = FHIR_CODES
      const IllnessSection = FHIR_CODES.HistoryOfPresentIllness
      const {
        Complaint,
        EncounterDiagnosis,
        HistoryOfPresentIllness,
      } = FHIR_CODES.Categories

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }
      const historyOfPresentIllnessCode = HistoryOfPresentIllness.coding[0]

      const requestPayload = {
        resourceType: 'List',
        code: `${historyOfPresentIllnessCode.system}|${historyOfPresentIllnessCode.code}`,
        patient: patient.id,
        _include: ['List:subject', 'List:item:Condition'],
        '_include:iterate': ['Condition:evidence-detail', 'Condition:asserter'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)
      /* #endregion */

      const valueSet = []
      const historyOfPresentIllnessConditions = []

      const historyOfPresentIllnessList = resourceDictionary['List'].find(
        list => list.code && codeIntersects(list.code, HistoryOfPresentIllness)
      )

      console.log('resource dictionary', resourceDictionary)

      resourceDictionary['List'].forEach(listItem => {
        listItem.entry.forEach(entryItem => {
          const condition = findByReference(
            resourceDictionary['Condition'],
            entryItem.item
          )

          historyOfPresentIllnessConditions.push(condition)
        })
      })

      console.log('conditions', historyOfPresentIllnessConditions)

      historyOfPresentIllnessConditions.forEach(condition => {
        const { evidence } = condition
        const evidenceSet = {}
        const testNames = []
        const treatmentGiven = []
        console.log(evidence)

        /* #region  practitioner and onset time */
        const practitioner = findByReference(
          resourceDictionary['Practitioner'],
          condition.recorder
        )

        const officialNameString = practitioner.getOfficialNameString({
          short: true,
        })

        const recordedDate = toLocalDateTime(
          condition.recordedDate,
          'yyyy-mm-dd'
        )

        if (
          condition.code &&
          Object.values(Problems).find(v =>
            codeIntersects(v.code, condition.code)
          )
        ) {
          evidenceSet['Complaint'] = {
            designation: COMPLAINT_DESIGNATION,
            value: Object.values(Problems).find(v =>
              codeIntersects(v.code, condition.code)
            ),
          }
        } else {
          evidenceSet['Diagnosis'] = {
            designation: DIAGNOSIS_DESIGNATION,
            value: condition.code.coding.map(codingItem => codingItem.display),
          }
        }

        evidenceSet['Note'] = condition.note && {
          designation: NOTE_DESIGNATION,
          value: condition.note.find(noteItem => noteItem.text).text,
        }

        evidenceSet['TimeOfSymptomOnset'] = condition.onsetDateTime && {
          designation: IllnessSection.include.TimeOfSymptomOnset.designation,
          value: toLocalDateTime(condition.onsetDateTime, 'yyyy-mm-dd'),
        }

        evidenceSet['ConditionDueToExtension'] = {
          designation: CONDITOIN_EXTENSION_DESIGNATION,
          value:
            condition.extension.find(v => v.valueString) &&
            condition.extension.find(v => v.valueString).valueString,
        }

        /* #endregion */

        evidence &&
          evidence.forEach(evidenceValue => {
            const observation =
              evidenceValue &&
              findByReference(
                resourceArray,
                evidenceValue.detail.find(d => d)
              )

            if (observation.resourceType === 'Condition') {
              evidenceSet['Complaint'] = {
                designation: COMPLAINT_DESIGNATION,
                value: Object.values(Problems).find(v =>
                  codeIntersects(v.code, observation.code)
                ),
              }
            } else {
              Object.keys(IllnessSection.include).forEach(key => {
                if (
                  codeIntersects(
                    IllnessSection.include[key].code,
                    observation.code
                  )
                ) {
                  let value

                  const valueName = Object.keys(observation).find(
                    observationKey =>
                      observationKey.startsWith('value') &&
                      observation[observationKey] !== undefined
                  )

                  if (valueName === 'valueCodeableConcept') {
                    if (
                      codeIntersects(
                        IllnessSection.include.PreviouslyMadeTest.code,
                        observation.code
                      )
                    ) {
                      const testNameValue = Object.values(
                        TestNames
                      ).find(testName =>
                        codeIntersects(testName.code, observation[valueName])
                      )

                      testNames.push(testNameValue)
                    } else if (
                      codeIntersects(
                        IllnessSection.include.TreatmentGiven.code,
                        observation.code
                      )
                    ) {
                      const treatmentGivenValue = Object.values(
                        IllnessSection.include.TreatmentGiven.include
                      ).find(v =>
                        codeIntersects(v.code, observation[valueName])
                      )

                      treatmentGiven.push(treatmentGivenValue)
                    } else {
                      value = Object.values(
                        HealthCareProviders
                      ).find(healthCareProvider =>
                        codeIntersects(
                          healthCareProvider.code,
                          observation[valueName]
                        )
                      )
                    }
                  } else {
                    value = observation[valueName]
                  }

                  evidenceSet[key] = {
                    designation: IllnessSection.include[key].designation,
                    value: value,
                  }
                }
              })
            }
          })

        valueSet.push({
          evidence: { ...evidenceSet },
          testNames:
            testNames.length > 0
              ? {
                  designation:
                    IllnessSection.include.PreviouslyMadeTest.designation,
                  value: testNames,
                }
              : undefined,
          treatmentGiven:
            treatmentGiven.length > 0
              ? {
                  designation:
                    IllnessSection.include.TreatmentGiven.designation,
                  value: treatmentGiven,
                }
              : undefined,
          conditionValues: {
            practitioner: officialNameString,
            recordedDate: recordedDate,
          },
        })
      })

      console.log(valueSet)

      yield put({
        type: 'updateState',
        payload: { historyOfPresentIllnessList },
      })

      return valueSet
    },

    *historyOfPresentIllnessAdd({ payload }, { select, call, put }) {
      /* #region  constant values and declaration section */
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { formValues } = payload
      const { FHIR_CODES, Practitioner } = globalState
      const { patient, historyOfPresentIllnessList } = localState

      const {
        Problems,
        TestNames,
        Extensions,
        HealthCareProviders,
        HistoryOfPresentIllness,
      } = FHIR_CODES

      const complaint =
        Problems[formValues.select && formValues.select.Complaint]

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const ConditionConstantValues = {
        identifier: {
          ...FHIR_CODES.Identifiers.Conditions,
          value: generateUuid(),
        },
        subject: patient.getReference(),
        recordedDate: getInstant(),
        recorder: Practitioner.getReference(),
        asserter: Practitioner.getReference(),
        clinicalStatus: FHIR_CODES.ConditionStatuses.ClinicalStatusActive,
      }

      const conditionEntries = []

      const observationObject = {}
      const observationEntries = []

      const observationOfDiagnosisObject = {}
      const observationOfDiagnosisEntries = []
      /* #endregion */

      console.log(formValues)

      const onSetTime =
        formValues.numberAndSelect.TimeOfSymptomOnset &&
        calculateDateFromSpentDate(
          formValues.numberAndSelect.TimeOfSymptomOnset
        )

      /* #region  string, number, date, note */
      formValues.string &&
        Object.keys(formValues.string).forEach(formValueName => {
          observationObject[`observation${formValueName}`] =
            formValues.string[formValueName] &&
            new Observation({
              ...ObservationConstantValues,
              code: HistoryOfPresentIllness.include[formValueName].code,
              valueString: formValues.string[formValueName],
            })
        })

      formValues.number &&
        Object.keys(formValues.number).forEach(formValueName => {
          observationObject[`observation${formValueName}`] =
            !isNaN(parseInt(formValues.number[formValueName])) &&
            new Observation({
              ...ObservationConstantValues,
              code: HistoryOfPresentIllness.include[formValueName].code,
              valueInteger: parseInt(formValues.number[formValueName]),
            })
        })

      observationObject[`observationPreviouslyVisitedHospital`] =
        formValues.selectHospital &&
        formValues.selectHospital.PreviouslyVisitedHospital &&
        new Observation({
          ...ObservationConstantValues,
          code: HistoryOfPresentIllness.include.PreviouslyVisitedHospital.code,
          valueCodeableConcept: HealthCareProviders.find(
            v =>
              v.display === formValues.selectHospital.PreviouslyVisitedHospital
          ).code,
        })

      const conditionNote = formValues.note.note &&
        formValues.note.note !== '' && [
          {
            authorReference: Practitioner.getReference(),
            time: getInstant(),
            text: formValues.note.note,
          },
        ]
      /* #endregion */

      observationObject[`observationPreviouslyMadeTest`] =
        formValues.selectMultiple &&
        formValues.selectMultiple.PreviouslyMadeTest &&
        formValues.selectMultiple.PreviouslyMadeTest.map(previouslyMadeTest => {
          return new Observation({
            ...ObservationConstantValues,
            code: HistoryOfPresentIllness.include.PreviouslyMadeTest.code,
            valueCodeableConcept: TestNames[previouslyMadeTest].code,
          })
        })

      formValues.check &&
        formValues.check.TreatmentGiven &&
        formValues.check.TreatmentGiven.forEach(treatment => {
          observationObject[`observation${treatment}`] =
            treatment &&
            new Observation({
              ...ObservationConstantValues,
              code: HistoryOfPresentIllness.include.TreatmentGiven.code,
              valueCodeableConcept:
                HistoryOfPresentIllness.include.TreatmentGiven.include[
                  treatment
                ].code,
            })

          console.log(observationObject[`observation${treatment}`])
        })

      observationObject &&
        Object.values(observationObject).forEach(observationObjectEntry => {
          if (observationObjectEntry) {
            if (isArray(observationObjectEntry)) {
              observationEntries.push(
                ...observationObjectEntry.map(
                  observation =>
                    new BundleEntry(
                      pushRequest({ newResource: observation }, 'POST')
                    )
                )
              )
            } else if (isObject(observationObjectEntry)) {
              observationEntries.push(
                new BundleEntry(
                  pushRequest({ newResource: observationObjectEntry }, 'POST')
                )
              )
            }
          }
        })

      /* #region  due to extension  */
      const dueToExtension =
        formValues.dueToExtension &&
        formValues.dueToExtension.ConditionDueToExtension !== '' &&
        new Extension({
          ...Extensions.ConditionDueToExtension,
          valueString: formValues.dueToExtension.ConditionDueToExtension,
        })
      /* #endregion */

      let complaintConditionEntry

      if (formValues.diagnosis && formValues.diagnosis.Diagnosis) {
        /* #region  diagnosis section */
        observationOfDiagnosisObject['observationPlaceOfDiagnosis'] =
          formValues.selectHospital &&
          formValues.selectHospital.PlaceOfDiagnosis &&
          new Observation({
            ...ObservationConstantValues,
            code: HistoryOfPresentIllness.include.PlaceOfDiagnosis.code,
            valueCodeableConcept: HealthCareProviders.find(
              v => v.display === formValues.selectHospital.PlaceOfDiagnosis
            ).code,
          })

        observationOfDiagnosisObject['observationDateOfDiagnosis'] =
          formValues.date &&
          formValues.date.DateOfDiagnosis &&
          new Observation({
            ...ObservationConstantValues,
            code: HistoryOfPresentIllness.include.DateOfDiagnosis.code,
            valueDateTime: formValues.date.DateOfDiagnosis,
          })

        observationOfDiagnosisObject &&
          Object.values(observationOfDiagnosisObject).forEach(
            observation =>
              observation &&
              observationOfDiagnosisEntries.push(
                new BundleEntry(
                  pushRequest({ newResource: observation }, 'POST')
                )
              )
          )

        /* #endregion */

        /* #region  evidence */
        const evidence = []

        observationEntries &&
          observationEntries.forEach(entry => {
            evidence.push({
              code: entry.resource.code,
              detail: [{ reference: entry.fullUrl }],
            })
          })

        observationOfDiagnosisEntries &&
          observationOfDiagnosisEntries.forEach(entry => {
            evidence.push({
              code: entry.resource.code,
              detail: [{ reference: entry.fullUrl }],
            })
          })
        /* #endregion */

        const complaintCondition =
          complaint &&
          new Condition({
            ...ConditionConstantValues,
            category: [FHIR_CODES.Categories.Complaint],
            code: complaint.code,
          })

        complaintConditionEntry =
          complaintCondition &&
          new BundleEntry(
            pushRequest({ newResource: complaintCondition }, 'POST')
          )

        complaintConditionEntry &&
          evidence.push({
            code: complaintConditionEntry.resource.code,
            detail: [{ reference: complaintConditionEntry.fullUrl }],
          })

        const diagnosisCondition = new Condition({
          ...ConditionConstantValues,
          category: [FHIR_CODES.Categories.EncounterDiagnosis],
          evidence: evidence,
          onsetDateTime: onSetTime,
          code: formValues.diagnosis.Diagnosis,
          note: conditionNote,
          extension: [dueToExtension],
        })

        console.log(diagnosisCondition)

        const diagnosisConditionEntry =
          diagnosisCondition &&
          new BundleEntry(
            pushRequest({ newResource: diagnosisCondition }, 'POST')
          )

        conditionEntries.push(diagnosisConditionEntry)
      } else {
        const evidence = []

        observationEntries &&
          observationEntries.forEach(entry => {
            evidence.push({
              code: entry.resource.code,
              detail: [{ reference: entry.fullUrl }],
            })
          })

        const complaintCondition =
          complaint &&
          new Condition({
            ...ConditionConstantValues,
            category: [FHIR_CODES.Categories.Complaint],
            evidence,
            code: complaint.code,
            note: conditionNote,
            extension: [dueToExtension],
          })

        complaintConditionEntry =
          complaintCondition &&
          new BundleEntry(
            pushRequest({ newResource: complaintCondition }, 'POST')
          )

        conditionEntries.push(complaintConditionEntry)
      }

      console.log('condition entries', conditionEntries)
      let problemListEntry

      if (historyOfPresentIllnessList) {
        const updatedhistoryOfPresentIllnessList = historyOfPresentIllnessList.toJSON()

        console.log(updatedhistoryOfPresentIllnessList)

        updatedhistoryOfPresentIllnessList.entry.push(
          ...conditionEntries.map(entry => {
            return {
              item: { reference: entry.fullUrl },
            }
          })
        )

        const updatedProblemList = new List(updatedhistoryOfPresentIllnessList)
        const problemFullUrl = getReferenceUrl(updatedProblemList)

        console.log(updatedProblemList)

        problemListEntry = new BundleEntry({
          fullUrl: problemFullUrl,
          resource: updatedProblemList,
          request: {
            method: 'PUT',
            url: problemFullUrl,
            ifMatch: `W/"${updatedProblemList.meta.versionId}"`,
          },
        })
      } else {
        const newProblemList = new List({
          mode: 'working',
          status: 'current',
          title: 'Problem List',
          date: getInstant(),
          subject: patient.getReference(),
          code: FHIR_CODES.HistoryOfPresentIllness.code,
          source: globalState.Practitioner.getReference(),
          entry: conditionEntries.map(entry => {
            return {
              item: { reference: entry.fullUrl },
            }
          }),
        })

        problemListEntry = new BundleEntry(
          pushRequest({ newResource: newProblemList }, 'POST')
        )
      }

      console.log(complaintConditionEntry)

      const transactionEntries = [
        ...conditionEntries,
        ...observationEntries,
        ...observationOfDiagnosisEntries,
        problemListEntry,
      ]

      complaintConditionEntry &&
        transactionEntries.push(complaintConditionEntry)

      console.log('transaction entries', transactionEntries)

      const bundle = new Bundle({
        type: 'transaction',
        entry: transactionEntries,
      })

      console.log('HISTORY OF PRESENT ILLNESS BUNDLE', bundle)

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            lastUpdatedHistoryOfPresentIllness: getInstant(),
          },
        })

        return response.success
      } else {
        throw new Error('Saving history of present illness failed')
      }
    },
    /* #endregion */

    /* #region  Brief History of Patient  */
    *queryBriefHistoryOfPatient({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { AnamnesisVitae } = FHIR_CODES
      const { BriefHistoryOfPatient } = AnamnesisVitae.include
      const {
        FindingOfBirthDetails,
        ChildhoodGrowthAndOrDevelopmentFinding,
        DetailsOfEducation,
        EmploymentDetail,
        RetiredLifeEventBoolean,
        RetiredLifeEvent,
        HouseholdComposition,
      } = BriefHistoryOfPatient.include

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'List',
        code: `${FHIR_CODES.Lists.BriefHistoryOfPatient.coding[0].system}|${FHIR_CODES.Lists.BriefHistoryOfPatient.coding[0].code}`,
        patient: patient.id,
        _include: ['List:subject', 'List:item:Observation'],
        '_include:iterate': ['Observation:has-member'],
      }

      /* #region  response, bundle and resource  */
      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))
      const resourceDictionary = createResourceDictionary(resourceArray)
      /* #endregion */

      const briefHistoryOfPatientList = []

      console.log(
        'Brief history of patient resource dictionary',
        resourceDictionary
      )

      resourceDictionary['List'].forEach(list =>
        list.code &&
        codeIntersects(list.code, FHIR_CODES.Lists.BriefHistoryOfPatient)
          ? briefHistoryOfPatientList.push(list)
          : ''
      )

      const patientBriefHistoryOfPatientList = []

      if (!!briefHistoryOfPatientList) {
        briefHistoryOfPatientList.forEach(list => {
          const BriefHistoryOfPatientObject = {}

          // console.log('list', list)
          // console.log('list entry', list.entry)

          list.entry.forEach(listEntry => {
            const observation = findByReference(
              resourceDictionary['Observation'],
              listEntry.item
            )

            console.log(observation)

            if (codeIntersects(FindingOfBirthDetails.code, observation.code)) {
              const FindingOfBirthValue = {}

              Object.keys(FindingOfBirthDetails.include).forEach(itemName => {
                if (
                  codeIntersects(
                    FindingOfBirthDetails.include[itemName].code,
                    observation.valueCodeableConcept
                  )
                ) {
                  FindingOfBirthValue[itemName] = {
                    value: FindingOfBirthDetails.include[itemName],
                  }
                }
              })

              BriefHistoryOfPatientObject['FindingOfBirthDetails'] = {
                designation: FindingOfBirthDetails.designation,
                value: FindingOfBirthValue,
              }
            }

            if (
              codeIntersects(
                ChildhoodGrowthAndOrDevelopmentFinding.code,
                observation.code
              )
            ) {
              const childhoodGrowthValue = {}

              Object.keys(
                ChildhoodGrowthAndOrDevelopmentFinding.include
              ).forEach(itemName => {
                if (
                  codeIntersects(
                    ChildhoodGrowthAndOrDevelopmentFinding.include[itemName]
                      .code,
                    observation.valueCodeableConcept
                  )
                ) {
                  childhoodGrowthValue[itemName] = {
                    value:
                      ChildhoodGrowthAndOrDevelopmentFinding.include[itemName],
                  }
                }
              })

              BriefHistoryOfPatientObject[
                'ChildhoodGrowthAndOrDevelopmentFinding'
              ] = {
                designation: ChildhoodGrowthAndOrDevelopmentFinding.designation,
                value: childhoodGrowthValue,
              }
            }

            if (codeIntersects(DetailsOfEducation.code, observation.code)) {
              BriefHistoryOfPatientObject['DetailsOfEducation'] = {
                designation: DetailsOfEducation.designation,
                value: observation.valueString,
              }
            }

            if (codeIntersects(EmploymentDetail.code, observation.code)) {
              BriefHistoryOfPatientObject['EmploymentDetail'] = {
                designation: EmploymentDetail.designation,
                value: observation.valueString,
              }
            }

            if (
              codeIntersects(RetiredLifeEventBoolean.code, observation.code)
            ) {
              // console.log('observation', observation)
              if (!!observation.valueDateTime) {
                BriefHistoryOfPatientObject['RetiredLifeEventBoolean'] = {
                  designation: RetiredLifeEventBoolean.designation,
                  value: true,
                }
                BriefHistoryOfPatientObject['RetiredLifeEvent'] = {
                  designation: RetiredLifeEvent.designation,
                  value: observation.valueDateTime,
                }
              } else {
                BriefHistoryOfPatientObject['RetiredLifeEventBoolean'] = {
                  designation: RetiredLifeEventBoolean.designation,
                  value: observation.valueBoolean,
                }
              }
            }

            if (codeIntersects(HouseholdComposition.code, observation.code)) {
              const value = {}

              observation.hasMember.forEach(member => {
                const householdValue = findByReference(
                  resourceDictionary['Observation'],
                  member
                )

                Object.keys(HouseholdComposition.include).forEach(itemName => {
                  if (
                    codeIntersects(
                      householdValue.code,
                      HouseholdComposition.include[itemName].code
                    )
                  ) {
                    value[itemName] = {
                      value: HouseholdComposition.include[itemName],
                      text:
                        HouseholdComposition.include[itemName].code.text !==
                          householdValue.code.text && householdValue.code.text,
                    }
                  }
                })
              })

              BriefHistoryOfPatientObject['HouseholdComposition'] = {
                designation: HouseholdComposition.designation,
                value,
              }
            }

            // console.log(observation)
          })

          if (!!list.note) {
            BriefHistoryOfPatientObject['AdditionalInformation'] = {
              designation: NOTE_DESIGNATION,
              value: list.note.map(v => v.text),
            }
          }

          patientBriefHistoryOfPatientList.push(BriefHistoryOfPatientObject)
        })
      }

      return patientBriefHistoryOfPatientList
    },

    *briefHistoryOfPatientAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const { patient, anamnesisVitaeSections } = yield select(
        state => state.practitioner_patient_profile
      )

      const { formValues } = payload
      const { AnamnesisVitae } = FHIR_CODES
      const {
        ChildhoodGrowthAndOrDevelopmentFinding,
        DetailsOfEducation,
        EmploymentDetail,
        FindingOfBirthDetails,
        HouseholdComposition,
        RetiredLifeEvent,
      } = AnamnesisVitae.include.BriefHistoryOfPatient.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const observationEntries = []
      const checkObservationEntries = []
      const observationObject = {}

      if (!formValues) {
        return false
      }

      /* #region  Observations */
      observationObject['observationFindingOfBirthDetails'] =
        formValues.FindingOfBirthDetails &&
        new Observation({
          ...ObservationConstantValues,
          code: FindingOfBirthDetails.code,
          valueCodeableConcept:
            FindingOfBirthDetails.include[formValues.FindingOfBirthDetails]
              .code,
        })

      observationObject['observationChildhoodGrowth'] =
        formValues.ChildhoodGrowthAndOrDevelopmentFinding &&
        new Observation({
          ...ObservationConstantValues,
          code: ChildhoodGrowthAndOrDevelopmentFinding.code,
          valueCodeableConcept:
            ChildhoodGrowthAndOrDevelopmentFinding.include[
              formValues.ChildhoodGrowthAndOrDevelopmentFinding
            ].code,
        })

      observationObject['observationDetailsOfEducation'] =
        formValues.DetailsOfEducation &&
        new Observation({
          ...ObservationConstantValues,
          code: DetailsOfEducation.code,
          valueString: formValues.DetailsOfEducation,
        })

      observationObject['observationEmploymentDetail'] =
        formValues.EmploymentDetail &&
        new Observation({
          ...ObservationConstantValues,
          code: EmploymentDetail.code,
          valueString: formValues.EmploymentDetail,
        })

      observationObject['observationRetiredLifeEvent'] =
        formValues.RetiredLifeEvent === undefined
          ? ''
          : formValues.RetiredLifeEvent.date &&
            formValues.RetiredLifeEvent.boolean
          ? new Observation({
              ...ObservationConstantValues,
              code: RetiredLifeEvent.code,
              valueDateTime: formValues.RetiredLifeEvent.date,
            })
          : new Observation({
              ...ObservationConstantValues,
              code: RetiredLifeEvent.code,
              valueBoolean: formValues.RetiredLifeEvent.boolean,
            })
      /* #endregion */

      if (!observationObject) {
        return false
      }

      formValues.HouseholdComposition &&
        Object.values(formValues.HouseholdComposition).forEach(item => {
          const observation =
            item &&
            new Observation({
              ...ObservationConstantValues,
              code: item.code,
            })

          checkObservationEntries.push(
            observation &&
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
          )
        })

      console.log(checkObservationEntries)

      if (checkObservationEntries.length > 0) {
        observationObject['observationHouseholdComposition'] = new Observation({
          ...ObservationConstantValues,
          code: HouseholdComposition.code,
          hasMember: checkObservationEntries.map(entry => {
            return {
              reference: entry.fullUrl,
            }
          }),
        })
      }

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log('check observations', checkObservationEntries)
      console.log('observation objects', observationObject)
      console.log('observation entries', observationEntries)

      const BriefHistoryOfPatientList = new List({
        title: 'Brief History Of Patient',
        code: FHIR_CODES.Lists.BriefHistoryOfPatient,
        status: 'current',
        mode: 'working',
        note: formValues.note &&
          formValues.note !== '' && [
            {
              authorReference: Practitioner.getReference(),
              time: getInstant(),
              text: formValues.note,
            },
          ],
        subject: patient.getReference(),
        date: getInstant(),
        source: Practitioner.getReference(),
        entry: observationEntries.map(entry => {
          return {
            item: { reference: entry.fullUrl },
          }
        }),
      })

      console.log(BriefHistoryOfPatientList)

      const briefHistoryOfPatientListEntry = new BundleEntry(
        pushRequest({ newResource: BriefHistoryOfPatientList }, 'POST')
      )

      console.log(briefHistoryOfPatientListEntry)

      const listEntry = {
        ...anamnesisVitaeSections,
        BriefHistoryOfPatient: {
          title: 'Brief History Of Patient',
          entry: [briefHistoryOfPatientListEntry],
          entries: [
            ...checkObservationEntries,
            ...observationEntries,
            // briefHistoryOfPatientListEntry,
          ],
        },
      }
      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Anamnesis Vitae  */
    *anamnesisVitaeAdd({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES, Practitioner } = globalState
      const { patientId, patient, anamnesisVitaeSections } = localState

      const anamnesisVitaeCoding = FHIR_CODES.AnamnesisVitae.code.coding[0]

      const requestPayload = {
        resourceType: 'List',
        code: `${anamnesisVitaeCoding.system}|${anamnesisVitaeCoding.code}`,
        subject: `Patient/${patientId}`,
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)

      let savedAnamnesisVitaeList

      if (bundle.entry.length !== 0) {
        const resourceArray = loadResourceArray(
          bundle.entry.map(e => e.resource)
        )

        const resourceDictionary = createResourceDictionary(resourceArray)

        savedAnamnesisVitaeList = resourceDictionary.List[0]
      }

      console.log('Anamnesis Vitae Section', anamnesisVitaeSections)

      if (!isEmptyObject(anamnesisVitaeSections)) {
        const listEntries = []
        const transactionEntries = []

        Object.values(anamnesisVitaeSections).forEach(anamnesisVitaeSection => {
          if (anamnesisVitaeSection.entry) {
            listEntries.push(...anamnesisVitaeSection.entry)
            transactionEntries.push(...anamnesisVitaeSection.entry)
          }

          anamnesisVitaeSection.entries &&
            transactionEntries.push(...anamnesisVitaeSection.entries)
        })

        console.log(listEntries)
        console.log(transactionEntries)

        // Хадгалсан амьдралын түүхийн хэсэн дээр нэмж өгөгдөл хадгалж байгаа
        // хэрэв амьдралын түүх хадлагдаагүй бол шинээр үүсгэж байгаа
        // хадгалсан амьдралын түүх байхгүй бол savedAnamnesisVitaeList == undefined

        if (savedAnamnesisVitaeList) {
          savedAnamnesisVitaeList.entry.push(
            ...listEntries.map(entry => {
              return {
                item: { reference: entry.fullUrl },
              }
            })
          )

          const updatedAnamnesisVitaeListEntry = new BundleEntry({
            fullUrl: getReferenceUrl(savedAnamnesisVitaeList),
            resource: new List(savedAnamnesisVitaeList),
            request: {
              method: 'PUT',
              url: getReferenceUrl(savedAnamnesisVitaeList),
              ifMatch: `W/"${savedAnamnesisVitaeList.meta.versionId}"`,
            },
          })

          transactionEntries.push(updatedAnamnesisVitaeListEntry)
        } else {
          const anamnesisVitaeList = new List({
            title: 'Anamnesis Vitae',
            mode: 'working',
            status: 'current',
            date: getInstant(),
            subject: patient.getReference(),
            code: FHIR_CODES.AnamnesisVitae.code,
            source: Practitioner.getReference(),
            entry: listEntries.map(entry => {
              return {
                item: { reference: entry.fullUrl },
              }
            }),
          })

          const anamnesisVitaeListEntry = new BundleEntry(
            pushRequest({ newResource: anamnesisVitaeList }, 'POST')
          )

          transactionEntries.push(anamnesisVitaeListEntry)
        }

        const bundle = new Bundle({
          type: 'transaction',
          entry: transactionEntries,
        })

        console.log('ANAMNESIS VITAE BUNDLE', bundle)

        const json = bundle.toJSON()
        const response = yield call(batch_transaction_request, json)

        if (response && response.success) {
          yield put({
            type: 'updateState',
            payload: {
              lastUpdatedAnamnesisVitae: getInstant(),
            },
          })

          return 'success'
        } else {
          return 'error'
        }
      } else {
        return 'info'
      }
    },
    /* #endregion */

    /* #region  Reproductive History of Female  */
    *queryReproductiveHistoryOfFemale({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { AnamnesisVitae } = FHIR_CODES
      const { FemaleReproductiveHistory } = AnamnesisVitae.include
      const { ReproductiveHistoryOfFemale } = FHIR_CODES.Lists

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'List',
        code: `${ReproductiveHistoryOfFemale.coding[0].system}|${ReproductiveHistoryOfFemale.coding[0].code}`,
        patient: patient.id,
        _include: ['List:subject', 'List:item:Observation'],
        '_include:iterate': ['Observation:has-member'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientFemaleReproductiveHistoryList = []

      resourceDictionary['List'].forEach(list => {
        const FemaleReproductiveObject = {}

        // энэ хэсэгт хамаарах list ээ давтаж
        // entry доторх observation ий хаягийн ашиглан утга
        // агуулж буй intersect хийсэн observation ийн олно
        // console.log('list', list)

        list.entry.forEach(listEntry => {
          const observation = findByReference(
            resourceDictionary['Observation'],
            listEntry.item
          )

          const observationCondition =
            observation.valueBoolean === true ||
            observation.valueBoolean === false

          // console.log(observation)

          // observation ий утганы төрлөөс хамааран 4 төрлийн нөхцлөөр
          // шалган авч байгаа хэсгийн код ValueInteger, ValueString,
          // ValueCodeAbleConcenpt, hasMember

          /* #region  observation value integer type */
          typeof observation.valueInteger === 'number' &&
            Object.keys(FemaleReproductiveHistory.include).forEach(
              (reproductiveItem, reproductiveItemIndex) => {
                if (
                  codeIntersects(
                    FemaleReproductiveHistory.include[reproductiveItem].code,
                    observation.code
                  )
                ) {
                  FemaleReproductiveObject[reproductiveItem] = {
                    designation:
                      FemaleReproductiveHistory.include[reproductiveItem]
                        .designation,
                    value: observation.valueInteger,
                    reproductiveItemIndex,
                  }
                }
              }
            )

          /* #region  observation value quantity type */

          observation.valueQuantity &&
            Object.keys(FemaleReproductiveHistory.include).forEach(
              (reproductiveItem, reproductiveItemIndex) => {
                console.log(observation, reproductiveItem)
                if (
                  codeIntersects(
                    FemaleReproductiveHistory.include[reproductiveItem].code,
                    observation.code
                  )
                ) {
                  FemaleReproductiveObject[reproductiveItem] = {
                    designation:
                      FemaleReproductiveHistory.include[reproductiveItem]
                        .designation,
                    value: observation.valueQuantity.value,
                    valueType:
                      observation.valueQuantity.code ===
                      FHIR_CODES.UnitsOfMeasure.Year.code
                        ? 'Years'
                        : '',
                    quantity: observation.valueQuantity,
                    reproductiveItemIndex,
                  }
                }
              }
            )

          /* #region  observation value string type */
          observation.valueString &&
            Object.keys(FemaleReproductiveHistory.include).forEach(
              (reproductiveItem, reproductiveItemIndex) => {
                if (
                  codeIntersects(
                    FemaleReproductiveHistory.include[reproductiveItem].code,
                    observation.code
                  )
                ) {
                  FemaleReproductiveObject[reproductiveItem] = {
                    designation:
                      FemaleReproductiveHistory.include[reproductiveItem]
                        .designation,
                    value: observation.valueString,
                    reproductiveItemIndex,
                  }
                }
              }
            )
          /* #endregion */

          /* #region  observation value codeAble concept type */
          observation.valueCodeableConcept &&
            Object.keys(FemaleReproductiveHistory.include).forEach(
              (reproductiveItem, reproductiveItemIndex) => {
                if (
                  codeIntersects(
                    FemaleReproductiveHistory.include[reproductiveItem].code,
                    observation.code
                  )
                ) {
                  const reproductiveValue = []

                  Object.values(
                    FemaleReproductiveHistory.include[reproductiveItem].include
                  ).forEach(v => {
                    if (
                      codeIntersects(v.code, observation.valueCodeableConcept)
                    ) {
                      reproductiveValue.push(v)
                    }
                  })

                  FemaleReproductiveObject[reproductiveItem] = {
                    designation:
                      FemaleReproductiveHistory.include[reproductiveItem]
                        .designation,
                    value: reproductiveValue,
                    reproductiveItemIndex,
                  }
                }
              }
            )
          /* #endregion */

          observationCondition &&
            Object.keys(FemaleReproductiveHistory.include).forEach(
              (reproductiveItem, reproductiveItemIndex) => {
                if (
                  codeIntersects(
                    FemaleReproductiveHistory.include[reproductiveItem].code,
                    observation.code
                  )
                ) {
                  FemaleReproductiveObject[reproductiveItem] = {
                    designation:
                      FemaleReproductiveHistory.include[reproductiveItem]
                        .designation,
                    value: observation.valueBoolean,
                    reproductiveItemIndex,
                  }
                }
              }
            )

          // hasMember хэсэг дээр анхаарах зүйлс байгаа:
          // observation hasMember дотор өөр observation ийн хаягууд
          // явж байгаа бөгөөд resourceDictionary["Observation"] хэсгээс
          // findByReference ашиглан observation-г авчран
          // valueSet ийн утгаа давтан designation-г авч байгаа

          /* #region  has member section */
          observation.hasMember &&
            Object.keys(FemaleReproductiveHistory.include).forEach(
              (reproductiveItem, reproductiveItemIndex) => {
                if (
                  codeIntersects(
                    FemaleReproductiveHistory.include[reproductiveItem].code,
                    observation.code
                  )
                ) {
                  const reproductiveValue = []

                  observation.hasMember.forEach(member => {
                    const memberObservation = findByReference(
                      resourceDictionary['Observation'],
                      member
                    )

                    console.log('member observation', memberObservation)

                    Object.values(
                      FemaleReproductiveHistory.include[reproductiveItem]
                        .include
                    ).forEach(v => {
                      if (
                        v.code &&
                        memberObservation.code &&
                        codeIntersects(
                          v.code && v.code,
                          memberObservation.code && memberObservation.code
                        )
                      ) {
                        reproductiveValue.push({
                          value: v,
                          text:
                            memberObservation.code.text !==
                              FemaleReproductiveHistory.include[
                                reproductiveItem
                              ].include.Other.code.coding[0].text &&
                            memberObservation.code.text,
                        })
                      }
                    })
                  })

                  FemaleReproductiveObject[reproductiveItem] = {
                    designation:
                      FemaleReproductiveHistory.include[reproductiveItem]
                        .designation,
                    value: reproductiveValue,
                    reproductiveItemIndex,
                  }
                }
              }
            )
          /* #endregion */
          /* #endregion */
        })

        console.log(list.note)
        if (!!list.note) {
          FemaleReproductiveObject['AdditionalInformation'] = {
            designation: [
              {
                language: 'en',
                value: 'Additional information',
              },
              {
                language: 'mn',
                value: 'Нэмэлт мэдээлэл',
              },
            ],
            value: list.note.map(v => v.text),
          }
        }

        patientFemaleReproductiveHistoryList.push(FemaleReproductiveObject)
      })

      return patientFemaleReproductiveHistoryList
    },

    *reproductiveHistoryOfFemaleAdd({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES } = globalState
      const { patient, anamnesisVitaeSections } = localState
      const { formValues } = payload

      const { FemaleReproductiveHistory } = FHIR_CODES.AnamnesisVitae.include
      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const observationEntries = []
      const checkObservationEntries = []
      const observationObject = {}

      console.log('form values', formValues)

      // Хэрэглэгчээс орж ирж буй утгууд бүгд өөрийн гэсэн тарлийн дагуу орж ирж байгаа
      // бөгөөд түүнийг давталт ашиглан observation үүсгэж байгаа

      /* #region  observation section */
      formValues.number &&
        Object.keys(formValues.number).forEach(
          formValueName =>
            (observationObject[`observation${formValueName}`] =
              !isNaN(parseInt(formValues.number[formValueName])) &&
              new Observation({
                ...ObservationConstantValues,
                code: FemaleReproductiveHistory.include[formValueName].code,
                valueInteger: parseInt(formValues.number[formValueName]),
              }))
        )

      formValues.radio &&
        Object.keys(formValues.radio).forEach(formValueName => {
          if (formValues.radio[formValueName] !== undefined) {
            typeof formValues.radio[formValueName] === 'boolean'
              ? (observationObject[
                  `observation${formValueName}`
                ] = new Observation({
                  ...ObservationConstantValues,
                  code: FemaleReproductiveHistory.include[formValueName].code,
                  valueBoolean: formValues.radio[formValueName],
                }))
              : (observationObject[
                  `observation${formValueName}`
                ] = new Observation({
                  ...ObservationConstantValues,
                  code: FemaleReproductiveHistory.include[formValueName].code,
                  valueCodeableConcept:
                    FemaleReproductiveHistory.include[formValueName].include[
                      formValues.radio[formValueName]
                    ].code,
                }))
          }
        })

      formValues.radioAndNumber &&
        Object.keys(formValues.radioAndNumber).forEach(formValueName => {
          if (!!formValues.radioAndNumber[formValueName]) {
            observationObject[`observation${formValueName}`] = formValues
              .radioAndNumber[formValueName].year
              ? new Observation({
                  ...ObservationConstantValues,
                  code: FemaleReproductiveHistory.include[formValueName].code,
                  valueInteger: parseInt(
                    formValues.radioAndNumber[formValueName].year
                  ),
                })
              : new Observation({
                  ...ObservationConstantValues,
                  code: FemaleReproductiveHistory.include[formValueName].code,
                  valueBoolean:
                    formValues.radioAndNumber[formValueName].boolean,
                })
          }
        })

      formValues.check &&
        Object.keys(formValues.check).forEach(formValueName => {
          let checkObservationEntry
          const hasMember = []

          formValues.check[formValueName] &&
            Object.values(formValues.check[formValueName]).forEach(item => {
              const observation = new Observation({
                ...ObservationConstantValues,
                code: item.code,
              })

              checkObservationEntry =
                item &&
                new BundleEntry(
                  pushRequest({ newResource: observation }, 'POST')
                )

              hasMember.push({
                reference: checkObservationEntry.fullUrl,
              })
              checkObservationEntries.push(checkObservationEntry)
            })

          if (hasMember.length > 0) {
            observationObject[`observation${formValueName}`] = new Observation({
              ...ObservationConstantValues,
              code: FemaleReproductiveHistory.include[formValueName].code,
              hasMember: hasMember,
            })
          }
        })

      formValues.yearInput &&
        Object.keys(formValues.yearInput).forEach(
          formValueName =>
            (observationObject[`observation${formValueName}`] =
              formValues.yearInput[formValueName] &&
              !isNaN(parseInt(formValues.yearInput[formValueName].year)) &&
              new Observation({
                ...ObservationConstantValues,
                code: FemaleReproductiveHistory.include[formValueName].code,
                valueQuantity: {
                  ...FHIR_CODES.UnitsOfMeasure.Year,
                  value: parseInt(formValues.yearInput[formValueName].year),
                },
              }))
        )

      // observationObject['observationBreastfeedingMaintenance'] =
      //   formValues.date &&
      //   formValues.date.BreastfeedingMaintenance &&
      //   new Observation({
      //     ...ObservationConstantValues,
      //     code: FemaleReproductiveHistory.include.BreastfeedingMaintenance.code,
      //     valueDateTime: formValues.date.BreastfeedingMaintenance,
      //   })
      /* #endregion */

      console.log(observationObject)
      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      const note = formValues.string.note &&
        formValues.string.note !== '' && [
          {
            authorReference: globalState.Practitioner.getReference(),
            time: getInstant(),
            text: formValues.string.note,
          },
        ]

      if (observationEntries.length === 0) {
        throw new Error('Observation entries is empty')
      }

      const femaleReproductiveHistoryList = new List({
        title: 'Reproductive History Of Female',
        code: FHIR_CODES.Lists.ReproductiveHistoryOfFemale,
        mode: 'working',
        status: 'current',
        note: formValues.string &&
          formValues.string.note &&
          formValues.string.note !== '' && [
            {
              authorReference: globalState.Practitioner.getReference(),
              time: getInstant(),
              text: formValues.string.note,
            },
          ],
        subject: patient.getReference(),
        date: getInstant(),
        source: globalState.Practitioner.getReference(),
        entry: observationEntries.map(entry => {
          return {
            item: { reference: entry.fullUrl },
          }
        }),
      })

      const femaleReproductiveHistoryListEntry = new BundleEntry(
        pushRequest({ newResource: femaleReproductiveHistoryList }, 'POST')
      )

      const listEntry = {
        ...anamnesisVitaeSections,
        ReproductiveHistoryOfFemale: {
          title: 'Reproductive History Of Female',
          entry: [femaleReproductiveHistoryListEntry],
          entries: [
            ...checkObservationEntries,
            ...observationEntries,
            // femaleReproductiveHistoryListEntry,
          ],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Reproductive History of Male  */
    *queryReproductiveHistoryOfMale({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      const { AnamnesisVitae } = FHIR_CODES
      const { MaleReproductiveHistory } = AnamnesisVitae.include
      const { ReproductiveHistoryOfMale } = FHIR_CODES.Lists

      if (!patient || !patient.id) {
        // throw new Error('patient.id is not defined')
        return
      }

      const requestPayload = {
        resourceType: 'List',
        code: `${ReproductiveHistoryOfMale.coding[0].system}|${ReproductiveHistoryOfMale.coding[0].code}`,
        patient: patient.id,
        _include: ['List:subject', 'List:item:Observation'],
        '_include:iterate': ['Observation:has-member'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))
      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientMaleReproductiveHistoryList = []

      resourceDictionary['List'].forEach(list => {
        const MaleReproductiveObject = {}

        list.entry.forEach(listEntry => {
          const observation = findByReference(
            resourceDictionary['Observation'],
            listEntry.item
          )

          observation.hasMember &&
            Object.keys(MaleReproductiveHistory.include).forEach(
              reproductiveItem => {
                if (
                  codeIntersects(
                    MaleReproductiveHistory.include[reproductiveItem].code,
                    observation.code
                  )
                ) {
                  const reproductiveValue = []

                  observation.hasMember.forEach(member => {
                    const memberObservation = findByReference(
                      resourceDictionary['Observation'],
                      member
                    )

                    Object.values(
                      MaleReproductiveHistory.include[reproductiveItem].include
                    ).forEach(v => {
                      console.log(v)
                      if (
                        v.code &&
                        memberObservation.code &&
                        codeIntersects(v.code, memberObservation.code)
                      ) {
                        reproductiveValue.push({
                          value: v,
                          text:
                            memberObservation.code.text !==
                              MaleReproductiveHistory.include[reproductiveItem]
                                .include.Other.code.coding[0].text &&
                            memberObservation.code.text,
                        })
                      }
                    })
                  })

                  MaleReproductiveObject[reproductiveItem] = {
                    designation:
                      MaleReproductiveHistory.include[reproductiveItem]
                        .designation,
                    value: reproductiveValue,
                  }
                }
              }
            )
        })

        if (!!list.note) {
          MaleReproductiveObject['AdditionalInformation'] = {
            designation: [
              {
                language: 'en',
                value: 'Additional information',
              },
              {
                language: 'mn',
                value: 'Нэмэлт мэдээлэл',
              },
            ],
            value: list.note.map(v => v.text),
          }
        }

        patientMaleReproductiveHistoryList.push(MaleReproductiveObject)
      })

      return patientMaleReproductiveHistoryList
    },

    *reproductiveHistoryOfMaleAdd({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES } = globalState
      const { patient, anamnesisVitaeSections } = localState
      const { formValues } = payload

      const { MaleReproductiveHistory } = FHIR_CODES.AnamnesisVitae.include
      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const observationEntries = []
      const checkObservationEntries = []
      const observationObject = {}

      if (!formValues) {
        return
      }

      // console.log(formValues)
      formValues.check &&
        Object.keys(formValues.check).forEach(formValueName => {
          let checkObservationEntry

          const hasMember = []

          formValues.check[formValueName] &&
            Object.values(formValues.check[formValueName]).forEach(item => {
              const observation =
                item &&
                new Observation({
                  ...ObservationConstantValues,
                  code: item.code,
                })

              checkObservationEntry =
                observation &&
                new BundleEntry(
                  pushRequest({ newResource: observation }, 'POST')
                )

              hasMember.push({
                reference: checkObservationEntry.fullUrl,
              })

              checkObservationEntries.push(checkObservationEntry)
            })

          if (hasMember.length > 0) {
            observationObject['observation' + formValueName] = new Observation({
              ...ObservationConstantValues,
              code: MaleReproductiveHistory.include[formValueName].code,
              hasMember: hasMember,
            })
          }
        })

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      const maleReproductiveHistoryList = new List({
        mode: 'working',
        status: 'current',
        date: getInstant(),
        subject: patient.getReference(),
        title: 'Reproductive History Of Male',
        source: globalState.Practitioner.getReference(),
        code: FHIR_CODES.Lists.ReproductiveHistoryOfMale,
        note: formValues.string &&
          formValues.string.note &&
          formValues.string.note !== '' && [
            {
              authorReference: globalState.Practitioner.getReference(),
              time: getInstant(),
              text: formValues.string.note,
            },
          ],
        entry: observationEntries.map(entry => {
          return {
            item: { reference: entry.fullUrl },
          }
        }),
      })

      const maleReproductiveHistoryListEntry = new BundleEntry(
        pushRequest({ newResource: maleReproductiveHistoryList }, 'POST')
      )

      const listEntry = {
        ...anamnesisVitaeSections,
        ReproductiveHistoryOfMale: {
          title: 'Reproductive History Of Male',
          entry: [maleReproductiveHistoryListEntry],
          entries: [
            ...checkObservationEntries,
            ...observationEntries,
            // maleReproductiveHistoryListEntry,
          ],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  History of Clinical Find  */
    *queryHistoryOfClinicalFind({ payload }, { select, call, put }) {
      console.log('QUERYING HISTORY OF CLINICAL FINDING')
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      const { AnamnesisVitae } = FHIR_CODES
      const { HistoryOfClinicalFindingInSubject } = AnamnesisVitae.include

      const {
        ChronicDisease,
        AccidentalEvent,
        AccidentalEventBoolean,
        PastHistoryOfProcedure,
        HistoryOfInfectiousDisease,
        ProcedureComplication,
      } = HistoryOfClinicalFindingInSubject.include

      if (!patient || !patient.id) {
        // throw new Error('patient.id is not defined')
        return
      }

      const HistoryOfClinicalFindingCode =
        HistoryOfClinicalFindingInSubject.code.coding[0]

      const requestPayload = {
        resourceType: 'List',
        code: `${HistoryOfClinicalFindingCode.system}|${HistoryOfClinicalFindingCode.code}`,
        patient: patient.id,
        _include: [
          'List:subject',
          'List:item:List',
          'List:item:Procedure',
          'List:item:Observation',
        ],
        '_include:iterate': ['List:item:Condition'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      console.log(response)
      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const historyOfClinicalFindingList = []

      resourceDictionary['List'].forEach(list => {
        if (
          list.code &&
          codeIntersects(list.code, FHIR_CODES.Lists.HistoryOfClinicalFinding)
        ) {
          historyOfClinicalFindingList.push(list)
        }
      })

      console.log('resource dictionary', resourceDictionary)

      const patientHistoryOfClinicalFindingList = []

      if (!!historyOfClinicalFindingList) {
        historyOfClinicalFindingList.forEach(clinicalList => {
          let chronicDiseaseList
          let accidentalEventList
          let historyOfInfectiousDiseaseList
          let observationAccidental
          let observationProcedure

          const patientAccidental = {}

          const patientHistoryOfInfectiousDisease = {}
          const patientChronicDisease = {}
          const patientClinicalFinding = {}

          clinicalList.entry.forEach(entryItem => {
            const entryList = findByReference(resourceArray, entryItem.item)

            console.log(entryList)

            /* #region  Sorting section by using if statement */
            if (
              entryList.code &&
              codeIntersects(entryList.code, PastHistoryOfProcedure.code)
            ) {
              observationProcedure = entryList
            }

            if (
              entryList.code &&
              codeIntersects(
                entryList.code,
                FHIR_CODES.Lists.HistoryOfInfectiousDisease
              )
            ) {
              historyOfInfectiousDiseaseList = entryList
            }

            if (
              entryList.code &&
              codeIntersects(entryList.code, FHIR_CODES.Lists.ChronicDisease)
            ) {
              chronicDiseaseList = entryList
            }

            if (
              entryList.resourceType === 'List' &&
              entryList.code &&
              codeIntersects(entryList.code, FHIR_CODES.Lists.AccidentalEvent)
            ) {
              accidentalEventList = entryList
            }

            if (
              entryList.resourceType === 'Observation' &&
              entryList.code &&
              codeIntersects(
                entryList.code,
                HistoryOfClinicalFindingInSubject.include.AccidentalEventBoolean
                  .code
              )
            ) {
              observationAccidental = entryList
            }
            /* #endregion */
          })

          historyOfInfectiousDiseaseList &&
            historyOfInfectiousDiseaseList.entry.forEach(infectiousEntry => {
              const infectiousCondition = findByReference(
                resourceDictionary['Condition'],
                infectiousEntry && infectiousEntry.item
              )

              Object.keys(HistoryOfInfectiousDisease.include).forEach(
                infectiousValue => {
                  if (
                    codeIntersects(
                      HistoryOfInfectiousDisease.include[infectiousValue].code,
                      infectiousCondition.code
                    )
                  ) {
                    patientHistoryOfInfectiousDisease[infectiousValue] = {
                      value:
                        HistoryOfInfectiousDisease.include[infectiousValue],
                      text: infectiousCondition.code.text,
                    }
                  }
                }
              )
            })

          chronicDiseaseList &&
            chronicDiseaseList.entry.forEach(chronicEntry => {
              const chronicCondition = findByReference(
                resourceDictionary['Condition'],
                chronicEntry && chronicEntry.item
              )
              console.log(chronicCondition.code)
              Object.keys(ChronicDisease.include).forEach(chronicValue => {
                if (
                  codeIntersects(
                    ChronicDisease.include[chronicValue].code,
                    chronicCondition.code
                  )
                ) {
                  patientChronicDisease[chronicValue] = {
                    value: ChronicDisease.include[chronicValue],
                    text: chronicCondition.code.text,
                  }
                }
              })
            })

          accidentalEventList &&
            accidentalEventList.entry.forEach(accidentalEntry => {
              const accidentalCondition = findByReference(
                resourceDictionary['Condition'],
                accidentalEntry && accidentalEntry.item
              )
              Object.keys(AccidentalEvent.include).forEach(accidentalValue => {
                if (
                  codeIntersects(
                    AccidentalEvent.include[accidentalValue].code,
                    accidentalCondition.code
                  )
                ) {
                  patientAccidental[accidentalValue] = {
                    value: AccidentalEvent.include[accidentalValue],
                    text: accidentalCondition.code.text,
                  }
                }
              })
            })
          // console.log(observationAccidental)

          patientClinicalFinding[
            'historyOfInfectiousDisease'
          ] = patientHistoryOfInfectiousDisease && {
            designation: HistoryOfInfectiousDisease.designation,
            value: patientHistoryOfInfectiousDisease,
          }
          patientClinicalFinding[
            'pastHistoryOfProcedure'
          ] = observationProcedure && {
            designation: PastHistoryOfProcedure.designation,
            value: observationProcedure.valueBoolean,
          }
          patientClinicalFinding['chronicDisease'] = patientChronicDisease && {
            designation: ChronicDisease.designation,
            value: patientChronicDisease,
          }
          patientClinicalFinding[
            'patientAccidentalBoolean'
          ] = observationAccidental && {
            designation: AccidentalEventBoolean.designation,
            value: observationAccidental.valueBoolean,
          }
          patientClinicalFinding[
            'patientAccidentalEvent'
          ] = patientAccidental && {
            designation: AccidentalEvent.designation,
            value: patientAccidental,
          }

          if (!!clinicalList.note) {
            patientClinicalFinding['AdditionalInformation'] = {
              designation: NOTE_DESIGNATION,
              value: clinicalList.note.map(v => v.text),
            }
          }

          patientHistoryOfClinicalFindingList.push(patientClinicalFinding)
        })
      }

      const dataSource = []
      const icd9codeList = []

      resourceDictionary['Procedure'] &&
        resourceDictionary['Procedure'].forEach(procedure => {
          let complicationValue
          let complicationDetail

          const observationComplication =
            procedure.complication && procedure.complication.find(v => v.coding)

          if (
            observationComplication &&
            codeIntersects(
              observationComplication,
              ProcedureComplication.include.ComplicationOfProcedure.code
            )
          ) {
            complicationValue = true

            if (
              !(
                observationComplication.text ===
                ProcedureComplication.include.ComplicationOfProcedure.code.text
              )
            ) {
              complicationDetail = observationComplication.text
            }
          } else if (
            observationComplication &&
            codeIntersects(
              observationComplication,
              ProcedureComplication.include.NoComplicationProcedure.code
            )
          ) {
            complicationValue = false
          }

          const date = procedure.performedDateTime

          procedure.code && icd9codeList.push(procedure.code.toJSON())

          dataSource.push({
            date: toLocalDateTime(date, 'yyyy-mm-dd'),
            code: procedure.code,
            complication: complicationValue !== undefined && complicationValue,
            complicationDetail: complicationDetail,
            note: procedure.note,
          })
        })

      const icd9codeListResponse = yield call(queryExternalAPI, {
        api: 'ICD-9',
        data: {
          list: icd9codeList,
          type: 'list',
        },
      })

      console.log(icd9codeListResponse.data, icd9codeList)
      icd9codeList.forEach((icd9CodeItem, index) => {
        dataSource[index][
          'codeInfo'
        ] = icd9codeListResponse.data.find(responseValue =>
          codeIntersects(responseValue.code, icd9CodeItem)
        )
      })

      return {
        procedureValues: dataSource,
        otherValues: patientHistoryOfClinicalFindingList,
      }

      // console.log(patientHistoryOfClinicalFindingList)
    },

    *historyOfClinicalFindAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient, anamnesisVitaeSections } = localState
      const { AnamnesisVitae } = FHIR_CODES
      const { HistoryOfClinicalFindingInSubject } = AnamnesisVitae.include
      const { formValues } = payload

      console.log('form values', formValues)

      const conditionConstantValues = {
        identifier: {
          ...FHIR_CODES.Identifiers.Conditions,
          value: generateUuid(),
        },
        clinicalStatus: FHIR_CODES.ConditionStatuses.ClinicalStatusActive,
        subject: patient.getReference(),
        recordedDate: getInstant(),
        recorder: Practitioner.getReference(),
        asserter: Practitioner.getReference(),
      }

      const listConstantValues = {
        mode: 'working',
        status: 'current',
        date: getInstant(),
        subject: patient.getReference(),
        source: Practitioner.getReference(),
      }

      const {
        ChronicDisease,
        AccidentalEvent,
        PastHistoryOfProcedure,
        HistoryOfInfectiousDisease,
      } = formValues

      const {
        ProcedureComplication,
        AccidentalEventBoolean,
      } = HistoryOfClinicalFindingInSubject.include

      // Энэ хэсэг мэс ажилбарыг хасаад үүсгэх хэрэгтэй 3 subList, 1 observation, 1 main list ирж байгаа
      // бүгд өөрийн гэсэн condition entries, bundle Entries тэй байх юм бол код дээр
      // ажиллах илүү хялбар болж байгаа. (google doc file дээр condition үүсгэн түүгээрээ List үүсгэх хэрэгтэйг харж болно)

      const clinicalFindingBundleEntries = []
      const infectiousDiseaseConditionEntries = []
      const infectiousDiseaseBundleEntries = []
      const chronicDiseaseConditionEntries = []
      const chronicDiseaseBundleEntries = []
      const accidentalEventConditionEntries = []
      const accidentalEventBundleEntries = []

      /* #region  Infectious Disease */
      HistoryOfInfectiousDisease &&
        Object.keys(HistoryOfInfectiousDisease).forEach(
          infectiousDiseaseValue => {
            const condition = new Condition({
              ...conditionConstantValues,
              category: [FHIR_CODES.Categories.HistoryOfInfectiousDisease],
              code: HistoryOfInfectiousDisease[infectiousDiseaseValue].code,
            })

            const bundleEntry = new BundleEntry(
              pushRequest({ newResource: condition }, 'POST')
            )

            infectiousDiseaseConditionEntries.push(bundleEntry)
            infectiousDiseaseBundleEntries.push(bundleEntry)
          }
        )

      // эхний ээлжинд давталт ашиглан ирсэн checkbox - ийн утга бүрээр condition үүсгэж дараа нь
      // bundle болгож байгаа. үүссэн condition бүр өөрийн нэрний хүснэгтний элемент болон орж байгаа
      // conditionEntries ийн ашиглан List ээ үүсгэнэ үүсгэсэн List уу bundle болгон хувиргана
      // үүсэж буй bundle бүр мөн нэг хүснэгтэнд элемент болж орно

      if (infectiousDiseaseConditionEntries.length > 0) {
        const infectiousDiseaseList = new List({
          ...listConstantValues,
          title: 'History Of Infectious Disease',
          code: FHIR_CODES.Lists.HistoryOfInfectiousDisease,
          entry: infectiousDiseaseConditionEntries.map(entry => {
            return {
              item: { reference: entry.fullUrl },
            }
          }),
        })

        const infectiousDiseaseListBundleEntry = new BundleEntry(
          pushRequest({ newResource: infectiousDiseaseList }, 'POST')
        )

        clinicalFindingBundleEntries.push(infectiousDiseaseListBundleEntry)
      }

      /* #endregion */

      /* #region  Chronic Disease */
      ChronicDisease &&
        Object.keys(ChronicDisease).forEach(chroniceDiseaseValue => {
          const condition = new Condition({
            ...conditionConstantValues,
            category: [FHIR_CODES.Categories.HistoryOfInfectiousDisease],
            code: ChronicDisease[chroniceDiseaseValue].code,
          })

          const bundleEntry = new BundleEntry(
            pushRequest({ newResource: condition }, 'POST')
          )

          chronicDiseaseConditionEntries.push(bundleEntry)
          chronicDiseaseBundleEntries.push(bundleEntry)
        })

      if (chronicDiseaseConditionEntries.length > 0) {
        const chronicDiseaseList = new List({
          ...listConstantValues,
          title: 'History Of Infectious Disease',
          code: FHIR_CODES.Lists.ChronicDisease,
          entry: chronicDiseaseConditionEntries.map(entry => {
            return {
              item: { reference: entry.fullUrl },
            }
          }),
        })

        const chronicDiseaseListBundleEntry = new BundleEntry(
          pushRequest({ newResource: chronicDiseaseList }, 'POST')
        )

        clinicalFindingBundleEntries.push(chronicDiseaseListBundleEntry)
      }
      /* #endregion */

      /* #region  Accidental Event */
      AccidentalEvent &&
        AccidentalEvent.boolean !== undefined &&
        AccidentalEvent.checkbox &&
        Object.keys(AccidentalEvent.checkbox).forEach(accidentalEventValue => {
          const condition = new Condition({
            ...conditionConstantValues,
            category: [FHIR_CODES.Categories.AccidentalEvent],
            code: AccidentalEvent.checkbox[accidentalEventValue].code,
          })

          const bundleEntry = new BundleEntry(
            pushRequest({ newResource: condition }, 'POST')
          )

          accidentalEventConditionEntries.push(bundleEntry)
          accidentalEventBundleEntries.push(bundleEntry)
        })

      if (accidentalEventConditionEntries.length > 0) {
        const accidentalEventList = new List({
          ...listConstantValues,
          title: 'Accidental Event',
          code: FHIR_CODES.Lists.AccidentalEvent,
          entry: accidentalEventConditionEntries.map(entry => {
            return {
              item: { reference: entry.fullUrl },
            }
          }),
        })

        const accidentalEventListBundleEntry = new BundleEntry(
          pushRequest({ newResource: accidentalEventList }, 'POST')
        )

        clinicalFindingBundleEntries.push(accidentalEventListBundleEntry)
      }

      /* #endregion */

      if (!!AccidentalEvent && !isEmptyObject(AccidentalEvent)) {
        const accidentalEventObservation = new Observation({
          status: 'final',
          subject: patient.getReference(),
          issued: getInstant(),
          code: AccidentalEventBoolean.code,
          valueBoolean: AccidentalEvent.boolean,
        })

        clinicalFindingBundleEntries.push(
          new BundleEntry(
            pushRequest({ newResource: accidentalEventObservation }, 'POST')
          )
        )
      }

      let observationProcedureEntry
      let procedureEntry
      /* #region  Past History Of Procedure */
      if (PastHistoryOfProcedure !== undefined) {
        if (!PastHistoryOfProcedure) {
          observationProcedureEntry = new Observation({
            status: 'final',
            subject: patient.getReference(),
            issued: getInstant(),
            code:
              HistoryOfClinicalFindingInSubject.include.PastHistoryOfProcedure
                .code,
            valueBoolean: false,
          })
        } else {
          if (PastHistoryOfProcedure.procedureCode) {
            const {
              complication,
              procedureCode,
              performedDateTime,
              complicationDetail,
            } = PastHistoryOfProcedure

            const complicationValue = complication
              ? {
                  coding:
                    ProcedureComplication.include.ComplicationOfProcedure.code
                      .coding,
                  text: complicationDetail
                    ? complicationDetail
                    : ProcedureComplication.include.ComplicationOfProcedure.code
                        .text,
                }
              : {
                  coding:
                    ProcedureComplication.include.NoComplicationProcedure.code
                      .coding,
                  text: complicationDetail
                    ? complicationDetail
                    : ProcedureComplication.include.NoComplicationProcedure.code
                        .text,
                }

            observationProcedureEntry = new Observation({
              status: 'final',
              subject: patient.getReference(),
              issued: getInstant(),
              code:
                HistoryOfClinicalFindingInSubject.include.PastHistoryOfProcedure
                  .code,
              valueBoolean: true,
            })

            procedureEntry = pushRequest(
              {
                newResource: {
                  resourceType: 'Procedure',
                  status: 'completed',
                  code: procedureCode.code,
                  complication: [complicationValue],
                  performedDateTime: performedDateTime,
                  subject: patient.getReference(),
                  recorder: Practitioner.getReference(),
                },
              },
              'POST'
            )

            procedureEntry && clinicalFindingBundleEntries.push(procedureEntry)
          }
        }
      }

      observationProcedureEntry &&
        clinicalFindingBundleEntries.push(
          new BundleEntry(
            pushRequest({ newResource: observationProcedureEntry }, 'POST')
          )
        )

      /* #endregion */

      const historyOfClinicalFindingList = new List({
        ...listConstantValues,
        title: 'History Of Clinical Finding',
        code: HistoryOfClinicalFindingInSubject.code,
        note: formValues.note &&
          formValues.note !== '' && [
            {
              authorReference: Practitioner.getReference(),
              time: getInstant(),
              text: formValues.note,
            },
          ],
        entry: clinicalFindingBundleEntries.map(entry => {
          return {
            item: { reference: entry.fullUrl },
          }
        }),
      })

      const historyOfClinicalFindingListEntry = new BundleEntry(
        pushRequest({ newResource: historyOfClinicalFindingList }, 'POST')
      )

      const transactionEntries = [
        ...clinicalFindingBundleEntries,
        ...infectiousDiseaseBundleEntries,
        ...chronicDiseaseBundleEntries,
        ...accidentalEventBundleEntries,
        historyOfClinicalFindingListEntry,
      ]

      const bundle = new Bundle({
        type: 'transaction',
        entry: transactionEntries,
      })

      const listEntry = {
        ...anamnesisVitaeSections,
        HistoryOfClinicalFind: {
          title: 'History Of Clinical Find',
          entry: [historyOfClinicalFindingListEntry],
          entries: [
            ...clinicalFindingBundleEntries,
            ...infectiousDiseaseBundleEntries,
            ...chronicDiseaseBundleEntries,
            ...accidentalEventBundleEntries,
            // historyOfClinicalFindingListEntry,
          ],
        },
      }

      console.log('LIST ENTRIES', listEntry)

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Epidemiological Anamnesis  */
    *queryEpidemiologicalAnamnesis({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      const { AnamnesisVitae } = FHIR_CODES
      const { EpidemiologicalAnamnesis } = AnamnesisVitae.include

      const {
        ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths,
        TravelAbroad,
        TravelDestination,
        TravelLength,
        Transfusion,
        PerformedDateTime,
      } = EpidemiologicalAnamnesis.include

      if (!patient || !patient.id) {
        throw new Error('patient.id is not defined')
      }

      const requestPayload = {
        resourceType: 'List',
        code: `${FHIR_CODES.Lists.EpidemiologicalAnamnesis.coding[0].system}|${FHIR_CODES.Lists.EpidemiologicalAnamnesis.coding[0].code}`,
        patient: patient.id,
        _include: ['List:subject', 'List:item:Observation'],
        '_include:iterate': ['List:item:Procedure'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const epidemiologicalAnamnesisList = []

      // console.log(resourceDictionary)
      resourceDictionary['List'].forEach(list => {
        if (
          list.code &&
          codeIntersects(list.code, FHIR_CODES.Lists.EpidemiologicalAnamnesis)
        ) {
          epidemiologicalAnamnesisList.push(list)
        }
      })

      const patientEpidemiologicalAnamnesisList = []

      if (!!epidemiologicalAnamnesisList) {
        epidemiologicalAnamnesisList.forEach(epidemiologicalEntry => {
          const epidemiologicalAnamnesisObject = {}

          epidemiologicalEntry.entry.forEach(entryItem => {
            const entryList = findByReference(resourceArray, entryItem.item)

            // console.log('entry list', entryList)

            if (
              entryList.code &&
              codeIntersects(
                entryList.code,
                ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths.code
              )
            ) {
              epidemiologicalAnamnesisObject[
                'ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths'
              ] = {
                designation:
                  ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths.designation,
                value: entryList.valueBoolean,
              }
            }

            if (
              entryList.code &&
              codeIntersects(entryList.code, TravelAbroad.code)
            ) {
              // console.log('entry list item travel abroad', entryList)

              if (!!entryList.component) {
                epidemiologicalAnamnesisObject['TravelAbroad'] = {
                  designation: TravelAbroad.designation,
                  value: entryList.valueBoolean,
                }
                entryList.component.forEach(v => {
                  if (codeIntersects(v.code, TravelDestination.code)) {
                    epidemiologicalAnamnesisObject['TravelDestination'] = {
                      designation: TravelDestination.designation,
                      value: v.valueString,
                    }
                  }
                  if (codeIntersects(v.code, TravelLength.code)) {
                    epidemiologicalAnamnesisObject['TravelLength'] = {
                      designation: TravelLength.designation,
                      value: v.valueString,
                    }
                  }
                })
              } else {
                epidemiologicalAnamnesisObject['TravelAbroad'] = {
                  designation: TravelAbroad.designation,
                  value: entryList.valueBoolean,
                }
              }
            }

            if (
              entryList.code &&
              entryList.resourceType === 'Observation' &&
              codeIntersects(entryList.code, Transfusion.code)
            ) {
              // console.log(entryList.valueBoolean)
              epidemiologicalAnamnesisObject['Transfusion'] = {
                designation: Transfusion.designation,
                value: entryList.valueBoolean,
              }
            }

            if (
              entryList.code &&
              entryList.resourceType === 'Procedure' &&
              codeIntersects(entryList.code, PerformedDateTime.code)
            ) {
              epidemiologicalAnamnesisObject['PerformedDateTime'] = {
                designation: PerformedDateTime.designation,
                value: entryList.performedDateTime,
              }
            }
          })

          patientEpidemiologicalAnamnesisList.push(
            epidemiologicalAnamnesisObject
          )
        })
      }

      // console.log(patientEpidemiologicalAnamnesisList)
      return patientEpidemiologicalAnamnesisList
    },

    *epidemiologicalAnamnesisAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient, anamnesisVitaeSections } = localState
      const { AnamnesisVitae } = FHIR_CODES
      const { EpidemiologicalAnamnesis } = AnamnesisVitae.include
      const {
        ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths,
        TravelAbroad,
        TravelDestination,
        TravelLength,
        Transfusion,
        PerformedDateTime,
      } = EpidemiologicalAnamnesis.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const { formValues } = payload
      console.log(formValues)

      const observationEntries = []
      const observationObject = {}

      if (
        !(
          formValues.ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths ===
          undefined
        )
      ) {
        observationObject[
          'observationContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths'
        ] = new Observation({
          ...ObservationConstantValues,
          code:
            ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths.code,
          valueBoolean:
            formValues.ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths,
        })
      }

      observationObject['observationTransfusion'] =
        formValues.transfusion &&
        typeof formValues.transfusion.Transfusion === 'boolean' &&
        new Observation({
          ...ObservationConstantValues,
          code: Transfusion.code,
          valueBoolean: formValues.transfusion.Transfusion,
        })

      observationObject['observationPerformedDateTime'] =
        formValues.transfusion &&
        formValues.transfusion.PerformedDateTime &&
        new Procedure({
          status: 'final',
          subject: patient.getReference(),
          issued: getInstant(),
          code: PerformedDateTime.code,
          performedDateTime: formValues.transfusion.PerformedDateTime,
        })

      const travelAbroadComponent = []

      formValues &&
        formValues.travelAbroad &&
        formValues.travelAbroad.TravelDestination &&
        travelAbroadComponent.push({
          code: TravelDestination.code,
          valueString: formValues.travelAbroad.TravelDestination,
        })

      formValues &&
        formValues.travelAbroad &&
        formValues.travelAbroad.TravelLength &&
        travelAbroadComponent.push({
          code: TravelLength.code,
          valueString: formValues.travelAbroad.TravelLength,
        })

      if (!(formValues.travelAbroad === undefined)) {
        observationObject['observationTravelAbroad'] = new Observation({
          ...ObservationConstantValues,
          code: TravelAbroad.code,
          valueBoolean: formValues.travelAbroad.TravelAbroad,
          component:
            travelAbroadComponent.length > 0
              ? travelAbroadComponent
              : undefined,
        })
      }

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      const epidemiologicalAnamnesisList = new List({
        title: 'Epidemiological Anamnesis',
        code: FHIR_CODES.Lists.EpidemiologicalAnamnesis,
        status: 'current',
        mode: 'working',
        subject: patient.getReference(),
        date: getInstant(),
        source: Practitioner.getReference(),
        entry: observationEntries.map(entry => {
          return {
            item: { reference: entry.fullUrl },
          }
        }),
      })

      const epidemiologicalAnamnesisListEntry = new BundleEntry(
        pushRequest({ newResource: epidemiologicalAnamnesisList }, 'POST')
      )

      const listEntry = {
        ...anamnesisVitaeSections,
        EpidemiologicalAnamnesis: {
          title: 'Epidemiological Anamnesis',
          entry: [epidemiologicalAnamnesisListEntry],
          entries: [
            ...observationEntries,
            // epidemiologicalAnamnesisListEntry
          ],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Family Member History  */
    *queryFamilyMemberHistory({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      const { FamilyMemberHistory } = FHIR_CODES.AnamnesisVitae.include

      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'FamilyMemberHistory',
        patient: patient.id,
      }

      const response = yield call(readResource, requestPayload)

      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientFamilyMemberHistoryList = []

      resourceDictionary.FamilyMemberHistory.forEach(memberHistoryItem => {
        const memberHistoryObject = {}

        if (!!memberHistoryItem.condition) {
          memberHistoryObject['diagnosis'] = getDisplayOfCodeAbleConcept(
            memberHistoryItem.condition.find(v => v.code)
          )

          memberHistoryObject['onsetAge'] =
            memberHistoryItem.condition.find(v => v.onsetAge) &&
            memberHistoryItem.condition.find(v => v.onsetAge).onsetAge.value
        }

        memberHistoryObject['familyMember'] = Object.values(
          FamilyMemberHistory
        ).find(v => codeIntersects(v.code, memberHistoryItem.relationship))

        memberHistoryObject['note'] =
          memberHistoryItem.note &&
          memberHistoryItem.note.map(noteItem => noteItem.text)

        patientFamilyMemberHistoryList.push(memberHistoryObject)
      })

      if (!!patientFamilyMemberHistoryList) {
        return patientFamilyMemberHistoryList
      }
    },

    *familyMemberHistoryAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient, anamnesisVitaeSections } = localState
      const { formValues } = payload

      const familyMemberEntries = []

      Object.keys(formValues).forEach(formValue => {
        const condition = formValues[formValue].diagnosis && [
          {
            code: formValues[formValue].diagnosis,
            onsetAge: formValues[formValue].onSetAge && {
              ...FHIR_CODES.UnitsOfMeasure.Year,
              value: parseInt(formValues[formValue].onSetAge),
            },
          },
        ]

        const note = formValues[formValue].note &&
          formValues[formValue].note !== '' && [
            {
              authorReference: Practitioner.getReference(),
              time: getInstant(),
              text: formValues[formValue].note,
            },
          ]

        const familyMember =
          formValues[formValue].familyMember &&
          new FamilyMemberHistory({
            status: 'completed',
            note,
            condition,
            date: getInstant(),
            patient: patient.getReference(),
            relationship:
              formValues[formValue].familyMember &&
              formValues[formValue].familyMember.code,
          })

        familyMemberEntries.push(
          new BundleEntry(pushRequest({ newResource: familyMember }, 'POST'))
        )
      })

      console.log(familyMemberEntries)

      const listEntry = {
        ...anamnesisVitaeSections,
        FamilyMemberHistory: {
          title: 'Family Member History',
          entry: [...familyMemberEntries],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Allergy Intolerance */
    *queryAllergicIntolerance({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      const { AllergyIntolerance } = FHIR_CODES.AnamnesisVitae.include

      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'AllergyIntolerance',
        patient: patient.id,
        _include: ['AllergyIntolerance:recorder'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      console.log('resource dictionary', resourceDictionary)

      const patientAllergyIntoleranceList = {}

      resourceDictionary.AllergyIntolerance.forEach(allergyIntoleranceItem => {
        // allergyIntolerance['recordedDate'] =
        //   allergyIntoleranceItem.recordedDate &&
        //   toLocalDateTime(
        //     allergyIntoleranceItem.recordedDate,
        //     'yyyy-mm-dd'
        //   )

        // const practitioner = findByReference(
        //   resourceDictionary['Practitioner'],
        //   allergyIntoleranceItem.recorder
        // )

        // allergyintolerance['asserter'] = practitioner.getOfficialNameString({
        //   short: true,
        // })

        // if (!!allergyIntoleranceItem.code.coding) {
        //   allergyIntolerance['allergy'] = Object.values(
        //     AllergyIntolerance
        //   ).find(v => codeIntersects(v.code, allergyIntoleranceItem.code))
        // } else {
        //   allergyIntolerance['allergyNote'] = allergyIntoleranceItem.code.text
        // }

        // asserter name section
        // const practitioner = findByReference(
        //   resourceDictionary['Practitioner'],
        //   allergyIntoleranceItem.recorder
        // )

        const recordedDate =
          allergyIntoleranceItem.recordedDate &&
          toLocalDateTime(allergyIntoleranceItem.recordedDate, 'yyyy-mm-dd')

        if (Object.keys(patientAllergyIntoleranceList).includes(recordedDate)) {
          const allergy = Object.values(AllergyIntolerance).find(v =>
            codeIntersects(v.code, allergyIntoleranceItem.code)
          )

          patientAllergyIntoleranceList[recordedDate].push(
            allergy ? allergy : allergyIntoleranceItem.code.text
          )
        } else {
          patientAllergyIntoleranceList[recordedDate] = []

          const allergy = Object.values(AllergyIntolerance).find(v =>
            codeIntersects(v.code, allergyIntoleranceItem.code)
          )

          patientAllergyIntoleranceList[recordedDate].push(
            allergy ? allergy : allergyIntoleranceItem.code.text
          )
        }
      })

      console.log(patientAllergyIntoleranceList)

      if (!!patientAllergyIntoleranceList) {
        return patientAllergyIntoleranceList
      }
    },

    *allergicIntoleranceAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { formValues } = payload
      const { patient, anamnesisVitaeSections } = localState
      console.log(formValues)

      const allergyIntoleranceConstants = {
        clinicalStatus:
          FHIR_CODES.AllergyIntolerance.ClinicalStatus.ClinicalStatusActive,
        verificationStatus:
          FHIR_CODES.AllergyIntolerance.VerificationStatus
            .VerificationStatusConfirmed,
        patient: patient.getReference(),
        recordedDate: getInstant(),
        recorder: Practitioner.getReference(),
      }

      const allergyIntoleranceEntries = []

      formValues.allergy &&
        formValues.allergy.forEach(allergyValue => {
          const allergyIntolerance =
            allergyValue &&
            new AllergyIntolerance({
              ...allergyIntoleranceConstants,
              code: allergyValue.code,
              category: [allergyValue.category],
            })

          const allergyEntry = new BundleEntry(
            pushRequest({ newResource: allergyIntolerance }, 'POST')
          )

          allergyIntoleranceEntries.push(allergyEntry)
        })

      const allergyNoteIntolerance =
        formValues.allergyNote &&
        new AllergyIntolerance({
          ...allergyIntoleranceConstants,
          code: {
            text: formValues.allergyNote,
          },
        })

      if (!!allergyNoteIntolerance) {
        const allergyNoteEntry = new BundleEntry(
          pushRequest({ newResource: allergyNoteIntolerance }, 'POST')
        )

        allergyIntoleranceEntries.push(allergyNoteEntry)
      }

      const listEntry = {
        ...anamnesisVitaeSections,
        AllergyIntolerance: {
          title: 'Allergy Intolerance',
          entry: [...allergyIntoleranceEntries],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Abuse habits */
    *querySmokingDrinkingSubstanceAbuseHabits(
      { payload },
      { select, call, put }
    ) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const abuseHabitsInclude =
        FHIR_CODES.AnamnesisVitae.include.SmokingDrinkingSubstanceAbuseHabits
          .include

      const abuseHabitsCode =
        FHIR_CODES.Lists.SmokingDrinkingSubstanceAbuseHabitsAnamnesis
      const requestPayload = {
        resourceType: 'List',
        code: `${abuseHabitsCode.coding[0].system}|${abuseHabitsCode.coding[0].code}`,
        patient: patient.id,
        _include: ['List:subject', 'List:item:Observation'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        return
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const smokingDrinkingSubstanceAbuseHabitsList = []

      resourceDictionary['List'].forEach(list =>
        list.code && codeIntersects(list.code, abuseHabitsCode)
          ? smokingDrinkingSubstanceAbuseHabitsList.push(list)
          : ''
      )

      const patientAbuseHabitsList = []

      if (smokingDrinkingSubstanceAbuseHabitsList.length > 0) {
        smokingDrinkingSubstanceAbuseHabitsList.forEach(list => {
          const SmokingDrinkingSubstanceAbuseObject = {}

          list.entry.forEach(listEntry => {
            const observation = findByReference(
              resourceDictionary['Observation'],
              listEntry.item
            )

            if (!observation.code) {
              return
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.FindingRelatingToAlcoholDrinkingBehavior.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject[
                'FindingRelatingToAlcoholDrinkingBehavior'
              ] = {
                designation:
                  abuseHabitsInclude.FindingRelatingToAlcoholDrinkingBehavior
                    .designation,
                value: Object.values(
                  abuseHabitsInclude.FindingRelatingToAlcoholDrinkingBehavior
                    .include
                ).find(v =>
                  codeIntersects(v.code, observation.valueCodeableConcept)
                ),
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.AlcoholIntake.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject['AlcoholIntake'] = {
                designation: abuseHabitsInclude.AlcoholIntake.designation,
                value: observation.valueRatio.numerator.value,
                valueType: observation.valueRatio.numerator.unit,
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.DateOfLastAlcoholIntake.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject['DateOfLastAlcoholIntake'] = {
                designation:
                  abuseHabitsInclude.DateOfLastAlcoholIntake.designation,
                value: toLocalDateTime(observation.valueDateTime, 'yyyy-mm-dd'),
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.DateOfStartedDrinkingAlcohol.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject[
                'DateOfStartedDrinkingAlcohol'
              ] = {
                designation:
                  abuseHabitsInclude.DateOfStartedDrinkingAlcohol.designation,
                value: observation.valuePeriod.start,
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.LengthOfAlcoholUsingPeriod.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject[
                'LengthOfAlcoholUsingPeriod'
              ] = {
                designation:
                  abuseHabitsInclude.LengthOfAlcoholUsingPeriod.designation,
                value: observation.valueQuantity.value,
                valueType:
                  observation.valueQuantity.code ===
                  FHIR_CODES.UnitsOfMeasure.MilliSecond.code
                    ? 'MilliSeconds'
                    : '',
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.FindingOfTobaccoUseAndExposure.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject[
                'FindingOfTobaccoUseAndExposure'
              ] = {
                designation:
                  abuseHabitsInclude.FindingOfTobaccoUseAndExposure.designation,
                value: Object.values(
                  abuseHabitsInclude.FindingOfTobaccoUseAndExposure.include
                ).find(v =>
                  codeIntersects(v.code, observation.valueCodeableConcept)
                ),
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.AgeAtStartingSmoking.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject['AgeAtStartingSmoking'] = {
                designation:
                  abuseHabitsInclude.AgeAtStartingSmoking.designation,
                value: observation.valueInteger,
                valueType: 'Age',
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.NumberOfYearsSmoking.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject['NumberOfYearsSmoking'] = {
                designation:
                  abuseHabitsInclude.NumberOfYearsSmoking.designation,
                value: observation.valueInteger,
                valueType: 'Years',
              }
            }

            if (
              codeIntersects(
                observation.code,
                abuseHabitsInclude.NumberOfCigarettes.code
              )
            ) {
              SmokingDrinkingSubstanceAbuseObject['NumberOfCigarettes'] = {
                designation: abuseHabitsInclude.NumberOfCigarettes.designation,
                value: observation.valueRatio.numerator.value,
                valueType: observation.valueRatio.numerator.unit,
              }
            }
          })

          SmokingDrinkingSubstanceAbuseObject &&
            patientAbuseHabitsList.push(SmokingDrinkingSubstanceAbuseObject)
        })
      }

      if (patientAbuseHabitsList.length > 0) {
        return patientAbuseHabitsList
      }
    },

    *smokingDrinkingSubstanceAbuseHabitsAdd(
      { payload },
      { select, call, put }
    ) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { formValues } = payload
      const { patient, anamnesisVitaeSections } = localState

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const abuseHabits =
        FHIR_CODES.AnamnesisVitae.include.SmokingDrinkingSubstanceAbuseHabits

      const observationEntries = []
      const observationObject = {}

      console.log('abuse habits form values', formValues)

      if (!!formValues.relatingAlcoholHabit) {
        observationObject['observationFindingRelatingToAlcohol'] =
          formValues.relatingAlcoholHabit
            .FindingRelatingToAlcoholDrinkingBehavior &&
          new Observation({
            ...ObservationConstantValues,
            code:
              abuseHabits.include.FindingRelatingToAlcoholDrinkingBehavior.code,
            valueCodeableConcept:
              formValues.relatingAlcoholHabit
                .FindingRelatingToAlcoholDrinkingBehavior,
          })

        observationObject['observationAlcoholIntake'] =
          formValues.relatingAlcoholHabit.AlcoholIntake &&
          new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.AlcoholIntake.code,
            valueRatio: {
              numerator: {
                ...FHIR_CODES.UnitsOfMeasure[
                  formValues.relatingAlcoholHabit.AlcoholIntake.dateType
                ],
                value: parseInt(
                  formValues.relatingAlcoholHabit.AlcoholIntake.dateValue
                ),
              },
            },
          })

        if (!!formValues.relatingAlcoholHabit.DateOfLastAlcoholIntake) {
          let dateTimeValue
          const currentDateValue = new Date()

          if (
            formValues.relatingAlcoholHabit.DateOfLastAlcoholIntake.dateType ===
            'day'
          ) {
            dateTimeValue = new Date(
              currentDateValue.setDate(
                currentDateValue.getDate() -
                  formValues.relatingAlcoholHabit.DateOfLastAlcoholIntake
                    .dateValue
              )
            ).toISOString()
          } else if (
            formValues.relatingAlcoholHabit.DateOfLastAlcoholIntake.dateType ===
            'month'
          ) {
            dateTimeValue = new Date(
              currentDateValue.setMonth(
                currentDateValue.getMonth() -
                  formValues.relatingAlcoholHabit.DateOfLastAlcoholIntake
                    .dateValue
              )
            ).toISOString()
          } else if (
            formValues.relatingAlcoholHabit.DateOfLastAlcoholIntake.dateType ===
            'year'
          ) {
            dateTimeValue = new Date(
              currentDateValue.setFullYear(
                currentDateValue.getFullYear() -
                  formValues.relatingAlcoholHabit.DateOfLastAlcoholIntake
                    .dateValue
              )
            ).toISOString()
          }

          console.log(dateTimeValue)

          observationObject[
            'observationDateOfLastAlcoholIntake'
          ] = new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.DateOfLastAlcoholIntake.code,
            valueDateTime: dateTimeValue,
          })
        }

        observationObject['observationDateOfStartedDrinkingAlcohol'] =
          formValues.relatingAlcoholHabit.DateOfStartedDrinkingAlcohol &&
          new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.DateOfStartedDrinkingAlcohol.code,
            valuePeriod: {
              start:
                formValues.relatingAlcoholHabit.DateOfStartedDrinkingAlcohol,
            },
          })

        observationObject['observationLengthOfAlcoholUsingPeriod'] =
          formValues.relatingAlcoholHabit.LengthOfAlcoholUsingPeriod &&
          new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.LengthOfAlcoholUsingPeriod.code,
            valueQuantity: {
              ...FHIR_CODES.UnitsOfMeasure.MilliSecond,
              value:
                formValues.relatingAlcoholHabit.LengthOfAlcoholUsingPeriod
                  .difference,
            },
          })
      }

      if (!!formValues.relatingTobaccoUseAndExposure) {
        observationObject['observationFindingOfTobaccoUseAndExposure'] =
          formValues.relatingTobaccoUseAndExposure
            .FindingOfTobaccoUseAndExposure &&
          new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.FindingOfTobaccoUseAndExposure.code,
            valueCodeableConcept:
              formValues.relatingTobaccoUseAndExposure
                .FindingOfTobaccoUseAndExposure,
          })

        observationObject['observationAgeAtStartingSmoking'] =
          formValues.relatingTobaccoUseAndExposure.AgeAtStartingSmoking &&
          new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.AgeAtStartingSmoking.code,
            valueInteger: parseInt(
              formValues.relatingTobaccoUseAndExposure.AgeAtStartingSmoking
            ),
          })

        observationObject['observationNumberOfYearsSmoking'] =
          formValues.relatingTobaccoUseAndExposure.NumberOfYearsSmoking &&
          new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.NumberOfYearsSmoking.code,
            valueInteger: parseInt(
              formValues.relatingTobaccoUseAndExposure.NumberOfYearsSmoking
            ),
          })

        observationObject['observationNumberOfCigarettes'] =
          formValues.relatingTobaccoUseAndExposure.NumberOfCigarettes &&
          new Observation({
            ...ObservationConstantValues,
            code: abuseHabits.include.NumberOfCigarettes.code,
            valueRatio: {
              numerator: {
                ...FHIR_CODES.UnitsOfMeasure[
                  formValues.relatingTobaccoUseAndExposure.NumberOfCigarettes
                    .dateType
                ],
                value: parseInt(
                  formValues.relatingTobaccoUseAndExposure.NumberOfCigarettes
                    .dateValue
                ),
              },
            },
          })
      }

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )
      console.log('observation object', observationObject)

      const abuseHabitsList = new List({
        title: 'Smoking/Drinking/Substance Abuse Habits',
        code: FHIR_CODES.Lists.SmokingDrinkingSubstanceAbuseHabitsAnamnesis,
        mode: 'working',
        status: 'current',
        date: getInstant(),
        subject: patient.getReference(),
        source: Practitioner.getReference(),
        entry: observationEntries.map(entry => {
          return {
            item: { reference: entry.fullUrl },
          }
        }),
      })

      const abuseHabitsListEntry = new BundleEntry(
        pushRequest({ newResource: abuseHabitsList }, 'POST')
      )

      const listEntry = {
        ...anamnesisVitaeSections,
        AbuseHabits: {
          title: 'Abuse Habits',
          entry: [abuseHabitsListEntry],
          entries: [
            ...observationEntries,
            // abuseHabitsListEntry
          ],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Medication statement */
    *queryMedicationStatement({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState

      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'MedicationStatement',
        patient: patient.id,
        //   partOf: 'Observation',
        //   // _include: 'MedicationStatement:partOf:Observation',
        //   // 'part-of': 'MedicationStatement',
        //   // 'part-of': 'Observation',
        //   // _include: 'MedicationStatement:partOf',
        //   // '_include:iterate': ['partOf:Observation'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        return
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientMedicationStatementList = []
      const drugInformationList = []

      resourceDictionary.MedicationStatement.forEach(
        medicationStatementValue => {
          const medicationStatementObject = {}

          medicationStatementObject['recordedDate'] =
            medicationStatementValue.dateAsserted &&
            toLocalDateTime(medicationStatementValue.dateAsserted, 'yyyy-mm-dd')

          medicationStatementObject['status'] = medicationStatementValue.status
          drugInformationList.push(
            medicationStatementValue.medicationCodeableConcept
          )

          if (!!medicationStatementValue.dosage) {
            const dosage = medicationStatementValue.dosage.find(
              v => v.doseAndRate
            ).doseAndRate

            const dosageInstruction = dosage.find(v => v.rateRatio)

            medicationStatementObject[
              'dosage'
            ] = dosageInstruction.rateRatio && {
              value: dosageInstruction.rateRatio.numerator.value,
              unit: dosageInstruction.rateRatio.denominator.unit,
            }

            medicationStatementObject['doseQuantity'] =
              dosageInstruction.doseQuantity &&
              dosageInstruction.doseQuantity.unit
          }

          medicationStatementObject['note'] =
            medicationStatementValue.note &&
            medicationStatementValue.note.find(noteItem => noteItem.text).text

          if (!!medicationStatementValue.effectivePeriod) {
            medicationStatementObject['startingDate'] =
              medicationStatementValue.effectivePeriod &&
              toLocalDateTime(
                medicationStatementValue.effectivePeriod.start,
                'yyyy-mm-dd'
              )
            // medicationStatementValue.effectivePeriod.start

            const oneDay = 1000 * 60 * 60 * 24

            const dateDifference =
              (new Date(
                medicationStatementValue.effectivePeriod.end
              ).getTime() -
                new Date(
                  medicationStatementValue.effectivePeriod.start
                ).getTime()) /
              oneDay

            console.log(dateDifference)
            medicationStatementObject['lengthOfMedication'] = dateDifference
          }

          patientMedicationStatementList.push(medicationStatementObject)
        }
      )

      const drugInformationListResponse = yield call(queryExternalAPI, {
        api: 'DrugInformationList',
        data: drugInformationList,
      })

      drugInformationList.forEach((drugInformationListValue, index) => {
        patientMedicationStatementList[index][
          'drugInformation'
        ] = drugInformationListResponse.data.find(responseValue =>
          codeIntersects(responseValue.code, drugInformationListValue)
        )
      })

      if (!!patientMedicationStatementList) {
        return patientMedicationStatementList
      }
    },

    *medicationStatementAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { formValues } = payload
      const { patient, anamnesisVitaeSections } = localState
      const { Observations, UnitsOfMeasure } = FHIR_CODES

      const medicationStatementEntries = []
      // let observationEntries

      Object.values(formValues).forEach(formValue => {
        // үүсэж буй observation нь medicatianStatement-ийн derivedFrom д орно гэж
        // бодон хийсэн боловч хадгалаад буцаан уншиж чадаагүй учир уусан хоногийн тоог
        // ууж эхэлсэн огноон дээр нэмж period хэлбэрээр хадгалахаар болов 2020.07.23
        //
        // энэ хоёр өгөгдлийг required хэлбэрээр авах хэрэгтэй болоод байна

        // if (!!formValue.derivedFrom) {
        //   const dateType =
        //     formValue.derivedFrom.dateType.charAt(0).toUpperCase() +
        //     formValue.derivedFrom.dateType.slice(1)

        //   console.log(dateType)

        //   const observationDerivedFrom = new Observation({
        //     status: 'final',
        //     subject: patient.getReference(),
        //     issued: getInstant(),
        //     code: Observations.MedicationStatementDerivedFrom,
        //     valueQuantity: {
        //       ...UnitsOfMeasure[dateType],
        //       value: parseInt(formValue.derivedFrom.dateValue),
        //     },
        //   })

        //   observationEntries = new BundleEntry(
        //     pushRequest({ newResource: observationDerivedFrom }, 'POST')
        //   )
        // }
        let dateTiming

        if (!!formValue.derivedFrom && !!formValue.effectivePeriod) {
          const dayConstant = 1000 * 60 * 60 * 24

          const timingValue =
            formValue.derivedFrom.dateType === 'day'
              ? parseInt(formValue.derivedFrom.dateValue) * dayConstant
              : formValue.derivedFrom.dateType === 'month'
              ? parseInt(formValue.derivedFrom.dateValue) * dayConstant * 30
              : parseInt(formValue.derivedFrom.dateValue) *
                dayConstant *
                30 *
                365

          const startTingDateTime = new Date(
            formValue.effectivePeriod
          ).getTime()

          dateTiming = {
            start: new Date(formValue.effectivePeriod),
            end: new Date(startTingDateTime + timingValue),
          }
        }

        const rateRatio = formValue.dosage && {
          numerator: formValue.dosage && {
            ...UnitsOfMeasure.EnzymeUnit,
            value: parseInt(formValue.dosage),
          },
          denominator: {
            ...UnitsOfMeasure.Day,
            value: 1,
          },
        }

        const dosage = rateRatio && [
          new Dosage({
            doseAndRate: rateRatio && [
              {
                doseQuantity: {
                  ...UnitsOfMeasure[formValue.doseQuantity],
                },
                rateRatio: rateRatio,
              },
            ],
          }),
        ]

        const note = formValue.note &&
          formValue.note !== '' && [
            {
              authorReference: Practitioner.getReference(),
              time: getInstant(),
              text: formValue.note,
            },
          ]

        const newMedicationStatement = new MedicationStatement({
          subject: patient.getReference(),
          status: formValue.medicationStatus,
          dateAsserted: getInstant(),
          medicationCodeableConcept:
            formValue.medication && formValue.medication.code,
          effectivePeriod: dateTiming && {
            start: dateTiming.start,
            end: dateTiming.end,
          },
          note,
          // derivedFrom: formValue.derivedFrom && [
          //   { reference: observationEntries.fullUrl },
          // ],
          dosage: dosage && dosage,
        })

        const newMedicationStatementEntry = new BundleEntry(
          pushRequest({ newResource: newMedicationStatement }, 'POST')
        )

        medicationStatementEntries.push(newMedicationStatementEntry)
      })

      console.log('Medication statement entries', medicationStatementEntries)

      const listEntry = {
        ...anamnesisVitaeSections,
        MedicationStatement: {
          title: 'Medication Statement',
          entry: [...medicationStatementEntries],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },
    /* #endregion */

    /* #region  Immunization */
    *queryImmunization({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const ImmunizationValueSet =
        FHIR_CODES.AnamnesisVitae.include.Immunization

      const requestPayload = {
        resourceType: 'Observation',
        patient: patient.id,
        code: `${ImmunizationValueSet.code.coding[0].system}|${ImmunizationValueSet.code.coding[0].code}`,
        _revinclude: 'Immunization:reason-reference',
      }

      const response = yield call(readResource, requestPayload)

      if (!response || !response.success) {
        return
      }

      const bundle = new Bundle(response.data)

      if (!bundle || bundle.entry.length === 0) {
        yield put({
          type: 'updateState',
          payload: {
            immunizationStatus: [],
          },
        })
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientImmunizationList = []

      const immunizationStatus =
        resourceDictionary.Observation &&
        resourceDictionary.Observation.find(
          v => v.valueBoolean === false || v.valueBoolean === true
        ).valueBoolean

      resourceDictionary.Immunization &&
        resourceDictionary.Immunization.forEach(immunizationValue => {
          const immunizationObject = {}

          immunizationObject['vaccineInfo'] =
            immunizationValue.vaccineCode &&
            Object.values(ImmunizationValueSet.include).find(v =>
              codeIntersects(v.code, immunizationValue.vaccineCode)
            )

          immunizationObject['occurrenceDateTime'] =
            immunizationValue.occurrenceDateTime &&
            toLocalDateTime(immunizationValue.occurrenceDateTime, 'yyyy-mm-dd')

          immunizationObject['note'] =
            immunizationValue.note &&
            immunizationValue.note.find(noteItem => noteItem.text).text

          patientImmunizationList.push(immunizationObject)
        })

      yield put({
        type: 'updateState',
        payload: {
          immunizationStatus: resourceDictionary.Observation,
        },
      })

      return {
        immunizationInformation: patientImmunizationList,
        immunizationStatus: immunizationStatus,
      }
    },

    *immunizationAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { formValues } = payload
      const ImmunizationValueSet =
        FHIR_CODES.AnamnesisVitae.include.Immunization
      const { patient, immunizationStatus, anamnesisVitaeSections } = localState

      const transactionEntries = []

      let immunizationStatusEntry

      console.log(immunizationStatus)

      if (immunizationStatus.length > 0) {
        const previousImmunizationStatus = immunizationStatus.find(v => v.meta)

        const updatedImmunizationObservation =
          previousImmunizationStatus &&
          new Observation({
            id: previousImmunizationStatus.id,
            meta: previousImmunizationStatus.meta,
            status: previousImmunizationStatus.status,
            subject: previousImmunizationStatus.subject,
            issued: getInstant(),
            code: previousImmunizationStatus.code,
            valueBoolean:
              formValues.immunizationStatus === 'Yes' ? true : false,
          })

        const updatedImmunizationObservationUrl = getReferenceUrl(
          updatedImmunizationObservation
        )

        immunizationStatusEntry = new BundleEntry({
          fullUrl: updatedImmunizationObservationUrl,
          resource: updatedImmunizationObservation,
          request: {
            method: 'PUT',
            url: updatedImmunizationObservationUrl,
            ifMatch: `W/"${updatedImmunizationObservation.meta.versionId}"`,
          },
        })
      } else {
        const immunizationStatusObservation =
          formValues.immunizationStatus &&
          new Observation({
            status: 'preliminary',
            subject: patient.getReference(),
            issued: getInstant(),
            code: ImmunizationValueSet.code,
            valueBoolean:
              formValues.immunizationStatus === 'Yes' ? true : false,
          })

        console.log(immunizationStatusObservation)

        immunizationStatusEntry =
          immunizationStatusObservation &&
          new BundleEntry(
            pushRequest({ newResource: immunizationStatusObservation }, 'POST')
          )
      }

      transactionEntries.push(immunizationStatusEntry)

      console.log(immunizationStatusEntry)

      formValues.immunizationStatus === 'Yes' &&
        formValues.immunizationInfo.forEach(immunizationInfoValue => {
          if (!!immunizationInfoValue) {
            const newImmunization = new Immunization({
              status: 'completed',
              patient: patient.getReference(),
              recordedDate: getInstant(),
              occurrenceDateTime: new Date(immunizationInfoValue.occurenceDate),
              vaccineCode:
                ImmunizationValueSet.include[
                  immunizationInfoValue.immunizationName
                ].code,
              note: immunizationInfoValue.note &&
                immunizationInfoValue.note !== '' && [
                  {
                    authorReference: Practitioner.getReference(),
                    time: getInstant(),
                    text: immunizationInfoValue.note,
                  },
                ],
              reasonReference: [{ reference: immunizationStatusEntry.fullUrl }],
            })

            const immunizationEntry = new BundleEntry(
              pushRequest({ newResource: newImmunization }, 'POST')
            )

            transactionEntries.push(immunizationEntry)
          }
        })

      console.log(transactionEntries)

      const listEntry = {
        ...anamnesisVitaeSections,
        Immunization: {
          title: 'Immunization',
          entry: [...transactionEntries],
        },
      }

      yield put({
        type: 'updateState',
        payload: {
          anamnesisVitaeSections: listEntry,
        },
      })
    },

    /* #endregion */

    /* #region  Diagnosis  */
    *queryDiagnosis({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { Ambulatory } = FHIR_CODES.Encounters.Classes
      const { patient } = localState

      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'Encounter',
        // class: `${Ambulatory.system}|${Ambulatory.code}`,
        patient: patient.id,
        _include: ['Encounter:diagnosis'],
        '_include:iterate': ['Condition:asserter', 'Condition:evidence-detail'],
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const diagnosisList = []
      const patientDiagnosisList = []

      resourceDictionary['Encounter'].forEach(list => {
        if (
          list.class &&
          list.class.code === Ambulatory.code &&
          list.class.system === Ambulatory.system
        ) {
          diagnosisList.push(list)
        }
      })

      if (diagnosisList.length > 0) {
        diagnosisList.forEach(diagnosisEntry => {
          const diagnosisObject = {}

          diagnosisEntry.diagnosis.forEach(entryItem => {
            const entryList = findByReference(
              resourceDictionary['Condition'],
              entryItem.condition
            )

            if (
              codeIntersects(
                entryItem.use,
                FHIR_CODES.Encounters.DiagnosisUses.AdmissionDiagnosis
              )
            ) {
              console.log('basic diagnosis', entryList)

              if (entryList.evidence) {
                const evidenceDetail = []

                entryList.evidence.forEach(evidenceValue => {
                  evidenceDetail.push(
                    findByReference(
                      resourceDictionary['Condition'],
                      evidenceValue.detail.find(
                        detailValue => detailValue.reference
                      )
                    )
                  )
                })

                if (evidenceDetail.length > 0) {
                  const evidenceDetailList = []

                  evidenceDetail.forEach(condition => {
                    evidenceDetailList.push({
                      display: condition.code.coding.map(
                        codingItem => codingItem.display
                      ),
                      text: condition.code.text,
                    })
                  })

                  diagnosisObject['evidenceDetail'] = evidenceDetailList
                }
              }

              diagnosisObject['basicDiagnosis'] = {
                display: entryList.code.coding.map(
                  codingItem => codingItem.display
                ),
                text: entryList.code.text,
              }

              diagnosisObject['basicDiagnosisNote'] =
                entryList.note && entryList.note.map(noteItem => noteItem.text)
            }

            if (
              codeIntersects(
                entryItem.use,
                FHIR_CODES.Encounters.DiagnosisUses.ComorbidityDiagnosis
              )
            ) {
              diagnosisObject['diagnosis'] = {
                display: entryList.code.coding.map(
                  codingItem => codingItem.display
                ),
                text: entryList.code.text,
              }

              diagnosisObject['diagnosisNote'] =
                entryList.note && entryList.note.map(noteItem => noteItem.text)
            }

            const recordedDate = toLocalDateTime(
              entryList.recordedDate,
              'yyyy-mm-dd'
            )

            diagnosisObject['recordedDate'] = recordedDate

            const practitioner =
              entryList.recorder &&
              findByReference(
                resourceDictionary['Practitioner'],
                entryList.recorder
              )
            const officialNameString = practitioner
              ? practitioner.getOfficialNameString({
                  short: true,
                })
              : ''

            diagnosisObject['asserter'] = officialNameString
          })

          patientDiagnosisList.push(diagnosisObject)
        })
      }

      if (!!patientDiagnosisList) {
        return patientDiagnosisList
      }
    },

    *diagnosisAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      const { formValues } = payload

      if (!formValues) {
        return
      }

      const conditionConstantValues = {
        identifier: {
          ...FHIR_CODES.Identifiers.Conditions,
          value: generateUuid(),
        },
        clinicalStatus: FHIR_CODES.ConditionStatuses.ClinicalStatusActive,
        category: FHIR_CODES.Categories.EncounterDiagnosis,
        subject: patient.getReference(),
        recordedDate: getInstant(),
        recorder: Practitioner.getReference(),
        asserter: Practitioner.getReference(),
      }

      console.log(formValues)

      const conditionEntries = []
      const encounterEnries = []

      Object.values(formValues).forEach(formValue => {
        const basicDiagnosisCondition =
          formValue.basicDiagnosis &&
          new Condition({
            ...conditionConstantValues,
            code: formValue.basicDiagnosis
              ? formValue.basicDiagnosis
              : undefined,
            note: formValue.basicDiagnosisNotes &&
              formValue.basicDiagnosisNotes !== '' && [
                {
                  authorReference: Practitioner.getReference(),
                  time: getInstant(),
                  text: formValue.basicDiagnosisNotes
                    ? formValue.basicDiagnosisNotes
                    : undefined,
                },
              ],
          })

        const diagnosisCondition =
          formValue.diagnosis &&
          new Condition({
            ...conditionConstantValues,
            code: formValue.diagnosis ? formValue.diagnosis : undefined,
            note: formValue.diagnosisNotes &&
              formValue.diagnosisNotes !== '' && [
                {
                  authorReference: Practitioner.getReference(),
                  time: getInstant(),
                  text: formValue.diagnosisNotes
                    ? formValue.diagnosisNotes
                    : undefined,
                },
              ],
          })

        const basicDiagnosisEntry =
          basicDiagnosisCondition &&
          new BundleEntry(
            pushRequest({ newResource: basicDiagnosisCondition }, 'POST')
          )

        const diagnosisEntry =
          diagnosisCondition &&
          new BundleEntry(
            pushRequest({ newResource: diagnosisCondition }, 'POST')
          )

        console.log('basic diagnosis entry', basicDiagnosisEntry)
        console.log('diagnosis entry', diagnosisEntry)

        const encounterDiagnosis = []
        if (basicDiagnosisEntry && basicDiagnosisEntry !== undefined) {
          encounterDiagnosis.push({
            condition: { reference: basicDiagnosisEntry.fullUrl },
            use: FHIR_CODES.Encounters.DiagnosisUses.AdmissionDiagnosis,
          })

          conditionEntries.push(basicDiagnosisEntry)
        }
        if (diagnosisEntry && diagnosisEntry !== undefined) {
          encounterDiagnosis.push({
            condition: { reference: diagnosisEntry.fullUrl },
            use: FHIR_CODES.Encounters.DiagnosisUses.ComorbidityDiagnosis,
          })

          conditionEntries.push(diagnosisEntry)
        }
        if (encounterDiagnosis.length < 1) {
          return
        }

        const newEncounter =
          (basicDiagnosisEntry || diagnosisEntry) &&
          new Encounter({
            status: 'arrived',
            class: FHIR_CODES.Encounters.Classes.Ambulatory,
            subject: patient.getReference(),
            diagnosis: encounterDiagnosis,
          })

        const encounterEntry = new BundleEntry(
          pushRequest({ newResource: newEncounter }, 'POST')
        )

        console.log('encountry entry', encounterEntry)
        encounterEnries.push(encounterEntry)
      })

      const transactionEntries = [...conditionEntries, ...encounterEnries]

      const bundle = new Bundle({
        type: 'transaction',
        entry: transactionEntries,
      })

      console.log('BUNDLE', bundle)

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        yield put({
          type: 'updateState',
          payload: {
            lastUpdatedDiagnosis: getInstant(),
          },
        })

        return response.success
      } else {
        throw new Error('Saving diagnosis failed')
      }
    },
    /* #endregion */

    /* #region  Medication Request  */
    *queryMedicationRequest({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { MedicationDosageInstruction } = FHIR_CODES
      const { patient } = localState

      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'MedicationRequest',
        // code: 'http://licemed.mohs.mn/|',
        // system: 'http://licemed.mohs.mn/',
        patient: patient.id,
        '_include:iterate': ['MedicationRequest:requester'],
      }

      const response = yield call(readResource, requestPayload)

      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientMedicationRequestList = []
      const drugInformationList = []

      /* #region  resource dictionary elements */
      resourceDictionary['MedicationRequest'].forEach(
        medicationRequestValue => {
          const medicationObject = {}

          medicationObject['medicationCodeableConcept'] =
            medicationRequestValue.medicationCodeableConcept
          drugInformationList.push(
            medicationRequestValue.medicationCodeableConcept
          )

          /* #region  recorded date, asserter, note */
          const recordedDate =
            medicationRequestValue.authoredOn &&
            toLocalDateTime(medicationRequestValue.authoredOn, 'yyyy-mm-dd')
          medicationObject['recordedDate'] = recordedDate

          const practitioner =
            medicationRequestValue.requester &&
            findByReference(
              resourceDictionary['Practitioner'],
              medicationRequestValue.requester
            )
          const officialNameString =
            practitioner &&
            practitioner.getOfficialNameString({
              short: true,
            })

          medicationObject['asserter'] = officialNameString

          medicationObject['note'] =
            medicationRequestValue.note &&
            medicationRequestValue.note.map(v => v.text)

          /* #endregion */

          if (!!medicationRequestValue.dosageInstruction) {
            const dosageInstruction = medicationRequestValue.dosageInstruction

            medicationObject['dosageInstruction'] = Object.values(
              MedicationDosageInstruction
            ).find(
              instructionValue =>
                dosageInstruction.find(v => v.route) &&
                codeIntersects(
                  instructionValue.code,
                  dosageInstruction.find(v => v.route).route
                )
            )

            const doseAndRate =
              dosageInstruction.find(dosageValue => dosageValue.doseAndRate) &&
              dosageInstruction.find(dosageValue => dosageValue.doseAndRate)
                .doseAndRate

            medicationObject['dosageQuantity'] =
              doseAndRate &&
              doseAndRate.find(doseAndRateValue => doseAndRateValue.rateRatio)
                .rateRatio.numerator.value

            medicationObject['timingRepeatFrequency'] = dosageInstruction.find(
              v => v.timing
            ) && {
              frequency: dosageInstruction.find(v => v.timing).timing.repeat
                .frequency,
              periodUnit: dosageInstruction.find(v => v.timing).timing.repeat
                .periodUnit,
            }
          }

          if (!!medicationRequestValue.dispenseRequest) {
            medicationObject['initialFillDuration'] = medicationRequestValue
              .dispenseRequest.initialFill.duration && {
              value:
                medicationRequestValue.dispenseRequest.initialFill.duration
                  .value,
              unit:
                medicationRequestValue.dispenseRequest.initialFill.duration
                  .code,
            }

            medicationObject['initialFillQuantity'] =
              medicationRequestValue.dispenseRequest.initialFill.quantity &&
              medicationRequestValue.dispenseRequest.initialFill.quantity.value
          }

          patientMedicationRequestList.push(medicationObject)
        }
      )
      /* #endregion */

      const drugInformationListResponse = yield call(queryExternalAPI, {
        api: 'DrugInformationList',
        data: drugInformationList,
      })

      drugInformationList.forEach((drugInformationListValue, index) => {
        const licemedInfo = drugInformationListResponse.data.find(
          responseValue =>
            codeIntersects(responseValue.code, drugInformationListValue)
        )

        if (licemedInfo) {
          patientMedicationRequestList[index]['drugInformation'] = licemedInfo
        }
      })

      if (!!patientMedicationRequestList) {
        return patientMedicationRequestList
      }
    },

    *queryMedicationRequestFromInsurance({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { MedicationDosageInstruction } = FHIR_CODES
      const { patient } = localState

      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'MedicationRequest',
        system: 'https://st.health.gov.mn/',
        patient: patient.id,
        '_include:iterate': ['MedicationRequest:requester'],
      }
      let medicationCheck
      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientMedicationRequestList = []
      const drugInformationList = []

      /* #region  resource dictionary elements */
      resourceDictionary['MedicationRequest'].forEach(
        medicationRequestValue => {
          const medicationObject = {}
          medicationCheck = medicationRequestValue.medicationCodeableConcept
          drugInformationList.push(
            medicationRequestValue.medicationCodeableConcept
          )

          /* #region  recorded date, asserter, note */
          const recordedDate =
            medicationRequestValue.authoredOn &&
            toLocalDateTime(medicationRequestValue.authoredOn, 'yyyy-mm-dd')
          medicationObject['recordedDate'] = recordedDate

          const practitioner =
            medicationRequestValue.requester &&
            findByReference(
              resourceDictionary['Practitioner'],
              medicationRequestValue.requester
            )
          const officialNameString =
            practitioner &&
            practitioner.getOfficialNameString({
              short: true,
            })

          medicationObject['asserter'] = officialNameString

          medicationObject['note'] =
            medicationRequestValue.note &&
            medicationRequestValue.note.map(v => v.text)

          /* #endregion */

          if (!!medicationRequestValue.dosageInstruction) {
            const dosageInstruction = medicationRequestValue.dosageInstruction

            medicationObject['dosageInstruction'] = Object.values(
              MedicationDosageInstruction
            ).find(
              instructionValue =>
                dosageInstruction.find(v => v.route) &&
                codeIntersects(
                  instructionValue.code,
                  dosageInstruction.find(v => v.route).route
                )
            )

            const doseAndRate =
              dosageInstruction.find(dosageValue => dosageValue.doseAndRate) &&
              dosageInstruction.find(dosageValue => dosageValue.doseAndRate)
                .doseAndRate

            medicationObject['dosageQuantity'] =
              doseAndRate &&
              doseAndRate.find(doseAndRateValue => doseAndRateValue.rateRatio)
                .rateRatio.numerator.value

            medicationObject['timingRepeatFrequency'] = dosageInstruction.find(
              v => v.timing
            ) && {
              frequency: dosageInstruction.find(v => v.timing).timing.repeat
                .frequency,
              periodUnit: dosageInstruction.find(v => v.timing).timing.repeat
                .periodUnit,
            }
          }

          if (!!medicationRequestValue.dispenseRequest) {
            medicationObject['initialFillDuration'] = medicationRequestValue
              .dispenseRequest.initialFill.duration && {
              value:
                medicationRequestValue.dispenseRequest.initialFill.duration
                  .value,
              unit:
                medicationRequestValue.dispenseRequest.initialFill.duration
                  .code,
            }

            medicationObject['initialFillQuantity'] =
              medicationRequestValue.dispenseRequest.initialFill.quantity &&
              medicationRequestValue.dispenseRequest.initialFill.quantity.value
          }

          patientMedicationRequestList.push(medicationObject)
        }
      )
      /* #endregion */

      drugInformationList.forEach((drugInformationListValue, index) => {
        patientMedicationRequestList[index]['drugInformation'] = medicationCheck
      })

      if (!!patientMedicationRequestList) {
        return patientMedicationRequestList
      }
    },

    // *medicationRequestAdd({ payload }, { select, call, put }) {
    //   const { FHIR_CODES, Practitioner } = yield select(state => state.app)
    //   const localState = yield select(
    //     state => state.practitioner_patient_profile
    //   )

    //   const { MedicationDosageInstruction } = FHIR_CODES
    //   const { patient } = localState
    //   const { formValues } = payload

    //   console.log('form values', formValues)

    //   if (!patient) {
    //     return
    //   }

    //   const medicationRequestConstantValues = {
    //     intent: 'order',
    //     status: 'active',
    //     subject: patient.getReference(),
    //     authoredOn: getInstant(),
    //     recorder: Practitioner.getReference(),
    //     requester: Practitioner.getReference(),
    //   }

    //   const medicationRequestEntries = []

    //   Object.values(formValues).forEach(formValue => {
    //     console.log('formValuuuuuuuuuuue Model shuuuuuuuuuuuu', formValue)
    //     // if (!formValue.medicationFromFullList) {
    //     //   return
    //     // }
    //     // console.log('1')
    //     // if (formValue.medicationFromInsurance === undefined) {
    //     //   return
    //     // }

    //     let durationUnit
    //     if (!!formValue.initialFillDuration) {
    //       if (formValue.initialFillDuration.dateType === 'd') {
    //         durationUnit = 'day'
    //       } else if (formValue.initialFillDuration.dateType === 'wk') {
    //         durationUnit = 'week'
    //       } else if (formValue.initialFillDuration.dateType === 'mo') {
    //         durationUnit = 'month'
    //       }
    //     }

    //     const initialFill = {}
    //     if (formValue.initialFillQuantity) {
    //       initialFill['quantity'] = {
    //         value: parseInt(formValue.initialFillQuantity),
    //       }
    //     }

    //     if (formValue.initialFillDuration) {
    //       initialFill['duration'] = {
    //         value: parseInt(formValue.initialFillDuration.dateValue),
    //         unit: durationUnit,
    //         system: FHIR_CODES.UNITSOF_MEASURE,
    //         code: formValue.initialFillDuration.dateType,
    //       }
    //     }

    //     const timing =
    //       formValue.timingRepeatFrequency &&
    //       new Timing({
    //         repeat: {
    //           frequency: parseInt(formValue.timingRepeatFrequency.dateValue),
    //           period: 1,
    //           periodUnit: formValue.timingRepeatFrequency.dateType,
    //         },
    //       })

    //     const rateRatio = formValue.dosageQuantity && {
    //       numerator: {
    //         ...FHIR_CODES.MedicationRequest.Dosage.doseAndRate,
    //         value: parseInt(formValue.dosageQuantity),
    //       },
    //     }

    //     const dosageInstruction = []
    //     if (formValue.dosageInstruction) {
    //       dosageInstruction.push(
    //         new Dosage({
    //           timing,
    //           route:
    //             MedicationDosageInstruction[formValue.dosageInstruction].code,
    //           doseAndRate: rateRatio && [{ rateRatio }],
    //         })
    //       )
    //     }

    //     const note = formValue.note &&
    //       formValue.note !== '' && [
    //         {
    //           authorReference: Practitioner.getReference(),
    //           time: getInstant(),
    //           text: formValue.note,
    //         },
    //       ]

    //     let medicationCode

    //     if (formValue.medicationFromFullList) {
    //       medicationCode =
    //         formValue.medicationFromFullList &&
    //         formValue.medicationFromFullList.code
    //     } else if (formValue.medicationFromInsurance) {
    //       const insuranceMedicationCode = {
    //         coding: [
    //           {
    //             system: 'https://st.health.gov.mn/',
    //             code: formValue.medicationFromInsurance.tbltId,
    //             display: formValue.medicationFromInsurance.tbltNameInter,
    //           },
    //         ],
    //         text: formValue.medicationFromInsurance.tbltNameInter,
    //       }
    //       medicationCode = insuranceMedicationCode
    //     }

    //     console.log('medicationCode*********************', medicationCode)
    //     const newMedicationRequest = new MedicationRequest({
    //       ...medicationRequestConstantValues,
    //       note,
    //       dispenseRequest: !isEmptyObject(initialFill)
    //         ? { initialFill: initialFill }
    //         : undefined,
    //       dosageInstruction:
    //         dosageInstruction.length > 0 ? dosageInstruction : undefined,
    //       category: FHIR_CODES.Categories.Outpatient,
    //       medicationCodeableConcept: medicationCode,
    //     })

    //     console.log('medication request', newMedicationRequest)

    //     medicationRequestEntries.push(
    //       new BundleEntry(
    //         pushRequest({ newResource: newMedicationRequest }, 'POST')
    //       )
    //     )
    //   })

    //   // console.log(medicationRequestEntries)

    //   const transactionEntries = [...medicationRequestEntries]
    //   const bundle = new Bundle({
    //     type: 'transaction',
    //     entry: transactionEntries,
    //   })

    //   const json = bundle.toJSON()
    //   const response = yield call(batch_transaction_request, json)

    //   if (response && response.success) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         lastUpdatedMedicationRequest: getInstant(),
    //       },
    //     })

    //     return response.success
    //   } else {
    //     throw new Error('Saving medication request failed')
    //   }
    // },
    *medicationRequestAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { MedicationDosageInstruction } = FHIR_CODES
      const { patient } = localState
      const { formValues } = payload

      if (!patient || !patient.id) {
        return
      }

      const medicationRequestConstantValues = {
        intent: 'order',
        status: 'active',
        subject: patient.getReference(),
        authoredOn: getInstant(),
        recorder: Practitioner.getReference(),
        requester: Practitioner.getReference(),
      }

      const medicationRequestEntries = []

      Object.values(formValues).forEach(formValue => {
        // if (!formValue.medicationFromFullList) {
        //   return
        // } else if (!formValue.medicationFromInsurance) {
        //   return
        // }

        let durationUnit
        if (!!formValue.initialFillDuration) {
          if (formValue.initialFillDuration.dateType === 'd') {
            durationUnit = 'day'
          } else if (formValue.initialFillDuration.dateType === 'wk') {
            durationUnit = 'week'
          } else if (formValue.initialFillDuration.dateType === 'mo') {
            durationUnit = 'month'
          }
        }

        const initialFill = {}
        if (formValue.initialFillQuantity) {
          initialFill['quantity'] = {
            value: parseInt(formValue.initialFillQuantity),
          }
        }

        if (formValue.initialFillDuration) {
          initialFill['duration'] = {
            value: parseInt(formValue.initialFillDuration.dateValue),
            unit: durationUnit,
            system: FHIR_CODES.UNITSOF_MEASURE,
            code: formValue.initialFillDuration.dateType,
          }
        }

        const timing =
          formValue.timingRepeatFrequency &&
          new Timing({
            repeat: {
              frequency: parseInt(formValue.timingRepeatFrequency.dateValue),
              period: 1,
              periodUnit: formValue.timingRepeatFrequency.dateType,
            },
          })

        const rateRatio = formValue.dosageQuantity && {
          numerator: {
            ...FHIR_CODES.MedicationRequest.Dosage.doseAndRate,
            value: parseInt(formValue.dosageQuantity),
          },
        }

        const dosageInstruction = []
        if (formValue.dosageInstruction) {
          dosageInstruction.push(
            new Dosage({
              timing,
              route:
                MedicationDosageInstruction[formValue.dosageInstruction].code,
              doseAndRate: rateRatio && [{ rateRatio }],
            })
          )
        }

        const note = formValue.note &&
          formValue.note !== '' && [
            {
              authorReference: Practitioner.getReference(),
              time: getInstant(),
              text: formValue.note,
            },
          ]

        const newMedicationRequest = new MedicationRequest({
          ...medicationRequestConstantValues,
          note,
          dispenseRequest: !isEmptyObject(initialFill)
            ? { initialFill: initialFill }
            : undefined,
          dosageInstruction:
            dosageInstruction.length > 0 ? dosageInstruction : undefined,
          category: FHIR_CODES.Categories.Outpatient,
          medicationCodeableConcept:
            formValue.medication && formValue.medication.code,
        })

        console.log('medication request', newMedicationRequest)

        medicationRequestEntries.push(
          new BundleEntry(
            pushRequest({ newResource: newMedicationRequest }, 'POST')
          )
        )
      })

      // console.log(medicationRequestEntries)

      const transactionEntries = [...medicationRequestEntries]
      const bundle = new Bundle({
        type: 'transaction',
        entry: transactionEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)
      if (response && response.success) {
        return response.success
      } else {
        throw new Error('Saving medication request failed')
      }
    },
    /* #endregion */

    /* #region  Vital Signs Finding */
    *queryVitalSignsFinding({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const { patient } = yield select(
        state => state.practitioner_patient_profile
      )

      if (!patient || !patient.id) {
        return
      }
      const {
        VitalSignsFinding,
      } = FHIR_CODES.PhysicalExaminationComplete.include

      const { BloodPressure } = VitalSignsFinding.include
      const {
        SystolicArterialPressure,
        DiastolicBloodPressure,
      } = BloodPressure.component

      const bloodPressureCode = BloodPressure.code.coding[0]
      const requestPayload = {
        resourceType: 'Observation',
        code: `${bloodPressureCode.system}|${bloodPressureCode.code}`,
        patient: patient.id,
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        return
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const patientVitalSignsList = []

      resourceDictionary['Observation'].forEach(observation => {
        const compositionObject = {}

        compositionObject['dateValue'] = toLocalDateTime(
          observation.issued,
          'yyyy-mm-dd'
        )

        observation.component &&
          observation.component.forEach(componentValue => {
            if (
              codeIntersects(componentValue.code, SystolicArterialPressure.code)
            ) {
              compositionObject['SystolicArterialPressure'] =
                componentValue.valueQuantity.value
            }

            if (
              codeIntersects(componentValue.code, DiastolicBloodPressure.code)
            ) {
              compositionObject['DiastolicBloodPressure'] =
                componentValue.valueQuantity.value
            }
          })

        patientVitalSignsList.push(compositionObject)
      })

      if (patientVitalSignsList.length > 0) {
        return patientVitalSignsList
      }
    },

    *vitalSignsFindingAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { stateName } = payload

      const {
        valueFloat,
        valueInteger,
        valueCodeableConceptWithComponent,
      } = payload.formValues

      const {
        patient,
        briefGeneralExaminationSections,
        physicalExaminationSections,
      } = localState

      const { PhysicalExaminationComplete, UnitsOfMeasure } = FHIR_CODES
      const { VitalSignsFinding } = PhysicalExaminationComplete.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'Vital Signs Finding',
        author: Practitioner.getReference(),
        code: VitalSignsFinding.code,
      }

      const observationObject = {}
      const observationEntries = []

      Object.keys(valueInteger).forEach(formValueInteger => {
        observationObject[`observation${formValueInteger}`] =
          valueInteger[formValueInteger] &&
          new Observation({
            ...ObservationConstantValues,
            code: VitalSignsFinding.include[formValueInteger].code,
            valueQuantity: {
              ...UnitsOfMeasure.Minute,
              value: parseInt(valueInteger[formValueInteger]),
            },
          })

        console.log(
          formValueInteger,
          observationObject[`observation${formValueInteger}`]
        )
      })

      Object.keys(valueCodeableConceptWithComponent).forEach(formValueName => {
        const component = []

        valueCodeableConceptWithComponent[formValueName] &&
          Object.keys(valueCodeableConceptWithComponent[formValueName]).forEach(
            item => {
              component.push({
                code:
                  VitalSignsFinding.include.BloodPressure.component[item].code,
                valueQuantity: {
                  ...UnitsOfMeasure.MillimeterOfMercury,
                  value: parseFloat(
                    valueCodeableConceptWithComponent[formValueName][item]
                  ),
                },
              })
            }
          )

        observationObject[`observation${formValueName}`] = new Observation({
          ...ObservationConstantValues,
          code: VitalSignsFinding.include[formValueName].code,
          component: component.length > 0 && component,
        })

        console.log(
          formValueName,
          observationObject[`observation${formValueName}`]
        )
      })

      valueFloat &&
        Object.keys(valueFloat).forEach(floatFormValue => {
          observationObject[`observation${floatFormValue}`] =
            valueFloat[floatFormValue] &&
            new Observation({
              ...ObservationConstantValues,
              code: VitalSignsFinding.include[floatFormValue].code,
              valueQuantity: {
                ...UnitsOfMeasure[floatFormValue],
                value: parseFloat(valueFloat[floatFormValue]),
              },
            })

          console.log(
            floatFormValue,
            observationObject[`observation${floatFormValue}`]
          )
        })

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log('Vital Signs Finging', observationEntries)

      let compositionEntry

      if (stateName === 'physicalGenerelExamination') {
        compositionEntry = {
          physicalExaminationSections: {
            ...physicalExaminationSections,
            VitalSignsFinding: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      } else if (stateName === 'briefGeneralExamination') {
        compositionEntry = {
          briefGeneralExaminationSections: {
            ...briefGeneralExaminationSections,
            VitalSignsFinding: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  D-LIVR height and weight */
    *dlivrAddHeightWeight({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES } = globalState
      const {
        patient,
        briefGeneralExaminationSections,
        physicalExaminationSections,
      } = localState

      const { UnitsOfMeasure } = FHIR_CODES
      const { BodyMassIndex } = FHIR_CODES.PhysicalExaminationComplete.include

      const {
        bodyWeight,
        bodyHeight,
        bodyMassIndex,
        stateName,
      } = payload.formValues

      if (
        [bodyWeight, bodyHeight, bodyMassIndex, stateName].includes(undefined)
      ) {
        throw new Error(
          'missing parameter',
          bodyWeight,
          bodyHeight,
          bodyMassIndex,
          stateName
        )
      }

      const observationConstantValues = {
        resourceType: 'Observation',
        meta: {
          profile: [FHIR_CODES.Profiles.VitalSigns.url],
        },
        status: 'final',
        category: [FHIR_CODES.Categories.VitalSigns],
        effectiveDateTime: getInstant(),
        subject: patient.getReference(),
        performer: [
          globalState.Practitioner.getReference(),
          globalState.Organization.getReference(),
        ],
      }

      const updateStateConstantValues = {
        title: 'Body Mass Index',
        author: globalState.Practitioner.getReference(),
        code: FHIR_CODES.Observations.BodyMassIndex.code,
      }

      const bodyHeightEntry = pushRequest(
        {
          newResource: {
            ...observationConstantValues,
            code: BodyMassIndex.include.BodyHeight.code,
            valueQuantity: {
              ...UnitsOfMeasure.Centimeter,
              value: parseFloat(bodyHeight),
            },
          },
        },
        'POST'
      )

      const bodyWeightEntry = pushRequest(
        {
          newResource: {
            ...observationConstantValues,
            code: BodyMassIndex.include.BodyWeight.code,
            valueQuantity: {
              ...UnitsOfMeasure.Kilogram,
              value: parseFloat(bodyWeight),
            },
          },
        },
        'POST'
      )

      const bodyMassIndexEntry = pushRequest(
        {
          newResource: {
            ...observationConstantValues,
            code: BodyMassIndex.code,
            derivedFrom: [
              {
                reference: bodyHeightEntry.fullUrl,
                display: 'Body Height',
              },
              {
                reference: bodyWeightEntry.fullUrl,
                display: 'Body Weight',
              },
            ],
            valueQuantity: {
              ...UnitsOfMeasure.KilogramPerSquareMeter,
              value: parseFloat(bodyMassIndex),
            },
          },
        },
        'POST'
      )

      const observationEntries = [
        bodyHeightEntry,
        bodyWeightEntry,
        bodyMassIndexEntry,
      ]

      let compositionEntry
      if (stateName === 'briefGeneralExamination') {
        compositionEntry = {
          briefGeneralExaminationSections: {
            ...briefGeneralExaminationSections,
            BodyMassIndex: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      } else if (stateName === 'physicalGenerelExamination') {
        compositionEntry = {
          physicalExaminationSections: {
            ...physicalExaminationSections,
            BodyMassIndex: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },

    *dlivrReadHeightWeight({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState

      if (!patient || !patient.id) {
        return []
      }

      const { BodyMassIndex } = FHIR_CODES.PhysicalExaminationComplete.include

      const bmiCoding = BodyMassIndex.code.coding[0]

      const response = yield call(readResource, {
        resourceType: 'Observation',
        patient: localState.patient.id,
        code: `${bmiCoding.system}|${bmiCoding.code}`,
        _include: ['Observation:derived-from'],
        _sort: '-date',
        _count: 1,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return []
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))
      const resourceDictionary = createResourceDictionary(resourceArray)

      const dataSource = {}

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation']
          .filter(observation => {
            return codeIntersects(observation.code, BodyMassIndex.code)
          })
          .forEach(bmiObservation => {
            const weightAndHeight = bmiObservation.derivedFrom.map(
              derivedFrom => {
                return findByReference(
                  resourceDictionary['Observation'],
                  derivedFrom
                )
              }
            )

            dataSource['height'] = (
              weightAndHeight.find(observation => {
                return codeIntersects(
                  observation.code,
                  BodyMassIndex.include.BodyHeight.code
                )
              }) || {}
            ).valueQuantity.value

            dataSource['weight'] = (
              weightAndHeight.find(observation => {
                return codeIntersects(
                  observation.code,
                  BodyMassIndex.include.BodyWeight.code
                )
              }) || {}
            ).valueQuantity.value

            dataSource['bodyMassIndex'] = bmiObservation.valueQuantity.value
          })

      return dataSource
    },
    /* #endregion */

    /* #region  General Physical Finding */
    *generalPhysicalFindingAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { formValues } = payload

      const {
        patient,
        briefGeneralExaminationSections,
        physicalExaminationSections,
      } = localState

      const { PhysicalExaminationComplete, Observations } = FHIR_CODES

      const { Interpretation } = Observations
      const {
        componentSection,
        componentWithBodySite,
        valueCodeableConceptSection,
        valueCodeableConceptWithNote,
        valueCodeableConceptWithBodySite,
      } = formValues

      console.log('form values', formValues)

      const { GeneralPhysicalFinding } = PhysicalExaminationComplete.include
      const { LymphoidNodule, JointObservable } = GeneralPhysicalFinding.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'General Physical Finding',
        author: Practitioner.getReference(),
        code: GeneralPhysicalFinding.code,
      }

      const observationEntries = []
      const observationObject = {}

      valueCodeableConceptSection &&
        Object.keys(valueCodeableConceptSection).forEach(formValue => {
          let interpretationCode

          if (
            codeIntersects(
              valueCodeableConceptSection[formValue].code,
              GeneralPhysicalFinding.include[formValue].default.code
            )
          ) {
            interpretationCode = Interpretation.Normal
          } else {
            interpretationCode = Interpretation.Abnormal
          }

          observationObject[`observation${formValue}`] =
            valueCodeableConceptSection[formValue] &&
            new Observation({
              ...ObservationConstantValues,
              interpretation: interpretationCode,
              code: GeneralPhysicalFinding.include[formValue].code,
              valueCodeableConcept: valueCodeableConceptSection[formValue].code,
            })

          console.log(formValue, observationObject[`observation${formValue}`])
        })

      if (valueCodeableConceptWithBodySite.Edema) {
        let bodySite
        let interpretationCode
        const component = []

        if (
          valueCodeableConceptWithBodySite.Edema.component &&
          Object.values(valueCodeableConceptWithBodySite.Edema.component)
            .length === 1
        ) {
          bodySite = {
            ...Object.values(
              valueCodeableConceptWithBodySite.Edema.component
            ).find(v => v.code).code,
          }
        } else {
          valueCodeableConceptWithBodySite.Edema.component &&
            Object.keys(
              valueCodeableConceptWithBodySite.Edema.component
            ).forEach(componentValue => {
              component.push({
                code: valueCodeableConceptWithBodySite.Edema.code,
                valueCodeableConcept:
                  valueCodeableConceptWithBodySite.Edema.component[
                    componentValue
                  ].code,
              })
            })
        }

        if (
          codeIntersects(
            valueCodeableConceptWithBodySite.Edema.code,
            GeneralPhysicalFinding.include.Edema.default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        observationObject['observationEdema'] = new Observation({
          ...ObservationConstantValues,
          interpretation: interpretationCode,
          code: GeneralPhysicalFinding.include.Edema.code,
          valueCodeableConcept: valueCodeableConceptWithBodySite.Edema.code,
          bodySite: bodySite,
          component: component.length > 0 ? component : undefined,
        })

        console.log('Edema', observationObject['observationEdema'])
      }

      if (componentSection) {
        const component = []

        Object.keys(componentSection.JointObservable).forEach(formValue => {
          componentSection.JointObservable[formValue] &&
            component.push({
              code: JointObservable.component[formValue].code,
              valueCodeableConcept:
                componentSection.JointObservable[formValue].code,
            })
        })

        observationObject[`observationJointObservable`] = new Observation({
          ...ObservationConstantValues,
          code: JointObservable.code,
          component: component.length > 0 && component,
        })

        console.log(
          'JointObservable',
          observationObject[`observationJointObservable`]
        )
      }

      if (componentWithBodySite && componentWithBodySite.LymphoidNodule) {
        let interpretationCode

        if (
          codeIntersects(
            LymphoidNodule.default.Size.code,
            componentWithBodySite.LymphoidNodule.Size.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        if (
          codeIntersects(
            LymphoidNodule.default.Size.code,
            componentWithBodySite.LymphoidNodule.Size.code
          )
        ) {
          console.log(componentWithBodySite)
          observationObject[`observationLymphoidNodule`] = new Observation({
            ...ObservationConstantValues,
            code: interpretationCode,
            interpretation: Interpretation.Normal,
            component: [
              {
                code: LymphoidNodule.component.Size.code,
                valueCodeableConcept: componentWithBodySite.LymphoidNodule.Size,
              },
            ],
          })

          console.log(
            'LymphoidNodule',
            observationObject[`observationLymphoidNodule`]
          )
        } else {
          const { bodySite, Size, Pain } = componentWithBodySite.LymphoidNodule
          const component = []

          Size &&
            component.push({
              code: LymphoidNodule.component.Size.code,
              valueCodeableConcept: Size.code,
            })

          Pain &&
            component.push({
              code: LymphoidNodule.component.Pain.code,
              valueCodeableConcept: Pain.code,
            })

          Object.keys(bodySite).forEach(formValue => {
            observationObject[`observation${formValue}`] = new Observation({
              ...ObservationConstantValues,
              code: LymphoidNodule.code,
              interpretation: interpretationCode,
              bodySite: bodySite[formValue] && bodySite[formValue].code,
              component: component.length > 0 ? component : undefined,
            })

            console.log(formValue, observationObject[`observation${formValue}`])
          })
        }
      }

      if (valueCodeableConceptWithNote) {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptWithNote.Rashes.code,
            GeneralPhysicalFinding.include.Rashes.default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        const note = valueCodeableConceptWithNote.Rashes.note &&
          valueCodeableConceptWithNote.Rashes.note !== '' && [
            {
              time: getInstant(),
              authorReference: Practitioner.getReference(),
              text: valueCodeableConceptWithNote.Rashes.note,
            },
          ]

        observationObject['observationRashes'] =
          valueCodeableConceptWithNote.Rashes.code &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code: GeneralPhysicalFinding.include.Rashes.code,
            valueCodeableConcept: valueCodeableConceptWithNote.Rashes.code,
            note,
          })

        console.log('Rashes', observationObject['observationRashes'])
      }

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log('General Physical Finding Add', observationEntries)

      let compositionEntry

      if (componentSection) {
        compositionEntry = {
          physicalExaminationSections: {
            ...physicalExaminationSections,
            GeneralPhysicalFinding: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      } else {
        compositionEntry = {
          briefGeneralExaminationSections: {
            ...briefGeneralExaminationSections,
            GeneralPhysicalFinding: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  Physical Findings of GastrointestinalSystem */
    *physicalFindingsOfGastrointestinalSystemAdd(
      { payload },
      { select, call, put }
    ) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { formValues } = payload
      const {
        patient,
        briefGeneralExaminationSections,
        physicalExaminationSections,
      } = localState

      const {
        componentSection,
        hasMemberSection,
        componentsSection,
        valueStringSection,
        valueCodeableConceptSection,
      } = formValues

      const { PhysicalExaminationComplete, Observations } = FHIR_CODES
      const { Interpretation } = Observations

      const {
        PhysicalFindingsOfGastrointestinalSystem,
      } = PhysicalExaminationComplete.include

      const {
        FindingOfLiverGallbladderAndSpleen,
      } = PhysicalFindingsOfGastrointestinalSystem.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'Physical Findings Of Cardiovascular System',
        author: Practitioner.getReference(),
        code: PhysicalFindingsOfGastrointestinalSystem.code,
      }

      const observationEntries = []
      const observationObject = {}

      const observationHepaticDiseaseSymptomsObject = []
      const observationHepaticDiseaseSymptomsEntries = []

      console.log(formValues)

      Object.keys(valueCodeableConceptSection).forEach(formValue => {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptSection[formValue].code,
            PhysicalFindingsOfGastrointestinalSystem.include[formValue].default
              .code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        observationObject[`observation${formValue}`] =
          valueCodeableConceptSection[formValue] &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code:
              PhysicalFindingsOfGastrointestinalSystem.include[formValue].code,
            valueCodeableConcept: valueCodeableConceptSection[formValue].code,
          })
      })

      observationObject[`observationAbdominalShape`] =
        valueStringSection &&
        valueStringSection.AbdominalShape &&
        valueStringSection.AbdominalShape.code &&
        new Observation({
          ...ObservationConstantValues,
          code:
            PhysicalFindingsOfGastrointestinalSystem.include.AbdominalShape
              .code,
          valueCodeableConcept: valueStringSection.AbdominalShape.code,
        })

      observationObject[`observationGastricTympany`] =
        componentSection &&
        componentSection.GastricTympany &&
        new Observation({
          ...ObservationConstantValues,
          code:
            PhysicalFindingsOfGastrointestinalSystem.include.GastricTympany
              .code,
          component: componentSection.GastricTympany.component
            ? [{ code: componentSection.GastricTympany.component.code }]
            : undefined,
          valueCodeableConcept: componentSection.GastricTympany.code,
        })

      componentsSection &&
        Object.keys(componentsSection).forEach(formValue => {
          const observationComponent = []

          componentsSection[formValue] &&
            Object.keys(componentsSection[formValue]).forEach(
              componentValue => {
                componentsSection[formValue][componentValue].code &&
                  observationComponent.push({
                    code:
                      PhysicalFindingsOfGastrointestinalSystem.include[
                        formValue
                      ].component[componentValue].code,
                    valueCodeableConcept:
                      componentsSection[formValue][componentValue].code,
                  })
              }
            )

          observationObject[`observation${formValue}`] = new Observation({
            ...ObservationConstantValues,
            code:
              PhysicalFindingsOfGastrointestinalSystem.include[formValue].code,
            component:
              observationComponent.length > 0
                ? observationComponent
                : undefined,
          })

          console.log(
            'observation component',
            observationObject[`observation${formValue}`]
          )
        })

      if (
        hasMemberSection &&
        hasMemberSection.FindingOfLiverGallbladderAndSpleen
      ) {
        const {
          LiverSize,
          SpleenSizeByPalpation,
          HepaticDiseaseSymptoms,
        } = hasMemberSection.FindingOfLiverGallbladderAndSpleen

        console.log(hasMemberSection.FindingOfLiverGallbladderAndSpleen)

        const liverSizeNote = LiverSize &&
          LiverSize.note &&
          LiverSize.note !== '' && [
            {
              authorReference: Practitioner.getReference(),
              time: getInstant(),
              text: LiverSize.note + 'cm below the rib cage',
            },
          ]

        observationHepaticDiseaseSymptomsObject['observationLiverSize'] =
          LiverSize &&
          new Observation({
            ...ObservationConstantValues,
            code: FindingOfLiverGallbladderAndSpleen.hasMember.LiverSize.code,
            valueCodeableConcept: LiverSize.code,
            note: liverSizeNote,
          })

        observationHepaticDiseaseSymptomsObject[
          'observationSpleenSizeByPalpation'
        ] =
          SpleenSizeByPalpation &&
          new Observation({
            ...ObservationConstantValues,
            code:
              FindingOfLiverGallbladderAndSpleen.hasMember.SpleenSizeByPalpation
                .code,
            valueCodeableConcept: SpleenSizeByPalpation.code,
          })

        HepaticDiseaseSymptoms &&
          HepaticDiseaseSymptoms.code &&
          Object.keys(HepaticDiseaseSymptoms.code).forEach(symptomValue => {
            observationHepaticDiseaseSymptomsObject[
              `observation${symptomValue}`
            ] =
              HepaticDiseaseSymptoms.code[symptomValue] &&
              new Observation({
                ...ObservationConstantValues,
                code:
                  FindingOfLiverGallbladderAndSpleen.hasMember
                    .HepaticDiseaseSymptoms.code,
                component:
                  symptomValue === 'Pain' &&
                  !isEmptyObject(HepaticDiseaseSymptoms.component)
                    ? [{ code: HepaticDiseaseSymptoms.component.code }]
                    : undefined,
                valueCodeableConcept:
                  HepaticDiseaseSymptoms.code[symptomValue].code,
              })
          })
      }

      console.log(observationHepaticDiseaseSymptomsObject)

      observationHepaticDiseaseSymptomsObject &&
        Object.values(observationHepaticDiseaseSymptomsObject).forEach(
          observation =>
            observation &&
            observationHepaticDiseaseSymptomsEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log(observationHepaticDiseaseSymptomsEntries)

      observationObject[`observationFindingOfLiverGallbladderAndSpleen`] =
        observationHepaticDiseaseSymptomsEntries.length > 0 &&
        new Observation({
          ...ObservationConstantValues,
          code: FindingOfLiverGallbladderAndSpleen.code,
          hasMember: observationHepaticDiseaseSymptomsEntries.map(entry => {
            return { reference: entry.fullUrl }
          }),
        })

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log(observationEntries)

      let compositionEntry

      if (formValues.componentsSection) {
        compositionEntry = {
          physicalExaminationSections: {
            ...physicalExaminationSections,
            PhysicalFindingsOfGastrointestinalSystem: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [
                ...observationEntries,
                ...observationHepaticDiseaseSymptomsEntries,
              ],
            },
          },
        }
      } else {
        compositionEntry = {
          briefGeneralExaminationSections: {
            ...briefGeneralExaminationSections,
            PhysicalFindingsOfGastrointestinalSystem: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [
                ...observationEntries,
                ...observationHepaticDiseaseSymptomsEntries,
              ],
            },
          },
        }
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  Physical Findings of Tract */
    *physicalFindingsOfGenitourinaryTractAdd(
      { payload },
      { select, call, put }
    ) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const {
        valueCodeableConcepts,
        valueCodeableConceptSection,
        valueCodeableConceptWithBodySiteSection,
        valueCodeableConceptWithComponentSection,
      } = payload.formValues

      const {
        patient,
        briefGeneralExaminationSections,
        physicalExaminationSections,
      } = localState

      const { PhysicalExaminationComplete, Observations } = FHIR_CODES
      const { Interpretation } = Observations

      const {
        PhysicalFindingsOfGenitourinaryTract,
      } = PhysicalExaminationComplete.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'Physical Findings Of Genitourinary Tract',
        author: Practitioner.getReference(),
        code: PhysicalFindingsOfGenitourinaryTract.code,
      }

      const observationEntries = []
      const observationObject = {}

      Object.keys(valueCodeableConceptSection).forEach(formValue => {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptSection[formValue].code,
            PhysicalFindingsOfGenitourinaryTract.include[formValue].default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        observationObject[`observation${formValue}`] =
          valueCodeableConceptSection[formValue] &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code: PhysicalFindingsOfGenitourinaryTract.include[formValue].code,
            valueCodeableConcept: valueCodeableConceptSection[formValue].code,
          })

        console.log(formValue, observationObject[`observation${formValue}`])
      })

      if (valueCodeableConceptWithComponentSection) {
        const { Nocturia } = PhysicalFindingsOfGenitourinaryTract.include

        console.log(valueCodeableConceptWithComponentSection)
        observationObject['observationNocturia'] =
          valueCodeableConceptWithComponentSection.Nocturia.code &&
          new Observation({
            ...ObservationConstantValues,
            code: Nocturia.code,
            valueCodeableConcept:
              valueCodeableConceptWithComponentSection.Nocturia.code,
            component: valueCodeableConceptWithComponentSection.Nocturia
              .component && [
              {
                code: Nocturia.include.Present.component.code,
                valueInteger: parseInt(
                  valueCodeableConceptWithComponentSection.Nocturia.component
                ),
              },
            ],
          })

        console.log('Nocturia', observationObject['observationNocturia'])
      }

      if (valueCodeableConcepts) {
        Object.keys(valueCodeableConcepts.RenalAngleTenderness).forEach(
          formValue => {
            observationObject[`observation${formValue}`] =
              valueCodeableConcepts.RenalAngleTenderness[formValue].code &&
              new Observation({
                ...ObservationConstantValues,
                code:
                  PhysicalFindingsOfGenitourinaryTract.include
                    .RenalAngleTenderness.code,
                valueCodeableConcept:
                  valueCodeableConcepts.RenalAngleTenderness[formValue].code,
              })

            console.log(formValue, observationObject[`observation${formValue}`])
          }
        )
      }

      if (valueCodeableConceptWithBodySiteSection) {
        let interpretationCode

        if (
          valueCodeableConceptSection.OnExaminationKidneyPalpated &&
          codeIntersects(
            valueCodeableConceptSection.OnExaminationKidneyPalpated.code,
            PhysicalFindingsOfGenitourinaryTract.include
              .OnExaminationKidneyPalpated.default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        const {
          bodySite,
        } = valueCodeableConceptWithBodySiteSection.OnExaminationKidneyPalpated

        const newObservation = new Observation({
          ...ObservationConstantValues,
          code:
            PhysicalFindingsOfGenitourinaryTract.include
              .OnExaminationKidneyPalpated.code,
          interpretation: interpretationCode,
          valueCodeableConcept:
            valueCodeableConceptWithBodySiteSection.OnExaminationKidneyPalpated
              .code,
        })

        if (bodySite) {
          Object.keys(bodySite).forEach(bodySiteValue => {
            observationObject[bodySiteValue] = new Observation({
              ...ObservationConstantValues,
              ...newObservation,
              bodySite: bodySite[bodySiteValue].code,
            })

            console.log(bodySiteValue, observationObject[bodySiteValue])
          })
        } else {
          observationObject['observationOnExaminationKidneyPalpated'] =
            valueCodeableConceptWithBodySiteSection.OnExaminationKidneyPalpated
              .code &&
            new Observation({
              ...ObservationConstantValues,
              ...newObservation,
            })

          console.log(
            'OnExaminationKidneyPalpated',
            observationObject['observationOnExaminationKidneyPalpated']
          )
        }
      }

      console.log(observationObject)

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log(observationEntries)

      let compositionEntry

      if (!!valueCodeableConceptWithComponentSection) {
        compositionEntry = {
          physicalExaminationSections: {
            ...physicalExaminationSections,
            PhysicalFindingsOfGenitourinaryTract: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      } else {
        compositionEntry = {
          briefGeneralExaminationSections: {
            ...briefGeneralExaminationSections,
            PhysicalFindingsOfGenitourinaryTract: {
              ...updateStateConstantValues,
              entries: [...observationEntries],
              bundles: [...observationEntries],
            },
          },
        }
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  Physical Findings of Nervous System */
    *physicalFindingsOfNervousSystemAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient, physicalExaminationSections } = localState
      const { PhysicalExaminationComplete, Observations } = FHIR_CODES
      const { Interpretation } = Observations

      const { valueCodeableConceptSection } = payload.formValues
      const {
        PhysicalFindingsOfNervousSystem,
      } = PhysicalExaminationComplete.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'Physical Findings Of Nervous System',
        author: Practitioner.getReference(),
        code: PhysicalFindingsOfNervousSystem.code,
      }

      const observationEntries = []
      const observationObject = {}

      Object.keys(valueCodeableConceptSection).forEach(formValue => {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptSection[formValue].code,
            PhysicalFindingsOfNervousSystem.include[formValue].default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        observationObject[`observation${formValue}`] =
          valueCodeableConceptSection[formValue] &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code: PhysicalFindingsOfNervousSystem.include[formValue].code,
            valueCodeableConcept: valueCodeableConceptSection[formValue].code,
          })

        console.log(formValue, observationObject[`observation${formValue}`])
      })

      console.log(observationObject)

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      const compositionEntry = {
        physicalExaminationSections: {
          ...physicalExaminationSections,
          PhysicalFindingsOfNervousSystem: {
            ...updateStateConstantValues,
            entries: [...observationEntries],
            bundles: [...observationEntries],
          },
        },
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  Physical Findings Sensation */
    *physicalFindingsSensationAdd({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient, physicalExaminationSections } = localState
      const { PhysicalExaminationComplete, Observations } = FHIR_CODES
      const { Interpretation } = Observations
      const { PhysicalFindingsSensation } = PhysicalExaminationComplete.include

      const {
        valueCodeableConceptSection,
        valueCodeableConceptWithNote,
      } = payload.formValues

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'Physical Findings Of Nervous System',
        author: Practitioner.getReference(),
        code: PhysicalFindingsSensation.code,
      }

      const observationEntries = []
      const observationObject = {}

      Object.keys(valueCodeableConceptSection).forEach(formValue => {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptSection[formValue].code,
            PhysicalFindingsSensation.include[formValue].default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        observationObject[`observation${formValue}`] =
          valueCodeableConceptSection[formValue] &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code: PhysicalFindingsSensation.include[formValue].code,
            valueCodeableConcept: valueCodeableConceptSection[formValue].code,
          })

        console.log(formValue, observationObject[`observation${formValue}`])
      })

      if (valueCodeableConceptWithNote) {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptWithNote.MentalStateFinding.code,
            PhysicalFindingsSensation.include.MentalStateFinding.default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        const note = valueCodeableConceptWithNote.MentalStateFinding.note &&
          valueCodeableConceptWithNote.MentalStateFinding.note !== '' && [
            {
              time: getInstant(),
              authorReference: Practitioner.getReference(),
              text: valueCodeableConceptWithNote.MentalStateFinding.note,
            },
          ]

        observationObject['observationMentalStateFinding'] =
          valueCodeableConceptWithNote.MentalStateFinding.code &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code: PhysicalFindingsSensation.include.MentalStateFinding.code,
            valueCodeableConcept:
              valueCodeableConceptWithNote.MentalStateFinding.code,
            note: note,
          })

        console.log(
          'MentalStateFinding',
          observationObject['observationMentalStateFinding']
        )
      }

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log(observationEntries)

      const compositionEntry = {
        physicalExaminationSections: {
          ...physicalExaminationSections,
          PhysicalFindingsSensation: {
            ...updateStateConstantValues,
            entries: [...observationEntries],
            bundles: [...observationEntries],
          },
        },
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  Physical Findings of Respiratory System */
    *physicalFindingsOfRespiratorySystemAdd(
      { payload },
      { select, call, put }
    ) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient, physicalExaminationSections } = localState

      const { formValues } = payload
      const {
        valueCodeableConceptSection,
        valueCodeableConceptSectionWithComponent,
        valueCodeableConceptSectionWithComponents,
      } = formValues

      const { PhysicalExaminationComplete, Observations } = FHIR_CODES
      const { Interpretation } = Observations

      const {
        PhysicalFindingsOfRespiratorySystem,
      } = PhysicalExaminationComplete.include

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'Physical Findings Of Respiratory System',
        author: Practitioner.getReference(),
        code: PhysicalFindingsOfRespiratorySystem.code,
      }

      const observationEntries = []
      const observationObject = {}

      Object.keys(valueCodeableConceptSection).forEach(formValue => {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptSection[formValue].code,
            PhysicalFindingsOfRespiratorySystem.include[formValue].default.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        observationObject[`observation${formValue}`] =
          valueCodeableConceptSection[formValue] &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code: PhysicalFindingsOfRespiratorySystem.include[formValue].code,
            valueCodeableConcept: valueCodeableConceptSection[formValue].code,
          })

        console.log(formValue, observationObject[`observation${formValue}`])
      })

      Object.keys(valueCodeableConceptSectionWithComponent).forEach(
        formValue => {
          console.log(valueCodeableConceptSectionWithComponent)

          const formValueComponent =
            valueCodeableConceptSectionWithComponent[formValue].component
          let interpretationCode

          if (
            codeIntersects(
              valueCodeableConceptSectionWithComponent[formValue].code,
              PhysicalFindingsOfRespiratorySystem.include[formValue].default
                .code
            )
          ) {
            interpretationCode = Interpretation.Normal
          } else {
            interpretationCode = Interpretation.Abnormal
          }

          // энэ хэсэгт хэрэглэгч ямар нэгэн товчлуур дарах үед code гэсэн
          // нэрэн доор утга орж ирж байгаа. ямар нэгэн товчлуур дарахгүйгээр
          // хадгалах дарах үед default утга codeable concept байгаа

          console.log(formValueComponent)

          observationObject[`observation${formValue}`] =
            valueCodeableConceptSectionWithComponent[formValue] &&
            new Observation({
              ...ObservationConstantValues,
              code: PhysicalFindingsOfRespiratorySystem.include[formValue].code,
              interpretation: interpretationCode,
              valueCodeableConcept:
                valueCodeableConceptSectionWithComponent[formValue].code,
              component: formValueComponent && [
                { code: formValueComponent.code },
              ],
            })

          console.log(formValue, observationObject[`observation${formValue}`])
        }
      )

      Object.keys(valueCodeableConceptSectionWithComponents).forEach(
        formValue => {
          const formValueComponent =
            valueCodeableConceptSectionWithComponents[formValue].component
          let interpretationCode

          console.log(valueCodeableConceptSectionWithComponents)

          if (
            codeIntersects(
              valueCodeableConceptSectionWithComponents[formValue].code,
              PhysicalFindingsOfRespiratorySystem.include[formValue].default
                .code
            )
          ) {
            interpretationCode = Interpretation.Normal
          } else {
            interpretationCode = Interpretation.Abnormal
          }

          const component = []

          formValueComponent &&
            Object.keys(formValueComponent).forEach(componentKey => {
              Object.values(formValueComponent[componentKey]).forEach(
                componentValue => {
                  if (
                    PhysicalFindingsOfRespiratorySystem.include[formValue]
                      .component[componentKey].code
                  ) {
                    component.push({
                      code:
                        PhysicalFindingsOfRespiratorySystem.include[formValue]
                          .component[componentKey].code,
                      valueCodeableConcept: componentValue.code,
                    })
                  } else {
                    component.push({ code: componentValue.code })
                  }
                }
              )
            })

          observationObject[`observation${formValue}`] =
            valueCodeableConceptSectionWithComponents[formValue] &&
            new Observation({
              ...ObservationConstantValues,
              code: PhysicalFindingsOfRespiratorySystem.include[formValue].code,
              interpretation: interpretationCode,
              valueCodeableConcept:
                valueCodeableConceptSectionWithComponents[formValue].code,
              component: component.length > 0 ? component : undefined,
            })

          console.log(formValue, observationObject[`observation${formValue}`])
        }
      )

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      console.log(
        'Physical Findings Of Respiratory System Add',
        observationEntries
      )

      const compositionEntry = {
        physicalExaminationSections: {
          ...physicalExaminationSections,
          PhysicalFindingsOfRespiratorySystem: {
            ...updateStateConstantValues,
            entries: [...observationEntries],
            bundles: [...observationEntries],
          },
        },
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  Physical Findings Of Cardiovascular System */
    *physicalFindingsOfCardiovascularSystemAdd(
      { payload },
      { select, call, put }
    ) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient, physicalExaminationSections } = localState
      const { formValues } = payload

      const {
        PhysicalExaminationComplete,
        UnitsOfMeasure,
        Observations,
      } = FHIR_CODES
      const {
        PhysicalFindingsOfCardiovascularSystem,
      } = PhysicalExaminationComplete.include

      const { HeartMurmur } = PhysicalFindingsOfCardiovascularSystem.include
      const { Interpretation } = Observations

      const ObservationConstantValues = {
        status: 'final',
        subject: patient.getReference(),
        issued: getInstant(),
      }

      const updateStateConstantValues = {
        title: 'Physical Findings Of Cardiovascular System',
        author: Practitioner.getReference(),
        code: PhysicalFindingsOfCardiovascularSystem.code,
      }

      const observationEntries = []
      const observationHasMemberEntries = []
      const observationObject = {}

      const {
        componentSection,
        hasMemberSection,
        valueCodeableConceptSection,
      } = formValues

      Object.keys(valueCodeableConceptSection).forEach(formValue => {
        let interpretationCode

        if (
          codeIntersects(
            valueCodeableConceptSection[formValue].code,
            PhysicalFindingsOfCardiovascularSystem.include[formValue].default
              .code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        observationObject[`observation${formValue}`] =
          valueCodeableConceptSection[formValue] &&
          new Observation({
            ...ObservationConstantValues,
            interpretation: interpretationCode,
            code:
              PhysicalFindingsOfCardiovascularSystem.include[formValue].code,
            valueCodeableConcept: valueCodeableConceptSection[formValue].code,
          })

        console.log(formValue, observationObject[`observation${formValue}`])
      })

      hasMemberSection &&
        Object.keys(hasMemberSection).forEach(sectionValue => {
          const hasMemberObservation = {}
          const hasMemberObservationEntry = []

          Object.keys(hasMemberSection[sectionValue]).forEach(memberValue => {
            let newObservation

            if (hasMemberSection[sectionValue][memberValue].code) {
              let interpretationCode

              if (
                codeIntersects(
                  hasMemberSection[sectionValue][memberValue].code,
                  PhysicalFindingsOfCardiovascularSystem.include[sectionValue]
                    .default[memberValue].code
                )
              ) {
                interpretationCode = Interpretation.Normal
              } else {
                interpretationCode = Interpretation.Abnormal
              }

              newObservation =
                hasMemberSection[sectionValue][memberValue] &&
                new Observation({
                  ...ObservationConstantValues,
                  interpretation: interpretationCode,
                  code:
                    PhysicalFindingsOfCardiovascularSystem.include[sectionValue]
                      .hasMember[memberValue].code,
                  valueCodeableConcept:
                    hasMemberSection[sectionValue][memberValue].code,
                })
            } else {
              console.log(hasMemberSection)
              newObservation =
                hasMemberSection[sectionValue][memberValue] &&
                new Observation({
                  ...ObservationConstantValues,
                  code:
                    PhysicalFindingsOfCardiovascularSystem.include[sectionValue]
                      .hasMember[memberValue].code,
                  valueQuantity: {
                    ...UnitsOfMeasure.Minute,
                    value: parseInt(
                      hasMemberSection[sectionValue][memberValue]
                    ),
                  },
                })
            }

            hasMemberObservation[`observation${memberValue}`] =
              newObservation && newObservation

            console.log(
              `has member ${memberValue}`,
              hasMemberObservation[`observation${memberValue}`]
            )
          })

          hasMemberObservation &&
            Object.values(hasMemberObservation).forEach(observation => {
              const bundleEntry =
                observation &&
                new BundleEntry(
                  pushRequest({ newResource: observation }, 'POST')
                )

              hasMemberObservationEntry.push(bundleEntry)
              observationHasMemberEntries.push(bundleEntry)
            })

          observationObject[`observation${sectionValue}`] =
            hasMemberSection[sectionValue] &&
            new Observation({
              ...ObservationConstantValues,
              code:
                PhysicalFindingsOfCardiovascularSystem.include[sectionValue]
                  .code,
              hasMember:
                hasMemberObservationEntry.length > 0 &&
                hasMemberObservationEntry.map(entry => {
                  return { reference: entry.fullUrl }
                }),
            })

          console.log(
            sectionValue,
            observationObject[`observation${sectionValue}`]
          )
        })

      if (componentSection.HeartMurmur) {
        const { component, code } = componentSection.HeartMurmur
        const observationComponent = []
        let interpretationCode

        if (
          codeIntersects(
            HeartMurmur.default.code,
            componentSection.HeartMurmur.code
          )
        ) {
          interpretationCode = Interpretation.Normal
        } else {
          interpretationCode = Interpretation.Abnormal
        }

        component &&
          Object.keys(component).forEach(componentElement => {
            if (component[componentElement].code) {
              observationComponent.push({
                code: HeartMurmur.component[componentElement].code,
                valueCodeableConcept: component[componentElement].code,
              })
            } else {
              Object.keys(component[componentElement]).forEach(
                componentSubElement =>
                  component[componentElement][componentSubElement] &&
                  observationComponent.push({
                    code: HeartMurmur.component[componentElement].code,
                    valueCodeableConcept:
                      component[componentElement][componentSubElement].code,
                  })
              )
            }
          })

        observationObject['observationHeartMurmur'] = new Observation({
          ...ObservationConstantValues,
          code: HeartMurmur.code,
          valueCodeableConcept: code,
          interpretation: interpretationCode,
          component:
            observationComponent.length > 0 ? observationComponent : undefined,
        })

        console.log('HeartMurmur', observationObject['observationHeartMurmur'])
      }

      observationObject &&
        Object.values(observationObject).forEach(
          observation =>
            observation &&
            observationEntries.push(
              new BundleEntry(pushRequest({ newResource: observation }, 'POST'))
            )
        )

      const compositionEntry = {
        physicalExaminationSections: {
          ...physicalExaminationSections,
          PhysicalFindingsOfCardiovascularSystem: {
            ...updateStateConstantValues,
            entries: [...observationEntries],
            bundles: [...observationEntries, ...observationHasMemberEntries],
          },
        },
      }

      yield put({
        type: 'updateState',
        payload: compositionEntry,
      })
    },
    /* #endregion */

    /* #region  Brief General Examination and Physical Examination */
    *briefGeneralExaminationSave({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES, Practitioner } = globalState
      const { patient, briefGeneralExaminationSections } = localState

      console.log(localState)
      console.log(briefGeneralExaminationSections)

      if (!isEmptyObject(briefGeneralExaminationSections)) {
        const sections = []
        const bundleEntries = []

        Object.values(briefGeneralExaminationSections).forEach(
          briefHistorySection => {
            bundleEntries.push(...briefHistorySection.bundles)

            sections.push({
              code: briefHistorySection.code,
              title: briefHistorySection.title,
              author: briefHistorySection.author,
              entry: briefHistorySection.entries.map(entry => {
                return { reference: entry.fullUrl }
              }),
            })
          }
        )

        const briefHistoryComposition = new Composition({
          status: 'final',
          title: 'Brief General Examintion',
          date: getInstant(),
          subject: patient.getReference(),
          author: Practitioner.getReference(),
          type: FHIR_CODES.BriefGeneralExamination.code,
          section: sections,
        })

        const briefHistoryCompositionEntry = new BundleEntry(
          pushRequest({ newResource: briefHistoryComposition }, 'POST')
        )

        const transactionEntries = [
          ...bundleEntries,
          briefHistoryCompositionEntry,
        ]

        const bundle = new Bundle({
          type: 'transaction',
          entry: transactionEntries,
        })

        console.log('BRIEF GENERAL EXAMINATION BUNDLE', bundle)

        const json = bundle.toJSON()
        const response = yield call(batch_transaction_request, json)

        if (response && response.success) {
          yield put({
            type: 'updateState',
            payload: {
              lastUpdatedExamination: getInstant(),
            },
          })

          return 'success'
        } else {
          return 'error'
        }
      } else {
        return 'info'
      }
    },

    *physicalExaminationSave({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { FHIR_CODES, Practitioner } = globalState
      const { patient, physicalExaminationSections } = localState

      console.log(physicalExaminationSections)

      if (!isEmptyObject(physicalExaminationSections)) {
        const sections = []
        const bundleEntries = []

        Object.values(physicalExaminationSections).forEach(
          physicalExaminationSection => {
            bundleEntries.push(...physicalExaminationSection.bundles)

            sections.push({
              code: physicalExaminationSection.code,
              title: physicalExaminationSection.title,
              author: physicalExaminationSection.author,
              entry: physicalExaminationSection.entries.map(entry => {
                return { reference: entry.fullUrl }
              }),
            })
          }
        )

        const physicalExaminationComposition = new Composition({
          status: 'final',
          title: 'Physical Examination',
          date: getInstant(),
          subject: patient.getReference(),
          author: Practitioner.getReference(),
          type: FHIR_CODES.PhysicalExaminationComplete.code,
          section: sections,
        })

        const physicalExaminationCompositionEntry = new BundleEntry(
          pushRequest({ newResource: physicalExaminationComposition }, 'POST')
        )

        const transactionEntries = [
          ...bundleEntries,
          physicalExaminationCompositionEntry,
        ]

        const bundle = new Bundle({
          type: 'transaction',
          entry: transactionEntries,
        })

        console.log('GENERAL PHYSICAL FINDING BUNDLE', bundle)

        const json = bundle.toJSON()
        const response = yield call(batch_transaction_request, json)

        if (response && response.success) {
          yield put({
            type: 'updateState',
            payload: {
              lastUpdatedExamination: getInstant(),
            },
          })

          return 'success'
        } else {
          return 'error'
        }
      } else {
        return 'info'
      }
    },
    /* #endregion */

    /* #region  Query examination */
    *queryExamination({ payload }, { select, call, put }) {
      const { FHIR_CODES, Practitioner } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState

      if (!patient || !patient.id) {
        return
      }

      const {
        BriefGeneralExamination,
        PhysicalExaminationComplete,
        Observations,
      } = FHIR_CODES

      const { Interpretation } = Observations

      const generalExaminationCode = BriefGeneralExamination.code.coding[0]
      const physicalExaminationCode = PhysicalExaminationComplete.code.coding[0]

      const type = `${generalExaminationCode.system}|${generalExaminationCode.code},${physicalExaminationCode.system}|${physicalExaminationCode.code}`

      const requestPayload = {
        resourceType: 'Composition',
        type: type,
        patient: patient.id,
        _include: ['Composition:author', 'Composition:entry:Observation'],
        '_include:iterate': ['Observation:has-member'],
        _count: payload._count,
        _page: payload._page,
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const physicalExaminationList = []
      const briefGeneralExaminationList = []

      resourceDictionary['Composition'].forEach(composition => {
        if (codeIntersects(BriefGeneralExamination.code, composition.type)) {
          briefGeneralExaminationList.push(composition)
        } else if (
          codeIntersects(PhysicalExaminationComplete.code, composition.type)
        ) {
          physicalExaminationList.push(composition)
        }
      })

      const patientBriefHistoryList =
        briefGeneralExaminationList.length > 0
          ? generateBriefGeneralExamination(
              PhysicalExaminationComplete,
              Interpretation,
              resourceDictionary,
              briefGeneralExaminationList
            )
          : undefined

      const patientPhysicalExaminationList =
        physicalExaminationList.length > 0
          ? generateGeneralPhysicalFindingExamination(
              PhysicalExaminationComplete,
              Interpretation,
              resourceDictionary,
              physicalExaminationList
            )
          : undefined

      return {
        patientBriefHistoryList: patientBriefHistoryList,
        patientPhysicalExaminationList: patientPhysicalExaminationList,
        pagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 10,
          total: bundle.total,
        },
      }
    },
    /* #endregion */

    /* #region  Query InspectionNote */
    *queryInspectionNote({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const {
        BriefGeneralExamination,
        PhysicalExaminationComplete,
        Observations,
      } = FHIR_CODES

      const { Interpretation } = Observations

      const generalExaminationCode = BriefGeneralExamination.code.coding[0]
      const physicalExaminationCode = PhysicalExaminationComplete.code.coding[0]

      const generalExaminationType = `${generalExaminationCode.system}|${generalExaminationCode.code}`
      const physicalExaminationType = `${physicalExaminationCode.system}|${physicalExaminationCode.code}`

      const requestPayload = {
        resourceType: 'Bundle',
        type: 'batch',
        entry: [
          {
            request: {
              method: 'GET',
              url: [
                `Composition?patient=${patient.id}`,
                `&type=${generalExaminationType}`,
                `&_include=Composition:author`,
                `&_include=Composition:entry:Observation`,
                `&_include:iterate=Observation:has-member`,
                `&_sort=-date`,
                `&_count=1`,
              ].join(''),
            },
          },
          {
            request: {
              method: 'GET',
              url: [
                `Composition?patient=${patient.id}`,
                `&type=${physicalExaminationType}`,
                `&_include=Composition:author`,
                `&_include=Composition:entry:Observation`,
                `&_include:iterate=Observation:has-member`,
                `&_sort=-date`,
                `&_count=1`,
              ].join(''),
            },
          },
        ],
      }

      const response = yield call(batch_transaction_request, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceArrayEntries = []

      resourceArray.forEach(resource => {
        resource.entry.forEach(resourceEntry => {
          resourceArrayEntries.push(resourceEntry.resource)
        })
      })

      if (resourceArrayEntries.length === 0) {
        return
      }

      const resourceDictionary = createResourceDictionary(resourceArrayEntries)

      console.log('Resource Dictionary inspection note', resourceDictionary)

      const physicalExaminationList = []
      const briefGeneralExaminationList = []

      resourceDictionary['Composition'].forEach(composition => {
        if (codeIntersects(BriefGeneralExamination.code, composition.type)) {
          briefGeneralExaminationList.push(composition)
        } else if (
          codeIntersects(PhysicalExaminationComplete.code, composition.type)
        ) {
          physicalExaminationList.push(composition)
        }
      })

      const patientBriefHistoryList =
        briefGeneralExaminationList.length > 0
          ? generateBriefGeneralExamination(
              PhysicalExaminationComplete,
              Interpretation,
              resourceDictionary,
              briefGeneralExaminationList
            )
          : undefined

      const patientPhysicalExaminationList =
        physicalExaminationList.length > 0
          ? generateGeneralPhysicalFindingExamination(
              PhysicalExaminationComplete,
              Interpretation,
              resourceDictionary,
              physicalExaminationList
            )
          : undefined

      return {
        patientBriefHistoryList: patientBriefHistoryList,
        patientPhysicalExaminationList: patientPhysicalExaminationList,
      }
    },
    /* #endregion */

    /* #region  dlivr */
    *queryDlivrInfo({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'Patient',
        _id: patient.id,
        '_revinclude:iterate': 'Group:member',
      }

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      if (resourceDictionary['Group']) {
        const dlivrGroupMain = resourceDictionary['Group'].find(
          group =>
            group.identifier &&
            group.identifier.some(
              identifier =>
                identifier.system ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.Dlivr.system &&
                identifier.value ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.Dlivr.value
            )
        )

        const dlivrGroupExcluded = resourceDictionary['Group'].find(
          group =>
            group.identifier &&
            group.identifier.some(
              identifier =>
                identifier.system ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrExcluded
                    .system &&
                identifier.value ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrExcluded
                    .value
            )
        )

        const dlivrGroupPreScreening = resourceDictionary['Group'].find(
          group =>
            group.identifier &&
            group.identifier.some(
              identifier =>
                identifier.system ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter
                    .DlivrPreScreening.system &&
                identifier.value ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter
                    .DlivrPreScreening.value
            )
        )

        const dlivrGroupScreening = resourceDictionary['Group'].find(
          group =>
            group.identifier &&
            group.identifier.some(
              identifier =>
                identifier.system ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening
                    .system &&
                identifier.value ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening
                    .value
            )
        )

        const dlivrGroupTreatment = resourceDictionary['Group'].find(
          group =>
            group.identifier &&
            group.identifier.some(
              identifier =>
                identifier.system ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrTreatment
                    .system &&
                identifier.value ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrTreatment
                    .value
            )
        )

        const dlivrGroupPostTreatment = resourceDictionary['Group'].find(
          group =>
            group.identifier &&
            group.identifier.some(
              identifier =>
                identifier.system ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter
                    .DlivrPostTreatment.system &&
                identifier.value ===
                  globalState.FHIR_CODES.Identifiers.LiverCenter
                    .DlivrPostTreatment.value
            )
        )

        let dlivrStatus

        const groupObject = {
          dlivrGroupExcluded,
          dlivrGroupPreScreening,
          dlivrGroupScreening,
          dlivrGroupTreatment,
          dlivrGroupPostTreatment,
        }

        Object.keys(groupObject).forEach(groupKey => {
          if (!groupObject[groupKey]) {
            return
          }

          const patientEntry =
            groupObject[groupKey].member &&
            groupObject[groupKey].member.find(member =>
              member.entity.reference.endsWith(`Patient/${payload.id}`)
            )

          if (patientEntry && !patientEntry.inactive) {
            dlivrStatus = groupKey
          }
        })

        yield put({
          type: 'updateState',
          payload: {
            dlivrStatus,
            // dlivrGroupMain,
            // dlivrGroupExcluded,
            // dlivrGroupPreScreening,
            // dlivrGroupScreening,
            // dlivrGroupTreatment,
            // dlivrGroupPostTreatment,
          },
        })
      }
    },

    *dlivrSaveQuestionnare({ payload }, { select, call, put }) {
      console.log(payload)
      // return
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      function getContentType(base64file) {
        return base64file.split(';base64')[0].split(':')[1]
      }

      const { patient } = localState
      const {
        Anti_HDV,
        HDV_RNA,
        HBV_treatment,
        ALAT,
        nativeLanguage,
        ableToTakeMedicine,
        isAdult,
        bodyMassIndex,
        hadBiopsy,
        hasApprovedContraception,
        contraceptionType,
        otherClinicalTrial,
        hadLonafarnib,
        notPregnantOrNursingMother,
        childPhugh_BorC,
        spleenInvalid,
        uploadedAbdominoscopyResult,
        widenedStomach_Esophagus_Veins,
        toGetUpperEndoscopy,
        hewliinHundiiShingentei,
        entsefalopathy,
        busadHepatitis,
        hadLiverCancer,
        hasToxicHabit,
        toxicHabitType,
        aliNegOguulemjteiEseh,
        aliNegOguulemj,
        hetMedregTeswerguiOguulemteiEseh,
        medregTeswerguiOguulemj,
        additionalInfo,
        additionalInfoUpload,
      } = payload.formValues

      const bundleEntries = []

      const additionals = [
        additionalInfo &&
          additionalInfo.length > 0 && {
            valueString: additionalInfo,
          },
        ...(additionalInfoUpload
          ? additionalInfoUpload.map(addintionalFile => {
              return {
                valueAttachment: {
                  contentType: getContentType(addintionalFile),
                  data: addintionalFile,
                },
              }
            })
          : []),
      ].filter(val => !!val)

      /* #region  Questionnare */
      const formResponse = new QuestionnaireResponse({
        subject: patient.getReference(),
        status: 'completed',
        authored: getInstant(),
        author: globalState.Practitioner.getReference(),
        source: globalState.Practitioner.getReference(),
        item: [
          {
            linkId: '1',
            item: [
              {
                linkId: '1.1',
                text:
                  'ХДВ архаг халдвар оношлогдоод хамгийн багадаа 6 сарын хугацаа болсон байх, анти-ХДВ эерэг, тоон полимеразын гинжин урвалаар ХДВ РНХ ≥ 500 IU/ml байгаа нь батлагдсан байх',
                item: [
                  {
                    linkId: '1.1.1',
                    text: 'Anti-HDV',
                    answer: [
                      {
                        valueDate: Anti_HDV.format('YYYY-MM-DD'),
                      },
                    ],
                  },
                  {
                    linkId: '1.1.2',
                    text: 'HDV-RNA',
                    answer: [
                      {
                        valueDate: HDV_RNA.format('YYYY-MM-DD'),
                      },
                    ],
                  },
                ],
              },
              {
                linkId: '1.2',
                text:
                  'Эмчилгээг эхлэхийн өмнө Энтекавир эсвэл Тенофовиртай + Tенофовир алфанамид зэрэг ХВВ эсрэг нуклеот(з)идын эмчилгээг хамгийн багадаа 12 долоо хоногийн хугацаанд хийлгэн ХВВ-ДНХ илэрхий дарангуйлагдсан эсэх (<20 IU/ml)',
                answer: [
                  {
                    valueString: HBV_treatment,
                  },
                ],
              },
              {
                linkId: '1.3',
                text:
                  'Ийлдсийн АЛАТ хэвийн дээд хязгаараас > 1,0 x ULN дахин их бөгөөд 10 дахинаас хэтрээгүй байх',
                answer: [
                  {
                    valueDate: ALAT.format('YYYY-MM-DD'),
                  },
                ],
              },
              {
                linkId: '1.5',
                text:
                  'Өвчтөн тухайн нутгийнхаа хэлээр уншиж, ойлгох чадвартай байх',
                answer: [{ valueString: nativeLanguage }],
              },
              {
                linkId: '1.6',
                text:
                  'Эмийг өөрөө уух болон арьсан дор тарих аргаар хэрэглэх боломжтой байх',
                answer: [{ valueString: ableToTakeMedicine }],
              },
              {
                linkId: '1.7',
                text:
                  '18 ба түүнээс дээш настай эмэгтэй, эрэгтэй хүйсийн хүмүүс',
                answer: [{ valueString: isAdult }],
              },
              {
                linkId: '1.8',
                text:
                  ' Биеийн жингийн индекс ≥18кг/м2 ба 45 кг-аас илүү жинтэй байх',
                answer: [{ valueString: bodyMassIndex }],
              },
              {
                linkId: '1.9',
                text:
                  'Эмчилгээний үе эхлэхээс өмнө 45 хоногийн дотор хийгдсэн, элэгний архаг үрэвслийг илтгэсэн эдийн шинжилгээний хариу байх. Хэрвээ байхгүй бол биопсийн шинжилгээ хийлгэхийг зөвшөөрсөн мөн эсрэг заалтгүй байх',
                answer: [{ valueString: hadBiopsy }],
              },
              hasApprovedContraception
                ? {
                    linkId: '1.12',
                    text:
                      'Хүүхэд тээх чадвартай, идэвхтэй бэлгийн амьдралтай эмэгтэй оролцогч болон хүүхэд тээх чадвартай хамтрагчтай эрэгтэй оролцогчид судалгааны явцад жирэмслэлтээс хамгаалах зохих аргыг судалгааны туршид хэрэглэхийг зөвшөөрсөн байх',
                    answer: [
                      {
                        valueString: hasApprovedContraception,
                        item: [
                          {
                            linkId: '1.12.2',
                            answer: [
                              {
                                valueString: contraceptionType,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  }
                : {
                    linkId: '1.12',
                    text:
                      'Хүүхэд тээх чадвартай, идэвхтэй бэлгийн амьдралтай эмэгтэй оролцогч болон хүүхэд тээх чадвартай хамтрагчтай эрэгтэй оролцогчид судалгааны явцад жирэмслэлтээс хамгаалах зохих аргыг судалгааны туршид хэрэглэхийг зөвшөөрсөн байх',
                    answer: [
                      {
                        valueString: hasApprovedContraception,
                      },
                    ],
                  },
            ],
          },
          {
            linkId: '2',
            item: [
              {
                linkId: '2.1',
                text:
                  'Илрүүлэгт хамрагдахаас өмнө 30 хоногийн дотор эсвэл хагас задралын хугацаа-5 ямар нэг шинэ эмийн клиникийн судалгаанд оролцож байгаа эсэх',
                answer: [
                  {
                    valueString: otherClinicalTrial,
                  },
                ],
              },
              {
                linkId: '2.2',
                text:
                  'Илрүүлэг болон илрүүлгийн өмнөх үед эсвэл судалгаа эхлэхээс 12 сарын дотор Лонафарниб хэрэглэсэн эсэх',
                answer: [
                  {
                    valueString: hadLonafarnib,
                  },
                ],
              },
              {
                linkId: '2.3',
                text:
                  'Жирэмсэн болон хөхүүл эмэгтэйчүүд -Илрүүлгийн үед ийлдэс болон шээсэнд жирэмсний тест сөрөг байх ёстой (хамгийн багадаа мэдрэг чанар 25IU/ml эсвэл хүний хорионы гонадотропинтой эквивалиент түвшинд байх, эмчилгээ эхлэхээс 24 цагийн дотор) Жирэмсэн хамтрагчтай бүх эрэгтэй өвчтнүүд хасагдана',
                answer: [
                  {
                    valueString: notPregnantOrNursingMother,
                  },
                ],
              },
              {
                linkId: '2.4',
                text:
                  'Одоо эсвэл өмнө нь элэгний хатуурлын ээнэгшлээ алдсан байгаа эсэх (Чайлд Пью ангилал B эсвэл С) Чайлд Пью А гэж ангилагдсан (5 оноотой), ээнэгшилтэй бол судалгаанд орохыг зөвшөөрнө',
                answer: [{ valueString: childPhugh_BorC }],
              },
              {
                linkId: '2.7',
                text:
                  'Элэгний венийн судасны даралтын градиент илэрхий ихэссэн нь батлагдсан (≥10mmHg), улаан хоолой, хэвлийн венийн судасны өргөсөлтэй байсан өгүүлэмжтэй, дэлүүний урт >12 см хэмжигдсэн (дэлүү>12см хэмжигдсэн ч бусад элэгний хатуурлын үзүүлэлтүүд хэвийн байвал судалгаанд оролцуулах талаар судалгааны баг хэлэлцэнэ)',
                item: [
                  {
                    linkId: '2.7.1',
                    text: 'Spleen > 12 cm',
                    answer: [{ valueString: spleenInvalid }],
                  },
                  uploadedAbdominoscopyResult && {
                    linkId: '2.7.2',
                    text:
                      'Хэвлийн ЭХО upload Ходоод, улаан хоолой, хэвлийн венийн судасны өргөсөлтэй',
                    answer: uploadedAbdominoscopyResult.map(file => {
                      return {
                        valueAttachment: {
                          contentType: getContentType(file),
                          data: file,
                        },
                      }
                    }),
                  },
                  widenedStomach_Esophagus_Veins && {
                    linkId: '2.7.3',
                    text:
                      'Ходоод, улаан хоолой, хэвлийн венийн судасны өргөсөлтэй',
                    answer: widenedStomach_Esophagus_Veins.map(file => {
                      return {
                        valueAttachment: {
                          contentType: getContentType(file),
                          data: file,
                        },
                      }
                    }),
                  },
                  {
                    linkId: '2.7.4',
                    text: 'Ходоод улаан хоолой дурандуулах',
                    answer: [{ valueString: toGetUpperEndoscopy }],
                  },
                ],
              },
              {
                linkId: '2.8',
                text:
                  'Шээс хөөх эм болон хэвлийн хөндийн хатгалт хийх шаардлагатай хэвлийн хөндийн асцит үүссэн байгаа эсвэл элэгний энцефалопати одоо байгаа өмнө нь үүсч байсан нь батлагдсан.',
                item: [
                  {
                    linkId: '2.8.1',
                    text:
                      'Хэвлийн хөндийд шингэн үүсч байсан эсэх эсвэл одоо шингэнтэй эсэх',
                    answer: [
                      {
                        valueString: hewliinHundiiShingentei,
                      },
                    ],
                  },
                  {
                    linkId: '2.8.2',
                    text:
                      'Энцефалопати үүсч байсан эсэх эсвэл одоо энцефалопати байгаа эсэх',
                    answer: [
                      {
                        valueString: entsefalopathy,
                      },
                    ],
                  },
                ],
              },
              {
                linkId: '2.10',
                text:
                  'Бусад төрлийн вирүсийн хепатит, элэгний бусад өвчнүүд (аутоиммунийн хепатит, билиар цирроз, анхдагч хатуурлын холангит, Вилсоны өвчин, архины шалтгаант элэгний өвчин, архины бус шалтгаант элэгний өөхлөлт, гемохроматоз, альфа-1-антитрипсин дутагдал) байгаа тохиолдолд',
                answer: [{ valueString: busadHepatitis }],
              },
              {
                linkId: '2.11',
                text: 'Элэгний хавдраар өвчилсөн өгүүлэмжтэй',
                answer: [{ valueString: hadLiverCancer }],
              },
              {
                linkId: '2.12',
                text: 'Хорт зуршил',
                answer: [
                  {
                    valueString: hasToxicHabit,
                    item:
                      hasToxicHabit === 'Тийм'
                        ? [
                            {
                              linkId: '2.12.2',
                              valueString: toxicHabitType,
                            },
                          ]
                        : undefined,
                  },
                ],
              },
              {
                linkId: '2.13',
                text: 'Өмнө болон одоо доорхын аль нэг өгүүлэмжтэй байсан бол',
                answer: [
                  {
                    valueString: aliNegOguulemjteiEseh,
                    item:
                      aliNegOguulemjteiEseh === 'Тийм'
                        ? [
                            {
                              linkId: '2.13.2',
                              valueString: aliNegOguulemj,
                            },
                          ]
                        : undefined,
                  },
                ],
              },
              {
                linkId: '2.23',
                text:
                  'ЛНФ, РТВ, ПЕГ ИНФ альфа 2а болон ЭТВ, ТДФ, ТАФ бусад хэрэглэгдэх эмүүдэд хэт мэдрэг, тэсвэргүй өгүүлэмжтэй мөн нотлогдсон',
                answer: [
                  {
                    valueString: hetMedregTeswerguiOguulemteiEseh,
                    item:
                      hetMedregTeswerguiOguulemteiEseh === 'Тийм'
                        ? [
                            {
                              linkId: '2.23.2',
                              answer: [
                                {
                                  valueString: medregTeswerguiOguulemj,
                                },
                              ],
                            },
                          ]
                        : undefined,
                  },
                ],
              },
              additionals.length > 0 && {
                linkId: '2.26',
                text: 'Нэмэлт тайлбар',
                answer: additionals,
              },
            ].filter(val => !!val),
          },
        ],
      })
      /* #endregion */

      bundleEntries.push(
        new BundleEntry(pushRequest({ newResource: formResponse }, 'POST'))
      )

      if (payload.inclusion && !payload.exclusion) {
        console.log('before screening')
        if (payload.screeningType === 'screening') {
          const dlivrGroupScreeningResponse = yield call(readResource, {
            resourceType: 'Group',
            identifier: `${globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening.system}|${globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrScreening.value}`,
            'managing-entity': getReferenceUrl(globalState.Organization),
          })

          if (!dlivrGroupScreeningResponse) {
            throw dlivrGroupScreeningResponse
          }

          const dlivrGroupScreeningBundle = dlivrGroupScreeningResponse.data

          const dlivrGroupScreening =
            dlivrGroupScreeningBundle.entry[0].resource
          console.log('in screening', dlivrGroupScreening)
          const updatedDlivrGroupScreening = new Group({
            ...dlivrGroupScreening,
            member: [
              ...(dlivrGroupScreening.member || []),
              {
                entity: patient.getReference(),
              },
            ].filter(val => !!val),
          })

          const updatedGroupReferenceUrl = getReferenceUrl(
            updatedDlivrGroupScreening
          )

          bundleEntries.push(
            new BundleEntry({
              fullUrl: getReferenceUrl(updatedDlivrGroupScreening),
              resource: updatedDlivrGroupScreening,
              request: {
                method: 'PUT',
                url: updatedGroupReferenceUrl,
                ifMatch: `W/"${updatedDlivrGroupScreening.meta.versionId}"`,
              },
            })
          )
        } else if (payload.screeningType === 'preScreening') {
          console.log('in pre screening')
          const dlivrGroupPreScreeningResponse = yield call(readResource, {
            resourceType: 'Group',
            identifier: `${globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrPreScreening.system}|${globalState.FHIR_CODES.Identifiers.LiverCenter.DlivrPreScreening.value}`,
            'managing-entity': getReferenceUrl(globalState.Organization),
          })

          if (!dlivrGroupPreScreeningResponse) {
            throw dlivrGroupPreScreeningResponse
          }

          const dlivrGroupPreScreeningBundle =
            dlivrGroupPreScreeningResponse.data

          const dlivrGroupPreScreening =
            dlivrGroupPreScreeningBundle.entry[0].resource

          const updatedDlivrGroupPreScreening = new Group({
            ...dlivrGroupPreScreening,
            member: [
              ...(dlivrGroupPreScreening.member || []),
              {
                entity: patient.getReference(),
              },
            ].filter(val => !!val),
          })

          const updatedGroupReferenceUrl = getReferenceUrl(
            updatedDlivrGroupPreScreening
          )
          bundleEntries.push(
            new BundleEntry({
              fullUrl: getReferenceUrl(updatedDlivrGroupPreScreening),
              resource: updatedDlivrGroupPreScreening,
              request: {
                method: 'PUT',
                url: updatedGroupReferenceUrl,
                ifMatch: `W/"${updatedDlivrGroupPreScreening.meta.versionId}"`,
              },
            })
          )
        }
      }

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()

      // return
      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        return response.success
      } else {
        throw response
      }
    },

    *dlivrSaveProcedure({ payload }, { select, call, put }) {
      // return
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { FHIR_CODES } = globalState
      const { patient } = localState

      const { procedureCode, performedDateTime } = payload.formValues
      if (!procedureCode || !performedDateTime) {
        throw new Error('invalid parameters')
      }

      const procedureEntry = pushRequest(
        {
          newResource: {
            resourceType: 'Procedure',
            status: 'completed',
            code: procedureCode,
            performedDateTime: performedDateTime.format('YYYY-MM-DD'),
            subject: patient.getReference(),
            recorder: globalState.Practitioner.getReference(),
          },
        },
        'POST'
      )

      const bundleEntries = [procedureEntry]

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (!response.success) {
        if (response.message === CANCEL_REQUEST_MESSAGE) {
          return
        } else {
          throw response
        }
      }
    },

    *dlivrReadProcedure({ payload }, { select, call, put }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const { AnamnesisVitae } = FHIR_CODES
      const { HistoryOfClinicalFindingInSubject } = AnamnesisVitae.include

      const {
        ProcedurePerformedDate,
        ProcedureComplication,
        PerformedProcedure,
        ProcedureComplicationDetails,
      } = HistoryOfClinicalFindingInSubject.include

      const response = yield call(readResource, {
        resourceType: 'Procedure',
        patient: patient.id,
        code: `${FHIR_CODES.ICD9_URL}|`,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)

      if (!bundle || bundle.entry.length === 0) {
        return []
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const dataSource = []
      const icd9codeList = []

      resourceDictionary['Procedure'] &&
        resourceDictionary['Procedure'].forEach(procedure => {
          let complicationValue
          let complicationDetail

          const observationComplication = procedure.complication.find(
            v => v.coding
          )

          if (
            codeIntersects(
              observationComplication,
              ProcedureComplication.include.ComplicationOfProcedure.code
            )
          ) {
            complicationValue = true

            if (
              !(
                observationComplication.text ===
                ProcedureComplication.include.ComplicationOfProcedure.code.text
              )
            ) {
              complicationDetail = observationComplication.text
            }
          } else if (
            (observationComplication,
            ProcedureComplication.include.NoComplicationProcedure.code)
          ) {
            complicationValue = false
          }

          const date = procedure.performedDateTime

          icd9codeList.push(procedure.code.toJSON())

          dataSource.push({
            date: {
              designation: ProcedurePerformedDate.designation,
              value: toLocalDateTime(date, 'yyyy-mm-dd'),
            },
            code: procedure.code,
            complication: complicationValue !== undefined && {
              designation: ProcedureComplication.designation,
              value: complicationValue,
            },
            complicationDetail: {
              designation: ProcedureComplicationDetails.designation,
              value: complicationDetail,
            },
          })
        })

      const icd9codeListResponse = yield call(queryExternalAPI, {
        api: 'ICD-9',
        data: {
          list: icd9codeList,
          type: 'list',
        },
      })

      console.log(icd9codeListResponse.data, icd9codeList)
      icd9codeList.forEach((icd9CodeItem, index) => {
        const codeInfo = {
          value: icd9codeListResponse.data.find(responseValue =>
            codeIntersects(responseValue.code, icd9CodeItem)
          ),
          designation: PerformedProcedure.designation,
        }
        dataSource[index] = { codeInfo: codeInfo }
      })

      return dataSource
    },

    /* #endregion */

    /* #region  Clinical Scores */

    *saveClinicalScoreChildPugh({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { FHIR_CODES } = globalState
      const { patient } = localState

      const effectiveDateTime = getInstant()

      console.log(payload)
      const code = FHIR_CODES.Observations.ChildPugh.code
      let valueCodeableConcept
      switch (payload.formValues.childPughScore) {
        case 'class A':
          valueCodeableConcept =
            FHIR_CODES.Observations.ChildPugh.include.ClassA
          break
        case 'class B':
          valueCodeableConcept =
            FHIR_CODES.Observations.ChildPugh.include.ClassB
          break
        case 'class C':
          valueCodeableConcept =
            FHIR_CODES.Observations.ChildPugh.include.ClassC
          break
        default:
          throw new Error('Child-Pugh score is not defined')
          break
      }

      if (!code) {
        throw new Error('code is not defined')
      }
      const childPughEntry = pushRequest(
        {
          newResource: {
            resourceType: 'Observation',
            status: 'final',
            code: code,
            effectiveDateTime: effectiveDateTime,
            performer: [
              globalState.Practitioner.getReference(),
              globalState.Organization.getReference(),
            ],
            subject: patient.getReference(),
            valueCodeableConcept: valueCodeableConcept,
          },
        },
        'POST'
      )

      const bundleEntries = [childPughEntry]

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (!response.success) {
        if (response.message === CANCEL_REQUEST_MESSAGE) {
          return
        } else {
          throw response
        }
      }
    },

    *readClinicalScoreChildPugh({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const response = yield call(readResource, {
        resourceType: 'Observation',
        patient: patient.id,
        code: `${globalState.FHIR_CODES.Observations.ChildPugh.code.coding[0].system}|${globalState.FHIR_CODES.Observations.ChildPugh.code.coding[0].code}`,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)

      if (!bundle || bundle.entry.length === 0) {
        return []
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const dataSource = []

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation'].forEach(observation => {
          const date = observation.effectiveDateTime

          const classKey = Object.keys(
            globalState.FHIR_CODES.Observations.ChildPugh.include
          ).find(classKey => {
            return (
              observation.valueCodeableConcept &&
              codeIntersects(
                observation.valueCodeableConcept,
                globalState.FHIR_CODES.Observations.ChildPugh.include[classKey]
              )
            )
          })

          const display =
            classKey &&
            globalState.FHIR_CODES.Observations.ChildPugh.include[classKey]
              .coding[0].display

          dataSource.push({
            date: toLocalDateTime(date, 'yyyy-mm-dd'),
            display: display,
          })
        })

      return dataSource
    },

    *saveClinicalScoreMELD({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { FHIR_CODES } = globalState
      const { patient } = localState

      const effectiveDateTime = getInstant()

      let code = FHIR_CODES.Observations.MELD.code

      if (!code) {
        throw new Error('code is not defined')
      }

      if (!payload.formValues.meldScore) {
        throw new Error('save failed')
      }
      const childPughEntry = pushRequest(
        {
          newResource: {
            resourceType: 'Observation',
            status: 'final',
            code: code,
            effectiveDateTime: effectiveDateTime,
            performer: [
              globalState.Practitioner.getReference(),
              globalState.Organization.getReference(),
            ],
            subject: patient.getReference(),
            valueString: `${payload.formValues.meldScore}`,
          },
        },
        'POST'
      )

      const bundleEntries = [childPughEntry]

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (!response.success) {
        if (response.message === CANCEL_REQUEST_MESSAGE) {
          return
        } else {
          throw response
        }
      }
    },

    *readClinicalScoreMELD({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const response = yield call(readResource, {
        resourceType: 'Observation',
        patient: patient.id,
        code: `${globalState.FHIR_CODES.Observations.MELD.code.coding[0].system}|${globalState.FHIR_CODES.Observations.MELD.code.coding[0].code}`,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)

      if (!bundle || bundle.entry.length === 0) {
        return []
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const dataSource = []

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation'].forEach(observation => {
          const date = observation.effectiveDateTime

          const display = observation.valueString

          dataSource.push({
            date: toLocalDateTime(date, 'yyyy-mm-dd'),
            display: display,
          })
        })

      return dataSource
    },

    *saveClinicalScoreReachB({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { FHIR_CODES } = globalState
      const { patient } = localState

      const effectiveDateTime = getInstant()

      console.log(payload)
      let code = FHIR_CODES.Observations.ReachB.code

      if (!code) {
        throw new Error('code is not defined')
      }
      const reachBEntry = pushRequest(
        {
          newResource: {
            resourceType: 'Observation',
            status: 'final',
            code: code,
            effectiveDateTime: effectiveDateTime,
            performer: [
              globalState.Practitioner.getReference(),
              globalState.Organization.getReference(),
            ],
            subject: patient.getReference(),
            valueString: `${payload.formValues.reachBScore}`,
          },
        },
        'POST'
      )

      const bundleEntries = [reachBEntry]

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (!response.success) {
        if (response.message === CANCEL_REQUEST_MESSAGE) {
          return
        } else {
          throw response
        }
      }
    },

    *readClinicalScoreReachB({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const response = yield call(readResource, {
        resourceType: 'Observation',
        patient: patient.id,
        code: `${globalState.FHIR_CODES.Observations.ReachB.code.coding[0].system}|${globalState.FHIR_CODES.Observations.ReachB.code.coding[0].code}`,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)

      if (!bundle || bundle.entry.length === 0) {
        return []
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const dataSource = []

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation'].forEach(observation => {
          const date = observation.effectiveDateTime

          const display = observation.valueString

          dataSource.push({
            date: toLocalDateTime(date, 'yyyy-mm-dd'),
            display: display,
          })
        })

      return dataSource
    },

    *saveClinicalScoreCorrectedQT({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { FHIR_CODES } = globalState
      const { patient } = localState

      const effectiveDateTime = getInstant()

      const code =
        FHIR_CODES.Observations.FraminghamCoronaryHeartDiseaseRiskScore.code

      if (!code) {
        throw new Error('code is not defined')
      }

      const childPughEntry = pushRequest(
        {
          newResource: {
            resourceType: 'Observation',
            status: 'final',
            code: code,
            effectiveDateTime: effectiveDateTime,
            performer: [
              globalState.Practitioner.getReference(),
              globalState.Organization.getReference(),
            ],
            subject: patient.getReference(),
            valueString: `${payload.formValues.correctedQTScore}`,
          },
        },
        'POST'
      )

      const bundleEntries = [childPughEntry]

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (!response.success) {
        if (response.message === CANCEL_REQUEST_MESSAGE) {
          return
        } else {
          throw response
        }
      }
    },

    *readClinicalScoreCorrectedQT({ payload }, { select, call, put }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const response = yield call(readResource, {
        resourceType: 'Observation',
        patient: patient.id,
        code: `${globalState.FHIR_CODES.Observations.FraminghamCoronaryHeartDiseaseRiskScore.code.coding[0].system}|${globalState.FHIR_CODES.Observations.FraminghamCoronaryHeartDiseaseRiskScore.code.coding[0].code}`,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)

      if (!bundle || bundle.entry.length === 0) {
        return []
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const dataSource = []

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation'].forEach(observation => {
          const date = observation.effectiveDateTime

          const display = observation.valueString

          dataSource.push({
            date: toLocalDateTime(date, 'yyyy-mm-dd'),
            display: display,
          })
        })

      return dataSource
    },

    /* #endregion */

    /* #region  Data upload section */
    *patientDataUpload({ payload }, { select, call }) {
      if (!payload.fileList || !isArray(payload.fileList)) {
        throw new Error('File list is empty')
      }

      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient } = localState
      if (!patient || !patient.id) {
        throw new Error('patient.id is undefined')
      }
      const response = yield call(uploadFiles, {
        fileList: payload.fileList,
        patientId: patient.id,
        category: payload.category,
        subcategory: payload.subcategory,
        recordedPractitionerId: globalState.Practitioner.id,
      })

      if (!response.success) {
        throw response
      }

      return
    },

    *getUploadedPatientData({ payload }, { select, call }) {
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const response = yield call(getUploadedFilesInfo, {
        patientId: patient.id,
        category: payload.category,
        subcategory: payload.subcategory,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      return response.data
    },

    *downloadUploadedPatientData({ payload }, { select, call }) {
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const response = yield call(downloadUploadedFile, {
        patientId: patient.id,
        fileId: payload.fileId,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return
        }
      }

      return response
    },
    /* #endregion */

    /* #region  Provider comment report */
    *saveProviderCommentReport({ payload }, { call, select }) {
      const globalState = yield select(state => state.app)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient } = localState

      const code = {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/observation',
            code: 'ProviderCommentReport',
          },
        ],
      }
      const effectiveDateTime = getInstant()
      const providerCommentReport = new Observation({
        status: 'final',
        code: code,
        effectiveDateTime: effectiveDateTime,
        issued: effectiveDateTime,
        performer: [
          globalState.Practitioner.getReference(),
          globalState.Organization.getReference(),
        ],
        subject: patient.getReference(),
        valueString: payload.formValues.additionalDescription,
      })

      const bundleEntries = []

      const bundleEntry = new BundleEntry(
        pushRequest({ newResource: providerCommentReport }, 'POST')
      )
      bundleEntries.push(bundleEntry)

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()
      const response = yield call(batch_transaction_request, json)

      if (!response || !response.success) {
        throw response
      }

      return response
    },

    *readProviderCommentReport({ payload }, { call, select }) {
      console.log(payload)
      const localState = yield select(
        state => state.practitioner_patient_profile
      )
      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }
      const code = {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/observation',
            code: 'ProviderCommentReport',
          },
        ],
      }

      const requestPayload = {
        resourceType: 'Observation',
        patient: patient.id,
        code: `${code.coding[0].system}|${code.coding[0].code}`,
        _count: payload._count,
        _page: payload._page,
        _sort: payload._sort,
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)

      if (!bundle || bundle.entry.length === 0) {
        return []
      }
      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))

      const resourceDictionary = createResourceDictionary(resourceArray)

      const dataSource = []

      resourceDictionary['Observation'] &&
        resourceDictionary['Observation'].forEach(observation => {
          const date = observation.effectiveDateTime

          const display = observation.valueString

          dataSource.push({
            date: toLocalDateTime(date, 'yyyy-mm-dd'),
            display: display,
          })
        })

      return {
        dataSource,
        pagination: {
          current: Number(payload._page) || 1,
          pageSize: Number(payload._count) || 20,
          total: bundle.total,
        },
      }
    },
    /* #endregion */

    /* #region  Questionnaire Response */
    *queryQuestionnaireResponse({ payload }, { select, call, put, take }) {
      const localState = yield select(
        state => state.practitioner_patient_profile
      )

      const { patient } = localState
      if (!patient || !patient.id) {
        return
      }

      const requestPayload = {
        resourceType: 'QuestionnaireResponse',
        patient: patient.id,
      }

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return []
        }
      }

      const bundle = new Bundle(response.data)
      if (!bundle || bundle.entry.length === 0) {
        return []
      }

      const resourceArray = loadResourceArray(bundle.entry.map(e => e.resource))
      const resourceDictionary = createResourceDictionary(resourceArray)

      return resourceDictionary['QuestionnaireResponse']
    },
    /* #endregion */

    *queryEprescriptionToken({ payload }, { call, put, select }) {
      const response = yield call(getEprescriptionToken, {
        data: payload,
      })

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw new Error('Prescription token failed')
        } else {
          return {}
        }
      }
      return response.data
    },
  },

  reducers: {
    /* #region  Reducers */
    showModalFile(state, { payload }) {
      return {
        ...state,
        modalFileVisible: true,
        modalFileData: payload.fileData,
      }
    },

    hideModalFile(state, { payload }) {
      return {
        ...state,
        modalFileVisible: false,
        modalFileData: undefined,
      }
    },

    showModalMessage(state, { payload }) {
      return {
        ...state,
        modalMessageType: payload.type,
        modalMessageContent: payload.content,
        modalMessageChildren: payload.children,
        modalMessageVisible: true,
      }
    },

    hideModalMessage(state, { payload }) {
      return {
        ...state,
        modalMessageType: undefined,
        modalMessageContent: undefined,
        modalMessageChildren: undefined,
        modalMessageVisible: false,
      }
    },
    /* #endregion */
  },
})
