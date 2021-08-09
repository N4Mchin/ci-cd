import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import SelectQualitativeTestResult from '../SelectQualitativeTestResult'

const QualitativeTetsResultInput = props => {
  const { test, disabled } = props
  const { display } = test

  const onChange = val => {
    props.onChange(val)
  }

  return (
    <Row type="flex" align="middle">
      <Col span={12}>{display}</Col>
      <Col span={12}>
        <SelectQualitativeTestResult onChange={onChange} disabled={disabled} />
      </Col>
    </Row>
  )
}

QualitativeTetsResultInput.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default QualitativeTetsResultInput
