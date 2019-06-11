const express = require('express');
const path = require('path');

const favicon = require('serve-favicon');

const app = express();

app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Stay a while and listen...');
});