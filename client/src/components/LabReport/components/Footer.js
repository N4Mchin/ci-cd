import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles.less'
import { withI18n } from '@lingui/react'
import { stamp } from 'public'
import { Row, Col } from 'antd'

const Footer = props => {
  return (
    <div style={props.style} className={styles.footer}>
      <Row gutter={8}>
        <Col span={12}>
          <span>
            Хаяг: Улаанбаатар хот Сүхбаатар дүүрэг,
            <br />
            1-р хороо Юнескогийн гудамж
            <br />
            Далай Цамхаг 2-р давхар
            <br />
            <br />
            Address: Liver Center, Dalai Tower
            <br />
            UNESCO street 31, Sukhbaatar District
            <br />
            Ulaanbaatar 14230, Mongolia
          </span>
        </Col>

        <Col span={12} style={{ textAlign: 'right' }}>
          <div
            style={{
              marginTop: '60px',
            }}
          >
            <div
              style={{
                zIndex: 0,
              }}
            >
              <Row
                type="flex"
                justify="space-between"
                style={{ borderBottom: 'dashed 1px black' }}
              >
                <Col>Physician / Эмч:</Col>
                <Col>Б. Солонго</Col>
              </Row>
              <Row style={{ marginTop: '16px' }}>
                <Col>Утас: 70132006</Col>
                <Col>Факс: 70132006</Col>
              </Row>
            </div>
            <div
              style={{ zIndex: 1, marginTop: '-120px', marginRight: '60px' }}
            >
              <img src={stamp} className={styles.stamp} alt="" />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
Footer.propTypes = {
  style: PropTypes.string,
}

export default withI18n()(Footer)
