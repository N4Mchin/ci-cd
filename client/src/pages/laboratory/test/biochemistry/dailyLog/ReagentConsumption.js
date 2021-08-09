import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { stringify } from 'qs'
import styles from '../styles.less'
//import ModalReagentAdd from './ModalReagentAdd'
import { Tabs, Button, Select, Row, Col, Divider, Table, Input } from 'antd'
import { getDate, getDay } from 'utils/datetime'
let date = getDate()
const dataSource = [
  {
    key: '1',
    lotName: 'T.Bill',
  },
  {
    key: '2',
    lotName: 'D.Bill',
  },
  {
    key: '3',
    lotName: 'AST',
  },
  {
    key: '4',
    lotName: 'ALT',
  },
  {
    key: '5',
    lotName: 'ALB',
  },
  {
    key: '6',
    lotName: 'TP',
  },
  {
    key: '7',
    lotName: 'GGT',
  },
  {
    key: '8',
    lotName: 'ALP',
  },
  {
    key: '9',
    lotName: 'LDH',
  },
  {
    key: '10',
    lotName: 'GLU',
  },
]
const columns = [
  {
    title: 'Урвалжийн нэр',
    dataIndex: 'lotName',
    key: 'lotName',
  },
  {
    title: (
      <div>
        {' '}
        Огноо<br></br>
        {date}
      </div>
    ),
    children: [
      {
        title: 'Зарцуулсан урвалжийн нийт тоо',
        dataIndex: 'reagentConsumption',
        key: 'reagentConsumption',
      },
      {
        title: 'Нэмсэн урвалжийн нийт тоо',
        dataIndex: 'reagentAdded',
        key: 'reagentAdded',
      },
    ],
  },
  {
    title: (
      <div>
        {' '}
        Огноо<br></br>
        {date}
      </div>
    ),
    children: [
      {
        title: 'Зарцуулсан урвалжийн нийт тоо',
        dataIndex: 'reagentConsumption',
        key: 'reagentConsumption',
      },
      {
        title: 'Нэмсэн урвалжийн нийт тоо',
        dataIndex: 'reagentAdded',
        key: 'reagentAdded',
      },
    ],
  },
  {
    title: (
      <div>
        {' '}
        Огноо<br></br>
        {date}
      </div>
    ),
    children: [
      {
        title: 'Зарцуулсан урвалжийн нийт тоо',
        dataIndex: 'reagentConsumption',
        key: 'reagentConsumption',
      },
      {
        title: 'Нэмсэн урвалжийн нийт тоо',
        dataIndex: 'reagentAdded',
        key: 'reagentAdded',
      },
    ],
  },
  {
    title: (
      <div>
        {' '}
        Огноо<br></br>
        {date}
      </div>
    ),
    children: [
      {
        title: 'Зарцуулсан урвалжийн нийт тоо',
        dataIndex: 'reagentConsumption',
        key: 'reagentConsumption',
      },
      {
        title: 'Нэмсэн урвалжийн нийт тоо',
        dataIndex: 'reagentAdded',
        key: 'reagentAdded',
      },
    ],
  },
  {
    title: (
      <div>
        {' '}
        Огноо<br></br>
        {date}
      </div>
    ),
    children: [
      {
        title: 'Зарцуулсан урвалжийн нийт тоо',
        dataIndex: 'reagentConsumption',
        key: 'reagentConsumption',
      },
      {
        title: 'Нэмсэн урвалжийн нийт тоо',
        dataIndex: 'reagentAdded',
        key: 'reagentAdded',
      },
    ],
  },
  {
    title: (
      <div>
        {' '}
        Огноо<br></br>
        {date}
      </div>
    ),
    children: [
      {
        title: 'Зарцуулсан урвалжийн нийт тоо',
        dataIndex: 'reagentConsumption',
        key: 'reagentConsumption',
      },
      {
        title: 'Нэмсэн урвалжийн нийт тоо',
        dataIndex: 'reagentAdded',
        key: 'reagentAdded',
      },
    ],
  },
  {
    title: 'Зарцуулсан урвалжийн нийт тоо',
    dataIndex: 'reagentConsumption',
    key: 'reagentConsumption',
  },
  {
    title: 'Зарцуулсан урвалжийн нийт тоо',
    dataIndex: 'reagentConsumption',
    key: 'reagentConsumption',
  },
]
const ReagentConsumption = ({
  location,
  laboratory_test_biochemistry,
  loading,
  i18n,
}) => {
  const [modalReagentAddVisible, showModalReagentAdd] = useState(false)
  let date = getDate()
  // let day = getDay()
  return (
    <div>
      {' '}
      <div className={styles.firstDiv}>
        <Row gutter={8}>
          <Col
            span={12}
            style={{
              padding: '0 10px 20px 90px',
            }}
          >
            <img
              src="/liver-center-logo.png"
              alt="logo"
              width="290px"
              height="60px"
            ></img>
          </Col>

          <Col span={10} offset={2}>
            <table className={styles.table} style={{ width: '100%' }}>
              <tr>
                <td>
                  <strong>Баримт №</strong>
                </td>
                <td rowSpan={2}>
                  <strong>Хувилбар №1</strong>
                </td>
                <td rowSpan={2}>
                  <strong>Баталсан огноо: </strong> {date}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>БҮ-ЭТ-005</strong>
                </td>
              </tr>
            </table>
          </Col>
        </Row>
        <div style={{ height: '30px' }}></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Col>
            <span>Огноо: {getDate()}</span>
          </Col>
          <Col>
            {' '}
            <strong>Биохимийн шинжилгээний урвалж зарцуулалтын бүртгэл</strong>
          </Col>

          <Col>
            <span>
              Аппаратны төрөл :{' '}
              <Select defaultValue="XP100">
                <Option value="XP100">XP100</Option>
                <Option value="XP200">XP200</Option>
              </Select>
            </span>
          </Col>
        </div>
        <div style={{ height: '30px' }}></div>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered={true}
          className={styles.container1}
          pagination={false}
        />
         <div style={{ width: '100%', height: '110px' }}></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Col></Col>
          <Col> </Col>
          <Col>
            <span style={{ marginRight: '50px' }}>
              Бүртгэл хөтөлсөн лабораторийн эмч :{' '}
            </span>
            <Select defaultValue="Б.Сумъяа">
              <Option value="Б.Сумъяа">Б.Сумъяа</Option>
              <Option value="XP200">XP200</Option>
            </Select>
          </Col>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Col></Col>
          <Col> </Col>
          <Col>
            <div
              style={{
                border: 'dashed',
                borderWidth: '1px',
                width: '360px',
              }}
            ></div>
          </Col>
        </div>
      </div>
      <div style={{ height: '30px' }}></div>
      <Row gutter={8}>
        <Col span={18}></Col>
        <Col span={3}>
          <Button
            block
            style={{
              backgroundColor: '#707070',
              color: '#FFFFFF',
              borderRadius: '4px',
            }}
          >
            <Trans>Print</Trans>
          </Button>
        </Col>
        <Col span={3}>
          <Button
            type="primary"
            block
            style={{
              color: '#FFFFFF',
              borderRadius: '4px',
            }}
            //  onClick={() => showModalReagentAdd(true)}
          >
            <Trans>Add reagent</Trans>
          </Button>
        </Col>
      </Row>
      {/* <ModalReagentAdd
        visible={modalReagentAddVisible}
        onCancel={() => showModalReagentAdd(false)}
      ></ModalReagentAdd> */}
    </div>
  )
}

ReagentConsumption.propTypes = {
  laboratory_test_biochemistry: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_biochemistry, loading }) => ({
  laboratory_test_biochemistry,
  loading,
}))(withI18n()(ReagentConsumption))
