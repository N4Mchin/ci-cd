import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { stringify } from 'qs'
import styles from '../styles.less'
import { ButtonGrey } from 'components'

import { Tabs, Button, Select, Row, Col, Divider, Input, Modal } from 'antd'

const ModalProtocolSave = ({
  location,
  laboratory_test_hematology,
  loading,
  i18n,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps} footer={[]}>
      <div className={styles.mainTitle}>
        <span>
          <Trans>
            <strong>Successfully saved</strong>
          </Trans>
        </span>
      </div>
      <Divider style={{ width: '4px', marginTop: '40px' }}></Divider>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <ButtonGrey onClick={modalProps.onCancel}>
          <Trans>Close</Trans>
        </ButtonGrey>
      </div>
    </Modal>
  )
}

ModalProtocolSave.propTypes = {
  laboratory_test_hematology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_hematology, loading }) => ({
  laboratory_test_hematology,
  loading,
}))(withI18n()(ModalProtocolSave))
