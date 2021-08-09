import React, { PureComponent } from 'react'
import { Checkbox, Row, Col } from 'antd'
import { withI18n } from '@lingui/react'
import styles from './LabTestOrder.less'

@withI18n()
class LabTestItem extends PureComponent {
  state = {
    checkedList: [
      'biochemistry',
      'hematology',
      'rapidTests',
      'immunology',
      'esr',
      'viralLoadTests',
      'genotype',
      'coagulation',
      'urinalysis',
    ],
    indeterminate: false,
    checkAll: true,
    testList: [
      {
        name: 'biochemistry',
        display: 'Biochemistry',
      },
      {
        name: 'hematology',
        display: 'Hematology',
      },
      {
        name: 'rapidTests',
        display: 'Rapid Tests',
      },
      {
        name: 'immunology',
        display: 'Immunoloty',
      },
      {
        name: 'esr',
        display: 'ESR',
      },
      {
        name: 'viralLoadTests',
        display: 'Viral Load Tests',
      },
      {
        name: 'genotype',
        display: 'Genotype',
      },
      {
        name: 'coagulation',
        display: 'Coagulation',
      },
      {
        name: 'urinalysis',
        display: 'Urinalysis',
      },
    ],
  }

  onChange = checkedList => {
    const { testList } = this.state
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < testList.length,
      checkAll: checkedList.length === testList.length,
    })

    this.props.onChange(checkedList)
  }

  onCheckAllChange = event => {
    const { testList } = this.state
    const checkedList = event.target.checked
      ? testList.map(testItem => testItem.name)
      : []

    this.setState({
      checkedList: checkedList,
      indeterminate: false,
      checkAll: event.target.checked,
    })

    this.props.onChange(checkedList)
  }

  checkAll = () => {
    const { i18n } = this.props
    return (
      <>
        <Col span={24}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            <span style={{ fontSize: '10px' }}>{i18n.t`CheckAll`}</span>
          </Checkbox>
        </Col>

        <Col span={24}>
          <div className={styles.seperator} />
        </Col>
      </>
    )
  }

  render() {
    const { testList = [] } = this.state

    return (
      <div
        style={{
          padding: '16px',
          margin: '16px',
          border: '1px solid #c9c9c9',
          borderRadius: '4px',
        }}
      >
        <Row type="flex">
          {testList.length > 1 && this.checkAll()}

          <Checkbox.Group
            value={this.state.checkedList}
            onChange={this.onChange}
          >
            {testList.map(testItem => (
              <Col span={24}>
                <div style={{ float: 'left' }}>
                  <Checkbox value={testItem.name}>
                    <span style={{ fontSize: '10px' }}>{testItem.display}</span>
                  </Checkbox>
                </div>
              </Col>
            ))}
          </Checkbox.Group>
        </Row>
      </div>
    )
  }
}

export default LabTestItem
