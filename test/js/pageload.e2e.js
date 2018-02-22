import assert from 'assert'
import getLoadTime from './helpers/getLoadTime'

describe('my demo app', () => {
    describe.skip('loads app with third party script', () => {
        it('should load fast', () => {
            browser.url('/')

            const { value: { performanceMetrics } } = browser.log('sauce:metrics')
            const pageLoadTime = performanceMetrics.DomContentLoaded - performanceMetrics.NavigationStart
            assert.ok(pageLoadTime <= 5, `Expected page load time to be lower than 5s but was ${pageLoadTime}s`)
        })

        after('test', () => {
            const timings = browser.log('sauce:network')
            const timingsPerUrl = timings.value.requests.map((req) => ({
                url: req.url,
                loadTime: getLoadTime(req)
            })).sort((a, b) => b.loadTime - a.loadTime)

            let i = 1
            for (const entry of timingsPerUrl) {
                console.log(i + ':', 'URL: ', entry.url)
                console.log('load time: ', Math.round(entry.loadTime), 'ms\n')
                ++i
            }
        })
    })
})
