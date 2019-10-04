/*
    *** Conventions for this program ***

    *** For the POST API ***
        DATA FORMAT in JSON is {
                                    "data": [1,2,3,4,5......]
                               }

    *** For the PATCH API ***
        DATA FORMAT in JSON is {
                                    "num": 5
                               }

    *** Tested the API calls in POSTMAN


*/

const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;
const dataSize = 500;

let numArray = [];

/* 
    Function to find the index where the new number is to be inserted
    
    Parameters: number - number to be inserted
                low    - the low index for the current search
                high   - the high index for the current search
    
    return value: the index to be inserted at
*/
const binarySearch = (number, low, high) => {
    if (high <= low)
        return (number > numArray[low])? (low + 1): low;
    
    let mid = Math.ceil((low + high) / 2);

    if (number == numArray[mid])
        return mid + 1;

    if (number > numArray[mid])
        return binarySearch(number, mid + 1, high)
    
    return binarySearch(number, low, mid -1);

}

// GET API 
const sortNumbers = (req, res) => {
    if (numArray.length == 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Emtpy Array'
        })
    }

    numArray.sort(function(a,b) {return a -b});

    res.status(202).json({
        status: 'success',
        data: numArray
    });

}

// POST API
const getNumbers = (req, res) => {
    let data = req.body;
    data = data.data;

    if (data.length != dataSize) {
        return res.status(404).json({
            status: 'fail',
            message: 'Input length is not equal to 500'
        });
    }

    for (index in data) {
        if (isNaN(data[index])) {
            numArray = [];
            return res.status(404).json({
                status: 'fail',
                message: 'At least one element is not a number'
            })
        } else {
            numArray.push(parseInt(data[index]));
        }
    }

    res.status(200).json({
        status: 'success',
        data : numArray
    });

}

// PATCH API
const insertNumber = (req, res) => {
    let number = req.body.num;
    if (isNaN(number)) {
        return res.status(404).json({
            status:'fail',
            message: 'Not a number'
        })
    }
    number = parseInt(number);
    const index = binarySearch(number, 0, numArray.length -1);  
    
    numArray.splice(index, 0, number);
    res.status(200).json({
        status: 'success',
        data: numArray
    });
}


app.get('/data', sortNumbers);
app.post('/data', getNumbers);
app.patch('/data', insertNumber);



app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
