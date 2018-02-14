'use strict';

import bodyParser from 'body-parser'
import express from 'express'
import todomvc from 'todomvc'
import todomvcApi from 'todomvc-api'

import DataStore from './datastore'

const dataStore = new DataStore()

const app = module.exports.app = express();
const api = module.exports.api = express();

api.use(bodyParser.json());
app.use('/api', [todomvcApi.server, api])

/**
 * Declare the root route *before* inserting TodoMVC as middleware to prevent
 * the TodoMVC app from overriding it.
 */
app.get('/', function(req, res) {
  res.redirect('/examples/angularjs');
});

app.use(todomvc);

/**
 * API Routes
 */
api.get('/', (req, res) => {
    res.status(200).set('Content-Type', 'text/plain').send('ok');
});

api.get('/todos', (req, res) => {
    const entries = dataStore.getAll()
    res.status(200).json(entries || {})
});

api.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const entry = dataStore.get(id)
    res.status(200).json(entries)
});

api.post('/todos', (req, res) => {
    dataStore.save(req.body)
    return res.status(201).json(req.body)
});

api.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    dataStore.update(id, req.body)
    return res.status(200).json(req.body)
});

api.delete('/todos', (req, res) => {
    dataStore.deleteComplete()
    return res.status(202).json({})
});

api.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    dataStore.delete(id)
    return res.status(204).json({})
});

// Configure the sidebar to display relevant links for our hosted version of TodoMVC.
todomvc.learnJson = {
  name: 'Google Cloud Platform',
  description: 'Google Cloud Platform is now available via Node.js with google-cloud-node.',
  homepage: 'http://cloud.google.com/solutions/nodejs',
  examples: [
    {
      name: 'google-cloud-node + Express',
      url: 'https://github.com/GoogleCloudPlatform/gcloud-node-todos'
    }
  ],
  link_groups: [
    {
      heading: 'Official Resources',
      links: [
        {
          name: 'google-cloud-node',
          url: 'https://github.com/GoogleCloudPlatform/google-cloud-node'
        },
        {
          name: 'Google Cloud Datastore',
          url: 'https://cloud.google.com/datastore/docs'
        }
      ]
    },
    {
      heading: 'Community',
      links: [
        {
          name: 'google-cloud-node on Stack Overflow',
          url: 'http://stackoverflow.com/questions/tagged/google-cloud-node'
        }
      ]
    }
  ]
};
