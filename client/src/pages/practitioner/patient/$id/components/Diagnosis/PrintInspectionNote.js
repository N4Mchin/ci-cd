import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'

const PrintInspectionNote = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedDiagnosis } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientDiagnosisList, setPatientDiagnosisList] = useState()

  async function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryDiagnosis',
        })
        .then(diagnosisList => {
          console.log(diagnosisList)
          if (!!diagnosisList) {
            setPatientDiagnosisList(diagnosisList)
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
  }, [lastUpdatedDiagnosis])

  return (
    <Row>
      <Row className="title">Оношилгоо </Row>
      {patientDiagnosisList ? (
        <Row>
          {patientDiagnosisList.map(diagnosisValue => {
            return (
              <Row>
                <Row className="title">Онош</Row>
                {diagnosisValue.basicDiagnosis && (
                  <div>
                    <Row type="flex" gutter={8}>
                      <Col span={8}>{i18n.t`Primary diagnosis`}</Col>
                      <Col className="bold" span={8}>
                        {diagnosisValue.basicDiagnosis.display}
                        {diagnosisValue.basicDiagnosis.text &&
                          `(\n${diagnosisValue.basicDiagnosis.text})`}
                      </Col>
                    </Row>
                    {diagnosisValue.basicDiagnosisNote && (
                      <Row type="flex" gutter={8}>
                        <Col span={8}>{i18n.t`Notes of primary diagnosis`}</Col>
                        <Col className="bold" span={8}>
                          {diagnosisValue.basicDiagnosisNote}
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
                {diagnosisValue.diagnosis && (
                  <div>
                    <Row type="flex" gutter={8}>
                      <Col span={8}>{i18n.t`Dual diagnosis`}</Col>
                      <Col className="bold" span={8}>
                        {diagnosisValue.diagnosis &&
                          diagnosisValue.diagnosis.display}
                        <br />
                        {diagnosisValue.diagnosis &&
                          `(\n${diagnosisValue.diagnosis.text})`}
                      </Col>
                    </Row>
                    {diagnosisValue.diagnosisNote && (
                      <Row type="flex" gutter={8}>
                        <Col span={8}>{i18n.t`Notes of dual diagnoisis`}</Col>
                        <Col className="bold" span={8}>
                          {diagnosisValue.diagnosisNote}
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
              </Row>
            )
          })}
        </Row>
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Оношилгоо:</Col>
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
