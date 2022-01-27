
//Import in required packages
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();

//Initialize app middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(upload.array());

var stored_data = []

//Used for sorting list
function intCompare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

//GET for /data endpoint, if no POST has been made then a message is returned instead.
//If there is stored data from a previous post, the list is sorted before it is returned.
app.get('/data', function(req, res){
    if (stored_data.length === 0) {
        res.send("No data uploaded yet!")
    }
    else {
        stored_data.sort(intCompare)
        res.json({"data" : stored_data})
    }
});

//POST for the /data endpoint, if the posted data isn't a list of 500 numbers return bad status and message.
//If the data is a list of 500 numbers, then the data is stored and available to GET calls at this endpoint.
/*Format for POST request:
{
  "data" : [145,48,171,495 .... 61,355,284,294]
}
May have to include header: 'Content-Type: application/json'
*/
app.post('/data', function(req, res){
   console.log(req.body.data)
   var req_data = req.body.data
   console.log(req_data.length)
   if (req_data.length != 500) {
        res.status(400);
        res.send("Bad request, not length 500");
   }
   else {
       var allNums = true
       for (i = 0; i < 500; i++) {
            if (typeof(req_data[i]) != "number") {
                console.log("found a false one!", typeof(req_data[i]))
                allNums = false
            }}
       if (!allNums) {
        res.status(400);
        res.send("Bad request, not all numbers");
        res.end()
       }
       else {
        stored_data = req_data
        res.json({message: "List updated with POST request"})
        res.status(201);
        res.end()
       }
}});

//PATCH for the /data endpoint. Takes in a single number, which is sorted into the list and sent back. Malformed requests
//cause an error.
/*Format for PATCH request:
{
    "num" : 100
}
May have to include header: 'Content-Type: application/json'
*/
app.patch('/data', function(req, res){
    console.log(req.body.data)
    var req_num = req.body.num
    if (typeof(req_num) != "number") {
        res.status(400);
        res.send("Bad request, not a number");
        res.end()       
    }
    else {
        stored_data.push(req_num)
        stored_data.sort(intCompare)
        res.json({ "message": "Patch made! Result:",
                   "data" : stored_data 
                 })
    }
 });


app.get('/', function (req, res) {
    res.send('GET request to the homepage')
  })
  
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })


//Start server
app.listen(3000, () => {
    console.log('Server is running')
  })






/* Example REST calls */

//fetch('/').then(res => res.then(data => console.log(data)))

//fetch('/', {method : "POST"}).then(res => res.then(data => console.log(data)))





/*

{
    "num" : 100
}

{
  "data" : [145,395,184,425,147,487,234,308,236,393,169,7,262,11,31,319,336,263,56,56,359,164,491,123,168,13,248,171,495,335,151,206,258,90,398,376,304,448,393,92,209,397,404,454,307,212,434,253,434,53,229,493,482,314,441,119,3,72,405,33,259,21,99,213,211,114,335,178,259,358,431,386,283,166,398,148,224,221,233,185,243,265,12,307,163,449,143,36,69,73,280,212,55,440,170,208,258,131,76,195,204,272,496,261,37,261,90,432,351,225,447,442,278,70,495,28,122,36,260,140,46,432,387,485,449,498,339,242,437,357,183,158,451,61,85,448,270,279,310,187,139,320,145,72,242,427,219,192,348,323,50,354,418,212,6,289,297,184,195,46,283,313,229,91,465,455,236,277,55,368,249,3,313,200,490,147,429,100,113,207,367,399,455,369,356,100,332,313,481,68,165,4,305,232,407,190,490,374,174,165,332,157,487,116,285,67,42,254,15,395,426,96,328,488,211,493,61,102,178,51,115,49,337,256,394,458,20,407,113,478,288,116,492,488,122,208,60,129,337,333,288,6,446,39,62,297,81,356,363,346,478,240,152,184,78,292,324,341,306,448,60,400,456,437,481,150,70,430,379,468,385,406,260,278,80,315,286,286,346,2,84,239,160,24,14,65,130,192,61,137,37,424,317,393,357,107,152,277,440,476,235,296,192,58,239,150,69,109,7,481,76,101,323,452,73,150,418,419,460,99,239,344,335,453,130,384,252,238,292,179,407,67,336,493,193,68,179,171,422,155,265,271,187,178,9,52,463,290,296,326,177,104,240,339,14,32,278,93,215,297,44,257,50,11,14,151,302,41,147,181,206,3,81,237,70,456,423,181,233,375,109,165,264,294,443,187,204,315,428,260,328,52,149,176,169,103,442,442,92,429,402,97,388,453,44,25,217,101,484,48,341,197,474,7,270,445,457,496,345,183,447,333,210,483,486,301,161,197,17,474,345,340,481,114,438,133,13,127,69,45,50,56,487,262,352,425,428,1,39,323,229,268,438,231,138,479,405,92,86,444,155,352,285,459,264,461,434,342,286,429,359,492,303,66,108,401,172,355,280,116,204,8,350,168,91,469,405,323,498,139,439,252,347,146,144,323,61,355,284,294]
  
}

*/