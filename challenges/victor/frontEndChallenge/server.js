const express = require("express");
var path = require("path");
var axios = require("axios");
var favicon = require("serve-favicon");

var app = express();
var PORT = 8080;

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", function(req, res) {
  const secret = "6LeFrrUUAAAAAMnZUBr4BMgQoZ0vsjyWpGr3fLt2";
  const response = req.body.apiToken;
  const url =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secret +
    "&response=" +
    response;
  axios.get(url).then(function(data, err) {
    if (err) console.log(err);
    res.json(data.data);
  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
