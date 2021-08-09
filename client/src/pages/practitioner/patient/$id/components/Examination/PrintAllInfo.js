import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin, Col, Row, Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../styles.less'

import VitalSignsFinding from './VitalSignsFinding/ViewSection'
import BodyMassIndex from './BodyMassIndex/ViewSection'
import GeneralPhysicalFinding from './GeneralPhysicalFinding/ViewSection'
import PhysicalFindingsOfRespiratorySystem from './PhysicalFindingsOfRespiratorySystem/ViewSection'
import PhysicalFindingsOfCardiovascularSystem from './PhysicalFindingsOfCardiovascularSystem/ViewSection'
import PhysicalFindingsOfGastrointestinalSystem from './PhysicalFindingsOfGastrointestinalSystem/ViewSection'
import PhysicalFindingsOfGenitourinaryTract from './PhysicalFindingsOfGenitourinaryTract/ViewSection'
import PhysicalFindingsOfNervousSystem from './PhysicalFindingsOfNervousSystem/ViewSection'
import PhysicalFindingsSensation from './PhysicalFindingsSensation/ViewSection'

const ExaminationDataSection = props => {
  const { dataSource, valueSetType } = props

  switch (valueSetType) {
    case 'VitalSignsFinding':
      return <VitalSignsFinding dataSource={dataSource} />
    case 'BodyMassIndex':
      return <BodyMassIndex dataSource={dataSource} />
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

const ExaminationViewSection = props => {
  const { app, i18n, practitioner_patient_profile } = props
  const { lastUpdatedExamination } = practitioner_patient_profile
  const {
    BriefGeneralExamination,
    PhysicalExaminationComplete,
  } = app.FHIR_CODES

  const [loadingData, setLoadingData] = useState(false)
  const [patientExamination, setPatientExamination] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryExamination',
        })
        .then(examinationValueList => {
          if (!!examinationValueList) {
            setPatientExamination(examinationValueList)
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

  const title = resolveDisplay(BriefGeneralExamination, i18n._language)

  return (
    <div>
      <Spin spinning={loadingData}>
        {patientExamination &&
          patientExamination.patientBriefHistoryList &&
          patientExamination.patientBriefHistoryList.map(examinationValue => {
            return (
              <Row type="flex" style={{ border: '1px solid black' }}>
                <Col
                  span={24}
                  style={{ fontSize: '14px', textAlign: 'center' }}
                >
                  {resolveDisplay(BriefGeneralExamination, i18n._language)}
                </Col>
                <Col span={4}>
                  <div className={styles.firstField}>
                    {examinationValue.recordedDate}
                  </div>
                </Col>

                <Col span={20}>
                  {Object.keys(examinationValue.include).map(
                    examinationInclude => {
                      return (
                        <ExaminationDataSection
                          dataSource={
                            examinationValue.include[examinationInclude]
                          }
                          valueSetType={examinationInclude}
                        />
                      )
                    }
                  )}
                </Col>
              </Row>
            )
          })}

        {patientExamination &&
          patientExamination.patientPhysicalExaminationList &&
          patientExamination.patientPhysicalExaminationList.map(
            examinationValue => {
              return (
                <Row type="flex" style={{ border: '1px solid black' }}>
                  <Col
                    span={24}
                    style={{ fontSize: '14px', textAlign: 'center' }}
                  >
                    {resolveDisplay(
                      PhysicalExaminationComplete,
                      i18n._language
                    )}
                  </Col>
                  <Col span={4}>
                    <div className={styles.firstField}>
                      {examinationValue.recordedDate}
                    </div>
                  </Col>

                  <Col span={20}>
                    {Object.keys(examinationValue.include).map(
                      examinationInclude => {
                        return (
                          <ExaminationDataSection
                            dataSource={
                              examinationValue.include[examinationInclude]
                            }
                            valueSetType={examinationInclude}
                          />
                        )
                      }
                    )}
                  </Col>
                </Row>
              )
            }
          )}
      </Spin>
    </div>
  )
}

ExaminationViewSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(ExaminationViewSection))
