import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { loadValuesets, resolveDesignation } from 'utils/valuesets'
import styles from './Modal.less'
import { Form, Input, Row, Col, Select, Button, Icon } from 'antd'
import { IntegerInput } from 'components'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const OtherInformation = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form

  const [raceDesignation, setRaceDesignation] = useState()
  const [occupationDesignation, setOccupationDesignation] = useState()
  const [editMode, setEditMode] = useState(props.editable ? false : true)

  useEffect(() => {
    const { i18n } = props
    try {
      const RACE_VALUESET = props.reception.Valuesets['race-values']
      const OCCUPATION_VALUESET = props.reception.Valuesets['occupation-values']

      let [RACE_DESIGNATION, OCCUPATION_DESIGNATION] = [
        RACE_VALUESET,
        OCCUPATION_VALUESET,
      ].map(vset => resolveDesignation(vset, i18n._language))

      setRaceDesignation(RACE_DESIGNATION)
      setOccupationDesignation(OCCUPATION_DESIGNATION)
    } catch {}
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk } = props
        onOk(values)
      }
    })
  }

  const validateSalary = (rule, value, callback) => {
    if (value && value.match(/^[0-9]*$/gm)) callback()
    else callback('Not Number')
  }
  const makeEditable = () => {
    setEditMode(!editMode)
  }

  return (
    <div className={styles.contentForm} style={{ height: '240px' }}>
      <div
        style={{
          zIndex: '2',
          position: 'relative',
          visibility: props.editable ? 'visible' : 'hidden',
        }}
      >
        <Row type="flex" justify="end">
          <Button className={styles.editButton} onClick={makeEditable}>
            <Icon type="edit" />
          </Button>
        </Row>
      </div>
      <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
        <Form
          onSubmit={handleSubmit}
          key="keyOtherForm"
          layout="horizontal"
          hasFeedback={false}
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label={
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontFamily: 'Helvetica Neue Medium',
                      height: '16px',
                    }}
                  >
                    {i18n.t`ClinicalIdentifier`}
                  </span>
                }
                {...formItemLayout}
              >
                {getFieldDecorator('healthInsuranceNumber', {
                  initialValue:
                    props.initials && props.initials.healthInsuranceNumber,
                  rules: [{ required: false }],
                })(<Input disabled={!editMode} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span
                    style={{
                      textTransform: 'uppercase',
                      fontFamily: 'Helvetica Neue Medium',
                      height: '16px',
                    }}
                  >
                    {i18n.t`SocialIdentifier`}
                  </span>
                }
                hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('taxIdNumber', {
                  initialValue: props.initials && props.initials.taxIdNumber,
                  rules: [{ required: false }],
                })(<Input disabled={!editMode} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans>Origin</Trans>
                  </span>
                }
                hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('ethnicity', {
                  initialValue: props.initials && props.initials.ethnicity,
                  rules: [{ required: false }],
                })(
                  <Select
                    showSearch
                    placeholder={i18n.t`Race`}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={!editMode}
                  >
                    {raceDesignation &&
                      raceDesignation.concept.map(item => (
                        <Option value={item.code}>{item.display}</Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans>MonthSalary</Trans>
                  </span>
                }
                hasFeedback={false}
                help={false}
                validateStatus="success"
                {...formItemLayout}
              >
                {getFieldDecorator('salary', {
                  initialValue: props.initials && props.initials.salary,
                  rules: [
                    {
                      required: false,
                    },
                    {
                      validator: validateSalary,
                    },
                  ],
                })(<IntegerInput addonAfter="₮" disabled={!editMode} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans>Occupation</Trans>
                  </span>
                }
                hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('occupation', {
                  initialValue: props.initials && props.initials.occupation,
                  rules: [{ required: false }],
                })(
                  <Select
                    showSearch
                    placeholder={i18n.t`Occupation`}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={!editMode}
                  >
                    {occupationDesignation &&
                      occupationDesignation.concept.map(item => (
                        <Option value={item.code}>{item.display}</Option>
                      ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

OtherInformation.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ app, reception, loading }) => ({
  app,
  reception,
  loading,
}))(
  withI18n()(
    Form.create({
      onFieldsChange: onFieldsChange,
    })(OtherInformation)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  const formData = {}
  // empty object if no value checked

  if (
    !allFields.taxIdNumber.errors &&
    !!allFields.taxIdNumber.value &&
    allFields.taxIdNumber.value !== ''
  ) {
    formData.taxIdNumber = {
      ...props.app.FHIR_CODES.Identifiers.TaxIdNumber,
      value: allFields.taxIdNumber.value,
    }
  }

  if (
    !allFields.healthInsuranceNumber.errors &&
    !!allFields.healthInsuranceNumber.value &&
    allFields.healthInsuranceNumber.value !== ''
  ) {
    formData.healthInsuranceNumber = {
      ...props.app.FHIR_CODES.Identifiers.HealthInsuranceNumber,
      value: allFields.healthInsuranceNumber.value,
    }
  }

  if (!allFields.ethnicity.errors && !!allFields.ethnicity.value) {
    formData.ethnicity = {
      ...props.app.FHIR_CODES.Extensions.Ethnicity,
      extension: [
        {
          url: 'ethnicity',
          valueString: allFields.ethnicity.value,
        },
      ],
    }
  }

  if (
    !allFields.salary.errors &&
    !!allFields.salary.value &&
    allFields.salary.value !== ''
  ) {
    formData.salaryComponent = {
      code: props.app.FHIR_CODES.Observations.Salary.code,
      valueQuantity: {
        value: parseFloat(allFields.salary.value),
        unit: '₮',
      },
    }
  }

  if (!allFields.occupation.errors && !!allFields.occupation.value) {
    const code = allFields.occupation.value
    const system =
      props.reception.Valuesets['occupation-values'].compose.include[0].system
    const display = props.reception.Valuesets[
      'occupation-values'
    ].compose.include[0].concept.find(v => v.code === code).display

    const OccupationValue = {
      code: code,
      system: system,
      display: display,
    }
    formData.occupation = {
      code: props.app.FHIR_CODES.Observations.Occupation.code,
      valueCodeableConcept: {
        coding: [OccupationValue],
        text: display,
      },
    }
  }

  props.onChange(formData)
}
