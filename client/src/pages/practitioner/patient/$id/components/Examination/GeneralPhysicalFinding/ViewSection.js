import React from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../../styles.less'

const ViewSection = props => {
  const { dataSource, i18n } = props

  const title = resolveDisplay(dataSource, i18n._language)

  return (
    <Row type="flex" align="middle" style={{ border: '1px solid #c9c9c9' }}>
      <Col
        span={6}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {title}
      </Col>
      <Col span={18}>
        {Object.keys(dataSource.include).map(dataSourceInclude => {
          const { value } = dataSource.include[dataSourceInclude]

          return (
            <Row type="flex">
              <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                <div>
                  {resolveDisplay(
                    dataSource.include[dataSourceInclude],
                    i18n._language
                  )}
                </div>
              </Col>
              <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                {dataSourceInclude === 'Edema' ? (
                  <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }}>
                      {value && resolveDisplay(value, i18n._language)}
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <Row>
                        {value.bodySite &&
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
                    </div>
                  </div>
                ) : dataSourceInclude === 'LymphoidNodule' ? (
                  <Row type="flex">
                    {value.size && (
                      <Col span={24}>
                        <Row type="flex" gutter={4}>
                          <Col>
                            {resolveDisplay(value.size, i18n._language)}
                          </Col>
                          <Col>
                            {resolveDisplay(value.size.value, i18n._language)}
                          </Col>
                        </Row>
                      </Col>
                    )}
                    {value.bodySite && (
                      <Col span={24}>
                        <Row type="flex" gutter={4}>
                          <Col>
                            {resolveDisplay(value.bodySite, i18n._language)}
                          </Col>
                          <Col>
                            <Row>
                              {value.bodySite.include.map(bodySiteInclude => {
                                return (
                                  <>
                                    {bodySiteInclude.text ? (
                                      <Row type="flex" gutter={8}>
                                        <Col>
                                          {resolveDisplay(
                                            bodySiteInclude,
                                            i18n._langauge
                                          )}
                                        </Col>
                                        {bodySiteInclude.text && (
                                          <Col>{`(${bodySiteInclude.text})`}</Col>
                                        )}
                                      </Row>
                                    ) : (
                                      <Col span={24}>
                                        {resolveDisplay(
                                          { designation: bodySiteInclude },
                                          i18n._language
                                        )}
                                      </Col>
                                    )}
                                  </>
                                )
                              })}
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    )}
                    {value.pain && (
                      <Col span={24}>
                        <Row type="flex" gutter={4}>
                          <Col>
                            {resolveDisplay(value.pain, i18n._language)}
                          </Col>
                          <Col>
                            {resolveDisplay(value.pain.value, i18n._language)}
                          </Col>
                        </Row>
                      </Col>
                    )}
                  </Row>
                ) : dataSourceInclude === 'JointObservable' ? (
                  <div>
                    {value.JointAngulationUpper && (
                      <Row>
                        <Row type="flex" gutter={4}>
                          <Col>
                            {resolveDisplay(
                              value.JointAngulationUpper,
                              i18n._language
                            )}
                          </Col>
                          <Col>
                            {resolveDisplay(
                              value.JointAngulationUpper.value,
                              i18n._language
                            )}
                          </Col>
                        </Row>
                        {value.JointAngulationUpper.text !== '' && (
                          <Row type="flex" gutter={8}>
                            <Col>{i18n.t`AdditionalInformation`}</Col>
                            <Col>{value.JointAngulationUpper.text}</Col>
                          </Row>
                        )}
                      </Row>
                    )}

                    {value.RangeOfJointUpperMovement && (
                      <Row type="flex" gutter={8}>
                        <Col>
                          {resolveDisplay(
                            value.RangeOfJointUpperMovement,
                            i18n._language
                          )}
                        </Col>
                        <Col>
                          {resolveDisplay(
                            value.RangeOfJointUpperMovement.value,
                            i18n._language
                          )}
                        </Col>
                      </Row>
                    )}

                    {value.JointAngulationBottom && (
                      <Row>
                        <Row type="flex" gutter={8}>
                          <Col>
                            {resolveDisplay(
                              value.JointAngulationBottom,
                              i18n._language
                            )}
                          </Col>
                          <Col>
                            {resolveDisplay(
                              value.JointAngulationBottom.value,
                              i18n._language
                            )}
                          </Col>
                        </Row>
                        {value.JointAngulationBottom.text !== '' && (
                          <Row type="flex" gutter={8}>
                            <Col>{i18n.t`AdditionalInformation`} </Col>
                            <Col>{value.JointAngulationBottom.text}</Col>
                          </Row>
                        )}
                      </Row>
                    )}

                    {value.RangeOfJointBottomMovement && (
                      <div>
                        <Row type="flex" gutter={8}>
                          <Col>
                            {resolveDisplay(
                              value.RangeOfJointBottomMovement,
                              i18n._language
                            )}
                          </Col>
                          <Col>
                            {resolveDisplay(
                              value.RangeOfJointBottomMovement.value,
                              i18n._language
                            )}
                          </Col>
                        </Row>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Row type="flex" gutter={8}>
                      <Col>{resolveDisplay(value, i18n._langauge)}</Col>
                      {value.text && <Col>{`(${value.text})`}</Col>}
                    </Row>
                  </div>
                )}
              </Col>
            </Row>
          )
        })}
      </Col>
    </Row>
  )
}

export default withI18n()(ViewSection)
