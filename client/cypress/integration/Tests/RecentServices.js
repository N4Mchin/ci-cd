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
    cy.wait(4000)
    cy.get('.styles__overflowContent___3IPrr').each(($el, index, $list) => {
      const textVeg = $el.find('span').text()
      if (textVeg.includes('HCV-RNA')) {
        $el.find('span').trigger('click')
      }
    })
    cy.wait(5000)

    cy.get('.ant-tabs-tab').each(($el, index, $list) => {
      const textVeg = $el.find('span').text()
      if (textVeg.includes('Багажийн шинжилгээ')) {
        $el.find('span').trigger('click')
      }
    })
    cy.wait(4000)

    cy.get('.ant-tabs-tab').each(($el, index, $list) => {
      const textVeg = $el.find('span').text()
      if (textVeg.includes('Эмчийн үзлэг')) {
        $el.find('span').trigger('click')
      }
    })
  })
})
