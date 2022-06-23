import {
  login,
  clickAddButton,
  typeInputRandomValue,
  clickOkButton,
  clickLastPaginationButton,
  clickLastHandleButton,
  clickEditButton,
  testDelete,
  testRestore,
  testForceDelete,
} from '../support/helpers'

const faker = require('faker');

describe('test tag', () => {
  beforeEach(() => {
    login()
    cy.visit('/admin/#/admin/tag/index')
  })

  it('create tag', () => {
    clickAddButton()

    const description = faker.name.findName()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)
  })

  it('edit tag', () => {
    const description = faker.name.findName()

    clickLastPaginationButton()
    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)
  })

  it('delete tag', () => {
    testDelete()
  })

  it('restore tag', () => {
    testRestore()
  })

  it('force delete tag', () => {
    testDelete()
    testForceDelete()
  })
});
