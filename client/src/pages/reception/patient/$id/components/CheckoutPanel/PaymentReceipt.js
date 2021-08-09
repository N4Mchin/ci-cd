import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../RecentServices/styles.less'
import { Trans, withI18n } from '@lingui/react'
import { liverCenterLogo } from 'public'
import CheckoutPanel from './CheckoutPanel.less'
import { Row, Col, Typography, Divider, Table, Modal, Button } from 'antd'
import * as helper from 'utils/helper'
import ReactToPrint from 'react-to-print'
import * as dateTime from 'utils/datetime'
import { getDate } from 'utils/datetime'
import { isEmptyObject } from 'utils/helper'

const { Text } = Typography

const PaymentReceipt = props => {
  let date = getDate()
  const componentRef = useRef()
  const { reception_patientProfile, app } = props

  const {
    patientFirstName,
    patientLastName,
    patientNInum,
    patientPhoneNumber,
    latestPaymentReceipt,
    patient,
    diagnosticTestCost,
  } = reception_patientProfile

  const dataCheckup = []
  let pracName
  if (!isEmptyObject(patient)) {
    pracName =
      latestPaymentReceipt &&
      latestPaymentReceipt.SelectedCheckup &&
      latestPaymentReceipt.SelectedCheckup.practitioner &&
      latestPaymentReceipt.SelectedCheckup.practitioner.getOfficialNameString({
        short: true,
      })
  }

  dataCheckup.push({
    practitionerName: pracName,
    date: dateTime.toLocalDateTime(
      latestPaymentReceipt &&
        latestPaymentReceipt.SelectedCheckup &&
        latestPaymentReceipt.SelectedCheckup.selectedSlot &&
        latestPaymentReceipt.SelectedCheckup.selectedSlot.start,
      'yyyy-mm-dd'
    ),
    startTime: dateTime.toLocalDateTime(
      latestPaymentReceipt &&
        latestPaymentReceipt.SelectedCheckup &&
        latestPaymentReceipt.SelectedCheckup.selectedSlot &&
        latestPaymentReceipt.SelectedCheckup.selectedSlot.start,
      'hh:mm'
    ),

    endTime: dateTime.toLocalDateTime(
      latestPaymentReceipt &&
        latestPaymentReceipt.SelectedCheckup &&
        latestPaymentReceipt.SelectedCheckup.selectedSlot &&
        latestPaymentReceipt.SelectedCheckup.selectedSlot.end,
      'hh:mm'
    ),
    checkupType:
      latestPaymentReceipt &&
      latestPaymentReceipt.SelectedCheckup &&
      latestPaymentReceipt.SelectedCheckup.checkupType,
    checkupCost:
      latestPaymentReceipt &&
      latestPaymentReceipt.payment &&
      latestPaymentReceipt.payment.checkupCost,
  })

  let patientName
  if (!isEmptyObject(patient)) {
    patientName = patient.getOfficialNameString({ short: true })
  }

  const { SelectedTests = {}, payment = {} } = latestPaymentReceipt
  const { totalAmount } = payment

  let testPriceArray = []
  const diagnosticTestName = []

  Object.keys(SelectedTests).forEach(testCategory => {
    //Сонгогдсон шинжилгээнүүдийг задлаад
    const subTest = SelectedTests[testCategory].include
    const title = SelectedTests[testCategory].display

    //Биохими, Иммунологи байх юм бол нэг тусдаа бодогдоно
    if (
      testCategory === 'BiochemistryTests' ||
      testCategory === 'ImmunologyTests'
    ) {
      let sum = 0
      Object.keys(subTest).forEach(key => {
        const subTestInclude = subTest[key].include

        Object.keys(subTestInclude).forEach(finalTest => {
          sum += subTestInclude[finalTest].cost
        })
      })
      testPriceArray.push({ title, sum })
    } else {
      // ValueSet дээрээ Biochemistry, Immunology, UncategorizedTests гэсэн гурван төрлөөр хуваагдаж байгаа бөгөөд
      // Biochemistry, Immunology биш тохиолдолд  UncategorizedTests гэсэн үг
      // UncategorizedTests нь дотроо OtherTests ба бусад гэж хуваагдаж байгаа бөгөөд тэдгээр нь тус тусдаа бодогдоно

      Object.keys(subTest).forEach(key => {
        if (key === 'OtherTests') {
          let sum = 0
          const subTestInclude = subTest[key].include
          let title
          Object.keys(subTestInclude).forEach(finalTest => {
            title = subTestInclude[finalTest].display
            sum = subTestInclude[finalTest].cost
            testPriceArray.push({ title, sum })
          })
        } else {
          const subTestInclude = subTest[key].include
          const title = subTest[key].display
          let sum = 0
          Object.keys(subTestInclude).forEach(finalTest => {
            sum += subTestInclude[finalTest].cost
          })
          testPriceArray.push({ title, sum })
        }
      })
    }
  })

  if (diagnosticTestCost !== 0) {
    diagnosticTestName.push(latestPaymentReceipt.SelectedDiagnosticTests)
    const title = diagnosticTestName && diagnosticTestName.join(' ')
    const sum =
      latestPaymentReceipt &&
      latestPaymentReceipt.payment &&
      latestPaymentReceipt.payment.diagnosticTestCost
    testPriceArray.push({ title, sum })
  }

  const testTitleArray = []
  testPriceArray.map(index => {
    testTitleArray.push(index.title)
  })

  const testTitle = testTitleArray.join(', ')

  const columnsOrderedService = [
    {
      title: <Trans id={'Захиалсан үйлчилгээ'} />,
      dataIndex: 'ServiceParticulars',
      key: 'ServiceParticulars',
      render: (text, record) => {
        return <div>{record.title}</div>
      },
    },
    {
      title: <Trans id={'Төлбөр'} />,
      dataIndex: 'Amount',
      key: 'Amount',
      render: (text, record) => {
        return (
          <div style={{ textAlign: 'right', marginRight: '16px' }}>
            {helper.toPrice(parseFloat(record.sum))}
          </div>
        )
      },
    },
  ]

  const tablePropsOrderedService = {
    dataSource: testPriceArray,
    columns: columnsOrderedService,
  }

  const columnsInsurance = [
    {
      title: <Trans id={'Хөнгөлөлт'} />,
      dataIndex: 'Discounts',
      key: 'Discounts',
    },
    {
      title: <Trans id={'Төлбөр'} />,
      dataIndex: 'Amount',
      key: 'Amount',
      width: '40%',
      render: (text, record) => {
        if (text) {
          return (
            <div style={{ textAlign: 'right', marginRight: '16px' }}>
              {helper.toPrice(parseFloat(text))}
            </div>
          )
        } else {
          return (
            <div style={{ textAlign: 'right', marginRight: '16px' }}>-</div>
          )
        }
      },
    },
  ]

  const dataSourceInsurance = [
    // {
    //   key: '1',
    //   Discounts: 'ЭМДаатгал',
    //   Amount: payment.Insurance,
    // },
    {
      key: '2',
      Discounts: 'ЭМД HCV',
      Amount: payment.insuranceHCV,
    },
    {
      key: '3',
      Discounts: 'ЭМД HBV',
      Amount: payment.insuranceHBV,
    },
    {
      key: '4',
      Discounts: 'ЭМД HDV',
      Amount: payment.insuranceHDV,
    },
  ]

  const tablePropsInsurance = {
    dataSource: dataSourceInsurance,
    columns: columnsInsurance,
  }

  const checkupColumns = [
    {
      title: <Trans id={'Эмчийн үзлэг'} />,
      dataIndex: 'checkup',
      key: 'checkup',
      width: '60%',
      render: (text, record) => {
        return (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                //width: '100%',
                textAlign: 'center',
              }}
            >
              <Col style={{ textAlign: 'left' }}>Эмч: </Col>
              <Col>{record.practitionerName}</Col>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {' '}
              <Col>Төрөл: </Col>
              <Col>
                {' '}
                <Trans id={record.checkupType} />
              </Col>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {' '}
              <Col>Огноо/Цаг: </Col>
              <Col>
                {record.date} {record.startTime}-{record.endTime}
              </Col>
            </div>
          </>
        )
      },
    },
    {
      title: <Trans id={'Төлбөр'} />,
      dataIndex: 'Amount',
      key: 'Amount',
      render: (text, record) => {
        return <div style={{ textAlign: 'center' }}>{record.checkupCost}</div>
      },
    },
  ]

  const checkupTableProps = {
    dataSource: dataCheckup,
    columns: checkupColumns,
  }

  /* #region  Төлбөрийн барим хэвлэх хэсэг */

  // const columns2 = [
  //   {
  //     title: <Trans id={'Ажилчид'} />,
  //     dataIndex: 'Employee',
  //     key: 'Employee',
  //   },
  //   {
  //     title: '',
  //     dataIndex: 'Amount',
  //     key: 'Amount',
  //     width: '40%',
  //     render: text => {
  //       if (text) {
  //         return (
  //           <div style={{ textAlign: 'right', marginRight: '16px' }}>
  //             {helper.toPrice(parseFloat(text))}
  //           </div>
  //         )
  //       } else {
  //         return (
  //           <div style={{ textAlign: 'right', marginRight: '16px' }}>-</div>
  //         )
  //       }
  //     },
  //   },
  // ]
  // const dataSource2 = [
  //   {
  //     key: '1',
  //     Employee: 'Ажилтны гэр бүл 30%',
  //   },
  //   {
  //     key: '2',
  //     Employee: 'Элэгний асуудалтай ажилтан',
  //   },
  //   {
  //     key: '3',
  //     Employee: 'Урьдчилан сэргийлэх үзлэг',
  //   },
  // ]
  // const tableProps2 = {
  //   dataSource: dataSource2,
  //   columns: columns2,
  // }

  // const columns3 = [
  //   {
  //     title: <Trans id={'Тусгай хөнгөлөлт'} />,
  //     dataIndex: 'Discounts',
  //     key: 'Discounts',
  //   },
  //   {
  //     title: '',
  //     dataIndex: 'Amount',
  //     key: 'Amount',
  //     width: '40%',
  //     render: text => {
  //       if (text) {
  //         return (
  //           <div style={{ textAlign: 'right', marginRight: '16px' }}>
  //             {helper.toPrice(parseFloat(text))}
  //           </div>
  //         )
  //       } else {
  //         return (
  //           <div style={{ textAlign: 'right', marginRight: '16px' }}>-</div>
  //         )
  //       }
  //     },
  //   },
  // ]
  // const dataSource3 = [
  //   {
  //     key: '1',
  //     Discounts: 'Лаборатори',
  //   },
  //   {
  //     key: '2',
  //     Discounts: 'Багаж',
  //   },
  //   {
  //     key: '3',
  //     Discounts: 'Эмчийн үзлэг',
  //   },
  // ]
  // const tableProps3 = {
  //   dataSource: dataSource3,
  //   columns: columns3,
  // }

  // const columns4 = [
  //   {
  //     title: <Trans id={'Үйлчлүүлэгч'} />,
  //     dataIndex: 'Client',
  //     key: 'Client',
  //   },
  //   {
  //     title: '',
  //     dataIndex: 'Amount',
  //     key: 'Amount',
  //     width: '40%',
  //     render: text => {
  //       if (text) {
  //         return (
  //           <div style={{ textAlign: 'right', marginRight: '16px' }}>
  //             {helper.toPrice(parseFloat(text))}
  //           </div>
  //         )
  //       } else {
  //         return (
  //           <div style={{ textAlign: 'right', marginRight: '16px' }}>-</div>
  //         )
  //       }
  //     },
  //   },
  // ]
  // const dataSource4 = [
  //   {
  //     key: '1',
  //     Client: 'Байнгын',
  //   },
  //   {
  //     key: '2',
  //     Client: 'Хяналтын',
  //   },
  //   {
  //     key: '3',
  //     Client: 'Бэлгийн карт',
  //   },
  //   {
  //     key: '4',
  //     Client: 'Эрхийн бичиг',
  //   },
  // ]
  // const tableProps4 = {
  //   dataSource: dataSource4,
  //   columns: columns4,
  // }

  /* #endregion */

  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      width="800px"
      maskClosable={true}
      closable={false}
      footer={[]}
    >
      <div className={styles.container} ref={componentRef}>
        <div className={styles.printHeader}>
          <div style={{ textAlign: 'center' }}>
            <img src={liverCenterLogo} className={styles.logo} alt="" />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            <Text strong>Төлбөрийн баримт</Text>
          </div>
          <Row gutter={8} style={{ margin: '10px 0 10px 0' }}>
            <Col span={12}>
              <Text>Баримтын дугаар/ Bill No : #9401</Text>

              <br />

              <Text>Баримт хэвлэсэн огноо / Bill Date: {date}</Text>

              <br />

              <Text>
                Баримт хэвлэсэн ажилтан / Employee :{' '}
                {app &&
                  app.Practitioner &&
                  app.Practitioner.getOfficialNameString({ short: true })}
              </Text>
              <br />

              <Text>Лавлагаа авах / Accounts Enquiry : 70132006</Text>
            </Col>
            {/* helper.toPrice(parseFloat('123')) */}
            {/* parseFloat('123').toLocaleString('en-EN',{minimumFractionDigits:2, maximumFractionDigits:2}) */}
            <Col span={12} style={{ right: '0px' }}>
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <div style={{ textAlign: 'right', right: '0px' }}>
                  <Text>
                    Овог / Surename : {patientLastName}
                    <br />
                    Нэр / Name : {patientFirstName}
                    <br />
                    Регистрийн дугаар / Civil identity Number : {patientNInum}
                    <br />
                    Утасны дугаар / Tell No : {patientPhoneNumber}
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {!isEmptyObject(latestPaymentReceipt) && (
          <div>
            <Row gutter={10}>
              <Col span={14}>
                {(!isEmptyObject(latestPaymentReceipt.SelectedTests) ||
                  latestPaymentReceipt.SelectedDiagnosticTests.length !==
                    0) && (
                  <Table
                    {...tablePropsOrderedService}
                    pagination={false}
                    className={CheckoutPanel.mainTable}
                  />
                )}
              </Col>

              <Col span={10}>
                {(latestPaymentReceipt.payment.insurance ||
                  latestPaymentReceipt.payment.insurance !== 0) && (
                  <div>
                    {' '}
                    <Table
                      {...tablePropsInsurance}
                      pagination={false}
                      className={CheckoutPanel.mainTable}
                    />
                  </div>
                )}

                {!isEmptyObject(latestPaymentReceipt.SelectedCheckup) && (
                  <Table
                    {...checkupTableProps}
                    pagination={false}
                    className={CheckoutPanel.mainTable}
                  />
                )}

                {/* <Table
         {...tableProps2}
         pagination={false}
         className={CheckoutPanel.subTable}
       />
       <Table
         {...tableProps3}
         pagination={false}
         className={CheckoutPanel.subTable}
       />
       <Table
         {...tableProps4}
         pagination={false}
         className={CheckoutPanel.subTable}
       /> */}
              </Col>
            </Row>
          </div>
        )}

        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}
        >
          <Text strong>Төлбөрийн Мэдээлэл / Payment information</Text>
        </div>
        <Divider className={styles.divider} />
        <Row
          style={{ margin: '0 0 10px 0' }}
          display="flex"
          justify="space-between"
        >
          <Col span={16}>
            <span>
              <Text>Дотоод тооцоо / Internal computation : - </Text>
              <br />
              <Text>Судалгаа / Research : - </Text>
              <br />

              <Text>
                Эрүүл мэндийн даатгалын гэрчилгээний дугаар / Health insurance
                number :
              </Text>

              <br />
              <Text>Захиалсан үйлчилгээ :</Text>
              {testTitle}
            </span>
          </Col>

          <Col span={8} style={{ margin: '0 0 10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div style={{ textAlign: 'right', right: '0px' }}>
                <Text>
                  Нийт төлбөр / Total Payment:
                  {helper.toPrice(parseFloat(totalAmount))}
                </Text>
                <br />
                <Text>
                  Хөнгөлөлт / Discounts: {helper.toPrice(parseFloat('0s'))}{' '}
                </Text>
                <br />
                <Text>
                  Бэлнээр / Cash: {helper.toPrice(parseFloat(payment.inCash))}{' '}
                </Text>
                <br />
                <Text>
                  Бэлэн бус / Card:{' '}
                  {helper.toPrice(parseFloat(payment.byCredit))}{' '}
                </Text>
                <br />
                <Text strong>
                  Нийт төлөгдсөн / Total Paid:{' '}
                  {helper.toPrice(parseFloat(totalAmount))}{' '}
                </Text>
              </div>
            </div>
          </Col>
          <Row>
            <Col span={16} offset={8}>
              {' '}
              <div className={styles.signature}>
                <div>
                  <Text> Баримт хэвлэсэн ажилтан/ Employee: </Text>
                </div>
              </div>
              <div style={{ borderBottom: '1px dashed black' }}> </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Col>
                  {' '}
                  <Text> Үйлчлүүлэгч/ Customer: </Text>{' '}
                </Col>
                <Col>
                  {patientName} ({patientNInum})
                </Col>
              </div>
              <div style={{ borderBottom: '1px dashed black' }}></div>
            </Col>
          </Row>
        </Row>
      </div>
      <Row>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100',
          }}
        >
          <Col style={{ marginRight: '10px' }}>
            <Button className="btn-grey" onClick={props.onCancel}>
              <Trans id="Cancel" />
            </Button>
          </Col>
          <Col>
            {' '}
            <ReactToPrint
              trigger={() => (
                <Button type="primary">
                  <Trans id="Print" />
                </Button>
              )}
              content={() => componentRef.current}
              pageStyle={'@page {size: portrait}'}
            />
          </Col>
        </div>
      </Row>
    </Modal>
  )
}

PaymentReceipt.propTypes = {
  reception_patientProfile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(PaymentReceipt))
