import React from 'react'
import { Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
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
                {valueType === 'valueCodeableConceptWithNote' ? (
                  <div>
                    <Row type="flex" gutter={8}>
                      <Col>{resolveDisplay(value, i18n._langauge)}</Col>
                      {value.text && <Col>{`(${value.text})`}</Col>}
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
