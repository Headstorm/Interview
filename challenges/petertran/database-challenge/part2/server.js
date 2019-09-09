const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/mergedb', (req, res) => {
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

  if (!Array.isArray(req.body)) {
    return res.status(400).json({message: 'Payload must be an array.'})
  }

  const values = req.body.map(entry => {
    const row = [];
    const keys = Object.keys(entry);
    const wrongKeys = keys.filter(key => !fields.includes(key));

    if (wrongKeys.length > 0) {
      return res.status(400).json(
        {message: `File contains invalid fields: ${wrongKeys.join(', ')}. Accepted fields: ${fields.join(', ')}.`
      });
    }

    for(let field of fields) {
      row.push(entry[field]);
    }

    return `(${row.join(', ')})`;
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

  res.status(200).json({message: `Success!`});
});

app.listen('8080', () => {
  console.log('App is listening on port: 8080');
});