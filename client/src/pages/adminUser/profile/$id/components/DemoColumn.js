import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, DatePicker, Col, Row, Select } from 'antd'
import { PieChart, Pie, Line } from 'recharts'
import { Trans, withI18n } from '@lingui/react'
import styles from '../index.less'
import { CheckCircleFilled } from '@ant-design/icons'

const moment = require('moment')
const { Text } = Typography
const { Option } = Select

function DashBoardTitle1() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Medical </Text>
        <Text>examination</Text>
      </Trans>
    </div>
  )
}
function DashBoardTitle2() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Service </Text>
      </Trans>
    </div>
  )
}

const DemoColumn = () => {
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
  const data01 = [
    {
      name: 'Б.Мягмаржав',
      value: 20,
      fill: '#82ca9d',
    },
    {
      name: 'Д.Бэхболд',
      value: 36,
      fill: '#A3A1FB',
    },
    {
      name: 'З.Дэлгэрсайхан',
      value: 10,
      fill: '#54D8FF',
    },
    {
      name: 'Л.Оюунгэрэл',
      value: 10,
      fill: '#FFDA83',
    },
    {
      name: 'Г.Зулхүү',
      value: 16,
      fill: '#31FF00',
    },
  ]
  const data02 = [
    {
      name: 'AFF',
      value: 6,
      fill: '#82ca9d',
    },
    {
      name: 'Эмч',
      value: 13,
      fill: '#A3A1FB',
    },
    {
      name: 'Biochimi',
      value: 17,
      fill: '#54D8FF',
    },
    {
      name: 'Blood',
      value: 10,
      fill: '#FFDA83',
    },
    {
      name: 'HBV_DNA',
      value: 7,
      fill: '#31FF00',
    },
    {
      name: 'FibroScan',
      value: 8,
      fill: '#F44336',
    },
    {
      name: 'HBsAgQ',
      value: 8,
      fill: 'green',
    },
  ]
  return (
    <Row>
      <Col span={12}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{DashBoardTitle1()}</div>
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
            <div>
              <Select
                defaultValue={'today'}
                className={styles.datePicker}
                //    onChange={handleMonthlyFlowChange}
              >
                <Option value="today">1 сараар</Option>
                {/* <Option value="yesterday"></Option> */}
              </Select>
            </div>
          </div>
        </div>

        <PieChart width={730} height={250}>
          <Pie
            data={data01}
            labelLine={false}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            // label={'fill'}
            label={data => {
              const RADIAN = Math.PI / 180
              const {
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
              } = data
              console.log(data)
              const radius = innerRadius + (outerRadius - innerRadius) * 2.5
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              return (
                <text
                  stroke="none"
                  // fill="#5A5A5A"
                  fill={data.fill}
                  x={x}
                  y={y}
                  alignment-baseline="middle"
                  class="recharts-text recharts-pie-label-text"
                  text-anchor="start"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  <tspan x={x} dy="0em">
                    ■&nbsp;{data.name}
                  </tspan>
                  <tspan
                    x={x}
                    dy="1em"
                    fill={'#5A5A5A'}
                    className={styles.boldTspan}
                  >
                    {data.value}%
                  </tspan>
                </text>

                /* <tspan x="410.80013698672366" dy="0em">
                    {data.value}123
                  </tspan> */
                // <div>
                //   {data.value}
                //   <br />
                //   asdf
                // </div>
              )
            }}
          />
        </PieChart>
      </Col>
      <Col span={12}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginLeft: '15px',
          }}
        >
          <div>{DashBoardTitle2()}</div>
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
            <div>
              <Select
                defaultValue={'today'}
                className={styles.datePicker}
                //    onChange={handleMonthlyFlowChange}
              >
                <Option value="today">10 Өдрөөр</Option>
                {/* <Option value="yesterday"></Option> */}
              </Select>
            </div>
          </div>
        </div>

        <PieChart width={730} height={250}>
          <Pie
            data={data02}
            labelLine={false}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label={data => {
              const RADIAN = Math.PI / 180
              const {
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
              } = data

              const radius = innerRadius + (outerRadius - innerRadius) * 2.5
              const x = cx + radius * Math.cos(-midAngle * RADIAN)
              const y = cy + radius * Math.sin(-midAngle * RADIAN)

              // console.log(data.name, data.name.length)
              return (
                <text
                  stroke="none"
                  // fill="#5A5A5A"
                  fill={data.fill}
                  x={x}
                  y={y}
                  alignment-baseline="middle"
                  class="recharts-text recharts-pie-label-text"
                  text-anchor="start"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  <tspan x={x} dy="0em">
                    ■&nbsp;{data.name}
                  </tspan>
                  <tspan
                    x={x}
                    dy="1em"
                    fill={'#5A5A5A'}
                    className={styles.boldTspan}
                  >
                    {data.value}%
                  </tspan>
                </text>
              )
            }}
          />
        </PieChart>
      </Col>
    </Row>
  )
}

DemoColumn.propTypes = {
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(DemoColumn))
