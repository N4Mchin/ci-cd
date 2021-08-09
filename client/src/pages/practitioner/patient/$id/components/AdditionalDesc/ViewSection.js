import React, { useState, useEffect } from 'react'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { CompactTable } from 'components'
import styles from '../../styles.less'

const DEFAULT_PAGE_SIZE = 20

const ViewSection = props => {
  const [descriptions, setDescriptions] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [tablePagination, setTablePagination] = useState()

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'date',
      key: 'date',
      width: '30%',
    },
    {
      title: <Trans id={'Description'} />,
      dataIndex: 'display',
      key: 'display',
    },
  ]

  function fetchFileList(payload = {}) {
    const { _count, _page, _sort, sortField, sortOrder, ...filters } = payload
    setLoadingData(true)
    return props
      .dispatch({
        type: 'practitioner_patient_profile/readProviderCommentReport',
        payload: {
          _count,
          _page,
          _sort: '-_lastUpdated',
        },
      })
      .then(result => {
        setDescriptions(result.dataSource)
        setTablePagination(result.pagination)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  useEffect(() => {
    fetchFileList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTableChange = (pagination, filters, sorter) => {
    setTablePagination(pagination)
    fetchFileList({
      _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  return (
    <div className={styles.analysisTable}>
      <CompactTable
        columns={columns}
        pagination={tablePagination}
        dataSource={descriptions}
        loading={loadingData}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(ViewSection))
