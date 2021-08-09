import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import * as helper from 'utils/helper'
import { resolveDisplay } from 'utils/valuesets'
import * as dateTime from 'utils/datetime'
const PrintInspectionNote = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedMedicationRequest, patient } = practitioner_patient_profile
  const [loadingData, setLoadingData] = useState(false)
  const [patientMedicationList, setPatientMedicationList] = useState()
  const [ePrescriptionData, setePrescriptionData] = useState()

  async function refresh() {
    setLoadingData(true)

    let patientNationalId
    if (!helper.isEmptyObject(patient)) {
      patientNationalId = patient.getNationalIdentificationNumber()
    }
    props
      .dispatch({
        type: 'app/getSavedPerscriptionByType',
        payload: {
          regNo: patientNationalId,
        },
      })
      .then(result => {
        let filterDate
        let tbltName
        filterDate = dateTime.getDate()

        const filteredResult = result.filter(
          element =>
            dateTime.toLocalDateTime(element.receiptDate, 'yyyy-mm-dd') ===
            filterDate
        )
        filteredResult.forEach(element => {
          element.listReceiptTabletModel.forEach(list => {
            tbltName = list.tbltName
          })

          const data = {
            receiptNumber: element.receiptNumber,
            receiptExpireDate: dateTime.toLocalDateTime(
              element.receiptExpireDate
            ),
            tbltName: tbltName,
          }
          setePrescriptionData(data)
        })
      })
      .catch(errorInfo => console.log(errorInfo))
    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryMedicationRequest',
        })
        .then(medicationRequestList => {
          if (!!medicationRequestList) {
            setPatientMedicationList(medicationRequestList)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(setLoadingData(false))
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.id, lastUpdatedMedicationRequest])

  return (
    <Row style={{ background: 'pink', padding: '8px' }}>
      <Row className="title">Эмчилгээ:</Row>
      {patientMedicationList ? (
        patientMedicationList.map(dataSourceValue => {
          const {
            note,
            dosageQuantity,
            dosageInstruction,
            initialFillDuration,
            timingRepeatFrequency,
          } = dataSourceValue

          const initialFillDurationUnit = initialFillDuration && (
            <Trans
              id={
                initialFillDuration.unit === 'd'
                  ? 'days'
                  : initialFillDuration.unit === 'wk'
                  ? 'week'
                  : 'month'
              }
            />
          )

          const repeatFrequency = timingRepeatFrequency && (
            <Trans
              id={
                timingRepeatFrequency.periodUnit === 'd'
                  ? 'per day'
                  : timingRepeatFrequency.periodUnit === 'wk'
                  ? 'per week'
                  : 'per month'
              }
            />
          )

          const dosageInstructionString = resolveDisplay(
            dosageInstruction,
            i18n._language
          )

          return (
            <div>
              <Row>
                <Col span={12}>RP :</Col>
                <Col span={12}>
                  {dataSourceValue.drugInformation &&
                    resolveDisplay(
                      dataSourceValue.drugInformation
                        .InternationalProprietaryName,
                      i18n._language
                    )}
                </Col>
              </Row>
              <Row>
                <Col span={12}>D.t.d.N :</Col>
                <Col span={12}>
                  {dataSourceValue.initialFillQuantity &&
                    ` ${dataSourceValue.initialFillQuantity}`}
                </Col>
              </Row>
              <Row>
                <Col span={12}>S :</Col>
                <Col span={12}>
                  {repeatFrequency && repeatFrequency}{' '}
                  {timingRepeatFrequency &&
                    `${timingRepeatFrequency.frequency} ` +
                      i18n.t`Occurence`.toLowerCase()}{' '}
                  {dosageQuantity &&
                    `${dosageQuantity} ` + i18n.t`Piece`.toLowerCase()}{' '}
                  {initialFillDuration && `${initialFillDuration.value} `}
                  {initialFillDurationUnit && initialFillDurationUnit}{' '}
                  {dosageInstructionString && dosageInstructionString}
                  {'. '}
                  {note && note}
                  {'.'}
                </Col>
              </Row>
              <br />
            </div>
          )
        })
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Эмчилгээ:</Col>
          <Col>{i18n.t`No`}</Col>
        </Row>
      )}

      {ePrescriptionData && (
        <Row className="title">
          Цахим жор:
          <Row type="flex" gutter={8} style={{ padding: '4px' }}>
            <Col>Жорын дугаар:</Col>
            <Col>{ePrescriptionData.receiptNumber}</Col>
          </Row>
          <Row type="flex" gutter={8} style={{ padding: '4px' }}>
            <Col>Хүчинтэй хугацаа:</Col>
            <Col>{ePrescriptionData.receiptExpireDate}</Col>
          </Row>
          <Row type="flex" gutter={8} style={{ padding: '4px' }}>
            <Col>Эмийн нэр:</Col>
            <Col>{ePrescriptionData.tbltName}</Col>
          </Row>
        </Row>
      )}
    </Row>
  )
}

PrintInspectionNote.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile }) => ({
  app,
  practitioner_patient_profile,
}))(withI18n()(PrintInspectionNote))
