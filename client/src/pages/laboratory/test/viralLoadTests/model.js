/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import * as dateTime from 'utils/datetime'
import * as controller from 'utils/controller'
import * as helper from 'utils/helper'
import {
  CANCEL_REQUEST_MESSAGE,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  RESULT_STATUS,
} from 'utils/constant'

import {
  observation as Observation,
  bundle as Bundle,
  bundleentry as BundleEntry,
  diagnosticreport as DiagnosticReport,
  servicerequest as ServiceRequest,
} from 'schemas'

const {
  readResource,
  queryViralLoadHCVStats,
  batch_transaction_request,
  createSampleModule,
  readSampleModule,
  readSampleModuleList,
  updateSampleModule,
  readViralLoadSubTestsProtocolData,
  readViralLoadHDVProtocolData,
  viralLoadTestsVerifiedResults,
} = api

export default modelExtend(pageModel, {
  namespace: 'laboratory_test_viralLoadTests',

  state: {},

  effects: {
    *queryViralLoadTests({ payload = {} }, { call, put, select }) {
      const { testNameString, filteredDate } = payload
      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState

      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode =
        FHIR_CODES.UncategorizedTests.ViralLoadTests.include[testNameString]

      const codeString = `${labTestCode.code.coding[0].code}`

      const requestPayload = {
        code: codeString,
        filteredDate: filteredDate,
      }

      const result = yield call(viralLoadTestsVerifiedResults, requestPayload)

      const serviceRequestIdList = result.data.map(
        data => data.serviceRequestId
      )

      const moduleResponse = yield call(readSampleModuleList, {
        serviceRequestIdList,
      })

      if (!moduleResponse) {
        throw moduleResponse
      }

      const moduleList = moduleResponse.data
      moduleList.forEach(module => {
        const { serviceRequestId } = module

        const index = result.data.findIndex(
          data => data.serviceRequestId === serviceRequestId
        )

        result.data[index].module = module
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

    *queryLabTests({ payload = {} }, { call, put, select }) {
      const { testNameString, filteredDate } = payload
      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState

      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode =
        FHIR_CODES.UncategorizedTests.ViralLoadTests.include[testNameString]

      const codeString = `${labTestCode.code.coding[0].system}|${labTestCode.code.coding[0].code}`
      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'completed',
      }
      if (filteredDate !== undefined) {
        requestPayload[
          '_has:DiagnosticReport:based-on:issued'
        ] = `eq${filteredDate}`
      }

      Object.assign(requestPayload, {
        'based-on:ServiceRequest.specimen.status': 'available',
        '_has:DiagnosticReport:based-on:status': 'final',
        _include: ['ServiceRequest:subject', 'ServiceRequest:based-on'],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
          'ServiceRequest:specimen',
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

      const testListData = controller.generateTableData(
        bundle,
        FHIR_CODES,
        labTestCode
      )

      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      const filteredDataSource = testListData.filter(
        data => data && !helper.isEmptyObject(data)
      )

      if (filteredDataSource.length === 0) {
        return filteredDataSource
      }

      const serviceRequestIdList = filteredDataSource.map(
        data => data.serviceRequest.id
      )

      const moduleResponse = yield call(readSampleModuleList, {
        serviceRequestIdList,
      })

      if (!moduleResponse) {
        throw moduleResponse
      }

      const moduleList = moduleResponse.data
      moduleList.forEach(module => {
        const { serviceRequestId } = module
        const index = filteredDataSource.findIndex(
          data => data.serviceRequest.id === serviceRequestId
        )
        filteredDataSource[index].module = module
      })
      console.log(
        'filteredDataSource**************************',
        filteredDataSource
      )
      return {
        pagination: pagination,
        dataSource: filteredDataSource,
      }
    },

    *queryStats({ payload = {} }, { call }) {
      const result = yield call(queryViralLoadHCVStats, payload)

      if (result) {
        return result.data
      } else {
        throw result
      }
    },

    *saveResult({ payload = {} }, { call, select, put }) {
      const { testData, testCode, testResult, regulatoryNotes } = payload
      const globalState = yield select(state => state.app)

      const observationIdentifier = {
        ...globalState.FHIR_CODES.Identifiers.Observations,
        value: dateTime.getInstant(),
      }

      const defaults = {
        status: 'preliminary',
        subject: testData.subject,
        issued: dateTime.getInstant(),
        performer: [
          globalState.Organization.getReference(),
          globalState.Practitioner.getReference(),
        ],
      }

      const { referenceRange, unit } = testCode

      let valueQuantity

      if (!isNaN(parseFloat(testResult))) {
        valueQuantity = {
          value: parseFloat(testResult),
          unit: unit,
        }
      }

      let relatedReferenceRange
      let interpretation

      try {
        relatedReferenceRange = helper.getRelatedReferenceRange(
          referenceRange,
          testData.patient
        )

        if (relatedReferenceRange) {
          interpretation = helper.getInterpretation(
            globalState.FHIR_CODES.Interpretations,
            valueQuantity,
            relatedReferenceRange
          )
        }
      } catch (errorInfo) {
        console.log(errorInfo)
      }

      const bundleEntries = []

      const newObservationData = {
        ...defaults,
        identifier: [observationIdentifier],
        code: testCode.code,
        basedOn: [testData['serviceRequestRef']],
        valueQuantity: valueQuantity,
        interpretation: interpretation && interpretation,
        referenceRange: relatedReferenceRange && {
          low: relatedReferenceRange.low,
          high: relatedReferenceRange.high,
        },
      }

      const resultingObservation = new Observation(newObservationData)

      const observationEntry = new BundleEntry({
        fullUrl: helper.generateFullUrl(),
        resource: resultingObservation,
        request: {
          method: 'POST',
          url: resultingObservation.resourceType,
        },
      })

      bundleEntries.push(observationEntry)

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (regulatoryNotes && regulatoryNotes !== '') {
        const regulatoryNotesObservation = new Observation({
          ...defaults,
          identifier: [observationIdentifier],
          basedOn: [testData['serviceRequestRef']],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        })

        regulatoryNotesObservationEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: regulatoryNotesObservation,
          request: {
            method: 'POST',
            url: regulatoryNotesObservation.resourceType,
          },
        })
      }

      regulatoryNotesObservationEntry &&
        bundleEntries.push(regulatoryNotesObservationEntry)
      /* #endregion */

      const diagnosticReportData = {
        ...defaults,
        status: 'partial', //overwriting
        identifier: [
          Object.assign(
            {
              value: dateTime.getInstant(),
            },
            globalState.FHIR_CODES.Identifiers.DiagnosticReport
          ),
        ],
        basedOn: [testData['serviceRequestRef']],
        code: testCode.code,
        specimen:
          testData.specimen &&
          testData.specimen.map(sp => helper.getReference(sp)),
        result: [{ reference: observationEntry.fullUrl, type: 'Observation' }],
      }

      if (regulatoryNotesObservationEntry) {
        diagnosticReportData.result.push({
          reference: regulatoryNotesObservationEntry.fullUrl,
          type: 'Observation',
        })
      }

      const diagnosticReport = new DiagnosticReport(diagnosticReportData)

      const diagnosticReportEntry = new BundleEntry({
        fullUrl: helper.generateFullUrl(),
        resource: diagnosticReport,
        request: {
          method: 'POST',
          url: diagnosticReport.resourceType,
        },
      })

      bundleEntries.push(diagnosticReportEntry)

      /* #region  COMPLETE SERVICE REQUEST */
      const completedServiceRequest = new ServiceRequest({
        ...testData.serviceRequest,
        status: 'completed',
      })
      const completeServiceRequestUrl = helper.getReferenceUrl(
        completedServiceRequest
      )

      const completeServiceRequestEntry = new BundleEntry({
        fullUrl: completeServiceRequestUrl,
        resource: completedServiceRequest,
        request: {
          method: 'PUT',
          url: completeServiceRequestUrl,
          ifMatch: `W/"${completedServiceRequest.meta.versionId}"`,
        },
      })

      bundleEntries.push(completeServiceRequestEntry)
      /* #endregion */

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()

      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        return
      } else {
        throw response
      }
    },

    *editResult({ payload = {} }, { call, select }) {
      const state = yield select(state => state)
      const globalState = state.app

      const { testData, testCode, testResult, regulatoryNotes } = payload

      const bundleEntries = []

      const floatValue = parseFloat(testResult)
      if (isNaN(floatValue)) {
        throw new Error('value should be float')
      }

      const defaults = {
        status: 'preliminary',
        subject: testData.subject,
        issued: dateTime.getInstant(),
        performer: [
          globalState.Organization.getReference(),
          globalState.Practitioner.getReference(),
        ],
      }

      /* #region  CANCEL OLD OBSERVATION */

      if (testData.latestObservation.status !== 'cancelled') {
        const cancelledObservation = new Observation({
          ...testData.latestObservation.toJSON(),
          status: 'cancelled',
        })

        const cancelledObservationUrl = helper.getReferenceUrl(
          cancelledObservation
        )
        const cancelledObservationEntry = new BundleEntry({
          fullUrl: cancelledObservationUrl,
          resource: cancelledObservation,
          request: {
            method: 'PUT',
            url: cancelledObservationUrl,
            ifMatch: `W/"${cancelledObservation.meta.versionId}"`,
          },
        })

        bundleEntries.push(cancelledObservationEntry)
      }

      /* #endregion */

      /* #region  NEW OBSERVATION */
      const observationIdentifier = {
        ...globalState.FHIR_CODES.Identifiers.Observations,
        value: dateTime.getInstant(),
      }

      const { code, referenceRange, unit } = testCode

      let valueQuantity

      if (!isNaN(parseFloat(testResult))) {
        valueQuantity = {
          value: parseFloat(testResult),
          unit: unit,
        }
      }

      let relatedReferenceRange
      let interpretation

      try {
        relatedReferenceRange = helper.getRelatedReferenceRange(
          referenceRange,
          testData.patient
        )

        if (relatedReferenceRange) {
          interpretation = helper.getInterpretation(
            globalState.FHIR_CODES.Interpretations,
            valueQuantity,
            relatedReferenceRange
          )
        }
      } catch (errorInfo) {
        console.log(errorInfo)
      }

      const newObservationData = {
        ...testData.latestObservation,
        ...defaults,
        identifier: [observationIdentifier],
        basedOn: [testData['serviceRequestRef']],
        code: testCode.code,
        valueQuantity: valueQuantity,
        // device
        interpretation: interpretation && interpretation,
        referenceRange: relatedReferenceRange && {
          low: relatedReferenceRange.low,
          high: relatedReferenceRange.high,
        },
        extension: [
          {
            ...globalState.FHIR_CODES.Extensions.ObservationReplaces,
            valueReference: helper.getReference(testData.latestObservation),
          },
        ],
      }

      const newObservation = new Observation(newObservationData)

      const newObservationEntry = new BundleEntry({
        fullUrl: helper.generateFullUrl(),
        resource: newObservation,
        request: {
          method: 'POST',
          url: newObservation.resourceType,
        },
      })

      bundleEntries.push(newObservationEntry)
      /* #endregion */

      const newDiagnosticReport = {
        ...testData.diagnosticReport.toJSON(),
        status: 'partial', // overwriting
        result: [
          {
            reference: newObservationEntry.fullUrl,
            type: 'Observation',
          },
        ],
      }

      /* #region  REGULATORY NOTES */
      let regulatoryNotesObservationEntry

      if (
        regulatoryNotes &&
        testData.regulatoryNotesValue &&
        regulatoryNotes === testData.regulatoryNotesValue
      ) {
        // no changes
        newDiagnosticReport.result.push(
          helper.getReference(testData.regulatoryNotesObservation)
        )
      } else if (!regulatoryNotes && testData.regulatoryNotesValue) {
        // delete
        regulatoryNotesObservationEntry = new BundleEntry({
          request: {
            method: 'DELETE',
            url: helper.getReferenceUrl(testData.regulatoryNotesObservation),
          },
        })
      } else if (
        regulatoryNotes &&
        testData.regulatoryNotesValue &&
        regulatoryNotes !== testData.regulatoryNotesValue
      ) {
        // update
        const updatedRegulatoryNotesObservation = new Observation({
          id: testData.regulatoryNotesObservation.id,
          meta: testData.regulatoryNotesObservation.meta,
          ...defaults,
          identifier: [observationIdentifier],
          basedOn: [testData['serviceRequestRef']],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        })

        const updatedRegulatoryNotesObservationUrl = helper.getReferenceUrl(
          testData.regulatoryNotesObservation
        )
        regulatoryNotesObservationEntry = new BundleEntry({
          fullUrl: updatedRegulatoryNotesObservationUrl,
          resource: updatedRegulatoryNotesObservation,
          request: {
            method: 'PUT',
            url: updatedRegulatoryNotesObservationUrl,
            ifMatch: `W/"${testData.regulatoryNotesObservation.meta.versionId}"`,
          },
        })

        newDiagnosticReport.result.push(
          helper.getReference(testData.regulatoryNotesObservation)
        )
      } else if (regulatoryNotes && !testData.regulatoryNotesValue) {
        // post
        const newRegulatoryNotesObservation = new Observation({
          ...defaults,
          identifier: [observationIdentifier],
          basedOn: [testData['serviceRequestRef']],
          code: globalState.FHIR_CODES.Observations.RegulatoryNotes.code,
          valueString: regulatoryNotes,
        })

        regulatoryNotesObservationEntry = new BundleEntry({
          fullUrl: helper.generateFullUrl(),
          resource: newRegulatoryNotesObservation,
          request: {
            method: 'POST',
            url: newRegulatoryNotesObservation.resourceType,
          },
        })

        newDiagnosticReport.result.push({
          reference: regulatoryNotesObservationEntry.fullUrl,
          type: 'Observation',
        })
      }
      regulatoryNotesObservationEntry &&
        bundleEntries.push(regulatoryNotesObservationEntry)
      /* #endregion */

      /* #region  DIAGNOSTIC REPORT */
      const diagnosticReportUrl = helper.getReferenceUrl(newDiagnosticReport)
      const newDiagnosticReportEntry = new BundleEntry({
        fullUrl: diagnosticReportUrl,
        resource: newDiagnosticReport,
        request: {
          method: 'PUT',
          url: diagnosticReportUrl,
          ifMatch: `W/"${newDiagnosticReport.meta.versionId}"`,
        },
      })

      bundleEntries.push(newDiagnosticReportEntry)
      /* #endregion */

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      })

      const json = bundle.toJSON()

      const response = yield call(batch_transaction_request, json)

      if (response && response.success) {
        return
      } else {
        throw response
      }
    },

    *saveModule({ payload = {} }, { call, put, select }) {
      const { moduleData } = payload
      const response = yield call(createSampleModule, {
        moduleData,
      })

      if (response && response.success) {
        return
      } else {
        throw response
      }
    },

    *readModule({ payload = {} }, { call, put, select }) {
      console.log('save module function', payload)
      const { serviceRequestId } = payload
      const response = yield call(readSampleModule, {
        id: serviceRequestId,
      })

      if (response) {
        if (response.success) {
          const moduleData = response.data

          yield put({
            type: 'updateState',
            payload: {
              moduleData: moduleData,
            },
          })
          return moduleData
        } else {
        }
      } else {
        throw response
      }
    },

    *updateModule({ payload = {} }, { call, put, select }) {
      const { moduleData } = payload
      const response = yield call(updateSampleModule, {
        moduleData: moduleData,
      })

      if (response && response.success) {
        return
      } else {
        throw response
      }
    },

    /* #region  Protocols */

    *readViralLoadSubTestsProtocolData({ payload }, { call, put, select }) {
      const result = yield call(readViralLoadSubTestsProtocolData, {
        testName: payload.testName,
        filteredDate: payload.filteredDate,
      })

      const dataSource = []

      result.data.map(element => {
        const row = {
          date: dateTime.toLocalDateTime(
            element.values.registeredDate,
            'yyyy-mm-dd'
          ),
          appartusType:
            element.values.appartusType && element.values.appartusType,
          startTime: dateTime.toLocalDateTime(
            element.values.timeWhenTheApparatusIsTurnedOn,
            'hh:mm'
          ),
          reagentLotNumber: element.values.LotNumberOfReagent,
          reagentExpirationDate: dateTime.toLocalDateTime(
            element.values.expirationDateOfReagent,
            'yyyy-mm-dd'
          ),
          sazNumber: element.values.numberOfCа3Abided,
          temperature: element.values.roomTemperature,
          confirmed: element.values.whoConfirmedTheResultByQualityMonitor,
          additionalDescription: element.values.descriptionNote,
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
    *readViralLoadHDVProtocolData({ payload }, { call, put, select }) {
      const result = yield call(readViralLoadHDVProtocolData, {
        testName: payload.testName,
        filteredDate: payload.filteredDate,
        appartusType: payload.appartusType,
      })

      const dataSource = []
      result.data.map(element => {
        const row = {
          date: dateTime.toLocalDateTime(
            element.values.registeredDate,
            'yyyy-mm-dd'
          ),
          choiceOfApparatusType: element.values.choiceOfApparatusType,
          numberOfCа3Abided: element.values.numberOfCа3Abided,
          lotNumberOfRnaIsolationReagent:
            element.values.lotNumberOfRnaIsolationReagent,
          expirationDateOfRnaIsolationReagent: dateTime.toLocalDateTime(
            element.values.expirationDateOfRnaIsolationReagent,
            'yyyy-mm-dd'
          ),
          completionDateOfRnaIsolation: dateTime.toLocalDateTime(
            element.values.completionDateOfRnaIsolation,
            'hh:mm'
          ),
          deepWellPlate:
            element.values.deepWellPlate && element.values.deepWellPlate,
          lotNumberOfPcrReagent: element.values.lotNumberOfPcrReagent,
          expirationDateOfPcrReagent: dateTime.toLocalDateTime(
            element.values.expirationDateOfPcrReagent,
            'yyyy-mm-dd'
          ),
          timeWhenTheAbbottM2000spIsTurnedOn:
            element.values.timeWhenTheAbbottM2000spIsTurnedOn &&
            dateTime.toLocalDateTime(
              element.values.timeWhenTheAbbottM2000spIsTurnedOn,
              'hh:mm'
            ),
          timeWhenTheM2000rtIsTurnedOn:
            element.values.timeWhenTheM2000rtIsTurnedOn &&
            dateTime.toLocalDateTime(
              element.values.timeWhenTheM2000rtIsTurnedOn,
              'hh:mm'
            ),
          timeWhenTheApparatusIsTurnedOn: dateTime.toLocalDateTime(
            element.values.timeWhenTheApparatusIsTurnedOn,
            'hh:mm'
          ),
          timeOfCompletionOfPcrMasterMixPreparation: dateTime.toLocalDateTime(
            element.values.timeOfCompletionOfPcrMasterMixPreparation,
            'hh:mm'
          ),
          timeOfCompletionOfPcr: dateTime.toLocalDateTime(
            element.values.timeOfCompletionOfPcr,
            'hh:mm'
          ),
          roomTemperature: element.values.roomTemperature,
          pcrPlate: element.values.pcrPlate && element.values.pcrPlate,
          whoConfirmedTheResultByQualityMonitor:
            element.values.whoConfirmedTheResultByQualityMonitor,
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

    /* #region  tests */
    *queryTestsAwaited({ payload = {} }, { call, put, select }) {
      const { testNameString } = payload

      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState

      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode =
        FHIR_CODES.UncategorizedTests.ViralLoadTests.include[testNameString]

      const codeString = `${labTestCode.code.coding[0].system}|${labTestCode.code.coding[0].code}`

      const { filteredDate } = payload

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'active',
      }

      if (filteredDate !== undefined) {
        requestPayload['authored'] = `eq${filteredDate}`
      }

      Object.assign(requestPayload, {
        'based-on:ServiceRequest.specimen.status': 'available',
        _include: ['ServiceRequest:subject', 'ServiceRequest:based-on'],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
          'ServiceRequest:specimen',
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

      const testListData = controller.generateTableData(
        bundle,
        FHIR_CODES,
        labTestCode
      )

      const filteredDataSource = testListData.filter(
        data => data && !helper.isEmptyObject(data)
      )

      if (filteredDataSource.length === 0) {
        return filteredDataSource
      }

      const serviceRequestIdList = filteredDataSource.map(
        data => data.serviceRequest.id
      )

      const moduleResponse = yield call(readSampleModuleList, {
        serviceRequestIdList,
      })
      if (!moduleResponse) {
        throw moduleResponse
      }

      const moduleList = moduleResponse.data
      moduleList.forEach(module => {
        const { serviceRequestId } = module
        const index = filteredDataSource.findIndex(
          data => data.serviceRequest.id === serviceRequestId
        )
        filteredDataSource[index].module = module
      })

      return {
        pagination: pagination,
        dataSource: filteredDataSource,
      }
    },

    *queryTestsInInspection({ payload = {} }, { call, put, select }) {
      const { testNameString } = payload

      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState

      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode =
        FHIR_CODES.UncategorizedTests.ViralLoadTests.include[testNameString]

      const codeString = `${labTestCode.code.coding[0].system}|${labTestCode.code.coding[0].code}`

      const { filteredDate } = payload

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'completed',
      }

      if (filteredDate !== undefined) {
        requestPayload['authored'] = `eq${filteredDate}`
      }

      Object.assign(requestPayload, {
        'based-on:ServiceRequest.specimen.status': 'available',
        '_has:DiagnosticReport:based-on:status': 'partial',
        _include: ['ServiceRequest:subject', 'ServiceRequest:based-on'],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
          'ServiceRequest:specimen',
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

      const testListData = controller.generateTableData(
        bundle,
        FHIR_CODES,
        labTestCode
      )

      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      const filteredDataSource = testListData.filter(
        data => data && !helper.isEmptyObject(data)
      )

      if (filteredDataSource.length === 0) {
        return filteredDataSource
      }

      const serviceRequestIdList = filteredDataSource.map(
        data => data.serviceRequest.id
      )

      const moduleResponse = yield call(readSampleModuleList, {
        serviceRequestIdList,
      })
      if (!moduleResponse) {
        throw moduleResponse
      }

      const moduleList = moduleResponse.data
      moduleList.forEach(module => {
        const { serviceRequestId } = module
        const index = filteredDataSource.findIndex(
          data => data.serviceRequest.id === serviceRequestId
        )
        filteredDataSource[index].module = module
      })

      return {
        pagination: pagination,
        dataSource: filteredDataSource,
      }
    },

    *queryTestsVerified({ payload = {} }, { call, put, select }) {
      const { testNameString } = payload

      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState

      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode =
        FHIR_CODES.UncategorizedTests.ViralLoadTests.include[testNameString]

      const codeString = `${labTestCode.code.coding[0].system}|${labTestCode.code.coding[0].code}`

      const { filteredDate } = payload
      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'completed',
      }

      if (filteredDate !== undefined) {
        requestPayload['authored'] = `eq${filteredDate}`
      }

      Object.assign(requestPayload, {
        'based-on:ServiceRequest.specimen.status': 'available',
        '_has:DiagnosticReport:based-on:status': 'final',
        _include: ['ServiceRequest:subject', 'ServiceRequest:based-on'],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
          'ServiceRequest:specimen',
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

      const testListData = controller.generateTableData(
        bundle,
        FHIR_CODES,
        labTestCode
      )

      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      const filteredDataSource = testListData.filter(
        data => data && !helper.isEmptyObject(data)
      )

      if (filteredDataSource.length === 0) {
        return filteredDataSource
      }

      const serviceRequestIdList = filteredDataSource.map(
        data => data.serviceRequest.id
      )

      const moduleResponse = yield call(readSampleModuleList, {
        serviceRequestIdList,
      })
      if (!moduleResponse) {
        throw moduleResponse
      }

      const moduleList = moduleResponse.data
      moduleList.forEach(module => {
        const { serviceRequestId } = module
        const index = filteredDataSource.findIndex(
          data => data.serviceRequest.id === serviceRequestId
        )
        filteredDataSource[index].module = module
      })

      return {
        pagination: pagination,
        dataSource: filteredDataSource,
      }
    },

    *queryTestsCorrection({ payload = {} }, { call, put, select }) {
      const { testNameString } = payload

      const globalState = yield select(state => state.app)
      const { FHIR_CODES } = globalState

      if (!FHIR_CODES) {
        return {}
      }

      const labTestCode =
        FHIR_CODES.UncategorizedTests.ViralLoadTests.include[testNameString]

      const codeString = `${labTestCode.code.coding[0].system}|${labTestCode.code.coding[0].code}`

      const { filteredDate } = payload

      const requestPayload = {
        resourceType: 'ServiceRequest',
        code: codeString,
        status: 'completed',
      }

      if (filteredDate !== undefined) {
        requestPayload['authored'] = `eq${filteredDate}`
      }

      Object.assign(requestPayload, {
        'based-on:ServiceRequest.specimen.status': 'available',
        '_has:DiagnosticReport:based-on:status': 'preliminary',
        '_has:DiagnosticReport:based-on:Observation:based-on:status':
          'cancelled',
        _include: ['ServiceRequest:subject', 'ServiceRequest:based-on'],
        '_revinclude:iterate': [
          'ServiceRequest:based-on',
          'Observation:based-on',
          'DiagnosticReport:based-on',
        ],
        '_include:iterate': [
          'DiagnosticReport:result',
          'Observation:has-member',
          'ServiceRequest:specimen',
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

      const testListData = controller.generateTableData(
        bundle,
        FHIR_CODES,
        labTestCode
      )

      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      const filteredDataSource = testListData.filter(
        data => data && !helper.isEmptyObject(data)
      )

      if (filteredDataSource.length === 0) {
        return filteredDataSource
      }

      const serviceRequestIdList = filteredDataSource.map(
        data => data.serviceRequest.id
      )

      const moduleResponse = yield call(readSampleModuleList, {
        serviceRequestIdList,
      })
      if (!moduleResponse) {
        throw moduleResponse
      }

      const moduleList = moduleResponse.data
      moduleList.forEach(module => {
        const { serviceRequestId } = module
        const index = filteredDataSource.findIndex(
          data => data.serviceRequest.id === serviceRequestId
        )
        filteredDataSource[index].module = module
      })

      return {
        pagination: pagination,
        dataSource: filteredDataSource,
      }
    },
    *queryTestsBySpecimenBarcode({ payload = {} }, { call, put, select }) {
      const globalState = yield select(state => state.app)
      const { FHIR_CODES, LabTests } = globalState

      const labTestCode =
        FHIR_CODES.UncategorizedTests.ViralLoadTests.include[
          payload.testNameString
        ]

      const codeString = `${labTestCode.code.coding[0].system}|${labTestCode.code.coding[0].code}`

      if (!payload.specimenBarcode) {
        return {}
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

      const testListData = controller.generateLaboratoryTestList(
        bundle,
        FHIR_CODES,
        LabTests
      )
      const pagination = {
        current: Number(payload._page) || DEFAULT_PAGE,
        pageSize: Number(payload._count) || DEFAULT_PAGE_SIZE,
        total: bundle.total,
      }

      return {
        dataSource: testListData,
        pagination: pagination,
      }
    },
    /* #endregion */
  },
})
