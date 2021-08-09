import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Button, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { OrderInfo } from '../../components'
import {
  ModuleBox,
  RegulatoryNotes,
  QualitativeTestResultInput,
  ConfirmModal,
} from 'components'

import * as helper from 'utils/helper'

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
    laboratory_test_antiHDV,
    loading,
    i18n,
    form,
    testName,
    ...modalProps
  } = props

  const { getFieldDecorator } = form

  const {
    Anti_HDV,
  } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
  const [submitLoading, setSubmitLoading] = useState(false)
  const [allFields, setAllFields] = useState()
  const [formComplete, setFormComplete] = useState(false)

  const onSubmit = () => {
    setSubmitLoading(true)

    const { testResult } = allFields

    if (testResult && !helper.isEmptyObject(testResult)) {
      return form
        .validateFields()
        .then(values => {
          const { regulatoryNotes } = values

          const payload = {
            testData: props.rowData,
            testCode: Anti_HDV,
            testResult: testResult,
            regulatoryNotes: regulatoryNotes,
          }

          return props.dispatch({
            type: 'laboratory_test_antiHDV/saveResult',
            payload: payload,
          })
        })
        .then(() => {
          return props.onSubmit()
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setSubmitLoading(false))
    }
  }

  const onFormChange = values => {
    if (!!values.testResult) {
      setFormComplete(true)
    } else {
      setFormComplete(false)
    }
  }

  const handleSelect = value => {
    const changingValue = { ...allFields, testResult: value }
    setAllFields(changingValue)
    onFormChange(changingValue)
  }

  // const handleRegulatoryNotes = event => {
  //   const changingValue = { ...allFields, regulatoryNotes: event.target.value }
  //   setAllFields(changingValue)
  //   onFormChange(changingValue)
  // }

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
      <ModuleBox title={Title}>
        <OrderInfo {...props.rowData} />
        <Divider style={{ background: '#ccc' }} />
        <Row gutter={32}>
          <Col span={12}>
            <QualitativeTestResultInput
              onChange={handleSelect}
              testName={'Anti_HDV'}
              test={Anti_HDV}
            />
          </Col>

          <Col span={12}>
            <Form>
              <Form.Item>
                {getFieldDecorator('regulatoryNotes', {
                  rules: [{ required: false }],
                })(<RegulatoryNotes autoSize={{ minRows: 4, maxRows: 6 }} />)}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </ModuleBox>
    </Modal>
  )
}

ModalResultInput.propTypes = {
  laboratory_test_antiHDV: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_antiHDV, loading }) => ({
  app,
  laboratory_test_antiHDV,
  loading,
}))(withI18n()(Form.create()(ModalResultInput)))
