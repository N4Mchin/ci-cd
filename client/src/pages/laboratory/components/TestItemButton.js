import React from 'react'
import { Button } from 'antd'

const TestItemButton = props => {
  const { background, children, ...others } = props

  const style = {
    textTransform: 'uppercase',
    border: 0,
    color: '#FFFFFF',
  }
  if (background === 'red') {
    style.backgroundColor = '#db1b44'
  } else if (background === 'green') {
    style.backgroundColor = '#5BE49F'
  } else if (background === 'gray') {
    style.backgroundColor = '#555'
  }

  return (
    <Button style={style} {...others}>
      {children}
    </Button>
  )
}
export default TestItemButton
