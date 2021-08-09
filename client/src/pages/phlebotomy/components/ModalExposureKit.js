import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Form, Button, Row, Input, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox } from 'components'
import ModalResultSent from '../../laboratory/test/components/ModalResultSent'
import CheckInput from './CheckInput'
const { Text } = Typography
const { TextArea } = Input

/* #region  exposure kit  */
const exposureKitLineOne = [
  {
    name: 'cycloferon',
    display: 'Cycloferon',
  },
  {
    name: 'azitron',
    display: 'Azitron',
  },
  {
    name: 'benzylpenicillin',
    display: 'Benzylpenicillin',
  },
  {
    name: 'iodum',
    display: 'Iodum',
  },
  {
    name: 'sodiumChloride',
    display: 'Sodium chloride',
  },
  {
    name: 'ofloxacin',
    display: 'Ofloxacin',
  },
  {
    name: 'levosinMethyluracil',
    display: 'Levosin/Methyluracil',
  },
  {
    name: 'tetracycline',
    display: 'Tetracycline',
  },
]

const exposureKitLineTwo = [
  {
    name: 'sterileGlove',
    display: 'Sterile glove',
  },
  {
    name: 'redVacutainerNeedle',
    display: 'Red vacutainer, needle',
  },
  {
    name: 'exposureAlcoholPad',
    display: 'Alcohol pad',
  },
  {
    name: 'syringe3gr',
    display: 'Syringe 3gr',
  },
  {
    name: 'syringe10gr',
    display: 'Syringe 10gr',
  },
  {
    name: 'exposureCottonBud',
    display: 'Cotton bud',
  },
  {
    name: 'exposureAdhesiveBandage',
    display: 'Adhesive bandage',
  },
]

/* #endregion */
/* #region  titles */
const Title = (
  <Text>
    <Trans>
      <span className="title uppercase">Exposure kit</span>
    </Trans>
  </Text>
)

const Title1 = (
  <Text>
    <Trans>
      <span className="title uppercase">Description </span>
      <span className="uppercase">Notes</span>
    </Trans>
  </Text>
)
/* #endregion */

const ModalExposureKit = props => {
  const { form, dispatch, i18n, value } = props
  const { getFieldDecorator } = form
  const [modalResultSentVisible, showModalResultSent] = useState(false)
  const [exposureData, setExposureData] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    let returnListItems = []

    form
      .validateFields()
      .then(formValues => {
        Object.keys(formValues).forEach(nameExposure => {
          if (formValues[nameExposure] && formValues[nameExposure] > 0) {
            let searchedName = exposureData.find(
              value => value.productId === nameExposure
            )
            searchedName.quantity = formValues[nameExposure]
            returnListItems.push(searchedName)
          }
        })
      })
      .then(() => {
        return props.dispatch({
          type: 'phlebotomy/deleteMaterials',
          payload: { dataSource: returnListItems },
        })
      })
      .catch(errorInfo => console.log(errorInfo))
  }

  useEffect(() => {
    if (props.visible) {
      props
        .dispatch({
          type: 'phlebotomy/readExposureMaterials',
        })
        .then(data => setExposureData(data))
        .catch(errorInfo => console.log(errorInfo))
    }
  }, [props.visible])

  return (
    <div>
      <Modal
        visible={props.visible}
        onCancel={props.onCancel}
        maskClosable={props.maskClosable}
        width="800px"
        footer={[]}
      >
        <ModuleBox title={Title}>
          <Form layout="horizontal">
            <Row gutter={24}>
              {exposureData.map(nameKey => (
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator([nameKey.productId], {
                      rules: [{ required: false }],
                    })(
                      <CheckInput
                        remainedNumber={nameKey && nameKey.quantity}
                        name={nameKey.name}
                      />
                    )}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Form>
        </ModuleBox>
        <Row style={{ marginTop: '25px' }}>
          <Col span={14}>
            <ModuleBox title={Title1}>
              <TextArea
                rows={3}
                style={{ backgroundColor: '#F5F5F5', borderColor: '#C9C9C9' }}
              />
            </ModuleBox>
          </Col>
          <Col span={9} offset={1}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '90px',
              }}
            >
              <Col span={10} style={{ marginRight: '10px' }}>
                <Button className="button-gray" onClick={props.onCancel} block>
                  <Trans> Cancel</Trans>
                </Button>
              </Col>
              <Col span={10}>
                <Button className="button-red" onClick={handleSubmit} block>
                  <Trans>Save</Trans>
                </Button>
              </Col>
            </div>
          </Col>
        </Row>
      </Modal>
      <ModalResultSent
        visible={modalResultSentVisible}
        onCancel={() => showModalResultSent(false)}
        title={
          <p
            style={{
              marginLeft: '30px',
              marginTop: '30px',
              textTransform: 'uppercase',
              fontSize: '12px',
            }}
          >
            <strong>
              <Trans>Save successful</Trans>
            </strong>
          </p>
        }
      />
    </div>
  )
}

ModalExposureKit.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy, loading }) => ({
  app,
  phlebotomy,
  loading,
}))(withI18n()(Form.create()(ModalExposureKit)))

//created Sanjaasuren.E
//2020-04-08
