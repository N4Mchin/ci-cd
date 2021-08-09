describe('demo SignIn', () => {
  it('Sign In', () => {
    cy.visit('https://demo.monosolution.co/')
    cy.get('input[name=username]').type('sumiya')
    cy.get('input[name=password]').type('123')
    cy.get('button[name=signIn]').click()
    cy.get('.ant-avatar').should('be.visible')
    

    cy.get('.ant-menu-submenu-title').click()
    cy.get(':nth-child(3) > a').click()
    cy.get('.ant-row-flex > .ant-btn').click()
    cy.get('.ant-modal-footer > .button-red').click()
    cy.wait(5000)
    // cy.get('.ant-row-flex > :nth-child(2) > .ant-btn').click()
    cy.on('.ant-row-flex > :nth-child(2) > .ant-btn', str => {
      expect(str).to.equal('Та итгэлтэй байна уу?')
    })
    cy.get('.ant-row-flex > :nth-child(2) > .ant-btn').click()
  })
})

// cy.visit('http://qaclickacademy.com/practice.php')
// cy.get('#alertbtn').click()
// cy.get('[value="Confirm"]').click()
// //window:alert
// cy.on('window:alert', str => {
//   //Mocha
//   expect(str).to.equal(
//     'Hello , share this practice page and share your knowledge'
//   )
// })

// cy.on('window:confirm', str => {
//   //Mocha
//   expect(str).to.equal('Hello , Are you sure you want to confirm?')
// })

// cy.get('#opentab')
//   .invoke('removeAttr', 'target')
//   .click()

// cy.url().should('include', 'qaclickacademy')

// cy.go('back')
