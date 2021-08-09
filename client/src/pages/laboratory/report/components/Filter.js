import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { Row, Form, Button, Col } from 'antd'
import styles from '../../../reception/report/components/Filter.less'
import { resolveDisplay } from 'utils/valuesets'
import FilterItem from './FilterItem'
import moment from 'moment'

const Filter = props => {
  const { form, i18n, startDate, endDate, app } = props
  const { getFieldDecorator } = form
  const { FHIR_CODES, LabTests } = app
  const { SpecimenConditions } = FHIR_CODES

  const [doctors, setDoctors] = useState()

  const [filterTypes, setFilterTypes] = useState({
    specimenCondition: {
      code: 'specimenCondition',
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Specimen condition',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Сорьцын төлөв',
        },
      ],
      include: {
        sampleHemolyzed: {
          code: SpecimenConditions.SampleHemolyzed,
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sample hemolyzed',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гемолиз',
            },
          ],
        },
        sampleMilky: {
          code: SpecimenConditions.SampleMilky,
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sample milky',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хелеоз',
            },
          ],
        },
        sampleLeaked: {
          code: SpecimenConditions.SampleLeaked,
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sample leaked',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Асгарсан',
            },
          ],
        },
        sampleInadequate: {
          code: SpecimenConditions.SampleInadequate,
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sample inadequate',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сорьц хэмжээ бага',
            },
          ],
        },
        other: {
          code: SpecimenConditions.Other,
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
        },
      },
    },
    referenceRange: {
      code: 'referenceRange',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Reference range',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Лавлах утга',
        },
      ],
      include: {
        higherThanReferenceRange: {
          code: 'higherThanReferenceRange',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Higher than reference range',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ихсэлттэй хариу',
            },
          ],
        },
        lowerThanReferenceRange: {
          code: 'lowerThanReferenceRange',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Lower than reference range',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Багасалттай хариу',
            },
          ],
        },
        normal: {
          code: 'normal',
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
              value: 'Хэвийн хариу',
            },
          ],
        },
      },
    },
    ageCategory: {
      code: 'ageCategory',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Age category',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Насны ангилал',
        },
      ],
      include: {
        adult: {
          code: 'adult',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Adult',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Насанд хүрэгчид',
            },
          ],
        },
        child: {
          code: 'child',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Child',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хүүхэд',
            },
          ],
        },
      },
    },
  })

  const components = {
    // specimenType: {
    //   code: 'specimenType',
    //   designation: [
    //     {
    //       language: 'en',
    //       use: {
    //         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
    //         code: 'display',
    //       },
    //       value: 'Specimen type',
    //     },
    //     {
    //       language: 'mn',
    //       use: {
    //         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
    //         code: 'display',
    //       },
    //       value: 'Сорьцын төрөл',
    //     },
    //   ],
    //   inlcude: {
    //     // localBillList: {
    //     //   code: 'localBill',
    //     //   designation: [
    //     //     {
    //     //       language: 'en',
    //     //       use: {
    //     //         system:
    //     //           'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //         code: 'display',
    //     //       },
    //     //       value: 'Local bill',
    //     //     },
    //     //     {
    //     //       language: 'mn',
    //     //       use: {
    //     //         system:
    //     //           'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //         code: 'display',
    //     //       },
    //     //       value: 'Дотоод тооцоо',
    //     //     },
    //     //   ],
    //     //   include: {
    //     //     gegeenBulag: {
    //     //       code: 'gegeenBulag',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Gegeen bulag',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Гэгээн булаг',
    //     //         },
    //     //       ],
    //     //     },
    //     //     ninjAchlal: {
    //     //       code: 'ninjAchlal',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Ninj achlal',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Нинж ачлал',
    //     //         },
    //     //       ],
    //     //     },
    //     //     galKharnuud: {
    //     //       code: 'galKharnuud',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Gal kharnuud',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Гал харнууд',
    //     //         },
    //     //       ],
    //     //     },
    //     //     sutainGurvanKhuld: {
    //     //       code: 'sutainGurvanKhuld',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Sutain gurvan khuld',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Сутайн Гурван хулд',
    //     //         },
    //     //       ],
    //     //     },
    //     //     onomFoundation: {
    //     //       code: 'onomFoundation',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Onom foundation',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Оном сан',
    //     //         },
    //     //       ],
    //     //     },
    //     //     onomSchool: {
    //     //       code: 'onomSchool',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Onom school',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Оном сургууль',
    //     //         },
    //     //       ],
    //     //     },
    //     //     dobuTechnology: {
    //     //       code: 'dobuTechnology',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Dobu technology',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Добу технологи',
    //     //         },
    //     //       ],
    //     //     },
    //     //   },
    //     // },
    //     // researchPurposeList: {
    //     //   code: 'researchPurpose',
    //     //   designation: [
    //     //     {
    //     //       language: 'en',
    //     //       use: {
    //     //         system:
    //     //           'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //         code: 'display',
    //     //       },
    //     //       value: 'Research purpose',
    //     //     },
    //     //     {
    //     //       language: 'mn',
    //     //       use: {
    //     //         system:
    //     //           'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //         code: 'display',
    //     //       },
    //     //       value: 'Судалгаа',
    //     //     },
    //     //   ],
    //     //   include: {
    //     //     dLiverStudy: {
    //     //       code: 'dLiverStudy',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'D liver study',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'D liver study',
    //     //         },
    //     //       ],
    //     //     },
    //     //     nonHodgkinLymphoma: {
    //     //       code: 'nonHodgkinLymphoma',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Non hodgkin lymphoma',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Non hodgkin lymphoma',
    //     //         },
    //     //       ],
    //     //     },
    //     //     il28b: {
    //     //       code: 'il28b',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'IL28-B',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'IL28-B',
    //     //         },
    //     //       ],
    //     //     },
    //     //     verticalTransmission: {
    //     //       code: 'verticalTransmission',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Vertical transmission',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Vertical transmission',
    //     //         },
    //     //       ],
    //     //     },
    //     //     rapidTestSpecific: {
    //     //       code: 'rapidTestSpecific',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Rapid Test specific',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Rapid Test specific',
    //     //         },
    //     //       ],
    //     //     },
    //     //     hepatitisDSexualTrans: {
    //     //       code: 'hepatitisDSexualTrans',
    //     //       designation: [
    //     //         {
    //     //           language: 'en',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Hepatitis D sexual trans',
    //     //         },
    //     //         {
    //     //           language: 'mn',
    //     //           use: {
    //     //             system:
    //     //               'http://terminology.hl7.org/CodeSystem/designation-usage',
    //     //             code: 'display',
    //     //           },
    //     //           value: 'Hepatitis D sexual trans',
    //     //         },
    //     //       ],
    //     //     },
    //     //   },
    //     // },
    //   },
    // },
    //Дараа хэрэг болж магадгүй
  }

  const FilterTypesSecond = {
    testTypeList: {
      code: 'testType',
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Test type',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Шинжилгээний төрөл',
        },
      ],
      include: {
        biochemistry: {
          code: LabTests.BiochemistryTests,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Biochemistry',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Biochemistry',
            },
          ],
        },
        immunology: {
          code: LabTests.ImmunologyTests,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Immunology',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Immunology',
            },
          ],
        },
        Anti_HDV: {
          code: LabTests.Anti_HDV,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Anti_HDV',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Anti_HDV',
            },
          ],
        },
        Coagulation: {
          code: LabTests.Coagulation,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Coagulation',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Coagulation',
            },
          ],
        },
        Ferritin: {
          code: LabTests.Ferritin,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Ferritin',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Ferritin',
            },
          ],
        },
        HBV_DNA: {
          code: LabTests.HBV_DNA,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'HBV_DNA',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'HBV_DNA',
            },
          ],
        },
        HCV_RNA: {
          code: LabTests.HCV_RNA,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'HCV_RNA',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'HCV_RNA',
            },
          ],
        },
        HDV_RNA: {
          code: LabTests.HDV_RNA,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'HDV_RNA',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'HDV_RNA',
            },
          ],
        },
        HIV_RNA: {
          code: LabTests.HIV_RNA,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'HIV_RNA',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'HIV_RNA',
            },
          ],
        },
        HPV: {
          code: LabTests.HPV,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'HPV',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'HPV',
            },
          ],
        },
        Hematology: {
          code: LabTests.Hematology,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Hematology',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Hematology',
            },
          ],
        },
        RapidTests: {
          code: LabTests.RapidTests,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'RapidTests',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'RapidTests',
            },
          ],
        },
        Vitamin_D3: {
          code: LabTests.Vitamin_D3,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Vitamin_D3',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Vitamin_D3',
            },
          ],
        },
        Genotype: {
          code: LabTests.Genotype,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Genotype',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Genotype',
            },
          ],
        },
        ESR: {
          code: LabTests.ESR,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'ESR',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'ESR',
            },
          ],
        },
        Urinalysis: {
          code: LabTests.Urinalysis,
          designation: [
            {
              language: 'en',
              use: {
                code: 'display',
              },
              value: 'Urinalysis',
            },
            {
              language: 'mn',
              use: {
                code: 'display',
              },
              value: 'Urinalysis',
            },
          ],
        },
      },
    },
  }

  async function fetchPractitionerList() {
    return props.dispatch({
      type: 'report/queryPractitionerList',
    })
  }

  useEffect(() => {
    fetchPractitionerList().then(result => {
      setDoctors(result)

      const include = {}

      result.forEach(resultItem => {
        include[resultItem.id] = {
          code: resultItem.id,
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: resultItem.getOfficialNameString({ short: true }),
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: resultItem.getOfficialNameString({ short: true }),
            },
          ],
        }
      })

      const newFilterTypes = {
        labTechnicians: {
          code: 'labTechnicians',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'labTechnicians',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Лабораторийн эмч',
            },
          ],
          include: include,
        },
        ...filterTypes,
      }

      setFilterTypes(newFilterTypes)
    })
  }, [])

  const handleSearchFilter = () => {
    form.validateFields().then(formValues => {
      return props.dispatch({
        type: 'report/queryFilteredList',
        payload: {
          formValues: formValues,
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
        },
      })
    })
  }

  const handleCancelFilter = () => {}
  return (
    <div>
      <Form>
        <Row gutter={12}>
          {' '}
          {Object.values(filterTypes).map(filterType => {
            const filterTitle = resolveDisplay(filterType, i18n._language)
            return (
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator(`${filterType.code}`, {
                    rules: [{ required: false }],
                  })(
                    <FilterItem
                      filterTypeList={filterType.include}
                      title={filterTitle}
                      name={filterType.code}
                      bordered
                      active
                      disabled={filterType.disabled}
                    />
                  )}
                </Form.Item>
              </Col>
            )
          })}
        </Row>
        <br />
        <Row gutter={12}>
          {' '}
          {Object.values(FilterTypesSecond).map(filterType => {
            const filterTitle = resolveDisplay(filterType, i18n._language)
            return (
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator(`${filterType.code}`, {
                    rules: [{ required: false }],
                  })(
                    <FilterItem
                      filterTypeList={filterType.include}
                      title={filterTitle}
                      name={filterType.code}
                      bordered
                    />
                  )}
                </Form.Item>
              </Col>
            )
          })}
          <Col span={12}>
            <Button
              className={styles.cancelButton}
              onClick={handleCancelFilter}
              display="block"
            >
              <Trans>CancelSelectedFilter</Trans>
            </Button>
            <Button
              className={styles.searchButton}
              onClick={handleSearchFilter}
            >
              <Trans>SearchBySelectedFilter</Trans>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

Filter.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ app, loading, report }) => ({
  app,
  loading,
  report,
}))(withI18n()(Form.create()(Filter)))
