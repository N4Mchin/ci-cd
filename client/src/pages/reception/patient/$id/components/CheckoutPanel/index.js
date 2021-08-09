import React, { PureComponent, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Row, Col, Button, Checkbox, Divider } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import styles from './CheckoutPanel.less'
import 'moment-timezone'
import Payment from './Payment'
import Tests from './Tests'
import DiagnosticTests from './DiagnosticTests'
import Checkup from './Checkup'
import Discounts from './Discounts'
import Research from './Research'
import PaymentReceipt from './PaymentReceipt'
import RelatedCompanyBills from './RelatedCompanyBills'
import { MessageModal } from 'components'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },

  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

@withI18n()
@connect(({ app, reception_patientProfile, loading }) => ({
  app,
  reception_patientProfile,
  loading,
}))
class CheckoutPanel extends PureComponent {
  state = {
    checkbox: {},
    input: {},
    modalPaymentReceiptVisible: false,
    modalMessageModalVisible: false,
    paymentComplete: false,
    payment: {},
  }

  handleCheckbox = event => {
    const field = event.target.value
    const checkbox = { ...this.state.checkbox }
    checkbox[field] = event.target.checked
    this.setState({ checkbox })
  }

  handleCancelAll = () => {
    this.props.dispatch({
      type: 'reception_patientProfile/cancelTestsAndCheckup',
      payload: {},
    })
  }

  handleInput = (field, event) => {
    const input = { ...this.state.input }
    input[field] = event.target.value
    this.setState({ input })
  }

  handlePaymentComplete = () => {
    const { paymentComplete } = this.state
    this.setState({ paymentComplete: !paymentComplete })
  }

  onPrintReceipt = () => {
    this.setState({ modalPaymentReceiptVisible: true })
  }

  /**
   * Энэ функц нь төлбөр төлөөд хадгалах үед дуудагдана
   * сонгосон байгаа шинжилгээ болон үзлэгийг Redux дахь reception_patientProfile аас уншиж,
   * FHIR ийн форматруу хөрвүүлээд серверрүү илгээхдээ client/src/pages/patient/$id/model.js ийн orderService функцийг дуудна
   */

  handleSubmit = e => {
    e.preventDefault()
    const { dispatch } = this.props

    const {
      SelectedTests,
      SelectedCheckup,
      SelectedDiagnosticTests,
      id,
      checkupCost,
      labTestCost,
      diagnosticTestCost,
      totalAmount,
      payment,
      patientName,
      patient,
    } = this.props.reception_patientProfile
    const paymentExtended = {
      ...this.state.payment,
      labTestCost,
      diagnosticTestCost,
      checkupCost,
      totalAmount,
    }

    const transaction = {
      resourceType: 'Bundle',
      type: 'transaction',
      entry: [],
    }

    // return
    const payload = {
      Checkup: {},
      DiagnosticTests: {},
      UncategorizedTests: {},
      ImmunologyTests: {},
      BiochemistryTests: {},
      patientName: patientName,
      payment: paymentExtended,
    }

    return this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return
      }

      dispatch({
        type: 'reception_patientProfile/checkout',
        payload: {
          ...payload, // payment info here
          transaction,
        },
      })
        .then(() => {
          return this.showMessageModal(true)
        })
        .then(() => {
          this.setState({ paymentComplete: false, payment: {} })
        })
        // .then(() => {
        //   this.props.form.refresh()
        //   // this.props.form.resetFields()
        // })
        .catch(errorInfo => {
          console.log(errorInfo)
        })
    })
  }

  handlePaymentInput = value => {
    console.log(value)
    this.setState({
      payment: value,
    })
  }

  showMessageModal = value => {
    this.setState({
      modalMessageModalVisible: value,
    })
  }

  render() {
    const { i18n } = this.props
    const {
      SelectedTestItems = [],
      SelectedCheckup,
      SelectedDiagnosticTests,
      totalAmount,
    } = this.props.reception_patientProfile

    const paidAmount = this.state.payment.byCredit + this.state.payment.inCash

    const discountAmount =
      this.state.payment.customersDiscount + this.state.payment.insurance
    const selected = [
      ...SelectedTestItems,
      ...Object.values(SelectedDiagnosticTests),
    ]

    if (!!Object.values(SelectedCheckup).length) {
      selected.push(SelectedCheckup)
    }

    return (
      <div className={styles.tableColor}>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          layout="horizontal"
        >
          <div className={styles.checkout}>
            <div className={styles.checkoutTitle}>
              <Trans>
                <span className="title uppercase">Check </span>
                <span className="uppercase">Out</span>
              </Trans>
            </div>
            <Checkup />
            <DiagnosticTests />
            <Tests />
            {selected.length > 1 && (
              <div className={styles.selectedTestItems}>
                <Checkbox value="cancel" onChange={this.handleCancelAll}>
                  <Trans id="CancelAll" />
                </Checkbox>
              </div>
            )}
            {selected.length > 0 && <div className={styles.seperator} />}

            <Payment
              paymentValue={this.state.payment}
              onChange={this.handlePaymentInput}
            />
            <div className={styles.seperator} />
            {/* ---------------------Хөнгөлөлтийн хэсгийг коммент болгов-------------------<RelatedCompanyBills key="keyRelatedCompanyBills" />
         
            <Discounts key="keyDiscounts" /> */}
            <Research key="keyResearch" research={this.state.research} />
            <div className={styles.total}>
              <span>
                {i18n.t`Total amount`}: {totalAmount} ₮
              </span>
            </div>
            <div className={styles.total}>
              <span>
                {i18n.t`Discount amount`}:{' '}
                {this.state.payment.customersDiscount ||
                this.state.payment.insurance
                  ? discountAmount
                  : 0}
                ₮
              </span>
            </div>
            <div className={styles.total}>
              <span>
                {i18n.t`Remained amount`}:{' '}
                {this.state.payment.extraPayment ||
                this.state.payment.customersDiscount ||
                this.state.payment.insurance
                  ? this.state.payment.totalIncome
                  : 0}
                ₮
              </span>
            </div>
            <Divider />
            <div className={styles.total}>
              <span>
                {i18n.t`Paid`}: {this.state.paymentComplete ? paidAmount : 0}₮
              </span>
            </div>
            <div className={styles.total}>
              <span>
                {i18n.t`Changes`}:{' '}
                {this.state.paymentComplete
                  ? paidAmount - this.state.payment.totalIncome
                  : 0}
                ₮
              </span>
            </div>
            <div className={styles.selectedTestItems}>
              <Checkbox
                value="paymentComplete"
                checked={this.state.paymentComplete}
                onChange={this.handlePaymentComplete}
              >
                {i18n.t`PaymentComplete`}
              </Checkbox>
            </div>
            <div style={{ height: '30px' }} />
            <Row gutter={8}>
              <Col span={12}>
                <Button block>
                  <Trans id="Cancel" />
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  block
                  htmlType="submit"
                  className="button-red uppercase"
                  loading={
                    this.props.loading.effects[
                      'reception_patientProfile/checkout'
                    ]
                  }
                  disabled={!this.state.paymentComplete}
                >
                  &nbsp;
                  <Trans id="Save" />
                </Button>
              </Col>
            </Row>
            <MessageModal
              visible={this.state.modalMessageModalVisible}
              onCancel={() => this.showMessageModal(false)}
              type="success"
              content="Амжилттай"
            />
            <div style={{ height: '16px' }} />
            <Button
              block
              style={{ background: '#00695C', borderRadius: '4px' }}
              onClick={this.onPrintReceipt}
            >
              <span
                style={{
                  textTransform: 'uppercase',
                  margin: 'auto',
                  color: '#FFFFFF',
                }}
              >
                {i18n.t`Print`}
              </span>
            </Button>
          </div>
        </Form>
        <PaymentReceipt
          visible={this.state.modalPaymentReceiptVisible}
          onCancel={() => this.setState({ modalPaymentReceiptVisible: false })}
        />
      </div>
    )
  }
}

export default Form.create()(CheckoutPanel)
