import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { Trans, withI18n } from '@lingui/react'
import { StatBox, TestTab } from '../../components'
import { Button, DatePicker, Input, Col, Row } from 'antd'
import {
  ModalResultInput,
  ModalResultEdit,
  ModalResultVerified,
  ModalResultReInput,
} from './components'
import { Board, MessageModal, DivInput } from 'components'
import { RESULT_STATUS } from 'utils/constant'
import * as helper from 'utils/helper'

import moment from 'moment'

const Hematology = props => {
  const { laboratory_test_hematology, dispatch, location } = props
  const { query, pathname } = location
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [rowData, setRowData] = useState()
  const [modalResultInputVisible, showModalResultInput] = useState(false)
  const [modalResultReInputVisible, showModalResultReInput] = useState(false)
  const [modalResultEditVisible, showModalResultEdit] = useState(false)
  const [modalResultVerifiedVisible, showModalResultVerified] = useState(false)
  const [message, setMessage] = useState(false)
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Awaited')

  const [searchSpecimenBarcode, setSearchSpecimenBarcode] = useState('')
  const [tablePagination, setTablePagination] = useState()

  const [filterDate, setFilterDate] = useState(moment())
  const [isSearchable, setIsSearchable] = useState(false)
  const [nowSearchingByBarcode, setNowSearchingByBarcode] = useState(false)

  function fetchData(tabKey, pagination, filteredDate) {
    let type
    if (tabKey === 'Awaited') {
      type = 'laboratory_test/queryTestsAwaited'
    } else if (tabKey === 'InInspection') {
      type = 'laboratory_test/queryTestsInInspection'
    } else if (tabKey === 'Verified') {
      type = 'laboratory_test/queryTestsVerified'
    } else if (tabKey === 'Correction') {
      type = 'laboratory_test/queryTestsCorrection'
    }

    setLoadingData(true)

    return props
      .dispatch({
        type: type,
        payload: {
          labTestCode:
            props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
              .Hematology,
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

  function searchData(value) {
    setLoadingData(true)

    return props
      .dispatch({
        type: 'laboratory_test/queryTestsBySpecimenBarcode',
        payload: {
          labTestCode:
            props.app.FHIR_CODES &&
            props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
              .Hematology,
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

        setDataSource(result.dataSource)
        setTablePagination(result.pagination)
        return
      })
      .catch(errorInfo => {
        console.log(errorInfo)
        setDataSource([])
      })
      .finally(() => {
        setLoadingData(false)
      })
  }

  function refresh(params = {}) {
    const { pagination } = params

    return fetchData(selectedTab, pagination, filterDate)
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

  const onRefreshClick = () => {
    refresh()
  }

  const onSearchClick = () => {
    setNowSearchingByBarcode(true)
    const value = searchSpecimenBarcode

    if (value.length === 12) {
      const number = helper.calculateChecksumEAN13(value)
      searchData(value + `${number}`)
    } else if (value.length === 13) {
      searchData(value)
    } else {
      refresh()
    }
  }

  const handleTabChange = tabKey => {
    setSelectedTab(tabKey)
  }

  const onSubmitEdit = () => {
    setMessage(<Trans id="Result sent to quality assurance" />)
    setTimeout(() => showMessageModal(true), 150)

    showModalResultEdit(false)

    refresh()
  }

  const onSubmitInput = () => {
    showModalResultInput(false)

    setMessage(<Trans id="Result sent to quality assurance" />)
    setTimeout(() => showMessageModal(true), 150)

    refresh()
  }

  const onSubmitReInput = () => {
    showModalResultReInput(false)

    setMessage(<Trans id="Result sent to quality assurance" />)
    setTimeout(() => showMessageModal(true), 150)

    refresh()
  }

  const onResultClick = (record, rowIndex) => {
    setSelectedRowIndex(rowIndex)
    setRowData(record)

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
    rowKey: record => record.key,
    onRow: (record, rowIndex) => {
      return {
        onClick: event => {
          onResultClick(record, rowIndex)
        },
      }
    },
    onChange: handleTableChange,
    pagination: tablePagination,
    loading: loadingData,
  }

  return (
    <Board inner>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div
          style={{
            textTransform: 'uppercase',
            width: '100%',
            paddingRight: '8px',
          }}
        >
          <span className="bold ">Hematology</span>
          {' | '}
          <Trans>
            <span className="bold">Test </span>
            <span>Order List</span>
          </Trans>
          <div style={{ height: '1px', background: '#E5E5E9' }} />
        </div>
        <Button
          type="primary"
          onClick={() => {
            router.push({
              pathname: pathname + '/dailyLog',
            })
          }}
        >
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Medium' }}>
              DailyLog
            </span>
          </Trans>
        </Button>
      </div>
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
      />

      {modalResultInputVisible && (
        <ModalResultInput
          rowData={rowData}
          selectedRowIndex={selectedRowIndex}
          visible={modalResultInputVisible}
          onCancel={() => showModalResultInput(false)}
          onSubmit={onSubmitInput}
        />
      )}
      {modalResultEditVisible && (
        <ModalResultEdit
          rowData={rowData}
          selectedRowIndex={selectedRowIndex}
          visible={modalResultEditVisible}
          onCancel={() => showModalResultEdit(false)}
          onSubmit={onSubmitEdit}
        />
      )}

      {modalResultVerifiedVisible && (
        <ModalResultVerified
          visible={modalResultVerifiedVisible}
          rowData={rowData}
          selectedRowIndex={selectedRowIndex}
          onCancel={() => showModalResultVerified(false)}
        />
      )}

      {modalResultReInputVisible && (
        <ModalResultReInput
          visible={modalResultReInputVisible}
          rowData={rowData}
          selectedRowIndex={selectedRowIndex}
          onCancel={() => showModalResultReInput(false)}
          onSubmit={onSubmitReInput}
        />
      )}

      <MessageModal
        type="success"
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={message}
      />
    </Board>
  )
}

Hematology.propTypes = {
  laboratory_test_hematology: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, laboratory_test, laboratory_test_hematology, loading }) => ({
    app,
    laboratory_test,
    laboratory_test_hematology,
    loading,
  })
)(withI18n()(Hematology))
