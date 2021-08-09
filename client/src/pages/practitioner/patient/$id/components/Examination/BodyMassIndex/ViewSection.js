import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

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
        {Object.values(dataSource.include).map(dataSourceInclude => {
          return (
            <Row type="flex">
              <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                <div>{resolveDisplay(dataSourceInclude, i18n._language)}</div>
              </Col>
              <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                {dataSourceInclude.value} |{' '}
                {resolveDisplay(dataSourceInclude.unit, i18n._language)}
              </Col>
            </Row>
          )
        })}
      </Col>
    </Row>
  )
}

export default withI18n()(ViewSection)
