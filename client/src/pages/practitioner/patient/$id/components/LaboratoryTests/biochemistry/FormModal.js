import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Collapse, DatePicker } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  OrganizationPicker,
  EmptyTestItem,
  Seperator,
  BorderlessCollapse,
} from 'components'
import { isEmptyObject } from 'utils/helper'

const { Panel } = Collapse

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const formItemLayout = {
  labelCol: {
    sm: { span: 0 },
  },
  wrapperCol: {
    sm: { span: 24 },
  },
}

const FormModal = props => {
  const { getFieldDecorator } = props.form
  const { BiochemistryTests } = props.app.FHIR_CODES
  const BiochemistryInclude = BiochemistryTests.include

  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit = () => {
    setSubmitLoading(true)

    return props.form
      .validateFields()
      .then(values => {
        const {
          regulatoryNotes,
          issuedDate,
          organizationReference,
          ...testResult
        } = values

        let valueFound = false
        const valueQuanitities = {}

        Object.keys(BiochemistryInclude).forEach(testKey => {
          if (!valueQuanitities[testKey]) {
            valueQuanitities[testKey] = {
              ...BiochemistryInclude[testKey],
              include: {},
            }
          }

          Object.keys(BiochemistryInclude[testKey].include).forEach(
            subTestKey => {
              if (
                testResult[testKey]['include'][subTestKey] !== undefined ||
                testResult[testKey]['include'][subTestKey] !== ''
              ) {
                valueFound = true
                const testResultValue =
                  testResult[testKey]['include'][subTestKey]

                if (
                  !!testResultValue &&
                  testResultValue !== '' &&
                  !isNaN(parseFloat(testResultValue))
                ) {
                  const { referenceRange, unit } = BiochemistryInclude[testKey][
                    'include'
                  ][subTestKey]

                  valueQuanitities[testKey]['include'][subTestKey] = {
                    valueQuantity: {
                      value: parseFloat(testResultValue),
                      unit: unit ? unit : undefined,
                    },
                  }
                }
              }
            }
          )

          if (isEmptyObject(valueQuanitities[testKey]['include'])) {
            delete valueQuanitities[testKey]
          }
        })

        if (!valueFound) {
          throw new Error('No result available')
        }

        const payload = {
          testCode: BiochemistryTests,
          testResult: valueQuanitities,
          regulatoryNotes: regulatoryNotes,
          organizationReference: organizationReference,
          issuedDate: issuedDate,
          patient: props.practitioner_patient_profile.patient,
          observationStatus: 'final',
          diagnosticReportStatus: 'final',
        }

        return props.dispatch({
          type: 'app/saveLabResultLevel2',
          payload: payload,
        })
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => props.onError(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      closable={false}
      width="70vw"
      footer={[
        <Button className="button-gray uppercase" onClick={props.onCancel}>
          <Trans id={'Cancel'} />
        </Button>,
        <ConfirmModal
          {...{
            showButtonProps: {
              className: 'button-red uppercase',
              // disabled: !formComplete,
            },
            title: <Trans id="Are you sure?" />,
            showButtonText: (
              <span>
                &nbsp;&nbsp;
                <Trans id="Save" />
              </span>
            ),
            onConfirm: onSubmit,
            loading: submitLoading,
          }}
        />,
      ]}
    >
      <ModuleBox title={Title}>
        <Form
          colon={false}
          {...formItemLayout}
          labelAlign="left"
          hideRequiredMark
        >
          <Row>
            <Col span={12}>
              <BorderlessCollapse bordered={false}>
                <Panel
                  key="1"
                  header={BiochemistryInclude.Liver_Function_test.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      BiochemistryInclude.Liver_Function_test.include
                    ).map(testKey => {
                      let test
                      try {
                        test =
                          BiochemistryInclude.Liver_Function_test.include[
                            testKey
                          ]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Liver_Function_test.include.${testKey}`,
                              {
                                rules: [{ required: false }],
                              }
                            )(
                              <EmptyTestItem
                                patient={
                                  props.practitioner_patient_profile.patient
                                }
                                test={test}
                                disabled={false}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Row>
                </Panel>

                <Panel
                  key="2"
                  header={BiochemistryInclude.Electrolytes.display}
                >
                  <Row gutter={18}>
                    {Object.keys(BiochemistryInclude.Electrolytes.include).map(
                      testKey => {
                        let test

                        try {
                          test =
                            BiochemistryInclude.Electrolytes.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Electrolytes.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <EmptyTestItem
                                  patient={
                                    props.practitioner_patient_profile.patient
                                  }
                                  test={test}
                                  disabled={false}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Row>
                </Panel>

                <Panel
                  key="3"
                  header={BiochemistryInclude.Rheumatology.display}
                >
                  <Row gutter={18}>
                    {Object.keys(BiochemistryInclude.Rheumatology.include).map(
                      testKey => {
                        let test

                        try {
                          test =
                            BiochemistryInclude.Rheumatology.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Rheumatology.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <EmptyTestItem
                                  patient={
                                    props.practitioner_patient_profile.patient
                                  }
                                  test={test}
                                  disabled={false}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Row>
                </Panel>

                <Panel
                  key="4"
                  header={BiochemistryInclude.Diabetes_Test.display}
                >
                  <Row gutter={18}>
                    {Object.keys(BiochemistryInclude.Diabetes_Test.include).map(
                      testKey => {
                        let test

                        try {
                          test =
                            BiochemistryInclude.Diabetes_Test.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Diabetes_Test.include.${testKey}`,
                                { rules: [{ required: false }] }
                              )(
                                <EmptyTestItem
                                  patient={
                                    props.practitioner_patient_profile.patient
                                  }
                                  test={test}
                                  disabled={false}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Row>
                </Panel>

                <Panel
                  key="5"
                  header={BiochemistryInclude.Pancreas_Function_test.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      BiochemistryInclude.Pancreas_Function_test.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          BiochemistryInclude.Pancreas_Function_test.include[
                            testKey
                          ]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Pancreas_Function_test.include.${testKey}`,
                              {
                                rules: [{ required: false }],
                              }
                            )(
                              <EmptyTestItem
                                patient={
                                  props.practitioner_patient_profile.patient
                                }
                                test={test}
                                disabled={false}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Row>
                </Panel>

                <Panel
                  key="6"
                  header={BiochemistryInclude.Kidney_Function_Test.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      BiochemistryInclude.Kidney_Function_Test.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          BiochemistryInclude.Kidney_Function_Test.include[
                            testKey
                          ]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Kidney_Function_Test.include.${testKey}`,
                              {
                                rules: [{ required: false }],
                              }
                            )(
                              <EmptyTestItem
                                patient={
                                  props.practitioner_patient_profile.patient
                                }
                                test={test}
                                disabled={false}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Row>
                </Panel>
              </BorderlessCollapse>
            </Col>
            <Col span={12}>
              <BorderlessCollapse bordered={false}>
                <Panel
                  key="7"
                  header={BiochemistryInclude.Drugs_Of_Abuse.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      BiochemistryInclude.Drugs_Of_Abuse.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          BiochemistryInclude.Drugs_Of_Abuse.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Drugs_Of_Abuse.include.${testKey}`,
                              {
                                rules: [{ required: false }],
                              }
                            )(
                              <EmptyTestItem
                                patient={
                                  props.practitioner_patient_profile.patient
                                }
                                test={test}
                                disabled={false}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Row>
                </Panel>

                <Panel
                  key="8"
                  header={BiochemistryInclude.Specific_Proteins.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      BiochemistryInclude.Specific_Proteins.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          BiochemistryInclude.Specific_Proteins.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Specific_Proteins.include.${testKey}`,
                              {
                                rules: [{ required: false }],
                              }
                            )(
                              <EmptyTestItem
                                patient={
                                  props.practitioner_patient_profile.patient
                                }
                                test={test}
                                disabled={false}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Row>
                </Panel>

                <Panel key="9" header={BiochemistryInclude.Others.display}>
                  <Row gutter={18}>
                    {Object.keys(BiochemistryInclude.Others.include).map(
                      testKey => {
                        let test

                        try {
                          test = BiochemistryInclude.Others.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(`Others.include.${testKey}`, {
                                rules: [{ required: false }],
                              })(
                                <EmptyTestItem
                                  patient={
                                    props.practitioner_patient_profile.patient
                                  }
                                  test={test}
                                  disabled={false}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Row>
                </Panel>

                <Panel key="10" header={BiochemistryInclude.Lipids.display}>
                  <Row gutter={18}>
                    {Object.keys(BiochemistryInclude.Lipids.include).map(
                      testKey => {
                        let test

                        try {
                          test = BiochemistryInclude.Lipids.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(`Lipids.include.${testKey}`, {
                                rules: [{ required: false }],
                              })(
                                <EmptyTestItem
                                  patient={
                                    props.practitioner_patient_profile.patient
                                  }
                                  test={test}
                                  disabled={false}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Row>
                </Panel>
              </BorderlessCollapse>
            </Col>
          </Row>
          <Seperator />
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label={<Trans id="Date" />}>
                {getFieldDecorator('issuedDate', {
                  rules: [{ required: true }],
                })(<DatePicker />)}
              </Form.Item>

              <Form.Item label={<Trans id="Healthcare Provider" />}>
                {getFieldDecorator('organizationReference', {
                  rules: [{ required: false }],
                })(<OrganizationPicker i18n={props.i18n} />)}
              </Form.Item>

              <Form.Item labelCol={0} wrapperCol={24}>
                {getFieldDecorator('regulatoryNotes', {
                  rules: [{ required: false }],
                })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModuleBox>
    </Modal>
  )
}

FormModal.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(FormModal)))
