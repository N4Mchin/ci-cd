import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Col, Table, Result, Tag } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import ModalConfirm from './ModalConfirm'
import { STATUS } from 'utils/constant'
import { MessageModal, ConfirmModal } from 'components'
import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'

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

  const [selectedRowData, setSelectedRowData] = useState(false)
  const [modalConfirmVisible, showModalConfirm] = useState(false)

  const [modalMessageVisible, showMessageModal] = useState(false)
  const [message, setMessage] = useState('')
  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const handleTableChange = (pagination, filters, sorter) => {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'reception_patientProfile/queryPendingOrders',
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

  const onShowConfirm = rowData => {
    showModalConfirm(true)
    setSelectedRowData(rowData)
  }

  const onDelete = rowData => {
    // delete
    return props.props.dispatch({
      type: 'reception_patientProfile/confirmServiceRequest',
      payload: {
        serviceRequestInfo: rowData,
        status: STATUS.EXTERNAL_SPECIMEN_LOG.CANCELLED,
      },
    })
  }

  const onConfirmOrder = () => {
    showModalConfirm(false)
    setMessage(<Trans id="Successfully saved" />)

    setTimeout(() => showMessageModal(true), 150)

    fetchData()
  }

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'Date',
      key: 'Date',
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
      title: <Trans id="Confirm Payment" />,
      dataIndex: 'confirmPayment',
      key: 'confirmPayment',
      width: 50,
      render: (text, record) => {
        return (
          <Button
            style={{
              background: 'transparent',
              fontSize: '16px',
              border: 'transparent',
            }}
            onClick={() => onShowConfirm(record)}
            type="primary"
          >
            <CheckCircleOutlined style={{ color: '#555' }} />
          </Button>
        )
      },
    },
    {
      title: <Trans id="Delete" />,
      key: 'delete',
      width: 50,
      render: (text, record) => {
        return (
          <ConfirmModal
            {...{
              showButtonProps: {
                className: 'button-red uppercase',
                style: {
                  background: 'transparent',
                  fontSize: '16px',
                  border: 'transparent',
                },
                // disabled: !formComplete,
              },
              title: <Trans id="Are you sure?" />,
              showButtonText: (
                <span>
                  &nbsp;&nbsp;
                  <DeleteOutlined style={{ color: '#555' }} />
                </span>
              ),
              onConfirm: onDelete,
              // loading: submitLoading,
            }}
          />
        )
      },
    },
  ]

  const fetchData = (pagination = {}) => {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'reception_patientProfile/queryPendingOrders',
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

  return (
    <div className={styles.labTestLogContainer}>
      <div className={styles.labTestLogTitle}>
        <Trans>
          <span className="title uppercase">External Order </span>
          <span className="uppercase">Confirmation</span>
        </Trans>
      </div>

      <Row type="flex">
        <Col>
          <Row type="flex" align="middle" style={{ width: '200px' }}>
            <Col span={4}>
              <StatusBox status="unpaid" />
            </Col>
            <Col span={20}>
              <Trans id={'unpaid'} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Table
        dataSource={dataSource}
        columns={columns}
        className={styles.labTestLogTable}
        pagination={LabTestLogPagination}
        loading={loadingData}
        onChange={handleTableChange}
      />

      {modalConfirmVisible && (
        <ModalConfirm
          visible={modalConfirmVisible}
          data={selectedRowData}
          onCancel={() => showModalConfirm(false)}
          onSubmit={onConfirmOrder}
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
