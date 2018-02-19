import bodyParser from 'body-parser'
import express from 'express'

import DataStore from './datastore'

export default class APIDemoServer {
    constructor () {
        this.app = express()
        this.app.use(bodyParser.json())
        this.dataStore = new DataStore()

        /**
         * add likehood of API failing to handle request
         */
        this.app.use((req, res, next) => {
            /**
             * always respond status request properly
             */
            if (req.path === '/') {
                return next()
            }

            /**
             * add failing likelihood
             */
            if (parseInt(Math.random() * 100, 10) < 10) {
                console.log(`trigger ${req.path} to fail`)
                return res.status(500).json({ error: 'Failed to respond' })
            }

            /**
             * add slow response times
             */
            const delay = Math.random() * 3 * 1000
            console.log(`Serve ${req.path} with delay of ${delay}ms`)
            return setTimeout(next, delay)
        })

        /**
         * routes
         */
        this.app.get('/', ::this.status)
        this.app.get('/todos', ::this.getTodos)
        this.app.get('/todos/:id', ::this.getTodo)
        this.app.post('/todos', ::this.addTodo)
        this.app.put('/todos/:id', ::this.updateTodo)
        this.app.delete('/todos', ::this.deleteTodos)
        this.app.delete('/todos/:id', ::this.deleteTodo)
    }

    status (req, res) {
        return res.status(200).send('OK')
    }

    getTodos (req, res) {
        const entries = this.dataStore.getAll()
        res.status(200).json(entries || {})
    }

    getTodo (req, res) {
        const id = parseInt(req.params.id, 10)
        const entry = this.dataStore.get(id)
        res.status(200).json(entry)
    }

    addTodo (req, res) {
        this.dataStore.save(req.body)
        return res.status(201).json(req.body)
    }

    updateTodo (req, res) {
        const id = parseInt(req.params.id, 10)
        this.dataStore.update(id, req.body)
        return res.status(200).json(req.body)
    }

    deleteTodos (req, res) {
        this.dataStore.deleteComplete()
        return res.status(202).json({})
    }

    deleteTodo (req, res) {
        const id = parseInt(req.params.id, 10)
        this.dataStore.delete(id)
        return res.status(204).json({})
    }
}
