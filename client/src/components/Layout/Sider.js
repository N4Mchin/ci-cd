import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Row,
  Col,
  Icon,
  Switch,
  Layout,
  Avatar,
  Dropdown,
  Menu,
} from 'antd'
import { withI18n, Trans } from '@lingui/react'
import ScrollBar from '../ScrollBar'
import { config } from 'utils'
import SiderMenu from './Menu'
import styles from './Sider.less'
// import { Row, Col } from 'antd/es/grid'
import Link from 'umi/link'
import router from 'umi/router'
import moment from 'moment'
import 'moment-timezone'
import { connect } from 'dva'
import ModalExposureKit from '../../pages/phlebotomy/components/ModalExposureKit'
import ModalFirstAidKit from '../../pages/phlebotomy/components/ModalFirstAidKit'

const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'
const DEFAULT_THEME = THEME_LIGHT

const days = {
  Sunday: 'НЯМ ГАРАГ',
  Monday: 'ДАВАА ГАРАГ',
  Tuesday: 'МЯГМАР ГАРАГ',
  Wednesday: 'ЛХАГВА ГАРАГ',
  Thursday: 'ПҮРЭВ ГАРАГ',
  Friday: 'БААСАН ГАРАГ',
  Saturday: 'БЯМБА ГАРАГ',
}

const ActiveUsers = practitioners => {
  return (
    <>
      {practitioners.map((practitioner, index) => {
        return (
          <div
            style={{ color: 'white', padding: '10px', margin: '0 0 0 17px' }}
          >
            <Row type="flex" justify="start" gutter={12}>
              <Col>
                {' '}
                <Avatar shape="square" size={44} icon="user" />{' '}
              </Col>
              <Col>
                <div>
                  <span>
                    {practitioner.lastname} {practitioner.firstname}
                  </span>
                  <hr style={{ height: '2px', visibility: 'hidden' }} />
                  <Icon
                    type="check-circle"
                    theme="filled"
                    style={{
                      color: '#31FF00',
                      fontSize: '9px',
                      margin: '2px',
                    }}
                  ></Icon>
                  <span>{practitioner.load}/12</span>
                </div>
              </Col>
            </Row>
          </div>
        )
      })}
    </>
  )
}

const getFullDateTime = () => {
  const now = moment.tz(Date.now(), 'Asia/Ulaanbaatar')
  const time = now.format('HH:mm')
  const date = now.format('YYYY-MM-DD')
  const day = now.format('dddd')
  return {
    time,
    date,
    day,
  }
}

const Sider = props => {
  const [modalExposureKitVisible, showModalExposureKit] = useState(false)
  const [modalFirstAidKitVisible, showModalFirstAidKit] = useState(false)
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [day, setDay] = useState('')

  const [userStatus, setUserStatus] = useState('active')

  const {
    menus,
    theme,
    collapsed,
    isMobile,
    onCollapseChange,
    onThemeChange,
  } = props

  const Logo = props => {
    const { collapsed } = props
    return (
      <div className={styles.brand}>
        <div className={styles.logo}>
          {collapsed ? (
            <img
              alt="logo"
              src={config.logoPath}
              style={{ height: '100%', width: '100%' }}
              onClick={() =>
                router.push(
                  user.userid === 'dlivr'
                    ? `/${baseUrl}/dlivr`
                    : // `/${baseUrl}/profile/${user.userid}`
                      `/${baseUrl}/patient`
                )
              }
            />
          ) : (
            <img
              alt="logo"
              src={config.fullLogoPath}
              style={{ height: '100%', width: '100%' }}
              onClick={() =>
                router.push(
                  user.userid === 'dlivr'
                    ? `/${baseUrl}/dlivr`
                    : // `/${baseUrl}/profile/${user.userid}`
                      `/${baseUrl}/patient`
                )
              }
            />
          )}
        </div>
      </div>
    )
  }

  let userid = ''
  let firstName = ''
  let lastName = ''
  let doctors = []

  let baseUrl

  const { user, userRole } = props.app

  if (user) {
    userid = user.userid
    firstName = user.firstName
    lastName = user.lastName
    // console.log(userRole)
    switch (userRole) {
      case 'phlebotomist':
        baseUrl = 'phlebotomy'
        break
      case 'receptionist':
        baseUrl = 'reception'
        break
      case 'practitioner':
        baseUrl = 'practitioner'
        break
      case 'laboratory-technician':
        baseUrl = 'laboratory'
        break
      case 'senior-laboratory-technician':
        baseUrl = 'laboratory'
        break
      default:
        break
    }
  }

  if (window.location.doctors) {
    doctors = window.location.doctors
  }

  const day_mn = days[day]

  useEffect(() => {
    if (userRole === 'phlebotomist') {
      let interval = setInterval(() => {
        const dateTimeObj = getFullDateTime()

        setTime(dateTimeObj.time)
        setDate(dateTimeObj.date)
        setDay(dateTimeObj.day)
      }, 1000)

      // this will clear Timeout when component unmount like in willComponentUnmount
      return () => clearInterval(interval)
    }
  }, [userRole])

  const onStatusMenuChange = menuItem => {
    setUserStatus(menuItem.key)
  }

  const statusMenu = (
    <Menu onClick={onStatusMenuChange}>
      <Menu.Item key="active">
        <Trans id="active" />
      </Menu.Item>
      <Menu.Item key="busy">
        <Trans id="busy" />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="left">
        <Trans id="left" />
      </Menu.Item>
    </Menu>
  )

  const UserStatusIndicator = props => {
    let color
    let iconType

    switch (props.status) {
      case 'active':
        color = '#31FF00'
        iconType = 'check-circle'

        break
      case 'busy':
        color = 'red'
        iconType = 'minus-circle'

        break
      case 'left':
        color = 'yellow'
        iconType = 'clock-circle'

        break
      default:
        break
    }

    return (
      <Icon
        type={iconType}
        theme="filled"
        style={{
          color: color,
          fontSize: '9px',
          margin: '2px',
        }}
      />
    )
  }

  return (
    <Layout.Sider
      width={256}
      // theme={theme}
      theme="dark"
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      onBreakpoint={isMobile ? null : onCollapseChange}
      className={styles.sider}
    >
      <Logo collapsed={collapsed} />

      <div
        className={
          styles.menuContainer
          // theme === THEME_DARK
          //   ? styles.menuContainer
          //   : styles.menuContainerLight
        }
      >
        <div
          className={
            theme === THEME_DARK ? styles.profile : styles.profileLight
          }
        >
          <Row type="flex" justify="start" gutter={12}>
            <Col span={6}>
              <Link
                to={
                  user.userid === 'dlivr'
                    ? `/${baseUrl}/dlivr`
                    : `/${baseUrl}/profile/1`
                  //`/${baseUrl}/patient`
                }
              >
                <div style={{ zIndex: '1', position: 'relative' }}>
                  <Avatar size={collapsed ? 32 : 52} icon="user" />
                </div>
                <div
                  style={{
                    zIndex: '2',
                    position: 'relative',
                    top: '-12px',
                    right: '-20px',
                  }}
                >
                  {collapsed && <UserStatusIndicator status={userStatus} />}
                </div>
              </Link>
            </Col>

            {!collapsed && (
              <Col span={17}>
                <div className={styles.userName}>
                  <Button
                    onClick={() =>
                      router.push(
                        user.userid === 'dlivr'
                          ? `/${baseUrl}/dlivr`
                          : `/${baseUrl}/patient`
                      )
                    }
                    type="link"
                    style={{ margin: 0, padding: 0 }}
                  >
                    <span
                      style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '0',
                        fontSize: '12px',
                        color: '#fafafa',
                      }}
                    >
                      {user.userid === 'dlivr' ? (
                        user.nameDisplay
                      ) : (
                        <>
                          {lastName && lastName.charAt(0)}. {firstName}
                        </>
                      )}
                    </span>
                  </Button>

                  <br />

                  <span
                    style={{
                      letterSpacing: '0',
                      fontSize: '12px',
                    }}
                  >
                    {user.userid === 'dlivr' ? (
                      user.roleDisplay
                    ) : (
                      <Trans id={userRole} />
                    )}
                  </span>
                  <br />

                  <Dropdown overlay={statusMenu} trigger={['click']}>
                    <a className="ant-dropdown-link">
                      <UserStatusIndicator status={userStatus} />
                      &nbsp;
                      <span
                        style={{
                          letterSpacing: '0',
                          fontSize: '10px',
                          color: '#fafafa',
                        }}
                      >
                        <Trans id={userStatus} />
                      </span>
                      &nbsp;
                      <Icon type="down" style={{ fontSize: '7px' }} />
                    </a>
                  </Dropdown>
                </div>
              </Col>
            )}
          </Row>
        </div>
        <ScrollBar
          // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
          options={{
            suppressScrollX: true,
          }}
          style={{ height: '80%' }}
        >
          <SiderMenu
            menus={menus}
            // theme={theme}
            theme="dark"
            isMobile={isMobile}
            collapsed={collapsed}
            onCollapseChange={onCollapseChange}
            className={styles.menuStyle}
          />
          {userRole === 'receptionist' && ActiveUsers(doctors)}
          {userRole === 'phlebotomist' && (
            <div style={{ width: '216px', margin: '16px 0 0 24px' }}>
              <div
                style={{
                  height: '160px',
                  background: '#5FE3A1',
                  borderRadius: '4px',
                  padding: '12px',
                }}
              >
                <div>
                  <div>
                    <span
                      style={{
                        fontFamily: 'Helvetica Neue Bold',
                        fontSize: '14px',
                      }}
                    >
                      {day_mn}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '10px' }}>{day}</span>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '10px',
                          fontFamily: 'Helvetica Neue Bold',
                        }}
                      >
                        {date}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: '#004D40',
                    height: '2px',
                    marginTop: '12px',
                  }}
                />

                <div>
                  <span
                    style={{
                      fontFamily: 'Helvetica Neue Bold',
                      fontSize: '76px',
                      lineHeight: '92px',
                      color: '#004D40',
                      alignSelf: 'center',
                    }}
                  >
                    {time}
                  </span>
                </div>
              </div>

              <Button
                style={{
                  marginTop: '8px',
                  border: 0,
                  color: '#FFFFFF',
                  background: '#F44336',
                }}
                block
                onClick={() => showModalExposureKit(true)}
              >
                <Trans>Exposure kit</Trans>
              </Button>
              <Button
                style={{
                  marginTop: '8px',
                  border: 0,
                  color: '#FFFFFF',
                  background: '#F44336',
                }}
                block
                onClick={() => showModalFirstAidKit(true)}
              >
                <Trans>First aid kit</Trans>
              </Button>
            </div>
          )}
        </ScrollBar>
        {/* {!collapsed && (
          <div
            className={
              theme === THEME_DARK
                ? styles.switchTheme
                : styles.switchThemeLight
            }
          >
            <span className={styles.switchThemeLabel}>
              <Icon type="bulb" />
              <Trans>SwitchTheme</Trans>
            </span>
            <Switch
              onChange={onThemeChange.bind(
                this,
                theme === THEME_DARK ? THEME_LIGHT : THEME_DARK
              )}
              defaultChecked={theme === DEFAULT_THEME}
              checkedChildren={<Trans id="Dark" />}
              unCheckedChildren={<Trans id="Light" />}
            />
          </div>
        )} */}
      </div>

      <ModalExposureKit
        visible={modalExposureKitVisible}
        onCancel={() => showModalExposureKit(false)}
      />
      <ModalFirstAidKit
        visible={modalFirstAidKitVisible}
        onCancel={() => showModalFirstAidKit(false)}
      />
    </Layout.Sider>
  )
}

Sider.propTypes = {
  phlebotomy: PropTypes.object,
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onThemeChange: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default connect(({ app, phlebotomy, location, loading }) => ({
  phlebotomy,
  app,
  location,
  loading,
}))(withI18n()(Sider))
