import React from 'react'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import { withI18n } from '@lingui/react'
import { ValuesetIdentifierUse, ValuesetIdentifierType } from '../const'
import { Period } from 'components'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const defaultUse = 'official'
const defaultType = 'PPN'

@withI18n()
@Form.create()
class IdentifierForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk } = this.props
        onOk(values)
      }
    })
  }

  render() {
    const { form, i18n, selectedItem = {} } = this.props
    const { getFieldDecorator } = form

    return (
      <Form
        onSubmit={this.handleSubmit}
        key="keyIdentifierForm"
        layout="horizontal"
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label={i18n.t`IdentifierUse`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('use', {
                initialValue: defaultUse,
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

          <Col span={12}>
            <Form.Item
              label={i18n.t`IdentifierValue`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('value', {
                rules: [
                  {
                    required: true,
                    message: i18n.t`WarningInputIdentifierValue`,
                  },
                ],
              })(<Input required placeholder={i18n.t`IdentifierValue`} />)}
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label={i18n.t`IdentifierType`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('type', {
                initialValue: defaultType,
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
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label={i18n.t`IdentifierPeriod`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('period', {
                rules: [
                  {
                    required: false,
                    message: i18n.t`WarningInputPeriod`,
                  },
                ],
              })(<Period />)}
            </Form.Item>
          </Col>

          <Col span={24}>
            <Button
              icon="plus-circle"
              htmlType="submit"
              style={{
                float: 'right',
                marginTop: '32px',
                marginRight: '4px',
                bottom: '4px',
              }}
            >
              {' '}
              {i18n.t`Add`}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default IdentifierForm
