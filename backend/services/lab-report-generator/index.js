const fhirService = require('@services/fhir')
const controller = require('@controller')
const LabTests = require('@constants/LabTests')
const moment = require('moment-timezone')
const fs = require('fs')
const path = require('path')
const CONFIG = require('@config')

const {
  antihdv,
  biochemistry,
  coagulation,
  ferritin,
  immunology,
  hematology,
  hcvrna,
  hbvdna,
  hdvrna,
  rapidtest,
  vitamind3,
  sarscov2igg,
  sarscov2iggelisa,
} = require('./components')

const supportedLanguages = ['en', 'mn']

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

const { bundle: Bundle } = require('@schemas')

function getLabReportData(payload) {
  const requestPayload = {
    _id: payload.diagnosticReportId,
    _include: [
      'DiagnosticReport:patient',
      'DiagnosticReport:based-on',
      'DiagnosticReport:result',
      'DiagnosticReport:performer',
      'DiagnosticReport:specimen',
    ],
    '_include:iterate': ['Observation:has-member', 'Observation:performer'],
    '_revinclude:iterate': ['ServiceRequest:based-on', 'Observation:based-on'],
  }
  // const requestPayload = {
  //   _id: payload.serviceRequestId,
  //   _include: ['ServiceRequest:patient'],
  //   _revinclude: ['DiagnosticReport:based-on'],
  //   '_include:iterate': [
  //     'DiagnosticReport:result',
  //     'DiagnosticReport:performer',
  //     'DiagnosticReport:specimen',
  //     'Observation:has-member',
  //     'Observation:performer',
  //   ],
  //   '_revinclude:iterate': ['ServiceRequest:based-on', 'Observation:based-on'],
  // }

  return fhirService
    .getResource('DiagnosticReport', requestPayload)
    .then(response => {
      const bundle = new Bundle(response.data)

      if (bundle.entry.length === 0) {
        return
      }
      console.log('hii', typeof bundle)

      const resourceArray = controller.loadResourceArray(
        bundle.getResourcesOnly()
      )
      const resourceDictionary = controller.createResourceDictionary(
        resourceArray
      )

      const diagnosticReport = resourceDictionary['DiagnosticReport'].find(
        sr => sr.id === payload.diagnosticReportId
      )

      // const mainServiceRequest = resourceDictionary['ServiceRequest'].find(
      //   sr => {
      //     controller.codeIntersects(sr.code, diagnosticReport.code) &&
      //       controller.containsReference(
      //         diagnosticReport.basedOn,
      //         sr.getReference().reference
      //       )
      //   }
      // )

      let testKey
      let testName
      let testCode

      try {
        testKey = Object.keys(RootTests).find(
          labTestKey =>
            diagnosticReport.code &&
            controller.codeIntersects(
              RootTests[labTestKey].code,
              diagnosticReport.code
            )
        )

        testCode = RootTests[testKey]
        testName = RootTests[testKey].display
      } catch (exception) {
        console.log(exception)
        return null
      }

      const testResults = controller.recursiveTestDataBuilder(
        resourceArray,
        RootTests[testKey]
      )

      const serviceRequests = resourceDictionary['ServiceRequest']

      if (
        !serviceRequests
          .map(serviceRequest => serviceRequest.subject.reference)
          .every((ref, i, refs) => ref === refs[0])
      ) {
        // faulty group
        throw new Error('service requests reference more than 1 patient')
      }

      const patient = controller.findByReference(
        resourceDictionary['Patient'],
        serviceRequests[0].subject
      )

      let verifiedPractitioner
      if (resourceDictionary['Practitioner']) {
        const performerReference = diagnosticReport.performer.find(
          performer => {
            return performer.type === 'Practitioner'
          }
        )

        verifiedPractitioner = controller.findByReference(
          resourceDictionary['Practitioner'],
          performerReference
        )
      }

      const orderedObservations = controller.sortByDate(
        resourceDictionary['Observation'].slice(),
        'issued'
      )

      let performedPractitioner
      if (resourceDictionary['Practitioner']) {
        const performerReference = orderedObservations
          .slice(-1)[0]
          .performer.find(performer => {
            return performer.type === 'Practitioner'
          })

        performedPractitioner = controller.findByReference(
          resourceDictionary['Practitioner'],
          performerReference
        )
      }

      let specimen
      if (diagnosticReport && diagnosticReport.specimen) {
        specimen = diagnosticReport.specimen.map(spRef =>
          controller.findByReference(resourceDictionary['Specimen'], spRef)
        )
      }

      const latestSpecimen = specimen && specimen[specimen.length - 1]
      const sampleCollectionTime =
        latestSpecimen &&
        latestSpecimen.collection &&
        latestSpecimen.collection.collectedDateTime

      const runCompletionTime = orderedObservations.slice(-1)[0].issued

      const verifiedTime = diagnosticReport.issued

      Object.assign(testResults, {
        diagnosticReport,
        specimen,
        sampleCollectionTime: moment
          .tz(sampleCollectionTime, CONFIG.DEFAULT_REGION)
          .format('YYYY-MM-DD HH:MM'),
        runCompletionTime: moment
          .tz(runCompletionTime, CONFIG.DEFAULT_REGION)
          .format('YYYY-MM-DD HH:MM'),
      })

      const data = {
        testKey,
        testCode,
        testName,
        ...testResults,
        diagnosticReport,
        // overwriting specimen by diagnosticReport.specimen
        patient: patient,
        verifiedPractitioner,
        performedPractitioner,
        specimen,
        sampleCollectionTime: moment
          .tz(sampleCollectionTime, CONFIG.DEFAULT_REGION)
          .format('YYYY-MM-DD HH:MM'),
        verifiedTime: moment
          .tz(verifiedTime, CONFIG.DEFAULT_REGION)
          .format('YYYY-MM-DD HH:MM'),
        runCompletionTime: moment
          .tz(runCompletionTime, CONFIG.DEFAULT_REGION)
          .format('YYYY-MM-DD HH:MM'),
      }
      // console.log('dataaaaaaaaa----------------', JSON.stringify(data))
      return data
    })
}

module.exports = function labReportGenerator({ diagnosticReportId, language }) {
  if (!supportedLanguages.includes(language)) {
    throw new Error(`language ${language} is not supported`)
  }

  return getLabReportData({
    diagnosticReportId,
  }).then(reportData => {
    Object.assign(reportData, {
      language,
    })

    return new Promise((resolve, reject) => {
      try {
        const rootDir = CONFIG.LABORATORY_REPORT_OUTPUT_DIR
        const languageDir = `${rootDir}/${language}`
        const outputPath = `${languageDir}/${reportData.diagnosticReport.id}.pdf`

        if (!fs.existsSync(rootDir)) {
          fs.mkdirSync(rootDir)
        }

        if (!fs.existsSync(languageDir)) {
          fs.mkdirSync(languageDir)
        }

        writeStream = fs.createWriteStream(outputPath)

        writeStream.on('finish', function() {
          const absolutePath = path.resolve(outputPath)
          resolve(absolutePath)
        })

        if (reportData.testKey === 'Anti_HDV') {
          return antihdv(reportData, writeStream)
        } else if (reportData.testKey === 'BiochemistryTests') {
          return biochemistry(reportData, writeStream)
        } else if (reportData.testKey === 'Coagulation') {
          return coagulation(reportData, writeStream)
        } else if (reportData.testKey === 'ImmunologyTests') {
          return immunology(reportData, writeStream)
        } else if (reportData.testKey === 'RapidTests') {
          return rapidtest(reportData, writeStream)
        } else if (reportData.testKey === 'Hematology') {
          return hematology(reportData, writeStream)
        } else if (reportData.testKey === 'Vitamin_D3') {
          return vitamind3(reportData, writeStream)
        } else if (reportData.testKey === 'Sars_Cov2_IgG') {
          return sarscov2igg(reportData, writeStream)
        } else if (reportData.testKey === 'Sars_Cov2_IgG_Elisa') {
          return sarscov2iggelisa(reportData, writeStream)
        } else if (reportData.testKey === 'Ferritin') {
          return ferritin(reportData, writeStream)
        } else if (reportData.testKey === 'HCV_RNA') {
          return hcvrna(reportData, writeStream)
        } else if (reportData.testKey === 'HBV_DNA') {
          return hbvdna(reportData, writeStream)
        } else if (reportData.testKey === 'HDV_RNA') {
          return hdvrna(reportData, writeStream)
        }
      } catch (errorInfo) {
        console.error(errorInfo)
        reject(errorInfo)
      }
    })
  })
}
