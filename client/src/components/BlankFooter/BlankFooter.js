import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'
import { stamp } from 'public'
import { Row, Col } from 'antd'
import * as dateTime from 'utils/datetime'

const BlankFooter = props => {
  const { practitioner } = props

  return (
    <div>
      <div style={props.style} className={styles.footer}>
        <Row gutter={8}>
          <Col span={12}>
            <Trans>
              Address: Liver Center, Dalai Tower
              <br />
              UNESCO street 31, Sukhbaatar District
              <br />
              Ulaanbaatar 14230, Mongolia
            </Trans>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <div>
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
                  <Col>
                    <Trans id={'Physician'} />
                  </Col>
                  <Col>
                    {practitioner &&
                      practitioner.getOfficialNameString({
                        short: true,
                      })}
                  </Col>
                </Row>
                <Row style={{ marginTop: '16px' }}>
                  <Col>Утас: 70132006</Col>
                  <Col>Факс: 70132006</Col>
                </Row>
              </div>
              <div
                style={{ zIndex: 1, marginTop: '-120px', marginRight: '80px' }}
              >
                <img src={stamp} className={styles.stamp} alt="" />
              </div>
            </div>
            <div>
              <Trans id={'Print date:'} /> {dateTime.getDate()}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
BlankFooter.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(BlankFooter))
