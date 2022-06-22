const faker = require('faker');

describe('test config', () => {
  beforeEach(() => login())

  describe('test email', () => {
    beforeEach(() => login())

    it('email', () => {
      cy.visit('/admin/#/admin/config/email')

      const idAndValues = {
        156: faker.name.findName(),
        155: faker.internet.port(),
        142: faker.internet.email(),
        143: faker.name.findName(),
        144: faker.name.findName(),
        145: faker.name.findName(),
        157: faker.internet.email(),
      }

      Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
      clickSubmitButtonContainSuccess()

      clearInputValue(143);
      clearInputValue(144);

      clickSubmitButtonContainSuccess()
    })
  });

  it('comment audit', () => {
    cy.visit('/admin/#/admin/config/commentAudit')

    const idAndValues = {
      174: faker.name.findName(),
      175: faker.name.findName(),
      176: faker.name.findName(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()
  })

  it('qq group', () => {
    cy.visit('/admin/#/admin/config/qqQun')

    const idAndValues = {
      150: faker.name.findName(),
      151: faker.name.findName(),
      152: faker.name.findName(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()
  })

  it('upload', () => {
    cy.visit('/admin/#/admin/config/upload')

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

  it('seo', () => {
    cy.visit('/admin/#/admin/config/seo')

    const idAndValues = {
      101: faker.name.findName(),
      149: faker.name.findName(),
      102: faker.name.findName(),
      103: faker.name.findName(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()

    Object.keys(idAndValues).forEach(name => clearInputValue(name))
    clickSubmitButtonContainSuccess()
  })

  it('social share', () => {
    cy.visit('/admin/#/admin/config/socialShare')

    const idAndValues = {
      169: faker.name.findName(),
      170: faker.name.findName(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()

    Object.keys(idAndValues).forEach(name => clearInputValue(name))
    clickSubmitButtonContainSuccess()
  })

  it('social link', () => {
    cy.visit('/admin/#/admin/config/socialLink')

    const idAndValues = {
      188: faker.internet.url(),
      189: faker.internet.url(),
      190: faker.internet.url(),
      191: faker.internet.url(),
      192: faker.internet.url(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()

    Object.keys(idAndValues).forEach(name => clearInputValue(name))
    clickSubmitButtonContainSuccess()
  })

  it('search', () => {
    cy.visit('/admin/#/admin/config/search')

    const idAndValues = {
      178: faker.name.findName(),
      179: faker.name.findName(),
      180: faker.name.findName(),
      181: faker.name.findName(),
      182: faker.name.findName(),
      183: faker.name.findName(),
      184: faker.name.findName(),
      186: faker.name.findName(),
      187: faker.name.findName(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()

    Object.keys(idAndValues).forEach(name => clearInputValue(name))
    clickSubmitButtonContainSuccess()
  })

  it('other setting', () => {
    cy.visit('/admin/#/admin/config/otherSetting')

    const idAndValues = {
      117: faker.name.findName(),
      125: faker.name.findName(),
      119: faker.name.findName(),
      141: faker.name.findName(),
      107: faker.name.findName(),
      118: faker.internet.email(),
    }

    Object.keys(idAndValues).forEach(key => typeInputRandomValue(key, idAndValues[key]))
    clickSubmitButtonContainSuccess()

    Object.keys(idAndValues).forEach(name => clearInputValue(name))
    clickSubmitButtonContainSuccess()
  })
});
