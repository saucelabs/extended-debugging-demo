const assert = require('assert')

describe('site test', () => {
    describe('failing JS test', () => {
        before(() => browser.url('/'))

        it('should have opened correct page', () => {
            assert.deepEqual(browser.getTitle(), 'Jumbotron Template for Bootstrap');
        })
        
        it('should open modal', () => {
            $('#modal').click()
            $('#exampleModalLong').waitForVisible()
            assert($('#exampleModalLong').isVisible())
            assert.deepEqual($('#exampleModalLong .modal-body').getText(), 'Hello There')
        })
        
        it('should close modal', () => {
            $('#closeit').click()
            $('#closeit').waitForVisible(3000, true)
        })
    })
    
    describe('flaky login test', () => {
        before(() => browser.url('/'))
        
        it('should try to login', () => {
            $('#username').setValue('admin')
            $('#password').setValue('mysupersecretpassword')
            browser.waitUntil(() => browser.getTitle() === 'Admin Area', 5000, 'Could not log in')
        })
    })
})