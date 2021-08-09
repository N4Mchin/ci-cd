import { message } from 'antd'
import { Modal } from 'antd'
import React from 'react'

export default {
  onError(e, a, b, c) {
    console.error('ERROR:', b)
    // e.preventDefault()
    // message.error(e.message, e)

    let secondsToGo = 3
    const modal = Modal.error({
      content: (
        <div>
          <div className="bold" style={{ fontSize: '14px' }}>
            {b && b.key}
          </div>
          <div>{e.message}</div>
        </div>
      ),
    })
    const timer = setInterval(() => {
      secondsToGo -= 1
    }, 1000)
    setTimeout(() => {
      clearInterval(timer)
      modal.destroy()
    }, secondsToGo * 1000)
  },
}
