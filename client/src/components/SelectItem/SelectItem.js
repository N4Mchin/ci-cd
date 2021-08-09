import React, { useState } from 'react'

import { Select, Input } from 'antd'

const { Option } = Select

const SelectItem = props => {
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')

  const onChangeFirst = value => {
    setFirstValue(value)
    onChange(value, secondValue)
  }
  const onChangeSecond = value => {
    setSecondValue(value)

    onChange(firstValue, value)
  }

  const onChange = (firstSelection, secondSelection) => {
    if (
      !firstSelection ||
      firstSelection !== '' ||
      !secondSelection ||
      secondSelection !== ''
    ) {
      props.onChange({
        firstSelection,
        secondSelection,
      })
    } else {
      props.onChange()
    }
  }

  return (
    <div>
      <Input.Group compact>
        <Select onChange={onChangeFirst} style={{ width: '50%' }}>
          <Option value="ALTA-ADX-120 ELISA Washer">
            ALTA-ADX-120 ELISA Washer
          </Option>
          <Option value="EL-800 ELISA Reader">EL-800 ELISA Reader</Option>
        </Select>
        <Select onChange={onChangeSecond} style={{ width: '50%' }}>
          <Option value="EL-800 ELISA Reader">EL-800 ELISA Reader</Option>
          <Option value="ALTA-ADX-120 ELISA Washer">
            ALTA-ADX-120 ELISA Washer
          </Option>
        </Select>
      </Input.Group>
    </div>
  )
}

export default SelectItem
