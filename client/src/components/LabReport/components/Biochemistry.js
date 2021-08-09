import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Spin, Table, Icon } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'

const { Text } = Typography

const Biochemistry = props => {
  const { Practitioner } = props.app
  const patientBarcode = props.patient && props.patient._getBarcode()
  const [loadingData, setLoadingData] = useState(false)
  const [rawData, setRawData] = useState()
  const [dataSource, setDataSource] = useState([])

  const [runCompletionTime, setRunCompletionTime] = useState()
  const [sampleCollectedDate, setSampleCollectedDate] = useState()
  const [verifiedTime, setVerifiedTime] = useState()
  const [collector, setCollector] = useState()
  const [performer, setPerformer] = useState()
  const [verifiedPractitioner, setVerifiedPractitioner] = useState()
  const Title = (
    <div
      style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}
    >
      <Trans id={'Biochemistry test'} />
    </div>
  )

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
      render: (text, record) => {
        if (record.result > record.interpretation.highValue) {
          return (
            <div>
              {record.result}{' '}
              <Icon type="arrow-up" style={{ fontSize: '10px' }} />
            </div>
          )
        } else if (record.result < record.interpretation.lowValue) {
          return (
            <div>
              {record.result}{' '}
              <Icon type="arrow-down" style={{ fontSize: '10px' }} />{' '}
            </div>
          )
        } else {
          return <div>{record.result}</div>
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
      dataIndex: 'regular',
      key: 'regular',
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

        setRawData(data)
        Object.keys(data.include).forEach(testKey => {
          Object.keys(data.include[testKey].include).forEach(
            (subTestKey, index) => {
              const { valueQuantity, status } = data.include[testKey].include[
                subTestKey
              ].latestObservation
              if (status !== 'final') {
                throw new Error('Observatin must be of final status')
              }

              const result = valueQuantity.value
              const unit = valueQuantity.unit
              const { referenceRange } = data.include[testKey].include[
                subTestKey
              ].latestObservation
              console.log(referenceRange)

              const lowValue =
                referenceRange &&
                referenceRange[0].low &&
                referenceRange[0].low.value
              const highValue =
                referenceRange &&
                referenceRange[0].high &&
                referenceRange[0].high.value
              console.log(lowValue)
              console.log(highValue)
              let refRange
              if (lowValue || highValue) {
                refRange = [lowValue, highValue].join(' - ')
              }

              // console.log(ref)
              tableData.push({
                key: index,
                testItem: subTestKey,
                testName:
                  props.app.FHIR_CODES.BiochemistryTests.include[testKey]
                    .include[subTestKey].display,
                interpretation: {
                  highValue,
                  lowValue,
                },
                result: result,
                unit: unit,
                regular: refRange,
              })
            }
          )
        })
        setDataSource(tableData)
      })
      .then(() => {
        setLoadingData(false)
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
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
            instrumentSerialNumber="275020346"
            protocol="М-ЭТ-001"
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
                // className={styles.table}
                pagination={false}
                columns={columns}
                bordered
              ></Table>
            </div>
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
                  &nbsp; <Trans id={'Colorimetric assay'} />
                  <br />
                  &nbsp; <Trans id={'Erba, XL-200 full automatic analyzer'} />
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

Biochemistry.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(Biochemistry))
