import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Divider, Col, Row } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import {
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons'

const MessageModal = props => {
  // default is true
  const { autoHide = true } = props

  let icon

  const iconStyle = {
    fontSize: '32px',
    marginTop: '16px',
  }

  switch (props.type) {
    case 'success':
      icon = <CheckCircleTwoTone twoToneColor="#52c41a" style={iconStyle} />
      break
    case 'info':
      icon = (
        <ExclamationCircleTwoTone twoToneColor="orange" style={iconStyle} />
      )
      break
    case 'error':
      icon = <CloseCircleTwoTone twoToneColor="#f81d22" style={iconStyle} />
      break
    default:
      break
  }

  useEffect(() => {
    if (autoHide) {
      if (props.visible) {
        const timer = () => setTimeout(() => props.onCancel(), 2000)
        const timerId = timer()

        return () => {
          clearTimeout(timerId)
        }
      }
    }
  }, [props.visible])

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={false}
      width={props.width ? props.width : 310}
      footer={[]}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'middle',
          flexDirection: 'column',
        }}
      >
        {icon}

        <span
          style={{
            fontSize: '14px',
            lineHeight: '20px',
            textAlign: 'center',
            display: 'inline-block',
            padding: '10px 10px 10px 10px',
            marginTop: '8px',
          }}
        >
          {props.content}
        </span>

        {props.children && (
          <>
            <Divider
              style={{ width: '4px', margin: '40px 0', background: '#bbb' }}
            />

            <Row type="flex" justify="center">
              <Col style={{ margin: '10px' }}>{props.children}</Col>
            </Row>
          </>
        )}
      </div>
    </Modal>
  )
}

MessageModal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

export default withI18n()(MessageModal)
