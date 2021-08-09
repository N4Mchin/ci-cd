import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { DivInput, Board, EditableNew, MessageModal } from 'components'
import { Menu, Select, Button, Row, Col, Input, DatePicker } from 'antd'
import { loadValuesets } from 'utils/valuesets'

const moment = require('moment')

const { Option } = Select

const DEFAULT_PAGE_SIZE = 20

const SpecimenCondition = props => {
  const [dataSource, setDataSource] = useState([])
  const [modalVisible, setShowModal] = useState(false)
  const [messageType, setMessageType] = useState('success')
  const [searchTerm, setSearchTerm] = useState('')
  const [addressValueset, setAddressValueset] = useState()
  const [selectedValues, setSelectedValues] = useState()
  const [tablePagination, setTablePagination] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const { Search } = Input

  const columns3 = [
    {
      title: '№',
      dataIndex: 'identifier',
      key: 'identifier',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'identifier',
        title: '№',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Захиалгын дугаар" />,
      dataIndex: 'requisition.value',
      key: 'requisition',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'requisition',
        title: 'Захиалгын дугаар',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id={'State'} />,
      dataIndex: 'status',
      key: 'status',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'status',
        title: 'Төлөв',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id={'Хот/Аймаг'} />,
      dataIndex: 'organization.address[0].state',
      key: 'addressState',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'organization.address[0].state',
        title: 'Хот/Аймаг',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Barcode" />,
      dataIndex: 'barcode',
      key: 'barcode',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'barcode',
        title: 'Barcode',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="LastName" />,
      dataIndex: 'patientInfo.lastName',
      key: 'lastName',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'patientInfo.lastName',
        title: 'LastName',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="FirstName" />,
      dataIndex: 'patientInfo.firstName',
      key: 'firstName',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'patientInfo.firstName',
        title: 'FirstName',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="NationalIdentificationNumber" />,
      dataIndex: 'patientInfo.nationalIdentificationNumber',
      key: 'NInum',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'patientInfo.nationalIdentificationNumber',
        title: 'NationalIdentificationNumber',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Age" />,
      dataIndex: 'patientInfo.age',
      key: 'Age',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'patientInfo.age',
        title: 'Age',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Gender" />,
      dataIndex: 'patientInfo.gender',
      render: (text, record, index) => {
        return <Trans id={record.patientInfo.gender} />
      },
      key: 'Gender',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'patientInfo.gender',
        title: 'Gender',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Утас" />,
      dataIndex: 'patientInfo.phoneNumber',
      key: 'PhoneNumber',
      onCell: record => ({
        record,
        editable: false,
        dataIndex: 'patientInfo.phoneNumber',
        title: 'Утас',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="ЭМД" />,
      dataIndex: 'healthInsuranceNumber',
      key: 'healthInsuranceNumber',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'healthInsuranceNumber',
        title: 'healthInsuranceNumber',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="SampleAccessionIdentifier" />,
      dataIndex: 'SampleAccessionIdentifier',
      key: 'SampleAccessionIdentifier',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'SampleAccessionIdentifier',
        title: 'SampleAccessionIdentifier',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Сорьцын хэмжээ (мл)" />,
      dataIndex: 'SpecimenSize',
      key: 'SpecimenSize',
      render: text => <Trans id={text} />,
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'SpecimenSize',
        title: 'Сорьцын хэмжээ (мл)',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Сорьцыг хэдэн градуст хэд хоног хадгалсан" />,
      dataIndex: 'SpecimenSave',
      key: 'SpecimenSave',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'SpecimenSave',
        title: 'Сорьцыг хэдэн градуст хэд хоног хадгалсан',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Илрүүлэх шинжилгээний  хариу" />,
      dataIndex: 'TestResult',
      key: 'TestResult',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'TestResult',
        title: 'Илрүүлэх шинжилгээний  хариу',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Ямар шинжилгээ хийлгэх" />,
      dataIndex: 'testNames',
      key: 'testNames',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'testNames',
        title: 'Шинжилгээний нэр',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Сорьц илгээх үеийн хайрцагны температур" />,
      dataIndex: 'SampleSentTemprature',
      key: 'SampleSentTemprature',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'SampleSentTemprature',
        title: 'Сорьц илгээх үеийн хайрцагны температур',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Сорьц илгээсэн он сар өдөр" />,
      dataIndex: 'SampleSentDate',
      key: 'SampleSentDate',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'SampleSentDate',
        title: 'Сорьц илгээсэн он сар өдөр',
        handleSave: handleSave,
      }),
    },
    {
      title: <Trans id="Сорьц илгээсэн хүний нэр, гарын үсэг" />,
      dataIndex: 'SampleSentPersonName',
      key: 'SampleSentPersonName',
      onCell: record => ({
        record,
        editable: true,
        dataIndex: 'SampleSentPersonName',
        title: 'Сорьц илгээсэн хүний нэр, гарын үсэг',
        handleSave: handleSave,
      }),
    },
  ]

  function fetchData() {
    return props
      .dispatch({
        type: 'reception_externalSamples/querySpecimens',
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
        props.reception_externalSamples.valuesets
      )

      setAddressValueset(ADDRESS_VALUESET)
    }

    fetchData()
  }, [props.reception_externalSamples.valuesets, selectedValues])

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
        type: 'reception_externalSamples/querySpecimens',
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

  const handleSave = row => {
    const newData = [...dataSource]
    const index = newData.findIndex(item => row.identifier === item.identifier)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setDataSource(newData)
  }

  const saveExternalSamples = async () => {
    const response = await props.dispatch({
      type: 'reception_externalSamples/saveExternalSample',
      payload: { dataSource: dataSource },
    })

    if (response.success) {
      setShowModal(true)
      setMessageType('success')
    } else {
      setShowModal(true)
      setMessageType('error')
      setDataSource(dataSource)
    }

    fetchData()
    fetchFileList()
  }

  function handleSelectChange(value) {
    setSelectedValues(value)
  }

  const downloadExcel = async () => {
    const response = await props.dispatch({
      type: 'reception_externalSamples/downloadExcel',
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
        type: 'reception_externalSamples/querySpecimens',
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

  const onStartDate = (date, dateString) => {
    setStartDate(dateString)
  }

  const onEndDate = (date, dateString) => {
    setEndDate(dateString)
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
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
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
            style={{ width: '100%' }}
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
      {/* <Row type="flex" justify="end" style={{ marginTop: '8px' }}>
        <Button type="primary" onClick={onSearch}>
          <Trans id="Search" />
        </Button>
      </Row> */}

      <div
        style={{
          height: '1px',
          background: '#E5E5E9',
          margin: '16px 0 32px 0',
        }}
      />

      <EditableNew
        dataSource={dataSource}
        columns={columns3}
        pagination={tablePagination}
        onChange={handleTableChange}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button type="primary" onClick={saveExternalSamples}>
          <Trans id={'Save'} />
        </Button>

        <Button type="primary" onClick={downloadExcel}>
          <Trans id="Download" />
          <span style={{ marginLeft: '8px' }}>EXCEL</span>
        </Button>
      </div>

      <MessageModal
        visible={modalVisible}
        onCancel={() => setShowModal(false)}
        type={messageType}
        content={
          <Trans
            id={messageType === 'success' ? 'Save Successful' : 'Алдаа гарлаа'}
          />
        }
      />
    </Board>
  )
}

SpecimenCondition.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, reception_externalSamples, loading }) => ({
  app,
  reception_externalSamples,
  loading,
}))(withI18n()(SpecimenCondition))
