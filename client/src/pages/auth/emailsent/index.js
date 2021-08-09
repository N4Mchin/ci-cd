import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { withI18n } from '@lingui/react'
import config from 'utils/config'
import styles from './index.less'

@withI18n()
@connect(({ auth, loading }) => ({ auth, loading }))
class EmailSent extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'auth/login', payload: values })
    })
  }

  resend = () => {
    const { dispatch } = this.props
    const { email, timeLeft } = this.props.auth

    if (timeLeft === 0) {
      dispatch({ type: 'auth/sendEmail', payload: { email: email } })
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { dispatch } = this.props
      dispatch({ type: 'auth/tickTimeLeft' })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { loading, i18n } = this.props

    return (
      <Fragment>
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
                  className={styles.passwordSent}
                >{i18n.t`PasswordResetLinkSent`}</span>
              </div>

              <div style={{ marginTop: '20px' }} />

              <span className={styles.text}>
                Та и-мэйлээр илгээсэн холбоосоор нууц үгээ солино уу.
              </span>
              <br />
              <br />
              <span className={styles.text}>
                Хэрэв танд и-мэйл ирээгүй бол та &nbsp;
                <b>{this.props.auth.timeLeft}</b>&nbsp; секундын дараа &nbsp;
                <Button
                  style={{ padding: '0' }}
                  onClick={this.resend}
                  type="link"
                >
                  {' '}
                  ЭНД{' '}
                </Button>
                &nbsp; дарж дахин и-мэйл илгээх боломжтой.
              </span>

              <div style={{ marginTop: '30px' }} />
              <Button
                type="primary"
                href="/"
                className={styles.signInButton}
                block
              >
                {i18n.t`GoBack`}
              </Button>
              <div style={{ marginBottom: '10px' }} />
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

EmailSent.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default EmailSent
