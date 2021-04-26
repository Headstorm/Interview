const express = require('express');
const session = require("express-session");
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www.form-urlencoded
app.use(express.json());// for parsing application/json

app.use(session({
        secret: "mbokaElengi",
        resave: false,
        saveUninitialized: true
    })
);

app.post('/data',(req,res) =>{
    
    let data = req.body.numbers;
    //check for data is not empty
    if (data === undefined) {
        return res.json({ status: "400", message: "undefined" });
    }

    //check for data less than 500
    if (data.length < 500) {
        return res.json({ status: "400", message: "You provide less than 500. Your data length need to be exactly 500" });
        
    }
    //check for data more than 500
    if (data.length > 500) {
        return res.json({ status: "400", message: "You provide more than 500. Your data length need to be exactly 500" });
    }
    //check for data containing other type of data
    for (let i = 0; i < data.length; i++) {
        if (typeof (data[i]) !== 'number' || !Number.isFinite(data[i])) {
            return res.json({ status: "400", message: "invalid number found in you data" });
        }
    }

    //add data to session
    req.session.data = data;
    return res.json({ status: "201", message: "Created!" });
});

app.get('/data', (req, res) => {
    if (req.session.data === undefined) {
        return res.json({ status: "404", message: "No data found in the session" });
    } else {
        let array = req.session.data.slice();
        return res.json(array.sort(function (a, b) {return a - b}));
    }
});

app.patch("/data", (req, res) => {
    //looking for numbers in session
    if (req.session.data === undefined) {
        return res.json({ status: "404", message: "No data found in the session" });
    } else {
        
        let value = req.body.value;
        let index = req.body.index;
        if (typeof (value) !== 'number' || !Number.isFinite(index)) {
            console.log(typeof (value))
            return res.json({ status: "404", message: "You didn't enter a valid number"});
        }
        if (typeof (index) !== 'number' || !Number.isFinite(index)) {
            return res.json({ status: "404", message: "Make sure you enter a number" });
        }
        if (index < 0 || index > 499) {
            return res.json(buildError("The index you provide is invalid"));
        }
        req.session.data[index] = value;
        return res.json({ status: "ok", message: "Numbers updated!" });
    }
});

app.listen(port, () =>console.log(`Server listening in port ${port}`));