const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/mergedb', (req, res) => {
  const collection = req.body;
  const fields = [
    'recordID',
    'name',
    'cellPhone',
    'workPhone',
    'email',
    'address',
    'basicWidgetOrder',
    'advanceWidgetOrder',
    'protectionPlan'
  ];

  if (!Array.isArray(collection)) {
    return res.status(400).json({message: 'Payload must be an array.'});
  } else if (!collection.length) {
    return res.status(400).json({message: 'Empty collection.'})
  }

  const values = [];

  for (let doc of collection) {
    const keys = Object.keys(doc);

    if (!keys.length) {
      return res.status(400).json({
        message: 'Invalid dataset.' + 
          ' Expected collection to contain Object(s) with valid keys.'
      });
    }

    const wrongKeys = keys.filter(key => !fields.includes(key));

    if (wrongKeys.length) {
      return res.status(400).json({
        message: `File contains invalid fields: ${wrongKeys.join(', ')}.` + 
          ` Accepted fields: ${fields.join(', ')}.`
      });
    }

    const row = [];

    for (let field of fields) {
      row.push(doc[field]);
    }

    values.push(`(${row.join(',')})`);
  }

  const insertIntoDb = `
    INSERT INTO new_table 
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
  
    VALUES ${values.join(',')};
  `;

  console.log(insertIntoDb);

  res.status(200).json({message: `Success!`});
});

app.listen('8080', () => {
  console.log('App is listening on port: 8080');
});