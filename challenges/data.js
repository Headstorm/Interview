//backend challenge
const express = require('express');
const router = express.Router();
var num = null;
var arr = Array(5000);

router.post('/data', (req, res, next)=>{
    num =  req.body.numbers;
    var i = 0, count=0;
    var regulator = new RegExp('^\\d+$');
    var fact = true;
    try{
        for(i in num){
           
            if(regulator.test(num[i])){
            arr[i] = num[i];
            count++;
            }
            else{
                fact = false;
                break;
            }
        }
        if(500===count&&fact){
            res.status(201).json({
                Message: 'Numbers Accepted',
            });
            sortArray();
        }
        else if(count<500&&fact){
            res.status(201).json({
                Error: 'Number list is too small'
            });
        }
        else if(count>500&&fact){
            res.status(201).json({
                Error: 'Number list is too large'
            });
        }
        else{
            res.status(201).json({
                Error: 'Incorrect input'
            });
        }

    }
    catch(error){
        res.status(201).json({
            error
        });
    }
    
}); 

router.get('/data', (req, res, next)=>{
    
    res.status(200).json({
        getNumbers: num

    })
});

router.patch('/data', (req, res, next) => {
       addRandom();
        res.status(200).json({
            Patched: num
        })
});

function sortArray(){
    arr.sort(function(a, b){return a-b});
    for(i in arr){
        num[i]=arr[i];
    }
}

function addRandom(){
    //Number may be up to 1000
    var rand = Math.floor(1+Math.random()*1000);
    console.log(rand);
    arr[arr.length+1] = rand;
    sortArray();
}
module.exports = router;
