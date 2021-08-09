import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Checkbox } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { LanguageSwitcher, MessageModal, InstructionsModal } from 'components'
import config from 'utils/config'
import styles from './index.less'
import { router } from 'utils'
import { useMediaQuery } from 'react-responsive'

const FormItem = Form.Item

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const Login = props => {
  const [modalMessageVisible, setModalMessageVisible] = useState(false)
  const [
    modalInstructionsModalVisible,
    setModalInstructionsModalVisible,
  ] = useState(false)

  const isMobile = useMediaQuery({ maxDeviceWidth: 800 })

  const onPasswordRecoveryClick = () => {
    router.push('passwordrecovery')
  }

  const handleOk = () => {
    const { dispatch, form } = props
    const { validateFieldsAndScroll } = form

    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      dispatch({ type: 'auth/login', payload: values }).then(response => {
        if (response && response.success) {
          return dispatch({
            type: 'app/query',
          })
        } else {
          setModalMessageVisible(true)
        }
      })
    })
  }

  const handleInstructionClick = () => setModalInstructionsModalVisible(true)

  const { loading, form, i18n } = props
  const { getFieldDecorator } = form

  return (
    <div>
      {!isMobile && (
        <div className={styles.bgContainer}>
          <div className={styles.sloganContainer}>
            <div className={styles.slogan} />
          </div>
          <div className={styles.backgroundImage} />
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
          <span
            style={{
              fontSize: '16px',
              fontFamily: 'Helvetica Neue Bold',
              marginRight: '16px',
            }}
          >
            <Trans>Switch Language</Trans>:
          </span>
          <LanguageSwitcher />
        </div>
      </div>

      <div
        className={styles.loginScreen}
        style={{
          width: isMobile ? '100%' : '50%',
        }}
      >
        <div
          className={styles.formContainer}
          style={{ width: isMobile ? '396px' : '364px' }}
        >
          <div className={styles.logo}>
            <img
              alt="logo"
              src={config.fullLogoPath}
              style={{ width: isMobile ? '60%' : '100%' }}
            />
          </div>
          <div className={styles.formParent}>
            <div
              className={styles.form}
              style={{ width: isMobile ? '300px' : '396px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span
                  className={styles.signInTitle}
                >{i18n.t`SignInTitle`}</span>
              </div>

              <Form>
                <FormItem hasFeedback help={false}>
                  {getFieldDecorator('username', {
                    initialValue: props.auth && props.auth.userId,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <Input
                      name="username"
                      onPressEnter={handleOk}
                      placeholder={i18n.t`LoginUsername`}
                    />
                  )}
                </FormItem>
                <div style={{ height: '7px' }} />

                <FormItem hasFeedback help={false}>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <Input.Password
                      name="password"
                      placeholder={i18n.t`LoginPassword`}
                      onPressEnter={handleOk}
                    />
                  )}
                </FormItem>

                {/* <Button
                  onClick={onPasswordRecoveryClick}
                  type="link"
                  style={{
                    border: 'none',
                    textAlign: 'left',
                    padding: '0 ',
                    color: '#7e8796',
                  }}
                >
                  {i18n.t`ForgotPassword`}
                </Button> */}

                <div />
                <FormItem hasFeedback={false}>
                  {getFieldDecorator('rememberMe', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>{i18n.t`RememberMe`}</Checkbox>)}
                </FormItem>

                <div style={{ height: '24px' }} />
                <Row>
                  <Button
                    name="signIn"
                    type="primary"
                    onClick={handleOk}
                    className="button-red"
                    loading={loading.effects.login}
                  >
                    <span
                      className="title"
                      style={{ fontSize: '14px' }}
                    >{i18n.t`SignIn`}</span>
                  </Button>
                </Row>
                <div style={{ height: '24px' }} />

                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <Button
                      onClick={onPasswordRecoveryClick}
                      className="button-active"
                      type="link"
                      style={{
                        border: 'none',
                        padding: 0,
                      }}
                    >
                      {i18n.t`ForgotPassword`}
                    </Button>
                  </div>

                  {/* <div
                  style={{
                    height: '32px',
                    width: '5%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      background: '#7e8796',
                      height: '4px',
                      width: '4px',
                      borderRadius: '4px',
                    }}
                  ></div>
                </div> */}

                  {/* <div>
                  <Button
                    onClick={handleOk}
                    className="button-active"
                    style={{
                      border: 'none',
                    }}
                  >
                    {i18n.t`Sign Up`}
                  </Button>
                </div>

                <div
                  style={{
                    height: '32px',
                    width: '5%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      background: '#7e8796',
                      height: '4px',
                      width: '4px',
                      borderRadius: '4px',
                    }}
                  ></div>
                </div> */}

                  <div>
                    <Button
                      onClick={handleInstructionClick}
                      className="button-active-Instructions"
                      style={{
                        border: 'none',
                      }}
                    >
                      {i18n.t`Instructions`}
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <MessageModal
        type="error"
        visible={modalMessageVisible}
        onCancel={() => setModalMessageVisible(false)}
        content={i18n.t`Username or password is invalid`}
      />
      <InstructionsModal
        visible={modalInstructionsModalVisible}
        onCancel={() => setModalInstructionsModalVisible(false)}
      />
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading, app, auth, dispatch }) => ({
  loading,
  app,
  auth,
  dispatch,
}))(withI18n()(Form.create()(Login)))
