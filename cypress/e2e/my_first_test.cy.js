describe('Google test', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.title().should('include', 'Google')
  })
})