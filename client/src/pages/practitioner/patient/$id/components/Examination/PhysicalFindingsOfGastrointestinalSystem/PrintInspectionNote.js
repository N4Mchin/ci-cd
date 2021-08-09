import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { isEmptyObject } from 'utils/helper'

const PrintInspectionNote = props => {
  const { i18n, dataSource } = props

  const title = resolveDisplay(dataSource, i18n._language)

  console.log(dataSource)

  return (
    <Row>
      <Row className="bold">{title}</Row>
      {Object.keys(dataSource.include).map(dataSourceInclude => {
        const { value, valueType } = dataSource.include[dataSourceInclude]

        // interpretation status хэрэггүй гэсэн учраас
        // interpretation status дээр тулгуур хийсэн нөхцөлийг шалгаагүй байгаа

        return value.interpretationStatus ? (
          <Row type="flex" gutter={8}>
            <Col span={12}>
              {resolveDisplay(
                dataSource.include[dataSourceInclude],
                i18n._language
              )}
            </Col>
            <Col span={12}>{resolveDisplay(value, i18n._language)}</Col>
          </Row>
        ) : (
          <Row type="flex" gutter={8}>
            <Col span={12}>
              {resolveDisplay(
                dataSource.include[dataSourceInclude],
                i18n._language
              )}
            </Col>
            <Col span={12}>
              {valueType === 'componentsSection' ? (
                <div>
                  {!isEmptyObject(value) &&
                    Object.values(value).map(componentValue => {
                      return (
                        <Row type="flex">
                          <Col span={12}>
                            {resolveDisplay(componentValue, i18n._language)}
                          </Col>
                          <Col span={12}>
                            {resolveDisplay(
                              componentValue.value,
                              i18n._language
                            )}
                          </Col>
                        </Row>
                      )
                    })}
                </div>
              ) : valueType === 'valueStringSection' ? (
                <div>{value}</div>
              ) : valueType === 'componentSection' ? (
                <div>
                  <Row>{resolveDisplay(value, i18n._language)}</Row>
                  <Row>
                    <Col span={12}>
                      {resolveDisplay(value.component, i18n._language)}
                    </Col>
                    <Col span={12}>
                      {resolveDisplay(value.component.value, i18n._language)}
                    </Col>
                  </Row>
                </div>
              ) : valueType === 'hasMemberSection' ? (
                <div>
                  {!isEmptyObject(value.include) &&
                    Object.values(value.include).map(componentValue => {
                      return (
                        <Row>
                          <Col span={12}>
                            {resolveDisplay(componentValue, i18n._language)}
                          </Col>
                          <Col span={12}>
                            {!isEmptyObject(componentValue.value) &&
                              Object.values(componentValue.value).map(
                                subComponent => {
                                  return subComponent.component ? (
                                    <Row>
                                      <Row>
                                        {resolveDisplay(
                                          subComponent,
                                          i18n._language
                                        )}
                                      </Row>
                                      <Row>
                                        <Col span={12}>
                                          {resolveDisplay(
                                            subComponent.component,
                                            i18n._language
                                          )}
                                        </Col>
                                        <Col span={12}>
                                          {resolveDisplay(
                                            subComponent.component.value,
                                            i18n._language
                                          )}
                                        </Col>
                                      </Row>
                                    </Row>
                                  ) : (
                                    <Row>
                                      {resolveDisplay(
                                        subComponent,
                                        i18n._language
                                      )}
                                      {subComponent.note &&
                                        ` (${subComponent.note})`}
                                    </Row>
                                  )
                                }
                              )}
                          </Col>
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
