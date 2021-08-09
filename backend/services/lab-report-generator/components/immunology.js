const documentInit = require('./document')
const header = require('./header')
const patientInfo = require('./patientInfo')
const footer = require('./footer')
const helper = require('@helper')
const translate = require('./translate')

const TITLE = 'Immunology test'
const TEST_PROTOCOL = 'М-ЭТ-006'
const SAMPLE_TYPE = 'Serum'

const ASSAY_METHOD = 'CLIA'

const INSTRUMENT_NAME = 'SYSMEX HISCL-5000'

const TEST_RESULT = 'Test result'
const PARAMETER = 'Parameter'
const RESULT = 'Result'
const UNIT = 'Value'
const REFERENCE_RANGE = 'Reference value'
const IMMUNIZED = 'Immunized'
const NEGATIVE = 'Negative'
const POSITIVE = 'Positive'
const REMARKS = 'Remarks'

const REMARK_ARRAY = {
  AFP: `Альфа-фетопротейн (AFP) нь жирэмсэний үе, элэг өөхлөх, элэгний хатуурал, архаг хепатит, элэг болон бусад эрхтэний хавдар зэрэг эмгэгүүдийн үед ихсэж болох тул та мэргэжлийн эмчид хандан зөвлөгөө авна уу.`,
  Anti_HbsImmunized: `Танд хепатитын В вирүсийн эсрэг дархлаа тогтсон байна.`,
  Anti_HbsNonImmunized: `Танд хепатитын В вирүсийн эсрэг дархлаа тогтоогүй байна. Та хепатитын В вирүсийн эсрэг вакцинд хамрагдах нь зүйтэй.`,
  HBeAg: `HBeAg нь вирүсийн идэвхийг илэрхийлэх тул мэргэжлийн эмчид хандан зөвлөгөө авна уу.`,
  HBsAg_Positive: `HBsAg нь вирүс тээгч болон цочмог, архаг хепатитын үед цусанд илэрнэ. Та мэргэжлийн эмчид хандаж зөвлөгөө авах, шаардлагатай бол онош баталгаажуулах зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь зүйтэй.`,
  Anti_HCVPositive: `anti-HCV илрэх нь архаг C хепатит, C хепатитаар өвдөөд эдгэрсэн зэрэг тохиолдолууд байж болно. Та нарийн мэргэжлийн эмчид хандан зөвлөгөө авна уу.`,
  Anti_HCVNegative: `anti-HCV сөрөг гарах нь халдвар аваагүйг илэрхийлнэ. Та халдвар авахаас сэрэмжлээрэй. Хэрэв та С вирүсийн халдвар авсан хэмээн сэжиглэж буй тохиолдолд 3 сарын дараа давтан шинжилгээ өгч нарийн мэргэжлийн эмчид хандан зөвлөгөө авна уу.`,
  Pivka_II: `PIVKA II нь элэгний эст өмөн, цөсний эмгэг болон сүрьеэгийн эсрэг бэлдмэл удаан хугацаанд хэрэглэсэн үед ихсэж болох тул мэргэжлийн эмчид хандана уу.`,
  HBsAg_quantificationPositive: `qHBsAg нь вирүс тээгч болон цочмог, архаг хепатитын үед цусанд илэрнэ. Та мэргэжлийн эмчид хандаж зөвлөгөө авах, шаардлагатай бол онош баталгаажуулах зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь зүйтэй.`,
  HBsAg_quantificationNegative: `qHBsAg илрээгүй тул хепатитын В вирүсийн эсрэг дархлаатай (anti-HBs) эсэхийг шалгуулна уу. Хэрэв дархлаа тогтоогүй тохиолдолд хепатитын В вирүсийн эсрэг вакцин хийлгэх нь зүйтэй.`,
}

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
  const remarkData = []

  Object.keys(params.include).forEach(testKey => {
    Object.keys(params.include[testKey].include).forEach(subTestKey => {
      const { valueQuantity, status, referenceRange } = params.include[
        testKey
      ].include[subTestKey].latestObservation
      if (status !== 'final') {
        throw new Error('Observatin must be of final status')
      }

      const result = valueQuantity.value
      const unit = valueQuantity.unit

      let lowValue
      let highValue
      try {
        lowValue = referenceRange[0].low.value
        highValue = referenceRange[0].high.value
      } catch (errorInfo) {}

      let refRange

      switch (subTestKey) {
        case 'Anti_Hbe':
          refRange = `< ${highValue} ${translate(NEGATIVE, language)}`
          break

        case 'Anti_Hbs':
          refRange = `≥ ${highValue} ${translate(IMMUNIZED, language)}`
          break

        case 'HBeAg':
        case 'Anti_HCV':
        case 'HBsAg_quantification':
          refRange = `${[lowValue, highValue].join(' - ')} (${translate(
            NEGATIVE,
            language
          )})`
          break

        case 'Anti_Hbe':
          refRange = `< ${highValue} ${translate(NEGATIVE, language)}`
          break

        case 'AFP':
        default:
          refRange = [lowValue, highValue].join(' - ')
          break
      }

      let resultSuffix = ''
      if (
        subTestKey === 'HBeAg' ||
        subTestKey === 'HBsAg_quantification' ||
        subTestKey === 'Anti_HCV'
      ) {
        if (!isNaN(parseFloat(highValue)) && result >= highValue) {
          resultSuffix = `(${translate(POSITIVE, language)})`
        } else if (
          !isNaN(parseFloat(lowValue)) &&
          result >= lowValue &&
          !isNaN(parseFloat(highValue)) &&
          result < highValue
        ) {
          resultSuffix = `(${translate(NEGATIVE, language)})`
        } else if (!isNaN(parseFloat(lowValue)) && result < lowValue) {
          // resultSuffix = ``
        }
      } else {
        // resultSuffix = ``
      }

      let remark
      switch (subTestKey) {
        case 'Anti_Hbs':
          if (result >= highValue) {
            remark = REMARK_ARRAY.Anti_HbsImmunized
          } else if (result < highValue) {
            remark = REMARK_ARRAY.Anti_HbsNonImmunized
          }
          break

        case 'HBeAg':
          if (result >= highValue) {
            remark = REMARK_ARRAY.HBeAg
          }
          break

        case 'Anti_HCV':
          if (result < highValue) {
            remark = REMARK_ARRAY.Anti_HCVNegative
          } else if (result >= highValue) {
            remark = REMARK_ARRAY.Anti_HCVPositive
          }
          break

        case 'HBsAg_quantification':
          if (result < highValue) {
            remark = REMARK_ARRAY.HBsAg_quantificationNegative
          } else if (result >= highValue) {
            remark = REMARK_ARRAY.HBsAg_quantificationPositive
          }
          break

        case 'AFP':
          if (result >= highValue) {
            remark = REMARK_ARRAY.AFP
          }
          break

        case 'Pivka_II':
          if (result >= highValue) {
            remark = REMARK_ARRAY.Pivka_II
          }
          break

        default:
          break
      }

      const testName =
        params.testCode.include[testKey].include[subTestKey].display

      tableData.push([
        testName,
        `${result} ${resultSuffix}`,
        unit !== undefined ? unit : '',
        refRange,
      ])

      remark !== undefined && remarkData.push([remark])
    })
  })

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

  drawTestResult(tableData)

  if (remarkData.length > 0) {
    drawRemarks(remarkData)
  }

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

  function drawTestResult(dataSource) {
    const table1 = {
      headers: [
        translate(PARAMETER, language),
        translate(RESULT, language),
        translate(UNIT, language),
        translate(REFERENCE_RANGE, language),
      ],
      rows: dataSource,
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

  function drawRemarks(dataSource) {
    const table1 = {
      headers: [`${translate(REMARKS, language)}: `],
      rows: dataSource,
    }

    doc
      .moveDown(1)
      .fontSize(10)
      // .font('./fonts/Helvetica-Neue-Medium.woff')
      // .text(translate(REMARKS, language), leftAlign, doc.y)
      .font('./fonts/Helvetica-Neue.woff')
      // .moveDown(1)
      .table(table1, leftAlign * 2, doc.y, { width: 500 })
      .moveDown(5)
  }

  doc.end()
}
