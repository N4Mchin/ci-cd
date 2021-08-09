import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, Avatar, Row, Typography, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './PrivateInfo.less'

import { MessageModal } from 'components'
import { useMediaQuery } from 'react-responsive'

const { Text } = Typography

const PrivateInfo = props => {
  const { Patient } = props.app
  const isMobile = useMediaQuery({ maxDeviceWidth: 800 })
  const patientFirstName = Patient.getFirstName()
  const patientNInum = Patient.getNationalIdentificationNumber()
  const patientLastName = Patient.getLastName()
  const patientBarcode = Patient._getBarcode()
  const patientPhoneNumber = (Patient.getMobilePhones() || [])[0]

  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessageVisible, setModalMessageVisible] = useState(false)

  const onUpdatePatientInformation = () => {
    setModalVisible(false)

    setTimeout(() => setModalMessageVisible(true), 150)
  }

  return (
    <div className={styles.privateInfoBox}>
      <div>
        <div className={styles.privateInfoBoxAvatarContainer}>
          <Avatar
            shape="square"
            size={60}
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
                  {patientLastName}
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
                  {patientFirstName}
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
                  {patientNInum}
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
                  {patientPhoneNumber}
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
                  {patientBarcode}
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
            // onClick={() => setModalVisible(true)}
            disabled
          >
            {/* {!props.loading.effects[
             'patient_portal/downloadValuesets'
            ] && */}
            <Icon type="message" />
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

      <MessageModal
        type="success"
        visible={modalMessageVisible}
        content={<Trans id="Save succesful" />}
        onCancel={() => setModalMessageVisible(false)}
      />
    </div>
  )
}

PrivateInfo.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ app, patient_portal, loading }) => ({
  app,
  patient_portal,
  loading,
}))(withI18n()(PrivateInfo))
