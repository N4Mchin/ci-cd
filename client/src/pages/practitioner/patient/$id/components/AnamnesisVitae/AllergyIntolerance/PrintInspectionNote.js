import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { isObject } from 'utils/helper'
import { resolveDisplay } from 'utils/valuesets'

const PrintInspectionNote = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientAllergyIntolerance, setPatientAllergyIntolerance] = useState()

  async function refresh() {
    setLoadingData(true)

    return props
      .dispatch({
        type: 'practitioner_patient_profile/queryAllergicIntolerance',
      })
      .then(allergyIntoleranceList => {
        if (!!allergyIntoleranceList) {
          setPatientAllergyIntolerance(allergyIntoleranceList)
        }
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(setLoadingData(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  const title = <Trans id="Allergy questionnaire" />

  return (
    <Row>
      <Row className="title">{title}</Row>
      {patientAllergyIntolerance ? (
        Object.keys(patientAllergyIntolerance).map(dateValue => {
          const allergyValues = []
          const allergyValueNotes = []

          patientAllergyIntolerance[dateValue].forEach(v => {
            if (isObject(v)) {
              allergyValues.push(resolveDisplay(v, i18n._language))
            } else {
              allergyValueNotes.push(v)
            }
          })

          return (
            <Row style={{ padding: '4px' }}>
              <Row type="flex">
                <Col span={10}>Харшилдаг эмийн бодис, бодис, хоол хүнс: </Col>
                <Col span={8}>{allergyValues.join(', ')}</Col>
              </Row>
              <Row type="flex">
                <Col span={10}>
                  Дээрх жагсаалтад байхгүй харшилдаг эмийн бодис, бодис, хоол
                  хүнс:
                </Col>
                <Col span={8}>{allergyValueNotes.join(', ')}</Col>
              </Row>
            </Row>
          )
        })
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Харшилдаг эм:</Col>
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
