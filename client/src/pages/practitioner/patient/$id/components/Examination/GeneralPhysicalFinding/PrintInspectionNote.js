import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { isEmptyObject } from 'utils/helper'

const PrintInspectionNote = props => {
  const { i18n, dataSource } = props

  const title = resolveDisplay(dataSource, i18n._language)

  return (
    <Row>
      <Row className="bold">{title}</Row>
      {!isEmptyObject(dataSource.include) &&
        Object.keys(dataSource.include).map(dataSourceInclude => {
          const { value } = dataSource.include[dataSourceInclude]
          const lymphoidNoduleBodyList = []

          if (dataSourceInclude === 'LymphoidNodule') {
            const { bodySite } = value

            bodySite &&
              bodySite.include.forEach(includeValue => {
                lymphoidNoduleBodyList.push(
                  resolveDisplay({ designation: includeValue }, i18n._language)
                )
              })
          }

          return (
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
                {dataSourceInclude === 'Edema' ? (
                  <Row type="flex" gutter={8}>
                    <Col>{value && resolveDisplay(value, i18n._language)}</Col>
                    <Col>
                      <Row>
                        {value.bodySite.length > 0 &&
                          value.bodySite.map(bodySiteValue => {
                            return (
                              <Col span={24}>
                                {resolveDisplay(
                                  { designation: bodySiteValue },
                                  i18n._language
                                )}
                              </Col>
                            )
                          })}
                      </Row>
                    </Col>
                  </Row>
                ) : dataSourceInclude === 'LymphoidNodule' ? (
                  <Row>
                    {value.bodySite && (
                      <Row type="flex" gutter={8}>
                        <Col>
                          {resolveDisplay(value.bodySite, i18n._language)}
                        </Col>
                        {lymphoidNoduleBodyList.length > 0 && (
                          <Col>{lymphoidNoduleBodyList.join(', ')}</Col>
                        )}
                      </Row>
                    )}
                    {value.size && (
                      <Row type="flex" gutter={8}>
                        <Col>{resolveDisplay(value.size, i18n._language)}</Col>
                        <Col>
                          {resolveDisplay(value.size.value, i18n._language)}
                        </Col>
                      </Row>
                    )}
                    {value.pain && (
                      <Row type="flex" gutter={8}>
                        <Col>{resolveDisplay(value.pain, i18n._language)}</Col>
                        <Col>
                          {resolveDisplay(value.pain.value, i18n._language)}
                        </Col>
                      </Row>
                    )}
                  </Row>
                ) : dataSourceInclude === 'JointObservable' ? (
                  <Row>
                    {value.JointAngulation && (
                      <Row type="flex" gutter={8}>
                        <Col>
                          {resolveDisplay(
                            value.JointAngulation,
                            i18n._language
                          )}
                        </Col>
                        <Col>
                          {resolveDisplay(
                            value.JointAngulation.value,
                            i18n._language
                          )}
                        </Col>
                      </Row>
                    )}
                    {value.RangeOfJointMovement && (
                      <Row type="flex" gutter={8}>
                        <Col>
                          {resolveDisplay(
                            value.RangeOfJointMovement,
                            i18n._language
                          )}
                        </Col>
                        <Col>
                          {resolveDisplay(
                            value.RangeOfJointMovement.value,
                            i18n._language
                          )}
                        </Col>
                      </Row>
                    )}
                  </Row>
                ) : (
                  <div>
                    {resolveDisplay(value, i18n._language)}
                    {value.text && <Col>{`(${value.text})`}</Col>}
                  </div>
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
