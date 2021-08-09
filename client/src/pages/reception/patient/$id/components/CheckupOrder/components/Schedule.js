import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { toLocalDateTime } from 'utils/datetime'
import { Period, DaySchedule } from './'

const Schedule = props => {
  const today = new Date()
  const minuteInterval = 15
  const variableTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDay(),
    8,
    0 + 15,
    0,
    0
  )

  const appointmentEnd = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDay(),
    17,
    0,
    0
  )

  const lunchBreakStart = {
    hour: '12',
    minute: '30',
  }

  const lunchBreakEnd = {
    hour: '13',
    minute: '30',
  }

  const lunchBreakStartDateTime = new Date(
    variableTime.getFullYear(),
    variableTime.getMonth(),
    variableTime.getDate(),
    lunchBreakStart.hour,
    lunchBreakStart.minute,
    0
  )
  const lunchBreakEndDateTime = new Date(
    variableTime.getFullYear(),
    variableTime.getMonth(),
    variableTime.getDate(),
    lunchBreakEnd.hour,
    lunchBreakEnd.minute,
    0
  )

  const periods = []

  while (variableTime <= appointmentEnd) {
    const start = new Date(
      variableTime.getFullYear(),
      variableTime.getMonth(),
      variableTime.getDate(),
      variableTime.getHours(),
      variableTime.getMinutes() - minuteInterval,
      0
    )

    const end = new Date(
      variableTime.getFullYear(),
      variableTime.getMonth(),
      variableTime.getDate(),
      variableTime.getHours(),
      variableTime.getMinutes(),
      0
    )

    if (lunchBreakStartDateTime <= start && end <= lunchBreakEndDateTime) {
    } else {
      periods.push({
        start: toLocalDateTime(start, 'hh:mm'),
        end: toLocalDateTime(end, 'hh:mm'),
      })
    }

    variableTime.setMinutes(variableTime.getMinutes() + minuteInterval)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexBasis: 'auto',
        flexGrow: '1',
        width: '100%',
        background: '#fafafa',
        borderRadius: '8px',
      }}
    >
      <Period title={'Period'} periods={periods} />
      {props.dataSource &&
        Object.keys(props.dataSource).map(dataKey => {
          return (
            <div style={{ flexBasis: 'auto', flexGrow: '1' }}>
              <DaySchedule
                title={dataKey}
                slots={props.dataSource[dataKey]}
                practitioner={props.practitioner}
                checkup={props.checkup}
              />
            </div>
          )
        })}
    </div>
  )
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(Schedule))
