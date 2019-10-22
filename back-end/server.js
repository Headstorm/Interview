var express = require("express");
var fs = require("fs");
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/post", function(req, res) {
  // data can be sent on localhost:3000/api/post via postman
  const postNumbers = req.body.numbers;
  if (postNumbers.length !== 500) {
    // checks if data is exactly 500 numbers, otherwise an error is thrown
    return console.log("must have no more or less than 500 numbers");
  } else {
    fs.writeFile(
      "./text.json", // posts data to text file
      JSON.stringify(postNumbers.sort((a, b) => a - b)), // writes numbers in ascending order
      function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }
    );
  }
});

app.get("/api/get", function(req, res) {
  fs.readFile("./text.json", "utf8", function read(err, data) {
    // utf8 provides character encoding to convert from buffer to string
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
