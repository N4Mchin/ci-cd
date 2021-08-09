import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Row, Col } from 'antd'
import { LocationCascader, Period, AddressLine } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { AddressUse, AddressType } from '../const'

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

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
class AddressModal extends PureComponent {
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
    const { onOk, form, selectedItem = {}, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem
              label={i18n.t`AddressUse`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('use', {
                initialValue: selectedItem.use,
                rules: [{ required: true }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder={i18n.t`AddressUse`}
                >
                  {AddressUse.map(v => (
                    <Option key={v.code} value={v.code}>
                      <Trans id={v.display} />
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
                initialValue: selectedItem.type,
                rules: [{ required: true }],
              })(
                <Select
                  style={{ width: '100%' }}
                  placeholder={i18n.t`AddressType`}
                >
                  {AddressType.map(v => (
                    <Option key={v.code} value={v.code}>
                      <Trans id={v.display} />
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label={i18n.t`AddressCountryStateDistrict`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('location', {
                initialValue: selectedItem && {
                  country: selectedItem.country,
                  state: selectedItem.state,
                  district: selectedItem.district,
                },
                rules: [{ required: true }],
              })(<LocationCascader />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <Form.Item
              label={i18n.t`AddressPostalCode`}
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('postalCode', {
                initialValue: selectedItem.postalCode,
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
                initialValue: selectedItem.period,
                rules: [
                  { required: false, message: 'WarningInputAddressPeriod' },
                ],
              })(<Period />)}
            </FormItem>
          </Col>
          <Col span={24}>
            <Form.Item hasFeedback>
              {getFieldDecorator('line', {
                initialValue: selectedItem.line,
                rules: [
                  { required: false, message: 'WarningInputAddressLine' },
                ],
              })(<AddressLine placeholder={i18n.t`AddressLine`} />)}
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    )
  }
}

AddressModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default AddressModal
