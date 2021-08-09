import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Spin, Table } from 'antd'
import { codeIntersects } from 'utils/controller'
import BlankHeader from '../../BlankHeader/BlankHeader'
import BlankFooterLabTest from '../../BlankFooterLabTest/BlankFooterLabTest'
const { Text } = Typography

const Title = (
  <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
    <Trans id={'HDV-IgG ELISA'} />
  </div>
)

const AntiHDV = props => {
  const patientBarcode = props.patient && props.patient._getBarcode()

  const { Practitioner } = props.app
  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [runCompletionTime, setRunCompletionTime] = useState()
  const [sampleCollectedDate, setSampleCollectedDate] = useState()
  const [verifiedTime, setVerifiedTime] = useState()
  const [patient, setPatient] = useState()
  const [collector, setCollector] = useState()
  const [performer, setPerformer] = useState()
  const [verifiedPractitioner, setVerifiedPractitioner] = useState()

  const columns = [
    {
      title: <Trans id={'Parameter'} />,
      dataIndex: 'testName',
      key: 'testName',
      width: '20%',
    },
    {
      title: <Trans id={'Result'} />,
      dataIndex: 'result',
      key: 'result',
      width: '20%',
    },
    {
      title: <Trans id={'Reference range'} />,
      dataIndex: 'referenceRangeStatus',
      key: 'referenceRangeStatus',
      width: '20%',
    },
  ]

  useEffect(() => {
    setLoadingData(true)

    props
      .dispatch({
        type: 'app/queryLabResult',
        payload: {
          testKey: props.testKey,
          testCode: props.testCode,
          serviceRequestId: props.serviceRequest.id,
        },
      })
      .then(data => {
        const collector = data.specimen[0].collection.collector.display
        const { performedPractitioner, verifiedPractitioner } = data
        if (data.patient) {
          setPatient(data.patient)
        }

        setPerformer(
          performedPractitioner &&
            performedPractitioner.getOfficialNameString({
              short: true,
            })
        )

        setVerifiedPractitioner(
          verifiedPractitioner &&
            verifiedPractitioner.getOfficialNameString({
              short: true,
            })
        )

        setRunCompletionTime(data.runCompletionTime)
        setSampleCollectedDate(data.sampleCollectedDate)
        setVerifiedTime(data.verifiedTime)
        setCollector(collector)

        const tableData = []

        const { valueCodeableConcept } = data.latestObservation
        const valueCodeableConceptObject = Object.values(
          props.app.FHIR_CODES.QualitativeTestResults
        ).find(testResult => {
          return codeIntersects(testResult.code, valueCodeableConcept)
        })
        const result = valueCodeableConceptObject.display
        const negative = 'Negative'

        const {
          unit,
          display,
        } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include.Anti_HDV

        tableData.push({
          key: '0',
          testName: display,
          interpretation: '',
          unit: unit,
          result: <Trans id={result}></Trans>,
          referenceRangeStatus: <Trans id={negative}></Trans>,
        })

        setDataSource(tableData)
      })
      //   // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoadingData(false)
      })
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {loadingData && (
        <Row type="flex" justify="center">
          <Spin spinning={loadingData} />
        </Row>
      )}
      {!loadingData && (
        <div className={styles.container}>
          <BlankHeader
            title={Title}
            protocol="М-ЭТ-007"
            practitioner={Practitioner}
            patientBarcode={patientBarcode}
            patient={props.patient}
          />
          <div className={styles.content}>
            <Divider className={styles.divider} />
            <Row
              style={{
                fontSize: '14px',
                fontFamily: 'Helvetica Neue Bold',
                margin: '8px 0',
              }}
            >
              <Trans id={'Test result'} />
            </Row>
            <div className={styles.tableBorder}>
              <Table
                dataSource={dataSource}
                pagination={false}
                columns={columns}
                bordered
              ></Table>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Row>
              <Col span={8} style={{ fontSize: '12px' }}>
                <Text>
                  <Trans id={'Sample Type:'} />
                  <br />
                  <Trans id={'Assay Method:'} />
                  <br />
                  <Trans id={'Instrument name:'} />
                </Text>
              </Col>
              <Col span={10} style={{ fontSize: '12px' }}>
                <Text>
                  &nbsp; <Trans id={'Serum'} />
                  <br />
                  &nbsp; <Trans id={'Enzyme-linked immunosorbent assay'} />
                  <br />
                  &nbsp;{' '}
                  <Trans id={'BIO-TEK EL800 Universal Microplate Reader'} />
                  <br />
                </Text>
              </Col>
            </Row>
          </div>

          <BlankFooterLabTest
            style={{ marginTop: '32px' }}
            runCompletionTime={runCompletionTime}
            sampleCollectedDate={sampleCollectedDate}
            verifiedTime={verifiedTime}
            collector={collector}
            performer={performer}
            verifiedPractitioner={verifiedPractitioner}
            practitioner={Practitioner}
          />
        </div>
      )}
    </div>
  )
}

AntiHDV.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(AntiHDV))
