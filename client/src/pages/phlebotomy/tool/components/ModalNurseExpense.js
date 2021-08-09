import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Typography,
  Form,
  Button,
  Row,
  Select,
  Input,
  Col,
  DatePicker,
  InputNumber,
  Pagination,
} from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ArrowRightOutlined } from '@ant-design/icons'
import { ModuleBox, SlimTable } from 'components'
import { getDate } from 'utils/datetime'
import Download from './Download'
import ModalResultSent from '../../../laboratory/test/components/ModalResultSent'

const columns = [
  {
    title: '№',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Нэр',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Тоо/ш',
    dataIndex: 'quantity',
    key: 'quantity',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Хэмжих нэгж',
    dataIndex: 'measurementUnit',
    key: 'measurementUnit',
  },
  {
    title: ' Хэмжээ',
    dataIndex: 'size',
    key: 'size',
  },

  ////////////////////////////////

  {
    title: ' Тун хэлбэр хэмжээ',
    dataIndex: 'dose_shape',
    key: 'dose_shape',
  },
  {
    title: ' Савлагаан дахь хэмжээ',
    dataIndex: 'amountPerPackage',
    key: 'amountPerPackage',
  },
  /////////////////////
  {
    title: 'Барааны код',
    dataIndex: 'productId',
    key: 'productId',
  },
  {
    title: 'Лот дугаар',
    dataIndex: 'lotNumber',
    key: 'lotNumber',
  },
  {
    title: 'Дуусах огноо',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
    render: function(data) {
      var date = new Date(data)
      var formatedData = date.toLocaleDateString()
      return formatedData
    },
  },
]
const { Text } = Typography
const InputGroup = Input.Group
const { TextArea } = Input
const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}
const Title = (
  <Text>
    <Trans>
      <strog>Сувилагчийн сангаас хайх</strog>
    </Trans>
  </Text>
)

const Title2 = (
  <Text>
    <Trans>
      <strog>Зарлагадсан барааны жагсаалт</strog>
    </Trans>
  </Text>
)
const titleNote = (
  <Text>
    <Trans>
      <strog>Тайлбар тэмдэглэгээ</strog>
    </Trans>
  </Text>
)

const ModalNurseExpense = props => {
  const [modalResultSentVisible, showModalResultSent] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const { form, i18n, dispatch } = props
  /////////////////sanjaa////////////////////////////////////
  const handleSubmit = e => {
    e.preventDefault()
    form
      .validateFields()
      .then(values => {
        console.log('Received values of form: ', values)
        const newDataSource = [...dataSource, values]
        setDataSource(newDataSource)
      })
      .then(() => props.onSave())
      .catch(errorInfo => console.log(errorInfo))
  }

  const onSave = () => {
    dispatch({
      type: 'phlebotomy/deleteMaterials',
      payload: {
        dataSource: dataSource,
      },
    })
      .then(() => props.onSubmit())
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  ///////////////////////sanjaa//////////////////////////

  const onSearch = value => {
    console.log(value)
    props
      .dispatch({
        type: 'phlebotomy/searchBarcodeEquipments',
        payload: { id: value },
      })
      // .then(data => )

      .catch(errorInfo => console.log(errorInfo))
  }

  const { getFieldDecorator } = form
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      width="1000px"
      footer={[
        <Button className="button-gray" onClick={props.onCancel}>
          <Trans>Cancel</Trans>
        </Button>,
        <Button className="button-red" onClick={onSave}>
          <Trans>Save</Trans>
        </Button>,
      ]}
    >
      <span style={{ fontSize: '14px', textTransform: 'uppercase' }}>
        <strong>Сувилагчийн хэрэгсэл</strong> зарлагадах
      </span>
      <div style={{ borderBottom: '2px solid #E5E5E9' }}></div>
      <br />

      <div>
        <ModuleBox title={Title} style={{ marginTop: '5px' }}>
          <Form layout="horizontal" labelAlign="left" colon={false}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item>
                  <Row>
                    <InputGroup compact>
                      <Input
                        style={{ width: '80%' }}
                        placeholder="Input a barcode"
                        onSearch={onSearch}
                        enterButton
                      />

                      <Button className="button-red" style={{ width: '20%' }}>
                        <ArrowRightOutlined />
                      </Button>
                    </InputGroup>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label={i18n.t`Нэр`} {...formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: false }],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label={i18n.t`Хэмжих нэгж`} {...formItemLayout}>
                  {getFieldDecorator('measurementUnit', {
                    rules: [{ required: false }],
                  })(<Input />)}
                </Form.Item>
                {/* ///////////////////////////////////// */}
                <Form.Item
                  label={i18n.t`Тун хэлбэр хэмжээ`}
                  {...formItemLayout}
                >
                  {getFieldDecorator('dose_shape', {
                    rules: [{ required: false }],
                  })(<Input />)}
                </Form.Item>
                <Form.Item
                  label={i18n.t`Савлагаан дахь хэмжээ`}
                  {...formItemLayout}
                >
                  {getFieldDecorator('amountPerPackage', {
                    rules: [{ required: false }],
                  })(<Input />)}
                </Form.Item>

                {/* ///////////////////////////////// */}
                <Form.Item label={i18n.t`Барааны код`} {...formItemLayout}>
                  {getFieldDecorator('productId', {
                    rules: [{ required: false }],
                  })(<Input />)}
                </Form.Item>

                <Form.Item>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '20px',
                    }}
                  >
                    <p
                      style={{
                        marginRight: '13px',
                        fontSize: '10px',
                      }}
                    >
                      Хасалт хийх барааны тоо
                    </p>{' '}
                    <Form.Item {...formItemLayout}>
                      {getFieldDecorator('quantity', {
                        rules: [{ required: false }],
                      })(
                        <InputNumber
                          min={1}
                          max={100}
                          style={{ width: '60px' }}
                        />
                      )}
                    </Form.Item>
                  </div>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={i18n.t`LOT дугаар`} {...formItemLayout}>
                  {getFieldDecorator('lotNumber', {
                    rules: [{ required: false }],
                  })(<Input placeholder="" />)}
                </Form.Item>
                <Form.Item label={i18n.t`Дуусах хугацаа`} {...formItemLayout}>
                  {getFieldDecorator('expirationDate', {
                    rules: [{ required: false }],
                  })(<DatePicker style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item
                  label={i18n.t`Одоо байгаа үлдэгдэл`}
                  {...formItemLayout}
                >
                  {getFieldDecorator('remain', {
                    rules: [{ required: false }],
                  })(<Input placeholder="" />)}
                </Form.Item>
                <Form.Item>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '20px',
                    }}
                  >
                    {' '}
                    <Button className="button-red" onClick={handleSubmit}>
                      <Trans>Save</Trans>
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </ModuleBox>
        <div style={{ height: '20px' }}></div>
        <ModuleBox title={Title2}>
          <SlimTable
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
          <div style={{ height: '30px' }}></div>
          <Row>
            <Col span={8}>
              <span>Хуудсанд харагдах тоо</span>{' '}
              <InputNumber
                min={1}
                max={10}
                defaultValue={3}
                style={{ width: '60px', height: '30px', borderRadius: '5px' }}
              />
            </Col>
            <Col span={10}>
              <Pagination
                total={85}
                showTotal={total => `Total ${total} items`}
                pageSize={20}
                defaultCurrent={1}
                size="medium"
              />
            </Col>
            <Col span={6}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {getDate()}
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '40px' }}>
            <Col span={16}>
              <ModuleBox title={titleNote}>
                <TextArea rows={4} />
              </ModuleBox>
            </Col>
            <Col span={7} offset={1} style={{ marginTop: '100px' }}>
              <Download />
            </Col>
          </Row>
        </ModuleBox>
        <ModalResultSent
          visible={modalResultSentVisible}
          onCancel={() => showModalResultSent(false)}
          title={
            <p
              style={{
                marginLeft: '30px',
                marginTop: '30px',
                textTransform: 'uppercase',
                fontSize: '12px',
              }}
            >
              <strong> Амжилттай хадгалагдлаа</strong>
            </p>
          }
        />
      </div>
    </Modal>
  )
}

ModalNurseExpense.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy, loading }) => ({
  app,
  phlebotomy,
  loading,
}))(withI18n()(Form.create()(ModalNurseExpense)))

//created Sanjaasuren.E
//2020-04-08
