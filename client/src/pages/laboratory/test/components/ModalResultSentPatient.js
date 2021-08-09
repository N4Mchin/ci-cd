import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Button, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import styles from '../styles.less'
import { ButtonGrey } from 'components'

const ModalResultSentPatient = props => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      width={310}
      footer={[]}
    >
      <div className={styles.mainTitle}>
        <span
          style={{
            fontSize: '12px',
            color: '#616161',
            textTransform: 'uppercase',
            lineHeight: '20px',
            textAlign: 'center',
            display: 'inline-block',
            padding: '10px 10px 10px 10px',
          }}
        >
          <span>{props.title}</span>
        </span>
      </div>
      <Divider style={{ width: '4px', marginTop: '40px' }}></Divider>
      <div
        style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}
      >
        <ButtonGrey onClick={props.onCancel} style={{ width: '108px' }}>
          <Trans id="Close" />
        </ButtonGrey>
      </div>
    </Modal>
  )
}

ModalResultSentPatient.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_rapidTests, loading }) => ({
  app,
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(Form.create()(ModalResultSentPatient)))
