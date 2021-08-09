import React, { useState } from 'react'
import { Trans } from '@lingui/react'
import { Checkbox, Row, Col } from 'antd'

const CONDITIONS = [
  'SampleNormal',
  'SampleHemolyzed',
  'SampleMilky',
  'SampleLeaked',
  'SampleAmountInsufficient',
  'SampleInadequate',
  'Other',
]

const SpecimenCondition = props => {
  const [checkedList, setCheckedList] = useState([])
  const onChange = values => {
    if (props.singleValue) {
      const singleValue = values[values.length - 1]
      setCheckedList([singleValue])
      return props.onChange(singleValue)
    } else {
      setCheckedList(values)
      return props.onChange(values)
    }
  }

  return (
    <Checkbox.Group value={checkedList} onChange={onChange}>
      {CONDITIONS.map((reason, index) => (
        <Col key={`${reason}_${index}`} span={12} style={{ margin: '8px 0' }}>
          <Checkbox value={reason} key={reason}>
            <Trans id={reason} />
          </Checkbox>
        </Col>
      ))}
    </Checkbox.Group>
  )
}

export default SpecimenCondition
