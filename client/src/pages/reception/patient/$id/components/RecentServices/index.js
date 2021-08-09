import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Tabs, Row, Typography, Spin } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import {
  DiagnosticTestTable,
  Consultation,
  LaboratoryTests,
} from './components'

import { connect } from 'dva'
import styles from './styles.less'

const { TabPane } = Tabs
const { Text } = Typography

const RecentServices = props => {
  const [selectedTab, setSelectedTab] = useState('LabTests')
  const handleTabChange = value => {
    setSelectedTab(value)
  }

  const { i18n } = props

  return (
    <div className={styles.recent}>
      <div className={styles.recentTitle}>
        <Trans>
          <Text strong>Recent </Text>
          <Text>Services</Text>
        </Trans>
      </div>
      <div className={styles.recentTabs}>
        <Tabs onChange={handleTabChange}>
          <TabPane
            maskClosable={true}
            closable={true}
            tab={
              <span
                className={styles.recentTabsTitle}
              >{i18n.t`LaboratoryTests`}</span>
            }
            key="LabTests"
          >
            {selectedTab === 'LabTests' && (
              <LaboratoryTests selectedTab={selectedTab} />
            )}
          </TabPane>
          <TabPane
            tab={
              <span
                className={styles.recentTabsTitle}
              >{i18n.t`DiagnosticTest`}</span>
            }
            key="DiagnosticTest"
          >
            {selectedTab === 'DiagnosticTest' && (
              <div className={styles.mainContainer}>
                <div
                  style={{
                    overflowY: 'scroll',
                  }}
                >
                  <DiagnosticTestTable selectedTab={selectedTab} />
                </div>
              </div>
            )}
          </TabPane>
          <TabPane
            tab={
              <span
                className={styles.recentTabsTitle}
              >{i18n.t`Physician's consultation`}</span>
            }
            key="PhycisiansConsultation"
          >
            {selectedTab === 'PhycisiansConsultation' && (
              <div className={styles.mainContainer}>
                <div
                  style={{
                    overflowY: 'scroll',
                  }}
                >
                  <Consultation selectedTab={selectedTab} />
                </div>
              </div>
            )}
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

RecentServices.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(RecentServices))
