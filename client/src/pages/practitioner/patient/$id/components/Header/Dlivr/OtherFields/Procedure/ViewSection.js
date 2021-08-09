import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import * as dateTime from 'utils/datetime'

const ViewSection = props => {
  const { dataSource, i18n } = props

  return (
    <div>
      {dataSource && (
        <Row style={{ border: '1px solid #c9c9c9' }}>
          <Col span={8} style={{ padding: '4px 8px' }}>
            {<Trans id="Date" />}
          </Col>
          <Col span={8} style={{ padding: '4px 8px' }}>
            {<Trans id="Procedure" />}
          </Col>
          <Col span={8} style={{ padding: '4px 8px' }}>
            {<Trans id="Мэс ажилбар" />}
          </Col>
        </Row>
      )}
      {dataSource.map(datum => {
        return (
          <Row style={{ border: '1px solid #c9c9c9' }}>
            <Col span={8} style={{ padding: '4px 8px' }}>
              {datum.date}
            </Col>
            <Col span={8} style={{ padding: '4px 8px' }}>
              {datum.codeInfo &&
                datum.codeInfo.designation.find(des => des.language === 'mn')
                  .value}
            </Col>
            <Col span={8} style={{ padding: '4px 8px' }}>
              {datum.codeInfo &&
                datum.codeInfo.designation.find(des => des.language === 'en')
                  .value}
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

export default withI18n()(ViewSection)
