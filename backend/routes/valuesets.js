const express = require('express')
const bodyParser = require('body-parser')

const Interpretations = require('@constants/Interpretations')
const Identifiers = require('@constants/Identifiers')
const Observations = require('@constants/Observations')
const Categories = require('@constants/Categories')
const SpecimenConditions = require('@constants/SpecimenConditions')
const ImmunologyTests = require('@constants/LabTests/Immunology')
const BiochemistryTests = require('@constants/LabTests/Biochemistry')
const UncategorizedTests = require('@constants/LabTests/Uncategorized')

const Problems = require('@constants/Practitioner/Problems')
const TestNames = require('@constants/Practitioner/TestNames')
const BodySites = require('@constants/Practitioner/BodySites')
const HealthCareProviders = require('@constants/HealthCareProviders')
const AnamnesisVitae = require('@constants/Practitioner/AnamnesisVitae')
const BriefGeneralExamination = require('@constants/Practitioner/BriefGeneralExamination')
const HistoryOfPresentIllness = require('@constants/Practitioner/HistoryOfPresentIllness')
const PhysicalExaminationComplete = require('@constants/Practitioner/PhysicalExaminationComplete')
const MedicationDosageInstruction = require('@constants/Practitioner/MedicationDosageInstruction')
const QualitativeTestResults = require('@constants/QualitativeTestResults')
const UnitsOfMeasure = require('@constants/UnitsOfMeasure')

const axios = require('axios')
const config = require('./../config')

const ValuesetsModel = require('./../models/valueset')

const router = new express.Router()
router.use(bodyParser.json())

const getValueset = async id => {
  let axiosConfig = {
    baseURL: `${config.fhirServer}`,
    headers: {
      'Content-Type': 'application/fhir+json',
      Accept: 'application/fhir+json',
    },
    method: 'Get',
    url: `/api/Valueset/${id}`,
  }

  try {
    return await axios(axiosConfig)
  } catch (err) {
    console.error(error)
    return error
  }
}

const fetchOne = async id => {
  try {
    const result = await getValueset(id)
    return result.data
  } catch (err) {
    return {}
  }
}

router.post('/valuesets', (req, res) => {
  const { valuesetList } = req.body

  // console.log('valuesetList', valuesetList)
  const localValuesets = [
    'address-values-mn',
    'country-values-mn',
    'race-values',
    'occupation-values',
    'employment-status-values',
    'disability-values',
    'work-environment-values',
    'education-values',
    'accommodation-values',
    'general-health-values',
    'dietary-finding-values',
    'blood-type-values',
    'rhesus-factor-values',
    'marital-status',
  ]
  // "FHIR_CODES"

  const promises = []

  valuesetList &&
    valuesetList.map(value => {
      if (localValuesets.includes(value)) {
        promises.push(
          ValuesetsModel.findOne({
            id: value,
          })
        )
      } else {
        if (value !== 'FHIR_CODES' && value !== 'fhir-codes') {
          promises.push(fetchOne(value))
        }
      }
    })

  Promise.all(promises)
    .then(result => {
      const data = [...result, FHIR_CODES]
      console.log()
      return res.status(200).json({
        success: true,
        data: data,
      })
    })
    .catch(err => {
      return res.status(200).json({
        success: false,
        error: err,
      })
    })
})

module.exports = router

const FHIR_CODES = {
  id: 'fhir-codes',
  SNOMED_URL: 'http://snomed.info/sct',
  ICD9_URL: 'http://livercenter.mn/fhir/sid/icd-9',
  LOINC_URL: 'http://loinc.org',
  LIVER_CENTER_URL: 'http://livercenter.mn/fhir',
  UNITS_OF_MEASURE: 'http://unitsofmeasure.org',
  AllergyIntolerance: {
    ClinicalStatus: {
      ClinicalStatusActive: {
        coding: [
          {
            code: 'active',
            system:
              'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
            display: 'Active',
          },
        ],
        text: 'Active',
      },
    },
    VerificationStatus: {
      VerificationStatusConfirmed: {
        coding: [
          {
            system:
              'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
            code: 'confirmed',
            display: 'Confirmed',
          },
        ],
        text: 'Confirmed',
      },
    },
  },
  CodeSystems: {
    DataAbsentReason:
      'http://terminology.hl7.org/CodeSystem/data-absent-reason',

    NationCodeOfCitizenship: {
      system: 'urn:iso:std:iso:3166',
    },
  },
  Encounters: {
    Classes: {
      Ambulatory: {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
        code: 'AMB',
        display: 'ambulatory',
      },
    },
    DiagnosisUses: {
      AdmissionDiagnosis: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
            code: 'AD',
            display: 'Admission diagnosis',
          },
        ],
        text: 'Admission Diagnosis',
      },
      ComorbidityDiagnosis: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
            code: 'CM',
            display: 'Comorbidity diagnosis',
          },
        ],
        text: 'Comorbidity Diagnosis',
      },
    },
  },
  Categories: Categories,
  DiagnosticReportCategories: {
    LAB: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
          code: 'LAB',
          display: 'Laboratory',
        },
      ],
      text: 'Laboratory',
    },
  },
  Lists: {
    LabTestOrderList: {
      coding: [
        {
          system: 'http://livercenter.mn/fhir/ValueSet',
          code: 'lab-test-order-list',
        },
      ],
      text: 'lab-test-order-list',
    },
    PatientInformationList: {
      coding: [
        {
          system: 'http://livercenter.mn/fhir/ValueSet',
          code: 'patient-information-list',
        },
      ],
      text: 'patient-information-list',
    },
    ProblemList: {
      coding: [
        {
          system:
            'http://terminology.hl7.org/CodeSystem/list-example-use-codes',
          code: 'problems',
          display: 'Problem List',
        },
      ],
      text: 'Problem List',
    },
    BriefHistoryOfPatient: {
      coding: [
        {
          system:
            'http://livercenter.mn/fhir/Anamnesis/brief-history-of-patient',
          code: '10000008',
          display: 'Brief History Of Patient',
        },
      ],
      text: 'Brief History Of Patient',
    },
    ReproductiveHistoryOfFemale: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '62672-1',
          display: 'PhenX - reproductive history - fale protocol 101301',
        },
      ],
      text: 'Reproductive History Of Females',
    },
    ReproductiveHistoryOfMale: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '63071-5',
          display: 'PhenX - reproductive history - male protocol 101302',
        },
      ],
      text: 'Reproductive History Of Males',
    },
    HistoryOfClinicalFinding: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '417662000',
          display: 'History of clinical finding in subject (situation)',
        },
      ],
      text: 'History Of Clinical Finding',
    },
    HistoryOfInfectiousDisease: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '161413004',
          display: 'History of infectious disease (situation)',
        },
      ],
      text: 'History Of Infectious Disease',
    },
    ChronicDisease: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '27624003',
          display: 'Chronic disease (disorder)',
        },
      ],
      text: 'Chronic Disease',
    },
    AccidentalEvent: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '418019003',
          display: 'Accidental event (event)',
        },
      ],
      text: 'Accidental Event',
    },
    EpidemiologicalAnamnesis: {
      coding: [
        {
          system:
            'http://livercenter.mn/fhir/Anamnesis/epidemiological-anamnesis',
          code: '10000013',
          display: 'Epidemiological Anamnesis',
        },
      ],
      text: 'Epidemiological Anamnesis',
    },
    SmokingDrinkingSubstanceAbuseHabitsAnamnesis: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '108333003',
          display: 'Smoking/drinking/substance abuse habits',
        },
      ],
      text: 'Smoking/drinking/substance abuse habits',
    },
  },
  Identifiers: Identifiers,
  Interpretations: Interpretations,
  LiverCenterReference: {
    reference: 'Organization/organization001',
  },

  SpecimenConditions: SpecimenConditions,
  Observations: Observations,
  Specimens: {
    Conditions: {
      // SampleNormal: {},
      SampleHemolyzed: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '118128002',
            display: 'Sample hemolyzed',
          },
        ],
        text: 'Sample hemolyzed',
      },
      SampleMilky: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '263811001',
            display: 'Milky',
          },
        ],
        text: 'Milky',
      },
      SampleLeaked: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '281263003',
            display: 'Sample Leaked',
          },
        ],
        text: 'Sample Leaked',
      },
      // SampleAmountInsufficient: {},
      SampleInadequate: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '71978007',
            display: 'Sample Inadequate',
          },
        ],
        text: 'Sample Inadequate',
      },
      Other: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '74964007',
            display: 'Other',
          },
        ],
        text: 'Other',
      },
    },
  },
  Extensions: {
    Subdistrict: {
      url:
        'http://fhir.mn/StructureDefinition/mng-address-subdistrict-extension',
    },
    ClanName: {
      url:
        'http://fhir.mn/StructureDefinition/mng-human-name-clan-name-extension',
    },
    FamilyInitials: {
      url:
        'http://fhir.mn/StructureDefinition/mng-human-name-family-initials-extension',
    },
    Ethnicity: {
      url: 'http://livercenter.mn/fhir/StructureDefinition/mn-core-ethnicity',
      extension: [
        {
          url: 'ethnicity',
        },
      ],
    },
    ObservationReplaces: {
      url: 'http://hl7.org/fhir/StructureDefinition/observation-replaces',
    },
    Citizenship: {
      extension: [
        {
          url: 'code',
        },
      ],
      url: 'http://hl7.org/fhir/StructureDefinition/patient-citizenship',
    },
    ConditionDueToExtension: {
      url: 'http://hl7.org/fhir/StructureDefinition/condition-dueTo',
    },
    BirthPlace: {
      url:
        'http://fhir.mn/StructureDefinition/mng-address-birthplace-extension',
    },
  },
  Profiles: {
    VitalSigns: {
      url: 'http://hl7.org/fhir/StructureDefinition/vitalsigns',
    },
  },
  Phlebotomy: {
    PhlebotomyServiceRequest: {
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '396540005',
            display: 'Phlebotomy (procedure)',
          },
        ],
        text: 'Phlebotomy (procedure)',
      },
    },
  },
  ConditionStatuses: {
    VerificationStatusUnconfirmed: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
          code: 'unconfirmed',
        },
      ],
    },
    ClinicalStatusActive: {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
          code: 'active',
        },
      ],
    },
  },
  Conditions: {
    Disability: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '21134002',
          display: 'Disability',
        },
      ],
      text: 'Disability',
    },
    MentalDisorder: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '74732009',
          display: 'Mental disorder',
        },
      ],
      text: 'Mental disorder',
    },
    SpeechAndLanguageDisorder: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '231543005',
          display: 'Speech and language disorder',
        },
      ],
    },
    HearingLoss: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '15188001',
          display: 'Hearing loss',
        },
      ],
    },
    VisualImpairment: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '397540003',
          display: 'Visual impairment',
        },
      ],
    },
    DisabilityOfUpperLimb: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '429536005',
          display: 'Disability of upper limb',
        },
      ],
    },
    DisabilityOfLowerLimb: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '428616007',
          display: 'Disability of lower limb',
        },
      ],
    },
  },
  MedicationRequest: {
    Dosage: {
      doseAndRate: {
        unit: 'piece',
        system: 'http://snomed.info/sct',
        code: '246205007',
      },
    },
  },
  ImmunologyTests: ImmunologyTests,
  BiochemistryTests: BiochemistryTests,
  UncategorizedTests: UncategorizedTests,
  DiagnosticStudy: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Diagnostic study',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Багажын шинжилгээ',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '103693007',
          display: 'Diagnostic study',
        },
      ],
      text: 'Diagnostic study',
    },
    include: {
      Ultrasound: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Ultrasound',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хэвлийн хэт авиан шинжилгээ',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '45036003',
              display: 'Ultrasound',
            },
          ],
          text: 'Ultrasound',
        },
      },
      ComputerTomography: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Computer tomography',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Компьютер томографи',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '77477000',
              display: 'Computer tomography',
            },
          ],
          text: 'Computer tomography',
        },
      },
      MRI: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'MRI',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Соронзон резонанст томографи',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '113091000',
              display: 'MRI',
            },
          ],
          text: 'MRI',
        },
      },
      EndoscopyOfStomach: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Endoscopy of stomach',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Уян дуран',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '386831001',
              display: 'Endoscopy of stomach',
            },
          ],
          text: 'Endoscopy of stomach',
        },
      },
      LiverBiopsy: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Liver biopsy',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Элэгний биопси',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '86259008',
              display: 'Liver biopsy',
            },
          ],
          text: 'Liver biopsy',
        },
      },
      ECG: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'ECG',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Зүрхний цахилгаан бичлэг.',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '46825001',
              display: 'ECG',
            },
          ],
          text: 'ECG',
        },
      },
      Fibroscan: {
        display: 'Fibroscan',
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Fibroscan',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Фиброскан',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '770585004',
              display: 'Liver transient elastography fibrosis score',
            },
          ],
          text: 'Liver transient elastography fibrosis score',
        },
      },
    },
  },
  Urianalysis: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Urianalysis',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шээсний шинжилгээ',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '27171005',
          display: 'Urianalysis',
        },
      ],
      text: 'Urianalysis',
    },
    include: {
      UBG: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'UBG',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Уробилиноген',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '67410005',
              display: 'UBG',
            },
          ],
          text: 'UBG',
        },
      },
      BIL: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'BIL',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Билирубин',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '359992002',
              display: 'BIL',
            },
          ],
          text: 'BIL',
        },
      },
      KET: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'KET',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Кетон',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '113091000',
              display: 'KET',
            },
          ],
          text: 'KET',
        },
      },
      CRE: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'CRE',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Креатинин',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '271260009',
              display: 'CRE',
            },
          ],
          text: 'CRE',
        },
      },
      RBC: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'RBC',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Эритроцит',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '33051-4',
              display: 'RBC',
            },
          ],
          text: 'RBC',
        },
      },
      PRO: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'PRO',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Уураг',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '57378007',
              display: 'PRO',
            },
          ],
          text: 'PRO',
        },
      },
      MALB: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'MALB',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Микроальбумин',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '46716003',
              display: 'MALB',
            },
          ],
          text: 'MALB',
        },
      },
      NIT: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'NIT',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Нитрит',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '167585009',
              display: 'NIT',
            },
          ],
          text: 'NIT',
        },
      },
      LEU: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'LEU',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Лейкоцит',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '394711007',
              display: 'LEU',
            },
          ],
          text: 'LEU',
        },
      },
      GLU: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'GLU',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Глюкоз',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '30994003',
              display: 'GLU',
            },
          ],
          text: 'GLU',
        },
      },
      SG: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'SG',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хувийн жин',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '20501000',
              display: 'SG',
            },
          ],
          text: 'SG',
        },
      },
      PH: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'PH',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'рН',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '167305006',
              display: 'PH',
            },
          ],
          text: 'PH',
        },
      },
      VC: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'VC',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Витамин С',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '313668003',
              display: 'VC',
            },
          ],
          text: 'VC',
        },
      },
      CА: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'CА',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Кальци',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '73668004',
              display: 'CА',
            },
          ],
          text: 'CА',
        },
      },
    },
  },
  Genotype: {
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Genotype',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Генотип',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '363779003',
          display: 'Genotype',
        },
      ],
      text: 'Genotype',
    },
    include: {
      HCVGenotype: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'HCV - Genotype',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хепатит С вирусын генотип',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '397662006',
              display: 'HCV - Genotype',
            },
          ],
          text: 'HCV - Genotype',
        },
      },
      HBVGenotype: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'HBV - Genotype',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хепатит В вирусын генотип',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '32366-7',
              display: 'HBV - Genotype',
            },
          ],
          text: 'HBV - Genotype',
        },
      },
      HDVGenotype: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'HDV - Genotype',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хепатит Д вирусын генотип',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '72606-7',
              display: 'HDV - Genotype',
            },
          ],
          text: 'HDV - Genotype',
        },
      },
    },
  },
  Fibroscan: {
    display: 'Fibroscan',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fibroscan',
      },
      {
        language: 'mn',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Фиброскан',
      },
    ],
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '448764002',
          display: 'Fibroscan',
        },
      ],
      text: 'Fibroscan',
    },
    include: {
      Fibrometer: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Fibrometer',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Фиброметр',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '77616-1',
              display: 'Fibrometer',
            },
          ],
          text: 'Fibrometer',
        },
      },
      Fibroscan: {
        display: 'Fibroscan',
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Fibroscan',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Фиброскан',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '770585004',
              display: 'Fibroscan',
            },
          ],
          text: 'Fibroscan',
        },
      },
    },
  },
  PhysiciansExamination: {
    name: "Physician's examination",
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '11429006',
          display: 'Consultation',
        },
      ],
      text: 'Consultation',
    },
    include: {
      NewPatientConsultation: {
        display: 'New patient consultation',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '185387006',
              display: 'New patient consultation',
            },
          ],
          text: 'New patient consultation',
        },
        cost: 30000,
      },
      ConfirmatoryMedicalConsultation: {
        display: 'Confirmatory medical consultation',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '77406008',
              display: 'Confirmatory medical consultation',
            },
          ],
          text: 'Confirmatory medical consultation',
        },
        cost: 15000,
      },
      FollowUpConsultation: {
        name: 'Follow-up consultation',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '281036007',
              display: 'Follow-up consultation',
            },
          ],
          text: 'Follow-up consultation',
        },
        cost: 15000,
      },
      // Давтан үзлэг
      // Элэг бүтэн Монгол
    },
  },
  Appointments: {
    ParicipantType: {
      Consultant: {
        coding: [
          {
            system:
              'http://terminology.hl7.org/CodeSystem/v3-ParticipationType',
            code: 'CON',
            display: 'consultant',
          },
        ],
      },
    },
    ParticipantRequired: {
      Required: 'required',
      Optional: 'optional',
      InformationOnly: 'information-only',
    },
    ParticipationStatus: {
      Accepted: 'accepted',
      Declined: 'declined',
      Tentative: 'tentative',
      NeedsAction: 'needs-action',
    },
  },
  Checkup: {
    NewPatientConsultation: {
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '185387006',
            display: 'New patient consultation',
          },
        ],
        text: 'New patient consultation',
      },
      cost: 30000,
      appointmentType: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
            code: 'WALKIN',
            display: 'A previously unscheduled walk-in visit',
          },
        ],
      },
    },
    FollowUpConsultation: {
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '281036007',
            display: 'Follow-up consultation',
          },
        ],
        text: 'Follow-up consultation',
      },
      cost: 15000,
      appointmentType: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
            code: 'FOLLOWUP',
            display: 'A follow up visit from a previous appointment',
          },
        ],
      },
    },
    HepatitisPreventionControlEliminationProgram: {
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/CodeSystem',
            code: '30000010',
            display: 'Hepatitis Prevention, Control, and Elimination Program',
          },
        ],
        text: 'Hepatitis Prevention, Control, and Elimination Program',
      },
      cost: 0,
      appointmentType: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
            code: 'ROUTINE',
            display: 'Routine appointment - default if not valued',
          },
        ],
      },
    },
    MonitoringConsultation: {
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/CodeSystem',
            code: '30000009',
            display: 'Monitoring consultation',
          },
        ],
        text: 'Monitoring consultation',
      },
      cost: 0,
      appointmentType: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0276',
            code: 'CHECKUP',
            display: 'A routine check-up, such as an annual physical',
          },
        ],
      },
    },
  },
  DiagnosticTests: {
    name: 'DiagnosticTests',
    display: 'Diagnostic Tests',
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '363691001',
          display: 'Procedure categorized by device involved',
        },
      ],
      text: 'Procedure categorized by device involved',
    },
    include: {
      Fibroscan: {
        display: 'Fibroscan',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '441491005',
              display: 'Ultrasound elastography of liver',
            },
          ],
          text: 'Ultrasound elastography of liver',
        },
        cost: 60000,
      },
      Ultrasound: {
        display: 'Ultrasound',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '16310003',
              display: 'Diagnostic ultrasonography',
            },
          ],
          text: 'Diagnostic ultrasonography',
        },
        cost: 30000,
      },
      ECG: {
        display: 'ECG',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '29303009',
              display: 'Electrocardiographic procedure',
            },
          ],
          text: 'Electrocardiographic procedure',
        },
        cost: 15000,
      },
      LiverBiopsy: {
        display: 'Liver Biopsy',
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '438300009',
              display: 'Biopsy of liver using ultrasound guidance',
            },
          ],
          text: 'Biopsy of liver using ultrasound guidance',
        },
        cost: 0,
      },
    },
  },
  Payment: {
    name: 'Төлбөр',
    code: {
      coding: [
        {
          system: 'http://snomed.info/sct',
          code: '308590000',
          display: 'Payment for service procedure',
        },
      ],
      text: 'Payment for service procedure',
    },
    cost: 0,
  },

  /* #region  practitioner */
  Problems,
  BodySites,
  TestNames,
  AnamnesisVitae,
  BriefGeneralExamination,
  HistoryOfPresentIllness,
  PhysicalExaminationComplete,
  MedicationDosageInstruction,
  /* #endregion */
  UnitsOfMeasure,
  HealthCareProviders,

  QualitativeTestResults,
}
