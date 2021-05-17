// https://docs.cypress.io/api/introduction/api.html

describe('Edit Profile Test', () => {
    it('Visits the app root url', () => {
      cy.visit('localhost:8080/login')
    })
    it('Navigate to Profile', () => {
      cy.get('input[name="email"]').type('{selectAll}example@email.com')
      cy.get('input[name="password"]').type('{selectAll}password123')
      cy.get('button').contains('Sign in').click()
    })
    it('Try change user name', () => {
      cy.get('input[name="userName"]').type('{selectAll}Updated User Name')
      cy.get('button').contains('Update profile').click()
      cy.get('.v-alert').contains('Your profile is successfully updated.')
    })
    it('Try change email', () => {
      cy.get('input[name="email"]').type('{selectAll}updated@email.com')
      cy.get('button').contains('Update profile').click()
      cy.get('.v-alert').contains('Your profile is successfully updated.')
    })
    it('Try change newsletter', () => {
      cy.get('input[name="newsletter"]').uncheck({ force: true })
      cy.get('button').contains('Update profile').click()
      cy.get('.v-alert').contains('Your profile is successfully updated.')
    })
    it('Try reset profile', () => {
      cy.get('input[name="userName"]').type('{selectAll}Sample User')
      cy.get('input[name="email"]').type('{selectAll}example@email.com')
      cy.get('input[name="newsletter"]').check({ force: true })
      cy.get('button').contains('Update profile').click()
      cy.get('.v-alert').contains('Your profile is successfully updated.')
    })
  })
  