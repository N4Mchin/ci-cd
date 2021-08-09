import React from 'react'
import styles from '../styles.less'
import PropTypes from 'prop-types'

const ModuleBox = ({ title, children, ...props }) => {
  return (
    <div
      style={{
        ...(props.stretch && { height: `100%` }),
      }}
    >
      <div
        style={
          props.centered && {
            display: 'flex',
            justifyContent: 'center',
          }
        }
      >
        <div className={styles.title}>{title}</div>
      </div>

      <div
        className={styles.moduleBox}
        {...props}
        style={{
          ...props.style,
          ...(props.stretch && { height: `calc(100% - 20px)` }),
          // {/* title height is 20px */}
        }}
      >
        {children}
      </div>
    </div>
  )
}

ModuleBox.propTypes = {
  stretch: PropTypes.bool,
}

export default ModuleBox
