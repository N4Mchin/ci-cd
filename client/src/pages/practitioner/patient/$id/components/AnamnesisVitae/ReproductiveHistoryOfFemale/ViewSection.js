import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Row, Skeleton } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { isObject, isArray, orderBy } from 'utils/helper'
import styles from './../../../styles.less'

const TableRow = props => {
  const { dataSource, language, i18n } = props

  return (
    <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
      {orderBy(Object.values(dataSource), 'reproductiveItemIndex').map(
        (dataSourceValue, index) => {
          const backgroundColor =
            parseInt(index) % 2 === 0 ? '#e5e5e9' : '#f5f5f5'

          return (
            <Row>
              <Col span={12}>
                <div
                  className={styles.thirdField}
                  style={{ background: backgroundColor }}
                >
                  {resolveDisplay(dataSourceValue, language)}
                </div>
              </Col>
              <Col span={12}>
                {isArray(dataSourceValue.value) ? (
                  dataSourceValue.value.map(dataSourceItem => {
                    let code
                    let text

                    if (isObject(dataSourceItem.value)) {
                      code = dataSourceItem.value
                      text = dataSourceItem.text
                    } else {
                      code = dataSourceItem
                    }

                    const divName = resolveDisplay(code, language)

                    return (
                      <div
                        className={styles.thirdField}
                        style={{ background: backgroundColor }}
                      >
                        {divName ? divName : code}
                        {text && ` (${text})`}
                      </div>
                    )
                  })
                ) : (
                  <div
                    className={styles.thirdField}
                    style={{ background: backgroundColor }}
                  >
                    {typeof dataSourceValue.value === 'boolean'
                      ? dataSourceValue.value
                        ? i18n.t`Yes`
                        : i18n.t`No`
                      : dataSourceValue.value}
                    {dataSourceValue.valueType && (
                      <>
                        &nbsp;
                        <Trans id={dataSourceValue.valueType} />
                      </>
                    )}
                  </div>
                )}
              </Col>
            </Row>
          )
        }
      )}
    </div>
  )
}

const ViewSection = props => {
  const { i18n, app, practitioner_patient_profile } = props
  const { FemaleReproductiveHistory } = app.FHIR_CODES.AnamnesisVitae.include
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [reproductiveHistory, setReproductiveHistory] = useState()

  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryReproductiveHistoryOfFemale',
        })
        .then(historyOfReproductiveHistoryOfFemale => {
          if (!!historyOfReproductiveHistoryOfFemale) {
            console.log(historyOfReproductiveHistoryOfFemale)
            setReproductiveHistory(historyOfReproductiveHistoryOfFemale)
          }
        })
        // eslint-disable-next-line no-console
        .catch(errorInfo => console.log(errorInfo))
        .finally(() => setLoadingData(false))
    )
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdatedAnamnesisVitae])

  const title = resolveDisplay(FemaleReproductiveHistory, i18n._language)

  return (
    <div>
      <BorderCollapse
        displayName={title}
        bordered={true}
        disableCollapse={props.disableCollapse}
      >
        <Skeleton loading={loadingData} active paragraph={{ rows: 3 }}>
          <div className={styles.cardContainer}>
            {reproductiveHistory &&
              reproductiveHistory.map(reproductiveHistoryValue => {
                return (
                  <TableRow
                    dataSource={reproductiveHistoryValue}
                    language={i18n._language}
                    i18n={i18n}
                  />
                )
              })}
          </div>
        </Skeleton>
      </BorderCollapse>
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
