import React from 'react'
import { Button } from 'antd'
class CustomButton extends React.Component {
  render() {
    return <Button type={this.props.type}>{this.props.children}</Button>
  }
}
export default CustomButton
