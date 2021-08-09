import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
const moment = require('moment')

const box = ({ titleBold, titleRegular, amount }) => {
  return (
    <div className={styles.statBox}>
      <div className={styles.statBoxLabel}>
        <span
          style={{
            fontFamily: 'Helvetica Neue Bold',
            textTransform: 'uppercase',
          }}
        >
          {titleBold}
        </span>
        <span>{titleRegular}</span>
      </div>

      <div className={styles.statBoxDetail}>
        <span>{amount}</span>
      </div>
    </div>
  )
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

const Stats = props => {
  const { startDate, endDate } = props
  const [totalRegisteredCustomers, setTotalRegisteredCustomers] = useState()
  const [conductedTests, setconductedTests] = useState()
  const [verifiedTests, setVerifiedTests] = useState()
  const [unsatisfactorySpecimen, setUnsatisfactorySpecimen] = useState()
  const [biochemistry, setBiochemistry] = useState()
  const [anti_HDV, setAnti_HDV] = useState()
  const [coagulation, setCoagulation] = useState()
  const [ferrritin, setFerritin] = useState()
  const [hematology, setHematology] = useState()
  const [immunology, setImmunology] = useState()
  const [rapidTest, setRapidTest] = useState()
  const [ESR_Test, setESR_Test] = useState()
  const [UrinalysisTest, setUrinalysisTest] = useState()
  const [HCV_RNA_Test, setHCV_RNA_Test] = useState()
  const [HBV_DNA_Test, setHBV_DNA_Test] = useState()
  const [HDV_RNA_Test, setHDV_RNA_Test] = useState()
  const [Vitamin_D3_Test, setVitamin_D3_Test] = useState()
  async function refresh() {
    return await props
      .dispatch({
        type: 'laboratory_dashboard/getStats',
        payload: {
          startDate: moment(startDate).format('YYYY-MM-DD'),
          endDate: moment(endDate).format('YYYY-MM-DD'),
        },
      })
      .then(data => {
        setTotalRegisteredCustomers(data.totalRegisteredCustomers)
        setconductedTests(data.conductedTests)
        setVerifiedTests(data.verifiedTests)
        setUnsatisfactorySpecimen(data.unsatisfactorySpecimen)
        setBiochemistry(data.Biochemistry)
        setAnti_HDV(data.Anti_HDV_Test)
        setCoagulation(data.CoagulationTest)
        setFerritin(data.FerritinTest)
        setHematology(data.HematologyTest)
        setImmunology(data.Immunology)
        setRapidTest(data.RapidTest)
        setESR_Test(data.ESR_Test)
        setUrinalysisTest(data.UrinalysisTest)
        setHCV_RNA_Test(data.HCV_RNA_Test)
        setHBV_DNA_Test(data.HBV_DNA_Test)
        setHDV_RNA_Test(data.HDV_RNA_Test)
        setVitamin_D3_Test(data.Vitamin_D3_Test)
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    refresh()
  }, [startDate, endDate])

  return (
    <>
      <div className={styles.containerStatBox}>
        {' '}
        {bigBox({
          title: (
            <Trans>
              <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
                Total Clients{' '}
              </span>
              <span>of Laboratory</span>
            </Trans>
          ),
          amount: totalRegisteredCustomers,
        })}
        {bigBox({
          title: (
            <Trans>
              <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
                Conducted{' '}
              </span>
              <span>Tests</span>
            </Trans>
          ),
          amount: conductedTests,
        })}
        {bigBox({
          title: (
            <Trans>
              <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
                Verified{' '}
              </span>
              <span>Tests</span>
            </Trans>
          ),
          amount: verifiedTests,
        })}
        {/* {dataSource.map(item => {
          return box({
            titleBold: item.display,
            amount: item.quantity,
          })
        })} */}
        {box({
          titleBold: 'Anti-HDV',
          amount: anti_HDV,
        })}
        {box({
          titleBold: 'Biochemistry',
          amount: biochemistry,
        })}
        {box({
          titleBold: 'Coagulation',
          amount: coagulation,
        })}
        {box({
          titleBold: 'Ferritin',
          amount: ferrritin,
        })}
        {box({
          titleBold: 'Hematology',
          amount: hematology,
        })}
        {box({
          titleBold: 'Immunology',
          amount: immunology,
        })}
        {box({
          titleBold: 'RapidTests',
          amount: rapidTest,
        })}
        {box({
          titleBold: 'ESR',
          amount: ESR_Test,
        })}
        {box({
          titleBold: 'Urinalysis',
          amount: UrinalysisTest,
        })}
        {box({
          titleBold: 'AFP',
          amount: 0,
        })}
        {box({
          titleBold: 'HCV_RNA',
          amount: HCV_RNA_Test,
        })}
        {box({
          titleBold: 'HBV-DNA',
          amount: HBV_DNA_Test,
        })}
        {box({
          titleBold: 'HDV-RNA',
          amount: HDV_RNA_Test,
        })}
        {box({
          titleBold: 'Vitamin D',
          amount: Vitamin_D3_Test,
        })}
        {bigBox({
          title: (
            <Trans>
              <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
                Ineligible{' '}
              </span>
              <span>Samples</span>
            </Trans>
          ),
          amount: unsatisfactorySpecimen,
        })}
        {bigBox({
          title: (
            <Trans>
              <span style={{ fontFamily: 'Helvetica Neue Bold' }}>
                Research{' '}
              </span>
              <span>Samples</span>
            </Trans>
          ),
          amount: 0,
        })}
      </div>
    </>
  )
}

Stats.propTypes = {
  laboratory_dashboard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_dashboard, loading }) => ({
  app,
  laboratory_dashboard,
  loading,
}))(withI18n()(Stats))
