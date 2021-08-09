import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, Avatar, Row, Spin, Typography, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './PrivateInfo.less'
import PrivateInfoModal from './PrivateInfoModal/PrivateInfoModal'
import { MessageModal } from 'components'

const { Text } = Typography

const PrivateInfo = props => {
  const {
    patient,
    patientFirstName,
    patientLastName,
    patientNInum,
    patientBarcode,
    patientPhoneNumber,
    lastUpadtedPrivateInformation,
  } = props.reception_patientProfile

  const [privateInformation, setPrivateInformation] = useState({})

  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessageVisible, setModalMessageVisible] = useState(false)

  const onUpdatePatientInformation = () => {
    setModalVisible(false)

    setTimeout(() => setModalMessageVisible(true), 150)
  }

  useEffect(() => {
    setPrivateInformation({
      firstName: patientFirstName ? patientFirstName : '',
      lastName: patientLastName ? patientLastName : '',
      NInum: patientNInum ? patientNInum : '',
      barcode: patientBarcode ? patientBarcode : '',
      phoneNumber: patientPhoneNumber ? patientPhoneNumber : '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.id, lastUpadtedPrivateInformation])

  return (
    <Spin
      spinning={props.loading.effects['reception_patientProfile/queryPatient']}
    >
      <div className={styles.privateInfoBox}>
        <div>
          <div className={styles.privateInfoBoxAvatarContainer}>
            <Avatar
              shape="square"
              size={80}
              icon="user"
              className={styles.privateInfoBoxAvatar}
            />
          </div>
          <div className={styles.privateInfoBoxInfo}>
            <>
              <Row justify="start" gutter={8}>
                <Col span={10}>
                  <Text className={styles.privateInfoBoxInfoLabel}>
                    <Trans id={'LastName'} />
                  </Text>
                </Col>
                <Col span={14}>
                  <Text className={styles.privateInfoBoxInfoText} strong>
                    {privateInformation.lastName
                      ? privateInformation.lastName
                      : patientLastName}
                  </Text>
                </Col>
              </Row>
              <Row type="flex" justify="start" gutter={8}>
                <Col span={10}>
                  <Text className={styles.privateInfoBoxInfoLabel}>
                    <Trans id={'FirstName'} />
                  </Text>
                </Col>
                <Col span={14}>
                  <Text className={styles.privateInfoBoxInfoText} strong>
                    {privateInformation.firstName
                      ? privateInformation.firstName
                      : patientFirstName}
                  </Text>
                </Col>
              </Row>
              <Row type="flex" justify="start" gutter={8}>
                <Col span={10}>
                  <Text className={styles.privateInfoBoxInfoLabel}>
                    <Trans id={'National №'} />
                  </Text>
                </Col>
                <Col span={14}>
                  <Text className={styles.privateInfoBoxInfoText} strong>
                    {privateInformation.NInum
                      ? privateInformation.NInum
                      : patientNInum}
                  </Text>
                </Col>
              </Row>
              <Row type="flex" justify="start" gutter={8}>
                <Col span={10}>
                  <Text className={styles.privateInfoBoxInfoLabel}>
                    <Trans id={'Phone'} />
                  </Text>
                </Col>
                <Col span={14}>
                  <Text className={styles.privateInfoBoxInfoText} strong>
                    {privateInformation.phoneNumber
                      ? privateInformation.phoneNumber
                      : patientPhoneNumber}
                  </Text>
                </Col>
              </Row>
              <Row type="flex" justify="start" gutter={8}>
                <Col span={10}>
                  <Text className={styles.privateInfoBoxInfoLabel}>
                    <Trans id={'Barcode'} />
                  </Text>
                </Col>
                <Col span={14}>
                  <Text className={styles.privateInfoBoxInfoText} strong>
                    {privateInformation.barcode
                      ? privateInformation.barcode
                      : patientBarcode}
                  </Text>
                </Col>
              </Row>
            </>
          </div>
        </div>
        <div style={{ marginTop: '19px' }}>
          <Button.Group className={styles.privateInfoBoxButtonGroup}>
            <Button className={styles.privateInfoBoxButton} disabled>
              <Icon type="camera" />
            </Button>
            <Button
              className={styles.privateInfoBoxButton}
              onClick={() => setModalVisible(true)}
              loading={props.loading.effects['reception/downloadValuesets']}
            >
              {!props.loading.effects['reception/downloadValuesets'] && (
                <Icon type="message" />
              )}
            </Button>
          </Button.Group>

          <div className={styles.privateInfoBoxOtherInfo}>
            <div className={styles.privateInfoBoxOtherInfoItem}>
              <span className={styles.privateInfoBoxOtherInfoItemLabel}>
                <Trans>
                  <span
                    style={{
                      fontSize: '8px',
                    }}
                  >
                    First registered
                  </span>
                </Trans>
              </span>
              <br />
              <span>-</span>
            </div>
            <div className={styles.privateInfoBoxOtherInfoItem}>
              <span className={styles.privateInfoBoxOtherInfoItemLabel}>
                <Trans id={'Last service'} />
              </span>
              <br />
              <span>-</span>
            </div>
            <div className={styles.privateInfoBoxOtherInfoItem}>
              <span className={styles.privateInfoBoxOtherInfoItemLabel}>
                <Trans id={'FollowupPhysician'} />
              </span>
              <br />
              <span>-</span>
            </div>
          </div>
        </div>
        <PrivateInfoModal
          title={
            <Trans>
              <span className="title">Patient </span>
              <span className="">Private Information</span>
            </Trans>
          }
          className={styles.modalTitle}
          visible={modalVisible}
          onSubmit={onUpdatePatientInformation}
          onCancel={() => setModalVisible(false)}
        />
        <MessageModal
          type="success"
          visible={modalMessageVisible}
          content={<Trans id="Save succesful" />}
          onCancel={() => setModalMessageVisible(false)}
        />
      </div>
    </Spin>
  )
}

PrivateInfo.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))(withI18n()(PrivateInfo))
