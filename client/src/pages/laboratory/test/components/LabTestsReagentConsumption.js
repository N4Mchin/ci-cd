import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Board, FloatNumber, SelectItem } from 'components'
import LabTestsReagentConsumptionFormSection from './LabTestsReagentConsumptionFormSection'
import LabTestsReagentConsumptionViewSection from './LabTestsReagentConsumptionViewSection'
import { Form, Input } from 'antd'
import { MessageModal } from 'components'
const { TextArea } = Input

const LabTestsReagentConsumption = props => {
  const { dispatch, form, i18n } = props
  const { getFieldDecorator } = form
  const [dataSource, setDataSource] = useState(false)
  const [remainingValues, setRemainingValues] = useState()
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [reagentLogDataSource, setReagentLogDatasource] = useState([])
  const [loadingRef, setLoadingRef] = useState(false)

  const columns = [
    {
      title: 'Урвалжийн лот дугаар',
      dataIndex: 'reagentLotNumber',
      key: 'reagentLotNumber',
      render: (text, record) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(
                `${record.reagentLotNumber}.reagentLotNumber`,
                {
                  rules: [{ required: false }],
                  initialValue: record.reagentLotNumber,
                }
              )(<div>{record.reagentLotNumber}</div>)}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Урвалжийн төрөл',
      dataIndex: 'reagentType',
      key: 'reagentType',
      render: (text, record) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`${record.reagentLotNumber}.reagentType`, {
                rules: [{ required: false }],
                initialValue: record.reagentType,
              })(<div>{record.reagentType}</div>)}
            </Form.Item>
          </div>
        )
      },
    },

    {
      title: 'Урвалжийн хүчинтэй хугацаа',
      dataIndex: 'reagentExpirationDate',
      key: 'reagentExpirationDate',
      render: (text, record) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(
                `${record.reagentLotNumber}.reagentExpirationDate`,
                {
                  rules: [{ required: false }],
                  initialValue: record.reagentExpirationDate,
                }
              )(<div>{record.reagentExpirationDate}</div>)}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Агуулахын урвалжийн үлдэгдэл',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`${record.reagentLotNumber}.quantity`, {
                rules: [{ required: false }],
                initialValue: record.quantity,
              })(<div>{record.quantity}</div>)}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Зарцуулсан урвалж',
      dataIndex: 'consumptionValue',
      key: 'consumptionValue',
      render: (text, record, index) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(
                `${record.reagentLotNumber}.consumptionValue`,
                {
                  rules: [{ required: false }],
                }
              )(<FloatNumber style={{ textAlign: 'center' }} />)}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Үлдэгдэл урвалжийн тоо',
      dataIndex: 'currentReagentRemain',
      key: 'currentReagentRemain',
      render: (text, record, index) => {
        return (
          <Form.Item>
            {getFieldDecorator(
              `${record.reagentLotNumber}.currentReagentRemain`,
              {
                rules: [{ required: false }],
              }
            )(
              <div>
                {remainingValues &&
                remainingValues[record.reagentLotNumber] !== 0
                  ? remainingValues[record.reagentLotNumber]
                  : ''}
              </div>
            )}
          </Form.Item>
        )
      },
    },
    {
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`${record.reagentLotNumber}.description`, {
                rules: [{ required: false }],
              })(<TextArea />)}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Аппаратны төрөл',
      dataIndex: 'appartusType',
      key: 'appartusType',
      render: (text, record) => {
        return (
          <div>
            <Form.Item>
              {getFieldDecorator(`${record.reagentLotNumber}.appartusType`, {
                rules: [{ required: false }],
              })(<SelectItem />)}
            </Form.Item>
          </div>
        )
      },
    },
    {
      title: 'Хэрэглэсэн хүний гарын үсэг',
      dataIndex: 'signature',
      key: 'signature',
    },
  ]

  const reagentLogColumns = [
    {
      title: 'Огноо',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Урвалжийн нэр',
      dataIndex: 'reagentName',
      key: 'reagentName',
    },
    {
      title: 'Урвалжийн лот дугаар',
      dataIndex: 'reagentLotNumber',
      key: 'reagentLotNumber',
    },
    {
      title: 'Урвалжийн хүчинтэй хугацаа',
      dataIndex: 'reagentExpirationDate',
      key: 'reagentExpirationDate',
    },
    {
      title: 'Эхний үлдэгдэл',
      dataIndex: 'firstRemain',
      key: 'firstRemain',
    },
    {
      title: 'Зарцуулсан урвалж',
      dataIndex: 'consumptionValue',
      key: 'consumptionValue',
    },
    {
      title: 'Агуулахын урвалжийн үлдэгдэл',
      dataIndex: 'quantity',
      key: 'quantity',
    },

    {
      title: 'Тайлбар',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Аппаратны төрөл',
      dataIndex: 'appartusType',
      key: 'appartusType',
      render: (text, record) => {
        return (
          <div>
            {record.appartusType && record.appartusType.firstSelection}
            <br /> <br />
            {record.appartusType && record.appartusType.secondSelection}
          </div>
        )
      },
    },
    {
      title: 'Хэрэглэсэн хүний гарын үсэг',
      dataIndex: 'recordedLaboratoryTechnician',
      key: 'recordedLaboratoryTechnician',
    },
  ]

  const onExpense = () => {
    form.validateFields().then(formValues => {
      const newFormValues = {}
      Object.keys(formValues).forEach(formValue => {
        if (!!formValues[formValue].consumptionValue)
          newFormValues[formValue] =
            formValues[formValue].quantity -
            parseInt(formValues[formValue].consumptionValue)
        else {
          newFormValues[formValue] = 0
        }
      })
      setRemainingValues(newFormValues)
    })
  }

  async function refresh() {
    setLoadingRef(true)
    props
      .dispatch({
        type: 'laboratory_test/readReagent',
        payload: {
          testName: props.testName,
        },
      })
      .then(values => {
        setDataSource(values)
      })
      .then(() => {
        return props.dispatch({
          type: 'laboratory_test/readReagentLog',
          payload: { testName: props.testName },
        })
      })
      .then(result => {
        setReagentLogDatasource(result)
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingRef(false))
  }

  const onSubmit = () => {
    setLoadingRef(true)
    form
      .validateFields()
      .then(formValues => {
        let consumption = {}
        let appartusType
        Object.keys(formValues).forEach(formValue => {
          if (formValues[formValue].appartusType !== undefined) {
            appartusType = formValues[formValue].appartusType
          }
          if (!!formValues[formValue].consumptionValue)
            consumption = {
              consumptionValue: formValues[formValue].consumptionValue,
              reagentLotNumber: formValues[formValue].reagentLotNumber,
              description: formValues[formValue].description,
              recordedLaboratoryTechnician: props.app.Practitioner.getOfficialNameString(),
              recordedLaboratoryTechnicianId: props.app.Practitioner.id,
              appartusType: appartusType && appartusType,
            }
          else {
            return
          }
        })

        return dispatch({
          type: 'laboratory_test/saveLabTestsReagentConsumption',
          payload: {
            testName: props.testName,
            consumption: consumption,
          },
        })
      })
      .then(() => {
        setTimeout(() => showMessageModal(true), 150)
        form.resetFields()
        setRemainingValues()
        refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingRef(false))
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Board inner>
      <LabTestsReagentConsumptionFormSection
        testName={props.testName}
        loadingRef={loadingRef}
        dataSource={dataSource}
        onSubmit={onSubmit}
        columns={columns}
        onExpense={onExpense}
      />
      <LabTestsReagentConsumptionViewSection
        testName={props.testName}
        loadingRef={loadingRef}
        reagentLogDataSource={reagentLogDataSource}
        reagentLogColumns={reagentLogColumns}
      />
      <MessageModal
        type="success"
        visible={modalMessageVisible}
        onCancel={() => showMessageModal(false)}
        content={i18n.t`Reagent was successfully consumed`}
      />
    </Board>
  )
}

LabTestsReagentConsumption.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test, dispatch }) => ({
  app,
  loading,
  laboratory_test,
  dispatch,
}))(withI18n()(Form.create()(LabTestsReagentConsumption)))
