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

const bigBox = ({ title, amount }) => {
  return (
    <div className={styles.statBigBox}>
      <div className={styles.statBigBoxLabel}>{title}</div>

      <div className={styles.statBigBoxDetail}>
        <span>{amount}</span>
      </div>
    </div>
  )
}

const StatBox = ({ i18n }) => {
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
        })}

        {bigBox({
          title: (
            <Trans>
              <span>Samples Processed</span>
            </Trans>
          ),
          amount: state.mock.conductedTests,
        })}

        {bigBox({
          title: (
            <Trans>
              <span>Samples Verified</span>
            </Trans>
          ),
          amount: state.mock.verifiedTests,
        })}

        {bigBox({
          title: (
            <Trans>
              <span>Samples Returned for Inspection</span>
            </Trans>
          ),
          amount: state.mock.biochemistries,
        })}
      </div>
    </>
  )
}

export default connect(({ labTechnicianProfile, loading }) => ({
  labTechnicianProfile,
  loading,
}))(withI18n()(StatBox))
