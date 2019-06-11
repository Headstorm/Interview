const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

const baseRoutes = require('../routes/base');
const baseController = require('../controllers/base');

const app = express();

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', baseRoutes);

app.listen(3000, () => {
  console.log('Stay a while and listen...');
});