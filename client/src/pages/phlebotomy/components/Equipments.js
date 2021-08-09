import React, { useState, useEffect } from 'react'
import { Trans } from '@lingui/react'
import { Col } from 'antd'
import styles from '..//styles.less'
import { CustomIcon } from 'components'

// import {
//   IconCotton,
//   IconRubber,
//   IconTissue,
//   IconNeedle,
//   IconBandAid,
// } from 'components'

// import * as myComponents from 'components/EquipmentIcons'

const Equipments = props => {
  const { materialRequired } = props
  let equipmentData = {}

  //Дахин бараа нэмж бүртгэх үед productId-г
  //бүртгэлийн үед оруулсан ID гаар солих шаардлагатай

  if (materialRequired && materialRequired.length >= 12) {
    const equipmentNames = [
      { productId: '555023', valueName: 'cottonBud' },
      { productId: '555024', valueName: 'alcoholPad' },
      { productId: '555025', valueName: 'glove' },
      { productId: '555026', valueName: 'redVacutainer' },
      { productId: '555027', valueName: 'adhesiveBandage' },
    ]

    equipmentNames.forEach(eName => {
      const equipmentQuantity = materialRequired.find(
        item => item.productId === eName.productId
      )
      equipmentData[eName.productId] =
        equipmentQuantity && equipmentQuantity.quantity
    })
  } else {
    equipmentData = materialRequired
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxEquipment}>
          {equipmentData && equipmentData['555023']}
        </div>
        <CustomIcon type={'IconCotton'} style={{ fontSize: '40px' }} />
        {/* <IconCotton style={{ fontSize: '40px' }} /> */}
        <Col style={{ fontSize: '8px', justifySelf: 'center' }}>
          <Trans id={'Cotton bud'} />
        </Col>
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxEquipment}>
          {equipmentData && equipmentData['555025']}
        </div>
        {/* <IconRubber style={{ fontSize: '40px' }} /> */}
        <CustomIcon type={'IconRubber'} style={{ fontSize: '40px' }} />
        <Col style={{ fontSize: '8px', justifySelf: 'center' }}>
          <Trans id={'Glove'} />
        </Col>
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxEquipment}>
          {equipmentData && equipmentData['555024']}
        </div>
        {/* <IconTissue style={{ fontSize: '40px' }} /> */}
        <CustomIcon type={'IconTissue'} style={{ fontSize: '40px' }} />
        <Col style={{ fontSize: '8px', justifySelf: 'center' }}>
          <Trans id={'Tissue'} />
        </Col>
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxEquipment}>
          {equipmentData && equipmentData['555026']}
        </div>
        {/* <IconNeedle style={{ fontSize: '40px' }} /> */}
        <CustomIcon type={'IconNeedle'} style={{ fontSize: '40px' }} />
        <Col style={{ fontSize: '8px', justifySelf: 'center' }}>
          <Trans id={'Vacutainer needle'} />
        </Col>
      </div>
      <div style={{ display: 'grid', gridGap: '8px', justifyItems: 'center' }}>
        <div className={styles.numberBoxEquipment}>
          {equipmentData && equipmentData['555027']}
        </div>
        {/* <IconBandAid style={{ fontSize: '40px' }} /> */}
        <CustomIcon type={'IconBandAid'} style={{ fontSize: '40px' }} />
        <Col style={{ fontSize: '8px', justifySelf: 'center' }}>
          <Trans id={'Bearbeitet'} />
        </Col>
      </div>
    </div>
  )
}

export default Equipments
