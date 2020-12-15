const express = require('express');
const Beer = require('./models/Beer.js');
const app = express();

app.use(express.json());

app.post('/api/v1/beers', (req, res, next) => {
    Beer
        .insert(req.body)
        .then(beer => res.send(beer))
        .catch(next);
});

app.get('/api/v1/beers', (req, res, next) => {
    Beer
        .getAll()
        .then(beer => res.send(beer))
        .catch(next);
});

app.get('/api/v1/beers/:id', (req, res, next) => {
    Beer
        .getById(req.params.id)
        .then(beer => res.send(beer))
        .catch(next);
})

app.put('/api/v1/beers/:id', (req, res, next) => {
    Beer
        .update(req.body, req.params.id)
        .then(beer => res.send(beer))
        .catch(next);
})

app.delete('/api/v1/beers/:id', (req, res, next) => {
    Beer
        .delete(req.params.id)
        .then(beer => res.send(beer))
        .catch(next);
})

module.exports = app;
