import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import * as helper from 'utils/helper'
import {
  ModalModule,
  ModalModuleHDV,
  ModalResultInput,
  ModalResultReInput,
  ItemResultBox,
  ModalResultEdit,
  ModalResultVerified,
} from './components'

import { StatBox, TestTab } from '../../components'
import { Button, DatePicker, Input, Col, Row } from 'antd'
import { RESULT_STATUS } from 'utils/constant'
import { MessageModal, DivInput } from 'components'
import moment from 'moment'

const SubTestPage = props => {
  const { labTestName } = props
  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState()
  const [modalResultInputVisible, showModalResultInput] = useState(false)
  const [modalModuleVisible, showModalModule] = useState(false)
  const [modalResultEditVisible, showModalResultEdit] = useState(false)
  const [modalReInputVisible, showModalResultReInput] = useState(false)
  const [modalResultVerifiedVisible, showModalResultVerified] = useState(false)
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [selectedTab, setSelectedTab] = useState('Awaited')
  const [message, setMessage] = useState('')
  const [searchSpecimenBarcode, setSearchSpecimenBarcode] = useState('')
  const [tablePagination, setTablePagination] = useState()

  const [filterDate, setFilterDate] = useState(moment())
  const [isSearchable, setIsSearchable] = useState(false)
  const [nowSearchingByBarcode, setNowSearchingByBarcode] = useState(false)

  function fetchData(testNameString, tabKey, pagination, filteredDate) {
    let type
    if (tabKey === 'Awaited') {
      type = 'laboratory_test_viralLoadTests/queryTestsAwaited'
    } else if (tabKey === 'InInspection') {
      type = 'laboratory_test_viralLoadTests/queryTestsInInspection'
    } else if (tabKey === 'Verified') {
      type = 'laboratory_test_viralLoadTests/queryTestsVerified'
    } else if (tabKey === 'Correction') {
      type = 'laboratory_test_viralLoadTests/queryTestsCorrection'
    }

    setLoadingData(true)

    return props
      .dispatch({
        type: type,
        payload: {
          testNameString: testNameString,
          ...pagination,
          filteredDate: filteredDate.format('YYYY-MM-DD'),
        },
      })
      .then(result => {
        setDataSource(result.dataSource)
        setTablePagination(result.pagination)
        return
      })
      .catch(errorInfo => {
        console.log(errorInfo)
        setDataSource([])
        setTablePagination({})
      })
      .finally(() => {
        setLoadingData(false)
      })
  }

  function searchData(testNameString, value) {
    setLoadingData(true)

    return props
      .dispatch({
        type: 'laboratory_test_viralLoadTests/queryTestsBySpecimenBarcode',
        payload: {
          testNameString: testNameString,
          specimenBarcode: value,
        },
      })
      .then(result => {
        const { status } = result.dataSource[0]

        if (status === RESULT_STATUS.notAvailable) {
          setSelectedTab('Awaited')
        } else if (status === RESULT_STATUS.entered) {
          setSelectedTab('InInspection')
        } else if (
          status === RESULT_STATUS.verified ||
          status === RESULT_STATUS.reVerified
        ) {
          setSelectedTab('Verified')
        } else if (status === RESULT_STATUS.reVerificationRequired) {
          setSelectedTab('Correction')
        }

        console.log(result)
        setDataSource(result.dataSource)
        setTablePagination(result.pagination)
        return
      })
      .catch(errorInfo => {
        console.log(errorInfo)
        setDataSource([])
        setTablePagination({})
      })
      .finally(() => {
        setLoadingData(false)
      })
  }

  function refresh(params = {}) {
    const { pagination } = params

    return fetchData(props.labTestName, selectedTab, pagination, filterDate)
  }

  function onDatePickerChange(momentObject, dateString) {
    setFilterDate(momentObject)
  }

  useEffect(() => {
    if (!searchSpecimenBarcode || searchSpecimenBarcode === '') {
      // when not searching
      refresh()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab, filterDate, props.app.FHIR_CODES])

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.labTestName])

  const addOns = [
    {
      title: <Trans id={'Result'} />,
      dataIndex: 'result',
      key: 'result',
      width: '10%',
      render: (text, record, index) => {
        const data = {
          status: record.status,
          value:
            record.latestObservation &&
            record.latestObservation.valueQuantity &&
            record.latestObservation.valueQuantity.value,
          hasServiceRequest: true,
          disabled: !record.module,
        }
        return (
          <ItemResultBox
            {...data}
            onClick={() => onResultClick(record, index)}
            block
          />
        )
      },
    },
    {
      title:
        labTestName === 'HDV_RNA' ? (
          <Trans id={'Well'} />
        ) : (
          <Trans id={'Module'} />
        ),
      dataIndex: 'module',
      className: styles.testResult,
      key: 'module',
      width: '10%',
      render: (text, record, index) => {
        const data = {
          status: text ? RESULT_STATUS.verified : RESULT_STATUS.notAvailable,
          value: text && text.module,
          hasServiceRequest: true,
        }
        return (
          <ItemResultBox
            {...data}
            onClick={() => onModuleClick(true, index)}
            block
          />
        )
      },
    },
  ]

  const onRefreshClick = () => {
    refresh()
  }

  const onSearchClick = () => {
    setNowSearchingByBarcode(true)
    const value = searchSpecimenBarcode

    if (value.length === 12) {
      const number = helper.calculateChecksumEAN13(value)
      searchData(props.labTestName, value + `${number}`)
    } else if (value.length === 13) {
      searchData(props.labTestName, value)
    } else {
      refresh()
    }
  }
  const handleTabChange = tabKey => {
    setSelectedTab(tabKey)
  }

  const onSubmitModule = () => {
    showModalModule(false)

    setMessage(<Trans id="Module saved" />)
    setTimeout(() => showMessageModal(true), 150)

    // refresh
    refresh()
  }

  const handleCancel = () => showModalModule(false)

  const onSubmitInput = () => {
    // hide input modal
    showModalResultInput(false)

    // show success modal
    setMessage(<Trans id="Result sent to quality assurance" />)
    setTimeout(() => showMessageModal(true), 150)

    // refresh
    refresh()
  }

  const onSubmitEdit = () => {
    setMessage(<Trans id="Result sent to quality assurance" />)
    setTimeout(() => showMessageModal(true), 150)

    showModalResultEdit(false)

    refresh()
  }

  const onSubmitReInput = () => {
    // hide input modal
    showModalResultReInput(false)

    // show success modal
    setMessage(<Trans id={'Result sent to quality assurance'} />)
    setTimeout(() => showMessageModal(true), 150)

    // refresh
    refresh()
  }

  const onModuleClick = (modalModuleVisible, index) => {
    showModalResultInput(false)
    showModalModule(modalModuleVisible)
    setSelectedRowIndex(index)
  }

  const onResultClick = (record, rowIndex) => {
    setSelectedRowIndex(rowIndex)

    switch (record.status) {
      case RESULT_STATUS.notAvailable:
        showModalResultInput(true)
        break
      case RESULT_STATUS.entered:
        showModalResultEdit(true)
        break

      case RESULT_STATUS.verified:
      case RESULT_STATUS.reVerified:
        showModalResultVerified(true)
        break
      case RESULT_STATUS.reVerificationRequired:
        showModalResultReInput(true)
        break
      default:
        break
    }
  }

  const handleTableChange = (pagination, filters, sorter) => {
    refresh({
      pagination: {
        _count: pagination.pageSize,
        _page: pagination.current,
        sortField: sorter && sorter.field,
        sortOrder: sorter && sorter.order,
        ...filters,
      },
    })
  }

  const onSpecimenSearchChange = event => {
    if (event.target.value && event.target.value.length >= 12) {
      setIsSearchable(true)
      setSearchSpecimenBarcode(event.target.value)
    } else {
      setIsSearchable(false)
      setSearchSpecimenBarcode()

      if (event.target.value === '') {
        setNowSearchingByBarcode(false)
        refresh()
      }
    }
  }

  const onSpecimenSearchInputPressEnter = () => {
    if (isSearchable) {
      onSearchClick()
    }
  }

  const tableProps = {
    rowKey: row => row.key,
    // onRow: (record, rowIndex) => {
    //   console.log('recooooordododoo', record)
    //   return {
    //     onClick: event => onResultClick(record, rowIndex),
    //   }
    // },
    onChange: handleTableChange,
    pagination: tablePagination,
    loading: loadingData,
  }

  return (
    <div className={styles.container}>
      <div className="bg-gray-5" style={{ height: '1px', marginTop: '16px' }} />
      <div style={{ padding: '16px 0' }}>
        <Row>
          <Col span={8}>
            <DivInput
              value={
                <div>
                  <Trans id="Date of test order" />:
                </div>
              }
              style={{ border: 'none' }}
            />
          </Col>
          <Col>
            <DatePicker
              disabled={nowSearchingByBarcode}
              allowClear={false}
              style={{ width: '160px' }}
              value={filterDate}
              onChange={onDatePickerChange}
            />
          </Col>
        </Row>
        <Row gutter={[0, 16]}>
          <Col span={8}>
            <DivInput
              value={
                <div>
                  <Trans id="Search by specimen barcode" />:
                </div>
              }
              style={{ border: 'none' }}
            />
          </Col>
          <Col>
            <Input.Group compact>
              <Input
                onChange={onSpecimenSearchChange}
                onPressEnter={onSpecimenSearchInputPressEnter}
                allowClear
                style={{ width: '160px' }}
                maxLength={13}
              />
              <Button
                disabled={!isSearchable}
                type="primary"
                onClick={onSearchClick}
              >
                Search
              </Button>
            </Input.Group>
          </Col>
        </Row>
      </div>
      <div className="bg-gray-5" style={{ height: '1px', marginTop: '16px' }} />
      <StatBox disabled={nowSearchingByBarcode} />

      <TestTab
        defaultSelected={selectedTab}
        tableProps={tableProps}
        selectedTab={selectedTab}
        dataSource={dataSource}
        onRefresh={onRefreshClick}
        onSearch={onSearchClick}
        handleTabChange={handleTabChange}
        addOnColumns={addOns}
      />

      {modalResultInputVisible && (
        <ModalResultInput
          testNameString={props.labTestName}
          rowData={selectedRowIndex >= 0 && dataSource[selectedRowIndex]}
          visible={modalResultInputVisible}
          className={styles.modalContent}
          onCancel={() => showModalResultInput(false)}
          onSubmit={onSubmitInput}
          width="900px"
        ></ModalResultInput>
      )}
      {props.labTestName === 'HDV_RNA' ? (
        <div>
          {' '}
          {modalModuleVisible && (
            <ModalModuleHDV
              visible={modalModuleVisible}
              onCancel={() => showModalModule(false)}
              onSubmit={onSubmitModule}
              width={310}
              rowIndex={selectedRowIndex}
              module={
                selectedRowIndex >= 0 && dataSource[selectedRowIndex].module
              }
              serviceRequestId={dataSource[selectedRowIndex].serviceRequest.id}
              footer={[
                <Button
                  className="button-gray uppercase"
                  onClick={handleCancel}
                >
                  <Trans id="Cancel" />
                </Button>,
                <Button className="button-red uppercase" onClick={handleCancel}>
                  <Trans id="Save" />
                </Button>,
              ]}
            />
          )}
        </div>
      ) : (
        <div>
          {' '}
          {modalModuleVisible && (
            <ModalModule
              visible={modalModuleVisible}
              onCancel={() => showModalModule(false)}
              onSubmit={onSubmitModule}
              width={310}
              rowIndex={selectedRowIndex}
              module={
                selectedRowIndex >= 0 && dataSource[selectedRowIndex].module
              }
              serviceRequestId={dataSource[selectedRowIndex].serviceRequest.id}
              footer={[
                <Button
                  className="button-gray uppercase"
                  onClick={handleCancel}
                >
                  <Trans id="Cancel" />
                </Button>,
                <Button className="button-red uppercase" onClick={handleCancel}>
                  <Trans id="Save" />
                </Button>,
              ]}
            />
          )}
        </div>
      )}

      {modalResultEditVisible && (
        <ModalResultEdit
          testNameString={props.labTestName}
          rowData={selectedRowIndex >= 0 && dataSource[selectedRowIndex]}
          visible={modalResultEditVisible}
          onCancel={() => showModalResultEdit(false)}
          onSubmit={onSubmitEdit}
          width="900px"
        />
      )}

      {modalReInputVisible && (
        <ModalResultReInput
          testNameString={props.labTestName}
          rowData={selectedRowIndex >= 0 && dataSource[selectedRowIndex]}
          visible={modalReInputVisible}
          onCancel={() => showModalResultReInput(false)}
          onSubmit={onSubmitReInput}
          width="900px"
        />
      )}

      {modalResultVerifiedVisible && (
        <ModalResultVerified
          testNameString={props.labTestName}
          rowData={selectedRowIndex >= 0 && dataSource[selectedRowIndex]}
          visible={modalResultVerifiedVisible}
          onCancel={() => showModalResultVerified(false)}
          className={styles.modalContent}
          width="900px"
        />
      )}

      <MessageModal
        type="success"
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={message}
      />
    </div>
  )
}

SubTestPage.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_test_viralLoadTests, loading }) => ({
  app,
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(SubTestPage))
