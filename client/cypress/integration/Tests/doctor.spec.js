describe('My first test', function() {
  it('SignInDoctor', function() {
    cy.visit('https://demo.livercenter.mn')
    cy.get('input[name = username]').type('myagmarjav')
    cy.get('input[name = password]').type('123')
    cy.get('button[name = signIn]').click()
  })

  it('Customers List', function() {
    cy.get(':nth-child(3) > a').click()
    cy.get('.ant-input').type('Болд')
    cy.get('.ant-input-group-addon > .ant-btn').click()
    cy.get('.ant-table-tbody > tr ').should('have.length', 20)
    cy.wait(5000)

    cy.get('.ant-table-tbody')
      .find('> tr')
      .eq(0)
      .click()
    cy.wait(2000)

    //D-Livr button
    //cy.get('.ant-btn-block').contains('D-LIVR').click()
    //cy.get('.ant-row-flex > .ant-btn').click()
    //cy.get('.ant-row-flex > :nth-child(2) > .ant-btn').click()

    //cy.get(':nth-child(3) > .ant-collapse').click()
    // cy.wait(1000)

    cy.get(':nth-child(5) > .ant-collapse ').click()
    cy.get('.ant-tabs-tab')
      .contains('Зовуурь нэмэх')
      .click()
    cy.wait(2000)

    /*cy.get('.ant-select-arrow').click()*/
    cy.get(':nth-child(1) > .ant-row .ant-select-selection').click()
    cy.contains('Өвдөнө').click({ force: true })
    cy.wait(1000)

    /*cy.get(':nth-child(2) > .ant-row .ant-select-selection').click()
    cy.contains('Арьс').click()*/

    //save
    cy.get('.ant-row-flex > .button-red').click()
    cy.wait(1000)

    //delete
    cy.get('tbody > :nth-child(2) > :nth-child(4) > .ant-btn').click()
    cy.wait(3000)

    //plus
    cy.get(':nth-child(1) > .ant-row-flex > .ant-btn').click()
    cy.wait(2000)

    //see
    cy.get('.ant-tabs-tab')
      .contains('Зовуурь')
      .click()
    cy.wait(2000)

    //close
    cy.get('.button-grey').click({ force: true })
    cy.wait(5000)

    cy.get(
      ':nth-child(5) > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-arrow'
    ).click()

    cy.get(':nth-child(7) .ant-collapse-arrow').click()
    cy.get('.ant-tabs-tab')
      .contains('Өвчний түүх нэмэх')
      .click()
    cy.wait(2000)

    //1
    cy.get(
      ':nth-child(1) > [style="padding-top: 5px; padding-bottom: 5px;"] > .ant-row .ant-select '
    ).click()
    cy.contains('Толгой өвдөнө').click({ force: true })
    cy.wait(4000)
    /* cy.get('.ant-input-wrapper > .ant-input').each($e1, index, $list)=>
{
  if($e1.twxt() === "hospital")
  {
    $e1.click()
  }
})*/
    //2
    cy.get('.ant-input-wrapper > .ant-input').type('hospital')
    cy.get('.ant-row > :nth-child(1) .ant-input-group-addon .ant-btn').click()
    cy.get('.ant-input-wrapper > .ant-input').click()
    cy.wait(5000)

    //3
    cy.get('.ant-calendar-picker-input').click({ force: true })
    cy.wait(4000)
    cy.get('.ant-calendar-picker-input').click()
    cy.wait(1000)

    //4
    //cy.get(':nth-child(4) .ant-select').
    //cy.get(':nth-child(4) > [style="padding-top: 5px; padding-bottom: 5px;"] > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection').should('have.value', 'Эмнэлгийг сонгоно уу')
    //cy.wait(5000)
    //cy.get(':nth-child(4) .ant-select')
    //cy.get(':nth-child(4) > [style="padding-top: 5px; padding-bottom: 5px;"] > .ant-row > .ant-form-item-control-wrapper > .ant-form-item-control > .ant-form-item-children > .ant-select > .ant-select-selection').select('Улсын нэгдүгээр төв эмнэлэг').should('have.value', 'Улсын нэгдүгээр төв эмнэлэг')

    cy.get(':nth-child(4) .ant-select > .ant-select-selection').click({
      force: true,
    })
    cy.wait(5000)
    cy.contains('Улсын нэгдүгээр төв эмнэлэг').click()
    cy.wait(5000)

    cy.get(':nth-child(5) .ant-select > .ant-select-selection').click()
    cy.wait(5000)
    cy.contains('Энэрэл эмнэлэг').click({ force: true })
    cy.wait(2000)

    //5
    //(':nth-child(3) > .ant-checkbox')
    cy.get(':nth-child(3) > .ant-checkbox > .ant-checkbox-input')
      .check()
      .should('be.checked')
      .and('have.value', 'NoTreatmentReceived')
    cy.get(':nth-child(3) > .ant-checkbox > .ant-checkbox-input')
      .uncheck()
      .should('not.be.checked')
    cy.get('input[type = "checkbox"]').check([
      'NonPharmacologicalTreatment',
      'AdministrationOfDrugOrMedicament',
    ])

    //6
    cy.get(
      ':nth-child(7) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-input'
    )
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    //7

    cy.get('[style="flex-grow: 1;"] .ant-input')
      .type('5')
      .should('have.value', '5')
    /* cy.get('[style="flex-grow: 9; margin-left: 4px;"] > .ant-select').click()
cy.wait(2000)
cy.contains('Өдөр').click({force:true})
cy.wait(2000)
*/

    //8
    cy.get(
      ':nth-child(9) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-input'
    )
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    //9
    cy.get('.ant-select-selection--multiple').type('Элэг')
    cy.get('.ant-select-dropdown-menu-item').each(($e1, index, $list) => {
      if ($e1.text() === 'Элэгний С вирүсийн эсрэг бие тодорхойлох ') {
        $e1.click()
      }
    })

    cy.get(':nth-child(11) .ant-input')
      .type('--GOO--', { force: true })
      .should('have.value', '--GOO--')

    cy.get(':nth-child(12) .ant-input')
      .type('--GOD--', { force: true })
      .should('have.value', '--GOD--')

    cy.get(':nth-child(13) .ant-input')
      .type('1', { force: true })
      .should('have.value', '1')

    cy.get(':nth-child(14) .ant-input')
      .type('--GOO--', { force: true })
      .should('have.value', '--GOO--')

    cy.get(':nth-child(15) .ant-input')
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    cy.get(':nth-child(16) .ant-input')
      .type('--GOO--', { force: true })
      .should('have.value', '--GOO--')

    //end
    //cy.get('.ant-row-flex > :nth-child(1) > .ant-btn').click()

    cy.get('.ant-row-flex > :nth-child(2) > .ant-btn').click()
    cy.wait(5000)

    //Life history
    cy.get(':nth-child(9) .ant-collapse').click()
    cy.get('.ant-tabs-tab')
      .contains('Амьдралын түүх нэмэх')
      .click()
    cy.wait(2000)

    //1
    cy.get(
      ':nth-child(1) > .ant-form > .ant-collapse .ant-collapse-arrow'
    ).click()
    cy.get(
      ':nth-child(1) > [style="padding-top: 5px; padding-bottom: 5px;"] > .ant-form-item .ant-row .ant-select-selection'
    ).click()
    cy.contains('Хэвийн').click()

    //2
    cy.get(':nth-child(8) .ant-checkbox > .ant-checkbox-input')
      .check()
      .should('be.checked')
      .and('have.value', 'LivesAlone')
    cy.get(':nth-child(8) .ant-checkbox > .ant-checkbox-input')
      .uncheck()
      .should('not.be.checked')
    cy.get('input[type = "checkbox"]').check([
      'LivesWithWife',
      'LivesWithSon',
      'LivesWithDaughter',
      'LivesWithMother',
      'LivesWithFather',
    ])
    cy.get('input[type = "checkbox"]').check([
      'LivesWithRelatives',
      'LivesWithSpouse',
      'Other',
    ])

    cy.get('.ant-checkbox-group > .ant-input')
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    //
    cy.get(
      ':nth-child(3) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row .ant-select > .ant-select-selection'
    ).click()
    cy.contains('Дутуу төрсөн').click({ force: true })

    cy.get(':nth-child(4) .ant-row .ant-input')
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    cy.get(':nth-child(5) .ant-row .ant-input')
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    cy.get('[value = "true"]')
      .check()
      .should('be.checked')

    cy.get(':nth-child(4) .ant-calendar-picker-input').click()
    //cy.contains('2021-07-11').click({force:true})

    cy.get(':nth-child(7) .ant-row > :nth-child(2) > .ant-input')
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    cy.get(
      '.ant-collapse-content-box > .ant-row-flex > :nth-child(2) > .ant-btn'
    ).click()
    cy.wait(1000)
    cy.get(
      '.ant-collapse-content-box > .ant-row-flex > :nth-child(1) > .ant-btn'
    ).click({ force: true })

    //Womans Quiz
    cy.get(
      ':nth-child(3) > .ant-form > .ant-collapse .ant-collapse-arrow'
    ).click()

    cy.get(
      ':nth-child(1) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row .ant-input'
    )
      .type('4', { force: true })
      .should('have.value', '4')

    cy.get(
      ':nth-child(2) > [style="padding-top: 5px; padding-bottom: 5px;"] > .ant-form-item .ant-row > :nth-child(2) :nth-child(2) > .ant-radio > .ant-radio-input'
    )
      .check({ force: true })
      .should('be.checked')
      .and('have.value', 'false')

    cy.get(
      ':nth-child(4) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('2', { force: true })
      .should('have.value', '2')

    cy.get(
      ':nth-child(6) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('11')
      .should('have.value', '11')

    cy.get('[style="display: flex; width: 60%;"] > .ant-calendar-picker')

    cy.get(
      ':nth-child(8) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('8')
      .should('have.value', '8')

    cy.get(':nth-child(7) :nth-child(2) > .ant-radio > .ant-radio-input')
      .check()
      .should('be.checked')
      .and('have.value', 'Hypomenorrhea')

    cy.get(
      ':nth-child(9) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('9', { force: true })
      .should('have.value', '9')

    cy.get(
      ':nth-child(10) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('10', { force: true })
      .should('have.value', '10')

    cy.get(
      ':nth-child(11) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('11', { force: true })
      .should('have.value', '11')

    cy.get(
      ':nth-child(12) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('12', { force: true })
      .should('have.value', '12')

    cy.get(
      ':nth-child(13) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('13', { force: true })
      .should('have.value', '13')

    cy.get(
      ':nth-child(14) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('14', { force: true })
      .should('have.value', '14')

    cy.get(
      ':nth-child(15) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('15', { force: true })
      .should('have.value', '15')

    cy.get(
      ':nth-child(16) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('16', { force: true })
      .should('have.value', '16')

    cy.get(
      ':nth-child(17) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('17', { force: true })
      .should('have.value', '17')

    cy.get(
      ':nth-child(18) > [style="padding-top: 5px; padding-bottom: 5px;"] :nth-child(2) > .ant-radio > .ant-radio-input'
    )
      .check({ force: true })
      .should('be.checked')
      .and('have.value', 'false')

    cy.get('[value = "true"]')
      .check({ force: true })
      .should('be.checked')

    cy.get(
      ':nth-child(21) > [style="padding-top: 5px; padding-bottom: 5px;"] .ant-row > :nth-child(2) > .ant-input-affix-wrapper > .ant-input'
    )
      .type('3', { force: true })
      .should('have.value', '3')

    // 
    cy.get('input[type = "checkbox"]').check([
      'DoesNotUseContraception',
      'TryingToConceive',
      'Other',
    ])

    cy.get('[style="padding-top: 5px; padding-bottom: 5px;"] :nth-child(1) > :nth-child(2) > .ant-row .ant-input')
      .type('Other')
      .should('have.value', 'Other')


    cy.get(':nth-child(10) .ant-checkbox > .ant-checkbox-input')
      .check()
      .should('be.checked')
      .and('have.value', 'ContraceptionNeedComplicatedByMedicalCondition')

      
      cy.get('input[type = "checkbox"]').check([
        'InflammatoryDisorder', 
        'MalignantNeoplasmOfUterus', 
        'SexuallyTransmittedInfectiousDisease',
        'InflammationOfCervix', 
        'Vaginitis',
        'NeoplasmOfBreast',
      ])

      cy.get(':nth-child(23) > [style="padding-top: 5px; padding-bottom: 5px;"] :nth-child(1) > :nth-child(2) > .ant-row :nth-child(7) .ant-checkbox > .ant-checkbox-input')
      .check()
      .should('be.checked')
      .and('have.value', 'Other')
      
      cy.get(':nth-child(23) .ant-row .ant-input')
      .type('Other', {force:true})
      .should('have.value', 'Other')


      //
      cy.get(':nth-child(24) .ant-row > :nth-child(2) > .ant-input')
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

      //end
      cy.get(':nth-child(3) > .ant-form :nth-child(2) > .ant-btn')
        .click()
      cy.wait(2000)

      

      
    

      




  })
})
