import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Spin, Table } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'

const { Text } = Typography

const TestName = 'HCV-RNA'

const Title = (
  <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
    <Trans id={'HBV-DNA qPCR analysis'} />
  </div>
)

const ViralLoadTests = props => {
  const { Practitioner } = props.app

  const patientBarcode = props.patient && props.patient._getBarcode()

  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])

  const [runCompletionTime, setRunCompletionTime] = useState()
  const [sampleCollectedDate, setSampleCollectedDate] = useState()
  const [verifiedTime, setVerifiedTime] = useState()
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
      render: result => {
        if (result > '0') {
          return (
            <div>
              {result} <Trans id={'(Detected)'} />
            </div>
          )
        } else if ((result = '0')) {
          return (
            <div>
              {result} <Trans id={'(Not detected)'} />
            </div>
          )
        }
      },
    },
    {
      title: <Trans id={'Unit'} />,
      dataIndex: 'unit',
      key: 'unit',
      width: '20%',
    },
    {
      title: <Trans id={'Reference range'} />,
      dataIndex: 'referenceRangeStatus',
      key: 'referenceRangeStatus',
      width: '20%',
      render: referenceRangeStatus => {
        return <Trans id={'0 (Not detected)'} />
      },
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

        const { valueQuantity } = data.latestObservation

        const result = valueQuantity.value

        const {
          unit,
          display,
        } = props.app.FHIR_CODES.UncategorizedTests.ViralLoadTests.include.HBV_DNA

        tableData.push({
          key: '0',
          testName: display,
          interpretation: '',
          unit: unit,
          result: result,
        })

        console.log(tableData)
        setDataSource(tableData)
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoadingData(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            protocol="М-ЭТ-004"
            practitioner={Practitioner}
            patientBarcode={patientBarcode}
            patient={props.patient}
          />
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
              // className={styles.table}
              pagination={false}
              columns={columns}
              bordered
            ></Table>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Row>
              <Col span={8} style={{ fontSize: '14px' }}>
                <Text>
                  <Trans id={'Sample Type:'} />
                  <br />
                  <Trans id={'Assay Method:'} />
                  <br />
                  <Trans id={'Instrument name:'} />
                </Text>
              </Col>
              <Col span={10} style={{ fontSize: '14px' }}>
                <Text>
                  &nbsp; <Trans id={'Serum'} />
                  <br />
                  &nbsp; <Trans id={'Real Time PCR'} />
                  <br />
                  &nbsp;{' '}
                  <Trans id={'Cepheid GeneXpert XVI full automatic System'} />
                  <br />
                  &nbsp;-
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
ViralLoadTests.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(ViralLoadTests))
