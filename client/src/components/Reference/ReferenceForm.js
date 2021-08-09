import React from 'react'
import { withI18n } from '@lingui/react'
import { ValuesetResourceTypes, ValuesetServicerequestCategory } from '../const'

import { request } from 'utils/'
import api from 'api'
import { Form, Input, Button, Row, Col, Select, Checkbox } from 'antd'

const { queryReference } = api
const { Option } = Select
const { Search } = Input

const formItemLayout = {
  layout: 'horizontal',
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
}

const test = {
  'Laboratory procedure': [
    'Turgen test',
    'Serum chemistry test',
    'Blood test',
    'Achaalal',
    'Sysmex',
    'Shees',
    'Coagulogramm',
    'Endocrine',
    'Ue much',
  ],
  Imaging: ['Fibroscan', 'Visual D'],
  Counselling: ['New patient consultation', 'Follow-up consultation'],
  Education: [],
  'Surgical Procedure': [],
}

const testValueset = {
  'Turgen test': ['HBsAg', 'Anti HCV', 'Anti HDV'],
  'Serum chemistry test': [
    'TBIL',
    'DBIL',
    'TC',
    'ALP',
    'AST',
    'ALT',
    'GGT',
    'BUN',
    'CREA',
    'AMY',
  ],
  'Blood test': [
    'WBC',
    'RBC',
    'HGB',
    'HCT',
    'MCV',
    'MCH',
    'MCHC',
    'PLT',
    'ESR',
    'LYM',
    'MON',
    'EO',
    'BAS',
    'NEU',
    'PCT',
    'MPV',
    'PDWsd',
    'PDWcv',
    'PLCR',
    'PLCC',
    'RDWsd',
    'RDWcv',
  ],
  Achaalal: ['HBV', 'HCV', 'HDV'],
  Sysmex: [
    'M2BPGi',
    'HBsAg',
    'anti_HCV',
    'HBsAgQ',
    'AFP',
    'VitD',
    'anti_HBs',
    'HIVAg_Ab',
    'TSH',
    'FreeT3',
    'FreeT4',
    'TP',
    'HBeAg',
    'HBeAb',
    'HBcAb',
    'PSA',
    'CEA',
    'CA19_9',
    'CA_125',
    'HCVGr1',
    'HCVGR2',
    'Genotype',
  ],
  Shees: [
    'UBG',
    'BIL',
    'KET',
    'CRE',
    'RBC',
    'PRO',
    'MALB',
    'NIT',
    'LEU',
    'GLU',
    'SG',
    'PH',
    'VC',
    'CA',
    'AC',
    'Өнгө',
  ],
  Coagulogramm: ['PT', 'INR', 'aPTT', 'TT', 'Fibrinogen'],
  Endocrine: [
    'FreeT3',
    'TotalT3',
    'FreeT3',
    'FreeT4',
    'TotalT4',
    'TSH',
    'insulin',
  ],
  'Ue much': ['CRP', 'RF', 'anti MCV', 'ANA'],
  Fibroscan: ['Fibroscan', 'FibroMetr'],
  'Visual D': ['US', 'CT', 'uyan duran', 'MRI'],
  Practitioner: ['Bekhee', 'Tuul', 'Bold', 'Sodoo'],
}

let timeout
let currentValue

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function search() {
    const payload = {
      value: currentValue,
      type: 'PPN',
    }

    const options = {
      method: 'POST',
      url: 'http://localhost:3336/api/v1/reference',
      data: payload,
    }

    const res = request(options)
    console.log(res)
  }

  timeout = setTimeout(search, 300)
}

class SearchInput extends React.Component {
  state = {
    data: [],
    value: undefined,
  }

  handleSearch = value => {
    if (value) {
      fetch(value, data => this.setState({ data }))
    } else {
      this.setState({ data: [] })
    }
  }

  handleChange = value => {
    this.setState({ value })
  }

  render() {
    const options = this.state.data.map(d => (
      <Option key={d.value}>{d.text}</Option>
    ))
    return (
      <Select
        showSearch
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={this.props.style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    )
  }
}

@withI18n()
@Form.create()
class ReferenceForm extends React.Component {
  state = {
    testType: test[ValuesetServicerequestCategory[0].display],
    testName: test[ValuesetServicerequestCategory[0].display][0],
    indeterminate: true,
    checkAll: false,
    checkedList: [],
  }

  handleCategoryChange = value => {
    this.setState({
      testType: test[value],
      testName: test[value][0],
    })
  }

  onCodeChange = value => {
    this.setState({
      testName: value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onOk } = this.props

        //values.reference = values.type + '/' + values.identifier
        onOk(values)
      }
    })
  }

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length &&
        checkedList.length < testValueset[this.state.testName].length,
      checkAll: checkedList.length === testValueset[this.state.testName].length,
    })
  }

  onCheckAllChange = e => {
    const { setFieldsValue } = this.props.form
    const testName = this.state.testName
    // setFieldsValue({
    //   turgentest: testValueset[this.state.testName]
    // })

    this.setState({
      checkedList: e.target.checked ? testValueset[this.state.testName] : [],
      indeterminate: false,
      checkAll: e.target.checked,
    })

    setFieldsValue({
      turgentest: e.target.checked ? testValueset[this.state.testName] : [],
      serum: e.target.checked ? testValueset[this.state.testName] : [],
      bloodtest: e.target.checked ? testValueset[this.state.testName] : [],
      achaalal: e.target.checked ? testValueset[this.state.testName] : [],
      sysmex: e.target.checked ? testValueset[this.state.testName] : [],
      shees: e.target.checked ? testValueset[this.state.testName] : [],
      cougulogramm: e.target.checked ? testValueset[this.state.testName] : [],
      endocrine: e.target.checked ? testValueset[this.state.testName] : [],
      uemuch: e.target.checked ? testValueset[this.state.testName] : [],
      fibroscan: e.target.checked ? testValueset[this.state.testName] : [],
      visuald: e.target.checked ? testValueset[this.state.testName] : [],
    })
  }

  unCheckAll = e => {
    // const {getFieldsValue, setFieldsValue} = this.props.form
    // setFieldsValue({
    //   turgentest: testValueset[this.state.testName],
    //   serum: testValueset[this.state.testName],
    //   bloodtest: testValueset[this.state.testName],
    //   achaalal: testValueset[this.state.testName],
    //   sysmex: testValueset[this.state.testName],
    //   shees: testValueset[this.state.testName],
    //   cougulogramm: testValueset[this.state.testName],
    //   endocrine: testValueset[this.state.testName],
    //   uemuch: testValueset[this.state.testName],
    //   fibroscan: testValueset[this.state.testName],
    //   visuald: testValueset[this.state.testName],
    // })

    let resetArray = new Array(testValueset[this.state.testName].length).fill(
      false
    )
    this.setState({
      checkedList: resetArray,
    })
  }

  render() {
    const { form, i18n, element } = this.props
    const { getFieldDecorator } = form

    const { testType } = this.state

    switch (element) {
      case 'subjectServiceRequest':
        return (
          <Form
            onSubmit={this.handleSubmit}
            key="keyReferenceForm"
            {...formItemLayout}
          >
            <Row gutter={8}>
              <Col span={20}>
                <Form.Item hasFeedback>
                  {getFieldDecorator('identifier', {
                    rules: [
                      {
                        required: true,
                        message: i18n.t`WarningInputIdentifier`,
                      },
                    ],
                  })(<SearchInput placeholder="Identifier" />)}
                </Form.Item>
              </Col>
              <Col span={4}>
                <Button
                  icon="search"
                  htmlType="submit"
                  style={{ marginTop: '4px' }}
                />
              </Col>
            </Row>
          </Form>
        )

      case 'basedOnServiceRequest':
        return (
          <Form
            onSubmit={this.handleSubmit}
            key="keyReferenceForm"
            {...formItemLayout}
          >
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label={i18n.t`Type`} hasFeedback>
                  {getFieldDecorator(
                    'type',
                    {}
                  )(
                    <Select
                      style={{ width: '100%' }}
                      placeholder={i18n.t`Type`}
                    >
                      {ValuesetResourceTypes.map(
                        v =>
                          (v.code === 'CarePlan' ||
                            v.code === 'ServiceRequest' ||
                            v.code === 'MedicationRequest') && (
                            <Option key={v.code} value={v.code}>
                              {v.display}
                            </Option>
                          )
                      )}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label={i18n.t`Display`} hasFeedback>
                  {getFieldDecorator(
                    'display',
                    {}
                  )(
                    <Select
                      style={{ width: '100%' }}
                      placeholder={i18n.t`Display`}
                    ></Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Button
                  icon="plus-circle"
                  htmlType="submit"
                  style={{
                    float: 'right',
                    marginTop: '16px',
                    bottom: '4px',
                  }}
                >
                  {i18n.t`Add`}
                </Button>
              </Col>
            </Row>
          </Form>
        )

      case 'codeServiceRequest':
        return (
          <Form
            onSubmit={this.handleSubmit}
            key="keyReferenceForm"
            {...formItemLayout}
          >
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label={i18n.t`Type`} hasFeedback>
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: i18n.t`WarningInputType`,
                      },
                    ],
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder={i18n.t`Type`}
                      onChange={this.handleCategoryChange}
                    >
                      {ValuesetServicerequestCategory.map(v => (
                        <Option key={v.display}>{v.display}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label={i18n.t`Code`} hasFeedback>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: i18n.t`WarningInputCode`,
                      },
                    ],
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder={i18n.t`Code`}
                      value={this.state.testName}
                      onChange={this.onCodeChange}
                    >
                      {testType.map(test => (
                        <Option key={test} value={test}>
                          {test}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label={i18n.t`Test`} hasFeedback>
                  <div>
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                      <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                      >
                        Check all
                      </Checkbox>
                    </div>

                    {this.state.testName === 'Turgen test' &&
                      getFieldDecorator(
                        'turgentest',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Turgen test']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Serum chemistry test' &&
                      getFieldDecorator(
                        'serum',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Serum chemistry test']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Blood test' &&
                      getFieldDecorator(
                        'bloodtest',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Blood test']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Achaalal' &&
                      getFieldDecorator(
                        'achaalal',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Achaalal']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Sysmex' &&
                      getFieldDecorator(
                        'sysmex',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Sysmex']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Shees' &&
                      getFieldDecorator(
                        'shees',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Shees']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Coagulogramm' &&
                      getFieldDecorator(
                        'cougulogramm',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Coagulogramm']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Endocrine' &&
                      getFieldDecorator(
                        'endocrine',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Endocrine']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Ue much' &&
                      getFieldDecorator(
                        'uemuch',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Ue much']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Fibroscan' &&
                      getFieldDecorator(
                        'fibroscan',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Fibroscan']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                    {this.state.testName === 'Visual D' &&
                      getFieldDecorator(
                        'visuald',
                        {}
                      )(
                        <Checkbox.Group
                          options={testValueset['Visual D']}
                          value={this.state.checkedList}
                          onChange={this.onChange}
                        />
                      )}
                  </div>
                </Form.Item>

                <Button
                  icon="plus-circle"
                  htmlType="submit"
                  style={{
                    float: 'right',
                    marginTop: '16px',
                    bottom: '4px',
                  }}
                  onClick={this.unCheckAll}
                >
                  {' '}
                  {i18n.t`Add`}
                </Button>
              </Col>
            </Row>
          </Form>
        )

      case 'encounterServiceRequest':
        return (
          <Form
            onSubmit={this.handleSubmit}
            key="keyReferenceForm"
            {...formItemLayout}
          >
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label={i18n.t`Display`} hasFeedback>
                  {getFieldDecorator('display')(
                    <Input placeholder="Display" />
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Button
                  icon="plus-circle"
                  htmlType="submit"
                  style={{
                    float: 'right',
                    marginTop: '16px',
                    bottom: '4px',
                  }}
                >
                  {' '}
                  {i18n.t`Add`}
                </Button>
              </Col>
            </Row>
          </Form>
        )

      case 'performerServiceRequest':
        return (
          <Form
            onSubmit={this.handleSubmit}
            key="keyReferenceForm"
            {...formItemLayout}
          >
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label={i18n.t`Display`} hasFeedback>
                  {getFieldDecorator(
                    'display',
                    {}
                  )(
                    <Select
                      style={{ width: '100%' }}
                      placeholder={i18n.t`Display`}
                    ></Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Button
                  icon="plus-circle"
                  htmlType="submit"
                  style={{
                    float: 'right',
                    marginTop: '16px',
                    bottom: '4px',
                  }}
                >
                  {' '}
                  {i18n.t`Add`}
                </Button>
              </Col>
            </Row>
          </Form>
        )

      default:
        return (
          <Form
            onSubmit={this.handleSubmit}
            key="keyReferenceForm"
            {...formItemLayout}
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label={i18n.t`Type`} hasFeedback>
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: i18n.t`WarningInputType`,
                      },
                    ],
                  })(
                    <Select
                      style={{ width: '100%' }}
                      placeholder={i18n.t`Type`}
                    >
                      {ValuesetResourceTypes.map(v => (
                        <Option key={v.code} value={v.code}>
                          {v.display}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label={i18n.t`Identifier`} hasFeedback>
                  {getFieldDecorator('identifier', {
                    rules: [
                      {
                        required: true,
                        message: i18n.t`WarningInputIdentifier`,
                      },
                    ],
                  })(
                    <Search
                      placeholder="Identifier"
                      onSearch={value => console.log(value)}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label={i18n.t`Display`} hasFeedback>
                  {getFieldDecorator('display')(
                    <Input placeholder="Display" />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label={i18n.t`Reference`} hasFeedback>
                  {getFieldDecorator('reference')(
                    <Input
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="[base]/[type]/[id]"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <Button
                  icon="plus-circle"
                  htmlType="submit"
                  style={{
                    float: 'right',
                    marginTop: '16px',
                    bottom: '4px',
                  }}
                >
                  {' '}
                  {i18n.t`Add`}
                </Button>
              </Col>
            </Row>
          </Form>
        )
    }
  }
}

export default ReferenceForm
