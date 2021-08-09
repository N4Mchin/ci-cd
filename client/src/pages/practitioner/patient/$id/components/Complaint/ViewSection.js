import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Col, Skeleton } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './../../styles.less'

const ComplaintSection = props => {
  const { problem, currentLanguage, index } = props

  const backgroundColor = parseInt(index) % 2 === 0 ? '#e5e5e9' : '#f5f5f5'

  return (
    <div>
      <Row type="flex" style={{ padding: '0, 2px' }}>
        <Col span={6}>
          <div
            className={styles.thirdField}
            style={{ background: backgroundColor }}
          >
            {problem.complaint &&
              problem.complaint.designation.find(
                name => name.language === currentLanguage
              ).value}
          </div>
        </Col>
        <Col span={6}>
          <div
            className={styles.thirdField}
            style={{ background: backgroundColor }}
          >
            {problem.bodySite &&
              problem.bodySite.designation.find(
                name => name.language === currentLanguage
              ).value}
          </div>
        </Col>
        <Col span={12}>
          <div
            className={styles.thirdField}
            style={{ background: backgroundColor }}
          >
            {problem.note && problem.note.join('')}
          </div>
        </Col>
      </Row>
    </div>
  )
}

const Practitioner = props => {
  const { subDataSource, practitionerName, currentLanguage } = props
  return (
    <Row type="flex">
      <Col className={styles.secondField} span={2}>
        {practitionerName}
      </Col>
      <Col span={22} style={{ justifyContent: 'center', alignSelf: 'center' }}>
        {subDataSource.condition.map((problem, index) => {
          return (
            <ComplaintSection
              problem={problem}
              currentLanguage={currentLanguage}
              index={index}
            />
          )
        })}
      </Col>
    </Row>
  )
}

const TableRow = props => {
  const { dataSource, recordedDate, currentLanguage } = props

  return Object.keys(dataSource).map(practitioner => {
    return (
      <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
        <Row type="flex">
          <Col span={2}>
            <div className={styles.firstField}>{recordedDate}</div>
          </Col>

          <Col
            span={22}
            style={{
              height: '100%',
              background: '#f5f5f5',
              display: 'inline-block',
              border: '1px solid #c9c9c9',
              alignItems: 'center',
            }}
          >
            <Practitioner
              subDataSource={dataSource[practitioner]}
              practitionerName={practitioner}
              currentLanguage={currentLanguage}
            />
          </Col>
        </Row>
      </div>
    )
  })
}

const ViewSection = props => {
  const { i18n, app, practitioner_patient_profile } = props
  const { lastUpdatedComplaint } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientComplaint, setPatientComplaint] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryComplaint',
        })
        .then(result => {
          if (result.patientComplaint) {
            setPatientComplaint(result.patientComplaint)
          } else {
            setPatientComplaint()
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
  }, [lastUpdatedComplaint])

  return (
    <div>
      <Skeleton loading={loadingData} active paragraph={{ rows: 3 }}>
        <Row
          style={{
            padding: '6px 3px 6px 3px',
            backgroundColor: '#727272',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Col span={2}>{i18n.t`Date`}</Col>
          <Col span={2}>{i18n.t`Practitioner`}</Col>
          <Col span={5}>{i18n.t`Complaint`}</Col>
          <Col span={5}>{i18n.t`Body site`}</Col>
          <Col span={10}>{i18n.t`AdditionalInformation`}</Col>
        </Row>
        {patientComplaint &&
          patientComplaint.map(complaint => {
            return (
              <TableRow
                recordedDate={complaint[0]}
                currentLanguage={i18n._language}
                dataSource={complaint[1]}
              />
            )
          })}
      </Skeleton>

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
