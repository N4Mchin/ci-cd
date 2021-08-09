import React from 'react'
import PropTypes from 'prop-types'
import { Input, Tooltip } from 'antd'
import { withI18n } from '@lingui/react'

const formatNumber = value => {
  value += ''
  const list = value.split('.')
  let num = list[0]

  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }

  if (num) {
    result = num + result
  }

  return `${result}${list[1] ? `.${list[1]}` : ''}`
}

const FloatNumber = props => {
  const { value, i18n, unit, suffix, placeholder } = props
  let color

  const onChange = e => {
    const { value } = e.target
    const reg = /^[0-9]*(\.[0-9]*)?$/
    if ((!isNaN(value) && reg.test(value)) || value === '') {
      props.onChange(value)
    }
  }

  const onBlur = () => {
    const { value, onBlur, onChange } = props

    if (!value) {
      return onChange('')
    }
    let valueTemp = value
    if (value.charAt(value.length - 1) === '.') {
      valueTemp = value.slice(0, -1)
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'))
    if (onBlur) {
      onBlur()
    }
  }

  const unitHolder = unit ? `(${unit})` : ''

  const title = value
    ? `${formatNumber(value)} ${unitHolder}`
    : `${i18n.t`Input a number`}`

  /* #region  laboratory test reference range */
  const low = parseFloat(props.low)
  const high = parseFloat(props.high)

  if (!isNaN(parseFloat(value))) {
    if (parseFloat(value) < low || parseFloat(value) >= high) {
      color = 'red'
    }
  }
  /* #endregion */

  return (
    <Tooltip trigger={['focus']} title={title} placement="top">
      <Input
        {...props}
        defaultValue={props.value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={25}
        style={{ color: color }}
        suffix={suffix}
        placeholder={placeholder ? placeholder : i18n.t`Input a number`}
      />
    </Tooltip>
  )
}

FloatNumber.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default withI18n()(FloatNumber)
