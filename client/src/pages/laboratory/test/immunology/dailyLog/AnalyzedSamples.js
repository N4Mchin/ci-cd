import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'
import { DatePicker, Select, Row, Col, Table } from 'antd'
import { getDate } from 'utils/datetime'
const { Option } = Select

const columns1 = [
  {
    title: 'Шинжилсэн сорьцын жагсаалт',
    children: [
      {
        title: <div style={{ width: '75px' }}>Баркод</div>,
        dataIndex: 'barcode',
        key: 'barcode',
        render: (text, record) => {
          return record.patientNumber
        },
      },
      {
        title: 'Шинжлүүлсэн үзүүлэлтүүд',
        dataIndex: 'testedSample',
        key: 'testedSample',
        render: (text, record) => {
          console.log(record)
        },
      },
    ],
  },
]
const AnalyzedSamples = props => {
  const {} = props
  const [dataSource, setDataSource] = useState(false)
  const [filteredDate, setFilteredDate] = useState()
  const [loadingRef, setLoadingRef] = useState(false)
  const moment = require('moment')

  let date = getDate()

  const onDatePickerChange = value => {
    let date = moment(value).format('YYYY-MM-DD')
    setFilteredDate(date)
  }

  useEffect(() => {
    if (filteredDate) {
      props
        .dispatch({
          type: 'laboratory_test/queryTestsVerified',
          payload: {
            labTestCode:
              props.app.FHIR_CODES &&
              props.app.FHIR_CODES.UncategorizedTests.ImmunologyTests,
            filteredDate: filteredDate,
          },
        })
        .then(result => {
          setDataSource(result.dataSource)
        })
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingRef(false))
    }
  }, [filteredDate])

  return (
    <div>
      <div className={styles.firstDiv}>
        <Row gutter={8}>
          <Col
            span={12}
            style={{
              padding: '0 10px 20px 90px',
            }}
          >
            <img
              src="/liver-center-logo.png"
              alt="logo"
              width="290px"
              height="60px"
            ></img>
          </Col>

          <Col span={10} offset={2}>
            <table className={styles.table} style={{ width: '100%' }}>
              <tr>
                <td>
                  <strong>Баримт №</strong>
                </td>
                <td rowSpan={2}>
                  <strong>Хувилбар №1</strong>
                </td>
                <td rowSpan={2}>
                  <strong>Баталсан огноо: </strong> {date}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>БҮ-ЭТ-021</strong>
                </td>
              </tr>
            </table>
          </Col>
        </Row>
        <div style={{ height: '30px' }}></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Col>
            <span>Огноо: {getDate()}</span>
          </Col>
          <Col>
            {' '}
            <strong>Иммунологийн шинжилгээний протокол</strong>
          </Col>
          <Col>
            {' '}
            <DatePicker
              style={{ width: '120px' }}
              onChange={onDatePickerChange}
            />{' '}
          </Col>
          <Col>
            <span>
              Аппаратны төрөл :{' '}
              <Select defaultValue="HISCL-5000">
                <Option value="HISCL-5000">HISCL-5000</Option>
                <Option value="XP200">XP200</Option>
              </Select>
            </span>
          </Col>
        </div>
        <div style={{ height: '30px' }}></div>
        <Table
          dataSource={dataSource}
          columns={columns1}
          className={styles.container1}
          bordered={true}
          pagination={false}
        />
        <div style={{ width: '100%', height: '110px' }}></div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Col></Col>
          <Col> </Col>
          <Col>
            <span style={{ marginRight: '50px' }}>
              Бүртгэл хөтөлсөн лабораторийн эмч :{' '}
            </span>
            <Select defaultValue="Б.Сумъяа">
              <Option value="Б.Сумъяа">Б.Сумъяа</Option>
              <Option value="Э.Анир">Э.Анир</Option>
              <Option value="О.Бямбасүрэн">О.Бямбасүрэн</Option>
            </Select>
          </Col>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Col></Col>
          <Col> </Col>
          <Col>
            <div
              style={{
                border: 'dashed',
                borderWidth: '1px',
                width: '360px',
              }}
            ></div>
          </Col>
        </div>
      </div>
      <div style={{ height: '30px' }}></div>

      <Row gutter={8}>
        <Col span={20}></Col>
        {/* <Col span={2}>
          <Button type="primary" block>
            <Trans>Print</Trans>
          </Button>
        </Col> */}
        {/* <Col span={2}>
          <Button
            className="button-red"
            onClick={() => showModalProtocolSave(true)}
            block
          >
            <Trans>Save</Trans>
          </Button>
        </Col> */}
      </Row>
    </div>
  )
}

AnalyzedSamples.propTypes = {
  laboratory_test_immunologyTests: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ laboratory_test_immunologyTests, dispatch, loading }) => ({
    laboratory_test_immunologyTests,
    loading,
    dispatch,
  })
)(withI18n()(AnalyzedSamples))
