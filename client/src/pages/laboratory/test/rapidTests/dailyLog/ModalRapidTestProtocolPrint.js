import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Modal, Button, Table, Form } from 'antd'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import { getDate } from 'utils/datetime'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'

const ModalRapidTestProtocolPrint = props => {
  console.log('propsssssssss', props)
  const { laboratory_test_rapidTests } = props
  const { SUB_TEST_NAMES } = laboratory_test_rapidTests
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    props
      .dispatch({
        type: 'laboratory_test_rapidTests/readProtocolDataPrint',
        payload: {
          testName: props.testName,
        },
      })
      .then(values => {
        const newDataSource = []
        Object.keys(values.values).map(key => {
          if (Object.keys(SUB_TEST_NAMES).includes(key)) {
            const row = {
              reagentName: key,
              reagentLotNumber: values.values[key].sampleLotNum,
              expirationDate: values.values[key].sampleExpiration,
              totalSampleNumber: values.values[key].samplesNum,
              sazNumber: values.values[key].ca3Num,
              temperature: values.values[key].temparature,
              description: values.values[key].descriptionNotes,
              startTime: values.values.startTime,
              endTime: values.values.endTime,
            }
            newDataSource.push(row)
          }
        })

        console.log(newDataSource)
        setDataSource(newDataSource)
      })

      .catch(errorInfo => console.log(errorInfo))
  }, [props.visible])

  const componentRef = useRef()

  const columns = [
    {
      title: (
        <div style={{ transform: 'rotate(-90deg)' }}>
          Шинжилгээ <br />
          эхэлсэн цаг
        </div>
      ),
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: (
        <div style={{ transform: 'rotate(-90deg)' }}>
          Шинжилгээ <br />
          дууссан цаг
        </div>
      ),
      dataIndex: 'endTime',
      key: 'endTime',
    },

    {
      title: <div style={{ transform: 'rotate(-90deg)' }}>урвалжийн нэр</div>,
      dataIndex: 'reagentName',
      key: 'reagentName',
    },
    {
      title: 'урвалж',
      children: [
        {
          title: (
            <p style={{ transform: 'rotate(-90deg)' }}>
              лот
              <br /> дугаар
            </p>
          ),
          dataIndex: 'reagentLotNumber',
          key: 'reagentLotNumber',
        },
        {
          title: (
            <p style={{ transform: 'rotate(-90deg)' }}>
              дуусах
              <br /> хугацаа
            </p>
          ),
          dataIndex: 'expirationDate',
          key: 'expirationDate',
        },
      ],
    },

    {
      title: (
        <p style={{ transform: 'rotate(-90deg)' }}>
          нийт шинжилсэн
          <br /> сорьцын тоо
        </p>
      ),
      dataIndex: 'totalSampleNumber',
      key: 'totalSampleNumber',
    },
    {
      title: (
        <p style={{ transform: 'rotate(-90deg)' }}>
          мөрдөж ажилласан
          <br /> саз дугаар
        </p>
      ),
      dataIndex: 'sazNumber',
      key: 'sazNumber',
    },
    {
      title: <p style={{ transform: 'rotate(-90deg)' }}>тасалгааны хэм</p>,
      dataIndex: 'temperature',
      key: 'temperature',
    },

    {
      title: 'тайлбар',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()
  return (
    <div>
      <Form>
        <Modal
          visible={props.visible}
          onCancel={props.onCancel}
          maskClosable={true}
          closable={false}
          width="60%"
          footer={[
            <Button className="button-gray" onClick={props.onCancel}>
              <Trans id="Return" />
            </Button>,

            <ReactToPrint
              trigger={() => (
                <Button type="primary">
                  <Trans id="Print" />
                </Button>
              )}
              content={() => componentRef.current}
              pageStyle={'@page {size: landscape}'}
            />,
          ]}
        >
          <div ref={componentRef}>
            <TestProtocolsHeader title="Түргэвчилсэн тестийн проткол" />
            <Table
              id="capture"
              columns={columns}
              dataSource={dataSource}
              layout="fixed"
              bordered={true}
              size="middle"
              className={styles.container}
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
ModalRapidTestProtocolPrint.propTypes = {
  laboratory_test_rapidTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_rapidTests, loading }) => ({
  app,
  laboratory_test_rapidTests,
  loading,
}))(withI18n()(Form.create()(ModalRapidTestProtocolPrint)))
