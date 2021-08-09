import React, { useState } from 'react'
import { Row, Col, Input, Radio, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { CheckboxField, RadioField } from '../..'
import { codeIntersects } from 'utils/controller'
import { IntegerInput } from 'components'

const { TextArea } = Input

const HasMemberIntegerSection = props => {
  const { valueSet, defaultValue, i18n } = props

  const [showIntegerInput, setShowIntegerInput] = useState(false)
  const [integerValue, setIntegerValue] = useState('')
  const [codeValue, setCodeValue] = useState()

  const onChange = (code, integer) => {
    if (integer) {
      props.onChange({ code: code, note: integer })
    } else {
      props.onChange({ code: code })
    }
  }

  const onRadioChange = event => {
    const codeableConcept = valueSet[event.target.value].code
    setCodeValue(codeableConcept)

    if (valueSet[event.target.value].note) {
      setShowIntegerInput(true)

      onChange(codeableConcept, integerValue)
    } else {
      setShowIntegerInput(false)
      setIntegerValue('')

      onChange(codeableConcept, '')
    }
  }

  const onChangeIntegerInput = value => {
    setIntegerValue(value)
    onChange(codeValue, value)
  }

  return (
    <Radio.Group
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
      {showIntegerInput &&
        (i18n._language === 'mn' ? (
          <>
            <Divider />
            <Row>
              <Col>Хавирганы нумнаас доош</Col>
              <Col>
                <IntegerInput
                  suffix={i18n.t`cm`}
                  value={integerValue}
                  style={{ width: '80%' }}
                  onChange={onChangeIntegerInput}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Divider />
            <Row>
              <Col>
                <IntegerInput
                  suffix={i18n.t`cm`}
                  value={integerValue}
                  style={{ width: '80%' }}
                  onChange={onChangeIntegerInput}
                />
              </Col>
              <Col>below the rib cage</Col>
            </Row>
          </>
        ))}
    </Radio.Group>
  )
}

const String = props => {
  const { valueSet } = props
  const onChange = value => {
    const currentValue = {
      code: {
        coding: valueSet.code,
        text: value.target.value,
      },
    }

    props.onChange(currentValue)
  }

  return (
    <Row>
      <TextArea style={{ width: '80%' }} onChange={onChange} />
    </Row>
  )
}

const ComponentSection = props => {
  const { language, valueSet } = props
  const { Normal } = valueSet.include

  const [disabled, setDisabled] = useState(true)
  const [fieldValues, setFieldValues] = useState()

  const onChange = (value, name) => {
    let currentValues

    if (name === 'code') {
      if (codeIntersects(Normal.code, value)) {
        setDisabled(true)

        props.onChange({ [name]: value })
        return
      } else {
        setDisabled(false)

        currentValues = {
          ...fieldValues,
          ...value,
        }

        setFieldValues(currentValues)
      }
    } else {
      currentValues = {
        ...fieldValues,
        component: value,
      }

      setFieldValues(currentValues)
    }

    props.onChange(currentValues)
  }

  return (
    <Row>
      <Col span={12}>
        <Row>
          <Col span={24} style={{ lineHeight: '20px' }}>
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
          <Col span={24} style={{ lineHeight: '20px' }}>
            {resolveDisplay(valueSet.component, language)}
          </Col>
          <Col span={24}>
            <RadioField
              disabled={disabled}
              valueSet={valueSet.component.include}
              onChange={value => onChange(value, 'component')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const ComponentsSection = props => {
  const { valueSet, language } = props
  const defaultValues = {}

  const [fieldValues, setFieldValues] = useState()

  Object.keys(valueSet.default).forEach(defaultName => {
    defaultValues[defaultName] = {
      code: valueSet.default[defaultName].code,
    }
  })

  const onChange = (value, name) => {
    const currentValues = {
      ...defaultValues,
      ...fieldValues,
      [name]: value,
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      {Object.keys(valueSet.component).map(componentValue => {
        const fieldTitle = resolveDisplay(
          valueSet.component[componentValue],
          language
        )

        return (
          <Col span={6}>
            <Row>
              <Col span={24}>{fieldTitle}</Col>
              <Col span={24}>
                <RadioField
                  defaultValue={valueSet.default[componentValue]}
                  onChange={value => onChange(value, componentValue)}
                  valueSet={valueSet.component[componentValue].include}
                />
              </Col>
            </Row>
          </Col>
        )
      })}
    </Row>
  )
}

const HasMemberSection = props => {
  const { valueSet, i18n } = props
  const {
    LiverSize,
    SpleenSizeByPalpation,
    HepaticDiseaseSymptoms,
  } = valueSet.hasMember

  const [disabled, setDisabled] = useState(true)
  const [fieldValues, setFieldValues] = useState()
  const [hepaticDiseaseValues, setHepaticDiseaseValues] = useState()

  const defaultValues = {}

  Object.keys(valueSet.default).forEach(v => {
    defaultValues[v] = { code: valueSet.default[v].code }
  })

  const onChange = (value, name) => {
    const currentValues = { ...defaultValues, ...fieldValues }

    if (name === 'HepaticDiseaseSymptomsCode') {
      if (Object.keys(value).includes('Pain')) {
        setDisabled(false)

        const values = {
          ...hepaticDiseaseValues,
          code: value,
        }

        currentValues['HepaticDiseaseSymptoms'] = values
        setHepaticDiseaseValues(values)
      } else {
        setDisabled(true)

        const values = {
          ...hepaticDiseaseValues,
          code: value,
          component: {},
        }

        currentValues['HepaticDiseaseSymptoms'] = values
        setHepaticDiseaseValues(values)
      }
    } else if (name === 'HepaticDiseaseSymptomsComponent') {
      const values = {
        ...hepaticDiseaseValues,
        component: { code: value.code },
      }

      currentValues['HepaticDiseaseSymptoms'] = values
      setHepaticDiseaseValues(values)
    } else {
      currentValues[name] = value
    }

    setFieldValues({ ...currentValues })
    props.onChange({ ...currentValues })
  }

  return (
    <Row>
      <Col span={6}>
        <Row>
          <Col span={24}>
            {resolveDisplay(HepaticDiseaseSymptoms, i18n._language)}
          </Col>
          <Col span={24}>
            <CheckboxField
              spanValue={24}
              onChange={value => onChange(value, 'HepaticDiseaseSymptomsCode')}
              valueSet={HepaticDiseaseSymptoms.include}
            />
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Row>
          <Col span={24}>
            {resolveDisplay(HepaticDiseaseSymptoms.component, i18n._language)}
          </Col>
          <Col span={24}>
            <RadioField
              disabled={disabled}
              onChange={value =>
                onChange(value, 'HepaticDiseaseSymptomsComponent')
              }
              valueSet={HepaticDiseaseSymptoms.component.include}
            />
          </Col>
        </Row>
      </Col>
      {LiverSize && (
        <Col span={6}>
          <Row>
            <Col span={24}>{resolveDisplay(LiverSize, i18n._language)}</Col>
            <Col span={24}>
              <HasMemberIntegerSection
                i18n={i18n}
                valueSet={LiverSize.include}
                onChange={value => onChange(value, 'LiverSize')}
                defaultValue={valueSet.default.LiverSize}
              />
            </Col>
          </Row>
        </Col>
      )}
      {SpleenSizeByPalpation && (
        <Col span={6}>
          <Row>
            <Col span={24}>
              {resolveDisplay(SpleenSizeByPalpation, i18n._language)}
            </Col>
            <Col span={24}>
              <RadioField
                onChange={value => onChange(value, 'SpleenSizeByPalpation')}
                valueSet={SpleenSizeByPalpation.include}
                defaultValue={valueSet.default.SpleenSizeByPalpation}
              />
            </Col>
          </Row>
        </Col>
      )}
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
    case 'componentsSection':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '16px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <ComponentsSection
              valueSet={valueSet}
              onChange={onChange}
              language={i18n._language}
            />
          </Col>
        </Row>
      )
    case 'hasMemberSection':
      return (
        <Row>
          <Col span={24} className="title" style={{ fontSize: '16px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <HasMemberSection
              onChange={onChange}
              valueSet={valueSet}
              i18n={i18n}
            />
          </Col>
        </Row>
      )
    case 'valueCodeableConceptSection':
      return (
        <Row>
          <Col span={24} style={{ lineHeight: '20px' }}>
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
        <ComponentSection
          onChange={onChange}
          valueSet={valueSet}
          language={i18n._language}
        />
      )
    case 'valueStringSection':
      return (
        <Row>
          <Col span={24} style={{ lineHeight: '20px' }}>
            {fieldTitle}
          </Col>
          <Col span={24}>
            <String onChange={onChange} valueSet={valueSet} />
          </Col>
        </Row>
      )
    default:
      return <></>
  }
}

export default withI18n()(FormFields)
