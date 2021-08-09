import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

const PrintInspectionNote = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientMedicationStatement, setPatientMedicationStatement] = useState()

  async function refresh() {
    setLoadingData(true)

    return props
      .dispatch({
        type: 'practitioner_patient_profile/queryMedicationStatement',
      })
      .then(medicationStatementList => {
        if (!!medicationStatementList) {
          setPatientMedicationStatement(medicationStatementList)
        }
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(setLoadingData(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  return (
    <Row>
      <Row className="title">
        Үйлчлүүлэгчийн хэрэглэж байгаа эмийн талаарх мэдээлэл
      </Row>
      {patientMedicationStatement ? (
        patientMedicationStatement.map(medicationStatementValue => {
          const {
            note,
            status,
            dosage,
            startingDate,
            doseQuantity,
            drugInformation,
            lengthOfMedication,
          } = medicationStatementValue

          const statusValue = <Trans id={status === 'active' ? 'Yes' : 'No'} />

          return (
            <div>
              <Row style={{ padding: '4px' }}>
                <Col span={10}>
                  {drugInformation && (
                    <Row type="flex" gutter={8}>
                      <Col>Олон улсын нэршил (Эмийн нэр){':'}</Col>
                      <Col>
                        {' '}
                        {resolveDisplay(
                          drugInformation.InternationalProprietaryName,
                          i18n._language
                        )}
                      </Col>
                    </Row>
                  )}
                  {drugInformation && (
                    <Row type="flex" gutter={8}>
                      <Col>Худалдааны нэршил (Эмийн нэр){':'}</Col>
                      <Col>
                        {' '}
                        {resolveDisplay(
                          drugInformation.ProprietaryName,
                          i18n._language
                        )}
                      </Col>
                    </Row>
                  )}
                  {statusValue && (
                    <Row type="flex" gutter={8}>
                      <Col>Яг одоогоор хэрэглэж буй эсэх{':'}</Col>
                      <Col> {statusValue}</Col>
                    </Row>
                  )}
                  {lengthOfMedication && (
                    <Row type="flex" gutter={8}>
                      <Col>Хэр удаан хэрэглэсэн болох{':'}</Col>
                      <Col>
                        {' '}
                        {lengthOfMedication} {i18n.t`month`}
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col span={10}>
                  {dosage && (
                    <Row type="flex" gutter={8}>
                      <Col>Өдөрт хэдэн ширхгээр уудаг болох{':'}</Col>
                      <Col> {`${dosage.value} ${dosage.unit}`}</Col>
                    </Row>
                  )}
                  {startingDate && (
                    <Row type="flex" gutter={8}>
                      <Col>Хэзээнээс хэрэглэсэн болох{':'}</Col>
                      <Col> {startingDate}</Col>
                    </Row>
                  )}
                  {doseQuantity && (
                    <Row type="flex" gutter={8}>
                      <Col>Эмийн тун{':'}</Col>
                      <Col> {doseQuantity}</Col>
                    </Row>
                  )}
                  {note && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {i18n.t`Note`}
                        {':'}
                      </Col>
                      <Col> {note}</Col>
                    </Row>
                  )}
                </Col>
              </Row>
              <br />
            </div>
          )
        })
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Үйлчлүүлэгчийн хэрэглэж байгаа эм:</Col>
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
