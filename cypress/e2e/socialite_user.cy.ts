import {
  login,
  typeInputRandomValue,
  clickOkButton,
} from '../support/helpers'

const faker = require('faker');

describe('socialite user', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/socialiteUser/index')
  })

  it('edit socialite user', () => {
    cy.get('.handle-edit-btn:first').click()
    typeInputRandomValue('name');
    typeInputRandomValue('email', faker.internet.email());
    clickOkButton()
  })
});
