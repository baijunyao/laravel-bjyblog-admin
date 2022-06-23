import {
  login,
  typeInputRandomValue,
  clickOkButton,
  clickFirstHandleButton,
  clickEditButton,
} from '../support/helpers'

const faker = require('faker');

describe('test comment', () => {
  beforeEach(() => {
    login()
    cy.visit('/admin/#/admin/comment/index')
  })

  it('edit comment', () => {
    const content = faker.name.findName()

    clickFirstHandleButton()
    clickEditButton()
    typeInputRandomValue('content', content);
    clickOkButton()

    cy.contains(content)
  })

  it('delete comment', () => {
    clickFirstHandleButton()
    cy.get('.handle-delete-btn:first').click()
  })

  it('restore comment', () => {
    clickFirstHandleButton()
    cy.get('.handle-restore-btn:first').click()
  })
});
