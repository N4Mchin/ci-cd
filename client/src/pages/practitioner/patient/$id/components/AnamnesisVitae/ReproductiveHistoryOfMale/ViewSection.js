import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Col, Row } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { isObject, isArray, orderBy } from 'utils/helper'
import styles from './../../../styles.less'

const TableRow = props => {
  const { dataSource, language } = props

  return (
    <div style={{ height: '100%', padding: '12px 0 12px 0' }}>
      {Object.values(dataSource).map((dataSourceValue, index) => {
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
              {isArray(dataSourceValue.value) &&
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
                })}
            </Col>
          </Row>
        )
      })}
    </div>
  )
}

const ViewSection = props => {
  const { i18n, app, practitioner_patient_profile } = props
  const { MaleReproductiveHistory } = app.FHIR_CODES.AnamnesisVitae.include
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [reproductiveHistory, setReproductiveHistory] = useState()

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

  async function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryReproductiveHistoryOfMale',
        })
        .then(historyOfReproductiveHistoryOfMale => {
          if (!!historyOfReproductiveHistoryOfMale) {
            setReproductiveHistory(historyOfReproductiveHistoryOfMale)
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
  }, [lastUpdatedAnamnesisVitae])

  const title = resolveDisplay(MaleReproductiveHistory, i18n._language)

  return (
    <div>
      <BorderCollapse
        displayName={title}
        bordered={true}
        disableCollapse={props.disableCollapse}
      >
        <div className={styles.cardContainer}>
          {reproductiveHistory &&
            reproductiveHistory.map(reproductiveHistoryValue => {
              return (
                <TableRow
                  dataSource={reproductiveHistoryValue}
                  language={i18n._language}
                />
              )
            })}
        </div>
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
