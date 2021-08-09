import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import ReactToPrint from 'react-to-print'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import {
  Button,
  Select,
  Row,
  Col,
  Table,
  Form,
  DatePicker,
  Input,
  Pagination,
} from 'antd'
import { getDate } from 'utils/datetime'
import moment from 'moment'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import { Board } from 'components'
import { RecordedLaboratoryTechnician } from '../../components'
const { TextArea } = Input
const { Option } = Select

const Protocol = props => {
  const { form } = props

  const { getFieldDecorator } = form
  const [pageIndex, setPageIndex] = useState(1)

  const [filteredDate, setFilteredDate] = useState(getDate())
  const [dataSource, setDataSource] = useState([])
  const [loadingRef, setLoadingRef] = useState(false)
  const componentRef = useRef()

  const onPageChange = value => {
    setPageIndex(value)
  }

  const columns = [
    {
      title: 'огноо',
      dataIndex: 'Date',
      key: 'Date',
      render: (text, record) => {
        return record.date
      },
    },
    {
      title: 'Нэр',
      dataIndex: 'patientName',
      key: 'patientName',
      render: (text, record) => {
        const patientName = record.patient.getOfficialNameString({
          short: true,
        })
        return patientName
      },
    },
    {
      title: 'Сорьцын баркод',
      dataIndex: 'sampleBarcode',
      key: 'sampleBarcode',
      render: (text, record) => {
        return record.sampleAccessionIdentifier
      },
    },
    {
      title: 'Элэгний үйл ажиллагаа',
      children: [
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>AST</p>,
          dataIndex: 'AST',
          key: 'AST',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.Liver_Function_test &&
                record.include.Liver_Function_test.include &&
                record.include.Liver_Function_test.include.AST &&
                record.include.Liver_Function_test.include.AST
                  .latestObservation &&
                record.include.Liver_Function_test.include.AST.latestObservation
                  .valueQuantity &&
                record.include.Liver_Function_test.include.AST.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>ALT</p>,
          dataIndex: 'ALT',
          key: 'ALT',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.Liver_Function_test &&
                record.include.Liver_Function_test.include &&
                record.include.Liver_Function_test.include.ALT &&
                record.include.Liver_Function_test.include.ALT
                  .latestObservation &&
                record.include.Liver_Function_test.include.ALT.latestObservation
                  .valueQuantity &&
                record.include.Liver_Function_test.include.ALT.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>GGT</p>,
          dataIndex: 'GGT',
          key: 'GGT',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Liver_Function_test &&
                record.include.Liver_Function_test.include &&
                record.include.Liver_Function_test.include.GGT &&
                record.include.Liver_Function_test.include.GGT
                  .latestObservation &&
                record.include.Liver_Function_test.include.GGT.latestObservation
                  .valueQuantity &&
                record.include.Liver_Function_test.include.GGT.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>LDH</p>,
          dataIndex: 'LDH',
          key: 'LDH',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Liver_Function_test &&
                record.include.Liver_Function_test.include &&
                record.include.Liver_Function_test.include.LDH &&
                record.include.Liver_Function_test.include.LDH
                  .latestObservation &&
                record.include.Liver_Function_test.include.LDH.latestObservation
                  .valueQuantity &&
                record.include.Liver_Function_test.include.LDH.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },

        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>ALP</p>,
          dataIndex: 'ALP',
          key: 'ALP',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Liver_Function_test &&
                record.include.Liver_Function_test.include &&
                record.include.Liver_Function_test.include.ALP &&
                record.include.Liver_Function_test.include.ALP
                  .latestObservation &&
                record.include.Liver_Function_test.include.ALP.latestObservation
                  .valueQuantity &&
                record.include.Liver_Function_test.include.ALP.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>BD</p>,
          dataIndex: 'BD',
          key: 'BD',
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>BT</p>,
          dataIndex: 'BT',
          key: 'BT',
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>GLU</p>,
          dataIndex: 'GLU',
          key: 'GLU',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Liver_Function_test &&
                record.include.Liver_Function_test.include &&
                record.include.Liver_Function_test.include.GLU &&
                record.include.Liver_Function_test.include.GLU
                  .latestObservation &&
                record.include.Liver_Function_test.include.GLU.latestObservation
                  .valueQuantity &&
                record.include.Liver_Function_test.include.GLU.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>ALB</p>,
          dataIndex: 'ALB',
          key: 'ALB',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Liver_Function_test &&
                record.include.Liver_Function_test.include &&
                record.include.Liver_Function_test.include.ALB &&
                record.include.Liver_Function_test.include.ALB
                  .latestObservation &&
                record.include.Liver_Function_test.include.ALB.latestObservation
                  .valueQuantity &&
                record.include.Liver_Function_test.include.ALB.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>PRO</p>,
          dataIndex: 'PRO',
          key: 'PRO',
        },
      ],
    },
    {
      title: 'Бөөрний ү/а',
      children: [
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>CRE</p>,
          dataIndex: 'CRE',
          key: 'CRE',
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>UREA</p>,
          dataIndex: 'Urea',
          key: 'Urea',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Kidney_Function_Test &&
                record.include.Kidney_Function_Test.include &&
                record.include.Kidney_Function_Test.include.Urea &&
                record.include.Kidney_Function_Test.include.Urea
                  .latestObservation &&
                record.include.Kidney_Function_Test.include.Urea
                  .latestObservation.valueQuantity &&
                record.include.Kidney_Function_Test.include.Urea
                  .latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>UA</p>,
          dataIndex: 'UA',
          key: 'UA',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Kidney_Function_Test &&
                record.include.Kidney_Function_Test.include &&
                record.include.Kidney_Function_Test.include.UA &&
                record.include.Kidney_Function_Test.include.UA
                  .latestObservation &&
                record.include.Kidney_Function_Test.include.UA.latestObservation
                  .valueQuantity &&
                record.include.Kidney_Function_Test.include.UA.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
      ],
    },
    {
      title: 'Нойр/Б',
      children: [
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>AMY</p>,
          dataIndex: 'AMY',
          key: 'AMY',
        },
      ],
    },
    {
      title: 'Өөх тос',
      children: [
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>CHOL</p>,
          dataIndex: 'CHOL',
          key: 'CHOL',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Lipids &&
                record.include.Lipids.include &&
                record.include.Lipids.include.CHOL &&
                record.include.Lipids.include.CHOL.latestObservation &&
                record.include.Lipids.include.CHOL.latestObservation
                  .valueQuantity &&
                record.include.Lipids.include.CHOL.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>TG</p>,
          dataIndex: 'TG',
          key: 'TG',
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>LDL</p>,
          dataIndex: 'LDL',
          key: 'LDL',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Lipids &&
                record.include.Lipids.include &&
                record.include.Lipids.include.LDL &&
                record.include.Lipids.include.LDL.latestObservation &&
                record.include.Lipids.include.LDL.latestObservation
                  .valueQuantity &&
                record.include.Lipids.include.LDL.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>HDL</p>,
          dataIndex: 'HDL',
          key: 'HDL',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Lipids &&
                record.include.Lipids.include &&
                record.include.Lipids.include.HDL &&
                record.include.Lipids.include.HDL.latestObservation &&
                record.include.Lipids.include.HDL.latestObservation
                  .valueQuantity &&
                record.include.Lipids.include.HDL.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
      ],
    },
    {
      title: 'Үе мөч',
      children: [
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>ASO</p>,
          dataIndex: 'ASO',
          key: 'ASO',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Rheumatology &&
                record.include.Rheumatology.include &&
                record.include.Rheumatology.include.ASO &&
                record.include.Rheumatology.include.ASO.latestObservation &&
                record.include.Rheumatology.include.ASO.latestObservation
                  .valueQuantity &&
                record.include.Rheumatology.include.ASO.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>CRP</p>,
          dataIndex: 'CRP',
          key: 'CRP',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Rheumatology &&
                record.include.Rheumatology.include &&
                record.include.Rheumatology.include.CRP &&
                record.include.Rheumatology.include.CRP.latestObservation &&
                record.include.Rheumatology.include.CRP.latestObservation
                  .valueQuantity &&
                record.include.Rheumatology.include.CRP.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>RF</p>,
          dataIndex: 'RF',
          key: 'RF',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Rheumatology &&
                record.include.Rheumatology.include &&
                record.include.Rheumatology.include.RF &&
                record.include.Rheumatology.include.RF.latestObservation &&
                record.include.Rheumatology.include.RF.latestObservation
                  .valueQuantity &&
                record.include.Rheumatology.include.RF.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
      ],
    },
    {
      title: 'Эрдэс',
      children: [
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>CA</p>,
          dataIndex: 'Ca',
          key: 'Ca',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Electrolytes &&
                record.include.Electrolytes.include &&
                record.include.Electrolytes.include.Ca &&
                record.include.Electrolytes.include.Ca.latestObservation &&
                record.include.Electrolytes.include.Ca.latestObservation
                  .valueQuantity &&
                record.include.Electrolytes.include.Ca.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>FE</p>,
          dataIndex: 'Fe',
          key: 'Fe',
          render: (text, record) => {
            const data = {
              value:
                record.include &&
                record.include.Electrolytes &&
                record.include.Electrolytes.include &&
                record.include.Electrolytes.include.Fe &&
                record.include.Electrolytes.include.Fe.latestObservation &&
                record.include.Electrolytes.include.Fe.latestObservation
                  .valueQuantity &&
                record.include.Electrolytes.include.Fe.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>PHO</p>,
          dataIndex: 'PHO',
          key: 'PHO',
        },
      ],
    },
    {
      title: 'Нийт',
      dataIndex: 'total',
      key: 'total',
    },
  ]

  const columns1 = [
    {
      title: <div style={{ width: '100%' }}>Үйлчлүүлэгчийн код</div>,
      dataIndex: 'barcode',
      key: 'barcode',
      render: (text, record) => {
        return record.patientNumber
      },
    },
    {
      title: 'Тайлбар',
      dataIndex: 'Description',
      key: 'Description',
      render: (text, record) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`Description`, {
                rules: [{ required: false }],
              })(<TextArea style={{ width: '50%' }} />)}
            </Form.Item>
          </div>
        )
      },
    },
  ]

  const formItemLayout = {
    labelCol: { span: 14 },
    wrapperCol: { span: 10 },
  }

  useEffect(() => {
    setLoadingRef(true)
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test/queryTestsVerified',
          payload: {
            labTestCode:
              props.app.FHIR_CODES && props.app.FHIR_CODES.BiochemistryTests,
            filteredDate: filteredDate,
          },
        })
        .then(result => {
          setDataSource(result.dataSource)
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
      <Board inner>
        {pageIndex === 1 && (
          <div>
            <div className={styles.firstDiv} ref={componentRef}>
              <TestProtocolsHeader documentName="М-ЭТ-021" />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginTop: '20px',
                }}
              >
                <Col>
                  <span>Огноо: {getDate()}</span>
                </Col>
                <Col>
                  {' '}
                  <span className="bold">Биохимийн шинжилгээний протокол</span>
                </Col>
                <Col>
                  {' '}
                  <DatePicker
                    style={{ width: '120px' }}
                    onChange={onDatePickerChange}
                  />{' '}
                </Col>
                <Col style={{ marginRight: '5px' }}>
                  <Form.Item label="Аппаратны төрөл " {...formItemLayout}>
                    {getFieldDecorator(`appartusType`, {
                      rules: [{ required: false }],
                      initialValue: 'XL-200',
                    })(
                      <Select>
                        <Option value="XL-200">XL-200</Option>
                        <Option value="XP-100">XP-100</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </div>

              <Row style={{ marginTop: '20px' }}></Row>

              <Table
                dataSource={dataSource}
                columns={columns}
                className={styles.container1}
                bordered={true}
                pagination={false}
                loading={loadingRef}
              />

              <RecordedLaboratoryTechnician
                recordedLaboratoryTechnician={recordedLaboratoryTechnician}
              />
            </div>
            <Row gutter={8} style={{ marginTop: '20px' }}>
              <Col span={20}></Col>
              <Col span={2}>
                <ReactToPrint
                  trigger={() => (
                    <Button className="button-dark-gray" block>
                      <Trans>Print</Trans>
                    </Button>
                  )}
                  content={() => componentRef.current}
                  pageStyle={'@page {size: landscape}'}
                />
              </Col>
              <Col span={2}>
                <Button
                  className="button-red uppercase"
                  block
                  // onClick={() => showModalProtocolSave(true)}
                >
                  <Trans>Save</Trans>
                </Button>
              </Col>
            </Row>
          </div>
        )}

        {pageIndex === 2 && (
          <div>
            <div className={styles.firstDiv}>
              <Row gutter={8}>
                <Col>
                  <table className={styles.table} style={{ width: '100%' }}>
                    <tr>
                      <td rowSpan={4}>
                        <img
                          src="/liver-center-logo.png"
                          alt="logo"
                          width="290px"
                          height="60px"
                        ></img>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bold">Баримт №</span>
                      </td>
                      <td rowSpan={2}>
                        <span className="bold">Хувилбар №2</span>
                      </td>
                      <td rowSpan={2}>
                        <span className="bold">Баталсан огноо: </span>2018.08.29
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="bold">БҮ-ЭТ-021</span>
                      </td>
                    </tr>
                  </table>
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
                  <span>Огноо: {getDate()}</span>
                </Col>
                <Col>
                  {' '}
                  <span className="bold">Биохимийн шинжилгээний протокол</span>
                </Col>
                <Col style={{ marginRight: '5px' }}>
                  <Form.Item label="Аппаратны төрөл " {...formItemLayout}>
                    {getFieldDecorator(`appartusType`, {
                      rules: [{ required: false }],
                      initialValue: 'XL-200',
                    })(
                      <Select>
                        <Option value="XL-200">XL-200</Option>
                        <Option value="XP-100">XP-100</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </div>
              <Row style={{ marginTop: '20px' }}></Row>
              <Table
                dataSource={dataSource}
                columns={columns1}
                className={styles.container1}
                bordered={true}
                pagination={false}
                loading={loadingRef}
              />
            </div>
            <RecordedLaboratoryTechnician
              recordedLaboratoryTechnician={recordedLaboratoryTechnician}
            />
            <Row gutter={8} style={{ marginTop: '20px' }}>
              <Col span={20}></Col>
              <Col span={2}>
                <ReactToPrint
                  trigger={() => (
                    <Button className="button-dark-gray" block>
                      <Trans>Print</Trans>
                    </Button>
                  )}
                  content={() => componentRef.current}
                  pageStyle={'@page {size: landscape}'}
                />
              </Col>
              <Col span={2}>
                <Button
                  className="button-red uppercase"
                  block
                  // onClick={() => showModalProtocolSave(true)}
                >
                  <Trans>Save</Trans>
                </Button>
              </Col>
            </Row>
          </div>
        )}
        <Pagination
          simple
          defaultCurrent={1}
          total={20}
          onChange={onPageChange}
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

export default connect(({ app, laboratory_test, loading }) => ({
  app,
  laboratory_test,
  loading,
}))(withI18n()(Form.create()(Protocol)))
