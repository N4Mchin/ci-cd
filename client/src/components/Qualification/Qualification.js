import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Button } from 'antd'
import { withI18n } from '@lingui/react'
import { EditAndDeleteButtonGroup } from 'components'
import { ValuesetIdentifierType } from '../const'
import styles from '../styles.less'
import Modal from './Modal'

@withI18n()
class Qualification extends PureComponent {
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

  presentIdentifier(identifier) {
    const { i18n } = this.props
    const identifiers = []
    identifier.forEach(item => {
      const typeCode =
        item.type &&
        item.type.coding &&
        item.type.coding['0'] &&
        `${item.type.coding['0'].code}`
      let type = ValuesetIdentifierType.forEach(IdentifierType => {
        if (IdentifierType.code === typeCode) {
          type = IdentifierType.display
          return
        }
      })

      identifiers.push(
        <>
          {i18n.t`Qualificationdentifier` + ': '}
          <span>
            {item.use && `${item.use} `}
            {type && `${type}`}
            {item.value && `${item.value} `}
            {item.period && (
              <>
                {`${i18n.t`Period`} `}
                {item.period.start && `start: ${item.period.start} `}
                {item.period.end && `end: ${item.period.end} `}
              </>
            )}
          </span>
          {' | '}
        </>
      )
    })
    return identifiers
  }

  render() {
    const { value, disabled, form, i18n, ...others } = this.props

    const qualificationList = []

    if (value && value.length > 0) {
      value.map((v, i) => {
        qualificationList.push(
          <div key={i} className={styles.itemDiv}>
            {v.identifier && this.presentIdentifier(v.identifier)}

            {i18n.t`QualificationCode` + ': '}
            <span className={styles.itemName}>{v.code && `${v.code} `}</span>
            {<br></br>}

            {v.period && v.period.start && (
              <>
                {i18n.t`PeriodStart` + ': '}
                <span className={styles.itemName}>{`${v.period.start}`}</span>
              </>
            )}

            {v.period && v.period.start && v.period && v.period.end && (
              <>{' | '}</>
            )}

            {v.period && v.period.end && (
              <>
                {i18n.t`PeriodEnd` + ': '}
                <span className={styles.itemName}>
                  {v.period.end && `${v.period.end} `}
                </span>
              </>
            )}

            <div className={styles.itemDivButton}>
              <EditAndDeleteButtonGroup
                onEdit={() => this.valueEdit(v, i)}
                onDelete={() => this.valueDelete(v, i)}
              />
            </div>
          </div>
        )
      })
    }

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="read" /> {i18n.t`Qualification`}
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
          {qualificationList}

          {this.state.modalVisible && (
            <Modal
              title={i18n.t`Qualification`}
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

Qualification.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.object,
}

export default Qualification
