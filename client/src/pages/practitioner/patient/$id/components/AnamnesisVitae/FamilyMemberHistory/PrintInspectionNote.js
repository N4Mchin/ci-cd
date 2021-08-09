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
  const [patientFamilyMemberHistory, setPatientFamilyMemberHistory] = useState()

  async function refresh() {
    setLoadingData(true)

    return props
      .dispatch({
        type: 'practitioner_patient_profile/queryFamilyMemberHistory',
      })
      .then(familyMemberHistoryList => {
        if (!!familyMemberHistoryList) {
          setPatientFamilyMemberHistory(familyMemberHistoryList)
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
      <Row className="title">Удамшлын асуумж</Row>
      {patientFamilyMemberHistory ? (
        patientFamilyMemberHistory.map(familyMemberHistoryValue => {
          const { diagnosis, familyMember, onsetAge } = familyMemberHistoryValue

          return (
            <Row>
              {familyMember && (
                <Row>
                  <Col span={8}>{i18n.t`Who you are`}</Col>
                  <Col span={8}>
                    {resolveDisplay(familyMember, i18n._language)}
                  </Col>
                </Row>
              )}
              {diagnosis && (
                <Row>
                  <Col span={8}>{i18n.t`What disease did you get?`}</Col>
                  <Col span={8}>{diagnosis}</Col>
                </Row>
              )}
              {onsetAge && (
                <Row>
                  <Col
                    span={8}
                  >{i18n.t`How old were you when you got sick?`}</Col>
                  <Col span={8}>{onsetAge}</Col>
                </Row>
              )}
              <br />
            </Row>
          )
        })
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Удамшлын асуумж:</Col>
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
