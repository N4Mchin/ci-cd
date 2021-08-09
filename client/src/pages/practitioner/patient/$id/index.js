import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Board, MessageModal } from 'components'
import styles from './styles.less'
import Header from './components/Header/Header'
import { Complaint } from './components/Complaint'
import { Diagnosis } from './components/Diagnosis'
import { Examination } from './components/Examination'
import { AnamnesisVitae } from './components/AnamnesisVitae'
import { LaboratoryTests } from './components/LaboratoryTests'
import DiagnosticTests from './components/DiagnosticTests'
import { MedicationRequest } from './components/MedicationRequest'
import { QuestionnaireResponse } from './components/QuestionnaireResponse'
import DiagnosisViewSection from './components/Diagnosis/HeaderViewSection'
import { HistoryOfPresentIllness } from './components/HistoryOfPresentIllness'
import PrintInspectionNotes from './components/PrintInspectionNotes'
import PrintAllInfo from './components/PrintAllInfo'
import { AdditionalDesc } from './components/AdditionalDesc'

const Patient = props => {
  const { i18n, practitioner_patient_profile } = props
  const {
    modalMessageVisible,
    modalMessageType,
    modalMessageContent,
    modalMessageChildren,
  } = practitioner_patient_profile

  const [showInspectionNotesDrawer, setShowInspectionNotesDrawer] = useState(
    false
  )
  const [allInfoDrawerVisible, setAllInfoDrawerVisible] = useState(false)

  const handleInspectionNotes = () => {
    setShowInspectionNotesDrawer(true)
  }

  const handlePrintAllClick = () => {
    setAllInfoDrawerVisible(true)
  }

  const { user } = props.app
  const writeAccess = user.permission.access.write

  useEffect(() => {
    return () => {
      const emptyState = {}

      Object.keys(practitioner_patient_profile).forEach(key => {
        emptyState[key] = undefined
      })

      props.dispatch({
        type: 'practitioner_patient_profile/updateState',
        payload: {
          ...emptyState,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Board inner>
      <Header writeAccess={writeAccess} />
      <br />
      {writeAccess && <DiagnosisViewSection />}
      <br />
      <Complaint writeAccess={writeAccess} />
      <br />
      <HistoryOfPresentIllness writeAccess={writeAccess} />
      <br />
      <AnamnesisVitae writeAccess={writeAccess} />
      <br />
      <Examination writeAccess={writeAccess} />
      <br />
      <LaboratoryTests writeAccess={writeAccess} />
      <br />
      <DiagnosticTests writeAccess={writeAccess} />
      <br />
      <Diagnosis writeAccess={writeAccess} />
      <br />
      <MedicationRequest writeAccess={writeAccess} props={props} />
      <br />
      <AdditionalDesc writeAccess={writeAccess} />
      <br />
      <QuestionnaireResponse writeAccess={writeAccess} />
      <br />

      {/* <TimeOfSet />
      <br /> */}
      {writeAccess && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            className={styles.inspectionNote}
            onClick={handleInspectionNotes}
            type="primary"
          >
            <Trans id={'Print inspection notes'}> </Trans>
          </Button>
          <PrintInspectionNotes
            visible={showInspectionNotesDrawer}
            setVisible={setShowInspectionNotesDrawer}
          />
        </div>
      )}
      {writeAccess && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            className={styles.inspectionNote}
            onClick={handlePrintAllClick}
            type="primary"
          >
            <Trans id={'Print all'} />
          </Button>
          <PrintAllInfo
            visible={allInfoDrawerVisible}
            setVisible={setAllInfoDrawerVisible}
          />
        </div>
      )}
      <MessageModal
        type={modalMessageType}
        visible={modalMessageVisible}
        onCancel={() =>
          props.dispatch({
            type: 'practitioner_patient_profile/hideModalMessage',
          })
        }
        content={modalMessageContent}
      >
        {modalMessageChildren}
      </MessageModal>
    </Board>
  )
}

Patient.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Patient))
