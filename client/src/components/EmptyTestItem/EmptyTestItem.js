import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import FloatNumber from '../FloatNumber/FloatNumber'
import * as helper from 'utils/helper'

const EmptyTestItem = props => {
  const [changingValue, setChangingValue] = useState('')
  const [relatedReferenceRange, setRelatedReferenceRange] = useState()
  const { value, display, unit, referenceRange } = props.test
  const { disabled } = props

  useEffect(() => {
    try {
      let newReferenceRange = helper.getRelatedReferenceRange(
        referenceRange,
        props.patient
      )

      setRelatedReferenceRange(newReferenceRange)
    } catch (errorInfo) {
      console.log('Could not find reference range', errorInfo)
    }
  }, [props.test, props.test.referenceRange])

  const onChange = stringValue => {
    setChangingValue(stringValue)
    props.onChange(stringValue)
  }

  return (
    <Row type="flex" justify="space-between">
      <Col span={14} style={{ alignSelf: 'center' }}>
        <div style={{ lineHeight: '10px' }}>{display}</div>
        <div
          style={{
            lineHeight: '10px',
            fontSize: '10',
            color: '#C9C9C9',
            marginTop: '4px',
          }}
        >
          {unit}
        </div>
      </Col>
      <Col span={10}>
        <FloatNumber
          low={helper.deepGet(relatedReferenceRange, ['low', 'value'])}
          high={helper.deepGet(relatedReferenceRange, ['high', 'value'])}
          placeholder={value}
          unit={unit}
          value={changingValue}
          disabled={disabled}
          onChange={onChange}
        />
      </Col>
    </Row>
  )
}

EmptyTestItem.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default EmptyTestItem

// lastUpdated: Sod-Erdene 2021-01-14
