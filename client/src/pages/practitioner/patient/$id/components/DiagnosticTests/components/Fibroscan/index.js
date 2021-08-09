import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import ViewSection from './ViewSection'
import FormModal from './FormModal'

const Fibroscan = props => {
  const { Fibroscan } = props.app.FHIR_CODES.DiagnosticStudy.include

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [fetchingData, setFetchingData] = useState(false)
  const [dataSource, setDataSource] = useState([])

  async function refresh() {
    setFetchingData(true)
    return (
      props
        .dispatch({
          type: 'app/queryLaboratoryTestLevel0',
          payload: {
            testKey: 'Fibroscan',
            testCode: Fibroscan,
          },
        })
        .then(result => {
          if (!!result) {
            setDataSource(result)
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
  }, [props.tabIndex])

  const handleSubmit = () => {
    setFormModalVisible(false)
    // refresh()
    return props
      .dispatch({
        type: 'practitioner_patient_profile/showModalMessage',
        payload: {
          type: 'success',
          content: props.i18n.t`Save successful`,
        },
      })
      .then(() => {
        refresh()
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

Fibroscan.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(Fibroscan)))
