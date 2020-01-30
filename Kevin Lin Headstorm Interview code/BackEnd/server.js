const http = require('http');
const app = require('./app');

const post = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);

