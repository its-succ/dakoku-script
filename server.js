'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const dakoku = require('./dakoku');

const app = express();
app.use(bodyParser.json());

app.post('/', jsonParser, (req, res) => {
  console.log('receive request');
  dakoku(req.body.action, req.body.user, req.body.password)((err, result) => {
    console.log('receive response', result);
    if (err) return console.log(err);
    res.sendStatus(200);
  });
});

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});