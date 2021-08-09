import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { router } from 'utils'
import styles from '../styles.less'
import { Board, CompactTable } from 'components'
import { Divider, Row, Button, Table } from 'antd'

const PatientList = props => {
  const { reception, loading } = props
  const { dataSource } = reception
  console.log(dataSource)

  const tableProps = {
    onRow: record => {
      return {
        onClick: () => {
          router.push(`/reception/patient/${record.id}`)
        },
      }
    },
    dataSource: dataSource,
    loading: loading.effects['reception/query'],
  }

  const columns = [
    {
      title: <Trans id="Barcode" />,
      dataIndex: 'barcode',
      key: 'barcode',
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
      dataIndex: 'NInum',
      key: 'NInum',
    },

    {
      title: <Trans id="GeneralPractitioner" />,
      dataIndex: 'generalPractitioner',
      key: 'practitioner',
    },
  ]

  return (
    <Board inner id="AllPatientList">
      <Row type="flex" justify="space-between" align="bottom">
        <div className={styles.title}>
          <Trans>
            <span className="title">All </span>
            <span>Patient List</span>
          </Trans>
        </div>
        <Button className="button-red">
          <Trans id="Register" />
        </Button>
      </Row>

      <Divider className={styles.divider} />

      <CompactTable
        {...tableProps}
        rowKey={record => record.id}
        columns={columns}
        className={styles.table}
        tableLayout="fixed"
      />
    </Board>
  )
}

PatientList.propTypes = {
  reception: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ reception, loading }) => ({
  reception,
  loading,
}))(withI18n()(PatientList))
