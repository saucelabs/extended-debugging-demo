describe('test without custom commands', () => {
    before(() => {
        browser.execute('sauce:intercept', {
            url: ''
        })
    })

    before(() => browser.url('/'))
})
