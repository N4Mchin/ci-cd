import React, { useState, useEffect } from 'react'
import { withI18n, Trans } from '@lingui/react'
import { DatePicker } from 'antd'
import * as dateTime from 'utils/datetime'

const YearPicker = props => {
  const { disabled, placeHolder } = props

  const [openPanel, setOpenPanel] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue('')
  }, [disabled])

  const onPanelChange = value => {
    setValue(value)
    setOpenPanel(false)
    props.onChange('year', value._d.getFullYear())
  }

  const onOpenChange = event => {
    if (event) {
      setOpenPanel(true)
    } else {
      setOpenPanel(false)
    }
  }

  return (
    <DatePicker
      disabled={disabled}
      mode="year"
      format="YYYY"
      placeholder={placeHolder}
      value={value}
      open={openPanel}
      onOpenChange={onOpenChange}
      onPanelChange={onPanelChange}
      allowClear
    />
  )
}

const MonthPicker = props => {
  const { disabled, placeHolder } = props

  const [openPanel, setOpenPanel] = useState(false)
  const [value, setValue] = useState()

  useEffect(() => {
    setValue('')
  }, [disabled])

  const onPanelChange = value => {
    setValue(value)
    setOpenPanel(false)

    let month = value._d.getMonth() + 1
    month = month < 10 ? '0' + month : month

    props.onChange('month', month)
  }

  const onOpenChange = event => {
    if (event) {
      setOpenPanel(true)
    } else {
      setOpenPanel(false)
    }
  }

  return (
    <DatePicker
      disabled={disabled}
      mode="month"
      format="MM"
      placeholder={placeHolder}
      value={value}
      open={openPanel}
      onOpenChange={onOpenChange}
      onPanelChange={onPanelChange}
      allowClear
    />
  )
}

const DayPicker = props => {
  const { disabled, placeHolder } = props

  const onChange = (date, dateString) => {
    props.onChange('day', dateString)
  }

  return (
    <DatePicker
      disabled={disabled}
      format="DD"
      onChange={(date, dateString) => onChange(date, dateString)}
      placeholder={placeHolder}
      allowClear
    />
  )
}

const DateField = props => {
  const { i18n, disabled } = props

  const [dateValue, setDateValue] = useState({})

  // const onChange = (dateType, dateString) => {
  //   console.log(dateString)
  //   if (!!dateString) {
  //     const previousValue = {
  //       ...dateValue,
  //       [dateType]: dateString,
  //     }

  //     // Creating the new date constant variable
  //     // It helps to avoid the situation if client choose the only month or day
  //     // If user choose only month as 07, it will automatically create the date 2020-07-26

  //     const year = previousValue.year && previousValue.year
  //     // : new Date().getFullYear()
  //     const month = previousValue.month && previousValue.month
  //     // : dateTime.getMonth()
  //     const day = previousValue.day && previousValue.day
  //     // : new Date().getDate() < 10
  //     // ? '0' + new Date().getDate()
  //     // : new Date().getDate()

  //     let dateStringFormat
  //     // YYYY
  //     if (year && !month && !day) {
  //       dateStringFormat = `${year}`
  //     }
  //     // YYYY-MM
  //     if (year && month && !day) {
  //       dateStringFormat = `${year}-${month}`
  //     }
  //     // YYYY-MM-DD
  //     if (year && month && day) {
  //       dateStringFormat = `${year}-${month}-${day}`
  //     }

  //     if (dateStringFormat) {
  //       props.onChange(dateStringFormat)
  //     } else {
  //       props.onChange()
  //     }

  //     setDateValue(previousValue)
  //   } else {
  //     setDateValue()
  //     props.onChange('')
  //   }
  // }

  const onChange = (date, dateString) => {
    props.onChange(dateString)
  }

  return (
    <div
      style={{
        display: 'flex',
        ...props.style,
      }}
    >
      <DatePicker
        disabled={disabled}
        placeHolder={i18n.t`Date`}
        onChange={onChange}
      />
      {/* <div style={{ flexGrow: 1 }}>
        <YearPicker
          disabled={disabled}
          placeHolder={i18n.t`Year`}
          onChange={onChange}
        />
      </div>
      <div style={{ flexGrow: 1 }}>{i18n.t`Year`}</div>
      <div style={{ flexGrow: 1 }}>
        <MonthPicker
          disabled={disabled}
          placeHolder={i18n.t`Month`}
          onChange={onChange}
        />
      </div>
      <div style={{ flexGrow: 1 }}>{i18n.t`Month`}</div>
      <div style={{ flexGrow: 1 }}>
        <DayPicker
          disabled={disabled}
          placeHolder={i18n.t`Day`}
          onChange={onChange}
        />
      </div>
      <div style={{ flexGrow: 1 }}>{i18n.t`Day`}</div> */}
    </div>
  )
}

export default withI18n()(DateField)
