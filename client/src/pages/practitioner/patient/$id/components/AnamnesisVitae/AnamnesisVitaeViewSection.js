import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import AbuseHabitsView from './AbuseHabits/ViewSection'
import AllergyIntoleranceView from './AllergyIntolerance/ViewSection'
import BriefHistoryOfPatientView from './BriefHistoryOfPatient/ViewSection'
import EpidemiologicalAnamnesisView from './EpidemiologicalAnamnesis/ViewSection'
import FamilyMemberHistoryView from './FamilyMemberHistory/ViewSection'
import HistoryOfClinicalFindView from './HistoryOfClinicalFind/ViewSection'
import ImmunizationView from './Immunization/ViewSection'
import MedicationStatementView from './MedicationStatement/ViewSection'
import ReproductiveHistoryOfFemaleView from './ReproductiveHistoryOfFemale/ViewSection'
import ReproductiveHistoryOfMaleView from './ReproductiveHistoryOfMale/ViewSection'

const AnamnesisVitaeViewSection = props => {
  return (
    <div>
      <BriefHistoryOfPatientView />
      <br />
      <ReproductiveHistoryOfFemaleView />
      <br />
      <ReproductiveHistoryOfMaleView />
      <br />
      <HistoryOfClinicalFindView />
      <br />
      <EpidemiologicalAnamnesisView />
      <br />
      <FamilyMemberHistoryView />
      <br />
      <AllergyIntoleranceView />
      <br />
      <AbuseHabitsView />
      <br />
      <MedicationStatementView />
      <br />
      <ImmunizationView />
    </div>
  )
}

AnamnesisVitaeViewSection.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner, loading }) => ({
  practitioner,
  loading,
}))(AnamnesisVitaeViewSection)
