import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Col, Divider, Drawer } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { InclusionExclusionForm } from './'
import styles from '../../../styles.less'

const DlivrModal = props => {
  const onSubmit = (inclusion, exclusion, screeningType) => {
    props.onSubmit(inclusion, exclusion, screeningType)
  }

  return (
    <Drawer {...props} width="80vw">
      <div style={{ textAlign: 'center' }}>
        <span className="title">{'D-LIVR судалгаанд хамрагдах'}</span>
      </div>

      <InclusionExclusionForm onSubmit={onSubmit} />
    </Drawer>
  )
}

// DlivrModal.propTypes = {
//   practitioner_patient_profile: PropTypes.object,
//   location: PropTypes.object,
//   dispatch: PropTypes.func,
//   loading: PropTypes.object,
// }

export default withI18n()(DlivrModal)
