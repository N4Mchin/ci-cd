import React from 'react'
import styles from '..//styles.less'
import { CustomIcon } from 'components'

const Tubes = props => {
  const { changingEquipmentsValue, materialRequired } = props

  let tubeData = {}

  if (materialRequired && materialRequired.length >= 12) {
    const tubeNames = [
      { productId: '555017', valueName: 'tubeGray' },
      { productId: '555018', valueName: 'tubeLightBlue' },
      { productId: '555016', valueName: 'tubeRed' },
      { productId: '555015', valueName: 'tubeMintGreen' },
      { productId: '555021', valueName: 'tubeYellow' },
      { productId: '555020', valueName: 'tubePurple' },
    ]

    tubeNames.forEach(tName => {
      const tubeQuantity = materialRequired.find(
        item => item.productId === tName.productId
      )
      tubeData[tName.productId] = tubeQuantity && tubeQuantity.quantity
    })
  } else {
    tubeData = { ...materialRequired }
  }

  if (!!changingEquipmentsValue) {
    Object.keys(changingEquipmentsValue).forEach(
      item => (tubeData[item] = tubeData[item] + changingEquipmentsValue[item])
    )
  }

  return (
    <div
      className={styles.check}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxTubes}>
          {tubeData && tubeData['555016']}
        </div>
        <CustomIcon type={'RedTube'} style={{ fontSize: '45px' }} />
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxTubes}>
          {tubeData && tubeData['555017']}
        </div>
        <CustomIcon type={'GrayTube'} style={{ fontSize: '45px' }} />
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxTubes}>
          {tubeData && tubeData['555021']}
        </div>
        <CustomIcon type={'YellowTube'} style={{ fontSize: '45px' }} />
      </div>

      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxTubes}>
          {tubeData && tubeData['555015']}
        </div>
        <CustomIcon type={'MintGreenTube'} style={{ fontSize: '45px' }} />
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxTubes}>
          {tubeData && tubeData['555020']}
        </div>
        <CustomIcon type={'PurpleTube'} style={{ fontSize: '45px' }} />
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxTubes}>
          {tubeData && tubeData['555018']}
        </div>
        <CustomIcon type={'LightBlueTube'} style={{ fontSize: '45px' }} />
      </div>
    </div>
  )
}

export default Tubes
