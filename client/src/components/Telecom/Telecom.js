import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import { EditAndDeleteButtonGroup } from 'components'
import Modal from './Modal'
import TelecomForm from './TelecomForm'
import { i18n } from '@lingui/core'

@withI18n()
class Telecom extends PureComponent {
  constructor(props) {
    super(props)
    this.valueAdd = this.valueAdd.bind(this)
    this.valueDelete = this.valueDelete.bind(this)
    this.valueEdit = this.valueEdit.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)

    this.state = {
      modalVisible: false,
      selectedItem: {},
      selectedIndex: -1,
      system: null,
      value: null,
      use: null,
      rank: null,
      period: null,
      data: [],
    }
  }

  valueAdd(e) {
    const { value, onChange } = this.props
    const { selectedIndex } = this.state
    if (selectedIndex > -1) {
      value[selectedIndex] = e
      onChange(value)
    } else {
      const newValue = value ? [...value, e] : [e]
      onChange(newValue)
    }
    this.setState({ modalVisible: false })
  }

  valueDelete(index) {
    const { value, onChange } = this.props
    const newValue = [...value]
    newValue.splice(Number(index), 1)

    onChange(newValue.length > 0 ? newValue : undefined)
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible, selectedItem: '', selectedIndex: -1 })
  }

  valueEdit(v, i) {
    this.setState({
      modalVisible: true,
      selectedItem: v,
      selectedIndex: i,
    })
  }

  render() {
    const { i18n, value } = this.props

    const telecomForm = []
    const telecomList = []
    if (value === undefined || value.length === 0) {
      telecomForm.push(
        <TelecomForm key="keyTelecomForm" onOk={e => this.valueAdd(e)} />
      )
    } else {
      value.map((v, i) => {
        return telecomList.push(
          <div key={i} className={styles.itemDiv}>
            {i18n.t`TelecomSystem` + ': '}
            <span className={styles.itemName}>
              {v.system && `${v.system} `}
            </span>
            {' | '}

            {i18n.t`TelecomRank` + ': '}
            <span className={styles.itemName}>{v.rank && `${v.rank} `}</span>
            {' | '}

            {i18n.t`TelecomValue` + ': '}
            <span className={styles.itemName}>{v.value && `${v.value} `}</span>
            {' | '}

            {v.period && (
              <>
                {i18n.t`PeriodStart` + ': '}
                <span className={styles.itemName}>
                  {v.period.start && `${v.period.start} `}
                </span>
                {' | '}

                {i18n.t`PeriodEnd` + ': '}
                <span className={styles.itemName}>
                  {v.period.end && `${v.period.end} `}
                </span>
              </>
            )}

            <span className={styles.itemUse}>{v.use}</span>

            <div className={styles.itemDivButton}>
              <EditAndDeleteButtonGroup
                onEdit={() => this.valueEdit(v, i)}
                onDelete={() => this.valueDelete(i)}
              />
            </div>
          </div>
        )
      })
    }

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="phone" /> {i18n.t`Telecom`}
        </div>
        <div>
          {value && value.length > 0 && (
            <div className={styles.divButton}>
              <Button
                icon="plus"
                type="dashed"
                size="small"
                onClick={() => this.setModalVisible(true)}
              />
            </div>
          )}
        </div>
        <div className={styles.cont}>
          {telecomList}

          {telecomForm}

          {this.state.modalVisible && (
            <Modal
              title={i18n.t`Telecom`}
              visible={this.state.modalVisible}
              selectedItem={this.state.selectedItem}
              onCancel={() => this.setModalVisible(false)}
              onOk={e => this.valueAdd(e)}
            />
          )}
        </div>
      </div>
    )
  }
}

Telecom.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default Telecom
