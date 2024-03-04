describe('template spec', () => {
  it('passes', () => {
    cy.visit('/add-drink')
    cy.get("[e2e-id='input-drink-name']")
  })
})