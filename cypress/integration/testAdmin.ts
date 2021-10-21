const faker = require('faker');

function clickFirstHandleButton() {
  cy.get('.handle-btn:first').click()
}

function clickLastHandleButton() {
  cy.get('.handle-btn:last').click()
}

function clickAddButton() {
  cy.contains('button', 'Add').click()
}

function clickEditButton() {
  cy.get('.handle-edit-btn:last').click()
}

function clickOkButton() {
  cy.contains('button', 'OK').first().click()
}

function clickSubmitButton() {
  cy.contains('button', 'Submit').first().click()
}

function clickSubmitButtonContainSuccess() {
  cy.contains('button', 'Submit').first().click()
  cy.contains('Success')
}

function clickLastPaginationButton() {
  cy.get('.ant-pagination-item:last').click()
}

function typeInputRandomValue(id: string|number, value = null) {
  value = value === null ? faker.name.findName() : value;

  cy.get(`#${id}`).focus().clear().type(value)
}

function clearInputValue(id: string|number, value = null) {
  cy.get(`#${id}`).focus().clear()
}

function testDeleteRestoreForceDelete() {
  cy.get('.handle-btn:last').click()
  cy.get('.handle-delete-btn:last').click()

  cy.get('.handle-btn:last').click()
  cy.get('.handle-restore-btn:last').click()

  cy.get('.handle-btn:last').click()
  cy.get('.handle-delete-btn:last').click()

  cy.get('.handle-btn:last').click()
  cy.get('.handle-force-delete-btn:last').click()
}

describe('test login', () => {
  it('should login successful', () => {
    cy.visit('/admin/#/admin/user/login')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type(Cypress.env('BLOG_PASSWORD'))
    cy.get('.antd-pro-pages-user-login-components-login-index-login button').click()
    cy.url().should('contain', '/ant#/admin/dashboard/analysis')
  })

  it('should login fail', () => {
    cy.visit('/admin/#/admin/user/login')
    cy.get('#email').type('test@test.com')
    cy.get('#password').type(faker.internet.password())
    cy.get('.antd-pro-pages-user-login-components-login-index-login button').click()
    cy.url().should('contain', '/admin/#/admin/user/login')
  })
});

describe('test admin page', () => {
  beforeEach(() => {
    cy.request('POST', '/oauth/token', {
      grant_type: 'password',
      client_id: 1,
      scope: '',
      username: 'test@test.com',
      password: Cypress.env('BLOG_PASSWORD'),
    }).then(response => {
      localStorage.setItem('token', response.body.access_token);
    })
  })

  it('category', () => {
    cy.visit('/admin/#/admin/category/index')
    clickAddButton()

    let description = faker.name.findName()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)
    description = faker.name.findName()

    clickLastPaginationButton()
    clickLastHandleButton()
    clickEditButton()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)

    testDeleteRestoreForceDelete()
  })


  it('tag', () => {
    cy.visit('/admin/#/admin/tag/index')
    clickAddButton()

    let description = faker.name.findName()

    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)
    description = faker.name.findName()

    clickLastPaginationButton()
    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('name');
    typeInputRandomValue('keywords');
    typeInputRandomValue('description', description);
    clickOkButton()

    cy.contains(description)

    testDeleteRestoreForceDelete()
  })

  it('comment', () => {
    cy.visit('/admin/#/admin/comment/index')

    const content = faker.name.findName()

    clickFirstHandleButton()
    clickEditButton()
    typeInputRandomValue('content', content);
    clickOkButton()

    cy.contains(content)

    clickFirstHandleButton()
    cy.get('.handle-delete-btn:first').click()

    clickFirstHandleButton()
    cy.get('.handle-restore-btn:first').click()
  })

  it('admin user', () => {
    cy.visit('/admin/#/admin/adminUser/index')

    cy.get('.handle-edit-btn:first').click()
    typeInputRandomValue('name');
    typeInputRandomValue('password', Cypress.env('BLOG_PASSWORD'));
    clickOkButton()
  })

  it('socialite client', () => {
    cy.visit('/admin/#/admin/socialiteClient/index')

    clickEditButton()
    typeInputRandomValue('client_id');
    typeInputRandomValue('client_secret');
    clickOkButton()
  })

  it('socialite user', () => {
    cy.visit('/admin/#/admin/socialiteUser/index')

    cy.get('.handle-edit-btn:first').click()
    typeInputRandomValue('name');
    typeInputRandomValue('email', faker.internet.email());
    clickOkButton()
  })

  it('friend', () => {
    cy.visit('/admin/#/admin/friend/index')
    clickAddButton()

    let name = faker.name.findName()

    typeInputRandomValue('name', name);
    typeInputRandomValue('url', faker.internet.url());
    typeInputRandomValue('sort', faker.datatype.number());
    clickOkButton()
    clickLastPaginationButton()

    cy.contains(name)
    name = faker.name.findName()

    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('name', name);
    typeInputRandomValue('url', faker.internet.url());
    typeInputRandomValue('sort', faker.datatype.number());
    clickOkButton()

    cy.contains(name)

    testDeleteRestoreForceDelete()
  })

  it('site', () => {
    cy.visit('/admin/#/admin/site/index')
    clickAddButton()

    let description = faker.name.findName()
    typeInputRandomValue('name');
    typeInputRandomValue('description', description);
    typeInputRandomValue('url', faker.internet.url());
    typeInputRandomValue('sort', faker.datatype.number());
    cy.contains('span', 'Yes').first().click()
    clickOkButton()

    clickLastPaginationButton()
    cy.contains(description)

    description = faker.name.findName()
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

    testDeleteRestoreForceDelete()
  })

  it('note', () => {
    cy.visit('/admin/#/admin/note/index')
    clickAddButton()

    let content = faker.name.findName()

    typeInputRandomValue('content', content);
    clickOkButton()
    clickLastPaginationButton()

    cy.contains(content)
    content = faker.name.findName()

    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('content', content);
    clickOkButton()
    clickLastPaginationButton()

    cy.contains(content)

    testDeleteRestoreForceDelete()
  })

  it('open source', () => {
    cy.visit('/admin/#/admin/openSource/index')
    clickAddButton()

    let name = faker.name.findName()
    typeInputRandomValue('name', name);
    typeInputRandomValue('sort', faker.datatype.number());
    cy.contains('.ant-radio-wrapper span', 'Gitee').first().click()
    clickOkButton()

    clickLastPaginationButton()
    cy.contains(name)

    name = faker.name.findName()
    clickLastHandleButton()
    clickEditButton()
    typeInputRandomValue('name', name);
    typeInputRandomValue('sort', faker.datatype.number());
    cy.contains('.ant-radio-wrapper span', 'Gitee').first().click()
    clickOkButton()

    clickLastPaginationButton()
    cy.contains(name)

    testDeleteRestoreForceDelete()
  })

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

  it('backup', () => {
    cy.visit('/admin/#/admin/config/backup')

    const idAndValues = {
      160: faker.name.findName(),
      161: faker.name.findName(),
      162: faker.name.findName(),
      163: faker.name.findName(),
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
