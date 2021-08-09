import React, { PureComponent } from 'react'
import PropTypes, { array } from 'prop-types'
import { Icon, Button, Input, Select, Row, Col, Form, Modal } from 'antd'
import {
  Period,
  EditAndDeleteButtonGroup,
  LocationCascader,
  AddressLine,
} from 'components'
import { withI18n, Trans } from '@lingui/react'
import {
  ValuesetRelationship,
  NameUse,
  ContactPointSystem,
  ContactPointUse,
  ContactPointRank,
  AdministrativeGender,
  AddressUse,
  AddressType,
} from '../const'
import styles from '../styles.less'
import { T } from 'antd/lib/upload/utils'

const { Option } = Select

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 16 },
  },
}

function isEmpty(obj) {
  if (Object.entries(obj).length === 0 && obj.constructor === Object) {
    return true
  }
  return false
}

function relationshipConverter(codes) {
  const result = []

  ValuesetRelationship.filter((value, index, array) => {
    if (codes && codes.includes(value.code)) {
      const output = {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
            code: value.code,
          },
        ],
      }
      result.push(output)
    }
  })

  return result
}

@withI18n()
@Form.create()
class ContactModal extends PureComponent {
  constructor(props) {
    super(props)

    const TelecomValues = props.selectedItem && props.selectedItem.telecom
    const showTelecomForm = TelecomValues ? false : true

    this.state = {
      selectedRelationships: [],
      TelecomValues: TelecomValues,
      selectedTelecomItem: {},
      selectedTelecomIndex: -1,
      showTelecomForm: showTelecomForm,
    }

    this.telecomValueAdd = this.telecomValueAdd.bind(this)
    this.toggleTelecomForm = this.toggleTelecomForm.bind(this)
  }

  telecomValueAdd() {
    const { TelecomValues, selectedTelecomIndex } = this.state
    const { getFieldsValue } = this.props.form
    const FormData = getFieldsValue()

    const telecomItem = {
      system: FormData.contactSystem,
      use: FormData.contactUse,
      value: FormData.contactValue,
      rank: FormData.contactRank,
    }

    let newValue

    if (selectedTelecomIndex > -1) {
      // add new
      TelecomValues[selectedTelecomIndex] = telecomItem
      newValue = TelecomValues
    } else {
      // edit
      newValue = [...TelecomValues, telecomItem]
    }

    this.setState({
      TelecomValues: newValue,
      selectedTelecomItem: {},
      selectedTelecomIndex: -1,
      showTelecomForm: false,
    })
  }

  telecomValueEdit(item, index) {
    const { selectedTelecomIndex, showTelecomForm } = this.state
    const show = index === selectedTelecomIndex ? !showTelecomForm : true
    this.setState({
      showTelecomForm: show,
      selectedTelecomItem: item,
      selectedTelecomIndex: index,
    })
  }

  telecomValueDelete(index) {
    const { TelecomValues } = this.state
    const newValue = [...TelecomValues]
    newValue.splice(Number(index), 1)
    this.setState({
      TelecomValues: newValue,
    })
  }

  valueRelationshipChange = selectedRelationships => {
    this.setState({ selectedRelationships })
  }

  toggleTelecomForm(bool) {
    const { showTelecomForm, TelecomValues, selectedTelecomItem } = this.state
    let show
    if (TelecomValues.length === 0 || !isEmpty(selectedTelecomItem)) {
      // !isEmpty(selectedTelecomItem) -> onClick after edit button, so don't hide form
      show = true
    } else {
      show = !showTelecomForm
    }

    this.setState({
      showTelecomForm: show,
      selectedTelecomItem: {},
      selectedTelecomIndex: -1,
    })
  }

  handleOk = () => {
    const { onOk, form } = this.props
    const { validateFields, getFieldsValue, setFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      const data = {
        ...getFieldsValue(),
        telecom: this.state.TelecomValues,
      }

      const relationships = relationshipConverter(data.relationship)

      const address = {
        use: data.address.use,
        type: data.address.type,
        text: data.addresstext,
        line: data.address.line,
        city: data.address.city,
        district: data.address.location.district,
        state: data.address.location.state,
        postalCode: data.address.postalCode,
        country: data.address.location.country,
        period: data.address.period,
      }

      const output = {
        relationship: relationships,
        name: data.name,
        gender: data.gender,
        address: address,
        telecom: this.state.TelecomValues,
        period: data.period,
      }
      console.log('output: ', output)
      onOk(output)
    })
  }

  render() {
    const { onOk, form, i18n, selectedItem = {}, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const {
      editItem,
      selectedRelationships,
      TelecomValues,
      showTelecomForm,
      selectedTelecomItem,
    } = this.state
    const filteredRelationships = ValuesetRelationship.filter(
      o => !selectedRelationships.includes(o)
    )

    const telecomList = []
    if (TelecomValues.length !== 0) {
      TelecomValues.map((item, index) => {
        return telecomList.push(
          <div key={`keyContactTelecom.${index}`} className={styles.itemDiv}>
            {item.system && `${item.system} `}

            <span className={styles.itemName}>
              {item.value && `${item.value} `}
            </span>

            {item.rank && `rank: ${item.rank} `}

            <span className={styles.itemUse}>{item.use}</span>

            <div className={styles.itemDivButton}>
              <EditAndDeleteButtonGroup
                onEdit={() => this.telecomValueEdit(item, index)}
                onDelete={() => this.telecomValueDelete(index)}
              />
            </div>
          </div>
        )
      })
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <div className={styles.contentForm}>
            <div className={styles.title}>
              <Icon type="user" /> {i18n.t`HumanName`}
            </div>
            <div className={styles.cont}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label={i18n.t`HumanNameUse`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name.use', {
                      initialValue: selectedItem.name && selectedItem.name.use,
                      rules: [{ required: true }],
                    })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder={i18n.t`HumanNameUse`}
                      >
                        {NameUse.map(v => (
                          <Option
                            key={`keyContactName./${v.code}`}
                            value={v.code}
                          >
                            {v.display}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>

                  <Form.Item
                    label={i18n.t`HumanNameFamily`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name.family', {
                      initialValue:
                        selectedItem.name && selectedItem.name.family,
                      rules: [
                        {
                          required: true,
                          message: i18n.t`WarningInputHumanNameFamily`,
                        },
                      ],
                    })(<Input placeholder={i18n.t`HumanNameFamily`} />)}
                  </Form.Item>

                  <Form.Item
                    label={i18n.t`HumanNamePrefix`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name.prefix', {
                      initialValue:
                        selectedItem.name && selectedItem.name.prefix,
                    })(
                      <Select
                        mode="tags"
                        placeholder={i18n.t`HumanNamePrefix`}
                        notFoundContent={null}
                        key="keyContactHumanNamePrefix"
                      ></Select>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={i18n.t`HumanNameGiven`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name.given', {
                      initialValue:
                        selectedItem.name && selectedItem.name.given,
                      rules: [
                        {
                          required: true,
                          message: i18n.t`WarningInputHumanNameGiven`,
                        },
                      ],
                    })(
                      <Select
                        mode="tags"
                        placeholder={i18n.t`HumanNameGiven`}
                        notFoundContent={null}
                        key="keyContactHumanNameGiven"
                      ></Select>
                    )}
                  </Form.Item>

                  <Form.Item
                    label={i18n.t`HumanNameSuffix`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name.suffix', {
                      initialValue:
                        selectedItem.name && selectedItem.name.suffix,
                    })(
                      <Select
                        mode="tags"
                        placeholder={i18n.t`HumanNameSuffix`}
                        notFoundContent={null}
                        key="keyContactHumanNameSuffix"
                      ></Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label={i18n.t`HumanNamePeriod`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('name.period', {
                      initialValue:
                        selectedItem.name && selectedItem.name.period,
                    })(<Period />)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          <div className={styles.contentForm}>
            <div className={styles.title}>
              <Icon type="phone" />
              &nbsp;
              {i18n.t`Telecom`}
            </div>
            <div>
              {TelecomValues.length > 0 && (
                <div className={styles.divButton}>
                  <Button
                    icon="plus"
                    type="dashed"
                    size="small"
                    onClick={() => this.toggleTelecomForm()}
                  />
                </div>
              )}
            </div>
            <div className={styles.cont}>
              {telecomList}

              {showTelecomForm && (
                <>
                  <Row key="rowPass" gutter={8}>
                    <Col span={24}>
                      <Form.Item
                        label={i18n.t`TelecomSystem`}
                        hasFeedback
                        {...formItemLayout}
                      >
                        {getFieldDecorator('contactSystem', {
                          initialValue: selectedTelecomItem.system,
                          rules: [{ required: false }],
                        })(
                          <Select
                            style={{ width: '100%' }}
                            placeholder={i18n.t`TelecomSystem`}
                          >
                            {ContactPointSystem.map(v => (
                              <Option key={v.code} value={v.code}>
                                {v.display}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={i18n.t`TelecomValue`}
                        hasFeedback
                        {...formItemLayout}
                      >
                        {getFieldDecorator('contactValue', {
                          initialValue: selectedTelecomItem.value,
                          rules: [
                            { required: false, message: 'WarningInputValue' },
                          ],
                        })(<Input placeholder={i18n.t`TelecomValue`} />)}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={i18n.t`TelecomUse`}
                        hasFeedback
                        {...formItemLayout}
                      >
                        {getFieldDecorator('contactUse', {
                          initialValue: selectedTelecomItem.use,
                          rules: [{ required: false }],
                        })(
                          <Select
                            style={{ width: '100%' }}
                            placeholder={i18n.t`TelecomUse`}
                          >
                            {ContactPointUse.map(v => (
                              <Option key={v.code} value={v.code}>
                                {v.display}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        label={i18n.t`TelecomRank`}
                        hasFeedback
                        {...formItemLayout}
                      >
                        {getFieldDecorator('contactRank', {
                          initialValue: selectedTelecomItem.rank,
                          rules: [{ required: false }],
                        })(
                          <Select
                            style={{ width: '100%' }}
                            placeholder={i18n.t`TelecomRank`}
                          >
                            {ContactPointRank.map(v => (
                              <Option key={v.code} value={v.code}>
                                {v.display}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={8}>
                    <Button
                      icon="plus-circle"
                      onClick={this.telecomValueAdd}
                      style={{ float: 'right', margin: '8px' }}
                    >
                      &nbsp;
                      {i18n.t`Add`}
                    </Button>
                  </Row>
                </>
              )}
            </div>
          </div>

          <div className={styles.contentForm}>
            <div className={styles.title}>
              <Icon type="home" />
              &nbsp;
              {i18n.t`Address`}
            </div>

            <div className={styles.cont}>
              <Row gutter={8}>
                <Col span={12}>
                  <FormItem
                    label={i18n.t`AddressUse`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('address.use', {
                      initialValue:
                        selectedItem.address && selectedItem.address.use,
                      rules: [{ required: true }],
                    })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder={i18n.t`AddressUse`}
                      >
                        {AddressUse.map(v => (
                          <Option key={v.code} value={v.code}>
                            {<Trans id={v.display} />}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem
                    label={i18n.t`AddressType`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('address.type', {
                      initialValue:
                        selectedItem.address && selectedItem.address.type,
                      rules: [{ required: true }],
                    })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder={i18n.t`AddressType`}
                      >
                        {AddressType.map(v => (
                          <Option key={v.code} value={v.code}>
                            {<Trans id={v.display} />}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label={i18n.t`AddressCountry`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('address.location', {
                      initialValue: selectedItem.address && [
                        selectedItem.address.country,
                        selectedItem.address.state,
                        selectedItem.address.district,
                      ],
                      rules: [{ required: true }],
                    })(<LocationCascader />)}
                  </FormItem>
                </Col>

                <Col span={12}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('line', {
                      initialValue:
                        selectedItem.address && selectedItem.address.line,
                      rules: [
                        { required: false, message: 'Please input line' },
                      ],
                    })(<AddressLine placeholder={i18n.t`AddressLine`} />)}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={i18n.t`AddressPostalCode`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('address.postalCode', {
                      initialValue:
                        selectedItem.address && selectedItem.address.postalCode,
                      rules: [
                        {
                          required: false,
                          message: 'Please input postal code',
                        },
                      ],
                    })(<Input placeholder={i18n.t`AddressPostalCode`} />)}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <FormItem
                    label={i18n.t`AddressPeriod`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('address.period', {
                      initialValue:
                        selectedItem.address && selectedItem.address.period,
                      rules: [{ required: false }],
                    })(<Period />)}
                  </FormItem>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles.contentForm}>
            <div className={styles.title}>
              <Icon type="ellipsis" />
              &nbsp;
              {i18n.t`Other`}
            </div>

            <div className={styles.cont}>
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label={i18n.t`Relationship`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('relationship', {
                      initialValue:
                        (selectedItem &&
                          selectedItem.relationship.map(value => {
                            if (value && value.coding && value.coding['0'])
                              return value.coding['0'].code
                          })) ||
                        undefined,
                      rules: [{ required: true }],
                    })(
                      <Select
                        mode="multiple"
                        placeholder={i18n.t`Relationship`}
                      >
                        {filteredRelationships.map(v => (
                          <Select.Option
                            key={`Contact.Relationship.${v.code}`}
                            value={v.code}
                          >
                            {v.display}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    label={i18n.t`Gender`}
                    {...formItemLayout}
                  >
                    {getFieldDecorator('gender', {
                      initialValue: selectedItem.gender,
                      rules: [
                        {
                          required: true,
                        },
                      ],
                    })(
                      <Select
                        style={{ width: '50%' }}
                        placeholder={i18n.t`Gender`}
                      >
                        {AdministrativeGender.map(v => (
                          <Option key={v.code} value={v.code}>
                            {v.display}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={i18n.t`Period`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    {getFieldDecorator('period', {
                      initialValue: selectedItem.period,
                      rules: [
                        {
                          required: false,
                          message: i18n.t`WarningInputPeriod`,
                        },
                      ],
                    })(<Period />)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </Modal>
    )
  }
}

ContactModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ContactModal
