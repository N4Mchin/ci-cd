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
import DataTable from '../../antiHDV/dailyLog/DataTable'
import TestProtcolsHeader from '../../../components/TestProtocolsHeader'
import { SelectItem } from 'components'
const moment = require('moment')

const control = {
  blank: 'Blank',
  negativControl: 'Negative control',
  positiveControl: 'Positive control',
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
      control: control.blank,
    },
    {
      dataIndex: '2',
      rowName: 'B',
      reagent: <div>B</div>,
      control: control.negativControl,
    },
    {
      dataIndex: '3',
      rowName: 'C',
      reagent: <div>C</div>,
      control: control.negativControl,
    },
    {
      dataIndex: '4',
      rowName: 'D',
      reagent: <div>D</div>,
      control: control.negativControl,
    },
    {
      dataIndex: '5',
      rowName: 'E',
      reagent: <div>E</div>,
      control: control.positiveControl,
    },
    {
      dataIndex: '6',
      rowName: 'F',
      reagent: <div>F</div>,
      control: control.positiveControl,
    },
    {
      dataIndex: '7',
      rowName: 'G',
      reagent: <div>G</div>,
    },
    {
      dataIndex: '8',
      rowName: 'H',
      reagent: <div>H</div>,
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
                .Ferritin,
            //...pagination,
            //_sort: 'authored',
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
          const totalPage = receivedData.length / 90
          while (i <= totalPage) {
            array = receivedData.slice(i * 90, (i + 1) * 90)

            slicedArray.push(array)
            i = i + 1
          }

          let outputDataSource = {}

          slicedArray.map((rawItem, pageIndex) => {
            if (
              ['A', 'B', 'C', 'D', 'E', 'F'].includes(
                SecondArray[rowIndex].rowName
              ) &&
              colIndex === 1
            ) {
            }
            //гаралтын өгөгөдлийнхөө хүснэгтэнд A-F хүртэл default утгыг хийж өгнө
            outputDataSource[`page_${pageIndex}`] = {
              A: {
                day_1: SecondArray.find(item => item.rowName === 'A').control,
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
              G: {},
              H: {},
            }
          })

          slicedArray.map((slicedItemArray, pageIndex) => {
            // slicedItemArray 0 - 90 hurtelh ugugdul
            let colIndex = 1
            let rowIndex = 6

            slicedItemArray.forEach(slicedItem => {
              const parentLetter = SecondArray[rowIndex].rowName

              const dayIndex = `day_${colIndex}`
              outputDataSource[`page_${pageIndex}`][parentLetter][dayIndex] =
                slicedItem.patientName

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
        const reduxData = props.laboratory_test_ferritin

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
      type: 'laboratory_test_ferritin/updateState',
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
  ({ app, loading, laboratory_test, laboratory_test_ferritin }) => ({
    app,
    loading,
    laboratory_test,
    laboratory_test_ferritin,
  })
)(withI18n()(Form.create()(ProtocolBlank)))
