import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import ViewSection from './ViewSection'
import FormSection from './FormSection'

const { TabPane } = Tabs

const HeightWeight = props => {
  const { user } = props.app
  const writeAccess = user.permission.access.write
  const [tabIndex, setTabIndex] = useState('1')
  const [dataSource, setDataSource] = useState([])
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    if (tabIndex === '1') {
      setLoadingData(true)

      props
        .dispatch({
          type: 'practitioner_patient_profile/dlivrReadProcedure',
          payload: {},
        })
        .then(result => {
          return setDataSource(result)
        })
        .finally(() => {
          setLoadingData(false)
        })
    }
  }, [tabIndex])

  const onTabChange = value => {
    setTabIndex(value)
  }

  const title = (
    <Trans>
      <span className="uppercase title">Procedure</span>
    </Trans>
  )

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true}>
        <Tabs type="card" onChange={onTabChange} defaultActiveKey={tabIndex}>
          <TabPane tab={'Үзэх'} key="1">
            <ViewSection dataSource={dataSource} loadingData={loadingData} />
          </TabPane>

          {writeAccess && (
            <TabPane tab={'Нэмэх'} key="2">
              <FormSection />
            </TabPane>
          )}
        </Tabs>
      </BorderCollapse>
    </div>
  )
}

HeightWeight.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(HeightWeight))
