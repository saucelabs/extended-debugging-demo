import assert from 'assert'

describe('failing test', () => {
    before(() => browser.url('/'))

    it('should have correct title', () => {
        assert.deepEqual(browser.getTitle(), 'AngularJS • TodoMVC')
    })
})
