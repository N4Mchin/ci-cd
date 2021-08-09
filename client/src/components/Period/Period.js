import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { withI18n } from '@lingui/react'
import { DateInput } from 'components'

const InputGroup = Input.Group

@withI18n()
class Period extends PureComponent {
  constructor(props) {
    super(props)

    const start = props.value && props.value.start
    const end = props.value && props.value.end

    this.state = {
      start: start || '',
      end: end || '',
      data: {
        start: start && start.length > 0 ? start : undefined,
        end: start && end.length > 0 ? end : undefined,
      },
    }

    this.valueStartChange = this.valueStartChange.bind(this)
    this.valueEndChange = this.valueEndChange.bind(this)
  }

  valueStartChange(value) {
    const { data } = this.state
    data.start = value
    this.setState({
      data: data,
      start: value,
    })

    this.props.onChange(data)
  }

  valueEndChange(value) {
    const { data } = this.state
    data.end = value
    this.setState({
      data: data,
      end: value,
    })

    this.props.onChange(data)
  }

  render() {
    const { i18n } = this.props

    return (
      <div>
        <InputGroup compact>
          <DateInput
            placeholder={i18n.t`PeriodStart`}
            value={this.state.start}
            onChange={this.valueStartChange}
            style={{ width: '43%' }}
          />
          <Input
            style={{
              width: '14%',
              borderLeft: '0px',
              pointerEvents: 'none',
              backgroundColor: '#fff',
              textAlign: 'center',
            }}
            placeholder="~"
            disabled
          />
          <DateInput
            placeholder={i18n.t`PeriodEnd`}
            value={this.state.end}
            onChange={this.valueEndChange}
            style={{ width: '43%', borderLeft: 0 }}
          />
        </InputGroup>
      </div>
    )
  }
}

Period.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
}

export default Period
