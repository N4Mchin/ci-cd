const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const axios = require('axios')
const config = require('@config')
const helper = require('@helper')
const { bundle: Bundle } = require('@schemas')
const sendEmail = require('./sendEmail')
const sendResultService = require('@services/sendResult')
const fhirService = require('@services/fhir')
const fhirRequest = require('@utils/fhirRequest')
const labReportGenerator = require('@services/lab-report-generator')
const excelGenerator = require('@services/excelgenerator')
const fs = require('fs')
const CONFIG = require('../config')
const router = new express.Router()
const controller = require('@controller')
const LabTests = require('@constants/LabTests')
const Identifiers = require('@constants/Identifiers')
const Observations = require('@constants/Observations')
const ReagentModel = helper.modelLoader('Reagent')
const XLSX = require('xlsx')
const { UncategorizedTests, BiochemistryTests, ImmunologyTests } = LabTests

const {
  RapidTests,
  ViralLoadTests,
  OtherTests = {},
  Genotype,
} = UncategorizedTests

const FHIR_CODES = {
  Identifiers,
  Observations,
}

const {
  Hematology,
  ESR,
  Urinalysis,
  Coagulation,
  Vitamin_D3,
  Sars_Cov2_IgG,
  Sars_Cov2_IgG_Elisa,
  Ferritin,
  Anti_HDV,
} = OtherTests.include

const RootTests = {
  ...ViralLoadTests.include,
  RapidTests,
  BiochemistryTests,
  Hematology,
  ImmunologyTests,
  Vitamin_D3,
  Sars_Cov2_IgG,
  Sars_Cov2_IgG_Elisa,
  Ferritin,
  Anti_HDV,
  Coagulation,
  Genotype,
  Urinalysis,
  ESR,
}

router.use(bodyParser.json())
const upload = multer({
  limits: { fieldSize: 50 * 1024 * 1024 },
})

const UserModel = helper.modelLoader('user')

router.get('/laboratory/testResult/sendStatus', (req, res) => {
  const { diagnosticReports } = req.query
  const Model = helper.modelLoader('SentResultViaEmail')

  if (!diagnosticReports) {
    return res.status(200).json({
      success: false,
      message: 'Diagnostic report array is missing',
    })
  }

  const sentDiagnosticReportsArray = diagnosticReports.map(
    async diagnosticReport => {
      const filter = {
        diagnosticReportId: diagnosticReport.diagnosticReportId,
      }
      const sentDiagnosticReports = await Model.findOne(filter).exec()

      const sentDiagnosticReportObject = {
        diagnosticReportId: diagnosticReport.diagnosticReportId,
      }

      if (sentDiagnosticReports) {
        sentDiagnosticReportObject.sendStatus = 'resultSent'
      } else {
        sentDiagnosticReportObject.sendStatus = 'resultNotSent'
      }

      return sentDiagnosticReportObject
    }
  )

  return Promise.all(sentDiagnosticReportsArray).then(results => {
    console.log('results', results)
    return res.status(200).json({
      success: true,
      message: 'Get send status successful',
      data: results,
    })
  })
})

router.get('/laboratory/testResult', (req, res) => {
  const { diagnosticReportId, language } = req.query

  function readAndRespond(path) {
    let buff = fs.readFileSync(path)
    let base64data = buff.toString('base64')

    return res.status(200).json({
      success: true,
      data: {
        base64data: base64data,
      },
    })
  }

  if ([diagnosticReportId, language].includes(undefined)) {
    return res.status(200).json({
      success: false,
      message: 'Not enough parameters',
    })
  }
  // Хариу хадгалах зам
  const rootDir = CONFIG.LABORATORY_REPORT_OUTPUT_DIR
  const testResultPath = `${rootDir}/${language}/${diagnosticReportId}.pdf`

  fs.access(testResultPath, fs.F_OK, err => {
    if (err) {
      console.log('not to be')
      console.error(err)
      // Хэрэв өгөгдсөн хэлээр шинжилгээний хариуны бланк байхгүй бол үүсгэнэ
      return labReportGenerator({ diagnosticReportId, language })
        .then(testResultPath => {
          return readAndRespond(testResultPath)
        })
        .catch(errorInfo => {
          console.error(errorInfo)
          return res.status(200).json({
            success: false,
            message: 'Test result not found',
          })
        })
    }
    console.log('to be')
    //file exists
    return readAndRespond(testResultPath)

    // const testResultStream = fs.createReadStream(testResultPath)
    // const stat = fs.statSync(testResultPath)
    // res.setHeader('Content-Length', stat.size)
    // res.setHeader('Content-Type', 'application/pdf')
    // res.setHeader(
    //   'Content-Disposition',
    //   `attachment; filename=${diagnosticReportId}.pdf`
    // )
    // testResultStream.pipe(res)
    // return
  })
})

router.get('/laboratory/viralLoadTestsVerifiedResults', async (req, res) => {
  const { code, filteredDate } = req.query

  fhirResult = await fhirService
    .getViralLoadTestProtocolData({
      method: 'GET',
      url: '/viralLoadTestsVerifiedResults',
      data: {
        code: code,
        filteredDate: filteredDate,
        viralLoadTestCodes: UncategorizedTests.ViralLoadTests.include,
      },
    })
    .then(result => {
      const { data } = result.data
      let patientDataArray = []
      data.map(dataItem => {
        let dataObject = {}
        const { patient, specimen, observation } = dataItem
        const patientClass = controller.loadResourceArray(patient)

        const mockPatient = Object.assign(...patientClass)

        dataObject = {
          patient: mockPatient,
          nationalIdentificationNumber: mockPatient.getNationalIdentificationNumber(),
          patientId: mockPatient.identifier.value,
          lastName: mockPatient.getLastName(),
          firstName: mockPatient.getFirstName(),
          patientNumber: mockPatient._getBarcode(),
          emails: mockPatient.getEmails(),
          mobilePhones: mockPatient.getMobilePhones(),
        }

        specimen.map(specimenItem => {
          dataObject = {
            ...dataObject,
            accessionIdentifier: specimenItem.accessionIdentifier.value,
            specimenCollectedDateTime: helper.toLocalDateTime(
              specimenItem.collection.collectedDateTime
            ),
          }
        })

        observation.map(observationItem => {
          observationItem.basedOn.map(serviceRequestItem => {
            serviceRequestsId = serviceRequestItem.reference.replace(
              'ServiceRequest/',
              ''
            )
          })
          dataObject = {
            ...dataObject,
            result: observationItem.valueQuantity.value,
            serviceRequestId: serviceRequestsId,
          }
        })
        patientDataArray.push(dataObject)
      })

      if (patientDataArray) {
        return res.status(200).json({
          success: true,
          message: 'Read successful',
          data: patientDataArray,
        })
      } else {
        return res.status(200).json({
          success: false,
          message: 'Read unsuccessful',
        })
      }
    })
})

router.post('/laboratory/testResult/verify', async (req, res) => {
  const { patientId, contactPoint, transaction, rootServiceRequest } = req.body

  const rootTestKey = Object.keys(RootTests).find(testKey =>
    controller.codeIntersects(RootTests[testKey].code, rootServiceRequest.code)
  )

  if (
    !(
      transaction.resourceType === 'Bundle' &&
      (transaction.type === 'batch' || transaction.type === 'transaction')
    )
  ) {
    return res.status(200).json({
      success: false,
      message: 'Bundle request body is invalid',
    })
  }

  const filter = {
    patientId: patientId,
  }

  let patientInfo
  try {
    const userDoc = await UserModel.findOne(filter)

    const userName = userDoc.username
    const password = userDoc.nationalIdentificationNumber.substring(4)

    const isMatch = await userDoc.comparePassword(password)

    patientInfo = {
      password: isMatch && password,
      userName: userName,
    }
  } catch (errorInfo) {
    console.log(errorInfo)
    return res.status(200).json({
      success: false,
      message: 'Patient not found',
    })
  }

  return fhirService
    .sendBatchTransactionRequest(transaction)
    .then(() => {
      return fhirService.getResource('ServiceRequest', {
        _id: rootServiceRequest.id,
        _revinclude: ['DiagnosticReport:based-on'],
      })
    })
    .then(response => {
      const bundle = response.data
      const diagnosticReportId = bundle.entry.find(entryItem => {
        return (
          entryItem.resource &&
          entryItem.resource.resourceType === 'DiagnosticReport' &&
          controller.codeIntersects(
            entryItem.resource.code,
            RootTests[rootTestKey].code
          )
        )
      }).resource.id

      return diagnosticReportId
    })
    .then(diagnosticReportId => {
      return labReportGenerator({ diagnosticReportId, language: 'mn' })
    })
    .then(testResultPath => {
      return sendResultService.sendResult({
        contactPoint,
        pdfDocumentPath: testResultPath,
        patientInfo,
      })
    })
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'Test result verification successful',
      })
    })
    .catch(errorInfo => {
      console.log(errorInfo)
      return res.status(200).json({
        success: false,
        message: 'Test result verification failed',
      })
    })
})

router.post('/laboratory/testResult/send', upload.any(), (req, res) => {
  const { emails, diagnosticReportId, language, testKey } = req.body
  console.log(emails, diagnosticReportId, language, testKey)
  if ([emails, diagnosticReportId, language, testKey].includes(undefined)) {
    return res.status(200).json({
      success: false,
      message: 'Not enough parameters',
    })
  }

  function readAndRespond(path) {
    return sendResultService
      .sendResult({
        contactPoint: {
          emails,
        },
        pdfDocumentPath: path,
        testKey,
      })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Send result successful',
        })
      })
      .catch(err => {
        console.log(err)
        return res.status(200).json({
          success: false,
          data: err,
          message: 'Send result failed',
        })
      })
  }

  const rootDir = CONFIG.LABORATORY_REPORT_OUTPUT_DIR
  const testResultPath = `${rootDir}/${language}/${diagnosticReportId}.pdf`

  fs.access(testResultPath, fs.F_OK, err => {
    if (err) {
      console.log('not to be')
      console.error(err)
      // Хэрэв өгөгдсөн хэлээр шинжилгээний хариуны бланк байхгүй бол үүсгэнэ
      return labReportGenerator({ diagnosticReportId, language })
        .then(testResultPath => {
          return readAndRespond(testResultPath)
        })
        .catch(errorInfo => {
          console.error(errorInfo)
          return res.status(200).json({
            success: false,
            message: 'Test result not found',
          })
        })
    }
    console.log('to be')
    //file exists
    return readAndRespond(testResultPath)
  })
})

/* #region  laboratory test protocol save reagent */

router.post('/laboratory/testProtocol', async (req, res) => {
  const { testName, values, ...others } = req.body
  const Model = helper.modelLoader('testProtocol')
  const today = helper.getDate()

  const filter = {
    'values.testName': testName,
    _createdAt: today,
  }

  const testProtocol = await Model.findOne(filter).exec()

  let doc

  if (testProtocol) {
    const update = { values, ...others }
    doc = await Model.findOneAndUpdate(filter, update, {
      new: true,
    })
  } else {
    const instance = new Model({
      ...others,
      values: values,
      testName: testName,
    })

    doc = await instance.save()
  }
  if (doc) {
    return res.status(200).json({
      success: true,
      message: 'Test result save success.',
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Test protocol save failed.',
    })
  }
})

router.post(
  '/laboratory/labProtocolTestsVerifiedWithDateRange',
  async (req, res) => {
    const { startDate, endDate, labTestCode } = req.body

    codeString = `${labTestCode.code.coding[0].system}|${labTestCode.code.coding[0].code}`

    const requestPayload = {
      code: codeString,
      status: 'completed',
    }
    if (!startDate || !endDate) {
      return res.status(200).json({
        success: false,
        message: 'Failed',
      })
    }

    requestPayload['authored'] = [`ge${startDate}`, `le${endDate}`]

    Object.assign(requestPayload, {
      'specimen.status': 'available',
      //'_has:DiagnosticReport:based-on:status': 'final',

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
      '_include:iterate': ['DiagnosticReport:result', 'Observation:has-member'],
      _page: 1,
      _sort: 'authored',
    })

    const testListData = []

    await fetchRecursive({
      testListData,
      requestPayload,
      labTestCode,
      FHIR_CODES,
    })

    console.log(testListData)

    if (testListData) {
      return res.status(200).json({
        success: true,
        message: 'Read successful',
        data: testListData,
      })
    } else {
      return res.status(200).json({
        success: false,
        message: 'Read unsuccessful',
      })
    }
  }
)

router.get('/laboratory/testProtocol', async (req, res) => {
  const { testName, filteredDate } = req.query

  const Model = helper.modelLoader('testProtocol')

  let dateKey = '$values.registeredDate'

  const start = new Date(filteredDate)
  const end = new Date(filteredDate)
  end.setDate(end.getDate() + 1)

  const testProtocols = await Model.aggregate([
    {
      $match: {
        testName: testName,
        $expr: {
          $and: [
            {
              $gte: [
                {
                  $cond: {
                    if: {
                      $eq: [
                        {
                          $type: dateKey,
                        },
                        'string',
                      ],
                    },
                    then: {
                      $dateFromString: {
                        dateString: dateKey,
                      },
                    },
                    else: dateKey,
                  },
                },
                new Date(start),
              ],
            },
            {
              $lt: [
                {
                  $cond: {
                    if: {
                      $eq: [
                        {
                          $type: dateKey,
                        },
                        'string',
                      ],
                    },
                    then: {
                      $dateFromString: {
                        dateString: dateKey,
                      },
                    },
                    else: dateKey,
                  },
                },
                new Date(end),
              ],
            },
          ],
        },
      },
    },
  ]).exec()

  testProtocolData = testProtocols.map(protocolData => protocolData)

  if (testProtocolData) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: testProtocolData,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.get('/laboratory/viralLoadHDVTestProtocol', async (req, res) => {
  const { testName, filteredDate, appartusType } = req.query
  const Model = helper.modelLoader('testProtocol')

  let dateKey = '$values.registeredDate'
  const start = new Date(filteredDate)
  const end = new Date(filteredDate)
  end.setDate(end.getDate() + 1)

  const testProtocols = await Model.aggregate([
    {
      $match: {
        testName: testName,
        $expr: {
          $and: [
            {
              $gte: [
                {
                  $cond: {
                    if: {
                      $eq: [
                        {
                          $type: dateKey,
                        },
                        'string',
                      ],
                    },
                    then: {
                      $dateFromString: {
                        dateString: dateKey,
                      },
                    },
                    else: dateKey,
                  },
                },
                new Date(start),
              ],
            },
            {
              $lt: [
                {
                  $cond: {
                    if: {
                      $eq: [
                        {
                          $type: dateKey,
                        },
                        'string',
                      ],
                    },
                    then: {
                      $dateFromString: {
                        dateString: dateKey,
                      },
                    },
                    else: dateKey,
                  },
                },
                new Date(end),
              ],
            },

            {
              $eq: ['$values.choiceOfApparatusType', appartusType],
            },
          ],
        },
      },
    },
  ]).exec()
  testProtocolData = testProtocols.map(protocolData => protocolData)

  if (testProtocolData) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: testProtocolData,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})
router.get('/laboratory/testProtocolRapid', async (req, res) => {
  const { testName, filteredDate } = req.query
  const Model = helper.modelLoader('testProtocol')
  const filter = {
    testName: testName,
    _createdAt: filteredDate,
  }

  const testProtocol = await Model.findOne(filter).exec()

  if (testProtocol) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: testProtocol,
    })
  } else {
    return res.status(200).json({
      success: true,
      message: 'Read unsuccessful',
    })
  }
})

router.get('/laboratory/readProtocolDataPrint', async (req, res) => {
  const { testName } = req.query
  const Model = helper.modelLoader('testProtocol')
  const filter = {
    testName: testName,
    // _createdAt: filteredDate,
  }

  const testProtocol = await Model.findOne(filter).exec()
  if (testProtocol) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: testProtocol,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.post('/laboratory/specialTestProtocol', async (req, res) => {
  const { testName, values } = req.body
  const Model = helper.modelLoader('specialTestProtocol')

  const today = helper.getDate()

  const filter = {
    testName: testName,
    _createdAt: today,
  }
  const testProtocol = await Model.findOne(filter).exec()

  let doc

  if (testProtocol) {
    const update = { values: values }
    doc = await Model.findOneAndUpdate(filter, update, {
      new: true,
    })
  } else {
    const instance = new Model({
      testName: testName,
      values: values,
    })

    doc = await instance.save()
  }

  if (doc) {
    return res.status(200).json({
      success: true,
      message: 'Test result save success.',
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Test protocol save failed.',
    })
  }
})

router.get('/laboratory/specialTestProtocol', async (req, res) => {
  const { testName } = req.query
  const Model = helper.modelLoader('specialTestProtocol')

  const today = helper.getDate()
  const filter = {
    testName: testName,
    _createdAt: today,
  }

  const testProtocol = await Model.findOne(filter).exec()
  if (testProtocol) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: testProtocol,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.post('/laboratory/saveReagent', async (req, res) => {
  const { testName, values, ...others } = req.body
  const Model = helper.modelLoader('Reagent')

  const { reagentLotNumber } = values
  if (!reagentLotNumber) {
    return res.status(200).json({
      success: false,
      message: 'Reagent Lot Number is undefined.',
    })
  }
  const filter = {
    'values.reagentLotNumber': reagentLotNumber,
    testName: testName,
  }
  const Reagent = await Model.findOne(filter).exec()

  let doc

  if (Reagent) {
    const update = {
      values,
      ...others,
    }
    doc = await Model.findOneAndUpdate(filter, update, {
      new: true,
    })
  } else {
    const instance = new Model({
      ...others,
      values: values,
      testName: testName,
    })

    doc = await instance.save()
  }

  if (doc) {
    return res.status(200).json({
      success: true,
      message: 'Test result save success.',
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Test protocol save failed.',
    })
  }
})

/* #endregion */

/* #region  excelGenerator */
router.get('/laboratory/excelDataGenerator', (req, res) => {
  const dataSource = req.query
  let newData = []

  Object.keys(dataSource).forEach(element => {
    const rawData = JSON.parse(dataSource[element])
    newData.push(rawData)
  })

  const columns = [
    {
      title: '',
      dataIndex: '',
    },
    {
      title: 1,
      dataIndex: 1,
    },
    {
      title: 2,
      dataIndex: 2,
    },
    {
      title: 3,
      dataIndex: 3,
    },
    {
      title: 4,
      dataIndex: 4,
    },
    {
      title: 5,
      dataIndex: 5,
    },
    {
      title: 6,
      dataIndex: 6,
    },
    {
      title: 7,
      dataIndex: 7,
    },
    {
      title: 8,
      dataIndex: 8,
    },
    {
      title: 9,
      dataIndex: 9,
    },
    {
      title: 10,
      dataIndex: 10,
    },
    {
      title: 11,
      dataIndex: 11,
    },
    {
      title: 12,
      dataIndex: 12,
    },
  ]

  let arrayOfArray = []
  const titleArray = columns.map(column => column.title)
  arrayOfArray.push(titleArray)

  newData.forEach(element => {
    const { dataIndex, ...otherElements } = element

    const dataArray = Object.values(otherElements)

    arrayOfArray.push(dataArray)
  })

  const excelData = excelGenerator(arrayOfArray)

  return res.download(excelData)
})
/* #endregion */

/* #region consumption and read of reagents */
router.get('/laboratory/queryReagentTotal', async (req, res) => {
  const aggregationQuery = [
    { $group: { _id: { testName: '$testName' }, count: { $sum: 1 } } },
  ]

  return ReagentModel.aggregate(aggregationQuery)
    .then(aggregationResults => {
      const rowData = {}
      aggregationResults.forEach(result => {
        rowData[result._id.testName] = result.count
      })
      return rowData
    })
    .then(dataSource => {
      if (typeof dataSource !== undefined) {
        return res.status(200).json({
          success: true,
          data: {
            results: dataSource,
          },
        })
      }
    })
    .catch(errorInfo => {
      console.log(errorInfo)
      return res.status(500)
    })
})

router.get('/laboratory/readReagent', async (req, res) => {
  const { testName } = req.query
  const Model = helper.modelLoader('Reagent')
  const filter = {
    testName: testName,
  }

  const Reagents = await Model.find(filter).exec()

  ResReagent = Reagents.map(Reagent => Reagent.toJSON())
  if (ResReagent) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: ResReagent,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.get('/laboratory/readReagentLog', async (req, res) => {
  const { testName } = req.query
  const Model = helper.modelLoader('ReagentLog')

  const filter = {
    testName: testName,
  }

  const ReagentLogs = await Model.find(filter).exec()

  ResReagentLogs = ReagentLogs.map(ReagentLog => ReagentLog.toJSON())

  if (ResReagentLogs) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: ResReagentLogs,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.post('/laboratory/saveLabTestsReagentConsumption', async (req, res) => {
  const { consumption, testName } = req.body

  const Model = await helper.modelLoader('Reagent')
  let firstValue
  if (consumption) {
    const {
      reagentLotNumber,
      consumptionValue,
      recordedLaboratoryTechnician,
      recordedLaboratoryTechnicianId,
      description,
      appartusType,
    } = consumption

    return Model.findOne({
      'values.reagentLotNumber': reagentLotNumber,
      testName: testName,
    })
      .then(doc => {
        const docObject = doc.toJSON()
        const update = {
          ...docObject,
        }
        firstValue = update.values.quantity
        update.values.quantity =
          update.values.quantity - parseInt(consumptionValue)
        consumptionValue
        return Model.findOneAndUpdate(
          {
            'values.reagentLotNumber': reagentLotNumber,
            testName: testName,
          },
          update,
          { new: true }
        )
      })
      .then(async result => {
        const resultObject = result.toObject()
        delete resultObject._id

        resultObject.values.firstRemain = parseInt(firstValue)
        resultObject.values.consumptionValue = parseInt(consumptionValue)
        resultObject.values.description = description
        resultObject.values.recordedLaboratoryTechnician = recordedLaboratoryTechnician
        resultObject.values.recordedLaboratoryTechnicianId = recordedLaboratoryTechnicianId
        resultObject.values.appartusType = appartusType && appartusType
        const ReagentLogModel = await helper.modelLoader('ReagentLog')

        const reagentLogModelInstance = new ReagentLogModel(resultObject)
        return reagentLogModelInstance.save()
      })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Saved consumption log successfully!',
        })
      })
      .catch(errorInfo => {
        console.log(errorInfo)
        return res.status(200).json({
          success: false,
          message: 'Save consumption log failed!',
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Save consumption log failed!',
    })
  }
})

/* #endregion */

/* #region  laboratory services */

router.post('/laboratory/monitorOfHematology', async (req, res) => {
  const { testName, values, ...others } = req.body
  const Model = helper.modelLoader('internalMonitor')

  console.log(values)
  const filter = {
    'values.testName': testName,
  }
  const Reagent = await Model.findOne(filter).exec()

  let doc

  if (Reagent) {
    const update = {
      values,
      ...others,
    }
    doc = await Model.findOneAndUpdate(filter, update, {
      new: true,
    })
  } else {
    const instance = new Model({
      ...others,
      values: values,
      testName: testName,
    })

    doc = await instance.save()
  }

  if (doc) {
    return res.status(200).json({
      success: true,
      message: 'Test result save success.',
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Test protocol save failed.',
    })
  }
})

router.get('/laboratory/readMonitorOfHematology', async (req, res) => {
  const { testName, filteredDate } = req.query

  const Model = helper.modelLoader('internalMonitor')
  const filter = {
    testName: testName,
    _createdAt: filteredDate,
  }

  const monitorProtocols = await Model.find(filter).exec()
  monitorProtocol = monitorProtocols.map(protocolData => protocolData.toJSON())

  if (monitorProtocol) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: monitorProtocol,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.post('/laboratory/saveAnalyzator', async (req, res) => {
  const { testName, ...others } = req.body
  const { month } = others
  const Model = helper.modelLoader('analyzator')
  const filter = {
    testName: testName,
    month: month,
  }
  const Analyzator = await Model.findOne(filter).exec()

  let doc

  if (Analyzator) {
    const update = {
      ...others,
    }
    doc = await Model.findOneAndUpdate(filter, update, {
      new: true,
    })
  } else {
    const instance = new Model({
      ...others,
      testName: testName,
      month: month,
    })

    doc = await instance.save()
  }

  if (doc) {
    return res.status(200).json({
      success: true,
      message: 'Test protocol save success.',
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Test protocol save failed.',
    })
  }
})

router.get('/laboratory/readAnalyzator', async (req, res) => {
  const { testName, ...values } = req.query
  console.log('theeeere', req.query)
  const { month } = values
  const Model = helper.modelLoader('analyzator')

  const filter = {
    testName: testName,
    month: month,
  }

  const Analyzator = await Model.findOne(filter).exec()

  if (Analyzator) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: Analyzator,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.post('/laboratory/testCoagulationProtcol', async (req, res) => {
  const { testName, data } = req.body
  const Model = helper.modelLoader('testProtocol')

  const today = helper.getDate()

  const filter = {
    testName: testName,
    _createdAt: today,
  }
  const testProtocol = await Model.findOne(filter).exec()

  let doc

  if (testProtocol) {
    const update = { data: data }
    doc = await Model.findOneAndUpdate(filter, update, {
      new: true,
    })
  } else {
    const instance = new Model({
      testName: testName,
      data: data,
    })

    doc = await instance.save()
  }

  if (doc) {
    return res.status(200).json({
      success: true,
      message: 'Test result save success.',
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Test protocol save failed.',
    })
  }
})

router.get('/laboratory/testCoagulationProtcol', async (req, res) => {
  const { testName } = req.query
  console.log(res)
  const Model = helper.modelLoader('testProtocol')

  const today = helper.getDate()
  const filter = {
    testName: testName,
    _createdAt: today,
  }

  const testProtocol = await Model.findOne(filter).exec()

  if (testProtocol) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: testProtocol,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})
/* #endregion */

router.post('/laboratory/sampleModule', async (req, res) => {
  const { moduleData } = req.body

  const data = {
    serviceRequestId: moduleData.serviceRequestId,
    apparatus: moduleData.apparatus,
    module: moduleData.module,
  }

  const Model = helper.modelLoader('sampleModule')
  const instance = new Model(data)
  const response = await instance.save()

  if (!response) {
    return res.status(200).json({
      success: false,
      message: 'Save failed',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Save successful',
    data: response,
  })
})

router.post('/laboratory/sampleModule/getList', async (req, res) => {
  const { serviceRequestIdList } = req.body
  const Model = helper.modelLoader('sampleModule')
  const docs = await Model.find({
    serviceRequestId: { $in: serviceRequestIdList },
  })
  if (!docs) {
    return res.status(200).json({
      success: false,
      message: 'Read failed',
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Read successful',
    data: docs,
  })
})

router.put('/laboratory/sampleModule', async (req, res) => {
  console.log(req.body)
  const { moduleData } = req.body

  const data = {
    serviceRequestId: moduleData.serviceRequestId,
    apparatus: moduleData.apparatus,
    module: moduleData.module,
  }

  // ugugdliin sand hadgalah
  const Model = helper.modelLoader('sampleModule')
  const response = await Model.findOneAndUpdate(
    { serviceRequestId: data.serviceRequestId },
    data
  )

  if (!response) {
    return res.status(200).json({
      success: false,
      message: 'Update failed',
      data: response,
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Update successful',
    data: response,
  })
})

router.get('/laboratory/sampleModule/:id', async (req, res) => {
  const { id } = req.params

  // ugugdliin sangaas unshih

  // ugugdliin san husnegt songoh
  const Model = helper.modelLoader('sampleModule')
  // husnegtees ugugdul awah
  const document = await Model.findOne({ serviceRequestId: id })

  if (!document) {
    // haisan ugugudul baihgui bol
    return res.status(200).json({
      success: false,
      message: 'Read failed',
    })
  }
  // haisan ugugdul baiwail
  return res.status(200).json({
    success: true,
    message: 'Read successful',
    data: document,
  })
})

/* #region  laboratory storage */
router.post('/laboratory/saveSpecimenStorageDetials', async (req, res) => {
  const { barcode, storage } = req.body

  // freezer, compartment, layer, Row, Col, location -> [1-9], [1-99], [1-99], [1-99], [1-99], [1-100]
  const storageIndex =
    storage.freezer +
    ('00'.substring(storage.compartment.length) + storage.compartment) +
    ('00'.substring(storage.layer.length) + storage.layer) +
    ('00'.substring(storage.row.length) + storage.row) +
    ('00'.substring(storage.col.length) + storage.col) +
    ('000'.substring(storage.location.length) + storage.location)

  const storageLocation = {
    index: storageIndex,
    barcode: barcode,
    ...storage,
  }

  const StorageLocationModal = helper.modelLoader('storageLocation')
  const storageDocumentByIndex = await StorageLocationModal.findOne({
    index: storageIndex,
  })

  if (!storageDocumentByIndex) {
    const storageDocumentByBarcode = await StorageLocationModal.findOne({
      barcode: barcode,
    })

    /* #region  specimen references new save and changing the value of location  */
    const SpecimenReferenceModel = helper.modelLoader('specimenReference')

    const specimenDocument = await SpecimenReferenceModel.findOne({
      'specimen.barcode': barcode,
    })

    let changingDocument = specimenDocument.toJSON()
    let index = changingDocument.specimen.findIndex(s => s.barcode === barcode)

    changingDocument.specimen[index].storage = storage

    const resDocument = await SpecimenReferenceModel.findOneAndUpdate(
      { 'specimen.barcode': barcode },
      changingDocument,
      { new: true }
    )
    /* #endregion */

    if (storageDocumentByBarcode) {
      let changingStorageDocumentByBarcode = {
        index: storageIndex,
        barcode: barcode,
        ...storage,
      }

      const resStorageDocumentByBarcode = await StorageLocationModal.findOneAndUpdate(
        {
          barcode: barcode,
        },
        changingStorageDocumentByBarcode,
        { new: true }
      )

      if (resDocument && resStorageDocumentByBarcode) {
        return res.status(200).json({
          success: true,
          message: 'Succesfully change the location of specimen',
        })
      } else {
        return res.status(200).json({
          success: false,
          message: 'Changing the location failed',
        })
      }
    } else {
      /* #region  new save storage location*/
      const instance = new StorageLocationModal(storageLocation)
      instance.save()
      /* #endregion */

      return res.status(200).json({
        success: true,
        message: 'Succesfully save the location',
      })
    }
  } else {
    return res.status(200).json({
      success: false,
      message: 'Locaition is already existed',
    })
  }
})

router.get('/laboratory/storageDashboardSpecimenList', async (req, res) => {
  const Model = helper.modelLoader('specimenReference')
  const patientList = await Model.find()

  let resPatientList = []

  patientList.map(index => {
    resPatientList.push(index.toJSON())
  })

  if (resPatientList) {
    return res.status(200).json({
      success: true,
      message: 'Took successful',
      data: resPatientList,
    })
  } else {
    return res.status(400).json({
      success: false,
      message: ' failed',
    })
  }
})

router.get('/laboratory/storage/:id', async (req, res) => {
  const { id } = req.params

  const Model = helper.modelLoader('specimenReference')
  const searchedClient = await Model.findOne({ 'specimen.barcode': id })

  if (searchedClient) {
    return res.status(200).json({
      success: true,
      message: 'found successful',
      data: searchedClient.toJSON(),
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'not found',
      data: {},
    })
  }
})

router.get('/laboratory/searchedClientStorage/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)
  let searchedClientStorage

  if (!!id) {
    const searchedValue = new RegExp('^' + id)
    if (id[0].match(/^[0-9]$/)) {
      try {
        searchedClientStorage = await helper.getResource('specimenReference', {
          'specimen.barcode': searchedValue,
        })
      } catch {}
    } else {
      try {
        searchedClientStorage = await helper.getResource('specimenReference', {
          'patient.nationalIdentifierNumber': searchedValue,
        })
      } catch {}
    }
  }

  console.log(searchedClientStorage)

  if (searchedClientStorage) {
    return res.status(200).json({
      success: true,
      message: 'Took successful',
      data: searchedClientStorage,
    })
  } else {
    return res.status(400).json({
      success: false,
      message: ' failed',
    })
  }
})
/* #endregion */

function fetchRecursive({
  testListData,
  requestPayload,
  labTestCode,
  FHIR_CODES,
}) {
  return fhirService
    .getResource('ServiceRequest', requestPayload)
    .then(response => {
      const bundle = new Bundle(response.data)

      const testData = controller.generateTableData(
        bundle,
        FHIR_CODES,
        labTestCode
      )
      testListData.push(...testData)

      if (bundle.link.some(linkItem => linkItem.relation === 'next')) {
        return fetchRecursive({
          testListData,
          requestPayload: {
            ...requestPayload,
            _page: requestPayload._page + 1,
          },

          labTestCode,
          FHIR_CODES,
        })
      }
    })
}

module.exports = router

/**
 * author: Sod-Erdene
 * date: 2020-03-27
 *
 * modified by: Sod-Erdene
 * data: 2020-03-30
 *
 * modified by: Sod-Erdene
 * data: 2020-04-27
 */
