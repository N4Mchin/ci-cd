import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import * as helper from 'utils/helper'
import {
  Button,
  Row,
  Col,
  Form,
  Input,
  TimePicker,
  Table,
  Pagination,
  DatePicker,
  Spin,
} from 'antd'
import { getDate } from 'utils/datetime'
import { MessageModal, Board, SelectItem } from 'components'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import ProtocolBlank from './ProtocolBlank'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'
const { TextArea } = Input
const Protocol = props => {
  const { form, dispatch, loading, i18n } = props
  const [pageIndex, setPageIndex] = useState(1)
  const { getFieldDecorator } = form
  const moment = require('moment')

  const onPageChange = value => {
    setPageIndex(value)
  }
  const componentRef = useRef()

  const columns = [
    {
      title: <div>Бүртгэсэн огноо</div>,
      dataIndex: 'registeredDate',
      key: 'registeredDate',
    },
    {
      title: <div>Аппаратны төрөл</div>,
      dataIndex: 'appartusType',
      key: 'appartusType',
    },
    {
      title: <div>Шинжилгээ эхэлсэн цаг</div>,
      dataIndex: 'timeOfAnalysis',
      key: 'timeOfAnalysis',
    },
    {
      title: <div>Шинжилгээ дууссан цаг</div>,
      dataIndex: 'timeoutOfAnalysis',
      key: 'timeoutOfAnalysis',
    },
    {
      title: <div>Урвалжийн лот дугаар</div>,
      dataIndex: 'reagentLotNumber',
      key: 'reagentLotNumber',
    },
    {
      title: <div>Урвалжийн дуусах хугацаа</div>,
      dataIndex: 'reagentExpirationDate',
      key: 'reagentExpirationDate',
    },

    {
      title: 'Шинжилсэн сорьцын тоо',
      dataIndex: 'testedSpecimen',
      key: 'testedSpecimen',
    },
    {
      title: 'Мөрдөж ажиллсан САЗ дугаар',
      dataIndex: 'sazNumber',
      key: 'sazNumber',
    },

    {
      title: 'Тасалгааны хэм',
      dataIndex: 'roomTemperature',
      key: 'roomTemperature',
    },
    {
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  const protocolColumns = [
    {
      title: <div>Бүртгэсэн огноо</div>,
      dataIndex: 'registeredDate',
      key: 'registeredDate',
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
      title: <div>Шинжилгээ эхэлсэн цаг</div>,
      dataIndex: 'timeOfAnalysis',
      key: 'timeOfAnalysis',
    },
    {
      title: <div>Шинжилгээ дууссан цаг</div>,
      dataIndex: 'timeoutOfAnalysis',
      key: 'timeoutOfAnalysis',
    },
    {
      title: <div>Урвалжийн лот дугаар</div>,
      dataIndex: 'reagentLotNumber',
      key: 'reagentLotNumber',
    },
    {
      title: <div>Урвалжийн дуусах хугацаа</div>,
      dataIndex: 'reagentExpirationDate',
      key: 'reagentExpirationDate',
    },

    {
      title: 'Шинжилсэн сорьцын тоо',
      dataIndex: 'testedSpecimen',
      key: 'testedSpecimen',
    },
    {
      title: 'Мөрдөж ажиллсан САЗ дугаар',
      dataIndex: 'sazNumber',
      key: 'sazNumber',
    },

    {
      title: 'Тасалгааны хэм',
      dataIndex: 'roomTemperature',
      key: 'roomTemperature',
    },
    {
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  const dataSource = [
    {
      key: '1',
      registeredDate: (
        <Form.Item>
          {getFieldDecorator(`registeredDate`, {
            rules: [{ required: false }],
          })(<DatePicker />)}
        </Form.Item>
      ),
      appartusType: (
        <Form.Item>
          {getFieldDecorator(`appartusType`, {
            rules: [{ required: false }],
          })(<SelectItem />)}
        </Form.Item>
      ),
      timeOfAnalysis: (
        <Form.Item>
          {getFieldDecorator(`timeOfAnalysis`, {
            rules: [{ required: false }],
          })(<TimePicker use12Hours format="h:mm A" />)}
        </Form.Item>
      ),
      timeoutOfAnalysis: (
        <Form.Item>
          {getFieldDecorator(`timeoutOfAnalysis`, {
            rules: [{ required: false }],
          })(<TimePicker use12Hours format="h:mm A" />)}
        </Form.Item>
      ),
      reagentLotNumber: (
        <Form.Item>
          {getFieldDecorator(`reagentLotNumber`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      reagentExpirationDate: (
        <Form.Item>
          {getFieldDecorator(`reagentExpirationDate`, {
            rules: [{ required: false }],
          })(<DatePicker />)}
        </Form.Item>
      ),
      testedSpecimen: (
        <Form.Item>
          {getFieldDecorator(`testedSpecimen`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      sazNumber: (
        <Form.Item>
          {getFieldDecorator(`sazNumber`, {
            rules: [{ required: false }],
            initialValue: 'САЗ800',
          })(<Input></Input>)}
        </Form.Item>
      ),

      roomTemperature: (
        <Form.Item>
          {getFieldDecorator(`roomTemperature`, {
            rules: [{ required: false }],
          })(<Input></Input>)}
        </Form.Item>
      ),
      description: (
        <Form.Item>
          {getFieldDecorator(`description`, {
            rules: [{ required: false }],
          })(<TextArea />)}
        </Form.Item>
      ),
    },
  ]

  const [modalMessageVisible, showMessageModal] = useState(false)
  const [protocolDataSource, setProtocolDataSource] = useState(false)
  const [loadingRef, setLoadingRef] = useState(false)
  const [filteredDate, setFilteredDate] = useState()

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test/readTestProtocolData',
          payload: {
            testName: props.testName,
            filteredDate: filteredDate,
          },
        })
        .then(values => {
          setProtocolDataSource(values)
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingRef(false))
    }
  }, [filteredDate])

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        return dispatch({
          type: 'laboratory_test/saveProtocolData',
          payload: {
            testName: props.testName,
            values,
          },
        })
      })
      .then(() => {
        setTimeout(() => showMessageModal(true), 150)
        // refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    // refresh()
  }, [])

  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }

  return (
    <div>
      <Board inner>
        {pageIndex === 1 && (
          <div>
            <Form>
              <Row style={{ marginTop: '20px' }}>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  className={styles.container1}
                  bordered={true}
                  pagination={false}
                  loading={loadingRef}
                />
              </Row>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: '20px',
                }}
              >
                <Col span={3}>
                  <Button
                    className="button-red"
                    onClick={onSubmit}
                    block
                    loading={
                      loading.effects['laboratory_test/saveProtocolData']
                    }
                  >
                    <Trans>Save</Trans>
                  </Button>
                </Col>
              </div>

              <div
                style={{
                  border: 'solid',
                  borderWidth: '1px',
                  width: '100%',
                  marginTop: '30px',
                }}
              />
              <div className={styles.firstDiv}>
                <div ref={componentRef}>
                  <TestProtocolsHeader />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginTop: '30px',
                    }}
                  >
                    <Col>
                      <span>Огноо: {getDate()}</span>
                    </Col>
                    <Col>
                      <span className="bold">
                        {props.testName} тодорхойлох ФХЭБУА
                      </span>
                    </Col>
                    <Col>
                      {' '}
                      <DatePicker
                        style={{ width: '120px' }}
                        onChange={onDatePickerChange}
                      />
                    </Col>
                  </div>
                  <Row style={{ height: '30px' }}></Row>
                  {loadingRef && <Spin spinning />}
                  {!loadingRef && (
                    <Table
                      dataSource={protocolDataSource}
                      columns={protocolColumns}
                      className={styles.container1}
                      bordered={true}
                      pagination={false}
                      loading={loadingRef}
                    />
                  )}

                  <RecordedLaboratoryTechnician
                    recordedLaboratoryTechnician={recordedLaboratoryTechnician}
                  />
                </div>
              </div>

              <Row gutter={8} style={{ marginTop: '20px' }}>
                <Col span={21}></Col>
                <Col span={3}>
                  <ReactToPrint
                    trigger={() => (
                      <Button type="primary" block>
                        <Trans>Print</Trans>
                      </Button>
                    )}
                    content={() => componentRef.current}
                    pageStyle={'@page {size: landscape}'}
                  />
                  ,
                </Col>
              </Row>
            </Form>
          </div>
        )}

        {pageIndex === 2 && (
          <div>
            <ProtocolBlank testName={props.testName} />
          </div>
        )}

        <Pagination
          simple
          defaultCurrent={1}
          total={20}
          onChange={onPageChange}
        />
        <MessageModal
          type="success"
          visible={modalMessageVisible}
          onCancel={() => showMessageModal(false)}
          content={i18n.t`Save successful`}
        />
      </Board>
    </div>
  )
}

Protocol.propTypes = {
  laboratory_test_antiHDV: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test_antiHDV }) => ({
  app,
  loading,
  laboratory_test_antiHDV,
}))(withI18n()(Form.create()(Protocol)))
