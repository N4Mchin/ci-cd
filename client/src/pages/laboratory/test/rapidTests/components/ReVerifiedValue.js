import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Select, Input, Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'

const { Option } = Select

const OPTIONS = ['positive', 'negative', 'weaklyPositive']

const ReVerifiedValue = props => {
  const { setDisabled, testName } = props

  const [disabled, disable] = useState(true)
  const [data, setData] = useState({})

  const onCheck = event => {
    disable(!event.target.checked)
  }

  const onSelectChange = (selectName, value) => {
    const newData = Object.assign(data, { [selectName]: value })
    setData(newData)
    props.onChange(newData)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      className={styles.reVerifiedValue}
    >
      <div
        style={{
          width: '25%',
        }}
      >
        <Checkbox onChange={onCheck} disabled={setDisabled}>
          {testName}
        </Checkbox>
      </div>

      <Col span={8}>
        <Select
          disabled={disabled}
          onChange={value => onSelectChange('value', value)}
        >
          {OPTIONS.map(item => (
            <Option key={item} value={item}>
              <Trans id={item} />
            </Option>
          ))}
        </Select>
      </Col>
      <div
        style={{
          width: '32%',
        }}
      >
        <Input disabled={disabled} />
      </div>
    </div>
  )
}

ReVerifiedValue.propTypes = {
  onChange: PropTypes.func,
  testName: PropTypes.string,
}

export default withI18n()(ReVerifiedValue)
