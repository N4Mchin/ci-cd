import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Drawer, Button } from 'antd'
import ReactToPrint from 'react-to-print'
import { BlankHeader, BlankFooter } from 'components'
import styles from '../styles.less'

import HistoryOfPresentIllness from './HistoryOfPresentIllness/PrintInspectionNote'
import MedicationRequest from './MedicationRequest/PrintInspectionNote'
import Examination from './Examination/PrintInspectionNotes'
import Diagnosis from './Diagnosis/PrintInspectionNote'
import AnamnesisVitae from './AnamnesisVitae/PrintInspectionNotes'
import Complaint from './Complaint/PrintInspectionNotes'
import AdditionalDesc from './AdditionalDesc/PrintInspectionNote'

const Title = (
  <div
    style={{
      textAlign: 'center',
      marginTop: '20px',
      marginBottom: '20px',
    }}
  >
    Үзлэгийн тэмдэглэл
  </div>
)

const PrintInspectionNotes = props => {
  const { app, practitioner_patient_profile } = props
  const { Practitioner } = app
  const { patient } = practitioner_patient_profile

  const onClose = () => {
    props.setVisible(false)
  }

  const componentRef = useRef()

  return (
    <Drawer
      visible={props.visible}
      closable={true}
      onClose={onClose}
      width="1000px"
      title={
        <ReactToPrint
          trigger={() => (
            <Button type="primary">
              <Trans id="Print" />
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle={'@page {size: portrait}'}
        />
      }
    >
      <div className={styles.container} ref={componentRef}>
        <BlankHeader
          inline
          title={Title}
          practitioner={Practitioner}
          style={{ fontSize: '14px' }}
          patient={patient}
        />
        <div>
          <Row>
            <Col span={14}>
              <HistoryOfPresentIllness />
            </Col>
            <Col span={8}>
              <MedicationRequest />
            </Col>
          </Row>
          <Row>
            <AnamnesisVitae />
          </Row>

          <Row>
            <Col span={24}>
              <Examination />
            </Col>

            <Col span={12}>
              <Diagnosis />
              {/* <MedicationRequest /> */}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Complaint />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <AdditionalDesc />
            </Col>
          </Row>
        </div>

        <BlankFooter
          style={{ marginTop: '32px' }}
          practitioner={Practitioner}
        />
      </div>
    </Drawer>
  )
}

PrintInspectionNotes.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(PrintInspectionNotes))
