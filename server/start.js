import { argv } from 'yargs'

import server from './'
import { DEFAULT_PORT } from './constants'

const app = server.app

const startServer = function (port) {
    return app.listen(port, () => console.log(`Started server on port ${port}`))
}

startServer(argv.port || DEFAULT_PORT)
