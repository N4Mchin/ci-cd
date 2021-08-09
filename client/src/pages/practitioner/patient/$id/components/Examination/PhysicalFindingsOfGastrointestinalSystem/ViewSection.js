import React from 'react'
import { Button, Row, Col, Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'

const ViewSection = props => {
  const { dataSource, i18n } = props

  const title = resolveDisplay(dataSource, i18n._language)

  return (
    <Row type="flex" align="middle" style={{ border: '1px solid #c9c9c9' }}>
      <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
        {title}
      </Col>
      <Col span={18}>
        {Object.keys(dataSource.include).map(dataSourceInclude => {
          const { value, valueType } = dataSource.include[dataSourceInclude]
          console.log(dataSource.include[dataSourceInclude])

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
                {valueType === 'valueStringSection' ? (
                  <div>{value}</div>
                ) : valueType === 'componentSection' ? (
                  <div>
                    <Row>
                      {resolveDisplay(value, i18n._language)}
                      {value.text && ` (${value.text})`}
                    </Row>

                    {value.component.value.designation && (
                      <Row>
                        <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                          {resolveDisplay(value.component, i18n._language)}
                        </Col>
                        <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                          {resolveDisplay(
                            value.component.value,
                            i18n._language
                          )}{' '}
                        </Col>
                      </Row>
                    )}
                  </div>
                ) : valueType === 'componentsSection' ? (
                  <div>
                    <Row>
                      {value &&
                        Object.values(value).map(componentValue => {
                          return (
                            <Row>
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
                    </Row>
                  </div>
                ) : valueType === 'hasMemberSection' ? (
                  <div>
                    <Row>
                      {value &&
                        Object.values(value.include).map(hasMemberValue => {
                          return (
                            <Row>
                              <Col span={12}>
                                {resolveDisplay(hasMemberValue, i18n._language)}
                              </Col>
                              <Col span={12}>
                                {Object.values(hasMemberValue.value).map(
                                  subHasMember => {
                                    return subHasMember.component ? (
                                      <Row>
                                        <Row>
                                          {resolveDisplay(
                                            subHasMember,
                                            i18n._language
                                          )}
                                        </Row>
                                        <Row>
                                          <Col span={12}>
                                            {resolveDisplay(
                                              subHasMember.component,
                                              i18n._language
                                            )}
                                          </Col>
                                          <Col span={12}>
                                            {resolveDisplay(
                                              subHasMember.component.value,
                                              i18n._language
                                            )}
                                          </Col>
                                        </Row>
                                      </Row>
                                    ) : (
                                      <Row>
                                        {resolveDisplay(
                                          subHasMember,
                                          i18n._language
                                        )}
                                        {subHasMember.note &&
                                          ` (${subHasMember.note})`}
                                      </Row>
                                    )
                                  }
                                )}
                              </Col>
                            </Row>
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
