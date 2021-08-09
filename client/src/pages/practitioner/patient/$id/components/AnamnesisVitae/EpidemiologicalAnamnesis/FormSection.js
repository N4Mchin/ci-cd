import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Radio } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'
import { DateField } from './../..'

const { TextArea } = Input

const RadioField = props => {
  const onChange = event => {
    props.onFieldChange(event.target.value)
  }

  return (
    <Radio.Group onChange={onChange}>
      <Radio value={true}>{<Trans id="Yes" />}</Radio>
      <Radio value={false}>{<Trans id="No" />}</Radio>
    </Radio.Group>
  )
}

const TransfusionField = props => {
  const { fieldName, language } = props
  const { performedDateTime, transfusion } = fieldName
  const [transfusionAdditional, showTransfusionAdditional] = useState(false)
  const [values, setValues] = useState()

  const onTransfusionFieldChange = (event, name) => {
    if (name === 'Transfusion') {
      showTransfusionAdditional(event)
      if (!event) {
        props.onFieldChange({ Transfusion: event })
        return
      }
    }
    const currentValues = {
      ...values,
      [name]: event,
    }
    setValues(currentValues)
    props.onFieldChange(currentValues)
  }

  return (
    <Row>
      <Row>
        <Col span={12}>{resolveDisplay(transfusion, language)}</Col>
        <Col span={12}>
          <RadioField
            onFieldChange={value =>
              onTransfusionFieldChange(value, 'Transfusion')
            }
          />
        </Col>
      </Row>
      {transfusionAdditional && (
        <Row>
          <Col span={12}>{resolveDisplay(performedDateTime, language)}</Col>
          <Col span={12}>
            <DateField
              style={{ width: '80%' }}
              onChange={value =>
                onTransfusionFieldChange(value, 'PerformedDateTime')
              }
            />
          </Col>
        </Row>
      )}
    </Row>
  )
}

const TravelField = props => {
  const { fieldName, language } = props
  const { travelLength, travelAbroad, travelDestination } = fieldName
  const [travelAdditional, showTravelAdditional] = useState(false)
  const [values, setValues] = useState()

  const onTravelFieldChange = (event, name) => {
    if (name === 'TravelAbroad') {
      showTravelAdditional(event)
      if (!event) {
        props.onFieldChange({ TravelAbroad: event })
        return
      }
    }

    const currentValues = {
      ...values,
      [name]: name === 'TravelDestination' ? event.target.value : event,
    }

    setValues(currentValues)
    props.onFieldChange(currentValues)
  }

  return (
    <Row>
      <Row>
        <Col span={12}>{resolveDisplay(travelAbroad, language)}</Col>
        <Col span={12}>
          <RadioField
            onFieldChange={value => onTravelFieldChange(value, 'TravelAbroad')}
          />
        </Col>
      </Row>
      {travelAdditional && (
        <Row>
          <Col span={12}>{resolveDisplay(travelDestination, language)}</Col>
          <Col span={12}>
            <TextArea
              rows={4}
              style={{ width: '80%' }}
              onChange={value =>
                onTravelFieldChange(value, 'TravelDestination')
              }
            />
          </Col>
          <Col span={12}>{resolveDisplay(travelLength, language)}</Col>
          <Col span={12}>
            <DateField
              onChange={value => onTravelFieldChange(value, 'TravelLength')}
            />
          </Col>
        </Row>
      )}
    </Row>
  )
}

const EpidemiologicalAnamnesisField = props => {
  const { language, fieldName } = props

  const onChange = event => {
    props.onChange(event)
  }

  switch (props.type) {
    case 'radio':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <RadioField onFieldChange={onChange} />
          </Col>
        </Row>
      )
    case 'transfusion':
      return (
        <TransfusionField
          fieldName={fieldName}
          language={language}
          onFieldChange={onChange}
        />
      )
    case 'travel':
      return (
        <TravelField
          fieldName={fieldName}
          language={language}
          onFieldChange={onChange}
        />
      )
    default:
      return <></>
  }
}

const FormSection = props => {
  const { form, i18n, app } = props
  const { getFieldDecorator } = form
  const { AnamnesisVitae } = app.FHIR_CODES

  const epidemiologicalInclude =
    AnamnesisVitae.include.EpidemiologicalAnamnesis.include
  const title = resolveDisplay(
    AnamnesisVitae.include.EpidemiologicalAnamnesis,
    i18n._language
  )

  const textFieldValues = [
    {
      name: {
        transfusion: epidemiologicalInclude.Transfusion,
        performedDateTime: epidemiologicalInclude.PerformedDateTime,
      },
      value: 'transfusion',
      type: 'transfusion',
      required: true,
      message: i18n.t`whether transfusion`,
    },
    {
      name:
        epidemiologicalInclude.ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths,
      value: 'ContactWithAPatientWithAnInfectiousDiseaseWithinLastSixMonths',
      type: 'radio',
    },
    {
      name: {
        travelAbroad: epidemiologicalInclude.TravelAbroad,
        travelDestination: epidemiologicalInclude.TravelDestination,
        travelLength: epidemiologicalInclude.TravelLength,
      },
      value: 'travelAbroad',
      type: 'travel',
    },
  ]

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/epidemiologicalAnamnesisAdd',
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
      .catch(errorInfo => console.log(errorInfo))
      .finally(async () => {
        await delay(1000)
        setActiveKey([])
      })
  }

  const onActiveChange = value => {
    setActiveKey(value)
  }

  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <ActiveCollapse
          displayName={title}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          {textFieldValues.map(fieldValue => {
            const labelName = resolveDisplay(fieldValue.name, i18n._language)
            return (
              <Row gutter={[0, 10]}>
                <Col>
                  <Form.Item>
                    {getFieldDecorator(`${fieldValue.value}`, {
                      rules: [
                        {
                          required: fieldValue.required,
                          message: fieldValue.message,
                        },
                      ],
                    })(
                      <EpidemiologicalAnamnesisField
                        type={fieldValue.type}
                        fieldName={labelName ? labelName : fieldValue.name}
                        language={i18n._language}
                      />
                    )}
                  </Form.Item>
                </Col>
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
