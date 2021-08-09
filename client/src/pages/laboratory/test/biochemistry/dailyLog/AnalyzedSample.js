import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../styles.less'

import { Select, Row, Col, Table } from 'antd'
import { getDate } from 'utils/datetime'
import { ButtonDarkGrey, ButtonRed } from 'components'
const { Option } = Select

const columns1 = [
  // {
  //   title: <div style={{ width: '20%' }}>№</div>,
  //   dataIndex: 'id',
  //   key: 'id',
  // },
  {
    title: <div style={{ width: '100%' }}>Үйлчлүүлэгчийн код</div>,
    dataIndex: 'barcode',
    key: 'barcode',
    render: (text, record) => {
      return record.patientNumber
    },
  },
  {
    title: 'Тайлбар',
    dataIndex: 'Description',
    key: 'Description',
  },
]
const AnalyzedSamples = props => {
  const { location, laboratory_test_biochemistry, loading, i18n } = props

  const [dataSource, setDataSource] = useState(false)
  let date = getDate()
  // useEffect(() => {
  //   props
  //     .dispatch({
  //       type: 'laboratory_test_biochemistryTests/queryLabTests',
  //     })
  //     .then(data => setDataSource(data))
  //     .catch(errorInfo => console.log(errorInfo))
  // }, [])
  return (
    <div>
      <div className={styles.firstDiv}>
        <Row gutter={8}>
          <Col>
            <table className={styles.table} style={{ width: '100%' }}>
              <tr>
                <td rowSpan={4}>
                  <img
                    src="/liver-center-logo.png"
                    alt="logo"
                    width="290px"
                    height="60px"
                  ></img>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Баримт №</strong>
                </td>
                <td rowSpan={2}>
                  <strong>Хувилбар №2</strong>
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
            <strong>Биохимийн шинжилгээний протокол</strong>
          </Col>

          <Col>
            <span>
              Аппаратны төрөл :{' '}
              <Select defaultValue="XР-100">
                <Option value="XР-100">XР-100</Option>
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
            justifyContent: 'felx-end',
            width: '100%',
          }}
        >
          <Col>
            <span style={{ marginRight: '50px' }}>
              Бүртгэл хөтөлсөн лабораторийн эмч :{' '}
            </span>
            <Select defaultValue="Б.Сумъяа">
              <Option value="Б.Сумъяа">Б.Сумъяа</Option>
              <Option value="Э.Анир">Э.Анир</Option>
              <Option value="О.Бямбасүрэн">О.Бямбасүрэн</Option>
              <Option value="Б.Солонго">Б.Солонго</Option>
              <Option value="Б.Пүрэвжаргал">Б.Пүрэвжаргал</Option>
            </Select>
          </Col>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
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
        <Col span={2}>
          <ButtonDarkGrey block>
            <Trans>Print</Trans>
          </ButtonDarkGrey>
        </Col>
        <Col span={2}>
          <ButtonRed block>
            <Trans>Save</Trans>
          </ButtonRed>
        </Col>
      </Row>
    </div>
  )
}

AnalyzedSamples.propTypes = {
  laboratory_test_biochemistry: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_test_biochemistry, loading }) => ({
  laboratory_test_biochemistry,
  loading,
}))(withI18n()(AnalyzedSamples))
