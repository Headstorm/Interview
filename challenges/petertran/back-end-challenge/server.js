'use strict';
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const {validate} = require('./validate');
const {PORT, RECAPTCHA_SECRET, DB_URL} = require('./config');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({message: 'hello world'});
});

// this endpoint is for verifying front-end reCaptcha
app.get('/grecaptcha', async (req, res) => {
  const url = 'https://www.google.com/recaptcha/api/siteverify';
  const secret = RECAPTCHA_SECRET;

  let query = req.url.split('?')[1] + '&secret=' + secret;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  try {
    const resp = await fetch(url + '?' + query, options);
    const code = resp.status;
    const data = await resp.json();

    if (!data.success) {
      return res.status(400).json({message: data['error-codes']});
    }

    return res.status(code).json({data});

  } catch (error) {
    return res.status(500).json({message: 'Something went wrong...'});
  }
});




// back-end challenege
let arr;

app.post('/data', validate, async (req, res, next) => {
  arr = req.body;
  res.status(201).json(arr);
});

app.get('/data', (req, res) => {
  if (!arr) {
    return res.status(404).json({message: 'No list found.'});
  }

  res.status(200).json(arr.sort((a, b) => a - b));
});

app.patch('/data', (req, res) => {
  const num = Math.floor(Math.random() * 1000);
  arr.push(num);

  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
})