import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'

import { Form, Input, Select } from 'antd'
import {
  Row,
  Col,
  Checkbox,
  DatePicker,
  Button,
  Divider,
  InputNumber,
} from 'antd'
import { ButtonRed, ButtonGrey } from 'components'
const { Option } = Select

const OtherSampleRegistryForm = props => {
  const { dispatch, laboratory, form, i18n } = props

  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  }

  return (
    <div>
      <div>
        <h3>Сорьцын протокол бөглөх</h3>
      </div>
      <div style={{ height: '20px' }}></div>
      <Form style={{ fontSize: '8px' }}>
        <div>
          <Row>
            <Col span={14}>
              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Сорьц илгээсэн газар"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    label="Нийт сорьцын тоо"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Илгээсэн огноо"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    label="HCV-RNA сорьцйн тоо"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Хүлээн авсан огноо"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    label="HBV-DNA сорьцын тоо"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Хүлээн авах үеийн температур"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    label="HDV-RNA сорьцын тоо"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <Form.Item
                    label="Тээвэрлэлтийн төрөл"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={11} offset={1}>
                  <Form.Item
                    label="Anti-HDV сорьцын тоо"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col span={2}>
              <div
                style={{
                  height: '280px',
                  display: 'flex',
                  transform: 'rotate(-90deg)',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Divider type="horizontal" style={{ width: '180px' }}></Divider>{' '}
                <p style={{ fontSize: '10px' }}>
                  {' '}
                  Үйчлүүлэгчийн баркод оруулах хэсэг
                </p>
              </div>
            </Col>

            {/* secondColumn */}
            <Col span={8}>
              <Row gutter={8} justify="space-between">
                <Col span={18}>
                  <Form.Item
                    label="Сорьц Хэвийн"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={6} style={{ marginTop: '4px' }}>
                  <ButtonRed block>Нэмэх</ButtonRed>
                </Col>
              </Row>

              <Row gutter={8} justify="space-between">
                <Col span={18}>
                  <Form.Item
                    label="Сорьц гемолиз"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={6} style={{ marginTop: '4px' }}>
                  <ButtonRed block disabled>
                    Нэмэх
                  </ButtonRed>
                </Col>
              </Row>

              <Row gutter={8} justify="space-between">
                <Col span={18}>
                  <Form.Item
                    label="Сорьц хелеоз"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={6} style={{ marginTop: '4px' }}>
                  <ButtonRed block disabled>
                    Нэмэх
                  </ButtonRed>
                </Col>
              </Row>

              <Row gutter={8} justify="space-between">
                <Col span={18}>
                  <Form.Item
                    label="Сорьц Хэмжээ бага"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={6} style={{ marginTop: '4px' }}>
                  <ButtonRed block disabled>
                    Нэмэх
                  </ButtonRed>
                </Col>
              </Row>

              <Row gutter={8} justify="space-between">
                <Col span={18}>
                  <Form.Item
                    label="Сорьц асгарсан"
                    {...formItemLayout}
                    labelAlign="left"
                    colon={false}
                  >
                    {getFieldDecorator('barcode', {
                      rules: [{ required: false }],
                    })(<Input></Input>)}
                  </Form.Item>
                </Col>
                <Col span={6} style={{ marginTop: '4px' }}>
                  <ButtonRed block disabled>
                    Нэмэх
                  </ButtonRed>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  )
}

OtherSampleRegistryForm.propTypes = {
  laboratory_otherSamplesRegistry: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_otherSamplesRegistry }) => ({
  laboratory_otherSamplesRegistry,
}))(withI18n()(Form.create()(OtherSampleRegistryForm)))

//created Sanjaasuren.E
//2020.03.31
