import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Input, Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'

const ReVerifiedValue = props => {
  const { setDisabled, testName } = props

  const [disabled, disable] = useState(true)

  const onCheck = event => {
    disable(!event.target.checked)
  }

  const onInputChange = event => {
    props.onChange({
      value: event.target.value,
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'space-between',
      }}
      className={styles.reVerifiedValue}
    >
      <Col span={4}>
        <Checkbox onChange={onCheck} disabled={setDisabled}>
          {testName}
        </Checkbox>
      </Col>

      <Col span={12}>
        <Input disabled={disabled} onChange={onInputChange} />
      </Col>
    </div>
  )
}

ReVerifiedValue.propTypes = {
  onChange: PropTypes.func,
  testName: PropTypes.string,
}

export default withI18n()(ReVerifiedValue)
