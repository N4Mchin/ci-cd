import React, { useState } from 'react'
import { Trans } from '@lingui/react'
import { Row, Col, Checkbox, InputNumber } from 'antd'

const CheckInput = props => {
  const { name, remainedNumber } = props
  const [disabled, setDisabled] = useState(true)
  const [color, setColor] = useState('#00414b')
  const [initialNumber, setInitialNumber] = useState(0)

  const onInputNumberChange = value => {
    if (value > remainedNumber) {
      setColor('#ff0000')
    } else {
      setColor('#00414b')
    }

    setInitialNumber(value)
    props.onChange(value)
  }

  const clickCheck = event => {
    setDisabled(!disabled)
    if (event.target.checked) {
      setInitialNumber(1)
      props.onChange(1)
    } else {
      setInitialNumber(0)
      props.onChange(0)
    }
  }

  return (
    <Row gutter={16} type="flex" align="middle">
      <Col span={16} style={{ whiteSpace: 'nowrap' }}>
        <Checkbox onChange={clickCheck}>
          <Trans id={name} />
        </Checkbox>
      </Col>
      <Col span={4}>
        <InputNumber
          value={initialNumber}
          onChange={onInputNumberChange}
          disabled={disabled}
          min={0}
          style={{
            width: '50px',
            height: '30px',
            borderRadius: '3px',
          }}
        />
      </Col>
      <Col
        span={4}
        style={{
          marginBottom: '2px',
          width: '40px',
          height: '30px',
          borderRadius: '3px',
          borderWidth: '1px',
          borderStyle: 'solid',
          color: color,
          borderColor: '#e5e5e5',
          lineHeight: '28px',
        }}
      >
        {remainedNumber}
      </Col>
    </Row>
  )
}

export default CheckInput
