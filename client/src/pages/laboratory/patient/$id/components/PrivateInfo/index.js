import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Icon, Button, Avatar, Row, Typography, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { connect } from 'dva'
import styles from './PrivateInfo.less'
import PrivateInfoModal from './PrivateInfoModal/PrivateInfoModal'
import { MessageModal } from 'components'

const { Text } = Typography

const PrivateInfo = props => {
  console.log('1111111111111111111111111111', props)
  const {
    patientFirstName,
    patientLastName,
    patientNInum,
    patientBarcode,
    patientPhoneNumber,
  } = props.laboratory_patientProfile

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
            onClick={() => setModalVisible(true)}
            loading={
              props.loading.effects[
                'laboratory_patientProfile/downloadValuesets'
              ]
            }
          >
            {!props.loading.effects[
              'laboratory_patientProfile/downloadValuesets'
            ] && <Icon type="message" />}
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
  )
}

PrivateInfo.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default connect(({ laboratory_patientProfile, loading }) => ({
  laboratory_patientProfile,
  loading,
}))(withI18n()(PrivateInfo))
