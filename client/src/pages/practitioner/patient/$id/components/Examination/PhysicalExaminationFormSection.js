import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { Button, Row, Col } from 'antd'

import VitalSignsFindingAdditionalForm from './VitalSignsFinding/AdditionalFormSection'
import HeightWeightForm from './BodyMassIndex/AdditionalFormSection'
import GeneralPhysicalFindingAdditionalForm from './GeneralPhysicalFinding/AdditionalFormSection'
import PhysicalFindingsOfGastrointestinalSystemForm from './PhysicalFindingsOfGastrointestinalSystem/AdditionalFormSection'
import PhysicalFindingsOfNervousSystemForm from './PhysicalFindingsOfNervousSystem/FormSection'
import PhysicalFindingsOfRespiratorySystemForm from './PhysicalFindingsOfRespiratorySystem/FormSection'
import PhysicalFindingsOfCardiovascularSystemForm from './PhysicalFindingsOfCardiovascularSystem/FormSection'
import PhysicalFindingsOfGenitourinaryTractAdditionalForm from './PhysicalFindingsOfGenitourinaryTract/AdditionalFormSection'
import PhysicalFindingsSensationForm from './PhysicalFindingsSensation/FormSection'

const PhysicalExaminationFormSection = props => {
  const { i18n } = props

  const [loadingData, setLoadingData] = useState(false)

  const onSave = () => {
    setLoadingData(true)

    return props
      .dispatch({
        type: 'practitioner_patient_profile/physicalExaminationSave',
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

        return props.dispatch({
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
      <VitalSignsFindingAdditionalForm />
      <HeightWeightForm />
      <GeneralPhysicalFindingAdditionalForm />
      <PhysicalFindingsOfGastrointestinalSystemForm />
      <PhysicalFindingsOfGenitourinaryTractAdditionalForm />
      <PhysicalFindingsOfNervousSystemForm />
      <PhysicalFindingsOfRespiratorySystemForm />
      <PhysicalFindingsOfCardiovascularSystemForm />
      <PhysicalFindingsSensationForm />

      <Row style={{ marginTop: '10px' }} type="flex" justify="end" gutter={8}>
        <Col>
          <Button className="button-gray" htmlType="reset">
            <Trans id={'Cancel'} />
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            loading={loadingData}
            onClick={onSave}
          >
            <Trans id={'Save'} />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

PhysicalExaminationFormSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(PhysicalExaminationFormSection))
