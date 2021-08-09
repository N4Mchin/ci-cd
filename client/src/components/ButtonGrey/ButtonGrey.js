import React from 'react'
import { Button } from 'antd'
import styles from '../styles.less'
import classNames from 'classnames'

const ButtonGrey = props => {
  const { children, className, ...others } = props
  return (
    <Button className={classNames(styles.ButtonGrey, className)} {...others}>
      {children}
    </Button>
  )
}
export default ButtonGrey
