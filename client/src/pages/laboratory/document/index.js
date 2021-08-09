import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Board, ButtonRed } from 'components'
import {
  Typography,
  Button,
  Progress,
  Col,
  Row,
  Table,
  Checkbox,
  Radio,
  Divider,
} from 'antd'
import {
  UnorderedListOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  UploadOutlined,
  DeleteOutlined,
  SearchOutlined,
  FileTextOutlined,
  DownloadOutlined,
  FileTextOutlinedTwoTone,
} from '@ant-design/icons'
import ModalSearch from './ModalSearch'
import ModalFileCopy from './ModalFileCopy'
import styles from './styles.less'

const { Text } = Typography

const initialDataSource = [
  {
    key: '1',
    type: 'folder',
    name: 'Word Document',
    Owner: 'solongo',
    Update: '2019.11.26',
    Size: '-',
  },
  {
    key: '2',
    type: 'folder',
    name: 'Huduunii material',
    Owner: 'purevjargal',
    Update: '2019.11.26',
    Size: '-',
  },
  {
    key: '3',
    type: 'file',
    name: 'ISO nemelt fileuud.doc.x',
    Owner: 'solongo',
    Update: '2019.11.26',
    Size: '325kb',
    Icon: (
      <Button>
        <DownloadOutlined twoToneColor="#F44336" style={{ fontSize: '25px' }} />
      </Button>
    ),
  },
]

const Document = ({ dispatch, laboratory_order, i18n }) => {
  const [ModalSearchVisible, showModalSearch] = useState(false)
  const [ModalFileCopyVisible, showModalFileCopy] = useState(false)
  const [dataSource, setDataSource] = useState(initialDataSource)
  const [deleteMode, setDeleteMode] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [counter, setCounter] = useState(initialDataSource.length)

  const columns = [
    {
      title: 'Нэрс',
      dataIndex: 'type',
      key: 'type',
      render: text => {
        if (text === 'folder') {
          return (
            <FolderOpenOutlined
              style={{ fontSize: '25px', color: '#000000' }}
            />
          )
        } else if (text === 'file') {
          return (
            <FileTextOutlined style={{ fontSize: '25px', color: '#000000' }} />
          )
        }
      },
      width: 20,
    },
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Эзэмшигч',
      dataIndex: 'Owner',
      key: 'Owner',
    },
    {
      title: 'Шинэчлэгдсэн',
      dataIndex: 'Update',
      key: 'Update',
    },
    {
      title: 'Хэмжээ',
      key: 'Size',
      dataIndex: 'Size',
    },
    {
      title: '',
      key: 'Icon',
      dataIndex: 'Icon',
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  const tableProps = {
    dataSource: dataSource,
    columns: columns,
    rowSelection: deleteMode ? rowSelection : undefined,
  }

  const onSubmit = () => {
    const newData = Object.assign([], dataSource)

    newData.push({
      key: `${counter + 1}`,
      type: 'folder',
      name: 'New Folder',
      Owner: '-',
      Update: '-',
      Size: '-',
    })

    setCounter(counter + 1)
    setDataSource(newData)
  }
  const onDeleteFolder = () => {
    const newData = dataSource.filter(d => !selectedRowKeys.includes(d.key))
    setDataSource(newData)
    setDeleteMode(!deleteMode)
  }

  return (
    <Board inner>
      <div
        style={{
          textTransform: 'uppercase',
          width: '100%',
          paddingRight: '5px',
        }}
      >
        <Text strong>Баримт бичиг</Text>
        <Text> хадгалалт</Text>
        <div style={{ height: '1px', background: '#E5E5E9' }} />
      </div>
      <div
        style={{
          margin: '20px 0px',
          display: 'flex',
          width: 'auto',
        }}
      >
        <Row
          style={{
            width: '20%',
          }}
          type="flex"
        >
          <div
            style={{
              width: '100%',
              height: '80px',
              background: '#F4F4F4',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ width: '10%', marginTop: '10px' }}>
                <UnorderedListOutlined
                  twoToneColor="#004D40"
                  style={{ fontSize: '25px' }}
                />
              </div>
              <div style={{ width: '80%', margin: '10px 0px 0px 8px' }}>
                <Text strong>Багтаамж</Text>
                <Progress
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  percent={99.9}
                  style={{ width: '95%' }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>182mb</div> <div>1024mb</div>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Row
          style={{
            width: '80%',
            margin: '0px 0px 0px 20px',
          }}
          type="flex"
          justify="end"
        >
          <Col span={6}>
            <Button
              style={{
                height: '80px',
                background: '#F4F4F4',
              }}
              block
              onClick={onSubmit}
            >
              <div>
                <FolderAddOutlined
                  twoToneColor="#004D40"
                  style={{ fontSize: '25px' }}
                />
                хавтас үүсгэх
              </div>
            </Button>
          </Col>
          <Col span={6}>
            <Button
              style={{
                height: '80px',
                background: '#F4F4F4',
              }}
              block
              onClick={() => showModalFileCopy(true)}
            >
              <div>
                <UploadOutlined
                  twoToneColor="#004D40"
                  style={{ fontSize: '25px' }}
                />
                файл хуулах
              </div>
            </Button>
          </Col>
          <Col span={6}>
            <Button
              style={{
                height: '80px',
                background: '#F4F4F4',
              }}
              block
              onClick={() => setDeleteMode(!deleteMode)}
            >
              <div>
                {' '}
                <DeleteOutlined
                  twoToneColor="#004D40"
                  style={{ fontSize: '25px' }}
                />{' '}
                файл устгах
              </div>
            </Button>
          </Col>
          <Col span={6}>
            <Button
              style={{
                height: '80px',
                background: '#F4F4F4',
              }}
              block
              onClick={() => showModalSearch(true)}
            >
              <div>
                {' '}
                <SearchOutlined
                  twoToneColor="#004D40"
                  style={{ fontSize: '25px' }}
                />{' '}
                хайх
              </div>
            </Button>
          </Col>
        </Row>{' '}
      </div>

      <ModalSearch
        visible={ModalSearchVisible}
        onCancel={() => showModalSearch(false)}
        width={'100%'}
      />
      <ModalFileCopy
        visible={ModalFileCopyVisible}
        onCancel={() => showModalFileCopy(false)}
        width={'100%'}
      />

      <div className={styles.tableContainer}>
        <Divider />
        <Table {...tableProps} />

        {deleteMode === true && (
          <ButtonRed onClick={onDeleteFolder}>устгах</ButtonRed>
        )}
      </div>
    </Board>
  )
}

Document.propTypes = {
  laboratory_document: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_document }) => ({ laboratory_document }))(
  withI18n()(Document)
)
