import assert from 'assert'

describe('test without custom commands', () => {
    before(() => browser.url('/'))

    it('should have correct title', () => {
        assert.deepEqual(browser.getTitle(), 'AngularJS • TodoMVC')
    })

    describe('allows to insert todos', () => {
        it('should enter new todos', () => {
            browser.setValue('#new-todo', 'Build slides for Saucecon talk')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 1)

            browser.setValue('#new-todo', 'Rehearse talk')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 2)

            browser.setValue('#new-todo', 'Present talk at Saucecon')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 3)
        })

        it('should have 3 new todos', () => {
            const todos = $$('#todo-list li')
            assert.deepEqual(todos.length, 3)
        })

        it('should have stored todos in DB', () => {
            browser.url('/')

            browser.waitForExist('#todo-list li')
            const todoCount = $('#todo-count strong')
            assert.deepEqual(todoCount.getText(), 3)
        })
    })

    describe('is able to mark todo as completed', () => {
        it('should mark second todo as completed', () => {
            browser.waitForExist('#todo-list li')
            const secondTodo = $$('#todo-list li')[1]
            secondTodo.$('.toggle').click()

            const classNames = secondTodo.getAttribute('class')
            assert.ok(classNames.includes('completed'))
        })

        it('should have updated the todo count', () => {
            const todoCount = $('#todo-count strong')
            assert.deepEqual(todoCount.getText(), 2)
        })

        it('should have persisted that state', () => {
            browser.url('/')

            browser.waitForExist('#todo-list li')
            const secondTodo = $$('#todo-list li')[1]
            secondTodo.$('.toggle').click()

            browser.pause(1000)

            const classNames = secondTodo.getAttribute('class')
            assert.ok(classNames.includes('completed'))
        })

        it('should have updated the todo count after reloading', () => {
            const todoCount = $('#todo-count strong')
            assert.deepEqual(todoCount.getText(), 2)
        })
    })
})
