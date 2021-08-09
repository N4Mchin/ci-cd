import React, { useState } from 'react'
import { Row, Col, Select } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { IntegerInput } from 'components'

const { Option } = Select

const RecurrenceField = props => {
  const { value, i18n } = props
  const [recurrenceValue, serRecurrenceValue] = useState()

  const onChange = v => {
    let previousValue = {}

    if (!!v) {
      if (parseInt(v)) {
        previousValue = {
          ...recurrenceValue,
          dateValue: v,
        }
      } else {
        previousValue = {
          ...recurrenceValue,
          dateType: v,
        }
      }

      serRecurrenceValue(previousValue)
      props.onChange(previousValue)
    } else {
      props.onChange('')
    }
  }

  // version 1.1 div experiment

  return (
    <div style={{ display: 'flex', width: '60%' }}>
      <div style={{ flexGrow: 1 }}>
        <IntegerInput value={value && value.dateValue} onChange={onChange} />
      </div>
      <div style={{ flexGrow: 9, marginLeft: '4px' }}>
        <Select
          onChange={onChange}
          placeholder={i18n.t`Date`}
          data-cy={props['select-data-cy']}
        >
          <Option value="day">{i18n.t`Day`}</Option>
          <Option value="month">{i18n.t`Month`}</Option>
          <Option value="year">{i18n.t`Years`}</Option>
        </Select>
      </div>
    </div>
  )
}

export default withI18n()(RecurrenceField)
