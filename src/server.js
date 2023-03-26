const express = require('express');
const app = express();

let nums = [];

// Provides a POST endpoint at /data where a user submits a JSON formatted list of 500 random numbers. 
// The list has to be exactly 500 numbers, if there are more or less than 500 an error must be returned.
// Similarly, if something other than a list of numbers is submitted, an error must be returned.
app.post('/data', (req, res) => {
    //parse numbers assuming the formatting is like this: {"numbers":[1,2,3,...]} in the body.
    try{
        const raw = JSON.parse(req.body.numbers);
    } catch(error){
        throw new Error("The body parameter \"numbers\" does not exist");
    }
    //only accept array if it is an array, 500 elements long, and every element is a number
    if(raw.isArray() && raw.length == 500 && raw.every(e  => !isNaN(e))){
        nums = raw;
        //sort now for later returning
        nums.sort();
    }
    else{
        //incorrect array, throw error
        throw new Error("\"numbers\" is not an array, does not have the correct number of elements, or some elements are not a number");
    }
})

// Provides a GET endpoint at /data which provides the same JSON formatted list of 500 numbers that are sorted from lowest to highest.
app.get('/data', (req, res) => {
    //already sorted in the other functions!
    res.json(nums);
})

// Provides a PATCH endpoint at /data which allows insertion of a single number into the list which gets placed in the proper order.
app.patch('/data', (req, res) => {
    //assume input is like this: {"number":1} in the body.
    try{
        const raw = JSON.parse(req.body.number);
    } catch(error){
        throw new Error("The body parameter \"number\" does not exist");
    }
    //only accept number if it is a single number.
    if(!isNaN(raw)){
        nums.push(raw);
        //sort again
        nums.sort();
    }
    else{
        throw new Error("\"number\" parameter is not a number");
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => `Server running on port ${port}`);