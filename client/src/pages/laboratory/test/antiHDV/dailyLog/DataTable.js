import React, { useState, useEffect, useRef } from 'react'
import PropTypes, { element } from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import styles from '../styles.less'

import { Form, Input, Table } from 'antd'

const DAYS = 12

const DataTable = props => {
  const { form, dataSource, pageIndex } = props
  const { getFieldDecorator } = form

  const control = {
    blank: 'Blank',
    negativControl: 'Negative control',
    positiveControl: 'Positive control',
  }

  const dataArray = [
    {
      dataIndex: '1',
      rowName: 'A',
      reagent: <div> A</div>,
    },
    {
      dataIndex: '2',
      rowName: 'B',
      reagent: <div>B</div>,
    },
    {
      dataIndex: '3',
      rowName: 'C',
      reagent: <div>C</div>,
    },
    {
      dataIndex: '4',
      rowName: 'D',
      reagent: <div>D</div>,
    },
    {
      dataIndex: '5',
      rowName: 'E',
      reagent: <div>E</div>,
    },
    {
      dataIndex: '6',
      rowName: 'F',
      reagent: <div>F</div>,
    },
    {
      dataIndex: '7',
      rowName: 'G',
      reagent: <div>G</div>,
    },
    {
      dataIndex: '8',
      rowName: 'H',
      reagent: <div>H</div>,
    },
  ]

  const columnsSecond = [
    {
      title: '',
      dataIndex: 'reagent',
      key: 'reagent',
      width: 50,
    },
  ]

  for (let dayIndex = 1; dayIndex <= DAYS; dayIndex++) {
    const col = {
      title: dayIndex.toString(),
      dataIndex: `day_${dayIndex}`,
      key: dayIndex.toString(),
      width: 5,
      render: (text, record, rowIndex) => {
        if (rowIndex === 0 && dayIndex === 1) {
          return {
            children: (
              <div>
                <Form.Item>
                  {getFieldDecorator(
                    `${pageIndex}.${record.rowName}.day_${dayIndex}`,
                    {
                      rules: [{ required: false }],
                      initialValue: text === undefined ? control.blank : text,
                    }
                  )(<Input />)}
                </Form.Item>
              </div>
            ),
          }
        }
        if (rowIndex === 1 && dayIndex === 1) {
          return {
            children: (
              <div>
                <Form.Item>
                  {getFieldDecorator(
                    `${pageIndex}.${record.rowName}.day_${dayIndex}`,
                    {
                      initialValue:
                        text === undefined ? control.negativControl : text,
                      rules: [{ required: false }],
                    }
                  )(<Input />)}
                </Form.Item>
              </div>
            ),
          }
        }
        if (rowIndex === 2 && dayIndex === 1) {
          return {
            children: (
              <div>
                <Form.Item>
                  {getFieldDecorator(
                    `${pageIndex}.${record.rowName}.day_${dayIndex}`,
                    {
                      initialValue:
                        text === undefined ? control.negativControl : text,
                      rules: [{ required: false }],
                    }
                  )(<Input />)}
                </Form.Item>
              </div>
            ),
          }
        }
        if (rowIndex === 3 && dayIndex === 1) {
          return {
            children: (
              <div>
                <Form.Item>
                  {getFieldDecorator(
                    `${pageIndex}.${record.rowName}.day_${dayIndex}`,
                    {
                      initialValue:
                        text === undefined ? control.negativControl : text,
                      rules: [{ required: false }],
                    }
                  )(<Input />)}
                </Form.Item>
              </div>
            ),
          }
        }
        if (rowIndex === 4 && dayIndex === 1) {
          return {
            children: (
              <div>
                <Form.Item>
                  {getFieldDecorator(
                    `${pageIndex}.${record.rowName}.day_${dayIndex}`,
                    {
                      initialValue:
                        text === undefined ? control.positiveControl : text,
                      rules: [{ required: false }],
                    }
                  )(<Input />)}
                </Form.Item>
              </div>
            ),
          }
        }
        if (rowIndex === 5 && dayIndex === 1) {
          return {
            children: (
              <div>
                <Form.Item>
                  {getFieldDecorator(
                    `${pageIndex}.${record.rowName}.day_${dayIndex}`,
                    {
                      initialValue:
                        text === undefined ? control.positiveControl : text,
                      rules: [{ required: false }],
                    }
                  )(<Input />)}
                </Form.Item>
              </div>
            ),
          }
        }
        return {
          children: (
            <div>
              <Form.Item>
                {getFieldDecorator(
                  `${pageIndex}.${record.rowName}.day_${dayIndex}`,
                  {
                    // initialValue: text,
                    rules: [{ required: false }],
                  }
                )(<Input />)}
              </Form.Item>
            </div>
          ),
        }
      },
    }

    columnsSecond.push(col)
  }

  const changeTableData = () => {
    // Form-iin utga hoosloh
    const formValues = form.getFieldsValue()

    Object.keys(formValues).forEach(formValue => {
      Object.keys(formValues[formValue]).forEach(subFormValue => {
        Object.keys(formValues[formValue][subFormValue]).forEach(child => {
          if (
            ['A', 'B', 'C', 'D', 'E', 'F'].includes(subFormValue) &&
            child === 'day_1'
          ) {
          } else {
            form.setFieldsValue({
              [`${pageIndex}.${subFormValue}.${child}`]: '',
            })
          }
        })
      })
    })

    Object.keys(dataSource).forEach(element => {
      Object.keys(dataSource[element]).forEach(sub => {
        form.setFieldsValue({
          [`${pageIndex}.${element}.${sub}`]: dataSource[element][sub],
        })
      })
    })
  }

  const [loadingRef, setLoadingRef] = useState(false)
  const [dataSourceLast, setDataSourceLast] = useState([...dataArray])

  useEffect(() => {
    //  setLoadingRef(true)
    changeTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // setLoadingRef(false)
  }, [props.dataSource])

  return (
    <div>
      <Form onFieldsChange={onFieldsChange}>
        <Table
          dataSource={dataSourceLast}
          columns={columnsSecond}
          bordered={true}
          className={styles.container1}
          //loading={loadingRef}
          pagination={false}
        />
      </Form>
    </div>
  )
}

function onFieldsChange(props, changedFields, allFields) {
  const { form } = props

  props.formValueChange(form.getFieldsValue(), props.pageIndex)
}

DataTable.propTypes = {
  laboratory_test: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, loading, laboratory_test }) => ({
  app,
  loading,
  laboratory_test,
}))(withI18n()(Form.create({ onFieldsChange: onFieldsChange })(DataTable)))
