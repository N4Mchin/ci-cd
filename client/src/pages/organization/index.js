import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { Divider, Row, Col, Input } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board, CompactTable, DivInput } from 'components'
import styles from './styles.less'

const DEFAULT_PAGE_SIZE = 20

const { Search } = Input

const OrganizationList = props => {
  const [dataSource, setDataSource] = useState([])
  const [organizationListPagination, setOrganizationListPagination] = useState()
  const [searchTerm, setSearchTerm] = useState()

  const columns = [
    {
      title: <Trans id="Name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <Trans id="Address" />,
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => {
        // console.log(text, record)
      },
    },
  ]

  const fetchData = (payload = {}) => {
    const { _count, _page, sortField, sortOrder, ...filters } = payload
    return props
      .dispatch({
        type: 'organization/queryOrganization',
        payload: {
          _count,
          _page,
          searchTerm,
        },
      })
      .then(result => {
        setDataSource(result.dataSource)
        setOrganizationListPagination(result.organizationListPagination)
      })
      .catch(errorInfo => console.error(errorInfo))
  }

  console.log(organizationListPagination)

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination)
    fetchData({
      _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tableProps = {
    onRow: record => {
      return {
        onClick: () => {
          router.push(`/organization/${record.id}`)
        },
      }
    },
    dataSource: dataSource,
    pagination: organizationListPagination,
    onChange: handleTableChange,
    loading: props.loading.effects['organization/queryOrganization'],
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    fetchData({
      ...organizationListPagination,
    })
  }

  return (
    <Board inner>
      <Row type="flex" justify="space-between" align="bottom">
        <div className={styles.title}>
          <Trans>
            <span className="title">Organizations</span>
          </Trans>
        </div>
      </Row>

      <Divider className={styles.divider} />

      <Row gutter={16}>
        <Col span={4}>
          <DivInput
            value={
              <div>
                <Trans id="Name" />:
              </div>
            }
            style={{ border: 'none' }}
          />
        </Col>
        <Col span={20}>
          <Search
            style={{
              width: '100%',
            }}
            placeholder="Баркод эсвэл регистрийн дугаар оруулана уу"
            size="default"
            onChange={handleSearchChange}
            onSearch={handleSearch}
            enterButton
          />
        </Col>
      </Row>

      <Divider className={styles.divider} style={{ margin: '16px 0' }} />

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

OrganizationList.propTypes = {
  organization: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ organization, loading }) => ({
  organization,
  loading,
}))(withI18n()(OrganizationList))
