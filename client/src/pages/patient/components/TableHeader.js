import React from 'react'
import { Divider } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './styles.less'
import { getDate } from 'utils/datetime'
import { Col } from 'antd'
const TableHeader = props => {
  return (
    <div>
      <p style={{ height: '10px' }}></p>
      <table className={styles.documentHeader}>
        <tr>
          <td>
            <img
              src="/liver-center-logo.png"
              alt="logo"
              width="90%"
              height="25px"
            ></img>
          </td>
          <td style={{ textAlign: 'center' }}>БАРИМТ М-ЭТ-021</td>
          <td style={{ textAlign: 'center' }}>
            <strong>ХУВИЛБАР №2</strong>
          </td>
          <td style={{ textAlign: 'center' }}>
            <strong>ЭТ-ийн Ерөнхий захирлын 2018 оны L18/44-02 тоот </strong>
            тушаалын 1-р хавсралт
          </td>
          <td style={{ textAlign: 'center' }}>Баталсан огноо 2018.08.29</td>
        </tr>
      </table>
      <br></br>
      <p style={{ textAlign: 'center' }}>
        <strong>{props.title}</strong>
      </p>
      <p style={{ marginLeft: '800px' }}>
        {props.date && <span>{props.date}</span>}
      </p>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      ></div>
      <Divider style={{ border: '1px solid #C9C9C9' }} />
    </div>
  )
}

export default withI18n()(TableHeader)
