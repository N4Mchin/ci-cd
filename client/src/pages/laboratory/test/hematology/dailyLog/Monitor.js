import React, { useState, useRef, useEffect } from 'react'
import PropTypes, { element } from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import { Button, Select, Col, Input, Table, DatePicker, Form } from 'antd'
import { MessageModal, Board } from 'components'
import { getDate } from 'utils/datetime'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'
const moment = require('moment')
const { TextArea } = Input
const { Option } = Select

const Protocol = props => {
  const { dispatch, loading, form, i18n } = props
  const { getFieldDecorator } = form
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [loadingRef, setLoadingRef] = useState(false)
  const [lotNumberOptions, setLotNumberOptions] = useState()
  const [filteredDate, setFilteredDate] = useState()
  const [protocolDataSource, setProtocolDataSource] = useState()
  const componentRef = useRef()

  const columns = [
    {
      title: 'Хяналтын материалын нэр',
      dataIndex: 'materialName',
      key: 'materialName',
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`materialName`, {
                rules: [{ required: false }],
                initialValue: 'Eightcheck -3WP-Low',
              })(
                <Select>
                  <Option value="Eightcheck-3WP-Low">
                    Eightcheck -3WP-Low
                  </Option>
                  <Option value="Eightcheck-3WP-Medium">
                    Eightcheck -3WP-Medium
                  </Option>
                  <Option value="Eightcheck-3WP-High">
                    Eightcheck -3WP-High
                  </Option>
                </Select>
              )}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Лот дугаар / Дуусах хугацаа',
      dataIndex: 'reagentLotNumberAndExpirationDate',
      key: 'reagentLotNumberAndExpirationDate',
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`reagentLotNumberAndExpirationDate`, {
                rules: [{ required: false }],
              })(
                <Select>
                  {lotNumberOptions &&
                    lotNumberOptions.map(opt => {
                      return <Option value={opt}>{opt}</Option>
                    })}
                </Select>
              )}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Хяналтын материалын үр дүн хэвийн эсэх',
      dataIndex: 'isNormal',
      key: 'isNormal',
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`isNormal`, {
                rules: [{ required: false }],
                initialValue: 'Хэвийн бус',
              })(
                <Select>
                  <Option value="normal">Хэвийн</Option>
                  <Option value="abnormal">Хэвийн бус</Option>
                </Select>
              )}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Хазайлтын тэмдэглэл',
      dataIndex: 'description',
      key: 'description',
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`description`, {
                rules: [{ required: false }],
                initialValue: 'Хэвийн бус',
              })(
                <Select>
                  <Option value="normal">Хэвийн</Option>
                  <Option value="abnormal">Хэвийн бус</Option>
                </Select>
              )}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Залруулах арга хэмжээ',
      dataIndex: 'decision',
      key: 'decision',
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`decision`, {
                rules: [{ required: false }],
              })(<TextArea />)}
            </Form.Item>
          </div>
        )
      },
    },
  ]

  const protocolColumns = [
    {
      title: 'Бүртгэсэн огноо',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Хяналтын материалын нэр',
      dataIndex: 'materialName',
      key: 'materialName',
    },
    {
      title: 'Лот дугаар / Дуусах хугацаа',
      dataIndex: 'reagentLotNumberAndExpirationDate',
      key: 'reagentLotNumberAndExpirationDate',
    },
    {
      title: 'Хяналтын материалын үр дүн хэвийн эсэх',
      dataIndex: 'isNormal',
      key: 'isNormal',
    },
    {
      title: 'Хазайлтын тэмдэглэл',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Залруулах арга хэмжээ',
      dataIndex: 'decision',
      key: 'decision',
    },
  ]

  const dataSource = [
    {
      key: '1',
      materialName: (
        <div>
          <Form.Item>
            {getFieldDecorator(`materialName`, {
              rules: [{ required: false }],
              initialValue: 'Eightcheck -3WP-Low',
            })(<Input style={{ width: '70%', fontSize: '10px' }} />)}
          </Form.Item>
        </div>
      ),
      lotNumberExpirationDate: <div></div>,
      isNormal: <div></div>,
      note: <div> </div>,
      decision: <div> </div>,
    },
  ]

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        return dispatch({
          type: 'laboratory_test/saveMonitorOfHematology',
          payload: {
            testName: props.testName,
            values,
          },
        })
      })
      .then(() => {
        setTimeout(() => showMessageModal(true), 150)
        refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }
  useEffect(() => {
    props
      .dispatch({
        type: 'laboratory_test/readReagent',
        payload: {
          testName: props.testName,
        },
      })
      .then(values => {
        let newLotNumberOptions = []
        newLotNumberOptions = values.map(
          value => value.reagentLotNumber + ' ' + value.reagentExpirationDate
        )
        setLotNumberOptions(newLotNumberOptions)
      })
  }, [])

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test/queryMonitorOfHematology',
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

  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()
  return (
    <div>
      <Board inner>
        <div>
          <Form>
            <Table
              dataSource={dataSource}
              columns={columns}
              bordered={true}
              className={styles.container}
              pagination={false}
              loading={loadingRef}
            />
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
                  block
                  onClick={onSubmit}
                  loading={loading.effects['laboratory_test/saveMonitor']}
                >
                  <Trans>Save</Trans>
                </Button>
              </Col>
            </div>

            <div className={styles.firstDiv} ref={componentRef}>
              <TestProtocolsHeader
                documentName="БҮ-ЭТ-011"
                version="2"
                approvedDate="2020.05.04"
              />
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
                  {' '}
                  <span className="bold">
                    Цусны дэлгэрэнгүй шинжилгээний дотоод хяналт
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
              <br />
              <Table
                dataSource={protocolDataSource}
                columns={protocolColumns}
                bordered={true}
                className={styles.container}
                pagination={false}
                loading={loadingRef}
              />
            </div>
          </Form>
          <RecordedLaboratoryTechnician
            recordedLaboratoryTechnician={recordedLaboratoryTechnician}
          />
        </div>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
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
          </div>
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

export default connect(({ app, loading, laboratory_test, dispatch }) => ({
  app,
  loading,
  laboratory_test,
  dispatch,
}))(withI18n()(Form.create()(Protocol)))
