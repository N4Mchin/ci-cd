import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './style.less'
import { Board } from 'components'
import { generatePdf } from 'utils/helper'
import List from './components/List'
import Filter from './components/Filter'
import { Row, Col, Typography, Button, DatePicker } from 'antd'

const moment = require('moment')

function ReportTitle() {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <Text strong>Report </Text>
        <Text> - Selector</Text>
      </Trans>
    </div>
  )
}
const DEFAULT_PAGE_SIZE = 20
const { Text } = Typography
const Report = props => {
  const { report, i18n, formValues } = props

  const { list, pagination } = report
  async function onPrint() {
    const pdf = await generatePdf(document, 'listContainer', 'landscape')
    const linkSource = `data:application/pdf;base64,${pdf}`
    const downloadLink = document.createElement('a')
    const fileName = 'report.pdf'

    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }

  const [filterFormValues, setFilterFormValues] = useState({})
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
  const [endDate, setEndDate] = useState(moment())
  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [sumLabTestCost, setSumLabTestCost] = useState()
  const [sumCheckupCost, setSumCheckupCost] = useState()
  const [sumDiagnosticTestCost, setSumDiagnosticTestCost] = useState()
  const [sumCustomersDiscount, setSumCustomersDiscount] = useState()

  const [sumInCash, setSumInCash] = useState()
  const [sumByCredit, setSumByCredit] = useState()
  const [sumInsuranceHBV, setSumInsuranceHBV] = useState()
  const [sumInsuranceHCV, setSumInsuranceHCV] = useState()
  const [sumTotalAmount, setSumTotalAmount] = useState()

  const [sumTotalIncome, setSumTotalIncome] = useState()

  useEffect(() => {
    setLoadingData(true)
    fetchData({
      filterFormValues: filterFormValues,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    }).finally(() => {
      setLoadingData(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterFormValues])
  function fetchData(payload = {}) {
    setLoadingData(true)
    const {
      _count,
      _page,
      // sortField,
      // sortOrder,
      // filters,
      startDate,
      endDate,
      filterFormValues,
    } = payload

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
        setSumLabTestCost(newDataSource.sumLabTestCost.toFixed(2))
        setSumCheckupCost(newDataSource.sumCheckupCost.toFixed(2))
        setSumDiagnosticTestCost(newDataSource.sumDiagnosticTestCost.toFixed(2))
        setSumCustomersDiscount(newDataSource.sumCustomersDiscount.toFixed(2))
        setSumInCash(newDataSource.sumInCash.toFixed(2))
        setSumByCredit(newDataSource.sumByCredit.toFixed(2))
        setSumInsuranceHBV(newDataSource.sumInsuranceHBV.toFixed(2))
        setSumInsuranceHCV(newDataSource.sumInsuranceHCV.toFixed(2))
        setSumTotalAmount(newDataSource.sumTotalAmount.toFixed(2))
        setSumTotalIncome(newDataSource.sumTotalIncome.toFixed(2))

        setDataSource(newDataSource.dataSource)
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

  const listProps = {
    dataSource: dataSource,
    onChange: handleTableChange,
    loading: loadingData,
    sumLabTestCost: sumLabTestCost,
    sumCheckupCost: sumCheckupCost,
    sumDiagnosticTestCost: sumDiagnosticTestCost,
    sumCustomersDiscount: sumCustomersDiscount,
    sumInCash: sumInCash,
    sumByCredit: sumByCredit,
    sumInsuranceHBV: sumInsuranceHBV,
    sumInsuranceHCV: sumInsuranceHCV,
    sumTotalAmount: sumTotalAmount,
    sumTotalIncome: sumTotalIncome,
    pagination: {
      ...pagination,
      showTotal: total => <Trans>Total {total}</Trans>,
    },
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
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
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

  return (
    <Board inner>
      <div>
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

        <div id="listContainer">
          <List {...listProps} loadingData={loadingData} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            marginTop: '20px',
          }}
        >
          <Button
            className={styles.downloadButton}
            onClick={onPrint}
            style={{ marginRight: '10px' }}
          >
            <Trans id="Download" />
            <span style={{ marginLeft: '8px' }}>PDF</span>
          </Button>

          <Button type="primary" onClick={downloadExcel}>
            <Trans id="Download" />
            <span style={{ marginLeft: '8px' }}>EXCEL</span>
          </Button>
        </div>
      </div>
    </Board>
  )
}
Report.propTypes = {
  loading: PropTypes.bool,
}

export default connect(({ app, report, loading }) => ({
  app,
  report,
  loading,
}))(withI18n()(Report))
