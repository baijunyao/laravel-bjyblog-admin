const faker = require('faker');

describe('test login', () => {
  it('should login successful', () => {
    cy.visit('/admin/#/admin/user/login')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type(Cypress.env('BLOG_PASSWORD'))
    cy.get('.antd-pro-pages-user-login-components-login-index-login button').click()
    cy.url().should('contain', '/ant#/admin/dashboard/analysis')
  })

  it('should login fail', () => {
    cy.visit('/admin/#/admin/user/login')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type(faker.internet.password())
    cy.get('.antd-pro-pages-user-login-components-login-index-login button').click()
    cy.url().should('contain', '/admin/#/admin/user/login')
  })
});
