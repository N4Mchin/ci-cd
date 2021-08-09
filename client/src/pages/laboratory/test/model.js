/* global window */
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import * as controller from 'utils/controller'
import * as helper from 'utils/helper'
import { bundle as Bundle } from 'schemas'
import {
  CANCEL_REQUEST_MESSAGE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from 'utils/constant'
import * as dateTime from 'utils/datetime'
const moment = require('moment-timezone')
const {
  saveProtocolData,
  readTestProtocolData,
  saveSpecialProtocolData,
  readSpecialProtocolData,
  saveReagent,
  readReagent,
  readReagentLog,
  saveLabTestsReagentConsumption,
  monitorOfHematology,
  readMonitorOfHematology,
  saveAnalyzator,
  readAnalyzator,
  readResource,
  testsVerifiedWithDateRange,
  excelDataGenerator,
  getFile,
} = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_test',
  state: {
    bundle: {},
    codeList: [],
    pagination: {},
    selectedRowKeys: [],
  },

  effects: {
    *saveProtocolData({ payload }, { call, put, select }) {
      const response = yield call(saveProtocolData, {
        testName: payload.testName,
        ...payload,
      })
      if (response) {
        //yield put({ type: 'refresh' })

        if (response.success) {
          return {
            success: true,
          }
        }
        return {
          success: false,
        }
      } else {
        throw new Error('Save Protocol Failed')
      }
    },

    *readTestProtocolData({ payload }, { call, put, select }) {
      const result = yield call(readTestProtocolData, {
        testName: payload.testName,
        filteredDate: payload.filteredDate,
      })
      const dataSource = []
      result.data.map(element => {
        const row = {
          appartusType:
            element.values.appartusType && element.values.appartusType,
          timeOfAnalysis: dateTime.toLocalDateTime(
            element.values.timeOfAnalysis,
            'hh:mm'
          ),
          timeoutOfAnalysis: dateTime.toLocalDateTime(
            element.values.timeoutOfAnalysis,
            'hh:mm'
          ),
          reagentLotNumber: element.values.reagentLotNumber,
          reagentExpirationDate:
            // dateTime.toLocalDateTime(
            element.values.reagentExpirationDate,
          //   'yyyy-mm-dd'
          // ),
          testedSpecimen: element.values.testedSpecimen,
          sazNumber: element.values.sazNumber,
          description: element.values.description,
          roomTemperature: element.values.roomTemperature,
          registeredDate: dateTime.toLocalDateTime(
            element.values.registeredDate,
            'yyyy-mm-dd'
          ),
        }
        dataSource.push(row)
      })
      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return dataSource
    },

    *saveSpecialProtocolData({ payload }, { call, put, select }) {
      const response = yield call(saveSpecialProtocolData, {
        testName: payload.testName,
        ...payload,
      })
      if (response) {
        //yield put({ type: 'refresh' })

        if (response.success) {
          return {
            success: true,
          }
        }
        return {
          success: false,
        }
      } else {
        throw new Error('Save saveSpecialProtocolData Failed')
      }
    },

    *readSpecialProtocolData({ payload }, { call, put, select }) {
      const response = yield call(readSpecialProtocolData, {
        testName: payload.testName,
      })
      if (response) {
        if (response.success) {
          const SpecialProtocolData = response.data
          const specialProtocolData = SpecialProtocolData
          yield put({
            type: 'updateState',
            payload: {
              specialProtocolData: specialProtocolData,
            },
          })

          return specialProtocolData
        }
      } else {
        throw new Error('Read unsuccessful')
      }
    },

    /* #region  reagent */
    *saveReagent({ payload }, { call, put, select }) {
      const response = yield call(saveReagent, {
        testName: payload.testName,
        ...payload,
      })

      if (response && response.success) {
        return {
          success: true,
        }
      } else {
        throw new Error('Save Protocol Failed')
      }
    },
    *readReagent({ payload }, { call, put }) {
      const result = yield call(readReagent, {
        testName: payload.testName,
      })
      const dataSource = []
      result.data.map(element => {
        const { values } = element
        const row = {
          registeredDate: element._createdAt,
          reagentBarcode: values.reagentBarcode,
          reagentLotNumber: values.reagentLotNumber,
          reagentType: values.reagentType,
          reagentExpirationDate: dateTime.toLocalDateTime(
            values.reagentExpirationDate,
            'yyyy-mm-dd'
          ),
          quantity: values.quantity,
        }
        dataSource.push(row)
      })

      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return dataSource
    },

    *readReagentLog({ payload }, { call, put }) {
      const result = yield call(readReagentLog, {
        testName: payload.testName,
      })
      const dataSource = []

      result.data.map(element => {
        const { values } = element

        const row = {
          date: element._createdAt,
          reagentName: values.reagentType,
          reagentLotNumber: values.reagentLotNumber,
          reagentExpirationDate: dateTime.toLocalDateTime(
            values.reagentExpirationDate,
            'yyyy-mm-dd'
          ),
          firstRemain: values.firstRemain,
          consumptionValue: values.consumptionValue,
          quantity: values.quantity,
          description: values.description,
          recordedLaboratoryTechnician: values.recordedLaboratoryTechnician,
          appartusType: values.appartusType && values.appartusType,
        }
        dataSource.push(row)
      })
      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return dataSource
    },
    /* #endregion */

    /* #region  save reagent consumption */

    *saveLabTestsReagentConsumption({ payload }, { call, put, select }) {
      const { consumption } = payload
      const response = yield call(saveLabTestsReagentConsumption, {
        testName: payload.testName,
        consumption,
      })

      if (response) {
        if (response.success) {
          return {
            success: true,
          }
        }
        return {
          success: false,
        }
      } else {
        throw new Error('Save Reagent Consumption Failed')
      }
    },

    /* #endregion */

    *saveMonitorOfHematology({ payload }, { call, put, select }) {
      const response = yield call(monitorOfHematology, {
        testName: payload.testName,
        ...payload,
      })

      if (response) {
        // yield put({ type: 'refresh' })

        if (response.success) {
          return {
            success: true,
          }
        }
        return {
          success: false,
        }
      } else {
        throw new Error('Save Protocol Failed')
      }
    },

    *queryMonitorOfHematology({ payload }, { call, put, select }) {
      const result = yield call(readMonitorOfHematology, {
        testName: payload.testName,
        filteredDate: payload.filteredDate,
      })
      const dataSource = []
      result.data.map(element => {
        const row = {
          materialName: element.values.materialName,
          reagentLotNumberAndExpirationDate:
            element.values.reagentLotNumberAndExpirationDate,
          isNormal: element.values.isNormal,
          description: element.values.description,
          decision: element.values.decision,
          createdAt: dateTime.toLocalDateTime(element._createdAt, 'yyyy-mm-dd'),
        }
        dataSource.push(row)
      })
      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return dataSource
    },
    *saveAnalyzator({ payload }, { call, put, select }) {
      const { values } = payload
      const response = yield call(saveAnalyzator, {
        testName: payload.testName,
        ...values,
      })
      if (response) {
        //  yield put({ type: 'refresh' })

        if (response.success) {
          return {
            success: true,
          }
        }
        return {
          success: false,
        }
      } else {
        throw new Error('Save Failed')
      }
    },

    *readAnalyzator({ payload }, { call, put, select }) {
      const response = yield call(readAnalyzator, {
        testName: payload.testName,
        month: payload.month,
      })
      if (response) {
        if (response.success) {
          const analyzatorDataSource = response.data
          yield put({
            type: 'updateState',
            payload: {
              analyzatorDataSource: analyzatorDataSource,
            },
          })

          return analyzatorDataSource
        }
      } else {
        throw new Error('Read unsuccessful')
      }
    },

    /* #region  tests */
    *queryTestsAwaited({ payload = {} }, { call, put, select }) {
      console.log('QUERYING TESTS AWAITED')
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState

      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode = !!payload.labTestCode ? payload.labTestCode : LabTests
      let codeString

      if (!!payload.labTestCode) {
        codeString = `${payload.labTestCode.code.coding[0].system}|${payload.labTestCode.code.coding[0].code}`
      } else if (payload.type === 'all') {
        const totalLaboratoryProcedureRequestQuery = Object.values(LabTests)
          .map(labTestItem => {
            return `${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`
          })
          .join(',')

        codeString = totalLaboratoryProcedureRequestQuery
      }

      const { filteredDate } = payload

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'active',
        'specimen.status': 'available',
      }

      if (filteredDate !== undefined) {
        const converted = helper.searchByTwoConvertedTime(filteredDate)
        requestPayload['authored'] = [
          `ge${converted.convertedStartTime.toISOString()}`,
          `le${converted.convertedEndTime.toISOString()}`,
        ]
      }

      Object.assign(requestPayload, {
        _include: [
          'ServiceRequest:specimen',
          'ServiceRequest:subject',
          'ServiceRequest:based-on',
        ],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
        ],
        _count: payload._count,
        _page: payload._page,
        _sort: '-authored',
      })

      const response = yield call(readResource, requestPayload)
      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return {}
        }
      }

      const bundle = new Bundle(response.data)
      if (bundle.entry.length === 0) {
        return {}
      }

      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      if (payload.type === 'all') {
        const testListData = controller.generateLaboratoryTestList(
          bundle,
          FHIR_CODES,
          LabTests
        )

        return {
          pagination: pagination,
          dataSource: testListData,
        }
      } else {
        const testListData = controller.generateTableData(
          bundle,
          FHIR_CODES,
          labTestCode
        )

        return {
          pagination: pagination,
          dataSource: testListData,
        }
      }
    },

    *queryTestsInInspection({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState
      if (!FHIR_CODES) {
        return {}
      }
      const labTestCode = !!payload.labTestCode ? payload.labTestCode : LabTests
      let codeString

      if (!!payload.labTestCode) {
        codeString = `${payload.labTestCode.code.coding[0].system}|${payload.labTestCode.code.coding[0].code}`
      } else if (payload.type === 'all') {
        const totalLaboratoryProcedureRequestQuery = Object.values(LabTests)
          .map(labTestItem => {
            return `${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`
          })
          .join(',')

        codeString = totalLaboratoryProcedureRequestQuery
      }
      const { filteredDate } = payload

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'completed',
      }
      const converted = helper.searchByTwoConvertedTime(filteredDate)
      requestPayload['authored'] = [
        `ge${converted.convertedStartTime.toISOString()}`,
        `le${converted.convertedEndTime.toISOString()}`,
      ]

      Object.assign(requestPayload, {
        '_has:DiagnosticReport:based-on:status': 'partial',
        'specimen.status': 'available',
        _include: [
          'ServiceRequest:specimen',
          'ServiceRequest:subject',
          'ServiceRequest:based-on',
        ],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
        ],
        _count: payload._count,
        _page: payload._page,
        _sort: '-authored',
      })

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return {}
        }
      }

      const bundle = new Bundle(response.data)
      if (bundle.entry.length === 0) {
        return {}
      }

      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      if (payload.type === 'all') {
        const testListData = controller.generateLaboratoryTestList(
          bundle,
          FHIR_CODES,
          LabTests
        )

        return {
          pagination: pagination,
          dataSource: testListData,
        }
      } else {
        const testListData = controller.generateTableData(
          bundle,
          FHIR_CODES,
          labTestCode
        )

        return {
          pagination: pagination,
          dataSource: testListData,
        }
      }
    },

    *queryTestsVerified({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState

      if (!FHIR_CODES) {
        return {}
      }
      const { filteredDate } = payload
      const labTestCode = !!payload.labTestCode ? payload.labTestCode : LabTests
      let codeString

      if (!!payload.labTestCode) {
        codeString = `${payload.labTestCode.code.coding[0].system}|${payload.labTestCode.code.coding[0].code}`
      } else if (payload.type === 'all') {
        const totalLaboratoryProcedureRequestQuery = Object.values(LabTests)
          .map(labTestItem => {
            return `${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`
          })
          .join(',')

        codeString = totalLaboratoryProcedureRequestQuery
      }

      // const requestPayload = {
      //   resourceType: 'ServiceRequest',
      //   code: codeString,
      //   '_has:DiagnosticReport:based-on:status': 'final',
      //   'specimen.status': 'available',
      //   status: 'completed',
      //   _include: [
      //     'ServiceRequest:specimen',
      //     'ServiceRequest:subject',
      //     'ServiceRequest:based-on',
      //   ],
      //   '_revinclude:iterate': [
      //     'ServiceRequest:based-on',
      //     'Observation:based-on',
      //     'DiagnosticReport:based-on',
      //   ],
      //   '_include:iterate': [
      //     'DiagnosticReport:result',
      //     'Observation:has-member',
      //   ],
      //   _count: payload._count,
      //   _page: payload._page,
      //   _sort: '-authored',
      // }

      // const requestPayload = {
      //   resourceType: 'DiagnosticReport',
      //   status: 'final',
      //   'code': codeString,

      //   // 'based-on:ServiceRequest.code': codeString,
      //   // 'specimen.status': 'available',
      // }

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'completed',
      }

      const converted = helper.searchByTwoConvertedTime(filteredDate)
      requestPayload['authored'] = [
        `ge${converted.convertedStartTime.toISOString()}`,
        `le${converted.convertedEndTime.toISOString()}`,
      ]

      Object.assign(requestPayload, {
        'specimen.status': 'available',
        '_has:DiagnosticReport:based-on:status': 'final',

        _include: [
          'ServiceRequest:specimen',
          'ServiceRequest:subject',
          'ServiceRequest:based-on',
        ],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
        ],
        _count: payload._count,
        _page: payload._page,
        _sort: '-authored',
      })

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return {}
        }
      }

      const bundle = new Bundle(response.data)
      if (bundle.entry.length === 0) {
        return {}
      }

      const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const diagnosticReport = resourceDictionary['DiagnosticReport'][0]
      let verifiedPractitioner

      verifiedPractitioner = diagnosticReport.performer[1].display
      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      if (payload.type === 'all') {
        const testListData = controller.generateLaboratoryTestList(
          bundle,
          FHIR_CODES,
          LabTests
        )
        return {
          pagination: pagination,
          dataSource: testListData,
          verifiedPractitioner: verifiedPractitioner,
        }
      } else {
        const testListData = controller.generateTableData(
          bundle,
          FHIR_CODES,
          labTestCode
        )

        return {
          pagination: pagination,
          verifiedPractitioner: verifiedPractitioner,
          dataSource: testListData,
        }
      }
    },

    *queryTestsVerifiedWithDateRange({ payload = {} }, { call, put, select }) {
      // console.log('payloaaaaaaaaaad', payload)
      const { startDate, endDate } = payload

      // const requestPayload = {
      //   resourceType: 'ServiceRequest',
      //   code: codeString,
      //   status: 'completed',
      // }

      // if (startDate !== undefined) {
      //   requestPayload['authored'] = [`ge${startDate}`, `le${endDate}`]
      // }

      // Object.assign(requestPayload, {
      //   'specimen.status': 'available',
      //   '_has:DiagnosticReport:based-on:status': 'final',

      //   _include: [
      //     'ServiceRequest:specimen',
      //     'ServiceRequest:subject',
      //     'ServiceRequest:based-on',
      //   ],
      //   '_revinclude:iterate': [
      //     'ServiceRequest:based-on',
      //     'Observation:based-on',
      //     'DiagnosticReport:based-on',
      //   ],
      //   '_include:iterate': [
      //     'DiagnosticReport:result',
      //     'Observation:has-member',
      //   ],
      //   _count: payload._count,
      //   _page: payload._page,
      //   _sort: '-authored',
      // })

      // const response = yield call(readResource, requestPayload)
      // console.log('Хариуууууууууууууу', response)
      // if (!response.success) {
      //   if (response.message !== CANCEL_REQUEST_MESSAGE) {
      //     throw response
      //   } else {
      //     return {}
      //   }
      // }

      // const bundle = new Bundle(response.data)
      // if (bundle.entry.length === 0) {
      //   return {}
      // }

      // const resourceArray = helper.loadResourceArray(bundle.getResourcesOnly())

      // const resourceDictionary = controller.createResourceDictionary(
      //   resourceArray
      // )

      // const diagnosticReport = resourceDictionary['DiagnosticReport'][0]
      // let verifiedPractitioner

      // verifiedPractitioner = diagnosticReport.performer[1].display

      // const pagination = {
      //   current: Number(payload._page) || DEFAULT_PAGE,
      //   pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
      //   total: bundle.total,
      // }

      // if (payload.type === 'all') {
      //   const testListData = controller.generateLaboratoryTestList(
      //     bundle,
      //     FHIR_CODES,
      //     LabTests
      //   )
      //   return {
      //     pagination: pagination,
      //     dataSource: testListData,
      //     verifiedPractitioner: verifiedPractitioner,
      //   }
      // } else {
      //   const testListData = controller.generateTableData(
      //     bundle,
      //     FHIR_CODES,
      //     labTestCode
      //   )

      //   return {
      //     pagination: pagination,
      //     verifiedPractitioner: verifiedPractitioner,
      //     dataSource: testListData,
      //   }
      // }
      const result = yield call(testsVerifiedWithDateRange, {
        testName: payload.testName,
        labTestCode: payload.labTestCode,
        startDate: payload.startDate,
        endDate: payload.endDate,
      })
      // console.log('хариууууууууууууу', result)
      const dataSource = []

      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return result.data
    },

    *queryExcelDataGenerator({ payload = {} }, { call, put, select }) {
      //console.log('payloaaaaaaaaaaaaad', payload)
      const { dataSource } = payload
      let data = []
      dataSource.map(element => {
        const { reagent, ...otherElements } = element
        data.push(otherElements)
      })

      // const headerData = []
      // header &&
      //   header.map(headerElement => {
      //     const { logo, key, ...otherElement } = headerElement
      //     headerData.push(otherElement)
      //   })

      const result = yield call(getFile, {
        dataSource: data,
        //  excelHeader: headerData,
      })

      if (!result.success) {
        if (result.message !== CANCEL_REQUEST_MESSAGE) {
          throw result
        } else {
          return
        }
      }
      return result.data
    },

    *queryTestsCorrection({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState
      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode = !!payload.labTestCode ? payload.labTestCode : LabTests
      let codeString

      if (!!payload.labTestCode) {
        codeString = `${payload.labTestCode.code.coding[0].system}|${payload.labTestCode.code.coding[0].code}`
      } else if (payload.type === 'all') {
        const totalLaboratoryProcedureRequestQuery = Object.values(LabTests)
          .map(labTestItem => {
            return `${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`
          })
          .join(',')

        codeString = totalLaboratoryProcedureRequestQuery
      }

      const { filteredDate } = payload

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'completed',
      }

      const converted = helper.searchByTwoConvertedTime(filteredDate)
      requestPayload['authored'] = [
        `ge${converted.convertedStartTime.toISOString()}`,
        `le${converted.convertedEndTime.toISOString()}`,
      ]

      Object.assign(requestPayload, {
        '_has:DiagnosticReport:based-on:status': 'preliminary',
        '_has:DiagnosticReport:based-on:Observation:based-on:status':
          'cancelled',
        'specimen.status': 'available',
        _include: [
          'ServiceRequest:specimen',
          'ServiceRequest:subject',
          'ServiceRequest:based-on',
        ],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
        ],
        _count: payload._count,
        _page: payload._page,
        _sort: '-authored',
      })

      const response = yield call(readResource, requestPayload)

      if (!response.success) {
        if (response.message !== CANCEL_REQUEST_MESSAGE) {
          throw response
        } else {
          return {}
        }
      }
      const bundle = new Bundle(response.data)
      if (bundle.entry.length === 0) {
        return {}
      }

      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      if (payload.type === 'all') {
        const testListData = controller.generateLaboratoryTestList(
          bundle,
          FHIR_CODES,
          LabTests
        )

        return {
          pagination: pagination,
          dataSource: testListData,
        }
      } else {
        const testListData = controller.generateTableData(
          bundle,
          FHIR_CODES,
          labTestCode
        )

        return {
          pagination: pagination,
          dataSource: testListData,
        }
      }
    },
    /* #endregion */

    *queryTestsBySpecimenBarcode({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState

      const labTestCode = !!payload.labTestCode ? payload.labTestCode : LabTests
      let codeString
      if (!payload.specimenBarcode) {
        return {}
      }

      if (!!payload.labTestCode) {
        codeString = `${payload.labTestCode.code.coding[0].system}|${payload.labTestCode.code.coding[0].code}`
      } else if (payload.type === 'all') {
        const totalLaboratoryProcedureRequestQuery = Object.values(LabTests)
          .map(labTestItem => {
            return `${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`
          })
          .join(',')

        codeString = totalLaboratoryProcedureRequestQuery
      }

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        'specimen.identifier': `${FHIR_CODES.Identifiers.LiverCenter.Specimen.system}|${payload.specimenBarcode}`,
        'specimen.status': 'available',
        _include: [
          'ServiceRequest:specimen',
          'ServiceRequest:subject',
          'ServiceRequest:based-on',
        ],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
        ],
        _count: payload._count,
        _page: payload._page,
        _sort: '-authored',
      }

      const response = yield call(readResource, requestPayload)
      if (!response || !response.success) {
        throw response
      }

      const bundle = new Bundle(response.data)
      if (bundle.entry.length === 0) {
        return {}
      }

      if (payload.type === 'all') {
        const testListData = controller.generateLaboratoryTestList(
          bundle,
          FHIR_CODES,
          LabTests
        )
        return {
          dataSource: testListData,
        }
      } else {
        const testListData = controller.generateTableData(
          bundle,
          FHIR_CODES,
          labTestCode
        )

        return {
          dataSource: testListData,
        }
      }
    },
  },
})
