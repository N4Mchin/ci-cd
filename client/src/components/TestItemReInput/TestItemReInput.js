import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { WarningTwoTone } from '@ant-design/icons'
import FloatNumber from '../FloatNumber/FloatNumber'
import * as helper from 'utils/helper'

const TestItemReInput = props => {
  const { test, disabled, valueQuantity } = props
  const { display, unit, referenceRange, newValue } = test
  const [value, setValue] = useState('')
  const onChange = value => {
    setValue(value)
    props.onChange(value)
  }

  let color
  let relatedReferenceRange

  try {
    relatedReferenceRange = helper.getRelatedReferenceRange(
      referenceRange,
      props.patient
    )
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  const low = helper.deepGet(relatedReferenceRange, ['low', 'value'])
  const high = helper.deepGet(relatedReferenceRange, ['high', 'value'])

  if ((low && valueQuantity < low) || (high && valueQuantity > high)) {
    color = 'red'
  }

  return (
    <Row
      type="flex"
      // justify="space-between"
      align="middle"
    >
      <Col span={12} style={{ lineHeight: '10px', margin: '0 4px' }}>
        <Row type="flex" align="middle">
          {!disabled && (
            <Col>
              <WarningTwoTone twoToneColor="#F44336" />
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
            >
              {unit}
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={5}>
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
          {valueQuantity}
        </div>
      </Col>
      <Col span={5}>
        {!disabled && (
          <FloatNumber
            low={helper.deepGet(relatedReferenceRange, ['low', 'value'])}
            high={helper.deepGet(relatedReferenceRange, ['high', 'value'])}
            unit={unit}
            value={value}
            placeholder={newValue}
            disabled={disabled}
            onChange={onChange}
          />
        )}
      </Col>
    </Row>
  )
}

TestItemReInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default TestItemReInput
// lastUpdated: Sod-Erdene 2021-01-14
