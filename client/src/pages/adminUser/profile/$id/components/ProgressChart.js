import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Typography, Progress, Col, Row } from 'antd'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts'
import { Trans, withI18n } from '@lingui/react'
import styles from '../index.less'

const moment = require('moment')
const { Text } = Typography

const ProgressChart = () => {
  return (
    <div style={{ marginTop: '30px ' }}>
      <Row type="flex" justify="space-between">
        <Col>
          <Row
            type="flex"
            justify="center"
            className="bold"
            style={{
              fontSize: '14px',
            }}
          >
            <Trans>8538</Trans>
          </Row>
          <br />
          <Row>
            <Progress
              type="circle"
              percent={11}
              width={160}
              strokeColor="#A3A1FB"
              trailColor="#E5E5E9"
              className="bold"
              format={percent => (
                <div>
                  B<br />
                  {percent}%
                </div>
              )}
            />
          </Row>
          <br />
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <Trans>
              Бүртгүүлсэн В вирүстэй <br /> хүмүүс
            </Trans>
          </div>
        </Col>
        <Col>
          <Row
            type="flex"
            justify="center"
            className="bold"
            style={{
              fontSize: '14px',
            }}
          >
            <Trans strong>13583</Trans>
          </Row>
          <br />
          <Row>
            <Progress
              type="circle"
              percent={17}
              width={160}
              strokeColor="#54D8FF"
              trailColor="#E5E5E9"
              className="bold"
              format={percent => (
                <div>
                  C<br />
                  {percent}%
                </div>
              )}
            />
          </Row>
          <br />
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <Trans strong>
              Бүртгүүлсэн C вирүстэй <br /> хүмүүс
            </Trans>
          </div>
        </Col>

        <Col>
          <Row
            type="flex"
            justify="center"
            className="bold"
            style={{
              fontSize: '14px',
            }}
          >
            <Trans>5402</Trans>
          </Row>
          <br />
          <Row>
            <Progress
              type="circle"
              percent={7}
              width={160}
              strokeColor="#FFDA83"
              trailColor="#E5E5E9"
              className="bold"
              format={percent => (
                <div>
                  D<br />
                  {percent}%
                </div>
              )}
            />
          </Row>
          <br />
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <Trans>
              Бүртгүүлсэн D вирүстэй <br /> хүмүүс
            </Trans>
          </div>
        </Col>
      </Row>
    </div>
  )
}

ProgressChart.propTypes = {
  app: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(ProgressChart))
