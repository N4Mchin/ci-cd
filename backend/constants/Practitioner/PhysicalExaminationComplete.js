const PhysicalExaminationComplete = {
  designation: [
    {
      language: 'en',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'Physical examination, complete',
    },
    {
      language: 'mn',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'Үзлэгийн дэлгэрэнгүй тэмдэглэл',
    },
  ],
  code: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '25656009',
        display: 'Physical examination, complete (procedure)',
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
          unit: 'удаа / 1 мин',
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

    // олон сонгож болдог хэсгийн өгөгдлийн төрлийн
    // valueCodeableConcepts
    // ганцыг сонгож болдог асуултыг
    // valueCodeableConcept гэж бичсэн байгаа.
    // олон Observation үүсэх үү, үгүй юу гэдгээрээ ялгаатай

    // Object ийн element дотор codeableConcept
    // давхардаж орсон гэдгийн анзаарана уу

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
                  value: 'Life threatening severity',
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
                    display: 'Life threatening severity',
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
                display: 'Level of consciousness (observable entity)',
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
                    display: 'Fully conscious (finding)',
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
                    display: 'Disturbance of consciousness (finding)',
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
                    display: 'Stupor (finding)',
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
                    display: 'Clouded consciousness (finding)',
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
                    display: 'Coma (disorder)',
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
                display: 'Body position (observable entity)',
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
                display: 'Color of skin (observable entity)',
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
              abnormal: true,
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
                display: 'Skin elasticity (observable entity)',
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
                    display: 'Normal (qualifier value)',
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
                    display: 'Increased (qualifier value)',
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
                    display: 'Decreased (qualifier value)',
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
                display: 'Moistness of skin (observable entity)',
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
              value: 'Арьсан дээрх тууралт',
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
        LymphoidNodule: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Lymphoid nodule',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Захын тунгалгийн булчирхай',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '64626006',
                display: 'Lymphoid nodule (body structure)',
              },
            ],
          },
          component: {
            Size: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Size',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэмжээ',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '246115007',
                    display: 'Size (attribute)',
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
                        display: 'Normal (qualifier value)',
                      },
                    ],
                  },
                },
                LocalizedEnlargedLymphNodes: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Localized enlarged lymph nodes',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Харахад томорсон',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '274744005',
                        display: 'Localized enlarged lymph nodes (disorder)',
                      },
                    ],
                  },
                },
                Tactile: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Tactile',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Тэмтрэлтээр томорсон',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '52962008',
                        display: 'Tactile (qualifier value)',
                      },
                    ],
                  },
                },
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
                  value: 'Pain / sensation finding',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмзэглэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '276435006',
                    display: 'Pain / sensation finding (finding)',
                  },
                ],
              },
              include: {
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
                      value: 'Эмзэглэлтэй',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '22253000',
                        display: 'Pain',
                      },
                    ],
                  },
                },
                Painless: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Painless',
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
                        code: '255350008',
                        display: 'Painless',
                      },
                    ],
                  },
                },
              },
              default: {
                type: 'Painless',
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '255350008',
                      display: 'Painless',
                    },
                  ],
                },
              },
            },
          },
          bodySite: {
            designation: [
              {
                language: 'en',
                use: {
                  system:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Location',
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
            include: {
              CervicalLymphNodeStructure: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Cervical lymph node structure (body structure)',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Хүзүүний',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '81105003',
                      display: 'Cervical lymph node structure (body structure)',
                    },
                  ],
                },
              },
              AxillaryLymphNodeStructure: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Axillary lymph node structure',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Суганы',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '68171009',
                      display: 'Axillary lymph node structure (body structure)',
                    },
                  ],
                },
              },
              InguinalLymphNodeStructure: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Inguinal lymph node structure',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Цавины',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '8928004',
                      display: 'Inguinal lymph node structure (body structure)',
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
          },
          default: {
            Size: {
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
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'componentWithBodySite',
        },
        JointObservable: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Joint observable (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Үе мөч',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364562001',
                display: 'Joint observable (observable entity)',
              },
            ],
          },
          component: {
            JointAngulationUpper: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Joint angulation (upper)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үе мөчний хэлбэр (дээд хэсэг)',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000022',
                    display: 'Joint angulation (upper)',
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
                      value: 'Normal joint shape (finding)',
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
                        code: '298148001',
                        display: 'Normal joint shape (finding)',
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
                      value: 'Abnormal shape (qualifier value)',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Өөрчлөгдсөн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '20967005',
                        display: 'Abnormal shape (qualifier value)',
                      },
                    ],
                  },
                  abnormal: true,
                },
              },
            },
            JointAngulationBottom: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Joint angulation (bottom)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үе мөчний хэлбэр (доод хэсэг)',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000023',
                    display: 'Joint angulation (bottom)',
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
                      value: 'Normal joint shape (finding)',
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
                        code: '298148001',
                        display: 'Normal joint shape (finding)',
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
                      value: 'Abnormal shape (qualifier value)',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Өөрчлөгдсөн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '20967005',
                        display: 'Abnormal shape (qualifier value)',
                      },
                    ],
                  },
                  abnormal: true,
                },
              },
            },
            RangeOfJointUpperMovement: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Range of joint movement (upper)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үений хөдөлгөөн (дээд хэсэг)',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000024',
                    display: 'Range of joint movement (upper)',
                  },
                ],
              },
              include: {
                ActiveRangeOfJointMovement: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Active range of joint movement reduced (finding)',
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
                        code: '786071002',
                        display:
                          'Active range of joint movement reduced (finding)',
                      },
                    ],
                  },
                },
                ActiveRangeOfJointMovementReduced: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Active range of joint movement reduced (finding)',
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
                        code: '298222004',
                        display:
                          'Active range of joint movement reduced (finding)',
                      },
                    ],
                  },
                },
                LimitationOfJointMovement: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Limitation of joint movement (finding)',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хязгаарлагдмал',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '70733008',
                        display: 'Limitation of joint movement (finding)',
                      },
                    ],
                  },
                },
              },
            },
            RangeOfJointBottomMovement: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Range of joint movement (bottom)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үений хөдөлгөөн (доод хэсэг)',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000025',
                    display: 'Range of joint movement (bottom)',
                  },
                ],
              },
              include: {
                ActiveRangeOfJointMovement: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Active range of joint movement reduced (finding)',
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
                        code: '786071002',
                        display:
                          'Active range of joint movement reduced (finding)',
                      },
                    ],
                  },
                },
                ActiveRangeOfJointMovementReduced: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Active range of joint movement reduced (finding)',
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
                        code: '298222004',
                        display:
                          'Active range of joint movement reduced (finding)',
                      },
                    ],
                  },
                },
                LimitationOfJointMovement: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Limitation of joint movement (finding)',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хязгаарлагдмал',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '70733008',
                        display: 'Limitation of joint movement (finding)',
                      },
                    ],
                  },
                },
              },
            },
          },
          default: {
            JointAngulationUpper: {
              type: 'Normal',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '298148001',
                    display: 'Normal joint shape (finding)',
                  },
                ],
              },
            },
            JointAngulationBottom: {
              type: 'Normal',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '298148001',
                    display: 'Normal joint shape (finding)',
                  },
                ],
              },
            },
            RangeOfJointUpperMovement: {
              type: 'ActiveRangeOfJointMovement',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '786071002',
                    display: 'Active range of joint movement reduced (finding)',
                  },
                ],
              },
            },
            RangeOfJointBottomMovement: {
              type: 'ActiveRangeOfJointMovement',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '786071002',
                    display: 'Active range of joint movement reduced (finding)',
                  },
                ],
              },
            },
          },
          fieldStyle: {
            spanSize: 12,
          },
          valueType: 'componentSection',
        },
      },
    },
    /* #endregion */

    /* #region  Physical Finding Of Respiratiry System */
    PhysicalFindingsOfRespiratorySystem: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Physical findings of Respiratory system',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Амьсгалын эрхтэн тогтолцоо',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '11443-9',
            display: 'Physical findings of Respiratory system',
          },
        ],
      },
      include: {
        NasalAirFlow: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Nasal air flow',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хамрын амьсгал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '251362004',
                display: 'Nasal air flow (observable entity)',
              },
            ],
          },
          include: {
            Clear: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Clear',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Чөлөөтэй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '263707001',
                    display: 'Clear',
                  },
                ],
              },
            },
            Obstructed: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Obstructed',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Саадтай',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '263821009',
                    display: 'Obstructed',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Clear',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '263707001',
                  display: 'Clear',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        Cyanosis: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Cyanosis',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хөхрөлт байгаа эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '3415004',
                display: 'Cyanosis',
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
              component: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Cyanosis',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Байгаа бол',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '3415004',
                      display: 'Cyanosis',
                    },
                  ],
                },
                include: {
                  OnExaminationCentralCyanosis: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'On examination - central cyanosis',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Төвийн',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '162742005',
                          display: 'On examination - central cyanosis',
                        },
                      ],
                    },
                  },
                  OnExaminationPeripheralCyanosis: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'On examination - peripheral cyanosis',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Захын',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '162744006',
                          display: 'On examination - peripheral cyanosis',
                        },
                      ],
                    },
                  },
                },
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
            spanSize: 13,
          },
          valueType: 'valueCodeableConceptSectionWithComponent',
        },
        AccessoryMuscleRespiratoryMovementFunction: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Accessory muscle respiratory movement, function',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Амьсгалд туслах булчингууд оролцож байгаа эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '73898009',
                display: 'Accessory muscle respiratory movement, function',
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
        RespiratoryRhythmFinding: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Respiratory rhythm finding',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Амьсгалын хэм',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '366144002',
                display: 'Respiratory rhythm finding',
              },
            ],
          },
          include: {
            NormalRespiratoryRhythm: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal respiratory rhythm',
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
                    code: '5467003',
                    display: 'Normal respiratory rhythm',
                  },
                ],
              },
            },
            AbnormalRespiratoryRhythm: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Abnormal respiratory rhythm',
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
                    code: '85617008',
                    display: 'Abnormal respiratory rhythm',
                  },
                ],
              },
            },
          },
          default: {
            type: 'NormalRespiratoryRhythm',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '5467003',
                  display: 'Normal respiratory rhythm',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        FindingOfFormOfThorax: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of form of thorax',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Цээжний хэлбэр',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '366457002',
                display: 'Finding of form of thorax',
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
                  value: 'Зөв',
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
                  value: 'Эмгэг',
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
              abnormal: true,
            },
          },
          default: {
            type: 'Normal',
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
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        FindingOfMethodOfBreathing: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of method of breathing',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Амьсгалын хэлбэр',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '366140006',
                display: 'Finding of method of breathing',
              },
            ],
          },
          include: {
            ThoracicBreathing: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Thoracic breathing',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Цээжний',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '4665007',
                    display: 'Thoracic breathing',
                  },
                ],
              },
            },
            DiaphragmaticBreathing: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Diaphragmatic breathing',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэвлийн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '57591009',
                    display: 'Diaphragmatic breathing',
                  },
                ],
              },
            },
            Mixed: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Mixed (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Холимог',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '26242008',
                    display: 'Mixed (qualifier value)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'ThoracicBreathing',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '4665007',
                  display: 'Thoracic breathing',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        OnExaminationChestExpansion: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'On examination - chest expansion',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Цээжний 2 тал амьсгалд жигд оролцох байдал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '162902007',
                display: 'On examination - chest expansion',
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
                    display: 'Symmetrical',
                  },
                ],
              },
            },
            RightSideDominant: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Right side dominant',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Баруун давамгайлсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000002',
                    display: 'Right side dominant',
                  },
                ],
              },
            },
            LeftSideDominant: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Left side dominant',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Зүүн давамгайлсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000003',
                    display: 'Left side dominant',
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
                  display: 'Symmetrical',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        ThoracicStructure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Thoracic structure (body structure)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Цээж',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '51185008',
                display: 'Thoracic structure (body structure)',
              },
            ],
          },
          include: {
            Painless: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Painless (qualifier value)',
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
                    code: '255350008',
                    display: 'Painless (qualifier value)',
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
                  value: 'Pain (finding)',
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
                    code: '22253000',
                    display: 'Pain (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Painless',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '255350008',
                  display: 'Painless (qualifier value)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        ThoracicWallElasticity: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Thoracic wall elasticity',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Уян чанар',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Physical-exam',
                code: '20000001',
                display: 'Thoracic wall elasticity (body structure)',
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
                  value: 'Normal (qualifier value)',
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
                    display: 'Normal (qualifier value)',
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
                  value: 'Decreased (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буурсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '1250004',
                    display: 'Decreased (qualifier value)',
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
        Fremitus: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Fremitus (finding)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Дууны доргион',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '11421009',
                display: 'Fremitus (finding)',
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
                  value: 'Normal (qualifier value)',
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
                    display: 'Normal (qualifier value)',
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
                  value: 'Decreased (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буурсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '1250004',
                    display: 'Decreased (qualifier value)',
                  },
                ],
              },
            },
            Undetermined: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Undetermined (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тодорхойлогдохгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '373068000',
                    display: 'Undetermined (qualifier value)',
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
                  value: 'Increased (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хүчтэй болсон',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '35105006',
                    display: 'Increased (qualifier value)',
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
        ChestPercussion: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Chest percussion (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тогшилтын дуу',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364058004',
                display: 'Chest percussion (observable entity)',
              },
            ],
          },
          include: {
            Symmetry: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Symmetry (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: '2 талд ижил',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '18772005',
                    display: 'Symmetry (qualifier value)',
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
                  value: 'Asymmetry (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ижил бус',
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
              component: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Chest percussion',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Тогшилтын дуу өөрчлөгдсөн хэсэгт дуу',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '364058004',
                      display: 'Chest percussion (observable entity)',
                    },
                  ],
                },
                include: {
                  ChestDullToPercussion: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Chest dull to percussion',
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
                          code: '39180009',
                          display: 'Chest dull to percussion (finding)',
                        },
                      ],
                    },
                  },
                  ChestTympaniticToPercussion: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Chest tympanitic to percussion',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Тодорсон',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '59948002',
                          display: 'Chest tympanitic to percussion (finding)',
                        },
                      ],
                    },
                  },
                  ChestStonyDullToPercussion: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Chest stony dull to percussion',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Дүлий болсон',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '47861000',
                          display: 'Chest stony dull to percussion (finding)',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          default: {
            type: 'Symmetry',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '18772005',
                  display: 'Symmetry (qualifier value)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 12,
          },
          valueType: 'valueCodeableConceptSectionWithComponent',
        },
        OnExaminationChestExpansionBreathe: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'On examination - chest expansion',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Амьсгал 2 талд',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '162902007',
                display: 'On examination - chest expansion',
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
                  value: 'Ижил',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255473004',
                    display: 'Symmetrical',
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
                  value: 'Ижил бус',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '4128009',
                    display: 'Asymmetry',
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
                  display: 'Symmetrical',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 12,
          },
          valueType: 'valueCodeableConceptSection',
        },
        OnExaminationBreathSoundsAbnormal: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'On examination - breath sounds abnormal',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эмгэг амьсгал бий эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '312392005',
                display: 'On examination - breath sounds abnormal',
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
          component: {
            Present: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'breath sounds abnormal',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмгэг амьсгалтай бол',
                },
              ],
              include: {
                DecreasedBreathSounds: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Decreased breath sounds',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Цулцангийн суларсан',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '58840004',
                        display: 'Decreased breath sounds',
                      },
                    ],
                  },
                },
                HarshBreathSounds: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Harsh breath sounds',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Цулцангийн ширүүссэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '47653008',
                        display: 'Harsh breath sounds',
                      },
                    ],
                  },
                },
                OnExaminationBronchialBreathing: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - bronchial breathing',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Гуурсан хоолойн эмгэг',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '162951005',
                        display: 'On examination - bronchial breathing',
                      },
                    ],
                  },
                },
                Stridor: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Stridor',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Стенозын',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '70407001',
                        display: 'Stridor',
                      },
                    ],
                  },
                },
                AbsentBreathSounds: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Absent breath sounds',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Амьсгал сонсогдохгүй',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '65503000',
                        display: 'Absent breath sounds',
                      },
                    ],
                  },
                },
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
            spanSize: 12,
            componentSpan: 12,
          },
          valueType: 'valueCodeableConceptSectionWithComponents',
        },
        AddedRespiratorySounds: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Added respiratory sounds',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Нэмэлт шуугиантай эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '53972003',
                display: 'Added respiratory sounds',
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
          component: {
            AddedRespiratorySounds: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Added respiratory sounds',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Нэмэлт шуугиантай бол',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '53972003',
                    display: 'Added respiratory sounds',
                  },
                ],
              },
              include: {
                OnExaminationCoarseCrepitations: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - coarse crepitations',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хуурай хэржигнүүр',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '162965007',
                        display: 'On examination - coarse crepitations',
                      },
                    ],
                  },
                },
                BubblingCrackles: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Bubbling crackles',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Нойтон хэржигнүүр',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '248619009',
                        display: 'Bubbling crackles',
                      },
                    ],
                  },
                },
                RespiratoryCrackles: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Respiratory crackles',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Шажигнуур',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '48409008',
                        display: 'Respiratory crackles',
                      },
                    ],
                  },
                },
                OnExaminationPleuralFrictionRub: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - pleural friction rub',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Гялтангийн шүргэлцэх чимээ',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '162967004',
                        display: 'On examination - pleural friction rub',
                      },
                    ],
                  },
                },
              },
            },
            Location: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Location (attribute)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Нэмэлт шуугиантай хэсгийн байршил',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '246267002',
                    display: 'Location (attribute)',
                  },
                ],
              },
              include: {
                StructureOfApexOfRightLung: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Structure of apex of right lung',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Баруун уушгины орой',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '62884005',
                        display: 'Structure of apex of right lung',
                      },
                    ],
                  },
                },
                StructureOfUpperLobeOfRightLung: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Structure of upper lobe of right lung',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Баруун уушгины дээд дэлбэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '42400003',
                        display: 'Structure of upper lobe of right lung',
                      },
                    ],
                  },
                },
                StructureOfMiddleLobeOfRightLung: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Structure of middle lobe of right lung',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Баруун уушгины дунд дэлбэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '72481006',
                        display: 'Structure of middle lobe of right lung',
                      },
                    ],
                  },
                },
                StructureOfLowerLobeOfRightLung: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Structure of lower lobe of right lung',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Баруун уушгины доод дэлбэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '266005',
                        display: 'Structure of lower lobe of right lung',
                      },
                    ],
                  },
                },
                StructureOfUpperLobeOfLeftLung: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Structure of upper lobe of left lung',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Зүүн уушгины дээд дэлбэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '44714003',
                        display: 'Structure of upper lobe of left lung',
                      },
                    ],
                  },
                },
                StructureOfLowerLobeOfLeftLung: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Structure of lower lobe of left lung',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Зүүн уушгины доод дэлбэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '41224006',
                        display: 'Structure of lower lobe of left lung',
                      },
                    ],
                  },
                },
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
            spanSize: 19,
            componentSpan: 8,
          },
          valueType: 'valueCodeableConceptSectionWithComponents',
        },
        Bronchophony: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Bronchophony',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Бронхофони',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '54514007',
                display: 'Bronchophony (finding)',
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
                    display: 'Normal (qualifier value)',
                  },
                ],
              },
            },
            Loudness: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Loudness',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тодорсон',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '24547000',
                    display: 'Loudness (finding)',
                  },
                ],
              },
            },
            Quiet: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Quiet',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Суларсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255357006',
                    display: 'Quiet (qualifier value)',
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
            spanSize: 5,
          },
          valueType: 'valueCodeableConceptSection',
        },
      },
    },
    /* #endregion */

    /* #region  Physical Findings Of Cardiovascular System */
    PhysicalFindingsOfCardiovascularSystem: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Physical findings of Cardiovascular system',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Зүрх судасны тогтолцоо',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '11421-5',
            display: 'Physical findings of Cardiovascular system',
          },
        ],
      },
      include: {
        JugularVeinPulsationSeenOnExamination: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Jugular vein pulsation seen on examination',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гүрээний венийн лугшилт',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Physical-exam',
                code: '20000004',
                display: 'Jugular vein pulsation seen on examination',
              },
            ],
          },
          include: {
            Invisible: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Invisible',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ажиглагдахгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '66486002',
                    display: 'Visible (qualifier value)',
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
                  value: 'Хүчтэй ажиглагдана',
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
                  value: 'Дунд ажиглагдана',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '6736007',
                    display: 'Moderate (severity modifier) (qualifier value)',
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
                  value: 'Сул ажиглагдана',
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
          default: {
            type: 'Invisible',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '66486002',
                  display: 'Visible (qualifier value)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        ApexBeatFunction: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Apex beat, function',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Зүрхний оройн түлхэлт',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '68031002',
                display: 'Apex beat, function (observable entity)',
              },
            ],
          },
          include: {
            Invisible: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Invisible',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ажиглагдахгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '66486002',
                    display: 'Invisible (qualifier value)',
                  },
                ],
              },
            },
            Visible: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Visible',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ажиглагдана',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '24054004',
                    display: 'Visible (qualifier value)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'Invisible',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '66486002',
                  display: 'Visible (qualifier value)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        PositionOfApexBeat: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Position of apex beat',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Зүрхний оройн түлхэлтийн байрлал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '248660002',
                display: 'Position of apex beat (observable entity)',
              },
            ],
          },
          include: {
            ApexBeatDisplaced: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Apex beat displaced',
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
                    code: '248661003',
                    display: 'Apex beat displaced (finding)',
                  },
                ],
              },
            },
            ApexBeatNormalPosition: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Apex beat normal position',
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
                    code: '301138006',
                    display: 'Apex beat normal position (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'ApexBeatNormalPosition',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '301138006',
                  display: 'Apex beat normal position (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        CharacterOfApexBeat: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Character of apex beat',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Зүрхний оройн түлхэлтийн хүч',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '248656000',
                display: 'Character of apex beat (observable entity)',
              },
            ],
          },
          include: {
            NormalCharacterApexBeat: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal character apex beat',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дунд зэрэг хүчтэй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '301137001',
                    display: 'Normal character apex beat (finding)',
                  },
                ],
              },
            },
            ThrustingApexBeat: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Thrusting apex beat',
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
                    code: '301135009',
                    display: 'Thrusting apex beat (finding)',
                  },
                ],
              },
            },
            FeebleApexBeat: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Feeble apex beat',
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
                    code: '301136005',
                    display: 'Feeble apex beat (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'ThrustingApexBeat',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '301135009',
                  display: 'Thrusting apex beat (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        RadialPulse: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Radial pulse',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шууны артерийн лугшилт',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '65452004',
                display: 'Radial pulse, function',
              },
            ],
          },
          hasMember: {
            OnExaminationPulseRhythm: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - pulse rhythm',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэмнэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '268931003',
                    display: 'On examination - pulse rhythm',
                  },
                ],
              },
              include: {
                OnExaminationPulseRhythmRegular: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - pulse rhythm regular',
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
                        code: '162999005',
                        display: 'On examination - pulse rhythm regular',
                      },
                    ],
                  },
                },
                OnExaminationIrregularPulse: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - irregular pulse',
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
                        code: '275954009',
                        display: 'On examination - irregular pulse',
                      },
                    ],
                  },
                },
              },
            },
            OnExaminationPulseRate: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - pulse rate',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Давтамж',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '162986007',
                    display: 'On examination - pulse rate',
                  },
                ],
              },
              unit: {
                type: 'Minute',
                value: '1 минутад ... удаа',
              },
            },
            PulseIntensityOfUnspecifiedArteryPalpation: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Pulse intensity of Unspecified artery palpation',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хүчдэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://loinc.org',
                    code: '44974-4',
                    display: 'Pulse intensity of Unspecified artery palpation',
                  },
                ],
              },
              include: {
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
                      value: 'Их',
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
            FindingOfPulseVolume: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Finding of pulse volume',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дүүрэлт',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '366201008',
                    display: 'Finding of pulse volume (finding)',
                  },
                ],
              },
              include: {
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
                      value: 'Сул',
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
            FindingOfPeripheralPulse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Finding of peripheral pulse',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: '2 талд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '301145006',
                    display: 'Finding of peripheral pulse',
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
                      value: 'Ижил',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '255473004',
                        display: 'Symmetrical',
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
                      value: 'Ижил бус',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '4128009',
                        display: 'Asymmetry',
                      },
                    ],
                  },
                },
              },
            },
            CardiacBorder: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Cardiac border',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Зүрхний (харьцангуй) хил хязгаар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '277927007',
                    display: 'Cardiac border (body structure)',
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
                        display: 'Normal (qualifier value)',
                      },
                    ],
                  },
                },
                Enlarged: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Enlarged',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Томорсон (Дээд, баруун, зүүн хил)',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '260376009',
                        display: 'Enlarged (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
          },
          default: {
            OnExaminationPulseRhythm: {
              type: 'OnExaminationPulseRhythmRegular',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '162999005',
                    display: 'On examination - pulse rhythm regular',
                  },
                ],
              },
            },
            PulseIntensityOfUnspecifiedArteryPalpation: {
              type: 'Moderate',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '6736007',
                    display: 'Moderate (severity modifier) (qualifier value)',
                  },
                ],
              },
            },
            FindingOfPulseVolume: {
              type: 'Moderate',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '6736007',
                    display: 'Moderate (severity modifier) (qualifier value)',
                  },
                ],
              },
            },
            FindingOfPeripheralPulse: {
              type: 'Symmetrical',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255473004',
                    display: 'Symmetrical',
                  },
                ],
              },
            },
            CardiacBorder: {
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
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'hasMemberSection',
        },
        HeartSoundFunction: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Heart sound, function',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Зүрхний авиа',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '23472005',
                display: 'Heart sound, function (observable entity)',
              },
            ],
          },
          hasMember: {
            HeartRateRythm: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Heart rate',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэмнэл',
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
              include: {
                Regular: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Regular',
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
                        code: '17854005',
                        display: 'Regular (qualifier value)',
                      },
                    ],
                  },
                },
                Irregular: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Irregular',
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
                        code: '49608001',
                        display: 'Irregular (qualifier value)',
                      },
                    ],
                  },
                },
              },
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
                  value: 'Давтамж',
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
              unit: {
                type: 'Minute',
                value: '1 минутад ... удаа',
              },
            },
            FindingOfFirstHeartSound: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Finding of first heart sound',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'I авиа',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '301127006',
                    display: 'Finding of first heart sound',
                  },
                ],
              },
              include: {
                NormalFirstHeartSound: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Normal first heart sound, S>1<',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Тод',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '26198000',
                        display: 'Normal first heart sound, S>1<',
                      },
                    ],
                  },
                },
                OnExaminationHeartSoundsDiminished: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - heart sounds diminished',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Бүдгэвтэр I, IV цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '163076004',
                        display: 'On examination - heart sounds diminished',
                      },
                    ],
                  },
                },
                HeartSoundInaudible: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Heart sound inaudible',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Бүдэг I, IV цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '248668009',
                        display: 'Heart sound inaudible',
                      },
                    ],
                  },
                },
                LoudFirstHeartSound: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Loud first heart sound',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Чангарсан I, IV цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '79863002',
                        display: 'Loud first heart sound',
                      },
                    ],
                  },
                },
              },
            },
            FindingOfSecondHeartSound: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Finding of second heart sound',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'II авиа',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '301128001',
                    display: 'Finding of second heart sound',
                  },
                ],
              },
              include: {
                NormalSecondHeartSound: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Normal second heart sound, S>2<',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Тод',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '111974005',
                        display: 'Normal second heart sound, S>2<',
                      },
                    ],
                  },
                },
                OnExaminationHeartSoundsDiminished: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - heart sounds diminished',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Бүдэг II, III, V цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '163076004',
                        display: 'On examination - heart sounds diminished',
                      },
                    ],
                  },
                },
                OnExaminationHeartSoundsExaggerated: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'On examination - heart sounds exaggerated',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Өргөгдсөн II, III цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '163075000',
                        display: 'On examination - heart sounds exaggerated',
                      },
                    ],
                  },
                },
              },
            },
          },
          default: {
            HeartRateRythm: {
              type: 'Regular',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '17854005',
                    display: 'Regular (qualifier value)',
                  },
                ],
              },
            },
            FindingOfFirstHeartSound: {
              type: 'NormalFirstHeartSound',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '26198000',
                    display: 'Normal first heart sound, S>1<',
                  },
                ],
              },
            },
            FindingOfSecondHeartSound: {
              type: 'NormalSecondHeartSound',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '111974005',
                    display: 'Normal second heart sound, S>2<',
                  },
                ],
              },
            },
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'hasMemberSection',
        },
        HeartMurmur: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Heart murmur',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шуугиан',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '421493004',
                display: 'Heart murmur (observable entity)',
              },
            ],
          },
          include: {
            OnExaminationNoCardiacMurmur: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - no cardiac murmur',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Шуугиангүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '163088002',
                    display: 'On examination - no cardiac murmur (situation)',
                  },
                ],
              },
            },
            OnExaminationCardiacMurmur: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - cardiac murmur',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Шуугиантай',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '268934006',
                    display: 'On examination - cardiac murmur (finding)',
                  },
                ],
              },
            },
          },
          component: {
            Location: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Location',
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
                    code: '246267002',
                    display: 'Location (attributes)',
                  },
                ],
              },
              include: {
                MitralValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Mitral valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'I цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251012002',
                        display: 'Mitral valve area (observable entity)',
                      },
                    ],
                  },
                },
                AorticValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Aortic valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'II цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251011009',
                        display: 'Aortic valve area (observable entity)',
                      },
                    ],
                  },
                },
                PulmonaryValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Pulmonary valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'III цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251013007',
                        display: 'Pulmonary valve area (observable entity)',
                      },
                    ],
                  },
                },
                TricuspidValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Tricuspid valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'IV цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251014001',
                        display: 'Tricuspid valve area (observable entity)',
                      },
                    ],
                  },
                },
                ErbIsPoint: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Erb is point',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'V цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000005',
                        display: 'Erb is point',
                      },
                    ],
                  },
                },
              },
              valueType: 'checkBoxType',
            },
            SystolicMurmur: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Systolic murmur',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Систолын',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '31574009',
                    display: 'Systolic murmur (finding)',
                  },
                ],
              },
              include: {
                MitralValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Mitral valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'I цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251012002',
                        display: 'Mitral valve area (observable entity)',
                      },
                    ],
                  },
                },
                AorticValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Aortic valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'II цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251011009',
                        display: 'Aortic valve area',
                      },
                    ],
                  },
                },
                PulmonaryValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Pulmonary valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'III цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251013007',
                        display: 'Pulmonary valve area (observable entity)',
                      },
                    ],
                  },
                },
                TricuspidValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Tricuspid valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'IV цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251014001',
                        display: 'Tricuspid valve area (observable entity)',
                      },
                    ],
                  },
                },
                ErbIsPoint: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Erb is point',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'V цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000005',
                        display: 'Erb is point',
                      },
                    ],
                  },
                },
              },
              valueType: 'checkBoxType',
            },
            DiastolicMurmur: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Diastolic murmur',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Диастолын',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '30782001',
                    display: 'Diastolic murmur (finding)',
                  },
                ],
              },
              include: {
                MitralValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Mitral valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'I цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251012002',
                        display: 'Mitral valve area (observable entity)',
                      },
                    ],
                  },
                },
                AorticValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Aortic valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'II цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251011009',
                        display: 'Aortic valve area (observable entity)',
                      },
                    ],
                  },
                },
                PulmonaryValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Pulmonary valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'III цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251013007',
                        display: 'Pulmonary valve area (observable entity)',
                      },
                    ],
                  },
                },
                TricuspidValveArea: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Tricuspid valve area',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'IV цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '251014001',
                        display: 'Tricuspid valve area (observable entity)',
                      },
                    ],
                  },
                },
                ErbIsPoint: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Erb is point',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'V цэгт',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000005',
                        display: 'Erb is point',
                      },
                    ],
                  },
                },
              },
              valueType: 'checkBoxType',
            },
            Radiation: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Radiation',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дамжилт',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '82107009',
                    display: 'Radiation (physical force)',
                  },
                ],
              },
              include: {
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
                      value: 'Үл дамжина',
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
                      value: 'Дамжина',
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
              },
              valueType: 'radioType',
            },
            Loudness: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Loudness',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хүч',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '24547000',
                    display: 'Loudness (finding)',
                  },
                ],
              },
              include: {
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
                      value: 'Сул',
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
                      value: 'Дунд ажиглагдана',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '6736007',
                        display: 'Moderate (qualifier value)',
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
                      value: 'Хүчтэй ажиглагдана',
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
              },
              valueType: 'radioType',
            },
          },
          default: {
            type: 'OnExaminationNoCardiacMurmur',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '163088002',
                  display: 'On examination - no cardiac murmur (situation)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'componentSection',
        },
        PericardialFrictionRub: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Pericardial friction rub',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Перикардын шүргэлцэх чимээ бий эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '7036007',
                display: 'Pericardial friction rub (finding)',
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
            spanSize: 24,
          },
          valueType: 'valueCodeableConceptSection',
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
        AbdominalShape: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Abdominal shape',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэвлийн хэлбэр',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Physical-exam',
                code: '20000007',
                display: 'Abdominal shape',
              },
            ],
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueStringSection',
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
        GastricTympany: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Gastric tympany',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэвлийн хэнгэрэгэн чимээ',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '387667002',
                display: 'Gastric tympany (finding)',
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
                    display: 'Normal (qualifier value)',
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
                  value: 'Өөрчлөлттэй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '263654008',
                    display: 'Abnormal (qualifier value)',
                  },
                ],
              },
              abnormal: true,
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
                value: 'Abnormal',
              },
              {
                language: 'mn',
                use: {
                  system:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Өөрчлөлттэй хэсэгт тогшилтын дуу',
              },
            ],
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '263654008',
                  display: 'Abnormal (qualifier value)',
                },
              ],
            },
            include: {
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
                    value: 'Бүдгэрсэн',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '1250004',
                      display: 'Decreased (qualifier value)',
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
                    value: 'Тодорсон',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '35105006',
                      display: 'Increased (qualifier value)',
                    },
                  ],
                },
              },
              FindingOfLocalizedAbdominalDullnessToPercussion: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value:
                      'Finding of localized abdominal dullness to percussion',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Дүлий болсон',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '249554000',
                      display:
                        'Finding of localized abdominal dullness to percussion (finding)',
                    },
                  ],
                },
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
            spanSize: 12,
          },
          valueType: 'componentSection',
        },
        DigestivePeristalsisFunction: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Digestive peristalsis, function',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гэдэсний гүрвэлзэх хөдөлгөөн',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '37557000',
                display: 'Digestive peristalsis, function (observable entity)',
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
                    display: 'Normal (qualifier value)',
                  },
                ],
              },
            },
            IncreasedPeristalsis: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Increased peristalsis',
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
                    code: '80306002',
                    display: 'Increased peristalsis (finding)',
                  },
                ],
              },
            },
            AbsentPeristalsis: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Absent peristalsis',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дүлий',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '22114000',
                    display: 'Absent peristalsis (finding)',
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
        SigmoidColonStructure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sigmoid colon structure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тахир гэдэс',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '60184004',
                display: 'Sigmoid colon structure (body structure)',
              },
            ],
          },
          component: {
            PainSensationFinding: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Pain / sensation finding',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмзэглэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '276435006',
                    display: 'Pain / sensation finding (finding)',
                  },
                ],
              },
              include: {
                Painless: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Painless',
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
                        code: '255350008',
                        display: 'Painless (finding)',
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
                      value: 'Эмзэглэлтэй',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '22253000',
                        display: 'Pain (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Composition: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Composition',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тогтоц',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '733996005',
                    display: 'Composition (property) (qualifier value)',
                  },
                ],
              },
              include: {
                Hard: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Hard',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хатуу',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '72505002',
                        display: 'Hard (qualifier value)',
                      },
                    ],
                  },
                },
                Soft: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Soft',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Зөөлөн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '37378003',
                        display: 'Soft (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Mobility: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Mobility',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хөдөлгөөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '363803005',
                    display: 'Mobility (qualifier value)',
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
                      value: 'Хөдөлгөөнтэй',
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
                      value: 'Хөдөлгөөнгүй',
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
            },
          },
          default: {
            PainSensationFinding: {
              type: 'Painless',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255350008',
                    display: 'Painless (finding)',
                  },
                ],
              },
            },
            Composition: {
              type: 'Soft',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '37378003',
                    display: 'Soft (qualifier value)',
                  },
                ],
              },
            },
            Mobility: {
              type: 'Present',
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
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'componentsSection',
        },
        AscendingAndDescendingColonStructure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ascending and descending colon structure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Өгсөх болон уруудах гэдэс',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Physical-exam',
                code: '20000008',
                display: 'Ascending and descending colon structure',
              },
            ],
          },
          component: {
            PainSensationFinding: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Pain / sensation finding',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмзэглэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '276435006',
                    display: 'Pain / sensation finding (finding)',
                  },
                ],
              },
              include: {
                Painless: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Painless',
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
                        code: '255350008',
                        display: 'Painless (finding)',
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
                      value: 'Эмзэглэлтэй',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '22253000',
                        display: 'Pain (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Composition: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Composition',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тогтоц',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '733996005',
                    display: 'Composition (property) (qualifier value)',
                  },
                ],
              },
              include: {
                Hard: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Hard',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хатуу',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '72505002',
                        display: 'Hard (qualifier value)',
                      },
                    ],
                  },
                },
                Soft: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Soft',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Зөөлөн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '37378003',
                        display: 'Soft (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Mobility: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Mobility',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хөдөлгөөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '363803005',
                    display: 'Mobility (qualifier value)',
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
                      value: 'Хөдөлгөөнтэй',
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
                      value: 'Хөдөлгөөнгүй',
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
            },
          },
          default: {
            PainSensationFinding: {
              type: 'Painless',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255350008',
                    display: 'Painless (finding)',
                  },
                ],
              },
            },
            Composition: {
              type: 'Soft',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '37378003',
                    display: 'Soft (qualifier value)',
                  },
                ],
              },
            },
            Mobility: {
              type: 'Present',
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
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'componentsSection',
        },
        TransverseColonStructure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Transverse colon structure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хөндлөн гэдэс',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '485005',
                display: 'Transverse colon structure (body structure)',
              },
            ],
          },
          component: {
            PainSensationFinding: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Pain / sensation finding',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмзэглэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '276435006',
                    display: 'Pain / sensation finding (finding)',
                  },
                ],
              },
              include: {
                Painless: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Painless',
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
                        code: '255350008',
                        display: 'Painless (finding)',
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
                      value: 'Эмзэглэлтэй',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '22253000',
                        display: 'Pain (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Composition: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Composition',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тогтоц',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '733996005',
                    display: 'Composition (property) (qualifier value)',
                  },
                ],
              },
              include: {
                Hard: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Hard',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хатуу',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '72505002',
                        display: 'Hard (qualifier value)',
                      },
                    ],
                  },
                },
                Soft: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Soft',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Зөөлөн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '37378003',
                        display: 'Soft (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Mobility: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Mobility',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хөдөлгөөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '363803005',
                    display: 'Mobility (qualifier value)',
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
                      value: 'Хөдөлгөөнтэй',
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
                      value: 'Хөдөлгөөнгүй',
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
            },
          },
          default: {
            PainSensationFinding: {
              type: 'Painless',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255350008',
                    display: 'Painless (finding)',
                  },
                ],
              },
            },
            Composition: {
              type: 'Soft',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '37378003',
                    display: 'Soft (qualifier value)',
                  },
                ],
              },
            },
            Mobility: {
              type: 'Present',
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
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'componentsSection',
        },
        IlealStructure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ileal structure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Цутгалан гэдэс',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '34516001',
                display: 'Ileal structure (finding)',
              },
            ],
          },
          component: {
            PainSensationFinding: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Pain / sensation finding',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эмзэглэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '276435006',
                    display: 'Pain / sensation finding (finding)',
                  },
                ],
              },
              include: {
                Painless: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Painless',
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
                        code: '255350008',
                        display: 'Painless (finding)',
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
                      value: 'Эмзэглэлтэй',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '22253000',
                        display: 'Pain (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Composition: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Composition',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тогтоц',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '733996005',
                    display: 'Composition (property) (qualifier value)',
                  },
                ],
              },
              include: {
                Hard: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Hard',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Хатуу',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '72505002',
                        display: 'Hard (qualifier value)',
                      },
                    ],
                  },
                },
                Soft: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Soft',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Зөөлөн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://snomed.info/sct',
                        code: '37378003',
                        display: 'Soft (qualifier value)',
                      },
                    ],
                  },
                },
              },
            },
            Mobility: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Mobility',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хөдөлгөөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '363803005',
                    display: 'Mobility (qualifier value)',
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
                      value: 'Хөдөлгөөнтэй',
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
                      value: 'Хөдөлгөөнгүй',
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
            },
          },
          default: {
            PainSensationFinding: {
              type: 'Painless',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '255350008',
                    display: 'Painless (finding)',
                  },
                ],
              },
            },
            Composition: {
              type: 'Soft',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '37378003',
                    display: 'Soft (qualifier value)',
                  },
                ],
              },
            },
            Mobility: {
              type: 'Present',
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
          },
          fieldStyle: {
            spanSize: 24,
          },
          valueType: 'componentsSection',
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
            LiverSize: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Liver size',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Элэгний хэмжээ тэмтрэлтээр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '249566006',
                    display: 'Liver size (observable entity)',
                  },
                ],
              },
              include: {
                NormalSize: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Normal size',
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
                        code: '53461003',
                        display: 'Normal size (finding)',
                      },
                    ],
                  },
                },
                EnlargementOfTheRightLobeOfTheLiver: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Enlargement of the right lobe of the liver',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Томорсон: Баруун дэлбэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000015',
                        display: 'Enlargement of the right lobe of the liver',
                      },
                    ],
                  },
                  note: true,
                },
                EnlargementOfTheLeftLobeOfTheLiver: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Enlargement of the left lobe of the liver',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Томорсон: Зүүн дэлбэн',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000016',
                        display: 'Enlargement of the left lobe of the liver',
                      },
                    ],
                  },
                },
              },
            },
            SpleenSizeByPalpation: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Spleen size by palpation',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дэлүүний хэмжээ тэмтрэлтээр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Physical-exam',
                    code: '20000017',
                    display: 'Spleen size by palpation',
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
                      value: 'Normal (qualifier value)',
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
                        display: 'Normal (qualifier value)',
                      },
                    ],
                  },
                },
                SplenomegalyStageOne: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Splenomegaly stage I',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Томорсон: I зэрэг',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000018',
                        display: 'Splenomegaly stage I',
                      },
                    ],
                  },
                },
                SplenomegalyStageTwo: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Splenomegaly stage II',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Томорсон: II зэрэг',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000019',
                        display: 'Splenomegaly stage II',
                      },
                    ],
                  },
                },
                SplenomegalyStageThree: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Splenomegaly stage III',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Томорсон: III зэрэг',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000020',
                        display: 'Splenomegaly stage III',
                      },
                    ],
                  },
                },
                SplenomegalyStageFour: {
                  designation: [
                    {
                      language: 'en',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Splenomegaly stage IV',
                    },
                    {
                      language: 'mn',
                      use: {
                        system:
                          'http://terminology.hl7.org/CodeSystem/designation-usage',
                        code: 'display',
                      },
                      value: 'Томорсон: IV зэрэг',
                    },
                  ],
                  code: {
                    coding: [
                      {
                        system: 'http://livercenter.mn/fhir/Physical-exam',
                        code: '20000021',
                        display: 'Splenomegaly stage IV',
                      },
                    ],
                  },
                },
              },
            },
          },
          default: {
            LiverSize: {
              type: 'NormalSize',
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '53461003',
                    display: 'Normal size (finding)',
                  },
                ],
              },
            },
            SpleenSizeByPalpation: {
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
            // Mobility: {
            //   type: 'Normal',
            //   code: {
            //     coding: [
            //       {
            //         system: 'http://snomed.info/sct',
            //         code: '17621005',
            //         display: 'Normal (qualifier value)',
            //       },
            //     ],
            //
            //   },
            // },
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
        ColorOfUrine: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Color of urine',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шээсний өнгө',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '430327009',
                display: 'Color of urine',
              },
            ],
          },
          include: {
            NormalUrineColor: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal urine color',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Сүрлэн шар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '46800005',
                    display: 'Normal urine color',
                  },
                ],
              },
            },
            ReddishColorUrine: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Reddish color urine',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Улаан шар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '720003003',
                    display: 'Reddish color urine',
                  },
                ],
              },
            },
            Colorless: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Colorless',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Өнгөгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '263716002',
                    display: 'Colorless (qualifier value)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'NormalUrineColor',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '46800005',
                  display: 'Normal urine color',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        DepositInUrine: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Deposit in urine',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шээс',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '276406003',
                display: 'Deposit in urine (finding)',
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
                  value: 'Тунадастай',
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
                  value: 'Тунадасгүй',
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
            spanSize: 7,
          },
          valueType: 'valueCodeableConceptSection',
        },
        // Шөнө хэд шээдгийг асуухад Observation үүсгэхгүй component дээр нэмэх?
        Nocturia: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Nocturia',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шөнө шээдэг эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '139394000',
                display: 'Nocturia (finding)',
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
              component: {
                designation: [
                  {
                    language: 'en',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Nocturia',
                  },
                  {
                    language: 'mn',
                    use: {
                      system:
                        'http://terminology.hl7.org/CodeSystem/designation-usage',
                      code: 'display',
                    },
                    value: 'Шөнө шээдэг бол тоо',
                  },
                ],
                code: {
                  coding: [
                    {
                      system: 'http://snomed.info/sct',
                      code: '139394000',
                      display: 'Nocturia (finding)',
                    },
                  ],
                },
                valueType: 'valueInteger',
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
            spanSize: 12,
          },
          valueType: 'valueCodeableConceptWithComponentSection',
        },
        SuddenStoppageOfUrineFlow: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sudden stoppage of urine flow',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шээс тасалддаг эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '249296002',
                display: 'Sudden stoppage of urine flow (finding)',
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
        IncompleteEmptyingOfBladder: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Incomplete emptying of bladder',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Дутуу шээдэг эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '249288007',
                display: 'Incomplete emptying of bladder (finding)',
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
        MustStrainToPassUrine: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Must strain to pass urine',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Дүлж шээдэг эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '249279003',
                display: 'Must strain to pass urine (finding)',
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
        Dysuria: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Dysuria',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шээхэд давсгаар өвддөг эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '49650001',
                display: 'Dysuria (finding)',
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
            spanSize: 13,
          },
          valueType: 'valueCodeableConceptSection',
        },
        OnExaminationKidneyPalpated: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'On examination - kidney palpated',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Бөөр тэмтрэлтээр',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '163354000',
                display: 'On examination - kidney palpated',
              },
            ],
          },
          include: {
            Painless: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Painless',
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
                    code: '255350008',
                    display: 'Painless',
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
                  value: 'Эмзэглэлтэй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '22253000',
                    display: 'Pain',
                  },
                ],
              },
              bodySite: {
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
                    value: 'Эмзэглэлтэй бол байрлал',
                  },
                ],
                include: {
                  RightKidneyStructure: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Right kidney structure',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Баруун',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '9846003',
                          display: 'Right kidney structure (body structure)',
                        },
                      ],
                    },
                  },
                  LeftKidneyStructure: {
                    designation: [
                      {
                        language: 'en',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Left kidney structure',
                      },
                      {
                        language: 'mn',
                        use: {
                          system:
                            'http://terminology.hl7.org/CodeSystem/designation-usage',
                          code: 'display',
                        },
                        value: 'Зүүн',
                      },
                    ],
                    code: {
                      coding: [
                        {
                          system: 'http://snomed.info/sct',
                          code: '18639004',
                          display: 'Left kidney structure (body structure)',
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          default: {
            type: 'Painless',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '255350008',
                  display: 'Painless',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 12,
          },
          valueType: 'valueCodeableConceptWithBodySiteSection',
        },
        RenalAngleTenderness: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Renal angle tenderness',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Пастернацкий',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '102830001',
                display: 'Renal angle tenderness (finding)',
              },
            ],
          },
          include: {
            RightKidneyStructure: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Right kidney structure',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Баруун',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '9846003',
                    display: 'Right kidney structure (body structure)',
                  },
                ],
              },
            },
            LeftKidneyStructure: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Left kidney structure',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Зүүн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '18639004',
                    display: 'Left kidney structure (body structure)',
                  },
                ],
              },
            },
          },
          default: {
            RightKidneyStructure: {},
            LeftKidneyStructure: {},
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConcepts',
        },
      },
    },
    /* #endregion */

    /* #region  Physical Findings Of Nervous System */
    PhysicalFindingsOfNervousSystem: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Physical findings of Nervous system',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Мэдрэлийн тогтолцоо',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '10202-0',
            display: 'Physical findings of Nervous system',
          },
        ],
      },
      include: {
        SenseOfSmellFunction: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sense of smell, function',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Үнэрлэх мэдрэмж',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '397686008',
                display: 'Sense of smell, function (observable entity)',
              },
            ],
          },
          include: {
            SenseOfSmellNormal: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Sense of smell normal',
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
                    code: '299900007',
                    display: 'Sense of smell normal (finding)',
                  },
                ],
              },
            },
            SenseOfSmellAltered: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Sense of smell altered',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буурсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '112105008',
                    display: 'Sense of smell altered (finding)',
                  },
                ],
              },
            },
            LossOfSenseOfSmell: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Loss of sense of smell',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ялгахгүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '44169009',
                    display: 'Loss of sense of smell (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'SenseOfSmellNormal',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '299900007',
                  display: 'Sense of smell normal (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        HearingFunction: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hearing, function',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сонсголын мэдрэмж',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '47078008',
                display: 'Hearing, function',
              },
            ],
          },
          include: {
            HearingNormal: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hearing normal',
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
                    code: '162339002',
                    display: 'Hearing normal (finding)',
                  },
                ],
              },
            },
            Hyperacusis: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hyperacusis',
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
                    code: '25289003',
                    display: 'Hyperacusis (disorder)',
                  },
                ],
              },
            },
            DeterioratingHearing: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Deteriorating hearing',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буурсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '314914004',
                    display: 'Deteriorating hearing (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'HearingNormal',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '162339002',
                  display: 'Hearing normal (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        FacialSymmetry: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Facial symmetry',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Нүүрний 2 тал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '248172007',
                display: 'Facial symmetry (finding)',
              },
            ],
          },
          include: {
            Symmetry: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Symmetry (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ижил',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '18772005',
                    display: 'Symmetry (qualifier value)',
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
                  value: 'Asymmetry (qualifier value)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ижил бус',
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
            type: 'Symmetry',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '18772005',
                  display: 'Symmetry (qualifier value)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        ReflexFinding: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Reflex finding',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Рефлексүүд',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '106146005',
                display: 'Reflex finding (finding)',
              },
            ],
          },
          include: {
            NormalReflex: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal reflex',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хадгалагдана',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '102981005',
                    display: 'Normal reflex',
                  },
                ],
              },
            },
            AbnormalReflex: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Abnormal reflex',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хадгалагдаагүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '46670006',
                    display: 'Abnormal reflex (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'NormalReflex',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '102981005',
                  display: 'Normal reflex',
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

    /* #region  Physical Findings Sensation */
    PhysicalFindingsSensation: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Physical findings sensation',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Мэдрэхүйн эрхтэн тогтолцоо / Сэтгэцийн байдал',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '32473-1',
            display: 'Physical findings sensation (finding)',
          },
        ],
      },
      include: {
        FindingOfSensationOfSkin: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of sensation of skin',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Өнгөц',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '297971001',
                display: 'Finding of sensation of skin (finding)',
              },
            ],
          },
          include: {
            NormalSkinSensitivity: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal skin sensitivity',
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
                    code: '73230009',
                    display: 'Normal skin sensitivity (finding)',
                  },
                ],
              },
            },
            Hyperesthesia: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hyperesthesia',
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
                    code: '14151009',
                    display: 'Hyperesthesia (finding)',
                  },
                ],
              },
            },
            ReducedSensationOfSkin: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Reduced sensation of skin',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буурсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '398026008',
                    display: 'Reduced sensation of skin (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'NormalSkinSensitivity',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '73230009',
                  display: 'Normal skin sensitivity (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        OnExaminationDeepSensation: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'On examination - deep sensation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гүн',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '163723002',
                display: 'On examination - deep sensation (finding)',
              },
            ],
          },
          include: {
            OnExaminationDeepSensationNormal: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - deep sensation normal',
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
                    code: '163724008',
                    display: 'On examination - deep sensation normal (finding)',
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
                    display: 'Increased (qualifier value)',
                  },
                ],
              },
            },
            OnExaminationDeepSensationReduced: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'On examination - deep sensation reduced',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буурсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '163725009',
                    display:
                      'On examination - deep sensation reduced (finding)',
                  },
                ],
              },
            },
          },
          default: {
            type: 'OnExaminationDeepSensationNormal',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '163724008',
                  display: 'On examination - deep sensation normal (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        MoodFinding: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Mood finding',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэт мэдрэгшил',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '106131003',
                display: 'Mood finding (finding)',
              },
            ],
          },
          include: {
            NormalMoodSymptoms: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal mood symptoms',
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
                    code: '134416003',
                    display: 'Normal mood symptoms (finding)',
                  },
                ],
              },
            },
            EmotionalHypersensitivity: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Emotional hypersensitivity',
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
                    code: '421369008',
                    display: 'Emotional hypersensitivity (finding)',
                  },
                ],
              },
            },
            Hyposensitivity: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hyposensitivity',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буурсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '27596001',
                    display: 'Hyposensitivity',
                  },
                ],
              },
            },
          },
          default: {
            type: 'NormalMoodSymptoms',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '134416003',
                  display: 'Normal mood symptoms (finding)',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptSection',
        },
        MentalStateFinding: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Mental state finding',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сэтгэцийн байдал',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '36456004',
                display: 'Mental state finding (finding)',
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
                  value: 'Normal mental state',
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
                    code: '17326005',
                    display: 'Normal mental state',
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
                  value: 'Abnormal mental state',
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
                    code: '228150001',
                    display: 'Abnormal mental state',
                  },
                ],
              },
              note: true,
            },
          },
          default: {
            type: 'Normal',
            code: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '17326005',
                  display: 'Normal mental state',
                },
              ],
            },
          },
          fieldStyle: {
            spanSize: 6,
          },
          valueType: 'valueCodeableConceptWithNote',
        },
      },
    },
    /* #endregion */
  },
}

module.exports = PhysicalExaminationComplete
