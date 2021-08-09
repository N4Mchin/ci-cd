import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { Button, Row, Col } from 'antd'

import VitalSignsFindingForm from './VitalSignsFinding/FormSection'
import HeightWeightForm from './BodyMassIndex/FormSection'
import GeneralPhysicalFindingForm from './GeneralPhysicalFinding/FormSection'
import PhysicalFindingsOfGenitourinaryTractForm from './PhysicalFindingsOfGenitourinaryTract/FormSection'
import PhysicalFindingsOfGastrointestinalSystemForm from './PhysicalFindingsOfGastrointestinalSystem/FormSection'

const BriefGeneralExaminationFormSection = props => {
  const { i18n } = props

  const [loadingData, setLoadingData] = useState(false)

  const onSave = () => {
    setLoadingData(true)

    props
      .dispatch({
        type: 'practitioner_patient_profile/briefGeneralExaminationSave',
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
      <VitalSignsFindingForm />
      <HeightWeightForm />
      <GeneralPhysicalFindingForm />
      <PhysicalFindingsOfGastrointestinalSystemForm />
      <PhysicalFindingsOfGenitourinaryTractForm />

      <Row style={{ marginTop: '10px' }} type="flex" justify="end" gutter={8}>
        <Col>
          <Button className="button-gray" htmlType="reset">
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

BriefGeneralExaminationFormSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(BriefGeneralExaminationFormSection))
