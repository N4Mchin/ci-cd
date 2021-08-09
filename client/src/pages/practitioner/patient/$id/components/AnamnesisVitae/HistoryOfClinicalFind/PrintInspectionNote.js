import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { isObject } from 'utils/helper'
import { isEmptyObject } from 'utils/helper'

const PrintInspectionNote = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientClinicalHistory, setPatientClinicalHistory] = useState()

  async function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryHistoryOfClinicalFind',
        })
        .then(historyOfClinicalFind => {
          if (!!historyOfClinicalFind) {
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

  console.log(patientClinicalHistory)

  return (
    <Row>
      <Row className="title">Урьд өвчилсөн өвчин, эмгэгийн байдал</Row>
      {patientClinicalHistory ? (
        patientClinicalHistory.otherValues &&
        patientClinicalHistory.otherValues.map(dataSourceValue => {
          return (
            <div>
              {!isEmptyObject(dataSourceValue) &&
                Object.keys(dataSourceValue).map(clinicalHistoryKey => {
                  const arrayValue = []

                  if (
                    (clinicalHistoryKey === 'historyOfInfectiousDisease' ||
                      clinicalHistoryKey === 'chronicDisease') &&
                    dataSourceValue[clinicalHistoryKey] &&
                    dataSourceValue[clinicalHistoryKey].value &&
                    isObject(dataSourceValue[clinicalHistoryKey].value)
                  ) {
                    Object.values(
                      dataSourceValue[clinicalHistoryKey].value
                    ).forEach(value =>
                      arrayValue.push(resolveDisplay(value, i18n._language))
                    )
                  }

                  return (
                    <Row style={{ padding: '4px' }}>
                      {arrayValue.length > 0 && (
                        <Col span={8}>
                          {resolveDisplay(
                            dataSourceValue[clinicalHistoryKey],
                            i18n._language
                          )}
                        </Col>
                      )}
                      {arrayValue.length > 0 && (
                        <Col span={8}>{arrayValue.join(', ')}</Col>
                      )}
                    </Row>
                  )
                })}
              <br />
            </div>
          )
        })
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Урьд өвчилсөн өвчин: </Col>
          <Col>{i18n.t`No`}</Col>
        </Row>
      )}
    </Row>
  )
}

PrintInspectionNote.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile }) => ({
  app,
  practitioner_patient_profile,
}))(withI18n()(PrintInspectionNote))
