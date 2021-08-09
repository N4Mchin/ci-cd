class Log {
  getLogIn() {
    return cy.get('input[name=username]').type('munkhzaya')
  }
  getPass() {
    return cy.get('input[name=password]').type('123')
  }
  getButton() {
    return cy.get('button[name=signIn]').click()
  }

  signIn() {
    cy.visit('http://demo.livercenter.mn/')
    this.getLogIn()
    this.getPass()
    return this.getButton()
  }
}

export default Log
