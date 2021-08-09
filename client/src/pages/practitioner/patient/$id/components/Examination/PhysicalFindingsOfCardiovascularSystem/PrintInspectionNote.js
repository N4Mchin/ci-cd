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

  // энэ хэсэгт interpretation status байгаа болон байхгүй гэсэн
  // 2 төрлийн мэдээлэлүүд орж ирж байгаа бөгөөд хэрэв
  // abnormal байвал хэвлэн үзүүлэх хэсэгт харагдах байгаа
  // interpretation status байхгүй мэдээллийг мөн хэвлэж байгаа
  // ямар нөхцөл шалгаж байгаа хэсэг дээл сайн анхаарна уу!

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
              <Row type="flex">
                <Col span={8}>
                  {resolveDisplay(
                    dataSource.include[dataSourceInclude],
                    i18n._language
                  )}
                </Col>
                <Col span={10}>
                  {valueType === 'componentSection' ? (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {value && resolveDisplay(value, i18n._language)}
                      </Col>
                      <Col>
                        {!isEmptyObject(value.component) &&
                          Object.values(value.component).map(componentValue => {
                            return (
                              <div>
                                {!isEmptyObject(componentValue) &&
                                  Object.values(componentValue).map(
                                    component => {
                                      return (
                                        <Row type="flex" gutter={8}>
                                          <Col>
                                            {resolveDisplay(
                                              component,
                                              i18n._langauge
                                            )}
                                          </Col>
                                          <Col>
                                            {resolveDisplay(
                                              component.value,
                                              i18n._language
                                            )}
                                          </Col>
                                        </Row>
                                      )
                                    }
                                  )}
                              </div>
                            )
                          })}
                      </Col>
                    </Row>
                  ) : (
                    <div>{resolveDisplay(value, i18n._language)}</div>
                  )}
                </Col>
              </Row>
            ) : (
              <div />
            )
          ) : (
            <Row type="flex">
              <Col span={8}>
                {resolveDisplay(
                  dataSource.include[dataSourceInclude],
                  i18n._language
                )}
              </Col>
              <Col span={10}>
                {!isEmptyObject(value.component) &&
                  Object.values(value.component).map(componentValue => {
                    return (
                      <Row type="flex">
                        <Col span={8}>
                          {resolveDisplay(componentValue, i18n._langauge)}
                        </Col>
                        {componentValue.value && (
                          <Col span={8}>
                            {componentValue.designation ? (
                              <div>
                                {resolveDisplay(
                                  componentValue.value,
                                  i18n._language
                                )}
                              </div>
                            ) : (
                              <div>
                                {`${componentValue.value} (${componentValue.unit.value})`}
                              </div>
                            )}
                          </Col>
                        )}
                      </Row>
                    )
                  })}
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
