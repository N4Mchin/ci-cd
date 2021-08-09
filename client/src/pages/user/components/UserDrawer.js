import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Divider, Button, Row, Form, Select, Input, Drawer } from 'antd'

import { OrganizationPicker, MessageModal } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { ROLE_TYPE } from 'utils/constant'

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
}

const tailFormItemLayout = {
  wrapperCol: {
    span: 16,
    offset: 8,
  },
}

const AddUserDrawer = props => {
  const { getFieldDecorator } = props.form
  const [userData, setUserData] = useState({})
  const [modalVisible, setShowModal] = useState(false)
  const [messageType, setMessageType] = useState('success')

  const handleSubmit = event => {
    event.preventDefault()
    return props.form.validateFieldsAndScroll((errorInfo, values) => {
      if (!errorInfo) {
        const { organizationReference, ...rest } = values

        const newUserData = {
          ...rest,
          organizationId: values.organizationReference.reference
            .split('/')
            .slice(-1)
            .pop(),
        }

        return props
          .dispatch({
            type: 'user/saveUserData',
            payload: newUserData,
          })
          .then(result => {
            if (result.success) {
              setShowModal(true)
              setMessageType('success')
            } else {
              setShowModal(true)
              setMessageType('error')
            }
          })
      }
    })
  }

  async function fetch() {
    if (props.selectedRowData) {
      const result = await props.dispatch({
        type: 'user/queryUserById',
        payload: {
          id: props.selectedRowData._id,
        },
      })

      setUserData(result)
    } else {
      setUserData({})
    }
  }

  useEffect(() => {
    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedRowData])

  return (
    <Drawer {...props}>
      <Row type="flex" justify="space-between" align="bottom">
        <div className={styles.title}>
          <Trans>
            <span className="title">User </span>
            <span>profile</span>
          </Trans>
        </div>
      </Row>

      <Divider className={styles.divider} />

      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="Role" />}
        >
          {getFieldDecorator('role', {
            initialValue:
              userData.user &&
              userData.user.permission &&
              userData.user.permission.role,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select>
              {Object.keys(ROLE_TYPE)
                .filter(roleKey => ROLE_TYPE[roleKey] !== ROLE_TYPE.PATIENT)
                .map(roleKey => {
                  return (
                    <Option key={ROLE_TYPE[roleKey]}>
                      {ROLE_TYPE[roleKey]}
                    </Option>
                  )
                })}
            </Select>
          )}
        </FormItem>
        {/* <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="Username" />}
        >
          {getFieldDecorator('username', {
            initialValue: userData.user && userData.user.username,
            rules: [
              {
                required: false,
              },
            ],
          })(<Input />)}
        </FormItem> */}
        <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="Email" />}
        >
          {getFieldDecorator('email', {
            initialValue: userData.user && userData.user.email,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="Last Name" />}
        >
          {getFieldDecorator('lastName', {
            initialValue: userData.user && userData.user.lastName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="First Name" />}
        >
          {getFieldDecorator('firstName', {
            initialValue: userData.user && userData.user.firstName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="Mobile phone" />}
        >
          {getFieldDecorator('mobile', {
            initialValue: userData.user && userData.user.mobile,
            rules: [
              {
                required: false,
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="NationalIdentificationNumber" />}
        >
          {getFieldDecorator('nationalIdentificationNumber', {
            initialValue:
              userData.user && userData.user.nationalIdentificationNumber,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>

        <Form.Item
          {...formItemLayout}
          label={<Trans id="Healthcare Provider" />}
        >
          {getFieldDecorator('organizationReference', {
            initialValue: userData.organization && {
              reference: `${userData.organization.resourceType}/${userData.organization.id}`,
              display: userData.organization.name,
              identifier: userData.organization.identifier,
              type: userData.organization.resourceType,
            },
            rules: [{ required: false }],
          })(<OrganizationPicker i18n={props.i18n} />)}
        </Form.Item>

        {!userData.user && (
          <FormItem
            hasFeedback={false}
            {...formItemLayout}
            label={<Trans id="Password" />}
          >
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
        )}

        {!userData.user && (
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              <Trans id="Save" />
            </Button>
          </Form.Item>
        )}
      </Form>

      <MessageModal
        visible={modalVisible}
        onCancel={() => setShowModal(false)}
        type={messageType}
        content={
          <Trans
            id={messageType === 'success' ? 'Save Successful' : 'Алдаа гарлаа'}
          />
        }
      />
    </Drawer>
  )
}

AddUserDrawer.propTypes = {
  user_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ user_profile, loading }) => ({
  user_profile,
  loading,
}))(withI18n()(Form.create()(AddUserDrawer)))
