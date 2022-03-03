const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let nums = [];

app.use(bodyParser.json());

app.get("/data", function (req, res) {
  // Array will be sorted with any new GET requests
  nums.sort(function (a, b) {
    return a - b;
  });
  res.json(nums);
});

app.post("/data", function (req, res) {
  const data = req.body.numbers;

  // Accept data if it contains 500 elements and every element is a number
  if (data.length == 500 && data.every((e) => !isNaN(e))) {
    nums = data;
    res.send("Data submitted.");
  } else {
    res.send(
      "Error with data. Submitted data must contain exactly 500 numbers and only numbers."
    );
  }
});

app.patch("/data", function (req, res) {
  const data = req.body.number;

  // Accept data if it is a number
  if (!isNaN(data)) {
    nums.push(data);
    res.send("Data submitted.");
  } else {
    res.send("Error with data. Submitted data must be a number.");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
