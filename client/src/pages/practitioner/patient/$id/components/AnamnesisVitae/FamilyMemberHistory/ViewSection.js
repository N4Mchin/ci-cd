import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { BorderCollapse } from 'components'
import styles from './../../../styles.less'
import { resolveDisplay } from 'utils/valuesets'

const columns = [
  {
    title: <Trans id="Who you are" />,
    dataIndex: 'familyMember',
    key: 'familyMember',
  },
  {
    title: <Trans id="What disease did you get?" />,
    dataIndex: 'diagnose',
    key: 'diagnose',
  },
  {
    title: <Trans id="How old were you when you got sick?" />,
    dataIndex: 'onsetAge',
    key: 'onsetAge',
  },
  {
    title: <Trans id="AdditionalInformation" />,
    dataIndex: 'note',
    key: 'note',
  },
]

const ViewSection = props => {
  const { i18n, practitioner_patient_profile } = props
  const { lastUpdatedAnamnesisVitae } = practitioner_patient_profile

  const [loadingData, setLoadingData] = useState(false)
  const [dataSource, setDataSource] = useState([])
  function refresh() {
    setLoadingData(true)

    return (
      props
        .dispatch({
          type: 'practitioner_patient_profile/queryFamilyMemberHistory',
        })
        .then(familyMemberHistoryList => {
          if (!!familyMemberHistoryList) {
            const newDataSource = []

            familyMemberHistoryList.forEach((memberHistoryItem, index) => {
              newDataSource.push({
                key: String(index + 1),
                familyMember: (
                  <div style={{ textAlign: 'center' }}>
                    {resolveDisplay(
                      memberHistoryItem.familyMember,
                      i18n._language
                    )}
                  </div>
                ),
                diagnose: (
                  <div style={{ textAlign: 'center' }}>
                    {memberHistoryItem.diagnosis}
                  </div>
                ),
                onsetAge: (
                  <div style={{ textAlign: 'center' }}>
                    {memberHistoryItem.onsetAge}
                  </div>
                ),
                note: (
                  <div style={{ textAlign: 'center' }}>
                    {memberHistoryItem.note}
                  </div>
                ),
              })
            })

            setDataSource(newDataSource)
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

  const title = <Trans id="Family member history" />

  return (
    <div>
      <BorderCollapse
        displayName={title}
        bordered={true}
        disableCollapse={props.disableCollapse}
      >
        <div className={styles.cardContainer}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            className={styles.diagnoseTable}
            loading={loadingData}
          />
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
