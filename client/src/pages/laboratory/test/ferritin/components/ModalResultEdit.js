import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Divider, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  TestItemEditWithLabel,
  TestItemEditedWithDisplay,
} from 'components'
import * as helper from 'utils/helper'

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
    Ferritin,
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
          type: 'laboratory_test_ferritin/queryLabTestResult',
          payload: {
            serviceRequestId: props.rowData.serviceRequest.id,
          },
        })
        .then(data => setModalData(data))
        .then(() => setLoadingData(false))
        .catch(errorInfo => console.log(errorInfo))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onSubmit() {
    setSubmitLoading(true)

    return form
      .validateFields()
      .then(values => {
        const { testResult, regulatoryNotes } = values

        const floatValue = parseFloat(testResult)
        if (isNaN(floatValue)) {
          throw new Error('value should be float')
        }

        const payload = {
          testData: props.rowData,
          testCode: Ferritin,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_ferritin/editResult',
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

  const onFormChange = () => {
    const formValues = form.getFieldsValue()
    if (!!formValues.testResult) {
      setFormComplete(true)
    } else {
      setFormComplete(false)
    }
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
            onChange={onFormChange}
          >
            <OrderInfo {...props.rowData} />
            <Divider style={{ background: '#ccc' }} />
            <Row gutter={32}>
              <Col span={12}>
                <TestNumberLabel
                  testName={Ferritin.display}
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
                  })(
                    <TestItemEditWithLabel
                      // patient={props.rowData.patient}
                      test={Ferritin}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator('regulatoryNotes', {
                    initialValue: props.rowData.regulatoryNotesValue,
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
  laboratory_test_ferritin: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_ferritin, loading }) => ({
  app,
  laboratory_test_ferritin,
  loading,
}))(withI18n()(Form.create()(ModalResultEdit)))
