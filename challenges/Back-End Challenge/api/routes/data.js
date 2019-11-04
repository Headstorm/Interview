const express = require('express');

// a way to package routes together under one name
const router = express.Router();

// variable so that we can access the same list that is submitted
let numbers;

// this is to sort the list numerically instead of alphabetically
function numberSort(a, b) {
    return a - b;
}

//even though it should be: 
        //router.get('/data')
// this will be packaged as data and the base URL for every URL inside this file
// will be /data. Therefore any route inside will be appending to /data




// get request to resturn the current list
router.get('/', (req, res, next) => {

    // checks if the list has been created
    if (typeof numbers !== 'undefined') {
        res.status(200).json({
            list: numbers
        });
    } else {
        res.status(400).json({
            message: 'No current list to return.'
        });
    }

});


// post request to create new list
router.post('/', (req, res, next) => {

     // checks if only one field in JSON object
    if (Object.keys(req.body).length != 1){
        res.status(400).json({
            message: 'List not saved, incorrect number of field names.'
        });
    }


    // checks if correct field name is being used
    if (Object.keys(req.body)[0] !== 'list'){
        res.status(400).json({
            message: 'List not saved, field name should be `list`. '
        });
    } 



    // check if value is an array
    if (req.body.list instanceof Array) {

        // makes sure the list is 500 numbers
        if (req.body.list.length === 500) {

            // checks if every element in the array is an integer
            if (!req.body.list.some(num => !Number.isInteger(num))){
                numbers = req.body.list.sort(numberSort);

                res.status(201).json({
                    message: 'Created new list!'
                });
            } else {
                res.status(400).json({
                    message: 'List not saved, all elements must be an integer.'
                });
            }   

        } else {
            res.status(400).json({
                message: 'List not saved, must be of length 500.'
            });
        }
        
    } else {
        res.status(400).json({
            message: 'List not saved, value not a list.'
        });
    }

    

    
});

// patch request to add a number to the already existing list
router.patch('/', (req, res, next) => {

    // checks if only one field in JSON object
    if (Object.keys(req.body).length != 1){
        res.status(400).json({
            message: 'List not saved, incorrect number of field names.'
        });
    }


    // checks if correct field name is being used
    if (Object.keys(req.body)[0] !== 'num'){
        res.status(400).json({
            message: 'List not saved, field name should be `num`. '
        });
    } 


    // makes sure a list already exists
    if (typeof numbers === 'undefined') {
        res.status(400).json({
            message: 'No current list to add to.'
        });

    // checks if it's a number
    } else if (typeof req.body.num === 'number') {

        // checks if it's an integer
        if (Number.isInteger(req.body.num)){
            numbers.push(req.body.num)
            numbers.sort(numberSort);

            res.status(200).json({
                message: 'Updated list!',
                list: numbers
            }); 
        } else {
            res.status(400).json({
                message: 'Not added to the list, value not an integer.'
            });
        }

    } else {
        res.status(400).json({
            message: 'Not added to the list, value not a number.'
        })
    }
    
    
});

module.exports = router;