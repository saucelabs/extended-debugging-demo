const assert = require('assert')

describe('my demo app', () => {
    it('should load fast', () => {
        browser.url('/')

        const { value: { performanceMetrics } } = browser.log('sauce:metrics')
        const pageLoadTime = performanceMetrics.DomContentLoaded - performanceMetrics.NavigationStart
        assert.ok(pageLoadTime <= 5, `Expected page load time to be lower than 5s but was ${pageLoadTime}s`)
    })

    it('test', () => {
        console.log(JSON.stringify(browser.log('sauce:network'), null, 4))
    })
})
