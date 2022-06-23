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

describe('test category', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/category/index')
  })

  it('create category', () => {
    clickAddButton()

    const description = faker.name.findName()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)
  })

  it('edit category', () => {
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

  it('delete category', () => {
    testDelete()
  })

  it('restore category', () => {
    testRestore()
  })

  it('force delete category', () => {
    testDelete()
    testForceDelete()
  })
});
