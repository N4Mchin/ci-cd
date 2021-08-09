import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { router } from 'utils'
import { Board, CompactTable } from 'components'
import { Divider, Row, Col, Button, Tabs } from 'antd'

const { TabPane } = Tabs

const PatientList = props => {
  const [selectedTab, setSelectedTab] = useState('PreScreeningAndScreening')
  const [dataSource, setDataSource] = useState([])
  const { user } = props.app
  const [patientListPagination, setPatientListPagination] = useState()

  function fetchData(payload = {}) {
    const { type, _count, _page, sortField, sortOrder, ...filters } = payload

    return (
      props
        .dispatch({
          type: 'app/queryDlivrPatientList',
          payload: {
            type,
            _count,
            _page,
          },
        })
        .then(result => {
          setPatientListPagination(result.patientListPagination)
          setDataSource(result.dataSource)
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
    )
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.app.FHIR_CODES])

  useEffect(() => {
    fetchData(selectedTab)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab])

  const handleTableChange = (pagination, filters, sorter) => {
    fetchData({
      _count: pagination.pageSize || 20,
      _page: pagination.current,
      sortField: sorter && sorter.field,
      sortOrder: sorter && sorter.order,
      ...filters,
    })
  }

  const columns = [
    {
      title: <Trans id="PatientNumber" />,
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
    {
      title: <Trans id="D-LIVR ID" />,
      dataIndex: 'dlivrIdentificationNumber',
      key: 'dlivrIdentificationNumber',
    },
    {
      title: <Trans id="D-LIVR Status" />,
      dataIndex: 'dlivrStatus',
      key: 'dlivrStatus',
      render: text => {
        if (text === 'dlivrScreening') {
          return 'Screening'
        } else if (text === 'dlivrPreScreening') {
          return 'Pre-screening'
        }
      },
    },
  ]

  const onTabChange = tabkey => {
    setSelectedTab(tabkey)
  }

  const tableProps = {
    onRow: record => {
      return {
        onClick: () => {
          router.push(`/practitioner/patient/${record.id}`)
        },
      }
    },
    pagination: patientListPagination,
    dataSource: dataSource,
    loading: props.loading.effects['app/queryDlivrPatientList'],
  }

  const onInitiateDlivr = () => {
    return props.dispatch({
      type: 'practitioner_dlivr/initiateDlivrClinicalTrial',
      paylaod: {},
    })
  }

  return (
    <Board inner>
      <Row type="flex" justify="space-between" align="bottom">
        <Col>
          <Trans>
            <span className="title uppercase">D-LIVR Customers </span>
            <span className="uppercase">Queue</span>
          </Trans>
        </Col>

        {/* {!props.app.dlivrGroupsCreated &&
          user.permission.scope.includes('practitioner') && (
            <Col>
              <Button onClick={onInitiateDlivr}>
                D-LIVR судалгаа эхлүүлэх
              </Button>
            </Col>
          )} */}
      </Row>

      <Divider />

      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="Pre-screening / Screening" key="PreScreeningAndScreening">
          <CompactTable
            {...tableProps}
            onChange={handleTableChange}
            rowKey={record => record.id}
            columns={columns}
            tableLayout="fixed"
          />
        </TabPane>
        <TabPane tab="Treatment" key="Treatment">
          <CompactTable
            // {...tableProps}
            onChange={handleTableChange}
            rowKey={record => record.id}
            columns={columns}
            tableLayout="fixed"
          />
        </TabPane>
        <TabPane tab="Post-treatment" key="PostTreatment">
          <CompactTable
            // {...tableProps}
            onChange={handleTableChange}
            rowKey={record => record.id}
            columns={columns}
            tableLayout="fixed"
          />
        </TabPane>
      </Tabs>
    </Board>
  )
}

PatientList.propTypes = {
  practitioner_dlivr: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_dlivr, loading }) => ({
  app,
  practitioner_dlivr,
  loading,
}))(withI18n()(PatientList))
