import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Table, Spin } from 'antd'
import styles from '../styles.less'

const Consultation = props => {
  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'authoredOn',
      key: 'authoredOn',
    },
    {
      title: <Trans id={'Practitioner'} />,
      dataIndex: 'practitionersName',
      key: 'practitionersName',
    },
    {
      title: <Trans id={'CheckupType'} />,
      dataIndex: 'checkupType',
      key: 'checkupType',
      render: text => <Trans id={text} />,
    },
  ]

  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  const tableProps = {
    dataSource: dataSource,
    columns: columns,
  }

  useEffect(() => {
    setLoadingData(true)
    props
      .dispatch({
        type: 'reception_patientProfile/queryConsultationsHistory',
      })
      .then(values => setDataSource(values))
      .finally(() => setLoadingData(false))
  }, [])

  return (
    <div>
      <Spin spinning={loadingData}>
        <Table
          {...tableProps}
          pagination={false}
          className={styles.diagnoseTable}
        />
      </Spin>
    </div>
  )
}
Consultation.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(Consultation))
