import React from 'react'
import { Input, InputNumber } from 'antd'

const CustomInputNumber = props => {
  const { value } = props
  return (
    <div>
      <InputNumber
        min={1}
        max={100}
        style={{ width: '60px', height: '30px', borderRadius: '5px' }}
        value={value}
      />
    </div>
  )
}

export default CustomInputNumber
