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

    //Life history
    cy.get(':nth-child(9) .ant-collapse').click()
    cy.get('.ant-tabs-tab')
      .contains('Амьдралын түүх нэмэх')
      .click()
    cy.wait(2000)

    // Men Ouiz
    cy.get(':nth-child(5) > .ant-form .ant-collapse-arrow').click()
    cy.wait(5000)

    //1

    cy.get('input[type = "checkbox"]').check([
      'OralContraception',
      'UsesACondom',
      'DrugElutingContraceptiveImplant',
      'IntrauterineDeviceContraception',
      'TubalLigationDone',
      'NotNeeded',
      'WifeDoesntAllow',
      'DeficientKnowledge',
      'Other',
    ])

    cy.get(':nth-child(1) > [style="padding: 5px;"] .ant-input')
      .type('Other', { force: true })
      .should('have.value', 'Other')

    cy.get(':nth-child(10) .ant-checkbox > .ant-checkbox-input')
      .check()
      .should('be.checked')
      .and('have.value', 'ContraceptionNeedComplicatedByMedicalCondition')

    cy.get('input[type = "checkbox"]').check([
      'DoesNotUseContraception',
      'tryingToConceive',
    ])
    //2

    cy.get('input[type = "checkbox"]').check([
      'InflammatoryDisorder',
      'SexuallyTransmittedInfectiousDisease',
      'Impotence',
      'Prostatitis',
    ])
    //busad check
    cy.get(':nth-child(2) > [style="padding: 5px;"] .ant-input')
      .type('Other', { force: true })
      .should('have.value', 'Other')

    //nemelt
    cy.get('.ant-col-13 > .ant-input')
      .type('--GOOD--', { force: true })
      .should('have.value', '--GOOD--')

    //sava
    cy.get(':nth-child(5) .ant-row-flex :nth-child(2) .ant-btn').click()
    cy.wait(3000)

    // after
    cy.get(':nth-child(2) > :nth-child(7) .ant-collapse-arrow').click()

    cy.get('input[type = "checkbox"]').check([
      'Measles',
      'ViralHepatitisTypeA',
      'ViralHepatitisTypeC',
      'Varicella',
      'ViralHepatitisTypeB',
      'IntestinalInfectiousDisease',
      'Mumps',
    ])

    cy.get(
      ':nth-child(7) :nth-child(1) > [style="padding: 5px;"] :nth-child(7) .ant-checkbox-input'
    )
      .check()
      .should('be.checked')
      .and('have.value', 'Tuberculosis')

    cy.get(
      ':nth-child(7) :nth-child(1) > [style="padding: 5px;"] :nth-child(7) .ant-checkbox-input'
    )
      .uncheck()
      .should('not.be.checked')

    cy.get(':nth-child(7) :nth-child(9) .ant-checkbox > .ant-checkbox-input')
      .check()
      .should('be.checked')
      .and('have.value', 'Other')

    cy.get(
      ':nth-child(7) [style="padding: 5px;"] .ant-checkbox-group > .ant-input'
    )
      .type('otheeer')
      .should('have.value', 'otheeer')

    cy.get('[value = "true"]')
      .check()
      .should('be.checked')

    //2
    cy.get(':nth-child(1) > .ant-select ')
      .type('а')
      .click()

    cy.get('.ant-calendar-picker-input').click() //calen
    cy.get('[colspan="0"] > .ant-input')
      .type('write') //nemelt
      .should('have.value', 'write')
    cy.get(':nth-child(3) > :nth-child(1) :nth-child(8) .ant-checkbox-input') //busad
      .check()
      .should('be.checked')
      .and('have.value', 'Other')
    cy.get(':nth-child(3) > :nth-child(1) .ant-checkbox-group > .ant-input') //bbichih
      .type('write')
      .should('have.value', 'write')

    cy.get('input[type = "checkbox"]').check({force:true}, [
      'AutomobileAccident',
      'FractureOfBone',
      'CerebrovascularAccident',
      'BurnInjury',
      'Poisoning',
      'Other',
    ])


    cy.get(':nth-child(2) > .ant-col-13 .ant-input')
      .type('write')
      .should('have.value', 'write')

    cy.get(':nth-child(5) > [style="padding: 5px;"] .ant-input')
      .type('write')
      .should('have.value', 'write')  

    cy.get(':nth-child(7) :nth-child(2) > .ant-btn').click()  

    //cy.get(':nth-child(7) :nth-child(1) > .ant-btn').click() //clear

    // Tarhwar
    cy.get(':nth-child(9) > .ant-form .ant-collapse-arrow').click()

    cy.get('[value = "true"]')
      .check({force:true})
      .should('be.checked')

    cy.get(':nth-child(2) > [style="display: flex; width: 80%;"] .ant-calendar-picker-input').click()
      
    cy.get(':nth-child(2) > :nth-child(2) > .ant-input')
      .type('where',{force:true})
      .should('have.value', 'where') //where
    cy.get('[style="display: flex;"] .ant-calendar-picker-input').click()
    cy.wait(2000) // date
    cy.get(':nth-child(9) > .ant-form  :nth-child(2) > .ant-btn').click({force:true})  //save
   
    //cy.get(':nth-child(9) > .ant-form  :nth-child(2) > .ant-btn')  //clear

    //Udamshil
   cy.get(':nth-child(2) > :nth-child(11) .ant-collapse-arrow').click()
   cy.get('.ant-form-item-children > .ant-select ').click()  //who
   cy.contains('Аав').click()

  cy.get('.ant-input-wrapper > .ant-input').type('hospital')
  cy.get('.ant-row .ant-input-search .ant-btn').click()
  /*cy.get('#\30 \.onSetAge')
  .type('10').should('have.value', '10')
  cy.get('#\30 \.note').type('note').should('have.value', 'note')*/
  cy.get('[colspan="0"] > .ant-btn').click()     //clear
  cy.get('.ant-row-flex > .button-red').click() //save
 
  cy.get(':nth-child(2) > :nth-child(11) .ant-collapse-arrow').click() 
  cy.wait(3000)
  cy.get(':nth-child(1) > .ant-row-flex > .ant-btn').click({force: true})
 //cy.get('.button-grey').click() //clear


 //harshil 
cy.get(':nth-child(13) > .ant-form .ant-collapse-arrow').click()
cy.get('.ant-collapse-content-box > :nth-child(1) > .ant-form-item-control-wrapper .ant-select').click()
cy.wait(2000)
cy.contains('Самарны харшил').click()

cy.get('#allergyNote').type('write',{force:true}).should('have.value', 'write')

//save
cy.get(':nth-child(13) :nth-child(2) > .ant-btn').click() 
//cy.get(':nth-child(13) :nth-child(2) > .ant-btn').click()

//close
cy.get(':nth-child(13) > .ant-form .ant-collapse-arrow').click()

//Zurshil
cy.get(':nth-child(15) > .ant-form .ant-collapse-arrow').click()
cy.wait(2000)


  cy.get('[value = "LightDrinker"]')
  .check({force:true})
  .should('be.checked')
  
  cy.get('[value = "Month"]')
  .check({force:true})
  .should('be.checked')
  
  cy.get(':nth-child(3) > .ant-col-16 .ant-input').type('2').should('have.value','2')
  cy.get('[style="flex-grow: 1;"] .ant-input').type('2').should('have.value','2')
  

  cy.get('[style="flex-grow: 9; margin-left: 4px;"] > .ant-select ').click()
  cy.wait(2000)
  cy.contains('Өдөр').click()
  
  cy.get(':nth-child(2) > [style="display: flex;"] .ant-calendar-picker-input').click()
  cy.wait(2000)
  cy.get('.ant-row-flex > :nth-child(1) .ant-input').type('2',{force:true}).should('have.value', '02')

  cy.get(':nth-child(2) > .ant-row-flex > :nth-child(2) .ant-input').type('1',{force:true}).should('have.value', '01')
  cy.wait(5000)

  cy.get(':nth-child(3) > .ant-input').type('15',{force:true}).should('have.value', 'write15')
  
  //cy.get(':nth-child(2) > .ant-form-item-control-wrapper :nth-child(2)  > .ant-radio')
  cy.get('[value = "ExSmoker"]')
  .check({force:true})
  .should('be.checked')


  })
})
