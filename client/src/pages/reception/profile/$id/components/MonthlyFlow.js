import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, Select } from 'antd'
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
  const { receptionProfile, location, loading, i18n } = props
  const dailyData = [
    { name: '08:30', uv: 98, pv: 63, amt: 24 },
    { name: '09:30', uv: 57, pv: 38, amt: 12 },
    { name: '10:30', uv: 60, pv: 42, amt: 12 },
    { name: '11:30', uv: 98, pv: 85, amt: 20 },
    { name: '12:30', uv: 60, pv: 45, amt: 10 },
    { name: '13:30', uv: 52, pv: 37, amt: 17 },
    { name: '14:30', uv: 68, pv: 52, amt: 35 },
    { name: '15:30', uv: 67, pv: 45, amt: 22 },
    { name: '16:30', uv: 67, pv: 41, amt: 10 },
    { name: '17:30', uv: 77, pv: 48, amt: 20 },
  ]
  return (
    <div className={styles.chart}>
      <div className={styles.chartTopBar}>
        <div className={styles.chartTitle}>
          <Trans>
            <Text strong>Customers </Text>
            <Text>Flow</Text>
          </Trans>
        </div>
        <div>
          <Select
            defaultValue={'today'}
            className={styles.datePicker}
            //    onChange={handleMonthlyFlowChange}
          >
            <Option value="today">{i18n.t`Today`}</Option>
            <Option value="yesterday">{i18n.t`Yesterday`}</Option>
          </Select>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={325}>
        <AreaChart
          data={dailyData}
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
            fillOpacity={0.9}
            fill="url(#colorAmt)"
          />
          <Area
            type="monotone"
            name={i18n.t`Checkups`}
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={0.9}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            name={i18n.t`DiagnosticTests`}
            dataKey="pv"
            stroke="#56D9FE"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Legend verticalAlign="bottom" height={36} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

MonthlyFlow.propTypes = {
  receptionProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ receptionProfile }) => ({
  receptionProfile,
}))(withI18n()(MonthlyFlow))
