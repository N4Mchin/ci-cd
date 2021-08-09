import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Row, Spin } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { isObject } from 'utils/helper'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../../styles.less'

const TableRow = props => {
  const { dataSource, language, i18n } = props

  return (
    <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
      {Object.values(dataSource).map((dataSourceValue, index) => {
        const arrayValues = []
        const backgroundColor =
          parseInt(index) % 2 === 0 ? '#e5e5e9' : '#f5f5f5'

        console.log(dataSourceValue)

        if (isObject(dataSourceValue.value)) {
          Object.keys(dataSourceValue.value).forEach(keyName => {
            const display = [
              resolveDisplay(dataSourceValue.value[keyName].value, language),
              dataSourceValue.value[keyName].text &&
                `(${dataSourceValue.value[keyName].text})`,
            ]
              .filter(val => !!val)
              .join(' ')

            arrayValues.push(display)
          })
        }

        return (
          <Row>
            <Col span={12}>
              <div
                className={styles.thirdField}
                style={{ background: backgroundColor }}
              >
                {resolveDisplay(dataSourceValue, language)}
              </div>
            </Col>
            <Col span={12}>
              {isObject(dataSourceValue.value) ? (
                <div
                  className={styles.thirdField}
                  style={{ background: backgroundColor }}
                >
                  {arrayValues.join(', ')}
                </div>
              ) : (
                <div
                  className={styles.thirdField}
                  style={{ background: backgroundColor }}
                >
                  {typeof dataSourceValue.value === 'boolean'
                    ? dataSourceValue.value
                      ? i18n.t`Yes`
                      : i18n.t`No`
                    : dataSourceValue.value}
                </div>
              )}
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

const ViewSection = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientHistory, setPatientHistory] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryBriefHistoryOfPatient',
        })
        .then(patientBriefHistoryOfPatientList => {
          if (!!patientBriefHistoryOfPatientList) {
            setPatientHistory(patientBriefHistoryOfPatientList)
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

  const title = <Trans id="Brief history of patient" />

  return (
    <div>
      <BorderCollapse
        displayName={title}
        bordered={true}
        disableCollapse={props.disableCollapse}
      >
        <Spin spinning={loadingData}>
          <div className={styles.cardContainer}>
            {patientHistory &&
              patientHistory.map(patientHistoryValue => {
                return (
                  <TableRow
                    dataSource={patientHistoryValue}
                    language={i18n._language}
                    i18n={i18n}
                  />
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
