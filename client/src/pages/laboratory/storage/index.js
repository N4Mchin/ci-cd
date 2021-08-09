import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n, Trans } from '@lingui/react'
import { Board, CompactTable } from 'components'
import { Input, Button, Row, Col } from 'antd'
import styles from './styles.less'
import ModalSave from './ModalSave'

const { Search } = Input

const columns = [
  {
    title: <Trans id={'Specimen barcode'} />,
    dataIndex: 'barcode',
    key: 'barcode',
  },
  {
    title: <Trans id={'LastName'} />,
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: <Trans id={'FirstName'} />,
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: <Trans id={'RegisterNumber'} />,
    dataIndex: 'registerNumber',
    key: 'registerNumber',
  },
  {
    title: <Trans id="TestName" />,
    dataIndex: 'testName',
    key: 'testName',
  },
  {
    title: <Trans id={'Date'} />,
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)', padding: '20px 0 20px 0' }}>
        <Trans id={'Хэмжээ'} />
      </div>
    ),
    dataIndex: 'size',
    key: 'size',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>
        <Trans id={'Хөргөгч'} />
      </div>
    ),
    dataIndex: 'freezer',
    key: 'freezer',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>
        <Trans id={'Тасалгаа '} />
      </div>
    ),
    dataIndex: 'compartment',
    key: 'compartment',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>
        <Trans id={'Давхар'} />
      </div>
    ),
    dataIndex: 'layer',
    key: 'layer',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>
        <Trans id={'Багана'} />
      </div>
    ),
    dataIndex: 'col',
    key: 'col',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>
        <Trans id={'Мөр'} />
      </div>
    ),
    dataIndex: 'row',
    key: 'row',
  },
  {
    title: (
      <div style={{ transform: 'rotate(-90deg)' }}>
        <Trans id={'Байршил'} />
      </div>
    ),
    dataIndex: 'location',
    key: 'location',
  },
]

const Storage = props => {
  const { laboratory_storage, i18n } = props
  const { tableData } = laboratory_storage

  const [dataSource, setDataSource] = useState()
  const [modalSaveVisible, showModalSave] = useState(false)
  const [searchingValue, setSearchingValue] = useState('')

  const handleChange = event => {
    setSearchingValue(event.target.value.toUpperCase())

    if (event.target.value !== '' && event.target.value.length > 0) {
      props
        .dispatch({
          type: 'laboratory_storage/searchStorageDashboardClient',
          payload: { id: event.target.value.toUpperCase() },
        })
        .then(searchedTableData => {
          setDataSource(searchedTableData)
        })
        .catch(errorInfo => console.log(errorInfo))
    } else {
      props
        .dispatch({
          type: 'laboratory_storage/searchStorageDashboardClient',
        })
        .then(() => {
          setDataSource(undefined)
        })
    }
  }

  return (
    <Board inner>
      <Row
        className={styles.search}
        type="flex"
        justify="start"
        gutter={[8, 8]}
      >
        <Col>
          <Search
            allowClear
            placeholder={i18n.t`SearchIDorBarcode`}
            style={{ width: '280px', height: '32px' }}
            onChange={value => handleChange(value)}
            value={searchingValue}
            maxLength={10}
          />
        </Col>
        <Col>
          <Button
            className="button-red uppercase"
            style={{ width: '160px', height: '32px' }}
            onClick={showModalSave}
          >
            <Trans id="Save" />
          </Button>
        </Col>
      </Row>
      <br />

      <CompactTable
        dataSource={dataSource ? dataSource : tableData}
        columns={columns}
        className={styles.container}
        pagination={{ pageSize: 20 }}
        rowKey="uid"
      />

      <ModalSave
        lastStoredValue={tableData && tableData[0]}
        visible={modalSaveVisible}
        onCancel={() => showModalSave(false)}
      />
    </Board>
  )
}

Storage.propTypes = {
  laboratory_storage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_storage }) => ({ laboratory_storage }))(
  withI18n()(Storage)
)
