const merge = require('deepmerge')
const config = require('./wdio.conf')

exports.config = merge(config.config, {
    sauceConnect: true,
    baseUrl: 'http://localhost:8080',
    services: ['static-server', 'sauce'],
    staticServerPort: 8080,
    staticServerFolders: [
        { mount: '/', path: './site' },
        { mount: '/bootstrap', path: './node_modules/bootstrap' },
    ],
})
