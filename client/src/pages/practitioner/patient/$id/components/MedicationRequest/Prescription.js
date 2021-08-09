import React, { useState, useEffect } from 'react'
import PropTypes, { element } from 'prop-types'
import {
  Form,
  Button,
  Row,
  Input,
  Col,
  Select,
  Icon,
  Descriptions,
  Switch,
} from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import * as helper from 'utils/helper'
import { calculateAgeFromBirthDate } from 'utils/helper'
import { getInstant } from 'utils/datetime'
import {
  SearchInputDrugInfoFromHealthInsurance,
  IntegerInput,
} from 'components'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../styles.less'
import { LoadingOutlined } from '@ant-design/icons'
const { TextArea } = Input
const { Option } = Select

const RecurrencePerYear = props => {
  const { value, i18n } = props
  const [recurrenceValue, serRecurrenceValue] = useState()

  const onChange = v => {
    let previousValue = {}

    if (!!v) {
      if (parseInt(v)) {
        previousValue = {
          ...recurrenceValue,
          dateValue: v,
        }
      } else {
        previousValue = {
          ...recurrenceValue,
          dateType: v,
        }
      }

      serRecurrenceValue(previousValue)
      props.onChange(previousValue)
    } else {
      props.onChange('')
    }
  }

  return (
    <Row type="flex" gutter={4}>
      <Col span={14}>
        <IntegerInput value={value && value.dateValue} onChange={onChange} />
      </Col>
      <Col span={10}>
        <Select onChange={onChange}>
          <Option value="d">{'Day'}</Option>
          <Option value="wk">{'Week'}</Option>
          <Option value="mo">{'Month'}</Option>
        </Select>
      </Col>
    </Row>
  )
}

const MainForm = props => {
  const { form, i18n, app } = props
  const { practitioner_patient_profile } = props
  const { Practitioner } = app
  const { patient } = practitioner_patient_profile
  const { MedicationDosageInstruction } = app.FHIR_CODES
  const { getFieldDecorator } = form
  const [vitalSign, setVitalSign] = useState()
  const [array, setArray] = useState([
    {
      key: '1',
    },
  ])

  useEffect(() => {
    //Үзлэгийн тэмдэглэлээс
    //Дээд доод даралт, зүрхний цохилт, биеийн жин өндөр зэрэг шаардлагатай мэдээллийг авч ирнэ
    props
      .dispatch({
        type: 'practitioner_patient_profile/queryInspectionNote',
      })
      .then(result => {
        const { patientBriefHistoryList } = result
        patientBriefHistoryList &&
          patientBriefHistoryList.map(element => {
            const { include } = element
            Object.keys(include).forEach(key => {
              const data = include[key].include
              setVitalSign(data)
            })
          })
      })
  }, [])

  const addRowSubmit = () => {
    const copyArray = array.slice()
    const newElement = {
      key: array.length + 1,
    }

    copyArray.push(newElement)
    setArray(copyArray)
  }

  const deleteRowSubmit = key => {
    let deleteIndex

    array.forEach((value, index) => {
      if (value.key === key) {
        deleteIndex = index
      }
    })

    const leftArray = array.slice(0, deleteIndex)
    const rightArray = array.slice(deleteIndex + 1, array.length)
    const newArray = [...leftArray, ...rightArray]

    setArray(newArray)
  }

  const onSave = () => {
    const DiastolicBloodPressure =
      vitalSign &&
      vitalSign.DiastolicBloodPressure &&
      vitalSign.DiastolicBloodPressure.value

    const SystolicArterialPressure =
      vitalSign &&
      vitalSign.SystolicArterialPressure &&
      vitalSign.SystolicArterialPressure.value

    const HeartRate =
      vitalSign && vitalSign.HeartRate && vitalSign.HeartRate.value

    const BodyHeight =
      vitalSign && vitalSign.BodyHeight && vitalSign.BodyHeight.value

    const BodyWeight =
      vitalSign && vitalSign.BodyWeight && vitalSign.BodyWeight.value

    const BodyTemperature =
      vitalSign && vitalSign.BodyTemperature && vitalSign.BodyTemperature.value

    const RespiratoryRate =
      vitalSign && vitalSign.RespiratoryRate && vitalSign.RespiratoryRate.value

    let patientNationalId
    let practitionerNationalId
    let medicationCodeableConcept
    if (!helper.isEmptyObject(patient)) {
      patientNationalId = patient.getNationalIdentificationNumber()

      if (!helper.isEmptyObject(Practitioner)) {
        //Practitioner засах шаардлагатай учир өөрчил болохгүй
        practitionerNationalId = Practitioner.identifier[1].value
      }
    }
    //Цахим жор үүсгэхэд дээд доод даралт болон зүрхний цохилт нь заавал байх
    // шаардлагтай учир шалгаж байна
    if (
      DiastolicBloodPressure !== undefined &&
      DiastolicBloodPressure !== '' &&
      SystolicArterialPressure !== undefined &&
      SystolicArterialPressure !== '' &&
      HeartRate !== undefined &&
      HeartRate !== ''
    ) {
      return form.validateFields((error, values) => {
        if (error) {
          console.log(error)
          return
        }

        const newObject = {}
        Object.keys(values).forEach(formKey => {
          //ЭМД сангаас хөнгөлөгддөг эмийг FHIR руу хадгалахдаа code нэмж өгч байна
          medicationCodeableConcept = {
            coding: [
              {
                system: 'https://st.health.gov.mn/',
                code: values[formKey].medication.selectedData.tbltId,
                display: values[formKey].medication.selectedData.tbltNameInter,
              },
            ],
            text: values[formKey].medication.selectedData.tbltNameInter,
          }

          newObject[formKey] = {
            ...values[formKey],
            medicationCodeableConcept,
          }
        })

        // return props
        //   .dispatch({
        //     type: 'practitioner_patient_profile/medicationRequestAdd',
        //     payload: {
        //       formValues: newObject,
        //     },
        //   })
        //   .then(() => {
        return (
          props
            .dispatch({
              type: 'app/savePrescription',
              payload: {
                formValues: values,
                patientNationalId: patientNationalId,
                practitionerNationalId: practitionerNationalId,
                DiastolicBloodPressure: DiastolicBloodPressure,
                SystolicArterialPressure: SystolicArterialPressure,
                HeartRate: HeartRate,
                BodyHeight: BodyHeight,
                BodyWeight: BodyWeight,
                BodyTemperature: BodyTemperature,
                RespiratoryRate: RespiratoryRate,
              },
            })
            // })
            .then(() => {
              //Цахим жорын хүснэгт нь хамгийн сүүлийн өөрчлөлтийг сонсоно.
              return props.dispatch({
                type: 'practitioner_patient_profile/updateState',
                payload: {
                  lastUpdatedEprecription: getInstant(),
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
            .catch(errorInfo => console.log(errorInfo))
        )
      })
    } else {
      return props.dispatch({
        type: 'practitioner_patient_profile/showModalMessage',
        payload: {
          type: 'error',
          content: i18n.t`Please enter DiastolicBloodPressure,SystolicArterialPressure and HeartRate`,
        },
      })
    }
  }
  return (
    <div>
      <Form layout="veritcal" labelAlign="left" colon={false}>
        <div>
          {array.map(element => {
            return (
              <div className={styles.medicationRequestTable}>
                <Descriptions bordered layout="vertical">
                  <Descriptions.Item
                    span={5 / 2}
                    label={
                      <div className="title uppercase">
                        {i18n.t`Medication information`}
                      </div>
                    }
                  >
                    <Descriptions bordered layout="vertical">
                      <Descriptions.Item
                        label={i18n.t`Medicaton name, Form, Dose`}
                        span={1.5}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.medication`, {
                            rules: [
                              {
                                required: false,
                                message: i18n.t`Please select medication`,
                              },
                            ],
                          })(
                            <SearchInputDrugInfoFromHealthInsurance
                              patient={patient}
                            />
                          )}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Total quantity`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.initialFillQuantity`,
                            { rules: [{ required: false }] }
                          )(<IntegerInput />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Route of administration`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.dosageInstruction`,
                            { rules: [{ required: false }] }
                          )(
                            <Select allowClear>
                              {MedicationDosageInstruction &&
                                Object.keys(MedicationDosageInstruction).map(
                                  instructionValue => {
                                    return (
                                      <Option value={instructionValue}>
                                        {resolveDisplay(
                                          MedicationDosageInstruction[
                                            instructionValue
                                          ],
                                          i18n._language
                                        )}
                                      </Option>
                                    )
                                  }
                                )}
                            </Select>
                          )}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Frequency of use`}
                        span={1 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.timingRepeatFrequency`,
                            { rules: [{ required: false }] }
                          )(<RecurrencePerYear i18n={i18n} />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Per administration`}
                        span={1 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.dosageQuantity`, {
                            rules: [{ required: false }],
                          })(<IntegerInput />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`Effective peroid`}
                        span={1}
                      >
                        <Form.Item>
                          {getFieldDecorator(
                            `${element.key}.initialFillDuration`,
                            { rules: [{ required: false }] }
                          )(<RecurrencePerYear i18n={i18n} />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label={i18n.t`Note`} span={1 / 2}>
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.note`, {
                            rules: [{ required: false }],
                          })(<TextArea rows={1} />)}
                        </Form.Item>
                      </Descriptions.Item>
                    </Descriptions>
                  </Descriptions.Item>
                  <Descriptions.Item label={i18n.t`Delete`}>
                    <Button
                      type="primary"
                      onClick={() => deleteRowSubmit(element.key)}
                    >
                      <Icon type="delete" />
                    </Button>
                  </Descriptions.Item>
                </Descriptions>
                <br />
              </div>
            )
          })}
        </div>
        <Row style={{ marginTop: '8px' }}>
          <Col span={12}>
            <Row type="flex" justify="start">
              <Button type="primary" onClick={addRowSubmit}>
                <Trans id={'Add'} />
              </Button>
            </Row>
          </Col>
          <Col span={12}>
            <Row type="flex" justify="end">
              <Button className="button-grey">
                <Trans id={'Cancel'} />
              </Button>
              <Button
                className="button-red"
                style={{ marginLeft: '10px' }}
                onClick={onSave}
              >
                <Trans id={'Save'} />
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

const Precription = props => {
  const { app } = props
  const { practitioner_patient_profile } = props
  const { Practitioner } = app
  const { patient } = practitioner_patient_profile
  const [code, setCode] = useState('')
  const [fingerprint, setFingerprint] = useState()
  const [data, setData] = useState()
  const [switchData, setSwitchData] = useState()

  const fetchToken = () => {
    let patientNationalId
    let practitionerNationalId
    if (!helper.isEmptyObject(patient)) {
      patientNationalId = patient.getNationalIdentificationNumber()

      if (!helper.isEmptyObject(Practitioner)) {
        practitionerNationalId = Practitioner.identifier[1].value
      }
    }
    const data = {
      type: 'fingerprint',
      practitionerId: props.app.Practitioner.id,
      patientId:
        props.practitioner_patient_profile.patient &&
        props.practitioner_patient_profile.patient.id,
      patientNationalId: patientNationalId,
      practitionerNationalId: practitionerNationalId,
    }

    return props
      .dispatch({
        type: 'practitioner_patient_profile/queryEprescriptionToken',
        payload: {
          ...data,
        },
      })
      .then(result => {
        setFingerprint(result.patientFingerprint)
        if (result && result.patientFingerprint) {
          props
            .dispatch({
              type: 'app/getCitizenInfo',
              payload: {
                regNo: patientNationalId,
                authorRegNo: practitionerNationalId,
              },
            })
            .then(citizenInfo => {
              setData(citizenInfo)
            })
        }
        setCode(result.token)
      })
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchToken()
  }, [])

  const onSwitchClick = value => {
    let patientNationalId

    if (!helper.isEmptyObject(patient)) {
      patientNationalId = patient.getNationalIdentificationNumber()
    }
    if (value === true) {
      props
        .dispatch({
          type: 'app/getCitizenInfoWithoutFinger',
          payload: {
            regNo: patientNationalId,
          },
        })
        .then(citizenInfo => {
          setSwitchData(citizenInfo)
        })
    } else {
      setSwitchData()
    }
  }
  return (
    <div>
      <div>
        {!fingerprint && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '24px',
            }}
          >
            <span>Хурууны хээ уншуулах боломжгүй өвчтөн</span>
            &nbsp;
            <Switch onClick={onSwitchClick} />
          </div>
        )}

        {data && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {' '}
            <Col>{data.firstName}</Col>
            <Col>{data.lastName}</Col>
            <Col>{data.regNo}</Col>
            {data.insuranceInfo.map(element => {
              return (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Col>
                    {' '}
                    {element.pyear}-{element.pmonth}
                  </Col>
                </div>
              )
            })}
          </div>
        )}

        {switchData && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col>{switchData.firstName}</Col>
            <Col>{switchData.lastName}</Col>
            <Col>{switchData.regno}</Col>
            <Col>{switchData.insuranceInfo}</Col>
          </div>
        )}
        <br />
        {fingerprint || switchData ? (
          <MainForm {...props} />
        ) : (
          <div>
            <Row type="flex" justify="center">
              <div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '16px' }} className="title">
                    Та цахим жор ашиглан жор бичихэд өвчтөний хурууны хээ
                    уншуулах шаардлагатай. <br /> Та доорх зааврыг дарааллаар нь
                    гүйцэтгэнэ үү.
                  </span>

                  <ol style={{ textAlign: 'left', marginTop: '16px' }}>
                    <li>
                      Хурууны хээ унших төхөөрөмжийг компьютертэй холбож,
                      хурууны хээ унших программыг ажиллуулна
                    </li>
                    <li>
                      Өөрийн болон өвчтөний хурууны хээг уншуулаад, доорх 6
                      оронтой кодыг хуулаад, илгээнэ
                    </li>
                    <li>
                      Хурууны хээг илгээсний дараа{' '}
                      <span className="bold">шинэчлэх</span> товчийг дарна
                    </li>
                  </ol>
                </div>
              </div>
            </Row>
            <Row type="flex" justify="center">
              <div
                style={{ margin: '40px', fontSize: '24px' }}
                className="title bold"
              >
                {code == '' ? <LoadingOutlined /> : code}
              </div>
            </Row>
            <Row type="flex" justify="center">
              <Button
                type="primary"
                style={{ margin: '8px' }}
                onClick={fetchToken}
              >
                Шинэчлэх
              </Button>
            </Row>
          </div>
        )}
      </div>
    </div>
  )
}

Precription.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(Precription)))
