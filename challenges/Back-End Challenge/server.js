const http = require('http');

//this is why we export app
    //to add it as a request handler
const app = require('./app');

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);