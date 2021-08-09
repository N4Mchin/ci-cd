import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Checkbox, Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import CollapseBox from '../CollapseBox'

const Researches = [
  {
    SarsCov: {
      value: 'Sars_Cov2',
      display: 'Sars Cov2',
    },
  },
  //  'DLivr study',
  // 'Non hodgkin lymphoma',
  //'IL28-B',
  // 'Vertical Transmission',
  // 'Rapid Test specific',
  // 'Hepatitis D sexual trans',
]

const { Text } = Typography

@withI18n()
@connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))
class Research extends PureComponent {
  handleResearch = values => {
    this.props.dispatch({
      type: 'reception_patientProfile/payment',
      payload: {
        research: values,
      },
    })
  }
  render() {
    return (
      <CollapseBox
        key="ResearchCollapse"
        defaultActiveKey={0}
        Title={
          <Trans>
            <Text strong>Research</Text>
          </Trans>
        }
        style={{ background: 'transparent' }}
      >
        <Checkbox.Group
          key="ResearchCheckBoxGroup"
          onChange={this.handleResearch}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Researches.map(item => (
              <div style={{ margin: '0 10px' }}>
                <Checkbox
                  key={`ResearchCheckbox_${item.SarsCov.value}`}
                  value={item.SarsCov.value}
                >
                  {item.SarsCov.display}
                </Checkbox>
              </div>
            ))}
          </div>
        </Checkbox.Group>
      </CollapseBox>
    )
  }
}

export default Research
