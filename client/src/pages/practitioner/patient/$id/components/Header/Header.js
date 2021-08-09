import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Divider, Row, Input, Form } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { ModuleBox } from 'components'
import {
  MedicationTable,
  SavedPrescriptionTable,
  AbuseHabitsTable,
  VitalSignsFindingGraph,
  PatientInformation,
  AllergyIntoleranceTable,
  BodyMassIndexTable,
} from './'
import classnames from 'classnames'
import styles from '../../styles.less'
import CheckList from './Dlivr/CheckList/checkList'

const dlivrStatusDisplay = {
  dlivrGroupExcluded: 'Excluded',
  dlivrGroupPreScreening: 'Pre-Screening',
  dlivrGroupScreening: 'Screening',
  dlivrGroupTreatment: 'Treatment',
  dlivrGroupPostTreatment: 'Post-treatment',
}

const Header = props => {
  const { practitioner_patient_profile } = props
  const { patient } = practitioner_patient_profile
  const [windowWidth, setWindowWidth] = useState()
  const { dlivrStatus } = practitioner_patient_profile

  const handleResizeWindow = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow)
  }, [])

  return (
    <div>
      {/* <div style={{ display: 'flex', fontSize: '14px' }}>
        <div style={{ flexGrow: 4, minWidth: '250px', padding: '4px' }}>
          <Trans>
            <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Patient </span>
            <span>information</span>
          </Trans>
        </div>
        <div style={{ flexGrow: 6, maxWidth: '800px', padding: '4px' }}>
          <Trans>
            <span className="bold">Vital </span>
            <span>signs</span>
          </Trans>
        </div>
        <div style={{ flexGrow: 1, minWidth: '200px', padding: '4px' }}>
          <Trans>
            <span className="bold">Vital </span>
            <span>signs</span>
          </Trans>
        </div>
      </div> */}

      {/* <div style={{ borderBottom: '1px solid #E9E9E9' }}></div> */}

      {/* <Row>
        <Col
          sm={{ span: 14, order: 1 }}
          md={{ span: 12, order: 1 }}
          lg={{ span: 12, order: 1 }}
          xl={{ span: 8, order: 1 }}
        >
          <PatientInformation />
        </Col>

        <Col
          sm={{ span: 8, order: 2 }}
          md={{ span: 12, order: 2 }}
          lg={{ span: 12, order: 2 }}
          xl={{ span: 4, order: 3 }}
        >
          <VitalSignsFindingGraph />
        </Col>
        <Col
          sm={{ span: 24, order: 3 }}
          md={{ span: 24, order: 3 }}
          lg={{ span: 24, order: 3 }}
          xl={{ span: 12, order: 2 }}
        >
          <BodyMassIndexTable />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={6}>
          <PatientInformation />
        </Col>
        <Col span={12}>
          <VitalSignsFindingGraph />
        </Col>
        <Col span={6}>
          <BodyMassIndexTable />
        </Col>
      </Row> */}
      <div
        // style={{ display: 'flex', backgroundColor: '#555' }}
        className={styles.headerContainer}
      >
        <div className={styles.headerItem}>
          <PatientInformation writeAccess={props.writeAccess} />
        </div>

        <div className={classnames(styles.headerItem, styles.middle)}>
          <VitalSignsFindingGraph />
        </div>
        <div
          style={{ flexGrow: '1', flexShrink: '1' }}
          className={styles.headerItem}
        >
          <BodyMassIndexTable />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '18px',
        }}
      >
        <div style={{ flexGrow: 1.6, padding: '6px' }}></div>
        <div style={{ flexGrow: 1, padding: '6px' }}></div>
        <div style={{ flexGrow: 1, padding: '6px' }}></div>
      </div>

      {/* D-LIVR Status*/}
      <div>
        {dlivrStatus && (
          <ModuleBox
            title={<span className="title bold">D-LIVR</span>}
            style={{ marginBottom: '16px', textTransform: 'uppercase' }}
          >
            status:{' '}
            <span className="title bold">
              {dlivrStatusDisplay[dlivrStatus]}
            </span>
            <Divider />
            <CheckList />
            {/* <OtherFields /> */}
            {/* <HeightWeight /> */}
            {/* <br />
            <ChildPugh />
            <br />
            <Procedure /> */}
          </ModuleBox>
        )}
      </div>

      <Row gutter={8}>
        <Col sm={8} md={8} ld={8} xl={8}>
          <Trans>
            <span
              className="bold"
              style={{
                fontSize: '14px',
              }}
            >
              Allergy
            </span>
          </Trans>
          <div style={{ borderBottom: '1px solid #E9E9E9' }} />
          <br />

          <AllergyIntoleranceTable />
        </Col>
        <Col sm={8} md={8} ld={8} xl={8}>
          <Trans>
            <span
              className="bold"
              style={{
                fontSize: '14px',
              }}
            >
              List of medications
            </span>
          </Trans>
          <div style={{ borderBottom: '1px solid #E9E9E9' }} />
          <br />

          <MedicationTable />
        </Col>
        <Col sm={8} md={8} ld={8} xl={8}>
          <Trans>
            <span
              className="bold"
              style={{
                fontSize: '14px',
              }}
            >
              Hepatotoxic drugs / Alcohol use
            </span>
          </Trans>
          <div style={{ borderBottom: '1px solid #E9E9E9' }} />
          <br />

          <AbuseHabitsTable />
        </Col>
      </Row>
      <Row gutter={8}>
        <Col sm={24} md={24} ld={24} xl={24}>
          <Trans>
            <span
              className="bold"
              style={{
                fontSize: '14px',
              }}
            >
              E Prescription
            </span>
          </Trans>
          <div style={{ borderBottom: '1px solid #E9E9E9' }} />
          <br />

          <SavedPrescriptionTable patient={patient} />
        </Col>
      </Row>
    </div>
  )
}

Header.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(Header))
