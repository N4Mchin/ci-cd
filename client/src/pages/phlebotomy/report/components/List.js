import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { connect } from 'dva'
import { Typography, Divider } from 'antd'

import { SlimTable } from 'components'

const { Text } = Typography

const List = props => {
  const { loadingData } = props

  const columns = [
    {
      title: <Trans>CollectedDate</Trans>,
      dataIndex: 'collectedDate',
      key: 'collectedDate',
      render: (text, record) => text,
    },
    {
      title: <Trans id="PatientNames" />,
      dataIndex: 'patientName',
      key: 'patientName',
      render: (text, record) => text,
    },

    {
      title: <Trans>BIOCHEMISTRY</Trans>,
      dataIndex: 'BiochemistryTests',
      key: 'BiochemistryTests',
      render: (text, record) => text,
    },
    {
      title: <Trans>IMMUNOLOGY</Trans>,
      dataIndex: 'ImmunologyTests',
      key: 'ImmunologyTests',
      render: (text, record) => text,
    },
    {
      title: <Trans>RAPID TEST</Trans>,
      dataIndex: 'RapidTests',
      key: 'RapidTests',
      render: (text, record) => text,
    },
    {
      title: <Trans>HEMATOLOGY</Trans>,
      dataIndex: 'Hematology',
      key: 'Hematology',
      render: (text, record) => text,
    },
    {
      title: <Trans>VITAMIN D3</Trans>,
      dataIndex: 'Vitamin_D3',
      key: 'Vitamin_D3',
      render: (text, record) => text,
    },
    {
      title: <Trans>ANTI HDV</Trans>,
      dataIndex: 'Anti_HDV',
      key: 'Anti_HDV',
      render: (text, record) => text,
    },
    {
      title: <Trans>HCV_RNA</Trans>,
      dataIndex: 'HCV_RNA',
      key: 'HCV_RNA',
      render: (text, record) => text,
    },
    {
      title: <Trans>HBV_DNA</Trans>,
      dataIndex: 'HBV_DNA',
      key: 'HBV_DNA',
      render: (text, record) => text,
    },
    {
      title: <Trans>HDV_RNA</Trans>,
      dataIndex: 'HDV_RNA',
      key: 'HDV_RNA',
      render: (text, record) => text,
    },
    {
      title: <Trans>COAGULATION</Trans>,
      dataIndex: 'Coagulation',
      key: 'Coagulation',
      render: (text, record) => text,
    },
    {
      title: <Trans>FERRITIN</Trans>,
      dataIndex: 'Ferritin',
      key: 'Ferritin',
      render: (text, record) => text,
    },
  ]

  return (
    <Fragment>
      <Text style={{ fontSize: '15px' }}>
        <Trans>
          <b>Report</b> - FirstSampleList
        </Trans>
      </Text>
      <Divider className={styles.divider} />
      <SlimTable
        onChange={props.onChange}
        bordered
        columns={columns}
        loading={loadingData}
        pagination={props.pagination}
        rowKey={record => record.id}
        dataSource={props.dataSource}
      />{' '}
    </Fragment>
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
