const documentInit = require('./document')
const header = require('./header')
const patientInfo = require('./patientInfo')
const footer = require('./footer')
const translate = require('./translate')
const LabTests = require('@constants/LabTests')
const helper = require('@helper')
const controller = require('@controller')

const TITLE =
  'SARS CoV-2 (КОВИД-19) вирүсийн эсрэг иммунглобулин G тодорхойлох '
const TEST_PROTOCOL = 'М-ЭТ-012'

const SAMPLE_TYPE = 'Serum'
const ASSAY_METHOD = 'Фермент Холбоот Эсрэг Биеийн Урвал'
const INSTRUMENT_NAME = 'BIO-TEK EL800 Universal Microplate Reader'

const NEGATIVE = 'Negative'
const POSITIVE = 'Positive'

const TEST_RESULT = 'Test result'
const PARAMETER = 'Parameter'
const RESULT = 'Result'
const UNIT = 'Value'
const REFERENCE_RANGE = 'Reference value'

module.exports = (params, writeStream) => {
  const { patient, language = 'mn' } = params
  const firstName = patient.getFirstName()
  const lastName = patient.getLastName()
  const age = helper.calculateAgeFromBirthDate(patient.birthDate)
  const gender = patient.gender
  const nationalIdentificationNumber = patient.getNationalIdentificationNumber()

  const mobile = patient.getMobilePhones()[0]

  if ([firstName, lastName, age, gender].includes(undefined)) {
    throw new Error('Patient information is not valid', patient)
  }

  const patientBarcode = patient._getBarcode()

  const sampleCollectedPractitioner =
    params.specimen[0].collection.collector.display
  const sampleCollectedDate = params.sampleCollectionTime

  const recordedPractitioner = params.performedPractitioner.getOfficialNameString(
    {
      short: true,
    }
  )
  const recordedDate = params.runCompletionTime

  const assertedPractitioner = params.verifiedPractitioner.getOfficialNameString(
    {
      short: true,
    }
  )
  const assertedDate = params.verifiedTime

  const tableData = []

  const { valueQuantity, status } = params.latestObservation
  if (status !== 'final') {
    throw new Error('Observatin must be of final status')
  }

  const result = valueQuantity.value
  const unit = valueQuantity.unit

  // const refRange = `0 (${translate(DETECTED, language)})`

  const related = controller.getRelatedReferenceRange(
    LabTests.UncategorizedTests.OtherTests.include.Sars_Cov2_IgG_Elisa
      .referenceRange,
    patient
  )

  console.log(related)

  const negative = `<${
    related.interpretation.find(i => i.type === 'Negative').max
  } (${translate(NEGATIVE, language)})`

  const positive = `≥${
    related.interpretation.find(i => i.type === 'Positive').min
  } (${translate(POSITIVE, language)})`

  const refRange = `${negative}\n${positive}`

  const testName = params.testCode.display

  let resultSuffix

  if (
    parseInt(result) <
    parseInt(related.interpretation.find(i => i.type === 'Negative').max)
  ) {
    resultSuffix = translate(NEGATIVE, language)
  } else {
    resultSuffix = translate(POSITIVE, language)
  }

  tableData.push(['SARS-CoV-2 IgG', `${result} (${resultSuffix})`, refRange])

  const { doc, pageSettings } = documentInit(writeStream)

  const leftAlign = 30

  header({
    doc,
    pageSettings,
    title: translate(TITLE, language),
    patientBarcode,
    testProtocol: translate(TEST_PROTOCOL, language),
  })

  patientInfo({
    doc,
    language,
    pageSettings,
    lastName,
    firstName,
    age,
    gender,
    nationalIdentificationNumber,
    mobile,
  })

  drawTestResult()

  footer({
    doc,
    language,
    pageSettings,
    sampleType: translate(SAMPLE_TYPE, language),
    assayMethod: translate(ASSAY_METHOD, language),
    instrumentName: translate(INSTRUMENT_NAME, language),
    sampleCollectedPractitioner,
    sampleCollectedDate,
    recordedPractitioner,
    recordedDate,
    assertedPractitioner,
    assertedDate,
  })

  function drawTestResult() {
    const table1 = {
      headers: [
        translate(PARAMETER, language),
        translate(RESULT, language),
        // translate(UNIT, language),
        translate(REFERENCE_RANGE, language),
      ],
      rows: tableData,
    }

    doc
      .moveDown(1)
      .fontSize(10)
      .font('./fonts/Helvetica-Neue-Medium.woff')
      .text(translate(TEST_RESULT, language), leftAlign, doc.y)
      .font('./fonts/Helvetica-Neue.woff')
      .moveDown(1)
      .table(table1, leftAlign, doc.y, { width: 530 })
      .moveDown(5)
  }

  console.log('ENDING')
  doc.end()
}
