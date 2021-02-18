//imports
let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let apiRoutes = require( './api-routes' );


//creating an express application called app
let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });
  //get the http requests and formats it to json
app.use( bodyParser.json() );

//opens the default connection to mongodb and sets it to a localhost test server
mongoose.connect( 'mongodb://localhost/testServer', { useNewUrlParser: true } );

//setting the connection to a variable, then checking to see if there is a connection
const db = mongoose.connection;
if( !db ){
    console.log( 'error connecting to database' );
}else{
    console.log( 'Database connected successfully' );
}

//declares port as the environment PORT variable or if nothing exists 3001
const port = process.env.PORT || 3001;

//configuring routes
app.get( '/', ( req, res ) => res.send( 'Hello' ) );
app.use( '/api', apiRoutes );



app.listen( port, function(){
    console.log( 'Running on port: ', port );
})