import React from 'react'
import { Trans, withI18n } from '@lingui/react'
import { Descriptions, Row } from 'antd'
import { toLocalDateTime } from 'utils/datetime'
import { connect } from 'dva'
import * as helper from 'utils/helper'

const OrderInfo = props => {
  const { patient, specimen } = props

  const latestSpecimen = helper.isArray(specimen) && specimen.slice(-1)[0]
  const sampleCollectionDateTime =
    latestSpecimen &&
    latestSpecimen.collection &&
    toLocalDateTime(latestSpecimen.collection.collectedDateTime)

  const sampleIdentifier =
    latestSpecimen &&
    latestSpecimen.accessionIdentifier.system ===
      props.app.FHIR_CODES.Identifiers.LiverCenter.Specimen.system &&
    latestSpecimen.accessionIdentifier.value

  const name = patient.getOfficialNameString()
  const patientNumber = patient._getBarcode()
  const patientPhoneNumber = patient.getMobilePhones()
  const patientNationalIdentificationNumer = patient.getNationalIdentificationNumber()
  const age = helper.calculateAgeFromBirthDate(patient.birthDate)

  return (
    <div>
      <Row style={{ margin: '10px 0' }}>
        <span className="title bold" style={{ fontSize: '14px' }}>
          <Trans id="Order Info" />
        </span>
      </Row>

      <Descriptions>
        <Descriptions.Item label="Үйлчлүүлэгчийн дугаар">
          {patientNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Үйлчлүүлэгчийн овог, нэр">
          {name}
        </Descriptions.Item>
        <Descriptions.Item label="Үйлчлүүлэгчийн РД">
          {patientNationalIdentificationNumer}
        </Descriptions.Item>
        <Descriptions.Item label="Нас">{age}</Descriptions.Item>
        <Descriptions.Item label="Утасны дугаар">
          {patientPhoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Сорьцийн дугаар">
          <span className="bold">{sampleIdentifier}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Сорьц авсан огноо">
          {sampleCollectionDateTime}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default connect(({ app }) => ({
  app,
}))(withI18n()(OrderInfo))
