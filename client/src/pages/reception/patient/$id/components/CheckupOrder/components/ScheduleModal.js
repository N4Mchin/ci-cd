import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Radio, Button, Row, Col, Modal, Divider } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { toLocalDateTime, findDayOfWeek } from 'utils/datetime'

const ScheduleModal = props => {
  const [selectedCheckupType, setSelectedCheckupType] = useState()
  const handleCheckupType = event => {
    const { value } = event.target

    setSelectedCheckupType(value)
  }

  const dateString =
    props.dateOfSchedule && toLocalDateTime(props.dateOfSchedule, 'yyyy-mm-dd')

  return (
    <Modal
      closable={false}
      visible={props.visible}
      onCancel={props.onCancel}
      title={<Trans id="AppointmentBooking" />}
      footer={[
        <Button onClick={props.onCancel}>
          <Trans id="Close" />
        </Button>,
        <Button
          type="primary"
          disabled={!selectedCheckupType}
          onClick={() => props.onSubmit(selectedCheckupType)}
        >
          <Trans id="Save" />
        </Button>,
      ]}
    >
      <Row type="flex">
        <Col span={2}>
          <Trans id="Practitioner" />:
        </Col>
        <Col>
          <span className="title">
            {props.practitioner && props.practitioner.getOfficialNameString()}
          </span>
        </Col>
      </Row>

      <Divider style={{ background: '#ccc' }} />
      <Row type="flex">
        <Col span={12}>
          <div style={{ height: '32px' }}>
            <Trans id="SelectedSchedule" />:
          </div>
          {props.slot && (
            <div>
              <div>
                {dateString}

                <Divider type="vertical" style={{ background: '#ccc' }} />

                <Trans id={findDayOfWeek(props.dateOfSchedule)} />
              </div>
              <span className="title" style={{ fontSize: '14px' }}>
                {props.slot && (
                  <div>
                    <span>{toLocalDateTime(props.slot.start, 'hh:mm')}</span>
                    &nbsp;-&nbsp;
                    <span>{toLocalDateTime(props.slot.end, 'hh:mm')}</span>
                  </div>
                )}
              </span>
            </div>
          )}
        </Col>
        <Col span={12}>
          <div style={{ height: '32px' }}>
            <Trans id="CheckupType" />:
          </div>

          <span className="title" style={{ fontSize: '14px' }}></span>

          <Radio.Group onChange={handleCheckupType}>
            {Object.keys(props.checkup).map((type, index) => (
              <Radio
                style={{
                  display: 'block',
                }}
                value={type}
              >
                <Trans id={type} />
              </Radio>
            ))}
          </Radio.Group>
        </Col>
      </Row>
    </Modal>
  )
}

ScheduleModal.propTypes = {
  practitioner: PropTypes.object,
  dateOfSchedule: PropTypes.any,
  checkup: PropTypes.object,
  slot: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
}

export default withI18n()(ScheduleModal)
