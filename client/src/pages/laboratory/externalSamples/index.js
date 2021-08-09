import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { DivInput, Board, MessageModal, CompactTable } from 'components'
import { Button, Select, DatePicker, Input, Table, Col, Row, Form } from 'antd'
import { loadValuesets } from 'utils/valuesets'

const { Option } = Select
const { Search } = Input

const DEFAULT_PAGE_SIZE = 20

const SpecimenCondition = props => {
  const [dataSource, setDataSource] = useState([])
  const [modalSuccessVisible, showSuccessModal] = useState(false)
  const [messageType, setMessageType] = useState('success')
  const [searchTerm, setSearchTerm] = useState('')
  const [addressValueset, setAddressValueset] = useState()
  const [selectedValues, setSelectedValues] = useState()
  const [tablePagination, setTablePagination] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [selectedTestResults, setSelectedTestResults] = useState([])
  const [isSelected, setIsSelected] = useState(false)
  const { getFieldDecorator } = props.form

  const columns = [
    {
      title: '№',
      dataIndex: 'identifier',
      key: 'identifier',
    },
    {
      title: <Trans id="Захиалгын дугаар" />,
      dataIndex: 'requisition.value',
      key: 'requisition',
    },
    {
      title: <Trans id={'State'} />,
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: <Trans id={'Хот/Аймаг'} />,
      dataIndex: 'organization.address[0].state',
      key: 'addressState',
    },
    {
      title: <Trans id="Barcode" />,
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: <Trans id="LastName" />,
      dataIndex: 'patientInfo.lastName',
      key: 'lastName',
    },
    {
      title: <Trans id="FirstName" />,
      dataIndex: 'patientInfo.firstName',
      key: 'firstName',
    },
    {
      title: <Trans id="NationalIdentificationNumber" />,
      dataIndex: 'patientInfo.nationalIdentificationNumber',
      key: 'NInum',
    },
    {
      title: <Trans id="Age" />,
      dataIndex: 'patientInfo.age',
      key: 'Age',
    },
    {
      title: <Trans id="Gender" />,
      dataIndex: 'patientInfo.gender',
      key: 'Gender',
      render: (text, record, index) => {
        return <Trans id={record.patientInfo.gender} />
      },
    },
    {
      title: <Trans id="Утас" />,
      dataIndex: 'patientInfo.phoneNumber',
      key: 'PhoneNumber',
    },
    {
      title: <Trans id="ЭМД" />,
      dataIndex: 'healthInsuranceNumber',
      key: 'healthInsuranceNumber',
    },
    {
      title: <Trans id="SampleAccessionIdentifier" />,
      dataIndex: 'SampleAccessionIdentifier',
      key: 'SampleAccessionIdentifier',
    },
    {
      title: <Trans id="Сорьцын хэмжээ (мл)" />,
      dataIndex: 'SpecimenSize',
      key: 'SpecimenSize',
    },
    {
      title: <Trans id="Сорьцыг хэдэн градуст хэд хоног хадгалсан" />,
      dataIndex: 'SpecimenSave',
      key: 'SpecimenSave',
    },
    {
      title: <Trans id="Илрүүлэх шинжилгээний  хариу" />,
      dataIndex: 'TestResult',
      key: 'TestResult',
    },
    {
      title: <Trans id="Ямар шинжилгээ хийлгэх" />,
      dataIndex: 'testNames',
      key: 'testNames',
    },
    {
      title: <Trans id="Сорьц илгээх үеийн хайрцагны температур" />,
      dataIndex: 'SampleSentTemprature',
      key: 'SampleSentTemprature',
    },
    {
      title: <Trans id="Сорьц илгээсэн он сар өдөр" />,
      dataIndex: 'SampleSentDate',
      key: 'SampleSentDate',
    },
    {
      title: <Trans id="Сорьц илгээсэн хүний нэр, гарын үсэг" />,
      dataIndex: 'SampleSentPersonName',
      key: 'SampleSentPersonName',
    },
    // laboratory
    {
      title: <Trans id="Сорьц хүлээн авсан он, сар, өдөр, цаг" />,
      dataIndex: 'SampleReceived',
      key: 'SampleReceived',
    },
    {
      title: <Trans id="Сорьц авах үеийн хайрцагны температур" />,
      dataIndex: 'SampleReceivedTemperature',
      key: 'SampleReceivedTemperature',
    },
    {
      title: <Trans id="Сорьцны хэмжээ/мл/" />,
      dataIndex: 'SampleReceivedSize',
      key: 'SampleReceivedSize',
    },
    {
      title: <Trans id="Хемолизтэй эсэх Тийм (+), үгүй(-)" />,
      dataIndex: 'isHemolyzed',
      key: 'isHemolyzed',
    },
    {
      title: <Trans id="Сорьц асгарсан эсэх Тийм (+), үгүй(-)" />,
      dataIndex: 'isSpilled',
      key: 'isSpilled',
    },
    {
      title: (
        <Trans id="Машинаар ирсэн бол 1, онгоцоор ирсэн бол 2-оор тэмдэглэнэ" />
      ),
      dataIndex: 'transportationType',
      key: 'transportationType',
    },
    {
      title: (
        <Trans id="Сорьцны дагалдах бичиг, дугаарлалт, хаягжилт бүрэн эсэх" />
      ),
      dataIndex: 'isDocumentationComplete',
      key: 'isDocumentationComplete',
    },
    {
      title: <Trans id="Сорьц хүлээн авсан хүний нэр, гарын үсэг" />,
      dataIndex: 'sampleReceivedPractitioner',
      key: 'sampleReceivedPractitioner',
    },
    {
      title: <Trans id="Шинжилгээ хийсэн огноо" />,
      dataIndex: 'testDate',
      key: 'testDate',
    },
    {
      title: <Trans id="Шинжилгээний хариу" />,
      dataIndex: 'testResult',
      key: 'testResult',
    },
    {
      title: <Trans id="Тайлбар" />,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: <Trans id="Оношлуурын нэр" />,
      dataIndex: 'diagnosingDevice',
      key: 'diagnosingDevice',
    },
    {
      title: <Trans id="Багажны нэр" />,
      dataIndex: 'machineName',
      key: 'machineName',
    },
    {
      title: <Trans id="Хүчинтэй хугацаа" />,
      dataIndex: 'expirationDate',
      key: 'expirationDate',
    },
    {
      title: <Trans id="Шаардлага хангасан эсэх" />,
      dataIndex: 'isRequired',
      key: 'isRequired',
    },
  ]

  function fetchData() {
    return props
      .dispatch({
        type: 'specimenCondition/queryExternalSamples',
        payload: {
          searchValue: searchTerm,
          organizationStates: selectedValues,
        },
      })
      .then(result => {
        setDataSource(result.response.data)
        setTablePagination(result.pagination)
      })
      .catch(errorInfo => console.error(errorInfo))
  }

  useEffect(() => {
    if (!addressValueset) {
      const [ADDRESS_VALUESET] = loadValuesets(
        ['address-values-mn'],
        props.specimenCondition.valuesets
      )

      setAddressValueset(ADDRESS_VALUESET)
    }

    fetchData()
  }, [props.specimenCondition.valuesets, selectedValues])

  function fetchFileList(payload = {}) {
    const {
      _count,
      _page,
      startDate,
      endDate,
      sortField,
      sortOrder,
      ...filters
    } = payload

    return props
      .dispatch({
        type: 'specimenCondition/queryExternalSamples',
        payload: {
          _count,
          _page,
          startDate,
          endDate,
        },
      })
      .then(result => {
        setDataSource(result.response.data)
        setTablePagination(result.pagination)
      })
      .then(() => setSelectedTestResults([]))
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    fetchFileList({
      startDate: startDate,
      endDate: endDate,
    })
  }, [startDate, endDate])

  const handleTableChange = (pagination, filters, sorter) => {
    setTablePagination(pagination)

    fetchFileList({
      _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      _page: pagination.current,
      startDate: startDate,
      endDate: endDate,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    setSelectedTestResults(selectedRowKeys)

    if (selectedRowKeys.length > 0) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }

  const rowSelection = {
    selectedRowKeys: selectedTestResults,
    onChange: onSelectChange,
  }

  const editExternalSamples = () => {
    showMessageModal(true)
  }

  const saveLabExternalSamples = async () => {
    const formValues = props.form.getFieldsValue()
    const newData = [...dataSource]
    let index
    let item
    for (let i = 0; i < selectedTestResults.length; i++) {
      index = newData.findIndex(
        (item, index) => index === selectedTestResults[i]
      )
      item = newData[index]
      item = { ...item, ...formValues }
      newData.splice(index, 1, {
        ...item,
        ...index,
      })
    }

    const response = await props.dispatch({
      type: 'specimenCondition/saveLabExternalSample',
      payload: { dataSource: newData },
    })

    if (response.success) {
      showSuccessModal(true)
      setMessageType('success')
      showMessageModal(false)
      setIsSelected(false)
      setSelectedTestResults([])
      props.form.resetFields()
    } else {
      showSuccessModal(true)
      setMessageType('error')
      showMessageModal(false)
      setSelectedTestResults([])
    }
    fetchData()
    fetchFileList()
  }

  function handleSelectChange(value) {
    setSelectedValues(value)
  }

  const downloadExcel = async () => {
    const response = await props.dispatch({
      type: 'specimenCondition/downloadExcel',
    })
    const blob = new Blob([response.data])
    saveFile(blob, `${props.location.pathname}.xlsx`)
  }

  function saveFile(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      const a = document.createElement('a')
      document.body.appendChild(a)
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = filename
      a.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }, 0)
    }
  }

  const onSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const onSearch = () => {
    props
      .dispatch({
        type: 'specimenCondition/queryExternalSamples',
        payload: {
          searchValue: searchTerm,
          organizationStates: selectedValues,
        },
      })
      .then(result => {
        setTablePagination(result.pagination)
        setDataSource(result.response.data)
      })
      .catch(err => console.log(err))
  }

  const onStartDate = (date, dateString) => {
    setStartDate(dateString)
  }

  const onEndDate = (date, dateString) => {
    setEndDate(dateString)
  }

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 15,
      },
      sm: {
        span: 15,
      },
    },
    wrapperCol: {
      xs: {
        span: 15,
      },
      sm: {
        span: 9,
      },
    },
  }

  return (
    <Board inner>
      <div
        style={{
          fontSize: '14px',
          marginBottom: '16px',
        }}
      >
        <Trans>
          <span className="title uppercase">External </span>
          <span className="uppercase">Samples</span>
        </Trans>
        <div style={{ height: '1px', background: '#E5E5E9' }} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            marginTop: '-20px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Col span={12} style={{ marginRight: '10px' }}>
            <DatePicker onChange={onStartDate} defaultValue={startDate} />
          </Col>
          <Col span={12}>
            <DatePicker onChange={onEndDate} defaultValue={endDate} />
          </Col>
        </div>
      </div>

      <div
        style={{
          border: '1px solid #C9C9C9',
          padding: '6px',
        }}
      >
        <div>
          <Row gutter={8}>
            <Col span={4}>
              <div
                style={{
                  marginTop: '25px',
                  paddingLeft: '10px',
                }}
              >
                Хайх:
              </div>
            </Col>
            <Col span={20}>
              <Search
                style={{
                  margin: '20px 0px',
                  width: '50%',
                }}
                placeholder="Баркод эсвэл регистрийн дугаар оруулана уу"
                size="default"
                onChange={onSearchChange}
                onSearch={onSearch}
                enterButton
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}>
              <DivInput
                value={
                  <div>
                    <Trans id="Choose a state" />:
                  </div>
                }
                style={{ border: 'none' }}
              />
            </Col>
            <Col span={20}>
              <Select
                mode="multiple"
                style={{ width: '100%', marginBottom: '15px' }}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleSelectChange}
              >
                {addressValueset &&
                  addressValueset.compose &&
                  addressValueset.compose.map(item => (
                    <Option key={item.value}>{item.value}</Option>
                  ))}
              </Select>
            </Col>
          </Row>

          <div style={{ padding: '4px 8px', flexGrow: '1' }}>
            <CompactTable
              dataSource={dataSource}
              columns={columns}
              pagination={tablePagination}
              onChange={handleTableChange}
              rowSelection={rowSelection}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                type="primary"
                onClick={editExternalSamples}
                style={{ margin: '10px 0px' }}
                disabled={isSelected ? false : true}
              >
                <Trans id={'Edit'} />
              </Button>

              <Button type="primary" onClick={downloadExcel}>
                <Trans id="Download" />
                <span style={{ marginLeft: '8px' }}>EXCEL</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MessageModal
        visible={modalSuccessVisible}
        onCancel={() => showSuccessModal(false)}
        type={messageType}
        content={
          <Trans
            id={messageType == 'success' ? 'Save Successful' : 'Алдаа гарлаа'}
          />
        }
      />

      <MessageModal
        visible={modalMessageVisible}
        content={
          <div>
            <Trans>
              <span className="title uppercase">External </span>
              <span className="uppercase">Samples</span>
            </Trans>
          </div>
        }
        width={1000}
        autoHide={false}
        closable={false}
        maskClosable={false}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Сорьц хүлээн авсан он, сар, өдөр, цаг">
            {getFieldDecorator('SampleReceived')(
              <Input
                name="SampleReceived"
                placeholder="Сорьц хүлээн авсан он, сар, өдөр, цаг"
              />
            )}
          </Form.Item>
          <Form.Item label="Сорьц авах үеийн хайрцагны температур">
            {getFieldDecorator('SampleReceivedTemperature')(
              <Input
                name="SampleReceivedTemperature"
                placeholder="Сорьц авах үеийн хайрцагны температур"
              />
            )}
          </Form.Item>
          <Form.Item label="Сорьцны хэмжээ/мл/">
            {getFieldDecorator('SampleReceivedSize')(
              <Input
                name="SampleReceivedSize"
                placeholder="Сорьцны хэмжээ/мл/"
              />
            )}
          </Form.Item>
          <Form.Item label="Хемолизтэй эсэх Тийм (+), үгүй(-)">
            {getFieldDecorator('isHemolyzed')(
              <Input
                name="isHemolyzed"
                placeholder="Хемолизтэй эсэх Тийм (+), үгүй(-)"
              />
            )}
          </Form.Item>
          <Form.Item label="Сорьц асгарсан эсэх Тийм (+), үгүй(-)">
            {getFieldDecorator('isSpilled')(
              <Input
                name="isSpilled"
                placeholder="Сорьц асгарсан эсэх Тийм (+), үгүй(-)"
              />
            )}
          </Form.Item>
          <Form.Item label="Машинаар ирсэн бол 1, онгоцоор ирсэн бол 2-оор тэмдэглэнэ">
            {getFieldDecorator('transportationType')(
              <Input
                name="transportationType"
                placeholder="Машинаар ирсэн бол 1, онгоцоор ирсэн бол 2-оор тэмдэглэнэ"
              />
            )}
          </Form.Item>
          <Form.Item label="Сорьцны дагалдах бичиг, дугаарлалт, хаягжилт бүрэн эсэх">
            {getFieldDecorator('isDocumentationComplete')(
              <Input
                name="isDocumentationComplete"
                placeholder="Сорьцны дагалдах бичиг, дугаарлалт, хаягжилт бүрэн эсэх"
              />
            )}
          </Form.Item>
          <Form.Item label="Сорьц хүлээн авсан хүний нэр, гарын үсэг">
            {getFieldDecorator('sampleReceivedPractitioner')(
              <Input
                name="sampleReceivedPractitioner"
                placeholder="Сорьц хүлээн авсан хүний нэр, гарын үсэг"
              />
            )}
          </Form.Item>
          <Form.Item label="Шинжилгээ хийсэн огноо">
            {getFieldDecorator('testDate')(
              <Input name="testDate" placeholder="Шинжилгээ хийсэн огноо" />
            )}
          </Form.Item>
          <Form.Item label="Шинжилгээний хариу">
            {getFieldDecorator('testResult')(
              <Input name="testResult" placeholder="Шинжилгээний хариу" />
            )}
          </Form.Item>
          <Form.Item label="Тайлбар">
            {getFieldDecorator('description')(
              <Input name="description" placeholder="Тайлбар" />
            )}
          </Form.Item>
          <Form.Item label="Оношлуурын нэр">
            {getFieldDecorator('diagnosingDevice')(
              <Input name="diagnosingDevice" placeholder="Оношлуурын нэр" />
            )}
          </Form.Item>
          <Form.Item label="Багажны нэр">
            {getFieldDecorator('machineName')(
              <Input name="machineName" placeholder="Багажны нэр" />
            )}
          </Form.Item>
          <Form.Item label="Хүчинтэй хугацаа">
            {getFieldDecorator('expirationDate')(
              <Input name="expirationDate" placeholder="Хүчинтэй хугацаа" />
            )}
          </Form.Item>
          <Form.Item label="Шаардлага хангасан эсэх">
            {getFieldDecorator('isRequired')(
              <Input name="isRequired" placeholder="Шаардлага хангасан эсэх" />
            )}
          </Form.Item>
        </Form>
        <div
          style={{
            marginTop: '20px',
            width: '600px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={() => {
              showMessageModal(false), fetchData()
            }}
          >
            <Trans id="Close" />
          </Button>
          <Button onClick={saveLabExternalSamples}>
            <Trans id="Save" />
          </Button>
        </div>
      </MessageModal>
    </Board>
  )
}

SpecimenCondition.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, specimenCondition, loading }) => ({
  app,
  specimenCondition,
  loading,
}))(withI18n()(Form.create()(SpecimenCondition)))
