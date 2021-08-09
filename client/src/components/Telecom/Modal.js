import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import { ContactPointSystem, ContactPointUse, ContactPointRank } from '../const'
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

@withI18n()
@Form.create()
class TelecomModal extends PureComponent {
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
    const { onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <Row key="rowPass" gutter={8}>
            <Col span={24}>
              <Form.Item
                label={i18n.t`TelecomSystem`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('system', {
                  initialValue: this.props.selectedItem.system,
                  rules: [{ required: true }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder={i18n.t`TelecomSystem`}
                  >
                    {ContactPointSystem.map(v => (
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
                label={i18n.t`TelecomUse`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('use', {
                  initialValue: this.props.selectedItem.use,
                  rules: [{ required: true }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder={i18n.t`TelecomUse`}
                  >
                    {ContactPointUse.map(v => (
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
                label={i18n.t`TelecomRank`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('rank', {
                  initialValue: this.props.selectedItem.rank,
                  rules: [{ required: false }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder={i18n.t`TelecomRank`}
                  >
                    {ContactPointRank.map(v => (
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
                label={i18n.t`TelecomValue`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('value', {
                  initialValue: this.props.selectedItem.value,
                  rules: [{ required: true, message: 'WarningInputValue' }],
                })(<Input placeholder={i18n.t`TelecomValue`} />)}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={i18n.t`TelecomPeriod`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('period', {
                  initialValue: this.props.selectedItem.period,
                  rules: [
                    { required: false, message: i18n.t`WarningInputPeriod` },
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

TelecomModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default TelecomModal
