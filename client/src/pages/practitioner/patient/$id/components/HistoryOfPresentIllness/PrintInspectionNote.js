import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

const PrintInspectionNote = props => {
  const { i18n, app, practitioner_patient_profile } = props
  const { HistoryOfPresentIllness } = app.FHIR_CODES
  const { lastUpdatedHistoryOfPresentIllness } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientHistory, setPatientHistory] = useState()

  async function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryHistoryOfPresentIllness',
        })
        .then(historyOfPresenIllnesList => {
          if (!!historyOfPresenIllnesList) {
            setPatientHistory(historyOfPresenIllnesList)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(setLoadingData(false))
    )
  }

  console.log(patientHistory)

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedHistoryOfPresentIllness])

  const title = resolveDisplay(HistoryOfPresentIllness, i18n._language)
  // const title = Үйлчлүүлэгчийн одоогийн өвчний түүх

  return (
    <Row>
      <Row className="title">{title}</Row>
      {patientHistory ? (
        patientHistory.map(patientHistoryValue => {
          const {
            Complaint,
            Diagnosis,
            TimeOfSymptomOnset,
            PreviouslyMadeTest,
            ConditionDueToExtension,
            PreviouslyVisitedHospital,
          } = patientHistoryValue.evidence

          return (
            <div>
              <Row style={{ padding: '4px' }}>
                {TimeOfSymptomOnset && TimeOfSymptomOnset.value && (
                  <Row>
                    <Col span={10}>Өвчин хэзээ эхэлсэн болох :</Col>
                    <Col span={10}>{TimeOfSymptomOnset.value}</Col>
                  </Row>
                )}
                {Diagnosis && Diagnosis.value && (
                  <Row>
                    <Col span={10}>Илэрсэн онош: </Col>
                    <Col span={10}>{Diagnosis.value}</Col>
                  </Row>
                )}
                {Complaint && Complaint.value && (
                  <Row>
                    <Col span={10}>Илэрсэн зовуурь: </Col>
                    <Col span={10}>
                      {resolveDisplay(Complaint.value, i18n._language)}
                    </Col>
                  </Row>
                )}
                {PreviouslyVisitedHospital && PreviouslyVisitedHospital.value && (
                  <Row>
                    <Col span={10}>Энд ирэхээс өмнө хаана үзүүлсэн болох:</Col>
                    <Col span={10}>
                      {resolveDisplay(
                        PreviouslyVisitedHospital.value,
                        i18n._language
                      )}
                    </Col>
                  </Row>
                )}
                {PreviouslyMadeTest && PreviouslyMadeTest.value && (
                  <Row>
                    <Col span={10}>Хийлгэсэн шинжилгээ :</Col>
                    <Col span={10}>
                      {resolveDisplay(PreviouslyMadeTest.value, i18n._language)}
                    </Col>
                  </Row>
                )}
                {ConditionDueToExtension && (
                  <Row gutter={8}>
                    <Col span={10}>{i18n.t`Condition due to extension`}</Col>
                    <Col span={10}>{ConditionDueToExtension.value}</Col>
                  </Row>
                )}
              </Row>
              <br />
            </div>
          )
        })
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Өвчний түүх: </Col>
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
