import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import * as dateTime from 'utils/datetime'
import * as helper from 'utils/helper'
import styles from './../../styles.less'

const columns = [
  {
    title: <Trans id={'Receipt Number'} />,
    dataIndex: 'receiptNumber',
    key: 'receiptNumber',
  },
  {
    title: <Trans id={'Receipt Date'} />,
    dataIndex: 'receiptDate',
    key: 'receiptDate',
  },
  {
    title: <Trans id={'Expiration Date'} />,
    dataIndex: 'receiptExpireDate',
    key: 'receiptExpireDate',
  },
  {
    title: <Trans id={'Receipt Diagnose'} />,
    dataIndex: 'receiptDiag',
    key: 'receiptDiag',
  },
  {
    title: <Trans id={'Status'} />,
    dataIndex: 'statusStr',
    key: 'statusStr',
  },
  {
    title: <Trans id={'Receipt Type'} />,
    dataIndex: 'receiptTypeStr',
    key: 'receiptTypeStr',
  },
  {
    title: <Trans id={'Medication Statement Name'} />,
    dataIndex: 'tbltName',
    key: 'tbltName',
  },
]

const SavedPrescriptionTable = props => {
  const { practitioner_patient_profile, i18n, patient } = props
  const { lastUpdatedEprecription } = practitioner_patient_profile
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    // Өвчтөний РД дугаараар цахим жор лавлаж байгаа
    if (patient && !helper.isEmptyObject(patient)) {
      const patientNationalId = patient.getNationalIdentificationNumber()
      return props
        .dispatch({
          type: 'app/getSavedPerscriptionByType',
          payload: {
            regNo: patientNationalId,
          },
        })
        .then(result => {
          const dataSource = []
          let tbltName
          result.map(element => {
            element.listReceiptTabletModel.map(list => {
              tbltName = list.tbltName
            })
            const row = {
              receiptNumber: element.receiptNumber,
              receiptDate: dateTime.toLocalDateTime(element.receiptDate),
              receiptExpireDate: dateTime.toLocalDateTime(
                element.receiptExpireDate
              ),
              receiptDiag: element.receiptDiag,
              statusStr: element.statusStr,
              receiptTypeStr: element.receiptTypeStr,
              tbltName: tbltName,
            }
            dataSource.push(row)
          })
          setDataSource(dataSource)
        })
        .catch(errorInfo => console.log(errorInfo))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedEprecription])

  return (
    <Table
      style={{ minHeight: '253px', border: '1px solid #bfbfbf' }}
      bordered={true}
      columns={columns}
      pagination={false}
      dataSource={dataSource}
      className={styles.headerTable}
    />
  )
}

SavedPrescriptionTable.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(SavedPrescriptionTable))
