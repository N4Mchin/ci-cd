import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import { ButtonRed, ButtonGrey } from 'components'
import {
  Row,
  Col,
  DatePicker,
  TimePicker,
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Modal,
  Table,
} from 'antd'
const { TextArea } = Input
const { Option } = Select
const { Column } = Table
const DailyLogHPV = props => {
  const { form, i18n } = props
  const { getFieldDecorator } = form

  const [testProtocolModalVisible, setTestProtocolModalVisible] = useState(
    false
  )
  const handleSubmit = event => {
    setTestProtocolModalVisible(!testProtocolModalVisible)
  }

  const handleOk = () => {}
  const handleCancel = () => {
    setTestProtocolModalVisible(false)
  }

  const [
    modalReagentConsumptionLogVisible,
    showModalReagentConsumptionLog,
  ] = useState(false)

  const ReagentConsumptionLogSubmit = event => {
    showModalReagentConsumptionLog(!modalReagentConsumptionLogVisible)
  }

  const reagentConsumptionOk = () => {}

  const reagentConsumptionCancel = () => {
    showModalReagentConsumptionLog(false)
  }

  const formItemLayout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 12 },
  }
  const data = [
    {
      key: '1',
      ID: '1',
      barCode: '898978',
      lastName: 'Brown',
      firstName: 'Sarah',
      registrationNumber: 'IB8976897',
      result: 'fdfd',
      Date: '2020-01-16',
      module: 'C1',
    },
  ]
  return (
    <div className={styles.border}>
      <div className={styles.p}>
        <span style={{ background: 'white' }}>
          <strong>HPV</strong> ПРТОКОЛ
        </span>
      </div>
      <Form
        layout="horizontal"
        labelAlign="left"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <Row gutter={24}>
          <Col span={8}>
            <Col span={24}>
              <Form.Item
                label={i18n.t`Choice of apparatus type`}
                {...formItemLayout}
              >
                {getFieldDecorator('choiceOfApparatusType', {
                  rules: [{ required: false }],
                  initialValue: 'Agilent',
                })(
                  <Select className={styles.DailyRegistration}>
                    <Option value="choose1">1</Option>
                    <Option value="choose2">2</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item label={i18n.t`Date`} {...formItemLayout}>
                {getFieldDecorator('Date', {
                  rules: [{ required: false }],
                })(<DatePicker className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Time when the apparatus is turned on`}
                {...formItemLayout}
              >
                {getFieldDecorator('timeWhenTheApparatusIsTurnedOn', {
                  rules: [{ required: false }],
                })(<TimePicker className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`LOT number of reagent`}
                {...formItemLayout}
              >
                {getFieldDecorator('LOTNumberOfReagent', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
            </Col>
          </Col>

          <Col span={8}>
            <Col span={24}>
              <Form.Item
                label={i18n.t`Expiration date of reagent`}
                {...formItemLayout}
              >
                {getFieldDecorator('expirationDateOfReagent', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Number of CA3 abided`}
                {...formItemLayout}
              >
                {getFieldDecorator('numberOfCа3Abided', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item label={i18n.t`Room temperature`} {...formItemLayout}>
                {getFieldDecorator('roomTemperature', {
                  rules: [{ required: false }],
                })(<Input placeholder="" className={styles.field} />)}
              </Form.Item>
              <Form.Item
                label={i18n.t`Who confirmed the result by quality monitor`}
                {...formItemLayout}
              >
                {getFieldDecorator('whoConfirmedTheResultByQualityMonitor', {
                  rules: [{ required: false }],
                  initialValue: 'М.Алтанхүү',
                })(
                  <Select className={styles.DailyRegistration}>
                    <Option value="choose1">1</Option>
                    <Option value="choose2">2</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Col>
          <Col span={8}>
            <Col span={24}>
              <div className={styles.divLog}>
                <div className={styles.checkboxWrapper}>
                  <div className={styles.checkboxContainer}>
                    <Form.Item>
                      {getFieldDecorator('measureUnit', {
                        rules: [{ required: false }],
                      })(<Checkbox>УРВАЛЖ НЭМЭХ</Checkbox>)}
                    </Form.Item>
                  </div>
                </div>
                <Form.Item
                  label={i18n.t`LOT number of reagent`}
                  {...formItemLayout}
                >
                  {getFieldDecorator('lotNumberOfReagent', {
                    rules: [{ required: false }],
                  })(<Input placeholder="" className={styles.field2} />)}
                </Form.Item>
                <Form.Item
                  label={i18n.t`Expiration date of reagent`}
                  {...formItemLayout}
                >
                  {getFieldDecorator('expirationDateOfReagent', {
                    rules: [{ required: false }],
                  })(<DatePicker className={styles.field2} />)}
                </Form.Item>
              </div>
            </Col>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item label="Нэмэлт тайлбар">
              <TextArea rows={6} className={styles.TextArea} />
            </Form.Item>
          </Col>
          <br></br>
          <Col span={8}>
            <Col span={12}>
              <Form.Item>
                <Button
                  type="default"
                  block
                  style={{ backgroundColor: '#F5F5F5' }}
                >
                  БУЦАХ{' '}
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button type="danger" block>
                  УСТГАХ{' '}
                </Button>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <div>
                  <Button type="primary" block onClick={handleSubmit}>
                    ШИНЖИЛГЭЭНИЙ ПРОТОКОЛ ХЭВЛЭХ{' '}
                  </Button>
                </div>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <div>
                  <Button
                    type="primary"
                    block
                    onClick={ReagentConsumptionLogSubmit}
                  >
                    УРВАЛЖ ЗАРЦУУЛАЛТЫН БҮРТГЭЛ{' '}
                  </Button>
                </div>
              </Form.Item>
            </Col>
          </Col>
        </Row>
      </Form>
      <Modal
        visible={testProtocolModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="950px"
        footer={[
          <ButtonGrey onClick={handleCancel}>БУЦАХ</ButtonGrey>,
          <ButtonRed>ХЭВЛЭХ</ButtonRed>,
        ]}
      >
        <br></br>
        <table className={styles.documentHeader}>
          <tr>
            <td>
              <img
                src="/liver-center-logo.png"
                alt="logo"
                width="180px"
                height="25px"
                marginRight="50px"
              ></img>
            </td>
            <td style={{ textAlign: 'center', border: 'disable' }}>
              {' '}
              БАРИМТ #M-ЭТ-021
            </td>
            <td style={{ textAlign: 'center' }}>
              <strong>ХУВИЛБАР #1</strong>
            </td>
            <td style={{ textAlign: 'center' }}>
              <strong>ЭТ-ийн Ерөнхий захирлын 2018 оны L18/44-02 тоот </strong>
              тушаалын 1-р хавсралт
            </td>
            <td style={{ textAlign: 'center' }}>Баталсан огноо</td>
          </tr>
        </table>
        <br></br>
        <p style={{ textAlign: 'center' }}>
          <strong>
            HCV-RNA | XCB-ийн идэвхжил тодорхойлох шинжилгээний протокол
          </strong>
        </p>
        <table className={styles.table}>
          <tr>
            <td rowSpan={4}>Огноо</td>
            <td rowSpan={4}>Аппарат асаасан цаг</td>
            <td rowSpan={4}>Урвалжийн LOT дугаар</td>
            <td rowSpan={4}>Урвалжийн хүчинтэй хугацаа</td>
            <td colSpan={6}>Анхдагч сорьцын байдал</td>
            <td rowSpan={4}>Нийт шинжилсэн сорьцын тоо </td>
            <td rowSpan={4}>Мөрдөж ажилласан САЗ дугаар</td>
            <td rowSpan={4}>Тасалгааны хэм</td>
            <td rowSpan={4}>Хариуг баталгаажуулсан</td>
            <td rowSpan={4}>Нэмэлт тайлбар</td>
            <td rowSpan={4}>Засварлагдсан хариуны тайлбар</td>
          </tr>
          <tr>
            <td
              rowSpan={4}
              style={{ transform: 'rotate(-90deg)', fontSize: '6px' }}
            >
              ХЭВИЙН
            </td>
            <td
              rowSpan={4}
              style={{ transform: 'rotate(-90deg)', fontSize: '6px' }}
            >
              ГЕМОЛИЗ
            </td>
            <td
              rowSpan={4}
              style={{ transform: 'rotate(-90deg)', fontSize: '6px' }}
            >
              ХЕЛЕОЗ
            </td>
            <td
              rowSpan={4}
              style={{ transform: 'rotate(-90deg)', fontSize: '6px' }}
            >
              СОРЬЦ ХЭМЖЭЭ БАГА
            </td>
            <td
              rowSpan={4}
              style={{ transform: 'rotate(-90deg)', fontSize: '6px' }}
            >
              АСГАРСАН
            </td>
            <td
              rowSpan={4}
              style={{ transform: 'rotate(-90deg)', fontSize: '6px' }}
            >
              БУСАД
            </td>
          </tr>
        </table>
        <br></br>
        <Table dataSource={data}>
          <Column title="№" dataIndex="ID" key="ID" />
          <Column title="БАР КОД" dataIndex="barCode" key="BarCode" />
          <Column title="ОВОГ" dataIndex="lastName" key="LastName" />
          <Column title="НЭР" dataIndex="firstName" key="ProductCode" />
          <Column
            title="РЕГИСТРИЙН ДУГААР"
            dataIndex="registrationNumber"
            key="registrationNumber"
          />
          <Column
            title="ХАРИУ"
            dataIndex="result"
            key="result"
            style={{ backgroundColor: 'red' }}
          />
          <Column title=" ОГНОО" dataIndex="Date" key="Date" />
          <Column title="МОДУЛЬ" dataIndex="module" key="module" />
        </Table>
        <p
          style={{ textAlign: 'right', marginRight: '20px', fontSize: '10px' }}
        >
          Шинжилгээ хийсэн: Б.Пүрэвжаргал
        </p>
        <p
          style={{ textAlign: 'right', marginRight: '20px', fontSize: '10px' }}
        >
          Протокол хөтөлсөн: Б.Пүрэвжаргал
        </p>
      </Modal>

      <Modal
        visible={modalReagentConsumptionLogVisible}
        onOK={reagentConsumptionOk}
        onCancel={reagentConsumptionCancel}
        width="850px"
        footer={[
          <ButtonGrey onClick={reagentConsumptionCancel}>БУЦАХ</ButtonGrey>,
          <ButtonRed>ХЭВЛЭХ</ButtonRed>,
        ]}
      >
        <br></br>
        <table className={styles.documentHeader}>
          <tr>
            <td>
              <img
                src="/liver-center-logo.png"
                alt="logo"
                width="180px"
                height="25px"
              ></img>
            </td>
            <td style={{ textAlign: 'center' }}>БАРИМТ БҮ-ЭТ-004</td>
            <td style={{ textAlign: 'center' }}>
              <strong>ХУВИЛБАР #1</strong>
            </td>
            <td style={{ textAlign: 'center' }}>
              <strong>ЭТ-ийн Ерөнхий захирлын 2018 оны L18/44-02 тоот </strong>
              тушаалын 1-р хавсралт
            </td>
            <td style={{ textAlign: 'center' }}>Баталсан огноо</td>
          </tr>
        </table>
        <br></br>
        <p style={{ textAlign: 'center' }}>
          <strong>
            HCV-RNA | XCB-ийн идэвхжил тодорхойлох шинжилгээний протокол
          </strong>
        </p>
        <table className={styles.table}>
          <tr>
            <td>Огноо</td>
            <td>Урвалжийн дугаар</td>
            <td>Урвалжийн LOT дугаар</td>
            <td>Урвалжийн хүчинтэй хугацаа</td>
            <td>Агуулахын урвалжийн үлдэгдэл</td>
            <td>Зарцуулсан урвалж </td>
            <td>Үлдэгдэл урвалжийн тоо</td>
            <td>Хэрэглэсэн хүний гарын үсэг</td>
          </tr>
          <tr>
            <td>2019-09-06</td>
            <td>HCV-RNA</td>
            <td>234567</td>
            <td>2020-09-06</td>
            <td>43</td>
            <td>23</td>
            <td>23</td>
            <td></td>
          </tr>
          <tr>
            <td colspan={8} rowspan={5}>
              Нэмэлт тэмдэглэл
            </td>
          </tr>
        </table>
        <p style={{ fontSize: '10px' }}>
          Зарцуулалтын нэгжийг хүн тутмаар тооцов
        </p>
        <br></br>

        <p
          style={{
            textAlign: 'right',
            marginRight: '20px',
            marginTop: '20px',
            fontSize: '10px',
          }}
        >
          Бүртгэл хөтөлсөн: Б.Пүрэвжаргал
        </p>
      </Modal>
    </div>
  )
}
DailyLogHPV.propTypes = {
  laboratory_order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ laboratory_order }) => ({ laboratory_order }))(
  withI18n()(Form.create()(DailyLogHPV))
)
