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
      <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
        {title}
      </Col>
      <Col span={18}>
        {Object.keys(dataSource.include).map(dataSourceInclude => {
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
                {dataSource.include[dataSourceInclude].valueType ===
                'valueCodeableConceptSectionWithComponent' ? (
                  <div>
                    <Row>
                      {resolveDisplay(
                        dataSource.include[dataSourceInclude].value,
                        i18n._language
                      )}
                    </Row>

                    {dataSource.include[dataSourceInclude].value.component && (
                      <Row>
                        <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                          {resolveDisplay(
                            dataSource.include[dataSourceInclude].value
                              .component,
                            i18n._language
                          )}
                        </Col>
                        <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                          {resolveDisplay(
                            {
                              designation:
                                dataSource.include[dataSourceInclude].value
                                  .component.value,
                            },
                            i18n._language
                          )}
                        </Col>
                      </Row>
                    )}
                  </div>
                ) : dataSource.include[dataSourceInclude].valueType ===
                  'valueCodeableConceptSectionWithComponents' ? (
                  <div>
                    <Row>
                      {resolveDisplay(
                        dataSource.include[dataSourceInclude].value,
                        i18n._language
                      )}
                    </Row>
                    <Row>
                      {dataSource.include[dataSourceInclude].value.component &&
                        Object.values(
                          dataSource.include[dataSourceInclude].value.component
                        ).map(componentValue => {
                          return (
                            <Row>
                              <Col
                                span={12}
                                style={{ border: '1px solid #c9c9c9' }}
                              >
                                {resolveDisplay(componentValue, i18n._language)}
                              </Col>
                              <Col
                                span={12}
                                style={{ border: '1px solid #c9c9c9' }}
                              >
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
                ) : (
                  <div>
                    {resolveDisplay(
                      dataSource.include[dataSourceInclude].value,
                      i18n._language
                    )}
                    &nbsp;
                    {dataSource.include[dataSourceInclude].value.text &&
                      `(${dataSource.include[dataSourceInclude].value.text})`}
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
