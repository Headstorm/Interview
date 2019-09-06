const fs = require('fs');

const div = ['═'.repeat(65), '-'.repeat(65)];
const rawData = fs.readFileSync('data/legacyRecords.json');
const records = JSON.parse(rawData);

console.clear();

// PLAIN SQL QUERIES
// I have tested these on a testing database and they inserted the data as intended.
console.log('\n\nPLAIN QUERIES');
console.log(div[0]);
records.forEach((r) => {
  const t = '    ';

  const customerParams = [
    r.recordId,
    r.name,
    r.cellPhone,
    r.workPhone,
    r.email,
    r.address,
  ];

  const orderParams = [
    r.recordId,
    'Basic Widget',
    r.basicWidgetOrder,
    r.recordId,
    'Advanced Widget',
    r.advancedWidgetOrder,
  ];

  console.log(`INSERT INTO records (record_id) VALUES (${r.recordId});\n`);
  console.log(`INSERT INTO customer\n${t}(record_id, name, cell_phone, work_phone, email, address)\nVALUES\n${t}(${r.recordId}, '${r.name}', '${r.cellPhone}', '${r.workPhone}', '${r.email}', '${r.address}');\n`);
  console.log(`INSERT INTO orders\n${t}(record_id, order_type, quantity)\nVALUES\n${t}(${r.recordId}, 'Basic Widget', ${r.basicWidgetOrder}),\n${t}(${r.recordId}, 'Advanced Widget', ${r.advancedWidgetOrder});`);
  console.log(`${div[1]}`)
});

// PG-PROMISE QUERIES
// I have not had a chance to test these out so there are likely bugs in the code.
// If you would like me to build this out and test, let me know.
console.log('\n\nPG-PROMISE QUERIES');
console.log(div[0]);
records.forEach((r) => {
  const customerParams = [
    r.recordId,
    r.name,
    r.cellPhone,
    r.workPhone,
    r.email,
    r.address,
  ];

  const orderParams = [
    r.recordId,
    'Basic Widget',
    r.basicWidgetOrder,
    r.recordId,
    'Advanced Widget',
    r.advancedWidgetOrder,
  ];

  console.log(`db.query('INSERT INTO records (record_id) VALUES ($1)', recordID)`);
  console.log(`db.query('INSERT INTO customer(record_id, name, cell_phone, work_phone, email, address) VALUES ($1, $2, $3, $4, $5, $6)', customerParams)`);
  console.log(`db.query('INSERT INTO orders(record_id, order_type, quantity) VALUES ($1, $2, $3), ($4, $5, $6)', orderParams)\n`);
});

console.log('\ndone.\n\n');

