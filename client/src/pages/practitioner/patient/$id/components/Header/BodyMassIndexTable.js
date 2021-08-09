import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin, Col, Row, Skeleton } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

const BodyMassIndexTable = props => {
  const { app, i18n, practitioner_patient_profile } = props
  const { lastUpdatedExamination } = practitioner_patient_profile
  const { BodyMassIndex } = app.FHIR_CODES.PhysicalExaminationComplete.include
  const { BodyWeight, BodyHeight } = BodyMassIndex.include
  const [loadingData, setLoadingData] = useState(false)
  const [bodyMassIndexValueList, setBodyMassIndexValueList] = useState()

  function refresh() {
    setLoadingData(true)
    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/dlivrReadHeightWeight',
        })
        .then(bodyMassIndexList => {
          if (!!bodyMassIndexList) {
            setBodyMassIndexValueList(bodyMassIndexList)
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
    <div
      style={{
        height: '100%',
        paddingTop: '26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Skeleton
        loading={loadingData || !props.practitioner_patient_profile.patient}
        active
        paragraph={{ rows: 8 }}
      >
        <div
          style={{
            border: '1px solid #C9C9C9',
            padding: '18px 18px 18px 18px',
            alignSelf: 'stretch ',
            alignItems: 'flex-start',
          }}
        >
          <Row>
            {bodyMassIndexValueList && bodyMassIndexValueList.height ? (
              <span className="bold">{bodyMassIndexValueList.height}</span>
            ) : (
              '-'
            )}
            {resolveDisplay(BodyHeight.unit, i18n._language)}
          </Row>
          <Row>{resolveDisplay(BodyHeight, i18n._language)}</Row>
        </div>
        <Spin spinning={loadingData}>
          <div
            style={{
              border: '1px solid #C9C9C9',
              padding: '18px 18px 18px 18px',
              alignItems: 'stretch',
            }}
          >
            <Row>
              {bodyMassIndexValueList && bodyMassIndexValueList.weight ? (
                <span className="bold">{bodyMassIndexValueList.weight}</span>
              ) : (
                '-'
              )}
              {resolveDisplay(BodyWeight.unit, i18n._language)}
            </Row>
            <Row>{resolveDisplay(BodyWeight, i18n._language)}</Row>
          </div>
        </Spin>
        <Spin spinning={loadingData}>
          <div
            style={{
              border: '1px solid #C9C9C9',
              padding: '18px 18px 18px 18px',
              alignItems: 'flex-end',
            }}
          >
            <Row>
              {bodyMassIndexValueList &&
              bodyMassIndexValueList.bodyMassIndex ? (
                <span className="bold">
                  {bodyMassIndexValueList.bodyMassIndex}
                </span>
              ) : (
                '-'
              )}
              {resolveDisplay(BodyMassIndex.unit, i18n._language)}
            </Row>
            <Row>
              <Trans id={'BodyIndex'} />
            </Row>
          </div>
        </Spin>
      </Skeleton>
    </div>
  )
}

BodyMassIndexTable.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(BodyMassIndexTable))
