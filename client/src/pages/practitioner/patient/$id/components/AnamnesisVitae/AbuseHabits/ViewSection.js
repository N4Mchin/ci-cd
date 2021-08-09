import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin, Col, Row } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { isObject } from 'utils/helper'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../../styles.less'
import moment from 'moment'

const DurationDisplay = props => {
  const duration = moment.duration(props.duration)
  return (
    <span>
      {duration.years() > 0 && (
        <>
          {duration.years()}&nbsp;
          <Trans id="Years" />
          &nbsp;
        </>
      )}
      {duration.months() > 0 && (
        <>
          {duration.months()}&nbsp;
          <Trans id="Months" />
          &nbsp;
        </>
      )}
      {duration.days() > 0 && (
        <>
          {duration.days()}&nbsp;
          <Trans id="Days" />
        </>
      )}
    </span>
  )
}

const TableRow = props => {
  const { dataSource, language, i18n } = props

  return (
    <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
      {Object.keys(dataSource).map((dataSourceValue, index) => {
        const backgroundColor =
          parseInt(index) % 2 === 0 ? '#e5e5e9' : '#f5f5f5'
        console.log(
          dataSource[dataSourceValue],
          language,
          dataSource[dataSourceValue].valueType,
          i18n.t`${dataSource[dataSourceValue].valueType}`
        )
        return (
          <Row>
            <Col span={12}>
              <div
                className={styles.thirdField}
                style={{ background: backgroundColor }}
              >
                {resolveDisplay(dataSource[dataSourceValue], language)}
              </div>
            </Col>
            <Col span={12}>
              {isObject(dataSource[dataSourceValue].value) ? (
                <div
                  className={styles.thirdField}
                  style={{ background: backgroundColor }}
                >
                  {resolveDisplay(dataSource[dataSourceValue].value, language)}
                </div>
              ) : (
                <div
                  className={styles.thirdField}
                  style={{ background: backgroundColor }}
                >
                  {dataSource[dataSourceValue].valueType ? (
                    dataSource[dataSourceValue].valueType === 'MilliSeconds' ? (
                      <DurationDisplay
                        duration={dataSource[dataSourceValue].value}
                      />
                    ) : (
                      <span>
                        {dataSource[dataSourceValue].value}&nbsp;
                        <Trans id={dataSource[dataSourceValue].valueType} />
                      </span>
                    )
                  ) : (
                    dataSource[dataSourceValue].value
                  )}
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
  const { app, i18n, practitioner_patient_profile } = props
  const {
    SmokingDrinkingSubstanceAbuseHabits,
  } = app.FHIR_CODES.AnamnesisVitae.include
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientAbuseHabits, setPatientAbuseHabits] = useState()

  function refresh() {
    setLoadingData(true)

    return props
      .dispatch({
        type:
          'practitioner_patient_profile/querySmokingDrinkingSubstanceAbuseHabits',
      })
      .then(patientAbuseHabitsList => {
        if (!!patientAbuseHabitsList) {
          setPatientAbuseHabits(patientAbuseHabitsList)
        }
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  const title = resolveDisplay(
    SmokingDrinkingSubstanceAbuseHabits,
    i18n._language
  )

  return (
    <div>
      <BorderCollapse
        displayName={title}
        bordered={true}
        disableCollapse={props.disableCollapse}
      >
        <Spin spinning={loadingData}>
          <div className={styles.cardContainer}>
            {patientAbuseHabits &&
              patientAbuseHabits.map(abuseHabitsValue => {
                return (
                  <TableRow
                    i18n={i18n}
                    dataSource={abuseHabitsValue}
                    language={i18n._language}
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
