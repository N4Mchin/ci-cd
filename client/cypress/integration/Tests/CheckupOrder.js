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

    // cy.get(
    //   '.ant-col-xl-18 > :nth-child(1) > .ant-collapse > .ant-collapse-item > .ant-collapse-header'
    // ).each(($el, index, $list) => {
    //   const textVeg = $el.find('.ant-collapse-header').text()
    //   if (textVeg.includes('Эмчийн үзлэг')) {
    //     $el.find('.ant-collapse-header').trigger('click')
    //   }
    // })

    // cy.get('.ant-tabs-nav-wrap')
    //   .find('.ant-tabs-tab')
    //   .each(($el, index, $list) => {
    //     const textVeg = $el.find('.ant-tabs-tab').text()
    //     if (textVeg.includes('Д.Золзаяа')) {
    //       $el.find('.ant-tabs-tab').trigger('click')
    //     }
    //   })
    cy.get('.ant-tabs-nav-container')
      .find('.ant-tabs-tab')
      .eq(5)
      .click()
    cy.get('.ant-collapse-content-box > .ant-tabs > .ant-tabs-content').should(
      'have.length',
      1
    )
    cy.get('.ant-collapse-content-box > .ant-tabs > .ant-tabs-content').click()
    cy.get('.ant-radio-input')
      .check()
      .should('be.checked')
    cy.get('.ant-modal-footer > .ant-btn-primary').click()
  })
})
