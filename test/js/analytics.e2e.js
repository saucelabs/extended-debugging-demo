import assert from 'assert'

describe('analytics check', () => {
    before(() => browser.url('/'))

    it('should enter a new todo', () => {
        browser.waitForExist('#new-todo', 5000)

        browser.setValue('#new-todo', 'Some random Todo')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 1)
    })

    it('should make a proper request to Google Analytics', () => {
        const requests = browser.log('sauce:network').value.requests
        const eventTagRequest = requests.find((req) => req.url.includes('ec=pageEvent&ea=addTodo&el=useraction'))
        assert.ok(eventTagRequest, 'Did not made proper analytics request')
    })

    it('should fail entering a new todo', () => {
        browser.execute('sauce:intercept', {
            url: 'https://saucecon.herokuapp.com/api/todos',
            error: 'Failed'
        })

        browser.setValue('#new-todo', 'Some failing Todo')
        browser.keys('Enter')
    })

    it('should make proper request to Google Analytics that the request failed', () => {
        const requests = browser.log('sauce:network').value.requests
        const eventTagRequest = requests.find((req) => req.url.includes('ec=pageEvent&ea=addTodoError&el=useraction'))
        assert.ok(eventTagRequest, 'Did not made proper analytics request')
    })
})
