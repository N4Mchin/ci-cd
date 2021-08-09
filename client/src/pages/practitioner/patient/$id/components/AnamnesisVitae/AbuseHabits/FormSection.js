import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Radio } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse, IntegerInput } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'
import moment from 'moment'
import { RecurrenceField, DateField } from './../..'

const IntegerAndRadioField = props => {
  const { suffix, values } = props
  const [radioValue, setRadioValue] = useState()

  const onInputIntegerChange = (value, valueType) => {
    props.onChange({
      dateType: valueType,
      dateValue: value,
    })
  }

  const onRadioChange = event => {
    setRadioValue(event.target.value)
    props.onChange()
  }

  return (
    <Radio.Group onChange={onRadioChange}>
      <Row type="flex" align="middle" gutter={[8, 8]}>
        <Col span={8}>
          <Radio value="Day">
            <Trans id="Per day" />
          </Radio>
        </Col>
        <Col span={16}>
          <IntegerInput
            suffix={suffix}
            value={
              radioValue && radioValue === 'Day'
                ? values && values.dateValue
                : ''
            }
            onChange={value => onInputIntegerChange(value, 'Day')}
            disabled={radioValue && radioValue === 'Day' ? false : true}
          />
        </Col>
      </Row>
      <Row type="flex" align="middle" gutter={[8, 8]}>
        <Col span={8}>
          <Radio value="Week">
            <Trans id="Per week" />
          </Radio>
        </Col>
        <Col span={16}>
          <IntegerInput
            suffix={suffix}
            value={
              radioValue && radioValue === 'Week'
                ? values && values.dateValue
                : ''
            }
            onChange={value => onInputIntegerChange(value, 'Week')}
            disabled={radioValue && radioValue === 'Week' ? false : true}
          />
        </Col>
      </Row>
      <Row type="flex" align="middle" gutter={[8, 8]}>
        <Col span={8}>
          <Radio value="Month">
            <Trans id="Per month" />
          </Radio>
        </Col>
        <Col span={16}>
          <IntegerInput
            suffix={suffix}
            value={
              radioValue && radioValue === 'Month'
                ? values && values.dateValue
                : ''
            }
            onChange={value => onInputIntegerChange(value, 'Month')}
            disabled={radioValue && radioValue === 'Month' ? false : true}
          />
        </Col>
      </Row>
    </Radio.Group>
  )
}

const DrinkingDateAndLength = props => {
  const { language, valueSet } = props
  const [integerInputFieldValues, setIntegerInputValues] = useState()
  const [dateValue, setDateValue] = useState()

  const onIntegerInputChange = (value, valueType) => {
    const currentValues = {
      ...integerInputFieldValues,
      [valueType]: value,
    }

    const year = currentValues.year ? currentValues.year : 0
    const month = currentValues.month ? currentValues.month : 0
    const day = currentValues.day ? currentValues.day : 0

    // https://momentjs.com/docs/#/durations/as-iso-string/
    const difference = moment
      .duration(`P${year}Y${month}M${day}D`)
      .asMilliseconds()

    Object.assign(currentValues, {
      difference,
    })

    setIntegerInputValues(currentValues)

    props.onChange({
      DateOfStartedDrinkingAlcohol: dateValue,
      LengthOfAlcoholUsingPeriod: currentValues,
    })
  }

  const onDateFieldChange = value => {
    const startedDateDrinkingDate = new Date(value)
    const milliSecondDifference = Math.round(
      new Date().getTime() - startedDateDrinkingDate.getTime()
    )

    const duration = moment.duration(milliSecondDifference)
    const year = duration.years()
    const month = duration.months()
    const day = duration.days()

    const LengthOfAlcoholUsingPeriod = {
      day: day,
      month: month,
      year: year,
      difference: milliSecondDifference,
    }

    setDateValue(value)
    props.onChange({
      DateOfStartedDrinkingAlcohol: value,
      LengthOfAlcoholUsingPeriod: LengthOfAlcoholUsingPeriod,
    })
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          {resolveDisplay(valueSet.DateOfStartedDrinkingAlcohol, language)}
        </Col>
        <Col span={12}>
          <DateField onChange={onDateFieldChange} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {resolveDisplay(valueSet.LengthOfAlcoholUsingPeriod, language)}
        </Col>
        <Col span={12}>
          <Row type="flex" align="middle" gutter={8}>
            <Col span={6}>
              <IntegerInput
                suffix="Years"
                value={props.value && props.value.year ? props.value.year : '0'}
                onChange={value => onIntegerInputChange(value, 'year')}
              />
            </Col>
            <Col span={6}>
              <IntegerInput
                suffix="Month"
                value={
                  props.value && props.value.month ? props.value.month : '0'
                }
                onChange={value => onIntegerInputChange(value, 'month')}
              />
            </Col>
            <Col span={6}>
              <IntegerInput
                suffix="Days"
                value={props.value && props.value.day ? props.value.day : '0'}
                onChange={value => onIntegerInputChange(value, 'day')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const RelatingToAlcoholDrinkingField = props => {
  const {
    FindingRelatingToAlcoholDrinkingBehavior,
    include,
    language,
    i18n,
  } = props.valueSet

  const [showFields, setShowFields] = useState(false)
  const [fieldValues, setFieldValues] = useState()

  const onRadioChange = event => {
    const codeAbleConsept =
      FindingRelatingToAlcoholDrinkingBehavior.include[event.target.value].code

    if (event.target.value === 'LifetimeNonDrinkerOfAlcohol') {
      setShowFields(false)
      setFieldValues()

      props.onChange({
        FindingRelatingToAlcoholDrinkingBehavior: codeAbleConsept,
      })
    }
    // else if (event.target.value === 'StoppedDrinkingAlcohol') {
    //   showPeriodEndField(true)
    // }
    else {
      setShowFields(true)
      const currentValues = {
        ...fieldValues,
        FindingRelatingToAlcoholDrinkingBehavior: codeAbleConsept,
      }

      setFieldValues(currentValues)
      props.onChange(currentValues)
    }
  }

  const onRelatingToAlcoholChange = value => {
    const currentValues = {
      ...fieldValues,
      ...value,
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          {resolveDisplay(FindingRelatingToAlcoholDrinkingBehavior, language)}
        </Col>
        <Col span={12}>
          <Radio.Group onChange={onRadioChange}>
            {Object.keys(FindingRelatingToAlcoholDrinkingBehavior.include).map(
              item => {
                const radioValue = resolveDisplay(
                  FindingRelatingToAlcoholDrinkingBehavior.include[item],
                  language
                )

                return (
                  <Radio style={{ display: 'block' }} value={item}>
                    {radioValue}
                  </Radio>
                )
              }
            )}
          </Radio.Group>
        </Col>
      </Row>
      {showFields && (
        <div>
          <Row>
            <Col span={12}>
              {resolveDisplay(include.AlcoholIntake, language)}
            </Col>
            <Col span={12}>
              <IntegerAndRadioField
                suffix={i18n.t`Standard quantity`}
                values={props.value && props.value.AlcoholIntake}
                onChange={value =>
                  onRelatingToAlcoholChange({ AlcoholIntake: value })
                }
              />
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              {resolveDisplay(include.DateOfLastAlcoholIntake, language)}
            </Col>
            <Col span={12}>
              <RecurrenceField
                style={{ width: '80%' }}
                onChange={value =>
                  onRelatingToAlcoholChange({ DateOfLastAlcoholIntake: value })
                }
                value={props.value && props.value.DateOfLastAlcoholIntake}
              />
            </Col>
          </Row>
          <DrinkingDateAndLength
            valueSet={include}
            value={props.value && props.value.LengthOfAlcoholUsingPeriod}
            language={language}
            onChange={onRelatingToAlcoholChange}
          />
        </div>
      )}
    </div>
  )
}

const NumberOfCigarettesField = props => {
  const { values, i18n } = props
  const [radioValue, setRadioValue] = useState()

  const onInputFieldChange = (value, valueType) => {
    props.onChange({
      NumberOfCigarettes: {
        dateType: valueType,
        dateValue: value,
      },
    })
  }

  const onRadioChange = event => {
    setRadioValue(event.target.value)
    props.onChange({ NumberOfCigarettes: {} })
  }

  return (
    <Radio.Group onChange={onRadioChange}>
      <Row type="flex" align="middle" gutter={[8, 8]}>
        <Col span={8}>
          <Radio value="Day">
            <Trans id="Per day" />
          </Radio>
        </Col>
        <Col span={16}>
          <IntegerInput
            suffix={i18n.t`Unit`}
            value={
              radioValue && radioValue === 'Day'
                ? values && values.dateValue
                : ''
            }
            onChange={value => onInputFieldChange(value, 'Day')}
            disabled={radioValue && radioValue === 'Day' ? false : true}
          />
        </Col>
      </Row>

      <Row type="flex" align="middle" gutter={[8, 8]}>
        <Col span={8}>
          <Radio value="Month">
            <Trans id="Per month" />
          </Radio>
        </Col>
        <Col span={16}>
          <IntegerInput
            suffix={i18n.t`Unit`}
            value={
              radioValue && radioValue === 'Month'
                ? values && values.dateValue
                : ''
            }
            onChange={value => onInputFieldChange(value, 'Month')}
            disabled={radioValue && radioValue === 'Month' ? false : true}
          />
        </Col>
      </Row>

      <Row type="flex" align="middle" gutter={[8, 8]}>
        <Col span={8}>
          <Radio value="Year">
            <Trans id="Per year" />
          </Radio>
        </Col>
        <Col span={16}>
          <IntegerInput
            suffix={i18n.t`Unit`}
            value={
              radioValue && radioValue === 'Year'
                ? values && values.dateValue
                : ''
            }
            onChange={value => onInputFieldChange(value, 'Year')}
            disabled={radioValue && radioValue === 'Year' ? false : true}
          />
        </Col>
      </Row>
    </Radio.Group>
  )
}

const RelatingToTobaccaUseField = props => {
  const {
    FindingOfTobaccoUseAndExposure,
    include,
    language,
    i18n,
  } = props.valueSet
  const [showFields, setShowFields] = useState(false)
  const [fieldValues, setFieldValues] = useState()

  const onRadioChange = event => {
    const codeAbleConsept =
      FindingOfTobaccoUseAndExposure.include[event.target.value].code

    if (event.target.value === 'NeverSmokedTobacco') {
      setShowFields(false)
      setFieldValues()

      props.onChange({ FindingOfTobaccoUseAndExposure: codeAbleConsept })
    } else {
      setShowFields(true)
      const currentValues = {
        ...fieldValues,
        FindingOfTobaccoUseAndExposure: codeAbleConsept,
      }

      setFieldValues(currentValues)
      props.onChange(currentValues)
    }
  }

  const onFieldChange = value => {
    const currentValues = {
      ...fieldValues,
      ...value,
    }

    setFieldValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <div>
      <Row>
        <Col span={12}>
          {resolveDisplay(FindingOfTobaccoUseAndExposure, language)}
        </Col>
        <Col span={12}>
          <Radio.Group onChange={onRadioChange}>
            {Object.keys(FindingOfTobaccoUseAndExposure.include).map(item => {
              const radioValue = resolveDisplay(
                FindingOfTobaccoUseAndExposure.include[item],
                language
              )
              return (
                <Radio style={{ display: 'block' }} value={item}>
                  {radioValue}
                </Radio>
              )
            })}
          </Radio.Group>
        </Col>
      </Row>
      {showFields && (
        <div>
          <Row>
            <Col span={12}>
              {resolveDisplay(include.AgeAtStartingSmoking, language)}
            </Col>
            <Col span={12}>
              <IntegerInput
                onChange={value =>
                  onFieldChange({ AgeAtStartingSmoking: value })
                }
                suffix="Age"
                maxLength={3}
                style={{ width: '40%' }}
                value={props.value && props.value.AgeAtStartingSmoking}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {resolveDisplay(include.NumberOfYearsSmoking, language)}
            </Col>
            <Col span={12}>
              <IntegerInput
                onChange={value =>
                  onFieldChange({ NumberOfYearsSmoking: value })
                }
                maxLength={3}
                suffix="Years"
                style={{ width: '40%' }}
                value={props.value && props.value.NumberOfYearsSmoking}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              {resolveDisplay(include.NumberOfCigarettes, language)}
            </Col>
            <Col span={12}>
              <NumberOfCigarettesField
                i18n={i18n}
                onChange={onFieldChange}
                values={props.value && props.value.NumberOfCigarettes}
              />
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

const FormSection = props => {
  const { form, i18n, app } = props
  const abuseHabits =
    app.FHIR_CODES.AnamnesisVitae.include.SmokingDrinkingSubstanceAbuseHabits

  const { getFieldDecorator } = form

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const findingRelatingToAlcoholDrinkingBehavior = {
    FindingRelatingToAlcoholDrinkingBehavior:
      abuseHabits.include.FindingRelatingToAlcoholDrinkingBehavior,
    include: {
      AlcoholIntake: abuseHabits.include.AlcoholIntake,
      DateOfLastAlcoholIntake: abuseHabits.include.DateOfLastAlcoholIntake,
      DateOfStartedDrinkingAlcohol:
        abuseHabits.include.DateOfStartedDrinkingAlcohol,
      LengthOfAlcoholUsingPeriod:
        abuseHabits.include.LengthOfAlcoholUsingPeriod,
    },
    language: i18n._language,
    i18n: i18n,
  }

  const findingOfTobaccoUseAndExposure = {
    FindingOfTobaccoUseAndExposure:
      abuseHabits.include.FindingOfTobaccoUseAndExposure,
    include: {
      AgeAtStartingSmoking: abuseHabits.include.AgeAtStartingSmoking,
      NumberOfYearsSmoking: abuseHabits.include.NumberOfYearsSmoking,
      NumberOfCigarettes: abuseHabits.include.NumberOfCigarettes,
    },
    language: i18n._language,
    i18n: i18n,
  }

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type:
            'practitioner_patient_profile/smokingDrinkingSubstanceAbuseHabitsAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        setActiveStatus(true)

        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(async () => {
        await delay(1000)
        setActiveKey([])
      })
  }

  const onActiveChange = value => {
    setActiveKey(value)
  }

  const borderDisplayName = resolveDisplay(abuseHabits, i18n._language)

  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <ActiveCollapse
          displayName={borderDisplayName}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          <Form.Item>
            {getFieldDecorator('relatingAlcoholHabit', {
              rules: [{ required: false }],
            })(
              <RelatingToAlcoholDrinkingField
                i18n={i18n}
                valueSet={findingRelatingToAlcoholDrinkingBehavior}
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('relatingTobaccoUseAndExposure', {
              rules: [{ required: false }],
            })(
              <RelatingToTobaccaUseField
                i18n={i18n}
                valueSet={findingOfTobaccoUseAndExposure}
              />
            )}
          </Form.Item>

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
