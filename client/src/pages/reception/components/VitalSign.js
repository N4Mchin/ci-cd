import React from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './Modal.less'
import { Form, Input, Row, Col, Checkbox, Button, Icon } from 'antd'
import { FloatNumber } from 'components'
import { calculateBodyMassIndex } from 'utils/helper'

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

function onChange(checkedValues) {
  if (checkedValues.length > 1) checkedValues.shift()
}

class VitalSign extends React.Component {
  state = {
    editMode: this.props.editable ? false : true, // edit mode starts with false if editable
  }
  makeEditable = () => {
    this.setState({
      editMode: !this.state.editMode,
    })
  }
  render() {
    const { form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.contentForm} style={{ height: '250px' }}>
        <div
          style={{
            zIndex: '2',
            position: 'relative',
            visibility: this.props.editable ? 'visible' : 'hidden',
          }}
        >
          <Row type="flex" justify="end">
            <Button className={styles.editButton} onClick={this.makeEditable}>
              <Icon type="edit" />
            </Button>
          </Row>
        </div>
        <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
          <Form key="keyVitalSignForm" layout="horizontal">
            <Row gutter={8}>
              <Col span={6}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`Height`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('height', {
                    initialValue:
                      this.props.initials && this.props.initials.height,
                    rules: [{ required: false }],
                  })(
                    <FloatNumber
                      suffix={i18n.t`cm`}
                      disabled={!this.state.editMode}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`Weight`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('weight', {
                    initialValue:
                      this.props.initials && this.props.initials.weight,
                    rules: [{ required: false }],
                  })(
                    <FloatNumber
                      suffix={i18n.t`kg`}
                      disabled={!this.state.editMode}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`BodyIndex`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('bodyIndex', {
                    initialValue:
                      this.props.initials && this.props.initials.bodyMassIndex,
                    rules: [
                      {
                        required: false,
                      },
                      {
                        validator: this.validateIndex,
                      },
                    ],
                  })(
                    <Input.Group compact disabled={!this.state.editMode}>
                      <Input
                        style={{ width: '28%', padding: '4px 4px 4px 11px' }}
                        value={
                          this.props.value && this.props.value.bodyMassIndex
                        }
                        defaultValue={
                          this.props.initials &&
                          this.props.initials.bodyMassIndex
                        }
                        disabled={!this.state.editMode}
                      />
                      <div
                        style={{
                          width: '72%',
                          height: '32px',
                          padding: '4px 4px 4px 11px',
                          border: '1px solid #C4C4C4',
                          background: '#eee',
                        }}
                      >
                        {this.props.value && (
                          <Trans id={this.props.value.bodyMassIndexDisplay} />
                        )}
                      </div>
                    </Input.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`GeneralHealth`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                  style={{ marginTop: '24px' }}
                >
                  {getFieldDecorator('generalHealth', {
                    initialValue: this.props.initials &&
                      this.props.initials.generalHealth && [
                        this.props.initials.generalHealth,
                      ],
                    rules: [{ required: false }],
                  })(
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      onChange={onChange}
                      disabled={!this.state.editMode}
                    >
                      <Row>
                        <Col span={24}>
                          <Row>
                            <Checkbox
                              value="FitAndWell"
                              style={{ fontSize: '10px' }}
                            >{i18n.t`Fit well`}</Checkbox>
                          </Row>
                          <Row>
                            <Checkbox
                              value="PatientFeelsWell"
                              style={{ fontSize: '10px' }}
                            >{i18n.t`Feels well`}</Checkbox>
                          </Row>
                          <Row>
                            <Checkbox
                              value="ChronicSick"
                              style={{ fontSize: '10px' }}
                            >{i18n.t`Chronic sick`}</Checkbox>
                          </Row>
                          <Row>
                            <Checkbox
                              value="SubcompensatedChronicSick"
                              style={{ fontSize: '10px' }}
                            >{i18n.t`Subcompensated chronic sick`}</Checkbox>
                          </Row>
                          <Row>
                            <Checkbox
                              value="DecompensatedChronicSick"
                              style={{ fontSize: '10px' }}
                            >{i18n.t`Decompensated chronic sick`}</Checkbox>
                          </Row>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={
                    <span
                      style={{
                        textTransform: 'uppercase',
                        fontFamily: 'Helvetica Neue Medium',
                      }}
                    >
                      {i18n.t`MentalDisorder`}
                    </span>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                  style={{ marginTop: '24px' }}
                >
                  {getFieldDecorator('mentalDisorder', {
                    initialValue: this.props.initials &&
                      this.props.initials.mentalDisorder && [
                        this.props.initials.mentalDisorder,
                      ],
                    rules: [{ required: false }],
                  })(
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      onChange={onChange}
                      disabled={!this.state.editMode}
                    >
                      <Row>
                        <Checkbox
                          value="yes"
                          style={{ fontSize: '10px' }}
                        >{i18n.t`Yes`}</Checkbox>
                      </Row>
                      <Row>
                        <Checkbox
                          value="no"
                          style={{ fontSize: '10px' }}
                        >{i18n.t`No`}</Checkbox>
                      </Row>
                    </Checkbox.Group>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

VitalSign.propTypes = {
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
    })(VitalSign)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  const formData = {}
  // empty object if no value checked

  if (
    !allFields.height.errors &&
    !!allFields.height.value &&
    allFields.height.value !== '' &&
    !isNaN(parseFloat(allFields.height.value))
  ) {
    Object.assign(formData, {
      height: allFields.height.value,
      heightValueQuantity: {
        value: parseFloat(allFields.height.value),
        unit: 'cm',
        system: 'http://unitsofmeasure.org',
        code: 'cm',
      },
    })
  } else if (allFields.height.value === '') {
    // empty object for no value
    Object.assign(formData, {
      heightValueQuantity: {},
    })
  }

  if (
    !allFields.weight.errors &&
    !!allFields.weight.value &&
    allFields.weight.value !== '' &&
    !isNaN(parseFloat(allFields.weight.value))
  ) {
    Object.assign(formData, {
      weight: allFields.weight.value,
      weightValueQuantity: {
        value: parseFloat(allFields.weight.value),
        unit: 'kg',
        system: 'http://unitsofmeasure.org',
        code: 'kg',
      },
    })
  } else if (allFields.weight.value === '') {
    // empty object for no value
    Object.assign(formData, {
      weightValueQuantity: {},
    })
  }

  if (!!formData.height && !!formData.weight) {
    const { bodyMassIndex, bodyMassIndexDisplay } = calculateBodyMassIndex(
      allFields.height.value,
      allFields.weight.value
    )

    Object.assign(formData, {
      bodyMassIndex,
      bodyMassIndexDisplay,
      bodyMassIndexValueQuantity: {
        value: parseFloat(bodyMassIndex),
        unit: 'kg/m2',
        system: 'http://unitsofmeasure.org',
        code: 'kg/m2',
      },
    })
  } else {
    // empty object for no value
    Object.assign(formData, {
      bodyMassIndexValueQuantity: {},
    })
  }
  console.log(allFields)
  if (
    !allFields.generalHealth.errors &&
    !!allFields.generalHealth.value &&
    allFields.generalHealth.value.length > 0
  ) {
    const generalHealthCode =
      props.app.FHIR_CODES.Observations.GeneralHealth.include[
        allFields.generalHealth.value[0]
      ]

    Object.assign(formData, {
      generalHealthComponent: {
        code: props.app.FHIR_CODES.Observations.GeneralHealth.code,
        valueCodeableConcept: generalHealthCode,
      },
    })
  } else {
    // empty object for no value
    Object.assign(formData, {
      generalHealthComponent: {},
    })
  }

  if (
    !allFields.mentalDisorder.errors &&
    !!allFields.mentalDisorder.value &&
    allFields.mentalDisorder.value.length > 0
  ) {
    if (allFields.mentalDisorder.value[0] === 'yes') {
      Object.assign(formData, {
        mentalDisorder: props.app.FHIR_CODES.Conditions.MentalDisorder,
      })
    } else {
      // empty object for no value
      Object.assign(formData, {
        mentalDisorder: {},
      })
    }
  } else {
    // empty object for no value
    Object.assign(formData, {
      mentalDisorder: {},
    })
  }

  props.onChange(formData)
}
