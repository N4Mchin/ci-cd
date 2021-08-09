import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import Header from './components/Header'
import OrderService from './components/OrderService'
import OtherTool from './components/OtherTool'

const Services = props => {
  const [showOrderService, setShowOrderService] = useState(false)

  return (
    <Board inner>
      <Trans>
        <span className="bold uppercase">Client </span>
        <span className="uppercase">Order</span>
      </Trans>
      <div style={{ borderBottom: '1px solid #E9E9E9' }}></div>
      <Header
        showOrderService={showOrderService}
        setShowOrderService={setShowOrderService}
      />
      <div style={{ height: '40px' }} />
      {showOrderService && <OrderService />}
      <br />
      {showOrderService && <OtherTool />}
    </Board>
  )
}

Services.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ phlebotomy, phlebotomy_serviceRequestList, loading }) => ({
    phlebotomy,
    phlebotomy_serviceRequestList,
    loading,
  })
)(withI18n()(Services))
