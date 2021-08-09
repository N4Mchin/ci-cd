import React from 'react'
import { Trans, withI18n } from '@lingui/react'
import { WarningOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { RESULT_STATUS } from 'utils/constant'
const ItemResultBox = props => {
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

  if (status === RESULT_STATUS.notAvailable) {
    displayText = 'TestList_EnterResult'
    className = 'button-red'
  } else if (status === RESULT_STATUS.entered) {
    displayText = value ? value : 'Result Ready'
    className = 'button-orange'
  } else if (status === RESULT_STATUS.verified) {
    displayText = value ? value : 'Verified'
    className = 'button-green'
    style.color = '#004D40'
  } else if (status === RESULT_STATUS.reVerificationRequired) {
    displayText = value ? value : 'Result Ready'
    className = 'button-green'
    style.color = '#004D40'
  }

  if (others.disabled) {
    style.background = '#dadada'
    delete style.color
  }

  return (
    <Button style={style} className={className} {...others} onClick={onClick}>
      <div>
        <Trans id={displayText && displayText.toString()} />
        {status === RESULT_STATUS.reVerificationRequired && (
          <>
            &nbsp;
            <WarningOutlined style={{ fontSize: '16px', color: '#CE423F' }} />
          </>
        )}
      </div>
    </Button>
  )
}
export default withI18n()(ItemResultBox)
