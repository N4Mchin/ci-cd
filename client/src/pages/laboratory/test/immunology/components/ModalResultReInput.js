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
  const ImmunologyInclude = props.app.FHIR_CODES.ImmunologyTests.include

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

  function onSubmit() {
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
          type: 'laboratory_test_immunologyTests/editResult',
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
                        {ImmunologyInclude.Tumor_Markers.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Tumor_Markers &&
                          controller.hasCancelled(
                            modalData.include.Tumor_Markers
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
                        modalData.include.Tumor_Markers
                      )
                    }
                  >
                    <Row>
                      {Object.keys(ImmunologyInclude.Tumor_Markers.include).map(
                        testKey => {
                          let test
                          let included
                          let valueQuantity
                          let hasCancelled

                          try {
                            test =
                              ImmunologyInclude.Tumor_Markers.include[testKey]
                          } catch {}

                          try {
                            included = !!modalData.include.Tumor_Markers
                              .include[testKey]
                          } catch {}

                          try {
                            valueQuantity =
                              modalData.include.Tumor_Markers.include[testKey]
                                .latestObservation.valueQuantity.value
                          } catch {}

                          try {
                            hasCancelled =
                              modalData.include.Tumor_Markers.include[testKey]
                                .latestObservation.status === 'cancelled'
                                ? true
                                : false
                          } catch {}
                          return (
                            <Col span={12}>
                              <Form.Item help={false}>
                                {getFieldDecorator(
                                  `Tumor_Markers.include.${testKey}`,
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
                    </Row>
                  </Panel>
                  <Panel
                    key="2"
                    header={
                      <div>
                        {ImmunologyInclude.Anemia.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Anemia &&
                          controller.hasCancelled(modalData.include.Anemia) && (
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
                        modalData.include.Anemia
                      )
                    }
                  >
                    {Object.keys(ImmunologyInclude.Anemia.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test = ImmunologyInclude.Anemia.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Anemia.include[testKey]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Anemia.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Anemia.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(`Anemia.include.${testKey}`, {
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
                    key="3"
                    header={
                      <div>
                        {ImmunologyInclude.Auto_Immune_Markers.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Auto_Immune_Markers &&
                          controller.hasCancelled(
                            modalData.include.Auto_Immune_Markers
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
                        modalData.include.Auto_Immune_Markers
                      )
                    }
                  >
                    {Object.keys(
                      ImmunologyInclude.Auto_Immune_Markers.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          ImmunologyInclude.Auto_Immune_Markers.include[testKey]
                      } catch {}

                      try {
                        included = !!modalData.include.Auto_Immune_Markers
                          .include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Auto_Immune_Markers.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        hasCancelled =
                          modalData.include.Auto_Immune_Markers.include[testKey]
                            .latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Auto_Immune_Markers.include.${testKey}`,
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
                    key="4"
                    header={
                      <div>
                        {ImmunologyInclude.Bone_Markers.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Bone_Markers &&
                          controller.hasCancelled(
                            modalData.include.Bone_Markers
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
                        modalData.include.Bone_Markers
                      )
                    }
                  >
                    {Object.keys(ImmunologyInclude.Bone_Markers.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test = ImmunologyInclude.Bone_Markers.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Bone_Markers.include[
                            testKey
                          ]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Bone_Markers.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Bone_Markers.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Bone_Markers.include.${testKey}`,
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
                        {ImmunologyInclude.Cardiac_Function.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Cardiac_Function &&
                          controller.hasCancelled(
                            modalData.include.Cardiac_Function
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
                        modalData.include.Cardiac_Function
                      )
                    }
                  >
                    {Object.keys(
                      ImmunologyInclude.Cardiac_Function.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          ImmunologyInclude.Cardiac_Function.include[testKey]
                      } catch {}

                      try {
                        included = !!modalData.include.Cardiac_Function.include[
                          testKey
                        ]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Cardiac_Function.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        hasCancelled =
                          modalData.include.Cardiac_Function.include[testKey]
                            .latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Cardiac_Function.include.${testKey}`,
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
                        {ImmunologyInclude.Critical_Care.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Critical_Care &&
                          controller.hasCancelled(
                            modalData.include.Critical_Care
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
                        modalData.include.Critical_Care
                      )
                    }
                  >
                    {Object.keys(ImmunologyInclude.Critical_Care.include).map(
                      testKey => {
                        let test
                        let included
                        let valueQuantity
                        let hasCancelled
                        try {
                          test =
                            ImmunologyInclude.Critical_Care.include[testKey]
                        } catch {}

                        try {
                          included = !!modalData.include.Critical_Care.include[
                            testKey
                          ]
                        } catch {}

                        try {
                          valueQuantity =
                            modalData.include.Critical_Care.include[testKey]
                              .latestObservation.valueQuantity.value
                        } catch {}

                        try {
                          hasCancelled =
                            modalData.include.Critical_Care.include[testKey]
                              .latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}

                        return (
                          <Col span={12}>
                            <Form.Item help={false}>
                              {getFieldDecorator(
                                `Critical_Care.include.${testKey}`,
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
                </BorderlessCollapse>
              </Col>

              <Col span={12}>
                <BorderlessCollapse bordered={false} defaultActiveKey={['1']}>
                  <Panel
                    key="7"
                    header={
                      <div>
                        {ImmunologyInclude.Fertility_Hormones.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Fertility_Hormones &&
                          controller.hasCancelled(
                            modalData.include.Fertility_Hormones
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
                        modalData.include.Fertility_Hormones
                      )
                    }
                  >
                    {Object.keys(
                      ImmunologyInclude.Fertility_Hormones.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          ImmunologyInclude.Fertility_Hormones.include[testKey]
                      } catch {}

                      try {
                        included = !!modalData.include.Fertility_Hormones
                          .include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Fertility_Hormones.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        hasCancelled =
                          modalData.include.Fertility_Hormones.include[testKey]
                            .latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Fertility_Hormones.include.${testKey}`,
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
                        {ImmunologyInclude.First_Trimester_Screening.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.First_Trimester_Screening &&
                          controller.hasCancelled(
                            modalData.include.First_Trimester_Screening
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
                        modalData.include.First_Trimester_Screening
                      )
                    }
                  >
                    {Object.keys(
                      ImmunologyInclude.First_Trimester_Screening.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          ImmunologyInclude.First_Trimester_Screening.include[
                            testKey
                          ]
                      } catch {}

                      try {
                        included = !!modalData.include.First_Trimester_Screening
                          .include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.First_Trimester_Screening.include[
                            testKey
                          ].latestObservation.valueQuantity.value
                        try {
                          hasCancelled =
                            modalData.include.First_Trimester_Screening.include[
                              testKey
                            ].latestObservation.status === 'cancelled'
                              ? true
                              : false
                        } catch {}
                      } catch {}
                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `First_Trimester_Screening.include.${testKey}`,
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
                        {ImmunologyInclude.Infectious_Diseases.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Infectious_Diseases &&
                          controller.hasCancelled(
                            modalData.include.Infectious_Diseases
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
                        modalData.include.Infectious_Diseases
                      )
                    }
                  >
                    {Object.keys(
                      ImmunologyInclude.Infectious_Diseases.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          ImmunologyInclude.Infectious_Diseases.include[testKey]
                      } catch {}

                      try {
                        included = !!modalData.include.Infectious_Diseases
                          .include[testKey]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Infectious_Diseases.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}
                      try {
                        hasCancelled =
                          modalData.include.Infectious_Diseases.include[testKey]
                            .latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Infectious_Diseases.include.${testKey}`,
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
                    key="10"
                    header={
                      <div>
                        {ImmunologyInclude.Rheumatoid_Arthritis.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Rheumatoid_Arthritis &&
                          controller.hasCancelled(
                            modalData.include.Rheumatoid_Arthritis
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
                        modalData.include.Rheumatoid_Arthritis
                      )
                    }
                  >
                    {Object.keys(
                      ImmunologyInclude.Rheumatoid_Arthritis.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
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

                      try {
                        valueQuantity =
                          modalData.include.Rheumatoid_Arthritis.include[
                            testKey
                          ].latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        hasCancelled =
                          modalData.include.Rheumatoid_Arthritis.include[
                            testKey
                          ].latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Rheumatoid_Arthritis.include.${testKey}`,
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
                    key="11"
                    header={
                      <div>
                        {ImmunologyInclude.Thyroid_Function.display}
                        &nbsp;
                        {modalData &&
                          modalData.include &&
                          modalData.include.Thyroid_Function &&
                          controller.hasCancelled(
                            modalData.include.Thyroid_Function
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
                        modalData.include.Thyroid_Function
                      )
                    }
                  >
                    {Object.keys(
                      ImmunologyInclude.Thyroid_Function.include
                    ).map(testKey => {
                      let test
                      let included
                      let valueQuantity
                      let hasCancelled
                      try {
                        test =
                          ImmunologyInclude.Thyroid_Function.include[testKey]
                      } catch {}

                      try {
                        included = !!modalData.include.Thyroid_Function.include[
                          testKey
                        ]
                      } catch {}

                      try {
                        valueQuantity =
                          modalData.include.Thyroid_Function.include[testKey]
                            .latestObservation.valueQuantity.value
                      } catch {}

                      try {
                        hasCancelled =
                          modalData.include.Thyroid_Function.include[testKey]
                            .latestObservation.status === 'cancelled'
                            ? true
                            : false
                      } catch {}

                      return (
                        <Col span={12}>
                          <Form.Item help={false}>
                            {getFieldDecorator(
                              `Thyroid_Function.include.${testKey}`,
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
  laboratory_test_immunologyTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_immunologyTests, loading }) => ({
  app,
  laboratory_test_immunologyTests,
  loading,
}))(withI18n()(Form.create()(ModalResultReInput)))
