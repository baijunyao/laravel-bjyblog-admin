import {
  login,
  clickSubmitButtonContainSuccess,
  typeInputRandomValue,
  clearInputValue,
} from '../support/helpers'

const faker = require('faker');

describe('test service', () => {
  beforeEach(() => login())

  it('baidu', () => {
    cy.visit('/admin/#/admin/services/baidu')

    const idAndValues = {
      174: faker.name.findName(),
      175: faker.name.findName(),
      176: faker.name.findName(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()
  })

  it('aliyun', () => {
    cy.visit('/admin/#/admin/services/aliyun')

    const idAndValues = {
      200: faker.name.findName(),
      201: faker.name.findName(),
      202: faker.name.findName(),
      203: faker.name.findName(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()

    Object.keys(idAndValues).forEach(name => clearInputValue(name))
    clickSubmitButtonContainSuccess()
  })

  it('sentry', () => {
    cy.visit('/admin/#/admin/services/sentry')

    const idAndValues = {
      158: faker.internet.url(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()

    Object.keys(idAndValues).forEach(name => clearInputValue(name))
    clickSubmitButtonContainSuccess()
  })
});
