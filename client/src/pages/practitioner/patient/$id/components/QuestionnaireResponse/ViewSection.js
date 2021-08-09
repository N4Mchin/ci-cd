import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import * as dateTime from 'utils/datetime'
import { ModuleBox } from 'components'

const ViewSection = props => {
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    props
      .dispatch({
        type: 'practitioner_patient_profile/queryQuestionnaireResponse',
      })
      .then(result => {
        setDataSource(result)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const downloadBase64File = (base64Data, title) => {
    const downloadLink = document.createElement('a')
    downloadLink.href = base64Data
    downloadLink.download = title ? title : 'file'
    downloadLink.click()
  }

  const getValue = object => {
    const json = object.toJSON()
    const valueKey = Object.keys(json).find(
      key => key.startsWith('value') && json[key] !== undefined
    )

    if (valueKey === 'valueAttachment') {
      return (
        <Button
          onClick={() =>
            downloadBase64File(json[valueKey].data, json[valueKey].title)
          }
        >
          <Trans id="File download" />
        </Button>
      )
    } else {
      return json[valueKey]
    }
  }

  const showItems = itemArray => {
    return itemArray.map(item => {
      if (item.item) {
        return (
          <div style={{ marginLeft: '16px' }}>
            {item.linkId}. {item.text}
            <div style={{ marginLeft: '16px' }}>{showItems(item.item)}</div>
          </div>
        )
      } else {
        return (
          <div>
            {item.linkId}. {item.text}
            {item.answer && (
              <div style={{ marginLeft: '16px' }}>
                {item.answer.map(answerItem => (
                  <div>{getValue(answerItem)}</div>
                ))}
              </div>
            )}
          </div>
        )
      }
    })
  }
  return (
    <div>
      {dataSource &&
        dataSource.map(questionnaireResponse => {
          return (
            questionnaireResponse && (
              <ModuleBox
                title={
                  questionnaireResponse.authored &&
                  dateTime.toLocalDateTime(
                    questionnaireResponse.authored,
                    'yyyy-mm-dd'
                  )
                }
              >
                {showItems(questionnaireResponse.item)}
              </ModuleBox>
            )
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
