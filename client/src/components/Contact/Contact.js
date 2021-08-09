import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Form, Descriptions } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import Modal from './Modal'
import styles from '../styles.less'
import { EditAndDeleteButtonGroup } from 'components'
import { ValuesetRelationship } from '../const'
import { Relationship } from '..'

const ButtonGroup = Button.Group

@withI18n()
@Form.create()
class Contact extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      selectedIndex: -1,
      selectedItem: {},
    }

    this.setModalVisible = this.setModalVisible.bind(this)
  }

  valueAdd(contactItem) {
    const { value, onChange } = this.props
    const { selectedIndex } = this.state

    if (selectedIndex > -1) {
      value[selectedIndex] = contactItem
      onChange(value)
    } else {
      const newValue = value ? [...value, contactItem] : [contactItem]
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

  valueDelete(e, index) {
    const { value, onChange } = this.props
    const newValue = [...value]
    newValue.splice(Number(index), 1)

    onChange(newValue.length > 0 ? newValue : undefined)
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible, selectedItem: '', selectedIndex: -1 })
  }

  render() {
    const { value, disabled, onChange, i18n, ...others } = this.props

    const contactList = []

    if (value && value.length > 0) {
      value.map((v, i) => {
        const relationshipList = []
        v.relationship.forEach(element => {
          if (element === undefined) return

          element.coding.forEach(codingElement => {
            ValuesetRelationship.forEach(RelationshipElement => {
              if (codingElement.code === RelationshipElement.code) {
                relationshipList.push(RelationshipElement.display)
              }
            })
          })
        })

        const relationshipStr = relationshipList.join(' ')

        const nameStr =
          [
            v.name.use,
            v.name.type,
            v.name.prefix,
            v.name.family,
            v.name.given.join(' '),
            v.name.suffix,
          ].join(' ') +
          ' ' +
          (v.name.period && [v.name.period.start, v.name.period.end].join(' '))

        const telecomList = []

        if (v.telecom) {
          v.telecom.map((value, index, array) => {
            const str = [value.use, value.system, value.value, value.rank].join(
              ' '
            )
            telecomList.push(str)
          })
        }

        const addressStr = [
          v.address.use,
          v.address.type,
          v.address.country,
          v.address.state,
          v.address.district,
          v.address.postalCode,
          v.address.line,
        ].join(' ')

        const gender = v.gender
        const periodStr = v.period && [v.period.start, v.period.end].join(' ')

        contactList.push(
          <div key={`keyContact.${i}`} className={styles.itemDiv}>
            <Descriptions title={nameStr} bordered>
              <Descriptions.Item label={i18n.t`Relationship`}>
                {relationshipStr}
              </Descriptions.Item>
              <Descriptions.Item label={i18n.t`Gender`}>
                {gender}
              </Descriptions.Item>
              <Descriptions.Item label={i18n.t`Address`}>
                {addressStr}
              </Descriptions.Item>
              <Descriptions.Item label={i18n.t`Telecom`}>
                {telecomList.join(' ')}
              </Descriptions.Item>
              <Descriptions.Item label={i18n.t`Period`}>
                {periodStr}
              </Descriptions.Item>
            </Descriptions>
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
          <Icon type="contacts" />
          &nbsp;
          {i18n.t`Contact`}
        </div>

        <div>
          <div className={styles.divButton}>
            <Button
              icon="plus"
              type="dashed"
              size="small"
              onClick={() => this.setModalVisible(true)}
            />
          </div>
        </div>

        <div className={styles.cont}>
          {contactList}
          {this.state.modalVisible && (
            <Modal
              title={i18n.t`Contact`}
              width={1000}
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

Contact.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default Contact
