import { argv } from 'yargs'

import server from './'

const app = server.app
const DEFAULT_PORT = 8080

const startServer = function (port) {
    return app.listen(port, () => console.log(`Started server on port ${port}`))
}

startServer(argv.port || DEFAULT_PORT)
