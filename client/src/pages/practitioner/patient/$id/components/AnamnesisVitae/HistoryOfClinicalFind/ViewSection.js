import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Row, Spin } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { isObject, isArray } from 'utils/helper'
import styles from './../../../styles.less'
import { toLocalDateTime } from 'utils/datetime'

const TableRow = props => {
  const { dataSource, language, i18n } = props

  return (
    <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
      {Object.keys(dataSource).map((dataSourceValue, index) => {
        const backgroundColor =
          parseInt(index) % 2 === 0 ? '#e5e5e9' : '#f5f5f5'

        const arrayValue = []

        if (
          dataSource[dataSourceValue] &&
          dataSource[dataSourceValue].value &&
          isObject(dataSource[dataSourceValue].value)
        ) {
          Object.values(dataSource[dataSourceValue].value).forEach(value => {
            const display = [
              resolveDisplay(value.value, language),
              value.text && `(${value.text})`,
            ]
              .filter(val => !!val)
              .join(' ')

            arrayValue.push(display)
          })
        } else if (dataSource[dataSourceValue]) {
          if (typeof dataSource[dataSourceValue].value === 'boolean') {
            arrayValue.push(
              dataSource[dataSourceValue].value ? i18n.t`Yes` : i18n.t`No`
            )
          } else {
            arrayValue.push(dataSource[dataSourceValue].value)
          }
        }

        return (
          <Row>
            {arrayValue.length > 0 && (
              <Col span={12}>
                <div
                  className={styles.thirdField}
                  style={{ background: backgroundColor }}
                >
                  {resolveDisplay(dataSource[dataSourceValue], language)}
                </div>
              </Col>
            )}
            {arrayValue.length > 0 && (
              <Col span={12}>
                <div
                  className={styles.thirdField}
                  style={{ background: backgroundColor }}
                >
                  {arrayValue.join(', ')}
                </div>
              </Col>
            )}
          </Row>
        )
      })}
    </div>
  )
}

const ViewSection = props => {
  const { i18n, app, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile
  const {
    HistoryOfClinicalFindingInSubject,
  } = app.FHIR_CODES.AnamnesisVitae.include

  const {
    PerformedProcedure,
    ProcedureComplication,
    ProcedurePerformedDate,
    ProcedureComplicationDetails,
  } = HistoryOfClinicalFindingInSubject.include

  const [loadingData, setLoadingData] = useState(false)
  const [patientClinicalHistory, setPatientClinicalHistory] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryHistoryOfClinicalFind',
        })
        .then(historyOfClinicalFind => {
          if (!!historyOfClinicalFind) {
            console.log(historyOfClinicalFind)
            setPatientClinicalHistory(historyOfClinicalFind)
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

  const title = resolveDisplay(
    HistoryOfClinicalFindingInSubject,
    i18n._language
  )
  console.log(patientClinicalHistory)
  return (
    <div>
      <BorderCollapse
        displayName={title}
        bordered={true}
        disableCollapse={props.disableCollapse}
      >
        <Spin spinning={loadingData}>
          <div className={styles.cardContainer}>
            {patientClinicalHistory &&
              patientClinicalHistory.otherValues &&
              patientClinicalHistory.otherValues.map(clinicalHistoryValue => {
                return (
                  <TableRow
                    i18n={i18n}
                    language={i18n._language}
                    dataSource={clinicalHistoryValue}
                  />
                )
              })}
          </div>
          <div>
            {patientClinicalHistory &&
              patientClinicalHistory.procedureValues.length > 0 && (
                <Row style={{ border: '1px solid #c9c9c9' }}>
                  <Col span={5} style={{ padding: '4px 8px' }}>
                    <div
                      className="title"
                      style={{
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {resolveDisplay(ProcedurePerformedDate, i18n._language)}
                    </div>
                  </Col>
                  <Col span={5} style={{ padding: '4px 8px' }}>
                    <div
                      className="title"
                      style={{
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {resolveDisplay(PerformedProcedure, i18n._language)}
                    </div>
                  </Col>
                  <Col span={5} style={{ padding: '4px 8px' }}>
                    <div
                      className="title"
                      style={{
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {resolveDisplay(ProcedureComplication, i18n._language)}
                    </div>
                  </Col>
                  <Col span={5} style={{ padding: '4px 8px' }}>
                    <div
                      className="title"
                      style={{
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {resolveDisplay(
                        ProcedureComplicationDetails,
                        i18n._language
                      )}
                    </div>
                  </Col>
                  <Col span={4} style={{ padding: '4px 8px' }}>
                    <div
                      className="title"
                      style={{
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Trans id="Note" />
                    </div>
                  </Col>
                </Row>
              )}

            {patientClinicalHistory &&
              patientClinicalHistory.procedureValues.length > 0 &&
              patientClinicalHistory.procedureValues.map(datum => {
                let code

                try {
                  code = datum.codeInfo.code.coding[0].code
                } catch (errorInfo) {
                  console.log(errorInfo)
                }

                return (
                  <Row style={{ border: '1px solid #c9c9c9' }}>
                    <Col span={5} style={{ padding: '4px 8px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {datum.date ? datum.date : ''}
                      </div>
                    </Col>
                    <Col span={5} style={{ padding: '4px 8px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {code}&nbsp;
                        {resolveDisplay(datum.codeInfo, i18n._language)}
                      </div>
                    </Col>

                    <Col span={5} style={{ padding: '4px 8px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {datum.complication ? i18n.t`Yes` : i18n.t`No`}
                      </div>
                    </Col>
                    <Col span={5} style={{ padding: '4px 8px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {datum.complicationDetail
                          ? datum.complicationDetail
                          : '-'}
                      </div>
                    </Col>
                    <Col span={4} style={{ padding: '4px 8px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {datum.note &&
                          datum.note.map(note => {
                            return (
                              <div>
                                <span style={{ color: '#999' }}>
                                  {toLocalDateTime(note.time, 'yyyy-mm-dd')}
                                </span>{' '}
                                : {note.text}
                              </div>
                            )
                          })}
                      </div>
                    </Col>
                  </Row>
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
