import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Checkbox, Input } from 'antd'

const TestItemCheck = props => {
  const { value, name, unit, low, high } = props.test
  let color

  console.log(name, value, low, high, value < low, value > high)

  if (value < low || value > high) {
    color = 'red'
  }

  const onChange = () => {}

  return (
    <Row type="flex" justify="space-between">
      <Col span={10}>
        <Checkbox>{props.test.name}</Checkbox>
      </Col>
      <Col span={6}>
        <Input disabled value={props.test.value} style={{ color: color }} />
      </Col>
      <Col span={6} style={{ fontSize: '10', color: '#C9C9C9' }}>
        {props.test.unit}
      </Col>
    </Row>
  )
}

TestItemCheck.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default TestItemCheck
