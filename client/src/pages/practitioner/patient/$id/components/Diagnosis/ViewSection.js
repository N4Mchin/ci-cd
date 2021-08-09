import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Button, Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
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

const ViewSection = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedDiagnosis } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState(false)

  const columns = [
    {
      title: i18n.t`Date`,
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: i18n.t`Diagnose`,
      dataIndex: 'diagnose',
      key: 'diagnose',
    },
    {
      title: i18n.t`Evidence detail`,
      dataIndex: 'evidenceDetail',
      key: 'evidenceDetail',
    },
    {
      title: i18n.t`Note`,
      dataIndex: 'note',
      key: 'note',
    },
  ]

   function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryDiagnosis',
        })
        .then(diagnosisList => {
          if (!!diagnosisList) {
            const dataSource = []
            
            diagnosisList.forEach((diagnosisListItem, index) =>
                dataSource.push({
                  key: String(index + 1),
                  date: (
                    <div style={{ textAlign: 'center' }}>
                      <Row>{diagnosisListItem.recordedDate}</Row>
                      <Row>{diagnosisListItem.asserter}</Row>
                    </div>
                  ),
                  diagnose: diagnosisListItem.basicDiagnosis && (
                    <div style={{ textAlign: 'left' }}>
                      <div>
                        <Row className="bold">
                          {diagnosisListItem.basicDiagnosis.display}
                          {diagnosisListItem.basicDiagnosis.text &&
                            `(\n${diagnosisListItem.basicDiagnosis.text})`}
                        </Row>
                        <br />
                        <Row className="bold">
                          {diagnosisListItem.diagnosis &&
                            diagnosisListItem.diagnosis.display}
                          <br />
                          {diagnosisListItem.diagnosis &&
                            `(\n${diagnosisListItem.diagnosis.text})`}
                        </Row>
                      </div>
                    </div>
                  ),
                  evidenceDetail: diagnosisListItem.evidenceDetail && (
                    <DetailViewSection dataSource={diagnosisListItem.evidenceDetail} />
                  ),
                  note: diagnosisListItem.basicDiagnosisNote && (
                    <div>
                      <Row className="bold">{diagnosisListItem.basicDiagnosisNote}</Row>
                      <br />
                      <Row className="bold">{diagnosisListItem.diagnosisNote}</Row>
                    </div>
                  ),
                })
              )
              setDataSource(dataSource)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    )
  }

 

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedDiagnosis])

  

  return (
    <div>
      <Table
        dataSource={dataSource && dataSource}
        columns={columns}
        pagination={false}
        className={styles.diagnoseTable}
        loading={loadingData}
      />
      <Button type="primary" block style={{ height: '30px' }}>
        <Trans id={'Seemore'} />
      </Button>
    </div>
  )
}

ViewSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(ViewSection))
