/*
Update 3: Since Node 13, you can use either the .mjs extension, or set "type": "module" in your package.json. 
You don't need to use the --experimental-modules flag.
Update 2: Since Node 12, you can use either the .mjs extension, or set "type": "module" in your package.json. 
And you need to run node with the --experimental-modules flag.

express does not contain body parser by default
n -> node.js package manager , sudo n lts or sudo n latest
*/

/*
This application is common for both backend and frontend challenges.
*/

const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()

const port = 3000
const requiredLength = 500
const secretKey = "Your_reCaptcha_secret_key"

var ListOfNums = [] //Uisng an array to store the numbers.

app.use(bodyParser.json())

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  }));

const str = (element) => typeof(element) === "string"

//check incoming data consits of only numbers and store in an array
function saveData(data) 
{   
    if(!Array.isArray(data)) 
    {
        return 0
    }
    if(data.length != requiredLength)
    {
        return -1
    }
    if(data.some(isNaN) || data.some(str))
    {
        return -2
    }
    else
    {
        ListOfNums = data.sort()
        return 1
    }
}

app.get('/data', function (req,res) {
    var numbers = {
        data:ListOfNums
    }
    res.status(200).send(numbers)
})

app.post('/data', function (req,res) {
    const data  = req.body.num
    var result = 1
    if(data)
    {
        result = saveData(data)
    }
    else
    {
        result = -3
    }
    switch(result)
    {
        case 0:{
               res.status(400).send({error: 'input is not a list of numbers'})  
               break
        }
        case -1:{
                res.status(400).send({error: `input does not contain ${requiredLength} numbers`})
                break
        }
        case -2:{
            res.status(400).send({error: 'input contains data other than numbers'})
                break
        }
        case -3:{
            res.status(400).send({error:'Bad request'})
            break
        }
        default:{
            res.status(202).send('OK')
        }
    }
})
app.patch('/data', function (req,res) {
    var numberTobeAppended = parseInt(req.query.num)
    if(numberTobeAppended)
    {
        ListOfNums.push(numberTobeAppended)
        ListOfNums.sort()
        res.status(202).send('OK')
    }
    else
    {
        res.status(400).send({error:'Bad request'})
    }
})

//This endpoint is for the frontend challenge
app.post('/recaptcha',function(req,res)
{
    axios.post("https://www.google.com/recaptcha/api/siteverify?secret="+secretKey+"&response="+req.query.token,{
    })
    .then(function(response)
    {
        if(response.data.success==true && response.data.score > 0.5)
        {
            res.status(200).send('OK')
        }
        else
        {
            res.status(200).send('Not OK')
        }
    })
    .catch(function(error)
    {
        res.status(500).send({err:error})
    })

})

app.listen(port, ()=>console.log(`CORS-enebled app is serving on port ${port}`))
