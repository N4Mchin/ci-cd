import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import {
  Form,
  Row,
  Col,
  Button,
  Divider,
  DatePicker,
  Radio,
  Upload,
  Input,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { ConfirmModal } from 'components'
import styles from '../../../styles.less'
// import * as helper from 'utils/helper'

const OtherFields = props => {
  const { getFieldDecorator } = props.form

  return (
    <div className={styles.dlivr} style={{ marginTop: '16px' }}>
      <Form>
        {/* <span className="title">Өндөр, жин бүртгэх</span> */}
        {/* 1 */}
        <Row>
          <Col span={12}>
            Өндөр
            <Form.Item>
              {getFieldDecorator('height', {
                rules: [{ required: false }],
                // getValueFromEvent: momentToISOString,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            Жин
            <Form.Item>
              {getFieldDecorator('weight', {
                rules: [{ required: false }],
                // getValueFromEvent: momentToISOString,
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Button type="primary">Save</Button>
        </Row>
        <Divider style={{ backgroundColor: '#999' }} />
        {/* 2 */}
        <Row>
          Мэс ажилбар
          <Form.Item>
            {getFieldDecorator('procedure', {
              rules: [{ required: false }],
              // getValueFromEvent: momentToISOString,
            })(<Input />)}
          </Form.Item>
          <Row type="flex" justify="end">
            <Button type="primary">Save</Button>
          </Row>
        </Row>
        Child phugh score:
        <Row gutter={4}>
          <Col span={4}>
            <Form.Item label="Total bilirubin">
              {getFieldDecorator('childPugh', {
                rules: [{ required: false }],
                // getValueFromEvent: momentToISOString,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Serum albumin">
              {getFieldDecorator('SerumAlbumin', {
                rules: [{ required: false }],
                // getValueFromEvent: momentToISOString,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Prothrombin time">
              {getFieldDecorator('ProthrombinTime', {
                rules: [{ required: false }],
                // getValueFromEvent: momentToISOString,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Ascites">
              {getFieldDecorator('Ascites', {
                rules: [{ required: false }],
                // getValueFromEvent: momentToISOString,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Hepatic encephaloppathy">
              {getFieldDecorator('HepaticEncephaloppathy', {
                rules: [{ required: false }],
                // getValueFromEvent: momentToISOString,
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={4}>Result</Col>
        </Row>
        <Row type="flex" justify="end">
          <Button type="primary">Save</Button>
        </Row>
      </Form>
    </div>
  )
}

OtherFields.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(OtherFields)))
