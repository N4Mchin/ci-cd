import React from 'react'
import PropTypes from 'prop-types'
import { Trans } from '@lingui/react'
import { Row, Col, Icon } from 'antd'
import SelectQualitativeTestResult from '../SelectQualitativeTestResult'

const QualitativeTestResultEdit = props => {
  const { test, disabled, value } = props

  const { display } = test

  const onChange = val => {
    props.onChange(val)
  }

  let color

  return (
    <Row type="flex" align="middle">
      <Col span={8} style={{ lineHeight: '10px' }}>
        <Row type="flex" align="middle">
          {value && value !== '' && (
            <Col>
              <Icon type="info-circle" theme="twoTone" />
              &nbsp;&nbsp;
            </Col>
          )}

          <Col>
            <div>{display}</div>
            <div
              style={{
                fontSize: '10',
                color: '#C9C9C9',
                marginTop: '4px',
              }}
            ></div>
          </Col>
        </Row>
      </Col>

      <Col span={8}>
        <div
          style={{
            color: color,
            border: '1px solid #e8e8e8',
            borderRadius: '2px',
            background: disabled ? '#f5f5f5' : '#fff',
            height: '32px',
            lineHeight: '12px',
            padding: '8px 8px',
            margin: '4px 0',
          }}
        >
          <Trans id={value}></Trans>
        </div>
      </Col>
      <Col span={8}>
        {!disabled && <SelectQualitativeTestResult onChange={onChange} />}
      </Col>
    </Row>
  )
}

QualitativeTestResultEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default QualitativeTestResultEdit
