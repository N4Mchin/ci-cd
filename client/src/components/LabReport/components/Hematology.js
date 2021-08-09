import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import * as dateTime from 'utils/datetime'
import { Row, Col, Typography, Divider, Spin, Table, Icon } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'
const { Text } = Typography

const Title = (
  <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}>
    <Trans id={'Hematology test'} />
  </div>
)
const RapidTests = props => {
  const { Practitioner, FHIR_CODES } = props.app
  const {
    include,
  } = FHIR_CODES.UncategorizedTests.OtherTests.include.Hematology
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
      render: (text, record) => {
        console.log(record)
        if (record.result > record.interpretation.highValue) {
          return (
            <div>
              {record.result}
              <Icon type="arrow-up" style={{ fontSize: '10px' }} />
            </div>
          )
        } else if (record.result < record.interpretation.lowValue) {
          return (
            <div>
              {record.result}
              <Icon type="arrow-down" style={{ fontSize: '10px' }} />{' '}
            </div>
          )
        }
        return <div>{record.result}</div>
      },
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
      key: 'regulr',
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
        console.log(
          'verifiedPractitioner------------------',
          verifiedPractitioner
        )

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

        const sampleDate =
          data.specimen[data.specimen.length - 1].collection.collectedDateTime

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
            referenceRange[0] &&
            referenceRange[0].low &&
            referenceRange[0].low.value
          const highValue =
            referenceRange &&
            referenceRange[0] &&
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
                .Hematology.include[testKey].display,
            interpretation: {
              highValue,
              lowValue,
            },
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
            protocol="М-ЭТ-002"
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
                    &nbsp; <Trans id={'FLow cytometry assay'} />
                    <br />
                    &nbsp;{' '}
                    <Trans id={'Sysmex, XP-100 full automatic analyzer'} />
                    <br />
                    &nbsp;-
                  </Text>
                </Col>
              </Row>
              {/* <Row>
                <Col span={8} style={{ fontSize: '14px' }}>
                  <Text>
                    <Trans id={'LabReport_Phlebotomist:'} />
                    <br />
                    <Trans id={'LabReport_Operator ID:'} />
                    <br />
                    <Trans id={'LabReport_Physician:'} />
                  </Text>
                </Col>
                <Col span={10} style={{ fontSize: '14px' }}>
                  <Text>
                    &nbsp; Д.Сонинтогос
                    <br />
                    &nbsp; Б.Сумъяа
                    <br />
                    &nbsp; Б.Солонго  <div
                      style={{ zIndex: 1, marginTop: '-120px', marginRight: '60px' }}
                    >
                      <img src={stamp} className={styles.stamp} alt="" />
                    </div>
                  </Text>
                </Col>
                <Col span={4} style={{ fontSize: '14px' }}>
                  <Text>
                    &nbsp; {dateTime.getDate()}
                    <br />
                  &nbsp;  {dateTime.getDate()}
                    <br />
                  &nbsp;  {dateTime.getDate()}
                  </Text>
                </Col>
              </Row> */}
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

RapidTests.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(RapidTests))
