import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Spin } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  EmptyTestItem,
  ConfirmModal,
  Seperator,
} from 'components'

import { OrderInfo } from '../../components'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultInput = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form
  const {
    Sars_Cov2_IgG_Elisa,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formComplete, setFormComplete] = useState(false)
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
          type: 'laboratory_test_sarsCov2IgGElisa/queryLabTestResult',
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
        const { regulatoryNotes, testResult } = values

        const payload = {
          testData: props.rowData,
          testCode: Sars_Cov2_IgG_Elisa,
          testResult: testResult,
          regulatoryNotes: regulatoryNotes,
        }

        return props.dispatch({
          type: 'laboratory_test_sarsCov2IgGElisa/saveResult',
          payload: payload,
        })
      })
      .then(res => props.onSubmit())
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
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
          className="button-gray uppercase"
          onClick={props.onCancel}
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
                <Form.Item>
                  {getFieldDecorator('testResult', {
                    rules: [
                      {
                        required: true,
                        message: i18n.t`Enter test result value`,
                      },
                    ],
                  })(
                    <EmptyTestItem
                      patient={props.rowData.patient}
                      test={Sars_Cov2_IgG_Elisa}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
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
)(withI18n()(Form.create()(ModalResultInput)))
