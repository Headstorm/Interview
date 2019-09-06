const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const upload = multer({dest: 'temp-files/'});

app.post('/mergeDB', upload.single('noSQL'), (req, res) => {
  fs.readFile(req.file.path, (err, jsonData) => {
    const data = JSON.parse(jsonData);
    const values = data.map(entry => {
      const row = [];
      for (let key in entry) {
        row.push(entry[key]);
      }
      return `(${row.join(',')})`;
    });

    const insertIntoDb = `
      INSERT INTO newDB 
        (
        RecordID,
        Name,
        CellPhone,
        WorkPhone,
        Email,
        Address,
        BasicWidgetOrder,
        AdvanceWidgetOrder,
        ProtectionPlan
        )
    
      VALUES (${values.join(',')})
    `;

    console.log(insertIntoDb);

    fs.unlinkSync(req.file.path);
    res.status(200).end();
  });
  
});

app.listen('8080', () => {
  console.log('App is listening on port: 8080');
});