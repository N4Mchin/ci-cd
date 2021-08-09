import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { stamp } from 'public'
import { Row, Col, Typography, Divider } from 'antd'
import * as dateTime from 'utils/datetime'
const { Text } = Typography

const BlankFooterLabTest = props => {
  const {
    sampleCollectedDate,
    runCompletionTime,
    verifiedTime,
    verifiedPractitioner,
    performer,
    collector,
  } = props

  return (
    <div style={props.style} className={styles.footer}>
      <div style={{ marginTop: '40px', fontSize: '12px !important' }}>
        <Row>
          <Col span={8}>
            <Text style={{ fontSize: '12px' }}>
              <Trans id={'LabReport_Phlebotomist:'} />
              <br />
              <Trans id={'LabReport_Operator ID:'} />
              <br />
              <Trans id={'LabReport_Physician:'} />
            </Text>
          </Col>
          <Col span={8}>
            <Text style={{ fontSize: '12px' }}>
              &nbsp; {collector}
              <br />
              &nbsp; {performer}
              <br />
              &nbsp; {verifiedPractitioner}
              <div
                style={{
                  zIndex: -100,
                  marginTop: '-120px',
                  marginRight: '60px',
                }}
              >
                <img
                  src={stamp}
                  className={styles.stamp}
                  alt=""
                  style={{
                    width: '4cm',
                    height: '4cm',
                    position: 'absolute',
                    top: '11px',
                    left: '45px !important',
                  }}
                />
              </div>
            </Text>
          </Col>
          <Col span={6}>
            <Text style={{ fontSize: '12px !important' }}>
              &nbsp; {sampleCollectedDate}
              <br />
              &nbsp; {runCompletionTime}
              <br />
              &nbsp; {verifiedTime}
            </Text>
          </Col>
        </Row>

        <Divider className={styles.divider} />
        <Row gutter={8}>
          <Col span={12} style={{ fontSize: '12px' }}>
            <Trans>
              Address: Liver Center, Dalai Tower
              <br />
              UNESCO street 31, Sukhbaatar District
              <br />
              Ulaanbaatar 14230, Mongolia
            </Trans>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <div>
              <div
                style={{
                  zIndex: 0,
                }}
              >
                <Row>
                  <Col style={{ fontSize: '12px' }}>Утас: 70132006</Col>
                  <Col style={{ fontSize: '12px' }}>Факс: 70132006</Col>
                </Row>
              </div>
            </div>
            <div style={{ fontSize: '12px' }}>
              <Trans id={'Print date:'} /> {dateTime.getDate()}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
BlankFooterLabTest.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(BlankFooterLabTest))
