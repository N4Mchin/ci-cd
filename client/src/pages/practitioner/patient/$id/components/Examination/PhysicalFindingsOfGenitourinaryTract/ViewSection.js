import React from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import { isArray } from 'utils/helper'

const BodySiteViewSection = props => {
  const { i18n, dataSource } = props

  const bodySiteValues = []

  dataSource.forEach(bodySiteValue => {
    bodySiteValues.push(
      resolveDisplay(bodySiteValue.bodySite.value, i18n._language)
    )
  })

  return (
    <>
      <Row>{resolveDisplay(dataSource[0], i18n._language)}</Row>
      <Row gutter={4}>
        <Col span={12}>
          {resolveDisplay(dataSource[0].bodySite, i18n._language)}
        </Col>
        <Col span={12}>{bodySiteValues.join(', ')}</Col>
      </Row>
    </>
  )
}

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
                ) : valueType === 'valueCodeableConceptWithBodySiteSection' ? (
                  <div>
                    {isArray(value) ? (
                      <BodySiteViewSection i18n={i18n} dataSource={value} />
                    ) : (
                      <>
                        <Row>{resolveDisplay(value, i18n._language)}</Row>
                        {value.bodySite && (
                          <Row>
                            <Col span={12}>
                              {resolveDisplay(value.bodySite, i18n._language)}
                            </Col>
                            <Col span={12}>
                              {resolveDisplay(
                                value.bodySite.value,
                                i18n._language
                              )}
                            </Col>
                          </Row>
                        )}
                      </>
                    )}
                  </div>
                ) : valueType === 'valueCodeableConcepts' ? (
                  <div>
                    {value &&
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
