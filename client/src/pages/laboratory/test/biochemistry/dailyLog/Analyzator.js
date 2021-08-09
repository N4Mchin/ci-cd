import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import * as helper from 'utils/helper'
import ReactToPrint from 'react-to-print'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { getMonth, getDaysInMonth } from 'utils/datetime'
import {
  Button,
  Select,
  Skeleton,
  Row,
  Col,
  Checkbox,
  Input,
  Form,
  Table,
} from 'antd'
import { MessageModal, Board } from 'components'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import { RecordedLaboratoryTechnician } from '../../components'

const { Option } = Select
const formItemLayout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 },
}

const dataArray = [
  {
    dataIndex: '1',
    rowName: 'timeWhenTheTurnedOn',
    service: <div style={{ textAlign: 'left' }}>Асаасан цаг </div>,
  },
  {
    dataIndex: '2',
    rowName: 'isCheckAnalyzator',
    service: (
      <div style={{ textAlign: 'left' }}>
        Анализаторын бүрэн бүтэн байдлыг шалгасан эсэх{' '}
      </div>
    ),
  },
  {
    dataIndex: '3',
    rowName: 'autoStart',
    service: (
      <div style={{ textAlign: 'left' }}>
        Авто эхлүүлэх 8 мин процесс явагдсан эсэх
      </div>
    ),
  },
  {
    dataIndex: '4',
    rowName: 'isEnoughReagent',
    service: <div style={{ textAlign: 'left' }}>Урвалж хангалттай эсэх </div>,
  },
  {
    dataIndex: '5',
    rowName: 'checkNotEnoughReagent',
    service: (
      <div style={{ textAlign: 'left' }}>
        Хангалтгүй бол сольсон урвалжийг тэмдэглэ{' '}
      </div>
    ),
  },
  {
    dataIndex: '6',
    rowName: 'firstSampleStatus',
    service: (
      <div style={{ textAlign: 'left' }}>
        Анхдагч сорьцын байдал хэвийн эсэх
      </div>
    ),
  },
  {
    dataIndex: '7',
    rowName: 'totalTestedSample',
    service: (
      <div style={{ textAlign: 'left' }}>Нийт шинжилсэн сорьцын тоо </div>
    ),
  },
  {
    dataIndex: '8',
    rowName: 'secondTestedSample',
    service: (
      <div style={{ textAlign: 'left' }}>Давтан шинжилсэн сорьцын тоо </div>
    ),
  },
]

const Analyzator = props => {
  const { form, dispatch, loading, i18n } = props
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [loadingRef, setLoadingRef] = useState(false)
  const [dataSource, setDataSource] = useState([...dataArray])
  const [selectedMonth, setSelectedMonth] = useState(getMonth())
  const columns = [
    {
      title: 'Үйлчилгээ /хоног',
      dataIndex: 'service',
      key: 'service',
      width: 100,
      fixed: 'left',
    },
  ]
  const days = getDaysInMonth(selectedMonth)
  for (let dayIndex = 1; dayIndex <= days; dayIndex++) {
    const col = {
      title: dayIndex.toString(),
      dataIndex: `day_${dayIndex}`,
      key: dayIndex.toString(),
      width: 10,
      render: (text, record, rowIndex) => {
        if (rowIndex === 0 || rowIndex === 6 || rowIndex === 7) {
          return {
            children: (
              <div>
                <Form.Item>
                  {getFieldDecorator(`${record.rowName}.day_${dayIndex}`, {
                    initialValue: text,
                    rules: [{ required: false }],
                  })(<Input style={{ width: '50px' }} />)}
                </Form.Item>
              </div>
            ),
            props: {
              //colSpan: 2,
            },
          }
        }

        if (rowIndex === 16) {
          if (dayIndex === 1) {
            return {
              children: <a>{text}</a>,
              props: {
                colSpan: 31,
              },
            }
          }

          return {
            props: {
              colSpan: 0,
            },
          }
        }

        return (
          <Form.Item>
            {getFieldDecorator(`${record.rowName}.day_${dayIndex}`, {
              valuePropName: 'checked',
              initialValue: text,
              rules: [{ required: false }],
            })(<Checkbox></Checkbox>)}
          </Form.Item>
        )
      },
    }

    columns.push(col)
  }
  const { getFieldDecorator } = form
  const componentRef = useRef()

  function refresh() {
    setLoadingRef(true)
    return props
      .dispatch({
        type: 'laboratory_test/readAnalyzator',
        payload: {
          testName: props.testName,
          month: selectedMonth,
        },
      })
      .then(values => {
        const newDataSource = []

        dataArray.map(data => {
          const row = {
            rowName: data.rowName,
            dataIndex: data.dataIndex,
            service: data.service,
          }

          const key = data.rowName

          if (values && values[key] && helper.isObject(values[key])) {
            const days = {}
            Object.keys(values[key]).map(valueKey => {
              days[valueKey] = values[key][valueKey]
            })

            Object.assign(row, {
              ...days,
            })
          }

          newDataSource.push(row)
        })
        setDataSource(newDataSource)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingRef(false))
  }

  const onSubmit = () => {
    form
      .validateFields()
      .then(values => {
        return dispatch({
          type: 'laboratory_test/saveAnalyzator',
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

  useEffect(() => {
    refresh()
  }, [selectedMonth])

  const onSelectChange = value => {
    setSelectedMonth(value)
  }

  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  return (
    <div ref={componentRef}>
      <Board inner>
        <Form>
          {' '}
          <div className={styles.firstDiv}>
            <TestProtocolsHeader
              documentName="М-ЭТ-021"
              approvedDate="2018.08.29"
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
                <Form.Item label="Сар" {...formItemLayout}>
                  {getFieldDecorator(`month`, {
                    rules: [{ required: false }],
                    initialValue: getMonth(),
                  })(
                    <Select style={{ width: '60px' }} onChange={onSelectChange}>
                      <Option value="01">1</Option>
                      <Option value="02">2</Option>
                      <Option value="03">3</Option>
                      <Option value="04">4</Option>
                      <Option value="05">5</Option>
                      <Option value="06">6</Option>
                      <Option value="07">7</Option>
                      <Option value="08">8</Option>
                      <Option value="09">9</Option>
                      <Option value="10">10</Option>
                      <Option value="11">11</Option>
                      <Option value="12">12</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col>
                {' '}
                <span className="bold">
                  Биохимийн шинжилгээний анализаторын бүртгэл
                </span>
              </Col>

              <Col style={{ marginRight: '5px' }}>
                <Form.Item label="Аппаратны төрөл " {...formItemLayout}>
                  {getFieldDecorator(`appartusType`, {
                    rules: [{ required: false }],
                    initialValue: 'XL-200',
                  })(
                    <Select>
                      <Option value="XL-200">XL-200</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </div>
            <div style={{ marginTop: '30px' }}>
              {loadingRef !== true ? (
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  bordered={true}
                  className={styles.container}
                  pagination={false}
                  scroll={{ x: 'max-content' }}
                  loading={loadingRef}
                />
              ) : (
                <Skeleton loading={loading} active paragraph={{ rows: 8 }} />
              )}
            </div>
            <RecordedLaboratoryTechnician
              recordedLaboratoryTechnician={recordedLaboratoryTechnician}
            />
          </div>
          <Row gutter={8} style={{ marginTop: '30px' }}>
            <Col span={20}></Col>
            <Col span={2}>
              <ReactToPrint
                trigger={() => (
                  <Button className="button-gray" block>
                    <Trans>Print</Trans>
                  </Button>
                )}
                content={() => componentRef.current}
                pageStyle={'@page {size: landscape}'}
              />
              ,
            </Col>
            <Col span={2}>
              <Button
                className="button-red"
                block
                onClick={onSubmit}
                loading={loading.effects['laboratory_test/saveAnalyzator']}
              >
                <Trans>Save</Trans>
              </Button>
            </Col>
          </Row>
        </Form>

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

Analyzator.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test, loading, dispatch }) => ({
  app,
  laboratory_test,
  loading,
  dispatch,
}))(withI18n()(Form.create()(Analyzator)))
