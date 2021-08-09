import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Spin, Tabs } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import CollapseBox from '../CollapseBox'
import { Schedule } from './components'

function title() {
  return (
    <Trans>
      <span className="title uppercase">Checkup </span>
      <span className="uppercase">Order</span>
    </Trans>
  )
}

/* #region  CheckupOrder */
const CheckupOrder = props => {
  const { Checkup } = props.app.FHIR_CODES
  const [dataSource, setDataSource] = useState()

  // const { practitionerList = [] } = props.reception_patientProfile
  const [practitionerList, setPractitionerList] = useState([])
  const [selectedPractitionerId, setSelectedPractitionerId] = useState()

  async function fetchData(practitionerId) {
    if (practitionerId) {
      return props
        .dispatch({
          type: 'reception_patientProfile/queryPractitionerSchedule',
          payload: {
            practitionerId: practitionerId,
          },
        })
        .then(result => {
          return setDataSource(result)
        })
    }
  }

  async function fetchPractitionerList() {
    return props.dispatch({
      type: 'reception_patientProfile/queryPractitionerList',
    })
  }

  useEffect(() => {
    fetchPractitionerList()
      .then(result => {
        if (result && result.length > 0) {
          setPractitionerList(result)
          setSelectedPractitionerId(result[0].id)
          return result[0].id
        }
      })
      .then(practitionerId => {
        if (practitionerId) {
          fetchData(practitionerId)
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData(selectedPractitionerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.reception_patientProfile.updatedAt])

  /**
   * Функц дуудагдахад Redux дахь reception_patientProfile state-ийн SelectedCheckup ийг уншиж,
   * сонгосон байгаа шинжилгээний жагсаалтыг шинэчлэнэ
   * Энэ функц нь төлбөрийн хэсгээс сонгосон байгаа үзлэгийг цуцлах үед, үзлэгийн хэсгийг шинээр зурахад хэрэглэгдэнэ
   */
  useEffect(() => {
    const { practitioner } = props.reception_patientProfile.SelectedCheckup
    setSelectedPractitionerId(practitioner && practitioner.id)
  }, [props.reception_patientProfile.SelectedCheckup])

  const onSelectPractitioner = practitionerId => {
    setSelectedPractitionerId(practitionerId)
    return fetchData(practitionerId)
  }

  return (
    <CollapseBox Title={title()}>
      <Tabs
        tabPosition={'left'}
        style={{ width: '100%' }}
        onChange={onSelectPractitioner}
      >
        {practitionerList.map(practitioner => {
          return (
            <Tabs.TabPane
              tab={practitioner.getOfficialNameString({ short: true })}
              key={practitioner.id}
            >
              <Spin
                spinning={
                  props.loading.effects[
                    'reception_patientProfile/queryPractitionerSchedule'
                  ]
                }
              >
                <Schedule
                  practitioner={practitioner}
                  checkup={Checkup}
                  dataSource={dataSource}
                />
              </Spin>
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </CollapseBox>
  )
}
/* #endregion */

export default connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))(withI18n()(CheckupOrder))
