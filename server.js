'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const validate = require('express-validation');
const Joi = require('joi');

const dakoku = require('./dakoku');

const app = express();
app.use(bodyParser.json());

const validation = {
  headers: {
    'x-appengine-queuename': Joi.string().required()
  },
  body: {
    user: Joi.string().required(),
    password: Joi.string().required(),
    action: Joi.string().required()
  }
};

app.post('/', jsonParser, validate(validation), async (req, res) => {
  console.log('receive request');
  await dakoku(req.body.action, req.body.user, req.body.password);
  console.log('complete request');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});