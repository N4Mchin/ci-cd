import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import ViewSection from './ViewSection'
import FormModal from './FormModal'

const Hematology = props => {
  const { FHIR_CODES } = props.app
  const { IronExchange } = FHIR_CODES.UncategorizedTests

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const [dataSource, setDataSource] = useState([])

  async function refresh() {
    setFetchingData(true)
    return (
      props
        .dispatch({
          type: 'app/queryLaboratoryTestLevel1',
          payload: {
            testKey: 'IronExchange',
            testCode: IronExchange,
          },
        })
        .then(hematologyTestResult => {
          if (!!hematologyTestResult) {
            setDataSource(hematologyTestResult)
          } else {
            setDataSource([])
          }
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
  return (
    <div>
      {props.writeAccess && (
        <Row type="flex" justify="end" style={{ marginBottom: '16px' }}>
          <Button
            onClick={() => setFormModalVisible(true)}
            className="button-red uppercase"
          >
            <Trans id="Result Entry" />
          </Button>
        </Row>
      )}

      {formModalVisible && (
        <FormModal
          visible={formModalVisible}
          onCancel={() => setFormModalVisible(false)}
          onSubmit={handleSubmit}
          onError={handleError}
        />
      )}

      <ViewSection dataSource={dataSource} loading={fetchingData} />
    </div>
  )
}

Hematology.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(Hematology)))
