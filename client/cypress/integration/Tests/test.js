/// <reference types="Cypress"/>
import Log from '../LogIn/Log'
describe('demo SignIn', () => {
  it('Sign In', () => {
    const log = new Log()
    cy.visit('http://localhost:7000/')

    log.getLogIn().type('munkhzaya')
    log.getPass().type('123')
    log.getButton().click()
    cy.get('.ant-avatar').should('be.visible')

    // cy.get(':nth-child(3) > a').click()

    // // cy.get('.ant-input').type('Халиун')
    // // cy.get('.ant-input-group-addon > .ant-btn').click()
    cy.get('.ant-table-tbody > tr').should('have.length', 20)
    cy.wait(5000)
    cy.get('.ant-table-tbody')
      .find('> tr')
      .eq(2)
      .click()
  })
})
