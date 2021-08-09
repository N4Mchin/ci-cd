import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Input } from 'antd'
import { Icon } from 'antd'

import { Trans, withI18n } from '@lingui/react'
import config from 'utils/config'

import styles from '../index.less'
import { Redirect } from 'react-router'

@withI18n()
@connect(({ auth, loading }) => ({ auth, loading }))
class ChangePassword extends PureComponent {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  handleSubmit = e => {
    const { dispatch } = this.props
    const { id } = this.props.auth
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { password, confirm } = values

      if (!err) {
        console.log('Received values of form: ', values)
      }
      // console.log('handlesubmit', values)

      if (
        this.passwordValidator(password) &&
        this.passwordValidator(confirm) &&
        password === confirm
      ) {
        console.log('handlesubmit', values)
        // dispatch()
        let payload = {
          id: id,
          ...values,
        }
        dispatch({
          type: 'auth/submitChangePassword',
          payload: payload,
        })
      }
    })
  }

  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    const isValid = this.passwordValidator(value)

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
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
  render() {
    const { loading, form, i18n } = this.props
    const { getFieldDecorator, getFieldsValue } = form

    console.log(this.props.auth)
    const { password, confirm } = getFieldsValue()
    const passwordSuffix =
      password && password.length > 5 ? (
        <Icon
          type="check-circle"
          theme="filled"
          style={{ color: '#128A88', margin: '2px' }}
        />
      ) : (
        <span />
      )

    const confirmSuffix =
      confirm && confirm.length > 5 && password === confirm ? (
        <Icon
          type="check-circle"
          theme="filled"
          style={{ color: '#128A88', margin: '2px' }}
        />
      ) : (
        <span />
      )

    return (
      <Fragment>
        {this.props.auth.passwordChanged && (
          <Redirect to="../passwordchanged" />
        )}
        <div className={styles.bgContainer}>
          <div className={styles.sloganContainer}>
            <div className={styles.slogan} />
          </div>
          <div className={styles.backgroundImage} />
        </div>

        <div className={styles.loginScreen}>
          <div className={styles.formContainer}>
            <div className={styles.logo}>
              <img alt="logo" src={config.fullLogoPath} />
            </div>

            <div className={styles.form}>
              <div style={{ textAlign: 'left' }}>
                <span
                  className={styles.passwordRecovery}
                >{i18n.t`EnterNewPassword`}</span>
              </div>
              <div style={{ height: '16px' }} />
              <span className={styles.text}>
                *Нууц үг нь 6-аас багагүй тэмдэгт агуулах ёстой.
              </span>
              <div style={{ height: '8px' }} />

              <Form onSubmit={this.handleSubmit} layout="vertical">
                <Form.Item hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input suffix={passwordSuffix} type="password" />)}
                </Form.Item>
                <Form.Item hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(
                    <Input
                      onBlur={this.handleConfirmBlur}
                      suffix={confirmSuffix}
                      type="password"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.signInButton}
                    block
                  >
                    {i18n.t`Save`}
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ height: '24px' }} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

ChangePassword.propTypes = {
  auth: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create()(ChangePassword)
