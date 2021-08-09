import React from 'react'
import { Trans, withI18n } from '@lingui/react'
import { WarningOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const TestItemResultBox = props => {
  const {
    background,
    status,
    value,
    failed,
    onClick,
    hasServiceRequest,
    containsCancelledObservation,
    hadContainedCancelledObservation,
    ...others
  } = props

  const style = {
    textTransform: 'uppercase',
    border: 0,
    height: '32px',
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
  }

  let displayText = ''
  let className = ''

  if (!hasServiceRequest) {
    return <></>
  }

  if (onClick) {
    // button

    if (failed) {
      displayText = value
      className = 'button-dark-gray'
    } else {
      if (!status || status === 'registered') {
        displayText = 'TestList_EnterResult'
        className = 'button-red'
      } else if (status === 'preliminary' && containsCancelledObservation) {
        displayText = value ? value : 'Result Ready'
        className = 'button-green'
        style.color = '#004D40'
      } else if (status === 'preliminary') {
        displayText = value ? value : 'Result Ready'
        className = 'button-orange'
      } else if (status === 'cancelled') {
        displayText = value
        className = 'button-green'
      } else if (status === 'final') {
        displayText = value ? value : 'Verified'
        className = 'button-green'
        style.color = '#004D40'
      }
    }

    return (
      <Button style={style} className={className} {...others} onClick={onClick}>
        <div>
          <Trans id={displayText && displayText.toString()} />
          {status === 'entered-in-error' && (
            <>
              &nbsp;&nbsp;
              <WarningOutlined style={{ fontSize: '18px', color: '#CE423F' }} />
            </>
          )}
        </div>
      </Button>
    )
  } else {
    // div

    if (failed) {
      displayText = value
      className = 'test-result-gray'
    } else {
      if (!status || status === 'registered') {
        displayText = 'TestList_EnterResult'
        className = 'test-result-red'
      } else if (status === 'preliminary' && containsCancelledObservation) {
        displayText = value ? value : 'Result Ready'
        className = 'test-result-green'
        style.color = '#004D40'
      } else if (status === 'preliminary') {
        displayText = value ? value : 'Result Ready'
        className = 'test-result-orange'
      } else if (status === 'cancelled') {
        displayText = value
        className = 'test-result-green'
      } else if (status === 'final') {
        displayText = value ? value : 'Verified'
        className = 'test-result-green'
        style.color = '#004D40'
      }
    }

    return (
      <div style={style} className={className} {...others}>
        <div>
          <Trans id={displayText && displayText.toString()} />

          {containsCancelledObservation && (
            <div>
              &nbsp;&nbsp;
              <WarningOutlined style={{ fontSize: '16px', color: '#CE423F' }} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default withI18n()(TestItemResultBox)
