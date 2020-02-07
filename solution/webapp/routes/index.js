var express = require('express');
var router = express.Router();
var fetch = require('isomorphic-fetch');

var numbersArray;
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Random Company', "site_key": process.env.SITE_KEY});
});

/*
 The getIndex function implements a binary search
 that returns the insert position of the new number
	"""
	Args:
		num (int): The number to be inserted
		begin: the start index
		end: the end index
	"""
*/
function getIndex(num, begin, end) {

	// Base Condition 
	if (begin > end) {
		if (numbersArray[begin] > num) 
			return begin
		else
			return begin + 1
	}

	// get the middle element
	var mid = Math.floor((begin + end)/2); 
   
	
	if (numbersArray[mid]===num) return mid; 
		  
	// recurse based on the comparison to find the position
	if (numbersArray[mid] > num)  
		return getIndex(num, begin, mid-1); 
	else
		return getIndex(num, mid+1, end); 
}

// print the list (if it exists)
router.get('/data', function(req, res, next) {
	
	if (numbersArray === undefined) {
		return res.status(400).json({
			'message': "List has not been initialized yet"
		});
	}
	if (numbersArray.length === 0) {
		return res.status(400).json({
			'message': "List is empty"
		});
	}
	// return the list
	return res.status(200).json({
		list: numbersArray
	});
});

// initialize the list and sort the list
router.post('/data', function(req, res, next) {
	inputList = req.body.data;

	/* check if the request parameter is of valid syntax.
	    Need to escape backslash to avoid XSS
	*/
	try {
		JSON.parse(inputList.replace(/\\/g, '\\\\'));
	} catch (e) {
		return res.status(201).json({
			"message" : "The input should be a list"
		});
	}

	// if valid syntax, check if the request parameter is a list
	inputList = JSON.parse(inputList);
	if (!Array.isArray(inputList)) {
		return res.status(400).json({
			"message":"The input should be a list"
		});	
	}
	else {	// the request parameter is a valid list
		
		// check size of the list
		if (inputList.length == 500) {

			/* filter out non-integers from the list. If the 
			 length of isNumeric list is greater than 0; non-integer 
			 value(s) exist in the input list */
			isNumeric = inputList.filter(function(num) {
				return isNaN(num);
			})

			/* if the request parameter is a valid list, sort the 
			 list and store  */
			if (isNumeric.length == 0) {
				numbersArray = inputList.sort((a, b) => a - b);

				return res.status(201).json({
					"message" : "List creation successful",
					data: numbersArray
				})
			}
			else {
				return res.status(400).json({
					"message":"The list should contain only integers"
				});	
			}
		}
		else {
			return res.status(400).json({
				"message":"The list should have exactly 500 elements"
			});	
		}
	}
	
});


// insert new number in the list
router.patch('/data', function(req, res, next) {
	
	// check if the number list has been initialized
	if (numbersArray === undefined) {
		return res.status(400).json({
			'message': "List has not been initialized yet"
		});
	}

	newNumber = req.body.number;

	// check if the value is a number
	if(!isNaN(newNumber)) {
		/* run binary search to get the correct index to insert
		 the new number */
		insertAt = getIndex(newNumber, 0,numbersArray.length);
		numbersArray.splice(insertAt, 0, parseInt(newNumber));
		return res.status(200).json({
			"message" : "Number inserted into list",
			list: numbersArray
		});
	}
	return res.status(400).json({
		"message" : "value is not an integer"
	});
});

router.post('/send', function(req, res, next) {
	const secret_key = process.env.SECRET_KEY;
	const token = req.body.token;
	const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

	fetch(url, {
		method: 'post'
	})
	.then(response => response.json())
	.then(google_response => res.json({ google_response }))
	.catch(error => res.json({ error }));
});

module.exports = router;

