import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import picture1 from './Calendar.png'
import picture2 from './Nurses.png'
import { Trans, withI18n } from '@lingui/react'

const CurrentDate = props => {
  return <div>{props.date.toLocaleDateString()}</div>
}

const CurrentDay = props => {
  var a = props.day
  var weekdays = new Array(7)
  weekdays[0] = 'SUNDAY'
  weekdays[1] = 'MONDAY'
  weekdays[2] = 'TUESDAY'
  weekdays[3] = 'WEDNESDAY'
  weekdays[4] = 'THURSDAY'
  weekdays[5] = 'FRIDAY'
  weekdays[6] = 'SATURDAY'
  return <div>{weekdays[a.getDay()]}</div>
}

const CurrentDayM = props => {
  var a = props.day
  var weekdays = new Array(7)
  weekdays[0] = 'НЯМ ГАРАГ'
  weekdays[1] = 'ДАВАА ГАРАГ'
  weekdays[2] = 'МЯГМАР ГАРАГ'
  weekdays[3] = 'ЛХАГВА ГАРАГ'
  weekdays[4] = 'ПҮРЭВ ГАРАГ'
  weekdays[5] = 'БААСАН ГАРАГ'
  weekdays[6] = 'БЯМБА ГАРАГ'
  return <div>{weekdays[a.getDay()]}</div>
}

const Box = props => {
  return (
    <div style={{ border: '1px solid black', height: '116px' }}>
      <div
        style={{
          background: 'transparent',
          zIndex: '2',
          height: '100%',
          padding: '8px',
          position: 'relative',
        }}
      >
        {props.children}
      </div>
      <div
        style={{
          zIndex: '1',
          position: 'absolute',
          top: '11px',
          right: '11px',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {props.icon}
      </div>
      {props.background && (
        <div
          style={{
            zIndex: '0',
            top: '10px',
            right: '11px',
            left: '11px',
            position: 'absolute',
            height: '35%',
            marginTop: '32px',
            background: '#C9C9C9',
          }}
        />
      )}
    </div>
  )
}

const Stats = props => {
  const [time, setTime] = useState('')

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  })

  return (
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Box icon={<img src={picture1} alt="nurses" />}>
          <Row style={{ fontSize: '16px', fontFamily: 'Helvetica Neue Bold' }}>
            <CurrentDayM day={new Date()} />
          </Row>
          <Row style={{ fontSize: '10px', fontFamily: 'Helvetica Neue' }}>
            <CurrentDay day={new Date()} />
          </Row>
          <Row
            style={{ fontFamily: 'Helvetica Neue Bold' }}
            type="flex"
            justify="space-between"
            align="bottom"
          >
            <Col style={{ fontSize: '40px', lineHeight: '58px' }}>{time}</Col>
            <Col style={{ fontSize: '14px' }}>
              <CurrentDate date={new Date()} />
            </Col>
          </Row>
        </Box>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Box icon={<img src={picture2} alt="calendar" />}>
          <Row style={{ fontSize: '16px', fontFamily: 'Helvetica Neue Bold' }}>
            <Trans>
              <span className="uppercase title">Today</span>
            </Trans>
          </Row>
          <Row>
            <table>
              <tr
                style={{
                  fontSize: '8px',
                  overflow: 'invisible',
                  whiteSpace: 'nowrap',
                }}
              >
                <th style={{ textAlign: 'right' }}>
                  <span className="uppercase">
                    <Trans id="Examined" />
                  </span>
                </th>
                <th></th>
                <th style={{ textAlign: 'left' }}>
                  <span className="uppercase">
                    <Trans>PeopleAwaited</Trans>
                  </span>
                </th>
              </tr>
              <tr
                style={{
                  fontSize: '40px',
                  lineHeight: '49px',
                  fontFamily: 'Helvetica Neue Bold',
                }}
              >
                <td style={{ textAlign: 'right' }}>8</td>
                <td style={{ textAlign: 'center' }}>|</td>
                <td style={{ textAlign: 'left' }}>3</td>
              </tr>
            </table>
          </Row>
        </Box>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Box background="gray">
          <Row
            style={{
              fontSize: '16px',
              overflow: 'invisible',
              whiteSpace: 'nowrap',
            }}
          >
            <Trans>
              <span className="uppercase title">Right </span>
              <span className="uppercase title">Now </span>
            </Trans>
            |
            <span className="uppercase">
              <Trans>Client</Trans>
            </span>
          </Row>
          <Row style={{ fontSize: '16px', fontFamily: 'Helvetica Neue Bold' }}>
            Д.БАТБОЛД
          </Row>
          <Row type="flex" justify="space-between" style={{ fontSize: '10px' }}>
            <Col style={{ fontFamily: 'Helvetica Neue Bold' }}>
              40-
              <span className="uppercase">
                <Trans>Male</Trans>
              </span>
            </Col>
            <Col>
              <span className="uppercase">
                <Trans>FirstExamination</Trans>
              </span>
            </Col>
          </Row>
          <Row
            style={{
              textAlign: 'center',
              marginTop: '8px',
              overflow: 'invisible',
              whiteSpace: 'nowrap',
            }}
          >
            <Col span={12}>
              <Row style={{ fontSize: '10px' }}>
                <span className="uppercase">
                  <Trans>TimeSpent</Trans>
                </span>
              </Row>
              <Row
                style={{ fontSize: '14px', fontFamily: 'Helvetica Neue Bold' }}
              >
                10:26
              </Row>
            </Col>
            <Col span={12}>
              <Row style={{ fontSize: '10px' }}>
                <span className="uppercase">
                  <Trans>TimeRemained</Trans>
                </span>
              </Row>
              <Row
                style={{ fontSize: '14px', fontFamily: 'Helvetica Neue Bold' }}
              >
                4:34
              </Row>
            </Col>
          </Row>
        </Box>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <Box>
          <Row
            style={{
              fontSize: '16px',
              overflow: 'invisible',
              whiteSpace: 'nowrap',
            }}
          >
            <Trans>
              <span className="title uppercase">My </span>
              <span className="uppercase">Clients</span>
            </Trans>
          </Row>
          <Row
            type="flex"
            justify="space-between"
            style={{ padding: '7px', fontSize: '10px' }}
          >
            <Col className="uppercase">
              <Trans>UnderFollowUp</Trans>
            </Col>
            <Col className="uppercase">
              <Trans>NotUnderFollowUp</Trans>
            </Col>
          </Row>
          <Row
            style={{ marginRight: '20px', marginLeft: '20px' }}
            type="flex"
            justify="space-between"
          >
            <Col
              style={{ fontSize: '14px', fontFamily: 'Helvetica Neue Bold' }}
            >
              <b>2.148</b>
            </Col>
            <Col className="uppercase" style={{ fontSize: '12px' }}>
              <Trans>Total</Trans>
            </Col>
            <Col
              style={{ fontSize: '14px', fontFamily: 'Helvetica Neue Bold' }}
            >
              3.805
            </Col>
          </Row>
          <Row
            style={{
              fontSize: '34px',
              lineHeight: '30px',
              fontFamily: 'Helvetica Neue Bold',
            }}
            type="flex"
            justify="center"
          >
            5.953
          </Row>
        </Box>
      </Col>
    </Row>
  )
}
export default withI18n()(Stats)
