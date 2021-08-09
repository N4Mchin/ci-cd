import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import { Page } from 'components'
import { stringify } from 'qs'
import styles from './index.less'
import * as helper from 'utils/helper'
import {
  Row,
  Col,
  Button,
  Popconfirm,
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Icon,
} from 'antd'
import { Trans, withI18n } from '@lingui/react'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

@withI18n()
@connect(({ practitionerDetail, loading }) => ({ practitionerDetail, loading }))
class PractitionerDetail extends PureComponent {
  render() {
    const { dispatch, practitionerDetail, loading, i18n } = this.props
    const { data } = practitionerDetail

    const nodeItem = (item, items) => {
      const value = items[item]

      if (helper.isObject(value)) {
        const list = value
        return (
          <li>
            {item}
            <ul>
              {Object.keys(list).map(listItem => nodeItem(listItem, list))}
            </ul>
          </li>
        )
      } else {
        return (
          <li>
            {item}
            <ul>
              <li>{value.toString()}</li>
            </ul>
          </li>
        )
      }
    }

    const DynamicNestedItems = () => {
      if (data) {
        return (
          <ul>{Object.keys(data).map(dataItem => nodeItem(dataItem, data))}</ul>
        )
      }
    }

    return (
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  subnav 1
                </span>
              }
            >
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="laptop" />
                  subnav 2
                </span>
              }
            >
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="notification" />
                  subnav 3
                </span>
              }
            >
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Page inner>{DynamicNestedItems(data)}</Page>
        </Content>
        <Sider
          width={300}
          style={{ background: '#fff', border: '1px solid black' }}
        >
          <Row type="flex" justify="space-around" align="middle">
            <Col>
              <Avatar
                size={128}
                src={
                  data.photo && {
                    uri: `${data.photo['0'].contentType};base64,${data.photo['0'].data}`,
                  }
                }
              />
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {data.name && (
                <>
                  {i18n.t`HumanNameGiven` + ': '}
                  <span className={styles.itemName}>
                    {data.name.prefix && `${data.name.prefix.join(' ')} `}
                    {data.name.given && data.name.given.join(' ') + ` `}
                    {data.name.suffix && `${data.name.suffix.join(' ')} `}
                  </span>
                  {' | '}

                  {i18n.t`HumanNameFamily` + ': '}
                  <span className={styles.itemName}>
                    {data.name.family && `${data.name.family} `}
                  </span>
                  {<br></br>}

                  {data.name.period && data.name.period.start && (
                    <>
                      {i18n.t`PeriodStart` + ': '}
                      <span
                        className={styles.itemName}
                      >{`${data.name.period.start}`}</span>
                    </>
                  )}

                  {data.name.period &&
                    data.name.period.start &&
                    (data.name.period && data.name.period.end) && <>{' | '}</>}

                  {data.name.period && data.name.period.end && (
                    <>
                      {i18n.t`PeriodEnd` + ': '}
                      <span className={styles.itemName}>
                        {data.name.period.end && `${data.name.period.end} `}
                      </span>
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Sider>
      </Layout>
    )
  }
}

PractitionerDetail.propTypes = {
  practitionerDetail: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default PractitionerDetail
