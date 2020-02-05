// Dependencies
// =============================================================
require("dotenv").config();
const express = require("express");
const keys = require("./keys")
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(bodyParser.json());

// Functions
// =============================================================
const handleSend = (req, res) => {
    const secret_key = keys.credentials.secret_key;
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    fetch(url, {
        method: "post"
    })
        .then(response => response.json())
        .then(google_response => res.json({ google_response }))
        .catch(error => res.json({ error }));
};

app.post("/send", handleSend);


// Start server
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

