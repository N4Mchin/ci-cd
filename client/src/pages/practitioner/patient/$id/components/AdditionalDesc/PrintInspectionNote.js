import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'

const PrintInspectionNote = props => {
  const [loadingData, setLoadingData] = useState(false)
  const [descriptions, setDescriptions] = useState([])

  function refresh(payload = {}) {
    const { _count, _page, _sort, sortField, sortOrder, ...filters } = payload

    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/readProviderCommentReport',
          payload: { _sort: '-_lastUpdated' },
        })
        .then(result => {
          console.log(result)
          setDescriptions(result.dataSource)
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(setLoadingData(false))
    )
  }

  useEffect(() => {
    refresh()
  }, [])

  console.log(descriptions)

  return (
    <Row>
      <Row className="title">Нэмэлт тайлбар </Row>
      {descriptions && descriptions[0] ? (
        <Row>
          <Col span={12}>
            {descriptions[0].date ? descriptions[0].date : ''}
          </Col>
          <Col span={12}>
            {descriptions[0].display ? descriptions[0].display : ''}
          </Col>
        </Row>
      ) : (
        ''
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
