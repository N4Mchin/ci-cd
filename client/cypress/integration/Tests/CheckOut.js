import Log from '../LogIn/Log'
import Search from '../LogIn/Search'
import Check from '../LogIn/Check'

describe('demo SignIn', () => {
  it('Sign In', () => {
    const log = new Log()
    const search = new Search()
    const check = new Check()
    log.signIn()
    cy.get('.ant-avatar').should('be.visible')

    search.searching()
    check.Checked()
    // cy.wait(5000)
    // cy.get('.ant-collapse-content-box')
    //   .find('[data-icon="plus"]')
    //   .click({ multiple: true, force: true })
    // cy.get('.ant-collapse-content-box')
    //   .find('.ant-checkbox-input')
    //   .not('[disabled]')
    //   .check()

    // cy.wait(5000)
    // cy.get('.ant-checkbox-wrapper')
    //   .find('.ant-checkbox-inner')
    //   .check({ multiple: true, force: true })
    // cy.get('.ant-input .ant-input').type('120000')
  })
})
