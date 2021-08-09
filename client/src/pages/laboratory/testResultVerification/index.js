import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import { Board, ConfirmModal, MessageModal } from 'components'
import { Table, Divider, Row, Col, Progress, Checkbox, Menu } from 'antd'
import { delay } from 'utils/helper'
import LabResult from './LabResult'

const columns = [
  {
    title: <Trans id={'PatientNumber'} />,
    dataIndex: 'patientNumber',
    key: 'patientNumber',
  },
  {
    title: <Trans id={'LastName'} />,
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: <Trans id={'FirstName'} />,
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: <Trans id={'NationalIdentificationNumber'} />,
    dataIndex: 'NInum',
    key: 'NInum',
  },
  {
    title: <Trans id={'TestName'} />,
    dataIndex: 'testName',
    key: 'testName',
  },
  {
    title: <Trans id={'SampleAccessionIdentifier'} />,
    dataIndex: 'sampleAccessionIdentifier',
    key: 'sampleAccessionIdentifier',
  },
  {
    title: <Trans id={'SampleCollectionDateTime'} />,
    dataIndex: 'sampleCollectionDateTime',
    key: 'sampleCollectionDateTime',
  },
]
const DEFAULT_PAGE_SIZE = 20

const TestResultVerification = props => {
  const [isSelected, setIsSelected] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const [loadingData, setLoadingData] = useState(false)
  // const [filteredDataSource, setFilteredDataSource] = useState(false)
  const [selectedTestResults, setSelectedTestResults] = useState([])
  const [selectedMenu, setSelectedMenu] = useState('EnteredResults')
  const [buttonLoading, setButtonLoading] = useState()
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [modalLabResultVisible, showModalLabResult] = useState(false)
  const [rowData, setRowData] = useState()
  const [messageModalType, setMessageModalType] = useState()
  const [message, setMessage] = useState('')
  const [modalSendProgressVisible, showSendProgressModal] = useState(false)
  const [sendingProgress, setSendingProgress] = useState('')
  const [progressPercent, setProgressPercent] = useState(0)
  const [tablePagination, setTablePagination] = useState()

  useEffect(() => {
    props.dispatch({
      type: 'laboratory_testResultVerification/init',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.app.FHIR_CODES, selectedMenu])

  const rowSelection = {
    selectedRowKeys: selectedTestResults,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedTestResults(selectedRowKeys)

      if (selectedRowKeys.length > 0) {
        setIsSelected(true)
      } else {
        setIsSelected(false)
      }
    },
    getCheckboxProps: record => ({
      disabled: !record.serviceRequest,
      name: record.key,
    }),
  }

  async function refresh() {
    try {
      await Promise.all([fetchStats(), fetchData({ ...tablePagination })])
      return setSelectedTestResults([])
    } catch (errorInfo) {
      return console.log(errorInfo)
    }
  }

  function fetchStats() {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'laboratory_testResultVerification/queryCount',
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  function fetchData(payload = {}) {
    setLoadingData(true)
    const { _count, _page, sortField, sortOrder, ...filters } = payload

    let type

    if (selectedMenu === 'EnteredResults') {
      type = 'laboratory_testResultVerification/queryResultEntered'
    } else if (selectedMenu === 'VerifiedResults') {
      type = 'laboratory_testResultVerification/queryResultVerified'
    } else if (selectedMenu === 'ResultsToReverify') {
      type = 'laboratory_testResultVerification/queryResultVerificationRequired'
    }

    return props
      .dispatch({
        type: type,
        payload: {
          _count,
          _page,
        },
      })
      .then(result => {
        const { dataSource = [], pagination } = result
        console.log(result)
        setDataSource(dataSource)
        setTablePagination({
          pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
          current: pagination.current,
          total: pagination.total,
        })
      })
      .then(() => setSelectedTestResults([]))
      .catch(errorInfo => {
        console.log(errorInfo)
        setDataSource([])
      })
      .finally(() => {
        setProgressPercent(0)
        setLoadingData(false)
      })
  }

  function onMenuChange(event) {
    const { key } = event

    setSelectedTestResults([])
    setIsSelected(false)
    setSelectedMenu(key)

    // const newDataSource = filter(key, dataSource)
    // setFilteredDataSource(newDataSource)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTablePagination(pagination)

    fetchData({
      _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  /* #region  Verification | Re-Verification */
  async function onVerifyResult() {
    const filteredTestResults = dataSource.filter(data =>
      selectedTestResults.includes(data.key)
    )

    showSendProgressModal(true)

    let sendSuccessful = 0
    let sendFailed = 0

    setSendingProgress(
      <div>
        <div>sent: 0</div>
        <div>failed: 0</div>
        <div>total: {filteredTestResults.length}</div>
      </div>
    )

    for (let labResultIndex in filteredTestResults) {
      const labResult = filteredTestResults[labResultIndex]

      console.log(labResult)
      try {
        const sendResponse = await props.dispatch({
          type: 'laboratory_testResultVerification/verifyTestResult',
          payload: {
            labResult: labResult,
          },
        })
        if (sendResponse && sendResponse.success) {
          sendSuccessful = sendSuccessful + 1
        } else {
          throw new Error(sendResponse)
        }
      } catch (errorInfo) {
        console.log('errorInfo', errorInfo)
        sendFailed = sendFailed + 1
      }

      const percent = Math.round(
        ((parseInt(labResultIndex) + 1) / filteredTestResults.length) * 100
      )

      setProgressPercent(percent)
      setSendingProgress(
        <div>
          <div>sent: {sendSuccessful}</div>
          <div>failed: {sendFailed}</div>
          <div>total: {filteredTestResults.length}</div>
        </div>
      )
    }

    setProgressPercent(100)

    await delay(1000)
    setMessageModalType('success')
    setMessage(<Trans id="Verification process has finished" />)
    showMessageModal(true)

    await delay(1000)
    showSendProgressModal(false)

    refresh()
  }

  function onVerifyResultItem(testResult) {
    setButtonLoading('verifying')

    return props
      .dispatch({
        type: 'laboratory_testResultVerification/verifyTestResult',
        payload: {
          labResult: testResult,
        },
      })
      .then(async () => {
        await delay(150)
        setMessageModalType('success')
        setMessage(<Trans id="Verification process has finished" />)
        showMessageModal(true)
        await delay(150)
        showModalLabResult(false)
        refresh()
      })
      .catch(errorInfo => {
        setMessageModalType('error')
        setMessage(errorInfo.toString())
        showMessageModal(true)
        console.log(errorInfo)
      })
      .finally(() => {
        setButtonLoading()
      })
  }

  async function onReVerifyResult() {
    const filteredTestResults = dataSource.filter(data =>
      selectedTestResults.includes(data.key)
    )

    setButtonLoading('reVerifying')

    return await props
      .dispatch({
        type: 'laboratory_testResultVerification/requestReVerification',
        payload: {
          data: filteredTestResults,
        },
      })
      .then(async () => {
        await delay(150)
        setMessageModalType('success')
        setMessage(<Trans id="Re-Verification request sent" />)
        showMessageModal(true)

        refresh()
      })
      .catch(errorInfo => {
        setMessageModalType('error')
        setMessage(errorInfo.toString())
        showMessageModal(true)
        console.log(errorInfo)
      })
      .finally(() => setButtonLoading())
  }

  function onReVerifyResultItem(testResult) {
    setButtonLoading('reVerifying')

    return props
      .dispatch({
        type: 'laboratory_testResultVerification/requestReVerification',
        payload: {
          data: [testResult],
        },
      })
      .then(async () => {
        await delay(150)
        setMessageModalType('success')
        setMessage(<Trans id="Re-Verification request sent" />)
        showMessageModal(true)

        await delay(150)
        showModalLabResult(false)

        refresh()
      })
      .catch(errorInfo => {
        setMessageModalType('error')
        setMessage(errorInfo.toString())
        showMessageModal(true)
        console.log(errorInfo)
      })
      .finally(() => setButtonLoading())
  }
  /* #endregion */

  function onResultClick(record, rowIndex) {
    showModalLabResult(true)
    setRowData(record)
  }

  const tableProps = {
    columns: columns,
    dataSource: dataSource,
    pagination: tablePagination,
    onChange: handleTableChange,
    rowKey: record => record.key,
    rowSelection: rowSelection,
    rowClassName: (record, index) => {
      if (!record.serviceRequest) {
        return 'button-orange'
      }

      if (index % 2 === 0) {
        return 'bg-gray-4'
      } else {
        return 'bg-gray-5'
      }
    },
    onRow: (record, rowIndex) => {
      if (record.serviceRequest) {
        return {
          onClick: event => onResultClick(record, rowIndex),
        }
      }
    },
    className: styles.table,
    tableLayout: 'fixed',
    loading: loadingData,
  }

  return (
    <Board inner>
      <div
        style={{
          fontSize: '14px',
          marginBottom: '16px',
        }}
      >
        <Trans>
          <span className="title uppercase">Test Result </span>
          <span className="uppercase">Verification</span>
        </Trans>
        <div style={{ height: '1px', background: '#E5E5E9' }} />
      </div>
      <Divider className={styles.divider} />
      <div
        style={{
          border: '1px solid #C9C9C9',
          padding: '6px',
        }}
      >
        <div style={{ display: 'flex' }} className={styles.menu}>
          <Col>
            <Menu
              style={{ width: 256, minHeight: '500px' }}
              defaultSelectedKeys={['EnteredResults']}
              mode="inline"
              onClick={onMenuChange}
            >
              <Menu.Item key="EnteredResults">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Trans id="Entered Results" />
                  </Col>
                  <Col>
                    {
                      props.laboratory_testResultVerification.total[
                        'EnteredResults'
                      ]
                    }
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="ResultsToReverify">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Trans id="Results to re-verify" />
                  </Col>
                  <Col>
                    {
                      props.laboratory_testResultVerification.total[
                        'ResultsToReverify'
                      ]
                    }
                  </Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="VerifiedResults">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Trans id="Verified Results" />
                  </Col>
                  <Col>
                    {
                      props.laboratory_testResultVerification.total[
                        'VerifiedResults'
                      ]
                    }
                  </Col>
                </Row>
              </Menu.Item>
            </Menu>
          </Col>

          <Col style={{ padding: '0 8px' }}>
            <Row type="flex" gutter={[16, 8]} style={{ margin: '8px 0' }}>
              <Col>
                <ConfirmModal
                  {...{
                    showButtonProps: {
                      className: 'button-red uppercase',
                      disabled:
                        !isSelected || selectedMenu === 'VerifiedResults',
                    },
                    title: <Trans id="Are you sure?" />,
                    showButtonText: <Trans id="Verify Results" />,
                    onConfirm: onVerifyResult,
                    loading: buttonLoading === 'verifying',
                  }}
                />
              </Col>
              <Col>
                <ConfirmModal
                  {...{
                    showButtonProps: {
                      className: 'button-dark-gray uppercase',
                      disabled:
                        !isSelected || selectedMenu === 'ResultsToReverify',
                    },
                    title: <Trans id="Are you sure?" />,
                    showButtonText: <Trans id="Results to re-verify" />,
                    onConfirm: onReVerifyResult,
                    loading: buttonLoading === 'reVerifying',
                  }}
                />
              </Col>
              <Col>
                <Divider
                  type="vertical"
                  style={{ background: '#ccc', height: '100%' }}
                />
              </Col>

              <Col
                style={{
                  flexGrow: '1',
                }}
              >
                <Checkbox.Group style={{ width: '100%' }} disabled>
                  <Row>
                    <Col span={8}>
                      <Checkbox>Rapid Tests</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox>ViralLoad Tests</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox>Biochemistry Tests</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Checkbox>Hematology Tests</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox>Immunology Tests</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox>Coagulation Tests</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Col>
            </Row>
            <Table {...tableProps} />
          </Col>
        </div>
      </div>
      <MessageModal
        type={messageModalType}
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={message}
        autoHide={messageModalType === 'error' ? false : true}
      />

      {modalSendProgressVisible && (
        <MessageModal
          type="info"
          visible={modalSendProgressVisible}
          onCancel={() => showSendProgressModal(false)}
          content={
            <div>
              <div className="bold">
                <Trans id="Verification in progress" />
              </div>
              <Trans id="please wait" />
              ...
            </div>
          }
          autoHide={false}
          closable={false}
          maskClosable={false}
        >
          <Row type="flex" justify="center">
            <span style={{ fontSize: '24px' }}>{progressPercent}%</span>
          </Row>
          <div style={{ width: '200px' }}>
            <Progress
              percent={progressPercent}
              status={progressPercent !== 100 && 'active'}
              style={{ width: '100%' }}
              showInfo={false}
            />
          </div>

          <div style={{ textAlign: 'center' }}>{sendingProgress}</div>
        </MessageModal>
      )}

      {modalLabResultVisible && (
        <LabResult
          rowData={rowData}
          testKey={rowData.testKey}
          testCode={rowData.testCode}
          testName={rowData.testName}
          onVerifyResultItem={
            selectedMenu === 'EnteredResults' && onVerifyResultItem
          }
          onReVerifyResultItem={
            selectedMenu === 'EnteredResults' && onReVerifyResultItem
          }
          visible={modalLabResultVisible}
          buttonLoading={buttonLoading}
          onCancel={() => showModalLabResult(false)}
        />
      )}
    </Board>
  )
}

TestResultVerification.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ loading, app, laboratory_testResultVerification }) => ({
    app,
    loading,
    laboratory_testResultVerification,
  })
)(withI18n()(TestResultVerification))
