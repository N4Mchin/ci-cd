import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Spin, Collapse } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  TestItemReInput,
  Seperator,
  RegulatoryNotes,
  BorderlessCollapse,
  ConfirmModal,
} from 'components'

import { OrderInfo } from '../../components'

import * as controller from 'utils/controller'
import { WarningTwoTone } from '@ant-design/icons'

const { Panel } = Collapse

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultReInput = props => {
  const { form } = props
  const { getFieldDecorator } = form

  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState(false)
  const [formComplete, setFormComplete] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const BiochemistryInclude = props.app.FHIR_CODES.BiochemistryTests.include
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

  function onSubmit() {
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
          type: 'laboratory_test_biochemistryTests/editResult',
          payload: payload,
        })
      })
      .then(() => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  const onFieldsChange = () => {
    const formValues = props.form.getFieldsValue()
    let fieldChanged = false

    Object.keys(props.rowData.include).forEach(testKey => {
      Object.keys(props.rowData.include[testKey].include).forEach(
        subTestKey => {
          if (
            formValues[testKey]['include'][subTestKey] !== undefined &&
            formValues[testKey]['include'][subTestKey] !== ''
          ) {
            fieldChanged = true
          }
        }
      )
    })

    setFormComplete(fieldChanged)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width="80vw"
      footer={[
        <Button onClick={props.onCancel}>
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
            <OrderInfo {...modalData} />
            <Seperator />
            <Row>
              <Col span={12}>
                <BorderlessCollapse bordered={false}>
                  <Panel
                    key="1"
                    header={
                      <div>
                        {BiochemistryInclude.Liver_Function_test.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Liver_Function_test &&
                          controller.hasCancelled(
                            modalData.include.Liver_Function_test
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Liver_Function_test
                      )
                    }
                  >
                    <Row>
                      {Object.keys(
                        BiochemistryInclude.Liver_Function_test.include
                      ).map(testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled

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

                        try {
                          valueQuantity =
                            modalData.include.Liver_Function_test.include[
                              testKey
                            ].latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Liver_Function_test.include[
                              testKey
                            ].latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}
                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Liver_Function_test.include.${testKey}`,
                                {
                                  rules: [{ required: hasCancelled }],
                                }
                              )(
                                <TestItemReInput
                                  test={test}
                                  valueQuantity={valueQuantity}
                                  disabled={!hasCancelled}
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
                    header={
                      <div>
                        {BiochemistryInclude.Electrolytes.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Electrolytes &&
                          controller.hasCancelled(
                            modalData.include.Electrolytes
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Electrolytes
                      )
                    }
                  >
                    {Object.keys(BiochemistryInclude.Electrolytes.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test =
                            BiochemistryInclude.Electrolytes.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Electrolytes.include[
                            testKey
                          ]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Electrolytes.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Electrolytes.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Electrolytes.include.${testKey}`,
                                {
                                  rules: [{ required: hasCancelled }],
                                }
                              )(
                                <TestItemReInput
                                  test={test}
                                  valueQuantity={valueQuantity}
                                  disabled={!hasCancelled}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Panel>
                  <Panel
                    key="3"
                    header={
                      <div>
                        {BiochemistryInclude.Rheumatology.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Rheumatology &&
                          controller.hasCancelled(
                            modalData.include.Rheumatology
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Rheumatology
                      )
                    }
                  >
                    {Object.keys(BiochemistryInclude.Rheumatology.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test =
                            BiochemistryInclude.Rheumatology.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Rheumatology.include[
                            testKey
                          ]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Rheumatology.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Rheumatology.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Rheumatology.include.${testKey}`,
                                {
                                  rules: [{ required: hasCancelled }],
                                }
                              )(
                                <TestItemReInput
                                  test={test}
                                  valueQuantity={valueQuantity}
                                  disabled={!hasCancelled}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Panel>
                  <Panel
                    key="4"
                    header={
                      <div>
                        {BiochemistryInclude.Diabetes_Test.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Diabetes_Test &&
                          controller.hasCancelled(
                            modalData.include.Diabetes_Test
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Diabetes_Test
                      )
                    }
                  >
                    {Object.keys(BiochemistryInclude.Diabetes_Test.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test =
                            BiochemistryInclude.Diabetes_Test.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Diabetes_Test.include[
                            testKey
                          ]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Diabetes_Test.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Diabetes_Test.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Diabetes_Test.include.${testKey}`,
                                {
                                  rules: [{ required: hasCancelled }],
                                }
                              )(
                                <TestItemReInput
                                  test={test}
                                  valueQuantity={valueQuantity}
                                  disabled={!hasCancelled}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Panel>
                  <Panel
                    key="5"
                    header={
                      <div>
                        {BiochemistryInclude.Pancreas_Function_test.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Pancreas_Function_test &&
                          controller.hasCancelled(
                            modalData.include.Pancreas_Function_test
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Pancreas_Function_test
                      )
                    }
                  >
                    {Object.keys(
                      BiochemistryInclude.Pancreas_Function_test.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
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

                      try {
                        valueQuantity =
                          modalData.include.Pancreas_Function_test.include[
                            testKey
                          ].latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        hasCancelled =
                          modalData.include.Pancreas_Function_test.include[
                            testKey
                          ].latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Pancreas_Function_test.include.${testKey}`,
                              {
                                rules: [{ required: hasCancelled }],
                              }
                            )(
                              <TestItemReInput
                                test={test}
                                valueQuantity={valueQuantity}
                                disabled={!hasCancelled}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Panel>
                  <Panel
                    key="6"
                    header={
                      <div>
                        {BiochemistryInclude.Kidney_Function_Test.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Kidney_Function_Test &&
                          controller.hasCancelled(
                            modalData.include.Kidney_Function_Test
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Kidney_Function_Test
                      )
                    }
                  >
                    {Object.keys(
                      BiochemistryInclude.Kidney_Function_Test.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
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

                      try {
                        valueQuantity =
                          modalData.include.Kidney_Function_Test.include[
                            testKey
                          ].latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        hasCancelled =
                          modalData.include.Kidney_Function_Test.include[
                            testKey
                          ].latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Kidney_Function_Test.include.${testKey}`,
                              {
                                rules: [{ required: hasCancelled }],
                              }
                            )(
                              <TestItemReInput
                                test={test}
                                valueQuantity={valueQuantity}
                                disabled={!hasCancelled}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Panel>
                </BorderlessCollapse>
              </Col>

              <Col span={12}>
                <BorderlessCollapse bordered={false} defaultActiveKey={['1']}>
                  <Panel
                    key="7"
                    header={
                      <div>
                        {BiochemistryInclude.Drugs_Of_Abuse.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Drugs_Of_Abuse &&
                          controller.hasCancelled(
                            modalData.include.Drugs_Of_Abuse
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Drugs_Of_Abuse
                      )
                    }
                  >
                    {Object.keys(
                      BiochemistryInclude.Drugs_Of_Abuse.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          BiochemistryInclude.Drugs_Of_Abuse.include[testKey]
                      } catch {}

                      try {
                        included = !!modalData.include.Drugs_Of_Abuse.include[
                          testKey
                        ]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Drugs_Of_Abuse.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}
                      try {
                        hasCancelled =
                          modalData.include.Drugs_Of_Abuse.include[testKey]
                            .latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}
                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Drugs_Of_Abuse.include.${testKey}`,
                              {
                                rules: [{ required: hasCancelled }],
                              }
                            )(
                              <TestItemReInput
                                test={test}
                                valueQuantity={valueQuantity}
                                disabled={!hasCancelled}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Panel>
                  <Panel
                    key="8"
                    header={
                      <div>
                        {BiochemistryInclude.Specific_Proteins.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Specific_Proteins &&
                          controller.hasCancelled(
                            modalData.include.Specific_Proteins
                          ) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Specific_Proteins
                      )
                    }
                  >
                    {Object.keys(
                      BiochemistryInclude.Specific_Proteins.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          BiochemistryInclude.Specific_Proteins.include[testKey]
                      } catch {}

                      try {
                        included = !!modalData.include.Specific_Proteins
                          .include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Specific_Proteins.include[testKey]
                            .latestObservation.valueQuantity.value
                        try {
                          hasCancelled =
                            modalData.include.Specific_Proteins.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}
                      } catch {}
                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Specific_Proteins.include.${testKey}`,
                              {
                                rules: [{ required: hasCancelled }],
                              }
                            )(
                              <TestItemReInput
                                test={test}
                                valueQuantity={valueQuantity}
                                disabled={!hasCancelled}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      )
                    })}
                  </Panel>
                  <Panel
                    key="9"
                    header={
                      <div>
                        {BiochemistryInclude.Others.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Others &&
                          controller.hasCancelled(modalData.include.Others) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Others
                      )
                    }
                  >
                    {Object.keys(BiochemistryInclude.Others.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test = BiochemistryInclude.Others.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Others.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Others.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}
                        try {
                          hasCancelled =
                            modalData.include.Others.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(`Others.include.${testKey}`, {
                                rules: [{ required: hasCancelled }],
                              })(
                                <TestItemReInput
                                  test={test}
                                  valueQuantity={valueQuantity}
                                  disabled={!hasCancelled}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
                  </Panel>
                  <Panel
                    key="10"
                    header={
                      <div>
                        {BiochemistryInclude.Lipids.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Lipids &&
                          controller.hasCancelled(modalData.include.Lipids) && (
                            <WarningTwoTone
                              twoToneColor=" #F44336"
                              fontSize="25px"
                            />
                          )}
                      </div>
                    }
                    disabled={
                      !(
                        modalData &&
                        modalData.include &&
                        modalData.include.Lipids
                      )
                    }
                  >
                    {Object.keys(BiochemistryInclude.Lipids.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test = BiochemistryInclude.Lipids.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Lipids.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Lipids.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Lipids.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(`Lipids.include.${testKey}`, {
                                rules: [{ required: hasCancelled }],
                              })(
                                <TestItemReInput
                                  test={test}
                                  valueQuantity={valueQuantity}
                                  disabled={!hasCancelled}
                                />
                              )}
                            </Form.Item>
                          </Col>
                        )
                      }
                    )}
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

ModalResultReInput.propTypes = {
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
)(withI18n()(Form.create()(ModalResultReInput)))
