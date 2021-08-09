import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { router } from 'utils'
import styles from './styles.less'
import { Board, CompactTable } from 'components'
import { Divider, Row, Button } from 'antd'

const PatientList = props => {
  const { searchedListPatient, patientList, patientListPagination } = props.app

  let patientTable = []

  function fetchData(payload = {}) {
    const { _count, _page, sortField, sortOrder, ...filters } = payload

    return props
      .dispatch({
        type: 'app/queryPatientList',
        payload: {
          _count,
          _page,
        },
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  // useEffect(() => {
  //   fetchData()

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    fetchData()
    // props.dispatch({
    //   type: 'app/getDrugInfoByDiagnose',
    // })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (searchedListPatient) {
    patientTable = searchedListPatient
  } else {
    patientTable = patientList
  }

  const handleTableChange = (pagination, filters, sorter) => {
    fetchData({
      _count: pagination.pageSize || 20,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  const columns = [
    {
      title: <Trans id="PatientNumber" />,
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

  const tableProps = {
    onRow: record => {
      return {
        onClick: () => {
          router.push(`/practitioner/patient/${record.id}`)
        },
      }
    },
    pagination: patientListPagination,
    dataSource: patientTable,
    loading: props.loading.effects['app/queryPatientList'],
  }

  return (
    <Board inner>
      <Row type="flex" justify="space-between" align="bottom">
        <div className={styles.title}>
          <Trans>
            <span className="title uppercase">All </span>
            <span className="uppercase">Patient List</span>
          </Trans>
        </div>
      </Row>

      <Divider className={styles.divider} />

      <CompactTable
        {...tableProps}
        onChange={handleTableChange}
        rowKey={record => record.id}
        columns={columns}
        className={styles.table}
        tableLayout="fixed"
      />
    </Board>
  )
}

PatientList.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner, loading }) => ({
  app,
  practitioner,
  loading,
}))(withI18n()(PatientList))
