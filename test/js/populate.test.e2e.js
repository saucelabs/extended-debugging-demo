describe('test without custom commands', () => {
    before(() => browser.url('/'))

    describe('allows to insert todos', () => {
        it('should enter new todos', () => {
            browser.waitForExist('#new-todo', 5000)

            browser.setValue('#new-todo', 'Prepare proposal for SauceCon 2018')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 1)

            browser.setValue('#new-todo', 'Get feedback from colleagues')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 2)

            browser.setValue('#new-todo', 'Submit CFP')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 3)

            browser.setValue('#new-todo', 'Wait for response from organizer')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 4)

            browser.setValue('#new-todo', 'Create the outline of the talk')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 5)

            browser.setValue('#new-todo', 'Build slides')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 6)

            browser.setValue('#new-todo', 'Rehearse talk')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 7)

            browser.setValue('#new-todo', 'Go to SauceCon at Parc 55')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 8)

            browser.setValue('#new-todo', 'Present talk at Saucecon')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 9)

            browser.setValue('#new-todo', 'Evaluate Feedback')
            browser.keys('Enter')
            browser.waitUntil(() => $$('#todo-list li').length === 10)
        })
    })
})
