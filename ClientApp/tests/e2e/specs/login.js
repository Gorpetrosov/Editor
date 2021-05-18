// https://docs.cypress.io/api/introduction/api.html

describe('Login Test', () => {
  it('Visits the app root url', () => {
    cy.visit('localhost:8080/login')
  })
  it('Try false login', () => {
    cy.get('input[name="email"]').type('falsexample@email.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button').contains('Sign in').click()
    cy.get('.v-alert').contains('Incorrect email or password')
    
    cy.get('input[name="password"]').type('{selectAll}falsePassword123')
    cy.get('button').contains('Sign in').click()
    cy.get('.v-alert').contains('Incorrect email or password')
  })
  it('Try login', () => {
    cy.get('input[name="email"]').type('{selectAll}example@email.com')
    cy.get('input[name="password"]').type('{selectAll}password123')
    cy.get('button').contains('Sign in').click()
  })
  it('Visits the app root url', () => {
    cy.url().should('eq', 'http://localhost:8080/profile')
  })
})
