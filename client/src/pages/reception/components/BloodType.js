import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { loadValuesets, resolveDesignation } from 'utils/valuesets'
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

class BloodGroupPanel extends React.Component {
  state = {
    bloodGroup: '',
    rhesusFactor: '',
    BLOOD_TYPE_DESIGNATION: { concept: [] },
    RHESUS_FACTOR_DESIGNATION: { concept: [] },
    editMode: this.props.editable ? false : true,
  }

  componentDidMount() {
    const { i18n } = this.props

    let [BLOOD_TYPE_DESIGNATION, RHESUS_FACTOR_DESIGNATION] = [
      this.props.reception.Valuesets['blood-type-values'],
      this.props.reception.Valuesets['rhesus-factor-values'],
    ].map(vset => resolveDesignation(vset, i18n._language))

    this.setState({
      BLOOD_TYPE_DESIGNATION: BLOOD_TYPE_DESIGNATION,
      RHESUS_FACTOR_DESIGNATION: RHESUS_FACTOR_DESIGNATION,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk } = this.props
        onOk(values)
      }
    })
  }

  onChangeBloodGroup = checkedValues => {
    this.setState({
      bloodGroup: checkedValues && checkedValues[checkedValues.length - 1],
    })

    this.props.form.setFieldsValue({
      bloodGroup: checkedValues[checkedValues.length - 1],
    })
  }

  onChangeRhesusFactor = checkedValues => {
    this.setState({
      rhesusFactor: checkedValues && checkedValues[checkedValues.length - 1],
    })

    this.props.form.setFieldsValue({
      rhesusFactor: checkedValues[checkedValues.length - 1],
    })
  }
  makeEditable = () => {
    this.setState({
      editMode: !this.state.editMode,
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

    const checkboxList = (valuesetConcept = []) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        {valuesetConcept.map(value => (
          <div style={{ width: '100%' }}>
            <Checkbox value={value.code} style={{ fontSize: '10px' }}>
              {value.display}
            </Checkbox>
          </div>
        ))}
      </div>
    )

    return (
      <div className={styles.contentForm} style={{ height: '160px' }}>
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
          <Form
            onSubmit={this.handleSubmit}
            key="keyVitalSignForm"
            layout="horizontal"
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  label={
                    <div className="title uppercase">
                      <Trans>Blood Group</Trans>
                    </div>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('bloodGroup', {
                    initialValue: this.props.initials &&
                      this.props.initials.bloodGroup && [
                        this.props.initials.bloodGroup,
                      ],
                    rules: [{ required: false }],
                  })(
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      onChange={onCheckboxGroupChange}
                      disabled={!this.state.editMode}
                    >
                      {checkboxList(this.state.BLOOD_TYPE_DESIGNATION.concept)}
                    </Checkbox.Group>
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label={
                    <div className="title uppercase">
                      <Trans>Rhesus Factor</Trans>
                    </div>
                  }
                  hasFeedback={false}
                  {...formItemLayout}
                >
                  {getFieldDecorator('rhesusFactor', {
                    initialValue: this.props.initials &&
                      this.props.initials.rhesusStatus && [
                        this.props.initials.rhesusStatus,
                      ],
                    rules: [{ required: false }],
                  })(
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      onChange={onCheckboxGroupChange}
                      disabled={!this.state.editMode}
                    >
                      {checkboxList(
                        this.state.RHESUS_FACTOR_DESIGNATION.concept
                      )}
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

BloodGroupPanel.propTypes = {
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
    })(BloodGroupPanel)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  const formData = {
    bloodGroupValueCodeableConcept: {},
    rhesusStatusValueCodeableConcept: {},
  }
  // empty object if no value checked

  if (
    !allFields.bloodGroup.errors &&
    !!allFields.bloodGroup.value &&
    allFields.bloodGroup.value.length > 0
  ) {
    const code = allFields.bloodGroup.value[0]
    const system =
      props.reception.Valuesets['blood-type-values'].compose.include[0].system
    console.log(props.reception.Valuesets['blood-type-values'], code)
    const display = props.reception.Valuesets[
      'blood-type-values'
    ].compose.include[0].concept.find(v => v.code === code).display

    const bloodGroupCode = {
      code: code,
      system: system,
      display: display,
    }
    Object.assign(formData, {
      bloodGroupValueCodeableConcept: {
        coding: [bloodGroupCode],
        text: bloodGroupCode.display,
      },
    })
  }

  if (
    !allFields.rhesusFactor.errors &&
    !!allFields.rhesusFactor.value &&
    allFields.rhesusFactor.value.length > 0
  ) {
    console.log(allFields.rhesusFactor.value)
    const code = allFields.rhesusFactor.value[0]
    const system =
      props.reception.Valuesets['rhesus-factor-values'].compose.include[0]
        .system
    const display = props.reception.Valuesets[
      'rhesus-factor-values'
    ].compose.include[0].concept.find(v => v.code === code).display
    const rhesusFactorCode = {
      code: code,
      system: system,
      display: display,
    }

    Object.assign(formData, {
      rhesusStatusValueCodeableConcept: {
        coding: [rhesusFactorCode],
        text: rhesusFactorCode.display,
      },
    })
  }

  !isEmptyObject(formData) ? props.onChange(formData) : props.onChange()
}

// Check listiin songoson utgiig zuvhun neg bailgahiin tuld FIFO baihaar gargana.
function onCheckboxGroupChange(checkedValues) {
  if (checkedValues.length > 1) checkedValues.shift()
}
