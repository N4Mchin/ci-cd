import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Row } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import styles from './../../../styles.less'
import { resolveDisplay } from 'utils/valuesets'

const TableRow = props => {
  const { dataSource, language, i18n } = props

  return (
    <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
      {Object.keys(dataSource).map((dataSourceValue, index) => {
        const backgroundColor =
          parseInt(index) % 2 === 0 ? '#e5e5e9' : '#f5f5f5'
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
              <div
                className={styles.thirdField}
                style={{ background: backgroundColor }}
              >
                {typeof dataSource[dataSourceValue].value === 'boolean'
                  ? dataSource[dataSourceValue].value
                    ? i18n.t`Yes`
                    : i18n.t`No`
                  : dataSource[dataSourceValue].value}
              </div>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

const ViewSection = props => {
  const { i18n, app, practitioner_patient_profile } = props
  const { EpidemiologicalAnamnesis } = app.FHIR_CODES.AnamnesisVitae.include
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const tableProps = {
    //rowClassName: record => styles[record.status],
    // loading: loading.effects['reception/query'],
    // pagination,
    // onChange(page) {
    //   handleRefresh({
    //     page: page.current,
    //     pageSize: page.pageSize,
    //   })
    // }
  }

  const [loadingData, setLoadingData] = useState(false)
  const [patientHistory, setPatientHistory] = useState()
  /* #region   */

  async function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryEpidemiologicalAnamnesis',
        })
        .then(historyOfEpidemiologicalAnamnesis => {
          if (!!historyOfEpidemiologicalAnamnesis) {
            setPatientHistory(historyOfEpidemiologicalAnamnesis)
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

  const title = resolveDisplay(EpidemiologicalAnamnesis, i18n._language)

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true} disableCollapse={props.disableCollapse}>
        <div className={styles.cardContainer}>
          {patientHistory &&
            patientHistory.map(epidemiologicalValue => {
              return (
                <TableRow
                  dataSource={epidemiologicalValue}
                  language={i18n._language}
                  i18n={i18n}
                />
              )
            })}
        </div>
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
