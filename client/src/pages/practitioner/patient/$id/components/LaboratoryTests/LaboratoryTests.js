import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Typography, Form, Input, Col, List, Tabs } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { BorderCollapse } from 'components'
import styles from './../../styles.less'

import RapidTests from './rapidTests/index'
import ViralLoadTests from './viralLoadTests/index'
import Biochemistry from './biochemistry/index'
import Hematology from './hematology/index'
import Immunology from './immunology/index'
import Coagulogram from './coagulogram/index'
import AntiHDV from './antiHDV/index'
import IronExchange from './ironExchange/index'
import VitaminD3 from './vitaminD3/index'
import DiagnosticStudy from './DiagnosticStudy'
import Genotype from './Genotype'
import Urinalysis from './Urinalysis'
import Ferritin from './Ferritin/index'

const { TabPane } = Tabs

const LaboratoryTests = props => {
  const { form, i18n } = props
  const [tabIndex, setTabIndex] = useState('1')

  const title = <Trans id={'Analysis'} />

  const onTabChange = value => {
    setTabIndex(value)
  }

  return (
    <div>
      <BorderCollapse displayName={title} bordered={true}>
        <Form>
          <div style={{ borderTop: '1px solid #E9E9E9' }}></div>
          <div className="card-container">
            <Tabs
              type="card"
              onChange={onTabChange}
              defaultActiveKey={tabIndex}
            >
              <TabPane tab="Rapid Tests" key="1">
                {tabIndex === '1' && (
                  <RapidTests writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Viral Load Tests" key="2">
                {tabIndex === '2' && (
                  <ViralLoadTests writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Biochemistry" key="3">
                {tabIndex === '3' && (
                  <Biochemistry writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Hematology" key="4">
                {tabIndex === '4' && (
                  <Hematology writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Coagulogram" key="5">
                {tabIndex === '5' && (
                  <Coagulogram writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Immunology" key="6">
                {tabIndex === '6' && <Immunology />}
              </TabPane>
              <TabPane tab="Anti-HDV" key="7">
                {tabIndex === '7' && (
                  <AntiHDV writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Iron Exchange" key="8">
                {tabIndex === '8' && (
                  <IronExchange writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Vitamin D3" key="9">
                {tabIndex === '9' && (
                  <VitaminD3 writeAccess={props.writeAccess} />
                )}
              </TabPane>
              <TabPane tab="Ferritin" key="10">
                {tabIndex === '10' && (
                  <Ferritin writeAccess={props.writeAccess} />
                )}
              </TabPane>

              {/*{tabIndex === "8" &&<TabPane tab="Fibroscan" key="11">
                <Fibroscan />
              </TabPane>}
              {tabIndex === "9" &&<TabPane tab="Diagnostic study" key="12">
                <DiagnosticStudy />
              </TabPane>}
              {tabIndex === "10" &&<TabPane tab="Urinalysis" key="13">
                <Urinalysis />
              </TabPane>}
              {tabIndex === "11" &&<TabPane tab="Genotype" key="14"> 
                <Genotype />
              </TabPane> */}
            </Tabs>
          </div>
        </Form>
      </BorderCollapse>
    </div>
  )
}

LaboratoryTests.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(LaboratoryTests)))
