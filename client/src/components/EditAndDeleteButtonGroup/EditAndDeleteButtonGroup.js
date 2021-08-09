import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'

@withI18n()
class EditAndDeleteButtonGroup extends PureComponent {
  render() {
    const { onEdit, onDelete, i18n } = this.props

    return (
      <Button.Group>
        <Button icon="edit" onClick={onEdit} />
        <Popconfirm
          title={i18n.t`WarningDeleteItem`}
          okText={i18n.t`Yes`}
          cancelText={i18n.t`No`}
          onConfirm={onDelete}
        >
          <Button icon="delete" type="danger" />
        </Popconfirm>
      </Button.Group>
    )
  }
}

EditAndDeleteButtonGroup.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
}

export default EditAndDeleteButtonGroup
