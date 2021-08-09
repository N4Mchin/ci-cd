import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { Button, Row, Col } from 'antd'
import AbuseHabitsForm from './AbuseHabits/FormSection'
import AllergyIntoleranceForm from './AllergyIntolerance/FormSection'
import BriefHistoryOfPatientForm from './BriefHistoryOfPatient/FormSection'
import EpidemiologicalAnamnesisForm from './EpidemiologicalAnamnesis/FormSection'
import FamilyMemberHistoryForm from './FamilyMemberHistory/FormSection'
import HistoryOfClinicalFindForm from './HistoryOfClinicalFind/FormSection'
import ImmunizationForm from './Immunization/FormSection'
import MedicationStatementForm from './MedicationStatement/FormSection'
import ReproductiveHistoryOfFemaleForm from './ReproductiveHistoryOfFemale/FormSection'
import ReproductiveHistoryOfMaleForm from './ReproductiveHistoryOfMale/FormSection'

const AnamnesisVitaeFormSection = props => {
  const { i18n } = props

  const [loadingData, setLoadingData] = useState()

  const onSave = () => {
    setLoadingData(true)

    props
      .dispatch({
        type: 'practitioner_patient_profile/anamnesisVitaeAdd',
      })
      .then(result => {
        let type
        let content

        if (result === 'success') {
          type = 'success'
          content = i18n.t`Save successful`
        } else if (result === 'info') {
          type = 'info'
          content = i18n.t`Please fill the form completely`
        } else if (result === 'error') {
          type = 'error'
          content = i18n.t`Save failed`
        }

        props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: type,
            content: content,
          },
        })
      })
      .finally(() => setLoadingData(false))
  }

  return (
    <div>
      <BriefHistoryOfPatientForm />
      <br />
      <ReproductiveHistoryOfFemaleForm />
      <br />
      <ReproductiveHistoryOfMaleForm />
      <br />
      <HistoryOfClinicalFindForm />
      <br />
      <EpidemiologicalAnamnesisForm />
      <br />
      <FamilyMemberHistoryForm />
      <br />
      <AllergyIntoleranceForm />
      <br />
      <AbuseHabitsForm />
      <br />
      <MedicationStatementForm />
      <br />
      <ImmunizationForm />

      <Row style={{ marginTop: '10px' }} type="flex" justify="end" gutter={8}>
        <Col>
          <Button className="button-gray">
            <Trans id={'Cancel'} />
          </Button>
        </Col>
        <Col>
          <Button
            htmlType="submit"
            type="primary"
            onClick={onSave}
            loading={loadingData}
          >
            <Trans id={'Save'} />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

AnamnesisVitaeFormSection.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner, loading }) => ({
  app,
  practitioner,
  loading,
}))(withI18n()(AnamnesisVitaeFormSection))
