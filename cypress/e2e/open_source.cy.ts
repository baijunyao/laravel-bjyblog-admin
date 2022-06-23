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

describe('test open source', () => {
  beforeEach(() => {
    login();
    cy.visit('/admin/#/admin/openSource/index')

  })

  it('create open source', () => {
    clickAddButton()

    const name = faker.name.findName()
    typeInputRandomValue('name', name);
    typeInputRandomValue('sort', faker.datatype.number());
    cy.contains('.ant-radio-wrapper span', 'Gitee').first().click()
    clickOkButton()

    clickLastPaginationButton()
    cy.contains(name)
  })

  it('edit open source', () => {
    const name = faker.name.findName()

    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('name', name);
    typeInputRandomValue('sort', faker.datatype.number());
    cy.contains('.ant-radio-wrapper span', 'Gitee').first().click()
    clickOkButton()

    clickLastPaginationButton()
    cy.contains(name)
  })

  it('delete open source', () => {
    testDelete()
  })

  it('restore open source', () => {
    testRestore()
  })

  it('force delete open source', () => {
    testDelete()
    testForceDelete()
  })
});
