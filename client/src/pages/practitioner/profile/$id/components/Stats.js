import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
const moment = require('moment')

const Stats = props => {
  const { startDate, endDate } = props
  const [totalRegisteredCustomers, setTotalRegisteredCustomers] = useState()
  const [newCustomers, setNewCustomers] = useState()
  const [totalCounselling, setTotalCounselling] = useState()
  const [totalLaboratoryProcedures, setTotalLaboratoryProcedures] = useState()
  const [totalImaging, setTotalImaging] = useState()
  const [insurance, setInsurance] = useState()
  const [customersDiscount, setCustomersDiscount] = useState()

  async function refresh() {
    return await props
      .dispatch({
        type: 'practitionerProfile/getStats',
        payload: {
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
        },
      })
      .then(data => {
        console.log('dataaaaaaaaaaaaaaaaaaaaaaaa',data)
        setTotalRegisteredCustomers(data.totalRegisteredCustomers)
        setNewCustomers(data.newCustomers)
        setTotalCounselling(data.totalCounselling)
        setTotalLaboratoryProcedures(data.totalLaboratoryProcedures)
        setTotalImaging(data.Imaging)
        setInsurance(data.insurance)
        setCustomersDiscount(data.customersDiscount)
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
            <span>Registered Customers</span>
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
            <span>Registrations</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{newCustomers}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Checkup </span>
            <span>Orders</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{totalCounselling}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Lab Test </span>
            <span>Order</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{totalLaboratoryProcedures}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
              Diagnostic Test{' '}
            </span>
            <span>Orders</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{totalImaging}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Lab Test </span>
            <span>Result advisory</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          {/* <span>{stat.labResults}</span> */}
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
              Insurance{' '}
            </span>
            <span>Services</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{insurance}</span>
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Research </span>
            <span>Services</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          {/* <span>{stat.researchServices}</span> */}
        </div>
      </div>
      <div className={styles.statBox}>
        <div className={styles.statBoxLabel}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
              Discounted{' '}
            </span>
            <span>Services</span>
          </Trans>
        </div>

        <div className={styles.statBoxDetail}>
          <span>{customersDiscount}</span>
        </div>
      </div>
    </div>
  )
}

Stats.propTypes = {
  laboratory_dashboard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitionerProfile, loading }) => ({
  app,
  practitionerProfile,
  loading,
}))(withI18n()(Stats))
