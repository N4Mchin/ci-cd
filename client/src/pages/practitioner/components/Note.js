import React from 'react'
import { Table, Input, Button, Row, Col, Icon } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'

const InputGroup = Input.Group

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

const columns = [{ dataIndex: 'text', render: text => <a>{text}</a> }]

const data_table = [
  {
    key: '1',
    text:
      'Эмийн нэр (нийлмэл найрлагатай бол 2 ,3 эмийн нэр) тунтайгаа байх, хэлбэртэйгээ байх.',
  },
  {
    key: '2',
    text: 'Уух гэсэн сонголт default байх.',
  },
  {
    key: '3',
    text:
      'Олон эм уудаг хүн байвал + дараад доорх талбаруудыг олныг гаргаж болдог байх.',
  },
  {
    key: '4',
    text: 'Олныг сонгож болдог байх.',
  },
  {
    key: '5',
    text: 'Хүндрэл гарсан гэж сонгосон бол гарч ирнэ.',
  },
  {
    key: '6',
    text: 'Олныг сонгож болдог байх.',
  },
]

const Note = props => {
  const { i18n } = props
  return (
    <div>
      <div style={{ border: '1px solid #C9C9C9' }}>
        <InputGroup size="default" style={{ marginTop: '8px' }}>
          <Row type="flex" justify="space-between" align="middle">
            <Icon
              style={{
                marginLeft: '16px',
                fontSize: '16px',
                alignSelf: 'center',
              }}
              type="plus"
            />
            <Col span={15}>
              <div className={styles.border}>
                <Input
                // placeholder={i18n.t`WriteNote`}
                />
              </div>
            </Col>
            <Icon style={{ fontSize: '16px' }} type="star" />
            <Col>
              <Button style={{ marginRight: '16px' }} type="primary">
                <span className="uppercase">
                  <Trans id="Add" />
                </span>
              </Button>
            </Col>
          </Row>
        </InputGroup>

        <Table
          className={styles.note}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data_table}
          size={'small'}
          pagination={false}
          showHeader={false}
        />
      </div>
      <div style={{ marginTop: '4px' }}>
        <Button type="primary" style={{ width: '100%' }}>
          <Trans id="Seemore" />
        </Button>
      </div>
    </div>
  )
}

export default withI18n()(Note)
