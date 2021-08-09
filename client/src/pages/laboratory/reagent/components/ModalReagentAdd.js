import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { Modal, Form, Input, Select, Button, DatePicker } from 'antd'
import { ConfirmModal, ModuleBox } from 'components'

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

const ModalReagentAdd = props => {
  const { form } = props
  const { getFieldDecorator } = form
  const [submitLoading, setSubmitLoading] = useState(false)

  const onSubmit = () => {
    setSubmitLoading(true)
    return form
      .validateFields()
      .then(values => {
        return props.dispatch({
          type: 'laboratory_reagent/saveReagent',
          payload: {
            testName: props.testName,
            values,
          },
        })
      })
      .then(() => {
        return props.onSubmit()
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setSubmitLoading(false))
  }

  return (
    <Modal
      {...props}
      maskClosable={false}
      closable={false}
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
              // disabled: !formComplete,
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
      <ModuleBox title={props.testName}>
        <Form
          //  onSubmit={handleSubmit}
          key="keyRequiredForm"
          // layout="vertical"
          // autoComplete="off"
          //  labelAlign="right"
          colon="false"
          hideRequiredMark={true}
        >
          <Form.Item
            label={<Trans id="Barcode of Reeagent" />}
            hasFeedback={false}
            validateStatus="validating"
            {...formItemLayout}
          >
            {getFieldDecorator('reagentBarcode', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item
            label={<Trans id="LOT number of reagent" />}
            hasFeedback={false}
            help={false}
            {...formItemLayout}
          >
            {getFieldDecorator('reagentLotNumber', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item
            label={<Trans id="Reagent Type" />}
            hasFeedback={false}
            help={false}
            {...formItemLayout}
          >
            {getFieldDecorator('reagentType', {
              rules: [
                {
                  required: !true,
                },
              ],
            })(<Input />)}
          </Form.Item>

          <Form.Item
            label={<Trans id="Expiration date of reagent" />}
            hasFeedback={false}
            help={false}
            {...formItemLayout}
          >
            {getFieldDecorator('reagentExpirationDate', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item
            label={<Trans id="Quantitiy" />}
            hasFeedback={false}
            help={false}
            {...formItemLayout}
          >
            {getFieldDecorator('quantity', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </ModuleBox>
    </Modal>
  )
}

ModalReagentAdd.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ laboratory_reagent, loading, dispatch }) => ({
  laboratory_reagent,
  loading,
  dispatch,
}))(withI18n()(Form.create()(ModalReagentAdd)))
