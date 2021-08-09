import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withI18n } from '@lingui/react'

import { ValuesetResourceTypes } from '../const'

import { Form, Input, Select, Modal } from 'antd'

const { Option } = Select
const { Search } = Input

const formItemLayout = {
  layout: 'horizontal',
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
class ReferenceModal extends PureComponent {
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
    const {
      onOk,
      form,
      i18n,
      selectedItem = {},
      element,
      ...modalProps
    } = this.props

    const { getFieldDecorator } = form

    switch (element) {
      case 'subjectServiceRequest':
        return (
          <Modal {...modalProps} onOk={this.handleOk}>
            <Form
              onSubmit={this.handleSubmit}
              key="keyReferenceForm"
              {...formItemLayout}
            >
              <Form.Item label={i18n.t`Identifier`} hasFeedback>
                {getFieldDecorator('identifier', {
                  initialValue: selectedItem.identifier,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputIdentifier`,
                    },
                  ],
                })(
                  <Search
                    placeholder="Identifier"
                    onSearch={value => console.log(value)}
                  />
                )}
              </Form.Item>
            </Form>
          </Modal>
        )
      case 'basedOnServiceRequest':
        return (
          <Modal {...modalProps} onOk={this.handleOk}>
            <Form
              onSubmit={this.handleSubmit}
              key="keyReferenceForm"
              {...formItemLayout}
            >
              <Form.Item label={i18n.t`Type`} hasFeedback>
                {getFieldDecorator('type', {
                  initialValue: selectedItem.type,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputType`,
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder={i18n.t`ResourceType`}
                  >
                    {ValuesetResourceTypes.map(v => {
                      if (
                        v.code === 'CarePlan' ||
                        v.code === 'ServiceRequest' ||
                        v.code === 'MedicationRequest'
                      ) {
                        return (
                          <Option key={v.code} value={v.code}>
                            {v.display}
                          </Option>
                        )
                      }
                    })}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label={i18n.t`Display`} hasFeedback>
                <Input placeholder="Display" />
              </Form.Item>
            </Form>
          </Modal>
        )
      default:
        return (
          <Modal {...modalProps} onOk={this.handleOk}>
            <Form
              onSubmit={this.handleSubmit}
              key="keyReferenceForm"
              {...formItemLayout}
            >
              <Form.Item label={i18n.t`Type`} hasFeedback>
                {getFieldDecorator('type', {
                  initialValue: selectedItem.type,
                  rules: [
                    {
                      required: false,
                      message: i18n.t`WarningInputType`,
                    },
                  ],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder={i18n.t`ResourceType`}
                  >
                    {ValuesetResourceTypes.map(v => (
                      <Option key={v.code} value={v.code}>
                        {v.display}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>

              <Form.Item label={i18n.t`Identifier`} hasFeedback>
                {getFieldDecorator('identifier', {
                  initialValue: selectedItem.identifier,
                  rules: [
                    {
                      required: false,
                      message: i18n.t`WarningInputIdentifier`,
                    },
                  ],
                })(
                  <Search
                    placeholder="Identifier"
                    onSearch={value => console.log(value)}
                  />
                )}
              </Form.Item>

              <Form.Item label={i18n.t`Display`} hasFeedback>
                <Input placeholder="Display" />
              </Form.Item>

              <Form.Item label={i18n.t`Reference`} hasFeedback>
                <Input
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="[base]/[type]/[id]"
                />
              </Form.Item>
            </Form>
          </Modal>
        )
    }
  }
}

ReferenceModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ReferenceModal
