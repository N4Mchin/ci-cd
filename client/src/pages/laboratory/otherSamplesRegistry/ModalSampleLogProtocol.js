import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Form, Table, Button } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import TestProtocolsHeader from '../components/TestProtocolsHeader'
import { getDate } from 'utils/datetime'
import styles from './styles.less'
// import { ButtonRed, ButtonGrey } from '../../../components'
const { Text } = Typography
const columns = [
  {
    title: '№',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Сорьц',
    children: [
      {
        title: 'Илгээсэн газар',
        dataIndex: 'sentPlace',
        key: 'sentPlace',
      },
      {
        title: 'Илгээсэн огноо',
        dataIndex: 'sentDate',
        key: 'sentDate',
      },
      {
        title: 'Хүлээн авсан огноо',
        dataIndex: 'recievedDate',
        key: 'recievedDate',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Температур</div>,
        dataIndex: 'temperature',
        key: 'temperature',
      },
    ],
  },
  {
    title: 'Сорьц тээвэрлэлт',
    children: [
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Агаар</div>,
        dataIndex: 'air',
        key: 'air',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Газар</div>,
        dataIndex: 'land',
        key: 'land',
      },
    ],
  },
  {
    title: 'Анхдагч сорьцын байдал',
    children: [
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Хэвийн</div>,
        dataIndex: '',
        key: '',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Гемолиз</div>,
        dataIndex: '',
        key: '',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Хелеоз</div>,
        dataIndex: '',
        key: '',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Хэмжээ бага</div>,
        dataIndex: '',
        key: '',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Асгарсан </div>,
        dataIndex: '',
        key: '',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Бусад</div>,
        dataIndex: '',
        key: '',
      },
    ],
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>
        Нийт шинжилсэн сорьцын тоо
      </div>
    ),
    dataIndex: 'totalTestedSample',
    key: 'totalTestedSample',
  },

  {
    title: 'Шинжилгээ',
    children: [
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>HCV-RNA</div>,
        dataIndex: 'hcv',
        key: 'hcv',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>HBV-DNA</div>,
        dataIndex: 'hbv',
        key: 'hbv',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>HDV-RNA</div>,
        dataIndex: 'hdv',
        key: 'hdv',
      },
      {
        title: <div style={{ transform: 'rotate(-90deg)' }}>Anti-HDV</div>,
        dataIndex: 'anti',
        key: 'anti',
      },
    ],
  },
  {
    title: 'Шаардлага хангаагүй сорьц',
    children: [
      {
        title: 'Баркод',
        dataIndex: 'barcode',
        key: 'barcode',
      },
      {
        title: 'Гар утас',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Дахин сорьц авсан  огноо',
        dataIndex: 'sampleDate',
        key: 'sampleDate',
      },
    ],
  },
  {
    title: 'Хүлээн авсан хүний гарын үсэг',
    dataIndex: 'signature',
    key: 'signature',
  },
]

const dataSource = [
  {
    key: '1',
    sentPlace: 'Баян өлгий',
    sentDate: '2019.09.20',
    recievedDate: '2019.09.24',
    temperature: '23',
    air: '',
    land: '',
    barcode: '6789899',
  },
  {
    key: '2',
    sentPlace: '',
  },
]
const ModalSampleLogProtocol = props => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      width="920px"
      footer={[
        <Button onClick={props.onCancel}>Буцах</Button>,
        <Button>Хэвлэх</Button>,
      ]}
    >
      <TestProtocolsHeader
        date={getDate()}
        title="Орон нутаг, бусад газраас сорьц хүлээн авсан протокол"
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered={true}
        layout="fixed"
        pagination={false}
        className={styles.container}
      />
    </Modal>
  )
}

ModalSampleLogProtocol.propTypes = {
  laboratory_otherSamplesRegistry: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_otherSamplesRegistry, loading }) => ({
  app,
  laboratory_otherSamplesRegistry,
  loading,
}))(withI18n()(Form.create()(ModalSampleLogProtocol)))

//created Sanjaasuren.E
//2020-04-01
