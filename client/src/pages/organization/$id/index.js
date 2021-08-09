import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Divider, Button, Row, Select, Form, Input } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board, MessageModal } from 'components'
import { loadValuesets } from 'utils/valuesets'
import styles from '../styles.less'

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

const OrganizationProfile = props => {
  const { getFieldDecorator } = props.form
  const { Organization } = props.organization_profile
  const [addressValueset, setAddressValueset] = useState()
  const [modalVisible, setShowModal] = useState(false)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    if (!addressValueset) {
      const [ADDRESS_VALUESET] = loadValuesets(
        ['address-values-mn'],
        props.organization_profile.valuesets
      )

      setAddressValueset(ADDRESS_VALUESET)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.organization_profile.valuesets])

  const handleSubmit = event => {
    event.preventDefault()
    props.form.validateFieldsAndScroll((errorInfo, values) => {
      if (!errorInfo) {
        console.log('Received values of form: ', values)

        console.log('old', Organization)

        const newOrganization = {
          ...Organization.toJSON(),
          name: values.name,
          address: [
            {
              ...(Organization.toJSON().address || [{}])[0],
              state: values.addressState,
            },
          ],
        }

        console.log(newOrganization)

        return props
          .dispatch({
            type: 'organization_profile/saveOrganization',
            payload: {
              organization: newOrganization,
            },
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
          .catch(errorInfo => console.log(errorInfo))
      }
    })
  }

  return (
    <Board inner>
      <Row type="flex" justify="space-between" align="bottom">
        <div className={styles.title}>
          <Trans>
            <span className="title">Organization </span>
            <span>profile</span>
          </Trans>
        </div>
      </Row>

      <Divider className={styles.divider} />

      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem
          hasFeedback={false}
          {...formItemLayout}
          label={<Trans id="Name" />}
        >
          {getFieldDecorator('name', {
            initialValue: Organization.name,
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
          label={<Trans id="AddressState" />}
        >
          {getFieldDecorator('addressState', {
            initialValue: (Organization.address || [{}])[0].state,
            rules: [
              {
                required: false,
              },
            ],
          })(
            <Select>
              {addressValueset &&
                addressValueset.compose &&
                addressValueset.compose.map(item => {
                  return <Option key={item.value}>{item.value}</Option>
                })}
            </Select>
          )}
        </FormItem>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            <Trans id="Save" />
          </Button>
        </Form.Item>
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
    </Board>
  )
}

OrganizationProfile.propTypes = {
  organization_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ organization_profile, loading }) => ({
  organization_profile,
  loading,
}))(withI18n()(Form.create()(OrganizationProfile)))
