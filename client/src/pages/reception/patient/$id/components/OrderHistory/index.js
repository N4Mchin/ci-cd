import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Col, Table, Result, Tag } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import ModalEdit from './ModalEdit'
import { STATUS } from 'utils/constant'
import { MessageModal } from 'components'
import { SettingOutlined } from '@ant-design/icons'

const StatusBox = props => {
  const style = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    margin: 'auto',
    border: '1px solid grey',
  }

  let className
  switch (props.status) {
    case 'registered':
      className = 'test-result-red'
      break
    case 'preliminary':
      className = 'test-result-orange'
      break
    case 'final':
      className = 'test-result-green'
      break
    case 'unpaid':
      className = 'test-result-white'
      break
    default:
      break
  }

  if (props.isCancelled) {
    className = 'test-result-gray'
  }

  return <div className={className} style={style}></div>
}

const DEFAULT_PAGE_SIZE = 20

const LabTestLog = props => {
  const { LabTestLog, LabTestLogPagination } = props.reception_patientProfile
  const { id } = props.reception_patientProfile.patient

  const [selectedRowData, setSelectedRowData] = useState()
  const [modalEditVisible, showModalEdit] = useState(false)

  const [modalMessageVisible, showMessageModal] = useState(false)
  const [message, setMessage] = useState('')
  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'date',
      key: 'date',
      width: '50px',
    },
    {
      title: <Trans id={'ServiceType'} />,
      dataIndex: 'filterItem',
      key: 'filterItem',
      render: filterItem => (
        <>
          {filterItem.serviceType.map(item => {
            return <Tag>{<Trans id={item} />}</Tag>
          })}
        </>
      ),
    },
    {
      title: <Trans id={'State'} />,
      dataIndex: 'status',
      key: 'status',
      width: 50,
      render: text => (
        <StatusBox
          status={
            text !== STATUS.EXTERNAL_SPECIMEN_LOG.PENDING ? 'final' : 'pending'
          }
        />
      ),
    },
    {
      title: <Trans id={'Ordered'} />,
      dataIndex: 'user',
      key: 'user',
      width: 50,
      render: user => <span>{user && user.name}</span>,
    },
    {
      title: <Trans id="Edit" />,
      dataIndex: 'edit',
      key: 'edit',
      width: '32px',
      render: (text, record) => {
        const disabled = record.isCancelled
        const style = { color: !disabled ? '#00695C' : '#555' }
        return (
          <Button
            style={{
              background: 'transparent',
              fontSize: '16px',
              border: 'transparent',
            }}
            onClick={() => onEdit(record)}
            type="primary"
            disabled={disabled}
          >
            <SettingOutlined style={style} />
          </Button>
        )
      },
    },
  ]

  const fetchData = (pagination = {}) => {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'reception_patientProfile/queryConfirmedOrders',
        payload: { patientId: id },
      })
      .then(result => {
        setDataSource(result)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoadingData(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [props.reception_patientProfile.updatedAt])

  const handleTableChange = (pagination, filters, sorter) => {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'reception_patientProfile/queryConfirmedOrders',
        payload: {
          _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
          _page: pagination.current,
        },
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoadingData(false)
      })
  }

  const onEdit = rowData => {
    showModalEdit(true)
    setSelectedRowData(rowData)
  }

  const onEditComplete = () => {
    showModalEdit(false)
    setMessage(<Trans id="Successfully saved" />)

    setTimeout(() => showMessageModal(true), 150)

    return props.dispatch({
      type: 'reception_patientProfile/queryLabTestHistory',
    })
  }

  return (
    <div className={styles.labTestLogContainer}>
      <div className={styles.labTestLogTitle}>
        <Trans>
          <span className="title uppercase">Order </span>
          <span className="uppercase">History</span>
        </Trans>
      </div>

      <Table
        dataSource={dataSource}
        columns={columns}
        className={styles.labTestLogTable}
        pagination={LabTestLogPagination}
        loading={loadingData}
        onChange={handleTableChange}
      />

      {modalEditVisible && (
        <ModalEdit
          visible={modalEditVisible}
          data={selectedRowData}
          onCancel={() => showModalEdit(false)}
          onSubmit={onEditComplete}
        />
      )}

      <MessageModal
        type="success"
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={message}
      />
    </div>
  )
}

LabTestLog.propTypes = {
  reception_patientProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(LabTestLog))
