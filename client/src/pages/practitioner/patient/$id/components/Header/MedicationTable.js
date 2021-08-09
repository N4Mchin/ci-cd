import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../styles.less'

const columns = [
  {
    title: <Trans id={'International name'} />,
    dataIndex: 'medicationStatementName',
    width: '33%',
    key: 'medicationStatementName',
    // colSpan: 8,
  },
  {
    title: <Trans id={'Dosage'} />,
    dataIndex: 'medicationStatementDosage',
    width: '33%',
    // width: 100,
    key: 'medicationStatementDosage',
    // colSpan: 8,
  },
  {
    title: <Trans id={'Start date'} />,
    dataIndex: 'medicationStatementEffectivePeriodStart',
    width: '33%',
    key: 'medicationStatementEffectivePeriodStart',
    // colSpan: 8,
  },
]

const MedicationTable = props => {
  const { practitioner_patient_profile, i18n } = props
  const { lastUpdatedMedicationRequest } = practitioner_patient_profile

  const tableProps = {
    //rowClassName: record => styles[record.status],
    // loading: loading.effects['reception/query'],
    // pagination,
    // onChange(page) {
    //   handleRefresh({
    //     page: page.current,
    //     pageSize: page.pageSize,
    //   })
    // }
  }

  const [patientMedicationList, setPatientMedicationList] = useState()

  async function refresh() {
    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryMedicationRequest',
        })
        .then(diagnosisList => {
          if (!!diagnosisList) {
            setPatientMedicationList(diagnosisList)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedMedicationRequest])

  const dataSource = []

  patientMedicationList &&
    patientMedicationList.forEach((medicationValue, index) => {
      dataSource.push({
        key: String(index),
        medicationStatementName:
          medicationValue.drugInformation &&
          resolveDisplay(
            medicationValue.drugInformation.InternationalProprietaryName,
            i18n._language
          ),
        medicationStatementDosage:
          medicationValue.drugInformation &&
          medicationValue.drugInformation.Dosage,
        medicationStatementEffectivePeriodStart: medicationValue.recordedDate,
      })
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

      //scrollToFirstRowOnChange={true}
    />
  )
}

MedicationTable.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(MedicationTable))
