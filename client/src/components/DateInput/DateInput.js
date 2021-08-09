import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { withI18n } from '@lingui/react'

function formatNumber(value) {
  value += ''
  const list = value.split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`
}

@withI18n()
class DateInput extends PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = e => {
    const { value } = e.target
    const oldValue = this.props.value || ''

    const reg = /^([0-9]{1,4}){1}(-[0-9]{1,2}){0,1}(-[0-9]{0,2}){0,1}$/
    let newValue

    if (oldValue.length < value.length) {
      // writing
      if (value.length === 4 || value.length === 7) {
        newValue = value + '-'
      } else {
        newValue = value
      }
    } else {
      // removing
      if (value.length === 5 || value.length === 8) {
        newValue = value.substring(0, value.length - 1)
      } else {
        newValue = value
      }
    }

    if (reg.test(newValue)) {
      this.props.onChange(newValue)
    } else if (value.length === 0) {
      this.props.onChange('')
    }
  }

  handleBlur = v => {
    // const { value } = this.props
    // const reg = /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$/
    // if (reg.test(value))
  }

  render() {
    const { value, disabled, i18n, onChange, ...others } = this.props

    return (
      <Input
        {...others}
        disabled={disabled}
        value={this.props.value}
        onChange={this.handleChange}
        placeholder={this.props.placeholder}
        maxLength={10}
      />
    )
  }
}

DateInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
}

export default DateInput
