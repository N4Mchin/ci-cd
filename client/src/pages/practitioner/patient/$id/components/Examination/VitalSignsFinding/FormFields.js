import React, { useState } from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { FloatNumber, IntegerInput } from 'components'
import { resolveDisplay } from 'utils/valuesets'

const MultiFloatInput = props => {
  const { value, suffix, language, valueSet } = props

  const {
    DiastolicBloodPressure,
    SystolicArterialPressure,
  } = valueSet.component

  const [systolicArterialValue, setSystolicArterialValue] = useState()
  const [diastolicBloodValue, setDiastolicBloodValue] = useState()

  const onChange = (systolic, diastolic) => {
    props.onChange({
      SystolicArterialPressure: systolic,
      DiastolicBloodPressure: diastolic,
    })
  }

  const onSystolicArterialChange = value => {
    setSystolicArterialValue(value)
    onChange(value, diastolicBloodValue)
  }

  const onDiastolicBloodChange = value => {
    setDiastolicBloodValue(value)
    onChange(systolicArterialValue, value)
  }

  return (
    <div>
      <Row type="flex">
        <Col span={12}>
          {resolveDisplay(SystolicArterialPressure, language)}
        </Col>
        <Col span={12}>
          <FloatNumber
            suffix={suffix}
            onChange={onSystolicArterialChange}
            value={value && value.SystolicArterialPressure}
          />
        </Col>
      </Row>
      <Row type="flex">
        <Col span={12}>{resolveDisplay(DiastolicBloodPressure, language)}</Col>
        <Col span={12}>
          <FloatNumber
            suffix={suffix}
            onChange={onDiastolicBloodChange}
            value={value && value.DiastolicBloodPressure}
          />
        </Col>
      </Row>
    </div>
  )
}

const FormFields = props => {
  const { i18n, value, suffix, valueSet } = props

  const fieldTitle = resolveDisplay(valueSet, i18n._language)

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'valueInteger':
      return (
        <Row>
          <Col span={12}>{fieldTitle}</Col>
          <Col span={8}>
            <IntegerInput
              value={value}
              suffix={suffix}
              onChange={onChange}
              style={{ width: '50%' }}
            />
          </Col>
        </Row>
      )
    case 'valueCodeableConceptWithComponent':
      return (
        <Row gutter={[4, 4]}>
          <Col span={8}>{fieldTitle}</Col>
          <Col span={8}>
            <MultiFloatInput
              value={value}
              suffix={suffix}
              onChange={onChange}
              valueSet={valueSet}
              language={i18n._language}
            />
          </Col>
        </Row>
      )
    case 'valueFloat':
      return (
        <Row>
          <Col span={12}>{fieldTitle}</Col>
          <Col span={8}>
            <FloatNumber
              value={value}
              suffix={suffix}
              onChange={onChange}
              valueSet={valueSet}
              style={{ width: '50%' }}
            />
          </Col>
        </Row>
      )
    default:
      return <></>
  }
}

export default withI18n()(FormFields)
