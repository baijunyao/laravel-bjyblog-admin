const faker = require('faker');

function testDeleteRestoreForceDelete() {
  cy.get('.handle-btn:last').click()
  cy.get('.handle-delete-btn:last').click()

  cy.get('.handle-btn:last').click()
  cy.get('.handle-restore-btn:last').click()

  cy.get('.handle-btn:last').click()
  cy.get('.handle-delete-btn:last').click()

  cy.get('.handle-btn:last').click()
  cy.get('.handle-force-delete-btn:last').click()
}

describe('test login', () => {
  it('should login successful', () => {
    cy.visit('/ant/#/ant/user/login')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type(Cypress.env('BLOG_PASSWORD'))
    cy.get('.antd-pro-pages-user-login-components-login-index-login button').click()
    cy.url().should('contain', '/ant#/ant/dashboard/analysis')
  })

  it('should login fail', () => {
    cy.visit('/ant/#/ant/user/login')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type(faker.internet.password())
    cy.get('.antd-pro-pages-user-login-components-login-index-login button').click()
    cy.url().should('contain', '/ant/#/ant/user/login')
  })
});

describe('test admin page', () => {
  beforeEach(() => {
    cy.request('POST', '/oauth/token', {
      grant_type: 'password',
      client_id: 1,
      scope: '',
      username: 'test@test.com',
      password: Cypress.env('BLOG_PASSWORD'),
    }).then(response => {
      localStorage.setItem('token', response.body.access_token);
    })
  })

  it('category', () => {
    cy.visit('/ant/#/ant/category/index')
    cy.contains('button', 'Add').click()

    let description = faker.name.findName()

    cy.get('#name').type(faker.name.findName())
    cy.get('#keywords').type(faker.name.findName())
    cy.get('#description').type(description)
    cy.contains('button', 'OK').first().click()

    cy.contains(description)
    description = faker.name.findName()

    cy.get('.ant-pagination-item:last').click()
    cy.get('.handle-btn:last').click()
    cy.get('.handle-edit-btn:last').click()
    cy.get('#name').type(faker.name.findName())
    cy.get('#keywords').type(faker.name.findName())
    cy.get('#description').type(description)
    cy.contains('button', 'OK').first().click()

    cy.contains(description)

    testDeleteRestoreForceDelete()
  })


  it('tag', () => {
    cy.visit('/ant/#/ant/tag/index')
    cy.contains('button', 'Add').click()

    let description = faker.name.findName()

    cy.get('#name').type(faker.name.findName())
    cy.get('#keywords').type(faker.name.findName())
    cy.get('#description').type(description)
    cy.contains('button', 'OK').first().click()

    cy.contains(description)
    description = faker.name.findName()

    cy.get('.ant-pagination-item:last').click()
    cy.get('.handle-btn:last').click()
    cy.get('.handle-edit-btn:last').click()
    cy.get('#name').type(faker.name.findName())
    cy.get('#keywords').type(faker.name.findName())
    cy.get('#description').type(description)
    cy.contains('button', 'OK').first().click()

    cy.contains(description)

    testDeleteRestoreForceDelete()
  })

    cy.get('.handle-btn:last').click()
    cy.get('.handle-force-delete-btn:last').click()
  })
});
