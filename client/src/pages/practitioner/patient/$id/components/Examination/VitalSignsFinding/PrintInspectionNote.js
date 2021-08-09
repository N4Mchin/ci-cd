import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

const PrintInspectionNote = props => {
  const { i18n, dataSource } = props

  const title = resolveDisplay(dataSource, i18n._language)

  return (
    <Row>
      <Row className="bold">{title}</Row>
      <Row>
        {Object.values(dataSource.include).map(dataSourceInclude => {
          return (
            <Row type="flex">
              <Col span={8}>
                <div>{resolveDisplay(dataSourceInclude, i18n._language)}</div>
              </Col>
              <Col
                span={8}
              >{`${dataSourceInclude.value} ${dataSourceInclude.unit}`}</Col>
            </Row>
          )
        })}
      </Row>
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
