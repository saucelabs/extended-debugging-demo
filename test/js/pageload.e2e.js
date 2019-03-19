import assert from 'assert'
import getLoadTime from './helpers/getLoadTime'

describe('my demo app', () => {
    describe('loads app with third party script', () => {
        it('should load fast', () => {
            browser.url('/')

            const { value } = browser.log('sauce:metrics')
            const pageLoadTime = value.domContentLoaded - value.navigationStart
            assert.ok(pageLoadTime <= 5, `Expected page load time to be lower than 5s but was ${pageLoadTime}s`)

            //it should also feel fast for the user based on the speed index
            const performance = browser.log('sauce:performance').value
            assert.ok(performance.speedIndex<1500, `Expected speed index to be lower than 1500 but was ${performance.speedIndex}`)
        })

        after('test', () => {
            const timings = browser.log('sauce:network')
            const timingsPerUrl = timings.value.map((req) => ({
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
