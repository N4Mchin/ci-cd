import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Tabs, Col, Row, Skeleton } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { isObject } from 'utils/helper'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../styles.less'

const TableRow = props => {
  const { dataSource, language } = props
  const { evidence, conditionValues, testNames, treatmentGiven } = dataSource
  const previouslyMadeTestList = []
  const treatmentGivenList = []

  testNames &&
    Object.values(testNames.value).forEach(testName => {
      previouslyMadeTestList.push(resolveDisplay(testName, language))
    })

  treatmentGiven &&
    Object.values(treatmentGiven.value).forEach(treatment => {
      treatmentGivenList.push(resolveDisplay(treatment, language))
    })

  return (
    <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
      <Row type="flex">
        <Col span={2}>
          <div className={styles.firstField}>
            {conditionValues.recordedDate}
          </div>
        </Col>
        <Col span={2}>
          <div className={styles.firstField}>
            {conditionValues.practitioner}
          </div>
        </Col>
        <Col span={20}>
          {Object.values(evidence).map((evidenceValue, index) => {
            const backgroundColor =
              parseInt(index) % 2 === 0 ? '#e5e5e9' : '#f5f5f5'

            return (
              <div>
                {evidenceValue && evidenceValue.value !== undefined && (
                  <Row type="flex" style={{ padding: '0, 2px' }}>
                    <Col span={12}>
                      <div
                        className={styles.thirdField}
                        style={{ background: backgroundColor }}
                      >
                        {resolveDisplay(evidenceValue, language)}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div
                        className={styles.thirdField}
                        style={{ background: backgroundColor }}
                      >
                        {isObject(evidenceValue.value)
                          ? resolveDisplay(evidenceValue.value, language)
                          : evidenceValue && evidenceValue.value}
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            )
          })}
          {testNames && (
            <Row type="flex" style={{ padding: '0, 2px' }}>
              <Col span={12}>
                <div className={styles.thirdField}>
                  {resolveDisplay(testNames, language)}
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.thirdField}>
                  {previouslyMadeTestList.join(', ')}
                </div>
              </Col>
            </Row>
          )}
          {treatmentGiven && (
            <Row type="flex" style={{ padding: '0, 2px' }}>
              <Col span={12}>
                <div className={styles.thirdField}>
                  {resolveDisplay(treatmentGiven, language)}
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.thirdField}>
                  {treatmentGivenList.join(', ')}
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  )
}

const HistoryOfPresentIllness = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedHistoryOfPresentIllness } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientHistory, setPatientHistory] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryHistoryOfPresentIllness',
        })
        .then(historyOfPresenIllnesList => {
          if (!!historyOfPresenIllnesList) {
            setPatientHistory(historyOfPresenIllnesList)
          } else {
            setPatientHistory()
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedHistoryOfPresentIllness])

  return (
    <div>
      <Skeleton loading={loadingData} active rows={3}>
        {patientHistory &&
          patientHistory.map(patientHistoryValue => {
            return (
              <TableRow
                dataSource={patientHistoryValue}
                language={i18n._language}
              />
            )
          })}
      </Skeleton>

      <Button type="primary" block style={{ height: '30px' }}>
        <Trans id={'Seemore'} />
      </Button>
    </div>
  )
}

HistoryOfPresentIllness.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(HistoryOfPresentIllness))
