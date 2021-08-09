import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, Select, DatePicker, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import { Stats, DailyFlow, MonthlyFlow } from './components'
import styles from './index.less'
const { Text } = Typography
const moment = require('moment')

function DashBoardTitle() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>General </Text>
        <Text>Dashboard</Text>
      </Trans>
    </div>
  )
}

const PhlebotomyDashboard = props => {
  const { i18n } = props

  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
  const [endDate, setEndDate] = useState(moment())

  const onStartDate = value => {
    // let date = moment(value).format('YYYY-MM-DD')
    setStartDate(value)
  }

  const onEndDate = value => {
    // let date = moment(value).format('YYYY-MM-DD')
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

      {/* <div style={{ height: '16px' }} />
      <DailyFlow />

      <div style={{ height: '16px' }} />
      <MonthlyFlow /> */}
      <div style={{ height: '16px' }}></div>
    </Board>
  )
}

PhlebotomyDashboard.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy_dashboard, loading }) => ({
  app,
  phlebotomy_dashboard,
  loading,
}))(withI18n()(PhlebotomyDashboard))
