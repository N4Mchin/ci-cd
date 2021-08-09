import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './../../styles.less'

const columns = [
  {
    title: <Trans id={'AbuseHabitsType'} />,
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: <Trans id={'AbuseHabitsUsage'} />,
    dataIndex: 'alcohol',
    key: 'alcohol',
  },
]

const AbuseHabitsTable = props => {
  const { practitioner_patient_profile, i18n } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [patientAbuseHabits, setPatientAbuseHabits] = useState()

  // const dataSource = [
  //   {
  //     key: '1',
  //     alcohol: 'Изониазид',
  //     year: '2012 онд',
  //   },
  //   {
  //     key: '2',
  //     alcohol: 'Этамбутол',
  //     year: '2012 онд',
  //   },

  async function refresh() {
    return (
      props
        .dispatch({
          type:
            'practitioner_patient_profile/querySmokingDrinkingSubstanceAbuseHabits',
        })
        .then(abuseHabitsList => {
          if (!!abuseHabitsList) {
            setPatientAbuseHabits(abuseHabitsList)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  const dataSource = []

  console.log(patientAbuseHabits)

  patientAbuseHabits &&
    patientAbuseHabits.forEach((abuseHabit, index) => {
      if (abuseHabit.AlcoholIntake) {
        const { valueType, value } = abuseHabit.AlcoholIntake

        const valueTypeTrans = valueType && (
          <Trans
            id={
              valueType === 'day'
                ? 'per day'
                : valueType === 'week'
                ? 'per week'
                : 'per month'
            }
          />
        )

        abuseHabit.AlcoholIntake &&
          dataSource.push({
            key: index,
            year: i18n.t`Alcohol`,
            alcohol: (
              <div>
                {i18n._language === 'mn' ? (
                  <div>
                    {valueTypeTrans} {value}
                    {','} {i18n.t`standard quantity`}
                  </div>
                ) : (
                  <div>
                    {value} {valueTypeTrans}
                    {','} {i18n.t`standard quantity`}
                  </div>
                )}
              </div>
            ),
          })
      }
    })

  return (
    <Table
      style={{ minHeight: '253px', border: '1px solid #bfbfbf' }}
      bordered={true}
      columns={columns}
      pagination={false}
      dataSource={dataSource}
      // scroll={dataSource.length > 0 ? { y: 200 } : {}}
      className={styles.headerTable}
    />
  )
}

AbuseHabitsTable.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(AbuseHabitsTable))
