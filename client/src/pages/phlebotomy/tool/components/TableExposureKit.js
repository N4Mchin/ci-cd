import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse, SlimTable } from 'components'
import { Input, Checkbox, Select, Icon } from 'antd'

const columns = [
  {
    title: 'Эмийн нэр',
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
    title: 'Савлагаан дахь хэмжээ',
    dataIndex: 'amountPerPackage',
    key: 'amountPerPackage',
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
const { Option } = Select
const { TextArea } = Input

const TableExposureKit = props => {
  const { location, phlebotomy, loading, i18n } = props
  const { exposureMaterialData } = phlebotomy

  useEffect(() => {
    props.dispatch({
      type: 'phlebotomy/readExposureMaterials',
    })
  }, [])

  // Changing props of list
  const tableProps = {
    //rowClassName: record => styles[record.status],
    // loading: loading.effects['reception/query'],
    // pagination,
    // onChange(page) {
    //   handleRefresh({
    //     page: page.current,
    //     pageSize: page.pageSize,
    //   })
    // }
  }

  return (
    <div>
      <BorderCollapse
        displayName={<Trans id="Өртөлийн багцын үлдэгдэл" />}
        defaultActiveKey={['1']}
        bordered={true}
      >
        <SlimTable
          dataSource={exposureMaterialData}
          columns={columns}
          pagination={false}
        />
      </BorderCollapse>
    </div>
  )
}

TableExposureKit.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ phlebotomy, loading }) => ({
  phlebotomy,
  loading,
}))(withI18n()(TableExposureKit))
