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

module.exports = app;