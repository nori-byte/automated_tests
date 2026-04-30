describe('Модуль регистрации и добавления роли студента', () => {
it('Регистрация нового пользователя и выбор роли "Студент"', () => {
// Генерируем уникальные данные, чтобы не было конфликта
const uniqueId = Date.now()
const email = `qwe@gmail.com`
const password = '123Ghu'
const login = 'mira'

cy.visit('https://dev.profteam.su/registration') // предположим, что страница регистрации /register


cy.get('input[autocomplete="username"]').type(login)
cy.get('input[autocomplete="email"]').type(email)
cy.get('input[autocomplete="new-password"]').type(password)
cy.get('input[autocomplete="new-password"]').type(password)
cy.get('button[autocomplete="submit"]').click()

// После регистрации возможно нужно выбрать роль
cy.contains('Студент').click() // или cy.get('[value="student"]').click()
cy.get('button').contains('Сохранить').click()

// Проверяем, что перебросило в личный кабинет
cy.url().should('include', '/cabinet')
cy.contains('Добро пожаловать').should('be.visible')
})
})