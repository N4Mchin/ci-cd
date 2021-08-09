import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs, Button, Modal } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { FormSection, ViewSection } from './'
import Prescription from './Prescription'

const { TabPane } = Tabs

const MedicationRequest = props => {
  const { app, i18n } = props
  const [tabIndex, setTabIndex] = useState('1')
  const tableProps = {
    //rowClassName: record => styles[record.status],
    // loading: loading.effects['reception/query'],
    // pagination,
    // onChange(page) {
    //   handleRefresh({
    //     page: page.current,
    //     pageSize: page.pageSize,
    //   })
    // }
  }

  const onTabChange = value => {
    setTabIndex(value)
  }

  const title = <Trans id="Treatment" />

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true}>
        <div className="card-container">
          <Tabs type="card" onChange={onTabChange}>
            <TabPane tab={i18n.t`Treatment`} key="1">
              <ViewSection />
            </TabPane>

            {props.writeAccess && (
              <TabPane tab={i18n.t`Treatment add`} key="2">
                <FormSection />
              </TabPane>
            )}

            {props.writeAccess && (
              <TabPane tab={i18n.t`E_prescription`} key="3">
                <Prescription />
              </TabPane>
            )}
          </Tabs>
        </div>
      </BorderCollapse>
    </div>
  )
}

MedicationRequest.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(MedicationRequest))
