describe('Модуль авторизации и добавления заявок ОУ и работодателя', () => {
  const login = 'testerAdmin';
  const password = 'Password1';

  beforeEach(() => {

    cy.viewport(1280, 720);
  });

  describe('Позитивные сценарии', () => {
    it('успешный вход в систему с корректными данными', () => {
      cy.visit('https://dev.profteam.su/login');
      cy.get('input[autocomplete="username"]').type(login);
      cy.get('input[autocomplete="current-password"]').type(password);
      cy.contains('button', 'Войти').click();
      cy.url({timeout: 10000}).should('include', '/account/main');
      cy.contains('Личный кабинет').should('be.visible');
    });

    it('добавление заявки на роль учебного заведения', () => {
      cy.visit('https://dev.profteam.su/login');
      cy.get('input[autocomplete="username"]').type(login);
      cy.get('input[autocomplete="current-password"]').type(password);
      cy.contains('button', 'Войти').click();
      cy.url({timeout: 10000}).should('include', '/account/main');

      cy.get('button').filter(':visible').contains('Выбрать роль').click();
      cy.contains('Выбор роли аккаунта', {timeout: 10000}).should('be.visible');
      cy.contains('Я являюсь представителем образовательной организации').click();
      cy.contains('Создание нового личного кабинета ОУ').click();
      cy.get('input[placeholder="Название вашей организации"]').type('компания');
      cy.get('textarea[placeholder="Описание вашей организации"]').type('классная компания');
      cy.get('input[placeholder="Адрес вашей организации"]').type('ленина');
      cy.contains('button', 'Добавить').click();
      cy.visit('https://dev.profteam.su/account/requests');
      // cy.contains('button', 'Удалить').click();
    });
    it('добавление заявки на роль работодателя ', () => {
      cy.visit('https://dev.profteam.su/login');
      cy.get('input[autocomplete="username"]').type(login);
      cy.get('input[autocomplete="current-password"]').type(password);
      cy.contains('button', 'Войти').click();
      cy.url({timeout: 10000}).should('include', '/account/main');

      cy.get('button').filter(':visible').contains('Выбрать роль').click();
      cy.contains('Выбор роли аккаунта', {timeout: 10000}).should('be.visible');
      cy.contains('Я являюсь представителем коммерческой организации').click();
      cy.contains('Создание нового личного кабинета работодателя').click();
      cy.get('input[placeholder="Название вашей организации"]').type('компания работы');
      cy.get('textarea[placeholder="Описание вашей организации"]').type('я даю работу');
      cy.get('input[placeholder="Адрес вашей организации"]').type('кирова 786');
      cy.contains('button', 'Добавить').click();
      cy.visit('https://dev.profteam.su/account/requests');
      // cy.contains('button', 'Удалить').click();
    });
  });
});
describe('Негативные сценарии заявок ', () => {
  const login = 'testerAdmin';
  const password = 'Password1';

  // Вспомогательная функция для входа (для тестов заявок)
  const loginUser = () => {
    cy.visit('https://dev.profteam.su/login');
    cy.get('input[autocomplete="username"]').type(login);
    cy.get('input[autocomplete="current-password"]').type(password);
    cy.contains('button', 'Войти').click();
    cy.url({ timeout: 10000 }).should('include', '/account/main');
  };

  it('заявка ОУ: пустое название', () => {
    loginUser();
    cy.get('button').filter(':visible').contains('Выбрать роль').click();
    cy.contains('Выбор роли аккаунта').should('be.visible');
    cy.contains('Я являюсь представителем образовательной организации').click();
    cy.contains('Создание нового личного кабинета ОУ').click();

    // Заполняем только описание и адрес
    cy.get('textarea[placeholder="Описание вашей организации"]').type('Описание');
    cy.get('input[placeholder="Адрес вашей организации"]').type('Адрес');
    // Кнопка "Добавить" должна быть disabled, так как название пустое
    cy.contains('button', 'Добавить').should('be.disabled');
    cy.url().should('include', '/account/main');
  });

  it('заявка ОУ: пустое описание', () => {
    loginUser();
    cy.get('button').filter(':visible').contains('Выбрать роль').click();
    cy.contains('Выбор роли аккаунта').should('be.visible');
    cy.contains('Я являюсь представителем образовательной организации').click();
    cy.contains('Создание нового личного кабинета ОУ').click();

    cy.get('input[placeholder="Название вашей организации"]').type('Школа');
    cy.get('input[placeholder="Адрес вашей организации"]').type('Адрес');
    // Если описание обязательно – кнопка disabled
    cy.contains('button', 'Добавить').should('be.disabled');
    cy.url().should('include', '/account/main');
  });

  it('заявка ОУ: пустой адрес', () => {
    loginUser();
    cy.get('button').filter(':visible').contains('Выбрать роль').click();
    cy.contains('Выбор роли аккаунта').should('be.visible');
    cy.contains('Я являюсь представителем образовательной организации').click();
    cy.contains('Создание нового личного кабинета ОУ').click();

    cy.get('input[placeholder="Название вашей организации"]').type('Школа');
    cy.get('textarea[placeholder="Описание вашей организации"]').type('Описание');
    // Если адрес обязателен – кнопка disabled
    cy.contains('button', 'Добавить').should('be.disabled');
    cy.url().should('include', '/account/main');
  });

  // ---------- 3. Негативные сценарии для заявки работодателя ----------
  it('заявка работодателя: пустое название', () => {
    loginUser();
    cy.get('button').filter(':visible').contains('Выбрать роль').click();
    cy.contains('Выбор роли аккаунта').should('be.visible');
    cy.contains('Я являюсь представителем коммерческой организации').click();
    cy.contains('Создание нового личного кабинета работодателя').click();

    cy.get('textarea[placeholder="Описание вашей организации"]').type('Описание');
    cy.get('input[placeholder="Адрес вашей организации"]').type('Адрес');
    cy.contains('button', 'Добавить').should('be.disabled');
    cy.url().should('include', '/account/main');
  });

  it('заявка работодателя: пустое описание', () => {
    loginUser();
    cy.get('button').filter(':visible').contains('Выбрать роль').click();
    cy.contains('Выбор роли аккаунта').should('be.visible');
    cy.contains('Я являюсь представителем коммерческой организации').click();
    cy.contains('Создание нового личного кабинета работодателя').click();

    cy.get('input[placeholder="Название вашей организации"]').type('Компания');
    cy.get('input[placeholder="Адрес вашей организации"]').type('Адрес');
    cy.contains('button', 'Добавить').should('be.disabled');
    cy.url().should('include', '/account/main');
  });

  it('заявка работодателя: пустой адрес', () => {
    loginUser();
    cy.get('button').filter(':visible').contains('Выбрать роль').click();
    cy.contains('Выбор роли аккаунта').should('be.visible');
    cy.contains('Я являюсь представителем коммерческой организации').click();
    cy.contains('Создание нового личного кабинета работодателя').click();

    cy.get('input[placeholder="Название вашей организации"]').type('Компания');
    cy.get('textarea[placeholder="Описание вашей организации"]').type('Описание');
    cy.contains('button', 'Добавить').should('be.disabled');
    cy.url().should('include', '/account/main');
  });
});