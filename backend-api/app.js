const bodyParser = require('body-parser')
const express = require('express')
const routes = require('./routes/index.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

var server = app.listen(3000, () => {
  console.log('Server running on port:', server.address().port)
})
