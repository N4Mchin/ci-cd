import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { withI18n } from '@lingui/react'
import * as dateTime from 'utils/datetime'
import { Row, Col, Typography, Divider, Spin } from 'antd'
import { Header, Footer } from '.'

const { Text } = Typography

const Title = (
  <div>
    HPV вирусийн ачаалал <br />
    тодорхойлох шинжилгээний хариу <br />
  </div>
)

const HPV = props => {
  const { Practitioner } = props.app
  const [patient, setPatient] = useState()
  const [valueQuantity, setValueQuantity] = useState()
  const [sampleCollectionDate, setSampleCollectionDate] = useState()
  const [issuedDate, setIssuedDate] = useState()
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    setLoadingData(true)
    props
      .dispatch({
        type: 'app/queryLabResult',
        payload: {
          testKey: props.testKey,
          testCode: props.testCode,
          serviceRequestId: props.serviceRequestId,
        },
      })
      .then(data => {
        const sampleCollectionDate =
          data.specimen[data.specimen.length - 1].collection.collectedDateTime
        const { valueQuantity, status, issued } = data.latestObservation

        if (data.patient) {
          setPatient(data.patient)
        }
        setValueQuantity(valueQuantity)
        setSampleCollectionDate(
          dateTime.toLocalDateTime(sampleCollectionDate, 'yyyy-mm-dd')
        )
        setIssuedDate(dateTime.toLocalDateTime(issued, 'yyyy-mm-dd'))
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoadingData(false)
      })
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
          <Header
            title={Title}
            protocol="БҮ-ЭТ-016"
            practitioner={Practitioner}
            patient={patient}
            compact
          />
          <div className={styles.content}>
            <Divider className={styles.divider} />
            <Divider className={styles.divider} />

            <div style={{ textAlign: 'center' }}>
              <Row>
                <Col span={12} style={{ textAlign: 'right', fontSize: '14px' }}>
                  <Text>
                    Үр дүн / Result:
                    <br />
                    Овог / Surname:
                    <br />
                    Нэр / Name:
                    <br />
                    Регистрийн дугаар/ Civil identity Number :
                    <br />
                    Утасны дугаар / Tell No :
                  </Text>
                </Col>
                <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
                  <Text>
                    &nbsp;
                    {valueQuantity &&
                      valueQuantity.value &&
                      valueQuantity.value}
                    {valueQuantity && valueQuantity.unit && valueQuantity.unit}
                    <br />
                    &nbsp;{patient && patient.getLastName()}
                    <br />
                    &nbsp;{patient && patient.getFirstName()}
                    <br />
                    &nbsp;{patient && patient.getNationalIdentificationNumber()}
                    <br />
                    &nbsp;{patient && patient.getMobilePhones()}
                  </Text>
                </Col>
              </Row>
            </div>

            <Divider className={styles.divider} />
            <div style={{ textAlign: 'center' }}>
              <Row>
                <Col span={12} style={{ textAlign: 'right', fontSize: '14px' }}>
                  <Text>
                    Сорьц авсан огноо / Sample Collection Date :
                    <br />
                    Сорьцын төрөл / Sample Type :
                    <br />
                    Шинжилсэн огноо / Run Completion Time :
                    <br />
                    Шинжилгээний арга зүй / Assay Method :
                    <br />
                    Шинжилгээний нэр / Assay Name :
                  </Text>
                </Col>
                <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
                  <Text>
                    &nbsp;{sampleCollectionDate}
                    <br />
                    &nbsp;Ийлдэс/Serum
                    <br />
                    &nbsp;{issuedDate}
                    <br />
                    &nbsp;Бодит цагийн ПГУ/Real Time PCR
                    <br />
                    &nbsp;-
                  </Text>
                </Col>
              </Row>
            </div>
            <Divider className={styles.divider} />
            <div style={{ textAlign: 'center' }}>
              <Row>
                <Col span={12} style={{ textAlign: 'right', fontSize: '14px' }}>
                  <Text>
                    Лавлах хэмжээ / Reference values:
                    <br />
                    Эрүүл хүнд/ For healthy person :
                    <br />
                    Оношлуурын хугацаа / Assay Lot expiration date :
                  </Text>
                </Col>
                <Col span={12} style={{ textAlign: 'left', fontSize: '14px' }}>
                  <Text>
                    &nbsp; -
                    <br />
                    &nbsp;0.0 IU/ml буюу илрэхгүй/not detected
                    <br />
                    &nbsp;0.0 IU/ml буюу илрэх/detected
                  </Text>
                </Col>
              </Row>
            </div>
          </div>

          <Footer style={{ marginTop: '32px' }} practitioner={Practitioner} />
        </div>
      )}
    </div>
  )
}
HPV.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(HPV))
