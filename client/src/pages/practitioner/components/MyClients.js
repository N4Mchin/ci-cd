import React from 'react'
import { Table, Button, Icon } from 'antd'
import style from '../styles.less'
import { Trans, withI18n } from '@lingui/react'

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
    title: 'БАРКОД',
    dataIndex: 'barCode',
    render: text => <a>{text}</a>,
  },
  {
    title: 'регистрийн дугаар',
    dataIndex: 'registrationNumber',
  },
  {
    title: 'Нэр',
    dataIndex: 'name',
  },
  {
    title: 'Нас',
    dataIndex: 'age',
  },
  {
    title: 'Хүйс',
    dataIndex: 'gender',
  },
  {
    title: 'Сүүлчийн үзлэг',
    dataIndex: 'lastInspection',
  },
  {
    title: 'Давтан үзлэг',
    dataIndex: 'reInseption',
  },
  {
    title: 'Зурвас илгээх',
    dataIndex: 'SendMessage',
  },
]

const data_table = [
  {
    key: '1',
    barCode: '00074215',
    registrationNumber: 'уз94011611',
    name: 'К. ТӨМӨРБАТ',
    age: '25 нас',
    gender: 'Эр',
    lastInspection: '2019/06/15',
    reInseption: '2019/10/02',
    SendMessage: (
      <Button>
        <Icon type="message" theme="twoTone" />
      </Button>
    ),
  },
  {
    key: '2',
    barCode: '00074215',
    registrationNumber: 'уз94011611',
    name: 'Х. Жавзанболор',
    age: '25 нас',
    gender: 'Эм',
    lastInspection: '2019/08/12',
    reInseption: '2019/10/05',
    SendMessage: (
      <Button>
        <Icon type="message" theme="twoTone" />
      </Button>
    ),
  },
  {
    key: '3',
    barCode: '00074215',
    registrationNumber: 'уз94011611',
    name: 'У. Долгормаа',
    age: '25 нас',
    gender: 'Эм',
    lastInspection: '2019/03/25',
    reInseption: '2019/10/06',
    SendMessage: (
      <Button>
        <Icon type="message" theme="twoTone" />
      </Button>
    ),
  },
  {
    key: '4',
    barCode: '00074215',
    registrationNumber: 'уз94011611',
    name: 'К. Зүмбэрэл',
    age: '25 нас',
    gender: 'Эр',
    lastInspection: '2019/04/19',
    reInseption: '2019/10/12',
    SendMessage: (
      <Button>
        <Icon type="message" theme="twoTone" />
      </Button>
    ),
  },
  {
    key: '5',
    barCode: '00074215',
    registrationNumber: 'уз94011611',
    name: 'С. Дамбадаржаа',
    age: '25 нас',
    gender: 'Эр',
    lastInspection: '2019/09/01',
    reInseption: '2019/10/22',
    SendMessage: (
      <Button>
        <Icon type="message" theme="twoTone" />
      </Button>
    ),
  },
]

const MyClients = props => {
  return (
    <div>
      <Table
        className={style.table}
        style={{ marginTop: '11px' }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data_table}
        pagination={false}
      />
      <Button type="primary" style={{ marginTop: '4px', width: '100%' }}>
        <Trans id="Seemore" />
      </Button>
    </div>
  )
}

export default withI18n()(MyClients)
