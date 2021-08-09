import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Loader.less'
import { Trans } from '@lingui/react'

const Loader = ({ spinning = true, fullScreen }) => {
  return (
    <div
      className={classNames(styles.loader, {
        [styles.hidden]: !spinning,
        [styles.fullScreen]: fullScreen,
      })}
    >
      <div className={styles.warpper}>
        <div className={styles.inner} />
        <div className={styles.text}>
          <Trans id="Loading" />
        </div>
      </div>
    </div>
  )
}

Loader.propTypes = {
  spinning: PropTypes.bool,
  fullScreen: PropTypes.bool,
}

export default Loader
