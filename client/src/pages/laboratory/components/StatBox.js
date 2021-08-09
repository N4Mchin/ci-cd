import React from 'react'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'

const state = {
  mock: {
    totalClients: 35,
    conductedTests: 68,
    verifiedTests: 66,
    biochemistries: 2,
  },
}

const bigBox = ({ title, amount, disabled }) => {
  return (
    <div className={`${styles.statBigBox} ${disabled && 'bg-gray-5'}`}>
      <div className={styles.statBigBoxLabel}>{title}</div>

      <div className={styles.statBigBoxDetail}>
        <span>{amount}</span>
      </div>
    </div>
  )
}

const StatBox = ({ i18n, disabled }) => {
  return (
    <>
      <div className={styles.containerStatBox}>
        {bigBox({
          title: (
            <Trans>
              <span>Samples Awaited</span>
            </Trans>
          ),
          amount: state.mock.totalClients,
          disabled: disabled,
        })}

        {bigBox({
          title: (
            <Trans>
              <span>Samples Processed</span>
            </Trans>
          ),
          amount: state.mock.conductedTests,
          disabled: disabled,
        })}

        {bigBox({
          title: (
            <Trans>
              <span>Samples Verified</span>
            </Trans>
          ),
          amount: state.mock.verifiedTests,
          disabled: disabled,
        })}

        {bigBox({
          title: (
            <Trans>
              <span>Samples Returned for Inspection</span>
            </Trans>
          ),
          amount: state.mock.biochemistries,
          disabled: disabled,
        })}
      </div>
    </>
  )
}

export default connect(({ labTechnicianProfile, loading }) => ({
  labTechnicianProfile,
  loading,
}))(withI18n()(StatBox))
