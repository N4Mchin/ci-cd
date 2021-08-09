import React, { useState } from 'react'
import { Row, Col, Input, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { codeIntersects } from 'utils/controller'
import { RadioField } from '../..'

const { TextArea } = Input

const ValueCodeableConceptWithNote = props => {
  const { valueSet, language } = props
  const { Abnormal } = valueSet.include

  const [showStringInput, setShowStringInputVisible] = useState(false)

  const onChange = (value, name) => {
    let currentValue

    if (name === 'code') {
      currentValue = { code: value.code }

      if (codeIntersects(value.code, valueSet.default.code)) {
        setShowStringInputVisible(false)
      } else {
        setShowStringInputVisible(true)
      }
    } else {
      currentValue = {
        code: Abnormal.code,
        note: value.target.value,
      }
    }

    props.onChange(currentValue)
  }

  return (
    <Row>
      <Col>{resolveDisplay(valueSet, language)}</Col>
      <Col>
        <RadioField
          valueSet={valueSet.include}
          defaultValue={valueSet.default}
          onChange={value => onChange(value, 'code')}
        />
      </Col>
      <Col>
        {showStringInput && (
          <>
            <Divider />
            <Trans id="Note" />
            <TextArea
              rows={2}
              style={{ width: '80%' }}
              onChange={value => onChange(value, 'string')}
            />
          </>
        )}
      </Col>
    </Row>
  )
}

const FormFields = props => {
  const { valueSet, language } = props

  const fieldTitle = resolveDisplay(valueSet, language)

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'valueCodeableConceptSection':
      return (
        <Row>
          <Col>{fieldTitle}</Col>
          <Col>
            <RadioField
              onChange={onChange}
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
            />
          </Col>
        </Row>
      )
    case 'valueCodeableConceptWithNote':
      return (
        <ValueCodeableConceptWithNote
          onChange={onChange}
          valueSet={valueSet}
          language={language}
        />
      )
    default:
      return <></>
  }
}

export default withI18n()(FormFields)
