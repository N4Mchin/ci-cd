import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../../../styles.less'
import { BorderCollapse, MessageModal, ModuleBox, CustomIcon } from 'components'
import {
  Button,
  Row,
  Col,
  Tabs,
  Checkbox,
  InputNumber,
  Form,
  message,
} from 'antd'
import { cyrillicToLatin } from 'utils/helper'
import * as dateTime from 'utils/datetime'
const { TabPane } = Tabs

/* #region  not necessary */
// import { ExclamationOutlined, CheckOutlined } from '@ant-design/icons'
// import OtherTool from './OtherTool'
// import { IntegerInput } from '../../../../../components'
// import JsBarcode from 'jsbarcode'
// const nurseKit = [
//   {
//     label: 'Vacutainer tube',
//     name: 'tubeYellow',
//     background: '#FEE12B',
//   },
//   {
//     label: 'Vacutainer tube',
//     name: 'tubePurple',
//     background: '#A6A6ED',
//   },
//   {
//     label: 'Vacutainer tube',
//     name: 'tubeLightBlue',
//     background: '#39DAFF',
//   },
//   {
//     label: 'Vacutainer tube',
//     name: 'tubeRed',
//     background: '#DB1B44',
//   },
//   {
//     label: 'Vacutainer tube',
//     name: 'tubeGray',
//     background: '#808080',
//   },
//   {
//     label: 'Vacutainer tube',
//     name: 'tubeMintGreen',
//     background: '#98FF98',
//   },
//   { label: 'Alcohol pad', name: 'alcoholPad' },
//   { label: 'Adhesive bandage', name: 'adhesiveBandage' },
//   { label: 'Red vacutainer, needle', name: 'redVacutainer' },
//   { label: 'Glove', name: 'glove' },
//   { label: 'Cotton bud', name: 'cottonBud' },
//   { label: 'Принтерийн наалт', name: 'printer' },
//   { label: 'Чангалуур', name: 'tourniquet' },
// ]

/* #endregion */

/* #region  barcode printer */
async function setup(device) {
  return device
    .open()
    .then(() => {
      return device.selectConfiguration(1)
    })
    .then(() => device.claimInterface(0))
    .catch(errorInfo => {
      console.log(errorInfo)
      console.log('HINT:')
    })
}

// code49
// B2100,400,F,1,3,88,0,7,0,'12345ABC'

// B178,196,0,2,6,100,0,0'12345678'\n

// B10,0,0,2,6,100,0,0’1234’\n

// B2100,400,F,1,3,88,0,7,0,'12345ABC'\n

// B20,0,P,30,5,0,0,1,1,3,10,0,’ BIXOLON Label Printer SLPDX420’

// B10,0,0,1,2,100,0,7,'12345678'

const printRaw = (device, payload) => {
  const {
    ageSex,
    lastName,
    firstName,
    gender,
    barcode,
    testName,
    // subTestNames,
  } = payload
  const Organization = `Liver Center`
  const latinLastName = cyrillicToLatin(lastName)
  const latinFirstName = cyrillicToLatin(firstName)

  const sampleCollectionDateTime = dateTime.toLocalDateTime(
    new Date(),
    'yyyy-mm-dd hh:mm:ss'
  )

  var string = `SM10,0\n
    T15,180,0,1,1,0,3,N,N,'  ${Organization}  '\n
    T40,200,0,1,1,0,3,N,N,'${testName}'\n
    T90,200,0,1,1,0,3,N,N,'______________________'\n
    B1110,200,7,2,4,50,3,7,'${barcode}'\n
    T190,200,0,1,1,0,3,N,N,'${sampleCollectionDateTime}'\n
    T195,200,0,1,1,0,3,N,N,'______________________'\n
    T210,200,0,1,1,0,3,N,N,'${latinLastName}'\n
    T225,200,0,1,1,0,3,N,N,'${latinFirstName}'\n
    T240,200,0,1,1,0,3,N,N,'${gender}'\n
    T255,200,0,1,1,0,3,N,N,'${ageSex}'\n
    P1\n`

  var encoder = new TextEncoder()
  var data = encoder.encode(string)
  return device.transferOut(2, data)
}

// T305,180,0,1,1,0,3,N,N,'${patientNumber}'\n

/* #endregion */

/* #region  sample status, nurse kit collapse */

const sampleStatus = [
  {
    display: 'Canceled sample',
    value: 'on-hold',
    backgroundColor: '#FCD930',
  },
  {
    display: 'Research sample',
    value: 'reSearch',
    backgroundColor: '#6a0dad',
  },
  {
    display: 'Returned sample',
    value: 'revoked',
    backgroundColor: '#8ED5FE',
  },
  {
    display: 'Cito',
    value: 'stat',
    backgroundColor: '#DB1B44',
    disabled: true,
  },
]

const NurseKitCollapse = props => {
  const { values } = props
  let usedEquipmentValue
  let defaultValueInput
  let checkedBoxDisable = false

  if (props.default && props.default.usedEquipments) {
    checkedBoxDisable = true
    usedEquipmentValue = props.default.usedEquipments.find(
      usedEquipment => usedEquipment.productId === props.values.productId
    )
  }

  if (usedEquipmentValue) defaultValueInput = usedEquipmentValue.number
  else defaultValueInput = 0

  const [disableInput, setDisableInput] = useState(true)
  const [data, setData] = useState(defaultValueInput)

  const onCheck = event => {
    if (!disableInput) {
      setData(0)
      props.onChange(0)
    } else {
      setData(1)
      props.onChange(1)
    }

    setDisableInput(!event.target.checked)
    if (!event.target.checked) props.onChange()
  }

  const onInputChange = value => {
    setData(value)
    props.onChange(value)
  }

  return (
    <Row
      gutter={16}
      key={values && values.productId}
      type="flex"
      align="middle"
      justify="space-between"
    >
      <Col span={14} style={{ whiteSpace: 'nowrap' }}>
        <Checkbox
          value={values && values.productId}
          onChange={onCheck}
          className={styles.cont}
          disabled={checkedBoxDisable}
        >
          {values && values.name}
        </Checkbox>
      </Col>
      <Col span={2}>
        <div
          style={{
            width: '16px',
            height: '16px',
            background: values.backgroundColor,
          }}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          value={data}
          defaultValue={defaultValueInput}
          min={0}
          size="small"
          style={{ width: '40px', height: '20px' }}
          disabled={disableInput}
          onChange={onInputChange}
        />
      </Col>
      <Col span={4}>
        <CustomIcon type={values.icon} style={{ fontSize: '20px' }} />
      </Col>
    </Row>
  )
}

const SpecimenStatusCollapse = props => {
  const { values } = props

  return (
    <Row
      style={{ width: '200px' }}
      gutter={[16, 8]}
      type="flex"
      align="middle"
      justify="space-between"
    >
      <Col span={20}>
        <Checkbox value={values && values.value} disabled={values.disabled}>
          <Trans id={values.display} />
        </Checkbox>
      </Col>
      <Col span={4}>
        <div
          style={{
            width: '16px',
            height: '16px',
            background: values.backgroundColor,
          }}
        />
      </Col>
    </Row>
  )
}

/* #endregion */

const OrderService = props => {
  /* #region  consts */
  const { phlebotomy_serviceRequestList, form, app, i18n } = props
  const immunologyDisplay = app.FHIR_CODES.ImmunologyTests.display
  const rapidDisplay = app.FHIR_CODES.UncategorizedTests.RapidTests.display
  const viralLoadDisplay =
    app.FHIR_CODES.UncategorizedTests.ViralLoadTests.display
  const { getFieldDecorator } = form
  const { labTestOrders, specimenReference } = phlebotomy_serviceRequestList

  const [modalSuccessVisible, showSuccessModal] = useState(false)
  const [barcode, setBarcode] = useState()
  const [barcodePrinter, setBarcodePrinter] = useState()
  const [equipmentData, setEquipmentData] = useState([])
  const [currentTestName, setCurrentTestName] = useState('')

  const [selectedTab, setSelectedTab] = useState(
    labTestOrders &&
      labTestOrders
        .findIndex(testName => testName.specimen === undefined)
        .toString() === '-1'
      ? '0'
      : labTestOrders
          .findIndex(testName => testName.specimen === undefined)
          .toString()
  )

  const patientInformation = {
    ageSex: phlebotomy_serviceRequestList.age,
    gender: phlebotomy_serviceRequestList.gender,
    barcode: phlebotomy_serviceRequestList.barcode,
    id: phlebotomy_serviceRequestList.listId,
    lastName: phlebotomy_serviceRequestList.lastName,
    firstName: phlebotomy_serviceRequestList.firstName,
    nationalIdentifierNumber: phlebotomy_serviceRequestList.NInum,
  }

  /* #endregion */

  const onChangeTab = value => {
    const equivalentName = labTestOrders.find(
      name => name.testKey.join(' ') === value
    )

    if (equivalentName && equivalentName.specimen) {
      equivalentName.specimen.forEach(specimenName => {
        setBarcode(
          specimenName.identifier.find(
            i =>
              i.system ===
              props.app.FHIR_CODES.Identifiers.LiverCenter.Specimen.system
          ).value
        )

        if (equivalentName.testName.includes(immunologyDisplay)) {
          const immunologyExtracted = [
            ...equivalentName.testName.filter(
              testName => testName !== immunologyDisplay
            ),
            ...equivalentName.immunologySubTestNames,
          ]

          setCurrentTestName(immunologyExtracted.join(' '))
        } else if (equivalentName.testName.includes(viralLoadDisplay)) {
          const viralLoadExtracted = [
            ...equivalentName.testName.filter(
              testName => testName !== viralLoadDisplay
            ),
            ...equivalentName.viralLoadSubTestNames,
          ]
          setCurrentTestName(viralLoadExtracted.join(' '))
        } else if (equivalentName.testName.includes(rapidDisplay)) {
          const rapidExtracted = [
            ...equivalentName.testName.filter(testName => {
              return testName !== rapidDisplay
            }),
            ...equivalentName.rapidSubTestNames,
          ]
          setCurrentTestName(rapidExtracted.join(' '))
        } else {
          setCurrentTestName(equivalentName.testName.join(' '))
        }
      })
    } else {
      setCurrentTestName('')
      setBarcode(undefined)
    }
  }

  /* #region  request barcode printer and useEffect (onPrint)*/

  async function requestBarcodePrinter() {
    console.log(navigator)
    navigator.usb &&
      navigator.usb
        .requestDevice({
          filters: [
            {
              vendorId: 5380,
              // classCode: 0xff, // vendor-specific
              // protocolCode: 0x01,
            },
          ],
        })
        .then(selectedDevice => {
          setBarcodePrinter(selectedDevice)
        })
        .catch(errorInfo => {
          console.log(errorInfo)
          message.error(i18n.t`Cannot find label printer`)
        })
  }

  useEffect(() => {
    props
      .dispatch({
        type: 'phlebotomy/readEquipmentMaterials',
      })
      .then(data => setEquipmentData(data))
      .catch(errorInfo => console.log(errorInfo))

    try {
      requestBarcodePrinter()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const onPrint = async () => {
    let replacedTestNames = currentTestName
    if (!barcodePrinter) {
      await requestBarcodePrinter()
    }

    if (
      currentTestName.includes('Sars-Cov 2-IgG Elisa') ||
      currentTestName.includes('Sars-Cov 2-IgG') ||
      currentTestName.includes('Biochemistry')
    ) {
      const firstReplace = currentTestName.replace('Biochemistry', 'BIO')
      const secondReplace = firstReplace.replace(
        'Sars-Cov 2-IgG Elisa',
        'COV2E'
      )
      replacedTestNames = secondReplace.replace('Sars-Cov 2-IgG', 'COV2')
    }

    const payload = {
      ...patientInformation,
      patientNumber: patientInformation.barcode,
      barcode: barcode,
      testName: replacedTestNames,
    }
    if (barcodePrinter) {
      try {
        await setup(barcodePrinter)
        printRaw(barcodePrinter, payload)
      } catch (errorInfo) {
        console.log(errorInfo)
      }
    }
  }

  /* #endregion */

  /* #region  save title tabChange */
  const onSave = test => {
    let dataSource = []
    let requiredEquipmentConsumption = {}

    form
      .validateFields()
      .then(formValues => {
        if (test.testKey.join('') === 'RapidTests')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'BiochemistryTests')
          requiredEquipmentConsumption['tubeProductId'] = '555016'
        else if (test.testKey.join('') === 'ImmunologyTests')
          requiredEquipmentConsumption['tubeProductId'] = '555021'
        else if (test.testKey.join('') === 'Hematology')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'HCV_RNA')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'HBV_DNA')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'HDV_RNA')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'HIV_RNA')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'HPV')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (
          test.testKey.join('') === 'HematologyVitamin_D3' ||
          test.testKey.join('') === 'Vitamin_D3Hematology'
        )
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'Coagulation')
          requiredEquipmentConsumption['tubeProductId'] = '555018'
        else if (
          test.testKey.includes('BiochemistryTests') ||
          test.testKey.includes('Sars_Cov2_IgG') ||
          test.testKey.includes('Sars_Cov2_IgG_Elisa') ||
          test.testKey.includes('ImmunologyTests')
        )
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'Anti_HDV')
          requiredEquipmentConsumption['tubeProductId'] = '555016'
        else if (test.testKey.join('') === 'Ferritin')
          requiredEquipmentConsumption['tubeProductId'] = '555020'
        else if (test.testKey.join('') === 'Vitamin_D3')
          requiredEquipmentConsumption['tubeProductId'] = '555020'

        Object.keys(formValues.nurseKit).forEach(nameEquipments => {
          if (formValues.nurseKit && formValues.nurseKit[nameEquipments] > 0) {
            let searchedName = equipmentData.find(
              value => value.productId === nameEquipments.slice(-6)
            )
            searchedName.quantity = formValues.nurseKit[nameEquipments]

            if (
              searchedName &&
              searchedName.id === requiredEquipmentConsumption.tubeProductId
            )
              searchedName.quantity += 1

            dataSource.push(searchedName)
          }
        })

        if (!dataSource[0]) {
          const equipmentDefualtValue = equipmentData.find(
            value =>
              value.productId === requiredEquipmentConsumption.tubeProductId
          )
          equipmentDefualtValue.quantity = 1
          dataSource.push(equipmentDefualtValue)
        }
        return props.dispatch({
          type: 'phlebotomy_serviceRequestList/specimenCollected',
          payload: {
            ...test,
            dataSource: dataSource,
            patientInformation,
            specimenStatus:
              formValues.specimenStatus && formValues.specimenStatus[0],
          },
        })
      })
      .then(() => {
        return props.dispatch({
          type: 'phlebotomy_serviceRequestList/query',
          payload: {
            listId: phlebotomy_serviceRequestList.listId,
          },
        })
      })
      .then(result => {
        const equivalentName = result.labTestOrders.find(
          name => name.testKey.join(' ') === test.testKey.join(' ')
        )

        if (equivalentName && equivalentName.specimen) {
          // NOTE: Barcode here is the last specimen identifier
          equivalentName.specimen.forEach(specimenName => {
            setBarcode(
              specimenName.identifier.find(
                i =>
                  i.system ===
                  props.app.FHIR_CODES.Identifiers.LiverCenter.Specimen.system
              ).values
            )
          })

          if (equivalentName.testName.includes(immunologyDisplay)) {
            const immunologyExtracted = [
              ...equivalentName.testName.filter(
                testName => testName !== immunologyDisplay
              ),
              ...equivalentName.immunologySubTestNames,
            ]
            setCurrentTestName(immunologyExtracted.join(' '))
          } else if (equivalentName.testName.includes(viralLoadDisplay)) {
            const viralLoadExtracted = [
              ...equivalentName.testName.filter(
                testName => testName !== viralLoadDisplay
              ),
              ...equivalentName.viralLoadSubTestNames,
            ]
            setCurrentTestName(viralLoadExtracted.join(' '))
          } else {
            setCurrentTestName(equivalentName.testName.join(' '))
          }
        }
      })
      .then(() => showSuccessModal(true))
      .catch(errorInfo => console.log(errorInfo))
  }

  const Title = (
    <Trans>
      <span className="title uppercase">Service </span>
      <span className="uppercase">Orders</span>
    </Trans>
  )

  const onTabChangeIndex = v => {
    setSelectedTab(v)
  }

  const onChangeSpecimenStatus = checkedValues => {
    if (checkedValues.length > 1) checkedValues.shift()
  }

  /* #endregion */

  return (
    <div>
      <ModuleBox title={Title}>
        <div className={styles.tabsContainer}>
          {!props.loading.effects['phlebotomy_serviceRequestList/query'] && (
            <Tabs
              defaultActiveKey={selectedTab}
              tabPosition="left"
              style={{ minHeight: 500 }}
              onChange={onTabChangeIndex}
            >
              {labTestOrders.map((test, index) => {
                const { testName, testKey, status } = test
                const disabled = status === 'revoked'

                const tabTitle = (
                  <div
                    style={{
                      fontWeight: '2px',
                      fontFamily: 'Helvetica Neue Medium',
                      background:
                        selectedTab === index.toString() ? '#EDEDED' : '#FFF',
                      padding: '12px',
                    }}
                  >
                    <Button
                      type={test.specimen && 'primary'}
                      style={{ background: test.specimen ? '#00695C' : '#FFF' }}
                      onClick={() => onChangeTab(testKey.join(' '))}
                      block
                      disabled={disabled}
                    >
                      {testName.join(' | ')}
                    </Button>
                  </div>
                )

                return (
                  <TabPane tab={tabTitle} key={index.toString()}>
                    <Form>
                      <Row
                        gutter={16}
                        style={{ background: '#EDEDED', padding: '20px' }}
                      >
                        <Col span={12}>
                          <BorderCollapse
                            displayName={<Trans id="Nurse kit" />}
                            active
                            bordered={true}
                            background="#FFF"
                          >
                            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                              <Checkbox className={styles.checkAll}>
                                <Trans id="All" />
                              </Checkbox>
                            </div>

                            <br />
                            {equipmentData.map(value => (
                              <Form.Item>
                                {getFieldDecorator(
                                  `nurseKit._${value.productId}`,
                                  {
                                    rules: [{ required: false }],
                                  }
                                )(
                                  <NurseKitCollapse
                                    values={value}
                                    default={
                                      test.specimen &&
                                      specimenReference &&
                                      specimenReference.specimen.find(
                                        subSpecimen =>
                                          subSpecimen.test ===
                                          test.testName.join(' ')
                                      )
                                    }
                                  />
                                )}
                              </Form.Item>
                            ))}
                          </BorderCollapse>
                        </Col>

                        <Col span={12}>
                          <BorderCollapse
                            displayName={<Trans id="Specimen Condition" />}
                            active
                            bordered={true}
                            background="#FFF"
                          >
                            <Form.Item>
                              {getFieldDecorator(`specimenStatus`, {
                                rules: [{ required: false }],
                              })(
                                <Checkbox.Group
                                  onChange={onChangeSpecimenStatus}
                                >
                                  {sampleStatus.map(value => (
                                    <SpecimenStatusCollapse values={value} />
                                  ))}
                                </Checkbox.Group>
                              )}
                            </Form.Item>
                          </BorderCollapse>
                          <br />
                          <Row gutter={[8, 8]}>
                            <Col span={24}>
                              <Button
                                style={{ width: '100%' }}
                                type="primary"
                                onClick={() => onPrint()}
                                disabled={!barcode}
                              >
                                <Trans id="Barcode" />
                              </Button>
                            </Col>
                            <Col span={12}>
                              <Button className="button-dark-gray" block>
                                <Trans id="Cancel" />
                              </Button>
                            </Col>
                            <Col span={12}>
                              <Button
                                className="button-red"
                                block
                                disabled={test.specimen}
                                onClick={() => onSave({ ...test })}
                                loading={
                                  props.loading.effects[
                                    'phlebotomy_serviceRequestList/specimenCollected'
                                  ]
                                }
                              >
                                &nbsp;
                                <Trans id="Save" />
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </TabPane>
                )
              })}
            </Tabs>
          )}
        </div>

        <MessageModal
          visible={modalSuccessVisible}
          onCancel={() => showSuccessModal(false)}
          type="success"
          content="Амжилттай"
        />
      </ModuleBox>
    </div>
  )
}

OrderService.propTypes = {
  app: PropTypes.object,
  phlebotomy: PropTypes.object,
  phlebotomy_serviceRequestList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, phlebotomy, phlebotomy_serviceRequestList, loading }) => ({
    app,
    phlebotomy_serviceRequestList,
    phlebotomy,
    loading,
  })
)(
  withI18n()(
    Form.create({
      onFieldsChange: onFieldsChange,
    })(OrderService)
  )
)

function onFieldsChange(props, changedFields, allFields) {
  if (changedFields.nurseKit) {
    let newCount = {}
    Object.keys(allFields.nurseKit).forEach(v => {
      if (allFields.nurseKit[v] && allFields.nurseKit[v].value > 0) {
        newCount[allFields.nurseKit[v].name.slice(-6)] =
          allFields.nurseKit[v].value
      }
    })
    props.dispatch({
      type: 'phlebotomy_serviceRequestList/updateState',
      payload: {
        changingEquipmentsValue: newCount,
      },
    })
  }
}
