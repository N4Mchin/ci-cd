import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Skeleton, Button, Avatar } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { UserOutlined } from '@ant-design/icons'
import { ModuleBox, MessageModal } from 'components'
import { getDate } from 'utils/datetime'
import { calculateAgeFromBirthDate } from 'utils/helper'
import styles from './../../styles.less'
import DlivrModal from './Dlivr/DlivrModal'

const PatientInformation = props => {
  const { practitioner_patient_profile, i18n } = props

  const [dlivrModalVisibile, setDlivrModalVisible] = useState(false)
  const {
    patient,
    patientInformation,
    dlivrGroupMain,
    dlivrGroupExcluded,
    dlivrGroupPreScreening,
    dlivrGroupScreening,
    dlivrGroupTreatment,
    dlivrGroupPostTreatment,
  } = practitioner_patient_profile

  const clientAge = patient && calculateAgeFromBirthDate(patient.birthDate)
  const genderUpperValue =
    patient &&
    patient.gender &&
    patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)

  const title = (
    <div style={{ fontSize: '14px' }}>
      <Trans>
        <span style={{ fontFamily: 'Helvetica Neue Bold' }}>Patient </span>
        <span>information</span>
      </Trans>
    </div>
  )

  const onDlivrClick = () => {
    setDlivrModalVisible(true)
  }

  const [message, setMessage] = useState()
  const [modalMessageVisible, showMessageModal] = useState(false)

  const refresh = () => {
    return props.dispatch({
      type: 'practitioner_patient_profile/queryDlivrInfo',
      payload: { id: practitioner_patient_profile.patient.id },
    })
  }

  const onDlivrSaveQuestionnaire = (inclusion, exclusion, screeningType) => {
    setDlivrModalVisible(false)

    if (inclusion && !exclusion) {
      if (screeningType === 'screening') {
        setMessage(
          <Trans>
            <div>
              Patient added to D-LIVR research
              <span className="bold">Screening group</span>
            </div>
          </Trans>
        )
      } else if (screeningType === 'preScreening') {
        setMessage(
          <Trans>
            <div>
              Patient added to D-LIVR research
              <span className="bold">Pre-screening group</span>
            </div>
          </Trans>
        )
      }
    } else {
      setMessage(
        <div style={{ textAlign: 'center' }}>
          <Trans>Questionnaire response saved.</Trans>
          <Trans>
            <div>
              Patient did not pass
              <span title="bold">D-LIVR research eligibility.</span>
            </div>
          </Trans>
        </div>
      )
    }

    setTimeout(() => showMessageModal(true), 150)

    // refresh
    refresh()
  }

  return (
    <ModuleBox title={title} style={{ width: '350px' }}>
      <Skeleton
        loading={
          props.loading.effects['practitioner_patient_profile/query'] ||
          !props.practitioner_patient_profile.patient
        }
        active
        avatar
        paragraph={{ rows: 7 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '151px',
          }}
        >
          <div style={{ flexGrow: 2 }}>
            <Avatar
              size="large"
              shape="square"
              icon={<UserOutlined />}
              style={{ width: '70%', height: '90px' }}
            />
          </div>
          <div className="title" style={{ flexGrow: 1, fontSize: '14px' }}>
            <Row>{i18n.t`LastName`}</Row>
            <Row>{i18n.t`FirstName`}</Row>
            <Row>{i18n.t`Registration`}</Row>
            <Row>{i18n.t`Phone`}</Row>
            <Row>{i18n.t`Barcode`}</Row>
            <Row>{i18n.t`Age / Gender`}</Row>
            {/* <Row>{i18n.t`Work place`}</Row>
          <Row>{i18n.t`Occupation`}</Row>
          <Row>{i18n.t`Marriage status`}</Row> */}
          </div>
          <div style={{ flexGrow: 1, fontSize: '14px' }}>
            <Row>
              {patientInformation && patientInformation.patientLastName}
            </Row>
            <Row>
              {patientInformation && patientInformation.patientFirstName}
            </Row>
            <Row>{patientInformation && patientInformation.patientNInum}</Row>
            <Row>
              {patientInformation && patientInformation.patientPhoneNumber}
            </Row>
            <Row>{patientInformation && patientInformation.patientBarcode}</Row>
            <Row>
              {patient && (
                <div>
                  {clientAge} / <Trans id={genderUpperValue} />
                </div>
              )}
            </Row>
          </div>
        </div>

        <div
          style={{ marginTop: '8px' }}
          className={styles.divStyleFlexAndSpaceBetween}
        >
          <div style={{ display: 'grid', flexGrow: 1 }}>
            <div>
              <Trans id={'First registered'} />
            </div>
            <div>{getDate()}</div>
          </div>
          <div style={{ display: 'grid', flexGrow: 1 }}>
            <div>
              <Trans id={'Last service'} />
            </div>
            <div>{getDate()}</div>
          </div>
          <div style={{ display: 'grid', flexGrow: 1 }}>
            <div>
              <Trans id={'GeneralPractitioner'} />
            </div>
            <div>-</div>
          </div>
        </div>

        <div
          style={{ marginTop: '8px' }}
          className={styles.divStyleFlexAndSpaceBetween}
        >
          <div style={{ flexGrow: 1 }}>
            <Button type="primary" block disabled>
              <Trans id={'Profile'} />
            </Button>
          </div>
          <div style={{ width: '4px' }}></div>
          <div style={{ flexGrow: 1 }}>
            <Button className="button-red" block disabled>
              <Trans id={'Take control'} />
            </Button>
          </div>
        </div>
        <div
          style={{ marginTop: '8px' }}
          className={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {!props.practitioner_patient_profile.dlivrStatus && (
            <>
              <Button
                block
                onClick={onDlivrClick}
                disabled={!props.app.dlivrGroupsCreated || !props.writeAccess}
              >
                <Trans id={'D-LIVR'} />
              </Button>
              <DlivrModal
                visible={dlivrModalVisibile}
                closable={false}
                onSubmit={onDlivrSaveQuestionnaire}
                onClose={() => setDlivrModalVisible(false)}
              />
            </>
          )}
          {props.practitioner_patient_profile.dlivrStatus && (
            <>
              <Button
                block
                disabled
                onClick={onDlivrClick}
                className="button-dark-gray"
              >
                <Trans id={'Remove from D-LIVR research'} />
              </Button>
            </>
          )}
          <MessageModal
            type="success"
            visible={modalMessageVisible}
            onCancel={() => showMessageModal(false)}
            content={message}
          />
        </div>
      </Skeleton>
    </ModuleBox>
  )
}

PatientInformation.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(PatientInformation))
