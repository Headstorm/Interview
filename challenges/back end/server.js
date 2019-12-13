const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");

const app = express();

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

app.use(
  session({
    secret: "CHEWIECHEWIECHEWIECHEWBACA",
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function buildError(errorMessage) {
  let error = {
    status: "bad",
    error: errorMessage
  };
  return error;
}

app.post("/data", (req, res) => {
  //submit 500 numbers
  let data = req.body.numbers;
  //checking for proper data
  if (data === undefined) {
    res.json(buildError("Incorrect data provided"));
  }

  //less than 500 error
  if (data.length < 500) {
    res.json(
      buildError(
        "Not enough numbers provided: " + data.length + " is less than 500"
      )
    );
  }
  //more than 500 error
  if (data.length > 500) {
    res.json(
      buildError(
        "Too many numbers provided: " + data.length + " is more than 500"
      )
    );
  }
  //something other than numbers = error
  let invalidNumbers = [];
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (!isNumeric(item)) {
      invalidNumbers.push(i + 1);
    }
  }
  if (invalidNumbers.length) {
    res.json(
      buildError(
        "Invalid numbers found at location: " + invalidNumbers.join(", ")
      )
    );
  }

  //numbers look good put in session
  req.session.data = data;
  res.json({ status: "ok", message: "500-Number List Created!" });
});

app.get("/data", (req, res) => {
  //looking for numbers in session
  if (req.session.data === undefined) {
    res.json(buildError("No numbers in memory"));
  } else {
    //clone array
    let copy = req.session.data.slice();
    //return sorted data
    res.json(
      copy.sort(function(a, b) {
        return a - b;
      })
    );
  }
});

app.patch("/data", (req, res) => {
  //looking for numbers in session
  if (req.session.data === undefined) {
    res.json(buildError("No numbers in memory"));
  } else {
    //validate
    let number = req.body.number;
    let location = req.body.location;
    if (!isNumeric(number)) {
      res.json(buildError("The 'number' provided isn't a number"));
    }
    if (!isNumeric(location)) {
      res.json(buildError("The 'location' provided isn't a number"));
    }
    if (location < 0 || location > 499) {
      res.json(buildError("The 'location' provided is invalid"));
    }
    req.session.data[location] = number;
    res.json({ status: "ok", message: "Numbers patched!" });
  }
});

var server = app.listen(4000, () => {
  console.log("Server running on port:", server.address().port);
});
