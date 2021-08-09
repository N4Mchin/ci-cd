const HistoryOfPresentIllness = {
  designation: [
    {
      language: 'en',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'History of present illness section',
    },
    {
      language: 'mn',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'Өвчний түүх',
    },
  ],
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '422625006',
        display: 'History of present illness section',
      },
    ],
  },
  include: {
    TimeOfSymptomOnset: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Time of symptom onset (observable entity)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Өвчин хэзээ эхэлсэн бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '405795006',
            display: 'Time of symptom onset (observable entity)',
          },
        ],
      },
    },
    DateOfDiagnosis: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Date of diagnosis (observable entity)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Анх хэзээ оношлогдсон бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '432213005',
            display: 'Date of diagnosis (observable entity)',
          },
        ],
      },
    },
    PlaceOfDiagnosis: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Place of diagnosis',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Анх хаана оношлогдсон бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/Anamnesis',
            code: '10000001',
            display: 'Place of diagnosis',
          },
        ],
      },
    },
    PreviouslyVisitedHospital: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Previously visited hospital',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Энд ирэхээс өмнө хаана үзүүлсэн бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/Anamnesis',
            code: '10000002',
            display: 'Previously visited hospital',
          },
        ],
      },
    },
    PreviouslyMadeTest: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Previously made test',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Ямар шинжилгээ хийлгэсэн бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/Anamnesis',
            code: '10000003',
            display: 'Previously made test',
          },
        ],
      },
    },
    TreatmentGiven: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Treatment given (situation)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Ямар эмчилгээ хийлгэсэн бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '182991002',
            display: 'Treatment given (situation)',
          },
        ],
      },
      include: {
        AdministrationOfDrugOrMedicament: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Administration of drug or medicament (procedure)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эмийн эмчилгээ',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '18629005',
                display: 'Administration of drug or medicament (procedure)',
              },
            ],
          },
        },
        NonPharmacologicalTreatment: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Non-pharmacological treatment',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эмийн бус эмчилгээ',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '10000003',
                display: 'Non-pharmacological treatment',
              },
            ],
          },
        },
        NoTreatmentReceived: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'No treatment received',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эмчилгээ хйилгээгүй',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '10000004',
                display: 'No treatment received',
              },
            ],
          },
        },
      },
    },
    ResponseToTreatment: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Response to treatment (situation)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Эмчилгээний үр дүн ямар байсан бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '182985004',
            display: 'Response to treatment (situation)',
          },
        ],
      },
    },
    NatureOfDisease: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Nature of disease (attribute)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Эмнэлэгт ирэх хүртэл өвчний явц ямар байсан бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '246430007',
            display: 'Nature of disease (attribute)',
          },
        ],
      },
    },
    InitialPresentation: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Initial presentation (attribute)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Анх ямар зовууриар илэрсэн бэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '260916006',
            display: 'Initial presentation (attribute)',
          },
        ],
      },
    },
    NumberOfRecurrencePerYear: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Number of recurrence per year',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Жилд хэдэн удаа сэдэрдэг вэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/Anamnesis',
            code: '10000005',
            display: 'Number of recurrence per year',
          },
        ],
      },
    },
    SuspectedReasonOfRecurrence: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Suspected reason of recurrence',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Өвчний сэдрэлийг юутай холбоотой гэж боддог вэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/Anamnesis',
            code: '10000006',
            display: 'Suspected reason of recurrence',
          },
        ],
      },
    },
    PreventiveProcedureIntent: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Preventive - procedure intent (qualifier value)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Сэдрэлээс урьдчилан сэргийлэх ямар арга хэмжээ авдаг вэ?',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '129428001',
            display: 'Preventive - procedure intent (qualifier value)',
          },
        ],
      },
    },
  },
}

module.exports = HistoryOfPresentIllness
