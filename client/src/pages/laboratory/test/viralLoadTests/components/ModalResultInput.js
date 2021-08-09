import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Divider, Button } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import {
  ModuleBox,
  RegulatoryNotes,
  EmptyTestItem,
  ConfirmModal,
} from 'components'
import { OrderInfo } from '../../components'
import { isEmptyObject } from 'utils/helper'

const Title = (
  <Trans>
    <span className="title uppercase">Lab Test </span>
    <span className="uppercase">Result</span>
  </Trans>
)

const ModalResultInput = props => {
  const {
    app,
    location,
    laboratory_test_viralLoadTests,
    loading,
    i18n,
    form,
    ...modalProps
  } = props

  const { getFieldDecorator } = form
  const { ViralLoadTests } = props.app.FHIR_CODES.UncategorizedTests
  const [submitLoading, setSubmitLoading] = useState(false)
  const [formComplete, setFormComplete] = useState(false)

  async function onSubmit() {
    setSubmitLoading(true)

    return await form
      .validateFields()
      .then(values => {
        const { testResult, regulatoryNotes } = values

        if (testResult && !isEmptyObject(testResult)) {
          const payload = {
            testData: props.rowData,
            testResult: testResult,
            testNameString: props.testNameString,
            testCode: ViralLoadTests.include[props.testNameString],
            regulatoryNotes: regulatoryNotes,
          }

          return props.dispatch({
            type: 'laboratory_test_viralLoadTests/saveResult',
            payload: payload,
          })
        }
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
      {...modalProps}
      maskClosable={false}
      closable={false}
      footer={[
        <Button
          className="button-gray uppercase"
          onClick={modalProps.onCancel}
          style={{ marginRight: '8px' }}
        >
          <Trans id="Cancel" />
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
      <ModuleBox title={Title}>
        <OrderInfo {...props.rowData} />
        <Divider style={{ background: '#ccc' }} />
        <Form
          layout="horizontal"
          labelAlign="left"
          colon={false}
          onChange={onFormChange}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator('testResult', {
                  rules: [
                    {
                      required: formComplete,
                      message: i18n.t`Enter test result value`,
                    },
                  ],
                })(
                  <EmptyTestItem
                    patient={props.rowData.patient}
                    test={ViralLoadTests.include[props.testNameString]}
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
    </Modal>
  )
}

ModalResultInput.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_viralLoadTests, loading }) => ({
  app,
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(Form.create()(ModalResultInput)))
