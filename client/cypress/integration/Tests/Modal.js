/// <reference types="Cypress"/>
import Log from '../LogIn/Log'

context('demo livercenter', () => {
  it('Sign In', () => {
    const log = new Log()
    log.signIn()
    cy.get('.ant-avatar').should('be.visible')
    
    cy.get(".button-red").click()
    cy.wait(5000)

    cy.get(":nth-child(1) > :nth-child(1) > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-input").type("Hello")
  })
})
