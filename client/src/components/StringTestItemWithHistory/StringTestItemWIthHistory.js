import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Trans } from '@lingui/react'
import { Row, Col, Icon } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

const StringTestItemWithHistory = props => {
  const { test, value, oldValue } = props

  const { display } = test

  let color

  return (
    <Row
      type="flex"
      // justify="space-between"
      align="middle"
    >
      <Col span={8} style={{ lineHeight: '10px', margin: '0 4px' }}>
        <Row type="flex" align="middle">
          {props.oldValue && (
            <Col>
              <div>
                <WarningOutlined
                  style={{ fontSize: '16px', margin: '0 3px 0 0' }}
                />
                &nbsp;&nbsp;
              </div>
            </Col>
          )}

          <Col>
            <div>{display}</div>
            <div
              style={{
                fontSize: '10',
                color: '#C9C9C9',
                marginTop: '4px',
              }}
            ></div>
          </Col>
        </Row>
      </Col>

      {props.oldValue && (
        <Col span={6}>
          <div
            style={{
              color: color,
              border: '1px solid #e8e8e8',
              borderRadius: '2px',
              background: '#f5f5f5',
              height: '32px',
              lineHeight: '12px',
              padding: '8px 8px',
              margin: '4px 0',
            }}
          >
            <Trans id={oldValue} />
          </div>
        </Col>
      )}

      <Col span={8}>
        <div
          style={{
            color: color,
            border: '1px solid #e8e8e8',
            borderRadius: '2px',
            background: !value && '#f5f5f5',
            height: '32px',
            lineHeight: '12px',
            padding: '8px 8px',
            margin: '4px 0',
          }}
        >
          <Trans id={value} />
        </div>
      </Col>
    </Row>
  )
}

StringTestItemWithHistory.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default StringTestItemWithHistory
