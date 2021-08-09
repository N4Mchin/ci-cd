import React from 'react'
import { Trans } from '@lingui/react'
import { Row, Col, Checkbox } from 'antd'

const EditedNumberResult = props => {
  let bg
  let color
  if (props.highlight) {
    bg = '#f44336'
    color = '#fff'
  } else {
    bg = '#f5f5f5'
    color = '#434343'
  }

  return (
    <Row gutter={4} style={{ marginTop: '8px' }}>
      <Col span={2}>
        <Checkbox checked disabled />
      </Col>
      <Col span={10}>
        <div
          style={{
            fontSize: '12px',
            // lineHeight: '13px',
            // display: 'table-caption',
            width: 'fit-content',
          }}
          className="uppercase"
        >
          <Trans id="EditedResult" />
        </div>
      </Col>
      <Col span={12}>
        <div
          style={{
            border: '1px solid #e5e5e5',
            fontFamily: 'Helvetica Neue Medium',
            padding: '6px 11px 4px 11px',
            height: '32px',
            fontSize: '12px',
            lineHeight: '1.5',
            borderRadius: '3px',
            color: color,
            background: bg,
          }}
        >
          <div>{props.value}</div>
        </div>
      </Col>
    </Row>
  )
}

export default EditedNumberResult
