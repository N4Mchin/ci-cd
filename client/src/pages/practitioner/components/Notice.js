import React from 'react'
import { Row, Col, Button, List, Input, Icon } from 'antd'
import style from '../styles.less'

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
  return (
    <div>
      <div style={{ border: '1px solid #C9C9C9' }}>
        <InputGroup size="default">
          <Row type="flex" align="middle" justify="space-around">
            <Col>
              <Icon fontSize="16px" type="plus" />
            </Col>
            <Col>
              <Input placeholder={'Сонордуулга бичих'} />
            </Col>
            <Col>
              <Icon fontSize="16px" type="star" />
            </Col>
            <Col>
              <Button type="primary">НЭМЭХ</Button>
            </Col>
          </Row>
        </InputGroup>
        <List
          className={style.list}
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
          Үргэлжлүүлэн үзэх
        </Button>
      </div>
    </div>
  )
}

export default Notice
