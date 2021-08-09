import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import { Board, CompactTable, MessageModal } from 'components'
import { Divider, Row, Col, Menu, Button } from 'antd'
import Confirm from './Confirm'

const { SubMenu } = Menu

const DEFAULT_PAGE_SIZE = 20

const SpecimenCondition = props => {
  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState([])
  const [tablePagination, setTablePagination] = useState()
  const [total, setTotal] = useState({})
  const [selectedSpecimens, setSelectedSpecimens] = useState([])
  const [selectedMenu, setSelectedMenu] = useState('SampleNew')
  const [modalSuccessVisible, showSuccessModal] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [buttonLoading, setButtonLoading] = useState()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenu])

  const rowSelection = {
    selectedRowKeys: selectedSpecimens,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedSpecimens(selectedRowKeys)

      if (selectedRowKeys.length > 0) {
        setIsSelected(true)
      } else {
        setIsSelected(false)
      }
    },
  }

  function fetchStats() {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'specimenCondition/queryStatistics',
      })
      .then(result => setTotal(result))
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  function fetchData(payload = {}) {
    const { _count, _page, sortField, sortOrder, ...filters } = payload

    setLoadingData(true)
    return props
      .dispatch({
        type: 'specimenCondition/querySpecimens',
        payload: {
          sampleType: selectedMenu,
          _count,
          _page,
        },
      })
      .then(result => {
        const { dataSource, pagination } = result
        setDataSource(dataSource)
        setTablePagination({
          pageSize: pagination.pageSize || DEFAULT_PAGE_SIZE,
          current: pagination.current,
          total: pagination.total,
        })
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  const refresh = async () => {
    try {
      await Promise.all([fetchStats(), fetchData({ ...tablePagination })])
      return setSelectedSpecimens([])
    } catch (errorInfo) {
      return console.log(errorInfo)
    }
  }

  async function onSampleNormalClick() {
    // dataSource.key -> specimenId
    const filteredSpecimens = dataSource.filter(data =>
      selectedSpecimens.includes(data.key)
    )

    setButtonLoading('SampleNormal')

    return await props
      .dispatch({
        type: 'specimenCondition/saveNormalSamples',
        payload: {
          data: filteredSpecimens,
        },
      })
      .then(() => {
        setButtonLoading()
        showSuccessModal(true)
        refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  async function onSampleUnsatisfactoryClick(specimenConditionKey) {
    // dataSource.key -> specimenId
    const filteredSpecimens = dataSource.filter(data =>
      selectedSpecimens.includes(data.key)
    )

    setButtonLoading(specimenConditionKey)

    return await props
      .dispatch({
        type: 'specimenCondition/saveUnsatisfactorySamples',
        payload: {
          data: filteredSpecimens,
          specimenConditionKey,
        },
      })
      .then(() => {
        setButtonLoading()
        showSuccessModal(true)
        refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  const onMenuChange = async event => {
    const { key } = event

    setSelectedSpecimens([])
    setIsSelected(false)
    setSelectedMenu(key)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTablePagination(pagination)

    fetchData({
      sampleType: selectedMenu,
      _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  const UnsatisfactorySamplesMenu = (
    <Row type="flex" gutter={8}>
      {Object.keys(props.specimenCondition.UnsatisfactorySamples).map(
        specimenConditionKey => (
          <Col>
            <Confirm
              {...{
                showButtonProps: {
                  className: 'button-dark-gray',
                  disabled:
                    !isSelected || selectedMenu === specimenConditionKey,
                },
                title: <Trans id="Are you sure?" />,
                showButtonText: <Trans id={specimenConditionKey} />,
                onConfirm: () =>
                  onSampleUnsatisfactoryClick(specimenConditionKey),
                loading: buttonLoading === specimenConditionKey,
              }}
            />
          </Col>
        )
      )}
    </Row>
  )

  const columns = [
    {
      title: <Trans id="SampleCollectionDate" />,
      dataIndex: 'sampleCollectionDateTime',
      key: 'sampleCollectionDateTime',
    },
    {
      title: <Trans id="Barcode" />,
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: <Trans id="TestName" />,
      dataIndex: 'testName',
      key: 'testName',
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
    {
      title: <Trans id="SpecimenCondition" />,
      dataIndex: 'specimenCondition',
      key: 'specimenCondition',
      render: text => <Trans id={text} />,
    },
    // {
    //   title: <Trans id="Description" />,
    //   dataIndex: 'Description',
    //   key: 'Description',
    // },
  ]

  const tableProps = {
    columns: columns,
    dataSource: dataSource,
    rowSelection: rowSelection,
    className: styles.table,
    pagination: tablePagination,
    loading: loadingData,
    onChange: handleTableChange,
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
          <span className="title uppercase">Specimen </span>
          <span className="uppercase">Condition</span>
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
          <div>
            <Menu
              style={{ width: 256, minHeight: '500px' }}
              defaultSelectedKeys={['SampleNew']}
              defaultOpenKeys={['SampleNew']}
              onClick={onMenuChange}
              mode="inline"
            >
              <Menu.Item key="SampleNew">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Trans id="SampleNew" />
                  </Col>
                  <Col>{total.SampleNew}</Col>
                </Row>
              </Menu.Item>
              <Menu.Item key="SampleNormal">
                <Row type="flex" justify="space-between">
                  <Col>
                    <Trans id="SampleNormal" />
                  </Col>
                  <Col>{total.SampleNormal}</Col>
                </Row>
              </Menu.Item>
              <SubMenu
                key="sub4"
                title={
                  <Row type="flex" justify="space-between">
                    <Col>
                      <Trans id="UnsatisfactorySample" />
                    </Col>
                    <Col>{total.SampleUnsatisfactory}</Col>
                  </Row>
                }
              >
                {Object.keys(props.specimenCondition.UnsatisfactorySamples).map(
                  specimenConditionKey => (
                    <Menu.Item key={specimenConditionKey}>
                      <Row type="flex" justify="space-between">
                        <Col>
                          <Trans id={specimenConditionKey} />
                        </Col>
                        <Col>{total[specimenConditionKey]}</Col>
                      </Row>
                    </Menu.Item>
                  )
                )}
              </SubMenu>
            </Menu>
          </div>
          <div style={{ padding: '4px 8px', flexGrow: '1' }}>
            <Row type="flex" gutter={10} style={{ marginBottom: '8px' }}>
              <Col>
                <Confirm
                  {...{
                    showButtonProps: {
                      className: 'button-red uppercase',
                      disabled: !isSelected || selectedMenu === 'SampleNormal',
                    },
                    title: <Trans id="Are you sure?" />,
                    showButtonText: <Trans id="SampleNormal" />,
                    onConfirm: onSampleNormalClick,
                    loading: buttonLoading === 'SampleNormal',
                  }}
                />
              </Col>
              <Divider
                type="vertical"
                style={{ height: '32px', background: 'red' }}
              />
              <Col>{UnsatisfactorySamplesMenu}</Col>{' '}
            </Row>
            <CompactTable {...tableProps} />
          </div>
        </div>
      </div>
      <MessageModal
        visible={modalSuccessVisible}
        onCancel={() => showSuccessModal(false)}
        type="success"
        content={<Trans id="Save Successful" />}
      />
    </Board>
  )
}

SpecimenCondition.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, specimenCondition, loading }) => ({
  app,
  specimenCondition,
  loading,
}))(withI18n()(SpecimenCondition))
