import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Table } from 'antd'
import styles from '../styles.less'
import { CompactTable } from 'components'

const OrderTable = props => {
  // variables
  const dataSource = [
    {
      Number: '1',
      MatrerialName: 'BioChemistry',
      OrderedStaff: 'Brown',
      ProductCode: '02897',
      quantity: '5',
      Package: '2kg',
      LotNumber: '566',
      OrderedDate: '2020-02-04',
      RecievedDate: '2020-03-01',
      Distribution: 'Foundation',
    },
    {
      Number: '2',
      MatrerialName: 'Гематологи',
      OrderedStaff: 'Brown',
      ProductCode: '02897',
      quantity: '5',
      Package: '2kg',
      LotNumber: '566',
      OrderedDate: '2020-02-04',
      RecievedDate: '2020-03-01',
      Distribution: 'Foundation',
    },
  ]
  const columns = [
    {
      title: <Trans id={'№'} />,
      dataIndex: 'Number',
      key: 'Number',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'MatrerialName'} />,
      dataIndex: 'MatrerialName',
      key: 'MatrerialName',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'OrderedStaff'} />,
      dataIndex: 'OrderedStaff',
      key: 'OrderedStaff',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'ProductCode'} />,
      dataIndex: 'ProductCode',
      key: 'ProductCode',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'quantity'} />,
      dataIndex: 'quantity',
      key: 'quantity',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'Package'} />,
      dataIndex: 'Package',
      key: 'Package',
      render: text => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#616161',
            height: '32px',
            color: '#FFFFFF',
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: <Trans id={'LotNumber'} />,
      dataIndex: 'LotNumber',
      key: 'LotNumber',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'OrderedDate'} />,
      dataIndex: 'OrderedDate',
      key: 'OrderedDate',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'RecievedDate'} />,
      dataIndex: 'RecievedDate',
      key: 'RecievedDate',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'Distribution'} />,
      dataIndex: 'Distribution',
      key: 'Distribution',
      render: text => <span>{text}</span>,
    },
  ]
  const tableProps = {
    dataSource: dataSource,
    columns: columns,
  }

  return (
    // zurna

    <div className={styles.border} style={{ marginTop: '15px' }}>
      <div className={styles.p}>
        <span style={{ background: 'white' }}>Захиалгын жагсаалт</span>
      </div>
      <div style={{ padding: '15px' }}>
        <CompactTable {...tableProps} pagination={false} />
      </div>
    </div>
  )
}

OrderTable.propTypes = {
  laboratory_order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_order }) => ({ laboratory_order }))(
  withI18n()(OrderTable)
)
