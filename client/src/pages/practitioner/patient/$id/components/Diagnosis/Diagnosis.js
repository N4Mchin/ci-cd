import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { ViewSection, FormSection, ClinicalScore } from './'

const { TabPane } = Tabs

const Diagnosis = props => {
  const { i18n } = props

  const [tabIndex, setTabIndex] = useState('1')

  const onTabChange = value => {
    setTabIndex(value)
  }

  const borderTitle = (
    <Trans>
      <span className="title bold">Diagnose</span>
    </Trans>
  )

  const viewSectionTitle = i18n.t`Diagnose`
  const formSectionTitle = i18n.t`Diagnosis add`

  const clinicalScoreSectionTitle = (
    <span className="uppercase title">
      <Trans id={'Clinical score'} />
    </span>
  )

  return (
    <div>
      <BorderCollapse displayName={borderTitle} bordered={true}>
        <Tabs type="card" onChange={onTabChange} defaultActiveKey={tabIndex}>
          <TabPane tab={viewSectionTitle} key="1">
            {tabIndex === '1' && 
              <ViewSection />
            }
          </TabPane>

          {props.writeAccess && (
            <TabPane tab={formSectionTitle} key="2">
              {tabIndex === '2' && 
                <FormSection />
              }
            </TabPane>
          )}

          <TabPane tab={clinicalScoreSectionTitle} key="3">
            {tabIndex === '3' && 
              <ClinicalScore />
            }
          </TabPane>
        </Tabs>
      </BorderCollapse>
    </div>
  )
}

Diagnosis.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(Diagnosis))
