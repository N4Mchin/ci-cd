import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'

import ChildPughScoreViewSection from './ChildPughScore/ViewSection'
import ChildPughScoreFormSection from './ChildPughScore/FormSection'
import MeldScoreViewSection from './MeldScore/ViewSection'
import MeldScoreFormSection from './MeldScore/FormSection'
import ReachBFormSectiom from './Reach-B/FormSection'
import ReachBViewsection from './Reach-B/ViewSection'
import CorrectedQTViewSection from './CorrectedQT/ViewSection'
import CorrectedQTFormSection from './CorrectedQT/FormSection'
const { TabPane } = Tabs

const ClinicalScore = props => {
  const { user } = props.app
  const writeAccess = user.permission.access.write
  const [meldTabIndex, setMeldTabIndex] = useState('1')
  const [childPughTabIndex, setChildPughTabIndex] = useState('1')
  const [reachBTabIndex, setReachBTabIndex] = useState('1')
  const [correctiveQTtabIndex, setCorrectiveQTTabIndex] = useState('1')

  const [meldDataSource, setMeldDataSource] = useState([])
  const [childPughDataSource, setChildPughDataSource] = useState([])
  const [reachBDataSource, setReachBDataSource] = useState([])
  const [correctiveQTDataSource, setCorrectiveQTDataSource] = useState([])
  const [loadingMeld, setLoadingMeld] = useState(false)
  const [loadingChildPugh, setLoadingChildPugh] = useState(false)
  const [loadingReachB, setLoadingReachB] = useState(false)
  const [loadingCorrectiveQT, setLoadingCorrectiveQT] = useState(false)

  useEffect(() => {
    if (meldTabIndex === '1') {
      setLoadingMeld(true)

      props
        .dispatch({
          type: 'practitioner_patient_profile/readClinicalScoreMELD',
          payload: {},
        })
        .then(result => {
          console.log(result)
          return setMeldDataSource(result)
        })
        .finally(() => {
          setLoadingMeld(false)
        })
    }
  }, [meldTabIndex])

  useEffect(() => {
    if (childPughTabIndex === '3') {
      setLoadingChildPugh(true)
      props
        .dispatch({
          type: 'practitioner_patient_profile/readClinicalScoreChildPugh',
          payload: {},
        })
        .then(result => {
          console.log(result)
          return setChildPughDataSource(result)
        })
        .finally(() => {
          setLoadingChildPugh(false)
        })
    }
  }, [childPughTabIndex])

  useEffect(() => {
    if (reachBTabIndex === '5') {
      setLoadingReachB(false)
      props
        .dispatch({
          type: 'practitioner_patient_profile/readClinicalScoreReachB',
          payload: {},
        })
        .then(result => {
          console.log(result)
          return setReachBDataSource(result)
        })
        .finally(() => {
          setLoadingReachB(false)
        })
    }
  }, [reachBTabIndex])

  useEffect(() => {
    if (correctiveQTtabIndex === '7') {
      setLoadingCorrectiveQT(false)
      props
        .dispatch({
          type: 'practitioner_patient_profile/readClinicalScoreCorrectedQT',
          payload: {},
        })
        .then(result => {
          console.log(result)
          return setCorrectiveQTDataSource(result)
        })
        .finally(() => {
          setLoadingCorrectiveQT(false)
        })
    }
  }, [correctiveQTtabIndex])

  const onMeldTabChange = value => {
    setMeldTabIndex(value)
  }

  const onChildPughChange = value => {
    setChildPughTabIndex(value)
  }

  const onReachBChange = value => {
    setReachBTabIndex(value)
  }

  const onCorrectiveQTChange = value => {
    setCorrectiveQTTabIndex(value)
  }

  const title = (
    <Trans>
      <span className="uppercase title">Child Pugh Score</span>
    </Trans>
  )
  const titleMeldScore = (
    <Trans>
      <span className="uppercase title">Meld Score</span>
    </Trans>
  )

  const titleReachBScore = (
    <Trans>
      <span className="uppercase title">Reach-B</span>
    </Trans>
  )

  const titleCorrectedIntervalScore = (
    <Trans>
      <span className="uppercase title">
        Corrected QT Interval (QTc) - Framingham
      </span>
    </Trans>
  )
  return (
    <div>
      <BorderCollapse displayName={titleMeldScore} bordered={true}>
        <Tabs
          type="card"
          onChange={onMeldTabChange}
          defaultActiveKey={meldTabIndex}
        >
          <TabPane tab={<Trans id="View" />} key="1">
            <MeldScoreViewSection
              dataSource={meldDataSource}
              loadingData={loadingMeld}
            />
          </TabPane>

          {writeAccess && (
            <TabPane tab={<Trans id="Add" />} key="2">
              <MeldScoreFormSection />
            </TabPane>
          )}
        </Tabs>
      </BorderCollapse>
      <br />

      <BorderCollapse displayName={title} bordered={true}>
        <Tabs
          type="card"
          onChange={onChildPughChange}
          defaultActiveKey={childPughTabIndex}
        >
          <TabPane tab={<Trans id="View" />} key="3">
            <ChildPughScoreViewSection
              dataSource={childPughDataSource}
              loadingData={loadingChildPugh}
            />
          </TabPane>

          {writeAccess && (
            <TabPane tab={<Trans id="Add" />} key="4">
              <ChildPughScoreFormSection />
            </TabPane>
          )}
        </Tabs>
      </BorderCollapse>
      <br />

      {/* <BorderCollapse displayName={titleReachBScore} bordered={true}>
        <Tabs
          type="card"
          onChange={onReachBChange}
          defaultActiveKey={reachBTabIndex}
        >
          <TabPane tab={<Trans id="View" />} key="5">
            <ReachBViewsection
              dataSource={reachBDataSource}
              loadingData={loadingReachB}
            />
          </TabPane>

          {writeAccess && (
            <TabPane tab={<Trans id="Add" />} key="6">
              <ReachBFormSectiom />
            </TabPane>
          )}
        </Tabs>
      </BorderCollapse>
      <br /> */}

      <BorderCollapse displayName={titleCorrectedIntervalScore} bordered={true}>
        <Tabs
          type="card"
          onChange={onCorrectiveQTChange}
          defaultActiveKey={correctiveQTtabIndex}
        >
          <TabPane tab={<Trans id="View" />} key="7">
            <CorrectedQTViewSection
              dataSource={correctiveQTDataSource}
              loadingData={loadingCorrectiveQT}
            />
          </TabPane>

          {writeAccess && (
            <TabPane tab={<Trans id="Add" />} key="8">
              <CorrectedQTFormSection />
            </TabPane>
          )}
        </Tabs>
      </BorderCollapse>
    </div>
  )
}

ClinicalScore.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(ClinicalScore))
