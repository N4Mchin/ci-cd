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

const { Panel } = Collapse

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultVerified = props => {
  const { form, modalData = {} } = props

  const { getFieldDecorator } = form

  const ImmunologyTests = props.app.FHIR_CODES.ImmunologyTests.include

  console.log(modalData, props)
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
      <ModuleBox title={Title}>
        <Form layout="horizontal">
          <Row>
            <Col span={12}>
              <BorderlessCollapse bordered={false} defaultActiveKey={['1']}>
                <Panel
                  key="1"
                  header={ImmunologyTests.Tumor_Markers.display}
                  disabled={
                    !(
                      modalData &&
                      modalData.include &&
                      modalData.include.Tumor_Markers
                    )
                  }
                >
                  <Row gutter={18}>
                    {Object.keys(ImmunologyTests.Tumor_Markers.include).map(
                      testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test = ImmunologyTests.Tumor_Markers.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Tumor_Markers.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Tumor_Markers.include[
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
                  key="2"
                  header={ImmunologyTests.Thyroid_Function.display}
                  disabled={
                    !(
                      modalData &&
                      modalData.include &&
                      modalData.include.Thyroid_Function
                    )
                  }
                >
                  <Row gutter={18}>
                    {Object.keys(ImmunologyTests.Thyroid_Function.include).map(
                      testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyTests.Thyroid_Function.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Thyroid_Function.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Thyroid_Function.include[
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
                  key="3"
                  header={ImmunologyTests.Cardiac_Function.display}
                  disabled={
                    !(
                      modalData &&
                      modalData.include &&
                      modalData.include.Cardiac_Function
                    )
                  }
                >
                  <Row gutter={18}>
                    {Object.keys(ImmunologyTests.Cardiac_Function.include).map(
                      testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test =
                            ImmunologyTests.Cardiac_Function.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Cardiac_Function.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Cardiac_Function.include[
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
                  key="4"
                  header={ImmunologyTests.Infectious_Diseases.display}
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
                      ImmunologyTests.Infectious_Diseases.include
                    ).map(testKey => {
                      let test
                      let valueQuantity
                      let oldValueQuantity

                      try {
                        test =
                          ImmunologyTests.Infectious_Diseases.include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Infectious_Diseases.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        oldValueQuantity = modalData.include.Infectious_Diseases.include[
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
                  header={ImmunologyTests.First_Trimester_Screening.display}
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
                      ImmunologyTests.First_Trimester_Screening.include
                    ).map(testKey => {
                      let test
                      let valueQuantity
                      let oldValueQuantity

                      try {
                        test =
                          ImmunologyTests.First_Trimester_Screening.include[
                            testKey
                          ]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.First_Trimester_Screening.include[
                            testKey
                          ].latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        oldValueQuantity = modalData.include.First_Trimester_Screening.include[
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
                  header={ImmunologyTests.Anemia.display}
                  disabled={
                    !(
                      modalData &&
                      modalData.include &&
                      modalData.include.Anemia
                    )
                  }
                >
                  <Row gutter={18}>
                    {Object.keys(ImmunologyTests.Anemia.include).map(
                      testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test = ImmunologyTests.Anemia.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Anemia.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Anemia.include[
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
                              {getFieldDecorator(`Anemia.include.${testKey}`, {
                                rules: [{ required: false }],
                              })(
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

            <Col span={12}>
              <BorderlessCollapse bordered={false} defaultActiveKey={['1']}>
                <Panel
                  key="7"
                  header={ImmunologyTests.Bone_Markers.display}
                  disabled={
                    !(
                      modalData &&
                      modalData.include &&
                      modalData.include.Bone_Markers
                    )
                  }
                >
                  <Row gutter={18}>
                    {Object.keys(ImmunologyTests.Bone_Markers.include).map(
                      testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test = ImmunologyTests.Bone_Markers.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Bone_Markers.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Bone_Markers.include[
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
                  key="8"
                  header={ImmunologyTests.Rheumatoid_Arthritis.display}
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
                      ImmunologyTests.Rheumatoid_Arthritis.include
                    ).map(testKey => {
                      let test
                      let valueQuantity
                      let oldValueQuantity
                      try {
                        test =
                          ImmunologyTests.Rheumatoid_Arthritis.include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Rheumatoid_Arthritis.include[
                            testKey
                          ].latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        oldValueQuantity = modalData.include.Rheumatoid_Arthritis.include[
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
                  header={ImmunologyTests.Auto_Immune_Markers.display}
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
                      ImmunologyTests.Auto_Immune_Markers.include
                    ).map(testKey => {
                      let test
                      let valueQuantity
                      let oldValueQuantity

                      try {
                        test =
                          ImmunologyTests.Auto_Immune_Markers.include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Auto_Immune_Markers.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        oldValueQuantity = modalData.include.Auto_Immune_Markers.include[
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
                  key="10"
                  header={ImmunologyTests.Fertility_Hormones.display}
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
                      ImmunologyTests.Fertility_Hormones.include
                    ).map(testKey => {
                      let test
                      let valueQuantity
                      let oldValueQuantity

                      try {
                        test =
                          ImmunologyTests.Fertility_Hormones.include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Fertility_Hormones.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        oldValueQuantity = modalData.include.Fertility_Hormones.include[
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
                  key="11"
                  header={ImmunologyTests.Critical_Care.display}
                  disabled={
                    !(
                      modalData &&
                      modalData.include &&
                      modalData.include.Critical_Care
                    )
                  }
                >
                  <Row gutter={18}>
                    {Object.keys(ImmunologyTests.Critical_Care.include).map(
                      testKey => {
                        let test
                        let valueQuantity
                        let oldValueQuantity

                        try {
                          test = ImmunologyTests.Critical_Care.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Critical_Care.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          oldValueQuantity = modalData.include.Critical_Care.include[
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
    </Modal>
  )
}

ModalResultVerified.propTypes = {
  laboratory_test_immunologyTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_immunologyTests, loading }) => ({
  app,
  laboratory_test_immunologyTests,
  loading,
}))(withI18n()(Form.create()(ModalResultVerified)))
