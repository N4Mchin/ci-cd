import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import { ValuesetIdentifierType } from '../const'
import { EditAndDeleteButtonGroup } from 'components'
import IdentifierForm from './IdentifierForm'
import Modal from './Modal'

@withI18n()
class Identifier extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      selectedItem: {},
      selectedIndex: -1,
    }

    this.valueAdd = this.valueAdd.bind(this)
    this.valueEdit = this.valueEdit.bind(this)
    this.valueDelete = this.valueDelete.bind(this)

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  valueAdd(item) {
    const { value, onChange } = this.props
    const { selectedIndex } = this.state

    let newItem = {
      use: item.use,
      type: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
            code: item.type,
          },
        ],
      },
      value: item.value,
      period: item.period,
    }

    if (selectedIndex > -1) {
      value[selectedIndex] = newItem
      onChange(value)
    } else {
      const newValue = value ? [...value, newItem] : [newItem]
      onChange(newValue)
    }
    this.setState({ modalVisible: false })
  }

  valueEdit(item, index) {
    this.setState({
      modalVisible: true,
      selectedItem: item,
      selectedIndex: index,
    })
  }

  valueDelete(index) {
    const { value, onChange } = this.props
    const newValue = [...value]
    newValue.splice(Number(index), 1)

    onChange(newValue.length > 0 ? newValue : undefined)
  }

  setModalVisible(modalVisible) {
    this.setState({
      modalVisible,
      selectedItem: '',
      selectedIndex: -1,
    })
  }

  render() {
    const { value, i18n } = this.props
    const identifierList = []
    const identifierForm = []

    if (value && value.length > 0) {
      value.map((item, index) => {
        const itemKey = `Identifier.${index}`
        let itemType = ''
        ValuesetIdentifierType.map(function(value, index, array) {
          if (value.code === item.type.coding['0'].code) {
            itemType = value.display
          }
        })

        identifierList.push(
          <div key={itemKey} className={styles.itemDiv}>
            <span className={styles.itemUse}>{item.use}</span>
            <span>{itemType}: </span>
            <span className={styles.itemName}>{item.value}</span>

            <div className={styles.itemDivButton}>
              <EditAndDeleteButtonGroup
                onEdit={() => this.valueEdit(item, index)}
                onDelete={() => this.valueDelete(index)}
              />
            </div>
          </div>
        )
      })
    } else {
      identifierForm.push(
        <IdentifierForm key="keyIdentifierForm" onOk={e => this.valueAdd(e)} />
      )
    }

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="info-circle" /> {i18n.t`Identifier`}
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
          {identifierList}
          {identifierForm}

          {this.state.modalVisible && (
            <Modal
              title={i18n.t`Identifier`}
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

Identifier.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default Identifier
