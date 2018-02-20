import path from 'path'
import express from 'express'
import { argv } from 'yargs'

import APIDemoServer from './api'
import { DEFAULT_PORT } from './constants'

export default class Application {
    constructor (port = DEFAULT_PORT) {
        this.port = port
        this.app = express()
        this.api = new APIDemoServer()

        /**
         * serve Angular app as static files
         */
        this.app.use(express.static(path.resolve(__dirname, '..', 'public')))

        /**
         * serve service worker
         */
        this.app.get('/sw.js', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'js', 'service-worker.js')))

        /**
         * serve API under /api
         */
        this.app.use('/api', this.api.app)
    }

    run () {
        this.server = this.app.listen(this.port,
            () => console.log(`Started server on port ${this.port}`))
    }

    shutdown () {
        this.server.close()
    }
}

if (require.main === module) {
    const app = new Application(argv.port)
    app.run()
}
