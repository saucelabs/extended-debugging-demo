import fs from 'fs'
import path from 'path'

import bodyParser from 'body-parser'
import express from 'express'
import todomvc from 'todomvc'
import todomvcApi from 'todomvc-api'

import DataStore from './datastore'

const dataStore = new DataStore()

const app = module.exports.app = express()
const api = module.exports.api = express()

api.use(bodyParser.json())
app.use('/api', [todomvcApi.server, api])

/**
 * Declare the root route *before* inserting TodoMVC as middleware to prevent
 * the TodoMVC app from overriding it.
 */
app.get('/', function(req, res) {
    console.log(req.path)
  res.redirect('/examples/angularjs')
})

app.use((req, res, next) => {
    /**
     * have asset load slowely
     */
    if (req.path.includes('base.css')) {
        const delay = Math.random() * 5 // 1-5 sec delay
        console.log(`send ${req.path} wirh ${delay}s delay`)
        return setTimeout(() => {
            const baseCss = fs.readFileSync(path.resolve('node_modules', 'todomvc', 'examples', 'react', 'bower_components', 'todomvc-common', 'base.css'))
            return res.status(200).set('Content-Type', 'text/css').send(baseCss)
        }, delay * 1000)
    }
    next()
})
app.use(todomvc)

/**
 * API Routes
 */
api.get('/', (req, res) => {
    res.status(200).set('Content-Type', 'text/plain').send('ok')
})

api.get('/todos', (req, res) => {
    const entries = dataStore.getAll()
    res.status(200).json(entries || {})
})

api.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const entry = dataStore.get(id)
    res.status(200).json(entries)
})

api.post('/todos', (req, res) => {
    dataStore.save(req.body)
    return res.status(201).json(req.body)
})

api.put('/todos/:id', (req, res) => {
    /**
     * add failing likelihood
     */
    if (parseInt(Math.random() * 100, 10) > 30) {
        console.log(`trigger ${req.path} to fail`)
        return res.status(500).json({ error: 'Failed to update the ToDo' })
    }

    const id = parseInt(req.params.id, 10)
    dataStore.update(id, req.body)
    return res.status(200).json(req.body)
})

api.delete('/todos', (req, res) => {
    dataStore.deleteComplete()
    return res.status(202).json({})
})

api.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    dataStore.delete(id)
    return res.status(204).json({})
})

todomvc.learnJson = {}
