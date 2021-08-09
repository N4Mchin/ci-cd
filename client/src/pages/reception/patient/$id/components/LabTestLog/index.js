import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Col, Table, Result } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import ModalEdit from './ModalEdit'
import ModalSendResult from './ModalSendResult'
import ModalEdited from './ModalEdited'
import PrintTestResult from '../PrintTestResult'
import { MessageModal } from 'components'
import {
  SendOutlined,
  PrinterTwoTone,
  SettingOutlined,
  SettingFilled,
  SettingTwoTone,
} from '@ant-design/icons'

const StatusBox = props => {
  const style = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    margin: 'auto',
    border: '1px solid #555',
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

  const [printDrawerVisible, showPrintDrawer] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(false)
  const [modalEditVisible, showModalEdit] = useState(false)
  const [modalSendResultVisible, showModalSendResult] = useState(false)
  const [modalEditedVisible, showModalEdited] = useState(false)
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [message, setMessage] = useState('')
  const [loadingData, setLoadingData] = useState(false)

  const handleTableChange = (pagination, filters, sorter) => {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'reception_patientProfile/queryLabTestHistory',
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

  const onPrint = rowData => {
    showPrintDrawer(true)
    setSelectedRowData(rowData)
  }

  const onSend = rowData => {
    showModalSendResult(true)
    setSelectedRowData(rowData)
  }

  const onEdited = rowData => {
    showModalEdited(true)
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

  const onEditedComplete = () => {
    showModalEdited(false)
    setMessage(<Trans id="Successfully saved" />)

    setTimeout(() => showMessageModal(true), 150)

    return props.dispatch({
      type: 'reception_patientProfile/queryLabTestHistory',
    })
  }

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'authoredOn',
      key: 'authoredOn',
      width: '50px',
    },
    {
      title: <Trans id={'TestName'} />,
      dataIndex: 'display',
      key: 'display',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'State'} />,
      dataIndex: 'status',
      key: 'status',
      width: 50,
      render: (status, record) => (
        <StatusBox
          status={status}
          hasServiceRequest={true}
          isCancelled={record.isCancelled}
        />
      ),
    },
    {
      title: <Trans id={'Print'} />,
      key: 'print',
      dataIndex: 'print',
      width: '32px',
      render: (text, record) => {
        const disabled = record.isCancelled || record.status !== 'final'
        const style = { color: !disabled ? '#00695C' : '#555' }

        return (
          <Button
            onClick={() => onPrint(record)}
            style={{
              background: 'transparent',
              fontSize: '16px',
              border: 'transparent',
            }}
            disabled={disabled}
          >
            <PrinterTwoTone twoToneColor={style.color} />
          </Button>
        )
      },
    },
    {
      title: <Trans id={'SendResult'} />,
      key: 'sendresult',
      width: '32px',
      render: (text, record) => {
        const disabled = record.isCancelled || record.status !== 'final'
        const style = { color: !disabled ? '#00695C' : '#555' }

        return (
          <Button
            style={{
              background: 'transparent',
              fontSize: '16px',
              border: 'transparent',
            }}
            onClick={() => onSend(record)}
            disabled={disabled}
          >
            <SendOutlined style={style} />
          </Button>
        )
      },
    },
    {
      title: <Trans id="unpaid" />,
      dataIndex: 'unpaid',
      key: 'unpaid',
      width: '32px',
      render: (text, record) => {
        const disabled = record.isCancelled || record.status !== 'registered'
        const style = { color: !disabled ? '#ffffff' : '#555' }
        return (
          <Button
            style={{
              background: 'transparent',
              fontSize: '16px',
              border: 'transparent',
            }}
            onClick={() => onEdited(record)}
            type="primary"
            disabled={disabled}
          >
            <SettingOutlined style={style} />
          </Button>
        )
      },
    },
  ]

  return (
    <div className={styles.labTestLogContainer}>
      <div className={styles.labTestLogTitle}>
        <Trans>
          <span className="title uppercase">Lab Test </span>
          <span className="uppercase">Log</span>
        </Trans>
      </div>

      <Row type="flex">
        <Col>
          <Row type="flex" align="middle" style={{ width: '200px' }}>
            <Col span={4}>
              <StatusBox status="final" />
            </Col>
            <Col span={20}>
              <Trans id={'Verified'} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row type="flex" align="middle" style={{ width: '200px' }}>
            <Col span={4}>
              <StatusBox status="registered" />
            </Col>
            <Col span={20}>
              <Trans id={'Awaited'} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row type="flex" align="middle" style={{ width: '200px' }}>
            <Col span={4}>
              <StatusBox status="preliminary" />
            </Col>
            <Col span={20}>
              <Trans id={'Result Ready'} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row type="flex" align="middle" style={{ width: '200px' }}>
            <Col span={4}>
              <StatusBox isCancelled={true} />
            </Col>
            <Col span={20}>
              <Trans id={'Cancelled'} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row type="flex" align="middle" style={{ width: '200px' }}>
            <Col span={4}>
              <StatusBox status="unpaid" />
            </Col>
            <Col span={20}>
              {' '}
              <Trans id={'unpaid'} />
            </Col>
          </Row>
        </Col>
      </Row>

      <PrintTestResult
        visible={printDrawerVisible}
        onClose={() => showPrintDrawer(false)}
        data={selectedRowData}
      />

      <Table
        dataSource={LabTestLog}
        columns={columns}
        className={styles.labTestLogTable}
        pagination={LabTestLogPagination}
        loading={loadingData}
        onChange={handleTableChange}
        tableLayout="fixed"
      />

      {modalEditVisible && (
        <ModalEdit
          visible={modalEditVisible}
          data={selectedRowData}
          onCancel={() => showModalEdit(false)}
          onSubmit={onEditComplete}
        />
      )}

      {modalSendResultVisible && (
        <ModalSendResult
          visible={modalSendResultVisible}
          data={selectedRowData}
          onCancel={() => showModalSendResult(false)}
        />
      )}

      {modalEditedVisible && (
        <ModalEdited
          visible={modalEditedVisible}
          data={selectedRowData}
          onCancel={() => showModalEdited(false)}
          onSubmit={onEditedComplete}
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
