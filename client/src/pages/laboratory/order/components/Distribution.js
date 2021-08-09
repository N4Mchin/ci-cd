import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Button, Card, Row, Col, Icon } from 'antd'

import { PlusOutlined } from '@ant-design/icons'

const Distribution = ({ dispatch, laboratory_order, i18n }) => {
  const distributerList = []
  return (
    <div style={{ marginTop: '20px' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'stretch',
        }}
      >
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            style={{
              border: '1px solid #F44336',
            }}
          >
            <div
              style={{
                background: '#F44336',
                padding: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              ИЛДЭНГҮН ХОШУУ ХХК
            </div>
            <div>
              <Icon
                type="phone"
                style={{ margin: '8px', fontSize: '12px', color: '#F44336' }}
                theme="outlined"
              />
              9982-8776, 7013-2142
            </div>
            <div>
              <Icon
                type="mail"
                style={{ margin: '8px', fontSize: '12px', color: '#F44336' }}
                theme="outlined"
              />
              info@ildengun.mn
            </div>
            <div>
              <Icon
                type="environment"
                style={{ margin: '8px', fontSize: '12px', color: '#F44336' }}
                theme="outlined"
              />{' '}
              <span> Баянзүрх дүүрэг, ХӨСҮТ Амбулатори 4 давхар</span>
            </div>
          </div>
        </div>
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            style={{
              border: '1px solid #096DD9',
            }}
          >
            <div
              style={{
                background: '#096DD9',
                padding: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              МОНГОЛ ФАРМ ХХК
            </div>
            <div>
              <Icon
                type="phone"
                style={{ margin: '8px', fontSize: '12px', color: '#096DD9' }}
                theme="outlined"
              />{' '}
              9982-8776, 7013-2142
            </div>
            <div>
              <Icon
                type="mail"
                style={{ margin: '8px', fontSize: '12px', color: '#096DD9' }}
                theme="outlined"
              />{' '}
              info@ildengun.mn
            </div>
            <div>
              <Icon
                type="environment"
                style={{ margin: '8px', fontSize: '12px', color: '#096DD9' }}
                theme="outlined"
              />{' '}
              <span> Баянзүрх дүүрэг, ХӨСҮТ Амбулатори 4 давхар</span>
            </div>
          </div>
        </div>
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            span={6}
            style={{
              border: '1px solid #389E0D',
            }}
          >
            <div
              style={{
                background: '#389E0D',
                padding: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              ПРОЛИАНС ХХК
            </div>
            <div>
              <Icon
                type="phone"
                style={{ margin: '8px', fontSize: '12px', color: '#389E0D' }}
                theme="outlined"
              />{' '}
              9982-8776, 7013-2142
            </div>
            <div>
              <Icon
                type="mail"
                style={{ margin: '8px', fontSize: '12px', color: '#389E0D' }}
                theme="outlined"
              />{' '}
              info@ildengun.mn
            </div>
            <div>
              <Icon
                type="environment"
                style={{ margin: '8px', fontSize: '12px', color: '#389E0D' }}
                theme="outlined"
              />{' '}
              <span> Баянзүрх дүүрэг, ХӨСҮТ Амбулатори 4 давхар</span>
            </div>
          </div>
        </div>
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            span={6}
            style={{
              border: '1px solid #EB2F96',
            }}
          >
            <div
              style={{
                width: '100%',
                background: '#EB2F96',
                padding: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              ЭЛЕМЕНТ ХХК
            </div>
            <div>
              <Icon
                type="phone"
                style={{ margin: '8px', fontSize: '12px', color: '#EB2F96' }}
                theme="outlined"
              />{' '}
              9982-8776, 7013-2142
            </div>
            <div>
              <Icon
                type="mail"
                style={{ margin: '8px', fontSize: '12px', color: '#EB2F96' }}
                theme="outlined"
              />{' '}
              info@ildengun.mn
            </div>
            <div>
              <Icon
                type="environment"
                style={{ margin: '8px', fontSize: '12px', color: '#EB2F96' }}
                theme="outlined"
              />{' '}
              <span> Баянзүрх дүүрэг, ХӨСҮТ Амбулатори 4 давхар</span>
            </div>
          </div>
        </div>
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            span={6}
            style={{
              border: '1px solid #722ED1',
            }}
          >
            <div
              style={{
                width: '100%',
                background: '#722ED1',
                padding: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              ГЛОБАЛ КОМУНИКЕШН ХХК
            </div>
            <div>
              <Icon
                type="phone"
                style={{ margin: '8px', fontSize: '12px', color: '#722ED1' }}
                theme="outlined"
              />{' '}
              9982-8776, 7013-2142
            </div>
            <div>
              <Icon
                type="mail"
                style={{ margin: '8px', fontSize: '12px', color: '#722ED1' }}
                theme="outlined"
              />{' '}
              info@ildengun.mn
            </div>
            <div>
              <Icon
                type="environment"
                style={{ margin: '8px', fontSize: '12px', color: '#722ED1' }}
                theme="outlined"
              />{' '}
              <span> Баянзүрх дүүрэг, ХӨСҮТ Амбулатори 4 давхар</span>
            </div>
          </div>
        </div>
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            span={6}
            style={{
              border: '1px solid #FAAD14',
            }}
          >
            <div
              style={{
                width: '100%',
                background: '#FAAD14',
                padding: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              ГРАНДМЕД ФАРМ ХХК
            </div>
            <div>
              <Icon
                type="phone"
                style={{ margin: '8px', fontSize: '12px', color: '#FAAD14' }}
                theme="outlined"
              />{' '}
              9982-8776, 7013-2142
            </div>
            <div>
              <Icon
                type="mail"
                style={{ margin: '8px', fontSize: '12px', color: '#FAAD14' }}
                theme="outlined"
              />{' '}
              info@ildengun.mn
            </div>
            <div>
              <Icon
                type="environment"
                style={{ margin: '8px', fontSize: '12px', color: '#FAAD14' }}
                theme="outlined"
              />{' '}
              <span> Баянзүрх дүүрэг, ХӨСҮТ Амбулатори 4 давхар</span>
            </div>
          </div>
        </div>
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            style={{
              border: '1px solid #A8071A',
            }}
          >
            <div
              style={{
                width: '100%',
                background: '#A8071A',
                padding: '8px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              ПРОЛИАНС ХХК
            </div>
            <div>
              <Icon
                type="phone"
                style={{ margin: '8px', fontSize: '12px', color: '#A8071A' }}
                theme="outlined"
              />{' '}
              9982-8776, 7013-2142
            </div>
            <div>
              <Icon
                type="mail"
                style={{ margin: '8px', fontSize: '12px', color: '#A8071A' }}
                theme="outlined"
              />{' '}
              info@ildengun.mn
            </div>
            <div>
              <Icon
                type="environment"
                style={{ margin: '8px', fontSize: '12px', color: '#A8071A' }}
                theme="outlined"
              />{' '}
              <span> Баянзүрх дүүрэг, ХӨСҮТ Амбулатори 4 давхар</span>
            </div>
          </div>
        </div>
        <div style={{ width: '25%', padding: '8px 16px 16px 8px' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              border: '1px solid #C9C9C9',
              background: '#FFFFFF',
              margin: '0',
            }}
          >
            <Button style={{ width: '100%', height: '100%' }}>
              <PlusOutlined
                style={{
                  fontSize: '60px',
                  color: '#C9C9C9',
                }}
              />{' '}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

Distribution.propTypes = {
  laboratory_order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ laboratory_order }) => ({ laboratory_order }))(
  withI18n()(Distribution)
)
