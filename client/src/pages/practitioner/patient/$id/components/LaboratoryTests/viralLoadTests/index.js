import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Tabs } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import ViewSection from './SubTestViralLoad/ViewSection'
import FormModal from './SubTestViralLoad/FormModal'

const { TabPane } = Tabs

const ViralLoadTests = props => {
  const { ViralLoadTests } = props.app.FHIR_CODES.UncategorizedTests

  // const [dataSource, setDataSource] = useState([])
  // const [fetchingData, setFetchingData] = useState(false)
  const [formModalVisible, setFormModalVisible] = useState(false)

  const [selectedTab, setSelectedTab] = useState('HCV_RNA')

  const [fetchingData, setFetchingData] = useState(false)
  const [dataSource, setDataSource] = useState([])

  async function refresh() {
    setFetchingData(true)
    return (
      props
        .dispatch({
          type: 'app/queryLaboratoryTestLevel0',
          payload: {
            testKey: selectedTab,
            testCode:
              props.app.FHIR_CODES.UncategorizedTests.ViralLoadTests.include[
                selectedTab
              ],
          },
        })
        .then(result => {
          console.log(result)
          if (!!result) {
            setDataSource(result)
          } else {
            setDataSource([])
          }
          return
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => {
          setFetchingData(false)
        })
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab])

  // useEffect(() => {
  //   // refresh()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const handleSubmit = () => {
    setFormModalVisible(false)
    refresh()
    return props.dispatch({
      type: 'practitioner_patient_profile/showModalMessage',
      payload: {
        type: 'success',
        content: props.i18n.t`Save successful`,
      },
    })
    // .then(() => {
    //   return refresh()
    // })
  }

  const handleError = errorInfo => {
    return props.dispatch({
      type: 'practitioner_patient_profile/showModalMessage',
      payload: {
        type: 'error',
        content: props.i18n.t`Save failed`,
      },
    })
  }

  const TabTitle = name => (
    <div style={{ width: '52px', textAlign: 'center' }}>{name}</div>
  )
  const onTabChange = event => {
    setSelectedTab(event)
  }

  return (
    <div>
      {/* <Row type="flex" justify="end" style={{ marginBottom: '16px' }}>
        <Button
          onClick={() => setFormModalVisible(true)}
          className="button-red uppercase"
        >
          <Trans id="Result Entry" />
        </Button>
      </Row> */}
      <Tabs
        defaultActiveKey={selectedTab}
        onChange={onTabChange}
        tabBarExtraContent={
          props.writeAccess && [
            <Button
              onClick={() => setFormModalVisible(true)}
              className="button-red uppercase"
            >
              <Trans id="Result Entry" />
            </Button>,
          ]
        }
        animated={true}
      >
        <TabPane tab={TabTitle('HCV-RNA')} key="HCV_RNA"></TabPane>
        <TabPane tab={TabTitle('HBV-DNA')} key="HBV_DNA"></TabPane>
        <TabPane tab={TabTitle('HDV-RNA')} key="HDV_RNA"></TabPane>
        <TabPane tab={TabTitle('HIV-RNA')} key="HIV_RNA"></TabPane>
        <TabPane tab={TabTitle('HPV')} key="HPV"></TabPane>
      </Tabs>
      {/* <SubTestViralLoad
        dataSource={dataSource}
        fetchingData={fetchingData}
        selectedTab={selectedTab}
        writeAccess={props.writeAccess}
      /> */}

      <ViewSection
        selectedTab={selectedTab}
        dataSource={dataSource}
        fetchingData={fetchingData}
      />

      {formModalVisible && (
        <FormModal
          selectedTab={selectedTab}
          visible={formModalVisible}
          onCancel={() => setFormModalVisible(false)}
          onSubmit={handleSubmit}
          onError={handleError}
        />
      )}

      {/* <SubTestPage labTestName={selectedTab} /> */}
      {/* <ViewSection dataSource={dataSource} loading={fetchingData} /> */}
    </div>
  )
}

ViralLoadTests.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(ViralLoadTests)))
