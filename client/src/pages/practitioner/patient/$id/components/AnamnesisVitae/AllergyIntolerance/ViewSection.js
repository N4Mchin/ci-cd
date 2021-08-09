import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin, Col, Row } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { isObject } from 'utils/helper'
import styles from './../../../styles.less'

const ViewSection = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientAllergyIntolerance, setPatientAllergyIntolerance] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryAllergicIntolerance',
        })
        .then(allergyIntoleranceList => {
          if (!!allergyIntoleranceList) {
            setPatientAllergyIntolerance(allergyIntoleranceList)
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
  }, [lastUpdatedAnamnesisVitae])

  const title = <Trans id="Allergy questionnaire" />

  return (
    <div>
      <BorderCollapse
        displayName={title}
        bordered={true}
        disableCollapse={props.disableCollapse}
      >
        <Spin spinning={loadingData}>
          <div className={styles.cardContainer}>
            {patientAllergyIntolerance &&
              Object.keys(patientAllergyIntolerance).map(dateValue => {
                const allergyValues = []
                const allergyValueNotes = []

                patientAllergyIntolerance[dateValue].forEach(v => {
                  if (isObject(v)) {
                    allergyValues.push(resolveDisplay(v, i18n._language))
                  } else {
                    allergyValueNotes.push(v)
                  }
                })

                return (
                  <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
                    <Row type="flex">
                      <Col span={12}>
                        <div
                          className={styles.thirdField}
                          style={{ background: '#e5e5e9' }}
                        >
                          <Trans
                            id={'Allergic medication, substance and food:'}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          className={styles.thirdField}
                          style={{ background: '#e5e5e9' }}
                        >
                          {allergyValues.join(', ')}
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          className={styles.thirdField}
                          style={{ background: '#f5f5f5' }}
                        >
                          <Trans
                            id={
                              'If your allergic medication, substance and food is absence in the list. Please write here.'
                            }
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div
                          className={styles.thirdField}
                          style={{ background: '#f5f5f5' }}
                        >
                          {allergyValueNotes.join(', ')}
                        </div>
                      </Col>
                    </Row>
                  </div>
                )
              })}
          </div>
        </Spin>
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
