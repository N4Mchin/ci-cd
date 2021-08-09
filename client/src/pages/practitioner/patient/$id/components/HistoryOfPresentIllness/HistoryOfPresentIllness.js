import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { ViewSection, FormSection } from './'

const { TabPane } = Tabs

const HistoryOfPresentIllness = props => {
  const { i18n } = props

  const [tabIndex, setTabIndex] = useState('1')

  const onTabChange = value => {
    setTabIndex(value)
  }

  const title = (
    <Trans>
      <span className="title uppercase bold">History of present illness</span>
    </Trans>
  )

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true}>
        <Tabs type="card" onChange={onTabChange} defaultActiveKey={tabIndex}>
          <TabPane tab={i18n.t`History of present illness`} key="1">
            <ViewSection />
          </TabPane>

          {props.writeAccess && (
            <TabPane tab={i18n.t`Add history of present illness`} key="2">
              <FormSection />
            </TabPane>
          )}
        </Tabs>
      </BorderCollapse>
    </div>
  )
}

HistoryOfPresentIllness.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(HistoryOfPresentIllness))
