describe('Blog app', function() {
	beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'testi mies',
            username: 'testman',
            password: 'yes'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
		cy.visit('http://localhost:3000')
	})
	
	it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Log in to application')
    })
    
    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testman')
            cy.get('#password').type('yes')
            cy.get('#login-button').click()

            cy.contains('testi mies logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('test')
            cy.get('#password').type('no')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('testman')
            cy.get('#password').type('yes')
            cy.get('#login-button').click()
            cy.contains('create new blog').click()
            cy.get('#title').type('testblog')
            cy.get('#author').type('testauthor')
            cy.get('#url').type('testurl')
            cy.get('#save').click()
        })

        it('A blog can be created', function() {
            cy.contains('testblog')
        })

        it('A blog can be liked and creator can remove', function() {
            cy.contains('view').click()
            cy.get('#like').click()
            cy.contains('likes 1')
            cy.contains('remove').click()
            cy.get('html').should('not.contain', 'testblog')
        })

    })
})