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
  const { ImmunologyTests } = props.app.FHIR_CODES
  const ImmunologyInclude = ImmunologyTests.include

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

        Object.keys(ImmunologyInclude).forEach(testKey => {
          if (!valueQuanitities[testKey]) {
            valueQuanitities[testKey] = {
              ...ImmunologyInclude[testKey],
              include: {},
            }
          }

          Object.keys(ImmunologyInclude[testKey].include).forEach(
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
                  const { referenceRange, unit } = ImmunologyInclude[testKey][
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
          testCode: ImmunologyTests,
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
                <Panel key="1" header={ImmunologyInclude.Tumor_Markers.display}>
                  <Row gutter={18}>
                    {Object.keys(ImmunologyInclude.Tumor_Markers.include).map(
                      testKey => {
                        let test

                        try {
                          test =
                            ImmunologyInclude.Tumor_Markers.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Tumor_Markers.include.${testKey}`,
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
                  key="2"
                  header={ImmunologyInclude.Fertility_Hormones.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.Fertility_Hormones.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.Fertility_Hormones.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Fertility_Hormones.include.${testKey}`,
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
                  key="3"
                  header={ImmunologyInclude.Thyroid_Function.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.Thyroid_Function.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.Thyroid_Function.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Thyroid_Function.include.${testKey}`,
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
                  key="4"
                  header={ImmunologyInclude.Cardiac_Function.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.Cardiac_Function.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.Cardiac_Function.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Cardiac_Function.include.${testKey}`,
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
                    })}
                  </Row>
                </Panel>

                <Panel
                  key="5"
                  header={ImmunologyInclude.Infectious_Diseases.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.Infectious_Diseases.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.Infectious_Diseases.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Infectious_Diseases.include.${testKey}`,
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
                  header={ImmunologyInclude.First_Trimester_Screening.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.First_Trimester_Screening.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.First_Trimester_Screening.include[
                            testKey
                          ]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `First_Trimester_Screening.include.${testKey}`,
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
                <Panel key="7" header={ImmunologyInclude.Anemia.display}>
                  <Row gutter={18}>
                    {Object.keys(ImmunologyInclude.Anemia.include).map(
                      testKey => {
                        let test

                        try {
                          test = ImmunologyInclude.Anemia.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(`Anemia.include.${testKey}`, {
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

                <Panel key="8" header={ImmunologyInclude.Bone_Markers.display}>
                  <Row gutter={18}>
                    {Object.keys(ImmunologyInclude.Bone_Markers.include).map(
                      testKey => {
                        let test

                        try {
                          test = ImmunologyInclude.Bone_Markers.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Bone_Markers.include.${testKey}`,
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
                  key="9"
                  header={ImmunologyInclude.Rheumatoid_Arthritis.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.Rheumatoid_Arthritis.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.Rheumatoid_Arthritis.include[
                            testKey
                          ]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Rheumatoid_Arthritis.include.${testKey}`,
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
                  key="10"
                  header={ImmunologyInclude.Auto_Immune_Markers.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.Auto_Immune_Markers.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.Auto_Immune_Markers.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Auto_Immune_Markers.include.${testKey}`,
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
                    })}
                  </Row>
                </Panel>

                <Panel
                  key="11"
                  header={ImmunologyInclude.Fertility_Hormones.display}
                >
                  <Row gutter={18}>
                    {Object.keys(
                      ImmunologyInclude.Fertility_Hormones.include
                    ).map(testKey => {
                      let test

                      try {
                        test =
                          ImmunologyInclude.Fertility_Hormones.include[testKey]
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Fertility_Hormones.include.${testKey}`,
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
                    })}
                  </Row>
                </Panel>

                <Panel
                  key="12"
                  header={ImmunologyInclude.Critical_Care.display}
                >
                  <Row gutter={18}>
                    {Object.keys(ImmunologyInclude.Critical_Care.include).map(
                      testKey => {
                        let test

                        try {
                          test =
                            ImmunologyInclude.Critical_Care.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Critical_Care.include.${testKey}`,
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
