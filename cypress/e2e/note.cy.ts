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

describe('test note', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/note/index')
  })

  it('create note', () => {
    clickAddButton()

    const content = faker.name.findName()

    typeInputRandomValue('content', content);
    clickOkButton()
    clickLastPaginationButton()

    cy.contains(content)
  })

  it('edit note', () => {
    const content = faker.name.findName()

    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('content', content);
    clickOkButton()
    clickLastPaginationButton()

    cy.contains(content)
  })

  it('delete note', () => {
    testDelete()
  })

  it('restore note', () => {
    testRestore()
  })

  it('force delete note', () => {
    testDelete()
    testForceDelete()
  })
});
