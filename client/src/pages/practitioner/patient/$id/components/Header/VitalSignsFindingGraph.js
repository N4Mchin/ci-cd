import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, Spin, Skeleton } from 'antd'
import { ModuleBox } from 'components'
import { Trans, withI18n } from '@lingui/react'
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

import styles from './../../styles.less'

const { Text } = Typography

const VitalSignsFindingGraph = props => {
  const { practitioner_patient_profile, i18n } = props
  const { lastUpdatedExamination } = practitioner_patient_profile

  const title = (
    <div style={{ fontSize: '14px' }}>
      <Trans>
        <span className="bold">Vital </span>
        <span>signs</span>
      </Trans>
    </div>
  )
  const [loadingData, setLoadingData] = useState(false)
  const [patientVitalSignsFinding, setPatientVitalSignsFinding] = useState()
  const data = []

  function refresh() {
    setLoadingData(true)
    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryVitalSignsFinding',
        })
        .then(vitalSignsFindingList => {
          if (!!vitalSignsFindingList) {
            setPatientVitalSignsFinding(vitalSignsFindingList)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedExamination])

  patientVitalSignsFinding &&
    patientVitalSignsFinding.forEach(patientVitalSignsFindingValue => {
      data.push({
        date: patientVitalSignsFindingValue.dateValue,
        systolicArterialPressure:
          patientVitalSignsFindingValue.SystolicArterialPressure,
        diastolicBloodPressure:
          patientVitalSignsFindingValue.DiastolicBloodPressure,
      })
    })

  return (
    <ModuleBox title={title}>
      <Skeleton
        loading={loadingData || !props.practitioner_patient_profile.patient}
        active
        paragraph={{ rows: 7 }}
      >
        <>
          <div className={styles.chartTopBar}>
            <div className={styles.chartTitle}>
              <Trans>
                <Text strong>Blood Pressure</Text>
              </Trans>
            </div>
          </div>
          <ResponsiveContainer width="100%" maxHeight={760} height={257}>
            <AreaChart data={data && data.reverse()}>
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
              <XAxis dataKey="date" stroke="0" />
              <YAxis stroke="0" />
              <CartesianGrid stroke="#EAF0F4" />
              <Tooltip />
              <Area
                type="monotone"
                name={i18n.t`Systolic arterial pressure`}
                dataKey="systolicArterialPressure"
                stroke="#5FE3A1"
                fillOpacity={0.9}
                fill="url(#colorAmt)"
              />
              <Area
                type="monotone"
                name={i18n.t`Diastolic blood pressure`}
                dataKey="diastolicBloodPressure"
                stroke="#8884d8"
                fillOpacity={0.9}
                fill="url(#colorUv)"
              />
              <Legend verticalAlign="bottom" height={36} />
            </AreaChart>
          </ResponsiveContainer>
        </>
      </Skeleton>
    </ModuleBox>
  )
}

VitalSignsFindingGraph.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(VitalSignsFindingGraph))
