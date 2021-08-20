const faker = require('faker');

function clickHandleButton() {
  cy.get('.handle-btn:last').click()
}

function clickAddButton() {
  cy.contains('button', 'Add').click()
}

function clickEditButton() {
  cy.get('.handle-edit-btn:last').click()
}

function clickOkButton() {
  cy.contains('button', 'OK').first().click()
}

function clickLastPaginationButton() {
  cy.get('.ant-pagination-item:last').click()
}

function typeInputRandomValue(id: string, value = null) {
  value = value === null ? faker.name.findName() : value;

  cy.get(`#${id}`).type(value)
}

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
    clickAddButton()

    let description = faker.name.findName()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)
    description = faker.name.findName()

    clickLastPaginationButton()
    clickHandleButton()
    clickEditButton()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)

    testDeleteRestoreForceDelete()
  })


  it('tag', () => {
    cy.visit('/ant/#/ant/tag/index')
    clickAddButton()

    let description = faker.name.findName()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)
    description = faker.name.findName()

    clickLastPaginationButton()
    clickHandleButton()
    clickEditButton()
    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)

    testDeleteRestoreForceDelete()
  })

  it('comment', () => {
    cy.visit('/ant/#/ant/comment/index')

    const content = faker.name.findName()

    clickHandleButton()
    clickEditButton()
    typeInputRandomValue('content', content);
    clickOkButton()

    cy.contains(content)

    testDeleteRestoreForceDelete()
  })

  it('admin user', () => {
    cy.visit('/ant/#/ant/adminUser/index')

    clickEditButton()
    typeInputRandomValue('name');
    typeInputRandomValue('password', Cypress.env('BLOG_PASSWORD'));
    clickOkButton()
  })
});
