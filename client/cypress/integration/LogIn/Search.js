class Search {
  getText() {
    return cy.get('.ant-input')
  }
  getClick() {
    return cy.get('.ant-input-group-addon > .ant-btn')
  }
  getLength() {
    return cy.get('.ant-table-tbody > tr')
  }
  getWait() {
    return cy.wait(5000)
  }
  getFind() {
    return cy
      .get('.ant-table-tbody')
      .find('> tr')
      .eq(2)
  }
  searching() {
    this.getText().type('Халиун')
    this.getClick().click()
    this.getLength().should('have.length', 20)
    this.getWait()
    return this.getFind().click()
  }
}

export default Search
