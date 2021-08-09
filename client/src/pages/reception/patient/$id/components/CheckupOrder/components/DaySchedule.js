import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { findDayOfWeek } from 'utils/datetime'
import ScheduleModal from './ScheduleModal'
import Slot from './Slot'
import ScheduleTitle from './ScheduleTitle'

const DaySchedule = props => {
  const { SelectedCheckup = {} } = props.reception_patientProfile

  const [scheduleModalVisible, showScheduleModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState()

  const onSelectSlot = value => {
    setSelectedSlot(value)
    showScheduleModal(true)
  }

  const onBook = value => {
    return props
      .dispatch({
        type: 'reception_patientProfile/checkupOrder',
        payload: {
          practitioner: props.practitioner,
          selectedSlot,
          checkupType: value,
        },
      })
      .finally(() => {
        showScheduleModal(false)
      })
  }

  const dateOfSchedule = new Date(props.title)
  // const year = dateOfSchedule.getFullYear()
  const month = dateOfSchedule.getMonth()
  const day = dateOfSchedule.getDate()
  const dayOfWeek = findDayOfWeek(dateOfSchedule)

  const Title = (
    <ScheduleTitle>
      <Row>
        <Col>
          <span style={{ fontSize: '16px' }} className="title">
            {month + 1}/{day}
          </span>
        </Col>
        <Col>
          <Trans id={dayOfWeek} />
        </Col>
      </Row>
    </ScheduleTitle>
  )

  return (
    <div>
      {Title}
      {props.slots &&
        props.slots.map(slot => {
          const highlight =
            SelectedCheckup.selectedSlot &&
            SelectedCheckup.selectedSlot.id === slot.id

          return (
            <Slot slot={slot} onBook={onSelectSlot} highlight={highlight} />
          )
        })}
      {scheduleModalVisible && (
        <ScheduleModal
          visible={scheduleModalVisible}
          slot={selectedSlot}
          practitioner={props.practitioner}
          checkup={props.checkup}
          dateOfSchedule={props.title}
          onCancel={() => showScheduleModal(false)}
          onSubmit={onBook}
        />
      )}
    </div>
  )
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(DaySchedule))
