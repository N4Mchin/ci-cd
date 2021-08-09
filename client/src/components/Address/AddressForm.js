import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Select, Form, Col, Row, Input } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { AddressUse, AddressType } from '../const'
import { LocationCascader, Period, AddressLine } from 'components'
const { Option } = Select

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

@withI18n()
@Form.create()
class AddressForm extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      defaultUse: 'home',
      defaultType: 'both',
    }
  }

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
    const { form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <Row gutter={8}>
          <Col span={12}>
            <FormItem
              label={i18n.t`AddressUse`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('use', {
                initialValue: this.state.defaultUse,
                rules: [{ required: true }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder={i18n.t`AddressUse`}
                >
                  {AddressUse.map(v => (
                    <Option key={v.code} value={v.code}>
                      {<Trans id={v.display} />}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              label={i18n.t`AddressType`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('type', {
                rules: [{ required: true }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder={i18n.t`AddressType`}
                >
                  {AddressType.map(v => (
                    <Option key={v.code} value={v.code}>
                      {<Trans id={v.display} />}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem
              label={i18n.t`AddressLocation`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('location', {
                rules: [{ required: true }],
              })(<LocationCascader />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <Form.Item hasFeedback>
              {getFieldDecorator('line', {
                rules: [{ required: false, message: 'Please input line' }],
              })(<AddressLine placeholder={i18n.t`AddressLine`} />)}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={i18n.t`AddressPostalCode`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('postalCode', {
                rules: [
                  { required: false, message: 'Please input postal code' },
                ],
              })(<Input placeholder={i18n.t`AddressPostalCode`} />)}
            </Form.Item>
          </Col>

          <Col span={12}>
            <FormItem
              label={i18n.t`AddressPeriod`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('period', {
                rules: [{ required: false }],
              })(<Period />)}
            </FormItem>
          </Col>

          <Col span={24} style={{ marginTop: '10px' }}>
            <Button
              icon="plus-circle"
              htmlType="submit"
              style={{ float: 'right' }}
            >
              {' '}
              {<Trans id="Add" />}
            </Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

AddressForm.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
}

export default AddressForm
