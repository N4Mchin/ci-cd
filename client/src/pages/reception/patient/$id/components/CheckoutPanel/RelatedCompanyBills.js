import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Checkbox, Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import CollapseBox from '../CollapseBox'

const RelatedCompanies = [
  'Гэгээн булаг',
  'Нинж ачлал',
  'Гал харнууд',
  'Сутайн гурван хулд',
  'Оном сан',
  'Оном сургууль',
  'Добу технологи',
]

const { Text } = Typography

@withI18n()
@connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))
class RelatedCompanyBills extends PureComponent {
  handleRelatedCompanyBills = values => {
    this.props.dispatch({
      type: 'reception_patientProfile/payment',
      payload: {
        relatedCompanyBills: values,
      },
    })
  }
  render() {
    return (
      <CollapseBox
        defaultActiveKey={0}
        key="RelatedCompanyBillsCollapse"
        Title={
          <Trans>
            <Text strong>Related Company Bills</Text>
          </Trans>
        }
        style={{ background: 'transparent' }}
      >
        <Checkbox.Group
          key="RelatedCompanyBillsCheckboxGroup"
          onChange={this.handleRelatedCompanyBills}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {RelatedCompanies.map(item => (
              <div style={{ margin: '0 10px' }}>
                <Checkbox
                  value={item}
                  key={`RelatedCompanyBillsCheckbox_${item}`}
                >
                  {item}
                </Checkbox>
              </div>
            ))}
          </div>
        </Checkbox.Group>
      </CollapseBox>
    )
  }
}

export default RelatedCompanyBills
