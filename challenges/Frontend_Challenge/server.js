
//Imports
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
var bodyParser = require('body-parser')
fetch = require('node-fetch');
const app = express()

//Configuring express Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'index',
  extname: '.handlebars'
}))

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

//Initialize middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());



app.get('/', (req, res, next) => res.render('./home'))

app.post('/captcha', (req, res, next) => {
  token = req.body
  secret = "6LdcXzweAAAAAM1DrbsPZl573znpPU6IxDIrofYY"
  call = {"secret" : secret, "response" : token}
  console.log(call)
  fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: {"Content-Type": "application/x-www-form-urlencoded"},
  body: `secret=${secret}&response=${token}`}).then(function (response) {
    response.json().then(function (data) {
      console.log(data)
      res.json({"score" : data.score})
    })
  })
})

app.post('/form_submit', (req, res, next) => {
  console.log(req.body)
  res.render('./home')
})

app.get('/favicon.ico', (req, res, next) => {
  res.send('<img id = "image" src = "https://static.wikia.nocookie.net/residentevil/images/5/50/UmbrellaCorporation3.png"/>')
})

// Server start
app.listen(process.env.PORT || 3000, () => console.log(`Express server listening on port ${process.env.PORT || 3000}!`))