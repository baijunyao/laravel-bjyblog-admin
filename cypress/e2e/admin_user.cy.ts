import {
  login,
  typeInputRandomValue,
  clickOkButton,
} from '../support/helpers'

describe('admin user', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/adminUser/index')
  })

  it('edit admin user', () => {
    cy.get('.handle-edit-btn:first').click()
    typeInputRandomValue('name');
    typeInputRandomValue('password', Cypress.env('BLOG_PASSWORD'));
    clickOkButton()
  })
});
