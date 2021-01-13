const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const LINK = "http://localhost:8000";
const port = 8000;
const cors = require('cors');
const { response } = require('express');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var fetch = require('node-fetch');

let array;

// gets the JSON file from the frontend and sets it to array
app.post('/data', async (req, res) => {

    try {
        array = req.body.data;
        //console.log(array)

        if (array.length == 500) {
            return res.send(true);
        }

        else {
            return res.send(false);
        }
    }
    catch (e) {
        console.log(e)
    }
});

// sorts the array from the POST method and returns it as a JSON object
app.get('/data', async (req, res) => {
    let sortedArr = array.sort(function (a, b) { return a - b });
    res.json(sortedArr);
});

// verify reCAPTCHA response
app.post('/verify', (req, res) => {
    var VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${req.body['g-recaptcha-response']}`;

    let request = ({
        method: 'post',
        url: VERIFY_URL,
        params: {
            secret: process.env.SECRET_KEY,
            response: response
        }
    })
    return fetch(VERIFY_URL, { method: "POST" })
        .then(res => res.json())
        .then(json => res.send(json));
});

app.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`)
});