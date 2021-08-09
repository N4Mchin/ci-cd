import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import ReactToPrint from 'react-to-print'
import TestProtocolsHeader from '../../components/TestProtocolsHeader'
import styles from './styles.less'
import { Button, Table, Form, Col, Spin } from 'antd'
import { getDate } from 'utils/datetime'

const LabTestsReagentConsumptionViewSection = props => {
  const { loadingRef } = props
  const componentRef = useRef()

  return (
    <div>
      <div className={styles.firstDiv} ref={componentRef}>
        <TestProtocolsHeader documentName="БҮ-ЭТ-004" />

        <Col span={10}>
          <span>Огноо: {getDate()}</span>
        </Col>
        <Col span={14}>
          {' '}
          <span className="bold">{props.testName} урвалж зарцуулалт </span>
        </Col>

        <br />
        <div>
          {loadingRef && <Spin spinning />}
          {!loadingRef && (
            <Table
              dataSource={props.reagentLogDataSource}
              columns={props.reagentLogColumns}
              bordered={true}
              className={styles.container1}
              loading={loadingRef}
            />
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '20px',
        }}
      >
        <Col>
          <ReactToPrint
            trigger={() => (
              <Button className="button-dark-gray" block>
                <Trans>Print</Trans>
              </Button>
            )}
            content={() => componentRef.current}
            pageStyle={'@page {size: landscape}'}
          />
        </Col>
      </div>
    </div>
  )
}

LabTestsReagentConsumptionViewSection.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test, dispatch }) => ({
  app,
  loading,
  laboratory_test,
  dispatch,
}))(withI18n()(Form.create()(LabTestsReagentConsumptionViewSection)))
