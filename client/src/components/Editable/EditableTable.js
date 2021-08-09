import React, { useContext, useState, useEffect, useRef } from 'react'
import { Table, Input, Button, Popconfirm, Form } from 'antd'
import styles from '../styles.less'
import classNames from 'classnames'
import { set } from 'date-fns'
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  renderCell = form => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

class EditableTable extends React.Component {
  render() {
    const { showHeader, pagination, scroll } = this.props
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }

    return (
      <Table
        className={styles.editableCell}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        showHeader={showHeader !== false ? true : false}
        pagination={this.props.pagination}
        dataSource={this.props.dataSource}
        columns={this.props.columns}
        onChange={this.props.onChange}
        scroll={scroll !== false ? { x: 'max-content' } : false}
      />
    )
  }
}

export default EditableTable
