import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'
import { Col, Button, Form, Row, Modal, Table, DatePicker } from 'antd'

const ModalHCVTestProtocolPrint = props => {
  const { dispatch } = props
  const [dataSource1, setTableData] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [loadingRef, setLoadingRef] = useState(false)
  const [filteredDate, setFilteredDate] = useState()
  const moment = require('moment')

  const columns = [
    {
      title: <Trans id={'PatientNumber'} />,
      dataIndex: 'patientNumber',
      key: 'patientNumber',
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
      title: <Trans id={'NationalIdentificationNumber'} />,
      dataIndex: 'NationalIdentificationNumber',
      key: 'NationalIdentificationNumber',
      render: (text, record) => {
        return record.nationalIdentificationNumber
      },
    },

    {
      title: <Trans id={'Result'} />,
      dataIndex: 'value',
      key: 'value',
      render: (text, record, index) => {
        return <div>{record.result}</div>
      },
    },
    {
      title: <Trans id={'SampleDate'} />,
      dataIndex: 'specimenCollectedDateTime',
      key: 'specimenCollectedDateTime',
    },
    {
      title: <Trans id={'Module'} />,
      dataIndex: 'module',
      key: 'module',
      render: (text, record, index) => {
        return <div>{record.module.module}</div>
      },
    },
  ]

  const columns2 = [
    {
      title: 'Огноо',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <div>Аппаратны төрөл</div>,
      dataIndex: 'appartusType',
      key: 'appartusType',
      render: (record, key) => {
        return (
          <div>
            <Row>{record && record.firstSelection}</Row>
            <br />
            <Row>{record && record.secondSelection}</Row>
          </div>
        )
      },
    },
    {
      title: <div>Аппарат асаасан цаг</div>,
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: <div>Урвалжийн лот дугаар</div>,
      dataIndex: 'reagentLotNumber',
      key: 'reagentLotNumber',
    },
    {
      title: <div>Урвалжийн хүчинтэй хугацаа</div>,
      dataIndex: 'reagentExpirationDate',
      key: 'reagentExpirationDate',
    },
    {
      title: <p>нийт шинжилсэн сорьцын тоо</p>,
      dataIndex: 'totalSampleNumber',
      key: 'totalSampleNumber',
    },
    {
      title: <p>мөрдөж ажилласан саз дугаар</p>,
      dataIndex: 'sazNumber',
      key: 'sazNumber',
    },
    {
      title: <p>тасалгааны хэм</p>,
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: 'Хариуг баталгаажуулсан',
      dataIndex: 'confirmed',
      key: 'confirmed',
    },
    {
      title: 'Нэмэлт тайлбар',
      dataIndex: 'additionalDescription',
      key: 'additionalDescription',
    },
    {
      title: 'Засварлагдсан хариуны тайлбар',
      dataIndex: 'changedResultDescription',
      key: 'changedResultDescription',
    },
  ]

  const componentRef = useRef()

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type:
            'laboratory_test_viralLoadTests/readViralLoadSubTestsProtocolData',
          payload: {
            testName: props.testName,
            filteredDate: filteredDate,
          },
        })
        .then(values => {
          setLoadingRef(true)
          setDataSource(values)
        })
        .then(() => {
          return dispatch({
            type: 'laboratory_test_viralLoadTests/queryViralLoadTests',
            payload: {
              testNameString: 'HCV_RNA',
              filteredDate: filteredDate,
            },
          })
        })
        .then(result => {
          setTableData(result)
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingRef(false))
    }
  }, [filteredDate])

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }
  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  return (
    <div>
      <Form>
        <Modal
          visible={props.visible}
          onCancel={props.onCancel}
          maskClosable={true}
          closable={false}
          width="70%"
          footer={[
            <Button className="button-gray" onClick={props.onCancel}>
              <Trans id="Return" />
            </Button>,

            <ReactToPrint
              trigger={() => (
                <Button className="button-red">
                  <Trans id="Print" />
                </Button>
              )}
              content={() => componentRef.current}
              pageStyle={'@page {size: landscape}'}
            />,
          ]}
        >
          <div ref={componentRef}>
            <TestProtocolsHeader title=" HCV-RNA | XCB-ийн идэвхжил тодорхойлох шинжилгээний протокол" />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Col>
                {' '}
                <DatePicker
                  style={{ width: '120px' }}
                  onChange={onDatePickerChange}
                />
              </Col>
            </div>
            <br /> <br />
            <Table
              dataSource={dataSource}
              columns={columns2}
              className={styles.container}
              loading={loadingRef}
            />
            <br />
            <Table
              columns={columns}
              dataSource={dataSource1}
              loading={loadingRef}
            />
            <RecordedLaboratoryTechnician
              recordedLaboratoryTechnician={recordedLaboratoryTechnician}
            />
          </div>
        </Modal>
      </Form>
    </div>
  )
}
ModalHCVTestProtocolPrint.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_viralLoadTests, loading }) => ({
  app,
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(Form.create()(ModalHCVTestProtocolPrint)))
