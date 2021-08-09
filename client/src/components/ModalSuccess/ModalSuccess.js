import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Divider, Button, Row } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { CheckCircleTwoTone } from '@ant-design/icons'

const ModalSuccess = props => {
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
        style={{
          display: 'flex',
          alignItems: 'middle',
          flexDirection: 'column',
        }}
      >
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: '32px', marginTop: '16px' }}
        />
        <span
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            textAlign: 'center',
            display: 'inline-block',
            padding: '10px 10px 10px 10px',
          }}
        >
          {props.content}
        </span>
        <Divider style={{ width: '4px', margin: '40px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button className="button-gray uppercase" onClick={props.onCancel}>
            <Trans id="Close" />
          </Button>
        </div>
      </div>
    </Modal>
  )
}

ModalSuccess.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  content: PropTypes.object,
}

export default withI18n()(ModalSuccess)
