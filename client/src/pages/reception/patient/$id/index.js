import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Col, Row, Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'
import styles from './index.less'
import {
  CheckupOrder,
  CheckoutPanel,
  DiagnosticTest,
  LabTestLog,
  LabTestOrder,
  PrivateInfo,
  RecentServices,
  ServiceSets,
  OrderConfirmation,
  OrderHistory,
} from './components'

const { Text } = Typography

const Title = () => {
  return (
    <div className={styles.mainTitle}>
      <Trans>
        <span className="title uppercase">Customer </span>
        <span className="uppercase">Private Information</span>
      </Trans>
      <div style={{ height: '1px', background: '#E5E5E9' }} />
    </div>
  )
}

const PatientProfile = props => {
  useEffect(() => {
    return () => {
      props.dispatch({
        type: 'reception_patientProfile/updateState',
        payload: {
          patient: {},
          patientFirstName: undefined,
          patientLastName: undefined,
          patientNInum: undefined,
          patientBarcode: undefined,
          patientPhoneNumber: undefined,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Board inner id="CustomerPrivateInformation">
      <Title />

      <div className={styles.headerContainer}>
        <PrivateInfo />
        <div style={{ width: '16px' }}></div>
        <RecentServices />
      </div>

      <Row gutter={16}>
        <Col xxl={18} xl={18} lg={24} md={24} sm={24} xs={24}>
          <CheckupOrder />

          <Row gutter={16}>
            <Col span={8}>
              <DiagnosticTest />
            </Col>
            <Col span={16}>
              <ServiceSets />
            </Col>
          </Row>

          <LabTestOrder />

          <LabTestLog />

          <OrderHistory />

          <OrderConfirmation />
        </Col>
        <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}>
          <CheckoutPanel />

          <div
            style={{
              margin: '20px 0',
              border: '1px solid #C9C9C9',
              borderRadius: '2px',
              background: '#FAFAFA',
            }}
          >
            <div
              style={{
                position: 'absolute',
                margin: '-8px 0 0 0',
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <div
                style={{
                  padding: '0px 5px',
                  backgroundColor: '#ffffff',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  color: '#727272',
                }}
              >
                <Trans>
                  <Text strong>Template </Text>
                  <Text>From Practitioner</Text>
                </Trans>
              </div>
            </div>
            <Row style={{ margin: '40px 20px' }} gutter={8}>
              <Col span={12}>
                <Button block className="button-dark-gray uppercase">
                  <Trans id="Cancel" />
                </Button>
              </Col>
              <Col span={12}>
                <Button block type="primary" className="uppercase">
                  <Trans id="Download" />
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Board>
  )
}

PatientProfile.propTypes = {
  reception_patientProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(PatientProfile))
