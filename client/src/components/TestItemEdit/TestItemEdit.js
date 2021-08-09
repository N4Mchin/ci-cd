import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Icon } from 'antd'
import FloatNumber from '../FloatNumber/FloatNumber'
import * as helper from 'utils/helper'

const TestItemEdit = props => {
  const { test, disabled, valueQuantity } = props
  const { display, unit, referenceRange, newValue } = test
  const [changingValue, setChangingValue] = useState('')
  const [relatedReferenceRange, setRelatedReferenceRange] = useState()
  const [color, setColor] = useState()

  const onChange = stringValue => {
    setChangingValue(stringValue)

    if (stringValue && stringValue !== '') {
      props.onChange(stringValue)
    } else {
      props.onChange()
    }
  }

  useEffect(() => {
    try {
      let newRelatedReferenceRange = helper.getRelatedReferenceRange(
        referenceRange,
        props.patient
      )

      setRelatedReferenceRange(newRelatedReferenceRange)
      const low = helper.deepGet(newRelatedReferenceRange, ['low', 'value'])
      const high = helper.deepGet(newRelatedReferenceRange, ['high', 'value'])

      if ((low && valueQuantity < low) || (high && valueQuantity > high)) {
        setColor('red')
      }
    } catch (errorInfo) {
      console.log(errorInfo)
    }
  }, [props.test, props.test.referenceRange])

  return (
    <Row
      type="flex"
      // justify="space-between"
      align="middle"
    >
      <Col span={12} style={{ lineHeight: '10px', margin: '0 4px' }}>
        <Row type="flex" align="middle">
          {changingValue && changingValue !== '' && (
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
            value={changingValue}
            placeholder={newValue}
            disabled={disabled}
            onChange={onChange}
          />
        )}
      </Col>
    </Row>
  )
}

TestItemEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default TestItemEdit
// lastUpdated: Sod-Erdene 2021-01-14
