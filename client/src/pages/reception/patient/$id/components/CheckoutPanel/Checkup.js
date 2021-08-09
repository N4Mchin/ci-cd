import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import { Row, Col, Checkbox } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './CheckoutPanel.less'

const Checkup = props => {
  const [selectedCheckup, setSelectedCheckup] = useState({})

  /**
   * Доорх функц нь сонгосон шинжилгээг цуцлах үед дуудагдана
   * сонгосон шинжилгээг Redux дахь reception_patientProfile дахь SelectedCheckup ийн утгыг уншиж,
   * цуцлагдаагүй эмчийн үзлэгийг data объектэд хадгалаад client/src/pages/patient/$id/model.js ийн labTestOrder
   * функцруу дамжуулснаар Redux ын state ийг шинэчилнэ
   */

  // unchecking event handler
  const handleSelectedCheckup = event => {
    props.dispatch({
      type: 'reception_patientProfile/checkupOrder',
      payload: {},
    })
  }

  useEffect(() => {
    setSelectedCheckup(props.reception_patientProfile.SelectedCheckup)
  }, [props.reception_patientProfile.SelectedCheckup])

  const { SelectedCheckup, checkupCost } = props.reception_patientProfile

  if (!SelectedCheckup.practitioner || !SelectedCheckup.checkupType) {
    return <></>
  }

  return (
    <React.Fragment key="SelectedCheckupFragment">
      <div className={styles.selectedTestItems}>
        <Row type="flex" justify="space-between" align="middle">
          <Col style={{ align: 'center' }}>
            <Checkbox
              style={{ margin: '0' }}
              value={'Checkup'}
              checked={true}
              onChange={handleSelectedCheckup}
            >
              <Trans>
                <span>Checkup</span>
              </Trans>
            </Checkbox>
          </Col>
          <Col style={{ align: 'center' }}>
            <span>{checkupCost}</span>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(Checkup))
