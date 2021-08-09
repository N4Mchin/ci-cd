import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'

import AnamnesisVitaeFormSection from './AnamnesisVitaeFormSection'
import AnamnesisVitaeViewSection from './AnamnesisVitaeViewSection'

const { TabPane } = Tabs

const AnamnesisVitae = props => {
  const { app, i18n } = props
  const { AnamnesisVitae } = app.FHIR_CODES
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

  // tabindex ашиглах хэрэг гарвал state хэлбэрээр declare хийж өгсөн байгаа
  // энэ хэсэгт хуучин ашиглаж байсан гэхдээ нэг зурагдахдаа
  // хэт их мэдээлэл нэгэн зэрэг ачааллаад байсан

  const onTabChange = value => {
    setTabIndex(value)
  }

  const viewSectionTitle = resolveDisplay(AnamnesisVitae, i18n._language)
  const formSectionTitle = <Trans id={'Anamnesis vitae add'} />

  return (
    <div>
      <BorderCollapse displayName={viewSectionTitle} bordered={true}>
        <div className="card-container">
          <Tabs type="card" onChange={onTabChange} defaultActiveKey={tabIndex}>
            <TabPane tab={viewSectionTitle} key="1">
              <AnamnesisVitaeViewSection />
            </TabPane>

            {props.writeAccess && (
              <TabPane tab={formSectionTitle} key="2">
                <AnamnesisVitaeFormSection />
              </TabPane>
            )}
          </Tabs>
        </div>
      </BorderCollapse>
    </div>
  )
}

AnamnesisVitae.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(AnamnesisVitae))
