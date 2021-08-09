import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import ModalProtocolSave from './ModalProtocolSave'
import {
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Table,
  Form,
  Pagination,
  Input,
} from 'antd'
import { getDate } from 'utils/datetime'
import { Board } from 'components'
import TestProtocolsHeader from '../../../components/TestProtocolsHeader'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'

const { Option } = Select
const formItemLayout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 },
}

const { TextArea } = Input
const Protocol = props => {
  const { loading, form } = props

  const { getFieldDecorator } = form

  const columns = [
    {
      title: 'Огноо',
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
      title: 'Үзүүлэлтийн нэр',
      children: [
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>WBC</p>,
          dataIndex: 'WBC',
          key: 'WBC',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.WBC &&
                record.include.WBC.latestObservation &&
                record.include.WBC.latestObservation.valueQuantity &&
                record.include.WBC.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>HCT</p>,
          dataIndex: 'HCT',
          key: 'HCT',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.HCT &&
                record.include.HCT.latestObservation &&
                record.include.HCT.latestObservation.valueQuantity &&
                record.include.HCT.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>MCHC</p>,
          dataIndex: 'MCHC',
          key: 'MCHC',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.MCHC &&
                record.include.MCHC.latestObservation &&
                record.include.MCHC.latestObservation.valueQuantity &&
                record.include.MCHC.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>MXD%</p>,
          dataIndex: 'MixedPercent',
          key: 'MixedPercent',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.MixedPercent &&
                record.include.MixedPercent.latestObservation &&
                record.include.MixedPercent.latestObservation.valueQuantity &&
                record.include.MixedPercent.latestObservation.valueQuantity
                  .value,
            }
            return data.value
          },
        },

        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>MXD#</p>,
          dataIndex: 'MixedCount',
          key: 'MixedCount',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.MixedCount &&
                record.include.MixedCount.latestObservation &&
                record.include.MixedCount.latestObservation.valueQuantity &&
                record.include.MixedCount.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>RDW-CV</p>,
          dataIndex: 'RDWcv',
          key: 'RDWcv',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.RDWcv &&
                record.include.RDWcv.latestObservation &&
                record.include.RDWcv.latestObservation.valueQuantity &&
                record.include.RDWcv.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>P-LCR</p>,
          dataIndex: 'PLCR',
          key: 'PLCR',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.PLCR &&
                record.include.PLCR.latestObservation &&
                record.include.PLCR.latestObservation.valueQuantity &&
                record.include.PLCR.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>RBC</p>,
          dataIndex: 'RBC',
          key: 'RBC',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.RBC &&
                record.include.RBC.latestObservation &&
                record.include.RBC.latestObservation.valueQuantity &&
                record.include.RBC.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>MCV</p>,
          dataIndex: 'MCV',
          key: 'MCV',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.MCV &&
                record.include.MCV.latestObservation &&
                record.include.MCV.latestObservation.valueQuantity &&
                record.include.MCV.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>PLT</p>,
          dataIndex: 'PLT',
          key: 'PLT',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.PLT &&
                record.include.PLT.latestObservation &&
                record.include.PLT.latestObservation.valueQuantity &&
                record.include.PLT.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>NEUT %</p>,
          dataIndex: 'Neutrophil_Percentage',
          key: 'Neutrophil_Percentage',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.Neutrophil_Percentage &&
                record.include.Neutrophil_Percentage.latestObservation &&
                record.include.Neutrophil_Percentage.latestObservation
                  .valueQuantity &&
                record.include.Neutrophil_Percentage.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>NEUT#</p>,
          dataIndex: 'Neutrophil',
          key: 'Neutrophil',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.Neutrophil &&
                record.include.Neutrophil.latestObservation &&
                record.include.Neutrophil.latestObservation.valueQuantity &&
                record.include.Neutrophil.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>MPV</p>,
          dataIndex: 'MPV',
          key: 'MPV',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.MPV &&
                record.include.MPV.latestObservation &&
                record.include.MPV.latestObservation.valueQuantity &&
                record.include.MPV.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },

        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>PCT</p>,
          dataIndex: 'PCT',
          key: 'PCT',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.PCT &&
                record.include.PCT.latestObservation &&
                record.include.PCT.latestObservation.valueQuantity &&
                record.include.PCT.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>HGB</p>,
          dataIndex: 'HGB',
          key: 'HGB',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.HGB &&
                record.include.HGB.latestObservation &&
                record.include.HGB.latestObservation.valueQuantity &&
                record.include.HGB.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>MCH</p>,
          dataIndex: 'MCH',
          key: 'MCH',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.MCH &&
                record.include.MCH.latestObservation &&
                record.include.MCH.latestObservation.valueQuantity &&
                record.include.MCH.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>LYM%</p>,
          dataIndex: 'Lymphocyte_Percentage',
          key: 'Lymphocyte_Percentage',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.Lymphocyte_Percentage &&
                record.include.Lymphocyte_Percentage.latestObservation &&
                record.include.Lymphocyte_Percentage.latestObservation
                  .valueQuantity &&
                record.include.Lymphocyte_Percentage.latestObservation
                  .valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>LYM#</p>,
          dataIndex: 'Lymphocyte',
          key: 'Lymphocyte',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.Lymphocyte &&
                record.include.Lymphocyte.latestObservation &&
                record.include.Lymphocyte.latestObservation.valueQuantity &&
                record.include.Lymphocyte.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>RDW-SD</p>,
          dataIndex: 'RDWsd',
          key: 'RDWsd',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.RDWsd &&
                record.include.RDWsd.latestObservation &&
                record.include.RDWsd.latestObservation.valueQuantity &&
                record.include.RDWsd.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
        {
          title: <p style={{ transform: 'rotate(-90deg)' }}>PDW*</p>,
          dataIndex: 'PDWcv',
          key: 'PDWcv',
          render: (text, record, value) => {
            const data = {
              value:
                record.include &&
                record.include.PDWcv &&
                record.include.PDWcv.latestObservation &&
                record.include.PDWcv.latestObservation.valueQuantity &&
                record.include.PDWcv.latestObservation.valueQuantity.value,
            }
            return data.value
          },
        },
      ],
    },
    {
      title: 'Баталгаажуулсан эмч',
      dataIndex: 'verifiedPractitioner',
      key: 'verifiedPractitioner',
      render: (text, record, value) => {
        const verifiedPractitioner =
          record.diagnosticReport.performer[1].display
        return verifiedPractitioner
      },
    },
  ]

  const columns1 = [
    {
      title: <div style={{ width: '100%' }}>Үйлчлүүлэгчийн дугаар</div>,
      dataIndex: 'patientNumber',
      key: 'patientNumber',
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
              {getFieldDecorator(`description`, {
                rules: [{ required: false }],
              })(<TextArea style={{ width: '40%' }} />)}
            </Form.Item>
          </div>
        )
      },
    },
  ]

  const [pageIndex, setPageIndex] = useState(1)

  const onPageChange = value => {
    setPageIndex(value)
  }

  const [modalProtocolSaveVisible, showModalProtocolSave] = useState(false)
  const [dataSource, setDataSource] = useState(false)
  const [filteredDate, setFilteredDate] = useState(getDate())
  const [loadingRef, setLoadingRef] = useState(false)
  const moment = require('moment')

  const componentRef = useRef()

  useEffect(() => {
    setLoadingRef(true)
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test/queryTestsVerified',
          payload: {
            labTestCode:
              props.app.FHIR_CODES &&
              props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                .HematologyOld,
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
              <TestProtocolsHeader
                documentName="М-ЭТ-021"
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
                    Цусны дэлгэрэнгүй шинжилгээний протокол
                  </span>
                </Col>
                <Col>
                  {' '}
                  <DatePicker
                    style={{ width: '120px' }}
                    onChange={onDatePickerChange}
                  />{' '}
                </Col>
                <Col>
                  <Form.Item label="Аппаратны төрөл " {...formItemLayout}>
                    {getFieldDecorator(`appartusType`, {
                      rules: [{ required: false }],
                      initialValue: 'XP-100',
                    })(
                      <Select>
                        <Option value="XP-100">XP-100</Option>
                        <Option value="XL-200">XL-200</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </div>
              <div style={{ height: '30px' }}></div>
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
                    <Button type="primary" block>
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
                  //onClick={onSubmit}
                  block
                  loading={
                    loading.effects[
                      'laboratory_test_hematology/saveProtocolData'
                    ]
                  }
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
                      <td rowSpan={2}>
                        <span className="bold">Баримт №</span>
                        <br />
                        <span className="bold">БҮ-ЭТ-021</span>
                      </td>
                      <td rowSpan={2}>
                        <span className="bold">Хувилбар №2</span>
                      </td>
                      <td rowSpan={2}>
                        <span className="bold">Баталсан огноо: </span>{' '}
                        2020.05.04
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
                  <span className="bold">
                    Цусны дэлгэрэнгүй шинжилгээний протокол
                  </span>
                </Col>

                <Col>
                  <Form.Item label="Аппаратны төрөл " {...formItemLayout}>
                    {getFieldDecorator(`appartusType`, {
                      rules: [{ required: false }],
                      initialValue: 'XP-100',
                    })(
                      <Select>
                        <Option value="XP-100">XP-100</Option>
                        <Option value="XL-200">XL-200</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </div>
              <div style={{ height: '30px' }}></div>
              <Table
                dataSource={dataSource}
                columns={columns1}
                className={styles.container1}
                bordered={true}
                pagination={false}
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
                    <Button type="primary" block>
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
                  // onClick={onSubmit}
                  block
                  // loading={
                  //   loading.effects['laboratory_test_hematology/saveProtocolData']
                  // }
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
        <ModalProtocolSave
          visible={modalProtocolSaveVisible}
          onCancel={() => showModalProtocolSave(false)}
          width="324px"
        />
      </Board>
    </div>
  )
}

Protocol.propTypes = {
  laboratory_test_hematology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, laboratory_test_hematology, dispatch, loading }) => ({
    app,
    laboratory_test_hematology,
    loading,
    dispatch,
  })
)(withI18n()(Form.create()(Protocol)))
