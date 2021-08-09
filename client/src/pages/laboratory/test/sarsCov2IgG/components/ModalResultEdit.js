import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Divider, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  TestItemEditedWithDisplay,
  TestItemEditWithLabel,
} from 'components'

import { TestNumberLabel, OrderInfo } from '../../components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultEdit = props => {
  const { app, location, i18n, form } = props

  const { getFieldDecorator } = form

  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState(false)
  const {
    Sars_Cov2_IgG,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formComplete, setFormComplete] = useState(false)

  useEffect(() => {
    setLoadingData(true)
    if (
      props.rowData &&
      props.rowData.serviceRequest &&
      props.rowData.serviceRequest.id
    ) {
      props
        .dispatch({
          type: 'laboratory_test_sarsCov2IgG/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .then(() => setLoadingData(false))
        .catch(errorInfo => console.log(errorInfo))
    }
  }, [])

  function onSubmit() {
    setSubmitLoading(true)

    return form
      .validateFields()
      .then(values => {
        const { testResult, regulatoryNotes } = values

        const payload = {
          testData: props.rowData,
          testCode: Sars_Cov2_IgG,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_sarsCov2IgG/editResult',
          payload: payload,
        })
      })
      .then(res => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  const observationArray = Object.assign([], props.rowData.observation)

  let first
  let firstValue

  if (observationArray.length >= 1) {
    first = observationArray.shift()
    firstValue = first.valueQuantity && first.valueQuantity.value
  }

  const onFieldsChange = () => {
    const formValues = form.getFieldsValue()
    let fieldChanged = false

    if (!!formValues.testResult) {
      fieldChanged = true
    }

    setFormComplete(fieldChanged)
  }

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={false}
      closable={false}
      width={props.width}
      footer={[
        <Button
          key="edit-cancel-button"
          className="button-gray uppercase"
          onClick={props.onCancel}
          style={{ marginRight: '8px' }}
        >
          <Trans id="Close" />
        </Button>,
        <ConfirmModal
          key="edit-save-button"
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
          <Form
            layout="horizontal"
            labelAlign="left"
            colon={false}
            onChange={onFieldsChange}
          >
            <OrderInfo {...props.rowData} />
            <Divider style={{ background: '#ccc' }} />
            <Row gutter={32}>
              <Col span={12}>
                <TestNumberLabel
                  testName={Sars_Cov2_IgG.display}
                  value={firstValue}
                />

                {observationArray.map(obs => {
                  const val = obs.valueQuantity.value
                  return (
                    <TestItemEditedWithDisplay
                      key={`key_${obs.id}`}
                      value={val}
                    />
                  )
                })}

                <Form.Item>
                  {getFieldDecorator('testResult', {
                    rules: [
                      {
                        required: true,
                        message: i18n.t`Enter test result value`,
                      },
                    ],
                  })(<TestItemEditWithLabel test={Sars_Cov2_IgG} />)}
                </Form.Item>
              </Col>

              <Col span={12}>
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

ModalResultEdit.propTypes = {
  laboratory_test_sarsCov2IgG: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_sarsCov2IgG, loading }) => ({
  app,
  laboratory_test_sarsCov2IgG,
  loading,
}))(withI18n()(Form.create()(ModalResultEdit)))
