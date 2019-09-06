const fs = require('fs');

const rawData = fs.readFileSync('data/legacyRecords.json');
const records = JSON.parse(rawData);

console.log(`\
  SQL statements are formatted according to the syntax\
  requirements of "pg-promise", a promise-based 3rd party\
  JavaScript library for querying PostgreSQL.\
`)

records.forEach((record) => {
  const {
    recordId,
    name,
    cellPhone,
    workPhone,
    email,
    address,
    basicWidgetOrder,
    advancedWidgetOrder,
    protectionPlan,
  } = record;

  const customerParams = [
    recordId,
    name,
    cellPhone,
    workPhone,
    email,
    address,
  ];

  const basicWidgetOrderParams = [
    recordId,
    'Basic Widget',
    basicWidgetOrder,
  ];

  const advancedWidgetOrderParams = [
    recordId,
    'Advanced Widget',
    advancedWidgetOrder,
  ];

  console.log(
    `db.query('INSERT INTO records (record_id) VALUES ($1)', recordID)`,
    `db.query('INSERT INTO customer(record_id, name, cell_phone, work_phone, email, address) VALUES ($1, $2, $3)', customerParams)`,
    `db.query('INSERT INTO customer(record_id, order_type, quantity) VALUES ($1, $2, $3)', basicWidgetOrderParams)`,
    `db.query('INSERT INTO customer(record_id, order_type, quantity) VALUES ($1, $2, $3)', advancedWidgetOrderParams)\n\n`
  );
});

console.log('done.');
