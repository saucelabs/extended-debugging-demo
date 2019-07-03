import assert from 'assert'
import getLoadTime from './helpers/getLoadTime'

describe('my demo app', () => {
    describe('loads app with third party script', () => {
        it('should load fast', () => {
            browser.url('/')

            const { load } = browser.execute('sauce:log', { type: 'sauce:performance' })
            assert.ok(load <= 5000, `Expected page load time to be lower than 5s but was ${load}s`)
        })

        after(() => {
            const requests = browser.execute('sauce:log', { type: 'sauce:network' })
            const timingsPerUrl = requests.map((req) => ({
                url: req.url,
                loadTime: getLoadTime(req)
            })).sort((a, b) => b.loadTime - a.loadTime)

            let i = 1
            for (const entry of timingsPerUrl) {
                // eslint-disable-next-line
                console.log(i + ':', 'URL: ', entry.url)
                // eslint-disable-next-line
                console.log('load time: ', Math.round(entry.loadTime), 'ms\n')
                ++i
            }
        })
    })
})
