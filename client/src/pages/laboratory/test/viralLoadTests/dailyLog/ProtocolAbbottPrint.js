import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'
import { Col, Button, Form, Modal, Table, DatePicker } from 'antd'

const ProtocolAbbottPrint = props => {
  const { dispatch } = props
  const [labTestDataSource, setLabTestDatasource] = useState([])
  const [protocolDataSource, setProtocolDataSource] = useState([])
  const [loadingRef, setLoadingRef] = useState(false)
  const [filteredDate, setFilteredDate] = useState()
  const moment = require('moment')

  const labTestColumns = [
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

  const protocolColumns = [
    {
      title: 'Огноо',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <div>Аппаратны төрөл</div>,
      dataIndex: 'choiceOfApparatusType',
      key: 'choiceOfApparatusType',
    },
    {
      title: <div>Мөрдөж ажилласан САЗ дугаар</div>,
      dataIndex: 'numberOfCа3Abided',
      key: 'numberOfCа3Abided',
    },
    {
      title: <div>РНХ ялгах урвалжийн лот дугаар</div>,
      dataIndex: 'lotNumberOfRnaIsolationReagent',
      key: 'lotNumberOfRnaIsolationReagent',
    },
    {
      title: <div>РНХ ялгах урвалжийн хүчинтэй хугацаа</div>,
      dataIndex: 'expirationDateOfRnaIsolationReagent',
      key: 'reagentExpiratexpirationDateOfRnaIsolationReagentionDate',
    },
    {
      title: <p>РНХ ялгаж дууссан цаг</p>,
      dataIndex: 'completionDateOfRnaIsolation',
      key: 'completionDateOfRnaIsolation',
    },
    {
      title: <p>Well plate</p>,
      dataIndex: 'deepWellPlate',
      key: 'deepWellPlate',
    },
    {
      title: <p>ПГУ урвалжийн лот дугаар</p>,
      dataIndex: 'lotNumberOfPcrReagent',
      key: 'lotNumberOfPcrReagent',
    },
    {
      title: <p>ПГУ урвалжийн хүчинтэй хугацаа</p>,
      dataIndex: 'expirationDateOfPcrReagent',
      key: 'expirationDateOfPcrReagent',
    },
    {
      title: <p>m2000sp асаасан цаг</p>,
      dataIndex: 'timeWhenTheAbbottM2000spIsTurnedOn',
      key: 'timeWhenTheAbbottM2000spIsTurnedOn',
    },
    {
      title: <p>т2000rt асаасан цаг</p>,
      dataIndex: 'timeWhenTheM2000rtIsTurnedOn',
      key: 'timeWhenTheM2000rtIsTurnedOn',
    },
    {
      title: <p>ПГУ мастер микс дууссан цаг</p>,
      dataIndex: 'timeOfCompletionOfPcrMasterMixPreparation',
      key: 'timeOfCompletionOfPcrMasterMixPreparation',
    },
    {
      title: <p>ПГУ дууссан цаг</p>,
      dataIndex: 'timeOfCompletionOfPcr',
      key: 'timeOfCompletionOfPcr',
    },

    {
      title: 'Тасалгааны хэм',
      dataIndex: 'roomTemperature',
      key: 'roomTemperature',
    },
    {
      title: 'PCR plate',
      dataIndex: 'pcrPlate',
      key: 'pcrPlate',
    },
    {
      title: 'Хариуг баталгаажуулсан',
      dataIndex: 'whoConfirmedTheResultByQualityMonitor',
      key: 'whoConfirmedTheResultByQualityMonitor',
    },
  ]

  const componentRef = useRef()

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test_viralLoadTests/readViralLoadHDVProtocolData',
          payload: {
            testName: props.testName,
            filteredDate: filteredDate,
            appartusType: props.appartusType,
          },
        })
        .then(values => {
          setLoadingRef(true)
          setProtocolDataSource(values)
        })
        .then(() => {
          return dispatch({
            type: 'laboratory_test_viralLoadTests/queryViralLoadTests',
            payload: {
              testNameString: 'HDV_RNA',
              filteredDate: filteredDate,
            },
          })
        })
        .then(result => {
          setLabTestDatasource(result)
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
            <TestProtocolsHeader title=" HDV-RNA | XCB-ийн идэвхжил тодорхойлох шинжилгээний протокол" />
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
              dataSource={protocolDataSource}
              columns={protocolColumns}
              className={styles.container}
              pagination={false}
              loading={loadingRef}
            />
            <br />
            <Table
              columns={labTestColumns}
              dataSource={labTestDataSource}
              pagination={false}
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

ProtocolAbbottPrint.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_viralLoadTests, loading }) => ({
  app,
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(Form.create()(ProtocolAbbottPrint)))
