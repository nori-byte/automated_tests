describe('Модуль регистрации и добавления роли студента', () => {
  it('Регистрация нового пользователя', () => {
    const login = `raytu`
    const email = `qwgjr@gmail.com`
    const password = 'qweR134'

    cy.visit('https://dev.profteam.su/registration')
    cy.get('input[autocomplete="username"]').type(login)
    cy.get('input[autocomplete="email"]').type(email)
    cy.get('input[autocomplete="new-password"]').first().type(password)
    cy.get('input[autocomplete="new-password"]').last().type(password)

    cy.contains('button', 'Далее').click()
    cy.get('input[autocomplete="family-name"]').should('be.visible').type('апаов')
    cy.get('input[autocomplete="given-name"]').should('be.visible').type('ррорпр')
    cy.get('input[autocomplete="additional-name"]').should('be.visible').type('рорррп')

    cy.contains('button', 'Создать аккаунт').click()
    cy.url().should('include', '/account/main')
    cy.contains('Личный кабинет', {timeout: 10000}).should('be.visible')
  })
  it('Регистрация нового пользователя без отчества(необязатальное поле)', () => {
    const login = `Tegqy`
    const email = `qterggj@gmail.com`
    const password = 'qweU1234'

    cy.visit('https://dev.profteam.su/registration')
    cy.get('input[autocomplete="username"]').type(login)
    cy.get('input[autocomplete="email"]').type(email)
    cy.get('input[autocomplete="new-password"]').first().type(password)
    cy.get('input[autocomplete="new-password"]').last().type(password)

    cy.contains('button', 'Далее').click()
    cy.get('input[autocomplete="family-name"]').should('be.visible').type('апаов')
    cy.get('input[autocomplete="given-name"]').should('be.visible').type('ррорпр')

    cy.contains('button', 'Создать аккаунт').click()
    cy.url().should('include', '/account/main')
    cy.contains('Личный кабинет', {timeout: 10000}).should('be.visible')
  })
})
describe('Негативные сценарии валидации регистрации', () => {
  beforeEach(() => {
    cy.visit('https://dev.profteam.su/registration');
  });

  it('Логин: пробел', () => {
    cy.get('input[autocomplete="username"]').type('user name');
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.get('input[autocomplete="new-password"]').first().type('Valid1Pass');
    cy.get('input[autocomplete="new-password"]').last().type('Valid1Pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]', { timeout: 2000 }).should('not.be.visible');
  });

  it('Логин: кириллица', () => {
    cy.get('input[autocomplete="username"]').type('логинкириллица');
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.get('input[autocomplete="new-password"]').first().type('Valid1Pass');
    cy.get('input[autocomplete="new-password"]').last().type('Valid1Pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });


  it('Email: некорректный формат (без @)', () => {
    cy.get('input[autocomplete="username"]').type('user1');
    cy.get('input[autocomplete="email"]').type('invalidemail.com');
    cy.get('input[autocomplete="new-password"]').first().type('Valid1Pass');
    cy.get('input[autocomplete="new-password"]').last().type('Valid1Pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });

  it('Email: без домена (user@)', () => {
    cy.get('input[autocomplete="username"]').type('user2');
    cy.get('input[autocomplete="email"]').type('user@');
    cy.get('input[autocomplete="new-password"]').first().type('Valid1Pass');
    cy.get('input[autocomplete="new-password"]').last().type('Valid1Pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });

  it('Пароль: менее 6 символов', () => {
    cy.get('input[autocomplete="username"]').type('user3');
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.get('input[autocomplete="new-password"]').first().type('Ab1');
    cy.get('input[autocomplete="new-password"]').last().type('Ab1');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });

  it('Пароль: нет заглавной буквы', () => {
    cy.get('input[autocomplete="username"]').type('user4');
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.get('input[autocomplete="new-password"]').first().type('valid1pass');
    cy.get('input[autocomplete="new-password"]').last().type('valid1pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });

  it('Пароль: кириллица', () => {
    cy.get('input[autocomplete="username"]').type('user5');
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.get('input[autocomplete="new-password"]').first().type('ПарольКириллица1');
    cy.get('input[autocomplete="new-password"]').last().type('ПарольКириллица1');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });

  it('Пароль и подтверждение не совпадают', () => {
    cy.get('input[autocomplete="username"]').type('user6');
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.get('input[autocomplete="new-password"]').first().type('Valid1Pass');
    cy.get('input[autocomplete="new-password"]').last().type('Valid2Pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });


  it('Обязательные поля: пустой логин', () => {
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.get('input[autocomplete="new-password"]').first().type('Valid1Pass');
    cy.get('input[autocomplete="new-password"]').last().type('Valid1Pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });

  it('Обязательные поля: пустой email', () => {
    cy.get('input[autocomplete="username"]').type('user7');
    cy.get('input[autocomplete="new-password"]').first().type('Valid1Pass');
    cy.get('input[autocomplete="new-password"]').last().type('Valid1Pass');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');
  });

  it('Обязательные поля: пустой пароль', () => {
    cy.get('input[autocomplete="username"]').type('user8');
    cy.get('input[autocomplete="email"]').type('test@mail.com');
    cy.contains('button', 'Далее').should('be.disabled');
    cy.get('input[autocomplete="family-name"]').should('not.be.visible');

  });
});

describe('Негативные сценарии валидации ФИО', () => {
  const generateUniqueLetters = () => {
    // Генерирует строку только из букв латиницы (без цифр)
    return Math.random().toString(36).replace(/[0-9]/g, '').substring(2, 10);
  };

  beforeEach(() => {
    cy.visit('https://dev.profteam.su/registration');
    const uniquePart = generateUniqueLetters();
    const login = `user${uniquePart}`;
    const email = `${uniquePart}@test.ru`;
    const password = 'Valid1Pass';

    cy.get('input[autocomplete="username"]').type(login);
    cy.get('input[autocomplete="email"]').type(email);
    cy.get('input[autocomplete="new-password"]').first().type(password);
    cy.get('input[autocomplete="new-password"]').last().type(password);
    cy.contains('button', 'Далее').click();
    cy.get('input[autocomplete="family-name"]', { timeout: 5000 }).should('be.visible');
  });


  it('Фамилия: пустое поле', () => {
    cy.get('input[autocomplete="family-name"]').clear();
    cy.get('input[autocomplete="given-name"]').type('Иван');
    cy.get('input[autocomplete="additional-name"]').type('Иванович');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });

  it('Имя: пустое поле', () => {
    cy.get('input[autocomplete="family-name"]').type('Петров');
    cy.get('input[autocomplete="given-name"]').clear();
    cy.get('input[autocomplete="additional-name"]').type('Иванович');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });

  it('Фамилия: латиница', () => {
    cy.get('input[autocomplete="family-name"]').type('Petrov');
    cy.get('input[autocomplete="given-name"]').type('Иван');
    cy.get('input[autocomplete="additional-name"]').type('Иванович');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });

  it('Имя: латиница', () => {
    cy.get('input[autocomplete="family-name"]').type('Петров');
    cy.get('input[autocomplete="given-name"]').type('Ivan');
    cy.get('input[autocomplete="additional-name"]').type('Иванович');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });

  it('Фамилия: цифры', () => {
    cy.get('input[autocomplete="family-name"]').type('Петров123');
    cy.get('input[autocomplete="given-name"]').type('Иван');
    cy.get('input[autocomplete="additional-name"]').type('Иванович');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });

  it('Имя: цифры', () => {
    cy.get('input[autocomplete="family-name"]').type('Петров');
    cy.get('input[autocomplete="given-name"]').type('Иван2');
    cy.get('input[autocomplete="additional-name"]').type('Иванович');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });

  it('Отчество: латиница', () => {
    cy.get('input[autocomplete="family-name"]').type('Петров');
    cy.get('input[autocomplete="given-name"]').type('Иван');
    cy.get('input[autocomplete="additional-name"]').type('Ivanovich');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });

  it('Отчество: цифры', () => {
    cy.get('input[autocomplete="family-name"]').type('Петров');
    cy.get('input[autocomplete="given-name"]').type('Иван');
    cy.get('input[autocomplete="additional-name"]').type('Иванович4');
    cy.contains('button', 'Создать аккаунт').should('be.disabled');
  });
});