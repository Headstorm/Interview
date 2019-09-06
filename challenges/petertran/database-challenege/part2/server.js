const express = require('express');
const multer = require('multer');
const fs = require('fs');
const mysql = require('mysql');

const upload = multer({dest: 'uploads/'});
const app = express();

app.use(express.json());

app.use(express.static('./public'));

app.post('/mergeDB', upload.single('noSQL'),  (req, res) => {
  const jsonData = fs.readFileSync(req.file.path, {encoding: 'utf8'});
  const data = JSON.parse(jsonData);
  const values = [];

  for (let i = 0; i < data.length; i++) {
    const row = [];
    for (let key in data[i]) {
      row.push(data[i][key]);
    }
    values.push(`(${row.join(',')})`);
  }

  const insertInto = `
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

  fs.unlink(req.file.path);
  res.status(200).end();
});

app.listen('8080', () => {
  console.log('App is listening on port: 8080');
});