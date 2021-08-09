import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { RadioField, CheckboxField } from '../..'
import { codeIntersects } from 'utils/controller'

const ValueCodeableConceptSectionWithComponent = props => {
  const { valueSet, language } = props

  const [disabled, setDisable] = useState(true)
  const [fieldValues, setFieldValues] = useState()

  const componentValues = Object.values(valueSet.include).find(v => v.component)

  const onChange = (value, name) => {
    if (name === 'code') {
      if (codeIntersects(valueSet.default.code, value.code)) {
        setDisable(true)

        props.onChange({ [name]: value.code })
        return
      } else {
        setDisable(false)
      }
    }

    const currentValues = {
      ...fieldValues,
      [name]: name === 'code' ? value.code : value,
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Col span={24} style={{ lineHeight: '26px' }}>
            {resolveDisplay(valueSet, language)}
          </Col>
          <Col span={24}>
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
          <Col span={24} style={{ lineHeight: '26px' }}>
            {resolveDisplay(componentValues.component, language)}
          </Col>
          <Col span={24}>
            <RadioField
              disabled={disabled}
              valueSet={componentValues.component.include}
              onChange={value => onChange(value, 'component')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const ValueCodeableConceptSectionWithComponents = props => {
  const { valueSet, language } = props
  const { Absent } = valueSet.include

  // component гэсэн хэсгийн өгөдлийг checkBoxfield ашиглан өрж байгаа

  const [disabled, setDisable] = useState(true)
  const [fieldValues, setFieldValues] = useState()
  const [componentValues, setComponentValues] = useState()

  const onChange = (value, name) => {
    if (name === 'code' && codeIntersects(Absent.code, value.code)) {
      setDisable(true)

      props.onChange({ [name]: value.code })
    } else {
      setDisable(false)

      let currentValues

      if (name === 'code') {
        currentValues = {
          ...fieldValues,
          ...value,
        }
      } else {
        const currentComponentValues = {
          ...componentValues,
          [name]: value,
        }

        currentValues = {
          ...fieldValues,
          component: currentComponentValues,
        }

        setComponentValues(currentComponentValues)
      }

      setFieldValues(currentValues)
      props.onChange(currentValues)
    }
  }

  return (
    <div>
      <Row>
        <Col span={valueSet.fieldStyle.componentSpan}>
          <Row>
            <Col span={24} style={{ lineHeight: '26px' }}>
              {resolveDisplay(valueSet, language)}
            </Col>
            <Col span={24}>
              <RadioField
                spanValue={24}
                valueSet={valueSet.include}
                defaultValue={valueSet.default}
                onChange={value => onChange(value, 'code')}
              />
            </Col>
          </Row>
        </Col>
        {Object.keys(valueSet.component).map(componentKey => {
          return (
            <Col span={valueSet.fieldStyle.componentSpan}>
              <Row>
                <Col span={24} style={{ lineHeight: '26px' }}>
                  {resolveDisplay(valueSet.component[componentKey], language)}
                </Col>
                <Col span={24}>
                  <CheckboxField
                    spanValue={24}
                    disabled={disabled}
                    onChange={value => onChange(value, componentKey)}
                    valueSet={valueSet.component[componentKey].include}
                  />
                </Col>
              </Row>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

const FormFields = props => {
  const { valueSet, i18n } = props

  const fieldTitle = resolveDisplay(valueSet, i18n._language)

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'valueCodeableConceptSectionWithComponent':
      return (
        <Row>
          <ValueCodeableConceptSectionWithComponent
            onChange={onChange}
            valueSet={valueSet}
            language={i18n.language}
          />
        </Row>
      )
    case 'valueCodeableConceptSectionWithComponents':
      return (
        <Row>
          <ValueCodeableConceptSectionWithComponents
            onChange={onChange}
            valueSet={valueSet}
            language={i18n.language}
          />
        </Row>
      )
    case 'valueCodeableConceptSection':
      return (
        <Row>
          <Col span={24} style={{ lineHeight: '26px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <RadioField
              onChange={onChange}
              language={i18n.language}
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
            />
          </Col>
        </Row>
      )
    default:
      return <></>
  }
}

export default withI18n()(FormFields)
