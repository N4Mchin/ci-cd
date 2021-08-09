import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import * as helper from 'utils/helper'
import ReactToPrint from 'react-to-print'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { getDate, getMonth, getDaysInMonth } from 'utils/datetime'
import { Button, Select, Row, Col, Skeleton, Checkbox, Form, Table } from 'antd'
import { MessageModal, Board } from 'components'
import { RecordedLaboratoryTechnician } from '../../components'
import { TestProtocolsHeader } from '../../../components'
const formItemLayout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 },
}
const { Option } = Select

const dataArray = [
  {
    dataIndex: '1',
    rowName: 'cleanedDeviceSurface',
    service: (
      <div style={{ textAlign: 'left' }}>Төхөөрөмжийн гадаргууг цэвэрлэх </div>
    ),
  },
  {
    dataIndex: '2',
    rowName: 'WashedRulerAndNeedle',
    service: <div style={{ textAlign: 'left' }}>Шугам ба зүүний угаалт </div>,
  },
  {
    dataIndex: '3',
    rowName: 'removedCondensation',
    service: <div style={{ textAlign: 'left' }}>Конденсацийг арилгах</div>,
  },
  {
    dataIndex: '4',
    rowName: 'mixReagent',
    service: <div style={{ textAlign: 'left' }}>Урвалжийг холих </div>,
  },
  {
    dataIndex: '5',
    rowName: 'weeklyService',
    service: <div style={{ textAlign: 'left' }}>7 хоног тутмын үйлчилгээ </div>,
  },
  {
    dataIndex: '6',
    rowName: 'cleanedNeedleAndSolutionArea ',
    service: (
      <div style={{ textAlign: 'left' }}>
        Зүү угаагч уусмалын тавиурыг цэвэрлэх
      </div>
    ),
  },
  {
    dataIndex: '7',
    rowName: 'monthlyService',
    service: <div style={{ textAlign: 'left' }}>Сар тутмын үйчлгилгээ </div>,
  },
  {
    dataIndex: '8',
    rowName: 'setPressure',
    service: <div style={{ textAlign: 'left' }}>Даралтыг тохируулах </div>,
  },
  {
    dataIndex: '9',
    rowName: 'monitorLiquidLevelAndRemovedLiquidFromPartitionCamera ',
    service: (
      <div style={{ textAlign: 'left' }}>
        Шингэний түвшинг хянах ба таславч камераас шингэнийг зайлуулах{' '}
      </div>
    ),
  },

  {
    dataIndex: '10',
    rowName: 'other',
    service: <div style={{ textAlign: 'left' }}>Бусад</div>,
  },

  {
    dataIndex: '11',
    rowName: 'cleanedSampleSnout',
    service: <div style={{ textAlign: 'left' }}>Сорьцын хошууг цэвэрлэх </div>,
  },
  {
    dataIndex: '12',
    rowName: 'switchedMembraneFilter  ',
    service: <div style={{ textAlign: 'left' }}>Мембран фильтрийг солих </div>,
  },
  {
    dataIndex: '13',
    rowName: 'monitorTrayAndSampleBarcodeScanning ',
    service: (
      <div style={{ textAlign: 'left' }}>
        Тавиур ба сорьцын баганан код уншилтыг хянах{' '}
      </div>
    ),
  },
]

const Analyzator = props => {
  const { form, dispatch, loading, i18n } = props
  const [loadingRef, setLoadingRef] = useState(false)
  const [dataSource, setDataSource] = useState([...dataArray])
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(getMonth())
  const columns = [
    {
      title: 'Үйлчилгээ /хоног',
      dataIndex: 'service',
      key: 'service',
      width: 100,
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
        if (rowIndex === 4) {
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

        if (rowIndex === 6) {
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

        if (rowIndex === 9) {
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

  let date = getDate()
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

      .then(async () => {
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
                  Тоног төхөөрөмжийн техник үйлчилгээ, угаалга, цэвэрлэгээний
                  бүртгэл
                </span>
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
            <div>
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
