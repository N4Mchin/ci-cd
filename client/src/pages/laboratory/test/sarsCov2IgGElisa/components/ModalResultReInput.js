import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  ConfirmModal,
  Seperator,
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

const ModalResultReInput = props => {
  const {
    app,
    location,
    laboratory_test_sarsCov2IgGElisa,
    loading,
    i18n,
    form,
    ...modalProps
  } = props

  const { getFieldDecorator } = form
  const { Sars_Cov2_IgG_Elisa } =
    props.app.FHIR_CODES &&
    props.app.FHIR_CODES.UncategorizedTests.OtherTests.include

  const [loadingData, setLoadingData] = useState(false)
  const [modalData, setModalData] = useState(false)
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
          type: 'laboratory_test_sarsCov2IgGElisa/queryLabTestResult',
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
        const { testResult, regulatoryNotes } = values

        const payload = {
          testData: props.rowData,
          testCode: Sars_Cov2_IgG_Elisa,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_sarsCov2IgGElisa/editResult',
          payload: payload,
        })
      })
      .then(res => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  const observationArray = Object.assign([], props.rowData.observation)

  let firstValue
  let first

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
      {...modalProps}
      maskClosable={false}
      closable={false}
      footer={[
        <Button
          key="reInput-cancel-button"
          className="button-gray uppercase"
          onClick={modalProps.onCancel}
          style={{ marginRight: '8px' }}
        >
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
          <Form
            layout="horizontal"
            labelAlign="left"
            colon={false}
            onChange={onFormChange}
          >
            <OrderInfo {...props.rowData} />
            <Seperator />
            <Row gutter={32}>
              <Col span={12}>
                <TestNumberLabel
                  testName={Sars_Cov2_IgG_Elisa.display}
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
                  })(<TestItemEditWithLabel test={Sars_Cov2_IgG_Elisa} />)}
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

ModalResultReInput.propTypes = {
  laboratory_test_sarsCov2IgGElisa: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, laboratory_test_sarsCov2IgGElisa, loading }) => ({
    app,
    laboratory_test_sarsCov2IgGElisa,
    loading,
  })
)(withI18n()(Form.create()(ModalResultReInput)))
