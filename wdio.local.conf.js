const merge = require('deepmerge')
const { spawn } = require('child_process')

const config = require('./wdio.conf')

let server

exports.config = merge(config.config, {
    baseUrl: 'http://localhost:8080',
    services: ['static-server'],
    staticServerPort: 8080,
    staticServerFolders: [
        { mount: '/', path: './site' },
        { mount: '/bootstrap', path: './node_modules/bootstrap' },
    ],
    onPrepare: () => {
        server = spawn(`node ${__dirname}/server/index.js`, { shell: true })
    },
    onComplete: function() {
        server.kill()
    }
})

if (exports.config.user && exports.config.key) {
    exports.config.sauceConnect = true
    exports.config.services.push('sauce')
}
