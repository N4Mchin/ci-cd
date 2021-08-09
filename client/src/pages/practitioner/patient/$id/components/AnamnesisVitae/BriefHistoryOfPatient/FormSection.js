import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Select, Radio, Cascader } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse } from 'components'
import { resolveDisplay, resolveDesignation } from 'utils/valuesets'
import { delay } from 'utils/helper'
import { CheckboxField, DateField } from './../..'

const { Option } = Select
const { TextArea } = Input

const RetiredLifeEventField = props => {
  const { fieldName, language } = props
  const { name, subName } = fieldName
  const [disabled, setDisable] = useState(true)
  const [values, setValues] = useState()

  const onChange = (event, name) => {
    if (name === 'boolean') {
      setDisable(!event.target.value)
      if (!event.target.value) {
        props.onChange({ boolean: event.target.value })
        return
      }
    }

    const currentValues = {
      ...values,
      [name]: name === 'boolean' ? event.target.value : event,
    }

    setValues(currentValues)
    props.onChange(currentValues)
  }

  return (
    <Row>
      <Col span={12}>{resolveDisplay(name, language)}</Col>
      <Col span={12}>
        <Radio.Group onChange={event => onChange(event, 'boolean')}>
          <Radio value={true}>{<Trans id="Yes" />}</Radio>
          <Radio value={false}>{<Trans id="No" />}</Radio>
        </Radio.Group>
      </Col>
      <Col span={12}>{resolveDisplay(subName, language)}</Col>
      <Col span={12}>
        <DateField
          disabled={disabled}
          style={{ width: '80%' }}
          onChange={value => onChange(value, 'date')}
        />
      </Col>
    </Row>
  )
}

const AddressField = props => {
  const { fieldNames, valueSet } = props
  const { locationName, countryName, districtName } = fieldNames
  const { locationValueSet, countryValueSet } = valueSet
  const [onChangeValue, setOnChangeValue] = useState()
  console.log(fieldNames)

  const onChangeCountry = v => {
    const currentValues = {
      ...onChangeValue,
      national: v,
    }

    setOnChangeValue(currentValues)
    props.onChange(currentValues)
  }

  const onChangeLocation = v => {
    const currentValues = {
      ...onChangeValue,
      state: v[0],
      district: v[1] && v[1],
    }

    setOnChangeValue(currentValues)
    props.onChange(currentValues)
  }

  function filter(inputValue, path) {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    )
  }

  return (
    <Row>
      <Col xxl={12} xl={12} lg={24}>
        <Trans id="Birth Place" />
      </Col>
      <Col xxl={12} xl={12} lg={24}>
        <Row>
          <Col xxl={24} xl={24} lg={24}>
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={countryName}
              style={{ width: '80%' }}
              onChange={onChangeCountry}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {countryValueSet &&
                countryValueSet.concept.map(item => (
                  <Option value={item.code}>{item.display}</Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col xxl={24} xl={24} lg={24}>
            {onChangeValue && onChangeValue.national === 'MNG' && (
              <Cascader
                style={{ width: '80%' }}
                options={locationValueSet && locationValueSet.compose}
                onChange={onChangeLocation}
                placeholder={locationName}
                showSearch={{ filter }}
                changeOnSelect
              />
            )}
          </Col>
        </Row>
      </Col>
    </Row>

    // <Row>
    //   <Row>
    //     <Col xxl={12} xl={12} lg={24}>
    //       {countryName}
    //     </Col>
    //     <Col xxl={12} xl={12} lg={24}>
    //       <Select
    //         showSearch
    //         optionFilterProp="children"
    //         placeholder={countryName}
    //         style={{ width: '80%' }}
    //         onChange={onChangeCountry}
    //         filterOption={(input, option) =>
    //           option.props.children
    //             .toLowerCase()
    //             .indexOf(input.toLowerCase()) >= 0
    //         }
    //       >
    //         {countryValueSet &&
    //           countryValueSet.concept.map(item => (
    //             <Option value={item.code}>{item.display}</Option>
    //           ))}
    //       </Select>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col xxl={12} xl={12} lg={24}>
    //       {locationName}
    //     </Col>
    //     <Col xxl={12} xl={12} lg={24}>
    //       <Cascader
    //         style={{ width: '80%' }}
    //         options={locationValueSet && locationValueSet.compose}
    //         onChange={onChangeLocation}
    //         placeholder={locationName}
    //       />
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col xxl={12} xl={12} lg={24}>
    //       {districtName}
    //     </Col>
    //     <Col xxl={12} xl={12} lg={24}>
    //       <TextArea
    //         rows={4}
    //         placeholder={districtName}
    //         style={{ width: '80%' }}
    //         onChange={onChangeDistrict}
    //       />
    //     </Col>
    //   </Row>
    // </Row>
  )
}

const AnamnesisVitaeField = props => {
  const { valueSet, language, fieldName, i18n } = props

  const onChange = value => {
    props.onChange(value)
  }

  switch (props.type) {
    case 'select':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <Select
              allowClear
              showSearch
              onChange={onChange}
              style={{ width: '80%' }}
            >
              {valueSet &&
                Object.keys(valueSet).map(problemName => {
                  const designation = resolveDisplay(
                    valueSet[problemName],
                    language
                  )

                  return (
                    <Option value={problemName} key={problemName}>
                      {designation}
                    </Option>
                  )
                })}
            </Select>
          </Col>
        </Row>
      )
    case 'string':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <TextArea
              rows={4}
              style={{ width: '80%' }}
              onChange={onChange}
              placeholder={i18n.t`Please write`}
            />
          </Col>
        </Row>
      )
    case 'check':
      return (
        <Row>
          <Col span={12}>{fieldName}</Col>
          <Col span={12}>
            <CheckboxField
              onChange={onChange}
              valueSet={valueSet}
              language={language}
            />
          </Col>
        </Row>
      )
    case 'radioAndDate':
      return (
        <RetiredLifeEventField
          onChange={onChange}
          fieldName={fieldName}
          language={language}
        />
      )
    case 'address':
      return (
        <AddressField
          fieldNames={fieldName}
          valueSet={valueSet}
          onChange={onChange}
        />
      )

    default:
      return <></>
  }
}

const FormSection = props => {
  const { form, i18n, app, practitioner_patient_profile } = props
  const { AnamnesisVitae } = app.FHIR_CODES
  const { countryNames, addressNames } = practitioner_patient_profile
  const { getFieldDecorator } = form

  const briefHistoryInclude =
    AnamnesisVitae && AnamnesisVitae.include.BriefHistoryOfPatient.include

  const textFieldsValues = [
    {
      name: briefHistoryInclude.ChildhoodGrowthAndOrDevelopmentFinding,
      value: 'ChildhoodGrowthAndOrDevelopmentFinding',
      type: 'select',
      valueSet:
        briefHistoryInclude.ChildhoodGrowthAndOrDevelopmentFinding.include,
    },
    {
      name: briefHistoryInclude.HouseholdComposition,
      value: 'HouseholdComposition',
      type: 'check',
      valueSet: briefHistoryInclude.HouseholdComposition.include,
    },
    // {
    //  name: {
    //    countryName: i18n.t`Select country`,
    //    locationName: i18n.t`Select location`,
    //  },
    //  value: 'BirthPlace',
    //  type: 'address',
    //  valueSet: {
    //    countryValueSet: resolveDesignation(countryNames, i18n._language),
    //    locationValueSet: addressNames,
    //  },
    // },
    {
      name: briefHistoryInclude.FindingOfBirthDetails,
      value: 'FindingOfBirthDetails',
      type: 'select',
      valueSet: briefHistoryInclude.FindingOfBirthDetails.include,
    },
    {
      name: briefHistoryInclude.DetailsOfEducation,
      value: 'DetailsOfEducation',
      type: 'string',
    },
    {
      name: briefHistoryInclude.EmploymentDetail,
      value: 'EmploymentDetail',
      type: 'string',
    },
    {
      name: {
        name: briefHistoryInclude.RetiredLifeEventBoolean,
        subName: briefHistoryInclude.RetiredLifeEvent,
      },
      value: 'RetiredLifeEvent',
      type: 'radioAndDate',
    },
    {
      name: <Trans id={'AdditionalInformation'} />,
      value: 'note',
      type: 'string',
    },
  ]

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        console.log(formValues)
        return props.dispatch({
          type: 'practitioner_patient_profile/briefHistoryOfPatientAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        setActiveStatus(true)
        console.log(result)
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(async () => {
        await delay(1000)
        setActiveKey([])
      })
  }
  const onActiveChange = value => {
    setActiveKey(value)
  }
  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <ActiveCollapse
          displayName={<Trans id="Brief history of patient" />}
          bordered={true}
          activeKey={activeKey}
          activeStatus={activeStatus}
          onActiveChange={onActiveChange}
        >
          {textFieldsValues.map(fieldValue => {
            const labelName = resolveDisplay(fieldValue.name, i18n._language)

            return (
              <Row gutter={[0, 10]}>
                <Col>
                  <Form.Item>
                    {getFieldDecorator(`${fieldValue.value}`, {
                      rules: [{ required: false }],
                    })(
                      <AnamnesisVitaeField
                        fieldName={labelName ? labelName : fieldValue.name}
                        type={fieldValue.type}
                        valueSet={fieldValue.valueSet}
                        language={i18n._language}
                        i18n={i18n}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            )
          })}
          <Row
            style={{ marginTop: '10px' }}
            type="flex"
            justify="end"
            gutter={8}
          >
            <Col>
              <Button className="button-gray">
                <Trans id={'Cancel'} />
              </Button>
            </Col>
            <Col>
              <Button className="button-red" onClick={onSave}>
                <Trans id={'Save'} />
              </Button>
            </Col>
          </Row>
        </ActiveCollapse>
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
