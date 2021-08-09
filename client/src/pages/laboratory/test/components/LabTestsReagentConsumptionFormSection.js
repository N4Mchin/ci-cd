import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from './styles.less'

import { Row, Button, Table, Form, Col } from 'antd'

const LabTestsReagentConsumptionFormSection = props => {
  const { loading } = props

  return (
    <div>
      <Form onChange={props.onExpense}>
        <Row style={{ marginTop: '20px' }}>
          {' '}
          <Table
            dataSource={props.dataSource}
            columns={props.columns}
            bordered={true}
            className={styles.container1}
            pagination={false}
            loading={props.loadingRef}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
            {' '}
            <Col>
              <Button
                className="button-red"
                block
                onClick={props.onSubmit}
                loading={
                  loading.effects[
                    'laboratory_test/saveLabTestsReagentConsumption'
                  ]
                }
              >
                <Trans>Save</Trans>
              </Button>
            </Col>
          </div>
        </Row>
      </Form>
    </div>
  )
}

LabTestsReagentConsumptionFormSection.propTypes = {
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
}))(withI18n()(Form.create()(LabTestsReagentConsumptionFormSection)))
