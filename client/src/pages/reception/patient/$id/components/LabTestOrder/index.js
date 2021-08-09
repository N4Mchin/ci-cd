import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Typography, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './LabTestOrder.less'
import ImmunologyTests from './ImmunologyTests'
import BiochemistryTests from './BiochemistryTests'
import UncategorizedTests from './UncategorizedTests'
import CollapseBox from '../CollapseBox'
import { ROLE_TYPE } from 'utils/constant'

const { Text } = Typography

function title() {
  return (
    <Trans>
      <Text strong>Lab Test </Text>
      <Text>Order</Text>
    </Trans>
  )
}

@withI18n()
@connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))
class LabTestOrder extends PureComponent {
  state = {
    data: {},
  }

  handleTestItem = (testName, value) => {
    const data = { ...this.state.data }
    data[testName] = value

    console.log(data, value)
    this.setState({ data })
    this.props.dispatch({
      type: 'reception_patientProfile/labTestOrder',
      payload: { SelectedTests: data },
    })
  }

  static getDerivedStateFromProps(props, state) {
    const { SelectedTests } = props.reception_patientProfile
    const data = SelectedTests

    if (data !== state.data) {
      return {
        data: data,
      }
    }
    // Return null if the state hasn't changed
    return null
  }

  render() {
    const { SelectedTests } = this.props.reception_patientProfile
    const { user } = this.props.app

    return (
      <div className={styles.tableColor}>
        <CollapseBox Title={title()}>
          <div className={styles.labTestContainer}>
            <Row gutter={16}>
              {user.permission.role === ROLE_TYPE.EXTERNAL_RECEPTIONIST ? (
                <>
                  <Col xxl={12} xl={12} lg={12} md={20} sm={20} xs={20}>
                    <UncategorizedTests
                      testName="UncategorizedTests"
                      onChange={this.handleTestItem}
                      value={SelectedTests.UncategorizedTests}
                    />
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={20} sm={20} xs={20}>
                    <ImmunologyTests
                      testName="ImmunologyTests"
                      onChange={this.handleTestItem}
                      value={SelectedTests.ImmunologyTests}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <UncategorizedTests
                      testName="UncategorizedTests"
                      onChange={this.handleTestItem}
                      value={SelectedTests.UncategorizedTests}
                    />
                    <ImmunologyTests
                      testName="ImmunologyTests"
                      onChange={this.handleTestItem}
                      value={SelectedTests.ImmunologyTests}
                    />
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <BiochemistryTests
                      testName="BiochemistryTests"
                      onChange={this.handleTestItem}
                      value={SelectedTests.BiochemistryTests}
                    />
                  </Col>
                </>
              )}
            </Row>
          </div>
        </CollapseBox>
      </div>
    )
  }
}

LabTestOrder.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default LabTestOrder
