import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import * as helper from 'utils/helper'
import { Trans, withI18n } from '@lingui/react'

@withI18n()
class PractitionerDetails extends PureComponent {
  handleOk = () => {}

  render() {
    const { item = {}, data = {}, onOk, i18n, ...detailsProps } = this.props

    const nodeItem = (item, items) => {
      const value = items[item]

      if (helper.isObject(value)) {
        const list = value
        return (
          <li>
            {item}
            <ul>
              {Object.keys(list).map(listItem => nodeItem(listItem, list))}
            </ul>
          </li>
        )
      } else {
        return (
          <li>
            {item}
            <ul>
              <li>{value.toString()}</li>
            </ul>
          </li>
        )
      }
    }

    const DynamicNestedItems = () => {
      if (data) {
        return (
          <ul>{Object.keys(data).map(dataItem => nodeItem(dataItem, data))}</ul>
        )
      }
    }

    return (
      <Modal {...detailsProps} onOk={this.handleOk}>
        {DynamicNestedItems(data)}
      </Modal>
    )
  }
}

PractitionerDetails.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  data: PropTypes.object,
  onOk: PropTypes.func,
}

export default PractitionerDetails
