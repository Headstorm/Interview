//defining a variable to utilize data model
const NumData = require( './numModel' );

//creates the index function to retrieve data and return a json object sorted numerically in ascending order
exports.index = function( req, res ){
    NumData.get( function ( err, nums ) {
        if( err ){
            res.json({
                status: "ERROR",
                message: err,
            });
        }else{
            
            res.json({
                status: 'success',
                message: 'NumData retrieved successfully',
                data: nums.map(item => {
                    return item.nums.sort(function(a, b){
                        return a-b;
                    });
                })

            })
        }
    })
}

//defines a function for a post request, verifying there are 500 entries in an array and each entry is a number
exports.new = function( req, res ){

    let numData = new NumData();
    numData.nums = req.body.nums;

    let test = Object.values(numData.nums)
    let result = true;
    for(let i = 0; i < test.length; i++){
        if(isNaN(test[i]) === true){
            result = false;
            break
        }
    }
    if(Object.entries(numData.nums).length == 500 && result === true){
        numData.save(function( err ){
            if( err ){
                res.json( err );
            }
            else{
            res.json({
                message: 'New NumData Created!',
                data: numData
            })
        }
        })
    }else{
        res.json({
            message: 'Format not met'
        })
    }    
}

//defines a patch function to insert and validate a number into the data in ascending numerical order
exports.patch = function(req, res){
    let numData = new NumData();
    let newNum = req.body.num;
    function insert(num, numArray){
        numArray.push(num);
        numArray.sort(function(a,b){
            return a-b;
        });
        return numArray;
    }
    NumData.get( function ( err, nums ) {
        if( err ||  isNaN(newNum) === true){
            res.json({
                status: "ERROR",
                message: err,
            });
        }else{
            numData.nums = insert(newNum, nums[0].nums)
            numData.save(
                res.json({
                    status: 'success',
                    message: 'NumData patch retrieved successfully',
                    data: numData.nums
                }))
        }
    })
    
}