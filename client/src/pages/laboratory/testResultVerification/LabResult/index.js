import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'

import AntiHDV from './AntiHDV'
import Biochemistry from './Biochemistry'
import Immunology from './Immunology'
import Coagulation from './Coagulation'
import Ferritin from './Ferritin'
import Hematology from './Hematology'
import Rapid from './Rapid'
import ViralLoad from './ViralLoad'
import VitaminD3 from './VitaminD3'
import SarsCov2IgG from './SarsCov2IgG'
import SarsCov2IgGElisa from './SarsCov2IgGElisa'

const LabResult = props => {
  const componentProps = {
    ...props,
    rowData: props.rowData,
    selectedRowIndex: props.selectedRowIndex,
    visible: props.visible,
    onCancel: props.onCancel,
    onVerifyResultItem: props.onVerifyResultItem,
    onReVerifyResultItem: props.onReVerifyResultItem,
    width: '900px',
  }

  return (
    <div>
      {props.testKey === 'Anti_HDV' && <AntiHDV {...componentProps} />}

      {props.testKey === 'BiochemistryTests' && (
        <Biochemistry {...componentProps} />
      )}

      {props.testKey === 'Coagulation' && <Coagulation {...componentProps} />}

      {props.testKey === 'ImmunologyTests' && (
        <Immunology {...componentProps} />
      )}

      {props.testKey === 'Ferritin' && <Ferritin {...componentProps} />}
      {props.testKey === 'Hematology' && <Hematology {...componentProps} />}
      {props.testKey === 'RapidTests' && <Rapid {...componentProps} />}
      {['HBV_DNA', 'HCV_RNA', 'HDV_RNA', 'HIV_RNA', 'HPV'].includes(
        props.testKey
      ) && <ViralLoad {...componentProps} />}

      {props.testKey === 'Vitamin_D3' && <VitaminD3 {...componentProps} />}
      {props.testKey === 'Sars_Cov2_IgG' && <SarsCov2IgG {...componentProps} />}
      {props.testKey === 'Sars_Cov2_IgG_Elisa' && (
        <SarsCov2IgGElisa {...componentProps} />
      )}
    </div>
  )
}

LabResult.propTypes = {
  app: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ loading, app, laboratory_testResultVerification }) => ({
    app,
    loading,
    laboratory_testResultVerification,
  })
)(withI18n()(LabResult))
