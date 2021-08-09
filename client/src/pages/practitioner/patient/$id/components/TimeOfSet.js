import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import {
  Typography,
  Select,
  Col,
  Row,
  Button,
  Avatar,
  Table,
  Divider,
  Tabs,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse, SlimTable } from 'components'
import { getDate } from 'utils/datetime'
import styles from '../styles.less'
import { Calendar, Badge } from 'antd'

const { Text } = Typography
const { TabPane } = Tabs

const TimeOfSet = ({ location, phlebotomy, loading, i18n }) => {
  function getListData(value) {
    let listData
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ]
        break
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ]
        break
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ]
        break
      default:
    }
    return listData || []
  }

  function dateCellRender(value) {
    const listData = getListData(value)
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null
  }
  return (
    <BorderCollapse
      displayName={<Trans id={'Make an appointment'} />}
      bordered={true}
    >
      <div className={styles.calendar}>
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
        />
      </div>
    </BorderCollapse>
  )
}
TimeOfSet.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner, loading }) => ({
  practitioner,
  loading,
}))(withI18n()(TimeOfSet))
