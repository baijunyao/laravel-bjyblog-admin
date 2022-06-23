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

describe('test site', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/site/index')
  })

  it('create site', () => {
    clickAddButton()

    const description = faker.name.findName()
    typeInputRandomValue('name');
    typeInputRandomValue('description', description);
    typeInputRandomValue('url', faker.internet.url());
    typeInputRandomValue('sort', faker.datatype.number());
    cy.contains('span', 'Yes').first().click()
    clickOkButton()

    clickLastPaginationButton()
    cy.contains(description)
  })

  it('edit site', () => {
    const description = faker.name.findName()
    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('name');
    typeInputRandomValue('description', description);
    typeInputRandomValue('url', faker.internet.url());
    typeInputRandomValue('sort', faker.datatype.number());
    cy.contains('span', 'Yes').first().click()
    clickOkButton()

    clickLastPaginationButton()
    cy.contains(description)
  })

  it('delete site', () => {
    testDelete()
  })

  it('restore site', () => {
    testRestore()
  })

  it('force delete site', () => {
    testDelete()
    testForceDelete()
  })
});
