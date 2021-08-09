class Check {
  getFindCheck() {
    return cy.get('.ant-collapse-content-box').find('[data-icon="plus"]')
  }
  getNotDisabled() {
    return cy
      .get('.ant-collapse-content-box')
      .find('.ant-checkbox-input')
      .not('[disabled]')
  }
  getWait() {
    return cy.wait(5000)
  }
  // getFind() {
  //   return cy.get('.ant-checkbox-wrapper').find('.ant-checkbox-inner')
  // }
  Checked() {
    this.getWait()
    this.getFindCheck().click({ multiple: true, force: true })
    this.getNotDisabled().check()
    return this.getWait()
    // return this.getFind().check({ multiple: true, force: true })
  }
}

export default Check
