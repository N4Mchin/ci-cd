import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { generatePdf } from 'utils/helper'
import styles from './styles.less'
import { Board } from 'components'
import { CSVLink } from 'react-csv'
import List from './components/List'
import Filter from './components/Filter'
import Download from './components/Download'
import TestType from './components/TestType'
import Selectors from './components/Selectors'
import * as dateTime from 'utils/datetime'
import { Row, Col, Typography, Button, DatePicker } from 'antd'
const moment = require('moment')

const { Text } = Typography

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

const Report = props => {
  const { report, loading, i18n } = props
  const { list, pagination, selectedRowKeys } = report

  async function onPrint() {
    const pdf = await generatePdf(document, 'listContainer', 'landscape')
    const linkSource = `data:application/pdf;base64,${pdf}`
    const downloadLink = document.createElement('a')
    const fileName = 'report.pdf'

    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
  }

  const headers = [
    {
      label: i18n.t`RegisteredDate`,
      key: 'date',
    },
    {
      label: i18n.t`PatientNames`,
      key: 'patientName',
    },
    {
      label: i18n.t`BiochemistryTests`,
      key: 'BiochemistryTests',
    },
    {
      label: i18n.t`ImmunologyTests`,
      key: 'ImmunologyTests',
    },
    {
      label: i18n.t`RapidTests`,
      key: 'RapidTests',
    },
    {
      label: i18n.t`Hematology`,
      key: 'Hematology',
    },
    {
      label: i18n.t`Vitamin_D3`,
      key: 'Vitamin_D3',
    },
    {
      label: i18n.t`Anti_HDV`,
      key: 'Anti_HDV',
    },
    {
      label: i18n.t`HCV_RNA`,
      key: 'HCV_RNA',
    },
    {
      label: i18n.t`HBV_DNA`,
      key: 'HBV_DNA',
    },
    {
      label: i18n.t`HDV_RNA`,
      key: 'HDV_RNA',
    },
    {
      label: i18n.t`Coagulation`,
      key: 'Coagulation',
    },
    {
      label: i18n.t`Ferritin`,
      key: 'Ferritin',
    },
  ]

  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
  const [endDate, setEndDate] = useState(moment())

  const onStartDate = value => {
    setStartDate(value)
  }

  const onEndDate = value => {
    setEndDate(value)
  }

  var BasicInfosList = []

  if (typeof list !== undefined) {
    list.forEach(element => {
      let date = dateTime.toLocalDateTime(
        element && element.authoredOn,
        'YYYY-MM-DD |',
        'HH:MM'
      )
      let patientName = element && element.patientName
      let RapidTests = element && element.RapidTests
      let BiochemistryTests = element && element.BiochemistryTests
      let Hematology = element && element.Hematology
      let ImmunologyTests = element && element.ImmunologyTests
      let Coagulation = element && element.Coagulation
      let HCV_RNA = element && element.HCV_RNA
      let HBV_DNA = element && element.HBV_DNA
      let HDV_RNA = element && element.HDV_RNA
      // let Genotype = element.Genotype
      // let Urinalysis = element.Urinalysis
      // let ESR = element.ESR
      let Vitamin_D3 = element && element.Vitamin_D3
      let Ferritin = element && element.Ferritin
      let Anti_HDV = element && element.Anti_HDV

      // if (date !== undefined && patientName !== undefined && RapidTests !== undefined &&
      //   HCV_RNA !== undefined &&
      //   HBV_DNA !== undefined &&
      //   HDV_RNA !== undefined &&
      //   BiochemistryTests !== undefined &&
      //   Hematology !== undefined &&
      //   ImmunologyTests !== undefined &&
      //   Coagulation !== undefined &&
      //   Vitamin_D3 !== undefined &&
      //   Ferritin !== undefined &&
      //   Anti_HDV !== undefined
      // )
      // if (
      //   date &&
      //   patientName &&
      //   RapidTests &&
      //   HCV_RNA &&
      //   HBV_DNA &&
      //   HDV_RNA &&
      //   BiochemistryTests &&
      //   Hematology &&
      //   ImmunologyTests &&
      //   Coagulation &&
      //   Vitamin_D3 &&
      //   Ferritin &&
      //   Anti_HDV
      // ) {
      BasicInfosList.push({
        date,
        patientName,
        RapidTests,
        HCV_RNA,
        HBV_DNA,
        HDV_RNA,
        BiochemistryTests,
        Hematology,
        ImmunologyTests,
        Coagulation,
        // Genotype,
        // Urinalysis,
        // ESR,
        Vitamin_D3,
        Ferritin,
        Anti_HDV,
      })
      // }
    })
  }

  const dataXls = BasicInfosList
  const listProps = {
    dataSource: BasicInfosList,
    loading: loading.effects['report/query'],
    pagination,
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
      <Filter startDate={startDate} endDate={endDate} />

      {selectedRowKeys.length > 0 && (
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>{`Selected ${selectedRowKeys.length} items `}</Col>
        </Row>
      )}
      <br />
      <List {...listProps} />
      {/* <Download data={BasicInfosList} /> */}
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

        <Button className={styles.downloadButton}>
          <CSVLink data={dataXls} headers={headers} filename={'report.xls'}>
            <Trans id="Download" />
            <span style={{ marginLeft: '8px' }}>XLS</span>
          </CSVLink>
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
