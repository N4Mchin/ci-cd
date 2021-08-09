import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Checkbox, Input } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
const NewTestItem = props => {
  const { test, disabled } = props
  const { unit } = test
  const onChange = event => {
    props.onChange(event.target.checked)
  }

  const condition = props.valueQuantity ? false : true

  return (
    <Row style={{ padding: '4px' }} type="flex" justifyContent="space-between">
      <Col span={16} style={{ alignSelf: 'center' }}>
        <Col style={{ lineHeight: '10px' }}>
          {disabled && (
            <WarningOutlined
              style={{ fontSize: '16px', margin: '0 3px 0 0' }}
            />
          )}
          <Checkbox disabled={condition} onChange={onChange}>
            {props.test.display}
          </Checkbox>
        </Col>
        <Col>
          <div
            style={{
              margin: '0 0 5px 26px',
              lineHeight: '10px',
              fontSize: '10',
              color: '#C9C9C9',
            }}
          >
            {unit}
          </div>
        </Col>
      </Col>
      <Col span={8}>
        <Row gutter={(6, 6)}>
          {disabled && (
            <Col span={12}>
              <Input value={props.oldValueQuantity} disabled={true} />
            </Col>
          )}
          <Col span={12}>
            <Input placeholder={props.valueQuantity} disabled={true} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

NewTestItem.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default NewTestItem
