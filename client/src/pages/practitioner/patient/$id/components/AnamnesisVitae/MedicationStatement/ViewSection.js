import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../../styles.less'

const ViewSection = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientMedicationStatement, setPatientMedicationStatement] = useState()

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

  async function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryMedicationStatement',
        })
        .then(medicationStatementList => {
          if (!!medicationStatementList) {
            setPatientMedicationStatement(medicationStatementList)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(setLoadingData(false))
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  const title = <Trans id="Medication Statement" />

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true} disableCollapse={props.disableCollapse}>
        <div style={{ display: 'flex' }}>
          <div
            style={{ flexGrow: 1, borderRight: '0.5px solid black' }}
            className={styles.divTableItemLabel}
          ></div>
          <div
            style={{ flexGrow: 1, borderRight: '0.5px solid black' }}
            className={styles.divTableItemLabel}
          >
            <Trans id={'International name'} />
          </div>
          <div
            style={{ flexGrow: 1, borderRight: '0.5px solid black' }}
            className={styles.divTableItemLabel}
          >
            <Trans id={'Brand name'} />
          </div>
          <div
            style={{ flexGrow: 1, borderRight: '0.5px solid black' }}
            className={styles.divTableItemLabel}
          >
            <Trans id={'Currently using'} />
          </div>
          <div
            style={{ flexGrow: 1, borderRight: '0.5px solid black' }}
            className={styles.divTableItemLabel}
          >
            <Trans id={'Used for how long'} />
          </div>
          <div
            style={{ flexGrow: 1, borderRight: '0.5px solid black' }}
            className={styles.divTableItemLabel}
          >
            <Trans id={'Daily dose'} />
          </div>
          <div
            style={{ flexGrow: 1, borderRight: '0.5px solid black' }}
            className={styles.divTableItemLabel}
          >
            <Trans id={'Start date'} />
          </div>
          <div style={{ flexGrow: 1 / 2 }} className={styles.divTableItemLabel}>
            <Trans id={'Dosage'} />
          </div>
          <div style={{ flexGrow: 1 / 2 }} className={styles.divTableItemLabel}>
            <Trans id={'Note'} />
          </div>
        </div>
        {patientMedicationStatement &&
          patientMedicationStatement.map(statementValue => {
            return (
              <div style={{ display: 'flex' }}>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {statementValue.recordedDate}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {resolveDisplay(
                    statementValue.drugInformation.InternationalProprietaryName,
                    i18n._language
                  )}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {resolveDisplay(
                    statementValue.drugInformation.ProprietaryName,
                    i18n._language
                  )}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {statementValue.status}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {statementValue.lengthOfMedication}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {statementValue.dosage &&
                    `${statementValue.dosage.value} ${statementValue.dosage.unit}`}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {statementValue.startingDate}
                </div>
                <div
                  style={{ flexGrow: 1 / 2 }}
                  className={styles.divTableItemContents}
                >
                  {statementValue.doseQuantity}
                </div>
                <div
                  style={{ flexGrow: 1 / 2 }}
                  className={styles.divTableItemContents}
                >
                  {statementValue.note}
                </div>
              </div>
            )
          })}
      </BorderCollapse>
    </div>
  )
}

ViewSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(ViewSection))
