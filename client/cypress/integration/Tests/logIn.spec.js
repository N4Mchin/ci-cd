/// <reference types="Cypress"/>
import Log from '../LogIn/Log'

context('demo livercenter', () => {
  it('Sign In', () => {
    const log = new Log()
    log.signIn()
    cy.get('.ant-avatar').should('be.visible')
  })
})
