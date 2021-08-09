import React, { useState } from 'react'
import { Radio, Input, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { codeIntersects } from 'utils/controller'

const { TextArea } = Input

const RadioField = props => {
  const { defaultValue, valueSet, disabled, i18n } = props

  const [radioValue, setRadioValue] = useState()
  const [stringValue, setStringValue] = useState()
  const [showStringInput, setShowStringInputVisible] = useState(false)

  const onChange = (checkValue, string) => {
    let passingValue

    if (
      (valueSet.Other &&
        codeIntersects(valueSet.Other.code, checkValue.code)) ||
      (valueSet.Abnormal &&
        codeIntersects(valueSet.Abnormal.code, checkValue.code))
    ) {
      passingValue = {
        code: {
          coding: checkValue.code.coding,
          text: string ? string : checkValue.code.text,
        },
      }
    } else {
      passingValue = checkValue
    }

    props.onChange(passingValue)
  }

  const onRadioChange = event => {
    if (
      valueSet[event.target.value].other ||
      valueSet[event.target.value].abnormal
    ) {
      setShowStringInputVisible(true)
    } else {
      setShowStringInputVisible(false)
    }

    const currentValue = { code: valueSet[event.target.value].code }

    setRadioValue(currentValue)
    onChange(currentValue, stringValue)
  }

  const onChangeStringInput = event => {
    setStringValue(event.target.value)
    onChange(radioValue, event.target.value)
  }

  return (
    <Radio.Group
      disabled={disabled}
      onChange={onRadioChange}
      defaultValue={defaultValue && defaultValue.type}
    >
      {Object.keys(valueSet).map(item => {
        const radioValue = resolveDisplay(valueSet[item], i18n._language)

        return (
          <Radio key={item} value={item} style={{ display: 'block' }}>
            {radioValue}
          </Radio>
        )
      })}
      {showStringInput && (
        <>
          <Divider />
          <Trans id="Note" />
          <TextArea style={{ width: '80%' }} onChange={onChangeStringInput} />
        </>
      )}
    </Radio.Group>
  )
}

export default withI18n()(RadioField)
