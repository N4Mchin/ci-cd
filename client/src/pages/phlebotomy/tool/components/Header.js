import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../../styles.less'
import Tubes from '../../components/Tubes'
import Equipments from '../../components/Equipments'
import { Row, Col, Divider } from 'antd'
import { CustomIcon, DivInput } from 'components'

const Header = props => {
  const [equipmentsData, setEquipmentsData] = useState([])

  useEffect(() => {
    props
      .dispatch({
        type: 'phlebotomy/readEquipmentMaterials',
      })
      .then(data => setEquipmentsData(data))
      .catch(errorInfo => console.log(errorInfo))
  }, [])

  const muiltipleTools = [
    { productId: '555022', valueName: 'printSticker' },
    { productId: '555019', valueName: 'tighten' },
  ]

  let multipleToolsData = {}

  muiltipleTools.forEach(mName => {
    const multipleToolQuantity = equipmentsData.find(
      item => item.productId === mName.productId
    )
    multipleToolsData[mName.productId] =
      multipleToolQuantity && multipleToolQuantity.quantity
  })

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col md={24} lg={24} xl={20} xxl={20}>
          <Trans>
            <span style={{ fontSize: '10px' }} className="uppercase">
              Нэг удаагийн хэрэгсэл
            </span>
          </Trans>
          <Row gutter={16}>
            <Col lg={24} xl={13} xxl={13}>
              <div className={styles.tubeBox}>
                <Divider
                  style={{ 'background-color': '#E9E9E9', marginTop: '6px' }}
                />
                <Tubes materialRequired={equipmentsData} />
                <span style={{ fontSize: '10px', marginTop: '10px' }}>
                  <Trans id={'Vacutainer tube'} />
                </span>
              </div>
            </Col>
            <Col lg={24} xl={11} xxl={11}>
              <Divider
                style={{ 'background-color': '#E9E9E9', marginTop: '6px' }}
              />
              <Equipments materialRequired={equipmentsData} />
            </Col>
          </Row>
        </Col>
        <Col md={6} lg={6} xl={4} xxl={4}>
          <Trans>
            <span style={{ fontSize: '10px' }} className="uppercase">
              Олон удаагийн хэрэгсэл
            </span>
          </Trans>
          <Row>
            <Divider
              style={{ 'background-color': '#E9E9E9', marginTop: '6px' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <div style={{ display: 'grid', gridGap: '8px' }}>
                <DivInput
                  value={multipleToolsData && multipleToolsData['555022']}
                  style={{
                    width: '35px',
                    height: '25px',
                    justifySelf: 'center',
                  }}
                />
                <CustomIcon
                  type={'IconTowelPaper'}
                  style={{ fontSize: '45px' }}
                />
                <Col style={{ fontSize: '8px', justifySelf: 'center' }}>
                  <Trans id={'Принтерийн наалт'} />
                </Col>
              </div>
              <div style={{ display: 'grid', gridGap: '8px' }}>
                <DivInput
                  value={multipleToolsData && multipleToolsData['555019']}
                  style={{
                    width: '35px',
                    height: '25px',
                    justifySelf: 'center',
                  }}
                />
                <CustomIcon type={'IconTow'} style={{ fontSize: '45px' }} />
                <Col style={{ fontSize: '8px', justifySelf: 'center' }}>
                  <Trans id={'Чангалуур'} />
                </Col>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

Header.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ phlebotomy, loading }) => ({
  phlebotomy,
  loading,
}))(withI18n()(Header))
