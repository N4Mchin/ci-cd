import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Divider, Modal, Select, Row } from 'antd'
import { withI18n } from '@lingui/react'
import { ValuesetQualificationCode } from '../const'
import { Period, Identifier } from 'components'

const Option = Select.Option
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

const identifierLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    lg: { span: 24 },
  },
}

@withI18n()
@Form.create()
class QualificationModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedItem: props.selectedItem,
    }
  }

  handleOk = () => {
    const { onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }

  render() {
    const { onOk, form, i18n, selectedItem = {}, ...modalProps } = this.props

    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <Row key="keyQualificationRow" gutter={8}>
            <FormItem hasFeedback {...identifierLayout}>
              {getFieldDecorator('identifier', {
                initialValue: selectedItem.identifier || [],
                rules: [
                  {
                    required: true,
                    message: i18n.t`WarningInputQualificationIdentifier`,
                  },
                ],
              })(<Identifier />)}
            </FormItem>
            <Divider />
            <FormItem
              label={i18n.t`QualificationCode`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('code', {
                initialValue: selectedItem.code,
                rules: [
                  {
                    required: true,
                    message: i18n.t`WarningInputQualificationCode`,
                  },
                ],
              })(
                <Select>
                  {ValuesetQualificationCode.map(v => (
                    <Option key={v.code} value={v.code}>
                      {v.display}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>

            <FormItem label={i18n.t`Period`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('period', {
                initialValue: selectedItem.period,
                rules: [
                  {
                    required: false,
                    message: i18n.t`WarningInputPeriod`,
                  },
                ],
              })(<Period />)}
            </FormItem>
          </Row>
        </Form>
      </Modal>
    )
  }
}

QualificationModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default QualificationModal
