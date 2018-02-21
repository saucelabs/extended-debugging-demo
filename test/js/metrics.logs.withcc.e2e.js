const assert = require('assert')

describe('my demo app', () => {
    it('should load faster without 3rd party apps', () => {
        console.log(browser.execute('sauce:intercept', {
            url: 'http://localhost:8081/thirdPartyScript.js',
            error: 'Failed'
        }))

        browser.url('/')
        browser.pause(4000)
        const { value: { performanceMetrics } } = browser.log('sauce:metrics')
        const pageLoadTime = performanceMetrics.DomContentLoaded - performanceMetrics.NavigationStart
        assert.ok(pageLoadTime <= 5, `Expected page load time to be lower than 5s but was ${pageLoadTime}s`)
    })
})
