import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse, SlimTable } from 'components'

const columns = [
  {
    title: 'Материалын нэр',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Тоо/ш',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Хэмжих нэгж',
    dataIndex: 'measurementUnit',
    key: 'measurementUnit',
  },
  {
    title: 'Тун хэмжээ хэлбэр',
    dataIndex: 'dose_shape',
    key: 'dose_shape',
  },
  {
    title: 'Барааны код',
    dataIndex: 'productId',
    key: 'productId',
  },
  {
    title: 'Лот дугаар',
    dataIndex: 'lotNumber',
    key: 'lotNumber',
  },
  {
    title: 'Дуусах огноо',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
  },
]

const TableFirstAid = props => {
  const { phlebotomy, dispatch } = props

  const { firstAidMaterialData } = phlebotomy
  useEffect(() => {
    props.dispatch({
      type: 'phlebotomy/readFirstAidMaterials',
    })
  }, [])

  return (
    <div>
      <BorderCollapse
        displayName={<Trans id="Анхны тусламжийн багцын үлдэгдэл" />}
        defaultActiveKey={['1']}
        bordered={true}
      >
        <SlimTable
          dataSource={firstAidMaterialData}
          columns={columns}
          pagination={false}
        />
      </BorderCollapse>
    </div>
  )
}

TableFirstAid.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ phlebotomy, loading }) => ({
  phlebotomy,
  loading,
}))(withI18n()(TableFirstAid))
