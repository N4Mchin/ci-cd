import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { ViewSection, FormSection } from './'

const { TabPane } = Tabs

const Complaint = props => {
  const { i18n, app } = props

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

  const borderTitle = (
    <Trans>
      <span className="title bold">Complaint</span>
    </Trans>
  )

  const viewSectionTitle = i18n.t`Complaint`
  const formSectionTitle = i18n.t`Add complaint`

  return (
    <div>
      <BorderCollapse displayName={borderTitle} bordered={true}>
        <Tabs type="card" onChange={onTabChange} defaultActiveKey={tabIndex}>
          <TabPane tab={viewSectionTitle} key="1">
            <ViewSection />
          </TabPane>

          {props.writeAccess && (
            <TabPane tab={formSectionTitle} key="2">
              <FormSection />
            </TabPane>
          )}
        </Tabs>
      </BorderCollapse>
    </div>
  )
}

Complaint.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ practitioner_patient_profile, loading }) => ({
  practitioner_patient_profile,
  loading,
}))(withI18n()(Complaint))
