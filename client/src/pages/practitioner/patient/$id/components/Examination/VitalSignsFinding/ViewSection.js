import React from 'react'
import { Button, Row, Col, Form } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../../styles.less'

const ViewSection = props => {
  const { dataSource, i18n } = props
  console.log(props)

  const title = resolveDisplay(dataSource, i18n._language)

  return (
    <Row type="flex" align="middle" style={{ border: '1px solid #c9c9c9' }}>
      <Col
        span={6}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {title}
      </Col>
      <Col span={18}>
        {Object.values(dataSource.include).map(dataSourceInclude => {
          return (
            <Row type="flex">
              <Col span={12} style={{ border: '1px solid #c9c9c9' }}>
                <div>{resolveDisplay(dataSourceInclude, i18n._language)}</div>
              </Col>
              <Col
                span={12}
                style={{ border: '1px solid #c9c9c9' }}
              >{`${dataSourceInclude.value} | ${dataSourceInclude.unit}`}</Col>
            </Row>
          )
        })}
      </Col>
    </Row>
  )
}

export default withI18n()(ViewSection)
