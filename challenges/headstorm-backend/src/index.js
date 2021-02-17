let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let apiRoutes = require( './api-routes' );
let cors = require('cors');
let {response} = require('express');


let app = express();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
//   });
app.use( bodyParser.json() );

mongoose.connect( 'mongodb://localhost/testServer', { useNewUrlParser: true } );

const db = mongoose.connection;

if( !db ){
    console.log( 'error connecting to database' );
}else{
    console.log( 'Database connected successfully' );
}

const port = process.env.PORT || 3001;

app.get( '/', ( req, res ) => res.send( 'Hello' ) );

app.use( '/api', apiRoutes );



app.listen( port, function(){
    console.log( 'Running on port: ', port );
})