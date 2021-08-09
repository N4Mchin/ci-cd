import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, Button, Row, Col } from 'antd'
import { EditAndDeleteButtonGroup } from 'components'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'

@withI18n()
class AddressLine extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      line: '',
      selectedIndex: -1,
      selectedItem: {},
      modalVisible: props.value ? false : true,
    }

    this.handleChange = this.handleChange.bind(this)
    this.valueAdd = this.valueAdd.bind(this)
    this.valueEdit = this.valueEdit.bind(this)
    this.valueDelete = this.valueDelete.bind(this)
  }

  valueAdd() {
    const { value = [], onChange } = this.props
    const { selectedIndex, line } = this.state

    let newValue

    if (selectedIndex > -1) {
      newValue = value
      newValue[selectedIndex] = line
    } else {
      newValue = [...value, line]
    }
    onChange(newValue)
    this.setState({
      modalVisible: false,
      selectedIndex: -1,
      selectedItem: {},
      line: '',
    })
  }

  valueEdit(item, index) {
    this.setState({
      modalVisible: true,
      selectedItem: item,
      selectedIndex: index,
      line: item,
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

  handleChange = e => {
    this.setState({
      line: e.target.value,
    })
  }

  render() {
    const { value, disabled, i18n, onChange, ...others } = this.props
    const i = 1

    const addressLineList = []

    if (value && value.length > 0) {
      value.forEach((element, index) => {
        addressLineList.push(
          <div key={index} className={styles.itemDiv}>
            <span>{element} </span>
            <span className={styles.itemUse}>{index + 1}</span>
            <div className={styles.itemDivButton}>
              <EditAndDeleteButtonGroup
                onEdit={() => this.valueEdit(element, index)}
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
          <Icon type="pushpin" />
          &nbsp;
          {i18n.t`AddressLine`}
        </div>
        <div>
          {addressLineList.length !== 0 && (
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
          {addressLineList}

          {this.state.modalVisible && (
            <Row>
              <Col span={4}>
                <span>
                  {i18n.t`AddressLine`}
                  {': '}
                </span>
              </Col>
              <Col span={18}>
                <Input
                  {...others}
                  value={this.state.line}
                  onChange={this.handleChange}
                  placeholder={`Line ${i}`}
                />
              </Col>
              <Col span={2}>
                <Button
                  icon="check"
                  type="dashed"
                  size="small"
                  onClick={this.valueAdd}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>
    )
  }
}

AddressLine.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.bool,
}

export default AddressLine
