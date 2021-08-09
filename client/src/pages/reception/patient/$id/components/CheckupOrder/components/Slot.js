import React from 'react'
import { Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'

const Slot = props => {
  const { slot } = props

  const onButtonClick = value => {
    console.log('valueeeeee', value)
    props.onBook(value)
  }

  return (
    <div style={{ background: '#ddd' }}>
      {slot && (
        <Button
          className={props.highlight && 'button-red'}
          type={slot.status === 'busy' && 'primary'}
          onClick={() => onButtonClick(slot)}
          disabled={!slot}
          block
        >
          {slot && slot.status}
          {/* {slot && toLocalDateTime(slot.start, 'hh:mm')} */}
        </Button>
      )}
    </div>
  )
}

export default withI18n()(Slot)
