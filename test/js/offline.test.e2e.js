import assert from 'assert'

describe('check if page can be opened offline', () => {
    it('should open the webpage with internetconnection', () => {
        browser.url('/')
        browser.pause(2000)
        assert.deepEqual(browser.getTitle(), 'AngularJS • TodoMVC')
    })

    it('should go offline', () => {
        browser.execute('sauce:throttle', { condition: 'offline' })
    })

    it('should still be able to access page content', () => {
        browser.url('/')

        assert.ok(browser.getText('#info').includes('Offline Version'))
        assert.ifError(browser.isEnabled('#new-todo'))
    })
})
