import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { Table, Typography, Divider } from 'antd'
import Download from './Download'
import Link from 'umi/link'
const { Text } = Typography

const List = props => {
  const { i18n, ...tableProps } = props

  const columns = [
    {
      title: <Trans>RegisteredDate</Trans>,
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans id="PatientNames" />,
      dataIndex: 'patientName',
      key: 'patientName',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },

    {
      title: <Trans>BIOCHEMISTRY</Trans>,
      dataIndex: 'BiochemistryTests',
      key: 'BiochemistryTests',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>IMMUNOLOGY</Trans>,
      dataIndex: 'ImmunologyTests',
      key: 'ImmunologyTests',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>RAPID TEST</Trans>,
      dataIndex: 'RapidTests',
      key: 'RapidTests',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>HEMATOLOGY</Trans>,
      dataIndex: 'Hematology',
      key: 'Hematology',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>VITAMIN D3</Trans>,
      dataIndex: 'Vitamin_D3',
      key: 'Vitamin_D3',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>ANTI HDV</Trans>,
      dataIndex: 'Anti_HDV',
      key: 'Anti_HDV',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>HCV_RNA</Trans>,
      dataIndex: 'HCV_RNA',
      key: 'HCV_RNA',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>HBV_DNA</Trans>,
      dataIndex: 'HBV_DNA',
      key: 'HBV_DNA',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>HDV_RNA</Trans>,
      dataIndex: 'HDV_RNA',
      key: 'HDV_RNA',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>COAGULATION</Trans>,
      dataIndex: 'Coagulation',
      key: 'Coagulation',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
    {
      title: <Trans>FERRITIN</Trans>,
      dataIndex: 'Ferritin',
      key: 'Ferritin',
      render: (text, record) => <Link to={`patient/${record.id}`}>{text}</Link>,
    },
  ]

  return (
    <div>
      <Fragment>
        <Text className={styles.title}>
          <Trans>
            <b>Report</b> - RequestList
          </Trans>
        </Text>

        <Divider className={styles.divider} />

        <Table
          pagination={{
            ...tableProps.pagination,
            showTotal: total => <Trans>Total {total} Items</Trans>,
            position: 'bottom',
          }}
          className={styles.table}
          bordered
          columns={columns}
          dataSource={tableProps.dataSource}
          rowKey={record => record.id}
          //  scroll={{ x: 500 }}
        />
      </Fragment>
    </div>
  )
}

List.propTypes = {
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, report, loading }) => ({
  app,
  report,
  loading,
}))(withI18n()(List))
