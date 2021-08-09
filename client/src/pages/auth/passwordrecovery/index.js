import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Input, message } from 'antd'
import { withI18n } from '@lingui/react'
import config from 'utils/config'
import styles from './index.less'
import { Redirect } from 'react-router'

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

@withI18n()
@connect(({ auth, loading }) => ({ auth, loading }))
class PasswordRecovery extends PureComponent {
  constructor(props) {
    super(props)

    props.dispatch({ type: 'auth/sendEmailInit' })
  }

  handleSubmit = e => {
    const { dispatch, i18n } = this.props
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!validateEmail(values.email)) {
        return message.error(i18n.t`E-mail address is invalid!`)
      }

      if (!err) {
        dispatch({ type: 'auth/sendEmail', payload: values })
      }
    })
  }

  render() {
    const { form, i18n } = this.props
    const { getFieldDecorator } = form

    return (
      <Fragment>
        {this.props.auth.emailSent && <Redirect to="emailsent" />}

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
                >{i18n.t`PasswordRecovery`}</span>
              </div>
              <div style={{ height: '16px' }} />
              <span className={styles.text}>
                Та бүртгэлтэй и-мэйл хаягаа бичнэ үү! Бид танд бүртгэл сэргээх
                холбоос илгээх болно.
              </span>
              <div style={{ height: '24px' }} />

              <Form
                onSubmit={this.handleSubmit}
                hideRequiredMark
                layout="vertical"
              >
                <Form.Item>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: i18n.t`TheInputIsNotValidEmail!`,
                      },
                      {
                        required: true,
                        message: i18n.t`PleaseInputYourEmail!`,
                      },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.signInButton}
                    block
                  >
                    {i18n.t`SendPassword`}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

PasswordRecovery.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Form.create()(PasswordRecovery)
