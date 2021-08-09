import React from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import { Board } from 'components'

import { Table, Button, Typography, Spin } from 'antd'

const columns = [
  {
    title: <Trans>RegisteredDate</Trans>,
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: <Trans>Barcode</Trans>,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: <Trans>LastName</Trans>,
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: <Trans>FirstName</Trans>,
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: <Trans>NationalIdentifier</Trans>,
    dataIndex: 'nationalIdentifier',
    key: 'nationalIdentifier',
  },
  {
    title: <Trans>SampleDate</Trans>,
    dataIndex: 'sampleDate',
    key: 'sampleDate',
  },
]
const dataSource = [
  {
    key: '1',
    date: '2020-02-20',
    id: '12345',
    lastName: 'Батбаяр',
    firstName: 'Пүрэвжаргал',
    nationalIdentifier: 'ИЮ8978678',
    sampleDate: '2019-08-20',
  },
  {
    key: '2',
    date: '2020-02-20',
    id: '12345',
    lastName: 'Батбаяр',
    firstName: 'Пүрэвжаргал',
    nationalIdentifier: 'ИЮ8978678',
    sampleDate: '2019-08-20',
  },
  {
    key: '3',
    date: '2020-02-20',
    id: '12345',
    lastName: 'Батбаяр',
    firstName: 'Пүрэвжаргал',
    nationalIdentifier: 'ИЮ8978678',
    sampleDate: '2019-08-20',
  },
  {
    key: '4',
    date: '2020-02-20',
    id: '12345',
    lastName: 'Батбаяр',
    firstName: 'Пүрэвжаргал',
    nationalIdentifier: 'ИЮ8978678',
    sampleDate: '2019-08-20',
  },
]
const { Text } = Typography

const PatientTable = ({ location, phlebotomy, loading, i18n }) => {
  // Changing props of list
  const tableProps = {
    onRow: (record, rowIndex) => {
      return {
        onClick: event => {
          router.push('/phlebotomy/patient/1')
        },
      }
    },
    dataSource: dataSource,
    columns: columns,
    //  rowClassName: record => styles[record.status],
    pagination: {
      pageSize: 20,
      // showTotal: total => <Trans>Total {total} Items</Trans>,
    },
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
    <Board inner>
      <Table columns={columns} dataSource={dataSource} {...tableProps} />
    </Board>
  )
}

PatientTable.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ phlebotomy, loading }) => ({
  phlebotomy,
  loading,
}))(withI18n()(PatientTable))
