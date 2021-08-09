import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './Modal.less'
import { Form, Row, Col, Checkbox, Button, Icon } from 'antd'
import { isEmptyObject } from 'utils/helper'

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const Disability = props => {
  const [yes, setYes] = useState(false)
  const [editMode, setEditMode] = useState(!props.editable)

  const handleYes = event => {
    setYes(event.target.checked)

    props.form.setFieldsValue({
      disabilityType: undefined,
    })
  }

  const handleNo = e => {
    setYes(false)

    props.form.setFieldsValue({
      disabilityType: undefined,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onOk(values)
      }
    })
  }

  const makeEditable = () => {
    setEditMode(!editMode)

    if (
      props &&
      props.initials &&
      props.initials.disabilities &&
      props.initials.disabilities.length > 0
    ) {
      setYes(!yes)
    }
  }

  const { form, i18n } = props
  const { getFieldDecorator } = form

  return (
    <div className={styles.contentForm} style={{ height: '160px' }}>
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
          key="keyDisabilityForm"
          layout="horizontal"
        >
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item
                label={
                  <div className="title uppercase">
                    <Trans>Disability</Trans>
                  </div>
                }
                hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('hasDisability', {
                  initialValue:
                    props.initials && props.initials.hasDisability
                      ? ['yes']
                      : undefined,
                  rules: [{ required: false }],
                })(
                  <Checkbox.Group
                    style={{ width: '100%' }}
                    onChange={onCheckboxGroupChange}
                    disabled={!editMode}
                  >
                    <Row gutter={8}>
                      <Col span={24}>
                        <Checkbox
                          value="yes"
                          onChange={handleYes}
                          style={{ fontSize: '10px' }}
                        >
                          {i18n.t`Yes`}
                        </Checkbox>
                      </Col>
                    </Row>

                    <Row gutter={8}>
                      <Col span={24}>
                        <Checkbox
                          value="no"
                          onChange={handleNo}
                          style={{ fontSize: '10px' }}
                        >
                          {i18n.t`No`}
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>

            <Col span={18}>
              <Form.Item
                label={
                  <div
                    style={{
                      fontStyle: 'italic',
                      color: '#727272',
                      opacity: '1',
                      letterSpacing: '0',
                    }}
                  >
                    <Trans id={'whichDisability'} />
                  </div>
                }
                hasFeedback={false}
                {...formItemLayout}
              >
                {getFieldDecorator('disabilityType', {
                  initialValue:
                    props.initials &&
                    props.initials.disabilities &&
                    props.initials.disabilities,

                  rules: [{ required: false }],
                })(
                  <Checkbox.Group
                    style={{
                      width: '100%',
                    }}
                    disabled={!yes}
                  >
                    <Row gutter={8}>
                      <Col span={6}>
                        <Checkbox
                          value="SpeechAndLanguageDisorder"
                          style={{ fontSize: '10px' }}
                        >
                          {i18n.t`Speech`}
                        </Checkbox>
                      </Col>
                      <Col span={10}>
                        <Checkbox
                          value="DisabilityOfLowerLimb"
                          style={{ fontSize: '10px' }}
                        >
                          {i18n.t`LowerLimb`}
                        </Checkbox>
                      </Col>
                      <Col span={8}>
                        <Checkbox
                          value="VisualImpairment"
                          style={{ fontSize: '10px' }}
                        >
                          {i18n.t`Visual`}
                        </Checkbox>
                      </Col>
                    </Row>

                    <Row gutter={8}>
                      <Col span={6}>
                        <Checkbox
                          value="HearingLoss"
                          style={{ fontSize: '10px' }}
                        >
                          {i18n.t`Hearing`}
                        </Checkbox>
                      </Col>
                      <Col span={10}>
                        <Checkbox
                          value="DisabilityOfUpperLimb"
                          style={{ fontSize: '10px' }}
                        >
                          {i18n.t`UpperLimb`}
                        </Checkbox>
                      </Col>
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

Disability.propTypes = {
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
    })(Disability)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  const formData = {}
  // empty object if no value checked

  if (
    !allFields.hasDisability.errors &&
    !!allFields.hasDisability.value &&
    allFields.hasDisability.value.length > 0
  ) {
    if (allFields.hasDisability.value[0] === 'yes') {
      Object.assign(formData, {
        disabilityConditionCode: props.app.FHIR_CODES.Conditions.Disability,
      })
    }
  }

  if (
    !allFields.disabilityType.errors &&
    !!allFields.disabilityType.value &&
    allFields.disabilityType.value.length > 0
  ) {
    allFields.disabilityType.value.forEach(item => {
      Object.assign(formData, {
        [item]: props.app.FHIR_CODES.Conditions[item],
      })
    })
  }

  props.onChange(formData)
}

// Check listiin songoson utgiig zuvhun neg bailgahiin tuld FIFO baihaar gargana.
function onCheckboxGroupChange(checkedValues) {
  if (checkedValues.length > 1) checkedValues.shift()
}
