import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Row } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import styles from './index.less'
import LabTestLog from './LabTestLog'
import PrivateInfo from './PrivateInfo'
import RecentServices from './RecentServices'
import { useMediaQuery } from 'react-responsive'

const Title = () => {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <span className="title uppercase">Customer </span>
        <span className="uppercase">Private Information</span>
      </Trans>
      <div style={{ height: '1px', background: '#E5E5E9' }} />
    </div>
  )
}

const PatientProfile = props => {
  const isMobile = useMediaQuery({ maxDeviceWidth: 800 })
  return (
    <Board inner>
      <Title />

      <div className={!isMobile && styles.headerContainer}>
        <PrivateInfo />
        <div style={{ width: '16px' }}></div>
        <RecentServices />
      </div>

      <Row gutter={16}>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <LabTestLog />
        </Col>
      </Row>
    </Board>
  )
}

PatientProfile.propTypes = {
  patient_portal: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, patient_portal, loading }) => ({
  app,
  patient_portal,
  loading,
}))(withI18n()(PatientProfile))
