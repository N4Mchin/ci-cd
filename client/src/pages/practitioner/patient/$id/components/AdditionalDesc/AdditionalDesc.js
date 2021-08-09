import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { ViewSection, FormSection } from './'

const Complaint = props => {
  const { TabPane } = Tabs
  const { i18n } = props

  const [tabIndex, setTabIndex] = useState('1')

  const onTabChange = value => {
    setTabIndex(value)
  }

  const handleSubmit = values => {
    return props
      .dispatch({
        type: 'practitioner_patient_profile/saveProviderCommentReport',
        payload: {
          formValues: values,
        },
      })
      .then(() => {
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
  }

  const handleError = errorInfo => {
    let type
    let content

    if (errorInfo === 'info') {
      type = 'info'
      content = i18n.t`FileTypeIsIncorrect`
    } else {
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
  }

  const FormSectionProps = {
    handleSubmit: handleSubmit,
    handleError: handleError,
  }

  const borderTitle = (
    <Trans>
      <span className="title bold">Additional description</span>
    </Trans>
  )

  const viewSectionTitle = i18n.t`View`
  const formSectionTitle = i18n.t`Add`

  return (
    <div>
      <BorderCollapse displayName={borderTitle} bordered={true}>
        <Tabs type="card" onChange={onTabChange} defaultActiveKey={tabIndex}>
          <TabPane tab={viewSectionTitle} key="1">
            {tabIndex === '1' && <ViewSection />}
          </TabPane>

          {props.writeAccess && (
            <TabPane tab={formSectionTitle} key="2">
              <FormSection {...FormSectionProps} />
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
