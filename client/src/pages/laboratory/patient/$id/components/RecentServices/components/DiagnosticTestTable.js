import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Table, Row, Col } from 'antd'
import styles from '../styles.less'

const DiagnosticTestTable = props => {
  const [dataSource, setDataSource] = useState([])

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'authoredOn',
      key: 'authoredOn',
    },
    {
      title: <Trans id={'TestName'} />,
      dataIndex: 'display',
      key: 'display',
    },
    {
      title: <Trans id={'Practitioner'} />,
      dataIndex: 'practitionerName',
      key: 'practitionerName',
    },
  ]

  const tableProps = {
    dataSource: dataSource,
    columns: columns,
  }
  useEffect(() => {
    props
      .dispatch({
        type: 'laboratory_patientProfile/queryDiagnosticTests',
      })
      .then(result => setDataSource(result))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Table
      {...tableProps}
      pagination={false}
      className={styles.diagnoseTable}
    />
  )
}

DiagnosticTestTable.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ laboratory_patientProfile, loading }) => ({
  laboratory_patientProfile,
  loading,
}))(withI18n()(DiagnosticTestTable))
