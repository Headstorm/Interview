/* eslint-disable quotes */
const express = require('express');

// Parses json requests only; returns error if invalid json
module.exports.validateJSON = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  express.json('strict'/* consider only arrays/objects */)(req, res, err => {
    if (err) {
      console.error(err);
      return res.sendStatus(400); // Bad request
    }
    next();
  });
};

// rejects if 'list' payload is not: an array; having 500 memebers; each member being a number.
module.exports.validateAndParseList = (req, res, next) => {
  Promise.resolve().then(() => {
    let { list } = req.body;
    list = JSON.parse(list);

    // Verify that request payload is an array (i.e., list);
    if (!Array.isArray(list)) {
      throw new Error(`\x1b[91mRequest body does not contain a resource designated as 'list' of type 'Array'.\x1b[39m`);
    }

    // Check whether list contains only 500 members
    if (list.length !== 500) {
      next(`\n\x1b[91m'List' should contain 500 members/elements, but has ${list.length} instead.\x1b[39m`);
    }

    // Check that all list members are numbers
    const numbersOnly = list.every((val) => typeof val === 'number');
    if (!numbersOnly) {
      throw new Error(`\x1b[91mOne or more list members are not numbers\x1b[39m`);
    }

    req.body.list = list;

    next();
  }).catch(next);
};

/*
  MIDDLEWARE ORDER
  - check if JSON formatted first

  DATA VALIDATION:
  - List must be JSON-formatted (test & error on fail)
  - Data structure must be a list (test & error on fail)
  - List must contain only 500 members (numbers) (test & error on fail)
  - List members must all be numbers (test & error on fail)
*/
