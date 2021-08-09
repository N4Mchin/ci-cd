import React from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import ScheduleTitle from './ScheduleTitle'

const Period = props => {
  return (
    <div>
      <ScheduleTitle>
        <Trans id={props.title} />
      </ScheduleTitle>
      {props.periods &&
        props.periods.map(p => {
          return (
            <div
              style={{
                height: '32px',
                width: '100px',
                padding: '8px',
                textAlign: 'center',
                borderTop: '0.5px solid #c9c9c9',
              }}
            >
              {p.start}-{p.end}
            </div>
          )
        })}
    </div>
  )
}

export default withI18n()(Period)
