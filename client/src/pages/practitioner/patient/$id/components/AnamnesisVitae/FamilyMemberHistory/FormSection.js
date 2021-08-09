import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Col, Select, Icon, Descriptions } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { connect } from 'dva'
import { ActiveCollapse, IntegerInput, SearchInputICD } from 'components'
import { resolveDisplay } from 'utils/valuesets'
import { delay } from 'utils/helper'
import styles from './../../../styles.less'

const { TextArea } = Input
const { Option } = Select

const FimalyMemberField = props => {
  const { lists, language, placeholder } = props

  const onSelectChange = event => {
    props.onChange(lists[event])
  }

  return (
    <Select
      allowClear
      showSearch
      placeholder={placeholder}
      onChange={onSelectChange}
    >
      {Object.keys(lists).map(familyMemberValue => {
        const optionName = resolveDisplay(lists[familyMemberValue], language)
        return (
          <Option
            value={familyMemberValue}
            key={familyMemberValue}
            title={optionName}
          >
            {optionName}
          </Option>
        )
      })}
    </Select>
  )
}

const FormSection = props => {
  const { form, i18n, app } = props
  const { AnamnesisVitae } = app.FHIR_CODES
  const { FamilyMemberHistory } = AnamnesisVitae.include
  const { getFieldDecorator } = form

  const [array, setArray] = useState([
    {
      key: 0,
    },
  ])

  const addRowSubmit = () => {
    const copyArray = array.slice()
    const newElement = {
      key: array.length + 1,
    }

    copyArray.push(newElement)
    setArray(copyArray)
  }

  const deleteRowSubmit = key => {
    let deleteIndex
    array.forEach((value, index) => {
      if (value.key === key) {
        deleteIndex = index
      }
    })
    const leftArray = array.slice(0, deleteIndex)
    const rightArray = array.slice(deleteIndex + 1, array.length)
    const newArray = [...leftArray, ...rightArray]
    setArray(newArray)
  }

  const [activeKey, setActiveKey] = useState([])
  const [activeStatus, setActiveStatus] = useState(false)

  const onSave = () => {
    form
      .validateFields()
      .then(formValues => {
        return props.dispatch({
          type: 'practitioner_patient_profile/familyMemberHistoryAdd',
          payload: {
            formValues: formValues,
          },
        })
      })
      .then(result => {
        setActiveStatus(true)
        console.log(result)
        return props.dispatch({
          type: 'practitioner_patient_profile/showModalMessage',
          payload: {
            type: 'success',
            content: i18n.t`Save successful`,
          },
        })
      })
      .catch(errorInfo => console.log(errorInfo))
      .finally(async () => {
        await delay(1000)
        setActiveKey([])
      })
  }

  const title = <Trans id="Family member history" />

  /* #region   */
  // return (

  /* <Row className={styles.tableHead}>
              <Col span={5}>{i18n.t`Таны хэн болох`}</Col>
              <Col span={5}>{i18n.t`Ямар өвчнөөр өвдсөн болох`}</Col>
              <Col span={5}>{i18n.t`Хэдэн насандаа өвдсөн болох`}</Col>
              <Col span={6}>{i18n.t`Note`}</Col>
            </Row> */

  //   <Row>
  //     <Col span={21}>
  //       <Row>
  //         <Col span={12}>
  //           <div className={styles.tableHead}>
  //             {i18n.t`Таны хэн болох`}
  //           </div>
  //           <div
  //             style={{
  //               borderRight: '1px solid #C9C9C9',
  //               padding: '8px',
  //             }}
  //           >
  //             <Form.Item>
  //               {getFieldDecorator(
  //                 `${element.key}.familyMember`,
  //                 { rules: [{ required: false }] }
  //               )(
  //                 <FimalyMemberField
  //                   lists={FamilyMemberHistory}
  //                   language={i18n._language}
  //                   placeholder={i18n.t`Choose a family member`}
  //                 />
  //               )}
  //             </Form.Item>
  //           </div>
  //         </Col>
  //         <Col span={12}>
  //           <div
  //             className={styles.tableHead}
  //           >{i18n.t`Ямар өвчнөөр өвдсөн болох`}</div>
  //           <div
  //             style={{
  //               borderRight: '1px solid #C9C9C9',
  //               padding: '8px',
  //             }}
  //           >
  //             <Form.Item>
  //               {getFieldDecorator(`${element.key}.diagnosis`, {
  //                 rules: [{ required: false }],
  //               })(<SearchInputICD />)}
  //             </Form.Item>
  //           </div>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col span={12}>
  //           <div className={styles.tableHead}>
  //             {i18n.t`Хэдэн насандаа өвдсөн болох`}
  //           </div>
  //           <div
  //             style={{
  //               borderRight: '1px solid #C9C9C9',
  //               padding: '8px',
  //             }}
  //           >
  //             <Form.Item>
  //               {getFieldDecorator(`${element.key}.onSetAge`, {
  //                 rules: [{ required: false }],
  //               })(<IntegerInput suffix={i18n.t`Age`} />)}
  //             </Form.Item>
  //           </div>
  //         </Col>
  //         <Col span={12}>
  //           <div className={styles.tableHead}>{i18n.t`Note`}</div>
  //           <div
  //             style={{
  //               borderRight: '1px solid #C9C9C9',
  //               padding: '8px',
  //             }}
  //           >
  //             <Form.Item>
  //               {getFieldDecorator(`${element.key}.note`, {
  //                 rules: [{ required: false }],
  //               })(<TextArea rows={2} />)}
  //             </Form.Item>
  //           </div>
  //         </Col>
  //       </Row>
  //     </Col>
  //     <Col span={3}>
  //       <div className={styles.tableHead}>{i18n.t`Delete`}</div>
  //       <div
  //         style={{
  //           padding: '4px',
  //           height: '100%',
  //           alignItems: 'center',
  //           textAlign: 'center',
  //         }}
  //       >
  //         <Button
  //           type="primary"
  //           // style={{
  //           //   textAlign: 'center',
  //           //   justifySelf: 'center',
  //           // }}
  //           onClick={() => deleteRowSubmit(element.key)}
  //         >
  //           <Icon type="delete" />
  //         </Button>
  //       </div>
  //     </Col>
  //     <br />
  //   </Row>
  // )
  /* #endregion */

  const onActiveChange = value => {
    setActiveKey(value)
  }

  return (
    <div>
      <ActiveCollapse
        displayName={title}
        bordered={true}
        activeKey={activeKey}
        activeStatus={activeStatus}
        onActiveChange={onActiveChange}
      >
        <Form layout="horizontal" labelAlign="left" colon={false}>
          {array.map(element => {
            return (
              <div className={styles.medicationRequestTable}>
                <Descriptions bordered layout="vertical">
                  <Descriptions.Item span={5 / 2}>
                    <Descriptions bordered layout="vertical">
                      <Descriptions.Item
                        label={i18n.t`Who you are`}
                        span={3 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.familyMember`, {
                            rules: [
                              {
                                required: true,
                                message: i18n.t`Please select familyMember`,
                              },
                            ],
                          })(
                            <FimalyMemberField
                              lists={FamilyMemberHistory}
                              language={i18n._language}
                              placeholder={i18n.t`Choose a family member`}
                            />
                          )}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`
                        What disease did you get?`}
                        span={3 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.diagnosis`, {
                            rules: [
                              {
                                required: true,
                                message: i18n.t`Please select diagnosis`,
                              },
                            ],
                          })(<SearchInputICD />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={i18n.t`How old were you when you got sick?`}
                        span={3 / 2}
                      >
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.onSetAge`, {
                            rules: [
                              {
                                required: true,
                                message: i18n.t`Please select onSetAge`,
                              },
                            ],
                          })(<IntegerInput suffix={i18n.t`Age`} />)}
                        </Form.Item>
                      </Descriptions.Item>
                      <Descriptions.Item label={i18n.t`Note`} span={3 / 2}>
                        <Form.Item>
                          {getFieldDecorator(`${element.key}.note`, {
                            rules: [{ required: false }],
                          })(<TextArea rows={1} />)}
                        </Form.Item>
                      </Descriptions.Item>
                    </Descriptions>
                  </Descriptions.Item>

                  <Descriptions.Item label={i18n.t`Delete`}>
                    <Button
                      type="primary"
                      onClick={() => deleteRowSubmit(element.key)}
                    >
                      <Icon type="delete" />
                    </Button>
                  </Descriptions.Item>
                </Descriptions>
                <br />
              </div>
            )
          })}

          <Row style={{ marginTop: '8px' }}>
            <Col span={12}>
              <Row type="flex" justify="start">
                <Button type="primary" onClick={addRowSubmit}>
                  <Trans id={'Add'} />
                </Button>
              </Row>
            </Col>

            <Col span={12}>
              <Row type="flex" justify="end">
                <Button className="button-grey">
                  <Trans id={'Cancel'} />
                </Button>
                <Button
                  className="button-red"
                  style={{ marginLeft: '10px' }}
                  onClick={onSave}
                >
                  <Trans id={'Save'} />
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </ActiveCollapse>
    </div>
  )
}

FormSection.propTypes = {
  practitioner_patient_profile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ app, practitioner_patient_profile, loading }) => ({
  app,
  practitioner_patient_profile,
  loading,
}))(withI18n()(Form.create()(FormSection)))
