import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Select, Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import {
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts'

const { Text } = Typography
const { Option } = Select

const MonthlyFlow = props => {
  const { location, phlebotomy, loading, i18n } = props

  return (
    <div className={styles.chart}>
      <div className={styles.chartTopBar}>
        <div className={styles.chartTitle}>
          <Trans>
            <Text strong>Customers </Text>
            <Text>Flow</Text>
          </Trans>
        </div>
        <div className={styles.datePicker}>
          <Select
            defaultValue={'ThisWeek'}
            className={styles.datePicker}
            // onChange={this.handleMonthlyFlowChange}
          >
            <Option value="ThisWeek">{i18n.t`ThisWeek`}</Option>
            <Option value="twoWeek">{i18n.t`twoWeek`}</Option>
            <Option value="threeWeek">{i18n.t`threeWeek`}</Option>
            <Option value="thisMonth">{i18n.t`thisMonth`}</Option>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={325}>
        <AreaChart
          // data={this.props.receptionProfile.monthlyData}
          margin={{ top: 10, right: 50, left: 0, bottom: 30 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5FE3A1" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#5FE3A1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#56D9FE" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#56D9FE" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="0" />
          <YAxis stroke="0" />
          <CartesianGrid stroke="#EAF0F4" />
          <Tooltip />
          <Area
            type="monotone"
            name={i18n.t`LaboratoryTests`}
            dataKey="amt"
            stroke="#5FE3A1"
            fillOpacity={1}
            fill="url(#colorAmt)"
            dot={{ stroke: '#5FE3A1', fill: '#FFF' }}
          />
          <Area
            type="monotone"
            name={i18n.t`Checkups`}
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={{ stroke: '#8884d8', fill: '#FFF' }}
          />
          <Area
            type="monotone"
            name={i18n.t`DiagnosticTests`}
            dataKey="pv"
            stroke="#56D9FE"
            fillOpacity={1}
            fill="url(#colorPv)"
            dot={{ stroke: '#56D9FE', fill: '#FFF' }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

MonthlyFlow.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy, loading }) => ({
  app,
  phlebotomy,
  loading,
}))(withI18n()(MonthlyFlow))
