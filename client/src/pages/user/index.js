import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { Button, Divider, Row, Col, Input } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board, CompactTable, DivInput } from 'components'
import styles from './styles.less'
import UserDrawer from './components/UserDrawer'
import { SettingOutlined } from '@ant-design/icons'

const DEFAULT_PAGE_SIZE = 20

const { Search } = Input

const UserList = props => {
  const [dataSource, setDataSource] = useState([])
  const [userListPagination, setUserListPagination] = useState()
  const [searchTerm, setSearchTerm] = useState()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState()

  const columns = [
    {
      title: <Trans id="UserName" />,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <Trans id="FirstName" />,
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: <Trans id="LastName" />,
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: <Trans id="Email" />,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <Trans id="Action" />,
      key: 'action',
      render: (text, record) => {
        return (
          <Button
            style={{
              background: 'transparent',
              fontSize: '16px',
              border: 'transparent',
            }}
            onClick={() => handleEditClick(record)}
            type="primary"
            // disabled={disabled}
          >
            <SettingOutlined
              style={{
                color: '#555',
              }}
            />
          </Button>
        )
      },
    },
  ]

  const fetchData = (payload = {}) => {
    const { _count, _page, sortField, sortOrder, ...filters } = payload
    return props
      .dispatch({
        type: 'user/queryUsers',
        payload: {
          _count,
          _page,
          searchTerm,
        },
      })
      .then(result => {
        setDataSource(result.dataSource)
        setUserListPagination(result.userListPagination)
      })
      .catch(errorInfo => console.error(errorInfo))
  }

  const handleTableChange = (pagination, filters, sorter) => {
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
    // onRow: record => {
    //   return {
    //     onClick: () => {
    //       router.push(`/user/${record._id}`)
    //     },
    //   }
    // },
    dataSource: dataSource,
    pagination: userListPagination,
    onChange: handleTableChange,
    loading: props.loading.effects['user/queryUsers'],
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    fetchData({
      ...userListPagination,
    })
  }

  const handleEditClick = record => {
    setSelectedRowData(record)
    setDrawerVisible(true)
  }

  const handleNewClick = () => {
    setSelectedRowData()
    setDrawerVisible(true)
  }

  return (
    <Board inner>
      <Row type="flex" justify="space-between" align="bottom">
        <div className={styles.title}>
          <span className="title">
            <Trans id="Users" />
          </span>
        </div>
        <Button className="button-red title" onClick={handleNewClick}>
          <Trans id="AddUser" />
        </Button>
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

      {drawerVisible && (
        <UserDrawer
          title="Basic UserDrawer"
          placement="right"
          closable={false}
          width="60vw"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          selectedRowData={selectedRowData}
        />
      )}
    </Board>
  )
}

UserList.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ user, loading }) => ({
  user,
  loading,
}))(withI18n()(UserList))
