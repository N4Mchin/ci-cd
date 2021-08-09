import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Row, Col, Checkbox } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './CheckoutPanel.less'

@withI18n()
@connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))
class Tests extends PureComponent {
  state = {
    selectedTestItems: [],
  }

  /**
   * Доорх функц нь сонгосон шинжилгээг цуцлах үед дуудагдана
   * сонгосон шинжилгээг Redux дахь reception_patientProfile дахь SelectedTests ийн утгыг уншиж,
   * цуцлагдаагүй шинжилгээнүүдийг data объектэд хадгалаад client/src/pages/patient/$id/model.js ийн labTestOrder
   * функцруу дамжуулснаар Redux ын state ийг шинэчилнэ
   */

  // unchecking event handler
  handleSelectedTestItems = event => {
    const selectedSubTestItem = event.target.value

    const { SelectedTests } = this.props.reception_patientProfile
    const data = {}

    Object.keys(SelectedTests).forEach(testKey => {
      if (!data[testKey]) {
        const { include, ...others } = SelectedTests[testKey]
        data[testKey] = {
          ...others,
          include: {},
        }
      }

      Object.keys(SelectedTests[testKey]['include']).forEach(subTestKey => {
        const subTestInclude =
          SelectedTests[testKey]['include'][subTestKey]['include']

        if (subTestInclude) {
          const newInclude = {}

          Object.keys(subTestInclude).forEach(subTestItemKey => {
            if (
              subTestInclude[subTestItemKey].display !== selectedSubTestItem
            ) {
              Object.assign(newInclude, {
                [subTestItemKey]: subTestInclude[subTestItemKey],
              })
            }
          })
          const { include, ...others } = SelectedTests[testKey]['include'][
            subTestKey
          ]
          data[testKey]['include'][subTestKey] = {
            ...others,
            include: newInclude,
          }
        }
      })
    })

    this.props.dispatch({
      type: 'reception_patientProfile/labTestOrder',
      payload: {
        SelectedTests: data,
      },
    })
  }

  static getDerivedStateFromProps(props, state) {
    const { SelectedTestItems } = props.reception_patientProfile

    let labTestCost = 0

    if (SelectedTestItems.length !== 0) {
      labTestCost = SelectedTestItems.map(item => item.cost).reduce(
        (a, b) => parseFloat(a) + parseFloat(b),
        0
      )
    }

    if (
      JSON.stringify(SelectedTestItems) !==
      JSON.stringify(state.selectedTestItems)
    ) {
      return {
        labTestCost: labTestCost,
        selectedTestItems: SelectedTestItems,
      }
    }

    return null
  }

  render() {
    const { selectedTestItems = [] } = this.state

    return (
      <React.Fragment key="SelectedTestsFragment">
        {selectedTestItems.map(item => (
          <div className={styles.selectedTestItems}>
            <Row type="flex" justify="space-between" align="middle">
              <Col style={{ align: 'center' }}>
                <Checkbox
                  style={{ margin: '0' }}
                  value={item.display}
                  checked={true}
                  onChange={this.handleSelectedTestItems}
                >
                  {item.display}
                </Checkbox>
              </Col>
              <Col style={{ align: 'center' }}>
                <span>{item.cost}</span>
              </Col>
            </Row>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export default Tests
