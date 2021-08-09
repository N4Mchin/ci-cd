import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Checkbox } from 'antd'

const TestItem = props => {
  const { test, disabled, valueQuantity } = props
  const { display, unit, referenceRange } = test
  let color

  if (
    referenceRange &&
    referenceRange.low &&
    valueQuantity < referenceRange.low.value
  ) {
    color = 'red'
  } else if (
    referenceRange &&
    referenceRange.high &&
    valueQuantity > referenceRange.high.value
  ) {
    color = 'red'
  }

  const onChange = event => {
    props.onChange(event.target.checked)
  }
  return (
    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Col span={14} style={{ alignSelf: 'center' }}>
        <div>
          <div style={{ lineHeight: '10px' }}>
            <Checkbox disabled={disabled} onChange={onChange}>
              {display}
            </Checkbox>
          </div>
          <div
            style={{
              margin: '0 0 5px 26px',
              lineHeight: '10px',
              fontSize: '10',
              color: '#C9C9C9',
            }}
          >
            {unit}
          </div>
        </div>
      </Col>
      <Col span={8} style={{ margin: '0 0 10px 0' }}>
        <div
          style={{
            color: color,
            border: '1px solid #e5e5e5',
            borderRadius: '2px',
            height: '28px',
            lineHeight: '10px',
            padding: '8px 8px ',
            background: disabled ? '#f5f5f5' : '#fff',
          }}
        >
          {valueQuantity}
        </div>
      </Col>
    </Row>
  )
}

TestItem.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default TestItem
