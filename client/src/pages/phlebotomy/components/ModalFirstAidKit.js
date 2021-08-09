import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, Form, Button, Row, Input, Col } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ModuleBox, CustomInputNumber } from 'components'
import ModalResultSent from '../../laboratory/test/components/ModalResultSent'
import CheckInput from './CheckInput'
const { Text } = Typography
const { TextArea } = Input

/* #region  first aid kit */
const firstAidKitLineOne = [
  {
    name: 'aminophylline',
    display: 'Aminophylline',
  },
  {
    name: 'atropine',
    display: 'Atropine',
  },
  {
    name: 'aminocaproicAcid',
    display: 'Aminocaproic acid',
  },
  {
    name: 'glycerylTrinitrate',
    display: 'Glyceryl trinitrate',
  },
  {
    name: 'dibazol',
    display: 'Dibazol',
  },
  {
    name: 'diazepam',
    display: 'Diazepam',
  },
  {
    name: 'drotaverine',
    display: 'Drotaverine',
  },
  {
    name: 'dexamethasone',
    display: 'Dexamethasone',
  },
  {
    name: 'dextran',
    display: 'Dextran',
  },
  {
    name: 'cordiamineNikethamide',
    display: 'Cordiamine /Nikethamide',
  },
  {
    name: 'calciumGluconate',
    display: 'Calcium gluconate',
  },
  {
    name: 'cocarboxylase',
    display: 'Cocarboxylase',
  },
]

const firstAidKitLineTwo = [
  {
    name: 'lidocaine',
    display: 'Lidocaine',
  },
  {
    name: 'magnesiumSulfate',
    display: 'Magnesium sulfate',
  },
  {
    name: 'prednisolone',
    display: 'Prednisolone',
  },
  {
    name: 'ringerLactateSolution',
    display: 'Ringer’s lactate solution',
  },
  {
    name: 'revalgin',
    display: 'Revalgin',
  },
  {
    name: 'gStrophanthin',
    display: 'G-strophanthin',
  },
  {
    name: 'epinephrine',
    display: 'Epinephrine',
  },
  {
    name: 'ephedrineHydrochloride',
    display: 'Ephedrine hydrochloride',
  },
  {
    name: 'methimazole',
    display: 'Methimazole',
  },
  {
    name: 'diclofenacSodium',
    display: 'Diclofenac Sodium',
  },
  {
    name: 'enalapril',
    display: 'Enalapril',
  },
]
/* #endregion */

/* #region  titles */
const Title = (
  <Text>
    <Trans>
      <span className="title uppercase">First aid kit</span>
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

const ModalFirstAidKit = props => {
  const { form, i18n } = props
  const [modalResultSentVisible, showModalResultSent] = useState(false)
  const { getFieldDecorator } = form
  const [firstAid, setFirstAid] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    let returnListItems = []
    form
      .validateFields()
      .then(formValues => {
        Object.keys(formValues).forEach(nameFirstAid => {
          if (formValues[nameFirstAid] && formValues[nameFirstAid] > 0) {
            let searchedName = firstAid.find(
              value => value.productId === nameFirstAid
            )
            searchedName.quantity = formValues[nameFirstAid]
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
          type: 'phlebotomy/readFirstAidMaterials',
        })
        .then(data => setFirstAid(data))
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
              {firstAid.map(nameKey => (
                <Col span={12}>
                  <Form.Item>
                    {getFieldDecorator([nameKey.productId], {
                      rules: [{ required: false }],
                    })(
                      <CheckInput
                        remainedNumber={nameKey.quantity}
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
                  <Trans>Cancel</Trans>
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
            <strong> Амжилттай хадгалагдлаа</strong>
          </p>
        }
      />
    </div>
  )
}

ModalFirstAidKit.propTypes = {
  phlebotomy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, phlebotomy, loading }) => ({
  app,
  phlebotomy,
  loading,
}))(withI18n()(Form.create()(ModalFirstAidKit)))

//created Sanjaasuren.E
//2020-04-08
