import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import Modal from './Modal'
import AddressForm from './AddressForm'
import { EditAndDeleteButtonGroup } from 'components'

@withI18n()
class Address extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      selectedItem: {},
      selectedIndex: -1,
    }

    this.setModalVisible = this.setModalVisible.bind(this)
    this.valueAdd = this.valueAdd.bind(this)
    this.valueEdit = this.valueEdit.bind(this)
    this.valueDelete = this.valueDelete.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  valueAdd(e) {
    const { value, onChange } = this.props
    const { selectedIndex } = this.state

    let output = {
      use: e.use,
      type: e.type,
      country: e.location.country,
      state: e.location.state,
      district: e.location.district,
      postalCode: e.postalCode,
      line: e.line,
      period: e.period,
    }

    if (selectedIndex > -1) {
      value[selectedIndex] = output
      onChange(value)
    } else {
      const newValue = value ? [...value, output] : [output]
      onChange(newValue)
    }
    this.setState({ modalVisible: false })
  }

  valueEdit(v, i) {
    this.setState({
      modalVisible: true,
      selectedItem: v,
      selectedIndex: i,
    })
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

  toggle() {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const { value, disabled, onChange, form, i18n, ...others } = this.props

    const addressForm = []
    const addressList = []

    if (value === undefined || value.length === 0) {
      addressForm.push(
        <AddressForm key="keyAddressForm" onOk={e => this.valueAdd(e)} />
      )
    } else {
      value.map((v, i) => {
        let countryString = `${v.country} `
        let stateString = `${v.state} `
        let districtString = `${v.district} `
        let typeString = `${v.type} `

        addressList.push(
          <div key={i} className={styles.itemDiv}>
            {typeString}
            <span className={styles.itemName}>{countryString}</span>
            {stateString}
            {districtString}
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
          <Icon type="home" />
          &nbsp;
          {i18n.t`Address`}
        </div>
        <div>
          {addressList.length !== 0 && (
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
          {addressList}
          {addressForm}

          {this.state.modalVisible && (
            <Modal
              title={i18n.t`Address`}
              visible={this.state.modalVisible}
              selectedItem={this.state.selectedItem}
              onCancel={() => this.setModalVisible(false)}
              onOk={e => {
                this.valueAdd(e)
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

Address.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default Address
