const faker = require('faker');

function clickFirstHandleButton() {
  cy.get('.handle-btn:first').click()
}

function clickLastHandleButton() {
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

function clickSubmitButton() {
  cy.contains('button', 'Submit').first().click()
}

function clickSubmitButtonContainSuccess() {
  cy.contains('button', 'Submit').first().click()
  cy.contains('Success')
}

function clickLastPaginationButton() {
  cy.get('.ant-pagination-item:last').click()
}

function typeInputRandomValue(id: string|number, value = null) {
  value = value === null ? faker.name.findName() : value;

  cy.get(`#${id}`).focus().clear().type(value)
}

function clearInputValue(id: string|number, value = null) {
  cy.get(`#${id}`).focus().clear()
}

function testDelete() {
  cy.get('.handle-btn:last').click()
  cy.get('.handle-delete-btn:last').click()
}

function testRestore() {
  cy.get('.handle-btn:last').click()
  cy.get('.handle-restore-btn:last').click()
}

function testForceDelete() {
  cy.get('.handle-btn:last').click()
  cy.get('.handle-force-delete-btn:last').click()
}

function login() {
  cy.request('POST', '/oauth/token', {
    grant_type: 'password',
    client_id: 1,
    scope: '',
    username: 'test@test.com',
    password: Cypress.env('BLOG_PASSWORD'),
  }).then(response => {
    localStorage.setItem('token', response.body.access_token);
  })
}

export {
  clickFirstHandleButton,
  clickLastHandleButton,
  clickAddButton,
  clickEditButton,
  clickOkButton,
  clickSubmitButton,
  clickSubmitButtonContainSuccess,
  clickLastPaginationButton,
  typeInputRandomValue,
  clearInputValue,
  testDelete,
  testRestore,
  testForceDelete,
  login,
}
