import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Button } from 'antd'
import { resolveDisplay } from 'utils/valuesets'
import styles from '../styles.less'
import FilterItem from './FilterItem'
import moment from 'moment'

const Filter = props => {
  const { form, app, i18n } = props
  const { LabTests } = app
  const { getFieldDecorator } = form

  const FilterTypesFirstRow = {
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
    toolRemain: {
      disabled: true,
      code: 'toolRemain',
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Tool Remain',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Хэрэгслийн үлдэгдэл',
        },
      ],
      include: {
        nurseKit: {
          code: 'nurseKit',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Nurse Kit',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сувилагчийн багц',
            },
          ],
        },
        exposureKit: {
          code: 'exposureKit',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Exposure Kit',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Өртөлтийн багц',
            },
          ],
        },
        firstAidKit: {
          code: 'firstAidKit',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'First Aid Kit',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Анхны тусламжийн багц',
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
          value: 'Age Category',
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
              value: 'хүүхэд',
            },
          ],
        },
      },
    },
    specimenCondition: {
      code: 'specimenCondition',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Specimen Condition',
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
        researchSpecimen: {
          code: 'researchSpecimen',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Research Specimen',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Судалгааны сорьц',
            },
          ],
        },
        cancelledSpecimen: {
          code: 'cancelledSpecimen',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Cancelled Specimen',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Цуцлагдсан сорьц',
            },
          ],
        },
        additionalSpecimen: {
          code: 'additionalSpecimen',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Additional Specimen',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Нэмэгдэл цус авсан',
            },
          ],
        },
        returnedSpecimen: {
          code: 'returnedSpecimen',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Returned Specimen',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Буцаагдсан сорьц',
            },
          ],
        },
        cito: {
          code: 'cito',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Cito',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Cito',
            },
          ],
        },
      },
    },
    timeCategory: {
      code: 'timeCategory',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Time Category',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Цагийн ангилал',
        },
      ],
      include: {
        untilTwelve: {
          code: 'untilTwelve',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'untill 12:30',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: '12:30 хүртэл',
            },
          ],
        },
        untilFive: {
          code: 'untilFive',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'until 17:00',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: '17:00 хүртэл',
            },
          ],
        },
      },
    },
  }

  const handleSearchFilter = () => {
    form.validateFields().then(formValues => {
      return props.onChange(formValues)
    })
  }
  return (
    <div>
      <Form>
        <Row gutter={12}>
          {Object.values(FilterTypesFirstRow).map(filterType => {
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
                      disabled={filterType.disabled}
                    />
                  )}
                </Form.Item>
              </Col>
            )
          })}
          <Col span={12}>
            <Button
              className={styles.cancelButton}
              // onClick={handleCancelFilter}
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
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, report, loading }) => ({
  app,
  report,
  loading,
}))(withI18n()(Form.create()(Filter)))
