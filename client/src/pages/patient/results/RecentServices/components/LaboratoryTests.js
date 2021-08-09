import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import PrintTestResult from '../../PrintTestResult'
import { Button, Row, Col, Spin } from 'antd'
import styles from '../styles.less'

const RecentTestItem = props => {
  const {
    status,
    display,
    testKey,
    effectiveDate,
    issuedDate,
    authoredOn,
  } = props
  let backgroundColor

  switch (status) {
    case 'registered':
      backgroundColor = '#F44336'
      break
    case 'preliminary':
      backgroundColor = '#FAAD14'
      break
    case 'final':
      backgroundColor = '#00695C'
      break
    default:
      backgroundColor = '#C9C9C9'
      break
  }
  return (
    <div className={styles.recentTestItemContainer}>
      <div className={styles.recentTestItem}>
        <Button
          style={{
            backgroundColor: backgroundColor,
          }}
          className={styles.recentTestItemButton}
          onClick={() => {
            if (status === 'final') {
              props.showPrintDrawer(true)
              props.setSelectedTest(testKey)
            }
          }}
          block
        >
          {display}
        </Button>
      </div>
      <div className={styles.recentTestItemPeriod}>
        <Row gutter={8}>
          <Col span={12} style={{ border: '0.5px solid #C9C9C9' }}>
            <div
              className={styles.recentTestItemPeriodText}
              style={{ color: '#C9C9C9' }}
            >
              <span style={{ margin: 'auto' }}>{authoredOn}</span>
            </div>
          </Col>
          <Col span={12} style={{ border: '0.5px solid #C9C9C9' }}>
            <div
              className={styles.recentTestItemPeriodText}
              style={{ color: '#727272' }}
            >
              <span style={{ margin: 'auto' }}>{issuedDate}</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

const LaboratoryTests = props => {
  const { LatestLabTests = {} } = props.patient_portal
  const { LabTests } = props.app

  const [printDrawerVisible, showPrintDrawer] = useState(false)
  const [selectedTest, setSelectedTest] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState()

  useEffect(() => {
    setLoadingData(true)
    props
      .dispatch({
        type: 'patient_portal/queryLatestLabTest',
      })
      .then(result => setDataSource(result))
      .finally(() => {
        setLoadingData(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [LabTests])

  return (
    <div className={styles.mainContainer}>
      {props.loading.effects['patient_portal/queryLatestLabTest'] && (
        <Row type="flex" justify="center">
          <Spin spinning>
            <div style={{ height: '200px' }}></div>
          </Spin>
        </Row>
      )}

      {!props.loading.effects['patient_portal/queryLatestLabTest'] && (
        <>
          <PrintTestResult
            visible={printDrawerVisible}
            onClose={() => showPrintDrawer(false)}
            data={LatestLabTests[selectedTest]}
          />
          <div className={styles.fixedContainer}>
            <div className={styles.contentWrapper}>
              <div className={styles.overflowContainer}>
                <div className={styles.overflowContent}>
                  {LabTests &&
                    Object.keys(LabTests).map(labTestKey => {
                      const childProps = {
                        testKey: labTestKey,
                        display: LabTests[labTestKey].display,
                      }

                      LatestLabTests[labTestKey] &&
                        Object.assign(childProps, {
                          ...LatestLabTests[labTestKey],
                        })

                      return (
                        <RecentTestItem
                          {...childProps}
                          showPrintDrawer={showPrintDrawer}
                          setSelectedTest={setSelectedTest}
                        />
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

LaboratoryTests.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, patient_portal, loading }) => ({
  app,
  patient_portal,
  loading,
}))(withI18n()(LaboratoryTests))
