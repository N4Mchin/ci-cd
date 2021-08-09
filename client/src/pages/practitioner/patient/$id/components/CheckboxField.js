import React, { useState } from 'react'
import { Row, Col, Checkbox, Input } from 'antd'
import { withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

const { TextArea } = Input

const CheckboxField = props => {
  const { valueSet, i18n, spanValue, disabled } = props
  const [showStringInput, setShowStringInputVisible] = useState(false)
  const [stringValue, setStringValue] = useState()
  const [checkboxValue, setCheckboxValue] = useState()

  const onChange = (checkValue, string) => {
    if (!!checkValue['Other']) {
      checkValue['Other'] = {
        code: {
          coding: valueSet['Other'].code.coding,
          text: string ? string : valueSet['Other'].code.text,
        },
      }
    }

    props.onChange(checkValue)
  }

  const onChangeCheckBox = value => {
    if (value.includes('Other')) {
      setShowStringInputVisible(true)
    } else {
      setShowStringInputVisible(false)
    }

    const currentValueList = {}

    value.forEach(v => {
      currentValueList[v] = { code: valueSet[v].code }
    })

    setCheckboxValue(currentValueList)
    onChange(currentValueList, stringValue)
  }

  const onChangeStringInput = event => {
    setStringValue(event.target.value)
    onChange(checkboxValue, event.target.value)
  }

  return (
    <Row gutter={[8, 8]}>
      {valueSet && (
        <Checkbox.Group onChange={onChangeCheckBox} disabled={disabled}>
          {Object.keys(valueSet).map(valueSetItem => {
            const checkBoxName = resolveDisplay(
              valueSet[valueSetItem],
              i18n._language
            )

            return (
              <Col span={spanValue ? spanValue : 12}>
                <Checkbox key={valueSetItem} value={valueSetItem}>
                  {checkBoxName}
                </Checkbox>
              </Col>
            )
          })}
          {showStringInput && (
            <TextArea
              rows={2}
              style={{ width: '80%' }}
              placeholder={i18n.t`Other`}
              onChange={onChangeStringInput}
            />
          )}
        </Checkbox.Group>
      )}
    </Row>
  )
}

export default withI18n()(CheckboxField)
