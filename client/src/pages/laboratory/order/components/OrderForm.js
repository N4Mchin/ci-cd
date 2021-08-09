import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import { ModuleBox, Board } from 'components'
import { Form, Input, Select, Typography } from 'antd'
import { Row, Col, Checkbox, DatePicker, Button, InputNumber } from 'antd'

const { Option } = Select
const options = [
  { label: 'Тийм', value: 'A' },
  { label: 'Үгүй', value: 'B' },
]
const { Text } = Typography

const OrderForm = props => {
  console.log(props)
  const { dispatch, laboratory, form, i18n } = props

  const { getFieldDecorator } = form
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        dispatch({
          type: 'laboratory_order/queryAddMaterialOrder',
          payload: {
            values: values,
          },
        })
      }
    })
  }

  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  }
  const fromItemDeliveryDate = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  }
  const Title = <Text>Захиалга үүсгэх</Text>
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div
          style={{
            textTransform: 'uppercase',
            width: '100%',
            paddingRight: '5px',
          }}
        >
          <Text strong>Лабораторийн материал </Text>
          <Text>Захиалга</Text>
          <div style={{ height: '1px', background: '#E5E5E9' }} />
        </div>
      </div>
      <ModuleBox title={Title} style={{ marginTop: '5px' }}>
        <Form
          layout="horizontal"
          labelAlign="left"
          onSubmit={handleSubmit}
          className={styles.form}
          alignItems="stretch"
        >
          <Row gutter={25} type="flex" justify="space-between">
            <Col span={6}>
              <Form.Item label={i18n.t`Material Type`} {...formItemLayout}>
                {getFieldDecorator('materialType', {
                  rules: [{ required: false }],
                  initialValue: 'Урвалж оношлуур',
                })(
                  <Select>
                    <Option value="choose1">1</Option>
                    <Option value="choose2">2</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label={i18n.t`Material Name`} {...formItemLayout}>
                {getFieldDecorator('materialName', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Product Code`} {...formItemLayout}>
                {getFieldDecorator('productCode', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Package Size`} {...formItemLayout}>
                {getFieldDecorator('packageSize', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={i18n.t`Measure Unit`} {...formItemLayout}>
                {getFieldDecorator('measureUnit', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Lot Number`} {...formItemLayout}>
                {getFieldDecorator('lotNumber', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Expiry Date`} {...formItemLayout}>
                {getFieldDecorator('expiryDate', {
                  rules: [{ required: false }],
                })(<DatePicker style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Order Quantity`} {...formItemLayout}>
                {getFieldDecorator('orderQuantity', {
                  rules: [{ required: false }],
                })(<InputNumber min={1} max={1000} className={styles.field} />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={i18n.t`Distribution`} {...formItemLayout}>
                {getFieldDecorator('distribution', {
                  rules: [{ required: false }],
                  initialValue: 'Илдэнгүн хошуу ХХК',
                })(
                  <Select className={styles.field}>
                    <Option value="Илдэнгүн хошуу ХХК">
                      Илдэнгүн хошуу ХХК
                    </Option>
                    <Option value="Монгол фарм ХХК">Монгол фарм ХХК</Option>
                    <Option value="Пролианс ХХК">Пролианс ХХК</Option>
                    <Option value="Глобал Комуникешн ХХК">
                      Глобал Комуникешн ХХК
                    </Option>
                    <Option value="Грандмед ХХК">Грандмед ХХК</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label={i18n.t`Phone`} {...formItemLayout}>
                {getFieldDecorator('phone', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Ordered Date`} {...formItemLayout}>
                {getFieldDecorator('orderedDate', {
                  rules: [{ required: false }],
                })(<DatePicker style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Is Delivery`} {...formItemLayout}>
                {getFieldDecorator('isDelivery', {
                  rules: [{ required: false }],
                })(<Checkbox.Group options={options} />)}
              </Form.Item>
            </Col>
            <Col span={5} offset={1}>
              <Form.Item label={i18n.t`Ordered Date`}>
                {getFieldDecorator('orderedDate', {
                  rules: [{ required: false }],
                })(<DatePicker style={{ width: '100%' }} />)}
              </Form.Item>
              <br></br> <br></br>
              <Form.Item>
                <Button type="primary" block>
                  Захиалга үүсгэх
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModuleBox>
    </div>
  )
}

OrderForm.propTypes = {
  laboratory_order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_order }) => ({ laboratory_order }))(
  withI18n()(Form.create()(OrderForm))
)
