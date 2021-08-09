// import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'dva'
// import styles from '../styles.less'
// import { withI18n } from '@lingui/react'
// import * as dateTime from 'utils/datetime'
// import { Row, Col, Typography, Divider, Spin } from 'antd'
// import { Header, Footer } from '.'

// const { Text } = Typography

// const Title = <div>Ferritin шинжилгээний хариу</div>

// const Ferritin = props => {
//   const { Practitioner } = props.app
//   const [patient, setPatient] = useState()
//   const [valueQuantity, setValueQuantity] = useState()
//   const [sampleCollectionDate, setSampleCollectionDate] = useState()
//   const [issuedDate, setIssuedDate] = useState()
//   const [loadingData, setLoadingData] = useState(false)

//   useEffect(() => {
//     setLoadingData(true)
//     props
//       .dispatch({
//         type: 'app/queryLabResult',
//         payload: {
//           testKey: props.testKey,
//           testCode: props.testCode,
//           serviceRequestId: props.serviceRequestId,
//         },
//       })
//       .then(data => {
//         const sampleCollectionDate =
//           data.specimen[data.specimen.length - 1].collection.collectedDateTime
//         const { valueQuantity, status, issued } = data.latestObservation

//         if (data.patient) {
//           setPatient(data.patient)
//         }
//         setValueQuantity(valueQuantity)
//         setSampleCollectionDate(
//           dateTime.toLocalDateTime(sampleCollectionDate, 'yyyy-mm-dd')
//         )
//         setIssuedDate(dateTime.toLocalDateTime(issued, 'yyyy-mm-dd'))
//       })
//       .catch(errorInfo => console.log(errorInfo))
//       .finally(() => {
//         setLoadingData(false)
//       })
//   }, [])

//   return (
//     <div>
//       {loadingData && (
//         <Row type="flex" justify="center">
//           <Spin spinning={loadingData} />
//         </Row>
//       )}

//       {!loadingData && (
//         <div className={styles.container}>
//           <Header
//             title={Title}
//             protocol="БҮ-ЭТ-016"
//             practitioner={Practitioner}
//             patient={patient}
//             compact
//           />
//           <div className={styles.content}>
//             <Divider className={styles.divider} />
//             <Divider className={styles.divider} />

//             <div style={{ textAlign: 'center' }}>
//               <Row>
//                 <Col span={12} style={{ textAlign: 'right', fontSize: '14px' }}>
//                   <Text>
//                     Үр дүн / Result:
//                     <br />
//                     Овог / Surname:
//                     <br />
//                     Нэр / Name:
//                     <br />
//                     Регистрийн дугаар/ Civil identity Number :
//                     <br />
//                     Утасны дугаар / Tell No :
//                   </Text>
//                 </Col>
//                 <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
//                   <Text>
//                     &nbsp;
//                     <span className="bold">
//                       {valueQuantity &&
//                         valueQuantity.value &&
//                         valueQuantity.value}
//                       {valueQuantity &&
//                         valueQuantity.unit &&
//                         valueQuantity.unit}
//                     </span>
//                     <br />
//                     &nbsp;{patient && patient.getLastName()}
//                     <br />
//                     &nbsp;{patient && patient.getFirstName()}
//                     <br />
//                     &nbsp;{patient && patient.getNationalIdentificationNumber()}
//                     <br />
//                     &nbsp;{patient && patient.getMobilePhones()}
//                   </Text>
//                 </Col>
//               </Row>
//             </div>

//             <Divider className={styles.divider} />
//             <div style={{ textAlign: 'center' }}>
//               <Row>
//                 <Col span={12} style={{ textAlign: 'right', fontSize: '14px' }}>
//                   <Text>
//                     Сорьц авсан огноо / Sample Collection Date :
//                     <br />
//                     Сорьцын төрөл / Sample Type :
//                     <br />
//                     Шинжилсэн огноо / Run Completion Time :
//                     <br />
//                     Шинжилгээний арга зүй / Assay Method :
//                     <br />
//                     Шинжилгээний нэр / Assay Name :
//                   </Text>
//                 </Col>
//                 <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
//                   <Text>
//                     &nbsp;{sampleCollectionDate}
//                     <br />
//                     &nbsp;Ийлдэс/Serum
//                     <br />
//                     &nbsp;{issuedDate}
//                     <br />
//                     &nbsp;Бодит цагийн ПГУ/Real Time PCR
//                     <br />
//                     &nbsp;-
//                   </Text>
//                 </Col>
//               </Row>
//             </div>
//             <Divider className={styles.divider} />
//             <div style={{ textAlign: 'center' }}>
//               <Row>
//                 <Col span={12} style={{ textAlign: 'right', fontSize: '14px' }}>
//                   <Text>
//                     Лавлах хэмжээ / Reference values:
//                     <br />
//                     Эрүүл хүнд/ For healthy person :
//                     <br />
//                     Оношлуурын хугацаа / Assay Lot expiration date :
//                   </Text>
//                 </Col>
//                 <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
//                   <Text>
//                     &nbsp; -
//                     <br />
//                     &nbsp;0.0 IU/ml буюу илрэхгүй/not detected
//                     <br />
//                     &nbsp;{'>0.0 IU/ml буюу илрэх/detected'}
//                   </Text>
//                 </Col>
//               </Row>
//             </div>
//           </div>

//           <Footer style={{ marginTop: '32px' }} practitioner={Practitioner} />
//         </div>
//       )}
//     </div>
//   )
// }

// Ferritin.propTypes = {
//   testKey: PropTypes.string,
//   testCode: PropTypes.object,
//   serviceRequestId: PropTypes.string,
// }

// export default connect(({ app, loading }) => ({
//   app,

//   loading,
// }))(withI18n()(Ferritin))

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Typography, Divider, Spin, Table } from 'antd'
import { BlankHeader, BlankFooterLabTest } from 'components'
const { Text } = Typography

const Title = (
  <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px' }}>
    <Trans id={'Ferritin ELISA'} />
  </div>
)

const Ferritin = props => {
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
        } = props.app.FHIR_CODES.UncategorizedTests.OtherTests.include.Ferritin

        let reference
        const referenceRange = {
          male: '20 - 350',
          female: '10 - 200',
        }
        if (props.patient.gender === 'female') {
          reference = referenceRange.female
        } else if (props.patient.gender === 'male') {
          reference = referenceRange.male
        } else {
          return
        }
        console.log(reference)
        tableData.push({
          key: '0',
          testName: display,
          interpretation: '',
          unit: unit,
          result: result,
          referenceRangeStatus: reference,
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
            protocol="БҮ-ЭТ-016"
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
                    &nbsp;{' '}
                    <Trans id={'BIO-TEK EL 800 Universal Microplate Reader'} />
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

Ferritin.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(Ferritin))
