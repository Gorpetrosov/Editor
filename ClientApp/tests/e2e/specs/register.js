// https://docs.cypress.io/api/introduction/api.html

describe('Register Test', () => {
    it('Visits the app root url', () => {
      cy.visit('localhost:8080/sign-up')
    })
    it('Try sign up with existing user name', () => {
      cy.get('input[name="userName"]').type('Sample User')
      cy.get('input[name="email"]').type('example@email.com')
      cy.get('input[name="password"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password123')
      cy.get('[type="checkbox"]').check({ force: true })
      
      cy.get('button').contains('Sign up').click()
      cy.get('.v-alert').contains('This user name is already in use!')
    })
    it('Try sign up with existing email', () => {
      cy.get('input[name="userName"]').type('{SelectAll} New Sample User')
      cy.get('button').contains('Sign up').click()
      cy.get('.v-alert').contains('This email is already in use!')
    })
    it('Try sign up', () => {
      cy.get('input[name="userName"]').type('{selectAll}New Sample User')
      cy.get('input[name="email"]').type('{selectAll}newexample@email.com')
      
      cy.get('button').contains('Sign up').click()
    })
    it('Try login with new account', () => {
      cy.visit('localhost:8080/login')
      cy.get('input[name="email"]').type('{selectAll}newexample@email.com')
      cy.get('input[name="password"]').type('{selectAll}password123')
      
      cy.get('button').contains('Sign in').click()
      cy.get('.v-alert').contains('You have not confirmed your e-mail address yet.')
    })
  })
  