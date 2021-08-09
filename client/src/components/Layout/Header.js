import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import classnames from 'classnames'
import styles from './Header.less'
import { router } from 'utils'
import { ROLE_TYPE } from 'utils/constant'
import { withI18n, Trans } from '@lingui/react'

import { Icon, Layout, Button, Input, Divider } from 'antd'
import { LanguageSwitcher, MessageModal } from 'components'
import Modal from '../../pages/reception/components/Modal'
const { Search } = Input

@withI18n()
@connect(({ app, patient, loading }) => ({ app, patient, loading }))
class Header extends PureComponent {
  state = {
    modalVisible: false,
    messageModalVisible: false,
    searchBarValue: undefined,
    idNumber: '',
    searchingValue: '',
  }

  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }

  handleSignOut = () => {
    this.props.onSignOut()
  }

  handleFields = fields => {
    return fields
  }

  onAdd = () => {
    this.showModal()
  }

  onAddV2 = () => {
    this.showModalNew()
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }

  showMessageModal = bool => {
    this.setState({
      messageModalVisible: bool,
    })
  }

  handleSearchBarValue = event => {
    this.props.dispatch({
      type: 'app/updateState',
      payload: { searchBarValue: event },
    })

    this.props.dispatch({
      type: 'app/searchBarcode',
      payload: {
        id: event,
        from: window.location.pathname,
      },
    })
  }

  onSavePatientInformation = (name, id) => {
    console.log(name, id)
    this.setState({
      message: (
        <Trans values={{ name: name }}>
          New client <span className="bold">{name}</span> successfully
          registered
        </Trans>
      ),
      patientId: id,
    })

    this.setState({ modalVisible: false })
    this.showMessageModal(true)
  }

  render() {
    const { fixed, collapsed, onCollapseChange, onAdd, i18n } = this.props
    const leftContent = [
      <div
        key="collapseIcon"
        className={styles.fold}
        onClick={onCollapseChange.bind(this, !collapsed)}
      >
        <Icon
          type={classnames({
            'menu-unfold': collapsed,
            'menu-fold': !collapsed,
          })}
        />
      </div>,
    ]

    if (this.props.app.userRole !== ROLE_TYPE.PATIENT) {
      leftContent.push(
        <Search
          key="searchBar"
          className={styles.searchField}
          placeholder={i18n.t`SearchIDorBarcode`}
          onSearch={this.handleSearchBarValue}
          // maxLength={13}
          // value={this.state.searchBarValue}
          allowClear
          disabled={
            //phlebotomy хайх хэсгийг түр комменлов
            this.props.app.locationPathname === '/phlebotomy/' ||
            this.props.app.locationPathname === '/laboratory/patient' ||
            this.props.app.locationPathname === '/reception' ||
            this.props.app.locationPathname === '/practitioner/patient'
              ? false
              : true
          }
          enterButton
        />
      )
    }

    // leftContent.push(
    //   <Button
    //     className={styles.buttonSearch}
    //     type="primary"
    //     size="large"
    //     onClick={this.handleSubmit}
    //   >
    //     <Trans>Search</Trans>
    //   </Button>
    // )

    const rightContent = [
      <div key="gutter-1" style={{ width: '16px' }}></div>,

      <Button
        key="SignOut"
        type="link"
        icon="logout"
        size="large"
        className={styles.logOutButton}
        onClick={this.handleSignOut}
      />,
      <Divider key="divider-1" type="vertical" style={{ height: '32px' }} />,
      <LanguageSwitcher key="languageSwitcher" />,
      <div key="gutter-2" style={{ width: '16px' }}></div>,
      (this.props.app.userRole === ROLE_TYPE.RECEPTIONIST ||
        this.props.app.userRole === ROLE_TYPE.EXTERNAL_RECEPTIONIST) &&
        window.location.pathname.startsWith('/reception') && (
          <Button
            key="registerPatient"
            className="button-red"
            onClick={this.onAdd}
            loading={this.props.loading.effects['reception/downloadValuesets']}
            disabled={
              this.props.app.locationPathname === '/reception' ? false : true
            }
          >
            {this.props.loading.effects['reception/downloadValuesets'] && (
              <>&nbsp;&nbsp;</>
            )}
            <Trans id="Register" />
          </Button>
        ),
    ]

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div className={styles.leftContainer}>{leftContent}</div>
        <div className={styles.rightContainer}>{rightContent}</div>

        {this.state.modalVisible && (
          <Modal
            title={
              <Trans>
                <span className="title">Patient </span>
                <span>Registration</span>
              </Trans>
            }
            visible={this.state.modalVisible}
            onSubmit={this.onSavePatientInformation}
            onCancel={this.handleCancel}
          />
        )}

        {this.state.messageModalVisible && (
          <MessageModal
            type="success"
            content={this.state.message}
            visible={this.state.messageModalVisible}
            onCancel={() => this.showMessageModal(false)}
            autoHide={false}
          >
            <Button
              className="button-red uppercase"
              onClick={() => {
                router.push({
                  pathname: `/reception/patient/${this.state.patientId}`,
                })
                return this.showMessageModal(false)
              }}
            >
              <Trans id="Create an order" />
            </Button>
          </MessageModal>
        )}
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  app: PropTypes.object,
  onSignOut: PropTypes.func,
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default Header
