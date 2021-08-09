import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, MessageModal } from 'components'
import { isEmptyObject, delay } from 'utils/helper'
import styles from './styles.less'
import { LoadingOutlined } from '@ant-design/icons'

import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  Checkbox,
  Input,
  Icon,
  Spin,
} from 'antd'

let id = 0

const ModalSendResult = props => {
  const { i18n, data, form } = props

  const [emailAccounts, setEmailAccounts] = useState([])
  const [patientName, setPatientName] = useState()
  const [patientBarcode, setPatientBarcode] = useState()
  const [messageModalType, setMessageModalType] = useState()
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [message, setMessage] = useState('')

  const [modalSpiningVisible, showSpinningModal] = useState(false)
  const spinningIcon = <LoadingOutlined style={{ fontSize: '70px' }} spin />
  /* #region  titles */
  const TitleInformation = (
    <Trans>
      <span className="title">Client </span>
      <span>information</span>
    </Trans>
  )

  const TitleModal = (
    <Trans>
      <span className="title">Sent </span>
      <span>result</span>
    </Trans>
  )

  const TitleChooseAccount = (
    <Trans>
      <span className="title">Choice of </span>
      <span>Email</span>
    </Trans>
  )

  /* #endregion */

  useEffect(() => {
    const { patient } = props.reception_patientProfile

    form.resetFields()
    if (patient && !isEmptyObject(patient)) {
      const emails = patient.getEmails()
      setEmailAccounts(emails)
      setPatientName(patient.getOfficialNameString())
      setPatientBarcode(patient._getBarcode())
    }
  }, [props.reception_patientProfile.patient])

  const { getFieldDecorator, getFieldValue } = form
  getFieldDecorator('keys', { initialValue: [] })
  const keys = getFieldValue('keys')

  function remove(k) {
    const { form } = props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one email
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  function add() {
    const { form } = props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(id++)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  function onFormSubmit() {
    let emails = []

    showSpinningModal(true)
    return props.form
      .validateFields()
      .then(values => {
        if (!!values.emails) {
          emails.push(...values.emails)
        }
        if (!!values.others) {
          emails.push(...values.others.filter(email => !!email))
        }

        return props.dispatch({
          type: 'reception_patientProfile/sendResultViaEmail',
          payload: {
            emails: emails,
            diagnosticReportId: props.data.diagnosticReport.id,
            language: 'mn',
            testKey: props.data.testKey,
          },
        })
      })
      .then(success => {
        setMessageModalType('success')
        setMessage(<Trans id="Test result sent successfully by Email" />)
        showMessageModal(success)

        return props.onCancel(success)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        showMessageModal(false)
        showSpinningModal(false)
      })
  }

  /* #region  col sizes */
  const emailAccounsLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 12 },
    },
  }

  const otherAccountsLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
    },
  }
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 18, offset: 6 },
      sm: { span: 18, offset: 6 },
    },
  }
  /* #endregion */

  const otherAccounts = keys.map((key, index) => (
    <Form.Item
      {...(index === 0 ? otherAccountsLayout : formItemLayoutWithOutLabel)}
      label={index === 0 ? <Trans id="Other accounts" /> : ''}
      required={false}
      key={`modalSendResult_${index}`}
    >
      {getFieldDecorator(`others.${key}`, {
        validateTrigger: ['onChange', 'onBlur'],
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
      })(
        <Input
          placeholder={i18n.t`email account`}
          style={{ width: '80%', marginRight: 8 }}
        />
      )}
      {keys.length > 1 ? (
        <Icon
          className={styles['dynamic-delete-button']}
          type="minus-circle-o"
          onClick={() => remove(key)}
        />
      ) : null}
    </Form.Item>
  ))
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width="900px"
      title={TitleModal}
      footer={[
        <Button
          className="button-gray"
          onClick={props.onCancel}
          key={'ModalSendResultButtonClose'}
        >
          <Trans id="Close" />
        </Button>,
        <Button
          disabled={
            !(form.getFieldsValue().emails || form.getFieldsValue().others)
              ? true
              : false
          }
          className="button-red"
          onClick={onFormSubmit}
          key={'ModalSendResultButtonSend'}
        >
          &nbsp;
          <Trans id="Send" />
        </Button>,
      ]}
    >
      <Form labelAlign="right">
        <ModuleBox title={TitleInformation}>
          <Form.Item {...emailAccounsLayout} label={i18n.t`PatientNumber`}>
            {patientBarcode}
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`PatientName`}>
            {patientName}
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`ServiceType`}>
            Лабораторийн шинжилгээ
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`ServiceName`}>
            {data.display}
          </Form.Item>
          <Form.Item
            {...emailAccounsLayout}
            label={i18n.t`SampleCollectionDate`}
          >
            {data.authoredOn}
          </Form.Item>
          <Form.Item {...emailAccounsLayout} label={i18n.t`RunCompletionDate`}>
            {data.issuedDate}
          </Form.Item>
        </ModuleBox>

        <ModuleBox title={TitleChooseAccount} centered>
          <Row type="flex" justify="space-between" gutter={32}>
            <Col span={12}>
              {emailAccounts.map((emailAccount, index) => (
                <Form.Item
                  label={i18n.t`RegisteredEmail`}
                  {...emailAccounsLayout}
                  key={`modalSendResult_${index}`}
                >
                  {getFieldDecorator(`emails`, {
                    rules: [{ required: false }],
                  })(
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row
                        style={{ margin: '6px 0', fontSize: '14px' }}
                        type="flex"
                        justify="space-between"
                      >
                        <Checkbox value={emailAccount}>{emailAccount}</Checkbox>
                      </Row>
                    </Checkbox.Group>
                  )}
                </Form.Item>
              ))}
            </Col>
            <Col span={12}>
              <div className={styles.otherAccountsContainer}>
                {otherAccounts}
              </div>
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={add} style={{ width: '60%' }}>
                  <Icon type="plus" />
                  &nbsp;
                  <Trans id="Add email" />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </ModuleBox>
      </Form>

      <MessageModal
        type={messageModalType}
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={message}
        autoHide={messageModalType === 'error' ? false : true}
      />
      <MessageModal
        autoHide={false}
        visible={modalSpiningVisible}
        onCancel={() => showSpinningModal(false)}
        content={<Spin indicator={spinningIcon} />}
      />
    </Modal>
  )
}

ModalSendResult.propTypes = {
  reception_patientProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(Form.create()(ModalSendResult)))
