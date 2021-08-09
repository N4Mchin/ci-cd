const documentInit = require('./document')
const header = require('./header')
const patientInfo = require('./patientInfo')
const footer = require('./footer')
const helper = require('@helper')
const translate = require('./translate')
const QualitativeTestResults = require('@constants/QualitativeTestResults')
const controller = require('@controller')

const MAIN_TITLE = 'Хепатитын вирүсийн маркер илрүүлэх шинжилгээ'
const HIV_TITLE = 'ХДХВ-ийн эсрэгбие илрүүлэх  шинжилгээ'
const SYPHILLS_TITLE = 'Тэмбүүгийн илрүүлэх  шинжилгээ'

const TEST_PROTOCOL = 'М-ЭТ-010'
const SAMPLE_TYPE = 'Serum'
const ASSAY_METHOD = 'Immunochromatographic assay'
const INSTRUMENT_NAME = 'CTK, OnSite-Lateral flow rapid test'
const REMARKS = 'Remarks'
const REMARK_ARRAY = {
  HBsAg_Negative: `Танд хепатитын В вирүсийн гадаргуугийн эсрэгтөрөгч (HBsAg) илрээгүй тул дархлаа тогтсон (anti-HBs) эсэхийг шалгана уу. Хэрэв дархлаа тогтоогүй тохиолдолд В вирүсийн эсрэг вакцин хийлгэх нь зүйтэй. Ингэснээр та ХВВ болон ХДВ-ийн халдвараас 10-15 жил хамгаалагдана.`,
  HBsAg_Positive: `Танд хепатитын В вирүсийн гадаргуугийн эсрэгтөрөгч (HBsAg) илэрсэн тул мэргэжлийн эмчид хандан зөвлөгөө авах, шаардлагатай бол онош баталгаажуулах зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь зүйтэй.`,
  HBsAg_WeaklyPositive: `Танд хепатитын В вирүсийн гадаргуугийн эсрэгтөрөгч (HBsAg) илэрсэн байх магадлалтай тул дараагийн шатны баталгаажуулах шинжилгээ хийлгэж, нарийн мэргэжлийн эмчид хандах нь зүйтэй.`,
  antiHCV_Positive: `Танд Хепатитын С вирүсийн эсрэг бие (anti-HCV) илрэх нь архаг С хепатит, С хепатитаар өвдөөд аяндаа эдгэрсэн эсвэл хуурамч эерэг (C хепатитгүй ч шинжилгээний хариу эерэг байх) зэрэг тохиолдлууд байж болно.Та эмчээс зөвлөгөө авч, шаардлагатай бол онош баталгаажуулах зорилгоор нарийвчилсан шинжилгээнүүдийг хийлгэх нь зүйтэй.`,
  antiHCV_Negative: `Танд Хепатитын С вирүсийн эсрэгбие (anti-HCV) илрээгүй байна.Та халдвар авахаас сэрэмжлээрэй.`,
  antiHCV_WeaklyPositive: `Танд хепатитын С вирүсийн эсрэгбие (anti-HCV) илэрсэн байх магадлалтй тул дараагийн шатны баталгаажуулах шинжилгээ хийлгэж, нарийн мэргэжлийн эмчид хандах нь зүйтэй.`,
  HIV_Positive: `Танд Хүний Дархлал Хомсдлын вирүс (ХДХВ)-ийн эсрэгбие (anti-HIV) илэрсэн тул нарийн мэргэжлийн эмчид хандан зөвлөгөө авах нь зүйтэй.`,
  HIV_Negative: `Танд Хүний Дархлал Хомсдлын вирүс (ХДХВ)-ийн эсрэгбие (anti-HIV) илрээгүй байна. Та халдвар авахаас сэргийлээрэй.`,
}

const TEST_RESULT = 'Test result'
const PARAMETER = 'Parameter'
const RESULT = 'Result'

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

  const mainTableData = []
  const hivTableData = []
  const syphillsTableData = []

  const mainRemarks = []
  const hivRemarks = []

  Object.keys(params.include).forEach(testKey => {
    const { valueCodeableConcept, status, referenceRange } = params.include[
      testKey
    ].latestObservation
    if (status !== 'final') {
      throw new Error('Observatin must be of final status')
    }

    const resultKey = Object.keys(QualitativeTestResults).find(resultKey => {
      const qualitativeTestResult = QualitativeTestResults[resultKey]
      return controller.codeIntersects(
        qualitativeTestResult.code,
        valueCodeableConcept
      )
    })
    const valueCodeableConceptObject = QualitativeTestResults[resultKey]

    const result = translate(valueCodeableConceptObject.display, language)

    let resultPrefix
    if (resultKey === 'positive') {
      resultPrefix = '(+)'
    } else if (resultKey === 'negative') {
      resultPrefix = '(-)'
    } else if (resultKey === 'weaklyPositive') {
      resultPrefix = '(+)'
    }

    const testName = params.testCode.include[testKey].display

    if (testKey === 'HIV') {
      hivTableData.push([testName, `${resultPrefix} ${result}`])
    } else if (testKey === 'Syphills') {
      syphillsTableData.push([testName, `${resultPrefix} ${result}`])
    } else {
      mainTableData.push([testName, `${resultPrefix} ${result}`])
    }

    /* #region  REMARKS */
    switch (testKey) {
      case 'HBsAg':
        if (resultKey === 'negative') {
          mainRemarks.push([REMARK_ARRAY.HBsAg_Negative])
        } else if (resultKey === 'positive') {
          mainRemarks.push([REMARK_ARRAY.HBsAg_Positive])
        } else if (resultKey === 'weaklyPositive') {
          mainRemarks.push([REMARK_ARRAY.HBsAg_WeaklyPositive])
        }
        break
      case 'anti-HCV':
        if (resultKey === 'negative') {
          mainRemarks.push([REMARK_ARRAY.antiHCV_Negative])
        } else if (resultKey === 'positive') {
          mainRemarks.push([REMARK_ARRAY.antiHCV_Positive])
        } else if (resultKey === 'weaklyPositive')
          mainRemarks.push([REMARK_ARRAY.antiHCV_WeaklyPositive])
        break
      case 'HIV':
        if (resultKey === 'negative') {
          hivRemarks.push([REMARK_ARRAY.HIV_Negative])
        } else if (resultKey === 'positive') {
          hivRemarks.push([REMARK_ARRAY.HIV_Positive])
        }
        break

      default:
        break
    }
    /* #endregion */
  })

  const { doc, pageSettings } = documentInit(writeStream)

  const leftAlign = 30

  console.log(
    mainTableData,
    mainRemarks,
    hivTableData,
    hivRemarks,
    syphillsTableData
  )
  if (mainTableData.length > 0) {
    header({
      doc,
      pageSettings,
      title: translate(MAIN_TITLE, language),
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
    drawTestResult(mainTableData)
    if (mainRemarks.length > 0) {
      drawRemarks(mainRemarks)
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
    doc.addPage()
  }

  if (hivTableData.length > 0) {
    header({
      doc,
      pageSettings,
      title: translate(HIV_TITLE, language),
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

    drawTestResult(hivTableData)
    if (hivRemarks.length > 0) {
      drawRemarks(hivRemarks)
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

    doc.addPage()
  }

  if (syphillsTableData.length > 0) {
    header({
      doc,
      pageSettings,
      title: translate(SYPHILLS_TITLE, language),
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
    drawTestResult(syphillsTableData)
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
  }

  function drawTestResult(dataSource) {
    const table1 = {
      headers: [translate(PARAMETER, language), translate(RESULT, language)],
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
      .moveDown(1)
      .table(table1, leftAlign * 2, doc.y, { width: 500 })
      .moveDown(5)
  }

  doc.end()
}
