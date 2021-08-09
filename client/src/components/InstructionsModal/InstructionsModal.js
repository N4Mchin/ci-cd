import React from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { Modal } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './styles.less'
import { useMediaQuery } from 'react-responsive'

const InstructionsModal = props => {
  const isMobile = useMediaQuery({ maxDeviceWidth: 800 })

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={true}
      closable={true}
      footer={[]}
      width={isMobile ? '80%' : '800px'}
      className={styles.ModalContent}
    >
      {props.visible && (
        <div
          style={{
            display: 'flex',
            alignItems: 'middle',
            flexDirection: 'column',
            marginRight: '0px 32px',
          }}
        >
          <ReactPlayer
            title="instruction-video"
            url="https://www.youtube.com/watch?v=gqHFm1c4WW8"
            width="700"
          />
        </div>
      )}
    </Modal>
  )
}

InstructionsModal.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
}

export default withI18n()(InstructionsModal)
