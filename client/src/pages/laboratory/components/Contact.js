import React from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './Modal.less'
import { Form, Input, Select, Row, Button, Icon } from 'antd'
import { resolveDesignation } from 'utils/valuesets'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

class Contact extends React.Component {
  state = {
    CONTACT_VALUESET: {},
    CONTACT_DESIGNATION: { concept: [] },
    editMode: this.props.editable ? false : true, // edit mode starts with false if editable
  }

  componentDidMount() {
    const { i18n } = this.props

    const CONTACT_VALUESET =
      this.props.laboratory_patientProfile.Valuesets &&
      this.props.laboratory_patientProfile.Valuesets[
        'patient-contact-relationship'
      ]
    const CONTACT_DESIGNATION = resolveDesignation(
      CONTACT_VALUESET,
      i18n._language
    )

    this.setState({
      CONTACT_DESIGNATION: CONTACT_DESIGNATION || { concept: [] },
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

  validateContactNumber = (rule, value, callback) => {
    if (value && value.match(/^([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$/g))
      callback()
    else callback('Invalid Phone Number')
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
      <div className={styles.contentForm} style={{ height: '232px' }}>
        <div
          style={{
            zIndex: '2',
            position: 'relative',
            visibility: this.props.editable ? 'visible' : 'hidden',
          }}
        >
          <Row type="flex" justify="end" style={{ marginTop: '28px' }}>
            {/* <Button className={styles.editButton} onClick={this.makeEditable}>
              <Icon type="edit" />
            </Button> */}
          </Row>
        </div>
        <div style={{ zIndex: '1', position: 'relative', top: '-32px' }}>
          <Form
            onSubmit={this.handleSubmit}
            key="keyContactForm"
            layout="horizontal"
          >
            <Form.Item
              label={
                <span className="title uppercase">
                  <Trans id={'RelatedPersonType'} />
                </span>
              }
              hasFeedback={false}
              {...formItemLayout}
            >
              {getFieldDecorator('relatedPersonType', {
                initialValue:
                  this.props.initials && this.props.initials.relatedPersonType,
                rules: [
                  {
                    required: true,
                    message: i18n.t`WarningInputPersonType`,
                  },
                ],
              })(
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={!this.state.editMode}
                >
                  {this.state.CONTACT_DESIGNATION &&
                    this.state.CONTACT_DESIGNATION.concept &&
                    this.state.CONTACT_DESIGNATION.concept.map(item => (
                      <Option value={item.code}>{item.display}</Option>
                    ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item
              label={
                <span className="title uppercase">
                  <Trans id={'ContactNumber'} />
                </span>
              }
              hasFeedback={false}
              {...formItemLayout}
            >
              {getFieldDecorator('contactNumber', {
                initialValue:
                  this.props.initials && this.props.initials.contactNumber,
                rules: [
                  {
                    required: true,
                    message: i18n.t`WarningInputAdditionalNumber`,
                  },
                  {
                    validator: this.validateContactNumber,
                  },
                ],
              })(<Input disabled={!this.state.editMode} />)}
            </Form.Item>

            <Form.Item
              label={
                <span className="title uppercase">
                  <Trans id={'Email'} />
                </span>
              }
              hasFeedback={false}
              {...formItemLayout}
            >
              {getFieldDecorator('email', {
                initialValue: this.props.initials && this.props.initials.email,
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: false,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input disabled={!this.state.editMode} />)}
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

Contact.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ laboratory_patientProfile, loading }) => ({
  laboratory_patientProfile,
  loading,
}))(
  withI18n()(
    Form.create({
      onFieldsChange: onFieldsChange,
    })(Contact)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  let formData = {}
  // empty object if no value checked

  if (Object.keys(allFields).some(key => !!allFields[key].errors)) {
    formData = {
      hasErrors: true,
    }
    return props.onChange(formData)
  }

  const CONTACT_VALUESET =
    props.laboratory_patientProfile.Valuesets['patient-contact-relationship']

  for (let key in allFields) {
    if (allFields[key].errors) {
      return props.onChange({})
    }
  }

  if (
    !allFields.relatedPersonType.errors &&
    !allFields.contactNumber.errors &&
    !!allFields.relatedPersonType.value &&
    !!allFields.contactNumber.value
  ) {
    const code = allFields.relatedPersonType.value
    const system = CONTACT_VALUESET.compose.include[0].system
    const display = CONTACT_VALUESET.compose.include[0].concept.find(
      v => v.code === code
    ).display

    const patientContact = {
      relationship: [
        {
          coding: [
            {
              system: system,
              code: code,
              display: display,
            },
          ],
        },
      ],
      telecom: [
        {
          system: 'phone',
          use: 'mobile',
          value: allFields.contactNumber.value,
        },
      ],
    }

    formData.patientContact = patientContact
  }

  if (!allFields.email.errors && !!allFields.email.value) {
    formData.email = allFields.email.value
  }

  props.onChange(formData)
}
