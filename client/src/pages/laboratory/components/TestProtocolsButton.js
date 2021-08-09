import React, { useState } from 'react'
import { Button } from 'antd'
import styles from './styles.less'
import { Trans, withI18n } from '@lingui/react'

const TestProtocolsButton = props => {
  const { buttonName, onClick } = props
  const [clickedButton, setClickedButton] = useState(false)

  return (
    <Button
      className={styles.testProtocolsButton}
      onClick={onClick}
      style={{
        backgroundColor: `${clickedButton === 'protocol' ? '#004d40' : ''}`,
        color: `${clickedButton === 'protocol' ? 'white' : ''}`,
      }}
    >
      <Trans id={buttonName} />
    </Button>
  )
}
export default withI18n()(TestProtocolsButton)
