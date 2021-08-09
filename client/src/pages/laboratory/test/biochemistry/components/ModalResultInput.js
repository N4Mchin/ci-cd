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
  const BiochemistryInclude = props.app.FHIR_CODES.BiochemistryTests.include
  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})
  const [formComplete, setFormComplete] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  console.log(props)
  useEffect(() => {
    setLoadingData(true)

    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    ) {
      props
        .dispatch({
          type: 'laboratory_test_biochemistryTests/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .then(() => setLoadingData(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = () => {
    setSubmitLoading(true)
    return form
      .validateFields()
      .then(values => {
        const { regulatoryNotes, ...testResult } = values
        const payload = {
          testData: props.rowData,
          testCode: props.app.FHIR_CODES.BiochemistryTests,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_biochemistryTests/saveResult',
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
                    header={BiochemistryInclude.Liver_Function_test.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Liver_Function_test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Liver_Function_test.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Liver_Function_test.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Liver_Function_test
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Liver_Function_test.include.${testKey}`,
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
                    key="2"
                    header={BiochemistryInclude.Electrolytes.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Electrolytes
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Electrolytes.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Electrolytes.include[testKey]
                        } catch {}
                        try {
                          included = !!modalData.include.Electrolytes.include[
                            testKey
                          ]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Electrolytes.include.${testKey}`,
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
                    header={BiochemistryInclude.Rheumatology.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Rheumatology
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Rheumatology.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Rheumatology.include[testKey]
                        } catch {}
                        try {
                          included = !!modalData.include.Rheumatology.include[
                            testKey
                          ]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Rheumatology.include.${testKey}`,
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
                    header={BiochemistryInclude.Diabetes_Test.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Diabetes_Test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Diabetes_Test.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Diabetes_Test.include[testKey]
                        } catch {}
                        try {
                          included = !!modalData.include.Diabetes_Test.include[
                            testKey
                          ]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Diabetes_Test.include.${testKey}`,
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
                    header={BiochemistryInclude.Pancreas_Function_test.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Pancreas_Function_test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Pancreas_Function_test.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Pancreas_Function_test.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Pancreas_Function_test
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Pancreas_Function_test.include.${testKey}`,
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
                    header={BiochemistryInclude.Kidney_Function_Test.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Kidney_Function_Test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Kidney_Function_Test.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Kidney_Function_Test.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Kidney_Function_Test
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Kidney_Function_Test.include.${testKey}`,
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
                    header={BiochemistryInclude.Drugs_Of_Abuse.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Drugs_Of_Abuse
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Drugs_Of_Abuse.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Drugs_Of_Abuse.include[testKey]
                        } catch {}
                        try {
                          included = !!modalData.include.Drugs_Of_Abuse.include[
                            testKey
                          ]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Drugs_Of_Abuse.include.${testKey}`,
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
                    key="8"
                    header={BiochemistryInclude.Specific_Proteins.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Specific_Proteins
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Specific_Proteins.include
                      ).map(testKey => {
                        let test
                        let included
                        try {
                          test =
                            BiochemistryInclude.Specific_Proteins.include[
                              testKey
                            ]
                        } catch {}
                        try {
                          included = !!modalData.include.Specific_Proteins
                            .include[testKey]
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Specific_Proteins.include.${testKey}`,
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
                    key="9"
                    header={BiochemistryInclude.Others.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Others
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(BiochemistryInclude.Others.include).map(
                        testKey => {
                          let test
                          let included
                          try {
                            test = BiochemistryInclude.Others.include[testKey]
                          } catch {}
                          try {
                            included = !!modalData.include.Others.include[
                              testKey
                            ]
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item help={false}>
                                {getFieldDecorator(
                                  `Others.include.${testKey}`,
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
                    key="10"
                    header={BiochemistryInclude.Lipids.display}
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Lipids
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(BiochemistryInclude.Lipids.include).map(
                        testKey => {
                          let test
                          let included
                          try {
                            test = BiochemistryInclude.Lipids.include[testKey]
                          } catch {}
                          try {
                            included = !!modalData.include.Lipids.include[
                              testKey
                            ]
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item help={false}>
                                {getFieldDecorator(
                                  `Lipids.include.${testKey}`,
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
  laboratory_test_biochemistryTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, laboratory_test_biochemistryTests, loading }) => ({
    app,
    laboratory_test_biochemistryTests,
    loading,
  })
)(withI18n()(Form.create()(ModalResultInput)))
