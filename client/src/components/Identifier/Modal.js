import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Row, Col, Button } from 'antd'
import { withI18n } from '@lingui/react'
import { ValuesetIdentifierUse, ValuesetIdentifierType } from '../const'
import { Period } from 'components'

const Option = Select.Option

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

const defaultUse = 'official'
const defaultType = 'PPN'

@withI18n()
@Form.create()
class IdentifierModal extends PureComponent {
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
          <Row gutter={8}>
            <Col span={24}>
              <Form.Item
                label={i18n.t`IdentifierUse`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('use', {
                  initialValue: selectedItem.use || defaultUse,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputIdentifierUse`,
                    },
                  ],
                })(
                  <Select>
                    {ValuesetIdentifierUse.map(v => (
                      <Option key={v.code} value={v.code}>
                        {v.display}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={i18n.t`IdentifierType`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('type', {
                  initialValue:
                    (selectedItem.type &&
                      selectedItem.type.coding &&
                      selectedItem.type.coding['0'].code) ||
                    defaultType,
                })(
                  <Select>
                    {ValuesetIdentifierType.map(v => (
                      <Option key={v.code} value={v.code}>
                        {v.display}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={i18n.t`IdentifierValue`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('value', {
                  initialValue: selectedItem.value,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputIdentifierValue`,
                    },
                  ],
                })(<Input required placeholder={i18n.t`IdentifierValue`} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24}>
              <Form.Item
                label={i18n.t`IdentifierPeriod`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('period', {
                  initialValue: selectedItem.period,
                  rules: [
                    {
                      required: false,
                      message: i18n.t`WarningInputPeriod`,
                    },
                  ],
                })(<Period />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

IdentifierModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default IdentifierModal
