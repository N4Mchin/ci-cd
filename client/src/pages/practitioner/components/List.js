import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Avatar } from 'antd'
import { DropOption } from 'components'
import { Trans, withI18n } from '@lingui/react'
import Link from 'umi/link'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onDetailsItem, i18n } = this.props

    switch (e.key) {
      case '1':
        onDetailsItem(record)
        break
      case '2':
        onEditItem(record)
        break
      case '3':
        confirm({
          title: i18n.t`WarningDeleteRecord`,
          onOk() {
            onDeleteItem(record.id)
          },
        })
        break
      default:
        break
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: i18n.t`FirstName`,
        dataIndex: 'first_name',
        key: 'first_name',
        render: (text, record) => (
          <Link to={`practitioner/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: i18n.t`LastName`,
        dataIndex: 'last_name',
        key: 'last_name',
        render: (text, record) => (
          <Link to={`practitioner/${record.id}`}>{text}</Link>
        ),
      },
      {
        title: i18n.t`BirthDate`,
        dataIndex: 'birth_date',
        key: 'birth_date',
      },
      {
        title: <Trans>Mobile</Trans>,
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: '1', name: i18n.t`Details` },
                { key: '2', name: i18n.t`Update` },
                { key: '3', name: i18n.t`Delete` },
              ]}
            />
          )
        },
      },
    ]

    return (
      <Table
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onDetailsItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
