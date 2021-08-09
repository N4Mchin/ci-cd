import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
const moment = require('moment')

const Stats = props => {
  const { startDate, endDate } = props
  const [totalRegisteredCustomers, setTotalRegisteredCustomers] = useState()
  const [totalSpecimen, setTotalSpecimen] = useState()
  const [biochemistrySpecimen, setBiochemistrySpecimen] = useState()
  const [immunologySpecimen, setImmunologySpecimen] = useState()
  const [viralLoadTestSpecimen, setViralLoadTestSpecimen] = useState()

  async function refresh() {
    return await props
      .dispatch({
        type: 'phlebotomy_dashboard/getStats',
        payload: {
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
        },
      })
      .then(data => {
        setTotalRegisteredCustomers(data.totalRegisteredCustomers)
        setTotalSpecimen(data.totalSpecimen)
        setBiochemistrySpecimen(data.biochemistrySpecimen)
        setImmunologySpecimen(data.immunologySpecimen)
        setViralLoadTestSpecimen(data.viralLoadTestSpecimen)
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    refresh()
  }, [startDate, endDate])

  return (
    <div className={styles.containerStatBox}>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Total </span>
            <span>Customers</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{totalRegisteredCustomers}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>New </span>
            <span>Customers</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{0}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Total </span>
            <span>Specimen</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{totalSpecimen}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
              Biochemistry{' '}
            </span>
            <span>Specimen</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{biochemistrySpecimen}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
              Immunology{' '}
            </span>
            <span>Specimen</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{immunologySpecimen}</span>
        </div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
              VIRAL LOAD{' '}
            </span>
            <span>Specimen</span>
          </Trans>
        </div>
        <div className={styles.statBoxDetail}>
          <span>{viralLoadTestSpecimen}</span>
        </div>
      </div>

      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
              Cancelled{' '}
            </span>
            <span>Specimen</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{0}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Revoked </span>
            <span>Specimen</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{0}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Extra </span>
            <span>Blood</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{0}</span>
        </div>
      </div>
    </div>
  )
}

Stats.propTypes = {
  phlebotomy_dashboard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy_dashboard, loading }) => ({
  app,
  phlebotomy_dashboard,
  loading,
}))(withI18n()(Stats))
