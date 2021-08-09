import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { DivInput } from 'components'
import { WarningOutlined } from '@ant-design/icons'
import * as helper from 'utils/helper'

const TestItemViewWithHistory = props => {
  const { test } = props
  const { unit, referenceRange } = test

  let relatedReferenceRange

  try {
    relatedReferenceRange = helper.getRelatedReferenceRange(
      referenceRange,
      props.patient
    )
  } catch (errorInfo) {
    console.log(errorInfo)
  }

  const low = helper.deepGet(relatedReferenceRange, ['low', 'value'])
  const high = helper.deepGet(relatedReferenceRange, ['high', 'value'])

  return (
    <Row style={{ padding: '4px' }} type="flex" justifyContent="space-between">
      <Col span={16} style={{ alignSelf: 'center' }}>
        <Row type="flex">
          <Col style={{ lineHeight: '10px' }}>
            {props.oldValueQuantity && (
              <div>
                <WarningOutlined
                  style={{ fontSize: '16px', margin: '0 3px 0 0' }}
                />
                &nbsp;&nbsp;
              </div>
            )}
          </Col>
          <Col>
            <div
              style={{
                lineHeight: '10px',
              }}
            >
              {props.test.display}
            </div>
            <div
              style={{
                margin: '0 0 5px 0',
                lineHeight: '10px',
                fontSize: '10',
                color: '#C9C9C9',
              }}
            >
              {unit}
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row gutter={(6, 6)}>
          {props.oldValueQuantity && (
            <Col
              span={12}
              style={{
                color:
                  (low && props.oldValueQuantity.value < low) ||
                  (high && props.oldValueQuantity.value > high),
              }}
            >
              <DivInput value={props.oldValueQuantity} />
            </Col>
          )}
          <Col
            span={12}
            style={{
              color:
                (low &&
                  props.valueQuantity &&
                  props.valueQuantity.value < low) ||
                (high &&
                  props.valueQuantity &&
                  props.valueQuantity.value > high),
            }}
          >
            <DivInput
              value={props.valueQuantity}
              disabled={!props.valueQuantity}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

TestItemViewWithHistory.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default TestItemViewWithHistory
// lastUpdated: Sod-Erdene 2021-01-14
