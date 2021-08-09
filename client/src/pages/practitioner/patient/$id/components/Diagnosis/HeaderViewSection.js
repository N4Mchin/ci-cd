import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Button, Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import styles from './../../styles.less'

const DetailViewSection = props => {
  const { dataSource } = props

  const evidenceDisplay = []
  const evidenceText = []

  dataSource.forEach(evidenceValue => {
    evidenceDisplay.push(evidenceValue.display)
    evidenceText.push(evidenceValue.text)
  })

  return (
    <div>
      <Row className="bold">{evidenceDisplay.join(', ')}</Row>
      <br />
      <Row className="bold">{evidenceText.join(', ')}</Row>
    </div>
  )
}

const columns = [
  {
    title: <Trans id={'Date'} />,
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: <Trans id={'Diagnose'} />,
    dataIndex: 'diagnose',
    key: 'diagnose',
  },
  {
    title: <Trans id="Evidence detail" />,
    dataIndex: 'evidenceDetail',
    key: 'evidenceDetail',
  },
  {
    title: <Trans id={'Note'} />,
    dataIndex: 'clinicalScores',
    key: 'clinicalScores',
  },
]

const HeaderViewSection = props => {
  const { location, practitioner_patient_profile, loading, i18n } = props
  const { lastUpdatedDiagnosis } = practitioner_patient_profile

  const [patientDiagnosisList, setPatientDiagnosisList] = useState()

  async function refresh() {
    return props
      .dispatch({
        type: 'practitioner_patient_profile/queryDiagnosis',
      })
      .then(diagnosisList => {
        if (!!diagnosisList) {
          setPatientDiagnosisList(diagnosisList)
        }
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  const dataSource = []

  patientDiagnosisList &&
    patientDiagnosisList.forEach((listItem, index) =>
      dataSource.push({
        key: String(index + 1),
        date: (
          <div style={{ textAlign: 'center' }}>
            <Row>{listItem.recordedDate}</Row>
            <Row>{listItem.asserter}</Row>
          </div>
        ),
        diagnose: (
          <div style={{ textAlign: 'left' }}>
            <div>
              <Row className="bold">
                {listItem.basicDiagnosis.display}
                {listItem.basicDiagnosis.text &&
                  `(\n${listItem.basicDiagnosis.text})`}
              </Row>
              <br />
              <Row className="bold">
                {listItem.diagnosis && listItem.diagnosis.display}
                <br />
                {listItem.diagnosis && `(\n${listItem.diagnosis.text})`}
              </Row>
            </div>
          </div>
        ),
        evidenceDetail: listItem.evidenceDetail && (
          <DetailViewSection dataSource={listItem.evidenceDetail} />
        ),
        clinicalScores: (
          <div>
            <Row className="bold">{listItem.basicDiagnosisNote}</Row>
            <br />
            <Row className="bold">{listItem.diagnosisNote}</Row>
          </div>
        ),
      })
    )

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedDiagnosis])

  const tableProps = {
    //rowClassName: record => styles[record.status],
    // loading: loading.effects['reception/query'],
    // pagination,
    // onChange(page) {
    //   handleRefresh({
    //     page: page.current,
    //     pageSize: page.pageSize,
    //   })
    // }
  }

  const title = (
    <Trans>
      <span className="uppercase title">Diagnose</span>
    </Trans>
  )

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true}>
        <Table
          columns={columns}
          pagination={false}
          className={styles.diagnoseTable}
          dataSource={dataSource && dataSource}
        />
        <Button type="primary" block style={{ height: '30px' }}>
          <Trans id={'Seemore'} />
        </Button>
      </BorderCollapse>
    </div>
  )
}

HeaderViewSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(HeaderViewSection))
