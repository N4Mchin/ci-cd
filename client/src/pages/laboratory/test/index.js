import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { TestTab } from '../components'
import * as helper from 'utils/helper'
import { Button, DatePicker, Input, Col, Row } from 'antd'
import styles from './styles.less'
import { RESULT_STATUS } from 'utils/constant'
import { Board, ModuleBox, MessageModal, DivInput } from 'components'
import moment from 'moment'

const TESTS = [
  {
    name: 'antiHDV',
    display: 'Anti-HDV',
  },
  {
    name: 'biochemistry',
    display: 'Biochemistry',
  },
  {
    name: 'coagulation',
    display: 'Coagulation',
  },
  {
    name: 'esr',
    display: 'ESR',
    disabled: true,
  },
  {
    name: 'ferritin',
    display: 'Ferritin',
  },
  {
    name: 'genotype',
    display: 'Genotype',
    disabled: true,
  },
  {
    name: 'hematology',
    display: 'Hematology',
  },
  {
    name: 'immunology',
    display: 'Immunology',
  },
  {
    name: 'rapidTests',
    display: 'Rapid Tests',
  },
  {
    name: 'researchSample',
    display: 'Research Sample',
    disabled: true,
  },
  {
    name: 'urinalysis',
    display: 'Urinalysis',
    disabled: true,
  },
  {
    name: 'viralLoadTests',
    display: 'Viral Load Tests',
  },
  {
    name: 'vitaminD3',
    display: 'Vitamin D3',
  },
  {
    name: 'sarsCov2IgG',
    display: 'Sars-Cov 2-IgG',
  },
  {
    name: 'sarsCov2IgGElisa',
    display: 'Sars-Cov 2-IgG Elisa',
  },
]

const LaboratoryTest = props => {
  const [dataSource, setDataSource] = useState([])
  const [tablePagination, setTablePagination] = useState()
  const [loadingData, setLoadingData] = useState(false)
  const [selectedTab, setSelectedTab] = useState('Awaited')
  const [searchSpecimenBarcode, setSearchSpecimenBarcode] = useState('')

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
          type: 'all',
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
          specimenBarcode: value,
          type: 'all',
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
        setTablePagination({})
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

  const handleTabChange = tabKey => {
    setSelectedTab(tabKey)
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
    rowClassName: record => styles[record.status],
    onChange: handleTableChange,
    pagination: tablePagination,
    loading: loadingData,
  }

  return (
    <Board inner>
      <div
        style={{
          display: 'flex',
          paddingBottom: '16px',
        }}
      >
        <div style={{ minWidth: '25%', maxWidth: '25%' }}>
          <ModuleBox
            title={
              <Trans>
                <span className="title uppercase">Test </span>
                <span className="uppercase">Selection</span>
              </Trans>
            }
            stretch
          >
            <Row gutter={[20, 20]}>
              {TESTS.map(test => (
                <Col span={12}>
                  <Button
                    onClick={() => {
                      router.push('/laboratory/test/' + test.name)
                    }}
                    className={styles.testItemBox}
                    disabled={test.disabled}
                    block
                  >
                    <div
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                      }}
                    >
                      {test.display}
                    </div>
                  </Button>
                </Col>
              ))}
            </Row>
          </ModuleBox>
        </div>
        <div style={{ width: '75%', marginLeft: '16px' }}>
          <ModuleBox
            title={
              <Trans>
                <span className="title uppercase">Order </span>
                <span className="uppercase">List</span>
              </Trans>
            }
            stretch
          >
            <div
              className="bg-gray-5"
              style={{ height: '1px', marginTop: '16px' }}
            />
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
            <div
              className="bg-gray-5"
              style={{ height: '1px', marginTop: '16px' }}
            />
            <TestTab
              defaultSelected={selectedTab}
              selectedTab={selectedTab}
              tableProps={tableProps}
              dataSource={dataSource}
              // loading={loadingData}
              onSearch={onSearchClick}
              onRefresh={refresh}
              handleTabChange={handleTabChange}
            />
          </ModuleBox>
        </div>
      </div>
    </Board>
  )
}

LaboratoryTest.propTypes = {
  app: PropTypes.object,
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test, loading, app }) => ({
  app,
  laboratory_test,
  loading,
}))(withI18n()(LaboratoryTest))
