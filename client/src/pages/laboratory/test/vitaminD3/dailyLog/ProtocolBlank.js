import React, { useState, useEffect, useRef } from 'react'
import PropTypes, { element } from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import ReactToPrint from 'react-to-print'
import { getDate } from 'utils/datetime'
import * as helper from 'utils/helper'
import { Button, Row, Col, Form, DatePicker, Spin } from 'antd'
import RecordedLaboratoryTechnician from '../../components/RecordedLaboratoryTechnician'
import DataTable from './DataTable'
import TestProtcolsHeader from '../../../components/TestProtocolsHeader'
import { SelectItem } from 'components'
import * as dateTime from 'utils/datetime'
const moment = require('moment')

const control = {
  standartOne: 'Стандарт 1',
  standartTwo: 'Стандарт 2',
  standartThree: 'Стандарт 3',
  standartFour: 'Стандарт 4',
  standartFive: 'Стандарт 5',
  standartSix: 'Стандарт 6',
  standartSeven: 'Стандарт 7',
  monitorOne: 'Хяналт 1',
  monitorTwo: 'Хяналт 2',
}

const ProtocolBlank = props => {
  const { form, loading } = props
  const { getFieldDecorator } = form

  const dataArray = [[]]

  const SecondArray = [
    {
      dataIndex: '1',
      rowName: 'A',
      reagent: <div> A</div>,
      control: control.standartOne,
    },
    {
      dataIndex: '2',
      rowName: 'B',
      reagent: <div>B</div>,
      control: control.standartTwo,
    },
    {
      dataIndex: '3',
      rowName: 'C',
      reagent: <div>C</div>,
      control: control.standartThree,
    },
    {
      dataIndex: '4',
      rowName: 'D',
      reagent: <div>D</div>,
      control: control.standartFour,
    },
    {
      dataIndex: '5',
      rowName: 'E',
      reagent: <div>E</div>,
      control: control.standartFive,
    },
    {
      dataIndex: '6',
      rowName: 'F',
      reagent: <div>F</div>,
      control: control.standartSix,
    },
    {
      dataIndex: '7',
      rowName: 'G',
      reagent: <div>G</div>,
      control: control.standartSeven,
    },
    {
      dataIndex: '8',
      rowName: 'H',
      reagent: <div>H</div>,
      control: control.monitorOne,
    },
    {
      dataIndex: '9',
      rowName: 'A2',
      reagent: <div>A2</div>,
      control: control.monitorTwo,
    },
  ]

  const onSeeResult = () => {
    props.app.FHIR_CODES &&
      props.app.FHIR_CODES.UncategorizedTests &&
      props.app.FHIR_CODES.UncategorizedTests.OtherTests &&
      props.app.FHIR_CODES.UncategorizedTests.OtherTests.include &&
      props
        .dispatch({
          type: 'laboratory_test/queryTestsVerifiedWithDateRange',
          payload: {
            labTestCode:
              props.app.FHIR_CODES.UncategorizedTests.OtherTests.include
                .Vitamin_D3,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            endDate: moment(endDate).format('YYYY-MM-DD'),
          },
        })
        .then(receivedData => {
          let slicedArray = []
          let array = []
          let i = 0
          let rowIndex = 0
          let colIndex = 1
          //ирж байгаа өгөгдлөө 90р хувааж хүснэгтэнд хийнэ
          const totalPage = receivedData.length / 87
          while (i <= totalPage) {
            array = receivedData.slice(i * 87, (i + 1) * 87)

            slicedArray.push(array)
            i = i + 1
          }

          let outputDataSource = {}
          slicedArray.map((rawItem, pageIndex) => {
            if (
              ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(
                SecondArray[rowIndex].rowName
              ) &&
              colIndex === 1
            ) {
            } else if (
              ['A'].includes(SecondArray[rowIndex].rowName) &&
              colIndex === 2
            ) {
            }
            //гаралтын өгөгөдлийнхөө хүснэгтэнд A-F хүртэл default утгыг хийж өгнө

            outputDataSource[`page_${pageIndex}`] = {
              A: {
                day_1: SecondArray.find(item => item.rowName === 'A').control,
                day_2: SecondArray.find(item => item.rowName === 'A2').control,
              },

              B: {
                day_1: SecondArray.find(item => item.rowName === 'B').control,
              },
              C: {
                day_1: SecondArray.find(item => item.rowName === 'C').control,
              },
              D: {
                day_1: SecondArray.find(item => item.rowName === 'D').control,
              },
              E: {
                day_1: SecondArray.find(item => item.rowName === 'E').control,
              },
              F: {
                day_1: SecondArray.find(item => item.rowName === 'F').control,
              },
              G: {
                day_1: SecondArray.find(item => item.rowName === 'G').control,
              },
              H: {
                day_1: SecondArray.find(item => item.rowName === 'H').control,
              },
            }
          })

          slicedArray.map((slicedItemArray, pageIndex) => {
            // slicedItemArray 0 - 90 hurtelh ugugdul
            let colIndex = 2

            let rowIndex = 1

            slicedItemArray.forEach(slicedItem => {
              const result =
                slicedItem.latestObservation &&
                slicedItem.latestObservation.valueQuantity &&
                slicedItem.latestObservation.valueQuantity.value

              const date = dateTime.toLocalDateTime(
                slicedItem.date,
                'YYYY-MM-DD'
              )

              const sampleBarcode = slicedItem.sampleAccessionIdentifier

              const parentLetter = SecondArray[rowIndex].rowName

              const dayIndex = `day_${colIndex}`

              outputDataSource[`page_${pageIndex}`][parentLetter][
                dayIndex
              ] = `${slicedItem.patientName} | ${sampleBarcode} | ${result} | ${date}`

              rowIndex = rowIndex + 1

              if (rowIndex === 8) {
                colIndex = colIndex + 1
                rowIndex = 0
              }
            })
          })
          setDataSourceSecond(outputDataSource)
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingRef(false))
  }

  const componentRef = useRef()
  const [modalMessageVisible, showMessageModal] = useState(false)
  const [loadingRef, setLoadingRef] = useState(false)
  const [dataSourceSecond, setDataSourceSecond] = useState([...dataArray])
  const [startDate, setStartDate] = useState(moment().subtract(1, 'days'))
  const [endDate, setEndDate] = useState(moment())
  const [formValueChange, setFormValueChange] = useState({})

  async function refresh() {
    setLoadingRef(true)
    return await props
      .dispatch({
        type: 'laboratory_test/readSpecialProtocolData',
        payload: {
          testName: props.testName,
        },
      })
      .then(receivedData => {
        let rawData = []
        Object.keys(receivedData.values).forEach(key => {
          if (key.startsWith('page_')) {
            rawData.push(receivedData.values[key])
          }
        })

        setDataSourceSecond(rawData)
      })
      .catch(errorInfo => console.log(errorInfo))

      .finally(() => setLoadingRef(false))
  }

  const onSaveSpecialProtocolData = () => {
    setLoadingRef(true)
    form
      .validateFields()
      .then(values => {
        let indexedData = {}
        let allValues = {}
        const reduxData = props.laboratory_test_vitaminD3

        Object.keys(reduxData).forEach(key => {
          Object.keys(reduxData[key]).forEach(sub => {
            if (key.startsWith('page_')) {
              indexedData[key] = reduxData[key][sub]
            }
          })
        })

        allValues = {
          ...values,
          ...indexedData,
        }

        return props.dispatch({
          type: 'laboratory_test/saveSpecialProtocolData',
          payload: {
            testName: props.testName,
            values: allValues,
          },
        })
      })
      .then(async () => {
        await helper.delay(1000)
        showMessageModal(true)
        refresh()
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(() => setLoadingRef(false))
  }

  useEffect(() => {
    refresh()
  }, [])

  const onChange = value => {
    setStartDate(value[0])
    setEndDate(value[1])
  }

  const handle = (childData, pageIndex) => {
    const indexedData = { ...formValueChange, ...childData }

    props.dispatch({
      type: 'laboratory_test_vitaminD3/updateState',
      payload: {
        [`page_${pageIndex}`]: indexedData,
      },
    })
  }

  const defaultDate = getDate()
  const dateFormat = 'YYYY/MM/DD'

  const { RangePicker } = DatePicker
  const recordedLaboratoryTechnician = props.app.Practitioner.getOfficialNameString()

  return (
    <div>
      <div>
        <div className={styles.firstDiv} ref={componentRef}>
          <Row gutter={8}>
            <TestProtcolsHeader />
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '30px',
            }}
          >
            <Col>
              <RangePicker
                picker="month"
                defaultValue={[
                  moment(defaultDate, dateFormat),
                  moment(defaultDate, dateFormat),
                ]}
                onChange={onChange}
                format={dateFormat}
              />
            </Col>
            <Col>
              {' '}
              <span className="bold">{props.testName} тодорхойлох ФХЭБУА </span>
            </Col>

            <Col>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Col style={{ marginRight: '20px' }}>Аппаратны төрөл:</Col>
                <Col>
                  {' '}
                  <Form.Item>
                    {getFieldDecorator(`appartusType`, {
                      rules: [{ required: false }],
                      initialValue: 'XP-100',
                    })(<SelectItem />)}
                  </Form.Item>
                </Col>
              </div>
            </Col>
          </div>
          <div style={{ height: '30px' }}></div>
          {loadingRef && <Spin spinning />}

          {!loadingRef && (
            <>
              {Object.keys(dataSourceSecond).map((sliceData, index) => {
                return (
                  <>
                    {loadingRef && <Spin spinning />}
                    <DataTable
                      dataSource={dataSourceSecond[sliceData]}
                      pageIndex={index}
                      loading={loadingRef}
                      formValueChange={handle}
                    />
                  </>
                )
              })}
            </>
          )}
          <RecordedLaboratoryTechnician
            recordedLaboratoryTechnician={recordedLaboratoryTechnician}
          />
        </div>
        <Row
          style={{ marginTop: '10px' }}
          type="flex"
          justifyContent="flex-start"
        >
          <Col>
            <Button
              type="primary"
              onClick={onSeeResult}
              block
              loading={
                loading.effects[
                  'laboratory_test/queryTestsVerifiedWithDateRange'
                ]
              }
            >
              Хариу харах
            </Button>
          </Col>
        </Row>

        <Row gutter={8} style={{ marginTop: '30px' }}>
          <Col span={18}></Col>
          {/* <Col span={2}>
            <Button type="primary" block onClick={onPrint}>
              <Trans>Download</Trans>
            </Button>
          </Col> */}
          <Col span={3}>
            <ReactToPrint
              trigger={() => (
                <Button type="primary" block>
                  <Trans>Print</Trans>
                </Button>
              )}
              content={() => componentRef.current}
              pageStyle={'@page {size: landscape}'}
            />
          </Col>
          <Col span={3}>
            <Button
              className="button-red"
              onClick={onSaveSpecialProtocolData}
              block
              loading={
                loading.effects['laboratory_test/saveSpecialProtocolData']
              }
            >
              <Trans>Save</Trans>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

ProtocolBlank.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ app, loading, laboratory_test, laboratory_test_vitaminD3 }) => ({
    app,
    loading,
    laboratory_test,
    laboratory_test_vitaminD3,
  })
)(withI18n()(Form.create()(ProtocolBlank)))
