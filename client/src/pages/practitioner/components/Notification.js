import React from 'react'
import { Row, Col, Button, List, Input, Icon } from 'antd'
import styles from '../styles.less'
import { Trans, withI18n } from '@lingui/react'

const InputGroup = Input.Group

const columns_list = [
  {
    title: 'ОГНОО : 2019-12-24',
    data: 'Өнөөдөр 17:00 цагаас Journal club- тай.',
    name: '- М. АЛТАНХҮҮ',
  },
  {
    title: 'ОГНОО : 2019-12-16',
    data: 'Лаб материала өгөөрэй.',
    name: '- Д. НАРАНЖАРГАЛ',
  },
  {
    title: 'ОГНОО : 2019-12-09',
    data: 'Лаб материала өгөөрэй.',
    name: '- Д. Бэхболд',
  },
]

const Notice = props => {
  const { i18n } = props
  return (
    <div>
      <div style={{ border: '1px solid #C9C9C9' }}>
        <InputGroup size="default" style={{ marginTop: '8px' }}>
          <Row type="flex" justify="space-between" align="middle">
            <Icon
              style={{
                marginLeft: '16px',
                fontSize: '16px',
                alignSelf: 'center',
              }}
              type="plus"
            />
            <Col span={15}>
              <div className={styles.border}>
                <Input
                // placeholder={i18n.t`AddNotification`}
                />
              </div>
            </Col>
            <Icon style={{ fontSize: '16px' }} type="star" />
            <Col>
              <Button style={{ marginRight: '16px' }} type="primary">
                <span className="uppercase">
                  <Trans id="Add" />
                </span>
              </Button>
            </Col>
          </Row>
        </InputGroup>

        <List
          className={styles.list}
          itemLayout="horizontal"
          size="small"
          dataSource={columns_list}
          style={{ marginRight: '15px', marginLeft: '15px' }}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a>{item.title}</a>}
                description={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>{item.data}</div>
                    <div style={{ fontSize: '8px' }}>{item.name}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <div style={{ marginTop: '4px' }}>
        <Button type="primary" style={{ width: '100%' }}>
          <Trans id="Seemore" />
        </Button>
      </div>
    </div>
  )
}

export default withI18n()(Notice)
