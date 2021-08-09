import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { resolveDisplay } from 'utils/valuesets'

const PrintInspectionNote = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [patientAbuseHabits, setPatientAbuseHabits] = useState()

  async function refresh() {
    setLoadingData(true)

    return props
      .dispatch({
        type:
          'practitioner_patient_profile/querySmokingDrinkingSubstanceAbuseHabits',
      })
      .then(abuseHabitsList => {
        if (!!abuseHabitsList) {
          setPatientAbuseHabits(abuseHabitsList)
        }
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(setLoadingData(false))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  return (
    <Row>
      <Row className="title">Хорт зуршлын асуумж</Row>
      {patientAbuseHabits ? (
        patientAbuseHabits.map(abuseHabitValue => {
          const {
            FindingRelatingToAlcoholDrinkingBehavior,
            DateOfStartedDrinkingAlcohol,
            LengthOfAlcoholUsingPeriod,
            AlcoholIntake,
            FindingOfTobaccoUseAndExposure,
            AgeAtStartingSmoking,
            NumberOfYearsSmoking,
            NumberOfCigarettes,
          } = abuseHabitValue

          const lengthOfAlcoholUsingUnit = LengthOfAlcoholUsingPeriod && (
            <Trans id="Month" />
          )

          const alcoholIntakeUnit = AlcoholIntake && (
            <Trans
              id={
                AlcoholIntake.valueType === 'day'
                  ? 'per day'
                  : AlcoholIntake.valueType === 'week'
                  ? 'per week'
                  : 'per month'
              }
            />
          )

          const numberOfYearsSmokingUnit = NumberOfYearsSmoking && (
            <Trans id={NumberOfYearsSmoking.valueType} />
          )

          const numberOfCigaretteUnit = NumberOfCigarettes && (
            <Trans
              id={
                NumberOfCigarettes.valueType === 'day'
                  ? 'per day'
                  : NumberOfCigarettes.valueType === 'week'
                  ? 'per week'
                  : 'per month'
              }
            />
          )

          const ageAtStartingSmokingUnit = AgeAtStartingSmoking && (
            <Trans id="Нас" />
          )

          return (
            <div>
              <Row style={{ padding: '4px' }}>
                <Col span={8}>
                  {FindingRelatingToAlcoholDrinkingBehavior && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(
                          FindingRelatingToAlcoholDrinkingBehavior,
                          i18n._language
                        )}
                        {':'}
                      </Col>
                      <Col>
                        {' '}
                        {FindingRelatingToAlcoholDrinkingBehavior.value &&
                          resolveDisplay(
                            FindingRelatingToAlcoholDrinkingBehavior.value,
                            i18n._language
                          )}
                      </Col>
                    </Row>
                  )}
                  {DateOfStartedDrinkingAlcohol && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(
                          DateOfStartedDrinkingAlcohol,
                          i18n._language
                        )}
                        {':'}
                      </Col>
                      <Col> {DateOfStartedDrinkingAlcohol.value}</Col>
                    </Row>
                  )}
                  {LengthOfAlcoholUsingPeriod && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(
                          LengthOfAlcoholUsingPeriod,
                          i18n._language
                        )}
                        {':'}
                      </Col>
                      <Col>
                        {' '}
                        {LengthOfAlcoholUsingPeriod.value}{' '}
                        {lengthOfAlcoholUsingUnit}
                      </Col>
                    </Row>
                  )}
                  {AlcoholIntake && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(AlcoholIntake, i18n._language)}
                        {':'}
                      </Col>
                      <Col>
                        {' '}
                        {alcoholIntakeUnit} {AlcoholIntake.value}
                      </Col>
                    </Row>
                  )}
                </Col>

                <Col span={8}>
                  {FindingOfTobaccoUseAndExposure && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(
                          FindingOfTobaccoUseAndExposure,
                          i18n._language
                        )}
                        {':'}
                      </Col>
                      <Col>
                        {' '}
                        {FindingOfTobaccoUseAndExposure.value &&
                          resolveDisplay(
                            FindingOfTobaccoUseAndExposure.value,
                            i18n._language
                          )}
                      </Col>
                    </Row>
                  )}
                  {AgeAtStartingSmoking && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(AgeAtStartingSmoking, i18n._language)}
                        {':'}
                      </Col>
                      <Col>
                        {' '}
                        {AgeAtStartingSmoking.value} {ageAtStartingSmokingUnit}
                      </Col>
                    </Row>
                  )}
                  {NumberOfYearsSmoking && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(NumberOfYearsSmoking, i18n._language)}
                        {':'}
                      </Col>
                      <Col>
                        {' '}
                        {NumberOfYearsSmoking.value} {numberOfYearsSmokingUnit}
                      </Col>
                    </Row>
                  )}
                  {NumberOfCigarettes && (
                    <Row type="flex" gutter={8}>
                      <Col>
                        {resolveDisplay(NumberOfCigarettes, i18n._language)}
                        {': '}
                      </Col>
                      <Col>
                        {' '}
                        {numberOfCigaretteUnit} {NumberOfCigarettes.value}
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
              <br />
            </div>
          )
        })
      ) : (
        <Row type="flex" gutter={8} style={{ padding: '4px' }}>
          <Col>Хорт зуршил:</Col>
          <Col>{i18n.t`No`}</Col>
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
