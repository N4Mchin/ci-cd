import React from 'react'
import { Input, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'

const FormatNumber = value => {
  let num = value + ''
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}

const IntegerInput = props => {
  const { value, i18n, disabled, unit, suffix, placeholder } = props
  const onChange = e => {
    const { value } = e.target
    const reg = /^\d+$/

    if ((!isNaN(value) && reg.test(value)) || value === '') {
      props.onChange(value)
    }
  }

  const unitHolder = unit ? `(${unit})` : ''
  const title = value
    ? `${FormatNumber(value)} ${unitHolder}`
    : `${i18n.t`Input a number`}`

  return (
    <Tooltip trigger={['focus']} title={title} placement="top">
      <Input
        {...props}
        value={value}
        defaultValue={props.value}
        onChange={onChange}
        maxLength={props.maxLength ? props.maxLength : 10}
        suffix={<Trans id={suffix} />}
        disabled={disabled}
        placeholder={placeholder ? placeholder : i18n.t`Input a number`}
      />
    </Tooltip>
  )
}

IntegerInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default withI18n()(IntegerInput)
