import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../immunology/styles.less'

import { Divider, Modal } from 'antd'
import { ButtonGrey } from 'components'
const ModalProtocolSave = ({
  location,
  laboratory_test_immunology,
  loading,
  i18n,
  ...modalProps
}) => {
  // console.log(list.map(v => v.status))
  // Handle when refreshing page
  // const handleRefresh = newQuery => {
  //   router.push({
  //     pathname,
  //     search: stringify(
  //       {
  //         ...query,
  //         ...newQuery,
  //       },
  //       { arrayFormat: 'repeat' }
  //     ),
  //   })
  // }

  //onCancel={handleCancel}
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
        <ButtonGrey onClick={modalProps.onCancel} style={{ width: '108px' }}>
          <Trans>Close</Trans>
        </ButtonGrey>
      </div>
    </Modal>
  )
}

ModalProtocolSave.propTypes = {
  laboratory_test_immunology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_immunology, loading }) => ({
  laboratory_test_immunology,
  loading,
}))(withI18n()(ModalProtocolSave))
