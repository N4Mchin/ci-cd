import React, { useState, useEffect } from 'react'
import { Divider } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './styles.less'
import { EditableNew } from 'components'

const TestProcolsHeader = props => {
  const {
    date,
    title,
    documentName,
    version,
    orderName1,
    orderName2,
    approvedDate,
  } = props

  const dataSource1 = [
    {
      key: '1',
      logo: <img src="/liver-center-logo.png" alt="logo" height="25px" />,
      receipt: `${documentName}`,
      version: `${1}`,
      order: `${orderName1}${orderName2}`,
      approvedDate: `${approvedDate}`,
    },
  ]

  const [dataSource, setDataSource] = useState(dataSource1)

  const columns = [
    {
      title: '',
      dataIndex: 'logo',
      key: 'logo',
    },
    {
      title: '',
      dataIndex: 'receipt',
      key: 'receipt',
      editable: true,
      render: text => {
        return (
          <div>
            Баримт № <br />
            {text}
          </div>
        )
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'receipt',
        title: 'receipt',
        handleSave: handleSave,
      }),
    },
    {
      title: 'Хувилбар №',
      dataIndex: 'version',
      key: 'version',
      render: text => {
        return (
          <div>
            Хувилбар № <br />
            {text}
          </div>
        )
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'version',
        title: 'version',
        handleSave: handleSave,
      }),
    },
    {
      title: 'Тушаал',
      dataIndex: 'order',
      key: 'order',
      render: text => {
        return <div>{text}</div>
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'order',
        title: 'order',
        handleSave: handleSave,
      }),
    },
    {
      title: 'Баталсан огноо',
      dataIndex: 'approvedDate',
      key: 'approvedDate',
      render: text => {
        return (
          <div>
            Баталсан огноо
            <br />
            {text}
          </div>
        )
      },
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'approvedDate',
        title: 'approvedDate',
        handleSave: handleSave,
      }),
    },
  ]

  const handleSave = row => {
    const newData = [...dataSource]

    const index = newData.findIndex(item => row.key === item.key)

    const item = newData[index]

    newData.splice(index, 1, {
      ...item,
      ...row,
    })

    setDataSource(newData)
  }

  return (
    <div>
      <EditableNew
        columns={columns}
        dataSource={dataSource}
        className={styles.container}
        bordered={true}
        pagination={false}
        showHeader={false}
        scroll={false}
        rowKey="uid"
      />
      <Divider style={{ border: '1px solid #C9C9C9' }} />
    </div>
  )
}

TestProcolsHeader.defaultProps = {
  date: '',
  title: '',
  documentName: 'M-ЭТ-021',
  version: '1',
  orderName1: 'ЭТ-ийн Ерөнхий захирлын 2018 оны L18/44-02',
  orderName2: 'тоот тушаалын 1-р хавсралт',
  approvedDate: '2018.08.21',
}

export default withI18n()(TestProcolsHeader)
