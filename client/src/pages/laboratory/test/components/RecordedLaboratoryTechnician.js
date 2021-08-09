import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Form, Col, Select } from 'antd'
const { Option } = Select

const RecordedLaboratoryTechnician = props => {
  const { form } = props
  const { getFieldDecorator } = form
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '70px',
        }}
      >
        <Col>
          <Form.Item>
            {getFieldDecorator(`recordedLaboratoryTechnician`, {
              rules: [{ required: false }],
              initialValue: props.recordedLaboratoryTechnician,
            })(
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Col style={{ marginRight: '20px' }}>
                  Шинжилгээ хийсэн лабораторийн эмч:
                </Col>
                <Col> {props.recordedLaboratoryTechnician}</Col>
              </div>
            )}
          </Form.Item>
        </Col>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Col>
          <Form.Item>
            {getFieldDecorator(`verifiedLaboratoryTechnician`, {
              rules: [{ required: false }],
              initialValue: props.recordedLaboratoryTechnician,
            })(
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Col style={{ marginRight: '20px' }}>
                  Шинжилгээ баталгаажуулсан:
                </Col>
                <Col>
                  {' '}
                  <Select defaultValue="М.Алтанхүү">
                    <Option value="М.Алтанхүү">М.Алтанхүү</Option>
                    <Option value="Б.Солонго">Б.Солонго</Option>
                  </Select>
                </Col>
              </div>
            )}
          </Form.Item>
        </Col>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Col>
          <div
            style={{
              border: 'dashed',
              borderWidth: '1px',
              width: '320px',
            }}
          ></div>
        </Col>
      </div>
    </div>
  )
}

RecordedLaboratoryTechnician.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test, dispatch }) => ({
  app,
  loading,
  laboratory_test,
  dispatch,
}))(withI18n()(Form.create()(RecordedLaboratoryTechnician)))
