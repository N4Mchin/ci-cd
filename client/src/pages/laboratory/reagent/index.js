import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'
import { Board, CompactTable, MessageModal } from 'components'
import { Button, Divider, Row, Col, Menu } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { ModalReagentAdd } from './components'

const DEFAULT_PAGE_SIZE = 20

const ReagentRegistry = props => {
  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState([])
  const [tablePagination, setTablePagination] = useState()
  const [total, setTotal] = useState()
  const [selectedTestName, setSelectedTestName] = useState([])
  const [selectedMenu, setSelectedMenu] = useState()
  const [labTests, setLabTestsTests] = useState()
  const [modalReagentAddVisible, showModalReagentAdd] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [buttonLoading, setButtonLoading] = useState()

  const [modalMessageVisible, showMessageModal] = useState(false)
  const [message, setMessage] = useState('')

  const onMenuChange = async event => {
    const { key } = event
    setSelectedTestName([])
    setIsSelected(false)
    setSelectedMenu(key)
  }

  const handleReagendAdd = () => {
    showModalReagentAdd(!modalReagentAddVisible)
  }

  const rowSelection = {
    selectedRowKeys: selectedTestName,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedTestName(selectedRowKeys)

      if (selectedRowKeys.length > 0) {
        setIsSelected(true)
      } else {
        setIsSelected(false)
      }
    },
  }

  useEffect(() => {
    const { app } = props
    const { FHIR_CODES } = app
    if (FHIR_CODES) {
      const {
        UncategorizedTests,
        ImmunologyTests,
        BiochemistryTests,
      } = FHIR_CODES

      const { RapidTests, ViralLoadTests, OtherTests = {} } = UncategorizedTests

      const {
        Vitamin_D3,
        Ferritin,
        Anti_HDV,
        Hematology,
        Coagulation,
      } = OtherTests.include

      const TESTS = {
        Anti_HDV,
        BiochemistryTests,
        ImmunologyTests,
        RapidTests,
        ViralLoadTests,
        Vitamin_D3,
        Ferritin,
        Hematology,
        Coagulation,
      }
      setLabTestsTests(TESTS)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.app.FHIR_CODES])

  useEffect(() => {
    if (labTests) {
      setSelectedMenu(Object.keys(labTests)[0])
    }
  }, [labTests])

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenu])

  function fetchData(payload = {}) {
    const { _count, _page, sortField, sortOrder, ...filters } = payload

    setLoadingData(true)
    return props
      .dispatch({
        type: 'laboratory_reagent/readReagent',
        payload: {
          testName: selectedMenu,
          // _count,
          // _page,
        },
      })
      .then(results => {
        setDataSource(results)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  const refresh = async () => {
    try {
      await Promise.all([fetchStats(), fetchData({ ...tablePagination })])
      return setSelectedTestName([])
    } catch (errorInfo) {
      return console.log(errorInfo)
    }
  }

  function fetchStats() {
    setLoadingData(true)
    return props
      .dispatch({
        type: 'laboratory_reagent/queryReagentTotal',
      })
      .then(results => {
        setTotal(results)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingData(false))
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTablePagination(pagination)
    fetchData({
      testName: selectedMenu,
      // _count: pagination.pageSize || DEFAULT_PAGE_SIZE,
      // _page: pagination.current,
      // sortField: sorter && sorter.field,
      // sortOrder: sorter && sorter.order,
      // ...filters,
    })
  }

  const onSubmitReagentAdd = () => {
    setMessage(<Trans id="Save Successful" />)
    setTimeout(() => showMessageModal(true), 150)

    showModalReagentAdd(false)

    refresh()
  }

  const columns = [
    {
      title: <Trans id="Урвалжийн баркод" />,
      dataIndex: 'reagentBarcode',
      key: 'reagentBarcode',
    },
    {
      title: <Trans id="ЛОТ дугаар" />,
      dataIndex: 'reagentLotNumber',
      key: 'reagentLotNumber',
    },
    {
      title: <Trans id="Урвалжийн төрөл" />,
      dataIndex: 'reagentType',
      key: 'reagentType',
    },
    {
      title: <Trans id="Дуусах огноо" />,
      dataIndex: 'reagentExpirationDate',
      key: 'reagentExpirationDate',
    },
    {
      title: <Trans id="Тоо ширхэг" />,
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: <Trans id="Бүртгэсэн огноо" />,
      dataIndex: 'registeredDate',
      key: 'registeredDate',
    },
  ]

  const tableProps = {
    columns: columns,
    rowSelection: rowSelection,
    dataSource: dataSource,
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
          <span className="title uppercase">Reagent </span>
          <span className="uppercase">Registry</span>
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
            {selectedMenu && (
              <Menu
                style={{ width: 256, minHeight: '500px' }}
                defaultSelectedKeys={selectedMenu}
                defaultOpenKeys={selectedMenu}
                onClick={onMenuChange}
                mode="inline"
              >
                {labTests &&
                  Object.keys(labTests).map(test => {
                    return (
                      <Menu.Item key={test}>
                        <Row type="flex" justify="space-between">
                          <Col>{labTests[test].display}</Col>
                          <Col>{total && total[test]}</Col>
                        </Row>
                      </Menu.Item>
                    )
                  })}
              </Menu>
            )}
          </div>

          <div style={{ padding: '4px 8px', flexGrow: '1' }}>
            <Row
              type="flex"
              // justify="end"
              style={{ margin: '16px 0' }}
            >
              <Button className="button-red" onClick={handleReagendAdd}>
                <PlusCircleOutlined />
                <span className="title">
                  <Trans id="Add reagent" />
                </span>
              </Button>
            </Row>
            <CompactTable {...tableProps} />
          </div>
        </div>
      </div>
      {modalReagentAddVisible && (
        <ModalReagentAdd
          visible={modalReagentAddVisible}
          onCancel={() => showModalReagentAdd(false)}
          testName={selectedMenu}
          onSubmit={onSubmitReagentAdd}
        />
      )}
      <MessageModal
        type="success"
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={message}
      />
    </Board>
  )
}

ReagentRegistry.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_reagent, loading }) => ({
  app,
  laboratory_reagent,
  loading,
}))(withI18n()(ReagentRegistry))
