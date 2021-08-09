import React, { useState, useEffect } from 'react'
import { Trans, withI18n } from '@lingui/react'
import { Button, Tabs, Icon, Input, Row, Col } from 'antd'
import { CompactTable } from 'components'
import { connect } from 'dva'
import { toLocalDateTime } from 'utils/datetime'

const { TabPane } = Tabs
const { Search } = Input

const defaultColumns = [
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
    render: text => toLocalDateTime(text),
  },
]

const TestTab = props => {
  const [columns, setColumns] = useState(defaultColumns)

  useEffect(() => {
    if (props.addOnColumns && props.addOnColumns.length > 0) {
      setColumns([...defaultColumns, ...props.addOnColumns])
    }
  }, [props.addOnColumns])

  const operations = [
    <Row type="flex" gutter={8}>
      <Col>
        <Search
          // className={styles.searchField}
          // placeholder={i18n.t`SearchIDorBarcode`}
          onSearch={props.onSearch}
          maxLength={13}
          // // value={this.state.searchBarValue}
          allowClear
          // disabled={
          //   this.props.app.locationPathname === '/phlebotomy' ||
          //   this.props.app.locationPathname === '/laboratory/patient' ||
          //   this.props.app.locationPathname === '/reception'
          //     ? false
          //     : true
          // }
          // enterButton
        />
      </Col>
      <Col>
        <Button onClick={props.onRefresh}>
          <Icon
            type="reload"
            style={{ fontSize: '16px' }}
            className="refreshIcon"
          />
        </Button>
      </Col>
    </Row>,
  ]

  const handleTabChange = tabKey => {
    props.handleTabChange(tabKey)
  }

  return (
    <div>
      <Tabs
        defaultActiveKey={props.defaultSelected}
        activeKey={props.selectedTab}
        tabBarExtraContent={operations}
        size="large"
        style={{ padding: '0' }}
        onChange={handleTabChange}
      >
        <TabPane
          tab={
            <span>
              <Icon type="clock-circle" />
              <Trans id="Awaited" />
            </span>
          }
          key="Awaited"
          style={{ padding: '0' }}
        >
          <CompactTable
            {...props.tableProps}
            columns={columns}
            dataSource={props.dataSource}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="search" />
              <Trans id="In inspection" />
            </span>
          }
          key="InInspection"
        >
          <CompactTable
            {...props.tableProps}
            columns={columns}
            dataSource={props.dataSource}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="safety-certificate" />
              <Trans id="Verified" />
            </span>
          }
          key="Verified"
        >
          <CompactTable
            {...props.tableProps}
            columns={columns}
            dataSource={props.dataSource}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="sync" />
              <Trans id="Correction" />
            </span>
          }
          key="Correction"
        >
          <CompactTable
            {...props.tableProps}
            columns={columns}
            dataSource={props.dataSource}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default connect(({ laboratory_test, loading }) => ({
  laboratory_test,
  loading,
}))(withI18n()(TestTab))
