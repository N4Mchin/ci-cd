import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Table, Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'
import styles from './../../styles.less'

const ViewSection = props => {
  const { practitioner_patient_profile, phlebotomy, loading, i18n } = props
  const { lastUpdatedMedicationRequest } = practitioner_patient_profile

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

  const columns = [
    {
      title: i18n.t`Date`,
      dataIndex: 'date',
      key: 'date',
      // render: (value, row, index) => {
      //   const obj = {
      //     children: value,
      //     props: {},
      //   }
      //   if (index === 0) {
      //     obj.props.rowSpan = 7
      //   } else {
      //     obj.props.rowSpan = 0
      //   }
      //   return obj
      // },
    },
    {
      title: i18n.t`Questions`,
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: i18n.t`Answers`,
      dataIndex: 'answer',
      key: 'answer',
    },
  ]

  const [loadingData, setLoadingData] = useState(false)
  const [patientMedicationList, setPatientMedicationList] = useState()

  async function refresh() {
    setLoadingData(true)
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
  }, [lastUpdatedMedicationRequest])

  const dataSource = []

  patientMedicationList &&
    patientMedicationList.forEach((listItem, index) => {
      dataSource.push(
        {
          key: String(index + 1),
          date: (
            <div style={{ textAlign: 'center' }}>
              {listItem.recordedDate}
              <br />
              {listItem.asserter}
            </div>
          ),
          question: (
            <div>
              <Row
                className="bold"
                gutter={[0, 8]}
                style={{ textAlign: 'center' }}
              >
                <Col>
                  <Trans id={'Medicaton name, Form, Dose'} />
                </Col>
                <Col>
                  <Trans id={'International name'} />
                </Col>
                {listItem.initialFillQuantity && (
                  <Col>
                    <Trans id={'Total quantity'} />
                  </Col>
                )}
                {listItem.dosageInstruction && (
                  <Col>
                    <Trans id={'Route of administration'} />
                  </Col>
                )}
                {listItem.timingRepeatFrequency && (
                  <Col>
                    {`1 ${listItem.timingRepeatFrequency.periodUnit} давтамж`}
                  </Col>
                )}
                {listItem.dosageQuantity && (
                  <Col>{i18n.t`Per administration`}</Col>
                )}
                {listItem.initialFillDuration && (
                  <Col>
                    <Trans id={'Effective peroid'} />
                  </Col>
                )}
                {listItem.note && <Col>{i18n.t`Note`}</Col>}
              </Row>
            </div>
          ),
          answer: (
            <div>
              <Row
                className="bold"
                gutter={[0, 8]}
                style={{ textAlign: 'center' }}
              >
                {listItem.drugInformation ? (
                  <>
                    <Col>
                      {resolveDisplay(
                        listItem.drugInformation.ProprietaryName,
                        i18n._language
                      ) +
                        ', ' +
                        resolveDisplay(
                          listItem.drugInformation.DrugType,
                          i18n._languages
                        ) +
                        ', ' +
                        listItem.drugInformation.Dosage}
                    </Col>
                    <Col>
                      {resolveDisplay(
                        listItem.drugInformation.InternationalProprietaryName,
                        i18n._language
                      )}
                    </Col>
                  </>
                ) : (
                  <Col>
                    {listItem.medicationCodeableConcept &&
                      listItem.medicationCodeableConcept.text}
                  </Col>
                )}

                {listItem.initialFillQuantity && (
                  <Col>{listItem.initialFillQuantity}</Col>
                )}
                {listItem.dosageInstruction && (
                  <Col>
                    {resolveDisplay(listItem.dosageInstruction, i18n._language)}
                  </Col>
                )}
                {listItem.timingRepeatFrequency && (
                  <Col>
                    {`${listItem.timingRepeatFrequency.periodUnit} ${listItem.timingRepeatFrequency.frequency} удаа`}
                  </Col>
                )}
                {listItem.dosageQuantity && (
                  <Col>{`${listItem.dosageQuantity} ширхэгээр`}</Col>
                )}
                {listItem.initialFillDuration && (
                  <Col>
                    {listItem.initialFillDuration.value +
                      ' ' +
                      i18n.t`${listItem.initialFillDuration.unit}`}
                  </Col>
                )}

                {listItem.note && <Col>{listItem.note}</Col>}
              </Row>
            </div>
          ),
        }
        // {
        //   key: '1',
        //   date: (
        //     <div>
        //       {listItem.recordedDate}
        //       <br />
        //       {listItem.asserter}
        //     </div>
        //   ),
        //   question: 'Эмийн нэр, хэлбэр, тун',
        //   // answer: 'Нефидипин, Шахмал, 10мг',
        //   answer:
        //     resolveDisplay(
        //       listItem.drugInformation.ProprietaryName,
        //       i18n._language
        //     ) +
        //     ', ' +
        //     resolveDisplay(listItem.drugInformation.DrugType, i18n._languages) +
        //     ', ' +
        //     listItem.drugInformation.Dosage,
        // },
        // {
        //   key: '2',
        //   question: 'Нийт тоо хэмжээ',
        //   answer: listItem.initialFillQuantity,
        // },
        // {
        //   key: '3',
        //   question: 'Эмийг хэрэглэх арга',
        //   answer: resolveDisplay(listItem.dosageInstruction, i18n._language),
        // },
        // {
        //   key: '4',
        //   question: `1 ${listItem.timingRepeatFrequency.periodUnit} давтамж`,
        //   answer: `${listItem.timingRepeatFrequency.periodUnit} ${listItem.timingRepeatFrequency.frequency} удаа`,
        // },
        // {
        //   key: '5',
        //   question: '1 удаа уухдаа',
        //   answer: `${listItem.dosageQuantity} ширхэгээр`,
        // },
        // {
        //   key: '6',
        //   question: 'Эмийг хэрэглэх хугацаа',
        //   answer:
        //     listItem.initialFillDuration.value +
        //     ' ' +
        //     i18n.t`${listItem.initialFillDuration.unit}`,
        // },
        // {
        //   key: '7',
        //   question: 'Тэмдэглэл',
        //   answer: listItem.note,
        // }
      )
    })

  console.log(patientMedicationList)

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flexGrow: 2,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        ></div>

        <div
          style={{
            flexGrow: 3,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          <Trans id={'Medication name'} />
        </div>
        <div
          style={{
            flexGrow: 1,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          <Trans id={'Form'} />
        </div>
        <div
          style={{
            flexGrow: 0.5,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          <Trans id={'Dose'} />
        </div>
        <div
          style={{
            flexGrow: 0.5,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          <Trans id={'Total quantity'} />
        </div>
        <div
          style={{
            flexGrow: 1,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          <Trans id={'Route of administration'} />
        </div>
        <div
          style={{
            flexGrow: 1,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          {i18n.t`Frequency of use`}
        </div>
        <div
          style={{
            flexGrow: 0.5,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          {i18n.t`Per administration`}
        </div>
        <div
          style={{
            flexGrow: 0.5,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >
          <Trans id={'Effective peroid'} />
        </div>
        <div
          style={{
            flexGrow: 1,
            borderRight: '0.5px solid black',
          }}
          className={styles.divTableItemLabel}
        >{i18n.t`Note`}</div>
      </div>
      {patientMedicationList &&
        patientMedicationList.map(medicationValue => {
          const {
            note,
            dosageQuantity,
            drugInformation,
            dosageInstruction,
            initialFillQuantity,
            initialFillDuration,
            timingRepeatFrequency,
          } = medicationValue

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

          return (
            <div>
              <div style={{ display: 'flex' }}>
                <div
                  style={{ flexGrow: 2 }}
                  className={styles.divTableItemContents}
                >
                  {medicationValue.recordedDate}
                  <br />
                  {medicationValue.asserter}
                </div>
                <div
                  style={{ flexGrow: 3 }}
                  className={styles.divTableItemContents}
                >
                  {drugInformation
                    ? resolveDisplay(
                        drugInformation.ProprietaryName,
                        i18n._language
                      ) +
                      ` (${resolveDisplay(
                        drugInformation.InternationalProprietaryName,
                        i18n._language
                      )})`
                    : medicationValue.medicationCodeableConcept &&
                      medicationValue.medicationCodeableConcept.text}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {drugInformation && drugInformation.DrugType
                    ? resolveDisplay(drugInformation.DrugType, i18n._languages)
                    : '-'}
                </div>
                <div
                  style={{ flexGrow: 0.5 }}
                  className={styles.divTableItemContents}
                >
                  {drugInformation && drugInformation.Dosage
                    ? drugInformation.Dosage
                    : '-'}
                </div>
                <div
                  style={{ flexGrow: 0.5 }}
                  className={styles.divTableItemContents}
                >
                  {initialFillQuantity ? initialFillQuantity : '-'}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {dosageInstruction
                    ? resolveDisplay(dosageInstruction, i18n._language)
                    : '-'}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {timingRepeatFrequency ? (
                    <>
                      {repeatFrequency && repeatFrequency}{' '}
                      {`${timingRepeatFrequency &&
                        timingRepeatFrequency.frequency} ` +
                        i18n.t`Occurence`.toLowerCase()}
                    </>
                  ) : (
                    '-'
                  )}
                </div>
                <div
                  style={{ flexGrow: 0.5 }}
                  className={styles.divTableItemContents}
                >
                  {dosageQuantity ? `${dosageQuantity} ширхэгээр` : '-'}
                </div>
                <div
                  style={{ flexGrow: 0.5 }}
                  className={styles.divTableItemContents}
                >
                  {initialFillDuration && initialFillDuration.value}{' '}
                  {initialFillDurationUnit ? initialFillDurationUnit : ''}
                </div>
                <div
                  style={{ flexGrow: 1 }}
                  className={styles.divTableItemContents}
                >
                  {note ? note : '-'}
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

ViewSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(ViewSection))
