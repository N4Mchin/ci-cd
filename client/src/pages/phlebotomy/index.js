import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'

import { Board } from 'components'

import { Button, Icon, Row, Col, Table, Divider } from 'antd'

const DEFAULT_PAGE_SIZE = 20

const Phlebotomy = props => {
  const { phlebotomy, loading } = props
  const {
    serviceRequestListPagination,
    selectedRowKeys,
    dataSource,
  } = phlebotomy

  function fetchData(payload = {}) {
    const { _count, _page, sortField, sortOrder, ...filters } = payload

    return props
      .dispatch({
        type: 'phlebotomy/query',
        payload: {
          _count,
          _page,
        },
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.app.FHIR_CODES])

  const handleTableChange = (pagination, filters, sorter) => {
    fetchData({
      _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  const tableProps = {
    className: styles['phlebotomyTable'],
    rowClassName: record => {
      if (
        record.completedPhlebotomy > 0 &&
        record.totalPhlebotomy !== record.completedPhlebotomy
      ) {
        return styles['incomplete']
      } else if (
        record.remainingPhlebotomy === 0 &&
        record.totalPhlebotomy === record.completedPhlebotomy
      ) {
        return styles['completed']
      }
      return styles['active']
    },
    dataSource: dataSource,
    onChange: handleTableChange,
    onRow: (record, rowIndex) => {
      return {
        onClick: event => {
          router.push({
            pathname: `/phlebotomy/serviceRequestList/${record.id}`,
          })
        },
      }
    },
    loading: loading.effects['phlebotomy/query'],
    pagination: {
      ...serviceRequestListPagination,
      showTotal: total => <Trans>Total {total}</Trans>,
    },
  }

  const columns = [
    {
      title: <Trans id="RegisteredDate" />,
      dataIndex: 'date',
      key: 'date',
    },
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
    // {
    //   title: <Trans id="SampleDate" />,
    //   dataIndex: 'sampleDate',
    //   key: 'sampleDate',
    // },
  ]

  return (
    <Board inner>
      {selectedRowKeys.length > 0 && (
        <Row className={styles.listRow}>
          <Col>{`Selected ${selectedRowKeys.length} items `}</Col>
        </Row>
      )}

      <Row
        type="flex"
        justify="end"
        align="middle"
        style={{ marginBottom: '16px' }}
        gutter={16}
      >
        <Col>
          <Row type="flex">
            <div
              className={styles.active}
              style={{
                height: '16px',
                width: '16px',
                borderRadius: '16px',
                border: '1px solid #eaeaea',
              }}
            ></div>
            &nbsp;
            <Trans id="PhlebotomyStatusActive" />
          </Row>
        </Col>
        <Col>
          <Row type="flex">
            <div
              className={styles.incomplete}
              style={{
                height: '16px',
                width: '16px',
                borderRadius: '16px',
              }}
            ></div>
            &nbsp;
            <Trans id="PhlebotomyStatusIncomplete" />
          </Row>
        </Col>
        <Col>
          <Row type="flex">
            <div
              className={styles.completed}
              style={{
                height: '16px',
                width: '16px',
                borderRadius: '16px',
              }}
            ></div>
            &nbsp;
            <Trans id="PhlebotomyStatusCompleted" />
          </Row>
        </Col>
        <Col>
          <Divider
            type="vertical"
            style={{ backgroundColor: '#aaa', height: '32px' }}
          />
        </Col>
        <Col>
          <Button onClick={fetchData}>
            <Icon
              type="reload"
              style={{ fontSize: '16px' }}
              className="refreshIcon"
            />
          </Button>
        </Col>
      </Row>
      <Table columns={columns} {...tableProps} />
    </Board>
  )
}

Phlebotomy.propTypes = {
  app: PropTypes.object,
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ phlebotomy, loading, app }) => ({
  app,
  phlebotomy,
  loading,
}))(withI18n()(Phlebotomy))
