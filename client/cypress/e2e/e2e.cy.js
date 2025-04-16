/// <reference types="cypress" />

describe('e2e tests', {defaultCommandTimeout: 30000}, () => {
    //Setup homepage navigation before all tests
    beforeEach(() => {
      cy.visit({url:'https://buyers-beacon-client-test.vercel.app/'})
      cy.contains('h1', 'Find What You Need')
        .should('be.visible')
    })
  
    //Test browse and search, 0 results expected
    it('navigate to browse and search', () => {
      // cy.get('a:visible').contains('Browse Beacons').click();
      // cy.contains('h1', 'Browse Beacons')
      //   .should('be.visible')
      // cy.get('[name="QueryString"]').type('asdkjhsdlkshdfg');
      // cy.contains('button', 'Search').click()
      // cy.contains('h1', 'No Beacons found')
      //   .should('be.visible')
    })
  
    //Test navigation to About page, button should be visible
    it('navigate to about page', () => {
      cy.get('a:visible').contains('About Us').click();
      cy.contains('h2', 'Our Mission')
        .should('be.visible')
      cy.contains('a', 'Create Your First Beacon')
        .should('be.visible')
    })
  
    //Test navigation to Help page
    it('navigate to help page', () => {
      cy.get('a:visible').contains('Help Center').click();
      cy.contains('h1', 'Help Center')
        .should('be.visible')
      cy.contains('h2', 'Frequently Asked Questions')
        .should('be.visible')
    })
  })
  