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
} from 'components'
import { OrderInfo } from '../../components'

const { Panel } = Collapse

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultVerified = props => {
  const { form } = props

  const { getFieldDecorator } = form

  const BiochemistryInclude = props.app.FHIR_CODES.BiochemistryTests.include
  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState({})

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
  }, [])

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width="80vw"
      footer={[
        <Button className="uppercase" onClick={props.onCancel}>
          <Trans id="Close" />
        </Button>,
      ]}
    >
      <Row type="flex" justify="center">
        <Spin spinning={loadingData}></Spin>
      </Row>

      {!loadingData && (
        <ModuleBox title={Title}>
          <Form layout="horizontal">
            <OrderInfo {...modalData} />
            <Seperator />
            <Row>
              <Col span={12}>
                <BorderlessCollapse bordered={false} defaultActiveKey={['1']}>
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
                            modalData.include.Liver_Function_test.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Liver_Function_test.include[
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
                                  patient={modalData.patient}
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
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Electrolytes.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Electrolytes.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Electrolytes.include[
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
                                  patient={modalData.patient}
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
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Rheumatology.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Rheumatology.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Rheumatology.include[
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
                                  patient={modalData.patient}
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
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Diabetes_Test.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Diabetes_Test.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Diabetes_Test.include[
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
                                  patient={modalData.patient}
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
                            modalData.include.Pancreas_Function_test.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Pancreas_Function_test.include[
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
                                  patient={modalData.patient}
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
                            modalData.include.Kidney_Function_Test.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Kidney_Function_Test.include[
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
                                  patient={modalData.patient}
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
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            BiochemistryInclude.Drugs_Of_Abuse.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Drugs_Of_Abuse.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Drugs_Of_Abuse.include[
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
                                  patient={modalData.patient}
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
                            modalData.include.Specific_Proteins.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Specific_Proteins.include[
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
                                  patient={modalData.patient}
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
                          let valueQuantity
                          let oldValueQuantity

                          try {
                            test = BiochemistryInclude.Others.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              modalData.include.Others.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = modalData.include.Others.include[
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
                                    patient={modalData.patient}
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
                          let valueQuantity
                          let oldValueQuantity

                          try {
                            test = BiochemistryInclude.Lipids.include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              modalData.include.Lipids.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            oldValueQuantity = modalData.include.Lipids.include[
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
                                    patient={modalData.patient}
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
                    initialValue: modalData.regulatoryNotesValue,
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

ModalResultVerified.propTypes = {
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
)(withI18n()(Form.create()(ModalResultVerified)))
