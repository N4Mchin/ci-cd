import React from 'react'
import { Divider } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './styles.less'
import { getDate } from 'utils/datetime'
import { Col } from 'antd'
const TableHeader2 = props => {
  const {
    date,
    title,
    documentName,
    version,
    orderName1,
    orderName2,
    approvedDate,
  } = props

  return (
    <div>
      <p style={{ height: '10px' }}></p>
      <table className={styles.documentHeader}>
        <tr>
          <td style={{ overflow: 'hidden', textAlign: 'center' }}>
            <img src="/liver-center-logo.png" alt="logo" height="25px" />
          </td>
          <td style={{ textAlign: 'center' }}>
            <span className="bold">Баримт №</span>
            <br />
            <span>{documentName}</span>
          </td>
          <td style={{ textAlign: 'center' }}>
            <span className="bold">Хувилбар №</span>
            <br />
            <span>{version}</span>
          </td>
          {orderName1 !== null && (
            <td style={{ textAlign: 'center' }}>
              <span className="bold">{orderName1}</span>
              <br />
              <span>{orderName2}</span>
            </td>
          )}
          <td style={{ textAlign: 'center' }}>
            <span className="bold">Баталсан огноо:</span>
            <br />
            <span>{approvedDate}</span>
          </td>
        </tr>
      </table>
      <br></br>
      <p style={{ textAlign: 'center' }}>
        <strong>{title}</strong>
      </p>
      <p style={{ marginLeft: '800px' }}>{date && <span>{date}</span>}</p>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      ></div>
      <Divider style={{ border: '1px solid #C9C9C9' }} />
    </div>
  )
}

TableHeader2.defaultProps = {
  date: '',
  title: '',
  documentName: 'M-ЭТ-021',
  version: '1',
  orderName1: 'ЭТ-ийн Ерөнхий захирлын 2018 оны L18/44-02',
  orderName2: 'тоот тушаалын 1-р хавсралт',
  approvedDate: '2018.08.21',
}

export default withI18n()(TableHeader2)
