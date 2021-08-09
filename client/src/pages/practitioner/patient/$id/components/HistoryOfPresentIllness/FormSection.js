import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Select, Checkbox } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { IntegerInput, SearchInputICD } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { DateField, RecurrenceField } from './../'

const { Option } = Select
const { TextArea } = Input

const HistoryOfPResentIllnessField = props => {
  const { valueSet, language, value, placeholder } = props

  const treatmentCheck = [
    {
      label: <Trans id="Administration of drug or medicaent (procedure)" />,
      value: 'AdministrationOfDrugOrMedicament',
    },
    {
      label: <Trans id="Non-pharmacological treatment" />,
      value: 'NonPharmacologicalTreatment',
    },
    {
      label: <Trans id="No treatment received" />,
      value: 'NoTreatmentReceived',
    },
  ]

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'select':
      return (
        <Select
          showSearch
          allowClear
          onChange={onChange}
          style={{ width: '80%' }}
          placeholder={placeholder}
          filterOption={(input, option) => {
            return option.props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }}
        >
          {Object.keys(valueSet).map(problemName => {
            const designation = resolveDisplay(valueSet[problemName], language)
            return (
              <Option value={problemName} key={problemName}>
                {designation}
              </Option>
            )
          })}
        </Select>
      )

    case 'selectMultiple':
      return (
        <Select
          showSearch
          allowClear
          mode="multiple"
          onChange={onChange}
          style={{ width: '80%' }}
          placeholder={placeholder}
          filterOption={(input, option) => {
            return option.props.children
              .toLowerCase()
              .includes(input.toLowerCase())
          }}
        >
          {Object.keys(valueSet).map(problemName => {
            const designation = resolveDisplay(valueSet[problemName], language)
            return (
              <Option value={problemName} key={problemName}>
                {designation}
              </Option>
            )
          })}
        </Select>
      )
    case 'selectHospital':
      return (
        <Select
          allowClear
          showSearch
          onChange={onChange}
          style={{ width: '80%' }}
          placeholder={placeholder}
        >
          {valueSet &&
            valueSet.map(v => {
              const optionValue = resolveDisplay(v, language)
              const typeValue = resolveDisplay(v.type, language)
              return (
                <Option value={optionValue} key={optionValue} title={typeValue}>
                  {optionValue}
                </Option>
              )
            })}
        </Select>
      )
    case 'date':
      return <DateField onChange={onChange} style={{ width: '80%' }} />
    case 'string':
      return (
        <TextArea
          rows={3}
          onChange={onChange}
          style={{ width: '80%' }}
          placeholder={placeholder}
        />
      )
    case 'dueToExtension':
      return (
        <TextArea
          rows={3}
          onChange={onChange}
          style={{ width: '80%' }}
          placeholder={placeholder}
        />
      )
    case 'note':
      return (
        <TextArea
          rows={3}
          onChange={onChange}
          style={{ width: '80%' }}
          placeholder={placeholder}
        />
      )
    case 'number':
      return (
        <IntegerInput
          onChange={onChange}
          value={value}
          style={{ width: '30%' }}
        />
      )
    case 'check':
      return <Checkbox.Group options={treatmentCheck} onChange={onChange} />
    case 'numberAndSelect':
      return (
        <RecurrenceField
          onChange={onChange}
          value={value}
          input-data-cy="numberAndSelect-input"
          select-data-cy="numberAndSelect-select"
        />
      )
    case 'diagnosis':
      return <SearchInputICD onChange={onChange} />
    default:
      return <></>
  }
}

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

// const onSelectChange = event => {
//   props.onChange(event)
// }

// return (
//   <Select
//     showSearch
//     placeholder={placeholder}
//     onChange={onSelectChange}
//     allowClear
//     filterOption={(input, option) =>
//       option.props.children.toLowerCase().includes(input.toLowerCase())
//     }
//   >
//     {isObject(lists)
//       ? Object.keys(lists).map(problemName => {
//           const designation = resolveDisplay(lists[problemName], language)

//           return (
//             <Option value={problemName} key={problemName}>
//               {designation}
//             </Option>
//           )
//         })
//       : lists.map(list => {
//           const designation = resolveDisplay(list, language)

//           return (
//             <Option value={list.code.text} key={list.code.text}>
//               {designation}
//             </Option>
//           )
//         })}
//   </Select>
// )
// }

const FormSection = props => {
  const { form, i18n, app } = props
  const {
    Problems,
    TestNames,
    HealthCareProviders,
    HistoryOfPresentIllness,
  } = app.FHIR_CODES

  const { getFieldDecorator } = form

  const illnessInclude =
    HistoryOfPresentIllness && HistoryOfPresentIllness.include

  const [required, setRequired] = useState(true)
  const [loading, setLoading] = useState(false)

  const textFieldsValues = [
    {
      name: 'Choose a complaint',
      value: 'Complaint',
      type: 'select',
      valueSet: Problems,
      required: required,
      message: i18n.t`Please select complaint`,
      placeholder: i18n.t`Choose a complaint`,
    },
    {
      name: 'Choose a diagnosis',
      value: 'Diagnosis',
      type: 'diagnosis',
      required: required,
      message: i18n.t`Please select diagnosis`,
    },
    {
      name: illnessInclude.DateOfDiagnosis,
      value: 'DateOfDiagnosis',
      type: 'date',
    },
    {
      name: illnessInclude.PlaceOfDiagnosis,
      value: 'PlaceOfDiagnosis',
      type: 'selectHospital',
      valueSet: HealthCareProviders,
      placeholder: i18n.t`Choose a hospital`,
    },
    {
      name: illnessInclude.PreviouslyVisitedHospital,
      value: 'PreviouslyVisitedHospital',
      type: 'selectHospital',
      valueSet: HealthCareProviders,
      placeholder: i18n.t`Choose a hospital`,
    },
    {
      name: illnessInclude.TreatmentGiven,
      value: 'TreatmentGiven',
      type: 'check',
    },
    {
      name: illnessInclude.ResponseToTreatment,
      value: 'ResponseToTreatment',
      type: 'string',
      placeholder: i18n.t`Please write`,
    },
    {
      name: illnessInclude.TimeOfSymptomOnset,
      value: 'TimeOfSymptomOnset',
      type: 'numberAndSelect',
    },
    {
      name: 'Condition due to extension',
      value: 'ConditionDueToExtension',
      type: 'dueToExtension',
      placeholder: i18n.t`Please write`,
    },
    {
      name: illnessInclude.PreviouslyMadeTest,
      value: 'PreviouslyMadeTest',
      type: 'selectMultiple',
      valueSet: TestNames,
      placeholder: i18n.t`Choose a test name`,
    },
    {
      name: illnessInclude.NatureOfDisease,
      value: 'NatureOfDisease',
      type: 'string',
      placeholder: i18n.t`Please write`,
    },
    {
      name: illnessInclude.InitialPresentation,
      value: 'InitialPresentation',
      type: 'string',
      placeholder: i18n.t`Please write`,
    },
    {
      name: illnessInclude.NumberOfRecurrencePerYear,
      value: 'NumberOfRecurrencePerYear',
      type: 'number',
    },
    {
      name: illnessInclude.SuspectedReasonOfRecurrence,
      value: 'SuspectedReasonOfRecurrence',
      type: 'string',
      placeholder: i18n.t`Please write`,
    },
    {
      name: illnessInclude.PreventiveProcedureIntent,
      value: 'PreventiveProcedureIntent',
      type: 'string',
      placeholder: i18n.t`Please write`,
    },
    {
      name: i18n.t`AdditionalInformation`,
      value: 'note',
      type: 'note',
      placeholder: i18n.t`Please write`,
    },
  ]
  /* #endregion */

  const onSave = () => {
    setLoading(true)

    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/historyOfPresentIllnessAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
      // eslint-disable-next-line no-console
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => {
        setLoading(false)
      })
  }

  const onFormChange = () => {
    const formValues = form.getFieldsValue()

    if (formValues.select.Complaint || formValues.diagnosis.Diagnosis) {
      setRequired(false)
    } else {
      setRequired(true)
    }
  }

  const onCancel = () => {
    // form.resetFields()
    illnessInclude &&
      textFieldsValues.forEach(fieldValue => {
        form.setFieldsValue({
          [`${fieldValue.type}.${fieldValue.value}`]: '',
        })
      })
  }

  return (
    <div>
      <Form
        allowClear
        colon={false}
        labelAlign="left"
        layout="veritcal"
        onChange={onFormChange}
      >
        {illnessInclude &&
          textFieldsValues.map(fieldValue => {
            const labelName = resolveDisplay(fieldValue.name, i18n._language)

            return (
              <Row gutter={[0, 10]}>
                <Col>
                  <Form.Item
                    label={
                      labelName ? labelName : <Trans id={fieldValue.name} />
                    }
                    {...formItemLayout}
                  >
                    {getFieldDecorator(
                      `${fieldValue.type}.${fieldValue.value}`,
                      {
                        rules: [
                          {
                            required: fieldValue.required,
                            message: fieldValue.message,
                          },
                        ],
                      }
                    )(
                      <HistoryOfPResentIllnessField
                        type={fieldValue.type}
                        language={i18n._language}
                        valueSet={fieldValue.valueSet}
                        placeholder={fieldValue.placeholder}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            )
          })}

        <Row style={{ marginTop: '10px' }} type="flex" justify="end" gutter={8}>
          <Col>
            <Button className="button-gray" onClick={onCancel}>
              <Trans id={'Cancel'} />
            </Button>
          </Col>
          <Col>
            <Button
              htmlType="submit"
              className="button-red"
              onClick={onSave}
              loading={loading}
            >
              <Trans id={'Save'} />
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

FormSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(FormSection)))
