import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Typography,
  Form,
  Button,
  Row,
  Input,
  Col,
  List,
  Checkbox,
  Select,
  Icon,
} from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, CustomInputNumber, CompactTable } from 'components'
import { getDate } from 'utils/datetime'
import { DownloadOutlined } from '@ant-design/icons'

const { Text } = Typography
const InputGroup = Input.Group
const { TextArea } = Input

const Urinalysis = props => {
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
      title: 'UBG',
      dataIndex: 'UBG',
      key: 'UBG',
      render: text => <span>{text}</span>,
    },
    {
      title: 'BIL',
      dataIndex: 'BIL',
      key: 'BIL',
      render: text => <span>{text}</span>,
    },
    {
      title: 'KET',
      dataIndex: 'KET',
      key: 'KET',
      render: text => <span>{text}</span>,
    },
    {
      title: 'CRE',
      dataIndex: 'CRE',
      key: 'CRE',
      render: text => <span>{text}</span>,
    },
    {
      title: 'RBC',
      dataIndex: 'RBC',
      key: 'RBC',
      render: text => <span>{text}</span>,
    },
    {
      title: 'PRO',
      dataIndex: 'PRO',
      key: 'PRO',
      render: text => <span>{text}</span>,
    },
    {
      title: 'MALB',
      dataIndex: 'MALB',
      key: 'MALB',
      render: text => <span>{text}</span>,
    },
    {
      title: 'NIT',
      dataIndex: 'NIT',
      key: 'NIT',
      render: text => <span>{text}</span>,
    },
    {
      title: 'LEU',
      dataIndex: 'LEU',
      key: 'LEU',
      render: text => <span>{text}</span>,
    },
    {
      title: 'SG',
      dataIndex: 'SG',
      key: 'SG',
      render: text => <span>{text}</span>,
    },
    {
      title: 'PH',
      dataIndex: 'PH',
      key: 'PH',
      render: text => <span>{text}</span>,
    },
    {
      title: 'VC',
      dataIndex: 'VC',
      key: 'VC',
      render: text => <span>{text}</span>,
    },
    {
      title: 'CA',
      dataIndex: 'CA',
      key: 'CA',
      render: text => <span>{text}</span>,
    },
    {
      title: 'AC',
      dataIndex: 'AC',
      key: 'AC',
      render: text => <span>{text}</span>,
    },
    {
      title: <Trans id={'Color'} />,
      dataIndex: 'Color',
      key: 'Color',
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
      UBG: '',
      BIL: '',
      KET: '',
      CRE: '',
      RBC: '',
      PRO: '',
      MALB: '',
      NIT: '',
      LEU: '',
      GLU: '',
      SG: '',
      PH: '',
      VC: '',
      CA: '',
      AC: '',
      Color: '',
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

Urinalysis.propTypes = {
  practitioner: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner, loading }) => ({
  app,
  practitioner,
  loading,
}))(withI18n()(Form.create()(Urinalysis)))
