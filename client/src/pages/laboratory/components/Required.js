import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './Modal.less'
import { Form, Input, Row, Col, Checkbox, Button, Icon } from 'antd'

const NationalIdentificationNumberInput = props => {
  const { editMode, isVerified } = props
  const [NINumValue, setNINumValue] = useState('')

  useEffect(() => {
    setNINumValue('')
  }, [isVerified])

  const letterPattern = /^[А-ЯӨҮЁ]{1,2}$/g
  const digitPattern = /^\d{0,8}$/g
  // handle national id
  const handleNationalID = event => {
    const { value } = event.target
    const Value = value && value.toUpperCase()

    if (!Value) {
      setNINumValue(Value)

      props.onChange(Value)
      props.onChangeNationalID(Value)
      return
    }

    const letters = Value.slice(0, 2)
    const digits = Value.slice(2)

    if (!letterPattern.test(letters)) {
      // console.log("letters didn't pass")
      return
    } else if (digits && !digitPattern.test(digits)) {
      // console.log("digits didn't pass")
      return
    }

    setNINumValue(Value)

    props.onChange(Value)
    props.onChangeNationalID(Value)
  }

  return (
    <Input
      value={NINumValue}
      onChange={handleNationalID}
      disabled={!editMode || isVerified}
      maxLength={10}
      type="text"
    />
  )
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const NameInput = props => {
  const { editMode } = props
  const [nameValue, setNameValue] = useState('')

  const foreignLetterPattern = /^[a-z ,.'-]+$/i
  const nationalLetterPattern = /^[а-яөүё ,.'-]+$/i

  const onTextChange = event => {
    const { value } = event.target

    if (!value) {
      setNameValue(value)
      props.onChange(value)
      return
    }

    const trimmedValue = capitalizeFirstLetter(value.trimStart())

    let notValidForeignName = false

    for (let i = 0; i < trimmedValue.length; i++) {
      const char = trimmedValue.charAt(i)
      if (!foreignLetterPattern.test(char)) {
        notValidForeignName = true
      }
    }

    let notValidNationalName = false

    for (let i = 0; i < trimmedValue.length; i++) {
      const char = trimmedValue.charAt(i)
      if (!nationalLetterPattern.test(char)) {
        notValidNationalName = true
      }
    }

    if (notValidForeignName && notValidNationalName) {
      return
    }

    setNameValue(trimmedValue)
    props.onChange(trimmedValue.trimEnd())
  }

  const onBlur = () => {
    setNameValue(nameValue.trim())
  }
  return (
    <Input
      value={nameValue}
      onChange={onTextChange}
      onBlur={onBlur}
      disabled={!editMode}
      type="text"
    />
  )
}

const MobilePhoneInput = props => {
  const { editMode } = props
  const [phoneValue, setPhoneValue] = useState('')

  const mobilePhonePattern = /^[0-9+-]+$/

  const onTextChange = event => {
    const { value } = event.target

    if (!value) {
      setPhoneValue(value)
      props.onChange(value)
      return
    }

    if (!mobilePhonePattern.test(value)) {
      return
    }

    setPhoneValue(value)
    props.onChange(value)
  }

  return (
    <Input
      value={phoneValue}
      onChange={onTextChange}
      disabled={!editMode}
      type="text"
    />
  )
}

const HumanFamilyNameInput = props => {
  const { editMode } = props
  const [nameValue, setNameValue] = useState('')

  const onTextChange = event => {
    const { value } = event.target

    setNameValue(
      value
        .trimStart()
        .replace(/([^a-z]((-)|(\s))[^a-z])|([^a-z]((\s)|(-))[^a-z])+/i, '')
    )
    props.onChange(value.trimEnd())

    return
  }

  return (
    <Input
      value={nameValue}
      onChange={onTextChange}
      disabled={!editMode}
      type="text"
    />
  )
}

const HumanNameGiven = props => {
  const { editMode } = props
  const [changingValue, setChangingValue] = useState('')

  const onTextChange = event => {
    const { value } = event.target
    console.log(value)

    if (value.match(/^[А-ЯӨҮЁ]/g) || value.match(/^[A-Z]{1}([a-z])/g)) {
      console.log('matching')
      setChangingValue(value)
      props.onChange(value.trimEnd())
    }
  }

  return (
    <Input
      value={changingValue}
      onChange={onTextChange}
      disabled={!editMode}
      type="text"
    />
  )
}

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const Required = props => {
  const [foreign, setForeign] = useState(false)
  const [checkForeignIdentifier, setCheckForeignIdentifier] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [editMode, setEditMode] = useState(props.editable ? false : true)

  // foreign identifier handle input
  const handleForiegnID = e => {
    setIsVerified(!isVerified)
    setForeign(!foreign)
    setCheckForeignIdentifier(checkForeignIdentifier)

    props.form.validateFields(['foreignIdentifier'], { force: true })
    props.form.setFieldsValue({
      foreignIdentifier: '',
      nationalIdentifier: undefined,
    })
  }

  // validate fields
  const handleSubmit = e => {
    // e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onChange(values)
      }
    })
  }

  // validate national id
  const validateNationalID = (rule, value, callback) => {
    if (
      value &&
      // before 2000
      (value.match(
        /^([А-ЯӨҮЁ]{2}[3-9][0-9]((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))[0-9][0-9])$/g
      ) ||
        // after 2000
        value.match(
          /^([А-ЯӨҮЁ]{2}[0-2][0-9]((2[0-9])|(3[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))[0-9][0-9])$/g
        ))
    ) {
      callback()
    } else {
      callback(i18n.t`Invalid National Identifier!`)
    }
  }

  // validate phone number
  const validatePhoneNumber = (rule, value, callback) => {
    // /^([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])$/g
    // ^(\+\d{3}(\-){0,1}){0,1}(\d{8})$
    if (value && value.match(/^(\+\d{3}(-){0,1}){0,1}(\d{8})$/g)) {
      callback()
    } else {
      callback('Invalid Phone Number')
    }
  }

  // handle national id
  const handleNationalID = value => {
    // const { value } = event.target
    // props.form.setFieldsValue({
    // nationalIdentifier: value.toUpperCase(),
    // nationalIdentifier: value,
    // })
    // props.onChangeNationalID(value)
  }

  const makeEditable = () => {
    setEditMode(!editMode)
  }

  // TODO: nationalid should be unique

  const { form, i18n } = props
  const { getFieldDecorator } = form

  return (
    <div className={styles.contentForm} style={{ height: '232px' }}>
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
          key="keyRequiredForm"
          layout="horizontal"
          autoComplete="off"
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans>HumanNameFamily</Trans>
                  </span>
                }
                hasFeedback={false}
                validateStatus="validating"
                {...formItemLayout}
              >
                {getFieldDecorator('familyName', {
                  initialValue: props.initials && props.initials.familyName,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputHumanNameFamily`,
                    },
                  ],
                })(
                  // Input disabled={!editMode} type="text" />
                  <NameInput editMode={editMode} />
                )}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans>HumanNameGiven</Trans>
                  </span>
                }
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('givenName', {
                  initialValue: props.initials && props.initials.givenName,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputHumanNameGiven`,
                    },
                  ],
                })(<NameInput editMode={editMode} />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={24}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans>NationalIdentifier</Trans>
                  </span>
                }
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('nationalIdentifier', {
                  initialValue: props.initials && props.initials.NInum,
                  rules: [
                    {
                      required: !isVerified,
                      message: i18n.t`WarningInputNationalIdentifier`,
                    },
                    {
                      validator: validateNationalID,
                    },
                  ],
                })(
                  <NationalIdentificationNumberInput
                    isVerified={isVerified}
                    editMode={editMode}
                    onChangeNationalID={props.onChangeNationalID}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                label={
                  <span className="title uppercase">
                    <Trans id="Phone Number" />
                  </span>
                }
                hasFeedback={false}
                help={false}
                {...formItemLayout}
              >
                {getFieldDecorator('phoneNumber', {
                  initialValue: props.initials && props.initials.mobilePhone,
                  rules: [
                    {
                      required: true,
                      message: i18n.t`WarningInputPhoneNumber`,
                    },
                    {
                      validator: validatePhoneNumber,
                    },
                  ],
                })(<MobilePhoneInput editMode={editMode} maxLength={8} />)}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Checkbox
                // checked={checkForeignIdentifier}
                onChange={handleForiegnID}
                style={{ marginTop: '8px' }}
              >
                <span className="title uppercase">
                  <Trans id={'ForeignIdentifier'} />
                </span>
              </Checkbox>

              <Form.Item hasFeedback={false} help={false} {...formItemLayout}>
                {getFieldDecorator('foreignIdentifier', {
                  initialValue:
                    props.initials && props.initials.foreignerIdentifier,
                  rules: [
                    {
                      required: checkForeignIdentifier,
                    },
                  ],
                })(<Input disabled={!foreign || !editMode} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

Required.propTypes = {
  onChange: PropTypes.func,
}

export default connect(({ loading }) => ({
  loading,
}))(
  withI18n()(
    Form.create({
      onFieldsChange: onFieldsChange,
    })(Required)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  let formData = {}

  if (Object.keys(allFields).some(key => !!allFields[key].errors)) {
    formData = {
      hasErrors: true,
    }
    return props.onChange(formData)
  }

  if (!!allFields.familyName.value) {
    formData.familyName = allFields.familyName.value
  }

  if (!!allFields.givenName.value) {
    formData.givenName = allFields.givenName.value
  }

  if (
    !!allFields.nationalIdentifier.value &&
    allFields.nationalIdentifier.value.length === 10
  ) {
    formData.nationalIdentifier = allFields.nationalIdentifier.value
  }

  if (!!allFields.phoneNumber.value) {
    formData.phoneNumber = allFields.phoneNumber.value
  }

  if (!!allFields.foreignIdentifier.value) {
    formData.foreignIdentifier = allFields.foreignIdentifier.value
  }

  return props.onChange(formData)
}
