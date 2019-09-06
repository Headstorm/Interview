const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/mergedb', (req, res) => {
  const values = req.body.map(entry => {
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

  res.status(200).end();
});

app.listen('8080', () => {
  console.log('App is listening on port: 8080');
});