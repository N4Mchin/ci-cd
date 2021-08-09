import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, DatePicker, Col, Select } from 'antd'
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
const { Option } = Select
function DashBoardTitle1() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Эмч </Text>
        <Text>бичлэг нэмсэн, зассан</Text>
      </Trans>
    </div>
  )
}

const PostChart = () => {
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
  const [endDate, setEndDate] = useState(moment())

  const onStartDate = value => {
    // let date = moment(value).format('YYYY-MM-DD')
    setStartDate(value)
  }

  const data = [
    {
      name: 'Батдэлгэр',
      Үзлэг: 4000,
      Эмчилгээ: 2400,
      Шинжилгээы: 200,
    },
    {
      name: 'Зулхүү',
      Үзлэг: 3000,
      Эмчилгээ: 1398,
      Шинжилгээы: 158,
    },
    {
      name: 'Мягмаржав',
      Үзлэг: 2000,
      Эмчилгээ: 9800,
      Шинжилгээы: 598,
    },
    {
      name: 'Бэхболд',
      Үзлэг: 2780,
      Эмчилгээ: 3908,
      Шинжилгээы: 985,
    },
    {
      name: 'Дэлгэрсайхан',
      Үзлэг: 1890,
      Эмчилгээ: 4800,
      Шинжилгээы: 214,
    },
    {
      name: 'Оюунгэрэл',
      Үзлэг: 2390,
      Эмчилгээ: 3800,
      Шинжилгээы: 1519,
    },
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
                <Option value="today">10 Өдрөөр</Option>
                {/* <Option value="yesterday"></Option> */}
              </Select>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={325}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Үзлэг" fill="#A3A1FB" barSize={30} />
            <Bar dataKey="Эмчилгээ" fill="#54D8FF" barSize={30} />
            <Bar dataKey="Шинжилгээы" fill="#FFDA83" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

PostChart.propTypes = {
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(PostChart))
