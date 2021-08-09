import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Board } from 'components'
import { OrderForm, OrderTable, Distribution } from './components'

const Order = ({ dispatch, laboratory_order, i18n }) => {
  return (
    <Board inner>
      <OrderForm></OrderForm>
      <OrderTable></OrderTable>
      <Distribution></Distribution>
    </Board>
  )
}

Order.propTypes = {
  laboratory_order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_order }) => ({ laboratory_order }))(
  withI18n()(Order)
)
