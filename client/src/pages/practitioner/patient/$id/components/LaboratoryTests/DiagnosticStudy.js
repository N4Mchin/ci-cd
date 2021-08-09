import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Form, Button, Row, Input, List } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, CustomInputNumber, CompactTable } from 'components'
import { getDate } from 'utils/datetime'
import { DownloadOutlined } from '@ant-design/icons'

const { Text } = Typography
const InputGroup = Input.Group
const { TextArea } = Input

const DiagnosticStudys = props => {
  const { form, i18n } = props
  // const { FHIR_CODES } = props.app
  // const { Coagulogram } = FHIR_CODES.UncategorizedTests
  // const { PT, INR, aPTT, TT, Fibrinogen } = Coagulogram.include
  const [selectedTest, setSelectedTest] = useState()

  const { getFieldDecorator } = form
  const onSelect = value => {
    setSelectedTest(value)
  }

  const columns = [
    {
      title: <Trans id={'Date'} />,
      dataIndex: 'date',
      key: 'date',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Ultrasound',
      dataIndex: 'ultrasound',
      key: 'ultrasound',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Computer Tomography',
      dataIndex: 'computerTomography',
      key: 'computerTomography',
      render: text => <span>{text}</span>,
    },
    {
      title: 'MRI',
      dataIndex: 'MRI',
      key: 'MRI',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Уян дуран',
      dataIndex: 'Endoscopy',
      key: 'Endoscopy',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'Liver Biopsy'} />,
      dataIndex: 'LiverBiopsy',
      key: 'LiverBiopsy',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'ECG'} />,
      dataIndex: 'ECG',
      key: 'ECG',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'Note'} />,
      dataIndex: 'note',
      key: 'note',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'Address'} />,
      dataIndex: 'address',
      key: 'address',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'Edit'} />,
      dataIndex: 'edit',
      key: 'edit',
      render: text => <span>{text}</span>,
    },
  ]
  const dataSource = [
    {
      key: '1',
      date: <div>{getDate()}</div>,
      ultrasound: '',
      computerTomography: '',
      MRI: '',
      Endoscopy: '',
      LiverBiopsy: '',
      ECG: '',
      note: <Input />,
      address: 'Элэгний төв',
      edit: <Button type="primary">Засах</Button>,
    },
  ]
  const tableProps = {
    dataSource: dataSource,
    columns: columns,
  }
  return (
    <div>
      <Form>
        <List bordered={true}>
          <Row>
            <Button type="primary" style={{ marginTop: '20px' }}>
              Нэмэх
            </Button>
          </Row>

          <CompactTable
            {...tableProps}
            style={{ marginTop: '16px', width: '50%' }}
            pagination={false}
          />
        </List>
      </Form>
    </div>
  )
}

DiagnosticStudys.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner, loading }) => ({
  app,
  practitioner,
  loading,
}))(withI18n()(Form.create()(DiagnosticStudys)))
