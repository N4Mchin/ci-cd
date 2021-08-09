import React, { useState, useEffect } from 'react'
import { Trans } from '@lingui/react'
import { Row, Col, Input, Checkbox } from 'antd'
import * as helper from 'utils/helper'
import PropTypes from 'prop-types'
import { FloatNumber } from 'components'

const TestItemEditWithLabel = props => {
  const [editing, setEditing] = useState(false)

  const onCheck = event => {
    const { checked } = event.target

    setEditing(checked)
    if (!checked) {
      setValue('')
    }
  }

  const [changingValue, setValue] = useState('')
  const { value, display, unit, referenceRange } = props.test

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

  if ((low && value < low) || (high && value > high)) {
    color = 'red'
  }

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value)
    }
  }, [])

  const onChange = changingValue => {
    setValue(changingValue)
    if (changingValue && changingValue !== '') {
      props.onChange(changingValue)
    } else {
      props.onChange()
    }
  }

  return (
    <Row gutter={4} style={{ marginTop: '8px' }}>
      <Col span={2}>
        <Checkbox onChange={onCheck} />
      </Col>
      <Col span={10}>
        <div
          style={{
            fontSize: '12px',
            // lineHeight: '13px',
            // display: 'table-caption',
            width: 'fit-content',
          }}
          className="uppercase"
        >
          <Trans id="EditedResult" />

          {/* <div style={{ lineHeight: '10px' }}>{display}</div> */}
        </div>
        <div
          style={{
            lineHeight: '10px',
            fontSize: '10',
            color: '#C9C9C9',
          }}
        >
          {unit}
        </div>
      </Col>
      <Col span={12}>
        <FloatNumber
          low={helper.deepGet(relatedReferenceRange, ['low', 'value'])}
          high={helper.deepGet(relatedReferenceRange, ['high', 'value'])}
          style={{ color: color }}
          placeholder={value}
          unit={unit}
          value={changingValue}
          disabled={!editing}
          onChange={onChange}
        />
      </Col>
    </Row>
  )
}

TestItemEditWithLabel.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default TestItemEditWithLabel
// lastUpdated: Sod-Erdene 2021-01-14
