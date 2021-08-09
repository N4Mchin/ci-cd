import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { CheckboxField, RadioField } from '../..'
import { IntegerInput } from 'components'
import { codeIntersects } from 'utils/controller'

const ValueCodeableConceptWithComponentSection = props => {
  const { valueSet, language, value } = props

  const [disabled, setDisable] = useState(true)
  const [fieldValues, setFieldValues] = useState()

  const onChange = (value, name) => {
    if (name === 'code') {
      if (codeIntersects(valueSet.default.code, value.code)) {
        setDisable(true)

        props.onChange({ value })
        return
      } else {
        setDisable(false)
      }
    }

    const currentValues = {
      ...fieldValues,
      [name]: value.code ? value.code : value,
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Col>{resolveDisplay(valueSet, language)}</Col>
          <Col>
            <RadioField
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
              onChange={value => onChange(value, 'code')}
            />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col>{resolveDisplay(valueSet.include.Present.component)}</Col>
          <Col>
            <IntegerInput
              disabled={disabled}
              style={{ width: '80%' }}
              value={value && value.component}
              onChange={value => onChange(value, 'component')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const ValueCodeableConceptWithBodySiteSection = props => {
  const { valueSet, language } = props

  const [disabled, setDisable] = useState(true)
  const [fieldValues, setFieldValues] = useState()

  const onChange = (value, name) => {
    const currentValues = {
      ...fieldValues,
    }

    if (name === 'code') {
      if (codeIntersects(valueSet.default.code, value.code)) {
        setDisable(true)

        props.onChange({ code: value.code })
        return
      } else {
        setDisable(false)

        currentValues[name] = value.code
      }
    } else {
      currentValues[name] = value
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Col>{resolveDisplay(valueSet, language)}</Col>
          <Col>
            <RadioField
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
              onChange={value => onChange(value, 'code')}
            />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col>{resolveDisplay(valueSet.include.Pain.bodySite, language)}</Col>
          <Col>
            <CheckboxField
              spanValue={24}
              disabled={disabled}
              onChange={value => onChange(value, 'bodySite')}
              valueSet={valueSet.include.Pain.bodySite.include}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const FormFields = props => {
  const { valueSet, value, i18n } = props

  const fieldTitle = resolveDisplay(valueSet, i18n._language)

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'valueCodeableConceptSection':
      return (
        <Row>
          <Col span={24}>{fieldTitle}</Col>
          <Col span={24}>
            <RadioField
              onChange={onChange}
              language={i18n._language}
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
            />
          </Col>
        </Row>
      )
    case 'valueCodeableConceptWithBodySiteSection':
      return (
        <ValueCodeableConceptWithBodySiteSection
          onChange={onChange}
          valueSet={valueSet}
          language={i18n._language}
        />
      )
    case 'valueCodeableConceptWithComponentSection':
      return (
        <ValueCodeableConceptWithComponentSection
          value={value}
          onChange={onChange}
          valueSet={valueSet}
          language={i18n._language}
        />
      )
    case 'valueCodeableConcepts':
      return (
        <Row>
          <Col span={24}>{fieldTitle}</Col>
          <Col span={12}>
            <CheckboxField
              spanValue={24}
              onChange={onChange}
              valueSet={valueSet.include}
            />
          </Col>
        </Row>
      )
    default:
      return <></>
  }
}

export default withI18n()(FormFields)
