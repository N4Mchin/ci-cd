import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { MessageModal } from 'components'
import { Row, Col, Button } from 'antd'

const ConfirmModal = props => {
  const [isOpen, setIsOpen] = useState(false)

  const onCancel = () => {
    setIsOpen(false)

    props.onCancel && props.onCancel()
  }

  async function onConfirm() {
    await props.onConfirm()
    setIsOpen(false)
  }

  return (
    <React.Fragment>
      <Button {...props.showButtonProps} onClick={() => setIsOpen(true)}>
        {props.showButtonText}
      </Button>

      <MessageModal
        visible={isOpen}
        onCancel={onCancel}
        type="info"
        content={props.title}
        autoHide={false}
      >
        <Row type="flex" gutter={8}>
          <Col>
            <Button onClick={onCancel}>
              <Trans id="No" />
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onConfirm} loading={props.loading}>
              &nbsp;
              <Trans id="Yes" />
            </Button>
          </Col>
        </Row>
      </MessageModal>
    </React.Fragment>
  )
}

ConfirmModal.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default withI18n()(ConfirmModal)
