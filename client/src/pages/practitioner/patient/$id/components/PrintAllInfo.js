import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Row, Col, Drawer, Button } from 'antd'
import ReactToPrint from 'react-to-print'
import { BlankHeader, BlankFooter } from 'components'
import styles from '../styles.less'

import HistoryOfPresentIllness from './HistoryOfPresentIllness/ViewSection'
import Examination from './Examination/PrintAllInfo'
import Diagnosis from './Diagnosis/ViewSection'
import Compliant from './Complaint/ViewSection'
import AnamnesisVitae from './AnamnesisVitae/PrintAllInfo'
import MedicationRequest from './MedicationRequest/ViewSection'
import AdditionalDesc from './AdditionalDesc/ViewSection'
import QuestionnaireResponse from './QuestionnaireResponse/ViewSection'

const Title = (
  <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
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
      <div className={styles.containerStatBox} ref={componentRef}>
        <BlankHeader
          inline
          title={Title}
          practitioner={Practitioner}
          style={{ fontSize: '14px' }}
          patient={patient}
        />

        <Row gutter={[0, 100]}>
          <Col span={24}>
            <Trans>
              <span className="title bold">Diagnose</span>
            </Trans>
            <div style={{ marginLeft: '16px' }}>
              <Diagnosis />
            </div>
          </Col>
          <Col span={24}>
            <Trans>
              <span className="title bold">Complaint</span>
            </Trans>
            <div style={{ marginLeft: '16px' }}>
              <Compliant />
            </div>
          </Col>
          <Col span={24}>
            <Trans>
              <span className="title uppercase bold">
                History of present illness
              </span>
            </Trans>
            <div style={{ marginLeft: '16px' }}>
              <HistoryOfPresentIllness />
            </div>
          </Col>
          <Col span={24}>
            <Trans id={'Examination'} />
            <div style={{ marginLeft: '16px' }}>
              <Examination />
            </div>
          </Col>
          <Col span={24}>
            <Trans id={'Anamnesis Vitae'} />
            <div style={{ marginLeft: '16px' }}>
              <AnamnesisVitae />
            </div>
          </Col>
          <Col span={24}>
            <Trans id="Treatment" />
            <div style={{ marginLeft: '16px' }}>
              <MedicationRequest />
            </div>
          </Col>
          <Col span={24}>
            <Trans>
              <span className="title bold">Additional description</span>
            </Trans>
            <div style={{ marginLeft: '16px' }}>
              <AdditionalDesc />
            </div>
          </Col>
          <Col span={24}>
            <Trans id="QuestionnaireResponse" />
            <div style={{ marginLeft: '16px' }}>
              <QuestionnaireResponse />
            </div>
          </Col>
        </Row>

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
