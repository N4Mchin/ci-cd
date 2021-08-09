import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import { Page, ModuleBox } from 'components'
import Header from './components/Header'
import { Button, Col, Row } from 'antd'
import TableFirstAid from './components/TableFirstAid'
import TableExposureKit from './components/TableExposureKit'
import ModalResultSent from '../../laboratory/test/components/ModalResultSent'
import ModalNurseExpense from './components/ModalNurseExpense'
import ModalNurseLog from './components/ModalNurseLog'

const Tool = props => {
  const { location, phlebotomy_tool, loading, form, dispatch, i18n } = props
  const [modalNurseLogVisible, showModalNurseLog] = useState(false)
  const [modalNurseExpenseVisible, showModalNurseExpense] = useState(false)
  const [modalResultSentVisible, showModalResultSent] = useState(false)
  // Changing props of list
  const tableProps = {
    //rowClassName: record => styles[record.status],
    // loading: loading.effects['reception/query'],
    // pagination,
    // onChange(page) {
    //   handleRefresh({
    //     page: page.current,
    //     pageSize: page.pageSize,
    //   })
    // }
  }
  const onSave = () => {
    dispatch({
      type: 'phlebotomy_tool/refresh',
    })

    showModalNurseLog(false)
    showModalResultSent(true)
  }

  const onSaveExpense = () => {
    dispatch({
      type: 'phlebotomy_tool/refresh',
    })

    showModalNurseExpense(false)
    showModalResultSent(true)
  }

  const Title = (
    <Trans>
      <span className="title uppercase">Одоогийн </span>
      <span className="uppercase">Үлдэгдэл</span>
    </Trans>
  )
  return (
    <Page inner>
      <Trans>
        <span className="title uppercase">Сувилагчийн хэрэгсэлийн </span>
        <span className="uppercase">бүртгэл</span>
      </Trans>
      <div style={{ borderBottom: '1px solid #E9E9E9' }}></div>
      {/* ------------------------------------------------------------------------------------------ */}
      <ModuleBox title={Title}>
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Header />
          </Col>
          <Col span={24}>
            <TableFirstAid />
          </Col>

          <Col span={24}>
            <TableExposureKit />
          </Col>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Col span={3} style={{ marginRight: '10px' }}>
              <Button
                type="primary"
                block
                onClick={() => showModalNurseExpense(true)}
              >
                <Trans id={'Зарлагадах'} />
              </Button>
            </Col>
            <Col span={3}>
              <Button
                className="button-red"
                block
                onClick={() => showModalNurseLog(true)}
              >
                <Trans id={'Register'} />
              </Button>
            </Col>
          </div>
        </Row>

        <ModalNurseExpense
          visible={modalNurseExpenseVisible}
          onCancel={() => showModalNurseExpense(false)}
          onSubmit={onSaveExpense}
        />
        <ModalNurseLog
          visible={modalNurseLogVisible}
          onCancel={() => showModalNurseLog(false)}
          onSubmit={onSave}
        />
        <ModalResultSent
          visible={modalResultSentVisible}
          onCancel={() => showModalResultSent(false)}
          title={
            <p
              style={{
                marginLeft: '30px',
                marginTop: '30px',
                textTransform: 'uppercase',
                fontSize: '12px',
              }}
            >
              <strong> Амжилттай хадгалагдлаа</strong>
            </p>
          }
        />
      </ModuleBox>
      {/* ------------------------------------------------------------------------------------------ */}
    </Page>
  )
}

Tool.propTypes = {
  phlebotomy_tool: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ phlebotomy_tool, loading }) => ({
  phlebotomy_tool,
  loading,
}))(withI18n()(Tool))
