import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withI18n, Trans } from '@lingui/react'
import styles from '../styles.less'

import { EditAndDeleteButtonGroup } from 'components'
import ReferenceModal from './ReferenceModal'
import ReferenceForm from './ReferenceForm'

import { Icon, Button } from 'antd'

@withI18n()
class ReferenceInput extends PureComponent {
  constructor(props) {
    super(props)

    this.valueAdd = this.valueAdd.bind(this)
    this.valueDelete = this.valueDelete.bind(this)
    this.valueEdit = this.valueEdit.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
    this.renderIconForElement = this.renderIconForElement.bind(this)
    this.renderIcon = this.renderIcon.bind(this)

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

  renderIcon() {
    return <div className={styles.title}></div>
  }

  renderIconForElement(title) {
    return (
      <div className={styles.title}>
        <Icon type="user" /> <Trans id={title} />
      </div>
    )
  }

  render() {
    const { value, disabled, form, i18n, element, ...others } = this.props

    const referenceForm = []
    const referenceList = []

    if (value === undefined || value.length === 0) {
      referenceForm.push(
        <ReferenceForm
          key="keyReferenceForm"
          onOk={e => this.valueAdd(e)}
          element={element}
        />
      )
    } else {
      value.map((v, i) => {
        if (element === 'codeServiceRequest') {
          referenceList.push(
            <div key={i} className={styles.itemDiv}>
              {i18n.t`Type` + ': '}
              <span className={styles.itemName}>{v.type && `${v.type} `}</span>
              <br></br>

              {i18n.t`Code` + ': '}
              <span className={styles.itemName}>{v.code && `${v.code} `}</span>
              <br></br>

              {i18n.t`Test` + ': '}
              <span className={styles.itemName}>
                {v.turgentest && `${v.turgentest} `}
              </span>
              <span className={styles.itemName}>
                {v.serum && `${v.serum} `}
              </span>
              <span className={styles.itemName}>
                {v.bloodtest && `${v.bloodtest} `}
              </span>
              <span className={styles.itemName}>
                {v.achaalal && `${v.achaalal} `}
              </span>
              <span className={styles.itemName}>
                {v.sysmex && `${v.sysmex} `}
              </span>
              <span className={styles.itemName}>
                {v.shees && `${v.shees} `}
              </span>
              <span className={styles.itemName}>
                {v.cougulogramm && `${v.cougulogramm} `}
              </span>
              <span className={styles.itemName}>
                {v.uemuch && `${v.uemuch} `}
              </span>
              <span className={styles.itemName}>
                {v.fibroscan && `${v.fibroscan} `}
              </span>
              <span className={styles.itemName}>
                {v.visuald && `${v.visuald} `}
              </span>
              <br></br>

              <div className={styles.itemDivButton}>
                <EditAndDeleteButtonGroup
                  onEdit={() => this.valueEdit(v, i)}
                  onDelete={() => this.valueDelete(v, i)}
                />
              </div>
            </div>
          )
          if (referenceForm === undefined || referenceForm.length === 0)
            referenceForm.push(
              <ReferenceForm
                key="keyReferenceForm"
                onOk={e => this.valueAdd(e)}
                element={element}
              />
            )
        } else
          referenceList.push(
            <div key={i} className={styles.itemDiv}>
              {i18n.t`Type` + ': '}
              <span className={styles.itemName}>{v.type && `${v.type} `}</span>
              {' | '}

              {i18n.t`Identifier` + ': '}
              <span className={styles.itemName}>
                {v.identifier && `${v.identifier} `}
              </span>
              {<br></br>}

              {i18n.t`Display` + ': '}
              <span className={styles.itemName}>
                {v.display && `${v.display} `}
              </span>
              {<br></br>}

              {i18n.t`Reference` + ': '}
              <span className={styles.itemName}>
                {v.reference && `${v.reference} `}
              </span>

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
        {element === 'subjectServiceRequest'
          ? this.renderIconForElement('Subject')
          : element === 'basedOnServiceRequest'
          ? this.renderIconForElement('BasedOn')
          : element === 'codeServiceRequest'
          ? this.renderIconForElement('Code')
          : element === 'encounterServiceRequest'
          ? this.renderIconForElement('Encounter')
          : element === 'performerServiceRequest'
          ? this.renderIconForElement('Performer')
          : this.renderIcon()}

        <div>
          {value &&
            value.length > 0 &&
            element !== 'subjectServiceRequest' &&
            element !== 'codeServiceRequest' && (
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
          {referenceList}
          {referenceForm}

          {this.state.modalVisible && (
            <ReferenceModal
              title={i18n.t`Reference`}
              visible={this.state.modalVisible}
              selectedItem={this.state.selectedItem}
              onCancel={() => this.setModalVisible(false)}
              onOk={e => this.valueAdd(e)}
              element={element}
            />
          )}
        </div>
      </div>
    )
  }
}

ReferenceInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default ReferenceInput
