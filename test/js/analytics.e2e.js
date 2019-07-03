import assert from 'assert'

describe('analytics check', () => {
    before(() => browser.url('/'))

    /**
     * clear all stored Todos
     */
    before(() => {
        const clearButtons = $$('.destroy')
        clearButtons.map((el) => {
            browser.execute((el) => el.style.display = 'block', el)
            el.click()
        })
    })

    it('should enter a new todo', () => {
        const newTodo = $('#new-todo')
        newTodo.waitForExist()

        newTodo.setValue('Some random Todo')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 1)
    })

    it('should make a proper request to Google Analytics', () => {
        const requests = browser.execute('sauce:log', { type: 'sauce:network' })
        const eventTagRequest = requests.find(
            (req) => req.url.includes('ec=pageEvent&ea=addTodo&el=useraction'))
        assert.ok(eventTagRequest, 'Did not made proper analytics request')
    })

    it('should fail entering a new todo', () => {
        browser.execute('sauce:intercept', {
            url: 'https://saucecon.herokuapp.com/api/todos',
            error: 'Failed'
        })

        const newTodo = $('#new-todo')
        newTodo.setValue('Some failing Todo')
        browser.keys('Enter')
    })

    it('should make proper request to Google Analytics that the request failed', () => {
        const requests = browser.execute('sauce:log', { type: 'sauce:network' })
        const eventTagRequest = requests.find(
            (req) => req.url.includes('ec=pageEvent&ea=addTodoError&el=useraction'))
        assert.ok(eventTagRequest, 'Did not made proper analytics request')
    })
})
