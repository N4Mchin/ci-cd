import React, { useState } from 'react'
import { Row, Col, Divider, Input } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { CheckboxField, RadioField } from '../..'
import { codeIntersects } from 'utils/controller'

const { TextArea } = Input

const ValueCodeableConceptWithNote = props => {
  const { valueSet, language } = props
  const { OnExaminationRashPresent } = valueSet.include

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
        code: OnExaminationRashPresent.code,
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

const ValueCodeableConceptWithBodySite = props => {
  const { valueSet } = props
  const { bodySite } = valueSet && valueSet.include.OnExaminationEdema
  const { OnExaminationEdemaNotPresent } = valueSet.include

  const [disabled, setDisable] = useState(true)
  const [fieldValues, setFieldsValues] = useState()

  const onChange = (value, name) => {
    let currentValues

    if (name === 'valueCode') {
      if (codeIntersects(OnExaminationEdemaNotPresent.code, value.code)) {
        setDisable(true)

        props.onChange({ ...value })
        return
      } else {
        setDisable(false)

        currentValues = {
          ...fieldValues,
          ...value,
        }
      }
    } else {
      currentValues = {
        ...fieldValues,
        component: value,
      }
    }

    setFieldsValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row gutter={12}>
      <Col span={12}>
        <Row>
          <Col span={24}></Col>
          <Col span={24}>
            <RadioField
              valueSet={valueSet.include}
              defaultValue={valueSet.default}
              onChange={value => onChange(value, 'valueCode')}
            />
          </Col>
        </Row>
      </Col>
      <Col span={12}>
        <Row>
          <Col span={24}></Col>
          <Col span={24}>
            <CheckboxField
              spanValue={24}
              disabled={disabled}
              valueSet={bodySite}
              onChange={value => onChange(value, 'bodySite')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const ComponentField = props => {
  const { valueSet, language } = props
  const {
    JointAngulationUpper,
    JointAngulationBottom,
    RangeOfJointUpperMovement,
    RangeOfJointBottomMovement,
  } = valueSet && valueSet.component

  const defaultValues = {}

  Object.keys(valueSet.default).forEach(def => {
    defaultValues[def] = { code: valueSet.default[def].code }
  })

  const [fieldValues, setFieldValues] = useState({ ...defaultValues })

  const onChange = (value, valueSetName) => {
    const currentValues = {
      ...fieldValues,
      [valueSetName]: value,
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>
              {resolveDisplay(JointAngulationUpper, language)}
            </Col>
            <Col span={24}>
              <RadioField
                valueSet={JointAngulationUpper.include}
                defaultValue={valueSet.default.JointAngulationUpper}
                onChange={value => onChange(value, 'JointAngulationUpper')}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              {resolveDisplay(RangeOfJointUpperMovement, language)}
            </Col>
            <Col span={24}>
              <RadioField
                valueSet={RangeOfJointUpperMovement.include}
                defaultValue={valueSet.default.RangeOfJointUpperMovement}
                onChange={value => onChange(value, 'RangeOfJointUpperMovement')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>
              {resolveDisplay(JointAngulationBottom, language)}
            </Col>
            <Col span={24}>
              <RadioField
                valueSet={JointAngulationBottom.include}
                defaultValue={valueSet.default.JointAngulationBottom}
                onChange={value => onChange(value, 'JointAngulationBottom')}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              {resolveDisplay(RangeOfJointBottomMovement, language)}
            </Col>
            <Col span={24}>
              <RadioField
                valueSet={RangeOfJointBottomMovement.include}
                defaultValue={valueSet.default.RangeOfJointBottomMovement}
                onChange={value =>
                  onChange(value, 'RangeOfJointBottomMovement')
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  )
}

const ComponentWithBodySite = props => {
  const { valueSet, language } = props
  const { Normal } = valueSet.component.Size.include

  const [disabled, setDisable] = useState(true)
  const [fieldValues, setFieldValues] = useState()

  const onChange = (value, name) => {
    let currentValues

    if (name === 'bodySite') {
    } else {
    }

    console.log(value)
    console.log(name)

    if (name === 'Size') {
      if (codeIntersects(Normal.code, value.code)) {
        setDisable(true)

        props.onChange({ [name]: value })
        return
      } else {
        setDisable(false)
      }
    }

    currentValues = {
      ...fieldValues,
      [name]: value,
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      <Col span={6}>
        <Row>
          <Col span={24}>
            {resolveDisplay(valueSet.component.Size, language)}
          </Col>
          <Col span={24}>
            <RadioField
              defaultValue={valueSet.default.Size}
              valueSet={valueSet.component.Size.include}
              onChange={value => onChange(value, 'Size')}
            />
          </Col>
        </Row>
      </Col>

      <Col span={6}>
        <Row>
          <Col span={24}>{resolveDisplay(valueSet.bodySite, language)}</Col>
          <Col span={24}>
            <CheckboxField
              spanValue={24}
              disabled={disabled}
              valueSet={valueSet.bodySite.include}
              onChange={event => onChange(event, 'bodySite')}
            />
          </Col>
        </Row>
      </Col>

      <Col span={6}>
        <Row>
          <Col span={24}>
            {resolveDisplay(valueSet.component.Pain, language)}
          </Col>
          <Col span={24}>
            <RadioField
              disabled={disabled}
              valueSet={valueSet.component.Pain.include}
              defaultValue={
                !disabled ? valueSet.component.Pain.default : undefined
              }
              onChange={event => onChange(event, 'Pain')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const FormFields = props => {
  const { i18n, valueSet } = props

  const fieldTitle = resolveDisplay(valueSet, i18n._language)

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'valueCodeableConceptWithBodySite':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '16px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <ValueCodeableConceptWithBodySite
              valueSet={valueSet}
              onChange={onChange}
              language={i18n._language}
            />
          </Col>
        </Row>
      )
    case 'componentWithBodySite':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '16px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <ComponentWithBodySite
              onChange={onChange}
              valueSet={valueSet}
              language={i18n._language}
            />
          </Col>
        </Row>
      )
    case 'valueCodeableConceptSection':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '12px' }}>
            {fieldTitle}
          </Col>
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
    case 'componentSection':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '14px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <ComponentField
              onChange={onChange}
              valueSet={valueSet}
              language={i18n._language}
            />
          </Col>
        </Row>
      )
    case 'valueCodeableConceptWithNote':
      return (
        <ValueCodeableConceptWithNote
          onChange={onChange}
          valueSet={valueSet}
          language={i18n._language}
        />
      )
    default:
      return <></>
  }
}

export default withI18n()(FormFields)
