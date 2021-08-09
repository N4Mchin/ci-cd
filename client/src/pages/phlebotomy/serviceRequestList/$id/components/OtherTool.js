import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../../../styles.less'
import { BorderCollapse, MessageModal, ModuleBox } from 'components'
import { Button, Row, Col, Tabs, Checkbox, InputNumber, Form } from 'antd'

const { TabPane } = Tabs

/* #region  lists */
// const exposureKit = [
//   {
//     name: 'cycloferon',
//     display: 'Cycloferon',
//   },
//   {
//     name: 'azitron',
//     display: 'Azitron',
//   },
//   {
//     name: 'benzylpenicillin',
//     display: 'Benzylpenicillin',
//   },
//   {
//     name: 'iodum',
//     display: 'Iod',
//   },
//   {
//     name: 'sodiumChloride',
//     display: 'Sodium chloride',
//   },
//   {
//     name: 'ofloxacin',
//     display: 'Ofloxacin',
//   },
//   {
//     name: 'levosinMethyluracil',
//     display: 'Levosin /Methyluracil',
//   },
//   {
//     name: 'tetracycline',
//     display: 'Tetracycline',
//   },
//   {
//     name: 'sterileGlove',
//     display: 'Sterile glove',
//   },
//   {
//     name: 'redVacutainerNeedle',
//     display: 'Red vacutainer, needle',
//   },
//   {
//     name: 'exposureAlcoholPad',
//     display: 'Alcohol pad',
//   },
//   {
//     name: 'syringe3gr',
//     display: 'Syringe 3gr',
//   },
//   {
//     name: 'syringe10gr',
//     display: 'Syringe 10gr',
//   },
//   {
//     name: 'exposureCottonBud',
//     display: 'Cotton bud',
//   },
//   {
//     name: 'exposureAdhesiveBandage',
//     display: 'Adhesive bandage',
//   },
// ]
// const firstAidKit = [
//   {
//     name: 'aminophylline',
//     display: 'Aminophylline',
//   },
//   {
//     name: 'atropine',
//     display: 'Atropine',
//   },
//   {
//     name: 'aminocaproicAcid',
//     display: 'Aminocaproic acid',
//   },
//   {
//     name: 'glycerylTrinitrate',
//     display: 'Glyceryl trinitrate',
//   },
//   {
//     name: 'dibazol',
//     display: 'Dibazol',
//   },
//   {
//     name: 'diazepam',
//     display: 'Diazepam',
//   },
//   {
//     name: 'drotaverine',
//     display: 'Drotaverine',
//   },
//   {
//     name: 'dexamethasone',
//     display: 'Dexamethasone',
//   },
//   {
//     name: 'dextran',
//     display: 'Dextran',
//   },
//   {
//     name: 'cordiamineNikethamide',
//     display: 'Cordiamine /Nikethamide',
//   },
//   {
//     name: 'calciumGluconate',
//     display: 'Calcium gluconate',
//   },
//   {
//     name: 'cocarboxylase',
//     display: 'Cocarboxylase',
//   },
//   {
//     name: 'lidocaine',
//     display: 'Lidocaine',
//   },
//   {
//     name: 'magnesiumSulfate',
//     display: 'Magnesium sulfate',
//   },
//   {
//     name: 'prednisolone',
//     display: 'Prednisolone',
//   },
//   {
//     name: 'ringerLactateSolution',
//     display: 'Ringer’s lactate solution',
//   },
//   {
//     name: 'revalgin',
//     display: 'Revalgin',
//   },
//   {
//     name: 'gStrophanthin',
//     display: 'G-strophanthin',
//   },
//   {
//     name: 'epinephrine',
//     display: 'Epinephrine',
//   },
//   {
//     name: 'ephedrineHydrochloride',
//     display: 'Ephedrine hydrochloride',
//   },
//   {
//     name: 'methimazole',
//     display: 'Methimazole',
//   },
//   {
//     name: 'diclofenacSodium',
//     display: 'Diclofenac Sodium',
//   },
//   {
//     name: 'enalapril',
//     display: 'Enalapril',
//   },
// ]
/* #endregion */

const ExpenseItem = props => {
  const { values } = props
  const [disableInput, setDisableInput] = useState(true)
  const [data, setData] = useState(0)

  const onCheck = event => {
    if (!disableInput) {
      setData(0)
      props.onChange(0)
    } else {
      setData(1)
      props.onChange(1)
    }

    setDisableInput(!event.target.checked)
    if (!event.target.checked) props.onChange()
  }

  const onInputChange = value => {
    setData(value)
    props.onChange(value)
  }

  return (
    <Row key={values && values.productId}>
      <Col span={20}>
        <Checkbox
          value={values && values.productId}
          onChange={onCheck}
          className={styles.cont}
        >
          <Trans id={values && values.name} />
        </Checkbox>
      </Col>
      <Col span={4}>
        <InputNumber
          value={data}
          min={0}
          size="small"
          style={{ width: '40px', height: '20px' }}
          disabled={disableInput}
          onChange={onInputChange}
        />
      </Col>
    </Row>
  )
}

const OtherTool = props => {
  const { phlebotomy_serviceRequestList, phlebotomy, form } = props
  const { getFieldDecorator } = form
  const { labTestOrders, materialUsed } = phlebotomy_serviceRequestList
  const [modalSuccessVisible, showSuccessModal] = useState(false)
  const [exposureKit, setExposureKit] = useState([])
  const [firstAidKit, setFirstAidKit] = useState([])

  useEffect(() => {
    props
      .dispatch({
        type: 'phlebotomy/readExposureMaterials',
      })
      .then(data => {
        setExposureKit(data)
      })
      .catch(errorInfo => console.log(errorInfo))

    props
      .dispatch({
        type: 'phlebotomy/readFirstAidMaterials',
      })
      .then(data => setFirstAidKit(data))
      .catch(errorInfo => console.log(errorInfo))
  }, [])

  const saveExposureAndFirst = () => {
    let returnListItems = []
    form
      .validateFields()
      .then(formValues => {
        Object.keys(formValues.firstAidKit).forEach(name => {
          if (
            formValues.firstAidKit[name] &&
            formValues.firstAidKit[name] > 0
          ) {
            let searchedName = firstAidKit.find(item => item.productId === name)
            searchedName.quantity = formValues.firstAidKit[name]
            returnListItems.push(searchedName)
          }
        })

        Object.keys(formValues.exposureKit).forEach(name => {
          if (
            formValues.exposureKit[name] &&
            formValues.exposureKit[name] > 0
          ) {
            let searchedName = exposureKit.find(
              item => item.productId === name.substr(1)
            )
            searchedName.quantity = formValues.exposureKit[name]
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
      .catch(errorInfo => {
        console.log(errorInfo)
      })
  }

  const onSave = test => {
    const formValues = form.getFieldsValue()
    props
      .dispatch({
        type: 'phlebotomy_serviceRequestList/specimenCollected',
        payload: {
          ...test,
          formValues,
        },
      })
      .then(() => showSuccessModal(true))
      .catch(errorInfo => console.log(errorInfo))
  }

  const onInputNumberChange = (event, name) => {
    const newCount = materialUsed
    newCount[name] = event
    props.dispatch({
      type: 'phlebotomy_serviceRequestList/updateState',
      payload: {
        newCount: materialUsed,
      },
    })
  }

  return (
    <div className={styles.tabsContainer}>
      <ModuleBox>
        <Form>
          <Row gutter={16}>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <BorderCollapse
                displayName={<Trans>Exposure kit</Trans>}
                bordered={true}
              >
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox className={styles.checkAll}>
                    <Trans>All</Trans>
                  </Checkbox>
                </div>
                <br />
                <Checkbox.Group>
                  {exposureKit.map(value => (
                    <Col md={24} lg={24} xl={24} xxl={12} key={value.productId}>
                      <Form.Item>
                        {getFieldDecorator(
                          `exposureKit.${'_' + value.productId}`,
                          {
                            rules: [{ required: false }],
                          }
                        )(<ExpenseItem values={value} />)}
                      </Form.Item>
                    </Col>
                  ))}
                </Checkbox.Group>
              </BorderCollapse>
            </Col>
            <Col md={12} lg={12} xl={12} xxl={12}>
              <BorderCollapse
                displayName={<Trans>First aid kit</Trans>}
                bordered={true}
              >
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                  <Checkbox className={styles.checkAll}>
                    <Trans>All</Trans>
                  </Checkbox>
                </div>
                <br />
                <Checkbox.Group>
                  {firstAidKit.map(value => (
                    <Col md={24} lg={24} xl={24} xxl={8} key={value.productId}>
                      <Form.Item>
                        {getFieldDecorator(`firstAidKit.${value.productId}`, {
                          rules: [{ required: false }],
                        })(<ExpenseItem values={value} />)}
                      </Form.Item>
                    </Col>
                  ))}
                </Checkbox.Group>
              </BorderCollapse>
              <br />
              <Row gutter={8}>
                <Col span={12}>
                  <Button className="button-dark-gray" block>
                    <Trans id="Cancel" />
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="button-red"
                    block
                    onClick={saveExposureAndFirst}
                  >
                    &nbsp;
                    <Trans id="Save" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </ModuleBox>
    </div>
  )
}

OtherTool.propTypes = {
  phlebotomy: PropTypes.object,
  phlebotomy_serviceRequestList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ phlebotomy, phlebotomy_serviceRequestList, loading }) => ({
    phlebotomy_serviceRequestList,
    phlebotomy,
    loading,
  })
)(withI18n()(Form.create()(OtherTool)))
