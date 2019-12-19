var express = require("express");
var fs = require("fs");
var app = express();
var PORT = 3000;
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/post", function(req, res) {
  
  const jsonNumbers = req.body.numbers;
  if (jsonNumbers.length !== 500) {
    return console.log("There should be only 500 numbers");
  } else {
    fs.writeFile(
      "./text.json", 
      JSON.stringify(jsonNumbers.sort((a, b) => a - b)), 
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file is saved!");
      }
    );
  }
});

app.get("/api/get", function(req, res) {
  fs.readFile("./text.json", "utf8", function read(err, data) {
    if (err) {
      throw err;
    }
    const getNumbers = data;
    return res.send(getNumbers);
  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});