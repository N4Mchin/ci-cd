// const log = new Log()

describe('demo SignIn', () => {
  // it('Shinjilgeenii tuuhees hariu harah', () => {
  // log.signIn()
  //   cy.visit('http://localhost:7000/')
  //   cy.get('input[name=username]').type('munkhzaya')
  //   cy.get('input[name=password]').type('123')
  //   cy.get('button[name=signIn]').click()
  //   cy.get('.ant-avatar').should('be.visible')

  //   cy.get('.ant-input').type('Халиун')
  //   cy.get('.ant-input-group-addon > .ant-btn').click()
  //   cy.get('.ant-table-tbody > tr').should('have.length', 20)
  //   cy.wait(5000)
  //   cy.get('.ant-table-tbody')
  //     .find('> tr')
  //     .eq(2)
  //     .click()
  //   cy.wait(5000)
  //   cy.get('.labTestLogContainer___pBLXb').each(($el, index, $list) => {
  //     const text = $el.text()
  //     if (text.includes('VITAMIN D')) {
  //       cy.get('.ant-table-tbody')
  //         .eq(index)
  //         .next()
  //         .then(function(state) {
  //           const priceText = state.text()
  //           expect(priceText).to.equal('verified')
  //         })
  //     }
  //   })
  // })

  it('Shinjilgeenii tuuhees hariu ilgeeh', () => {
    // log.signIn()
    cy.visit('https://demo.monosolution.co/')
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
    cy.wait(8000)
    cy.get('.labTestLogContainer___pBLXb')
      .find('tr td:nth-child(2)')
      // husnegtiin mur buriig oloh
      .each(($el, index, $list) => {
        // console.log($list.length)
        const text = $el.text()
        if (text.includes('Rapid Test')) {
          cy.get('.labTestLogContainer___pBLXb')
            .find('tr td:nth-child(2)')
            .eq(index)
            .next()
            .next()
            .next()
            // cy.get('.ant-btn').should('not.have.attr', 'disabled')
            .then(function(state) {
              // state хүснэгтт төрөлтэй учраас эхний элементийг авна
              const tableCell = state[0]
              // td элементэд гарц л элемент байгаа учраас эхний элементийг авна.
              const button = tableCell.children[0]
              expect(button).not.to.have.attr('disabled')
            })
        }
      })
  })
})
// cy.get('tr td:nth-child(2)').each(($e1, index, $list) => {

//   const text=$e1.text()
//   if(text.includes("Python"))
//   {

//       cy.get("tr td:nth-child(2)").eq(index).next().then(function(price)
//       {
//        const priceText=   price.text()
//        expect(priceText).to.equal('26')
//       })
//   }

// })
