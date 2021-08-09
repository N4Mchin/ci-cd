import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Spin, Table, Icon } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'
const { Text } = Typography

const Title = (
  <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px' }}>
    <Trans id={'Coagulation test'} />
  </div>
)

const Coagulation = props => {
  const { Practitioner } = props.app
  const patientBarcode = props.patient && props.patient._getBarcode()

  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [rawData, setRawData] = useState()

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
    },
    {
      title: <Trans id={'Unit'} />,
      dataIndex: 'unit',
      key: 'unit',
      width: '10%',
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
        Object.keys(data.include).forEach((testKey, testIndex) => {
          const { valueQuantity, status } = data.include[
            testKey
          ].latestObservation

          // if (status !== 'final') {
          //   throw new Error('Observation must be of final status')
          // }
          const result = valueQuantity.value

          const { referenceRange } = data.include[testKey].latestObservation

          const lowValue =
            referenceRange &&
            referenceRange[0].low &&
            referenceRange[0].low.value
          const highValue =
            referenceRange &&
            referenceRange[0].high &&
            referenceRange[0].high.value

          let refRange
          if (lowValue || highValue) {
            refRange = [lowValue, highValue].join(' - ')
          }

          tableData.push({
            key: testIndex,
            testName:
              props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                .Coagulation.include[testKey].display,
            interpretation: '',
            result: result,
            unit: valueQuantity && valueQuantity.unit && valueQuantity.unit,
            regular: refRange,
          })
        })
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
            instrumentSerialNumber="275020346"
            protocol="М-ЭТ-028"
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
              ></Table>{' '}
            </div>

            <div className={styles.content}></div>

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
                    &nbsp;{' '}
                    <Trans
                      id={'Clotting, Immuno-turbidimetric, Chromogenic assay'}
                    />
                    <br />
                    &nbsp;{' '}
                    <Trans id={'Erba, ECL-412 semi-automated coagulometer'} />
                    <br />
                    &nbsp;-
                  </Text>
                </Col>
              </Row>
            </div>
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

Coagulation.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(Coagulation))
