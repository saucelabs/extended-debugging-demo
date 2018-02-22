import assert from 'assert'
import getLoadTime from './helpers/getLoadTime'

describe('my demo app', () => {
    describe('loads app with third party script', () => {
        it('should load fast', () => {
            browser.url('/')

            browser.execute('sauce:intercept', {
                url: 'https://saucecon.herokuapp.com/thirdPartyScript.js',
                error: 'Failed'
            })

            browser.url('/')

            console.log(browser.log('sauce:metrics'))
            const { value } = browser.log('sauce:metrics')
            const pageLoadTime = value.domContentLoaded - value.navigationStart
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
