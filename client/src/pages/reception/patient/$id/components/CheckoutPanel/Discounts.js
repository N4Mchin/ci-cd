import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Typography, Checkbox } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './CheckoutPanel.less'
import CollapseBox from '../CollapseBox'

const { Text } = Typography

const Staffs = [
  'Ажилтны гэр бүл 30%',
  'Элэгний асуудалтай ажилтан',
  'Урьдчилан сэргийлэх үзлэг',
]

const SpecialDiscounts = ['Лаборатори', 'Багаж', 'Эмчийн үзлэг']

const Customers = ['Байнгын', 'Хяналтын', 'Бэлгийн карт']

@withI18n()
@connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))
class Discounts extends PureComponent {
  state = {
    staffsDiscount: [],
    specialDiscount: [],
    customersDiscount: [],
  }

  handleStaffsDiscount = values => {
    this.props.dispatch({
      type: 'reception_patientProfile/payment',
      payload: {
        staffsDiscount: values,
      },
    })
  }

  handleSpecialDiscount = values => {
    this.props.dispatch({
      type: 'reception_patientProfile/payment',
      payload: {
        specialDiscount: values,
      },
    })
  }

  handleCustomersDiscount = values => {
    this.props.dispatch({
      type: 'reception_patientProfile/payment',
      payload: {
        customersDiscount: values,
      },
    })
  }

  render() {
    return (
      <CollapseBox
        key="DiscountsCollapse"
        defaultActiveKey={0}
        Title={
          <Trans>
            <Text strong>Discounts</Text>
          </Trans>
        }
        style={{ background: 'transparent' }}
        noMargin={true}
        className={styles.noPaddingCollapse}
      >
        <CollapseBox
          key="DiscountsCollapseStaffs"
          defaultActiveKey={0}
          Title={
            <Trans>
              <Text strong>Staffs</Text>
            </Trans>
          }
          style={{ background: 'transparent' }}
          bordered={false}
        >
          <Checkbox.Group
            key="DiscountsCollapseStaffsCheckboxGroup"
            defaultActiveKey={0}
            onChange={this.handleStaffsDiscount}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {Staffs.map((item, index) => (
                <div
                  style={{ margin: '0 10px 0 30px' }}
                  key={`Discounts_${index}`}
                >
                  <Checkbox
                    key={`DiscountsCollapseStaffsCheckbox_${item}`}
                    value={item}
                  >
                    {item}
                  </Checkbox>
                </div>
              ))}
            </div>
          </Checkbox.Group>
        </CollapseBox>
        <CollapseBox
          key="DiscountsCollapseSpecialDiscounts"
          Title={
            <Trans>
              <Text strong>Special Discounts</Text>
            </Trans>
          }
          style={{ background: 'transparent' }}
          bordered={false}
        >
          <Checkbox.Group
            key="DiscountsCollapseSpecialDiscountsCheckboxGroup"
            onChange={this.handleSpecialDiscount}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SpecialDiscounts.map(item => (
                <div style={{ margin: '0 10px 0 30px' }}>
                  <Checkbox
                    key={`DiscountsCollapseSpecialDiscountsCheckbox_${item}`}
                    value={item}
                  >
                    {item}
                  </Checkbox>
                </div>
              ))}
            </div>
          </Checkbox.Group>
        </CollapseBox>
        <CollapseBox
          key="DiscountsCollapseCustomers"
          Title={
            <Trans>
              <Text strong>Customers</Text>
            </Trans>
          }
          style={{ background: 'transparent' }}
          bordered={false}
        >
          <Checkbox.Group
            key="DiscountsCollapseCustomersCheckboxGroup"
            onChange={this.handleCustomersDiscount}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {Customers.map(item => (
                <div style={{ margin: '0 10px 0 30px' }}>
                  <Checkbox
                    key={`DiscountsCollapseCustomersCheckbox_${item}`}
                    value={item}
                  >
                    {item}
                  </Checkbox>
                </div>
              ))}
            </div>
          </Checkbox.Group>
        </CollapseBox>
      </CollapseBox>
    )
  }
}

export default Discounts
