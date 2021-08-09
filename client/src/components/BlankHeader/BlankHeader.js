import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { liverCenterLogo } from 'public'
import JsBarcode from 'jsbarcode'
import { Row, Col, Typography, Divider } from 'antd'
import { calculateAgeFromBirthDate } from 'utils/helper'

const { Text } = Typography

const BlankHeader = props => {
  const { patientBarcode } = props

  const [operator, setOperator] = useState()
  const [instrumentSerialNumber, setInstrumentSerialNumber] = useState()

  const age = calculateAgeFromBirthDate(props.patient.birthDate)

  useEffect(() => {
    const newPatientNumber = props.patient._getBarcode()

    if (isNaN(parseInt(newPatientNumber))) {
      return
    }

    patientBarcode &&
      JsBarcode('#patientBarcodeSVG', `${patientBarcode}`, {
        format: 'ean13',
        width: 1,
        height: '30px',
      })

    setOperator('Э. Анир')
    setInstrumentSerialNumber(props.instrumentSerialNumber)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.patient])

  return (
    <div style={props.style} className={styles.printHeader}>
      <div style={{ textAlign: 'center' }}>
        <img
          src={liverCenterLogo}
          className={styles.logo}
          alt=""
          style={{ width: '260px', height: '50px' }}
        />
      </div>
      <Divider className={styles.divider} />
      <Row type="flex" justify="space-between">
        <Col>
          {patientBarcode && (
            <div>
              <svg id="patientBarcodeSVG" />
            </div>
          )}
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

      <Row type="flex" justify="end"></Row>

      <Row gutter={8} style={{}}>
        <div>
          <span className="bold" style={{ color: '#707070', fontSize: '20px' }}>
            {props.title}
          </span>
        </div>

        {!props.compact && !props.inline && (
          <Row style={{ fontSize: '12px', marginLeft: '10px' }}>
            <Col span={12} style={{ right: '0px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ right: '0px' }}>
                  <Text>
                    <Trans id={'Surname:'} /> {props.patient.getLastName()}
                    <br />
                    <Trans id={'Age:'} /> {age}
                    <br />
                    <Trans id={'Civil identity Number:'} />{' '}
                    {props.patient.getNationalIdentificationNumber()}
                  </Text>
                </div>
              </div>
            </Col>
            <Col span={12} style={{ right: '0px' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ right: '0px' }}>
                  <Text>
                    <Trans id={'Name:'} /> {props.patient.getFirstName()}
                    <br />
                    <Trans id={'Gender:'} />{' '}
                    <Trans id={props.patient.gender}></Trans>
                    <br />
                    <Trans id={'Tell No:'} />{' '}
                    {props.patient.getMobilePhones()[0]}
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        )}
        {props.inline && (
          <Row>
            <Row type="flex" gutter={12}>
              <Col>
                <Row type="flex" gutter={4}>
                  <Col className="bold">
                    <Trans id={'Surname:'} />
                  </Col>
                  <Col>{props.patient && props.patient.getLastName()}</Col>
                </Row>
              </Col>
              <Col>
                <Row type="flex" gutter={4}>
                  <Col className="bold">
                    <Trans id={'Name:'} />
                  </Col>
                  <Col>{props.patient && props.patient.getFirstName()}</Col>
                </Row>
              </Col>
              <Col>
                <Row type="flex" gutter={4}>
                  <Col className="bold">
                    <Trans id={'Age:'} />
                  </Col>
                  <Col>{age}</Col>
                </Row>
              </Col>
              <Col>
                <Row type="flex" gutter={4}>
                  <Col className="bold">
                    <Trans id={'Gender:'} />
                  </Col>
                  <Col>
                    <Trans id={props.patient && props.patient.gender} />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row type="flex" gutter={4}>
              <Col className="bold">
                <Trans id={'Patient Barcode'} />:
              </Col>
              <Col>
                <Trans id={props.patient && props.patient._getBarcode()} />
              </Col>
            </Row>
          </Row>
        )}
      </Row>
    </div>
  )
}

BlankHeader.propTypes = {
  compact: PropTypes.bool,
  deviceInfo: PropTypes.string,
  instrumentSerialNumber: PropTypes.string,
  protocol: PropTypes.string,
  patient: PropTypes.object,
  practitioner: PropTypes.object,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(BlankHeader))
