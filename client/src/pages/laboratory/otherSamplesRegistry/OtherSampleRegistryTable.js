import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Col, Row, Button, Table, Form, Select } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ButtonRed, ButtonDarkGrey } from 'components'
import { CompactTable } from 'components'

const columns = [
  {
    title: <Trans id={'№'} />,
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: <Trans id={'Barcode'} />,
    dataIndex: 'barcode',
    key: 'barcode',
  },
  {
    title: <Trans id={'LastName'} />,
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: <Trans id={'FirstName'} />,
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: <Trans id={'RegisterNumber'} />,
    dataIndex: 'registerNumber',
    key: 'registerNumber',
  },
  {
    title: <Trans id={'TestType'} />,
    dataIndex: 'testType',
    key: 'testType',
  },
  {
    title: (
      <div>
        <Trans id={'Result'} />
      </div>
    ),
    dataIndex: 'result',
    key: 'result',
    render: (text, record, index) => {
      return (
        <ButtonDarkGrey block>
          <Trans>3500999 IU/ml</Trans>
        </ButtonDarkGrey>
      )
    },
  },
  {
    title: <Trans id={'Date'} />,
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: <Trans id={'PhonNumber'} />,
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
]
const dataSource = [
  {
    key: '1',
    id: '1',
    barcode: '90078',
    lastName: 'Бат ',
    firstName: 'Баяр',
    registerNumber: 'ХУ9089700',
    testType: 'HCV-RNA',
    result: '',
    date: '2019-03-12',
    phoneNumber: '88908909',
  },
  {
    key: '1',
    id: '1',
    barcode: '90078',
    lastName: 'Бат ',
    firstName: 'Баяр',
    registerNumber: 'ХУ9089700',
    testType: 'HCV-RNA',
    result: '',
    date: '2019-03-12',
    phoneNumber: '88908909',
  },
  {
    key: '1',
    id: '1',
    barcode: '90078',
    lastName: 'Бат ',
    firstName: 'Баяр',
    registerNumber: 'ХУ9089700',
    testType: 'HCV-RNA',
    result: '',
    date: '2019-03-12',
    phoneNumber: '88908909',
  },
  {
    key: '1',
    id: '1',
    barcode: '90078',
    lastName: 'Бат ',
    firstName: 'Баяр',
    registerNumber: 'ХУ9089700',
    testType: 'HCV-RNA',
    result: '',
    date: '2019-03-12',
    phoneNumber: '88908909',
  },
  {
    key: '1',
    id: '1',
    barcode: '90078',
    lastName: 'Бат ',
    firstName: 'Баяр',
    registerNumber: 'ХУ9089700',
    testType: 'HCV-RNA',
    result: '',
    date: '2019-03-12',
    phoneNumber: '88908909',
  },
  {
    key: '1',
    id: '1',
    barcode: '90078',
    lastName: 'Бат ',
    firstName: 'Баяр',
    registerNumber: 'ХУ9089700',
    testType: 'HCV-RNA',
    result: '',
    date: '2019-03-12',
    phoneNumber: '88908909',
  },
]

const OtherSampleRegistryTable = props => {
  console.log(props)
  return (
    <div>
      <CompactTable
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <div style={{ height: '40px' }}></div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Col span={2}>
          {' '}
          <Button type="primary" block>
            Хадгалах
          </Button>
        </Col>
        <Col span={2} style={{ marginLeft: '10px' }}>
          <ButtonRed block onClick={props.onSubmit}>
            Хэвлэх
          </ButtonRed>
        </Col>
        <Col span={1}> </Col>
      </div>
    </div>
  )
}

OtherSampleRegistryTable.propTypes = {
  laboratory_otherSamplesRegistry: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_otherSamplesRegistry, loading }) => ({
  app,
  laboratory_otherSamplesRegistry,
  loading,
}))(withI18n()(OtherSampleRegistryTable))

//created Sanjaasuren.E
//2020.03.31
