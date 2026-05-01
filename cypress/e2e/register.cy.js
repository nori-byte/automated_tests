
describe('Модуль регистрации и добавления роли студента', () => {
    it('Регистрация нового пользователя и выбор роли "Студент"', () => {
        const uniqueId = Date.now()
        const login = `gghh`
        const email = `${login}@testhh12.ru`
        const password = 'hhHKL76'

        cy.visit('https://dev.profteam.su/registration')
        cy.get('input[autocomplete="username"]').type(login)
        cy.get('input[autocomplete="email"]').type(email)
        cy.get('input[autocomplete="new-password"]').first().type(password)
        cy.get('input[autocomplete="new-password"]').last().type(password)

        // Кнопка "Далее" (она видима)
        cy.contains('button', 'Далее').click()
        cy.get('input[autocomplete="family-name"]').should('be.visible').type('7')
        cy.get('input[autocomplete="given-name"]').should('be.visible').type('г')
        cy.get('input[autocomplete="additional-name"]').should('be.visible').type('7')

        cy.contains('button', 'Создать аккаунт').click()
        cy.url().should('include', '/account/main')
        cy.contains('Личный кабинет', { timeout: 10000 }).should('be.visible')

    })
})