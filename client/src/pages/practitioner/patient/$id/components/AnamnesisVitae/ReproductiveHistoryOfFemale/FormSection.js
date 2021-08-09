import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Radio } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse, IntegerInput } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'
import { DateField, CheckboxField } from './../../'

const { TextArea } = Input

const MenopauseField = props => {
  const { fieldName, language, value } = props
  const { functionName, onSetName } = fieldName
  const [disabled, setDisable] = useState(true)
  const [values, setValues] = useState()

  const onChange = (event, name) => {
    const currentValues = {
      ...values,
      [name]: name === 'boolean' ? event.target.value : event,
    }
    event.target && setDisable(!event.target.value)
    setValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      <Col span={12}>{resolveDisplay(functionName, language)}</Col>
      <Col span={12}>
        <Radio.Group onChange={event => onChange(event, 'boolean')}>
          <Radio value={true}>{<Trans id="Yes" />}</Radio>
          <Radio value={false}>{<Trans id="No" />}</Radio>
        </Radio.Group>
      </Col>
      <Col span={12}>{resolveDisplay(onSetName, language)}</Col>
      <Col span={12}>
        <IntegerInput
          suffix="Age"
          value={value && value.year}
          disabled={disabled}
          style={{ width: '50%' }}
          onChange={value => onChange(value, 'year')}
        />
      </Col>
    </Row>
  )
}

const YearInput = props => {
  const onIntegerInputChange = (value, valueType) => {
    if (value) {
      return props.onChange({
        [valueType]: value,
      })
    } else {
      return props.onChange()
    }
  }

  return (
    <IntegerInput
      suffix={props.suffix}
      value={props.value && props.value.year}
      onChange={value => onIntegerInputChange(value, 'year')}
      style={{ width: '50%' }}
    />
  )
}

const RadioField = props => {
  const { valueSet, language } = props

  const onRetiredChange = event => {
    props.onChange(event.target.value)
  }

  return (
    <Col>
      {valueSet ? (
        <Radio.Group onChange={onRetiredChange}>
          {Object.keys(valueSet).map(item => {
            const radioValue = resolveDisplay(valueSet[item], language)
            return <Radio value={item}>{radioValue}</Radio>
          })}
        </Radio.Group>
      ) : (
        <Radio.Group onChange={onRetiredChange}>
          <Radio value={true}>{<Trans id="Yes" />}</Radio>
          <Radio value={false}>{<Trans id="No" />}</Radio>
        </Radio.Group>
      )}
    </Col>
  )
}

const QuestionForWomanField = props => {
  const { i18n, valueSet, language, value, suffix, fieldName } = props

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'date':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <DateField onChange={onChange} style={{ width: '60%' }} />
          </Col>
        </Row>
      )

    case 'string':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <TextArea
              rows={4}
              style={{ width: '80%' }}
              onChange={onChange}
              placeholder={i18n.t`Please write`}
            />
          </Col>
        </Row>
      )

    case 'number':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <IntegerInput
              suffix={suffix}
              onChange={onChange}
              value={value}
              style={{ width: '50%' }}
            />
          </Col>
        </Row>
      )
    case 'check':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <CheckboxField
              onChange={onChange}
              valueSet={valueSet}
              language={language}
            />
          </Col>
        </Row>
      )
    case 'radio':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <RadioField
              onChange={onChange}
              valueSet={valueSet}
              language={language}
            />
          </Col>
        </Row>
      )
    case 'radioAndNumber':
      return (
        <MenopauseField
          value={props.value}
          onChange={onChange}
          fieldName={fieldName}
          language={language}
        />
      )
    case 'yearInput':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <YearInput suffix={suffix} value={value} onChange={onChange} />
          </Col>
        </Row>
      )
    default:
      return <></>
  }
}

const FormSection = props => {
  const { form, i18n, app } = props
  const { AnamnesisVitae } = app.FHIR_CODES
  const { getFieldDecorator } = form

  const femaleReproductiveHistory =
    AnamnesisVitae && AnamnesisVitae.include.FemaleReproductiveHistory.include

  const [showField, setShowField] = useState(true)
  const [menopauseFunction, setMenoPauseFunction] = useState()
  const [textFieldsValues, setTextFieldsValues] = useState([])
  useEffect(() => {
    const newTextFieldsValues = [
      {
        name: femaleReproductiveHistory.AgeOfOnsetOfMenstruation,
        value: 'AgeOfOnsetOfMenstruation',
        type: 'number',
        showField: true,
        suffix: i18n.t`Age`,
      },
      {
        name: femaleReproductiveHistory.MenopauseFunction,
        value: 'MenopauseFunction',
        type: 'radio',
        showField: true,
      },
      {
        name: femaleReproductiveHistory.AgeAtOnsetOfMenopause,
        value: 'AgeAtOnsetOfMenopause',
        type: 'number',
        showField: menopauseFunction === false,
      },
      {
        name: femaleReproductiveHistory.DurationOfMenstrualPeriod,
        value: 'DurationOfMenstrualPeriod',
        type: 'number',
        showField: menopauseFunction === true,
        suffix: i18n.t`Day`,
      },
      {
        name: femaleReproductiveHistory.LastMenstrualPeriodFirstDay,
        value: 'LastMenstrualPeriodFirstDay',
        showField: menopauseFunction === true,
        type: 'date',
      },
      {
        name: femaleReproductiveHistory.DurationOfMenstrualCycle,
        value: 'DurationOfMenstrualCycle',
        type: 'number',
        showField: menopauseFunction === true,
        suffix: i18n.t`Day`,
      },
      {
        name: femaleReproductiveHistory.FindingOfQuantityOfMenstrualBloodLoss,
        value: 'FindingOfQuantityOfMenstrualBloodLoss',
        type: 'radio',
        showField: menopauseFunction === true,
        valueSet:
          femaleReproductiveHistory.FindingOfQuantityOfMenstrualBloodLoss
            .include,
      },
      {
        name: femaleReproductiveHistory.Gravida,
        value: 'Gravida',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.NumberOfBirthsAtTerm,
        value: 'NumberOfBirthsAtTerm',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.VaginalDelivery,
        value: 'VaginalDelivery',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.NumberOfCesareanSections,
        value: 'NumberOfCesareanSections',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.NumberOfLostPregnancies,
        value: 'NumberOfLostPregnancies',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.NumberOfStillbirths,
        value: 'NumberOfStillbirths',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.NumberOfEctopicPregnancies,
        value: 'NumberOfEctopicPregnancies',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.NumberOfMiscarriages,
        value: 'NumberOfMiscarriages',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.NumberOfAbortions,
        value: 'NumberOfAbortions',
        type: 'number',
        showField: true,
        suffix: i18n.t`Occurence`,
      },
      {
        name: femaleReproductiveHistory.PeriodBetweenDeliveries,
        value: 'PeriodBetweenDeliveries',
        type: 'yearInput',
        showField: true,
        suffix: i18n.t`Years`,
      },
      {
        name:
          femaleReproductiveHistory.ComplicationOccurringDuringLaborAndDelivery,
        value: 'ComplicationOccurringDuringLaborAndDelivery',
        showField: true,
        type: 'radio',
      },
      {
        name: femaleReproductiveHistory.BreastFed,
        value: 'BreastFed',
        showField: true,
        type: 'radio',
      },
      {
        name: femaleReproductiveHistory.BreastfeedingWithSupplement,
        value: 'BreastfeedingWithSupplement',
        showField: true,
        type: 'radio',
      },
      {
        name: femaleReproductiveHistory.BreastfeedingMaintenance,
        value: 'BreastfeedingMaintenance',
        showField: true,
        type: 'yearInput',
        suffix: i18n.t`Years`,
      },
      {
        name: femaleReproductiveHistory.Contraception,
        value: 'Contraception',
        showField: true,
        type: 'check',
        valueSet: femaleReproductiveHistory.Contraception.include,
      },
      {
        name: femaleReproductiveHistory.HistoryOfGynecologicalDisorder,
        value: 'HistoryOfGynecologicalDisorder',
        type: 'check',
        showField: true,
        valueSet:
          femaleReproductiveHistory.HistoryOfGynecologicalDisorder.include,
      },
      {
        name: <Trans id={'AdditionalInformation'} />,
        value: 'note',
        type: 'string',
        showField: true,
      },
    ]
    setTextFieldsValues(newTextFieldsValues)
  }, [menopauseFunction])

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    return form
      .validateFields()
      .then(formValues => {
        console.log(formValues)
        return props.dispatch({
          type: 'practitioner_patient_profile/reproductiveHistoryOfFemaleAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        setActiveStatus(true)

        console.log(result)
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
      .then(async () => {
        await delay(900)
        setActiveKey([])
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  const onActiveChange = value => {
    setActiveKey(value)
  }

  const onFormChange = () => {
    const formValues = form.getFieldsValue()

    if (
      formValues.radio &&
      typeof formValues.radio.MenopauseFunction === 'boolean'
    ) {
      setMenoPauseFunction(!formValues.radio.MenopauseFunction)
    }
  }

  const title = resolveDisplay(
    AnamnesisVitae.include.FemaleReproductiveHistory,
    i18n._language
  )

  return (
    <div>
      <Form
        layout="veritcal"
        labelAlign="left"
        colon={false}
        onChange={onFormChange}
      >
        <ActiveCollapse
          displayName={title}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          {textFieldsValues.map(fieldValue => {
            const labelName = resolveDisplay(fieldValue.name, i18n._language)
            return (
              <Row gutter={[0, 10]}>
                {fieldValue.showField && (
                  <Col>
                    <Form.Item>
                      {getFieldDecorator(
                        `${fieldValue.type}.${fieldValue.value}`,
                        { rules: [{ required: false }] }
                      )(
                        <QuestionForWomanField
                          type={fieldValue.type}
                          fieldName={labelName ? labelName : fieldValue.name}
                          suffix={fieldValue.suffix}
                          valueSet={fieldValue.valueSet}
                          language={i18n._language}
                          i18n={i18n}
                        />
                      )}
                    </Form.Item>
                  </Col>
                )}
              </Row>
            )
          })}
          <Row
            style={{ marginTop: '10px' }}
            type="flex"
            justify="end"
            gutter={8}
          >
            <Col>
              <Button className="button-gray">
                <Trans id={'Cancel'} />
              </Button>
            </Col>
            <Col>
              <Button className="button-red" onClick={onSave}>
                <Trans id={'Save'} />
              </Button>
            </Col>
          </Row>
        </ActiveCollapse>
      </Form>
    </div>
  )
}

FormSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(FormSection)))
