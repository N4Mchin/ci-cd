const AnamnesisVitae = {
  designation: [
    {
      language: 'en',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'Anamnesis vitae',
    },
    {
      language: 'mn',
      use: {
        system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
        code: 'display',
      },
      value: 'Амьдралын түүх',
    },
  ],
  code: {
    coding: [
      {
        system: 'http://livercenter.mn/fhir/Anamnesis',
        code: '10000007',
        display: 'Anamnesis vitae',
      },
    ],
  },
  include: {
    BriefHistoryOfPatient: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Brief history of patient',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Өвчтөний товч намтар',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/Anamnesis',
            code: '10000008',
            display: 'Brief history of patient',
          },
        ],
      },
      include: {
        FindingOfBirthDetails: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of birth details (finding)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Төрөлтийн тухай',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '366343003',
                display: 'Finding of birth details (finding)',
              },
            ],
          },
          include: {
            DeliveryNormal: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Delivery normal (finding))',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Төрөх замаар хэвийн төрсөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '48782003',
                    display: 'Delivery normal (finding)',
                  },
                ],
              },
            },
            PrematureDelivery: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Premature delivery (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дутуу төрсөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '282020008',
                    display: 'Premature delivery (finding)',
                  },
                ],
              },
            },
            PerinatalAsphyxiation: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Perinatal asphyxiation (event)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бүтэлттэй төрсөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '418113004',
                    display: 'Perinatal asphyxiation (event)',
                  },
                ],
              },
            },
            DeliveriesByCesarean: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Deliveries by cesarean (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Кесар хагалгаагаар төрсөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '200144004',
                    display: 'Deliveries by cesarean (finding)',
                  },
                ],
              },
            },
            ForcepsDelivery: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Forceps delivery (procedure)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хавчуурын тусламжтай төрсөн',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '302383004',
                    display: 'Forceps delivery (procedure)',
                  },
                ],
              },
            },
          },
        },
        ChildhoodGrowthAndOrDevelopmentFinding: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Childhood growth AND/OR development finding (finding)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Бага насны өсөлт хөгжил',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '129822005',
                display:
                  'Childhood growth AND/OR development finding (finding)',
              },
            ],
          },
          include: {
            NormalGrowth: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal growth',
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
                    code: '58236001',
                    display: 'Normal growth',
                  },
                ],
              },
            },
            ProblemOfGrowthAndDevelopment: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Problem of growth and development',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Өвчлөмтгий байсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '85456006',
                    display: 'Problem of growth and development',
                  },
                ],
              },
            },
          },
        },
        DetailsOfEducation: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Details of education (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value:
                'Өсвөр залуу насанд суралцсан сургууль, эзэмшсэн боловсрол',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '276031006',
                display: 'Details of education (observable entity)',
              },
            ],
          },
        },
        EmploymentDetail: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Employment detail (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Насанд хүрсэн үеэс эрхэлсэн ажлууд, мэргэжлийн тухай',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364703007',
                display: 'Employment detail (observable entity)',
              },
            ],
          },
        },
        RetiredLifeEventBoolean: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Retired, life event (finding)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тэтгэвэрт гарсан эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '105493001',
                display: 'Retired, life event (finding)',
              },
            ],
          },
        },
        RetiredLifeEvent: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Retired, life event (finding)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тэтгэвэрт хэзээ гарсан',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '105493001',
                display: 'Retired, life event (finding)',
              },
            ],
          },
        },
        HouseholdComposition: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of household composition (finding)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Одоо хэнтэйгээ цуг амьдардаг',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '365481000',
                display: 'Finding of household composition (finding)',
              },
            ],
          },
          include: {
            LivesWithWife: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives with wife (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эхнэр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '447555007',
                    display: 'Lives with wife (finding)',
                  },
                ],
              },
            },
            LivesWithSpouse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives with spouse (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Нөхөр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '447051007',
                    display: 'Lives with spouse (finding)',
                  },
                ],
              },
            },
            LivesWithMother: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives with mother (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ээж',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '224139006',
                    display: 'Lives with mother (finding)',
                  },
                ],
              },
            },
            LivesWithFather: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives with father (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Аав',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '224140008',
                    display: 'Lives with father (finding)',
                  },
                ],
              },
            },
            LivesWithRelatives: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives with relatives (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ах, Эгч',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '160756002',
                    display: 'Lives with relatives (finding)',
                  },
                ],
              },
            },
            LivesWithDaughter: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives with daughter (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Охин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '224135000',
                    display: 'Lives with daughter (finding)',
                  },
                ],
              },
            },
            LivesWithSon: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives with son (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хүү',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '224136004',
                    display: 'Lives with son (finding)',
                  },
                ],
              },
            },
            LivesAlone: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lives alone (finding)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ганцаараа',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '224136004',
                    display: 'Lives alone (finding)',
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
                  value: 'Other (qualifier value)',
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
                    display: 'Other (qualifier value)',
                  },
                ],
              },
            },
          },
        },
      },
    },
    FemaleReproductiveHistory: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Female reproductive history',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Эмэгтэйчүүдийн асуумж',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '62672-1',
            display: 'Female reproductive history',
          },
        ],
      },
      include: {
        AgeOfOnsetOfMenstruation: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Age of onset of menstruation (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Анхны сарын тэмдэг хэдэн настайд ирсэн',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364314008',
                display: 'Age of onset of menstruation (observable entity)',
              },
            ],
          },
        },
        DurationOfMenstrualPeriod: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Duration of menstrual period (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сарын тэмдгийн үргэлжлэх хугацаа',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364311000',
                display: 'Duration of menstrual period (observable entity)',
              },
            ],
          },
        },
        LastMenstrualPeriodFirstDay: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Last menstrual period - First day',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сүүлийн сарын тэмдэг хэзээ ирсэн',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '161713000',
                display: 'Last menstrual period - First day',
              },
            ],
          },
        },
        DurationOfMenstrualCycle: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Duration of menstrual cycle',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сарын тэмдгийн мөчлөгийн хоног',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '364310004',
                display: 'Duration of menstrual cycle',
              },
            ],
          },
        },
        FindingOfQuantityOfMenstrualBloodLoss: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of quantity of menstrual blood loss',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сарын тэмдгийн хэмжээ',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '248970003',
                display: 'Finding of quantity of menstrual blood loss',
              },
            ],
          },
          include: {
            NormalMenstrualBloodLoss: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Normal menstrual blood loss',
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
                    code: '308550003',
                    display: 'Normal menstrual blood loss',
                  },
                ],
              },
            },
            Hypomenorrhea: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hypomenorrhea',
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
                    code: '64206003',
                    display: 'Hypomenorrhea',
                  },
                ],
              },
            },
            Menorrhagia: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Menorrhagia',
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
                    code: '386692008',
                    display: 'Menorrhagia',
                  },
                ],
              },
            },
            VariationInQuantityOfMenstrualFlow: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Variation in quantity of menstrual flow',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Янз бүр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '289889009',
                    display: 'Variation in quantity of menstrual flow',
                  },
                ],
              },
            },
          },
        },
        Gravida: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Gravida (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэдэн удаа жирэмсэлсэн',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '161732006',
                display: 'Gravida (observable entity)',
              },
            ],
          },
        },
        NumberOfBirthsAtTerm: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of births at term',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэвийн төрөлт хэд байсан болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '440425000',
                display: 'Number of births at term',
              },
            ],
          },
        },
        VaginalDelivery: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Vaginal delivery (finding)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Өөрөөрөө хэд төрсөн болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '289259007',
                display: 'Vaginal delivery (finding)',
              },
            ],
          },
        },
        NumberOfCesareanSections: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of cesarean sections (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Кесар хагалгаагаар хэд төрсөн болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '252115000',
                display: 'Number of cesarean sections (observable entity)',
              },
            ],
          },
        },
        NumberOfLostPregnancies: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of lost pregnancies (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Дутуу төрөлт хэд байсан болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '252111009',
                display: 'Number of lost pregnancies (observable entity)',
              },
            ],
          },
        },
        NumberOfStillbirths: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of stillbirths (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Амьгүй төрөлт хэд байсан болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '252112002',
                display: 'Number of stillbirths (observable entity)',
              },
            ],
          },
        },
        NumberOfEctopicPregnancies: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of ectopic pregnancies (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Савны гадуур жирэмслэлт хэд байсан болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '440537001',
                display: 'Number of ectopic pregnancies (observable entity)',
              },
            ],
          },
        },
        NumberOfMiscarriages: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of miscarriages (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Зулбалт хэд байсан болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '248989003',
                display: 'Number of miscarriages (observable entity)',
              },
            ],
          },
        },
        NumberOfAbortions: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of abortions (observable entity)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Үр хөндөлт хэд байсан болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '252113007',
                display: 'Number of abortions (observable entity)',
              },
            ],
          },
        },
        PeriodBetweenDeliveries: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Period between deliveries',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Төрөлт хоорондоо хэдэн жилийн зайтай байсан болох нь',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000009',
                display: 'Period between deliveries',
              },
            ],
          },
        },
        ComplicationOccurringDuringLaborAndDelivery: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value:
                'Complication occurring during labor and delivery (disorder)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Төрөлтийн үед хүндрэл байсан эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '199745000',
                display:
                  'Complication occurring during labor and delivery (disorder)',
              },
            ],
          },
        },
        BreastFed: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Breast fed',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хүүхдээ хөхөөр хооллодог байсан эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '169741004',
                display: 'Breast fed',
              },
            ],
          },
          include: {
            True: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'True',
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
                    code: '31874001',
                    display: 'True',
                  },
                ],
              },
            },
            False: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'False',
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
                    code: '64100000',
                    display: 'False',
                  },
                ],
              },
            },
          },
        },
        BreastfeedingWithSupplement: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Breastfeeding with supplement',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хөхүүлэхийн зэрэгцээ нэмэгдэл сүү хэрэглэдэг байсан',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '169743001',
                display: 'Breastfeeding with supplement',
              },
            ],
          },
        },
        BreastfeedingMaintenance: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Breastfeeding maintenance',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хөхүүлсэн хугацаа',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '405029003',
                display: 'Breastfeeding maintenance',
              },
            ],
          },
        },
        Contraception: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Contraception',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Жирэмслэлтээс хэрхэн хамгаалдаг',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '13197004',
                display: 'Contraception',
              },
            ],
          },
          include: {
            DoesNotUseContraception: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Does not use contraception',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэрэглэдэггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '445375000',
                    display: 'Does not use contraception',
                  },
                ],
              },
            },
            OralContraception: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Oral contraception',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дааврын бэлдмэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '5935008',
                    display: 'Oral contraception',
                  },
                ],
              },
            },
            ContraceptionUsingInjectableContraceptiveMedication: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value:
                    'Contraception using injectable contraceptive medication',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тариа',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '268464009',
                    display:
                      'Contraception using injectable contraceptive medication',
                  },
                ],
              },
            },
            DrugElutingContraceptiveImplant: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Drug-eluting contraceptive implant',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Суулгац',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '468312002',
                    display: 'Drug-eluting contraceptive implant',
                  },
                ],
              },
            },
            UsesACondom: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Uses a condom',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бэлгэвч',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '169505001',
                    display: 'Uses a condom',
                  },
                ],
              },
            },
            IntrauterineDeviceContraception: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Intrauterine device contraception',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ерөндөг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '312081001',
                    display: 'Intrauterine device contraception',
                  },
                ],
              },
            },
            TubalLigationDone: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Tubal ligation done',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үрийн хоолой боох',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '36811000119108',
                    display: 'Tubal ligation done',
                  },
                ],
              },
            },
            TryingToConceive: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'trying to conceive',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Жирэмслэхийг хүсч байгаа',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '169449001',
                    display: 'trying to conceive',
                  },
                ],
              },
            },
            NotNeeded: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Not needed',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэрэглэх шаардлагагүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '410529002',
                    display: 'Not needed',
                  },
                ],
              },
            },
            ContraceptionNeedComplicatedByMedicalCondition: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Contraception need complicated by medical condition',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Таардаггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '440552008',
                    display:
                      'Contraception need complicated by medical condition',
                  },
                ],
              },
            },
            HusbandDoesntAllow: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Husband doesnt allow',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Нөхөр зөвшөөрдөггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Anamnesis',
                    code: '10000010',
                    display: 'Husband doesnt allow',
                  },
                ],
              },
            },
            DeficientKnowledge: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Deficient knowledge',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'ЖХХ мэддэггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '54777007',
                    display: 'Deficient knowledge',
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
                  value: 'Бусад арга',
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
            },
          },
        },
        HistoryOfGynecologicalDisorder: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'History of gynecological disorder',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эмэгтэйчүүдийн өвчнөөр өвдөж байсан тухай',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '271902005',
                display: 'History of gynecological disorder',
              },
            ],
          },
          include: {
            InflammatoryDisorder: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Inflammatory disorder',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үрэвсэлт өвчин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '128139000',
                    display: 'Inflammatory disorder',
                  },
                ],
              },
            },
            SexuallyTransmittedInfectiousDisease: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Sexually transmitted infectious disease',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бэлгийн замаар халдах өвчин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '8098009',
                    display: 'Sexually transmitted infectious disease',
                  },
                ],
              },
            },
            InflammationOfCervix: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Inflammation of cervix',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Умайн хүзүүний үрэвсэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '37610005',
                    display: 'Inflammation of cervix',
                  },
                ],
              },
            },
            Vaginitis: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Vaginitis',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үтрээний үрэвсэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '30800001',
                    display: 'Vaginitis',
                  },
                ],
              },
            },
            MalignantNeoplasmOfUterus: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Malignant neoplasm of uterus',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Умайн хавдар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '371973000',
                    display: 'Malignant neoplasm of uterus',
                  },
                ],
              },
            },
            NeoplasmOfBreast: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Neoplasm of breast',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хөхний хавдар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '126926005',
                    display: 'Neoplasm of breast',
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
            },
          },
        },
        MenopauseFunction: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Menopause, function',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Цэвэршилт эхэлсэн эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '161712005',
                display: 'Menopause, function',
              },
            ],
          },
        },
        AgeAtOnsetOfMenopause: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Age at onset of menopause',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэдэн наснаас цэвэршсэн болох',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '773251000',
                display: 'Age at onset of menopause',
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
        },
      },
    },
    MaleReproductiveHistory: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Male Reproductive History',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Эрэгтэйчүүдийн асуумж',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '101302',
            display: 'Male Reproductive History',
          },
        ],
      },
      include: {
        EndocrineAndrologyDisorder: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Endocrine andrology disorder',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эрэгтэйчүүдийн өвчнөөр өвдөж байсан тухай',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '276856001',
                display: 'Endocrine andrology disorder',
              },
            ],
          },
          include: {
            Prostatitis: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Prostatitis',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Түрүү булчирхайн үрэвсэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '9713002',
                    display: 'Prostatitis',
                  },
                ],
              },
            },
            Impotence: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Impotence',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бэлгийн сулрал',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '397803000',
                    display: 'Impotence',
                  },
                ],
              },
            },
            InflammatoryDisorder: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Inflammatory disorder',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үрэвсэлт өвчин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '128139000',
                    display: 'Inflammatory disorder',
                  },
                ],
              },
            },
            SexuallyTransmittedInfectiousDisease: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Sexually transmitted infectious disease',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бэлгийн замаар халдах өвчин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '8098009',
                    display: 'Sexually transmitted infectious disease',
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
            },
          },
        },
        Contraception: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Contraception',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Жирэмслэлтээс хэрхэн хамгаалдаг',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '13197004',
                display: 'Contraception',
              },
            ],
          },
          include: {
            DoesNotUseContraception: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Does not use contraception',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэрэглэдэггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '445375000',
                    display: 'Does not use contraception',
                  },
                ],
              },
            },
            OralContraception: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Oral contraception',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дааврын бэлдмэл',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '5935008',
                    display: 'Oral contraception',
                  },
                ],
              },
            },
            ContraceptionUsingInjectableContraceptiveMedication: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value:
                    'Contraception using injectable contraceptive medication',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тариа',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '268464009',
                    display:
                      'Contraception using injectable contraceptive medication',
                  },
                ],
              },
            },
            DrugElutingContraceptiveImplant: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Drug-eluting contraceptive implant',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Суулгац',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '468312002',
                    display: 'Drug-eluting contraceptive implant',
                  },
                ],
              },
            },
            UsesACondom: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Uses a condom',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бэлгэвч',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '169505001',
                    display: 'Uses a condom',
                  },
                ],
              },
            },
            IntrauterineDeviceContraception: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Intrauterine device contraception',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ерөндөг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '312081001',
                    display: 'Intrauterine device contraception',
                  },
                ],
              },
            },
            TubalLigationDone: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Tubal ligation done',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үрийн хоолой боох',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '36811000119108',
                    display: 'Tubal ligation done',
                  },
                ],
              },
            },
            tryingToConceive: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'trying to conceive',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Жирэмслэхийг хүсч байгаа',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '169449001',
                    display: 'trying to conceive',
                  },
                ],
              },
            },
            NotNeeded: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Not needed',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэрэглэх шаардлагагүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '410529002',
                    display: 'Not needed',
                  },
                ],
              },
            },
            ContraceptionNeedComplicatedByMedicalCondition: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Contraception need complicated by medical condition',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Таардаггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '440552008',
                    display:
                      'Contraception need complicated by medical condition',
                  },
                ],
              },
            },
            WifeDoesntAllow: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Wife doesnt allow',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Эхнэр зөвшөөрдөггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://livercenter.mn/fhir/Anamnesis',
                    code: '10000011',
                    display: 'Wife doesnt allow',
                  },
                ],
              },
            },
            DeficientKnowledge: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Deficient knowledge',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'ЖХХ мэддэггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '54777007',
                    display: 'Deficient knowledge',
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
                  value: 'Бусад арга',
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
            },
          },
        },
      },
    },
    HistoryOfClinicalFindingInSubject: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'History of clinical finding in subject',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Урьд өвчилсөн өвчин, эмгэгийн байдал',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '417662000',
            display: 'History of clinical finding in subject',
          },
        ],
      },
      include: {
        HistoryOfInfectiousDisease: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'History of infectious disease',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Халдварт өвчнүүд',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '161413004',
                display: 'History of infectious disease',
              },
            ],
          },
          include: {
            Measles: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Measles',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Улаан бурхан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '14189004',
                    display: 'Measles',
                  },
                ],
              },
            },
            Varicella: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Varicella',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Салхин цэцэг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '38907003',
                    display: 'Varicella',
                  },
                ],
              },
            },
            ViralHepatitisTypeA: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Viral hepatitis, type A',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Вирүст хепатит А',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '40468003',
                    display: 'Viral hepatitis, type A',
                  },
                ],
              },
            },
            ViralHepatitisTypeB: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Viral hepatitis type B',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Вирүст хепатит В',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '66071002',
                    display: 'Viral hepatitis type B',
                  },
                ],
              },
            },
            ViralHepatitisTypeC: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Viral hepatitis type C',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Вирүст хепатит С',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '50711007',
                    display: 'Viral hepatitis type C',
                  },
                ],
              },
            },
            IntestinalInfectiousDisease: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Intestinal infectious disease',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Гэдэсний халдварт өвчин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '266071000',
                    display: 'Intestinal infectious disease',
                  },
                ],
              },
            },
            Tuberculosis: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Tuberculosis',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Сүрьеэ',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '56717001',
                    display: 'Tuberculosis',
                  },
                ],
              },
            },
            Mumps: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Mumps',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Гахайн хавдар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '36989005',
                    display: 'Mumps',
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
            },
          },
        },
        PastHistoryOfProcedure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Past history of procedure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Мэс ажилбар хийлгэсэн эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '416940007',
                display: 'Past history of procedure',
              },
            ],
          },
        },
        PerformedProcedure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Name of performed procedure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Өмнө хийлгэж байсан мэж ажилбар',
            },
          ],
        },
        ProcedurePerformedDate: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Date of procedure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Мэс ажилбар хийлгэсэн огноо',
            },
          ],
        },
        ProcedureComplication: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Procedure complication',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хүндрэл гарсан эсэх',
            },
          ],
          include: {
            ComplicationOfProcedure: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Yes',
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
                    code: '116224001',
                    display: 'Complication of procedure (disorder)',
                  },
                ],
              },
            },
            NoComplicationProcedure: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'No',
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
                    system: 'http://livercenter.mn/fhir/Anamnesis',
                    code: '10000012',
                    display: 'No complication of procedure',
                  },
                ],
              },
            },
          },
        },
        ProcedureComplicationDetails: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Detail of procedures complication',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хүндрэл гарсан бол ямар хүндрэл гарсан болох',
            },
          ],
        },
        ChronicDisease: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Chronic disease',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Архаг өвчин',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '27624003',
                display: 'Chronic disease',
              },
            ],
          },
          include: {
            MyocardialInfarction: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Myocardial infarction',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Зүрхний шигдээс',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '22298006',
                    display: 'Myocardial infarction',
                  },
                ],
              },
            },
            HeartDisease: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Heart disease',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бусад зүрхний өвчин (зүрхний дутагдал, ревматизм)',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '56265001',
                    display: 'Heart disease',
                  },
                ],
              },
            },
            CerebrovascularAccident: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Cerebrovascular accident',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тархинд цус харвах',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '230690007',
                    display: 'Cerebrovascular accident',
                  },
                ],
              },
            },
            HypertensiveDisorderSystemicArterial: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hypertensive disorder, systemic arterial',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Артерийн даралт ихсэлт',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '38341003',
                    display: 'Hypertensive disorder, systemic arterial',
                  },
                ],
              },
            },
            DiabetesMellitus: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Diabetes mellitus',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Чихрийн шижин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '73211009',
                    display: 'Diabetes mellitus',
                  },
                ],
              },
            },
            Hypercholesterolemia: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Hypercholesterolemia',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Холестрин өндөр гардаг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '13644009',
                    display: 'Hypercholesterolemia',
                  },
                ],
              },
            },
            KidneyDisease: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Kidney disease',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бөөрний өвчин',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '90708001',
                    display: 'Kidney disease',
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
                  value: 'Бусад өвчин',
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
            },
          },
        },
        AccidentalEventBoolean: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Accidental event',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Осол, гэмтэл, хордлогод өртөж байсан эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '418019003',
                display: 'Accidental event',
              },
            ],
          },
        },
        AccidentalEvent: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Accidental event',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тийм бол осол, гэмтэл, хордлогын төрлийг сонгоно уу',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '418019003',
                display: 'Accidental event',
              },
            ],
          },
          include: {
            AutomobileAccident: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Automobile accident',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Автомашины осолд орж байсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '426772002',
                    display: 'Automobile accident',
                  },
                ],
              },
            },
            FractureOfBone: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Fracture of bone',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ясны гэмтэл авч байсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '125605004',
                    display: 'Fracture of bone',
                  },
                ],
              },
            },
            SoftTissueInjury: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Soft tissue injury',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Зөөлөн эдийн гэмтэл авч байсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '282026002',
                    display: 'Soft tissue injury',
                  },
                ],
              },
            },
            BurnInjury: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Burn injury',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Түлэгдэж байсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '48333001',
                    display: 'Burn injury',
                  },
                ],
              },
            },
            Poisoning: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Poisoning',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хордлогонд орж байсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '75478009',
                    display: 'Poisoning',
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
                  value: 'Бусад өвчин',
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
            },
          },
        },
      },
    },
    EpidemiologicalAnamnesis: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Epidemiological anamnesis',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Тархвар зүйн асуумж',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://livercenter.mn/fhir/Anamnesis',
            code: '10000013',
            display: 'Epidemiological anamnesis',
          },
        ],
      },
      include: {
        ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value:
                'Contact with a patient with an infectious disease within last six months',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value:
                'Ойрын 6 сарын хугацаанд халдварт өвчтэй хүнтэй ойр байсан эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000014',
                display:
                  'Contact with a patient with an infectious disease within last six months',
              },
            ],
          },
        },
        TravelAbroad: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Travel abroad',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ойрын 6 сарын дотор гадаад оронд зорчсон эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '276030007',
                display: 'Travel abroads',
              },
            ],
          },
        },
        TravelDestination: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Travel destination',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хаашаа',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000015',
                display: 'Travel destination',
              },
            ],
          },
        },
        TravelLength: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Travel length',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ямар хугацаагаар',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000016',
                display: 'Travel length',
              },
            ],
          },
        },
        Transfusion: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Transfusion',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Цус сэлбүүлсэн эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '5447007',
                display: 'Transfusion',
              },
            ],
          },
        },
        PerformedDateTime: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'performedDateTime',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тийм бол хэзээ',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '5447007',
                display: 'Performed Date Time',
              },
            ],
          },
        },
      },
    },
    FamilyMemberHistory: {
      Father: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Father',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Аав',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '66839005',
              display: 'Father (person)',
            },
          ],
        },
      },
      Mother: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Natural mother',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Ээж',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '72705000',
              display: 'Mother (person)',
            },
          ],
        },
      },
      PaternalGrandfather: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'paternal grandfather',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Өвөө (аавын тал)',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '394856008',
              display: 'Paternal grandfather (person)',
            },
          ],
        },
      },
      PaternalGrandmother: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Paternal grandmother',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Эмээ (аавын тал)',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '394858009',
              display: 'Paternal grandmother (person)',
            },
          ],
        },
      },
      MaternalGrandfather: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Maternal grandfather',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Өвөө (ээжийн тал)',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '394857004',
              display: 'Maternal grandfather (person)',
            },
          ],
        },
      },
      MaternalGrandmother: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Maternal grandmother',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Эмээ (ээжийн тал)',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '394859001',
              display: 'Maternal grandmother (person)',
            },
          ],
        },
      },
      Brother: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Brother',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Төрсөн ах / эрэгтэй дүү',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '70924004',
              display: 'Brother (person)',
            },
          ],
        },
      },
      Sister: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Sister',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Төрсөн эгч / эмэгтэй дүү',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '27733009',
              display: 'Sister (person)',
            },
          ],
        },
      },
      PaternalUncle: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Paternal uncle',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Авга ах',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '442041000124107',
              display: 'Paternal uncle (person)',
            },
          ],
        },
      },
      PaternalAunt: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Paternal aunt',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Авга эгч',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '736455007',
              display: 'Paternal aunt (person)',
            },
          ],
        },
      },
      MaternalUncle: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Maternal uncle',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Нагац ах',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '442031000124102',
              display: 'Maternal uncle (person)',
            },
          ],
        },
      },
      MaternalAunt: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Aunt',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Нагац эгч',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '736454006',
              display: 'Maternal aunt (person)',
            },
          ],
        },
      },
      Cousin: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Cousin',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Үеэл',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '55538000',
              display: 'Cousin (person)',
            },
          ],
        },
      },
      NaturalDaughter: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Natural daughter',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Төрсөн охин',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '83420006',
              display: 'Natural daughter (person)',
            },
          ],
        },
      },
      NaturalSon: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Natural son',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Төрсөн хүү',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '113160008',
              display: 'Natural son (person)',
            },
          ],
        },
      },
      Wife: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Wife',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Эхнэр',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '127850001',
              display: 'Wife (person)',
            },
          ],
        },
      },
      Husband: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Husband',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Нөхөр',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '127849001',
              display: 'Husband (person)',
            },
          ],
        },
      },
      SonInLaw: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Son in-law',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хүргэн',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '41795004',
              display: 'Legal son (person)',
            },
          ],
        },
      },
      DaughterInLaw: {
        selectable: true,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Daughter in-law',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Бэр',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '113159003',
              display: 'Legal daughter (person)',
            },
          ],
        },
      },
      Child: {
        selectable: false,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Child',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хүүхэд',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '67822003',
              display: 'Child (person)',
            },
          ],
        },
      },
      Relative: {
        selectable: false,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Relative (person)',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хамаатан',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '125677006',
              display: 'Relative (person)',
            },
          ],
          display: 'Relative (person)',
        },
      },
      Spouse: {
        selectable: false,
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Spouse',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Эхнэр/нөхөр',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '127848009',
              display: 'Spouse (person)',
            },
          ],
        },
      },
    },
    AllergyIntolerance: {
      AllergyToFood: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to food',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хоол хүнсний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '414285001',
              display: 'Allergy to food',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToDairyFoods: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to dairy foods',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Сүү, сүүн бүтээгдэхүүний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '425525006',
              display: 'Allergy to dairy foods',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      NutAllergy: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Nut allergy',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Самарны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '91934008',
              display: 'Allergy to nut',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToPeanut: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to peanut',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Газрын самрын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '91935009',
              display: 'Allergy to peanut',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToWalnut: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to walnut',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хушганы харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '91940001',
              display: 'Allergy to walnut',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToAlmond: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to almond',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Бүйлсний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '712839001',
              display: 'Allergy to almond',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToEdibleEgg: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to edible egg',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Өндөгний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '91930004',
              display: 'Allergy to edible egg',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToCasein: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to casein',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Казейний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '5611000122107',
              display: 'Allergy to casein',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToPotato: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to potato',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Төмсний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '419619007',
              display: 'Allergy to potato',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToCelery: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to celery',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Цоохор майлзын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '712843002',
              display: 'Allergy to celery',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToCarrot: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to carrot',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Луувангийн харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '420080006',
              display: 'Allergy to carrot',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToCitrusFruit: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to citrus fruit',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Цитрус төрлийн жимсний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '418085001',
              display: 'Allergy to citrus fruit',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToAppleJuice: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to apple juice',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Алимны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '418314004',
              display: 'Allergy to apple juice',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToSeafood: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to seafood',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Далайн хүнсний харшилs',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '91937001',
              display: 'Allergy to seafood',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToBean: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to bean',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Шошны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '703925004',
              display: 'Allergy to bean',
            },
          ],
        },
        type: {
          display: 'Allergy to food',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to food',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Хүнсний харшил',
            },
          ],
        },
        category: 'food',
      },
      AllergyToMetal: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to metal',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Металлын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '300915004',
              display: 'Allergy to metal',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'environment',
      },
      AllergicReactionCausedByChemical: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergic reaction caused by chemical',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Химийн бодисын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '419838000',
              display: 'Allergic reaction caused by chemical',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'medication',
      },
      AllergyToDrug: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to drug',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Эмийн бодисын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '416098002',
              display: 'Allergy to drug',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'medication',
      },
      AllergyToPenicillin: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to penicillin',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Пенициллиний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '91936005',
              display: 'Allergy to penicillin',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'medication',
      },
      AllergyToAnesthetic: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to anesthetic',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Мэдээ алдуулах бодисын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '418434002',
              display: 'Allergy to anesthetic',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'medication',
      },
      AllergyToPollen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to pollen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Тоос, тоосонцрын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '300910009',
              display: 'Allergy to pollen',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'environment',
      },
      PhotosensitizationCausedBySun: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Photosensitization caused by sun',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Нарны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '258155009',
              display: 'Photosensitization caused by sun',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'environment',
      },
      AllergyToMold: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to mold',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хөгцний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '419474003',
              display: 'Allergy to mold',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToCosmeticMaterial: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to cosmetic material',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Гоо сайхны бүтээгдэхүүний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '417982003',
              display: 'Allergy to cosmetic material',
            },
          ],
        },
        type: {
          display: 'Allergy to others',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to others',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Бусад харшил',
            },
          ],
        },
        category: 'medication',
      },
      AllergyToAnimalHair: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to animal hair',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Амьтны үс ноосны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '300911008',
              display: 'Allergy to animal hair',
            },
          ],
        },
        type: {
          display: 'Allergy to animals',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to animals',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Амьтны харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToCatDander: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to cat dander',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Муурны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '232346004',
              display: 'Allergy to cat dander',
            },
          ],
        },
        type: {
          display: 'Allergy to animals',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to animals',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Амьтны харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToGuineaPigDander: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to guinea pig dander',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Усан гахайн харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '703928002',
              display: 'Allergy to guinea pig dander',
            },
          ],
        },
        type: {
          display: 'Allergy to animals',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to animals',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Амьтны харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToHorseDander: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to horse dander',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Морьны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '419063004',
              display: 'Allergy to horse dander',
            },
          ],
        },
        type: {
          display: 'Allergy to animals',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to animals',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Амьтны харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToDogDander: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to dog dander',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Нохойны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '419271008',
              display: 'Allergy to dog dander',
            },
          ],
        },
        type: {
          display: 'Allergy to animals',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to animals',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Амьтны харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToInsectProtein: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to insect protein',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Шавжны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '716187007',
              display: 'Allergy to insect protein',
            },
          ],
        },
        type: {
          display: 'Allergy to animals',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to animals',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Амьтны харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToMugwortPollen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Pollen allergy',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Шарилжны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '22481000122100',
              display: 'Allergy to mugwort pollen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToGrassPollen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to grass pollen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Үет ургамлын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '418689008',
              display: 'Allergy to grass pollen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      NettlePollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Nettle pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Халгайн харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411003003',
              display: 'Nettle pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      LambIsQuartersPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Lamb is quarters pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Луулийн харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411001001',
              display: 'Lamb is quarters pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AllergyToDermatophagoidesPteronyssinusProtein: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Allergy to Dermatophagoides pteronyssinus protein',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Тоосны хачиг',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '703933003',
              display: 'Allergy to Dermatophagoides pteronyssinus protein',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      AlderPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Alder pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Моносын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411046000',
              display: 'Alder pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      HazelPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Hazel pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Шид модны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411063001',
              display: 'Hazel pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      OakPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Oak pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Царс модны тоосонцрын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411073004',
              display: 'Oak pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      GrassPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Grass pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Өвсний харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '410986002',
              display: 'Grass pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      RyeGrassPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Rye grass pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хөх тарианы тоосонцрын харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411039009',
              display: 'Rye grass pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      WillowPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Willow pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Бургасны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411088009',
              display: 'Willow pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      PoplarPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Poplar pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Улиасны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411083000',
              display: 'Poplar pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      SilverBirchPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Silver birch pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Хусны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '411084006',
              display: 'Silver birch pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
      EnglishPlantainPollenAllergen: {
        designation: [
          {
            language: 'en',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'English plantain pollen allergen',
          },
          {
            language: 'mn',
            use: {
              system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
              code: 'display',
            },
            value: 'Таван салааны харшил',
          },
        ],
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '410995005',
              display: 'English plantain pollen allergen',
            },
          ],
        },
        type: {
          display: 'Allergy to plants',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Allergy to plants',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://livercenter.mn/fhir/anamnesis-vitae-allergy-intolerance',
                code: 'display',
              },
              value: 'Ургамлын харшил',
            },
          ],
        },
        category: 'biologic',
      },
    },
    SmokingDrinkingSubstanceAbuseHabits: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Smoking/drinking/substance abuse habits',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Хорт зуршлын асуумж',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '108333003',
            display: 'Smoking/drinking/substance abuse habits',
          },
        ],
      },
      include: {
        FindingRelatingToAlcoholDrinkingBehavior: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding relating to alcohol drinking behavior',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Архи уудаг эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '228273003',
                display: 'Finding relating to alcohol drinking behavior',
              },
            ],
          },
          include: {
            LightDrinker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Light drinker',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Бага зэрэг уудаг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '228277002',
                    display: 'Light drinker',
                  },
                ],
              },
            },
            ModerateDrinker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Moderate drinker',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дунд зэрэг уудаг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '43783005',
                    display: 'Moderate drinker',
                  },
                ],
              },
            },
            HeavyDrinker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Heavy drinker',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Их уудаг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '86933000',
                    display: 'Heavy drinker',
                  },
                ],
              },
            },
            OccasionalDrinker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Occasional drinker',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үе үе уудаг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '228276006',
                    display: 'Occasional drinker',
                  },
                ],
              },
            },
            StoppedDrinkingAlcohol: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Stopped drinking alcohol',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Архинаас гарсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '160579004',
                    display: 'Stopped drinking alcohol',
                  },
                ],
              },
            },
            LifetimeNonDrinkerOfAlcohol: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Lifetime non-drinker of alcohol',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Огт ууж байгаагүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '783261004',
                    display: 'Lifetime non-drinker of alcohol',
                  },
                ],
              },
            },
          },
        },
        AlcoholIntake: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Alcohol intake',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэр их хэмжээтэй уудаг вэ?',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '160573003',
                display: 'Alcohol intake',
              },
            ],
          },
        },
        DateOfLastAlcoholIntake: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Date of last alcohol intake',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сүүлийн удаа та хэзээ архи уусан бэ?',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000017',
                display: 'Date of last alcohol intake',
              },
            ],
          },
        },
        DateOfStartedDrinkingAlcohol: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Date of started drinking alcohol',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэзээнээс эхэлж архи уусан бэ?',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000018',
                display: 'Date of started drinking alcohol',
              },
            ],
          },
        },
        LengthOfAlcoholUsingPeriod: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Length of alcohol using period',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэр удаан хугацаанд архи ууж байна вэ?',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000019',
                display: 'Length of alcohol using period',
              },
            ],
          },
        },
        FindingOfTobaccoUseAndExposure: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Finding of tobacco use and exposure',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тамхи татдаг эсэх',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '365980008',
                display: 'Finding of tobacco use and exposure',
              },
            ],
          },
          include: {
            NeverSmokedTobacco: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Never smoked tobacco',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Огт тамхи татдаггүй',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '266919005',
                    display: 'Never smoked tobacco',
                  },
                ],
              },
            },
            ExSmoker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ex-smoker',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Тамхинаас гарсан',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '8517006',
                    display: 'Ex-smoker',
                  },
                ],
              },
            },
            OccasionalTobaccoSmoker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Occasional tobacco smoker',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үе үе татдаг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '428041000124106',
                    display: 'Occasional tobacco smoker',
                  },
                ],
              },
            },
            ModerateSmoker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Moderate smoker (20 or less per day)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Дунд зэрэг татдаг (Өдөрт <20ширхэг)',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '56578002',
                    display: 'Moderate smoker (20 or less per day)',
                  },
                ],
              },
            },
            HeavySmoker: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Heavy smoker (over 20 per day)',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Их татдаг (Өдөрт >20 ширхэг)',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '56771006',
                    display: 'Heavy smoker (over 20 per day)',
                  },
                ],
              },
            },
            UserOfSmokelessTobacco: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'User of smokeless tobacco',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Утаагүй тамхи татдаг',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '713914004',
                    display: 'User of smokeless tobacco',
                  },
                ],
              },
            },
          },
        },
        AgeAtStartingSmoking: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Age at starting smoking',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэдэн наснаас эхэлж татсан бэ?',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '228488005',
                display: 'Age at starting smoking',
              },
            ],
          },
        },
        NumberOfYearsSmoking: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of years smoking',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэдэн жил татаж байгаа вэ?',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000020',
                display: 'Number of years smoking',
              },
            ],
          },
        },
        NumberOfCigarettes: {
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Number of cigarettes',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хэр их хэмжээтэй тамхи татдаг вэ?',
            },
          ],
          code: {
            coding: [
              {
                system: 'http://livercenter.mn/fhir/Anamnesis',
                code: '10000021',
                display: 'Number of cigarettes',
              },
            ],
          },
        },
      },
    },
    MedicationRequest: {
      include: {
        DosageInstruction: {
          include: {
            TopicalRoute: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Topical route',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Арьс салстаар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '6064005',
                    display: 'Topical route',
                  },
                ],
              },
            },
            AuricularUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Auricular use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Чихэнд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '10547007',
                    display: 'Auricular use',
                  },
                ],
              },
            },
            OralUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Oral use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Амаар уух',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '26643006',
                    display: 'Oral use',
                  },
                ],
              },
            },
            SCUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'SC use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Арьсан дор',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '34206005',
                    display: 'SC use',
                  },
                ],
              },
            },
            RectalUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Rectal use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Шулуун гэдсээр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '37161004',
                    display: 'Rectal use',
                  },
                ],
              },
            },
            SublingualUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Sublingual use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хэлэн дор',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '37839007',
                    display: 'Sublingual use',
                  },
                ],
              },
            },
            NasalUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Nasal use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Хамарт',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '46713006',
                    display: 'Nasal use',
                  },
                ],
              },
            },
            IntravenousUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Intravenous use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Венийн судсанд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '47625008',
                    display: 'Intravenous use',
                  },
                ],
              },
            },
            OphthalmicUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Ophthalmic use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Нүдэнд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '54485002',
                    display: 'Ophthalmic use',
                  },
                ],
              },
            },
            IntraArterialUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Intra-arterial use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Артерийн судсанд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '58100008',
                    display: 'Intra-arterial use',
                  },
                ],
              },
            },
            IntrauterineRoute: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Intrauterine route',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Үтрээгээр',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '62226000',
                    display: 'Intrauterine route',
                  },
                ],
              },
            },
            IntramuscularUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Intramuscular use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Булчинд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '78421000',
                    display: 'Intramuscular use',
                  },
                ],
              },
            },
            GingivalUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Gingival use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Буйланд',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '372457001',
                    display: 'Gingival use',
                  },
                ],
              },
            },
            OromucosalUse: {
              designation: [
                {
                  language: 'en',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Oromucosal use',
                },
                {
                  language: 'mn',
                  use: {
                    system:
                      'http://terminology.hl7.org/CodeSystem/designation-usage',
                    code: 'display',
                  },
                  value: 'Амны салстаар',
                },
              ],
              code: {
                coding: [
                  {
                    system: 'http://snomed.info/sct',
                    code: '372473007',
                    display: 'Oromucosal use',
                  },
                ],
              },
            },
          },
        },
      },
    },
    Immunization: {
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Immunization',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Дархлаажуулалтын байдал',
        },
      ],
      code: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '304250009',
            display: 'Immunization status',
          },
        ],
      },
      include: {
        // ImmunizationStatus: {
        //   designation: [
        //     {
        //       language: 'en',
        //       use: {
        //         system:
        //           'http://terminology.hl7.org/CodeSystem/designation-usage',
        //         code: 'display',
        //       },
        //       value: 'Immunization status',
        //     },
        //     {
        //       language: 'mn',
        //       use: {
        //         system:
        //           'http://terminology.hl7.org/CodeSystem/designation-usage',
        //         code: 'display',
        //       },
        //       value: 'Вакцин хийлгэсэн эсэх',
        //     },
        //   ],
        //   code: {
        //     coding: [
        //       {
        //         system: 'http://snomed.info/sct',
        //         code: '304250009',
        //         display: 'Immunization status',
        //       },
        //     ],
        //
        //   },
        // },
        BCG: {
          display: 'BCG',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '19',
                display: 'BCG',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'BCG',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сүрьеэ (БЦЖ)',
            },
          ],
          type: {
            display: 'Mandatory',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Товлолт',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Mandatory',
              },
            ],
          },
        },
        HepBAdolescentHighRiskInfant: {
          display: 'Hep B, adolescent/high risk infant',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '42',
                display: 'Hep B, adolescent/high risk infant',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hep B, adolescent/high risk infant',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'В Гепатит',
            },
          ],
          type: {
            display: 'Mandatory',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Товлолт',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Mandatory',
              },
            ],
          },
        },
        IPV: {
          display: 'IPV',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '10',
                display: 'IPV',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'IPV',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Халдварт саа',
            },
          ],
          type: {
            display: 'Mandatory',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Товлолт',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Mandatory',
              },
            ],
          },
        },
        DTPHibHepB: {
          display: 'DTP-Hib-Hep B',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '102',
                display: 'DTP-Hib-Hep B',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'DTP-Hib-Hep B',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value:
                'Тавт (Сахуу, хөхүүл ханиад, татран, В гепатит, хемофилус инфлюнза В)',
            },
          ],
          type: {
            display: 'Mandatory',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Товлолт',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Mandatory',
              },
            ],
          },
        },
        MMR: {
          display: 'MMR',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '3',
                display: 'MMR',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'MMR',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гуравт (улаан бүрхан, гахайн хавдар, улаанууд)',
            },
          ],
          type: {
            display: 'Mandatory',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Товлолт',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Mandatory',
              },
            ],
          },
        },
        DT: {
          display: 'DT (pediatric)',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '28',
                display: 'DT (pediatric)',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'DT (pediatric)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хоёрт (Сахуу, татран)',
            },
          ],
          type: {
            display: 'Mandatory',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Товлолт',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Mandatory',
              },
            ],
          },
        },
        HepA: {
          display: 'Hep A, ped/adol, 2 dose',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '28',
                display: 'Hep A, ped/adol, 2 dose',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hep A, ped/adol, 2 dose',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'А гепатит',
            },
          ],
          type: {
            display: 'Mandatory',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Товлолт',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Mandatory',
              },
            ],
          },
        },
        HepBAdult: {
          display: 'Hep B, adult',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '43',
                display: 'Hep B, adult',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hep B, adult',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'В вируст гепатитын эсрэг вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        HepAAdult: {
          display: 'Hep A, adult',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '52',
                display: 'Hep A, adult',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hep A, adult',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'А вируст гепатитын эсрэг вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        MeningococcalUnknownSerogroups: {
          display: 'Meningococcal, unknown serogroups',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '167',
                display: 'Meningococcal, unknown serogroups',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Meningococcal, unknown serogroups',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Менингококкт халдварын эсрэг вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        InfluenzaUnspecifiedFormulation: {
          display: 'Influenza, unspecified formulation',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '88',
                display: 'Influenza, unspecified formulation',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Influenza, unspecified formulation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Томуугийн вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        Plague: {
          display: 'Plague',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '23',
                display: 'Plague',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Plague',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Тарваган тахлын вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        Anthrax: {
          display: 'Anthrax',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '24',
                display: 'Anthrax',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Anthrax',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Боомын вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        AnthraxImmuneGlobulin: {
          display: 'Anthrax immune globulin',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '181',
                display: 'Anthrax immune globulin',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Anthrax immune globulin',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Боомын иммуноглобулин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        TetanusImmuneGlobulin: {
          display: 'Tetanus immune globulin',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '180',
                display: 'Tetanus immune globulin',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Tetanus immune globulin',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Татрангийн ийлдэс',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        RabiesUnspecifiedFormulation: {
          display: 'Rabies, unspecified formulation',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '90',
                display: 'Rabies, unspecified formulation',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Rabies, unspecified formulation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Галзуугийн вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        RabiesIntramuscularInjection: {
          display: 'Rabies, intramuscular injection',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '18',
                display: 'Rabies, intramuscular injection',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Rabies, intramuscular injection',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Галзуугийн иммуноглобулин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        Vaccinia: {
          display: 'Vaccinia (smallpox)',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '75',
                display: 'Vaccinia (smallpox)',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Vaccinia (smallpox)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Салхин цэцгийн вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        YellowFever: {
          display: 'Yellow fever',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '37',
                display: 'Yellow fever',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Yellow fever',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Шар чичрэгийн вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        TyphoidUnspecifiedFormulation: {
          display: 'Typhoid, unspecified formulation',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '91',
                display: 'Typhoid, unspecified formulation',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Typhoid, unspecified formulation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гэдэсний балнадын вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        PneumococcalUnspecifiedFormulation: {
          display: 'Pneumococcal, unspecified formulation',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '109',
                display: 'Pneumococcal, unspecified formulation',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Pneumococcal, unspecified formulation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Пневмококкийн эсрэг вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        TickBorneEncephalitis: {
          display: 'Tick-borne encephalitis',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '77',
                display: 'Tick-borne encephalitis',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Tick-borne encephalitis',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хачигт энцефалитийн эсрэг вакцин',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
        HPVUnspecifiedFormulation: {
          display: 'HPV, unspecified formulation',
          code: {
            coding: [
              {
                system: 'http://hl7.org/fhir/sid/cvx',
                code: '137',
                display: 'HPV, unspecified formulation',
              },
            ],
          },
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'HPV, unspecified formulation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Паппилома',
            },
          ],
          type: {
            display: 'Voluntary',
            designation: [
              {
                language: 'mn',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Сайн дурын',
              },
              {
                language: 'en',
                use: {
                  sysyem:
                    'http://terminology.hl7.org/CodeSystem/designation-usage',
                  code: 'display',
                },
                value: 'Voluntary',
              },
            ],
          },
        },
      },
    },
  },
}

module.exports = AnamnesisVitae
