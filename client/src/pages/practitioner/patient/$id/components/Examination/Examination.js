import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { BorderCollapse } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Tabs } from 'antd'

import ViewSection from './ExaminationViewSection'
import FormSection from './BriefGeneralExaminationFormSection'
import AdditionalFormSection from './PhysicalExaminationFormSection'

const { TabPane } = Tabs

const Examination = props => {
  const { app, i18n } = props

  const title = <Trans id={'Examination'} />

  // console.log(props.writeAccess)
  return (
    <div>
      <BorderCollapse displayName={title} bordered={true}>
        <div className="card-container">
          <Tabs type="card" defaultActiveKey="1">
            <TabPane tab={i18n.t`Examination note`} key="1">
              <ViewSection />
            </TabPane>
            {props.writeAccess && (
              <TabPane tab={i18n.t`Brief general examination`} key="2">
                <FormSection />
              </TabPane>
            )}

            {props.writeAccess && (
              <TabPane tab={i18n.t`Detailed examination`} key="3">
                <AdditionalFormSection />
              </TabPane>
            )}
          </Tabs>
        </div>
      </BorderCollapse>
    </div>
  )
}

Examination.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Examination))
