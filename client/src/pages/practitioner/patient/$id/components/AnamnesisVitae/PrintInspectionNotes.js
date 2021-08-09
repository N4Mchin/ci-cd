import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'

import HistoryOfClinicalFind from './HistoryOfClinicalFind/PrintInspectionNote'
import AbuseHabits from './AbuseHabits/PrintInspectionNote'
import FamilyMemberHistory from './FamilyMemberHistory/PrintInspectionNote'
import MedicationStatement from './MedicationStatement/PrintInspectionNote'
import AllergyIntolerance from './AllergyIntolerance/PrintInspectionNote'

const PrintInspectionNotes = props => {
  return (
    <div>
      <HistoryOfClinicalFind />
      <AbuseHabits />
      <FamilyMemberHistory />
      <MedicationStatement />
      <AllergyIntolerance />
    </div>
  )
}

PrintInspectionNotes.propTypes = {
  testKey: PropTypes.string,
  testCode: PropTypes.object,
  serviceRequestId: PropTypes.string,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(PrintInspectionNotes))
