const express = require('express')
const bodyParser = require('body-parser')
const helper = require('@helper')
const controller = require('@controller')
const CONFIG = require('@config')
const { isEmptyObject } = require('@utils/helper')
const router = new express.Router()
const {
  bundle: Bundle,
  slot: Slot,
  appointment: Appointment,
} = require('@schemas')
const fhirService = require('@services/fhir')
const fhirRequest = require('@utils/fhirRequest')
const translator = require('@services/translator')
const excelGenerator = require('@services/excelgenerator')
router.use(bodyParser.json())
const Identifiers = require('@constants/Identifiers')
const ServiceRequestModel = helper.modelLoader('ServiceRequest')
const SpecimenReferenceModel = helper.modelLoader('specimenReference')
const ExternalSpecimenLogModel = helper.modelLoader('ExternalSpecimenLog')
const CancelledServiceRequestModel = helper.modelLoader(
  'CancelledServiceRequest'
)

const LabTests = require('@constants/LabTests')

const { UncategorizedTests, BiochemistryTests, ImmunologyTests } = LabTests

const {
  RapidTests,
  ViralLoadTests,
  OtherTests = {},
  Genotype,
} = UncategorizedTests
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
  ViralLoadTests,
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

/**
 * Доорх функц нь шинжилгээ захиалах үед дуудагдана
 * Оролтын параметр нь Uncategorized, Immunology, Biochemistry шинжилгээнүүдийг агуулах объект байна
 * Шинжилгээ бүрийг Parent ийг хадгалаад,
 * Parent ийн reference ийг ашиглан child дэд шинжилгээний basedOn элемент дээр зааж өгөх байдлаар хадгална
 */

router.post('/serviceRequestList', async (req, res) => {
  const {
    transaction,
    payment = {},
    research,
    patient,
    patientName,
    patientBarcode,
    user,
    LabTestsAndCheckup,
    requisition,
    externalSpecimenLog,
    SelectedTests,
    SelectedCheckup,
    SelectedDiagnosticTests,
  } = req.body

  const serviceType = []

  if (LabTestsAndCheckup) {
    if (!isEmptyObject(LabTestsAndCheckup.SelectedCheckup)) {
      serviceType.push('consultation')
    }

    if (
      !isEmptyObject(LabTestsAndCheckup.SelectedTestItems) &&
      LabTestsAndCheckup.SelectedTestItems.length > 0
    ) {
      serviceType.push('laboratoryTest')
    }
  }

  const paymentMethodList = []
  if (payment) {
    if (payment.inCash) {
      paymentMethodList.push('inCash')
    }
    if (payment.byCredit) {
      paymentMethodList.push('byCredit')
    }
  }

  const filterItem = {
    serviceType: serviceType,
    paymentMethodList: paymentMethodList,
  }

  // NOTE: not sure about the payments
  let patientNameString

  try {
    patientNameString = patientName.find(v => v.use === 'official')
  } catch {}

  const newEntry = {
    byCredit:
      !isNaN(parseFloat(payment.byCredit)) && parseFloat(payment.byCredit),
    discount:
      !isNaN(parseFloat(payment.discount)) && parseFloat(payment.discount),
    inCash: !isNaN(parseFloat(payment.inCash)) && parseFloat(payment.inCash),
    insurance:
      !isNaN(parseFloat(payment.insurance)) && parseFloat(payment.insurance),
    insuranceHBV:
      !isNaN(parseFloat(payment.insuranceHBV)) &&
      parseFloat(payment.insuranceHBV),
    insuranceHCV:
      !isNaN(parseFloat(payment.insuranceHCV)) &&
      parseFloat(payment.insuranceHCV),
    insuranceHDV:
      !isNaN(parseFloat(payment.insuranceHDV)) &&
      parseFloat(payment.insuranceHDV),
    checkupCost: !isNaN(payment.checkupCost) && payment.checkupCost,
    customersDiscount:
      !isNaN(payment.customersDiscount) && payment.customersDiscount,
    diagnosticTestCost:
      !isNaN(payment.diagnosticTestCost) && payment.diagnosticTestCost,
    labTestCost: !isNaN(payment.labTestCost) && payment.labTestCost,
    relatedCompanyBills:
      !isNaN(payment.relatedCompanyBills) && payment.relatedCompanyBills,
    //  research: !isNaN(payment.research) && payment.research,
    research: research,
    specialDiscount: !isNaN(payment.specialDiscount) && payment.specialDiscount,
    staffsDiscount: !isNaN(payment.staffsDiscount) && payment.staffsDiscount,
    totalAmount: !isNaN(payment.totalAmount) && payment.totalAmount,
    totalIncome: !isNaN(payment.totalIncome) && payment.totalIncome,
    patientName: patientNameString,
    patientId: patient.id,
    filterItem: filterItem,
    patientBarcode: patientBarcode,
    user: user,
    requisition: requisition,
    SelectedTests,
    SelectedCheckup,
    SelectedDiagnosticTests,
  }

  let fhirResult

  if (
    user.permission.role &&
    user.permission.role !== CONFIG.ROLE_TYPE.EXTERNAL_RECEPTIONIST
  ) {
    // Шууд захиална

    try {
      // removing costs
      const { entry, ...remainders } = transaction
      const filtered = {
        ...remainders,
        entry: entry.map(v => {
          return {
            fullUrl: v.fullUrl,
            resource: v.resource,
            request: v.request,
          }
        }),
      }

      fhirResult = await fhirRequest({
        method: 'POST',
        url: '/api',
        data: filtered,
      })
      const combined = fhirResult.data.entry.map((v, i) => {
        return {
          fullUrl: v.fullUrl,
          resource: v.resource,
          response: v.response,
          cost: transaction.entry[i].cost,
        }
      })

      newEntry.transaction = combined

      const newEntryInstance = new ServiceRequestModel({
        ...newEntry,
        status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.CONFIRMED,
      })
      await newEntryInstance.save()

      return res.status(200).json({
        success: true,
        message: 'Service request saved successfully.',
      })
    } catch (errorInfo) {
      console.error(errorInfo)
      return res.status(400).json({ success: false, data: errorInfo })
    }
  } else {
    // Захиалгын Bundle-ийг fhir-руу илгээлгүйгээр хадгална.
    // Ингэснээр, захиалга баталгаажуулахад fhir-руу илгээх боломжтой.

    try {
      newEntry.status = CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.PENDING
      newEntry.transaction = transaction
      const newEntryInstance = new ServiceRequestModel({
        ...newEntry,
      })
      await newEntryInstance.save()

      if (externalSpecimenLog) {
        const lastIndex = await ExternalSpecimenLogModel.find({})
          .sort({ identifier: -1 })
          .then(lastSpecimenLog => {
            if (lastSpecimenLog.length > 0) {
              return lastSpecimenLog[0].toObject().identifier
            }

            return 0
          })

        let externalSpecimenLogIdentifier = lastIndex
        function uniqueValue() {
          externalSpecimenLogIdentifier = externalSpecimenLogIdentifier + 1
          return externalSpecimenLogIdentifier
        }

        const externalSpecimenLogPromises = externalSpecimenLog.map(
          externalSpecimenLogItem => {
            const externalSpecimenLogInstance = new ExternalSpecimenLogModel({
              ...externalSpecimenLogItem,
              status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.PENDING,
              requisition: requisition,
              identifier: uniqueValue(),
              organization: req.body.organization,
            })

            return externalSpecimenLogInstance.save()
          }
        )

        await Promise.all(externalSpecimenLogPromises)
      }
      return res.status(200).json({
        success: true,
        message: 'Service request saved successfully.',
      })
    } catch (errorInfo) {
      console.error(errorInfo)
      return res.status(400).json({ success: false, data: errorInfo })
    }
  }
})

router.get('/serviceRequest/confirmed', async (req, res) => {
  try {
    const query = {
      status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.CONFIRMED,
      patientId: req.query.patientId,
    }

    const result = await ServiceRequestModel.find(query)

    const resultObjectArray = result.map(resultItem => resultItem.toObject())
    return res.status(200).send({
      success: true,
      data: resultObjectArray,
    })
  } catch (errorInfo) {
    console.error(errorInfo)
    return res.status(200).send({
      success: false,
      message: 'Request to get pending orders failed',
    })
  }
})

router.get('/serviceRequest/pending', async (req, res) => {
  try {
    const query = {
      status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.PENDING,
      patientId: req.query.patientId,
    }

    const result = await ServiceRequestModel.find(query)

    const resultObjectArray = result.map(resultItem => resultItem.toObject())
    return res.status(200).send({
      success: true,
      data: resultObjectArray,
    })
  } catch (errorInfo) {
    console.error(errorInfo)
    return res.status(200).send({
      success: false,
      message: 'Request to get pending orders failed',
    })
  }
})

router.post('/serviceRequest/pending', async (req, res) => {
  try {
    const { status, serviceRequestInfo } = req.body
    const { requisition, transaction } = serviceRequestInfo
    if (status === CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.CANCELLED) {
      await ServiceRequestModel.findOneAndUpdate(
        {
          status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.PENDING,
          'requisition.system': requisition.system,
          'requisition.value': requisition.value,
        },
        {
          status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.CANCELLED,
        }
      )
    } else if (status === CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.CONFIRMED) {
      // removing costs
      // transaction-ыг fhir-д хадгалж, ирсэн хариугаар ServiceRequestModel-г шинэчлэнэ
      const { entry, ...remainders } = transaction
      const filtered = {
        ...remainders,
        entry: entry.map(v => {
          return {
            fullUrl: v.fullUrl,
            resource: v.resource,
            request: v.request,
          }
        }),
      }

      fhirResult = await fhirRequest({
        method: 'POST',
        url: '/api',
        data: filtered,
      })

      const combined = fhirResult.data.entry.map((v, i) => {
        return {
          fullUrl: v.fullUrl,
          resource: v.resource,
          response: v.response,
          cost: transaction.entry[i].cost,
        }
      })

      const serviceRequestDocument = await ServiceRequestModel.findOne({
        status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.PENDING,
        'requisition.system': requisition.system,
        'requisition.value': requisition.value,
      })
      const serviceRequest = serviceRequestDocument.toObject()

      serviceRequest.transaction = combined

      const newEntry = {
        ...serviceRequest,
        status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.CONFIRMED,
      }

      await ServiceRequestModel.findOneAndUpdate(
        {
          status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.PENDING,
          'requisition.system': requisition.system,
          'requisition.value': requisition.value,
        },
        newEntry
      )

      // status => confirmed болгох
      const externalSpecimenLogQuery = {
        status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.PENDING,
        'requisition.system': requisition.system,
        'requisition.value': requisition.value,
      }
      const externalSpecimenLogUpdate = {
        $set: {
          status: CONFIG.STATUS.EXTERNAL_SPECIMEN_LOG.CONFIRMED,
        },
      }

      const externalSpecimenLogUpdateOptions = {
        multi: true,
      }

      await ExternalSpecimenLogModel.updateMany(
        externalSpecimenLogQuery,
        externalSpecimenLogUpdate,
        externalSpecimenLogUpdateOptions
      )

      // шинэчлэх зүйлс дууссан
    }

    return res.status(200).send({
      success: true,
      message: 'Order status updated',
    })
  } catch (errorInfo) {
    console.error(errorInfo)
    return res.status(200).send({
      success: false,
      message: 'Request to update order status failed',
    })
  }
})

router.post('/serviceRequest/report', (req, res) => {
  const { ...Lists } = req.body.formValues
  const {
    startDate,
    endDate,
    _count = CONFIG.PAGE_SIZE,
    _page = CONFIG.PAGE_NUMBER,
  } = req.body

  const searchQuery = {
    _createdAt: {
      $gte: new Date(new Date(startDate).toISOString()),
      $lte: new Date(new Date(endDate).toISOString()),
    },
  }
  if (Lists.serviceType && Lists.serviceType.includes('consultation')) {
    searchQuery.checkupCost = { $gt: 0 }
  }
  if (Lists.serviceType && Lists.serviceType.includes('laboratoryTest')) {
    searchQuery.labTestCost = { $gt: 0 }
  }

  if (Lists.serviceType && Lists.serviceType.includes('diagnosticTest')) {
    searchQuery.diagnosticTestCost = { $gt: 0 }
  }

  if (Lists.paymentMethodList && Lists.paymentMethodList.includes('inCash')) {
    searchQuery.inCash = { $gt: 0 }
  }

  if (Lists.paymentMethodList && Lists.paymentMethodList.includes('byCredit')) {
    searchQuery.byCredit = { $gt: 0 }
  }
  if (Lists.researchPurpose && Lists.researchPurpose.includes('Sars_Cov2')) {
    searchQuery.research = { $eq: 'Sars_Cov2' }
  }

  let total = 0
  let sumLabTestCost = 0
  let sumCheckupCost = 0
  let sumDiagnosticTestCost = 0
  let sumCustomersDiscount = 0
  let sumInCash = 0
  let sumByCredit = 0
  let sumInsuranceHBV = 0
  let sumInsuranceHCV = 0
  let sumTotalAmount = 0
  let sumTotalIncome = 0

  const aggregationQuery = [
    {
      $match: searchQuery,
    },
    {
      $facet: {
        results: [
          {
            $skip: Number(_count) * (_page - 1),
          },
          {
            $limit: Number(_count),
          },
        ],
        details: [
          {
            $group: {
              _id: null,
              sumLabTestCost: { $sum: '$labTestCost' },
              sumCheckupCost: { $sum: '$checkupCost' },
              sumDiagnosticTestCost: { $sum: '$diagnosticTestCost' },
              sumCustomersDiscount: { $sum: '$customersDiscount' },
              sumInCash: { $sum: '$inCash' },
              sumByCredit: { $sum: '$byCredit' },
              sumInsuranceHBV: { $sum: '$insuranceHBV' },
              sumInsuranceHCV: { $sum: '$insuranceHCV' },
              sumTotalAmount: { $sum: '$totalAmount' },
              sumTotalIncome: { $sum: '$totalIncome' },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              sumLabTestCost: 1,
              sumCheckupCost: 1,
              sumDiagnosticTestCost: 1,
              sumCustomersDiscount: 1,
              sumInCash: 1,
              sumByCredit: 1,
              sumInsuranceHBV: 1,
              sumInsuranceHCV: 1,
              sumTotalAmount: 1,
              sumTotalIncome: 1,
              count: 1,
            },
          },
        ],
      },
    },
  ]
  return ServiceRequestModel.aggregate(aggregationQuery)
    .then(([aggregationResult]) => {
      if (aggregationResult.details.length > 0) {
        total = aggregationResult.details[0].count
        sumLabTestCost = aggregationResult.details[0].sumLabTestCost
        sumCheckupCost = aggregationResult.details[0].sumCheckupCost
        sumDiagnosticTestCost =
          aggregationResult.details[0].sumDiagnosticTestCost
        sumCustomersDiscount = aggregationResult.details[0].sumCustomersDiscount
        sumInCash = aggregationResult.details[0].sumInCash
        sumByCredit = aggregationResult.details[0].sumByCredit
        sumInsuranceHBV = aggregationResult.details[0].sumInsuranceHBV
        sumInsuranceHCV = aggregationResult.details[0].sumInsuranceHCV
        sumTotalAmount = aggregationResult.details[0].sumTotalAmount
        sumTotalIncome = aggregationResult.details[0].sumTotalIncome
      }

      return Promise.all(
        aggregationResult.results.map(async result => {
          try {
            const patientResponse = await fhirService
              .getResourceById('Patient', result.patientId)
              .then(response => response.data)

            return {
              ...result,
              patient: patientResponse,
            }
          } catch (error) {
            throw error
          }
        })
      )
    })
    .then(results => {
      const dataSource = []
      results.forEach(result => {
        const Patient = controller.loadResource(result.patient)
        let date = helper.toLocalDateTime(result._createdAt)
        const firstName = Patient.getFirstName()
        const lastName = Patient.getLastName()
        const patientNumber = Patient._getBarcode()
        let nationIdentificationNumber =
          Patient && Patient.getNationalIdentificationNumber()
        let barcode = result.patientNumber
        let labTest = result.labTestCost
        let observation = result.checkupCost
        let diagnosticTest = result.diagnosticTestCost
        let research = result.research
        let preDiscount =
          result.customersDiscount +
          result.discount +
          result.specialDiscount +
          result.staffsDiscount
        let discount = preDiscount
        let inCash = result.inCash
        let byCredit = result.byCredit
        // let healthInsurance =
        //   result.insurance +
        //   result.insuranceHBV +
        //   result.insuranceHCV +
        //   result.insuranceHDV
        let healthInsuranceB = result.insuranceHBV
        let healthInsuranceC = result.insuranceHCV
        let localBilling = ''
        let totalPayment = result.totalAmount
        let totalIncome = result.totalIncome
        dataSource.push({
          date,
          firstName,
          lastName,
          patientNumber,
          nationIdentificationNumber,
          barcode,
          labTest,
          observation,
          diagnosticTest,
          research,
          discount,
          inCash,
          byCredit,
          healthInsuranceB,
          healthInsuranceC,
          localBilling,
          totalPayment,
          totalIncome,
        })
      })
      return dataSource
    })
    .then(dataSource => {
      const columns = [
        {
          title: translator('RegisteredDate', 'mn'),
          dataIndex: 'date',
        },
        {
          title: translator('LastName', 'mn'),
          dataIndex: 'lastName',
        },
        {
          title: translator('FirstName', 'mn'),
          dataIndex: 'firstName',
        },
        {
          title: translator('NationalIdentificationNumber', 'mn'),
          dataIndex: 'nationIdentificationNumber',
        },
        {
          title: translator('Barcode', 'mn'),
          dataIndex: 'patientNumber',
        },
        {
          title: translator('LabTest', 'mn'),
          dataIndex: 'labTest',
        },
        {
          title: translator('ObservationPractitioner', 'mn'),
          dataIndex: 'observation',
        },
        {
          title: translator('DiagnosticTest', 'mn'),
          dataIndex: 'diagnosticTest',
        },
        {
          title: translator('Research', 'mn'),
          dataIndex: 'research',
        },
        {
          title: translator('Discount', 'mn'),
          dataIndex: 'discount',
        },
        {
          title: translator('inCash', 'mn'),
          dataIndex: 'inCash',
        },
        {
          title: translator('byCredit', 'mn'),
          dataIndex: 'byCredit',
        },
        {
          title: translator('healthInsuranceB', 'mn'),
          dataIndex: 'healthInsuranceB',
        },
        {
          title: translator('healthInsuranceC', 'mn'),
          dataIndex: 'healthInsuranceC',
        },

        {
          title: translator('LocalBilling', 'mn'),
          dataIndex: 'localBilling',
        },
        {
          title: translator('TotalPayment', 'mn'),
          dataIndex: 'totalPayment',
        },
        {
          title: translator('TotalIncome', 'mn'),
          dataIndex: 'totalIncome',
        },
      ]

      const titleArray = columns.map(column => column.title)
      const arrayOfArray = [titleArray]

      dataSource.forEach(element => {
        const rowArray = []

        columns.forEach(column => {
          let value = element[column.dataIndex]

          if (typeof value === 'number') {
            value = value.toFixed(2)
          }
          rowArray.push(value)
        })

        arrayOfArray.push(rowArray)
      })
      // excelGenerator(arrayOfArray)
      if (typeof dataSource !== undefined) {
        return res.status(200).json({
          success: true,
          data: {
            results: dataSource,
            total: total,
            sumLabTestCost: sumLabTestCost,
            sumCheckupCost: sumCheckupCost,
            sumDiagnosticTestCost: sumDiagnosticTestCost,
            sumCustomersDiscount: sumCustomersDiscount,
            sumInCash: sumInCash,
            sumByCredit: sumByCredit,
            sumInsuranceHBV: sumInsuranceHBV,
            sumInsuranceHCV: sumInsuranceHCV,
            sumTotalAmount: sumTotalAmount,
            sumTotalIncome: sumTotalIncome,
            _page: _page,
            _count: _count,
          },
        })
      }

      return res.status(404)
    })
    .catch(errorInfo => {
      console.log(errorInfo)
      return res.status(500)
    })
})

// reception Excel Download
router.get('/serviceRequest/receptionExcelReport', async (req, res) => {
  const { dataSource } = req.query

  const obj = JSON.parse(dataSource)

  const searchQuery = {
    _createdAt: {
      $gte: new Date(new Date(obj.startDate).toISOString()),
      $lte: new Date(new Date(obj.endDate).toISOString()),
    },
  }

  const aggregationQuery = [
    {
      $match: searchQuery,
    },
    {
      $facet: {
        results: [],
        details: [
          {
            $group: {
              _id: null,
              sumLabTestCost: { $sum: '$labTestCost' },
              sumCheckupCost: { $sum: '$checkupCost' },
              sumDiagnosticTestCost: { $sum: '$diagnosticTestCost' },
              sumCustomersDiscount: { $sum: '$customersDiscount' },
              sumInCash: { $sum: '$inCash' },
              sumByCredit: { $sum: '$byCredit' },
              sumInsuranceHBV: { $sum: '$insuranceHBV' },
              sumInsuranceHCV: { $sum: '$insuranceHCV' },
              sumTotalAmount: { $sum: '$totalAmount' },
              sumTotalIncome: { $sum: '$totalIncome' },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              sumLabTestCost: 1,
              sumCheckupCost: 1,
              sumDiagnosticTestCost: 1,
              sumCustomersDiscount: 1,
              sumInCash: 1,
              sumByCredit: 1,
              sumInsuranceHBV: 1,
              sumInsuranceHCV: 1,
              sumTotalAmount: 1,
              sumTotalIncome: 1,
              count: 1,
            },
          },
        ],
      },
    },
  ]

  return ServiceRequestModel.aggregate(aggregationQuery)
    .allowDiskUse(true)
    .then(([aggregationResult]) => {
      if (aggregationResult.details.length > 0) {
        total = aggregationResult.details[0].count
        sumLabTestCost = aggregationResult.details[0].sumLabTestCost
        sumCheckupCost = aggregationResult.details[0].sumCheckupCost
        sumDiagnosticTestCost =
          aggregationResult.details[0].sumDiagnosticTestCost
        sumCustomersDiscount = aggregationResult.details[0].sumCustomersDiscount
        sumInCash = aggregationResult.details[0].sumInCash
        sumByCredit = aggregationResult.details[0].sumByCredit
        sumInsuranceHBV = aggregationResult.details[0].sumInsuranceHBV
        sumInsuranceHCV = aggregationResult.details[0].sumInsuranceHCV
        sumTotalAmount = aggregationResult.details[0].sumTotalAmount
        sumTotalIncome = aggregationResult.details[0].sumTotalIncome
      }

      return Promise.all(
        aggregationResult.results.map(async result => {
          try {
            const patientResponse = await fhirService
              .getResourceById('Patient', result.patientId)
              .then(response => response.data)

            return {
              ...result,
              patient: patientResponse,
            }
          } catch (error) {
            throw error
          }
        })
      )
    })
    .then(results => {
      const dataSource = []
      results.forEach(result => {
        const Patient = controller.loadResource(result.patient)
        let date = helper.toLocalDateTime(result._createdAt)
        const firstName = Patient.getFirstName()
        const lastName = Patient.getLastName()
        const patientNumber = Patient._getBarcode()
        let nationIdentificationNumber =
          Patient && Patient.getNationalIdentificationNumber()
        let barcode = result.patientNumber
        let labTest = result.labTestCost
        let observation = result.checkupCost
        let diagnosticTest = result.diagnosticTestCost
        let research = ''
        let preDiscount =
          result.customersDiscount +
          result.discount +
          result.specialDiscount +
          result.staffsDiscount
        let discount = preDiscount
        let inCash = result.inCash
        let byCredit = result.byCredit
        // let healthInsurance =
        //   result.insurance +
        //   result.insuranceHBV +
        //   result.insuranceHCV +
        //   result.insuranceHDV
        let healthInsuranceB = result.insuranceHBV
        let healthInsuranceC = result.insuranceHCV
        let localBilling = ''
        let totalPayment = result.totalAmount
        let totalIncome = result.totalIncome
        dataSource.push({
          date,
          firstName,
          lastName,
          patientNumber,
          nationIdentificationNumber,
          barcode,
          labTest,
          observation,
          diagnosticTest,
          research,
          discount,
          inCash,
          byCredit,
          healthInsuranceB,
          healthInsuranceC,
          localBilling,
          totalPayment,
          totalIncome,
        })
      })
      return dataSource
    })
    .then(dataSource => {
      const columns = [
        {
          title: translator('RegisteredDate', 'mn'),
          dataIndex: 'date',
        },
        {
          title: translator('LastName', 'mn'),
          dataIndex: 'lastName',
        },
        {
          title: translator('FirstName', 'mn'),
          dataIndex: 'firstName',
        },
        {
          title: translator('NationalIdentificationNumber', 'mn'),
          dataIndex: 'nationIdentificationNumber',
        },
        {
          title: translator('Barcode', 'mn'),
          dataIndex: 'patientNumber',
        },
        {
          title: translator('LabTest', 'mn'),
          dataIndex: 'labTest',
        },
        {
          title: translator('ObservationPractitioner', 'mn'),
          dataIndex: 'observation',
        },
        {
          title: translator('DiagnosticTest', 'mn'),
          dataIndex: 'diagnosticTest',
        },
        {
          title: translator('Research', 'mn'),
          dataIndex: 'research',
        },
        {
          title: translator('Discount', 'mn'),
          dataIndex: 'discount',
        },
        {
          title: translator('inCash', 'mn'),
          dataIndex: 'inCash',
        },
        {
          title: translator('byCredit', 'mn'),
          dataIndex: 'byCredit',
        },
        {
          title: translator('healthInsuranceB', 'mn'),
          dataIndex: 'healthInsuranceB',
        },
        {
          title: translator('healthInsuranceC', 'mn'),
          dataIndex: 'healthInsuranceC',
        },

        {
          title: translator('LocalBilling', 'mn'),
          dataIndex: 'localBilling',
        },
        {
          title: translator('TotalPayment', 'mn'),
          dataIndex: 'totalPayment',
        },
        {
          title: translator('TotalIncome', 'mn'),
          dataIndex: 'totalIncome',
        },
      ]

      const titleArray = columns.map(column => column.title)

      const arrayOfArray = [titleArray]

      dataSource.forEach(element => {
        const rowArray = []

        columns.forEach(column => {
          let value = element[column.dataIndex]

          if (typeof value === 'number') {
            value = value.toFixed(2)
          }
          rowArray.push(value)
        })

        arrayOfArray.push(rowArray)
      })

      const excelDataPath = excelGenerator(arrayOfArray)

      return res.download(excelDataPath)
      // return res.status(404)
    })
    .catch(errorInfo => {
      console.log(errorInfo)
      return res.status(500)
    })
})

// Excel Download
router.get('/serviceRequest/excel', async (req, res) => {
  const { dataSource } = req.query
  const obj = JSON.parse(dataSource)

  const searchQuery = {
    _createdAt: {
      $gte: new Date(new Date(obj.startDate)).toISOString(),
      $lte: new Date(new Date(obj.endDate)).toISOString(),
    },
  }

  const specimenReferences = []
  const result = await SpecimenReferenceModel.find(searchQuery)

  result.map(item => {
    const oneSpecimenReference = {}
    oneSpecimenReference.collectedDate = item._createdAt
    oneSpecimenReference.lastName = item.patient.lastName
    oneSpecimenReference.firstName = item.patient.firstName
    item.specimen.forEach(dataItem => {
      if (dataItem.test === 'Rapid Test') {
        oneSpecimenReference.RapidTests = dataItem.barcode
      } else if (dataItem.test === 'Ferritin') {
        oneSpecimenReference.Ferritin = dataItem.barcode
      } else if (dataItem.test === 'HCV-RNA') {
        oneSpecimenReference.HCV_RNA = dataItem.barcode
      } else if (dataItem.test === 'HBV-DNA') {
        oneSpecimenReference.HBV_DNA = dataItem.barcode
      } else if (dataItem.test === 'HDV-RNA') {
        oneSpecimenReference.HDV_RNA = dataItem.barcode
      } else if (dataItem.test === 'Anti-HDV') {
        oneSpecimenReference.Anti_HDV = dataItem.barcode
      } else if (dataItem.test === 'Hematology') {
        oneSpecimenReference.Hematology = dataItem.barcode
      } else if (dataItem.test === 'Coagulation') {
        oneSpecimenReference.Coagulation = dataItem.barcode
      } else if (dataItem.test === 'Biochemistry Immunology') {
        oneSpecimenReference.BiochemistryTests = dataItem.barcode
      } else if (dataItem.test === 'Immunology') {
        oneSpecimenReference.Immunology = dataItem.barcode
      } else if (dataItem.test === 'Vitamin D') {
        oneSpecimenReference.Vitamin_D3 = dataItem.barcode
      }
    })
    specimenReferences.push(oneSpecimenReference)
  })

  const columns = [
    {
      title: translator('collectedDate', 'mn'),
      dataIndex: 'collectedDate',
    },
    {
      title: translator('lastName', 'mn'),
      dataIndex: 'lastName',
    },
    {
      title: translator('firstName', 'mn'),
      dataIndex: 'firstName',
    },
    {
      title: translator('BiochemistryTests', 'mn'),
      dataIndex: 'BiochemistryTests',
    },
    {
      title: translator('Immunology', 'mn'),
      dataIndex: 'Immunology',
    },
    {
      title: translator('RapidTests', 'mn'),
      dataIndex: 'RapidTests',
    },
    {
      title: translator('Hematology', 'mn'),
      dataIndex: 'Hematology',
    },
    {
      title: translator('Vitamin_D3', 'mn'),
      dataIndex: 'Vitamin_D3',
    },
    {
      title: translator('Anti_HDV', 'mn'),
      dataIndex: 'Anti_HDV',
    },
    {
      title: translator('HCV_RNA', 'mn'),
      dataIndex: 'HCV_RNA',
    },
    {
      title: translator('HBV_DNA', 'mn'),
      dataIndex: 'HBV_DNA',
    },
    {
      title: translator('HDV_RNA', 'mn'),
      dataIndex: 'HDV_RNA',
    },
    {
      title: translator('Coagulation', 'mn'),
      dataIndex: 'Coagulation',
    },
    {
      title: translator('Ferritin', 'mn'),
      dataIndex: 'Ferritin',
    },
  ]

  const titleArray = columns.map(column => column.title)
  const arrayOfArray = [titleArray]

  specimenReferences.forEach(specimenReference => {
    const rowArray = []
    columns.forEach(column => {
      let value = specimenReference[column.dataIndex]
      rowArray.push(value)
    })
    arrayOfArray.push(rowArray)
  })

  const excelDataPath = excelGenerator(arrayOfArray)
  return res.download(excelDataPath)
})

router.post('/serviceRequest/phlebotomyReport', async (req, res) => {
  const { ...Lists } = req.body.formValues

  const {
    startDate,
    endDate,
    _count = CONFIG.PAGE_SIZE,
    _page = CONFIG.PAGE_NUMBER,
  } = req.body

  const {
    RapidTests,
    OtherTests = {},
    Genotype,
    ViralLoadTests,
  } = UncategorizedTests

  const { HCV_RNA, HBV_DNA, HDV_RNA, HIV_RNA, HPV } = ViralLoadTests.include

  const {
    ESR,
    Urinalysis,
    Coagulation,
    Hematology,
    Vitamin_D3,
    Ferritin,
    Anti_HDV,
  } = OtherTests.include

  const LabTests = {
    RapidTests,
    HCV_RNA,
    HBV_DNA,
    HDV_RNA,
    HIV_RNA,
    HPV,
    BiochemistryTests,
    Hematology,
    ImmunologyTests,
    Coagulation,
    Genotype,
    Urinalysis,
    ESR,
    Vitamin_D3,
    Ferritin,
    Anti_HDV,
  }

  const viralLoadList = {
    HCV_RNA,
    HBV_DNA,
    HDV_RNA,
    HIV_RNA,
    HPV,
    RapidTests,
    BiochemistryTests,
    Hematology,
    ImmunologyTests,
    Coagulation,
    Genotype,
    Urinalysis,
    ESR,
    Vitamin_D3,
    Ferritin,
    Anti_HDV,
  }

  let LabTestCode = {}
  const testArray = []

  Object.keys(LabTests).forEach(test => {
    LabTestCode[test] = {
      display: LabTests[test].display,
      code: LabTests[test].code,
    }
  })

  if (Lists && Lists.testType) {
    Lists.testType.map(element => {
      const testCode = {
        system: element.code.coding[0].system,
        code: element.code.coding[0].code,
      }
      testArray.push(testCode)
    })
  }

  const searchQuery = {
    _createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  }

  const aggregationQuery = [
    {
      $match: searchQuery,
    },
    {
      $match: {
        $expr: {
          $or: [
            {
              $anyElementTrue: {
                $map: {
                  input: '$specimen',
                  as: 'this',
                  in: {
                    $anyElementTrue: {
                      $map: {
                        input: '$$this.testCodes',
                        as: 'thisTestCodes',

                        in: {
                          $anyElementTrue: {
                            $map: {
                              input: '$$thisTestCodes.coding',
                              as: 'thisTestCodesCoding',
                              in: {
                                $or: testArray.map(element => {
                                  return {
                                    $and: [
                                      {
                                        $eq: [
                                          '$$thisTestCodesCoding.system',
                                          `${element.system}`,
                                        ],
                                      },
                                      {
                                        $eq: [
                                          '$$thisTestCodesCoding.code',
                                          `${element.code}`,
                                        ],
                                      },
                                    ],
                                  }
                                }),
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
    //match hiigeed irsen hariug results, details 2 hesegt salgana
    //results dotor hariunuud
    // details dotor niit hed bgaa ni irne
    {
      $facet: {
        results: [
          {
            $skip: Number(_count) * (_page - 1),
          },
          {
            $limit: Number(_count),
          },
        ],
        details: [
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
            },
          },
        ],
      },
    },
  ]

  let total = 0

  return SpecimenReferenceModel.aggregate(aggregationQuery)
    .then(([aggregationResult]) => {
      total = aggregationResult.details[0] && aggregationResult.details[0].count
      const { results } = aggregationResult
      return {
        total,
        results,
      }
    })
    .then(({ total, results }) => {
      const requisitionArray = []

      results.map(specimenReference => {
        requisitionArray.push(specimenReference.requisition)
      })

      const bundleEntries = []

      requisitionArray.forEach(requisition => {
        const bundleEntry = {
          request: {
            method: 'GET',
            url: [
              `ServiceRequest`,
              `?requisition=${requisition.system}|${requisition.value}`,
              `&_include=ServiceRequest:subject`,
              `&_include=ServiceRequest:specimen`,
              `&_include:iterate=ServiceRequest:based-on`,
              `&_revinclude:iterate=ServiceRequest:based-on`,
            ]
              .filter(value => !!value)
              .join(''),
          },
        }
        bundleEntries.push(bundleEntry)
      })

      const bundle = new Bundle({
        type: 'transaction',
        entry: bundleEntries,
      }).toJSON()
      return fhirService.sendBatchTransactionRequest(bundle)
    })
    .then(response => {
      const { data } = response
      const dataSource = []
      const entryPromises = data.entry.map(bundleEntry => {
        const bundle = new Bundle(bundleEntry.resource)
        if (bundle.entry.length === 0) {
          return
        }

        const resourceArray = controller.loadResourceArray(
          bundle.getResourcesOnly()
        )

        const resourceDictionary = controller.createResourceDictionary(
          resourceArray
        )

        let finalData = {}
        let patientName
        let specimenBarcode

        const serviceRequestPromises = resourceDictionary['ServiceRequest'].map(
          serviceRequest => {
            const testKey = Object.keys(LabTests).find(testItem => {
              return controller.codeIntersects(
                LabTests[testItem].code,
                serviceRequest.code
              )
            })
            if (!testKey) {
              return
            }

            let specimenReferenceArray
            specimenReferenceArray = serviceRequest.specimen

            const bundleEntries = []

            specimenReferenceArray.forEach(specimenReference => {
              const bundleEntry = {
                request: {
                  method: 'GET',
                  url: `Specimen/${
                    specimenReference.reference.split('/').slice(-1)[0]
                  }`,
                },
              }
              bundleEntries.push(bundleEntry)
            })

            const bundle = new Bundle({
              type: 'batch',
              entry: bundleEntries,
            }).toJSON()

            return fhirService
              .sendBatchTransactionRequest(bundle)
              .then(specimenResponse => {
                //fhir-с specimen-ий мэдээллүүд ирж байгаа бөгөөд тэдгээрийг өөрт хялбар байдлаар боловсруулна.
                //Боловсруулна гэдэг нь ирж байгаа класс-аас өөрт хэрэгтэй object руу хувиргаж байгаа хэлбэр
                const { data } = specimenResponse
                const specimenBundle = new Bundle(data)

                const specimenResourceArray = controller.loadResourceArray(
                  specimenBundle.getResourcesOnly()
                )

                const specimenResourceDictionary = controller.createResourceDictionary(
                  specimenResourceArray
                )

                specimen = specimenResourceDictionary['Specimen']
                //Боловсруулсан өгөгдөл маань specimen нэртэй объект болж байгаа бөгөөд түүнээс хэрэгтэй мэдэллүүдээ салгаж авна.
                if (specimen) {
                  controller.sortByDate(
                    specimen,
                    'collection.collectedDateTime'
                  )
                  let latestSpecimen = specimen.slice(-1)[0]
                  latestCollectedDateTime =
                    latestSpecimen.collection.collectedDateTime

                  if (
                    latestSpecimen.accessionIdentifier.system ===
                    Identifiers.LiverCenter.Specimen.system
                  ) {
                    latestAccessionIdentifier =
                      latestSpecimen.accessionIdentifier.value
                  }

                  const collectedDate =
                    latestSpecimen.collection.collectedDateTime
                  patientName = latestSpecimen.subject.display
                  specimenBarcode = latestSpecimen.accessionIdentifier.value
                  finalData[testKey] = specimenBarcode
                  finalData['collectedDate'] = collectedDate
                  finalData['patientName'] = patientName
                }
              })
              .catch(errorInfo => {
                throw new Error(errorInfo)
              })
          }
        )
        return Promise.all(serviceRequestPromises).then(() => {
          dataSource.push(finalData)
        })
      })

      return Promise.all(entryPromises).then(() => {
        return res.status(200).json({
          success: true,
          message: 'Read successful',
          data: {
            results: dataSource,
            total: total,
            _page: _page,
            _count: _count,
          },
        })
      })
    })
    .catch(errorInfo => {
      console.error(errorInfo)
      return res.status(200).json({
        success: false,
        message: 'Read unsuccessful',
      })
    })
})

router.post('/serviceRequest/laboratoryReport', async (req, res) => {
  const { ...Lists } = req.body.formValues
  const { startDate, endDate } = req.body

  if (Object.keys(Lists).length === 0) {
    return
  }
  if (Lists.labTechnicians === undefined) {
  }

  const testArray = []
  const specimenArray = []
  const labTechniciansArray = []

  if (Lists && Lists.testType) {
    Lists.testType.map(element => {
      testArray.push(
        `${element.code.coding[0].system}|${element.code.coding[0].code}`
      )
    })
  }

  if (Lists && Lists.specimenCondition) {
    Lists.specimenCondition.map(element => {
      specimenArray.push(
        `${element.coding[0].system}|${element.coding[0].code}`
      )
    })
  }

  if (Lists && Lists.labTechnicians) {
    Lists.labTechnicians.map(element => {
      labTechniciansArray.push(`Practitioner/${element}`)
    })
  }

  const LabTestCode = testArray.join(',')
  const specimenConditionCode = specimenArray.join(',')
  const labTechnicianCode = labTechniciansArray.join(',')
  const specimenReferences = await SpecimenReferenceModel.find().limit(20)

  const requisitionArray = []

  specimenReferences.map(specimenReference => {
    requisitionArray.push(specimenReference.requisition)
  })

  const bundleEntries = []

  requisitionArray.forEach(requisition => {
    const urlArray = [
      `ServiceRequest`,
      `?requisition=${requisition.system}|${requisition.value}`,
      `&code=${LabTestCode}`,
      labTechnicianCode &&
        `&_has:DiagnosticReport:based-on:performer=${labTechnicianCode}`,
      // `&_has:DiagnosticReport:based-on:patient:birthdate=ge${today-18 year}`,
      `&_revinclude=DiagnosticReport:based-on`,
      `&_include:iterate=DiagnosticReport:subject`,
      `&_include:iterate=DiagnosticReport:specimen`,
    ]

    if (specimenArray.length > 0) {
      urlArray.push(
        ...[
          `&specimen.status=unsatisfactory`,
          `&specimen.condition=${specimenConditionCode}`,
        ]
      )
    } else {
      urlArray.push(
        ...[
          startDate && `&_has:DiagnosticReport:based-on:issued=ge${startDate}`,
          endDate && `&_has:DiagnosticReport:based-on:issued=le${endDate}`,
          `&_has:DiagnosticReport:based-on:status=final`,
        ]
      )
    }

    const bundleEntry = {
      request: {
        method: 'GET',
        url: urlArray.filter(value => !!value).join(''),
      },
    }

    bundleEntries.push(bundleEntry)
  })

  const bundle = new Bundle({
    type: 'batch',
    entry: bundleEntries,
  }).toJSON()

  const response = await fhirService
    .sendBatchTransactionRequest(bundle)
    .catch(errorInfo => console.log(errorInfo))
  if (response) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: response.data,
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

router.post('/serviceRequest/cancellation', async (req, res) => {
  try {
    const { transaction } = req.body.data

    const appointmentResource = transaction.find(
      item => item.resource.resourceType === 'Appointment'
    )

    if (appointmentResource) {
      const slotReference = appointmentResource.resource.slot[0].reference

      const [slotResourceType, slotId] = slotReference.split('/').slice(-2)

      const slotResponse = await fhirService.getResourceById(
        slotResourceType,
        slotId
      )

      const { data } = slotResponse
      const slotResource = new Slot({
        ...data,
      })
      slotResource['status'] = 'free'

      await fhirService.putResource(slotResource.resourceType, slotResource)
    }

    const bundleEntries = []
    transaction
      .filter(item => !!item.resource)
      .map(item => {
        bundleEntries.push({
          request: {
            method: 'DELETE',
            url: `${item.resource.resourceType}/${item.resource.id}`,
          },
        })
      })

    const bundle = new Bundle({
      type: 'batch',
      entry: bundleEntries,
    }).toJSON()

    await fhirService.sendBatchTransactionRequest(bundle)

    await ServiceRequestModel.findByIdAndDelete(req.body.data._id)

    const CancelledInstance = new CancelledServiceRequestModel(req.body)

    const result = await CancelledInstance.save()

    return res.json({
      success: true,
      data: result,
    })
  } catch (errorInfo) {
    return res.json({
      success: false,
      message: errorInfo.message,
    })
  }
})
module.exports = router
