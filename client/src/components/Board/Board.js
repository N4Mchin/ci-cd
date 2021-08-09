import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Loader from '../Loader/Loader'
import styles from './Board.less'

export default class Board extends Component {
  render() {
    const {
      className,
      children,
      loading = false,
      inner = false,
      ...others
    } = this.props
    const loadingStyle = {
      overflow: 'hidden',
    }
    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
        })}
        style={loading ? loadingStyle : null}
        {...others}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}

Board.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  inner: PropTypes.bool,
}
