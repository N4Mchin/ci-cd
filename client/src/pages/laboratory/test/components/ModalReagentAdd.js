import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../biochemistry/styles.less'
import { ModuleBox, FloatNumber, MessageModal } from 'components'
import { Button, DatePicker, Form, Modal, Input, Table, Select } from 'antd'
const { Option } = Select

const ModalReagentAdd = props => {
  const {
    app,
    laboratory_test,
    loading,
    i18n,
    form,
    dispatch,
    ...modalProps
  } = props
  const { getFieldDecorator } = form

  const [modalMessageVisible, showMessageModal] = useState(false)
  const [message, setMessage] = useState('')

  const columns = [
    {
      title: 'Урвалжийн төрөл',
      dataIndex: 'reagentType',
      key: 'reagentType',
    },
    {
      title: 'Урвалжийн лот дугаар',
      dataIndex: 'reagentLotNumber',
      key: 'reagentLotNumber',
    },
    {
      title: 'Урвалжийн дуусах хугацаа',
      dataIndex: 'reagentExpirationDate',
      key: 'reagentExpirationDate',
    },
    {
      title: 'Нийт үлдэгдэл',
      dataIndex: 'totalRemain',
      key: 'totalRemain',
    },
  ]

  const dataSource = [
    {
      key: '1',
      reagentType: (
        <Form.Item>
          {getFieldDecorator(`reagentType`, {
            rules: [{ required: false }],
          })(
            app.locationPathname.startsWith(
              '/laboratory/test/viralLoadTests'
            ) ||
              app.locationPathname.startsWith('/laboratory/test/rapidTests') ? (
              <Input />
            ) : (
              <Select>
                <Option value="HBsAg">HBsAg</Option>
                <Option value="HBeAg">HBeAg</Option>
                <Option value="HBsAb">HBsAb</Option>
                <Option value="AFP">AFP</Option>
                <Option value="HCVab">HCVab</Option>
                <Option value="Cellpack">Cellpack</Option>
                <Option value="Stromatolyser-WH">Stromatolyser-WH</Option>
                <Option value="Cellclean">Cellclean</Option>
                <Option value="Ferritin">Ferritin</Option>
                <Option value="Wantai HDV-lg G ELISA">
                  Wantai HDV-lg G ELISA
                </Option>
              </Select>
            )
          )}
        </Form.Item>
      ),

      reagentLotNumber: (
        <Form.Item>
          {getFieldDecorator(`reagentLotNumber`, {
            rules: [{ required: true }],
          })(<Input />)}
        </Form.Item>
      ),

      reagentExpirationDate: (
        <Form.Item>
          {getFieldDecorator(`reagentExpirationDate`, {
            rules: [{ required: false }],
          })(<DatePicker />)}
        </Form.Item>
      ),

      totalRemain: (
        <Form.Item>
          {getFieldDecorator(`totalRemain`, {
            rules: [{ required: false }],
          })(<FloatNumber />)}
        </Form.Item>
      ),
    },
  ]

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        return dispatch({
          type: 'laboratory_test/saveReagent',
          payload: {
            testName: props.testName,
            values,
          },
        })
      })
      .then(() => {
        setMessage(i18n.t`Save successful`)
        setTimeout(() => showMessageModal(true), 10)
        props.onCancel()
        setTimeout(() => showMessageModal(false), 10)
        // refresh()
      })

      .catch(errorInfo => {
        setMessage(i18n.t`Save failed`)
        setTimeout(() => showMessageModal(false), 60)
      })
  }

  const onCancel = () => {
    showMessageModal(false)
  }

  // useEffect(() => {
  //   refresh()
  // }, [])

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      width="50%"
      footer={[
        <Button onClick={modalProps.onCancel}>
          <Trans id="Cancel" />
        </Button>,

        <Button
          className="button-red"
          onClick={onSubmit}
          loading={loading.effects['laboratory_test/saveReagent']}
        >
          <Trans id="Save" />
        </Button>,
      ]}
    >
      <div>
        <ModuleBox title={i18n.t`Add reagent`}>
          <Form>
            <Table
              dataSource={dataSource}
              columns={columns}
              className={styles.container}
              bordered={true}
              pagination={false}
            />
          </Form>
        </ModuleBox>

        <MessageModal
          type="success"
          visible={modalMessageVisible}
          onCancel={() => showMessageModal(false)}
          content={message}
        />
      </div>
    </Modal>
  )
}

ModalReagentAdd.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test, dispatch }) => ({
  app,
  loading,
  laboratory_test,
  dispatch,
}))(withI18n()(Form.create()(ModalReagentAdd)))
