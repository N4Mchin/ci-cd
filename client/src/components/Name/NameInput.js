import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import Modal from './Modal'
import { EditAndDeleteButtonGroup } from 'components'
import NameForm from './NameForm'

@withI18n()
class NameInput extends PureComponent {
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

  render() {
    const { value, disabled, form, i18n, ...others } = this.props

    const nameForm = []
    const nameList = []

    if (value === undefined || value.length === 0) {
      nameForm.push(<NameForm key="keyNameForm" onOk={e => this.valueAdd(e)} />)
    } else {
      value.map((v, i) => {
        nameList.push(
          <div key={i} className={styles.itemDiv}>
            {i18n.t`HumanNameGiven` + ': '}
            <span className={styles.itemName}>
              {v.prefix && `${v.prefix.join(' ')} `}
              {v.given && v.given.join(' ') + ` `}
              {v.suffix && `${v.suffix.join(' ')} `}
            </span>
            {' | '}

            {i18n.t`HumanNameFamily` + ': '}
            <span className={styles.itemName}>
              {v.family && `${v.family} `}
            </span>
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

            <span className={styles.itemUse}>{v.use}</span>
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
          <Icon type="user" /> {i18n.t`HumanName`}
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
          {nameList}
          {nameForm}

          {this.state.modalVisible && (
            <Modal
              title={i18n.t`HumanName`}
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

NameInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default NameInput
