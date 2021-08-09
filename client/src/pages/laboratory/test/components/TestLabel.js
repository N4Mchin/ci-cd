import React from 'react'
import { Trans, withI18n } from '@lingui/react'
import { Checkbox, Row, Col } from 'antd'

const TestLabel = props => {
  const { testName, value, highlight, hasCheckbox } = props

  return (
    <Row
      type="flex"
      align="middle"
      style={{
        height: '40px',
      }}
      justify="space-between"
    >
      {hasCheckbox && (
        <Col span={2}>
          <Checkbox checked disabled />
        </Col>
      )}

      <Col span={10}>
        <span>{testName}</span>
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
          }}
          className={highlight ? 'highlight-orange' : 'bg-white-gray'}
        >
          <Trans id={value}></Trans>
        </div>
      </Col>
    </Row>
  )
}

export default withI18n()(TestLabel)
