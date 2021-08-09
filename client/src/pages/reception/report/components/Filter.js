import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { Row, Form, Button, Col } from 'antd'
import styles from './Filter.less'
import { resolveDisplay } from 'utils/valuesets'
import FilterItem from './FilterItem'
import moment from 'moment'

const Filter = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form
  const [allChecked, setAllChecked] = useState(false)

  const FilterTypesFirstRow = {
    serviceTypeList: {
      code: 'serviceType',
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Service type',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Үйлчилгээний төрөл',
        },
      ],
      include: {
        consultation: {
          code: 'consultation',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'consultation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эмчийн үзлэг',
            },
          ],
        },
        laboratoryTest: {
          code: 'laboratoryTest',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Laboratory test',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Лабораторийн шинжилгээ',
            },
          ],
        },
        diagnosticTest: {
          code: 'diagnosticTest',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Diagnostic test',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Багажийн шинжилгээ',
            },
          ],
        },
        packageOfService: {
          code: 'packageOfService',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Package of services',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Багц үйлчилгээ',
            },
          ],
        },
      },
    },
    localBillList: {
      code: 'localBill',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Local bill',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Дотоод тооцоо',
        },
      ],
      include: {
        gegeenBulag: {
          code: 'gegeenBulag',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Gegeen bulag',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гэгээн булаг',
            },
          ],
        },
        ninjAchlal: {
          code: 'ninjAchlal',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ninj achlal',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Нинж ачлал',
            },
          ],
        },
        galKharnuud: {
          code: 'galKharnuud',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Gal kharnuud',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Гал харнууд',
            },
          ],
        },
        sutainGurvanKhuld: {
          code: 'sutainGurvanKhuld',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sutain gurvan khuld',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Сутайн Гурван хулд',
            },
          ],
        },
        onomFoundation: {
          code: 'onomFoundation',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Onom foundation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Оном сан',
            },
          ],
        },
        onomSchool: {
          code: 'onomSchool',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Onom school',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Оном сургууль',
            },
          ],
        },
        dobuTechnology: {
          code: 'dobuTechnology',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Dobu technology',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Добу технологи',
            },
          ],
        },
      },
    },
    researchPurposeList: {
      code: 'researchPurpose',
      // disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Research purpose',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Судалгаа',
        },
      ],
      include: {
        Sars_Cov2: {
          code: 'Sars_Cov2',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sars Cov2',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Sars Cov2',
            },
          ],
        },
        dLiverStudy: {
          code: 'dLiverStudy',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'D liver study',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'D liver study',
            },
          ],
        },

        nonHodgkinLymphoma: {
          code: 'nonHodgkinLymphoma',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Non hodgkin lymphoma',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Non hodgkin lymphoma',
            },
          ],
        },
        il28b: {
          code: 'il28b',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'IL28-B',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'IL28-B',
            },
          ],
        },
        verticalTransmission: {
          code: 'verticalTransmission',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Vertical transmission',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Vertical transmission',
            },
          ],
        },
        rapidTestSpecific: {
          code: 'rapidTestSpecific',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Rapid Test specific',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Rapid Test specific',
            },
          ],
        },
        hepatitisDSexualTrans: {
          code: 'hepatitisDSexualTrans',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hepatitis D sexual trans',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Hepatitis D sexual trans',
            },
          ],
        },
      },
    },
    discountWorkerList: {
      code: 'discountWorkerList',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Discount worker',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Хөнгөлт ажилчид',
        },
      ],
      include: {
        familyOfEmployee: {
          code: 'familyOfEmployee',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Family of employee (30% of discount)',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Ажилтны гэр бүл 30%',
            },
          ],
        },
        employeeWithLiverProblem: {
          code: 'employeeWithLiverProblem',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Employee with liver problem',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Элэгний асуудалтай ажилтан',
            },
          ],
        },
        preventiveExamination: {
          code: 'preventiveExamination',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Preventive examination',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Урьдчилан сэргийлэх үзлэг',
            },
          ],
        },
      },
    },
  }

  const FilterTypesSecondRow = {
    discountCustomerList: {
      code: 'discountCustomer',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Discount customer',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Хөнгөлөлт үйлчлүүлэгч',
        },
      ],
      include: {
        regularCustomer: {
          code: 'regularCustomer',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Regular customer',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Байнгын үйлчлүүлэгч',
            },
          ],
        },
        followUpPatient: {
          code: 'followUpPatient',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Follow up patient',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Хяналтын үйлчлүүлэгч',
            },
          ],
        },
        giftCard: {
          code: 'giftCard',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Gift card',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Бэлгийн карт',
            },
          ],
        },
        coupon: {
          code: 'coupon',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Coupon',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эрхийн бичиг',
            },
          ],
        },
      },
    },
    specialDiscountTypeList: {
      code: 'specialDiscountType',
      disabled: true,
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Special discount type',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Тусгай хөнгөлөлт',
        },
      ],
      include: {
        laboratory: {
          code: 'laboratory',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Laboratory',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Лаборатори',
            },
          ],
        },
        diagnostic: {
          code: 'diagnostic',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Diagnostic',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Багаж',
            },
          ],
        },
        consultation: {
          code: 'consultation',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'consultation',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Эмчийн үзлэг',
            },
          ],
        },
      },
    },
    paymentMethodList: {
      code: 'paymentMethodList',
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Payment method',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Төлбөрийн хэлбэр',
        },
      ],
      include: {
        inCash: {
          code: 'inCash',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'In cash',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Бэлэн мөнгөөр',
            },
          ],
        },
        byCredit: {
          code: 'byCredit',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'By credit',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Бэлэн бус, банкны картаар',
            },
          ],
        },
      },
    },
    registeredReceptionList: {
      code: 'registeredReception',
      designation: [
        {
          language: 'en',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Registered reception',
        },
        {
          language: 'mn',
          use: {
            system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
            code: 'display',
          },
          value: 'Мэдээллийн ажилтан',
        },
      ],
      include: {
        zolzaya: {
          code: 'zolzaya',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Zolzaya.D',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Д.ЗОЛЗАЯА',
            },
          ],
        },
        munkhZaya: {
          code: 'munkhZaya',
          designation: [
            {
              language: 'en',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'Munkhzaya.M',
            },
            {
              language: 'mn',
              use: {
                system:
                  'http://terminology.hl7.org/CodeSystem/designation-usage',
                code: 'display',
              },
              value: 'М.МӨНХЗАЯА',
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

  const handleCancelFilter = () => {
    setAllChecked(false)
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
                      checked={allChecked}
                    />
                  )}
                </Form.Item>
              </Col>
            )
          })}
        </Row>
        <Row gutter={12}>
          {' '}
          {Object.values(FilterTypesSecondRow).map(filterType => {
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
                      checked={allChecked}
                    />
                  )}
                </Form.Item>
              </Col>
            )
          })}
        </Row>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
        >
          <Col span={6}>
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
        </div>
      </Form>
    </div>
  )
}

Filter.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, report, loading }) => ({
  app,
  report,
  loading,
}))(withI18n()(Form.create()(Filter)))
