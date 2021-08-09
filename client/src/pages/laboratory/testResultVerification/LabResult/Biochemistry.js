import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Row, Col, Spin, Form, Collapse } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  TestItemViewWithHistory,
  BorderlessCollapse,
  RegulatoryNotes,
  Seperator,
  ConfirmModal,
} from 'components'

import { OrderInfo } from '../../test/components'

const { Panel } = Collapse

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const Biochemistry = props => {
  const { form } = props
  const { getFieldDecorator } = form

  const BiochemistryInclude = props.app.FHIR_CODES.BiochemistryTests.include
  const [loadingData, setLoadingData] = useState(false)
  const [rawData, setRawData] = useState({})

  useEffect(() => {
    setLoadingData(true)
    props
      .dispatch({
        type: 'app/queryLabResult',
        payload: {
          testKey: props.testKey,
          testCode: props.testCode,
          serviceRequestId: props.rowData.serviceRequest.id,
        },
      })
      .then(values => setRawData(values))
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }, [])

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width="80vw"
      footer={[
        <Button
          key="reInput-cancel-button"
          className="button-gray uppercase"
          onClick={props.onCancel}
          style={{ marginLeft: '8px' }}
        >
          <Trans id="Close" />
        </Button>,
        props.onReVerifyResultItem && (
          <ConfirmModal
            {...{
              showButtonProps: {
                className: 'button-dark-gray uppercase',
              },
              title: <Trans id="Are you sure?" />,
              showButtonText: (
                <span>
                  &nbsp;&nbsp;
                  <Trans id="Results to re-verify" />
                </span>
              ),
              onConfirm: () =>
                props.onReVerifyResultItem({
                  ...props.rowData,
                  ...rawData,
                }),
              loading: props.buttonLoading === 'reVerifying',
            }}
          />
        ),
        props.onVerifyResultItem && (
          <ConfirmModal
            {...{
              showButtonProps: {
                className: 'button-red uppercase',
              },
              title: <Trans id="Are you sure?" />,
              showButtonText: (
                <span>
                  &nbsp;&nbsp;
                  <Trans id="Verify Results" />
                </span>
              ),
              onConfirm: () =>
                props.onVerifyResultItem({
                  ...props.rowData,
                  ...rawData,
                }),
              loading: props.buttonLoading === 'verifying',
            }}
          />
        ),
      ]}
    >
      <Row type="flex" justify="center">
        <Spin spinning={loadingData}></Spin>
      </Row>

      {!loadingData && (
        <ModuleBox title={Title}>
          <Form layout="horizontal">
            <OrderInfo {...rawData} />
            <Seperator />
            <Row>
              <Col span={12}>
                <BorderlessCollapse bordered={false} defaultActiveKey={['1']}>
                  <Panel
                    key="1"
                    header={BiochemistryInclude.Liver_Function_test.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Liver_Function_test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Liver_Function_test.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Liver_Function_test.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Liver_Function_test.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Liver_Function_test.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Liver_Function_test.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                        rawData &&
                        rawData.include &&
                        rawData.include.Electrolytes
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Electrolytes.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Electrolytes.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Electrolytes.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Electrolytes.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Electrolytes.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                        rawData &&
                        rawData.include &&
                        rawData.include.Rheumatology
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Rheumatology.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Rheumatology.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Rheumatology.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Rheumatology.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Rheumatology.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                        rawData &&
                        rawData.include &&
                        rawData.include.Diabetes_Test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Diabetes_Test.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Diabetes_Test.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Diabetes_Test.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Diabetes_Test.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Diabetes_Test.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                        rawData &&
                        rawData.include &&
                        rawData.include.Pancreas_Function_test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Pancreas_Function_test.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Pancreas_Function_test.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Pancreas_Function_test.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Pancreas_Function_test.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Pancreas_Function_test.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                        rawData &&
                        rawData.include &&
                        rawData.include.Kidney_Function_Test
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Kidney_Function_Test.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Kidney_Function_Test.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Kidney_Function_Test.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Kidney_Function_Test.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Kidney_Function_Test.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                <BorderlessCollapse bordered={false} defaultActiveKey={['1']}>
                  <Panel
                    key="7"
                    header={BiochemistryInclude.Drugs_Of_Abuse.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Drugs_Of_Abuse
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Drugs_Of_Abuse.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Drugs_Of_Abuse.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Drugs_Of_Abuse.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Drugs_Of_Abuse.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Drugs_Of_Abuse.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                        rawData &&
                        rawData.include &&
                        rawData.include.Specific_Proteins
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        BiochemistryInclude.Specific_Proteins.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity
                        try {
                          test =
                            BiochemistryInclude.Specific_Proteins.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Specific_Proteins.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Specific_Proteins.include[
                            testKey
                          ].observation
                            .slice()
                            .reverse()
                            .find(o => o.status === 'cancelled').valueQuantity
                            .value
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item>
                              {getFieldDecorator(
                                `Specific_Proteins.include.${testKey}`,
                                {
                                  rules: [{ required: false }],
                                }
                              )(
                                <TestItemViewWithHistory
                                  patient={rawData.patient}
                                  test={test}
                                  oldValueQuantity={oldValueQuantity}
                                  valueQuantity={valueQuantity}
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
                      !(rawData && rawData.include && rawData.include.Others)
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(BiochemistryInclude.Others.include).map(
                        testKey => {
                          let test
                          let valueQuantity
                          let oldValueQuantity

                          try {
                            test = BiochemistryInclude.Others.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              rawData.include.Others.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = rawData.include.Others.include[
                              testKey
                            ].observation
                              .slice()
                              .reverse()
                              .find(o => o.status === 'cancelled').valueQuantity
                              .value
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item>
                                {getFieldDecorator(
                                  `Others.include.${testKey}`,
                                  {
                                    rules: [{ required: false }],
                                  }
                                )(
                                  <TestItemViewWithHistory
                                    patient={rawData.patient}
                                    test={test}
                                    oldValueQuantity={oldValueQuantity}
                                    valueQuantity={valueQuantity}
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
                      !(rawData && rawData.include && rawData.include.Lipids)
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(BiochemistryInclude.Lipids.include).map(
                        testKey => {
                          let test
                          let valueQuantity
                          let oldValueQuantity

                          try {
                            test = BiochemistryInclude.Lipids.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              rawData.include.Lipids.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = rawData.include.Lipids.include[
                              testKey
                            ].observation
                              .slice()
                              .reverse()
                              .find(o => o.status === 'cancelled').valueQuantity
                              .value
                          } catch {}

                          return (
                            <Col span={12}>
                              <Form.Item>
                                {getFieldDecorator(
                                  `Lipids.include.${testKey}`,
                                  {
                                    rules: [{ required: false }],
                                  }
                                )(
                                  <TestItemViewWithHistory
                                    patient={rawData.patient}
                                    test={test}
                                    oldValueQuantity={oldValueQuantity}
                                    valueQuantity={valueQuantity}
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
                    initialValue: rawData.regulatoryNotesValue,
                    rules: [{ required: false }],
                  })(
                    <RegulatoryNotes
                      autoSize={{ minRows: 4, maxRows: 6 }}
                      disabled
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModuleBox>
      )}
    </Modal>
  )
}

Biochemistry.propTypes = {
  testKey: PropTypes.string,
  testName: PropTypes.string,
  testCode: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(Form.create()(Biochemistry)))
