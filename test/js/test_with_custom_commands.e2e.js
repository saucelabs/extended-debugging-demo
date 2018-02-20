import assert from 'assert'

describe('test without custom commands', () => {
    describe('displays todos from API correctly', () => {
        before(() => {
            browser.execute('sauce:intercept', {
                url: 'http://localhost:8080/api/todos',
                response: {
                    body: [{
                        id: 0,
                        title: 'My custom Todo #1',
                        order: 1,
                        completed: false
                    }, {
                        id: 1,
                        title: 'My custom Todo #2',
                        order: 2,
                        completed: true
                    }, {
                        id: 2,
                        title: 'My custom Todo #3',
                        order: 3,
                        completed: false
                    }]
                }
            })
        })

        before(() => browser.url('/'))

        it('should have 3 new todos', () => {
            const todos = $$('#todo-list li')
            assert.deepEqual(todos.length, 3)
        })
    })

    describe('update todo', () => {
        before(() => {
            browser.execute('sauce:intercept', {
                url: 'http://localhost:8080/api/todos/2',
                response: {
                    body: {
                        id: 2,
                        title: 'My custom Todo #3',
                        order: 3,
                        completed: true
                    }
                }
            })
        })

        it('should update todo', () => {
            const thirdTodo = $$('#todo-list li')[2]
            thirdTodo.$('.toggle').click()

            const classNames = thirdTodo.getAttribute('class')
            assert.ok(classNames.includes('completed'))
        })
    })
})
