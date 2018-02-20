import assert from 'assert'

describe('test without custom commands', () => {
    describe('displays todos from API correctly', () => {
        before(() => {
            browser.execute('sauce:intercept', {
                url: 'http://localhost:8080/api/todos',
                response: {
                    body: [{
                        title: 'My custom Todo #1',
                        order: 1,
                        completed: false
                    }, {
                        title: 'My custom Todo #2',
                        order: 2,
                        completed: true
                    }, {
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

    after(() => browser.pause(3000))
})
