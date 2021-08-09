import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import { NameUse } from '../const'
import { Period } from 'components'
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

@withI18n()
@Form.create()
class NameModal extends PureComponent {
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
          <Row key="keyHumanNameRow" gutter={8}>
            <Col span={24}>
              <FormItem
                label={i18n.t`HumanNameUse`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('use', {
                  initialValue: this.props.selectedItem.use,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputHumanNameUse`,
                    },
                  ],
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
              </FormItem>

              <FormItem
                label={i18n.t`HumanNameFamily`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('family', {
                  initialValue: selectedItem.family || '',
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputHumanNameFamily`,
                    },
                  ],
                })(
                  <Input
                    placeholder={i18n.t`HumanNameFamily`}
                    key="keyHumanNameFamily"
                  />
                )}
              </FormItem>

              <FormItem
                label={i18n.t`HumanNameGiven`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('given', {
                  initialValue: selectedItem.given,
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
              </FormItem>

              <FormItem
                label={i18n.t`HumanNamePrefix`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('prefix', {
                  initialValue: selectedItem.prefix,
                })(
                  <Select
                    mode="tags"
                    placeholder={i18n.t`HumanNamePrefix`}
                    notFoundContent={null}
                    key="keyHumanNamePrefix"
                  ></Select>
                )}
              </FormItem>

              <FormItem label={i18n.t`HumanNameSuffix`} {...formItemLayout}>
                {getFieldDecorator('suffix', {
                  initialValue: selectedItem.suffix,
                })(
                  <Select
                    mode="tags"
                    placeholder={i18n.t`HumanNameSuffix`}
                    notFoundContent={null}
                    key="keyHumanNameSuffix"
                  ></Select>
                )}
              </FormItem>

              <Form.Item
                label={i18n.t`HumanNamePeriod`}
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('period', {
                  initialValue: selectedItem.period,
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

NameModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default NameModal
