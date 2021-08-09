import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { codeIntersects } from 'utils/controller'
import { isEmptyObject } from 'utils/helper'

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
          const { value, valueType } = dataSource.include[dataSourceInclude]

          return value.interpretationStatus ? (
            codeIntersects(
              value.interpretationStatus,
              Interpretation.Abnormal
            ) ? (
              <Row type="flex" gutter={8}>
                <Col span={8}>
                  {resolveDisplay(
                    dataSource.include[dataSourceInclude],
                    i18n._language
                  )}
                </Col>
                <Col span={10}>
                  {valueType === 'valueCodeableConceptWithBodySiteSection' ? (
                    <div>
                      <Row>{resolveDisplay(value, i18n._language)}</Row>
                      {value.bodySite && (
                        <Row>
                          <Col span={14}>
                            {resolveDisplay(value.bodySite, i18n._language)}
                          </Col>
                          <Col span={10}>
                            {resolveDisplay(
                              value.bodySite.value,
                              i18n._language
                            )}
                          </Col>
                        </Row>
                      )}
                    </div>
                  ) : (
                    <div>{resolveDisplay(value, i18n._language)}</div>
                  )}
                </Col>
              </Row>
            ) : (
              <div />
            )
          ) : (
            <Row type="flex" gutter={8}>
              <Col span={8}>
                {resolveDisplay(
                  dataSource.include[dataSourceInclude],
                  i18n._language
                )}
              </Col>
              <Col span={10}>
                {valueType === 'valueCodeableConceptWithComponentSection' ? (
                  <div>
                    <Row>{resolveDisplay(value, i18n._language)}</Row>
                    {value.component && (
                      <Row>
                        <Col span={12}>
                          {resolveDisplay(value.component, i18n._language)}
                        </Col>
                        <Col span={12}>{value.component.value}</Col>
                      </Row>
                    )}
                  </div>
                ) : valueType === 'valueCodeableConcepts' ? (
                  <div>
                    {!isEmptyObject(value) &&
                      Object.values(value).map(codeableConceptValue => {
                        return (
                          <Row>
                            {resolveDisplay(
                              codeableConceptValue,
                              i18n._language
                            )}
                          </Row>
                        )
                      })}
                  </div>
                ) : (
                  <div />
                )}
              </Col>
            </Row>
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
