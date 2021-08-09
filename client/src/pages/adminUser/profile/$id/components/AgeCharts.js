import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, Progress, Col, Row } from 'antd'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import { Trans, withI18n } from '@lingui/react'
import styles from '../index.less'

const moment = require('moment')
const { Text } = Typography

function DashBoardTitle1() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Age </Text>
        <Text>Group</Text>
      </Trans>
    </div>
  )
}

const AgeCharts = () => {
  const data = [
    {
      name: '0-15',
      'Хеп В': 4000,
      'Хеп Д': 2400,
      'Хеп С': 7542,
    },
    {
      name: '15-38',
      'Хеп В': 3000,
      'Хеп Д': 1398,
      'Хеп С': 1000,
    },
    {
      name: '39-45',
      'Хеп В': 2000,
      'Хеп Д': 9800,
      'Хеп С': 1500,
    },
    {
      name: '46-60',
      'Хеп В': 2780,
      'Хеп Д': 3908,
      'Хеп С': 1560,
    },
    {
      name: '60 с дээш',
      'Хеп В': 1890,
      'Хеп Д': 4800,
      'Хеп С': 1600,
    },
  ]

  return (
    <div>
      <div>
        <div>{DashBoardTitle1()}</div>
      </div>
      <div
        style={{
          border: '1px solid #C9C9C9',
          // width: '600px',
          marginTop: '10px',
        }}
      >
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />

            <Bar dataKey="Хеп С" stackId="a" fill="#A3A1FB" barSize={25} />
            <Bar dataKey="Хеп В" stackId="a" fill="#54D8FF" />
            <Bar dataKey="Хеп Д" stackId="a" fill="#FFDA83" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

AgeCharts.propTypes = {
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(AgeCharts))
