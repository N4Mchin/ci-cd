import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {
  Button,
  Icon,
  Menu,
  Typography,
  Input,
  Dropdown,
  Row,
  Col,
  Form,
  Avatar,
  message,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'

const statusMenu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">active</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">busy</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">left</Menu.Item>
  </Menu>
)

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const { Text } = Typography

function MyAccountTitle() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>My </Text>
        <Text>Account Settings</Text>
      </Trans>
      <div style={{ height: '1px', background: '#E5E5E9' }} />
    </div>
  )
}

@withI18n()
@connect(({ receptionProfile, loading }) => ({ receptionProfile, loading }))
class AccountSettings extends PureComponent {
  state = {
    isEditing: false,
    validOldPassword: 'loading',
    confirmDirty: false,
    autoCompleteResult: [],
  }

  handleCancel = e => {
    const { reception } = this.props.receptionProfile
    this.setState({
      isEditing: false,
      validOldPassword: 'loading',
    })
    this.props.form.setFieldsValue({
      firstName: reception.firstName,
      lastName: reception.lastName,
      email: reception.email,
      mobile: reception.mobile,
      profession: reception.profession,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })
  }

  handleSubmit = e => {
    const { reception } = this.props.receptionProfile
    const { dispatch, i18n } = this.props
    // e.preventDefault()

    if (!this.state.isEditing) {
      return
    }

    this.props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobile: values.mobile,
        profession: values.profession,
      }

      if (!validateEmail(values.email)) {
        return message.error(i18n.t`E-mail address is invalid!`)
      }

      const {
        oldPassword = '',
        newPassword = '',
        confirmNewPassword = '',
      } = values

      if (err) {
        console.log('Form error: ', err)
      }

      if (
        oldPassword.length !== 0 ||
        newPassword.length !== 0 ||
        confirmNewPassword.length !== 0
      ) {
        if (
          oldPassword.length !== 0 &&
          this.passwordValidator(newPassword) &&
          this.passwordValidator(confirmNewPassword) &&
          newPassword === confirmNewPassword &&
          this.state.validOldPassword === true
        ) {
          payload.password = newPassword
        } else {
          return message.error(
            i18n.t`Please fill old password, new password, confirm new password fields completely!`
          )
        }
      }

      // console.log(payload, reception)

      if (
        payload.firstName === reception.firstName &&
        payload.lastName === reception.lastName &&
        payload.email === reception.email &&
        payload.mobile === reception.mobile &&
        payload.profession === reception.profession &&
        (payload.password === undefined ||
          (payload.password !== undefined && payload.password.length === 0))
      ) {
        return
      }

      console.log(payload)
      dispatch({
        type: 'receptionProfile/update',
        payload: payload,
      })
    })
  }

  makeEditable = e => {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  /* #region  password functions */
  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  handleOldPasswordBlur = e => {
    const { value } = e.target

    this.setState({
      validOldPassword: 'loading',
    })

    if (value.length === 0) {
      return
    }

    this.props
      .dispatch({
        type: 'receptionProfile/oldPassword',
        payload: { password: value },
      })
      .then(result => {
        console.log(result)
        if (result) {
          this.setState({
            validOldPassword: true,
          })
        } else {
          this.setState({
            validOldPassword: false,
          })
        }
      })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    const isValid = this.passwordValidator(value)

    if (value && value !== form.getFieldValue('newPassword')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmNewPassword'], { force: true })
    }
    callback()
  }

  passwordValidator = password => {
    const length = 6
    if (password && password.length >= length) {
      return true
    }
    return false
  }

  oldPasswordSuffix = () => {
    const { validOldPassword } = this.state

    if (validOldPassword === true) {
      return (
        <Icon
          type={'check-circle'}
          theme="filled"
          style={{ color: '#128A88', margin: '2px' }}
        />
      )
    } else if (validOldPassword === false) {
      return (
        <Icon
          type={'close-circle'}
          theme="filled"
          style={{ color: '#F44336', margin: '2px' }}
        />
      )
    }

    return <span />
  }
  /* #endregion */

  render() {
    const { loading, form, i18n } = this.props
    const { getFieldDecorator, getFieldsValue } = form
    const { reception, modalVisible } = this.props.receptionProfile

    // console.log(this.props.auth)
    const { newPassword, confirmNewPassword } = getFieldsValue()
    const passwordSuffix =
      newPassword && newPassword.length > 5 ? (
        <Icon
          type="check-circle"
          theme="filled"
          style={{ color: '#128A88', margin: '2px' }}
        />
      ) : (
        <span />
      )

    const confirmSuffix =
      confirmNewPassword &&
      confirmNewPassword.length > 5 &&
      newPassword === confirmNewPassword ? (
        <Icon
          type="check-circle"
          theme="filled"
          style={{ color: '#128A88', margin: '2px' }}
        />
      ) : (
        <span />
      )

    return (
      <>
        {MyAccountTitle()}

        <Form
          onSubmit={this.handleSubmit}
          key="keyRequiredForm"
          layout="horizontal"
          hideRequiredMark
        >
          <div className={styles.myAccount}>
            <div className={styles.settings}>
              <div className={styles.buttonContainer}>
                <Button
                  className={styles.editButton}
                  onClick={this.makeEditable}
                  icon="edit"
                />
              </div>

              <Row gutter={8} style={{ flexGrow: 1 }}>
                <Col span={8}>
                  {/* #region  first col */}
                  <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <Form.Item
                      hasFeedback
                      {...formItemLayout}
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>HumanNameFamily</Trans>
                        </span>
                      }
                    >
                      {getFieldDecorator('lastName', {
                        initialValue: reception.lastName,
                        rules: [
                          {
                            required: true,
                            message: i18n.t`WarningInputHumanNameFamily`,
                          },
                        ],
                      })(<Input disabled={!this.state.isEditing} />)}
                    </Form.Item>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>E-mail</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('email', {
                        initialValue: reception.email,
                        rules: [
                          {
                            type: 'email',
                            message: i18n.t`TheInputIsNotValidEmail!`,
                          },
                          {
                            required: true,
                            message: i18n.t`WarningInputPhoneNumber`,
                          },
                          {
                            validator: this.validatePhoneNumber,
                          },
                        ],
                      })(<Input disabled={!this.state.isEditing} />)}
                    </Form.Item>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>Position</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('position', {
                        initialValue: reception.position,
                        rules: [
                          {
                            required: true,
                            message: i18n.t`WarningInputPosition`,
                          },
                        ],
                      })(<Input disabled={true} />)}
                    </Form.Item>
                  </div>
                  {/* #endregion */}
                </Col>
                <Col span={8}>
                  {/* #region  second col */}
                  <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>HumanNameGiven</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('firstName', {
                        initialValue: reception.firstName,
                        rules: [
                          {
                            required: true,
                            message: i18n.t`WarningInputHumanNameGiven`,
                          },
                        ],
                      })(<Input disabled={!this.state.isEditing} />)}
                    </Form.Item>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>PhoneNumber</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('mobile', {
                        initialValue: reception.mobile,
                        rules: [
                          {
                            required: true,
                            message: i18n.t`WarningInputPhoneNumber`,
                          },
                          {
                            validator: this.validatePhoneNumber,
                          },
                        ],
                      })(<Input disabled={!this.state.isEditing} />)}
                    </Form.Item>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>Profession</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('profession', {
                        initialValue: reception.profession,
                        rules: [
                          {
                            required: true,
                            message: i18n.t`WarningInputProfession`,
                          },
                          {
                            validator: this.validateProfession,
                          },
                        ],
                      })(<Input disabled={!this.state.isEditing} />)}
                    </Form.Item>
                  </div>
                  {/* #endregion */}
                </Col>
                <Col span={8}>
                  {/* #region  third col */}
                  <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>OldPassword</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('oldPassword', {
                        // initialValue: reception.identifier[0].value,
                        rules: [
                          {
                            required: false,
                            message: i18n.t`WarningInputNationalIdentifier`,
                          },
                        ],
                      })(
                        <Input
                          type="password"
                          disabled={!this.state.isEditing}
                          onBlur={this.handleOldPasswordBlur}
                          suffix={this.oldPasswordSuffix()}
                        />
                      )}
                    </Form.Item>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>NewPassword</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('newPassword', {
                        rules: [
                          {
                            required: false,
                            message: 'Please confirm your password!',
                          },
                          {
                            validator: this.validateToNextPassword,
                          },
                        ],
                      })(
                        <Input
                          type="password"
                          disabled={!this.state.isEditing}
                          onBlur={this.handleConfirmBlur}
                          suffix={passwordSuffix}
                        />
                      )}
                    </Form.Item>
                    <Form.Item
                      label={
                        <span
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}
                        >
                          <Trans>ConfirmNewPassword</Trans>
                        </span>
                      }
                      hasFeedback
                      {...formItemLayout}
                    >
                      {getFieldDecorator('confirmNewPassword', {
                        rules: [
                          {
                            required: false,
                            message: 'Please confirm your password!',
                          },
                          {
                            validator: this.compareToFirstPassword,
                          },
                        ],
                      })(
                        <Input
                          type="password"
                          disabled={!this.state.isEditing}
                          onBlur={this.handleConfirmBlur}
                          suffix={confirmSuffix}
                        />
                      )}
                    </Form.Item>
                  </div>
                  {/* #endregion */}
                </Col>
              </Row>
            </div>
            <div style={{ width: '16px' }} />
            <div className={styles.avatarContainer}>
              <Avatar shape="square" size={162} icon="user" />
              {/* <ProfilePicture /> */}

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Dropdown overlay={statusMenu} trigger={['click']}>
                  <a className="ant-dropdown-link">
                    <Icon
                      type="check-circle"
                      theme="filled"
                      style={{
                        color: '#31FF00',
                        fontSize: '7px',
                        margin: '2px',
                      }}
                    ></Icon>
                    <span
                      style={{
                        letterSpacing: '0',
                        color: '#727272',
                        fontSize: '7px',
                        textTransform: 'uppercase',
                      }}
                    >
                      ИДЭВХИТЭЙ
                    </span>

                    <Icon type="down" style={{ fontSize: '7px' }} />
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className={styles.saveButton}
            >
              {i18n.t`Save`}
            </Button>
            <div style={{ width: '16px' }} />
            <Button
              type="primary"
              onClick={this.handleCancel}
              className={styles.cancelButton}
            >
              {i18n.t`Cancel`}
            </Button>
          </div>
        </Form>
      </>
    )
  }
}

AccountSettings.propTypes = {
  receptionProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create()(AccountSettings)
