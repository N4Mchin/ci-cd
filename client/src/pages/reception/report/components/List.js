import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'
import { Table, Typography, Divider } from 'antd'
const { Text } = Typography

const List = props => {
  const { loadingData } = props

  const columns = [
    {
      title: <Trans>RegisteredDate</Trans>,
      dataIndex: 'date',
      key: 'date',

      render: (text, record) => text,
    },
    {
      title: <Trans id="LastName" />,
      dataIndex: 'lastName',
      key: 'lastName',

      render: (text, record) => text,
    },
    {
      title: <Trans id="FirstName" />,
      dataIndex: 'firstName',
      key: 'firstName',

      render: (text, record) => text,
    },
    {
      title: <Trans id="NationalIdentificationNumber" />,
      dataIndex: 'nationIdentificationNumber',
      key: 'nationIdentificationNumber',

      render: (text, record) => text,
    },
    {
      title: <Trans>Barcode</Trans>,
      dataIndex: 'patientNumber',
      key: 'patientNumber',

      render: (text, record) => {
        return record.patientNumber
      },
    },
    {
      title: <Trans>LabTest</Trans>,
      dataIndex: 'labTest',
      key: 'labTest',
      align: 'right',

      sorter: (a, b) => a.labTest - b.labTest,
      render: (text, record) => {
        return record.labTest.toFixed(2)
      },
    },
    {
      title: <Trans>ObservationPractitioner</Trans>,
      dataIndex: 'observation',
      key: 'observation',
      align: 'right',

      sorter: (a, b) => a.observation - b.observation,
      render: (text, record) => {
        return record.observation.toFixed(2)
      },
    },
    {
      title: <Trans>DiagnosticTest</Trans>,
      dataIndex: 'diagnosticTest',
      key: 'diagnosticTest',
      align: 'right',

      sorter: (a, b) => a.diagnosticTest - b.diagnosticTest,
      render: (text, record) => {
        return record.diagnosticTest.toFixed(2)
      },
    },
    {
      title: <Trans>Research</Trans>,
      dataIndex: 'research',
      key: 'research',
      align: 'right',

      render: (text, record) => text,
    },
    {
      title: <Trans>Discount</Trans>,
      dataIndex: 'discount',
      key: 'discount',
      align: 'right',

      render: (text, record) => {
        return record.discount.toFixed(2)
      },
    },
    {
      title: <Trans>inCash</Trans>,
      dataIndex: 'inCash',
      key: 'inCash',
      align: 'right',

      render: (text, record) => {
        return record.inCash.toFixed(2)
      },
    },
    {
      title: <Trans>byCredit</Trans>,
      dataIndex: 'byCredit',
      key: 'byCredit',
      align: 'right',

      render: (text, record) => {
        return record.byCredit.toFixed(2)
      },
    },
    {
      title: <Trans>healthInsuranceB</Trans>,
      dataIndex: 'healthInsuranceB',
      key: 'healthInsuranceB',
      align: 'right',

      render: (text, record) => {
        return record.healthInsuranceB.toFixed(2)
      },
    },
    {
      title: <Trans>healthInsuranceC</Trans>,
      dataIndex: 'healthInsuranceC',
      key: 'healthInsuranceC',
      align: 'right',

      render: (text, record) => {
        return record.healthInsuranceC.toFixed(2)
      },
    },
    {
      title: <Trans>LocalBilling</Trans>,
      dataIndex: 'localBilling',
      key: 'localBilling',
      align: 'right',

      render: (text, record) => text,
    },
    {
      title: <Trans>TotalPayment</Trans>,
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      align: 'right',

      sorter: (a, b) => a.totalPayment - b.totalPayment,
      render: (text, record) => {
        return record.totalPayment.toFixed(2)
      },
    },
    {
      title: <Trans>Income</Trans>,
      dataIndex: 'totalIncome',
      key: 'totalIncome',
      align: 'right',

      sorter: (a, b) => a.totalIncome - b.totalIncome,
      render: (text, record) => {
        return record.totalIncome.toFixed(2)
      },
    },
  ]

  const footerColumns = [
    {
      title: <Trans>RegisteredDate</Trans>,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: <Trans id="LastName" />,
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: <Trans id="FirstName" />,
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: <Trans id="NationalIdentificationNumber" />,
      dataIndex: 'nationIdentificationNumber',
      key: 'nationIdentificationNumber',
    },
    {
      title: <Trans>Barcode</Trans>,
      dataIndex: 'patientNumber',
      key: 'patientNumber',
    },
    {
      title: <Trans>LabTest</Trans>,
      dataIndex: 'labTest',
      key: 'labTest',
      align: 'right',

      sorter: (a, b) => a.labTest - b.labTest,
    },
    {
      title: <Trans>ObservationPractitioner</Trans>,
      dataIndex: 'observation',
      key: 'observation',
      align: 'right',

      sorter: (a, b) => a.observation - b.observation,
    },
    {
      title: <Trans>DiagnosticTest</Trans>,
      dataIndex: 'diagnosticTest',
      key: 'diagnosticTest',
      align: 'right',
      //
      sorter: (a, b) => a.diagnosticTest - b.diagnosticTest,
    },
    {
      title: <Trans>Research</Trans>,
      dataIndex: 'research',
      key: 'research',
      align: 'right',
    },
    {
      title: <Trans>Discount</Trans>,
      dataIndex: 'discount',
      key: 'discount',
      align: 'right',
    },
    {
      title: <Trans>inCash</Trans>,
      dataIndex: 'inCash',
      key: 'inCash',
      align: 'right',
    },
    {
      title: <Trans>byCredit</Trans>,
      dataIndex: 'byCredit',
      key: 'byCredit',
      align: 'right',
    },
    {
      title: <Trans>healthInsuranceB</Trans>,
      dataIndex: 'healthInsuranceB',
      key: 'healthInsuranceB',
      align: 'right',
    },
    {
      title: <Trans>healthInsuranceC</Trans>,
      dataIndex: 'healthInsuranceC',
      key: 'healthInsuranceC',
      align: 'right',
    },
    {
      title: <Trans>LocalBilling</Trans>,
      dataIndex: 'localBilling',
      key: 'localBilling',
      align: 'right',
    },
    {
      title: <Trans>TotalPayment</Trans>,
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      align: 'right',
    },
    {
      title: <Trans>Income</Trans>,
      dataIndex: 'totalIncome',
      key: 'totalIncome',
      align: 'right',
    },
  ]

  const footerDataSource = []
  footerDataSource.push({
    date: <div>Нийт үнийн дүн: </div>,
    lastName: <div></div>,
    firstName: <div></div>,
    nationIdentificationNumber: <div></div>,
    patientNumber: <div></div>,
    labTest: props.sumLabTestCost,
    observation: props.sumCheckupCost,
    diagnosticTest: props.sumDiagnosticTestCost,
    research: 0,
    discount: props.sumCustomersDiscount,
    inCash: props.sumInCash,
    byCredit: props.sumByCredit,
    healthInsuranceB: props.sumInsuranceHBV,
    healthInsuranceC: props.sumInsuranceHCV,
    localBilling: 0,
    totalPayment: props.sumTotalAmount,
    totalIncome: props.sumTotalIncome,
  })
  return (
    <div>
      <Text className={styles.title}>
        <Trans>
          <b>Report</b> - RequestList
        </Trans>
      </Text>
      <Divider className={styles.divider} />
      <div
        className={styles.footerTable}
        style={{
          overflowX: 'scroll',
        }}
      >
        <Table
          onChange={props.onChange}
          className={styles.table}
          bordered
          columns={columns}
          pagination={props.pagination}
          dataSource={props.dataSource}
          loading={loadingData}
          footer={() => {
            return (
              <Table
                bordered
                columns={footerColumns}
                pagination={false}
                showHeader={false}
                dataSource={footerDataSource}
                className={styles.table}
              />
            )
          }}
        />
      </div>
    </div>
  )
}

List.propTypes = {
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, report, loading }) => ({
  app,
  report,
  loading,
}))(withI18n()(List))
