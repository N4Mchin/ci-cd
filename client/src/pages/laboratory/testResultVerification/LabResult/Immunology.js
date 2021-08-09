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

const Immunology = props => {
  const { form } = props
  const { getFieldDecorator } = form

  const ImmunologyInclude = props.app.FHIR_CODES.ImmunologyTests.include
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
                    header={ImmunologyInclude.Tumor_Markers.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Tumor_Markers
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Tumor_Markers.include).map(
                        testKey => {
                          let test
                          let valueQuantity
                          let oldValueQuantity

                          try {
                            test =
                              ImmunologyInclude.Tumor_Markers.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              rawData.include.Tumor_Markers.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = rawData.include.Tumor_Markers.include[
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
                                  `Tumor_Markers.include.${testKey}`,
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
                    key="2"
                    header={ImmunologyInclude.Fertility_Hormones.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Fertility_Hormones
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Fertility_Hormones.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.Fertility_Hormones.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Fertility_Hormones.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Fertility_Hormones.include[
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
                                `Fertility_Hormones.include.${testKey}`,
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
                    header={ImmunologyInclude.Thyroid_Function.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Thyroid_Function
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Thyroid_Function.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.Thyroid_Function.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Thyroid_Function.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Thyroid_Function.include[
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
                                `Thyroid_Function.include.${testKey}`,
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
                    header={ImmunologyInclude.Cardiac_Function.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Cardiac_Function
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Cardiac_Function.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.Cardiac_Function.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Cardiac_Function.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Cardiac_Function.include[
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
                                `Cardiac_Function.include.${testKey}`,
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
                    header={ImmunologyInclude.Infectious_Diseases.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Infectious_Diseases
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Infectious_Diseases.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.Infectious_Diseases.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Infectious_Diseases.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Infectious_Diseases.include[
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
                                `Infectious_Diseases.include.${testKey}`,
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
                    header={ImmunologyInclude.First_Trimester_Screening.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.First_Trimester_Screening
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.First_Trimester_Screening.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.First_Trimester_Screening.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.First_Trimester_Screening.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.First_Trimester_Screening.include[
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
                                `First_Trimester_Screening.include.${testKey}`,
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
                    header={ImmunologyInclude.Anemia.display}
                    disabled={
                      !(rawData && rawData.include && rawData.include.Anemia)
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Anemia.include).map(
                        testKey => {
                          let test
                          let valueQuantity
                          let oldValueQuantity

                          try {
                            test = ImmunologyInclude.Anemia.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              rawData.include.Anemia.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = rawData.include.Anemia.include[
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
                                  `Anemia.include.${testKey}`,
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
                    key="8"
                    header={ImmunologyInclude.Bone_Markers.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Bone_Markers
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Bone_Markers.include).map(
                        testKey => {
                          let test
                          let valueQuantity
                          let oldValueQuantity
                          try {
                            test =
                              ImmunologyInclude.Bone_Markers.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              rawData.include.Bone_Markers.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = rawData.include.Bone_Markers.include[
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
                                  `Bone_Markers.include.${testKey}`,
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
                    key="9"
                    header={ImmunologyInclude.Rheumatoid_Arthritis.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Rheumatoid_Arthritis
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Rheumatoid_Arthritis.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.Rheumatoid_Arthritis.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Rheumatoid_Arthritis.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Rheumatoid_Arthritis.include[
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
                                `Rheumatoid_Arthritis.include.${testKey}`,
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
                    key="10"
                    header={ImmunologyInclude.Auto_Immune_Markers.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Auto_Immune_Markers
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Auto_Immune_Markers.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.Auto_Immune_Markers.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Auto_Immune_Markers.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Auto_Immune_Markers.include[
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
                                `Auto_Immune_Markers.include.${testKey}`,
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
                    key="11"
                    header={ImmunologyInclude.Fertility_Hormones.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Fertility_Hormones
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(
                        ImmunologyInclude.Fertility_Hormones.include
                      ).map(testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyInclude.Fertility_Hormones.include[
                              testKey
                            ]
                        } catch {}

                        try {
                          valueQuantity =
                            rawData.include.Fertility_Hormones.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = rawData.include.Fertility_Hormones.include[
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
                                `Fertility_Hormones.include.${testKey}`,
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
                    key="12"
                    header={ImmunologyInclude.Critical_Care.display}
                    disabled={
                      !(
                        rawData &&
                        rawData.include &&
                        rawData.include.Critical_Care
                      )
                    }
                  >
                    <Row gutter={18}>
                      {Object.keys(ImmunologyInclude.Critical_Care.include).map(
                        testKey => {
                          let test
                          let valueQuantity
                          let oldValueQuantity

                          try {
                            test =
                              ImmunologyInclude.Critical_Care.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              rawData.include.Critical_Care.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = rawData.include.Critical_Care.include[
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
                                  `Critical_Care.include.${testKey}`,
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

Immunology.propTypes = {
  testKey: PropTypes.string,
  testName: PropTypes.string,
  testCode: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(Form.create()(Immunology)))
