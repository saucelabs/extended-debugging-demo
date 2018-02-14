import todomvcApi from 'todomvc-api'
import { argv } from 'yargs'
import { promisify } from 'util'

import server from './'
const api = server.api
const app = server.app

const startServer = function (argv) {
    return app.listen(argv.port)
}

const validateAPI = async function (argv) {
    const server = await promisify(api.listen)(8080)
    const stats = await promisify(todomvcApi.validate)()
    console.log(stats);

    const err = stats ? stats.errors || stats.failures :null
    if (err) {
        throw new Error('API validation failed: ' + err)
    }
}

if (argv.validate) {
    validateAPI(argv)
} else if (agrv.port) {
    startServer(argv)
}
