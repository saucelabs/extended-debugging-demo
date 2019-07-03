import assert from 'assert'

describe('check if page can be opened offline', () => {
    it('should open the webpage with internet connection', () => {
        browser.url('/')
        browser.pause(2000)
        assert.deepEqual(browser.getTitle(), 'AngularJS • TodoMVC')
    })

    it('should go offline', () => {
        browser.execute('sauce:throttle', { condition: 'offline' })
    })

    it('should still be able to access page content', () => {
        browser.url('/')

        const infoLabel = $('#info')
        infoLabel.waitForExist()
        assert.ok(infoLabel.getText().includes('Offline Version'))
    })
})
