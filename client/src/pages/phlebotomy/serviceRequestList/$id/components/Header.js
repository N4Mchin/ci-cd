import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Trans, withI18n } from '@lingui/react'
import styles from '../../../styles.less'
import Tubes from '../../../components/Tubes'
import Equipments from '../../../components/Equipments'
import { Button, Row, Col, Input, Checkbox, Select, Form } from 'antd'
import { Avatar, Spin } from 'antd'
import { ModuleBox, MessageModal } from 'components'

const { Option } = Select
const { TextArea } = Input

const Header = props => {
  const { location, phlebotomy_serviceRequestList, loading, i18n, form } = props

  // model.js file deer hereglehdeh bagajuudiig huleen avaad
  // material used object helbereer phlebotomy_serviceRequestList
  // hesegt oruulsan baigaa

  const { getFieldDecorator } = props.form
  const [modalResultSentVisible, showModalResultSent] = useState(false)

  const {
    selectTestItems,
    labTestOrders,
    NInum,
    firstName,
    lastName,
    listId,
    mobilePhone,
    gender,
    age,
    materialRequired,
    changingEquipmentsValue,
  } = phlebotomy_serviceRequestList

  /* #region  titles of boxes */
  const Title1 = (
    <Trans>
      <span className="bold uppercase">Material </span>
      <span className="uppercase">used</span>
    </Trans>
  )

  const Title2 = (
    <Trans>
      <span className="bold uppercase">Extra </span>
      <span className="uppercase">service</span>
    </Trans>
  )

  const Title3 = (
    <Trans>
      <span className="bold uppercase">Client </span>
      <span className="uppercase">information</span>
    </Trans>
  )
  /* #endregion */

  const onAuthenticate = () => {
    props.setShowOrderService(true)
  }

  const onAddSpecimen = () => {
    showModalResultSent(true)

    const formValues = form.getFieldsValue()

    props.dispatch({
      type: 'phlebotomy_serviceRequestList/specimenServiceRequest',
      payload: {
        specimenExtension: selectTestItems[formValues.specimenName],
        labTestOrders: labTestOrders,
      },
    })
  }

  return (
    <div>
      <Form>
        <Row gutter={16}>
          <Col xs={20} sm={14} md={12} lg={10} xl={7} xxl={7}>
            <ModuleBox title={Title3} style={{ height: '280px' }}>
              <div
                style={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Row type="flex" justify="space-between">
                  <Col span={8}>
                    <Avatar
                      shape="square"
                      size={80}
                      icon="user"
                      className={styles.phlebotomyInfoBoxAvatar}
                    />
                  </Col>

                  <Col span={16}>
                    <Row
                      gutter={[6, 8]}
                      type="flex"
                      justify="space-between"
                      style={{ fontSize: '12px' }}
                    >
                      <Col span={13}>
                        <Trans id={'LastName'} />
                      </Col>
                      <Col span={11}>
                        <strong>{lastName}</strong>
                      </Col>
                      <Col span={13}>
                        <Trans id={'FirstName'} />
                      </Col>
                      <Col span={11}>
                        <span>
                          <strong>{firstName}</strong>
                        </span>
                      </Col>
                      <Col span={13}>
                        <Trans id={'Age'} />
                      </Col>
                      <Col span={11}>
                        <span>
                          <strong>{age}</strong>
                        </span>
                      </Col>
                      <Col span={13}>
                        <Trans id={'Gender'} />
                      </Col>
                      <Col span={11}>
                        <span>
                          <strong>
                            <Trans id={gender} />
                          </strong>
                        </span>
                      </Col>
                      <Col span={13}>
                        <Trans id={'Регистр No'} />
                      </Col>
                      <Col span={11}>
                        <span>
                          <strong>{NInum}</strong>
                        </span>
                      </Col>
                      <Col span={13}>
                        <Trans id={'Phone Number'} />
                      </Col>
                      <Col span={11}>
                        <span>
                          <strong>{mobilePhone}</strong>
                        </span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      type={props.showOrderService && 'primary'}
                      block
                      onClick={onAuthenticate}
                    >
                      <Trans id="Authenticate" />
                    </Button>
                  </Col>
                </Row>
              </div>
            </ModuleBox>
          </Col>
          <Col xs={24} sm={22} md={20} lg={20} xl={11} xxl={11}>
            {props.loading.effects['phlebotomy_serviceRequestList/query'] && (
              <Spin spinning />
            )}
            {!props.loading.effects['phlebotomy_serviceRequestList/query'] && (
              <ModuleBox title={Title1} style={{ height: '280px' }}>
                <div style={{ display: 'grid', gridGap: '8px' }}>
                  <Trans>
                    <span
                      style={{
                        fontSize: '12px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      DisposableMaterialsRequiredForAllOrderedServices
                    </span>
                  </Trans>
                  <div style={{ borderBottom: '1px solid #E9E9E9' }} />
                  <Tubes
                    materialRequired={materialRequired}
                    changingEquipmentsValue={changingEquipmentsValue}
                    location={location}
                  />
                  <div style={{ borderBottom: '1px solid #E9E9E9' }} />
                  <Equipments
                    materialRequired={materialRequired}
                    changingEquipmentsValue={changingEquipmentsValue}
                    location={location}
                  />
                </div>
              </ModuleBox>
            )}
          </Col>
          <Col xs={18} sm={14} md={12} lg={10} xl={6} xxl={6}>
            <Form>
              {props.loading.effects['phlebotomy_serviceRequestList/query'] && (
                <Spin spinning />
              )}
              {!props.loading.effects[
                'phlebotomy_serviceRequestList/query'
              ] && (
                <ModuleBox title={Title2} style={{ height: '280px' }}>
                  <div
                    style={{
                      display: 'flex',
                      height: '100%',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Row gutter={[0, 16]}>
                      <Col>
                        <Form.Item hasFeedback={false}>
                          {getFieldDecorator('specimenName', {
                            rules: [{ required: false }],
                          })(
                            <Select
                              // defaultValue="Шинжилгээний нэрс"
                              style={{ width: '100%' }}
                              disabled
                            >
                              {Object.keys(selectTestItems)
                                .map(testOrder => {
                                  if (!selectTestItems[testOrder].ordered) {
                                    return (
                                      <Option key={testOrder}>
                                        {selectTestItems[testOrder].display}
                                      </Option>
                                    )
                                  }
                                  return undefined
                                })
                                .filter(val => !!val)}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col>
                        <Form.Item hasFeedback={false}>
                          {getFieldDecorator('specimenStatus', {
                            rules: [{ required: false }],
                          })(
                            <Checkbox.Group>
                              <Row gutter={[0, 10]}>
                                <Col span={20}>
                                  <Checkbox
                                    value="stat"
                                    disabled
                                  >{i18n.t`Cito`}</Checkbox>
                                </Col>
                                <Col span={4}>
                                  <div
                                    style={{
                                      width: '16px',
                                      height: '16px',
                                      background: '#DB1B44',
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Checkbox.Group>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <TextArea
                        style={{
                          backgroundColor: '#F5F5F5',
                          borderColor: '#C9C9C9',
                        }}
                        disabled
                      />
                      <Button
                        className="button-red"
                        block
                        onClick={onAddSpecimen}
                        disabled
                      >
                        <Trans id="Add" />
                      </Button>
                    </Row>
                  </div>
                </ModuleBox>
              )}
            </Form>
          </Col>
        </Row>

        <MessageModal
          visible={modalResultSentVisible}
          onCancel={() => showModalResultSent(false)}
          title={
            <p
              style={{
                marginLeft: '50px',
                marginTop: '30px',
                justifyContent: 'center',
                fontSize: '12px',
              }}
            >
              <Trans>
                <span className="title">Save successful</span>
              </Trans>
            </p>
          }
        />
      </Form>
    </div>
  )
}

Header.propTypes = {
  phlebotomy_serviceRequestList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ phlebotomy_serviceRequestList, loading }) => ({
  phlebotomy_serviceRequestList,
  loading,
}))(withI18n()(Form.create()(Header)))
