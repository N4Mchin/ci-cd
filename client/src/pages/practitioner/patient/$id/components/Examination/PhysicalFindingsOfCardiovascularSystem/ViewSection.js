import React from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../../styles.less'

const ViewSection = props => {
  const { dataSource, i18n } = props
  console.log(props)

  const title = resolveDisplay(dataSource, i18n._language)

  return (
    <Row type="flex" align="middle" style={{ border: '1px solid #c9c9c9' }}>
      <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
        {title}
      </Col>
      <Col span={18}>
        {Object.keys(dataSource.include).map(dataSourceInclude => {
          const { value, valueType } = dataSource.include[dataSourceInclude]

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
                {valueType === 'hasMemberSection' ? (
                  <div>
                    {value.component &&
                      Object.values(value.component).map(componentValue => {
                        console.log(componentValue)
                        return (
                          <Row type="flex" gutter={8}>
                            <Col>
                              {resolveDisplay(componentValue, i18n._langauge)}
                            </Col>
                            <Col>
                              {typeof componentValue.value !== 'number' ? (
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
                          </Row>
                        )
                      })}
                  </div>
                ) : valueType === 'componentSection' ? (
                  <div>
                    <Row>{resolveDisplay(value, i18n._language)}</Row>
                    <Row>
                      {value.component &&
                        Object.values(value.component).map(componentValue => {
                          return (
                            <div>
                              {Object.values(componentValue).map(component => {
                                return (
                                  <Row type="flex" gutter={8}>
                                    <Col>
                                      {resolveDisplay(
                                        component,
                                        i18n._langauge
                                      )}
                                    </Col>
                                    <Col>
                                      <div>
                                        {resolveDisplay(
                                          component.value,
                                          i18n._language
                                        )}
                                      </div>
                                    </Col>
                                  </Row>
                                )
                              })}
                            </div>
                          )
                        })}
                    </Row>
                  </div>
                ) : (
                  <div>{resolveDisplay(value, i18n._language)}</div>
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
