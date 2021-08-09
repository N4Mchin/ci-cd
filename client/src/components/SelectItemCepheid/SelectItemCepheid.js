import React, { useState } from 'react'

import { Select, Input } from 'antd'

const { Option } = Select

const SelectItemCepheid = props => {
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
        <Select onChange={onChangeFirst} style={{ width: '40%' }}>
          <Option value="Cepheid GeneXpert 16">Cepheid GeneXpert 16</Option>
          <Option value="Cepheid GeneXpert 4">Cepheid GeneXpert 4</Option>
        </Select>
        <Select onChange={onChangeSecond} style={{ width: '40%' }}>
          <Option value="Cepheid GeneXpert 16">Cepheid GeneXpert 16</Option>
          <Option value="Cepheid GeneXpert 4">Cepheid GeneXpert 4</Option>
        </Select>
      </Input.Group>
    </div>
  )
}

export default SelectItemCepheid
