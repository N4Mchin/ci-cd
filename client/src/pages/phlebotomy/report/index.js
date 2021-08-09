import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import { generatePdf } from 'utils/helper'
import Filter from './components/Filter'
import List from './components/List'
import styles from './styles.less'
import { DatePicker, Button, Row, Typography, Col } from 'antd'
const moment = require('moment')

const { Text } = Typography

const DEFAULT_PAGE_SIZE = 20

function ReportTitle() {
  return (
    <div className={styles.title}>
      <Trans>
        <Text strong> Report</Text>
        <Text> - Selector</Text>
      </Trans>
    </div>
  )
}
const Report = props => {
  const { report, i18n, formValues } = props
  const { list, pagination, selectedRowKeys } = report
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
  const [filterFormValues, setFilterFormValues] = useState({})
  const [endDate, setEndDate] = useState(moment())
  const [loadingData, setLoadingData] = useState()
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setLoadingData(true)
    fetchData({
      filterFormValues: filterFormValues,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    }).finally(() => {
      setLoadingData(false)
    })
  }, [filterFormValues])

  function fetchData(payload = {}) {
    setLoadingData(true)
    const { _count, _page, startDate, endDate, filterFormValues } = payload

    return props
      .dispatch({
        type: 'report/queryFilteredList',
        payload: {
          formValues: filterFormValues,
          startDate,
          endDate,
          _count,
          _page,
        },
      })
      .then(newDataSource => {
        setDataSource(newDataSource)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoadingData(false)
      })
  }
  const handleTableChange = (pagination, filters, sorter) => {
    fetchData({
      _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      filterFormValues: filterFormValues,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    })
  }

  const onStartDate = value => {
    setStartDate(value)
  }

  const onEndDate = value => {
    setEndDate(value)
  }
  const downloadExcel = async () => {
    const response = await props.dispatch({
      type: 'report/downloadExcel',
      payload: {
        formValues: filterFormValues,
        startDate,
        endDate,
      },
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

  const listProps = {
    dataSource: dataSource,
    onChange: handleTableChange,
    loading: loadingData,
    pagination: {
      ...pagination,
      showTotal: total => <Trans>Total {total}</Trans>,
    },
  }
  return (
    <Board inner>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{ReportTitle()}</div>
        </div>
        <div style={{ height: '1px', background: '#E5E5E9' }} />
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
      </div>
      <br />
      <Filter
        startDate={startDate}
        endDate={endDate}
        formValues={formValues}
        onChange={setFilterFormValues}
      />

      {selectedRowKeys.length > 0 && (
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>{`Selected ${selectedRowKeys.length} items `}</Col>
        </Row>
      )}
      <List {...listProps} loadingData={loadingData} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
          marginTop: '20px',
        }}
      >
        {/* <Button
          className={styles.downloadButton}
          onClick={onPrint}
          style={{ marginRight: '10px' }}
        >
          <Trans id="Download" />
          <span style={{ marginLeft: '8px' }}>PDF</span>
        </Button> */}

        {/* <Button className={styles.downloadButton}>
          <CSVLink data={dataXls} headers={headers} filename={'report.xls'}>
            <Trans id="Download" />
            <span style={{ marginLeft: '8px' }}>XLS</span>
          </CSVLink>
        </Button> */}
        <Button type="primary" onClick={downloadExcel}>
          <Trans id="Download" />
          <span style={{ marginLeft: '8px' }}>EXCEL</span>
        </Button>
      </div>
    </Board>
  )
}

Report.propTypes = {
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default connect(({ app, report, loading }) => ({
  app,
  report,
  loading,
}))(withI18n()(Report))
