import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Checkbox, Typography } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import CollapseBox from '../CollapseBox'
import styles from './ServiceSets.less'

const { Text } = Typography

const serviceList = [
  {
    value: 'С вирусийн эмчилгээний багц',
    name: 'С вирусийн эмчилгээний багц',
  },
  {
    value: 'В вирусийн эмчилгээний багц',
    name: 'В вирусийн эмчилгээний багц',
  },
  {
    value: 'Д вирусийн эмчилгээний багц',
    name: 'Д вирусийн эмчилгээний багц',
  },
  {
    value: 'В+Д вирусийн эмчилгээний багц',
    name: 'В+Д вирусийн эмчилгээний багц',
  },
  {
    value: 'Албан байгууллагын багц',
    name: 'Албан байгууллагын багц',
  },
  {
    value: 'Нэг жилийн эмчийн хяналтын багц',
    name: 'Нэг жилийн эмчийн хяналтын багц',
  },
  {
    value: 'Урьдчилан сэргийлэх багц',
    name: 'Урьдчилан сэргийлэх багц',
  },
  {
    value: 'Хүүхдийн багц',
    name: 'Хүүхдийн багц',
  },
]

function title() {
  return (
    <Trans>
      <Text strong className={styles.title}>
        Service{' '}
      </Text>
      <Text className={styles.title}>Sets</Text>
    </Trans>
  )
}

@withI18n()
@connect(({ reception_patientProfile, loading }) => ({
  reception_patientProfile,
  loading,
}))
class ServiceSets extends PureComponent {
  state = {
    selectedServiceSets: [],
  }

  onChange = values => {
    this.props.onChange({
      selectedServiceSets: values,
    })

    this.props.dispatch({
      type: 'reception_patientProfile/serviceSetsOrder',
      payload: {
        SelectedServiceSets: values,
      },
    })
  }

  render() {
    const { ...others } = this.props
    return (
      <div className={styles.serviceSets}>
        <CollapseBox Title={title()} {...others}>
          <Checkbox.Group
            value={this.state.selectedServiceSets}
            onChange={this.onChange}
            disabled
          >
            <div className={styles.serviceSetsContainer}>
              {serviceList.map((service, index) => (
                <div
                  className={styles.serviceSetsItem}
                  key={`serviceSets_${index}`}
                >
                  <Checkbox value={service.value}>
                    <span style={{ fontSize: '10px' }}>{service.name}</span>
                  </Checkbox>
                </div>
              ))}
            </div>
          </Checkbox.Group>
        </CollapseBox>
      </div>
    )
  }
}

export default ServiceSets
