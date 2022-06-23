import {
  login,
  typeInputRandomValue,
  clickOkButton,
  clickEditButton,
} from '../support/helpers'

describe('socialite client', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/socialiteClient/index')
  })

  it('edit socialite client', () => {
    clickEditButton()
    typeInputRandomValue('client_id');
    typeInputRandomValue('client_secret');
    clickOkButton()
  })
});
