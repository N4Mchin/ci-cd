import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Collapse, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  EmptyTestItem,
  BorderlessCollapse,
  ConfirmModal,
  RegulatoryNotes,
  Seperator,
} from 'components'
import { OrderInfo } from '../../components'

const { Panel } = Collapse

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultInput = props => {
  const { form } = props
  const { getFieldDecorator } = form
  const ImmunologyInclude = props.app.FHIR_CODES.ImmunologyTests.include
  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})
  const [formComplete, setFormComplete] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    setLoadingData(true)
    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    ) {
      props
        .dispatch({
          type: 'laboratory_test_immunologyTests/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .then(() => setLoadingData(false))
    }
  }, [])

  const onSubmit = () => {
    setSubmitLoading(true)
    return form
      .validateFields()
      .then(values => {
        const { regulatoryNotes, ...testResult } = values
        const payload = {
          testData: props.rowData,
          testCode: props.app.FHIR_CODES.ImmunologyTests,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_immunologyTests/saveResult',
          payload: payload,
        })
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  const onFieldsChange = () => {
    const formValues = props.form.getFieldsValue()
    let emptyFound = false
    Object.keys(props.rowData.include).forEach(testKey => {
      Object.keys(props.rowData.include[testKey].include).forEach(
        subTestKey => {
          if (
            formValues[testKey]['include'][subTestKey] === undefined ||
            formValues[testKey]['include'][subTestKey] === ''
          ) {
            emptyFound = true
          }
        }
      )
    })

    setFormComplete(!emptyFound)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width="80vw"
      footer={[
        <Button className="button-gray" onClick={props.onCancel}>
          <Trans id="Close" />
        </Button>,
        <ConfirmModal
          {...{
            showButtonProps: {
              className: 'button-red uppercase',
              disabled: !formComplete,
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin spinning={loadingData}></Spin>
      </div>

      {!loadingData && (
        <ModuleBox title={Title}>
          <Form layout="horizontal" onChange={onFieldsChange}>
            <OrderInfo {...props.rowData} />
            <Seperator />
            <Row>
              <Col span={12}>
                <BorderlessCollapse bordered={false}>
                  <Panel
                    key="1"
                    header={ImmunologyInclude.Tumor_Markers.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Tumor_Markers
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Tumor_Markers.include).map(
                        testKey => {
                          let test
                          let included
                          try {
                            test =
                              ImmunologyInclude.Tumor_Markers.include[testKey]
                          } catch {}
                          try {
                            included = !!modalData.include.Tumor_Markers
                              .include[testKey]
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item help={false}>
                                {getFieldDecorator(
                                  `Tumor_Markers.include.${testKey}`,
                                  {
                                    rules: [{ required: included }],
                                  }
                                )(
                                  <EmptyTestItem
                                    patient={modalData.patient}
                                    test={test}
                                    disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Fertility_Hormones
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Fertility_Hormones.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.Fertility_Hormones.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Fertility_Hormones
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Fertility_Hormones.include.${testKey}`,
                                {
                                  rules: [{ required: included }],
                                }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Thyroid_Function
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Thyroid_Function.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.Thyroid_Function.include[testKey]
                        } catch {}
                        try {
                          included = !!modalData.include.Thyroid_Function
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Thyroid_Function.include.${testKey}`,
                                {
                                  rules: [{ required: included }],
                                }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Cardiac_Function
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Cardiac_Function.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.Cardiac_Function.include[testKey]
                        } catch {}
                        try {
                          included = !!modalData.include.Cardiac_Function
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Cardiac_Function.include.${testKey}`,
                                { rules: [{ required: included }] }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Infectious_Diseases
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Infectious_Diseases.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.Infectious_Diseases.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Infectious_Diseases
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Infectious_Diseases.include.${testKey}`,
                                {
                                  rules: [{ required: included }],
                                }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.First_Trimester_Screening
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.First_Trimester_Screening.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.First_Trimester_Screening.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include
                            .First_Trimester_Screening.include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `First_Trimester_Screening.include.${testKey}`,
                                {
                                  rules: [{ required: included }],
                                }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    header={ImmunologyInclude.Anemia.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Anemia
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Anemia.include).map(
                        testKey => {
                          let test
                          let included
                          try {
                            test = ImmunologyInclude.Anemia.include[testKey]
                          } catch {}
                          try {
                            included = !!modalData.include.Anemia.include[
                              testKey
                            ]
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item help={false}>
                                {getFieldDecorator(
                                  `Anemia.include.${testKey}`,
                                  {
                                    rules: [{ required: included }],
                                  }
                                )(
                                  <EmptyTestItem
                                    patient={modalData.patient}
                                    test={test}
                                    disabled={!included}
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
                    key="8"
                    header={ImmunologyInclude.Bone_Markers.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Bone_Markers
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Bone_Markers.include).map(
                        testKey => {
                          let test
                          let included
                          try {
                            test =
                              ImmunologyInclude.Bone_Markers.include[testKey]
                          } catch {}
                          try {
                            included = !!modalData.include.Bone_Markers.include[
                              testKey
                            ]
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item help={false}>
                                {getFieldDecorator(
                                  `Bone_Markers.include.${testKey}`,
                                  {
                                    rules: [{ required: included }],
                                  }
                                )(
                                  <EmptyTestItem
                                    patient={modalData.patient}
                                    test={test}
                                    disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Rheumatoid_Arthritis
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Rheumatoid_Arthritis.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.Rheumatoid_Arthritis.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Rheumatoid_Arthritis
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Rheumatoid_Arthritis.include.${testKey}`,
                                {
                                  rules: [{ required: included }],
                                }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Auto_Immune_Markers
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Auto_Immune_Markers.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.Auto_Immune_Markers.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Auto_Immune_Markers
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Auto_Immune_Markers.include.${testKey}`,
                                { rules: [{ required: included }] }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Fertility_Hormones
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Fertility_Hormones.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            ImmunologyInclude.Fertility_Hormones.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Fertility_Hormones
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Fertility_Hormones.include.${testKey}`,
                                { rules: [{ required: included }] }
                              )(
                                <EmptyTestItem
                                  patient={modalData.patient}
                                  test={test}
                                  disabled={!included}
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
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Critical_Care
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Critical_Care.include).map(
                        testKey => {
                          let test
                          let included
                          try {
                            test =
                              ImmunologyInclude.Critical_Care.include[testKey]
                          } catch {}
                          try {
                            included = !!modalData.include.Critical_Care
                              .include[testKey]
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item help={false}>
                                {getFieldDecorator(
                                  `Critical_Care.include.${testKey}`,
                                  { rules: [{ required: included }] }
                                )(
                                  <EmptyTestItem
                                    patient={modalData.patient}
                                    test={test}
                                    disabled={!included}
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
            <Row>
              <Col span={12} offset={12}>
                <Form.Item>
                  {getFieldDecorator('regulatoryNotes', {
                    rules: [{ required: false }],
                  })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModuleBox>
      )}
    </Modal>
  )
}

ModalResultInput.propTypes = {
  laboratory_test_immunologyTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_immunologyTests, loading }) => ({
  app,
  laboratory_test_immunologyTests,
  loading,
}))(withI18n()(Form.create()(ModalResultInput)))
