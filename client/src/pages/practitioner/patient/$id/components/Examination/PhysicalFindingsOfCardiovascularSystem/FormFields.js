import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { IntegerInput } from 'components'
import { RadioField, CheckboxField } from '../..'
import { codeIntersects } from 'utils/controller'

const HasMemberSection = props => {
  const { valueSet, language, value } = props
  const defaultValues = {}

  const [fieldValues, setFieldValues] = useState()

  Object.keys(valueSet.default).forEach(defaultName => {
    defaultValues[defaultName] = {
      code: valueSet.default[defaultName].code,
    }
  })

  const onChange = (value, name) => {
    const currentRadioGroupValues = {
      ...defaultValues,
      ...fieldValues,
      [name]: value,
    }

    setFieldValues(currentRadioGroupValues)
    props.onChange(currentRadioGroupValues)
  }

  return (
    <Row>
      {Object.keys(valueSet.hasMember).map(hasMemberValue => {
        const fieldTitle = resolveDisplay(
          valueSet.hasMember[hasMemberValue],
          language
        )

        const integerInputSuffix =
          valueSet.hasMember[hasMemberValue].unit &&
          valueSet.hasMember[hasMemberValue].unit.value

        return (
          <Col span={6} style={{ minHeight: '120px' }}>
            <div style={{ lineHeight: '24px' }}>{fieldTitle}</div>
            <div>
              {valueSet.hasMember[hasMemberValue].include ? (
                <RadioField
                  defaultValue={valueSet.default[hasMemberValue]}
                  onChange={value => onChange(value, hasMemberValue)}
                  valueSet={valueSet.hasMember[hasMemberValue].include}
                />
              ) : (
                <IntegerInput
                  style={{ width: '80%' }}
                  unit={integerInputSuffix}
                  suffix={integerInputSuffix}
                  value={value && value[hasMemberValue]}
                  onChange={value => onChange(value, hasMemberValue)}
                />
              )}
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

const ComponentSection = props => {
  const { valueSet, language } = props
  const { OnExaminationNoCardiacMurmur } = valueSet.include

  const [disabled, setDisable] = useState(true)
  const [fieldValues, setFieldValues] = useState()
  const [componentValues, setComponentValues] = useState()

  const onChange = (value, name) => {
    let component
    let currentValues

    if (name === 'code') {
      if (codeIntersects(OnExaminationNoCardiacMurmur.code, value.code)) {
        setDisable(true)

        props.onChange({ [name]: value.code })
        return
      } else {
        setDisable(false)

        currentValues = {
          ...fieldValues,
          code: value.code,
        }

        setFieldValues(currentValues)
      }
    } else {
      component = {
        ...componentValues,
        [name]: value,
      }

      currentValues = {
        ...fieldValues,
        component: component,
      }

      setComponentValues(component)
      setFieldValues(currentValues)
    }

    props.onChange(currentValues)
  }

  return (
    <div>
      <Col span={6}>
        <RadioField
          valueSet={valueSet.include}
          defaultValue={valueSet.default}
          onChange={value => onChange(value, 'code')}
        />
      </Col>
      {Object.keys(valueSet.component).map(componentValue => {
        const fieldTitle = resolveDisplay(
          valueSet.component[componentValue],
          language
        )

        return (
          <Col span={6} style={{ minHeight: '120px' }}>
            <div style={{ lineHeight: '24px' }}>{fieldTitle}</div>
            <div>
              {valueSet.component[componentValue].valueType ===
              'checkBoxType' ? (
                <CheckboxField
                  spanValue={24}
                  disabled={disabled}
                  onChange={value => onChange(value, componentValue)}
                  valueSet={valueSet.component[componentValue].include}
                />
              ) : (
                <RadioField
                  disabled={disabled}
                  defaultValue={valueSet.default[componentValue]}
                  onChange={value => onChange(value, componentValue)}
                  valueSet={valueSet.component[componentValue].include}
                />
              )}
            </div>
          </Col>
        )
      })}
    </div>
  )
}

const FormFields = props => {
  const { valueSet, i18n, value } = props

  const fieldTitle = resolveDisplay(valueSet, i18n._language)

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'valueCodeableConceptSection':
      return (
        <Row>
          <Col span={24} style={{ lineHeight: '22px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <RadioField
              onChange={onChange}
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
            />
          </Col>
        </Row>
      )
    case 'hasMemberSection':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '14px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <HasMemberSection
              value={value}
              onChange={onChange}
              valueSet={valueSet}
              language={i18n._language}
            />
          </Col>
        </Row>
      )
    case 'componentSection':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '14px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <ComponentSection
              onChange={onChange}
              valueSet={valueSet}
              language={i18n._language}
            />
          </Col>
        </Row>
      )
    default:
      return <></>
  }
}

export default withI18n()(FormFields)
