describe('intercept command', () => {
    it('should enter new todos', () => {
        const todos = [
            'Prepare proposal for SauceCon 2018',
            'Get feedback from colleagues',
            'Submit CFP',
            'Wait for response from organizer',
            'Create the outline of the talk',
            'Build slides',
            'Rehearse talk',
            'Go to SauceCon at Parc 55',
            'Present talk at Saucecon',
            'Evaluate Feedback'
        ].map((title, i) => ({
            id: i,
            title,
            order: i + 1,
            completed: false
        }))

        browser.execute('sauce:intercept', {
            url: 'https://saucecon.herokuapp.com/api/todos',
            response: { body: todos }
        })

        browser.url('/')
        browser.pause(3000)
    })
})
