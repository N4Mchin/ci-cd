import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Select, Checkbox } from 'antd'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'
import { EditAndDeleteButtonGroup } from 'components'
import { ValuesetLanguages } from '../const'

const { Option } = Select

@withI18n()
class Communication extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      open: true,
      language: null,
      preferred: false,
      selectedItem: {},
      selectedIndex: -1,
      data: [],
    }

    this.valueAdd = this.valueAdd.bind(this)
    this.valueEdit = this.valueEdit.bind(this)
    this.valueDelete = this.valueDelete.bind(this)

    this.valueLanguageChange = this.valueLanguageChange.bind(this)
    this.valuePreferredChange = this.valuePreferredChange.bind(this)

    this.toggle = this.toggle.bind(this)
  }

  valueAdd() {
    let displayLanguage

    ValuesetLanguages.filter((value, idx, array) => {
      if (value.code === this.state.language) {
        displayLanguage = value.display
      }
    })

    const language = {
      coding: [
        {
          system: 'urn:ietf:bcp:47',
          code: this.state.language,
          display: displayLanguage,
        },
      ],
    }

    const { value, onChange } = this.props
    const { selectedIndex } = this.state

    const e = {
      language: language,
      preferred: this.state.preferred,
    }

    if (selectedIndex > -1) {
      value[selectedIndex] = e
      onChange(value)
    } else {
      const newValue = value ? [...value, e] : [e]
      onChange(newValue)
    }

    this.setState({
      open: false,
      language: null,
      preferred: false,
    })
  }

  valueEdit(item, index) {
    this.setState({
      open: true,
      language: item.language.coding['0'].code,
      selectedIndex: index,
    })

    this.valueLanguageChange(item.language.coding['0'].code)
    this.valuePreferredChange({
      target: {
        checked: item.preferred,
      },
    })
  }

  valueDelete(index) {
    const { value, onChange } = this.props
    const newValue = [...value]
    newValue.splice(Number(index), 1)

    onChange(newValue.length > 0 ? newValue : undefined)
  }

  toggle(bool) {
    if (typeof bool === 'undefined') {
      this.setState({ open: !this.state.open })
    } else {
      this.setState({ open: bool })
    }

    this.setState({
      preferred: false,
      language: null,
    })
  }

  valueLanguageChange(value) {
    this.setState({ language: value })
  }

  valuePreferredChange(event) {
    this.setState({ preferred: event.target.checked })
  }

  render() {
    const { value, i18n } = this.props

    const communicationList = []

    if (value && value.length > 0) {
      value.map((item, index) => {
        const itemKey = `Communication.${index}`
        communicationList.push(
          <div key={itemKey} className={styles.itemDiv}>
            {item.language.coding['0'].code} :{' '}
            <span className={styles.itemName}>
              {`${item.language.coding['0'].display} `}{' '}
            </span>
            <span
              className={styles.itemUse}
            >{`preferred: ${item.preferred}`}</span>
            <div className={styles.itemDivButton}>
              <EditAndDeleteButtonGroup
                onEdit={() => this.valueEdit(item, index)}
                onDelete={() => this.valueDelete(index)}
              />
            </div>
          </div>
        )
      })
    }

    return (
      <div className={styles.contentForm}>
        <div className={styles.title}>
          <Icon type="global" /> {i18n.t`Communication`}
        </div>
        <div>
          {value && value.length > 0 && (
            <div className={styles.divButton}>
              <Button
                icon="plus"
                type="dashed"
                size="small"
                onClick={this.toggle}
              />
            </div>
          )}
        </div>

        <div className={styles.cont}>
          {communicationList}

          {(this.state.open || value.length === 0) && (
            <>
              <Checkbox
                checked={this.state.preferred}
                onChange={this.valuePreferredChange}
                style={{ width: '28%', marginRight: '4px' }}
              >
                {i18n.t`Preferred`}
              </Checkbox>

              <Select
                style={{ width: '56%', marginRight: '4px' }}
                value={this.state.language}
                onChange={this.valueLanguageChange}
              >
                {ValuesetLanguages.map(v => (
                  <Option key={v.code} value={v.code}>
                    {v.display}
                  </Option>
                ))}
              </Select>
              <Button icon="plus" onClick={this.valueAdd} />
            </>
          )}
        </div>
      </div>
    )
  }
}

Communication.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default Communication
