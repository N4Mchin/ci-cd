import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Board } from 'components'
import { Divider, Input, Icon, Button, Row, Col } from 'antd'
import Stats from './components/Stats'
import CustomerQueue from './components/CustomerQueue'
import Warning from './components/Warning'
import MyClients from './components/MyClients'
import Notification from './components/Notification'
import Note from './components/Note'
import DailyFlow from './components/DailyFlow'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'

const Title = props => {
  return (
    <div style={{ fontSize: '14px', marginTop: '16px' }}>
      {props.children}
      <Divider style={{ backgroundColor: '#E5E5E9', marginTop: '7px' }} />
    </div>
  )
}

const Practitioner = props => {
  const [customerQueueDataSource, setCustomerQueueDataSource] = useState([])

  useEffect(() => {
    props
      .dispatch({
        type: 'practitioner/init',
      })
      .then(() => {
        return props.dispatch({
          type: 'practitioner/queryCheckupOrders',
        })
      })
      .then(values => {
        setCustomerQueueDataSource(values)
      })
  }, [])

  return (
    <Board inner>
      {/* <div style={{ fontSize: '14px', lineHeight: '17px' }}>
        <Trans>
          <span className="title uppercase">General </span>
          <span className="uppercase">Dashboard</span>
        </Trans>
      </div>

      <Divider style={{ backgroundColor: '#E5E5E9', marginTop: '7px' }} />

      <Stats /> */}

      {/* <Row gutter={[20, 16]}> */}
      {/* <Col xs={24} xm={24} xl={14} xxl={14}> */}
      <Title>
        <Trans>
          <span className="title uppercase">Customers </span>
          <span className="uppercase">Queue</span>
        </Trans>
      </Title>
      <CustomerQueue dataSource={customerQueueDataSource} />
      {/* </Col> */}
      {/* <Col xs={24} xm={24} xl={10} xxl={10}>
          <Title>
            <Trans>
              <span className="title uppercase">Warning</span>
            </Trans>
          </Title>
          <Warning />
        </Col> */}
      {/* </Row> */}

      {/* <Title>
        <Trans>
          <span className="title uppercase">My </span>
          <span className="uppercase">Clients</span>
        </Trans>
      </Title>

      <Input
        style={{ width: 310 }}
        placeholder={'Search ID or Barcode'}
        suffix={<Icon type="search" />}
      />

      <Button type="primary" style={{ marginLeft: '20px' }}>
        <Trans id={'Search'} />
      </Button>

      <MyClients /> */}

      {/* <Row gutter={[20, 16]}>
        <Col xs={24} xm={24} xl={12} xxl={12}>
          <Title>
            <Trans>
              <span className="title uppercase">Notification</span>
            </Trans>
          </Title>
          <Notification />
        </Col>
        <Col xs={24} xm={24} xl={12} xxl={12}>
          <Title>
            <Trans>
              <span className="title uppercase">Note</span>
            </Trans>
          </Title>
          <Note />
        </Col>
      </Row> */}

      <div style={{ height: '20px' }}></div>
      {/* <DailyFlow /> */}
    </Board>
  )
}

Practitioner.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner, loading }) => ({
  practitioner,
  loading,
}))(withI18n()(Practitioner))
