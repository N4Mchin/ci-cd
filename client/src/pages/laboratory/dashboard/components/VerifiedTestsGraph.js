import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Select, Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import LabTestItem from './LabTestItem'
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
import { cloneDeep } from 'lodash'

const { Text } = Typography
const { Option } = Select
const COLORS = {
  white: '#FFFFFF',
  monaco_blue: '#104577',
  dusk_blue: '#7CB5D2',
  emerald: '#18A68D',
  grayed_jade: '#96CEB7',
  linen: '#F8DFC8',
  african_violets: '#BB94B7',
  tender_shoots: '#BDD74B',
  lemon_zest: '#FCE05E',
  nectarine: '#F68D51',
  fog: '#DFDEDC',
  wall: '#BBBBBB',
  roof: '#454545',
  rain: '#CDDCDF',
  windy: '#7E929B',
  stone: '#CDDCDF',
  night: '#17325F',
  navy: '#093552',
  taupe: '#B69F91',
  greige: '#ACA299',
  storm: '#6E6E6E',
  clay: '#BA7264',
  cadet: '#1F6376',
  hale: '#3D4F59',
  harbor: '#163842',
  sand: '#D5B77B',
  ochre: '#C28A3D',
}

const verifiedTests = [
  {
    name: 'Даваа',
    biochemistry: 98,
    hematology: 63,
    rapidTests: 24,
    immunology: 123,
    esr: 55,
    viralLoadTests: 32,
    genotype: 10,
    coagulation: 18,
    urinalysis: 140,
  },
  {
    name: 'Мягмар',
    biochemistry: 57,
    hematology: 38,
    rapidTests: 12,
    immunology: 100,
    esr: 60,
    viralLoadTests: 60,
    genotype: 140,
    coagulation: 20,
    urinalysis: 120,
  },
  {
    name: 'Лхагва',
    biochemistry: 60,
    hematology: 42,
    rapidTests: 140,
    immunology: 75,
    esr: 65,
    viralLoadTests: 70,
    genotype: 40,
    coagulation: 50,
    urinalysis: 100,
  },
  {
    name: 'Пүрэв',
    biochemistry: 98,
    hematology: 140,
    rapidTests: 20,
    immunology: 50,
    esr: 50,
    viralLoadTests: 10,
    genotype: 30,
    coagulation: 80,
    urinalysis: 80,
  },
  {
    name: 'Баасан',
    biochemistry: 140,
    hematology: 45,
    rapidTests: 10,
    immunology: 75,
    esr: 60,
    viralLoadTests: 12,
    genotype: 20,
    coagulation: 110,
    urinalysis: 60,
  },
  {
    name: 'Бямба',
    biochemistry: 52,
    hematology: 37,
    rapidTests: 17,
    immunology: 100,
    esr: 75,
    viralLoadTests: 81,
    genotype: 10,
    coagulation: 140,
    urinalysis: 40,
  },
]

const checkedList = []
const graphData = [
  {
    name: 'Даваа',
    biochemistry: 98,
    hematology: 63,
    rapidTests: 24,
    immunology: 123,
    esr: 55,
    viralLoadTests: 32,
    genotype: 10,
    coagulation: 18,
    urinalysis: 140,
  },
  {
    name: 'Мягмар',
    biochemistry: 57,
    hematology: 38,
    rapidTests: 12,
    immunology: 100,
    esr: 60,
    viralLoadTests: 60,
    genotype: 140,
    coagulation: 20,
    urinalysis: 120,
  },
  {
    name: 'Лхагва',
    biochemistry: 60,
    hematology: 42,
    rapidTests: 140,
    immunology: 75,
    esr: 65,
    viralLoadTests: 70,
    genotype: 40,
    coagulation: 50,
    urinalysis: 100,
  },
  {
    name: 'Пүрэв',
    biochemistry: 98,
    hematology: 140,
    rapidTests: 20,
    immunology: 50,
    esr: 50,
    viralLoadTests: 10,
    genotype: 30,
    coagulation: 80,
    urinalysis: 80,
  },
  {
    name: 'Баасан',
    biochemistry: 140,
    hematology: 45,
    rapidTests: 10,
    immunology: 75,
    esr: 60,
    viralLoadTests: 12,
    genotype: 20,
    coagulation: 110,
    urinalysis: 60,
  },
  {
    name: 'Бямба',
    biochemistry: 52,
    hematology: 37,
    rapidTests: 17,
    immunology: 100,
    esr: 75,
    viralLoadTests: 81,
    genotype: 10,
    coagulation: 140,
    urinalysis: 40,
  },
  {
    name: 'Ням',
    biochemistry: 140,
    hematology: 45,
    rapidTests: 10,
    immunology: 75,
    esr: 60,
    viralLoadTests: 12,
    genotype: 20,
    coagulation: 110,
    urinalysis: 60,
  },
]
const onTestItemChange = checkedList => {
  const graphData = cloneDeep(verifiedTests)
  graphData.map(datum =>
    Object.keys(datum).map(key => {
      if (!checkedList.includes(key) && key !== 'name') {
        delete datum[key]
      }
    })
  )

  setState({
    checkedList: checkedList,
    graphData: graphData,
  })
}
const VerifiedTestsGraph = props => {
  const { location, laboratory_dashboard, loading, i18n } = props
  return (
    <div className={styles.chart}>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '80%' }}>
          <div className={styles.chartTopBar}>
            <div className={styles.chartTitle}>
              <Trans>
                <Text strong>Verified </Text>
                <Text>Tests</Text>
              </Trans>
            </div>
            <div className={styles.datePicker}>
              <Select
                defaultValue={'Today'}
                className={styles.datePicker}
                //onChange={handleVerifiedTestsGraphChange}
              >
                <Option value="ThisWeek">{i18n.t`Today`}</Option>
                <Option value="twoWeek">{i18n.t`thisWeek`}</Option>
                <Option value="threeWeek">{i18n.t`thisMonth`}</Option>
              </Select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={325}>
            <AreaChart
              data={graphData}
              margin={{ top: 10, right: 50, left: 0, bottom: 30 }}
            >
              <defs>
                {Object.keys(COLORS).map(color => (
                  <linearGradient id={color} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="2%"
                      stopColor={COLORS[color]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="98%"
                      stopColor={COLORS[color]}
                      stopOpacity={0}
                    />
                  </linearGradient>
                ))}

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
                name={i18n.t`Biochemistry`}
                dataKey="biochemistry"
                stroke={COLORS.monaco_blue}
                fillOpacity={1}
                fill="url(#monaco_blue)"
                // dot={{ stroke: COLORS.monaco_blue, fill: COLORS.white }}
              />
              <Area
                type="monotone"
                name={i18n.t`Hematology`}
                dataKey="hematology"
                stroke={COLORS.dusk_blue}
                fillOpacity={1}
                fill="url(#dusk_blue)"
                // dot={{ stroke: COLORS.dusk_blue, fill: COLORS.white }}
              />
              <Area
                type="monotone"
                name={i18n.t`Rapid Tests`}
                dataKey="rapidTests"
                stroke={COLORS.emerald}
                fillOpacity={1}
                fill="url(#emerald)"
                // dot={{ stroke: COLORS.emerald, fill: COLORS.white }}
              />
              <Area
                type="monotone"
                name={i18n.t`Immunology`}
                dataKey="immunology"
                stroke={COLORS.grayed_jade}
                fillOpacity={1}
                fill="url(#grayed_jade)"
                // dot={{ stroke: COLORS.grayed_jade, fill: COLORS.white }}
              />
              <Area
                type="monotone"
                name={i18n.t`Rapid Tests`}
                dataKey="esr"
                stroke={COLORS.linen}
                fillOpacity={1}
                fill="url(#linen)"
                // dot={{ stroke: COLORS.linen, fill: COLORS.white }}
              />
              <Area
                type="monotone"
                name={i18n.t`Viral Load Tests`}
                dataKey="viralLoadTests"
                stroke={COLORS.african_violets}
                fillOpacity={1}
                fill="url(#african_violets)"
                // dot={{ stroke: COLORS.african_violets, fill: COLORS.white }}
              />
              <Area
                type="monotone"
                name={i18n.t`Genotype`}
                dataKey="genotype"
                stroke={COLORS.tender_shoots}
                fillOpacity={1}
                fill="url(#tender_shoots)"
                // dot={{ stroke: COLORS.tender_shoots, fill: COLORS.white }}
              />

              <Area
                type="monotone"
                name={i18n.t`Coagulation`}
                dataKey="coagulation"
                stroke={COLORS.lemon_zest}
                fillOpacity={1}
                fill="url(#lemon_zest)"
                // dot={{ stroke: COLORS.lemon_zest, fill: COLORS.white }}
              />
              <Area
                type="monotone"
                name={i18n.t`Urinalysis`}
                dataKey="urinalysis"
                stroke={COLORS.nectarine}
                fillOpacity={1}
                fill="url(#nectarine)"
                // dot={{ stroke: COLORS.nectarine, fill: COLORS.white }}
              />

              <Legend verticalAlign="bottom" height={36} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            width: '20%',
          }}
        >
          <LabTestItem onChange={onTestItemChange} />
        </div>
      </div>
    </div>
  )
}

VerifiedTestsGraph.propTypes = {
  laboratory_dashboard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ app, laboratory_dashboard, loading }) => ({
  app,
  laboratory_dashboard,
  loading,
}))(withI18n()(VerifiedTestsGraph))
