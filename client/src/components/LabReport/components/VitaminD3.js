import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Table, Spin } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'
import { getRelatedReferenceRange } from 'utils/helper'
const { Text } = Typography

const Title = (
  <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
    <Trans id={'25 (OH) Vitamin D ELISA'} />
  </div>
)

const VitaminD3 = props => {
  const { Practitioner } = props.app
  const patientBarcode = props.patient && props.patient._getBarcode()

  const [issuedDate, setIssuedDate] = useState()
  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState(false)

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
          referenceRange,
        } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include.Vitamin_D3

        const relatedReferenceRange = getRelatedReferenceRange(
          referenceRange,
          data.patient
        )
        const { low, medium, high } = relatedReferenceRange

        let referenceRangeStatus = (
          <div>
            <div>
              <Trans id={'Deficient'} />: {'<'}
              {
                relatedReferenceRange.interpretation.find(
                  interpretation => interpretation.type === 'CriticalLow'
                ).max
              }
            </div>
            <div>
              <Trans id={'Insufficient'} />:
              {
                relatedReferenceRange.interpretation.find(
                  interpretation => interpretation.type === 'Low'
                ).min
              }
              {'-'}
              {
                relatedReferenceRange.interpretation.find(
                  interpretation => interpretation.type === 'Low'
                ).max
              }
            </div>

            <div>
              <Trans id={'Sufficient'} />:
              {
                relatedReferenceRange.interpretation.find(
                  interpretation => interpretation.type === 'Normal'
                ).min
              }
              {'-'}
              {
                relatedReferenceRange.interpretation.find(
                  interpretation => interpretation.type === 'Normal'
                ).max
              }
            </div>
            <div>
              <Trans id={'Intoxication'} />: {'>'}
              {
                relatedReferenceRange.interpretation.find(
                  interpretation => interpretation.type === 'High'
                ).min
              }
            </div>
          </div>
        )

        tableData.push({
          key: '0',
          testName: display,
          interpretation: '',
          unit: unit,
          result: result,
          referenceRangeStatus: referenceRangeStatus,
        })

        setDataSource(tableData)

        // const sampleCollectionDate =
        //   data.specimen[data.specimen.length - 1].collection.collectedDateTime
        // const { valueQuantity, status, issued } = data.latestObservation

        // if (status !== 'final') {
        //   throw new Error('Observation must be of final status')
        // }

        // setValueQuantity(valueQuantity)
        // setSampleCollectionDate(
        //   dateTime.toLocalDateTime(sampleCollectionDate, 'yyyy-mm-dd')
        // )
        // setIssuedDate(dateTime.toLocalDateTime(issued, 'yyyy-mm-dd'))
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
            protocol="М-ЭТ-011"
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
                  &nbsp; <Trans id={'Enzyme-linked immunosorbent assay'} />
                  <br />
                  &nbsp;
                  <Trans id={'BIO-TEK EL 800 Universal Microplate Reader'} />
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

VitaminD3.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(VitaminD3))
