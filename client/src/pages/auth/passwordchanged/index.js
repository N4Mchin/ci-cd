import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import config from 'utils/config'

import styles from './index.less'

@withI18n()
@connect(({ loading }) => ({ loading }))
class PasswordChanged extends PureComponent {
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

  render() {
    const { loading, form, i18n } = this.props

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
                >{i18n.t`PasswordResetSuccesfully`}</span>
              </div>

              <div style={{ marginTop: '20px' }} />

              <span className={styles.text}>
                Таны нууц үг амжилттай шинэчлэгдлээ.
              </span>
              <br />
              <br />
              <span className={styles.text}>
                Та шинэ нууц үгээ ашиглан нэвтэрнэ үү.
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

PasswordChanged.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default PasswordChanged
