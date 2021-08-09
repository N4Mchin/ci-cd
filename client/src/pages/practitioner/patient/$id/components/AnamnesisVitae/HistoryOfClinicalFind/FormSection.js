import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Radio, Icon, Descriptions } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'
import { ActiveCollapse, SearchInputICD9 } from 'components'
import { CheckboxField, DateField } from './../..'
import styles from './../../../styles.less'

const { TextArea } = Input

const RadioField = props => {
  const onRadioChange = event => {
    props.onChange(event.target.value)
  }

  return (
    <Row>
      <Col span={12}>
        <Trans id={'Past history of procedure'} />
      </Col>
      <Col span={12}>
        <Radio.Group onChange={onRadioChange}>
          <Radio value={true}>{<Trans id="Yes" />}</Radio>
          <Radio value={false}>{<Trans id="No" />}</Radio>
        </Radio.Group>
      </Col>
    </Row>
  )
}

const ProcedureField = props => {
  const { i18n } = props

  const [procedureValues, setProcedureValues] = useState({})
  const [disabled, setDisabled] = useState(true)
  const [array, setArray] = useState([{ key: '1' }])
  const [complicationValue, setComplicationValue] = useState()
  const [complicationDetail, setComplicationDetail] = useState()

  const addRowSubmit = () => {
    const copyArray = array.slice()
    const newElement = {
      key: array.length + 1,
    }

    copyArray.push(newElement)
    setArray(copyArray)
  }

  const deleteRowSubmit = key => {
    let deleteIndex

    array.forEach((value, index) => {
      if (value.key === key) {
        deleteIndex = index
      }
    })

    const leftArray = array.slice(0, deleteIndex)
    const rightArray = array.slice(deleteIndex + 1, array.length)
    const newArray = [...leftArray, ...rightArray]

    setArray(newArray)
  }

  const onProcedureFieldChange = (value, valueType) => {
    if (valueType === 'procedureQuestion') {
      setDisabled(!value)

      if (!value) {
        setComplicationDetail('')
        setComplicationValue('')
        props.onChange(false)
      }
    } else {
      const currentValues = {
        ...procedureValues,
        [valueType]: value,
      }

      setProcedureValues(currentValues)
      props.onChange(currentValues)
    }
  }

  const onComplicationChange = value => {
    setComplicationValue(value)
    onProcedureFieldChange(value, 'complication')
  }

  const onComplicationDetailChange = value => {
    setComplicationDetail(value)
    onProcedureFieldChange(value, 'complicationDetail')
  }

  return (
    <div>
      <RadioField
        onChange={value => onProcedureFieldChange(value, 'procedureQuestion')}
      />
      {array.map(element => {
        return (
          <div className={styles.medicationRequestTable}>
            <Descriptions bordered layout="vertical">
              <Descriptions.Item
                span={5 / 2}
                label={
                  <div className="title uppercase">
                    {i18n.t`Past history of procedure`}
                  </div>
                }
              >
                <Descriptions bordered layout="vertical">
                  <Descriptions.Item
                    label={i18n.t`Name of performed procedure`}
                    span={3}
                  >
                    <SearchInputICD9
                      disabled={disabled}
                      onChange={value =>
                        onProcedureFieldChange(value, 'procedureCode')
                      }
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={i18n.t`Date of procedure`}
                    span={3 / 2}
                  >
                    <DateField
                      disabled={disabled}
                      style={{ width: '80%' }}
                      onChange={value =>
                        onProcedureFieldChange(value, 'performedDateTime')
                      }
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={i18n.t`Procedure complication`}
                    span={1}
                  >
                    <Radio.Group
                      disabled={disabled}
                      value={complicationValue}
                      onChange={event =>
                        onComplicationChange(event.target.value)
                      }
                    >
                      <Radio value={true}>{<Trans id="Yes" />}</Radio>
                      <Radio value={false}>{<Trans id="No" />}</Radio>
                    </Radio.Group>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={i18n.t`Complication Of Procedure`}
                    span={1}
                  >
                    <TextArea
                      disabled={disabled}
                      style={{ width: '80%' }}
                      value={complicationDetail}
                      placeholder={i18n.t`Please write`}
                      onChange={event =>
                        onComplicationDetailChange(event.target.value)
                      }
                    />
                  </Descriptions.Item>
                </Descriptions>
              </Descriptions.Item>

              {/* <Descriptions.Item label={i18n.t`Delete`}>
                <Button
                  type="primary"
                  onClick={() => deleteRowSubmit(element.key)}
                >
                  <Icon type="delete" />
                </Button>
              </Descriptions.Item> */}
            </Descriptions>
            <br />
          </div>
        )
      })}
      {/* <Row type="flex" justify="start">
        <Button type="primary" onClick={addRowSubmit}>
          <Trans id={'Add'} />
        </Button>
      </Row> */}
    </div>
  )
}

const AccidentalEventField = props => {
  const { fieldName, language, valueSet } = props
  const { accidentalEventBoolean, accidentalEvent } = fieldName
  const [showCheckbox, setShowCheckboxVisible] = useState(false)

  const onChange = event => {
    setShowCheckboxVisible(event.target.value)

    if (!event.target.value) {
      props.onChange({ boolean: event.target.value })
    }
  }

  const onCheckboxChange = value => {
    props.onChange({ checkbox: value, boolean: showCheckbox })
  }

  return (
    <Row>
      <Row>
        <Col span={11}>{resolveDisplay(accidentalEventBoolean, language)}</Col>
        <Col span={13}>
          <Radio.Group onChange={onChange}>
            <Radio value={true}>{<Trans id="Yes" />}</Radio>
            <Radio value={false}>{<Trans id="No" />}</Radio>
          </Radio.Group>
        </Col>
      </Row>
      {showCheckbox && (
        <Row>
          <Col span={11}>{resolveDisplay(accidentalEvent, language)}</Col>
          <Col span={13}>
            <CheckboxField valueSet={valueSet} onChange={onCheckboxChange} />
          </Col>
        </Row>
      )}
    </Row>
  )
}

const HistoryOfClinicalFindingInSubjectField = props => {
  const { valueSet, language, fieldName, i18n } = props

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'string':
      return (
        <Row>
          <Col span={11}>{fieldName}</Col>
          <Col span={13}>
            <TextArea
              rows={4}
              style={{ width: '80%' }}
              onChange={onChange}
              placeholder={i18n.t`Please write`}
            />
          </Col>
        </Row>
      )
    case 'radioAndTable':
      return (
        <ProcedureField
          i18n={i18n}
          onChange={onChange}
          valueSet={valueSet}
          fieldName={fieldName}
        />
      )
    case 'radioAndCheck':
      return (
        <AccidentalEventField
          onChange={onChange}
          valueSet={valueSet}
          fieldName={fieldName}
          language={language}
        />
      )
    case 'check':
      return (
        <Row>
          <Col span={11}>{fieldName}</Col>
          <Col span={13}>
            <CheckboxField
              onChange={onChange}
              valueSet={valueSet}
              language={language}
            />
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
  const clinicalFindSubject =
    AnamnesisVitae.include.HistoryOfClinicalFindingInSubject.include

  const textFieldsValues = [
    {
      name: clinicalFindSubject.HistoryOfInfectiousDisease,
      value: 'HistoryOfInfectiousDisease',
      type: 'check',
      valueSet: clinicalFindSubject.HistoryOfInfectiousDisease.include,
    },
    {
      name: clinicalFindSubject.PastHistoryOfProcedure,
      value: 'PastHistoryOfProcedure',
      type: 'radioAndTable',
    },
    {
      name: clinicalFindSubject.ChronicDisease,
      value: 'ChronicDisease',
      type: 'check',
      valueSet: clinicalFindSubject.ChronicDisease.include,
    },
    {
      name: {
        accidentalEventBoolean: clinicalFindSubject.AccidentalEventBoolean,
        accidentalEvent: clinicalFindSubject.AccidentalEvent,
      },
      value: 'AccidentalEvent',
      type: 'radioAndCheck',
      valueSet: clinicalFindSubject.AccidentalEvent.include,
    },
    {
      name: <Trans id={'AdditionalInformation'} />,
      value: 'note',
      type: 'string',
    },
  ]

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    return (
      form
        .validateFields()
        .then(formValues => {
          console.log(formValues)
          return props.dispatch({
            type: 'practitioner_patient_profile/historyOfClinicalFindAdd',
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
        .then(async () => {
          await delay(900)
          setActiveKey([])
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
    )
  }
  const onActiveChange = value => {
    setActiveKey(value)
  }

  const title = resolveDisplay(
    AnamnesisVitae.include.HistoryOfClinicalFindingInSubject,
    i18n._language
  )

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
          {textFieldsValues.map(fieldValue => {
            const labelName = resolveDisplay(fieldValue.name, i18n._language)
            return (
              <Row gutter={[10, 10]}>
                <Col>
                  <Form.Item>
                    {getFieldDecorator(`${fieldValue.value}`, {
                      rules: [{ required: false }],
                    })(
                      <HistoryOfClinicalFindingInSubjectField
                        i18n={i18n}
                        type={fieldValue.type}
                        language={i18n._language}
                        valueSet={fieldValue.valueSet}
                        fieldName={labelName ? labelName : fieldValue.name}
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
