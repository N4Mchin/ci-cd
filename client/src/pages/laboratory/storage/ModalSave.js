import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Row, Col, Form, Input, Button, Divider } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { FloatNumber, IntegerInput, MessageModal, DivInput } from 'components'
import { DatabaseOutlined } from '@ant-design/icons'
import styles from './styles.less'

import JsBarcode from 'jsbarcode'
import * as dateTime from 'utils/datetime'
import * as helper from 'utils/helper'

const { Search } = Input

/* #region  storage details */
// <Col span={12}>
//   <Form.Item
//     label="Хэмжээ"
//     {...formItemLayout}
//     labelAlign="left"
//     colon={false}
//     help={false}
//   >
//     {getFieldDecorator('size', {
//       rules: [{ required: true }],
//       // initialValue: specimens && specimens.size,
//     })(<IntegerInput min={0} max={200} disabled={disabled} />)}
//   </Form.Item>
// </Col> */}

// {/* <Col span={12}>
//   <Form.Item
//     label="Хөргөгч"
//     {...formItemLayout}
//     labelAlign="left"
//     colon={false}
//     help={false}
//   >
//     {getFieldDecorator('freezer', {
//       rules: [{ required: true }],
//       // initialValue: specimen && specimen.cooler,
//     })(<IntegerInput min={0} max={200} disabled={disabled} />)}
//   </Form.Item>
// </Col>

// <Col span={12}>
//   <Form.Item
//     label="Тасалгаа"
//     {...formItemLayout}
//     labelAlign="left"
//     colon={false}
//     help={false}
//   >
//     {getFieldDecorator('compartment', {
//       rules: [{ required: true }],
//       // initialValue: specimen && specimen.room,
//     })(<IntegerInput min={0} max={200} disabled={disabled} />)}
//   </Form.Item>
// </Col>

// <Col span={12}>
//   <Form.Item
//     label="Давхар"
//     {...formItemLayout}
//     labelAlign="left"
//     colon={false}
//     help={false}
//   >
//     {getFieldDecorator('layer', {
//       rules: [{ required: true }],
//       // initialValue: specimen && specimen.floor,
//     })(<IntegerInput min={0} max={200} disabled={disabled} />)}
//   </Form.Item>
// </Col>

// <Col span={12}>
//   <Form.Item
//     label="Мөр"
//     {...formItemLayout}
//     labelAlign="left"
//     colon={false}
//     help={false}
//   >
//     {getFieldDecorator('row', {
//       rules: [{ required: true }],
//       // initialValue: specimen && specimen.row,
//     })(<IntegerInput min={0} max={200} disabled={disabled} />)}
//   </Form.Item>
// </Col>

// <Col span={12}>
//   <Form.Item
//     label=""
//     {...formItemLayout}
//     labelAlign="left"
//     colon={false}
//     help={false}
//   >
//     {getFieldDecorator('col', {
//       rules: [{ required: true }],
//       // initialValue: specimen && specimen.col,
//     })(<IntegerInput min={0} max={200} disabled={disabled} />)}
//   </Form.Item>
// </Col>

// <Col span={12}>
//   <Form.Item
//     label="Байрлал"
//     {...formItemLayout}
//     labelAlign="left"
//     colon={false}
//     help={false}
//   >
//     {getFieldDecorator('location', {
//       rules: [{ required: true }],
//       // initialValue: specimen && specimen.location,
//     })(<IntegerInput min={0} max={200} disabled={disabled} />)}
//   </Form.Item>
// </Col>
/* #endregion */

/* #region  storageLocationNames formItemLayout */
const storageLocationNames = [
  {
    name: 'Хэмжээ',
    value: 'size',
    float: true,
  },
  {
    name: 'Хөргөгч',
    value: 'freezer',
    float: false,
  },
  {
    name: 'Тасалгаа',
    value: 'compartment',
    float: false,
  },
  {
    name: 'Давхар',
    value: 'layer',
    float: false,
  },
  {
    name: 'Мөр',
    value: 'row',
    float: false,
  },
  {
    name: 'Багана',
    value: 'col',
    float: false,
  },
  {
    name: 'Байрлал',
    value: 'location',
    float: false,
  },
]

const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
}

async function setup(device) {
  return device
    .open()
    .then(() => device.selectConfiguration(1))
    .then(() => device.claimInterface(0))
    .catch(errorInfo => {
      console.log(errorInfo)
    })
}
/* #endregion */

// code49
// B2100,400,F,1,3,88,0,7,0,'12345ABC'

// B178,196,0,2,6,100,0,0'12345678'\n

// B10,0,0,2,6,100,0,0’1234’\n

// B2100,400,F,1,3,88,0,7,0,'12345ABC'\n

// B20,0,P,30,5,0,0,1,1,3,10,0,’ BIXOLON Label Printer SLPDX420’

// B10,0,0,1,2,100,0,7,'12345678'

function printRaw(device, payload) {
  const { barcode, storage, test, firstName, lastName, storedAt } = payload

  const Organization = `Liver Center`
  const latinFirstName = helper.cyrillicToLatin(firstName)
  const latinLastName = helper.cyrillicToLatin(lastName)
  const currentDate = dateTime.toLocalDateTime(storedAt, 'yyyy-mm-dd')

  console.log(storedAt)
  var string = `SM10,0\n
  T10,180,0,1,1,0,3,N,N,'  ${Organization}  '\n
  T30,200,0,1,1,0,3,N,N,'${test}'\n
  T35,200,0,1,1,0,3,N,N,'____________________'\n
  B155,200,7,2,4,50,3,7,'${barcode}'\n
  T130,200,0,1,1,0,3,N,N,'${currentDate}'\n
  T135,200,0,1,1,0,3,N,N,'____________________'\n
  T155,200,0,1,1,0,3,N,N,'${latinLastName}'\n
  T170,200,0,1,1,0,3,N,N,'${latinFirstName}'\n
  T175,200,0,1,1,0,3,N,N,'____________________'\n
  T190,200,0,1,1,0,3,N,N,'Size: ${storage.size}'\n
  T205,200,0,1,1,0,3,N,N,'Freezer: ${storage.freezer}'\n
  T220,200,0,1,1,0,3,N,N,'Compartment: ${storage.compartment}'\n
  T235,200,0,1,1,0,3,N,N,'Layer: ${storage.layer}'\n
  T250,200,0,1,1,0,3,N,N,'Row: ${storage.row}, Col: ${storage.col}'\n
  T265,200,0,1,1,0,3,N,N,'Location: ${storage.location}'\n
  P1\n`

  var encoder = new TextEncoder()
  var data = encoder.encode(string)

  device.transferOut(2, data).catch(error => {
    console.log(error)
  })
}

const ModalSave = props => {
  /* #region  constants */
  const {
    lastStoredValue,
    laboratory_storage,
    loading,
    i18n,
    form,
    ...modalProps
  } = props
  const { getFieldDecorator } = form

  const [barcodePrinter, setBarcodePrinter] = useState()
  const [specimenInfo, setSpecimenInfo] = useState()
  const [disabled, setDisabled] = useState(true)
  const [barcodeDetails, setBarcodeDetails] = useState()
  const [modalMessageVisible, setModalMessageVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [modalType, setModalType] = useState('success')

  const patient = specimenInfo && specimenInfo.patient
  const specimen = specimenInfo && specimenInfo.specimen

  const clientBirthDate =
    patient && helper.calculateBirthDate(patient.nationalIdentifierNumber)
  const clientGender =
    patient && helper.calculateGender(patient.nationalIdentifierNumber)
  const clientAge =
    clientBirthDate && helper.calculateAgeFromBirthDate(clientBirthDate)

  const genderUpperValue =
    clientGender && clientGender.charAt(0).toUpperCase() + clientGender.slice(1)
  /* #endregion */

  /* #region  related with barcode print */
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
          // message.error(i18n.t`Cannot find label printer`)
        })
  }

  useEffect(() => {
    try {
      requestBarcodePrinter()
    } catch (error) {
      console.log(error)
    }
  }, [])
  /* #endregion */

  // need a value of barcode

  /* #region  On print, on search, and handle save data */
  const onPrint = async value => {
    if (!barcodePrinter) {
      await requestBarcodePrinter()
    }

    const payload = {
      storedAt: new Date(),
      ...value,
      firstName: patient && patient.firstName,
      lastName: patient && patient.lastName,
    }

    if (barcodePrinter) {
      await setup(barcodePrinter)
      printRaw(barcodePrinter, payload)
    }
  }

  async function onSearch(value) {
    //   setModalType('error')
    //   setMessage(<Trans id="Input a number" />)
    //   setModalMessageVisible(true)
    //   await helper.delay(1500)
    //   return
    props
      .dispatch({
        type: 'laboratory_storage/searchBarcodePrint',
        payload: { id: value },
      })
      .then(async data => {
        if (!helper.isEmptyObject(data)) {
          setSpecimenInfo(data)
          setDisabled(false)
          const searchedBarcodeDetails = data.specimen.find(
            specimen => specimen.barcode === value
          )

          setBarcodeDetails(searchedBarcodeDetails)
        } else {
          setModalType('info')
          setMessage(<Trans id="BarcodeNotFound" />)
          setModalMessageVisible(true)
          await helper.delay(1000)
        }
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() =>
        JsBarcode('#ean-8', `${value}`, { format: 'ean8', width: 3 })
      )
  }

  const onSaveData = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'laboratory_storage/saveNewStorageDetails',
          payload: { storage: formValues, barcode: barcodeDetails.barcode },
        })
      })
      .then(async response => {
        if (response) {
          setModalType('success')
          setMessage(i18n.t`Save successful`)
        } else {
          setModalType('info')
          setMessage(i18n.t`Location you entered has a specimen`)
        }

        setModalMessageVisible(true)
        await helper.delay(1500)

        onSearch(barcodeDetails.barcode)
        props.dispatch({ type: 'laboratory_storage/query' })
      })
  }
  /* #endregion */

  return (
    <Modal {...modalProps} width="550px" footer={[null]}>
      <Form>
        <div
          style={{
            padding: '18px',
            border: '1px solid #C9C9C9',
            marginTop: '12px',
          }}
        >
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            gutter={[16, 16]}
          >
            <Col span={12}>
              <div>
                <svg id="ean-8" />
              </div>
              {i18n.t`Barcode`}
              <Search
                allowClear
                enterButton
                placeholder={i18n.t`Barcode`}
                onSearch={onSearch}
                maxLength={13}
              />
            </Col>
            <Col span={12}>
              <Row
                type="flex"
                justify="space-between"
                align="middle"
                gutter={[16, 16]}
              >
                <Col span={11}>{i18n.t`LastName`}</Col>
                <Col span={13}>
                  <DivInput
                    style={{ color: patient ? '' : '#bfbfbf' }}
                    value={patient ? patient.lastName : i18n.t`LastName`}
                  />
                </Col>

                <Col span={11}>{i18n.t`FirstName`}</Col>
                <Col span={13}>
                  <DivInput
                    style={{ color: patient ? '' : '#bfbfbf' }}
                    value={patient ? patient.firstName : i18n.t`FirstName`}
                  />
                </Col>

                <Col span={11}>{i18n.t`Age/Gender`}</Col>
                <Col span={13}>
                  <DivInput
                    style={{ color: patient ? '' : '#bfbfbf' }}
                    value={
                      patient ? (
                        <div>
                          {clientAge}/
                          <Trans id={genderUpperValue} />
                        </div>
                      ) : (
                        i18n.t`Age/Gender`
                      )
                    }
                  />
                </Col>

                <Col span={11}>{i18n.t`SampleDate`}</Col>
                <Col span={13}>
                  <DivInput
                    style={{ color: patient ? '' : '#bfbfbf' }}
                    value={
                      patient
                        ? dateTime.toLocalDateTime(
                            specimenInfo && specimenInfo.createdAt,
                            'yyyy-mm-dd'
                          )
                        : i18n.t`SampleDate`
                    }
                  />
                </Col>

                <Col span={11}>{i18n.t`SampleName`}</Col>
                <Col span={13}>
                  <DivInput
                    style={{ color: patient ? '' : '#bfbfbf' }}
                    value={
                      barcodeDetails ? barcodeDetails.test : i18n.t`SampleName`
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <div className={styles.divider}>
            <Divider />
          </div>

          {specimen && (
            <Row
              type="flex"
              justify="space-between"
              align="middle"
              gutter={[16, 8]}
            >
              {specimen.map(value => {
                const inputValue = (
                  <Row type="flex" justify="space-between">
                    <Col>{value.test}</Col>
                    {value.storage ? (
                      <DatabaseOutlined style={{ fontSize: '20px' }} />
                    ) : (
                      ''
                    )}
                  </Row>
                )

                return (
                  <Col span={12}>
                    <DivInput
                      value={inputValue}
                      style={{ background: '#cccccc' }}
                    />
                  </Col>
                )
              })}
            </Row>
          )}

          <div className={styles.divider}>
            <Divider />
          </div>

          {barcodeDetails && (
            <Row
              type="flex"
              justify="space-between"
              align="middle"
              gutter={[4, 4]}
            >
              {storageLocationNames.map(locationName => {
                return (
                  <Col span={12}>
                    <Form.Item
                      label={locationName.name}
                      {...formItemLayout}
                      labelAlign="left"
                      colon={false}
                      help={false}
                    >
                      {getFieldDecorator(`${locationName.value}`, {
                        rules: [{ required: true }],
                        initialValue:
                          lastStoredValue &&
                          lastStoredValue[locationName.value],
                      })(
                        locationName && locationName.float ? (
                          <FloatNumber disabled={disabled} />
                        ) : (
                          <IntegerInput min={0} max={200} disabled={disabled} />
                        )
                      )}
                    </Form.Item>
                  </Col>
                )
              })}

              <Col span={24}>
                <Button
                  className="button-red uppercase"
                  block
                  onClick={() => onSaveData()}
                >
                  <Trans id="Save" />
                </Button>
              </Col>

              <Col span={24}>
                <Button
                  disabled={barcodeDetails.storage ? false : true}
                  className="uppercase"
                  type="primary"
                  block
                  onClick={() => onPrint(barcodeDetails)}
                >
                  <Trans id="Print barcode" />
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </Form>

      <MessageModal
        type={modalType}
        visible={modalMessageVisible}
        onCancel={() => setModalMessageVisible(false)}
        content={message}
      />
    </Modal>
  )
}
ModalSave.propTypes = {
  laboratory_storage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, laboratory_storage, loading }) => ({
  app,
  laboratory_storage,
  loading,
}))(withI18n()(Form.create()(ModalSave)))
