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

describe('test friend', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/friend/index')
  })

  it('create friend', () => {
    clickAddButton()

    const name = faker.name.findName()

    typeInputRandomValue('name', name);
    typeInputRandomValue('url', faker.internet.url());
    typeInputRandomValue('sort', faker.datatype.number());
    clickOkButton()
    clickLastPaginationButton()

    cy.contains(name)
  })

  it('edit friend', () => {
    const name = faker.name.findName()
    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('name', name);
    typeInputRandomValue('url', faker.internet.url());
    typeInputRandomValue('sort', faker.datatype.number());
    clickOkButton()

    cy.contains(name)
  })

  it('delete friend', () => {
    testDelete()
  })

  it('restore friend', () => {
    testRestore()
  })

  it('force delete friend', () => {
    testDelete()
    testForceDelete()
  })
});
