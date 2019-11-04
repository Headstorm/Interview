const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

//creates express app, so we can use express methods/properties
    //request handler
const app = express();

const dataRoutes = require('./api/routes/data');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//sets up middleware, every request has to go through whatever is passed in the params
    //next is a function that pushes to the next middleware (app.use())

// these can also be seen as a filter
app.use('/data', dataRoutes);

// handles route errors that make it past all of the route filters
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
})

// handles all other errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app; 