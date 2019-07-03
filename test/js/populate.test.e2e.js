describe('test without custom commands', () => {
    before(() => browser.url('/'))

    it('should enter new todos', () => {
        const newTodo = $('#new-todo')
        newTodo.waitForExist()

        newTodo.setValue('Prepare proposal for SauceCon 2018')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 1)

        newTodo.setValue('Get feedback from colleagues')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 2)

        newTodo.setValue('Submit CFP')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 3)

        newTodo.setValue('Wait for response from organizer')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 4)

        newTodo.setValue('Create the outline of the talk')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 5)

        newTodo.setValue('Build slides')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 6)

        newTodo.setValue('Rehearse talk')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 7)

        newTodo.setValue('Go to SauceCon at Parc 55')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 8)

        newTodo.setValue('Present talk at Saucecon')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 9)

        newTodo.setValue('Evaluate Feedback')
        browser.keys('Enter')
        browser.waitUntil(() => $$('#todo-list li').length === 10)
    })
})
