import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './../../styles.less'
import { resolveDisplay } from 'utils/valuesets'
import { isObject } from 'utils/helper'

const columns = [
  {
    title: <Trans id={'Allergy'} />,
    dataIndex: 'allergy',
    key: 'allergy',
  },
]

const AllergyIntoleranceTable = props => {
  const { practitioner_patient_profile, i18n } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [patientAllergyIntolerance, setPatientAllergyIntolerance] = useState()

  /* #region   */

  async function refresh() {
    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryAllergicIntolerance',
        })
        .then(allergyIntoleranceList => {
          if (!!allergyIntoleranceList) {
            setPatientAllergyIntolerance(allergyIntoleranceList)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
    )
  }

  const dataSource = []
  let key = 0

  patientAllergyIntolerance &&
    Object.keys(patientAllergyIntolerance).forEach(dateValue => {
      patientAllergyIntolerance[dateValue].forEach(v => {
        if (isObject(v)) {
          dataSource.push({
            key: String(key),
            allergy: resolveDisplay(v, i18n._language),
          })
        } else {
          dataSource.push({
            key: String(key),
            allergy: v,
          })
        }

        key = key + 1
      })
    })

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  return (
    <Table
      style={{ minHeight: '253px', border: '1px solid #bfbfbf' }}
      bordered={true}
      columns={columns}
      pagination={false}
      dataSource={dataSource}
      // scroll={dataSource.length > 0 ? { y: 200 } : {}}
      className={styles.headerTable}
      scrollToFirstRowOnChange={false}
    />
  )
}

AllergyIntoleranceTable.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(AllergyIntoleranceTable))
