import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Form, Table, Button, Row } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import TestProtocolsHeader from '../../../laboratory/components/TestProtocolsHeader'
import { getDate } from 'utils/datetime'
import styles from '../styles.less'
//import { ButtonRed, ButtonGrey } from '../../../components'
const { Text } = Typography
const columns = [
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>BIOCHEMISTRY</div>,
    dataIndex: 'biochemistry',
    key: 'biochemistry',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>HEMATOLOGY</div>,
    dataIndex: 'hematology',
    key: 'hematology',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>RAPID TESTS</div>,
    dataIndex: 'rapidTests',
    key: 'rapidTests',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>VIRAL LOAD HCV_RNA</div>
    ),
    dataIndex: 'hcvRna',
    key: 'hcvRna',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>VIRAL LOAD HDV_RNA</div>
    ),
    dataIndex: 'hdvRna',
    key: 'hdvRna',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>VIRAL LOAD HBV_DNA</div>
    ),
    dataIndex: 'hbvDna',
    key: 'hbvDna',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>GENOTYPE</div>,
    dataIndex: 'genotype',
    key: 'genotype',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>COAGULATION</div>,
    dataIndex: 'coagulation',
    key: 'coagulation',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>IMMUNOLOGY</div>,
    dataIndex: 'immunology',
    key: 'immunology',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>ESR</div>,
    dataIndex: 'esr',
    key: 'esr',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>URINANALYSIS</div>,
    dataIndex: 'urinanalysis',
    key: 'urinanalysis',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>Нэмэлт сорьц</div>,
    dataIndex: 'extraSample',
    key: 'extraSample',
  },
  {
    title: <div style={{ transform: 'rotate(-90deg)' }}>Судалгааны сорьц</div>,
    dataIndex: 'researchSample',
    key: 'researchSample',
  },
]

const dataSource = [
  {
    key: '1',
    biochemistry: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
    hematology: <div>00054215 00065306</div>,
    rapidTests: (
      <div>
        00054215 00065306
        <br /> 00087588
        <br /> 00098679
      </div>
    ),
    hcvRna: (
      <div>
        00076497
        <br /> 00098679
      </div>
    ),
    hdvRna: (
      <div>
        00054215 00065306
        <br /> 00098679 00049760
      </div>
    ),
    hbvDna: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
    genotype: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
    coagulation: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
    immunology: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
    esr: '0002546',
    urinanalysis: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
    extraSample: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
    researchSample: (
      <div>
        00054215 00065306
        <br /> 00076497 00087588
        <br /> 00098679 00049760
      </div>
    ),
  },
  {
    key: '2',
    biochemistry: '7',
    hematology: '2',
    rapidTests: '4',
    hcvRna: '4',
    hdvRna: '5',
    hbvDna: '4',
    genotype: '4',
    coagulation: '4',
    immunology: '2',
    esr: '2',
    urinanalysis: '5',
    extraSample: '5',
    researchSample: '4',
  },
]
const ModalFirstSample = props => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      width="930px"
      footer={[
        <Button className="button-gray" onClick={props.onCancel}>
          Буцах
        </Button>,
        <Button className="button-red">Хэвлэх</Button>,
      ]}
    >
      <TestProtocolsHeader
        date={getDate()}
        title="Анхдагч сорьцын хүлээн авах бүртгэл"
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered={true}
        // layout="fixed"
        pagination={false}
        className={styles.modalContainer}
      />
      <br />
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '85%' }}
      >
        <span>Хүлээлгэн өгсөн:</span>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '85%' }}
      >
        <span>Хүлээн авсан:</span>
      </div>
    </Modal>
  )
}

ModalFirstSample.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy, loading }) => ({
  app,
  phlebotomy,
  loading,
}))(withI18n()(Form.create()(ModalFirstSample)))

//created Sanjaasuren.E
//2020-04-01
