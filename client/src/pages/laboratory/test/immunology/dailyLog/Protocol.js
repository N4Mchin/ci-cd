import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import {
  Button,
  Select,
  Row,
  Col,
  Form,
  Input,
  TimePicker,
  Table,
  DatePicker,
  Spin,
} from 'antd'
import { getDate } from 'utils/datetime'
import { delay } from 'utils/helper'
import { MessageModal, Board } from 'components'
import { RecordedLaboratoryTechnician } from '../../components'
import { TestProtocolsHeader } from '../../../components'
const { TextArea } = Input
const { Option } = Select

const Protocol = props => {
  const { form, dispatch, loading, i18n } = props
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [loadingRef, setLoadingRef] = useState(false)
  const [filteredDate, setFilteredDate] = useState()
  const [protocolDataSource, setProtocolDataSource] = useState(false)
  const [secondProtocolDataSource, setSecondProtocolDataSource] = useState(
    false
  )
  const moment = require('moment')

  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: { span: 14 },
    wrapperCol: { span: 10 },
  }

  const componentRef = useRef()

  const columns = [
    {
      title: <div>Бүртгэсэн огноо</div>,
      dataIndex: 'registeredDate',
      key: 'registeredDate',
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
          })(<TextArea />)}
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
            initialValue: 'CAЗ800',
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

  function refresh() {
    // setLoadingRef(true)
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
  }

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
      .then(async () => {
        await delay(1000)
        showMessageModal(true)
        //   refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
  }
  useEffect(() => {
    refresh()
  }, [filteredDate])

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }

  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()
  return (
    <div>
      <Board inner>
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
                  loading={loading.effects['laboratory_test/saveProtocolData']}
                >
                  <Trans>Save</Trans>
                </Button>
              </Col>
            </div>
          </Form>
          <div className={styles.firstDiv} ref={componentRef}>
            <Row gutter={8}>
              <Col>
                <TestProtocolsHeader />
              </Col>
            </Row>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '30px',
              }}
            >
              {' '}
              <Col>
                <span>Огноо: {getDate()}</span>
              </Col>
              <Col style={{ marginRight: '10px' }}>
                {' '}
                <span className="bold">Иммунологийн шинжилгээний протокол</span>
              </Col>
              <Col>
                {' '}
                <DatePicker
                  style={{ width: '120px' }}
                  onChange={onDatePickerChange}
                />
              </Col>
              <Col>
                <Form.Item {...formItemLayout} label=" Аппаратны төрөл">
                  {getFieldDecorator(`appartusType`, {
                    rules: [{ required: false }],
                    initialValue: 'HISCL-5000',
                  })(
                    <Select>
                      <Option value="HISCL-5000">HISCL-5000</Option>
                      <Option value="XP200">XP200</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </div>
            <div style={{ height: '30px' }}></div>
            {loadingRef && <Spin spinning />}
            {!loadingRef && (
              <Table
                dataSource={protocolDataSource}
                columns={columns}
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
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>

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
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test }) => ({
  app,
  loading,
  laboratory_test,
}))(withI18n()(Form.create()(Protocol)))
