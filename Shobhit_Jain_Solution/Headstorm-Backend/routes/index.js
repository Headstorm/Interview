var express = require('express');
var router = express.Router();
var models= require('../model')


/* GET home page. */
router.get('/data', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 let data = models.numberModel;

 data.findOne({
     where:{id:1},
     raw:true
 }).then(data=>{
     console.log(data.numbers)
     let numbers = JSON.parse(data.numbers)
    
     res.send(numbers.sort())
 })

});


/* POSt home page. */
router.post('/data', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 
 let data = models.numberModel;

 let number= {
     numbers:JSON.stringify(req.body.numbers)
 }
 
    data.create(number).then((result)=>{
        console.log(result);
    })

 

 res.send("Received");

});
module.exports = router;
