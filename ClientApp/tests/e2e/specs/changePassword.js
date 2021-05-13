// https://docs.cypress.io/api/introduction/api.html

describe('Change Password Test', () => {
    it('Visits the app root url', () => {
      cy.visit('localhost:8080/login')
    })
    it('Navigate to Change Password', () => {
      cy.get('input[name="email"]').type('{selectAll}example@email.com')
      cy.get('input[name="password"]').type('{selectAll}password123')
      cy.get('button').contains('Sign in').click()
      cy.get('#goToChangePassword').click()
    })
    it('Try change password with same passwords', () => {
      cy.get('input[name="oldPassword"]').type('password123')
      cy.get('input[name="newPassword"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password123')
      cy.get('.v-messages').contains('Password cannot match the current one')
    })
    it('Try change password with different passwords', () => {
      cy.get('input[name="newPassword"]').type('{selectAll}password1234')
      cy.get('.v-messages').contains('Password confirmation does not match')
    })
    it('Try change password with false old password', () => {
      cy.get('input[name="oldPassword"]').type('{selectAll}password12')
      cy.get('input[name="confirmPassword"]').type('{selectAll}password1234')
      cy.get('.v-messages').contains('Password confirmation does not match')
      cy.get('button').contains('Change password').click()
      cy.get('.v-alert').contains('Wrong password.')
    })
    it('Try change password', () => {
      cy.get('input[name="oldPassword"]').type('{selectAll}password123')
      cy.get('button').contains('Change password').click()
      cy.get('.v-alert').contains('Your password is successfully changed.')
    })
    it('Try reset password', () => {
      cy.get('input[name="oldPassword"]').type('{selectAll}password1234')
      cy.get('input[name="newPassword"]').type('{selectAll}password123')
      cy.get('input[name="confirmPassword"]').type('{selectAll}password123')
      cy.get('button').contains('Change password').click()
      cy.get('.v-alert').contains('Your password is successfully changed.')
    })
  })
  