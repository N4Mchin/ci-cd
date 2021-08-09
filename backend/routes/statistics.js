const express = require('express')
const bodyParser = require('body-parser')
const config = require('@config')
const fhirService = require('@services/fhir')
const helper = require('@helper')
const schemas = require('@schemas')
const Identifiers = require('@constants/Identifiers')
const Categories = require('@constants/Categories')
const PhlebotomyService = require('@constants/PhlebotomyService')
const ImmunologyTests = require('@constants/LabTests/Immunology')
const BiochemistryTests = require('@constants/LabTests/Biochemistry')
const UncategorizedTests = require('@constants/LabTests/Uncategorized')
const router = new express.Router()

const Bundle = schemas.bundle
router.use(bodyParser.json())

router.get('/statistics/reception', async (req, res) => {
  const { startDate, endDate } = req.query
  const Model = helper.modelLoader('ServiceRequest')
  const PatientModel = helper.modelLoader('PatientBarcode')

  const {
    RapidTests,
    ViralLoadTests,
    OtherTests = {},
    Genotype,
  } = UncategorizedTests

  const {
    ESR,
    Urinalysis,
    Vitamin_D3,
    Ferritin,
    Anti_HDV,
    Hematology,
    Coagulation,
  } = OtherTests.include

  const LabTestObjects = {
    RapidTests,
    ...ViralLoadTests.include,
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

  const totalLaboratoryProcedureRequestQuery = Object.values(LabTestObjects)

    .map(labTestItem => {
      return `${labTestItem.code.coding[0].system}|${labTestItem.code.coding[0].code}`
    })
    .join(',')

  const bundle = new Bundle({
    type: 'batch',
    entry: [
      {
        request: {
          method: 'GET',
          url: `Patient?identifier=${Identifiers.LiverCenter.PatientIdentifier.system}|&_summary=count`,
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `ServiceRequest`,
            `?category=${Categories.Counselling.coding[0].system}|${Categories.Counselling.coding[0].code}`,
            startDate && `&authored=ge${startDate}`,
            endDate && `&authored=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `ServiceRequest`,
            `?code=${totalLaboratoryProcedureRequestQuery}`,
            startDate && `&authored=ge${startDate}`,
            endDate && `&authored=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `ServiceRequest`,
            `?category=${Categories.Imaging.coding[0].system}|${Categories.Imaging.coding[0].code}`,
            startDate && `&authored=ge${startDate}`,
            endDate && `&authored=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
    ],
  }).toJSON()

  const bundleResponse = await fhirService

    .sendBatchTransactionRequest(bundle)
    .catch(errorInfo => console.log(errorInfo))

  let totalRegisteredCustomers = 0
  let totalCounselling = 0
  let totalLaboratoryProcedures = 0
  let Imaging = 0

  try {
    totalRegisteredCustomers = bundleResponse.data.entry[0].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    totalCounselling = bundleResponse.data.entry[1].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    totalLaboratoryProcedures = bundleResponse.data.entry[2].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    Imaging = bundleResponse.data.entry[3].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  const customersDiscount = await Model.countDocuments({
    $and: [
      {
        $or: [
          { customersDiscount: { $exists: 1, $ne: null, $ne: 0 } },
          { specialDiscount: { $exists: 1, $ne: null, $ne: 0 } },
          { staffsDiscount: { $exists: 1, $ne: null, $ne: 0 } },
        ],
      },

      {
        _createdAt: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    ],
  })

  const insurance = await Model.countDocuments({
    $and: [
      {
        $or: [
          { insurance: { $exists: 1, $ne: null, $ne: 0 } },
          { insuranceHBV: { $exists: 1, $ne: null, $ne: 0 } },
          { insuranceHCV: { $exists: 1, $ne: null, $ne: 0 } },
          { insuranceHDV: { $exists: 1, $ne: null, $ne: 0 } },
        ],
      },
      {
        _createdAt: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    ],
  })

  const newCustomers = await PatientModel.countDocuments({
    $or: [
      {
        _createdAt: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    ],
  })

  if (res) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: {
        newCustomers: newCustomers,
        customersDiscount: customersDiscount,
        insurance: insurance,
        totalCounselling: totalCounselling,
        totalRegisteredCustomers: totalRegisteredCustomers,
        totalLaboratoryProcedures: totalLaboratoryProcedures,
        Imaging: Imaging,
      },
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

/////////////////////////////////////////////////////////////////////////
router.get('/statistics/laboratory', async (req, res) => {
  const { startDate, endDate } = req.query

  const {
    RapidTests,
    ViralLoadTests,
    OtherTests = {},
    Genotype,
  } = UncategorizedTests

  const {
    ESR,
    Urinalysis,
    Vitamin_D3,
    Ferritin,
    Anti_HDV,
    Hematology,
    Coagulation,
  } = OtherTests.include

  const LabTestObjects = {
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
  const { HCV_RNA, HBV_DNA, HDV_RNA } = ViralLoadTests.include
  const { AFP } = ImmunologyTests.include.Tumor_Markers.include

  const bundle = new Bundle({
    type: 'batch',
    entry: [
      {
        request: {
          method: 'GET',
          url: `Patient?identifier=${Identifiers.LiverCenter.PatientIdentifier.system}|&_summary=count`,
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?identifier=${Identifiers.DiagnosticReport.system}|`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?identifier=${Identifiers.DiagnosticReport.system}|`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `Specimen`,
            `?identifier=${Identifiers.LiverCenter.Specimen.system}|`,
            startDate && `&collected=ge${startDate}`,
            endDate && `&collected=le${endDate}`,
            `&status=unsatisfactory`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${BiochemistryTests.code.coding[0].system}|${BiochemistryTests.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${Anti_HDV.code.coding[0].system}|${Anti_HDV.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${Coagulation.code.coding[0].system}|${Coagulation.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${Ferritin.code.coding[0].system}|${Ferritin.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${Hematology.code.coding[0].system}|${Hematology.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${ImmunologyTests.code.coding[0].system}|${ImmunologyTests.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${RapidTests.code.coding[0].system}|${RapidTests.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${ESR.code.coding[0].system}|${ESR.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${Urinalysis.code.coding[0].system}|${Urinalysis.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${HCV_RNA.code.coding[0].system}|${HCV_RNA.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${HBV_DNA.code.coding[0].system}|${HBV_DNA.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${HDV_RNA.code.coding[0].system}|${HDV_RNA.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `DiagnosticReport`,
            `?code=${Vitamin_D3.code.coding[0].system}|${Vitamin_D3.code.coding[0].code}`,
            startDate && `&issued=ge${startDate}`,
            endDate && `&issued=le${endDate}`,
            `&status=final`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
    ],
  }).toJSON()

  const bundleResponse = await fhirService

    .sendBatchTransactionRequest(bundle)
    .catch(errorInfo => console.log(errorInfo))

  let totalRegisteredCustomers = 0
  let conductedTests = 0
  let verifiedTests = 0
  let unsatisfactorySpecimen = 0
  let Biochemistry = 0
  let Anti_HDV_Test = 0
  let CoagulationTest = 0
  let FerritinTest = 0
  let HematologyTest = 0
  let Immunology = 0
  let RapidTest = 0
  let ESR_Test = 0
  let UrinalysisTest = 0
  let HCV_RNA_Test = 0
  let HBV_DNA_Test = 0
  let HDV_RNA_Test = 0
  let Vitamin_D3_Test = 0
  try {
    totalRegisteredCustomers = bundleResponse.data.entry[0].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    conductedTests = bundleResponse.data.entry[1].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    verifiedTests = bundleResponse.data.entry[2].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    unsatisfactorySpecimen = bundleResponse.data.entry[3].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    Biochemistry = bundleResponse.data.entry[4].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    Anti_HDV_Test = bundleResponse.data.entry[5].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    CoagulationTest = bundleResponse.data.entry[6].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    FerritinTest = bundleResponse.data.entry[7].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    HematologyTest = bundleResponse.data.entry[8].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    Immunology = bundleResponse.data.entry[9].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    RapidTest = bundleResponse.data.entry[10].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    ESR_Test = bundleResponse.data.entry[11].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    UrinalysisTest = bundleResponse.data.entry[12].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    HCV_RNA_Test = bundleResponse.data.entry[13].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    HBV_DNA_Test = bundleResponse.data.entry[14].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    HDV_RNA_Test = bundleResponse.data.entry[15].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    Vitamin_D3_Test = bundleResponse.data.entry[16].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  if (res) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: {
        totalRegisteredCustomers: totalRegisteredCustomers,
        conductedTests: conductedTests,
        verifiedTests: verifiedTests,
        unsatisfactorySpecimen: unsatisfactorySpecimen,
        Biochemistry: Biochemistry,
        Anti_HDV_Test: Anti_HDV_Test,
        CoagulationTest: CoagulationTest,
        FerritinTest: FerritinTest,
        HematologyTest: HematologyTest,
        Immunology: Immunology,
        RapidTest: RapidTest,
        ESR_Test: ESR_Test,
        UrinalysisTest: UrinalysisTest,
        HCV_RNA_Test: HCV_RNA_Test,
        HBV_DNA_Test: HBV_DNA_Test,
        HDV_RNA_Test: HDV_RNA_Test,
        Vitamin_D3_Test: Vitamin_D3_Test,
      },
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

/////////////////////////////////////////////////////////////////////////
router.get('/statistics/phlebotomy', async (req, res) => {
  const { startDate, endDate } = req.query
  const Model = helper.modelLoader('ServiceRequest')

  const PatientModel = helper.modelLoader('PatientBarcode')

  const {
    RapidTests,
    ViralLoadTests,
    OtherTests = {},
    Genotype,
  } = UncategorizedTests

  const {
    ESR,
    Urinalysis,
    Vitamin_D3,
    Ferritin,
    Anti_HDV,
    Hematology,
    Coagulation,
  } = OtherTests.include

  const LabTestObjects = {
    RapidTests,
    ViralLoadTests,
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

  const bundle = new Bundle({
    type: 'batch',
    entry: [
      {
        request: {
          method: 'GET',
          url: `Patient?identifier=${Identifiers.LiverCenter.PatientIdentifier.system}|&_summary=count`,
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `Specimen`,
            `?accession=${Identifiers.LiverCenter.Specimen.system}|`,
            startDate && `&collected=ge${startDate}`,
            endDate && `&collected=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `ServiceRequest`,
            `?code=${BiochemistryTests.code.coding[0].system}|${BiochemistryTests.code.coding[0].code}`,
            startDate && `&specimen.collected=ge${startDate}`,
            endDate && `&specimen.collected=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `ServiceRequest`,
            `?code=${ImmunologyTests.code.coding[0].system}|${ImmunologyTests.code.coding[0].code}`,
            startDate && `&specimen.collected=ge${startDate}`,
            endDate && `&specimen.collected=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },

      {
        request: {
          method: 'GET',
          url: [
            `ServiceRequest`,
            `?code=${ViralLoadTests.code.coding[0].system}|${ViralLoadTests.code.coding[0].code}`,
            startDate && `&specimen.collected=ge${startDate}`,
            endDate && `&specimen.collected=le${endDate}`,
            `&_summary=count`,
          ]
            .filter(value => !!value)
            .join(''),
        },
      },
    ],
  }).toJSON()

  const bundleResponse = await fhirService

    .sendBatchTransactionRequest(bundle)
    .catch(errorInfo => console.log(errorInfo))

  let totalRegisteredCustomers = 0
  let totalSpecimen = 0
  let biochemistrySpecimen = 0
  let immunologySpecimen = 0
  let viralLoadTestSpecimen = 0

  try {
    totalRegisteredCustomers = bundleResponse.data.entry[0].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    totalSpecimen = bundleResponse.data.entry[1].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    biochemistrySpecimen = bundleResponse.data.entry[2].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    immunologySpecimen = bundleResponse.data.entry[3].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  try {
    viralLoadTestSpecimen = bundleResponse.data.entry[4].resource.total
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  if (res) {
    return res.status(200).json({
      success: true,
      message: 'Read successful',
      data: {
        totalRegisteredCustomers: totalRegisteredCustomers,
        totalSpecimen: totalSpecimen,
        biochemistrySpecimen: biochemistrySpecimen,
        immunologySpecimen: immunologySpecimen,
        viralLoadTestSpecimen: viralLoadTestSpecimen,
      },
    })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Read unsuccessful',
    })
  }
})

module.exports = router
