import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'

const ViewSection = props => {
  const { dataSource, i18n } = props

  console.log(dataSource)
  return (
    <div>
      {dataSource && dataSource.length > 0 && (
        <Row style={{ border: '1px solid #c9c9c9' }}>
          <Col span={12} style={{ padding: '4px 8px' }}>
            {<Trans id="Date" />}
          </Col>
          <Col span={12} style={{ padding: '4px 8px' }}>
            {<Trans id="Score" />}
          </Col>
        </Row>
      )}
      {dataSource &&
        dataSource.map(datum => {
          return (
            <Row style={{ border: '1px solid #c9c9c9' }}>
              <Col span={12} style={{ padding: '4px 8px' }}>
                {datum.date}
              </Col>
              <Col span={12} style={{ padding: '4px 8px' }}>
                {datum.display}
              </Col>
            </Row>
          )
        })}
    </div>
  )
}

export default withI18n()(ViewSection)
