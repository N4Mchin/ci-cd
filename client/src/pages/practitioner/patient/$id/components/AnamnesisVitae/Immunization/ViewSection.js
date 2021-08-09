import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../../styles.less'

const ViewSection = props => {
  const { app, i18n, practitioner_patient_profile } = props
  const { Immunization } = app.FHIR_CODES.AnamnesisVitae.include
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

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

  const [loadingData, setLoadingData] = useState(false)
  const [patientImmunization, setPatientImmunization] = useState()
  /* #region   */

  async function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryImmunization',
        })
        .then(immunizationList => {
          if (!!immunizationList) {
            setPatientImmunization(immunizationList)
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

  const title = resolveDisplay(Immunization, i18n._language)

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true} disableCollapse={props.disableCollapse}>
        {patientImmunization &&
          (patientImmunization.immunizationStatus === false ||
            patientImmunization.immunizationStatus === true) && (
            <div style={{ display: 'flex' }}>
              <div
                style={{ flexGrow: 1 }}
                className={styles.divTableItemContents}
              >
                <Trans id={'Vaccination status'} />
              </div>
              <div
                style={{ flexGrow: 1 }}
                className={styles.divTableItemContents}
              >
                {patientImmunization.immunizationStatus
                  ? i18n.t`Yes`
                  : i18n.t`No`}
              </div>
            </div>
          )}

        {patientImmunization &&
          patientImmunization.immunizationInformation.length > 0 && (
            <div>
              <div style={{ display: 'flex', marginTop: '8px' }}>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemLabel}
                >
                  {' '}
                  <Trans id={'Vaccine name'} />
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemLabel}
                >
                  {' '}
                  <Trans id={'Last administration date'} />
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemLabel}
                >{i18n.t`AdditionalInformation`}</div>
              </div>
              <div>
                {patientImmunization.immunizationInformation.map(
                  immunizationValue => {
                    return (
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{ flexGrow: 1 }}
                          className={styles.divTableItemContents}
                        >
                          {immunizationValue.vaccineInfo &&
                            resolveDisplay(
                              immunizationValue.vaccineInfo,
                              i18n._language
                            )}
                        </div>
                        <div
                          style={{ flexGrow: 1 }}
                          className={styles.divTableItemContents}
                        >
                          {immunizationValue.occurrenceDateTime &&
                            immunizationValue.occurrenceDateTime}
                        </div>
                        <div
                          style={{ flexGrow: 1 }}
                          className={styles.divTableItemContents}
                        >
                          {immunizationValue.note && immunizationValue.note}
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          )}
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

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(ViewSection))
