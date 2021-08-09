import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse, ModuleBox } from 'components'
import styles from '../styles.less'

import { Divider, Select, Row, Checkbox, Col, Input, Tag } from 'antd'

const { Search } = Input
const { Option } = Select
// define all filter options
const specificProteins = [
  'Acetaminophen',
  'Amikacin',
  'Carbamazepine',
  'Cyclosporine',
  'C3c',
  'C4',
]

const lipids = [
  'CHOL',
  'HDL',
  'LDL',
  'LPA',
  'Triglycerides GB',
  'Kappa Light Chains',
]
const tumorMarkers = [
  'AFP',
  'AFP L3',
  'CA 125 ',
  'CA 15-3',
  'CA 19-9',
  'CA 72-4',
]
const rapid = ['anti-HCV', 'HBsAg', 'HIV', 'Syphills', 'ТРНА', 'RPR']
@withI18n()
@connect(({ report, loading }) => ({ report, loading }))
class Selectors extends PureComponent {
  onCheckRegisteredReceptionAllChange = e => {
    this.setState({
      checkedRegisteredReceptionList: e.target.checked
        ? registeredReceptionList
        : [],
      checkRegisteredReceptionAll: e.target.checked,
    })
  }

  // hangle change of date picker
  state = {
    date: 'today',
  }

  handleDatePicker = e => {
    this.setState({
      date: e.key,
    })
  }

  // handle after clicking on cancel all filters button
  handleCancelFilter = e => {
    this.setState({
      checkedServiceTypeList: [],
      checkServiceTypeAll: false,
      checkedDiscountTypeList: [],
      checkDiscountTypeAll: false,
      checkedLocalBillList: [],
      checkLocalBillAll: false,
      checkedSpecialDiscountTypeList: [],
      checkSpecialDiscountTypeAll: false,
      checkedResearchPurposeList: [],
      checkResearchPurposeAll: false,
      checkedPaymentMethodList: [],
      checkPaymentMethodAll: false,
      checkedDiscountWorkerList: [],
      checkDiscountWorkerAll: false,
      checkedRegisteredReceptionList: [],
      checkRegisteredReceptionAll: false,
    })
  }

  // handle action after clicking on search button
  // 1. use dispatch
  // 2. send to backend
  handleSearchFilter = e => {
    const payload = {
      dateRange: this.state.date,
      serviceType: this.state.checkedServiceTypeList,
      discountType: this.state.checkedDiscountTypeList,
      localBill: this.state.checkedLocalBillList,
      specialDiscountType: this.state.checkedSpecialDiscountTypeList,
      researchPurpose: this.state.checkedResearchPurposeList,
      paymentMethod: this.state.checkedPaymentMethodList,
      discountWorker: this.state.checkedDiscountWorkerList,
      registeredReception: this.state.checkedRegisteredReceptionList,
    }

    this.props.dispatch({
      type: 'report/requestFilteredList',
      payload: payload,
    })
  }

  render() {
    const { i18n } = this.props
    const { subTestList = [], displayName, bordered, active } = this.props

    const border = bordered ? '1px solid #c9c9c9' : 0
    const activeKeys = active && ['1']
    // 1. Date picker
    // 2. Filters...
    // TODO: change css on date selector. Changing className cannot change selected value box.
    return (
      <div className={styles.container}>
        <div className={styles.title1}>
          <Trans>
            <strong>Selectors</strong>
          </Trans>
        </div>

        <Row>
          <span>
            <Trans>
              <strong>LabDoctor</strong>
            </Trans>
          </span>
          {''} {''}
          <Tag closable>Б.Сумъяа</Tag>
          <span>
            <Trans>
              <strong>SampleType</strong>
            </Trans>
          </span>
          {''} {''}
          <span>Судалгаа</span>
          {''} {''}
          <Tag closable>Rapid Test specific</Tag>
          <span>
            <Trans>
              <strong>AgeType</strong>
            </Trans>
          </span>
          {''} {''}
          <Tag closable>Бүгд</Tag>
        </Row>
        <Row style={{ marginTop: '8px' }}>
          {' '}
          <span>
            <Trans>
              <strong>SampleStatus</strong>
            </Trans>
          </span>
          {''} {''}
          <Tag closable>Бүгд</Tag>
          <span>
            <Trans>
              <strong>reference</strong>
            </Trans>
          </span>
          {''} {''}
          <Tag closable>Лавлах утга</Tag>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <h1>
            <Trans>TestType</Trans>
          </h1>
        </Row>
        <Row>
          <Col span={8}>
            {' '}
            <BorderCollapse
              displayName={<Trans>BIOCHEMISTRY</Trans>}
              defaultActiveKey={['1']}
            >
              <Col span={12}>
                <BorderCollapse
                  displayName={<Trans>SPECIFIC PROTEINS</Trans>}
                  defaultActiveKey={['1']}
                >
                  <Col
                    span={12}
                    style={{
                      padding: '5px 5px 5px 5px',
                    }}
                  >
                    <div style={{ height: '5px' }}></div>
                    <Tag
                      value={this.state.checkedServiceTypeList}
                      onChange={this.onChangeServiceTypeCheckbox}
                      style={{ marginLeft: '4px' }}
                      closable
                    >
                      {specificProteins.map(serviceType => (
                        <Row gutter={8}>
                          <Tag value={serviceType} closable>
                            {serviceType}
                          </Tag>
                        </Row>
                      ))}
                    </Tag>
                  </Col>
                </BorderCollapse>
              </Col>
              <Col span={12}>
                <BorderCollapse
                  displayName={<Trans>LIPIDS</Trans>}
                  defaultActiveKey={['1']}
                >
                  <Col
                    span={12}
                    style={{
                      padding: '5px 5px 5px 5px',
                    }}
                  >
                    <div style={{ height: '5px' }}></div>
                    <Tag
                      value={this.state.checkedServiceTypeList}
                      onChange={this.onChangeServiceTypeCheckbox}
                      style={{ marginLeft: '4px' }}
                      closable
                    >
                      {lipids.map(serviceType => (
                        <Row gutter={8}>
                          <Tag value={serviceType} closable>
                            {serviceType}
                          </Tag>
                        </Row>
                      ))}
                    </Tag>
                  </Col>
                </BorderCollapse>
              </Col>
            </BorderCollapse>
          </Col>

          <Col span={8}>
            {' '}
            <BorderCollapse
              displayName={<Trans>IMMUNOLOGY</Trans>}
              defaultActiveKey={['1']}
            >
              <Col span={12}>
                <BorderCollapse
                  displayName={<Trans>TUMOR MARKERS</Trans>}
                  defaultActiveKey={['1']}
                >
                  <Col
                    span={12}
                    style={{
                      padding: '5px 5px 5px 5px',
                    }}
                  >
                    <div style={{ height: '5px' }}></div>
                    <Tag
                      value={this.state.checkedServiceTypeList}
                      onChange={this.onChangeServiceTypeCheckbox}
                      style={{ marginLeft: '4px' }}
                      closable
                    >
                      {tumorMarkers.map(serviceType => (
                        <Row gutter={8}>
                          <Tag value={serviceType} closable>
                            {serviceType}
                          </Tag>
                        </Row>
                      ))}
                    </Tag>
                  </Col>

                  {/* write */}
                </BorderCollapse>
              </Col>
            </BorderCollapse>
          </Col>

          <Col span={8}>
            {' '}
            <BorderCollapse
              displayName={<Trans>RAPID TEST</Trans>}
              defaultActiveKey={['1']}
            >
              <Col
                span={12}
                style={{
                  padding: '5px 5px 5px 5px',
                }}
              >
                <div style={{ height: '5px' }}></div>
                <Tag
                  value={this.state.checkedServiceTypeList}
                  onChange={this.onChangeServiceTypeCheckbox}
                  style={{ marginLeft: '4px' }}
                  closable
                >
                  {rapid.map(serviceType => (
                    <Row gutter={8}>
                      <Tag value={serviceType} className={styles.cont} closable>
                        {serviceType}
                      </Tag>
                    </Row>
                  ))}
                </Tag>
              </Col>
            </BorderCollapse>
          </Col>
        </Row>
      </div>
    )
  }
}

Selectors.propTypes = {
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Selectors

//created Sanjaasuren.E
//2020-04-02
