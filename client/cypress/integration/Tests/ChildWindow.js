// const { should } = require('chai')

describe('demo SignIn', () => {
  it('Sign In', () => {
    cy.visit('http://localhost:7000/')
    cy.get('input[name=username]').type('munkhzaya')
    cy.get('input[name=password]').type('123')
    cy.get('button[name=signIn]').click()
    cy.get('.ant-avatar').should('be.visible')

    cy.get('.ant-input').type('Халиун')
    cy.get('.ant-input-group-addon > .ant-btn').click()
    cy.get('.ant-table-tbody > tr').should('have.length', 20)
    cy.wait(5000)
    cy.get('.ant-table-tbody')
      .find('> tr')
      .eq(2)
      .click()
    cy.wait(5000)
    // cy.get('.CheckoutPanel__checkout___761GU')
    //   .find('button[name=Print]')
    //   .click()
    cy.get('.CheckoutPanel__checkout___761GU').each(($el, index, $list) => {
      const textVeg = $el.find('span').text()
      if (textVeg.includes('Хэвлэх')) {
        $el.find('span').trigger('click')
      }
    })
  })
})
