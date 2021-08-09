import React from 'react'
import { Form, Input, Button, Row, Col, Select } from 'antd'
import { withI18n } from '@lingui/react'
import { NameUse } from '../const'
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

@withI18n()
@Form.create()
class NameForm extends React.Component {
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
      <Form
        onSubmit={this.handleSubmit}
        key="keyHumanNameForm"
        layout="horizontal"
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label={i18n.t`HumanNameFamily`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('family', {
                rules: [
                  {
                    required: true,
                    message: i18n.t`WarningInputHumanNameFamily`,
                  },
                ],
              })(<Input placeholder={i18n.t`HumanNameFamily`} />)}
            </Form.Item>

            <Form.Item
              label={i18n.t`HumanNamePrefix`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('prefix')(
                <Select
                  mode="tags"
                  placeholder={i18n.t`HumanNamePrefix`}
                  notFoundContent={null}
                  key="keyHumanNamePrefix"
                ></Select>
              )}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={i18n.t`HumanNameGiven`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('given', {
                rules: [
                  {
                    required: true,
                    message: i18n.t`WarningInputHumanNameGiven`,
                  },
                ],
              })(
                <Select
                  mode="tags"
                  placeholder={i18n.t`HumanNameGiven`}
                  notFoundContent={null}
                  key="keyHumanNameGiven"
                ></Select>
              )}
            </Form.Item>

            <Form.Item
              label={i18n.t`HumanNameSuffix`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('suffix')(
                <Select
                  mode="tags"
                  placeholder={i18n.t`HumanNameSuffix`}
                  notFoundContent={null}
                  key="keyHumanNameSuffix"
                ></Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              label={i18n.t`HumanNamePeriod`}
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
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              label={i18n.t`HumanNameUse`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('use', {
                rules: [{ required: true }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder={i18n.t`HumanNameUse`}
                >
                  {NameUse.map(v => (
                    <Option key={v.code} value={v.code}>
                      {v.display}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>

          <Col span={12}>
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

export default NameForm
