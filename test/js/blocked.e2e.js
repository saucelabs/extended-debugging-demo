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

            const { value } = browser.log('sauce:performance')
            assert.ok(value.load <= 5, `Expected page load time to be lower than 5s but was ${value.load}s`)
        })

        after(() => {
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
