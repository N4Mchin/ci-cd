const BriefGeneralExamination = {
  designation: [
    {
      language: 'en',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'Brief general examination',
    },
    {
      language: 'mn',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'Үзлэгийн тэмдэглэл',
    },
  ],
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '162676008',
        display: 'Brief general examination (procedure)',
      },
    ],
  },
  include: {
    /* #region  Vital Signs Finding */
    VitalSignsFinding: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Vital signs finding (finding)',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Амин үзүүлэлт',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '118227000',
            display: 'Vital signs finding (finding)',
          },
        ],
      },
      include: {
        BloodPressure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Blood pressure (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Артерийн даралт',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '75367002',
                display: 'Blood pressure (observable entity)',
              },
            ],
          },
          component: {
            SystolicArterialPressure: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Systolic arterial pressure (observable entity)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Систолын даралт',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '72313002',
                    display: 'Systolic arterial pressure (observable entity)',
                  },
                ],
              },
            },
            DiastolicBloodPressure: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Diastolic blood pressure (observable entity)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Диастолын даралт',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '271650006',
                    display: 'Diastolic blood pressure (observable entity)',
                  },
                ],
              },
            },
          },
          valueType: 'valueCodeableConceptWithComponent',
          unit: 'мм.муб',
        },
        HeartRate: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Heart rate (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Зүрхний цохилтын тоо',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364075005',
                display: 'Heart rate (observable entity)',
              },
            ],
          },
          valueType: 'valueInteger',
          unit: 'удаа/1 мин',
        },
        RespiratoryRate: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Respiratory rate (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Амьсгалын тоо',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '86290005',
                display: 'Respiratory rate (observable entity)',
              },
            ],
          },
          valueType: 'valueInteger',
          unit: '1 минутад ... удаа',
        },
        BodyTemperature: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Body temperature (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Биеийн халуун',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '386725007',
                display: 'Body temperature (observable entity)',
              },
            ],
          },
          valueType: 'valueFloat',
          unit: '°C',
        },
        HemoglobinSaturationWithOxygen: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hemoglobin saturation with oxygen (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хүчилтөрөгчийн хангамж',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '103228002',
                display:
                  'Hemoglobin saturation with oxygen (observable entity)',
              },
            ],
          },
          valueType: 'valueFloat',
          unit: '%',
        },
      },
    },
    /* #endregion */

    /* #region  Body Mass Index */
    BodyMassIndex: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Body mass index',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Биеийн жингийн индекс',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '60621009',
            display: 'Body mass index',
          },
          {
            system: 'http://loinc.org',
            code: '39156-5',
            display: 'Body mass index (BMI) [Ratio]',
          },
        ],
      },
      unit: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'kg/m2',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'кг/м2',
          },
        ],
      },
      include: {
        BodyHeight: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Height',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Өндөр',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '8302-2',
                display: 'Body height',
              },
            ],
          },
          valueType: 'valueFloat',
          unit: {
            designation: [
              {
                language: 'en',
                use: {
                  system:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'cm',
              },
              {
                language: 'mn',
                use: {
                  system:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'см',
              },
            ],
          },
        },
        BodyWeight: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Weight',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Жин',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '29463-7',
                display: 'Body Weight',
              },
              {
                system: 'http://loinc.org',
                code: '3141-9',
                display: 'Body weight Measured',
              },
              {
                system: 'http://snomed.info/sct',
                code: '27113001',
                display: 'Body weight',
              },
              {
                system: 'http://acme.org/devices/clinical-codes',
                code: 'body-weight',
                display: 'Body Weight',
              },
            ],
          },
          valueType: 'valueFloat',
          unit: {
            designation: [
              {
                language: 'en',
                use: {
                  system:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'kg',
              },
              {
                language: 'mn',
                use: {
                  system:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'кг',
              },
            ],
          },
        },
      },
    },
    /* #endregion */

    /* #region  General Physical Finding */
    GeneralPhysicalFinding: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'General physical finding',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Ерөнхий үзлэг',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '248242009',
            display: 'General physical finding',
          },
        ],
      },
      include: {
        GeneralPhysicalPerformanceStatus: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'General physical performance status',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Биеийн ерөнхий байдал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '423690003',
                display: 'General physical performance status',
              },
            ],
          },
          include: {
            GeneralHealthGood: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'General health good',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хөнгөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '135815002',
                    display: 'General health good',
                  },
                ],
              },
            },
            GeneralHealthFair: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'General health fair',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дунд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '135817005',
                    display: 'General health fair',
                  },
                ],
              },
            },
            GeneralHealthPoor: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'General health poor',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хүнд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '135818000',
                    display: 'General health poor',
                  },
                ],
              },
            },
            GeneralHealthVeryPoor: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'General health very poor',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Маш хүнд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '135819008',
                    display: 'General health very poor',
                  },
                ],
              },
            },
            LifeThreateningSeverity: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: ' Life threatening severity',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үхлүүт',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '442452003',
                    display: ' Life threatening severity',
                  },
                ],
              },
            },
          },
          default: {
            type: 'GeneralHealthGood',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '135815002',
                  display: 'General health good',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        LevelOfConsciousness: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Level of consciousness',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ухаан санаа',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '6942003',
                display: 'Level of consciousness',
              },
            ],
          },
          include: {
            FullyConscious: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Fully conscious',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Саруул',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '271591004',
                    display: 'Fully conscious',
                  },
                ],
              },
            },
            DisturbanceOfConsciousness: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Disturbance of consciousness',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бүдгэрсэн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '3006004',
                    display: 'Disturbance of consciousness',
                  },
                ],
              },
            },
            Stupor: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Stupor',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ступор',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '89458003',
                    display: 'Stupor',
                  },
                ],
              },
            },
            CloudedConsciousness: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Clouded consciousness',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Сопор',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '40917007',
                    display: 'Clouded consciousness',
                  },
                ],
              },
            },
            Coma: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Coma',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Кома',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '371632003',
                    display: 'Coma',
                  },
                ],
              },
            },
            Other: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Other',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бусад',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '74964007',
                    display: 'Other',
                  },
                ],
              },
              other: true,
            },
          },
          default: {
            type: 'FullyConscious',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '271591004',
                  display: 'Fully conscious (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        FindingRelatedToOrientation: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding related to orientation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Орчиндоо',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '311470005',
                display: 'Finding related to orientation',
              },
            ],
          },
          include: {
            OrientedToPlace: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Oriented to place',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Харьцаатай',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '427161009',
                    display: 'Oriented to place',
                  },
                ],
              },
            },
            DisorientatedInPlace: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Disorientated in place',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Харьцаагүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '72440003',
                    display: 'Disorientated in place',
                  },
                ],
              },
            },
            Altered: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Altered',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Сул',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '18307000',
                    display: 'Altered',
                  },
                ],
              },
            },
          },
          default: {
            type: 'OrientedToPlace',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '427161009',
                  display: 'Oriented to place',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        BodyPosition: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Body position',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Байрлал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '397155001',
                display: 'Body position',
              },
            ],
          },
          include: {
            Active: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Active',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Идэвхтэй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '55561003',
                    display: 'Active',
                  },
                ],
              },
            },
            Inactive: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Inactive',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Идэвхгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '73425007',
                    display: 'Inactive',
                  },
                ],
              },
            },
            Forced: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Forced',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Албадмал',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '263760002',
                    display: 'Forced',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Active',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '55561003',
                  display: 'Active',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        ColorOfSkin: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Color of skin',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Арьс салстын өнгө',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364533002',
                display: 'Color of skin',
              },
            ],
          },
          include: {
            ColorOfSkinOrMucosa: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Color of skin or mucosa',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэвийн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '247435005',
                    display: 'Color of skin or mucosa',
                  },
                ],
              },
            },
            Abnormal: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Abnormal',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэвийн бус',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '263654008',
                    display: 'Abnormal',
                  },
                ],
              },
            },
          },
          default: {
            type: 'ColorOfSkinOrMucosa',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '247435005',
                  display: 'Color of skin or mucosa',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        SkinElasticity: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Skin elasticity',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Арьсны уян чанар',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '247433003',
                display: 'Skin elasticity',
              },
            ],
          },
          include: {
            Normal: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэвийн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '17621005',
                    display: 'Normal',
                  },
                ],
              },
            },
            Increased: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Increased',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ихэссэн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '35105006',
                    display: 'Increased',
                  },
                ],
              },
            },
            Decreased: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Decreased',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Алдагдсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '1250004',
                    display: 'Decreased',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Normal',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '17621005',
                  display: 'Normal (qualifier value)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        MoistnessOfSkin: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Moistness of skin',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Арьсны чийглэг байдал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364532007',
                display: 'Moistness of skin',
              },
            ],
          },
          include: {
            NormalMoistnessOfSkin: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal moistness of skin',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэвийн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '702756006',
                    display: 'Normal moistness of skin',
                  },
                ],
              },
            },
            MoistSkin: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Moist skin',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ихэссэн / Чийглэг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '16514006',
                    display: 'Moist skin',
                  },
                ],
              },
            },
            OnExaminationDrySkin: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - dry skin',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Багассан / Хуурай',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '164323008',
                    display: 'On examination - dry skin',
                  },
                ],
              },
            },
          },
          default: {
            type: 'NormalMoistnessOfSkin',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '702756006',
                  display: 'Normal moistness of skin',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        Rashes: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Rashes',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Арьсан дээр',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '45786-1',
                display: 'Rashes',
              },
            ],
          },
          include: {
            OnExaminationRashPresent: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - rash present',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тууралттай',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '268911002',
                    display: 'On examination - rash present',
                  },
                ],
              },
              note: true,
            },
            RashAbsent: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Rash absent',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тууралтгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '290000000',
                    display: 'Rash absent',
                  },
                ],
              },
            },
          },
          default: {
            type: 'RashAbsent',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '290000000',
                  display: 'Rash absent',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptWithNote',
        },
        Edema: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Edema',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хавангийн байдал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '267038008',
                display: 'Edema',
              },
            ],
          },
          include: {
            OnExaminationEdemaNotPresent: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - edema not present',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хавангүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '162780006',
                    display: 'On examination - edema not present',
                  },
                ],
              },
            },
            OnExaminationEdema: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - edema',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хавантай',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '268918008',
                    display: 'On examination - edema',
                  },
                ],
              },
              bodySite: {
                EntireBodyAsAWhole: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Entire body as a whole',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Ерөнхий',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '38266002',
                        display: 'Entire body as a whole',
                      },
                    ],
                  },
                },
                FaceStructure: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Face structure',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хэсгийн: Нүүрэнд',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '89545001',
                        display: 'Face structure',
                      },
                    ],
                  },
                },
                EyelidPart: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Eyelid part',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хэсгийн: Зовхинд',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '709293002',
                        display: 'Eyelid part',
                      },
                    ],
                  },
                },
                AbdominopelvicStructure: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Abdominopelvic structure',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хэсгийн: Хэвлийд',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '113345001',
                        display: 'Abdominopelvic structure',
                      },
                    ],
                  },
                },
                TibiaPart: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Tibia part (body structure)',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хэсгийн: Шилбээр',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '119191008',
                        display: 'Tibia part (body structure)',
                      },
                    ],
                  },
                },
              },
            },
          },
          default: {
            type: 'OnExaminationEdemaNotPresent',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '162780006',
                  display: 'On examination - edema not present',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 12,
          },
          valueType: 'valueCodeableConceptWithBodySite',
        },
      },
    },
    /* #endregion */

    /* #region  Physical Findings Of Gastrointestinal System */
    PhysicalFindingsOfGastrointestinalSystem: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Physical findings of Gastrointestinal system',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Хоол боловсруулах эрхтэн тогтолцоо',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '11430-6',
            display: 'Physical findings of Gastrointestinal system',
          },
        ],
      },
      include: {
        CoatingOfMucousMembraneOfTongue: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Coating of mucous membrane of tongue',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэл өнгөртэй эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '698193000',
                display: 'Coating of mucous membrane of tongue',
              },
            ],
          },
          include: {
            Present: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Present',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Өнгөртэй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '52101004',
                    display: 'Present',
                  },
                ],
              },
            },
            Absent: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Absent',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Цэвэр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '2667000',
                    display: 'Absent',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Absent',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '2667000',
                  display: 'Absent',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        AbdominalPain: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Abdominal pain',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэвлий',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '1522001',
                display: 'Abdominal pain (finding)',
              },
            ],
          },
          include: {
            Present: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Present',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмзэглэлтэй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '52101004',
                    display: 'Present',
                  },
                ],
              },
            },
            Absent: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Absent',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмзэглэлгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '2667000',
                    display: 'Absent',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Absent',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '2667000',
                  display: 'Absent',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        AbdominalSymmetry: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Abdominal symmetry',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэвлийн хэм',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Physical-exam',
                code: '20000006',
                display: 'Abdominal symmetry',
              },
            ],
          },
          include: {
            Symmetrical: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Symmetrical',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Жигд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255473004',
                    display: 'Symmetrical (qualifier value)',
                  },
                ],
              },
            },
            Asymmetry: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Asymmetry',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Жигд бус',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '4128009',
                    display: 'Asymmetry (qualifier value)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Symmetrical',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '255473004',
                  display: 'Symmetrical (qualifier value)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        AbdominalMusclesTense: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Abdominal muscles tense',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Булчингийн чангарал бий эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '249544004',
                display: 'Abdominal muscles tense (finding)',
              },
            ],
          },
          include: {
            Present: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Present',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тийм',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '52101004',
                    display: 'Present',
                  },
                ],
              },
            },
            Absent: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Absent',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '2667000',
                    display: 'Absent',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Absent',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '2667000',
                  display: 'Absent',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        FindingOfLiverGallbladderAndSpleen: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of liver, gallbladder and spleen',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Элэг, цөс, дэлүү',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Physical-exam',
                code: '20000009',
                display: 'Finding of liver, gallbladder and spleen',
              },
            ],
          },
          hasMember: {
            HepaticDiseaseSymptoms: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hepatic disease symptoms',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Элэгний шинж тэмдгүүд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000010',
                    display: 'Hepatic disease symptoms',
                  },
                ],
              },
              include: {
                Neurosis: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Neurosis',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Мэдрэл сульдал',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '111475002',
                        display: 'Neurosis (disorder)',
                      },
                    ],
                  },
                },
                Indigestion: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Indigestion',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Биж хам шинж',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '162031009',
                        display: 'Indigestion (finding)',
                      },
                    ],
                  },
                },
                ImmuneInflammatorySigns: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Immune-Inflammatory signs',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Иммуни-үрэвслийн шинж',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000011',
                        display: 'Immune-Inflammatory signs',
                      },
                    ],
                  },
                },
                Jaundice: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Jaundice',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Шарлах хам шинж',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '18165001',
                        display: 'Jaundice (finding)',
                      },
                    ],
                  },
                },
                Itching: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Itching',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Загатналт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '418290006',
                        display: 'Itching (finding)',
                      },
                    ],
                  },
                },
                HemorrhagicSyndrome: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Hemorrhagic syndrome',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Цусархаг хам шинж',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000012',
                        display: 'Hemorrhagic syndrome',
                      },
                    ],
                  },
                },
                MajorSignsOfHepaticDisease: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Major signs of hepatic disease',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Элэгний их шинж',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000013',
                        display: 'Major signs of hepatic disease',
                      },
                    ],
                  },
                },
                MinorSignsOfHepaticDisease: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Minor signs of hepatic disease',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Элэгний бага шинж',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000014',
                        display: 'Minor signs of hepatic disease',
                      },
                    ],
                  },
                },
                Pain: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Pain',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Өвдөх хам шинж',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '22253000',
                        display: 'Pain (finding)',
                      },
                    ],
                  },
                },
              },
              component: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Pain level',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Өвдөлтийн хүч',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '405161002',
                      display: 'Pain level (observable entity)',
                    },
                  ],
                },
                include: {
                  Severe: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Severe',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Маш хүчтэй',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '24484000',
                          display:
                            'Severe (severity modifier) (qualifier value)',
                        },
                      ],
                    },
                  },
                  Strong: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Strong',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Хүчтэй',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '260404005',
                          display: 'Strong (qualifier value)',
                        },
                      ],
                    },
                  },
                  Moderate: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Moderate',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Дунд зэрэг',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '6736007',
                          display:
                            'Moderate (severity modifier) (qualifier value)',
                        },
                      ],
                    },
                  },
                  Mild: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Mild',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Бага',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '255604002',
                          display: 'Mild (qualifier value)',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          default: {
            HepaticDiseaseSymptoms: {},
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'hasMemberSection',
        },
      },
    },
    /* #endregion */

    /* #region  Physical Findings Of Genitourinary Tract */
    PhysicalFindingsOfGenitourinaryTract: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Physical findings of Genitourinary tract',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Шээс бэлгийн тогтолцоо',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '8700-7',
            display: 'Physical findings of Genitourinary tract',
          },
        ],
      },
      include: {
        HourUrineOutput: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: '24 hour urine output',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хоногийн шээсний гарц',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '395060000',
                display: '24 hour urine output',
              },
            ],
          },
          include: {
            HourUrineVolumeNormal: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: '24 hour urine volume normal',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэвийн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '167370002',
                    display: '24 hour urine volume normal',
                  },
                ],
              },
            },
            IncreasedUrineOutput: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Increased urine output',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ихэссэн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '718402002',
                    display: 'Increased urine output',
                  },
                ],
              },
            },
            DecreasedUrineOutput: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Decreased urine output',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Багассан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '718403007',
                    display: 'Decreased urine output',
                  },
                ],
              },
            },
          },
          default: {
            type: 'HourUrineVolumeNormal',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '167370002',
                  display: '24 hour urine volume normal',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
      },
    },
    /* #endregion */
  },
}

module.exports = BriefGeneralExamination
