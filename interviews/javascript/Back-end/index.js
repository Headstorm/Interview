const app = require('express')()
const bodyParser = require('body-parser')

// MIDDLEWARE - Parses the received body into json
app.use(bodyParser.json())

// Routes from folder routes
const dataRoutes = require('./routes/data')
app.use('/data', dataRoutes)

// Listening on port 3001
app.listen(3001, () =>{
    console.log('listening on port 3001')
});