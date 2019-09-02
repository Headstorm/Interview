var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

var data;

router.get("/data", (req, res) => {
  res.json(data);
});

router.post(
  "/data",
  [
    check("numbers")
      .isArray({ min: 500, max: 500 })
      .withMessage("You must submit a list of 500 numbers exactly."),
    check("numbers")
      .custom(
        arr =>
          !arr.some(index => {
            !Number.isInteger(index);
          })
      )
      .withMessage("only numbers can be submitted")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    data = req.body.numbers;
    data.sort(function(a, b) {
      return a - b;
    });
    res.json({ success: "numbers added successfully" });
  }
);

module.exports = router;
