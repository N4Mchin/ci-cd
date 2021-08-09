import React, { Component } from 'react'
import { DatePicker } from 'antd'

export default class extends Component {
  state = {
    isopen: false,
    time: null,
  }

  render() {
    const { isopen, time } = this.state
    return (
      <div>
        <DatePicker
          value={time}
          open={isopen}
          mode="year"
          placeholder="请选择年份"
          format="YYYY"
          onOpenChange={status => {
            if (status) {
              this.setState({ isopen: true })
            } else {
              this.setState({ isopen: false })
            }
          }}
          onPanelChange={v => {
            console.log(v)
            this.setState({
              time: v,
              isopen: false,
            })
          }}
        />
        onChange=
        {() => {
          this.setState({ time: null })
        }}
      </div>
    )
  }
}
