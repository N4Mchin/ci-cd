import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Board } from 'components'

import { Tabs, Button } from 'antd'

import SubTestPage from './SubTestPage'

const { TabPane } = Tabs

const Title = (
  <div
    style={{
      textTransform: 'uppercase',
      width: '100%',
      paddingRight: '5px',
    }}
  >
    <span className="bold ">Viral Load</span>
    {' | '}
    <Trans>
      <span className="bold">Test </span>
      <span>Order List</span>
    </Trans>
    <div style={{ height: '1px', background: '#E5E5E9' }} />
  </div>
)

const TabTitle = name => (
  <div style={{ width: '52px', textAlign: 'center' }}>{name}</div>
)

const ViralLoadTest = props => {
  const { pathname } = props.location

  const [selectedTab, setSelectedTab] = useState('HCV_RNA')

  const operations = (
    <Button
      type="primary"
      onClick={() => {
        window.localStorage.setItem('selectedViralLoadTest', selectedTab)

        router.push({
          pathname: pathname + '/dailyLog',
        })
      }}
    >
      <Trans id="DailyLog" />
    </Button>
  )

  const onTabChange = key => {
    setSelectedTab(key)
  }

  return (
    <Board inner>
      {Title}

      <Tabs
        defaultActiveKey="1"
        onChange={onTabChange}
        tabBarExtraContent={operations}
        animated={true}
      >
        <TabPane tab={TabTitle('HCV-RNA')} key="HCV_RNA"></TabPane>
        <TabPane tab={TabTitle('HBV-DNA')} key="HBV_DNA"></TabPane>
        <TabPane tab={TabTitle('HDV-RNA')} key="HDV_RNA"></TabPane>
        <TabPane tab={TabTitle('HIV-RNA')} key="HIV_RNA"></TabPane>
        <TabPane tab={TabTitle('HPV')} key="HPV"></TabPane>
      </Tabs>

      <SubTestPage labTestName={selectedTab} />
    </Board>
  )
}

ViralLoadTest.propTypes = {
  laboratory_test_viralLoadTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_viralLoadTests, loading }) => ({
  laboratory_test_viralLoadTests,
  loading,
}))(withI18n()(ViralLoadTest))
