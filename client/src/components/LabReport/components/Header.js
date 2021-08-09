import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { liverCenterLogo } from 'public'
import * as dateTime from 'utils/datetime'
import JsBarcode from 'jsbarcode'
import { Row, Col, Typography, Divider } from 'antd'

const { Text } = Typography

const Header = props => {
  const [patientNumber, setPatientNumber] = useState()
  const [operator, setOperator] = useState()
  const [instrumentSerialNumber, setInstrumentSerialNumber] = useState()

  useEffect(() => {
    const newPatientNumber = props.patient && props.patient._getBarcode()
    setPatientNumber(newPatientNumber)

    if (isNaN(parseInt(newPatientNumber))) {
      return
    }

    JsBarcode('#ean-8', `${'00000017'}`, {
      format: 'ean8',
      width: 1,
      height: 20,
    })

    setOperator('Э. Анир')
    setInstrumentSerialNumber(props.instrumentSerialNumber)
  }, [props.patient])

  return (
    <div style={props.style} className={styles.printHeader}>
      <div style={{ textAlign: 'center' }}>
        <img src={liverCenterLogo} className={styles.logo} alt="" />
      </div>

      <Divider
        style={{ background: '#004d40', margin: '8px 0', height: '4px' }}
      />

      <Row type="flex" justify="space-between">
        <Col>
          <div>
            <svg id="ean-8" />
          </div>
        </Col>
        <Col>
          Хэвлэсэн огноо: {dateTime.toLocalDateTime(new Date(), 'yyyy-mm-dd')}
        </Col>
        <Col>
          <span
            className="bold"
            style={{
              color: '#707070',
            }}
          >
            {props.protocol}
          </span>
        </Col>
      </Row>

      <Row gutter={8}>
        <Col span={12}>
          <div className={styles.titleContainer}>
            <span
              className="bold"
              style={{ color: '#707070', fontSize: '20px' }}
            >
              {props.title}
            </span>
          </div>
          {!props.compact && (
            <div>
              <div>
                <Text>Шинжилгээ хийсэн хүн / Operator ID : {operator}</Text>
                <br />
                <Text>
                  Багажны сериал дугаар / Instrument Serial# :{' '}
                  {instrumentSerialNumber}
                </Text>
              </div>
            </div>
          )}
        </Col>

        {props.compact && (
          <Col span={12} style={{ right: '0px' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ textAlign: 'right', right: '0px' }}>
                <div>Шинжилгээ хийсэн хүн / Operator ID : {operator}</div>
                <div>
                  Багажны сериал дугаар / Instrument Serial# :{' '}
                  {instrumentSerialNumber}
                </div>
                <div>{props.deviceInfo}</div>
              </div>
            </div>
          </Col>
        )}

        {!props.compact && (
          <Col span={12} style={{ right: '0px' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ textAlign: 'right', right: '0px' }}>
                <Text>
                  Овог / Surename :{' '}
                  {props.patient && props.patient.getLastName()}
                  <br />
                  Нэр / Name : {props.patient && props.patient.getFirstName()}
                  <br />
                  Регистрийн дугаар / Civil identity Number :{' '}
                  {props.patient &&
                    props.patient.getNationalIdentificationNumber()}
                  <br />
                  Утасны дугаар / Tell No :{' '}
                  {props.patient && props.patient.getMobilePhones()[0]}
                </Text>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

Header.propTypes = {
  compact: PropTypes.bool,
  deviceInfo: PropTypes.string,
  instrumentSerialNumber: PropTypes.string,
  protocol: PropTypes.string,
  patient: PropTypes.object,
  practitioner: PropTypes.object,
}

export default connect(({ app, loading }) => ({
  app,
  loading,
}))(withI18n()(Header))
