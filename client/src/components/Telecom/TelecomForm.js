import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import { withI18n } from '@lingui/react'
import { ContactPointSystem, ContactPointUse, ContactPointRank } from '../const'
import { Period } from 'components'

const { Option } = Select

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
class TelecomFrom extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk } = this.props
        let payload = values
        if (payload.rank !== undefined) {
          payload.rank = parseInt(values.rank)
        }

        onOk(payload)
      }
    })
  }

  render() {
    const { form, i18n } = this.props

    const { getFieldDecorator } = form

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={8}>
          <Col span={12} style={{ paddingLeft: '8px', paddingRight: '8px' }}>
            <Form.Item
              label={i18n.t`TelecomSystem`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('system', {
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

            <Form.Item
              label={i18n.t`TelecomUse`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('use', {
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

            <Form.Item
              label={i18n.t`TelecomRank`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('rank', {
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

            <Form.Item
              label={i18n.t`TelecomValue`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('value', {
                rules: [{ required: true, message: i18n.t`WarningInputValue` }],
              })(<Input placeholder={i18n.t`TelecomValue`} />)}
            </Form.Item>
          </Col>

          <Col span={12} style={{ paddingLeft: '8px', paddingRight: '8px' }}>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item
                  label={i18n.t`TelecomPeriod`}
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
                  })(<Period type="" />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Button
                icon="plus-circle"
                htmlType="submit"
                style={{ float: 'right', margin: '8px' }}
              >
                {' '}
                {i18n.t`Add`}
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default TelecomFrom
