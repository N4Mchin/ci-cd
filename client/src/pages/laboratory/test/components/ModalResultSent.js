import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Divider, Button } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CheckCircleTwoTone } from '@ant-design/icons'

const ModalResultSent = props => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width={310}
      footer={[]}
    >
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
      >
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: '32px' }}
        />
      </div>

      <span
        style={{
          fontSize: '14px',
          lineHeight: '20px',
          textAlign: 'center',
          display: 'inline-block',
          padding: '10px 10px 10px 10px',
        }}
      >
        {props.title}
      </span>
      <Divider style={{ width: '4px', marginTop: '40px' }}></Divider>
      <div
        style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}
      >
        <Button className="button-gray uppercase" onClick={props.onCancel}>
          <Trans id="Close" />
        </Button>
      </div>
    </Modal>
  )
}

ModalResultSent.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_rapidTests, loading }) => ({
  app,
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(Form.create()(ModalResultSent)))
