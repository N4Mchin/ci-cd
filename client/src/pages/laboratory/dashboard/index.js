import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, Select, DatePicker, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import { Stats, ServiceFlow, VerifiedTestsGraph } from './components'
import styles from './index.less'

const { Text } = Typography
const moment = require('moment')
const { Option } = Select

function DashBoardTitle() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Laboratory </Text>
        <Text>Dashboard</Text>
      </Trans>
    </div>
  )
}

const LaboratoryDashboard = ({ laboratory_dashboard, i18n }) => {
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
  const [endDate, setEndDate] = useState(moment())

  const onStartDate = value => {
    setStartDate(value)
  }

  const onEndDate = value => {
    setEndDate(value)
  }

  return (
    <Board inner>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{DashBoardTitle()}</div>
        </div>
        <div style={{ height: '1px', background: '#E5E5E9' }} />
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <div
            style={{
              marginTop: '-20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Col span={12} style={{ marginRight: '10px' }}>
              <DatePicker onChange={onStartDate} defaultValue={startDate} />
            </Col>
            <Col span={12}>
              <DatePicker onChange={onEndDate} defaultValue={endDate} />
            </Col>
          </div>
        </div>
      </div>

      <Stats startDate={startDate} endDate={endDate} />

      <div style={{ height: '16px' }} />
      <ServiceFlow />

      <div style={{ height: '16px' }} />
      <VerifiedTestsGraph />
    </Board>
  )
}

LaboratoryDashboard.propTypes = {
  laboratory_dashboard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_dashboard }) => ({
  laboratory_dashboard,
}))(withI18n()(LaboratoryDashboard))
