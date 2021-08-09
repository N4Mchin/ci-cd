import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { codeIntersects } from 'utils/controller'

const PrintInspectionNote = props => {
  const { app, i18n, dataSource } = props
  const { Interpretation } = app.FHIR_CODES.Observations

  const title = resolveDisplay(dataSource, i18n._language)

  console.log(dataSource)

  return (
    <Row>
      <Row className="bold">{title}</Row>
      {dataSource.include &&
        Object.keys(dataSource.include).map(dataSourceInclude => {
          const { value } = dataSource.include[dataSourceInclude]

          return codeIntersects(
            value.interpretationStatus,
            Interpretation.Abnormal
          ) ? (
            <Row type="flex">
              <Col span={8}>
                <div>
                  {resolveDisplay(
                    dataSource.include[dataSourceInclude],
                    i18n._language
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div>{resolveDisplay(value, i18n._language)}</div>
              </Col>
            </Row>
          ) : (
            <div />
          )
        })}
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
