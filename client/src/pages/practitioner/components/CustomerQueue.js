import React from 'react'
import { Table, Button } from 'antd'
import { router } from 'utils'
import { Trans, withI18n } from '@lingui/react'

const CustomerQueue = props => {
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'patientName',
      render: text => <a>{text}</a>,
      width: '150px',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: '150px',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '150px ',
      render: text => {
        return <Trans id={text.charAt(0).toUpperCase() + text.slice(1)} />
      },
    },
    {
      title: 'Examination',
      dataIndex: 'checkupType',
      width: '150px ',
      render: text => <Trans id={text} />,
    },
    {
      title: 'Period',
      width: '150px ',
      render: (text, record) => [record.start, record.end].join(' - '),
    },
  ]

  const tableProps = {
    onRow: record => {
      return {
        onClick: () => {
          router.push(`/practitioner/patient/${record.patientId}`)
        },
      }
    },
  }

  return (
    <div>
      <Table
        {...tableProps}
        // rowSelection={rowSelection}
        columns={columns}
        dataSource={props.dataSource}
        pagination={false}
        showHeader={false}
        size={'small'}
      />
      {/* {props.dataSource.length > 4 && (
        <Button type="primary" style={{ marginTop: '4px', width: '100%' }}>
          <Trans id="Seemore" />
        </Button>
      )} */}
    </div>
  )
}

export default withI18n()(CustomerQueue)
