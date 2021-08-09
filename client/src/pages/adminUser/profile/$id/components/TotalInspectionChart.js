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

const TotalInspectionChart = props => {
  const { practitionerProfile, location, loading, i18n } = props

  function DashBoardTitle1() {
    return (
      <div className={styles.mainTitle}>
        <Trans>
          <Text strong>Total </Text>
          <Text>inspection</Text>
        </Trans>
      </div>
    )
  }
  const dailyData = [
    { name: 'Нэгдүгээр сар', pv: 98, uv: 63, amt: 24 },
    { name: 'Хоёрдугаар сар', pv: 57, uv: 38, amt: 12 },
    { name: 'Гуравдугаар сар', pv: 60, uv: 42, amt: 12 },
    { name: 'Дөрөвдүгээр сар', pv: 98, uv: 85, amt: 20 },
    { name: 'Тавдугаар сар', pv: 60, uv: 45, amt: 10 },
    { name: 'Зургаадугаар сар', pv: 52, uv: 37, amt: 17 },
    // { name: <Trans id = {'July'}/>, uv: 68, pv: 52, amt: 35 },
    // { name: <Trans id = {'August'}/>, uv: 67, pv: 45, amt: 22 },
    // { name: <Trans id = {''}/>, uv: 67, pv: 41, amt: 10 },
    // { name: <Trans id = {'January'}/>, uv: 77, pv: 48, amt: 20 },
  ]
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{DashBoardTitle1()}</div>
      </div>
      <div
        style={{ height: '1px', background: '#E5E5E9', marginBottom: '20px' }}
      />

      <div className={styles.chart}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <div
            style={{
              marginTop: '-20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div>
              <Select
                defaultValue={'today'}
                className={styles.datePicker}
                //    onChange={handleMonthlyFlowChange}
              >
                <Option value="today">6 сараар</Option>
                <Option value="yesterday">{i18n.t`Yesterday`}</Option>
              </Select>
            </div>
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
                <stop offset="5%" stopColor="#54D8FF" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#54D8FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFDA83" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#FFDA83" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="0" />
            <YAxis stroke="0" />
            <CartesianGrid stroke="#EAF0F4" />
            <Tooltip />
            <Area
              type="monotone"
              name="Хепатит С"
              dataKey="amt"
              stroke="#54D8FF"
              fillOpacity={0.9}
              fill="url(#colorAmt)"
            />
            <Area
              type="monotone"
              name="Хепатит В"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={0.9}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              name="Хепатит Д"
              dataKey="pv"
              stroke="#FFDA83"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <Legend verticalAlign="bottom" height={36} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

TotalInspectionChart.propTypes = {
  practitionerProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ practitionerProfile }) => ({
  practitionerProfile,
}))(withI18n()(TotalInspectionChart))

// import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'dva'
// import { Typography, DatePicker, Col, Row } from 'antd'
// import {
//   AreaChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   linearGradient,
//   Area,
// } from 'recharts'
// import { Trans, withI18n } from '@lingui/react'
// import styles from '../index.less'

// const moment = require('moment')
// const { Text } = Typography

// function DashBoardTitle1() {
//   return (
//     <div className={styles.mainTitle}>
//       <Trans>
//         <Text strong>Total </Text>
//         <Text>inspection</Text>
//       </Trans>
//     </div>
//   )
// }

// const TotalInspectionChart = () => {
//   const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
//   const [endDate, setEndDate] = useState(moment())

//   const onStartDate = value => {
//     // let date = moment(value).format('YYYY-MM-DD')
//     setStartDate(value)
//   }

//   const onEndDate = value => {
//     // let date = moment(value).format('YYYY-MM-DD')
//     setEndDate(value)
//   }

//   const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ]
//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <div>{DashBoardTitle1()}</div>
//       </div>
//       <div style={{ height: '1px', background: '#E5E5E9' }} />
//       <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
//         <div
//           style={{
//             marginTop: '-20px',
//             display: 'flex',
//             justifyContent: 'flex-end',
//           }}
//         >
//           <Col style={{ marginRight: '10px' }}>
//             <DatePicker onChange={onStartDate} defaultValue={startDate} />
//           </Col>
//         </div>
//       </div>
//       <AreaChart
//         width={500}
//         height={400}
//         data={data}
//         margin={{
//           top: 10,
//           right: 30,
//           left: 0,
//           bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Area
//           type="monotone"
//           dataKey="uv"
//           stackId="1"
//           stroke="#8884d8"
//           fill="#8884d8"
//         />
//         <Area
//           type="monotone"
//           dataKey="pv"
//           stackId="1"
//           stroke="#82ca9d"
//           fill="#82ca9d"
//         />
//         <Area
//           type="monotone"
//           dataKey="amt"
//           stackId="1"
//           stroke="#ffc658"
//           fill="#ffc658"
//         />
//       </AreaChart>{' '}
//     </div>
//   )
// }

// TotalInspectionChart.propTypes = {
//   app: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// }

// export default connect(({ app }) => ({
//   app,
// }))(withI18n()(TotalInspectionChart))
