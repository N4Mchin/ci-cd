import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'

const PrintInspectionNote = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedComplaint } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientComplaint, setPatientComplaint] = useState([])

  async function refresh() {
    setLoadingData(true)

    return props
      .dispatch({
        type: 'practitioner_patient_profile/queryComplaint',
      })
      .then(result => {
        if (result.patientComplaint) {
          setPatientComplaint(result.patientComplaint)
        } else {
          setPatientComplaint()
        }
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedComplaint])

  if (patientComplaint.length !== 0) {
    const firstItem = { ...patientComplaint[0] }
    const complaint = Object.values(firstItem)
    const complaintObject = { ...complaint[1] }
    const condition = Object.values(complaintObject)
    return (
      <Row>
        <Row className="title">Зовуурь </Row>
        {condition &&
          condition.map(complaintItem => {
            const complaint = Object.values(complaintItem)
            const complaintObject = { ...complaint[0] }
            return (
              <Row>
                <Col span={8}>
                  Илэрсэн зовуурь
                  {complaintObject && (
                    <Row>
                      {Object.keys(complaintObject).map(key => (
                        <Col>
                          {complaintObject[key].complaint
                            ? complaintObject[key].complaint.designation[1]
                                .value
                            : ''}
                        </Col>
                      ))}
                    </Row>
                  )}
                </Col>
                <Col span={8}>
                  Биеийн байрлал
                  {complaintObject && (
                    <Row>
                      {Object.keys(complaintObject).map(key => (
                        <Col>
                          {complaintObject[key].bodySite
                            ? complaintObject[key].bodySite.designation[1].value
                            : ''}
                        </Col>
                      ))}
                    </Row>
                  )}
                </Col>
                <Col span={8}>
                  Нэмэлт тайлбар
                  {complaintObject && (
                    <Row>
                      {Object.keys(complaintObject).map(key => (
                        <Col>
                          {complaintObject[key].note
                            ? complaintObject[key].note
                            : ''}
                        </Col>
                      ))}
                    </Row>
                  )}
                </Col>
              </Row>
            )
          })}
      </Row>
    )
  } else {
    return <Row type="flex" gutter={8} style={{ padding: '4px' }}></Row>
  }
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
