require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('express').Router();
const path = require('path');
const cors = require('cors');

const {
  pgDatabase,
  port,
} = require('./config');

// app.use(express.static(path.join(__dirname, '/../client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set('port', port);
app.set('host', '0.0.0.0');

app.use('/api/db', router);
app.use(`/api/${pgDatabase}`, router);

// router.post('/data', controllers.data.post);
// router.get('/data', controllers.data.get);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// app.post('/data', function (req, res) {
//   helpers.getReposByUsername(req.body.term)
//     .then(body => {
//       db.save(body);
//     })
//     .then(body => {
//       res.status(200).end(req.body.term);
//     }, err => {
//       console.log(err);
//   });
// });
//
// app.get('/data', function (req, res) {
//   // TODO - your code here!
//   // This route should send back the top 25 repos
// });


// app.listen(process.env.PORT || 4000, function(){
    // console.log('Your node js server is running');
// });

const server = app.listen(app.get('port'), app.get('host'), () => (
  console.log(`Node app started. Listening on port ${port}`)
));
