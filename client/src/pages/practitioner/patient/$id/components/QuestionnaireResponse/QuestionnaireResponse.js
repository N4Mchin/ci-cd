import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs, Button, Modal } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { ViewSection } from './'
import { LoadingOutlined } from '@ant-design/icons'

const QuestionnaireResponse = props => {
  const { app, i18n } = props
  const [tabIndex, setTabIndex] = useState('1')

  return (
    <div>
      <BorderCollapse
        displayName={i18n.t`QuestionnaireResponse`}
        bordered={true}
      >
        <div className="card-container">
          <ViewSection />
        </div>
      </BorderCollapse>
    </div>
  )
}

QuestionnaireResponse.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(QuestionnaireResponse))
