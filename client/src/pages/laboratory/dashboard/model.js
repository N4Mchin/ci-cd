/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { bundle as Bundle } from 'schemas'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
const { batch_transaction_request, getStatisticsForLaboratory } = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_dashboard',

  state: {
    labTechnician: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/laboratory/dashboard', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 20 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *queryLabTests({ payload = {} }, { call, put, select }) {
      const { FHIR_CODES } = yield select(state => state.app)
      const { startDate, endDate } = payload
      if (!FHIR_CODES) {
        return
      }

      const Biochemistry = FHIR_CODES.BiochemistryTests
      const Immunology = FHIR_CODES.ImmunologyTests
      const { AFP } = FHIR_CODES.ImmunologyTests.include.Tumor_Markers.include
      const { RapidTests, ViralLoadTests } = FHIR_CODES.UncategorizedTests
      const { HCV_RNA, HBV_DNA, HDV_RNA } = ViralLoadTests.include
      const {
        Ferritin,
        Hematology,
        Coagulation,
        Anti_HDV,
        Vitamin_D3,
        ESR,
        Urinalysis,
      } = FHIR_CODES.UncategorizedTests.OtherTests.include

      const testRequests = []
      const testNames = [
        Anti_HDV,
        Biochemistry,
        Coagulation,
        Ferritin,
        Hematology,
        Immunology,
        RapidTests,
        ESR,
        Urinalysis,
        AFP,
        HCV_RNA,
        HBV_DNA,
        HDV_RNA,
        Vitamin_D3,
      ]

      const diagnosticReportIdentifier = `${FHIR_CODES.Identifiers.DiagnosticReport.system}|`

      const additionalRequest = [
        {
          request: {
            method: 'GET',
            url: `Patient?identifier=${FHIR_CODES.Identifiers.LiverCenter.PatientIdentifier.system}|&_summary=count`,
          },
        },

        {
          request: {
            method: 'GET',
            url: [
              `DiagnosticReport?identifier=${diagnosticReportIdentifier}`,
              startDate && `&authored=ge${startDate}`,
              endDate && `&authored=le${endDate}`,
              `&_summary=count`,
            ],
            // .filter(value => !!value)
            // .join(''),
          },
        },
        {
          request: {
            method: 'GET',
            url: `DiagnosticReport?identifier=${diagnosticReportIdentifier}&status=final&_summary=count`,
          },
        },
        {
          request: {
            method: 'GET',
            url: `Specimen?identifier=${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|&status=unsatisfactory&_summary=count`,
          },
        },
      ]

      testNames.map(element => {
        const testCode = element.code.coding[0]
        const request = {
          method: 'GET',
          url: `DiagnosticReport?identifier=${diagnosticReportIdentifier}&code=${testCode.system}|${testCode.code}&status=final&_summary=count`,
        }

        testRequests.push({ request })
      })

      const allRequests = [...testRequests, ...additionalRequest]

      const requestBundle = new Bundle({
        type: 'batch',
        entry: allRequests,
      })

      const requestBundleJson = requestBundle.toJSON()

      const response = yield call(batch_transaction_request, requestBundleJson)

      if (response && response.success) {
        const bundle = new Bundle(response.data)

        const labTestQuantity = []

        const labTestEntries = bundle.entry.slice(0, testNames.length)
        const additionalEntries = bundle.entry.slice(testNames.length)

        labTestEntries.map((entryItem, index) => {
          const row = {
            quantity: entryItem.resource.total,
            display: testNames[index].display,
          }

          labTestQuantity.push(row)
        })

        const [
          totalPatientsEntry,
          totalLabTestsEntry,
          totalVerifiedLabTests,
          totalUnsatisfactorySpecimen,
        ] = additionalEntries

        const newObject = {
          labTestQuantity,
          totalPatients: totalPatientsEntry.resource.total,
          totalLabTests: totalLabTestsEntry.resource.total,
          totalVerifiedLabTests: totalVerifiedLabTests.resource.total,
          totalUnsatisfactorySpecimen:
            totalUnsatisfactorySpecimen.resource.total,
        }

        return newObject
      } else {
        throw response
      }
    },

    *getStats({ payload = {} }, { call, put }) {
      const result = yield call(getStatisticsForLaboratory, payload)
      console.log(result)

      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return result.data
    },
  },

  reducers: {},
})
