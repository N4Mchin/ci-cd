import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse, ModuleBox } from 'components'
import styles from '../styles.less'

import {
  Divider,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Collapse,
  Input,
} from 'antd'

const { Search } = Input

const { Option } = Select
// define all filter options

const liverFunction = ['T.Bill', 'D.Bill', 'AST', 'ALT', 'ALB', 'TP']

const drugOfAbuse = [
  'Amphetamines',
  'Barbiturates',
  'Benzodiazepines',
  'Cannabinoids',
  'Cocain Metabolite',
  'Ethanol',
]

const specificProteins = [
  'Acetaminophen',
  'Amikacin',
  'Carbamazepine',
  'Cyclosporine',
  'C3c',
  'C4',
]

const diabetsTest = ['PCT', 'Amikacin', 'IL6', 'CRP', 'ASO', 'RF']
const electrolystes = ['Cl', 'Cu']
const rheumatology = ['PCT', 'IL6', 'CRP', 'ASO', 'RF']
const lipids = [
  'CHOL',
  'HDL',
  'LDL',
  'LPA',
  'Triglycerides GB',
  'Kappa Light Chains',
]
const kidneyFunction = ['Cyst C', 'Creatinine', 'Urea', 'UA', 'PreALb']
const pancreasFunction = ['Amylase-Tot', 'Amylase-Pancr', 'LIPA', 'HbA1C']
const other = [
  'AT III- Coagulogramm',
  'D-Dimer Coagulogramm',
  'α1-Acid Glycoprotein',
  'α1-Antitrypsin',
  'α1-Microglobuline',
  'APO A1 Lipid',
]
const tumorMarkers = [
  'AFP',
  'AFP L3',
  'CA 125 II',
  'CA 15-3',
  'CA 19-9',
  'CA 72-4',
]
const fertilityHormones = [
  'ACTH',
  'C peptide',
  'Cortisol',
  'DHEA-S',
  'Estradiol',
  'FSH',
]
const thyroidFunction = [
  'Anti-TG',
  'Anti-TPO',
  'Anti-TSHR',
  'Calcitonin',
  'FT3',
  'FT4',
]

const cardiac = [
  'CK-MB (mass)',
  'CK-MB (mass) STAT',
  'Digoxin',
  'Digitoxin',
  'Myoglobin',
  'Myoglobin STAT',
]

const infectiousDiseases = [
  'Anti-IgE',
  'Anti-HAV total',
  'Anti-HAV lgM',
  'Anti-HBc',
  'Anti-HBc lgM',
  'Anti-HBe',
]

const anaemia = [
  'Ferritin',
  'Folate',
  'RBC Folate',
  'Vitamin B12',
  'UIBC',
  'TIBC',
]

const firstTrimesterScreening = ['Free beta hCG', 'PAPP-A', 'PIGF', 'sFLT-1']

const boneMarkers = [
  'beta-CrossLaps',
  'Intact PTH',
  'N-MID Osteocalcin',
  'P1NP',
  'PTH STAT',
  'Vitamin D3',
]

const rheumatiodArthritis = []

const autoImmuneMarkers = ['ANAs', 'AMAs', 'LKM-1', 'LC-1']

const criticalCare = ['IL6', 'BRAHMS PCT', 'S100']

const viralLoad = ['HCV-RNA', 'HBV-DNA', 'HDV-RNA', 'HIV-RNA', 'HPV']

const hematology = [
  'WBC',
  'NEU',
  'NEU',
  'LYM',
  'LYM%',
  'MON',
  'MON%',
  'EO',
  'EO%',
  'BAS',
  'BAS%',
  'BAS%',
  'HGB',
]

const hematology1 = [
  'HCT',
  'MCV',
  'MCH',
  'MCHC',
  'RDWsd',
  'RDWsd',
  'RDWsd',
  'RDWsd',
  'RDWsd',
  'RDWsd',
  'PDWcv',
  'PDWcv',
  'PDWcv',
]
const rapidTest = ['anti-HCV', 'HBsAg', 'HIV', 'Syphills', 'ТРНА', 'RPR']
const genoType = ['HCV-Genotype', 'HBV-Genotype', 'HDV-Genotype']
const others = ['Hematology', 'ESR', 'Urinalysis', 'Coagulation']
@withI18n()
@connect(({ report, loading }) => ({ report, loading }))
class TestType extends PureComponent {
  // onchange, oncheck, state for service type
  state = {
    checkedServiceTypeList: [],
    checkServiceTypeAll: false,
  }

  onChangeServiceTypeCheckbox = checkedServiceTypeList => {
    this.setState({
      checkedServiceTypeList,
      checkServiceTypeAll:
        checkedServiceTypeList.length === serviceTypeList.length,
    })
  }

  onCheckServiceTypeAllChange = e => {
    this.setState({
      checkedServiceTypeList: e.target.checked ? serviceTypeList : [],
      checkServiceTypeAll: e.target.checked,
    })
  }

  // onchange, oncheck, state for discount type
  state = {
    checkedDiscountTypeList: [],
    checkDiscountTypeAll: false,
  }

  onChangeDiscountTypeCheckbox = checkedDiscountTypeList => {
    this.setState({
      checkedDiscountTypeList,
      checkDiscountTypeAll:
        checkedDiscountTypeList.length === discountTypeList.length,
    })
  }

  onCheckDiscountTypeAllChange = e => {
    this.setState({
      checkedDiscountTypeList: e.target.checked ? discountTypeList : [],
      checkDiscountTypeAll: e.target.checked,
    })
  }

  // onchange, oncheck, state for Local Bill
  state = {
    checkedLocalBillList: [],
    checkLocalBillAll: false,
  }

  onChangeLocalBillCheckbox = checkedLocalBillList => {
    this.setState({
      checkedLocalBillList,
      checkLocalBillAll: checkedLocalBillList.length === localBillList.length,
    })
  }

  onCheckLocalBillAllChange = e => {
    this.setState({
      checkedLocalBillList: e.target.checked ? localBillList : [],
      checkLocalBillAll: e.target.checked,
    })
  }

  // onchange, oncheck, state for special discount
  state = {
    checkedSpecialDiscountTypeList: [],
    checkSpecialDiscountTypeAll: false,
  }

  onChangeSpecialDiscountTyname

  onChangeResearchPurposeCheckbox = checkedResearchPurposeList => {
    this.setState({
      checkedResearchPurposeList,
      checkResearchPurposeAll:
        checkedResearchPurposeList.length === researchPurposeList.length,
    })
  }

  onCheckResearchPurposeAllChange = e => {
    this.setState({
      checkedResearchPurposeList: e.target.checked ? researchPurposeList : [],
      checkResearchPurposeAll: e.target.checked,
    })
  }

  // onchange, oncheck, state for Payment Method
  state = {
    checkedPaymentMethodList: [],
    checkPaymentMethodAll: false,
  }

  onChangePaymentMethodCheckbox = checkedPaymentMethodList => {
    this.setState({
      checkedPaymentMethodList,
      checkPaymentMethodAll:
        checkedPaymentMethodList.length === paymentMethodList.length,
    })
  }

  onCheckPaymentMethodAllChange = e => {
    this.setState({
      checkedPaymentMethodList: e.target.checked ? paymentMethodList : [],
      checkPaymentMethodAll: e.target.checked,
    })
  }

  // onchange, oncheck, state for Discount Worker
  state = {
    checkedDiscountWorkerList: [],
    checkDiscountWorkerAll: false,
  }

  onChangeDiscountWorkerCheckbox = checkedDiscountWorkerList => {
    this.setState({
      checkedDiscountWorkerList,
      checkDiscountWorkerAll:
        checkedDiscountWorkerList.length === discountWorkerList.length,
    })
  }

  onCheckDiscountWorkerAllChange = e => {
    this.setState({
      checkedDiscountWorkerList: e.target.checked ? discountWorkerList : [],
      checkDiscountWorkerAll: e.target.checked,
    })
  }

  // onchange, oncheck, state for reception practitioners
  state = {
    checkedRegisteredReceptionList: [],
    checkRegisteredReceptionAll: false,
  }

  onChangeRegisteredReceptionCheckbox = checkedRegisteredReceptionList => {
    this.setState({
      checkedRegisteredReceptionList,
      checkRegisteredReceptionAll:
        checkedRegisteredReceptionList.length ===
        registeredReceptionList.length,
    })
  }

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
      <div>
        <div className={styles.container}>
          <div className={styles.title1}>
            <Trans>
              <strong>TestType</strong>
            </Trans>
          </div>
          <Row>
            <BorderCollapse
              displayName={<Trans>BIOCHEMISTRY</Trans>}
              defaultActiveKey={['1']}
            >
              <Row>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>LIVER FUNCTION</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {liverFunction.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>DRUG OF ABUSE</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {drugOfAbuse.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>SPECIFIC PROTEINS</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {specificProteins.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>ELECTROLYTES</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {electrolystes.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>RHEUMATOLOGY</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {rheumatology.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>DIABETES TEST</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {diabetsTest.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
              </Row>
              <div style={{ height: '15px' }}></div>
              <Row>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>LIPIDS</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      {' '}
                      <Search
                        placeholder="Хайх"
                        style={{ width: '90%' }}
                        className={styles.search}
                      />
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {lipids.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>KIDNEY FUNCTION</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {kidneyFunction.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>PANCREAS FUNCTION</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {pancreasFunction.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>OTHER</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      {' '}
                      <Search
                        placeholder="Хайх"
                        style={{ width: '90%' }}
                        className={styles.search}
                      />
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {other.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
              </Row>
            </BorderCollapse>
          </Row>
          {/* -------------------------immunlogy --------------------------*/}
          <Row style={{ marginTop: '5px' }}>
            <BorderCollapse
              displayName={<Trans>IMMUNOLOGY</Trans>}
              defaultActiveKey={['1']}
            >
              <Row>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>TUMOR MARKERS</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {tumorMarkers.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>FERTILITY / HORMONES</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {fertilityHormones.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>THYROID FUNCTION</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {thyroidFunction.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>CARDIAC</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Search
                          placeholder="Хайх"
                          style={{ width: '90%' }}
                          className={styles.search}
                        />

                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {cardiac.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>INFECTIOUS DISEASES</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {infectiousDiseases.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>ANAEMIA</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {anaemia.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
              </Row>
              <div style={{ height: '15px' }}></div>
              <Row>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>FIRST TRIMESTER SCREENING</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      {' '}
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {firstTrimesterScreening.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>BONE MARKERS</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {boneMarkers.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>RHEUMATIOD ARTHRITIS</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>Anti-CCP</Trans>
                        </Checkbox>
                      </div>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>AUTOIMMUNE MARKERS</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      {' '}
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {autoImmuneMarkers.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
                <Col span={4}>
                  {' '}
                  <BorderCollapse
                    displayName={<Trans>CRITICAL CARE</Trans>}
                    display={<Checkbox></Checkbox>}
                    defaultActiveKey={['1']}
                  >
                    <Col
                      span={24}
                      style={{
                        border: '1px solid #c9c9c9',
                        padding: '5px 5px 5px 5px',
                      }}
                    >
                      {' '}
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          onChange={this.onCheckServiceTypeAllChange}
                          checked={this.state.checkServiceTypeAll}
                          className={styles.checkAll}
                        >
                          <Trans>All</Trans>
                        </Checkbox>
                      </div>
                      <div style={{ height: '5px' }}></div>
                      <Checkbox.Group
                        value={this.state.checkedServiceTypeList}
                        onChange={this.onChangeServiceTypeCheckbox}
                        style={{ marginLeft: '4px' }}
                      >
                        {criticalCare.map(serviceType => (
                          <Row gutter={8}>
                            <Checkbox
                              value={serviceType}
                              className={styles.cont}
                            >
                              {serviceType}
                            </Checkbox>
                          </Row>
                        ))}
                      </Checkbox.Group>
                    </Col>
                  </BorderCollapse>
                </Col>
              </Row>
            </BorderCollapse>
          </Row>
          {/* //////////empty------------//////////// */}
          <Row style={{ marginTop: '5px' }}>
            <BorderCollapse
              displayName={<Trans>HEMATOLOGY</Trans>}
              defaultActiveKey={['1']}
            >
              <Col
                span={8}
                style={{
                  border: '1px solid #c9c9c9',
                  padding: '5px 5px 5px 5px',
                }}
              >
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox
                    onChange={this.onCheckServiceTypeAllChange}
                    checked={this.state.checkServiceTypeAll}
                    className={styles.checkAll}
                  >
                    <Trans>All</Trans>
                  </Checkbox>
                </div>
                <div style={{ height: '10px' }}></div>
                <Col span={12}>
                  {' '}
                  <Checkbox.Group
                    value={this.state.checkedServiceTypeList}
                    onChange={this.onChangeServiceTypeCheckbox}
                    style={{ marginLeft: '4px' }}
                  >
                    {hematology.map(serviceType => (
                      <Row gutter={8}>
                        <Checkbox value={serviceType} className={styles.cont}>
                          {serviceType}
                        </Checkbox>
                      </Row>
                    ))}
                  </Checkbox.Group>
                </Col>
                <Col span={12}>
                  {' '}
                  <Checkbox.Group
                    value={this.state.checkedServiceTypeList}
                    onChange={this.onChangeServiceTypeCheckbox}
                    style={{ marginLeft: '4px' }}
                  >
                    {hematology1.map(serviceType => (
                      <Row gutter={8}>
                        <Checkbox value={serviceType} className={styles.cont}>
                          {serviceType}
                        </Checkbox>
                      </Row>
                    ))}
                  </Checkbox.Group>
                </Col>
              </Col>
            </BorderCollapse>
          </Row>

          <Row style={{ marginTop: '5px' }}>
            <BorderCollapse
              displayName={<Trans>VIRAL LOAD TESTS</Trans>}
              defaultActiveKey={['1']}
            >
              <Col
                span={8}
                style={{
                  border: '1px solid #c9c9c9',
                  padding: '5px 5px 5px 5px',
                }}
              >
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox
                    onChange={this.onCheckServiceTypeAllChange}
                    checked={this.state.checkServiceTypeAll}
                    className={styles.checkAll}
                  >
                    <Trans>All</Trans>
                  </Checkbox>
                </div>
                <div style={{ height: '5px' }}></div>
                <Checkbox.Group
                  value={this.state.checkedServiceTypeList}
                  onChange={this.onChangeServiceTypeCheckbox}
                  style={{ marginLeft: '4px' }}
                >
                  {viralLoad.map(serviceType => (
                    <Row gutter={8}>
                      <Checkbox value={serviceType} className={styles.cont}>
                        {serviceType}
                      </Checkbox>
                    </Row>
                  ))}
                </Checkbox.Group>
              </Col>
            </BorderCollapse>
          </Row>

          <Row style={{ marginTop: '5px' }}>
            <BorderCollapse
              displayName={<Trans>RAPID TEST</Trans>}
              defaultActiveKey={['1']}
            >
              <Col
                span={8}
                style={{
                  border: '1px solid #c9c9c9',
                  padding: '5px 5px 5px 5px',
                }}
              >
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox
                    onChange={this.onCheckServiceTypeAllChange}
                    checked={this.state.checkServiceTypeAll}
                    className={styles.checkAll}
                  >
                    <Trans>All</Trans>
                  </Checkbox>
                </div>
                <div style={{ height: '5px' }}></div>
                <Checkbox.Group
                  value={this.state.checkedServiceTypeList}
                  onChange={this.onChangeServiceTypeCheckbox}
                  style={{ marginLeft: '4px' }}
                >
                  {rapidTest.map(serviceType => (
                    <Row gutter={8}>
                      <Checkbox value={serviceType} className={styles.cont}>
                        {serviceType}
                      </Checkbox>
                    </Row>
                  ))}
                </Checkbox.Group>
              </Col>
            </BorderCollapse>
          </Row>

          <Row style={{ marginTop: '5px' }}>
            <BorderCollapse
              displayName={<Trans>GENOTYPE</Trans>}
              defaultActiveKey={['1']}
            >
              <Col
                span={8}
                style={{
                  border: '1px solid #c9c9c9',
                  padding: '5px 5px 5px 5px',
                }}
              >
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox
                    onChange={this.onCheckServiceTypeAllChange}
                    checked={this.state.checkServiceTypeAll}
                    className={styles.checkAll}
                  >
                    <Trans>All</Trans>
                  </Checkbox>
                </div>
                <div style={{ height: '5px' }}></div>
                <Checkbox.Group
                  value={this.state.checkedServiceTypeList}
                  onChange={this.onChangeServiceTypeCheckbox}
                  style={{ marginLeft: '4px' }}
                >
                  {genoType.map(serviceType => (
                    <Row gutter={8}>
                      <Checkbox value={serviceType} className={styles.cont}>
                        {serviceType}
                      </Checkbox>
                    </Row>
                  ))}
                </Checkbox.Group>
              </Col>
            </BorderCollapse>
          </Row>

          <Row style={{ marginTop: '5px' }}>
            <BorderCollapse
              displayName={<Trans>OTHERS</Trans>}
              defaultActiveKey={['1']}
            >
              <Col
                span={8}
                style={{
                  border: '1px solid #c9c9c9',
                  padding: '5px 5px 5px 5px',
                }}
              >
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox
                    onChange={this.onCheckServiceTypeAllChange}
                    checked={this.state.checkServiceTypeAll}
                    className={styles.checkAll}
                  >
                    <Trans>All</Trans>
                  </Checkbox>
                </div>
                <div style={{ height: '5px' }}></div>
                <Checkbox.Group
                  value={this.state.checkedServiceTypeList}
                  onChange={this.onChangeServiceTypeCheckbox}
                  style={{ marginLeft: '4px' }}
                >
                  {others.map(serviceType => (
                    <Row gutter={8}>
                      <Checkbox value={serviceType} className={styles.cont}>
                        {serviceType}
                      </Checkbox>
                    </Row>
                  ))}
                </Checkbox.Group>
              </Col>
            </BorderCollapse>
          </Row>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
          }}
        >
          <Button
            className={styles.cancelButton}
            onClick={this.handleCancelFilter}
          >
            <Trans>CancelSelectedFilter</Trans>
          </Button>

          <Button
            type="primary"
            className={styles.searchButton}
            onClick={this.handleSearchFilter}
          >
            <Trans>CalculateResult</Trans>
          </Button>
        </div>
      </div>
    )
  }
}

TestType.propTypes = {
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default TestType
