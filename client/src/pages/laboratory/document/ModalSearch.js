import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Board } from 'components'
import { Input, Modal } from 'antd'

const { Search } = Input

const ModalSearch = props => {
  return (
    <Modal
      visible={props.visible}
      onCancel={props.onCancel}
      maskClosable={props.maskClosable}
      footer={null}
    >
      <Search
        placeholder="Файлын нэр, төрлөөр хайх хэсэг"
        onSearch={value => console.log(value)}
        style={{ width: 400, marginTop: 10, background: '#F4F2F2' }}
      />
    </Modal>
  )
}

ModalSearch.propTypes = {
  laboratory_document: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_document_ModalSearch }) => ({
  laboratory_document_ModalSearch,
}))(withI18n()(ModalSearch))
