import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin, Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'

import VitalSignsFinding from './VitalSignsFinding/PrintInspectionNote'
import GeneralPhysicalFinding from './GeneralPhysicalFinding/PrintInspectionNote'
import PhysicalFindingsOfRespiratorySystem from './PhysicalFindingsOfRespiratorySystem/PrintInspectionNote'
import PhysicalFindingsOfCardiovascularSystem from './PhysicalFindingsOfCardiovascularSystem/PrintInspectionNote'
import PhysicalFindingsOfGastrointestinalSystem from './PhysicalFindingsOfGastrointestinalSystem/PrintInspectionNote'
import PhysicalFindingsOfGenitourinaryTract from './PhysicalFindingsOfGenitourinaryTract/PrintInspectionNote'
import PhysicalFindingsOfNervousSystem from './PhysicalFindingsOfNervousSystem/PrintInspectionNote'
import PhysicalFindingsSensation from './PhysicalFindingsSensation/PrintInspectionNote'

const ExaminationDataSection = props => {
  const { dataSource, valueSetType } = props

  switch (valueSetType) {
    case 'VitalSignsFinding':
      return <VitalSignsFinding dataSource={dataSource} />
    case 'GeneralPhysicalFinding':
      return <GeneralPhysicalFinding dataSource={dataSource} />
    case 'PhysicalFindingsOfRespiratorySystem':
      return <PhysicalFindingsOfRespiratorySystem dataSource={dataSource} />
    case 'PhysicalFindingsOfCardiovascularSystem':
      return <PhysicalFindingsOfCardiovascularSystem dataSource={dataSource} />
    case 'PhysicalFindingsOfGastrointestinalSystem':
      return (
        <PhysicalFindingsOfGastrointestinalSystem dataSource={dataSource} />
      )
    case 'PhysicalFindingsOfGenitourinaryTract':
      return <PhysicalFindingsOfGenitourinaryTract dataSource={dataSource} />
    case 'PhysicalFindingsOfNervousSystem':
      return <PhysicalFindingsOfNervousSystem dataSource={dataSource} />
    case 'PhysicalFindingsSensation':
      return <PhysicalFindingsSensation dataSource={dataSource} />
    default:
      return <div />
  }
}

const PrintInspectionNotes = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedExamination } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientExamination, setPatientExamination] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryInspectionNote',
        })
        .then(examinationList => {
          if (!!examinationList) {
            setPatientExamination(examinationList)
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
  }, [lastUpdatedExamination])

  return (
    <Row>
      <Spin spinning={loadingData}>
        <Row className="title">Эмчийн үзлэгийн тэмдэглэл</Row>
        <br />
        {patientExamination ? (
          patientExamination.patientPhysicalExaminationList ? (
            patientExamination.patientPhysicalExaminationList.map(
              examinationValue => {
                return (
                  <div>
                    <Row>
                      {Object.keys(examinationValue.include).map(
                        examinationInclude => {
                          return (
                            <Col span={12}>
                              <ExaminationDataSection
                                dataSource={
                                  examinationValue.include[examinationInclude]
                                }
                                valueSetType={examinationInclude}
                              />
                            </Col>
                          )
                        }
                      )}
                    </Row>
                    <br />
                  </div>
                )
              }
            )
          ) : (
            patientExamination.patientBriefHistoryList &&
            patientExamination.patientBriefHistoryList.map(examinationValue => {
              return (
                <div>
                  <Row>
                    {Object.keys(examinationValue.include).map(
                      examinationInclude => {
                        return (
                          <Col span={12}>
                            <ExaminationDataSection
                              dataSource={
                                examinationValue.include[examinationInclude]
                              }
                              valueSetType={examinationInclude}
                            />
                          </Col>
                        )
                      }
                    )}
                  </Row>
                  <br />
                </div>
              )
            })
          )
        ) : (
          <Row type="flex" gutter={8} style={{ padding: '4px' }}>
            <Col>Эмчийн үзлэг:</Col>
            <Col>{i18n.t`No`}</Col>
          </Row>
        )}
      </Spin>
    </Row>
  )
}

PrintInspectionNotes.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile }) => ({
  app,
  practitioner_patient_profile,
}))(withI18n()(PrintInspectionNotes))
