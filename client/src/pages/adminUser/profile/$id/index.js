import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, DatePicker, Col, Row } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import {
  Stats,
  DemoColumn,
  PostChart,
  TotalInspectionChart,
  AgeCharts,
  AccountSettings,
  ProgressChart,
} from './components'
import styles from './index.less'
const moment = require('moment')
const { Text } = Typography

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

const AdminProfile = ({ admin_profile, i18n }) => {
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
            <Col span={10} style={{ marginRight: '10px' }}>
              <DatePicker onChange={onStartDate} defaultValue={startDate} />
            </Col>
            <Col span={14}>
              <DatePicker onChange={onEndDate} defaultValue={endDate} />
            </Col>
          </div>
        </div>
      </div>
      <Stats startDate={startDate} endDate={endDate} />
      <Row gutter={128}>
        <Col span={10}>
          <div style={{ height: '16px' }} />
          <AgeCharts />
        </Col>
        <Col span={12}>
          <div style={{ height: '16px' }} />
          <ProgressChart />
        </Col>
      </Row>
      <div style={{ height: '16px' }} />
      <TotalInspectionChart />
      <div style={{ height: '16px' }} />
      <PostChart />
      <div style={{ height: '16px' }} />
      <DemoColumn />
      <div style={{ height: '16px' }} />
      <AccountSettings />
    </Board>
  )
}

AdminProfile.propTypes = {
  admin_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ admin_profile }) => ({
  admin_profile,
}))(withI18n()(AdminProfile))
