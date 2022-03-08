const express = require('express');
const app = express();
app.use(express.json());

let num = [];

app.get('/data', function(req, res) {
    res.json(num);
});

app.post('/data', function(req, res) {

});

app.patch('/data', function(req, res) {

});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));