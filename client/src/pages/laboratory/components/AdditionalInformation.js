import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { loadValuesets, resolveDesignation } from 'utils/valuesets'
import { Form, Input, Row, Col, Select, Button, Icon } from 'antd'
import styles from './Modal.less'
import { DateInput, IntegerInput, DivInput } from 'components'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const DEFAULT_COUNTRY_CODE = 'MNG'

const AdditionalInformation = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form

  const [
    administrativeGenderDesignation,
    setAdministrativeGenderDesignation,
  ] = useState()
  const [patientAge, setPatientAge] = useState()
  const [countryDesignation, setCountryDesignation] = useState()
  const [editMode, setEditMode] = useState(props.editable ? false : true)

  useEffect(() => {
    console.log(props.laboratory_patientProfile)
    const [COUNTRY_DESIGNATION, ADMINISTRATIVE_GENDER_DESIGNATION] = [
      props.laboratory_patientProfile.Valuesets['country-values-mn'],
      props.laboratory_patientProfile.Valuesets['administrative-gender'],
    ].map(vset => resolveDesignation(vset, i18n._language))

    setAdministrativeGenderDesignation(ADMINISTRATIVE_GENDER_DESIGNATION)
    setCountryDesignation(COUNTRY_DESIGNATION)

    props.initials &&
      props.initials.birthDate &&
      onBirthDateChange(props.initials.birthDate)
  }, [])

  useEffect(() => {
    props.initials &&
      props.initials.birthDate &&
      onBirthDateChange(props.initials.birthDate)

    props.initials &&
      props.initials.birthDate &&
      props.form.setFieldsValue({
        birthDate: props.initials.birthDate,
      })
  }, [props.initials.age, props.initials.birthDate])

  // Validate required fields
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk } = props
        onOk(values)
      }
    })
  }

  const onBirthDateChange = value => {
    // const age = calculateAgeFromBirthDate(value)
    // setPatientAge(age)

    props.onBirthDateChange(value)
  }

  const validateBirthDate = (rule, value, callback) => {
    if (!value || (value && birthDateValidator(value))) {
      callback()
    } else {
      callback('Birth date is invalid')
    }
  }
  const makeEditable = () => {
    setEditMode(!editMode)
  }

  return (
    <div className={styles.contentForm} style={{ height: '180px' }}>
      <div
        style={{
          zIndex: '2',
          position: 'relative',
          visibility: props.editable ? 'visible' : 'hidden',
        }}
      >
        <Row type="flex" justify="end" style={{ marginTop: '28px' }}>
          {/* <Button className={styles.editButton} onClick={makeEditable}>
            <Icon type="edit" />
          </Button> */}
        </Row>
      </div>
      <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
        <Form
          onSubmit={handleSubmit}
          key="keyAdditionalForm"
          layout="horizontal"
          hasFeedback={false}
        >
          <Row gutter={[8, 6]}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans id={'ClanName'} />
                  </span>
                }
                // hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('clanName', {
                  initialValue: props.initials && props.initials.clanName,
                  rules: [{ required: false }],
                })(<Input disabled={!editMode} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans id={'Citizenship'} />
                  </span>
                }
                // hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('citizenship', {
                  initialValue: DEFAULT_COUNTRY_CODE,
                  rules: [{ required: false }],
                })(
                  <Select
                    showSearch
                    placeholder={i18n.t`Citizenship`}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={!editMode}
                  >
                    {countryDesignation &&
                      countryDesignation.concept.map(item => (
                        <Option value={item.code}>{item.display}</Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans id={'Age'} />
                  </span>
                }
                // hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '40px',
                  }}
                >
                  <DivInput
                    disabled={!editMode}
                    value={props.initials && props.initials.patientAge}
                  />
                </div>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans id={'Gender'} />
                  </span>
                }
                // hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('gender', {
                  initialValue: props.initials && props.initials.gender,
                  rules: [{ required: false }],
                })(
                  <Select placeholder={i18n.t`Gender`} disabled={!editMode}>
                    {administrativeGenderDesignation &&
                      administrativeGenderDesignation.concept.map(v => (
                        <Option key={v.code} value={v.code}>
                          {v.display}
                        </Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label={
                  <span
                    className="title uppercase"
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                  >
                    <Trans id={'HouseHoldSize'} />
                  </span>
                }
                // hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('houseHoldSize', {
                  initialValue: props.initials && props.initials.houseHoldSize,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<IntegerInput min={1} max={100} disabled={!editMode} />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans id={'BirthDate'} />
                  </span>
                }
                // hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('birthDate', {
                  initialValue: props.initials && props.initials.birthDate,
                  rules: [
                    {
                      required: false,
                    },
                    {
                      validator: validateBirthDate,
                    },
                  ],
                })(
                  <DateInput
                    disabled={!editMode}
                    onChange={onBirthDateChange}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

AdditionalInformation.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ app, laboratory_patientProfile, loading }) => ({
  app,
  laboratory_patientProfile,
  loading,
}))(
  withI18n()(
    Form.create({
      onFieldsChange: onFieldsChange,
    })(AdditionalInformation)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  const countryValues =
    props.laboratory_patientProfile.Valuesets &&
    props.laboratory_patientProfile.Valuesets['country-values-mn']

  let formData = {}
  // empty object if no value checked

  if (Object.keys(allFields).some(key => !!allFields[key].errors)) {
    formData = {
      hasErrors: true,
    }
    return props.onChange(formData)
  }

  if (
    allFields.citizenship &&
    !!allFields.citizenship.value &&
    !!countryValues
  ) {
    formData.citizenship = {
      ...props.app.FHIR_CODES.Extensions.Citizenship,
      extension: [
        {
          url: 'code',
          valueCodeableConcept: {
            coding: [
              {
                ...props.app.FHIR_CODES.CodeSystems.NationCodeOfCitizenship,
                code: allFields.citizenship.value,
                display: countryValues.compose.include[0].concept.find(
                  v => v.code === allFields.citizenship.value
                ).display,
              },
            ],
          },
        },
      ],
    }
  }

  if (
    allFields.clanName &&
    !!allFields.clanName.value &&
    allFields.clanName.value !== ''
  ) {
    formData.clanName = allFields.clanName.value
  } else if (allFields.clanName && allFields.clanName.value === '') {
    formData.clanName = {}
    // empty object for deleted
  }

  if (!!allFields.gender && !!allFields.gender.value) {
    formData.gender = allFields.gender.value
  }

  if (!!allFields.houseHoldSize && !!allFields.houseHoldSize.value) {
    formData.houseHoldSize = {
      code: props.app.FHIR_CODES.Observations.HouseHoldSize.code,
      valueInteger: parseInt(allFields.houseHoldSize.value),
    }
  }

  if (!!allFields.birthDate && !!allFields.birthDate.value) {
    formData.birthDate = allFields.birthDate.value
  }

  return props.onChange(formData)
}

// validate birthdate using regex
function birthDateValidator(value) {
  if (
    value &&
    value.match(
      /((19|20)([0-9][0-9]))(-)((0[1-9])|(1[0-2]))(-)((0[1-9])|([1-2][0-9])|(3[0-1]))/g
    )
  ) {
    return true
  } else {
    return false
  }
}

function calculateAgeFromBirthDate(birthDate) {
  try {
    const dateOfBirth = new Date(birthDate)
    const dateNow = new Date()

    const age = dateNow.getFullYear() - dateOfBirth.getFullYear()
    return age
  } catch {}
}
