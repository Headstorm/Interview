var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

var list = [5,4,3,2,1];
//default list in case you wanted to try the get route before posting anything

app.post('/data', function(req,res){
    console.log('server - get /data');
    console.log('server - recieved numbers: '+req.body.numbers);
    var reqnums = req.body.numbers;
    if(reqnums.length!==500) res.status(400).send('error: must send exactly 500 numbers');
    else{
        if(isNaN(reqnums[0])) res.status(400).send('error: must only send numbers');
        list = reqnums;
        res.send('we got it');
    }
});

app.get('/data', function(req,res){
    var sendlist = list.sort((a,b)=>{return a-b});
    res.send({numbers:sendlist});
});

app.listen('3000','127.0.0.1', function(){
    console.log('server started');
});