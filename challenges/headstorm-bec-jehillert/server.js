require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('express').Router();
const path = require('path');
const cors = require('cors');
const db = require('./db');

const {
  pgDatabase,
  port,
} = require('./config');

app.use(bodyParser.json());
app.use(cors());

app.set('port', port);
app.set('host', '0.0.0.0');

app.post('/api/data', function (req, res) {
  db.pgPostNumbersList(req.body.quantity, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log(`ERROR: 'POST' request failed to add food item to grocery list`);
    } else {
      console.log(`Added ${req.body.quantity} ${req.body.food} to grocery list.`)
      res.statusCode = 201;
      res.send(req.body);
    }
  });
});

app.get('/api/data', function (req, res) {
  db.pgGetNumbersList((err, results) => {
    if (err) {
      console.log(`ERROR: 'GET' request failed to retrieve grocery list`);
      res.sendStatus(500);
    } else {
      res.statusCode = 201;
      res.json(results);
    }
  });
});

exports.pgPostNumbersList = (food, quantity, callback) => {
  /*
    UNORDERED_JSON
      Terminal:
        INSERT INTO list_sets (unsorted_json_list) VALUES ('[9053,-1069,7056,-5551,775]');
      WIP:
        const unordered_json_list = [9053,-1069,7056,-5551,775];
        .query('INSERT INTO list_sets (unsorted_json_list) VALUES ($1)', unordered_json_list)
    UNSORTED_LIST
      Terminal:
        INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, 9053);
        INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, -1069);
        INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, 7056);
        INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, -5551);
        INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES (1, 775);
      WIP:
        const list_set_id = 1;
        const unsorted_value = __________;
        params = [list_set_id, unsorted_value];
        .query('INSERT INTO unsorted_list (list_set_id, unsorted_value) VALUES ($1, $2)', params)
  */
  connection.query('insert into groceries (food, quantity) values (?, ?)', [food, quantity], (error, results) => {
    callback(error, results);
  });
};

exports.pgGetNumbersList = (callback) => {
  /*
    NOTE: You should change
      sorted_list_val_id ==> sorted_val_id
      unsorted_list_val_id ==> unsorted_val_id

    GET sorted_list:
      .query('SELECT unsorted_value FROM unsorted_list ORDER BY unsorted_value');
    GET unsorted_list:
      .query('SELECT unsorted_value FROM unsorted_list')
  */
  connection.query('SELECT * FROM numbers', (error, results) => {
    console.log(results)
    if (error) {
      callback(error)
    } else {
      callback(null, results);
    }
  });
};

const server = app.listen(app.get('port'), app.get('host'), () => (
  console.log(`Node app started. Listening on port ${port}`)
));


