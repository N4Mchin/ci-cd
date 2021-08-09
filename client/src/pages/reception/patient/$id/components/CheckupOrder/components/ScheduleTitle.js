import React from 'react'

const ScheduleTitle = props => {
  return (
    <div
      style={{
        borderLeft: '1px solid #c9c9c9',
        minHeight: '64px',
        margin: '4xp',
        padding: '4px',
      }}
    >
      {props.children}
    </div>
  )
}

export default ScheduleTitle
